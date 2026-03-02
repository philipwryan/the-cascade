import { FileContent, FileInfo, GameSession, ScenarioMeta } from './types';

// ── Admin response types ──────────────────────────────────────────────────────

export interface AdminSessionStatus {
  session: GameSession;
  connected_personas: string[];
  eval_running: boolean;
  hint_running: boolean;
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json();
}

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API POST ${path} → ${res.status}`);
  return res.json();
}

export const createSession = (): Promise<{ session_id: string }> =>
  post('/api/sessions');

export const getSession = (sessionId: string): Promise<GameSession> =>
  get(`/api/sessions/${sessionId}`);

export const getScenario = (): Promise<ScenarioMeta> =>
  get('/api/scenario');

export const listFiles = (sessionId: string, persona: string): Promise<{ files: FileInfo[] }> =>
  get(`/api/sessions/${sessionId}/files/${persona}`);

export const getFile = (sessionId: string, persona: string, fileId: string): Promise<FileContent> =>
  get(`/api/sessions/${sessionId}/files/${persona}/${fileId}`);

// ── Admin / Moderator API ─────────────────────────────────────────────────────

export const adminGetSession = (sessionId: string): Promise<AdminSessionStatus> =>
  get(`/api/admin/${sessionId}`);

export const adminInjectMessage = (sessionId: string, message: string): Promise<{ ok: boolean; message_id: string }> =>
  post(`/api/admin/${sessionId}/inject`, { message });

export const adminForceEvaluate = (sessionId: string): Promise<{ ok: boolean; message: string }> =>
  post(`/api/admin/${sessionId}/force-evaluate`);

export const adminResetEvaluation = (sessionId: string): Promise<{ ok: boolean; message: string }> =>
  post(`/api/admin/${sessionId}/reset-evaluation`);
