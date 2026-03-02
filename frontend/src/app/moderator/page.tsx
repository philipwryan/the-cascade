'use client';

import { ReactNode, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  AdminSessionStatus,
  adminGetSession,
  adminInjectMessage,
  adminForceEvaluate,
  adminResetEvaluation,
} from '@/lib/api';
import { WarRoomMessage } from '@/lib/types';
import { DILogo } from '@/components/DILogo';

const POLL_INTERVAL = 3000;

const PERSONA_LABELS: Record<string, string> = {
  supply_chain_manager: 'Supply Chain Manager',
  finance_analyst: 'Finance Analyst',
};

const CLUE_LABELS: Record<string, string> = {
  missed_deliveries: '3 consecutive missed deliveries from Apex',
  site_shutdown: 'Apex production floor confirmed idle',
  comms_blackout: 'Communication blackout — lender signal',
  no_alternate_supplier: 'No viable alternate supplier exists',
  production_exposure: '$11.5M/day production exposure confirmed',
  quality_ruled_out: 'Quality not the cause — zero PPM since August',
  logistics_ruled_out: 'Logistics disruption ruled out (Oct 15–18)',
  payment_terms_stress: 'Net-30→60 extension created $1.9M liquidity drain',
  ar_aging_deterioration: 'AR aging: avg payment slipped to 87 days',
  covenant_breach: 'Interest coverage below 2.5x — covenant breached',
  revolver_maxed: 'Revolver 98.5% utilized — near freeze',
  creditwatch_hold: 'Revolver HOLD placed Oct 27 → supply stopped Oct 28',
  steel_commodity_shock: 'Steel +23% Q4 — $370K EBITDA compression',
  working_capital_policy: 'CFO memo: terms extension removed $1.9M from Apex',
};

const TOTAL_CLUES = Object.keys(CLUE_LABELS).length;

function statusTag(status: string) {
  const map: Record<string, string> = {
    waiting: 'bg-amber-100 text-amber-700 border border-amber-300',
    active: 'bg-green-100 text-[#00a651] border border-green-300',
    escaped: 'bg-blue-100 text-blue-700 border border-blue-300',
    failed: 'bg-red-100 text-red-700 border border-red-300',
  };
  return (map[status] ?? 'bg-gray-100 text-gray-600 border border-gray-300') +
    ' px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide';
}

function ts(iso: string | null) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function elapsedSecs(from: string | null, now: number): string {
  if (!from) return '—';
  const secs = Math.floor((now - new Date(from).getTime()) / 1000);
  if (secs < 0) return '0m 0s';
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {
    // fallback
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  });
}

// ── War room message renderer ─────────────────────────────────────────────────

function WRMessage({ msg }: { msg: WarRoomMessage }) {
  const isSystem = msg.persona === 'SYSTEM' || msg.persona === 'COACH';
  return (
    <div className={`px-3 py-1.5 border-b border-gray-100 text-[11px] leading-relaxed ${
      isSystem ? 'bg-gray-50' : ''
    }`}>
      <span className={`font-semibold mr-2 ${
        msg.persona === 'COACH' ? 'text-amber-600' :
        msg.persona === 'SYSTEM' ? 'text-orange-600' :
        msg.persona === 'supply_chain_manager' ? 'text-blue-600' : 'text-purple-600'
      }`}>
        {msg.persona === 'COACH' ? '🤖 COACH' :
         msg.persona === 'SYSTEM' ? '⚡ SYSTEM' :
         PERSONA_LABELS[msg.persona] ?? msg.persona}
      </span>
      <span className="text-gray-700 whitespace-pre-wrap">{msg.content}</span>
      <span className="ml-2 text-gray-400 text-[9px]">{ts(msg.timestamp)}</span>
    </div>
  );
}

// ── Copy button ───────────────────────────────────────────────────────────────

