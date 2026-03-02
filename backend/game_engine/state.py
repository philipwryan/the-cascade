from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime
import uuid


class PlayerState(BaseModel):
    persona: str
    joined: bool = False
    joined_at: Optional[datetime] = None
    files_opened: List[str] = Field(default_factory=list)
    clues_discovered: List[str] = Field(default_factory=list)
    last_activity: Optional[datetime] = None
    gate_answers: Dict[str, str] = Field(default_factory=dict)  # file_id → correct answer letter


class WarRoomMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    persona: str  # persona id, "COACH", or "SYSTEM"
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    message_type: str = "player"  # "player" | "coach_hint" | "system"


class EscapeSubmission(BaseModel):
    persona: str
    root_cause: str
    recommended_action: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)


class EscapeResult(BaseModel):
    success: bool
    score: int
    evaluation: str
    debrief: str
    evaluated_at: datetime = Field(default_factory=datetime.utcnow)


class GameSession(BaseModel):
    session_id: str
    status: str = "waiting"  # "waiting" | "active" | "escaped" | "failed"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    players: Dict[str, PlayerState] = Field(default_factory=dict)
    war_room: List[WarRoomMessage] = Field(default_factory=list)
    hints_fired: List[str] = Field(default_factory=list)
    escape_submissions: List[EscapeSubmission] = Field(default_factory=list)
    escape_result: Optional[EscapeResult] = None
    checkpoint_fired: bool = False
    checkpoint_responses: Dict[str, bool] = Field(default_factory=dict)  # persona → True if posted after checkpoint
    injections_fired: List[str] = Field(default_factory=list)
