// ─── Belt / XP ──────────────────────────────────────────────────────────────

export type Belt = 'white' | 'green' | 'blue' | 'black';

export const BELT_XP_THRESHOLDS: Record<Belt, number> = {
  white: 0,
  green: 200,
  blue: 600,
  black: 1400,
};

export const BELT_COLORS: Record<Belt, string> = {
  white:  '#d4d4d4',
  green:  '#00a651',
  blue:   '#1d4ed8',
  black:  '#1a1a1a',
};

export const BELT_BG_COLORS: Record<Belt, string> = {
  white:  '#f5f5f5',
  green:  '#dcfce7',
  blue:   '#dbeafe',
  black:  '#262626',
};

export const BELT_LABELS_EN: Record<Belt, string> = {
  white: 'White Belt',
  green: 'Green Belt',
  blue:  'Blue Belt',
  black: 'Black Belt',
};

export const BELT_LABELS_JA: Record<Belt, string> = {
  white: '白帯',
  green: '緑帯',
  blue:  '青帯',
  black: '黒帯',
};

// ─── Step & Module definitions ───────────────────────────────────────────────

export type StepType =
  | 'observation'
  | 'quiz'
  | 'simulation'
  | 'builder'
  | 'drill'
  | 'reflection';

export interface StepDef {
  id: string;         // e.g. 'step-1'
  titleEn: string;
  titleJa: string;
  type: StepType;
  durationMin: number;
}

export interface ModuleDef {
  id: string;         // e.g. 'module-1'
  titleEn: string;
  titleJa: string;
  subtitleEn: string;
  subtitleJa: string;
  icon: string;
  belt: Belt;         // minimum belt required to unlock
  steps: StepDef[];
  xpReward: number;   // total XP for completing the module
}

// ─── Progress types ──────────────────────────────────────────────────────────

export type WasteType =
  | 'transport'
  | 'inventory'
  | 'motion'
  | 'waiting'
  | 'overproduction'
  | 'overprocessing'
  | 'defects'
  | 'skills';

export interface ObservationEntry {
  id: string;
  timestamp: string;
  scene: string;
  observations: string;
  wastesIdentified: string;
}

export type A3Section =
  | 'background'
  | 'currentCondition'
  | 'targetCondition'
  | 'rootCauseAnalysis'
  | 'countermeasures'
  | 'implementation'
  | 'followUp';

export interface A3Draft {
  id: string;
  title: string;
  sections: Partial<Record<A3Section, string>>;
  revisionCount: number;
  coachingFeedback: string[];
  status: 'draft' | 'submitted' | 'reviewed';
  createdAt: string;
  updatedAt: string;
}

export interface KataExperiment {
  id: string;
  targetCondition: string;
  currentCondition: string;
  obstacle: string;
  nextStep: string;
  expectedResult: string;
  actualResult: string | null;
  date: string;
}

export interface ModuleScore {
  moduleId: string;
  completedAt: string;
  xpEarned: number;
  stepsCompleted: string[];
  quizScores: Record<string, number>;
}

export interface DojoProgress {
  belt: Belt;
  modulesCompleted: string[];
  currentModule: string | null;
  xp: number;
  streakDays: number;
  lastPracticeDate: string;
  observations: ObservationEntry[];
  a3Drafts: A3Draft[];
  kataExperiments: KataExperiment[];
  scores: Record<string, ModuleScore>;
}
