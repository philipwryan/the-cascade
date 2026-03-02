import asyncio
from datetime import datetime, timezone
from typing import Dict

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from anthropic import AsyncAnthropic

from game_engine.engine import GameEngine
from game_engine.evaluator import EscapeEvaluator
from game_engine.state import EscapeResult
from agents.coach import AgentCoach
from config import settings

router = APIRouter()

EVAL_TIMEOUT_SECONDS = 120


class ConnectionManager:
    def __init__(self):
        # connections[session_id][persona] = websocket (players + spectator keys)
        self.connections: Dict[str, Dict[str, WebSocket]] = {}
        # hint_tasks[session_id] = background asyncio.Task
        self.hint_tasks: Dict[str, asyncio.Task] = {}
        # eval_tasks[session_id] = evaluation asyncio.Task
        self.eval_tasks: Dict[str, asyncio.Task] = {}

    async def connect(self, session_id: str, persona: str, ws: WebSocket):
        await ws.accept()
        if session_id not in self.connections:
            self.connections[session_id] = {}
        self.connections[session_id][persona] = ws

    def disconnect(self, session_id: str, persona: str):
        if session_id in self.connections:
            self.connections[session_id].pop(persona, None)
            if not self.connections[session_id]:
                del self.connections[session_id]
                self._cancel_hint_task(session_id)

    async def broadcast(self, session_id: str, event: dict):
        """Broadcast to all connections in a session (players + moderators)."""
        if session_id not in self.connections:
            return
        dead = []
        for persona, ws in self.connections[session_id].items():
            try:
                await ws.send_json(event)
            except Exception:
                dead.append(persona)
        for p in dead:
            self.connections[session_id].pop(p, None)

    async def send_to(self, session_id: str, persona: str, event: dict):
        ws = self.connections.get(session_id, {}).get(persona)
        if ws:
            try:
                await ws.send_json(event)
            except Exception:
                pass

    def get_connected(self, session_id: str) -> list[str]:
        return list(self.connections.get(session_id, {}).keys())

    def is_eval_running(self, session_id: str) -> bool:
        task = self.eval_tasks.get(session_id)
        return task is not None and not task.done()

    def is_hint_running(self, session_id: str) -> bool:
        task = self.hint_tasks.get(session_id)
        return task is not None and not task.done()

    def start_hint_task(self, session_id: str, coro):
        if session_id not in self.hint_tasks:
            self.hint_tasks[session_id] = asyncio.create_task(coro)

    def _cancel_hint_task(self, session_id: str):
        task = self.hint_tasks.pop(session_id, None)
        if task:
            task.cancel()

    def cancel_hint_task(self, session_id: str):
        self._cancel_hint_task(session_id)

    def cancel_eval_task(self, session_id: str):
        task = self.eval_tasks.pop(session_id, None)
        if task:
            task.cancel()


manager = ConnectionManager()


