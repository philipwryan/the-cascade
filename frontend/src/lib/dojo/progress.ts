'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Belt,
  DojoProgress,
  BELT_XP_THRESHOLDS,
  ModuleScore,
  ObservationEntry,
  A3Draft,
  KataExperiment,
} from './types';

const STORAGE_KEY = 'dojo_progress_v1';

const DEFAULT_PROGRESS: DojoProgress = {
  belt: 'white',
  modulesCompleted: [],
  currentModule: null,
  xp: 0,
  streakDays: 0,
  lastPracticeDate: '',
  observations: [],
  a3Drafts: [],
  kataExperiments: [],
  scores: {},
};

function computeBelt(xp: number): Belt {
  if (xp >= BELT_XP_THRESHOLDS.black) return 'black';
  if (xp >= BELT_XP_THRESHOLDS.blue) return 'blue';
  if (xp >= BELT_XP_THRESHOLDS.green) return 'green';
  return 'white';
}

function nextBeltThreshold(xp: number): number {
  const thresholds = [
    BELT_XP_THRESHOLDS.green,
    BELT_XP_THRESHOLDS.blue,
    BELT_XP_THRESHOLDS.black,
  ];
  return thresholds.find(t => t > xp) ?? BELT_XP_THRESHOLDS.black;
}

function loadProgress(): DojoProgress {
  if (typeof window === 'undefined') return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveProgress(p: DojoProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useDojoProgress() {
  const [progress, setProgress] = useState<DojoProgress>({ ...DEFAULT_PROGRESS });
  const [loaded, setLoaded] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setProgress(loadProgress());
    setLoaded(true);
  }, []);

  // ── Mutations ─────────────────────────────────────────────────────────────

  const awardXP = useCallback((amount: number) => {
    setProgress(prev => {
      const next: DojoProgress = {
        ...prev,
        xp: prev.xp + amount,
        lastPracticeDate: new Date().toISOString().split('T')[0],
      };
      next.belt = computeBelt(next.xp);
      saveProgress(next);
      return next;
    });
  }, []);

  const completeStep = useCallback((moduleId: string, stepId: string) => {
    setProgress(prev => {
      const existing = prev.scores[moduleId];
      const stepsCompleted = existing?.stepsCompleted ?? [];
      if (stepsCompleted.includes(stepId)) return prev; // idempotent

      const next: DojoProgress = {
        ...prev,
        scores: {
          ...prev.scores,
          [moduleId]: {
            moduleId,
            completedAt: existing?.completedAt ?? '',
            xpEarned: existing?.xpEarned ?? 0,
            stepsCompleted: [...stepsCompleted, stepId],
            quizScores: existing?.quizScores ?? {},
          },
        },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const completeModule = useCallback(
    (moduleId: string, xpEarned: number, quizScores: Record<string, number> = {}) => {
      setProgress(prev => {
        if (prev.modulesCompleted.includes(moduleId)) return prev;

        const existing = prev.scores[moduleId];
        const next: DojoProgress = {
          ...prev,
          modulesCompleted: [...prev.modulesCompleted, moduleId],
          xp: prev.xp + xpEarned,
          lastPracticeDate: new Date().toISOString().split('T')[0],
          scores: {
            ...prev.scores,
            [moduleId]: {
              moduleId,
              completedAt: new Date().toISOString(),
              xpEarned,
              stepsCompleted: existing?.stepsCompleted ?? [],
              quizScores: { ...(existing?.quizScores ?? {}), ...quizScores },
            },
          },
        };
        next.belt = computeBelt(next.xp);
        saveProgress(next);
        return next;
      });
    },
    [],
  );

  const recordObservation = useCallback((obs: ObservationEntry) => {
    setProgress(prev => {
      const next: DojoProgress = {
        ...prev,
        observations: [...prev.observations, obs],
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const saveA3Draft = useCallback((draft: A3Draft) => {
    setProgress(prev => {
      const others = prev.a3Drafts.filter(d => d.id !== draft.id);
      const next: DojoProgress = { ...prev, a3Drafts: [...others, draft] };
      saveProgress(next);
      return next;
    });
  }, []);

  const saveKataExperiment = useCallback((exp: KataExperiment) => {
    setProgress(prev => {
      const others = prev.kataExperiments.filter(e => e.id !== exp.id);
      const next: DojoProgress = { ...prev, kataExperiments: [...others, exp] };
      saveProgress(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = { ...DEFAULT_PROGRESS };
    saveProgress(fresh);
    setProgress(fresh);
  }, []);

  // ── Selectors ─────────────────────────────────────────────────────────────

  const isModuleUnlocked = (moduleBelt: Belt): boolean => {
    const rank: Belt[] = ['white', 'green', 'blue', 'black'];
    return rank.indexOf(progress.belt) >= rank.indexOf(moduleBelt);
  };

  const isModuleCompleted = (moduleId: string): boolean =>
    progress.modulesCompleted.includes(moduleId);

  const isStepCompleted = (moduleId: string, stepId: string): boolean =>
    progress.scores[moduleId]?.stepsCompleted?.includes(stepId) ?? false;

  const xpToNextBelt = (): number => {
    const next = nextBeltThreshold(progress.xp);
    return Math.max(0, next - progress.xp);
  };

  const xpProgressPct = (): number => {
    const belt = computeBelt(progress.xp);
    const rank: Belt[] = ['white', 'green', 'blue', 'black'];
    const beltIdx = rank.indexOf(belt);
    if (beltIdx === rank.length - 1) return 100; // maxed
    const lo = BELT_XP_THRESHOLDS[rank[beltIdx]];
    const hi = BELT_XP_THRESHOLDS[rank[beltIdx + 1]];
    return Math.round(((progress.xp - lo) / (hi - lo)) * 100);
  };

  return {
    progress,
    loaded,
    // mutations
    awardXP,
    completeStep,
    completeModule,
    recordObservation,
    saveA3Draft,
    saveKataExperiment,
    resetProgress,
    // selectors
    isModuleUnlocked,
    isModuleCompleted,
    isStepCompleted,
    xpToNextBelt,
    xpProgressPct,
  };
}
