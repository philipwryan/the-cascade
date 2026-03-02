'use client';

import { useEffect, useRef } from 'react';
import { GameSession } from '@/lib/types';
import { useLang } from '@/lib/LanguageContext';

interface Props {
  session: GameSession | null;
  connected: boolean;
  evaluating: boolean;
  myPersona: string;
}

const PERSONA_LABELS: Record<string, string> = {
  supply_chain_manager: 'Supply Chain Mgr',
  finance_analyst: 'Finance Analyst',
};

export default function CoachPanel({ session, connected, evaluating, myPersona }: Props) {
  const { t } = useLang();
  const timerRef = useRef<HTMLSpanElement>(null);

  // Countdown timer — 60 min from game start
  useEffect(() => {
    if (!session?.started_at) return;
    const start = new Date(session.started_at).getTime();
    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(0, 3600 - elapsed);
      const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
      const ss = String(remaining % 60).padStart(2, '0');
      if (timerRef.current) {
        timerRef.current.textContent = `${mm}:${ss}`;
        timerRef.current.style.color = remaining <= 300 ? '#dc2626' : '';
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [session?.started_at]);

  const status = session?.status ?? 'waiting';

  function statusLabel(s: string): string {
    if (s === 'waiting') return t('statusWaiting');
    if (s === 'active')  return t('statusActive');
    if (s === 'escaped') return t('statusEscaped');
    if (s === 'failed')  return t('statusFailed');
    return s.toUpperCase();
  }

  const statusColors: Record<string, string> = {
    waiting: 'text-amber-600',
    active:  'text-[#00a651]',
    escaped: 'text-[#00a651]',
    failed:  'text-red-600',
  };

  const players = session ? Object.entries(session.players) : [];
  const myState = session?.players[myPersona];
  const cluesFound = session
    ? Object.values(session.players)
        .flatMap(p => p.clues_discovered)
        .filter((v, i, a) => a.indexOf(v) === i)
    : [];

  const hints = session?.hints_fired ?? [];

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-200 shrink-0 bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            {t('statusHeader')}
          </span>
          <span className={`text-xs font-bold ${statusColors[status] ?? 'text-gray-500'}`}>
            {statusLabel(status)}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* Timer */}
        {session?.started_at && (
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="text-xs text-gray-500 mb-1">{t('timeRemaining')}</div>
            <div className="font-mono text-2xl text-gray-900">
              <span ref={timerRef}>60:00</span>
            </div>
            <div className="text-[10px] text-red-500 mt-0.5 animate-pulse-slow">
              {t('lineStoppage')}
            </div>
          </div>
        )}

        {/* Connection status */}
        <div className="px-4 py-2 border-b border-gray-200 flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-[#00a651]' : 'bg-red-500'}`}
          />
          <span className="text-[11px] text-gray-500">
            {connected ? t('connected') : t('disconnected')}
          </span>
          {evaluating && (
            <span className="ml-auto text-[11px] text-amber-600 animate-pulse">
              {t('evaluating')}
            </span>
          )}
        </div>

        {/* Players */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="text-[11px] text-gray-500 uppercase tracking-wider mb-2">
            {t('playersHeader')}
          </div>
          {players.length === 0 ? (
            <div className="text-xs text-gray-400">{t('waitingForPlayers')}</div>
          ) : (
            <div className="space-y-2">
              {players.map(([persona, state]) => (
                <div key={persona} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        persona === myPersona ? 'bg-blue-500' : 'bg-purple-500'
                      }`}
                    />
                    <span className="text-xs text-gray-700">
                      {PERSONA_LABELS[persona] ?? persona}
                      {persona === myPersona && (
                        <span className="text-gray-400 text-[10px] ml-1">{t('youLabel')}</span>
                      )}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {state.files_opened.length} {t('filesUnit')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My progress */}
        {myState && (
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="text-[11px] text-gray-500 uppercase tracking-wider mb-2">
              {t('myProgress')}
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{t('filesOpened')}</span>
                <span className="text-gray-700">{myState.files_opened.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{t('cluesFoundMine')}</span>
                <span className="text-gray-700">{myState.clues_discovered.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{t('teamCluesTotal')}</span>
                <span className="font-medium text-[#00a651]">{cluesFound.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* Advisor hints */}
        <div className="px-4 py-3">
          <div className="text-[11px] text-gray-500 uppercase tracking-wider mb-2">
            {t('advisorHints')}
            {hints.length > 0 && (
              <span className="text-amber-600 font-normal ml-1">({hints.length})</span>
            )}
          </div>
          {hints.length === 0 ? (
            <div className="text-xs text-gray-400">{t('noHintsYet')}</div>
          ) : (
            <div className="space-y-2">
              {hints.map((hint, i) => (
                <div
                  key={i}
                  className="bg-amber-50 border border-amber-200 rounded p-2 text-[11px] text-amber-700 leading-relaxed"
                >
                  {hint}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