function CopyBtn({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <button
      onClick={handleCopy}
      title={`Copy ${label ?? ''}`}
      className="text-[9px] text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-400 rounded px-1.5 py-0.5 transition-colors shrink-0"
    >
      {copied ? '✓' : '⎘'}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

function ModeratorContent() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get('session') ?? '';

  const [status, setStatus] = useState<AdminSessionStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());
  const [showDebrief, setShowDebrief] = useState(false);

  const [injectText, setInjectText] = useState('');
  const [injecting, setInjecting] = useState(false);
  const [forcing, setForcing] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Session switcher
  const [sessionInput, setSessionInput] = useState('');

  const warRoomRef = useRef<HTMLDivElement>(null);

  const refresh = useCallback(async () => {
    if (!sessionId) return;
    try {
      const data = await adminGetSession(sessionId);
      setStatus(data);
      setError(null);
      setLastRefresh(new Date());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load session');
    }
  }, [sessionId]);

  // Auto-poll
  useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [refresh]);

  // Live clock for elapsed timer
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll war room
  useEffect(() => {
    if (warRoomRef.current) {
      warRoomRef.current.scrollTop = warRoomRef.current.scrollHeight;
    }
  }, [status?.session.war_room.length]);

  function showAction(msg: string) {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(null), 4000);
  }

  async function handleInject() {
    if (!injectText.trim() || injecting) return;
    setInjecting(true);
    try {
      await adminInjectMessage(sessionId, injectText.trim());
      setInjectText('');
      showAction('✅ Message injected into War Room');
      await refresh();
    } catch (e: unknown) {
      showAction(`❌ ${e instanceof Error ? e.message : 'Inject failed'}`);
    } finally {
      setInjecting(false);
    }
  }

  async function handleForceEval() {
    if (forcing) return;
    setForcing(true);
    try {
      const r = await adminForceEvaluate(sessionId);
      showAction(`✅ ${r.message}`);
    } catch (e: unknown) {
      showAction(`❌ ${e instanceof Error ? e.message : 'Force eval failed'}`);
    } finally {
      setForcing(false);
    }
  }

  async function handleReset() {
    if (resetting) return;
    setResetting(true);
    try {
      const r = await adminResetEvaluation(sessionId);
      showAction(`✅ ${r.message}`);
      await refresh();
    } catch (e: unknown) {
      showAction(`❌ ${e instanceof Error ? e.message : 'Reset failed'}`);
    } finally {
      setResetting(false);
    }
  }

  function handleSessionSwitch(e: React.FormEvent) {
    e.preventDefault();
    const id = sessionInput.trim().toUpperCase();
    if (id) {
      router.push(`/moderator?session=${id}`);
      setSessionInput('');
    }
  }

  if (!sessionId) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[var(--bg)] gap-4">
        <p className="text-gray-500 text-sm">Enter a session ID to monitor:</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const id = sessionInput.trim().toUpperCase();
            if (id) router.push(`/moderator?session=${id}`);
          }}
          className="flex gap-2"
        >
          <input
            value={sessionInput}
            onChange={e => setSessionInput(e.target.value)}
            placeholder="SESSION ID (e.g. AB12CD34)"
            className="border border-gray-300 rounded px-3 py-1.5 text-sm font-mono w-56 focus:outline-none focus:border-gray-500"
          />
          <button type="submit" className="px-3 py-1.5 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors">
            Open →
          </button>
        </form>
        <a href="/" className="text-xs text-gray-400 hover:text-gray-600">← New session</a>
      </div>
    );
  }

  const session = status?.session;
  const allClues = session
    ? Object.values(session.players).flatMap(p => p.clues_discovered)
    : [];
  const uniqueClues = [...new Set(allClues)];
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[var(--bg)]">
      {/* Header */}
      <header className="shrink-0 h-10 border-b border-gray-900 bg-black px-4 flex items-center gap-3">
        <DILogo size={22} />
        <span className="text-xs font-bold text-white tracking-tight">APEX MELTDOWN</span>
        <span className="text-gray-600 text-xs">|</span>
        <span className="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">Moderator Panel</span>
        <span className="text-gray-600 text-xs">|</span>
        <span className="font-mono text-xs text-gray-400 flex items-center gap-1.5">
          SESSION <span className="text-gray-200">{sessionId}</span>
          <CopyBtn text={sessionId} label="session ID" />
        </span>
        {session && <span className={statusTag(session.status)}>{session.status}</span>}

        {/* Session switcher */}
        <form onSubmit={handleSessionSwitch} className="ml-3 flex items-center gap-1.5">
          <input
            value={sessionInput}
            onChange={e => setSessionInput(e.target.value)}
            placeholder="Switch session…"
            className="bg-gray-900 border border-gray-700 rounded px-2 py-0.5 text-[10px] font-mono text-gray-300 placeholder-gray-600 w-36 focus:outline-none focus:border-gray-500"
          />
          <button
            type="submit"
            className="text-[10px] text-gray-400 hover:text-white border border-gray-700 px-2 py-0.5 rounded transition-colors"
          >
            →
          </button>
        </form>

        <div className="ml-auto flex items-center gap-3">
          {lastRefresh && (
            <span className="text-[10px] text-gray-500">
              {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={refresh}
            className="text-[10px] text-gray-400 hover:text-white border border-gray-600 px-2 py-0.5 rounded transition-colors"
          >
            ↺ Refresh
          </button>
          <span className="text-gray-700 text-xs">|</span>
          <button
            onClick={() => router.push('/')}
            className="text-[10px] text-gray-500 hover:text-white transition-colors"
            title="Return to lobby"
          >
            ↩ New Session
          </button>
        </div>
      </header>

      {/* Action feedback */}
      {actionMsg && (
        <div className="shrink-0 px-4 py-1.5 bg-gray-100 border-b border-gray-200 text-xs text-gray-700">
          {actionMsg}
        </div>
      )}

      {error && (
        <div className="shrink-0 px-4 py-1.5 bg-red-50 border-b border-red-200 text-xs text-red-600">
          ⚠ {error} — retrying…
        </div>
      )}

      {!session ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-xs animate-pulse">
          Loading session…
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* Left column: session + players + clues */}
          <div className="w-72 shrink-0 border-r border-gray-200 overflow-y-auto flex flex-col gap-0">

            {/* Session info */}
            <section className="border-b border-gray-200 px-3 py-3">
              <h2 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Session</h2>
              <div className="space-y-1 text-[11px]">
                <Row label="Status" value={<span className={statusTag(session.status)}>{session.status}</span>} />
                <Row label="Created" value={ts(session.created_at)} />
                <Row label="Started" value={ts(session.started_at)} />
                <Row
                  label="Elapsed"
                  value={session.started_at && !session.ended_at
                    ? <span className="text-green-700 font-mono">{elapsedSecs(session.started_at, now)}</span>
                    : session.started_at && session.ended_at
                      ? elapsedSecs(session.started_at, new Date(session.ended_at).getTime())
                      : '—'
                  }
                />
                <Row label="Ended" value={ts(session.ended_at)} />
                <Row
                  label="Connected"
                  value={
                    status!.connected_personas.length > 0
                      ? status!.connected_personas.map(p => PERSONA_LABELS[p] ?? p).join(', ')
                      : <span className="text-gray-400">none</span>
                  }
                />
              </div>
            </section>

            {/* Progress overview */}
            <section className="border-b border-gray-200 px-3 py-3">
              <h2 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Progress</h2>
              <div className="space-y-1 text-[11px]">
                <Row label="Clues found" value={`${uniqueClues.length} / ${TOTAL_CLUES}`} />
                <Row label="Submissions" value={`${session.escape_submissions.length} / ${Object.keys(session.players).length}`} />
                <Row
                  label="Hint loop"
                  value={
                    status!.hint_running
                      ? <span style={{ color: '#00a651' }}>● Running</span>
                      : <span className="text-gray-400">○ Idle</span>
                  }
                />
                <Row
                  label="Evaluation"
                  value={
                    status!.eval_running
                      ? <span className="text-amber-600 animate-pulse">● Running</span>
                      : <span className="text-gray-400">○ Idle</span>
                  }
                />
                <Row label="Checkpoint" value={session.checkpoint_fired ? '✅ Fired' : '⏳ Pending'} />
              </div>
            </section>

            {/* Players */}
            {Object.values(session.players).map(player => (
              <section key={player.persona} className="border-b border-gray-200 px-3 py-3">
                <h2 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                  {PERSONA_LABELS[player.persona] ?? player.persona}
                  {status!.connected_personas.includes(player.persona)
                    ? <span className="ml-2" style={{ color: '#00a651' }}>●</span>
                    : <span className="ml-2 text-gray-300">○</span>
                  }
                </h2>
                <div className="space-y-1 text-[11px]">
                  <Row label="Joined" value={player.joined ? ts(player.joined_at) : <span className="text-gray-400">Not joined</span>} />
                  <Row label="Last activity" value={ts(player.last_activity)} />
                  <Row label="Files opened" value={player.files_opened.length.toString()} />
                  <Row label="Clues found" value={player.clues_discovered.length.toString()} />
                  <Row label="Gates answered" value={Object.keys(player.gate_answers).length.toString()} />
                  <Row
                    label="Checkpoint"
                    value={session.checkpoint_fired
                      ? (session.checkpoint_responses[player.persona] ? '✅ Responded' : '⏳ Pending')
                      : '—'}
                  />
                  <Row
                    label="Submitted"
                    value={session.escape_submissions.some(s => s.persona === player.persona)
                      ? '✅ Yes'
                      : <span className="text-gray-400">No</span>}
                  />
                </div>
              </section>
            ))}

            {/* Clues discovered */}
            <section className="px-3 py-3">
              <h2 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                Clues Discovered ({uniqueClues.length}/{TOTAL_CLUES})
              </h2>
              {uniqueClues.length === 0 ? (
                <p className="text-[11px] text-gray-400">None yet</p>
              ) : (
                <ul className="space-y-1">
                  {uniqueClues.map(c => (
                    <li key={c} className="text-[11px] text-gray-700">
                      <span className="mr-1" style={{ color: '#00a651' }}>✓</span>
                      {CLUE_LABELS[c] ?? c}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Center column: war room + escape submissions + result */}
          <div className="flex-1 min-w-0 flex flex-col overflow-hidden border-r border-gray-200">

            {/* War room header */}
            <div className="shrink-0 px-3 py-2 border-b border-gray-200 bg-gray-50">
              <h2 className="text-[10px] uppercase tracking-widest text-gray-500">
                War Room ({session.war_room.length} messages)
              </h2>
            </div>

            {/* War room messages */}
            <div ref={warRoomRef} className="flex-1 overflow-y-auto">
              {session.war_room.length === 0 ? (
                <p className="px-3 py-4 text-[11px] text-gray-400">No messages yet.</p>
              ) : (
                session.war_room.map(msg => <WRMessage key={msg.id} msg={msg} />)
              )}
            </div>

            {/* Escape submissions */}
            {session.escape_submissions.length > 0 && (
              <div className="shrink-0 border-t border-gray-200 max-h-52 overflow-y-auto">
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 sticky top-0">
                  <h2 className="text-[10px] uppercase tracking-widest text-gray-500">
                    Escape Submissions ({session.escape_submissions.length})
                  </h2>
                </div>
                {session.escape_submissions.map(sub => (
                  <div key={sub.persona} className="px-3 py-2 border-b border-gray-100">
                    <div className="text-[10px] font-semibold text-gray-500 mb-1">
                      {PERSONA_LABELS[sub.persona] ?? sub.persona}
                      <span className="ml-2 text-gray-400 font-normal">{ts(sub.submitted_at)}</span>
                    </div>
                    <p className="text-[11px] text-gray-700 mb-1">
                      <span className="text-gray-500">Root cause: </span>{sub.root_cause}
                    </p>
                    <p className="text-[11px] text-gray-700">
                      <span className="text-gray-500">Action: </span>{sub.recommended_action}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Escape result */}
            {session.escape_result && (
              <div className={`shrink-0 border-t-2 ${
                session.escape_result.success ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'
              }`}>
                {/* Result header */}
                <div className="px-3 py-2 flex items-center gap-3">
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${
                    session.escape_result.success ? 'text-[#00a651]' : 'text-red-600'
                  }`}>
                    {session.escape_result.success ? '✅ Escaped' : '❌ Failed'}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-700 bg-white border border-gray-200 rounded px-2 py-0.5">
                    Score: {session.escape_result.score}/100
                  </span>
                  <button
                    onClick={() => setShowDebrief(v => !v)}
                    className="ml-auto text-[10px] text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 rounded px-2 py-0.5 transition-colors"
                  >
                    {showDebrief ? 'Hide Debrief ▲' : 'View Full Debrief ▼'}
                  </button>
                </div>
                {/* Evaluation summary */}
                <p className="px-3 pb-2 text-[11px] text-gray-700 leading-relaxed">
                  {session.escape_result.evaluation}
                </p>
                {/* Full debrief */}
                {showDebrief && session.escape_result.debrief && (
                  <div className="border-t border-gray-200 bg-white px-4 py-3 max-h-96 overflow-y-auto
                                  prose prose-xs max-w-none text-gray-700
                                  [&_h2]:text-xs [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-4 [&_h2]:mb-1
                                  [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:text-gray-700 [&_h3]:mt-3 [&_h3]:mb-1
                                  [&_p]:text-xs [&_p]:leading-relaxed [&_p]:mb-2
                                  [&_ul]:text-xs [&_ul]:pl-4 [&_ul]:mb-2 [&_ul]:space-y-0.5
                                  [&_ol]:text-xs [&_ol]:pl-4 [&_ol]:mb-2
                                  [&_li]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-gray-800
                                  [&_table]:text-xs [&_table]:border-collapse [&_table]:w-full
                                  [&_th]:border [&_th]:border-gray-300 [&_th]:px-2 [&_th]:py-1 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-left
                                  [&_td]:border [&_td]:border-gray-200 [&_td]:px-2 [&_td]:py-1
                                  [&_hr]:border-gray-200 [&_hr]:my-3
                                  [&_code]:text-xs [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {session.escape_result.debrief}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right column: admin actions */}
          <div className="w-64 shrink-0 overflow-y-auto flex flex-col gap-0">

            {/* Inject message */}
            <section className="border-b border-gray-200 px-3 py-3">
              <h2 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Inject War Room Message</h2>
              <textarea
                value={injectText}
                onChange={e => setInjectText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleInject(); }}
                placeholder="Type a SYSTEM message to inject… (⌘↵ to send)"
                rows={4}
                className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-[11px] text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:border-gray-400"
              />
              <button
                onClick={handleInject}
                disabled={!injectText.trim() || injecting}
                className="mt-2 w-full py-1.5 text-[11px] font-medium rounded border border-orange-600 text-orange-700
                           hover:bg-orange-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {injecting ? 'Injecting…' : '⚡ Inject Message'}
              </button>
            </section>

            {/* Force evaluate */}
            <section className="border-b border-gray-200 px-3 py-3">
              <h2 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Force Evaluation</h2>
              <p className="text-[11px] text-gray-500 mb-2 leading-relaxed">
                Trigger evaluation even if not all players submitted. Use when a player is stuck.
              </p>
              <button
                onClick={handleForceEval}
                disabled={forcing || status!.eval_running || session.escape_submissions.length === 0}
                className="w-full py-1.5 text-[11px] font-medium rounded border border-amber-600 text-amber-700
                           hover:bg-amber-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {forcing ? 'Starting…' : status!.eval_running ? '⏳ Evaluating…' : '▶ Force Evaluate'}
              </button>
            </section>

            {/* Reset evaluation */}
            <section className="border-b border-gray-200 px-3 py-3">
              <h2 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Reset Evaluation</h2>
              <p className="text-[11px] text-gray-500 mb-2 leading-relaxed">
                Cancel stuck eval task and clear submissions. Players can re-submit from scratch.
              </p>
              <button
                onClick={handleReset}
                disabled={resetting || (!status!.eval_running && session.escape_submissions.length === 0 && !session.escape_result)}
                className="w-full py-1.5 text-[11px] font-medium rounded border border-red-600 text-red-700
                           hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {resetting ? 'Resetting…' : '↺ Reset Submissions'}
              </button>
            </section>

            {/* Quick links */}
            <section className="px-3 py-3">
              <h2 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Player Links</h2>
              <div className="space-y-2">
                {Object.keys(PERSONA_LABELS).map(persona => {
                  const url = `${baseUrl}/game?session=${sessionId}&persona=${persona}`;
                  const player = session.players[persona];
                  const connected = status!.connected_personas.includes(persona);
                  return (
                    <div key={persona} className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-[11px] flex-1 truncate transition-colors ${
                          persona === 'supply_chain_manager' ? 'text-blue-600 hover:text-blue-700' : 'text-purple-600 hover:text-purple-700'
                        }`}
                      >
                        {PERSONA_LABELS[persona]} ↗
                      </a>
                      <CopyBtn text={url} label={`${PERSONA_LABELS[persona]} link`} />
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 mb-1.5">Moderator panel for this session:</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-500 font-mono truncate flex-1">/moderator?session={sessionId}</span>
                  <CopyBtn text={`${baseUrl}/moderator?session=${sessionId}`} label="moderator link" />
                </div>
              </div>
            </section>
          </div>

        </div>
      )}
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-500 shrink-0">{label}</span>
      <span className="text-gray-700 text-right">{value}</span>
    </div>
  );
}

// ── Page export ───────────────────────────────────────────────────────────────

export default function ModeratorPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-[var(--bg)]">
          <div className="text-xs text-gray-500 animate-pulse">Loading moderator panel…</div>
        </div>
      }
    >
      <ModeratorContent />
    </Suspense>
  );
}
