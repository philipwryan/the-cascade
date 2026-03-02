'use client';

import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';
import {
  Belt,
  BELT_XP_THRESHOLDS,
  BELT_COLORS,
  BELT_LABELS_EN,
  BELT_LABELS_JA,
} from '@/lib/dojo/types';

interface Props {
  belt: Belt;
  xp: number;
  compact?: boolean;  // smaller variant for sidebars / headers
}

const BELT_ORDER: Belt[] = ['white', 'green', 'blue', 'black'];

function xpProgressPct(xp: number, belt: Belt): number {
  const idx = BELT_ORDER.indexOf(belt);
  if (idx === BELT_ORDER.length - 1) return 100;
  const lo = BELT_XP_THRESHOLDS[belt];
  const hi = BELT_XP_THRESHOLDS[BELT_ORDER[idx + 1]];
  return Math.min(100, Math.round(((xp - lo) / (hi - lo)) * 100));
}

function xpToNext(xp: number, belt: Belt): number {
  const idx = BELT_ORDER.indexOf(belt);
  if (idx === BELT_ORDER.length - 1) return 0;
  return BELT_XP_THRESHOLDS[BELT_ORDER[idx + 1]] - xp;
}

const BELT_ICONS: Record<Belt, string> = {
  white: '⬜',
  green: '🟩',
  blue:  '🟦',
  black: '⬛',
};

export default function BeltProgress({ belt, xp, compact = false }: Props) {
  const { lang } = useLang();
  const td = getDojoT(lang);

  const pct     = xpProgressPct(xp, belt);
  const toNext  = xpToNext(xp, belt);
  const label   = lang === 'ja' ? BELT_LABELS_JA[belt] : BELT_LABELS_EN[belt];
  const color   = BELT_COLORS[belt];
  const isBlack = belt === 'black';

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div
          className="w-5 h-5 rounded-sm border border-gray-200 shrink-0"
          style={{ backgroundColor: color }}
          title={label}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-semibold text-gray-700">{label}</span>
            <span className="text-[10px] text-gray-500">{xp} {td('xpLabel')}</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: color }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel p-4">
      {/* Belt row */}
      <div className="flex items-center gap-3 mb-4">
        {/* Belt sash visual */}
        <div className="relative w-12 h-8 rounded shrink-0 overflow-hidden border border-gray-200">
          <div className="absolute inset-0" style={{ backgroundColor: color }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg">{BELT_ICONS[belt]}</span>
          </div>
        </div>

        <div>
          <div className="text-sm font-bold text-gray-900">{label}</div>
          <div className="text-xs text-gray-500">
            {xp} {td('totalXP')}
            {!isBlack && (
              <span className="ml-1.5 text-[10px] text-gray-400">
                ({toNext} {td('toNextBelt')})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* XP Bar */}
      {!isBlack && (
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            {BELT_ORDER.map((b, i) => {
              const isCurrent = b === belt;
              return (
                <span
                  key={b}
                  className={isCurrent ? 'font-semibold text-gray-700' : ''}
                >
                  {lang === 'ja' ? BELT_LABELS_JA[b] : BELT_LABELS_EN[b]}
                </span>
              );
            })}
          </div>
          {/* Multi-segment bar */}
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
            {BELT_ORDER.slice(0, -1).map((b, i) => {
              const threshold = BELT_XP_THRESHOLDS[BELT_ORDER[i + 1]];
              const segWidth = threshold / BELT_XP_THRESHOLDS.black;
              const filled = Math.min(1, xp / threshold);
              return (
                <div
                  key={b}
                  className="relative overflow-hidden"
                  style={{ width: `${segWidth * 100}%`, borderRight: '1px solid #e5e7eb' }}
                >
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${filled * 100}%`,
                      backgroundColor: BELT_COLORS[BELT_ORDER[i + 1]],
                      opacity: 0.85,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isBlack && (
        <div className="text-[11px] text-gray-500 italic">
          {lang === 'ja' ? '黒帯達成。道は終わらない。' : 'Black Belt attained. The path never ends.'}
        </div>
      )}

      {/* Belt steps */}
      <div className="flex items-center gap-1 mt-1">
        {BELT_ORDER.map((b, i) => {
          const earned = BELT_ORDER.indexOf(belt) >= i;
          const isCurrent = b === belt;
          return (
            <div key={b} className="flex items-center gap-1">
              <div
                className={`w-4 h-4 rounded-sm border text-[8px] flex items-center justify-center transition-all ${
                  earned
                    ? 'border-transparent'
                    : 'border-gray-200 bg-gray-50'
                } ${isCurrent ? 'ring-2 ring-offset-1' : ''}`}
                style={{
                  backgroundColor: earned ? BELT_COLORS[b] : undefined,
                  ringColor: isCurrent ? BELT_COLORS[b] : undefined,
                }}
              >
                {earned && <span className="text-white text-[7px]">✓</span>}
              </div>
              {i < BELT_ORDER.length - 1 && (
                <div className={`w-4 h-0.5 rounded ${earned ? 'bg-gray-300' : 'bg-gray-100'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
