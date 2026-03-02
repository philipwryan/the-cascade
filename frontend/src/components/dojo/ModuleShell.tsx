'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';
import { ModuleDef, StepDef, StepType, BELT_COLORS } from '@/lib/dojo/types';

interface Props {
  module: ModuleDef;
  step: StepDef;
  stepIndex: number;                          // 0-based
  isStepDone: boolean;
  onComplete: () => void;                     // called when user marks step done
  children: React.ReactNode;
}

const TYPE_ICONS: Record<StepType, string> = {
  observation: '👁',
  simulation:  '⚡',
  quiz:        '❓',
  builder:     '🔧',
  drill:       '🔄',
  reflection:  '📝',
};

export default function ModuleShell({
  module,
  step,
  stepIndex,
  isStepDone,
  onComplete,
  children,
}: Props) {
  const { lang } = useLang();
  const td = getDojoT(lang);
  const router = useRouter();

  const totalSteps = module.steps.length;
  const isLastStep = stepIndex === totalSteps - 1;
  const beltColor  = BELT_COLORS[module.belt];
  const stepTitle  = lang === 'ja' ? step.titleJa : step.titleEn;
  const modTitle   = lang === 'ja' ? module.titleJa : module.titleEn;

  function handleNext() {
    if (isLastStep) {
      router.push('/gemba');
    } else {
      const nextStep = module.steps[stepIndex + 1];
      router.push(`/gemba/${module.id}/${nextStep.id}`);
    }
  }

  function handlePrev() {
    if (stepIndex === 0) {
      router.push('/gemba');
    } else {
      const prevStep = module.steps[stepIndex - 1];
      router.push(`/gemba/${module.id}/${prevStep.id}`);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center gap-2">

          {/* Breadcrumb: Lobby › Gemba › Module */}
          <Link
            href="/"
            className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            {lang === 'ja' ? 'ロビー' : 'Lobby'}
          </Link>
          <span className="text-gray-300 text-[10px]">›</span>
          <Link
            href="/gemba"
            className="text-[10px] text-gray-500 hover:text-gray-800 transition-colors shrink-0"
          >
            {td('backToGemba')}
          </Link>
          <span className="text-gray-300 text-[10px]">›</span>

          {/* Module title with belt color accent */}
          <div className="flex items-center gap-1.5 min-w-0">
            <div
              className="w-1.5 h-4 rounded-full shrink-0"
              style={{ backgroundColor: beltColor }}
            />
            <span className="text-[10px] font-semibold text-gray-700 truncate">{modTitle}</span>
          </div>

          <div className="ml-auto flex items-center gap-3 shrink-0">
            {/* Step type badge */}
            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {TYPE_ICONS[step.type]}&nbsp;
              {td(`type${step.type.charAt(0).toUpperCase() + step.type.slice(1)}` as Parameters<typeof td>[0])}
            </span>
            {/* ~Time */}
            <span className="text-[10px] text-gray-400">~{step.durationMin} min</span>
          </div>
        </div>
      </header>

      {/* ── Step progress strip ──────────────────────────────────────────── */}
      <div className="shrink-0 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-2">
          <span className="text-[10px] text-gray-400 shrink-0">
            {td('stepLabel')} {stepIndex + 1} {td('ofLabel')} {totalSteps}
          </span>
          <div className="flex-1 flex gap-1">
            {module.steps.map((s, i) => (
              <Link key={s.id} href={`/gemba/${module.id}/${s.id}`} className="flex-1 group">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i < stepIndex
                      ? 'bg-green-500'
                      : i === stepIndex
                      ? 'opacity-100'
                      : 'bg-gray-200'
                  }`}
                  style={i === stepIndex ? { backgroundColor: beltColor } : undefined}
                />
              </Link>
            ))}
          </div>
          <span className="text-[10px] font-medium text-gray-600 shrink-0">{stepTitle}</span>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6">
        {children}
      </main>

      {/* ── Bottom nav ───────────────────────────────────────────────────── */}
      <footer className="shrink-0 border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            className="btn-ghost text-xs"
          >
            {td('prevStep')}
          </button>

          <div className="flex items-center gap-3">
            {isStepDone ? (
              <button
                onClick={handleNext}
                className="btn-primary text-xs"
              >
                {isLastStep ? td('returnToGemba') : td('nextStep')}
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="btn text-xs text-white"
                style={{ backgroundColor: beltColor, borderColor: beltColor }}
              >
                {td('stepComplete')} →
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
