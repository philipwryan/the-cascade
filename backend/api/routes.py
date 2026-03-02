from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from game_engine.engine import GameEngine

router = APIRouter()


# ── Admin request bodies ─────────────────────────────────────────────────────

class InjectMessageBody(BaseModel):
    message: str


@router.post("/sessions")
async def create_session(request: Request):
    engine: GameEngine = request.app.state.engine
    session = await engine.create_session()
    return {"session_id": session.session_id}


@router.get("/sessions/{session_id}")
async def get_session(session_id: str, request: Request):
    engine: GameEngine = request.app.state.engine
    session = await engine.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session.model_dump(mode="json")


@router.get("/sessions/{session_id}/files/{persona}")
async def list_files(session_id: str, persona: str, request: Request):
    engine: GameEngine = request.app.state.engine
    session = await engine.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    if persona not in session.players:
        raise HTTPException(status_code=403, detail=f"Persona '{persona}' not valid for this session")
    return {"files": engine.get_file_list(persona)}


@router.get("/sessions/{session_id}/files/{persona}/{file_id}")
async def get_file(session_id: str, persona: str, file_id: str, request: Request):
    engine: GameEngine = request.app.state.engine
    session = await engine.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    if persona not in session.players:
        raise HTTPException(status_code=403, detail=f"Persona '{persona}' not valid for this session")

    file_def = engine.get_file_content(persona, file_id)
    if not file_def:
        raise HTTPException(status_code=404, detail="File not found")

    return {
        "id": file_def["id"],
        "name": file_def["name"],
        "type": file_def["type"],
        "content": file_def["content"],
    }


@router.get("/scenario")
async def get_scenario(request: Request):
    scenario = request.app.state.scenario
    return {
        "title": scenario["title"],
        "description": scenario["description"],
        "crisis_briefing": scenario["crisis_briefing"],
        "personas": {
            k: {"name": v["name"], "title": v["title"], "description": v["description"], "briefing": v["briefing"]}
            for k, v in scenario["personas"].items()
        },
    }


# ── Admin / Moderator endpoints ──────────────────────────────────────────────

@router.get("/admin/{session_id}")
async def admin_get_session(session_id: str, request: Request):
    """Full session state + connection + task status for the moderator panel."""
    from api.websocket_handler import manager  # local import avoids circular ref at module load

    engine: GameEngine = request.app.state.engine
    session = await engine.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    return {
        "session": session.model_dump(mode="json"),
        "connected_personas": manager.get_connected(session_id),
        "eval_running": manager.is_eval_running(session_id),
        "hint_running": manager.is_hint_running(session_id),
    }


@router.post("/admin/{session_id}/inject")
async def admin_inject_message(session_id: str, body: InjectMessageBody, request: Request):
    """Post a SYSTEM message to the war room from the moderator panel."""
    from api.websocket_handler import manager

    engine: GameEngine = request.app.state.engine
    session = await engine.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    session, msg = await engine.add_warroom_message(session_id, "SYSTEM", body.message, "system")
    await manager.broadcast(session_id, {
        "type": "warroom_message",
        "data": msg.model_dump(mode="json"),
    })
    return {"ok": True, "message_id": msg.id}


@router.post("/admin/{session_id}/force-evaluate")
async def admin_force_evaluate(session_id: str, request: Request):
    """Force-start evaluation even if not all players have submitted (facilitator unblock)."""
    from api.websocket_handler import manager, _start_evaluation
    from game_engine.evaluator import EscapeEvaluator
    from anthropic import AsyncAnthropic
    from config import settings

    engine: GameEngine = request.app.state.engine
    session = await engine.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    if not session.escape_submissions:
        raise HTTPException(status_code=400, detail="No escape submissions to evaluate")

    client = AsyncAnthropic(api_key=settings.anthropic_api_key)
    evaluator = EscapeEvaluator(client=client, scenario=request.app.state.scenario)
    await _start_evaluation(session_id, session, engine, evaluator)
    return {"ok": True, "message": "Evaluation started"}


@router.post("/admin/{session_id}/reset-evaluation")
async def admin_reset_evaluation(session_id: str, request: Request):
    """Cancel a stuck evaluation task and clear escape_result so players can re-submit."""
    from api.websocket_handler import manager

    engine: GameEngine = request.app.state.engine
    session = await engine.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    manager.cancel_eval_task(session_id)
    # Clear stored result + submissions so players can try again
    session = await engine.reset_escape(session_id)
    await manager.broadcast(session_id, {
        "type": "session_state",
        "data": session.model_dump(mode="json"),
    })
    return {"ok": True, "message": "Evaluation reset — players may re-submit"}
