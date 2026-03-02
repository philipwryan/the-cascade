'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { GameSession, GateQuestion, WarRoomMessage, WsEvent, EscapeResult } from './types';

const WS_BASE = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:8000';

interface GameState {
  session: GameSession | null;
  connected: boolean;
  evaluating: boolean;
  escapeResult: EscapeResult | null;
  recentClues: Array<{ persona: string; clue_id: string }>;
  submittedPersonas: string[];  // personas that have submitted escape
  pendingGate: GateQuestion | null; // gate question awaiting answer for current player
}

interface UseGameSocketReturn extends GameState {
  sendOpenFile: (fileId: string) => void;
  sendWarRoomMessage: (content: string) => void;
  sendRequestHint: () => void;
  sendEscapeSubmission: (rootCause: string, recommendedAction: string) => void;
  sendGateAnswer: (fileId: string, answer: string) => void;
}

export function useGameSocket(
  sessionId: string,
  persona: string
): UseGameSocketReturn {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectCount = useRef(0);
  const mountedRef = useRef(true);

  const [state, setState] = useState<GameState>({
    session: null,
    connected: false,
    evaluating: false,
    escapeResult: null,
    recentClues: [],
    submittedPersonas: [],
    pendingGate: null,
  });

  const handleEvent = useCallback((event: WsEvent) => {
    switch (event.type) {
      case 'session_state': {
        const subs = event.data.escape_submissions ?? [];
        const playerCount = Object.keys(event.data.players).length;
        setState(s => ({
          ...s,
          session: event.data,
          // Seed from session so reconnecting players see the correct count
          submittedPersonas: subs.map(sub => sub.persona),
          // Restore result if already evaluated
          escapeResult: event.data.escape_result ?? null,
          // If all players submitted but no result yet, preserve any in-flight evaluating flag
          evaluating: event.data.escape_result
            ? false
            : subs.length >= playerCount && playerCount > 0
              ? s.evaluating
              : false,
        }));
        break;
      }

      case 'player_joined':
        setState(s => {
          if (!s.session) return s;
          const updated = { ...s.session };
          if (updated.players[event.data.persona]) {
            updated.players = {
              ...updated.players,
              [event.data.persona]: {
                ...updated.players[event.data.persona],
                joined: true,
                joined_at: event.data.timestamp,
              },
            };
          }
          return { ...s, session: updated };
        });
        break;

      case 'file_opened':
        setState(s => {
          if (!s.session) return s;
          const player = s.session.players[event.data.persona];
          if (!player) return s;
          const files = player.files_opened.includes(event.data.file_id)
            ? player.files_opened
            : [...player.files_opened, event.data.file_id];
          return {
            ...s,
            session: {
              ...s.session,
              players: {
                ...s.session.players,
                [event.data.persona]: { ...player, files_opened: files },
              },
            },
          };
        });
        break;

      case 'clue_discovered':
        setState(s => ({
          ...s,
          recentClues: [
            { persona: event.data.persona, clue_id: event.data.clue_id },
            ...s.recentClues.slice(0, 9),
          ],
        }));
        break;

      case 'warroom_message':
        setState(s => {
          if (!s.session) return s;
          const msgs = s.session.war_room ?? [];
          const exists = msgs.some(m => m.id === event.data.id);
          if (exists) return s;
          // Mirror backend logic: when a player posts after checkpoint fires, mark
          // their checkpoint_response as received so the escape submit un-disables.
          const checkpoint_responses =
            s.session.checkpoint_fired && event.data.message_type === 'player'
              ? { ...s.session.checkpoint_responses, [event.data.persona]: true }
              : s.session.checkpoint_responses;
          return {
            ...s,
            session: {
              ...s.session,
              war_room: [...msgs, event.data],
              checkpoint_responses,
            },
          };
        });
        break;

      case 'escape_submitted':
        setState(s => ({
          ...s,
          submittedPersonas: s.submittedPersonas.includes(event.data.persona)
            ? s.submittedPersonas
            : [...s.submittedPersonas, event.data.persona],
        }));
        break;

      case 'evaluating':
        setState(s => ({ ...s, evaluating: true }));
        break;

      case 'escape_result':
        setState(s => ({
          ...s,
          evaluating: false,
          escapeResult: event.data,
          session: s.session
            ? { ...s.session, status: event.data.success ? 'escaped' : 'failed' }
            : null,
        }));
        break;

      // ── Gate question events ──────────────────────────────────────

      case 'gate_question':
        // A clue file was opened that has an unanswered gate — show the question
        setState(s => ({ ...s, pendingGate: event.data }));
        break;

      case 'gate_answer_result':
        if (event.data.correct) {
          // Gate passed — dismiss the overlay
          setState(s => ({ ...s, pendingGate: null }));
        } else {
          // Wrong answer — update hint in the pending gate (overlay stays open)
          setState(s => ({
            ...s,
            pendingGate: s.pendingGate
              ? { ...s.pendingGate, hint: event.data.hint }
              : null,
          }));
        }
        break;

      case 'checkpoint':
        // Update checkpoint_fired on the session so UI can react
        setState(s => ({
          ...s,
          session: s.session
            ? { ...s.session, checkpoint_fired: true }
            : null,
        }));
        break;

      case 'error':
        console.error('[ws]', event.data.message);
        // Belt-and-suspenders: if an error fires while evaluating, clear the spinner
        // so the UI doesn't stay stuck in "Evaluating…" forever.
        setState(s => s.evaluating ? { ...s, evaluating: false } : s);
        break;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    if (!sessionId || !persona) return;

    function connect() {
      if (!mountedRef.current) return;
      const url = `${WS_BASE}/ws/${sessionId}/${persona}`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!mountedRef.current) return;
        reconnectCount.current = 0;
        setState(s => ({ ...s, connected: true }));
      };

      ws.onclose = () => {
        if (!mountedRef.current) return;
        setState(s => ({ ...s, connected: false }));
        // Exponential backoff: 1s, 2s, 4s, 8s … max 20s
        const delay = Math.min(1000 * 2 ** reconnectCount.current, 20000);
        reconnectCount.current += 1;
        reconnectTimerRef.current = setTimeout(connect, delay);
      };

      ws.onerror = () => {
        ws.close(); // triggers onclose → reconnect
      };

      ws.onmessage = (evt) => {
        let event: WsEvent;
        try {
          event = JSON.parse(evt.data);
        } catch {
          return;
        }
        handleEvent(event);
      };
    }

    connect();

    return () => {
      mountedRef.current = false;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [sessionId, persona, handleEvent]);

  const send = useCallback((type: string, data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type, data }));
      return true;
    }
    return false;
  }, []);

  return {
    ...state,
    sendOpenFile: (fileId) => send('open_file', { file_id: fileId }),
    sendWarRoomMessage: (content) => send('warroom_message', { content }),
    sendRequestHint: () => send('request_hint', {}),
    sendEscapeSubmission: (rootCause, recommendedAction) =>
      send('submit_escape', { root_cause: rootCause, recommended_action: recommendedAction }),
    sendGateAnswer: (fileId, answer) =>
      send('answer_gate', { file_id: fileId, answer }),
  };
}
