'use client';

import { GameSession } from '@/lib/types';
import { CLUE_META, CLUE_TYPE_ORDER, CLUE_TYPE_LABELS, ClueType } from '@/lib/clues';
import { useLang } from '@/lib/LanguageContext';

const PERSONA_SHORT: Record<string, string> = {
  supply_chain_manager: 'SCM',
  finance_analyst: 'FIN',
};

const TYPE_STYLE: Record<ClueType, { dot: string; label: string; header: string }> = {
  symptom:     { dot: 'bg-orange-400',  label: 'text-orange-600',  header: 'bg-orange-50' },
  elimination: { dot: 'bg-blue-400',    label: 'text-blue-600',    header: 'bg-blue-50' },
  causal:      { dot: 'bg-amber-400',   label: 'text-amber-700',   header: 'bg-amber-50' },
  mechanism:   { dot: 'bg-red-500',     label: 'text-red-600',     header: 'bg-red-50' },
  exposure:    { dot: 'bg-purple-400',  label: 'text-purple-600',  header: 'bg-purple-50' },
};

interface Props {
  session: GameSession | null;
  open: boolean;
  onClose: () => void;
  myPersona: string;
}

export default function CluesDrawer({ session, open, onClose, myPersona }: Props) {
  const { t } = useLang();

  // Map clue → which personas discovered it
  const discoveredBy: Record<string, string[]> = {};
  if (session) {
    for (const [persona, state] of Object.entries(session.players)) {
      for (const clueId of state.clues_discovered) {
        if (!discoveredBy[clueId]) discoveredBy[clueId] = [];
        discoveredBy[clueId].push(persona);
      }
    }
  }

  const totalDiscovered = Object.keys(discoveredBy).length;
  const totalClues = Object.keys(CLUE_META).length;
  const pct = Math.round((totalDiscovered / totalClues) * 100);

  if (!open) return null;

  return (
    /* Outer container is `relative` on the parent — drawer sits absolutely inside */
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/25 z-20 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 z-30 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="shrink-0 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-semibold text-gray-800">{t('cluesDiscovered')}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                {totalDiscovered} / {totalClues} {t('cluesProgress')}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 text-base leading-none transition-colors"
            >
              {t('close')}
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00a651] rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Clue list */}
        <div className="flex-1 overflow-y-auto">
          {CLUE_TYPE_ORDER.map(type => {
            const entries = Object.entries(CLUE_META).filter(([, m]) => m.type === type);
            const found = entries.filter(([id]) => discoveredBy[id]).length;
            const style = TYPE_STYLE[type];

            return (
              <div key={type}>
                {/* Section header */}
                <div className={`px-4 py-1.5 flex items-center justify-between ${style.header} border-b border-gray-100`}>
                  <span className={`text-[9px] uppercase tracking-widest font-bold ${style.label}`}>
                    {CLUE_TYPE_LABELS[type]}
                  </span>
                  <span className="text-[9px] text-gray-400">
                    {found}/{entries.length}
                  </span>
                </div>

                {/* Clues in this section */}
                <div className="divide-y divide-gray-50">
                  {entries.map(([id, meta]) => {
                    const finders = discoveredBy[id] ?? [];
                    const isFound = finders.length > 0;
                    const iMine = finders.includes(myPersona);

                    return (
                      <div
                        key={id}
                        className={`px-4 py-2.5 flex items-start gap-3 ${
                          isFound ? '' : 'opacity-40'
                        }`}
                      >
                        {/* Status dot */}
                        <div className={`mt-1 shrink-0 w-2 h-2 rounded-full ${
                          isFound ? style.dot : 'bg-gray-300'
                        }`} />

                        <div className="flex-1 min-w-0">
                          <div className={`text-[11px] leading-snug ${
                            isFound ? 'text-gray-800' : 'text-gray-400 italic'
                          }`}>
                            {isFound ? meta.label : t('notYetDiscovered')}
                          </div>

                          {/* Who found it */}
                          {isFound && (
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {finders.map(p => (
                                <span
                                  key={p}
                                  className={`text-[8px] px-1.5 py-0.5 rounded font-semibold ${
                                    p === myPersona
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-blue-100 text-blue-700'
                                  }`}
                                >
                                  {PERSONA_SHORT[p] ?? p}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="shrink-0 border-t border-gray-100 px-4 py-2 flex items-center gap-4 bg-gray-50">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a651] inline-block" />
            <span className="text-[9px] text-gray-500">You found</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            <span className="text-[9px] text-gray-500">Partner found</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
            <span className="text-[9px] text-gray-500">Undiscovered</span>
          </div>
        </div>
      </div>
    </>
  );
}