@router.websocket("/ws/{session_id}/{persona}")
async def websocket_endpoint(ws: WebSocket, session_id: str, persona: str):
    # ── Moderator spectator branch ───────────────────────────────────────────
    if persona == "moderator":
        await manager.connect(session_id, persona, ws)
        try:
            engine: GameEngine = ws.app.state.engine
            session = await engine.get_session(session_id)
            if not session:
                await ws.send_json({"type": "error", "data": {"message": "Session not found"}})
                return
            await ws.send_json({
                "type": "session_state",
                "data": session.model_dump(mode="json"),
            })
            # Moderator just receives broadcasts — block until disconnect
            while True:
                await ws.receive_text()
        except WebSocketDisconnect:
            pass
        finally:
            manager.disconnect(session_id, persona)
        return
    engine: GameEngine = ws.app.state.engine
    client = AsyncAnthropic(api_key=settings.anthropic_api_key)
    coach = AgentCoach(client=client, scenario=ws.app.state.scenario)
    evaluator = EscapeEvaluator(client=client, scenario=ws.app.state.scenario)

    await manager.connect(session_id, persona, ws)

    try:
        # Join the session
        try:
            session, is_new_join = await engine.player_join(session_id, persona)
        except ValueError as e:
            await ws.send_json({"type": "error", "data": {"message": str(e)}})
            return

        # Send full state snapshot to joining player
        await manager.send_to(session_id, persona, {
            "type": "session_state",
            "data": session.model_dump(mode="json"),
        })

        if is_new_join:
            await manager.broadcast(session_id, {
                "type": "player_joined",
                "data": {"persona": persona, "timestamp": _now()},
            })

            # If game just became active, post the coach welcome + start hint loop
            if session.status == "active":
                welcome = coach.generate_welcome_message()
                session, msg = await engine.add_warroom_message(
                    session_id, "COACH", welcome, "coach_hint"
                )
                await manager.broadcast(session_id, {
                    "type": "warroom_message",
                    "data": msg.model_dump(mode="json"),
                })
                # Start the background hint/checkpoint/injection checker (once per session)
                manager.start_hint_task(
                    session_id,
                    _hint_loop(session_id, engine, coach, manager),
                )

            # Broadcast updated session state to everyone
            await manager.broadcast(session_id, {
                "type": "session_state",
                "data": session.model_dump(mode="json"),
            })

        # Main message loop
        async for raw in ws.iter_json():
            event_type = raw.get("type")
            data = raw.get("data", {})

            if event_type == "open_file":
                file_id = data.get("file_id", "")
                session, new_clues, gate_q = await engine.record_file_open(session_id, persona, file_id)

                await manager.broadcast(session_id, {
                    "type": "file_opened",
                    "data": {"persona": persona, "file_id": file_id, "timestamp": _now()},
                })

                if gate_q is not None:
                    # Send gate question only to this player — not broadcast
                    await manager.send_to(session_id, persona, {
                        "type": "gate_question",
                        "data": gate_q,
                    })
                else:
                    # No gate (or already answered) — broadcast clue discoveries
                    for clue_id in new_clues:
                        await manager.broadcast(session_id, {
                            "type": "clue_discovered",
                            "data": {"persona": persona, "clue_id": clue_id, "timestamp": _now()},
                        })
                    # Check if checkpoint should fire after new clue discoveries
                    if new_clues and engine.check_checkpoint(session):
                        await _fire_checkpoint(session_id, engine, manager)

            elif event_type == "answer_gate":
                file_id = data.get("file_id", "")
                answer = data.get("answer", "").strip()
                if not file_id or not answer:
                    continue

                session, correct, new_clues = await engine.answer_gate_question(
                    session_id, persona, file_id, answer
                )

                # Look up the gate's hint for wrong answers
                hint_text: str | None = None
                if not correct:
                    for file_def in engine.scenario["personas"][persona]["files"]:
                        if file_def["id"] == file_id:
                            hint_text = file_def.get("gate_question", {}).get("hint")
                            break

                # Send result only to this player
                await manager.send_to(session_id, persona, {
                    "type": "gate_answer_result",
                    "data": {
                        "file_id": file_id,
                        "correct": correct,
                        "hint": hint_text if not correct else None,
                    },
                })

                if correct:
                    # Broadcast clue discoveries to all players
                    for clue_id in new_clues:
                        await manager.broadcast(session_id, {
                            "type": "clue_discovered",
                            "data": {"persona": persona, "clue_id": clue_id, "timestamp": _now()},
                        })
                    # Check checkpoint after new clues
                    if new_clues and engine.check_checkpoint(session):
                        await _fire_checkpoint(session_id, engine, manager)

            elif event_type == "warroom_message":
                content = data.get("content", "").strip()
                if not content:
                    continue
                session, msg = await engine.add_warroom_message(session_id, persona, content, "player")
                await manager.broadcast(session_id, {
                    "type": "warroom_message",
                    "data": msg.model_dump(mode="json"),
                })
                # Record that this player responded after checkpoint fired
                if session.checkpoint_fired and not session.checkpoint_responses.get(persona):
                    await engine.record_checkpoint_response(session_id, persona)

            elif event_type == "request_hint":
                trigger = {
                    "id": f"manual_{persona}_{_now()}",
                    "coach_context": f"Player '{persona}' explicitly requested a hint.",
                }
                hint_text = await coach.generate_hint(session, trigger)
                session, msg = await engine.add_warroom_message(session_id, "COACH", hint_text, "coach_hint")
                await manager.broadcast(session_id, {
                    "type": "warroom_message",
                    "data": msg.model_dump(mode="json"),
                })

            elif event_type == "submit_escape":
                root_cause = data.get("root_cause", "").strip()
                recommended_action = data.get("recommended_action", "").strip()
                if not root_cause or not recommended_action:
                    continue

                # Prevent duplicate submissions from the same persona
                current = await engine.get_session(session_id)
                if current and any(s.persona == persona for s in current.escape_submissions):
                    continue

                session = await engine.submit_escape(session_id, persona, root_cause, recommended_action)
                await manager.broadcast(session_id, {
                    "type": "escape_submitted",
                    "data": {"persona": persona, "timestamp": _now()},
                })

                # Evaluate once both players have submitted
                if len(session.escape_submissions) >= len(session.players):
                    await _start_evaluation(session_id, session, engine, evaluator)

    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(session_id, persona)


async def _start_evaluation(session_id: str, session, engine: GameEngine, evaluator: EscapeEvaluator):
    """Cancel hint loop, broadcast 'evaluating', launch background eval task with timeout."""
    if manager.is_eval_running(session_id):
        return  # Already running — don't double-trigger
    manager.cancel_hint_task(session_id)
    await manager.broadcast(session_id, {
        "type": "evaluating",
        "data": {"message": "Evaluating your combined submissions — please wait (up to 2 min)…"},
    })
    task = asyncio.create_task(
        _run_evaluation(session_id, session, engine, evaluator, manager)
    )
    manager.eval_tasks[session_id] = task


