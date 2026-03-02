'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';
import { useDojoProgress } from '@/lib/dojo/progress';
import { MODULES } from '@/lib/dojo/modules';
import BeltProgress from '@/components/dojo/BeltProgress';
import {
  BELT_COLORS,
  BELT_LABELS_EN,
  BELT_LABELS_JA,
  Belt,
} from '@/lib/dojo/types';

const BELT_ORDER: Belt[] = ['white', 'green', 'blue', 'black'];
const BELT_EMOJI: Record<Belt, string> = { white: '⬜', green: '🟩', blue: '🟦', black: '⬛' };

export default function GembaPage() {
  const router  = useRouter();
  const { lang, t, toggle } = useLang();
  const td      = getDojoT(lang);
  const {
    progress,
    loaded,
    isModuleUnlocked,
    isModuleCompleted,
    isStepCompleted,
  } = useDojoProgress();

  if (!loaded) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-xs text-gray-400">Loading…</div>
      </div>
    );
  }

  function handleModuleClick(moduleId: string, unlocked: boolean) {
    if (!unlocked) return;
    router.push(`/gemba/${moduleId}/step-1`);
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3">
        <button
          onClick={() => router.push('/')}
          className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← {lang === 'ja' ? 'ロビー' : 'Lobby'}
        </button>
        <div className="flex-1" />
        <button
          onClick={toggle}
          className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          {lang === 'ja' ? 'EN' : 'JA'}
        </button>
      </div>

      <div className="flex-1 max-w-xl mx-auto w-full px-4 py-6 space-y-6">

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-gray-900">
            {td('gembaTitle')}
          </h1>
          <p className="text-xs text-gray-500">{td('dojoSubtitle')}</p>
          <p className="text-[11px] text-gray-400 italic">{td('dojoTagline')}</p>
        </div>

        {/* Belt progress */}
        <BeltProgress belt={progress.belt} xp={progress.xp} />

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="panel p-3 text-center">
            <p className="text-lg font-bold text-gray-800">{progress.xp}</p>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider">{td('yourXP')}</p>
          </div>
          <div className="panel p-3 text-center">
            <p className="text-lg font-bold text-gray-800">{progress.modulesCompleted.length}</p>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider">
              {lang === 'ja' ? '完了モジュール' : 'Modules Done'}
            </p>
          </div>
          <div className="panel p-3 text-center">
            <p className="text-lg font-bold text-gray-800">{progress.streakDays}</p>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider">
              {lang === 'ja' ? '連続日数' : 'Day Streak'}
            </p>
          </div>
        </div>

        {/* Module grid by belt */}
        {BELT_ORDER.map(belt => {
          const beltModules = MODULES.filter(m => m.belt === belt);
          const beltUnlocked = isModuleUnlocked(belt);
          const beltLabel = lang === 'ja' ? BELT_LABELS_JA[belt] : BELT_LABELS_EN[belt];

          return (
            <div key={belt} className="space-y-2">
              {/* Belt section header */}
              <div className="flex items-center gap-2">
                <span className="text-base">{BELT_EMOJI[belt]}</span>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: belt === 'white' ? '#9ca3af' : BELT_COLORS[belt] }}
                >
                  {beltLabel}
                </span>
                {!beltUnlocked && (
                  <span className="text-[9px] text-gray-400 ml-auto">
                    {td('unlockAt')} {belt === 'green' ? '200' : belt === 'blue' ? '600' : '1400'} XP
                  </span>
                )}
                <div className="flex-1 h-px bg-gray-200 ml-1" />
              </div>

              {/* Module cards */}
              <div className="space-y-2">
                {beltModules.map(mod => {
                  const unlocked  = isModuleUnlocked(mod.belt);
                  const completed = isModuleCompleted(mod.id);
                  const stepsCompleted = mod.steps.filter(s =>
                    isStepCompleted(mod.id, s.id)
                  ).length;
                  const inProgress = stepsCompleted > 0 && !completed;
                  const title    = lang === 'ja' ? mod.titleJa    : mod.titleEn;
                  const subtitle = lang === 'ja' ? mod.subtitleJa : mod.subtitleEn;

                  return (
                    <button
                      key={mod.id}
                      onClick={() => handleModuleClick(mod.id, unlocked)}
                      disabled={!unlocked}
                      className={`w-full panel py-3 px-4 text-left flex items-center gap-3
                                  transition-colors
                                  ${unlocked
                                    ? 'hover:border-gray-300 cursor-pointer'
                                    : 'opacity-50 cursor-not-allowed'}`}
                    >
                      {/* Icon */}
                      <span className="text-xl shrink-0">{mod.icon}</span>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-800 truncate">{title}</span>
                          {completed && (
                            <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded shrink-0">
                              ✓
                            </span>
                          )}
                          {!unlocked && (
                            <span className="text-[9px] text-gray-400 shrink-0">🔒</span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500 leading-snug mt-0.5 truncate">{subtitle}</p>

                        {/* Step progress bar for in-progress modules */}
                        {inProgress && (
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${(stepsCompleted / mod.steps.length) * 100}%` }}
                              />
                            </div>
                            <span className="text-[9px] text-gray-400 shrink-0">
                              {stepsCompleted}/{mod.steps.length}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* XP badge + CTA */}
                      <div className="shrink-0 text-right">
                        <div className="text-[9px] text-gray-400">+{mod.xpReward} XP</div>
                        {unlocked && (
                          <div
                            className="text-[9px] font-semibold mt-1"
                            style={{ color: BELT_COLORS[mod.belt] === '#d4d4d4' ? '#00a651' : BELT_COLORS[mod.belt] }}
                          >
                            {completed
                              ? td('reviewModule')
                              : inProgress
                                ? td('continueModule')
                                : td('beginModule')}
                            {' →'}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-[9px] text-gray-300">
            {lang === 'ja'
              ? '大野耐一のチョークの輪から始まる道。'
              : 'Every master began in Ohno\'s chalk circle.'}
          </p>
        </div>
      </div>
    </div>
  );
}
