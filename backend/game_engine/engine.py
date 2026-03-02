import uuid
from datetime import datetime, timezone
from typing import Optional

import redis.asyncio as aioredis

from game_engine.state import (
    GameSession, PlayerState, WarRoomMessage, EscapeSubmission, EscapeResult
)


class GameEngine:
    SESSION_TTL = 86400  # 24 hours

    def __init__(self, redis: aioredis.Redis, scenario: dict):
        self.redis = redis
        self.scenario = scenario

    async def create_session(self) -> GameSession:
        session_id = str(uuid.uuid4())[:8].upper()
        players = {
            persona_id: PlayerState(persona=persona_id)
            for persona_id in self.scenario["personas"]
        }
        session = GameSession(session_id=session_id, players=players)
        await self._save_session(session)
        return session

    async def get_session(self, session_id: str) -> Optional[GameSession]:
        data = await self.redis.get(f"session:{session_id}")
        if not data:
            return None
        return GameSession.model_validate_json(data)

    async def player_join(self, session_id: str, persona: str) -> tuple[GameSession, bool]:
        session = await self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")
        if persona not in session.players:
            raise ValueError(f"Persona '{persona}' is not valid for this session")

        was_already_joined = session.players[persona].joined
        now = datetime.now(timezone.utc)
        session.players[persona].joined = True
        session.players[persona].joined_at = now
        session.players[persona].last_activity = now

        # Activate game when all players have joined
        if all(p.joined for p in session.players.values()) and session.status == "waiting":
            session.status = "active"
            session.started_at = now

        await self._save_session(session)
        return session, not was_already_joined

    async def record_file_open(
        self, session_id: str, persona: str, file_id: str
    ) -> tuple[GameSession, list[str], Optional[dict]]:
        """
        Record that a player opened a file.

        Returns (session, new_clues, gate_question_data).
        - new_clues: clue IDs just discovered (empty if file has an unanswered gate)
        - gate_question_data: dict to send as gate_question event, or None
        """
        session = await self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        player = session.players[persona]
        if file_id not in player.files_opened:
            player.files_opened.append(file_id)
        player.last_activity = datetime.now(timezone.utc)

        gate_question_data: Optional[dict] = None
        new_clues: list[str] = []

        for file_def in self.scenario["personas"][persona]["files"]:
            if file_def["id"] != file_id:
                continue

            gq = file_def.get("gate_question")
            if gq and file_id not in player.gate_answers:
                # Gate exists and hasn't been answered — send question, defer clue discovery
                gate_question_data = {
                    "file_id": file_id,
                    "question": gq["question"],
                    "options": gq["options"],
                    "hint": None,
                }
            elif file_def.get("is_clue"):
                # No gate (or already answered) — discover clue immediately
                clue_id = file_def["clue_id"]
                if clue_id not in player.clues_discovered:
                    player.clues_discovered.append(clue_id)
                    new_clues.append(clue_id)
            break

        await self._save_session(session)
        return session, new_clues, gate_question_data

    async def answer_gate_question(
        self, session_id: str, persona: str, file_id: str, answer: str
    ) -> tuple[GameSession, bool, list[str]]:
        """
        Validate a player's gate answer.

        Returns (session, correct, new_clues).
        On correct answer: records gate_answers[file_id] and discovers the clue.
        On wrong answer: no state change, returns correct=False.
        """
        session = await self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        player = session.players[persona]
        new_clues: list[str] = []

        for file_def in self.scenario["personas"][persona]["files"]:
            if file_def["id"] != file_id:
                continue

            gq = file_def.get("gate_question")
            if not gq:
                # No gate on this file — treat as correct (shouldn't happen normally)
                return session, True, new_clues

            correct = answer.strip().upper() == gq["correct"].strip().upper()
            if correct:
                player.gate_answers[file_id] = answer.strip().upper()
                player.last_activity = datetime.now(timezone.utc)
                # Discover the clue now that gate is passed
                if file_def.get("is_clue"):
                    clue_id = file_def["clue_id"]
                    if clue_id not in player.clues_discovered:
                        player.clues_discovered.append(clue_id)
                        new_clues.append(clue_id)
                await self._save_session(session)
                return session, True, new_clues
            else:
                # Wrong answer — no state saved, return hint
                return session, False, []

        return session, False, []

    def check_checkpoint(self, session: GameSession) -> bool:
        """Returns True if the checkpoint should fire now (not yet fired, threshold reached)."""
        if session.checkpoint_fired:
            return False
        cp = self.scenario.get("checkpoint")
        if not cp:
            return False
        threshold = cp.get("trigger_clues_total", 4)
        total = sum(len(p.clues_discovered) for p in session.players.values())
        return total >= threshold

    def check_injections(self, session: GameSession) -> list[str]:
        """Return injection IDs that should fire now (time-based)."""
        if session.status != "active" or not session.started_at:
            return []
        elapsed = (datetime.now(timezone.utc) - session.started_at).total_seconds()
        to_fire: list[str] = []
        for inj in self.scenario.get("injections", []):
            iid = inj["id"]
            if iid in session.injections_fired:
                continue
            if inj.get("type") == "time_elapsed" and elapsed >= inj.get("seconds", 0):
                to_fire.append(iid)
        return to_fire

    async def record_checkpoint_fired(self, session_id: str):
        session = await self.get_session(session_id)
        if not session:
            return
        session.checkpoint_fired = True
        await self._save_session(session)

    async def record_checkpoint_response(self, session_id: str, persona: str):
        """Mark that a player has posted to the war room after checkpoint fired."""
        session = await self.get_session(session_id)
        if not session:
            return
        session.checkpoint_responses[persona] = True
        await self._save_session(session)

    async def record_injection_fired(self, session_id: str, injection_id: str):
        session = await self.get_session(session_id)
        if not session:
            return
        if injection_id not in session.injections_fired:
            session.injections_fired.append(injection_id)
        await self._save_session(session)

    async def add_warroom_message(
        self, session_id: str, persona: str, content: str, message_type: str = "player"
    ) -> tuple[GameSession, WarRoomMessage]:
        session = await self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        msg = WarRoomMessage(persona=persona, content=content, message_type=message_type)
        session.war_room.append(msg)

        if persona in session.players:
            session.players[persona].last_activity = datetime.now(timezone.utc)

        await self._save_session(session)
        return session, msg

    async def record_hint_fired(self, session_id: str, trigger_id: str):
        session = await self.get_session(session_id)
        if not session:
            return
        if trigger_id not in session.hints_fired:
            session.hints_fired.append(trigger_id)
        await self._save_session(session)

    async def submit_escape(
        self, session_id: str, persona: str, root_cause: str, recommended_action: str
    ) -> GameSession:
        session = await self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        submission = EscapeSubmission(
            persona=persona,
            root_cause=root_cause,
            recommended_action=recommended_action,
        )
        session.escape_submissions.append(submission)
        await self._save_session(session)
        return session

    async def reset_escape(self, session_id: str) -> GameSession:
        """Clear escape submissions and result so players can re-submit (moderator unblock)."""
        session = await self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")
        session.escape_submissions = []
        session.escape_result = None
        if session.status in ("escaped", "failed"):
            session.status = "active"
            session.ended_at = None
        await self._save_session(session)
        return session

    async def record_escape_result(self, session_id: str, result: EscapeResult) -> GameSession:
        session = await self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        session.escape_result = result
        session.status = "escaped" if result.success else "failed"
        session.ended_at = datetime.now(timezone.utc)

        await self._save_session(session)
        return session

    def get_file_content(self, persona: str, file_id: str) -> Optional[dict]:
        persona_def = self.scenario["personas"].get(persona)
        if not persona_def:
            return None
        for file_def in persona_def["files"]:
            if file_def["id"] == file_id:
                return file_def
        return None

    def get_file_list(self, persona: str) -> list[dict]:
        persona_def = self.scenario["personas"].get(persona)
        if not persona_def:
            return []
        return [
            {
                "id": f["id"],
                "name": f["name"],
                "type": f["type"],
                "folder": f.get("folder", "root"),
                "modified": f.get("modified", "Unknown"),
            }
            for f in persona_def["files"]
        ]

    def check_hint_triggers(self, session: GameSession) -> list[str]:
        """Return trigger IDs that should now fire."""
        if session.status != "active" or not session.started_at:
            return []

        elapsed = (datetime.now(timezone.utc) - session.started_at).total_seconds()
        triggers_to_fire: list[str] = []

        for trigger in self.scenario.get("hint_triggers", []):
            tid = trigger["id"]
            if tid in session.hints_fired:
                continue

            t_type = trigger["type"]

            if t_type == "time_elapsed":
                if elapsed >= trigger["seconds"]:
                    triggers_to_fire.append(tid)

            elif t_type == "clue_discovered":
                required = trigger["clue_id"]
                if any(required in p.clues_discovered for p in session.players.values()):
                    triggers_to_fire.append(tid)

            elif t_type == "no_activity":
                threshold = trigger["seconds"]
                for player in session.players.values():
                    if player.last_activity:
                        idle = (datetime.now(timezone.utc) - player.last_activity).total_seconds()
                        if idle >= threshold:
                            triggers_to_fire.append(tid)
                            break

        return triggers_to_fire

    async def _save_session(self, session: GameSession):
        await self.redis.setex(
            f"session:{session.session_id}",
            self.SESSION_TTL,
            session.model_dump_json(),
        )
