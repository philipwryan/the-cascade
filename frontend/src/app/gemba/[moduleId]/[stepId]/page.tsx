'use client';

import { notFound } from 'next/navigation';
import { getModule } from '@/lib/dojo/modules';
import { useDojoProgress } from '@/lib/dojo/progress';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';
import ModuleShell from '@/components/dojo/ModuleShell';

// Step components — Modules 1 & 2 implemented; rest = coming soon
import GembaWalkOverview from '@/components/dojo/steps/GembaWalkOverview';
import ChalkCircle from '@/components/dojo/steps/ChalkCircle';
import WasteSpotter from '@/components/dojo/steps/WasteSpotter';
import FiveWhyDrill from '@/components/dojo/steps/FiveWhyDrill';
import TPSHouseBuilder from '@/components/dojo/steps/TPSHouseBuilder';
import TwoPillarsQuiz from '@/components/dojo/steps/TwoPillarsQuiz';
import LivingRoofReflection from '@/components/dojo/steps/LivingRoofReflection';
import JobBreakdownBuilder from '@/components/dojo/steps/JobBreakdownBuilder';
import JobMethodsEliminator from '@/components/dojo/steps/JobMethodsEliminator';
import BranchingScenario from '@/components/dojo/steps/BranchingScenario';

interface Props {
  params: { moduleId: string; stepId: string };
}

export default function StepPage({ params }: Props) {
  const { moduleId, stepId } = params;
  const { lang } = useLang();
  const td = getDojoT(lang);
  const {
    loaded,
    completeStep,
    awardXP,
    completeModule,
    isStepCompleted,
    isModuleCompleted,
    isModuleUnlocked,
    progress,
  } = useDojoProgress();

  const mod = getModule(moduleId);
  if (!mod) notFound();

  const stepIndex = mod.steps.findIndex(s => s.id === stepId);
  if (stepIndex === -1) notFound();

  const step = mod.steps[stepIndex];
  const alreadyDone = loaded && isStepCompleted(moduleId, stepId);
  const modDone = loaded && isModuleCompleted(moduleId);
  const unlocked = !loaded || isModuleUnlocked(mod.belt);

  if (loaded && !unlocked) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
        <div className="panel p-6 text-center max-w-sm">
          <p className="text-3xl mb-2">🔒</p>
          <p className="text-sm font-bold text-gray-800 mb-1">{td('moduleLocked')}</p>
          <p className="text-xs text-gray-500">
            {td('unlockAt')} {mod.belt === 'green' ? '200' : mod.belt === 'blue' ? '600' : '1400'} XP
          </p>
        </div>
      </div>
    );
  }

  function handleStepComplete() {
    if (alreadyDone) return;
    completeStep(moduleId, stepId);

    // XP per step = xpReward / number of steps (floor)
    const xpPerStep = Math.floor(mod.xpReward / mod.steps.length);
    awardXP(xpPerStep);

    // If last step, complete the module
    const isLastStep = stepIndex === mod.steps.length - 1;
    if (isLastStep && !modDone) {
      const stepXpAlreadyGiven = (mod.steps.length - 1) * xpPerStep;
      const remainingXp = mod.xpReward - stepXpAlreadyGiven;
      completeModule(moduleId, remainingXp);
    }
  }

  function renderStepContent() {
    const props = { onComplete: handleStepComplete, alreadyDone };

    // Module 1: Eyes of Ohno
    if (moduleId === 'module-1') {
      if (stepId === 'step-1') return <GembaWalkOverview {...props} />;
      if (stepId === 'step-2') return <ChalkCircle {...props} />;
      if (stepId === 'step-3') return <WasteSpotter {...props} />;
      if (stepId === 'step-4') return <FiveWhyDrill {...props} />;
    }

    // Module 2: TPS House
    if (moduleId === 'module-2') {
      if (stepId === 'step-1') return <TPSHouseBuilder {...props} />;
      if (stepId === 'step-2') return <TwoPillarsQuiz {...props} />;
      if (stepId === 'step-3') return <LivingRoofReflection {...props} />;
    }

    // Module 3: TWI Foundations
    if (moduleId === 'module-3') {
      if (stepId === 'step-1') return <JobBreakdownBuilder {...props} />;
      if (stepId === 'step-2') return <JobMethodsEliminator {...props} />;
      if (stepId === 'step-3') return <BranchingScenario {...props} />;
    }

    // Modules 3–14: coming soon placeholder
    return (
      <div className="panel p-8 text-center space-y-3">
        <p className="text-3xl">🏭</p>
        <p className="text-sm font-bold text-gray-800">{td('comingSoon')}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{td('comingSoonDesc')}</p>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-xs text-gray-400">Loading…</div>
      </div>
    );
  }

  return (
    <ModuleShell
      module={mod}
      step={step}
      stepIndex={stepIndex}
      isStepDone={alreadyDone}
      onComplete={handleStepComplete}
    >
      {renderStepContent()}
    </ModuleShell>
  );
}
