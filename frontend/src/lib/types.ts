export type PersonaId = 'supply_chain_manager' | 'finance_analyst';
export type GameStatus = 'waiting' | 'active' | 'escaped' | 'failed';
export type MessageType = 'player' | 'coach_hint' | 'system';

// Gate question shown when player opens a clue file
export interface GateQuestion {
  file_id: string;
  question: string;
  options: string[];    // ["A) ...", "B) ...", "C) ...", "D) ..."]
  hint: string | null;  // null initially; populated after a wrong answer
}

export interface PlayerState {
  persona: string;
  joined: boolean;
  joined_at: string | null;
  files_opened: string[];
  clues_discovered: string[];
  last_activity: string | null;
  gate_answers: Record<string, string>; // file_id → answer letter (only correct answers)
}

export interface WarRoomMessage {
  id: string;
  persona: string;
  content: string;
  timestamp: string;
  message_type: MessageType;
}

export interface EscapeSubmission {
  persona: string;
  root_cause: string;
  recommended_action: string;
  submitted_at: string;
}

export interface EscapeResult {
  success: boolean;
  score: number;
  evaluation: string;
  debrief: string;
  evaluated_at: string;
}

export interface GameSession {
  session_id: string;
  status: GameStatus;
  created_at: string;
  started_at: string | null;
  ended_at: string | null;
  players: Record<string, PlayerState>;
  war_room: WarRoomMessage[];
  hints_fired: string[];
  escape_submissions: EscapeSubmission[];
  escape_result: EscapeResult | null;
  checkpoint_fired: boolean;
  checkpoint_responses: Record<string, boolean>; // persona → true if posted after checkpoint
  injections_fired: string[];
}

export interface FileInfo {
  id: string;
  name: string;
  type: string;
  folder: string;
  modified: string;
}

export interface FileContent {
  id: string;
  name: string;
  type: string;
  content: string;
}

export interface ScenarioPersona {
  name: string;
  title: string;
  description: string;
  briefing: string;
}

export interface ScenarioMeta {
  title: string;
  description: string;
  crisis_briefing: string;
  personas: Record<string, ScenarioPersona>;
}

// WebSocket event union
export type WsEvent =
  | { type: 'session_state'; data: GameSession }
  | { type: 'player_joined'; data: { persona: string; timestamp: string } }
  | { type: 'file_opened'; data: { persona: string; file_id: string; timestamp: string } }
  | { type: 'clue_discovered'; data: { persona: string; clue_id: string; timestamp: string } }
  | { type: 'warroom_message'; data: WarRoomMessage }
  | { type: 'escape_submitted'; data: { persona: string; timestamp: string } }
  | { type: 'evaluating'; data: { message: string } }
  | { type: 'escape_result'; data: EscapeResult }
  | { type: 'gate_question'; data: GateQuestion }
  | { type: 'gate_answer_result'; data: { file_id: string; correct: boolean; hint: string | null } }
  | { type: 'checkpoint'; data: { message: string } }
  | { type: 'error'; data: { message: string } };