async def _run_evaluation(
    session_id: str,
    session,
    engine: GameEngine,
    evaluator: EscapeEvaluator,
    mgr: ConnectionManager,
):
    """Background evaluation with hard timeout. Broadcasts result or timeout error."""
    try:
        try:
            result = await asyncio.wait_for(
                evaluator.evaluate(session),
                timeout=EVAL_TIMEOUT_SECONDS,
            )
        except asyncio.TimeoutError:
            result = EscapeResult(
                success=False,
                score=0,
                evaluation=(
                    f"⚠️ Evaluation timed out after {EVAL_TIMEOUT_SECONDS}s. "
                    "The AI service may be slow or unavailable."
                ),
                debrief=(
                    "Submissions are saved. A facilitator can force re-evaluation "
                    f"from the Moderator Panel (/moderator?session={session_id})."
                ),
            )

        session = await engine.record_escape_result(session_id, result)
        await mgr.broadcast(session_id, {
            "type": "escape_result",
            "data": result.model_dump(mode="json"),
        })

    except asyncio.CancelledError:
        # Admin cancelled the eval (e.g. reset from moderator panel) — no broadcast
        pass
    except Exception as exc:
        print(f"[eval] {session_id}: {exc}")
        # Save a fallback failed result so the UI transitions out of "Evaluating…"
        # and reconnecting players see it via session_state (not just a swallowed error event).
        fallback = EscapeResult(
            success=False,
            score=0,
            evaluation=(
                f"⚠️ Evaluation encountered an unexpected error: {exc}. "
                "Your submissions are saved — contact the facilitator to re-evaluate."
            ),
            debrief=(
                "An internal error prevented automated scoring. "
                f"The facilitator can force re-evaluation from /moderator?session={session_id}."
            ),
        )
        try:
            await engine.record_escape_result(session_id, fallback)
        except Exception as save_exc:
            print(f"[eval] {session_id}: failed to save fallback result: {save_exc}")
        await mgr.broadcast(session_id, {
            "type": "escape_result",
            "data": fallback.model_dump(mode="json"),
        })
    finally:
        mgr.eval_tasks.pop(session_id, None)


async def _fire_checkpoint(session_id: str, engine: GameEngine, mgr: ConnectionManager):
    """Fire the checkpoint: post system war room message and broadcast checkpoint event."""
    cp = engine.scenario.get("checkpoint", {})
    message = cp.get("message", "⚡ CHECKPOINT — All players: synchronize your findings in the War Room before proceeding.")
    await engine.record_checkpoint_fired(session_id)
    session, msg = await engine.add_warroom_message(session_id, "SYSTEM", message, "system")
    await mgr.broadcast(session_id, {
        "type": "warroom_message",
        "data": msg.model_dump(mode="json"),
    })
    await mgr.broadcast(session_id, {
        "type": "checkpoint",
        "data": {"message": message},
    })


async def _hint_loop(session_id: str, engine: GameEngine, coach: AgentCoach, mgr: ConnectionManager):
    """Background task: check hint triggers, checkpoint, and injections every 30 seconds."""
    while True:
        try:
            await asyncio.sleep(30)
            session = await engine.get_session(session_id)
            if not session or session.status not in ("active",):
                break

            # ── Coach hint triggers ──────────────────────────────────
            for trigger_id in engine.check_hint_triggers(session):
                trigger_def = next(
                    (t for t in engine.scenario.get("hint_triggers", []) if t["id"] == trigger_id),
                    None,
                )
                if not trigger_def:
                    continue
                await engine.record_hint_fired(session_id, trigger_id)
                hint_text = await coach.generate_hint(session, trigger_def)
                session, msg = await engine.add_warroom_message(
                    session_id, "COACH", hint_text, "coach_hint"
                )
                await mgr.broadcast(session_id, {
                    "type": "warroom_message",
                    "data": msg.model_dump(mode="json"),
                })

            # ── Checkpoint ──────────────────────────────────────────
            if engine.check_checkpoint(session):
                await _fire_checkpoint(session_id, engine, mgr)
                session = await engine.get_session(session_id)  # refresh after write

            # ── Scenario injections ──────────────────────────────────
            for injection_id in engine.check_injections(session):
                inj_def = next(
                    (i for i in engine.scenario.get("injections", []) if i["id"] == injection_id),
                    None,
                )
                if not inj_def:
                    continue
                await engine.record_injection_fired(session_id, injection_id)
                inj_message = inj_def.get("message", "")
                session, msg = await engine.add_warroom_message(
                    session_id, "SYSTEM", inj_message, "system"
                )
                await mgr.broadcast(session_id, {
                    "type": "warroom_message",
                    "data": msg.model_dump(mode="json"),
                })

        except asyncio.CancelledError:
            break
        except Exception as exc:
            print(f"[hint_loop] {session_id}: {exc}")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()
