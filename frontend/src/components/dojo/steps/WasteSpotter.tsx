'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT, DojoTKey } from '@/lib/dojo/i18n-dojo';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

type WasteKey =
  | 'transport'
  | 'inventory'
  | 'motion'
  | 'waiting'
  | 'overproduction'
  | 'overprocessing'
  | 'defects'
  | 'skills';

const CORRECT_WASTES = new Set<WasteKey>([
  'inventory',
  'motion',
  'waiting',
  'overproduction',
  'defects',
  'skills',
]);

const ALL_WASTES: WasteKey[] = [
  'transport',
  'inventory',
  'motion',
  'waiting',
  'overproduction',
  'overprocessing',
  'defects',
  'skills',
];

const LABEL_KEYS: Record<WasteKey, DojoTKey> = {
  transport:      'wasteTransport',
  inventory:      'wasteInventory',
  motion:         'wasteMotion',
  waiting:        'wasteWaiting',
  overproduction: 'wasteOverproduction',
  overprocessing: 'wasteOverprocessing',
  defects:        'wasteDefects',
  skills:         'wasteSkills',
};

const EXPL_KEYS: Record<WasteKey, DojoTKey> = {
  transport:      'explTransport',
  inventory:      'explInventory',
  motion:         'explMotion',
  waiting:        'explWaiting',
  overproduction: 'explOverprod',
  overprocessing: 'explOverproc',
  defects:        'explDefects',
  skills:         'explSkills',
};

export default function WasteSpotter({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const td = getDojoT(lang);

  const [selected, setSelected] = useState<Set<WasteKey>>(new Set());
  const [checked, setChecked]   = useState(alreadyDone);
  const [showExpl, setShowExpl] = useState(alreadyDone);

  function toggle(w: WasteKey) {
    if (checked) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(w)) next.delete(w); else next.add(w);
      return next;
    });
  }

  function handleCheck() {
    setChecked(true);
    if (!alreadyDone) onComplete();
  }

  const correctSelected   = [...selected].filter(w => CORRECT_WASTES.has(w)).length;
  const incorrectSelected = [...selected].filter(w => !CORRECT_WASTES.has(w)).length;
  const totalCorrect      = CORRECT_WASTES.size;

  return (
    <div className="space-y-5">

      {/* Instruction */}
      <div className="panel p-4">
        <p className="text-xs text-gray-600 leading-relaxed">{td('wasteSpotterInstruction')}</p>
      </div>

      {/* Scene */}
      <div className="panel p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🏭</span>
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            {td('wasteSpotterSceneLabel')}
          </span>
        </div>
        <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-line">
          {td('wasteSpotterScene')}
        </p>
      </div>

      {/* Waste checkboxes */}
      <div className="panel p-4 space-y-3">
        <p className="text-xs font-semibold text-gray-700">
          {lang === 'ja'
            ? '確認できる無駄を選択してください：'
            : 'Select all wastes you can identify:'}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {ALL_WASTES.map(w => {
            const isSelected = selected.has(w);
            const isCorrect  = CORRECT_WASTES.has(w);

            let borderCls = 'border-gray-200';
            let bgCls     = '';
            let textCls   = 'text-gray-700';

            if (checked) {
              if (isCorrect && isSelected)   { borderCls = 'border-green-400'; bgCls = 'bg-green-50';  textCls = 'text-green-800'; }
              else if (!isCorrect && isSelected) { borderCls = 'border-red-300'; bgCls = 'bg-red-50'; textCls = 'text-red-700'; }
              else if (isCorrect && !isSelected) { borderCls = 'border-amber-300'; bgCls = 'bg-amber-50'; textCls = 'text-amber-800'; }
            } else if (isSelected) {
              borderCls = 'border-green-400'; bgCls = 'bg-green-50';
            }

            return (
              <button
                key={w}
                onClick={() => toggle(w)}
                className={`flex items-center gap-2 p-2.5 rounded border ${borderCls} ${bgCls}
                            text-left ${checked ? 'cursor-default' : 'hover:border-gray-300 transition-colors'}`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0
                                 ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {isSelected && <span className="text-white text-[9px]">✓</span>}
                </div>
                <span className={`text-[10px] font-medium leading-snug ${textCls}`}>
                  {td(LABEL_KEYS[w])}
                </span>
                {checked && isCorrect && !isSelected && (
                  <span className="text-amber-600 text-[9px] ml-auto shrink-0">
                    {lang === 'ja' ? '見逃し' : 'missed'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Check button */}
      {!checked ? (
        <div className="flex justify-end">
          <button
            onClick={handleCheck}
            disabled={selected.size === 0}
            className="btn-primary text-xs disabled:opacity-40"
          >
            {td('checkWastes')}
          </button>
        </div>
      ) : (
        <div className="space-y-3">

          {/* Score */}
          <div className="panel p-4 bg-green-50 border-green-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-green-800">
                {lang === 'ja' ? '結果' : 'Results'}
              </p>
              <p className="text-[10px] text-green-700 mt-0.5">
                {lang === 'ja'
                  ? `${totalCorrect}個中${correctSelected}個の無駄を正しく特定`
                  : `${correctSelected} of ${totalCorrect} wastes correctly identified`}
                {incorrectSelected > 0 && (
                  <span className="text-amber-700 ml-1">
                    {lang === 'ja'
                      ? `· ${incorrectSelected}個の誤選択`
                      : `· ${incorrectSelected} incorrect`}
                  </span>
                )}
              </p>
            </div>
            <div className="text-2xl font-bold text-green-700">
              {correctSelected}/{totalCorrect}
            </div>
          </div>

          {/* Explanations toggle */}
          <button
            onClick={() => setShowExpl(v => !v)}
            className="btn-ghost text-xs w-full"
          >
            {showExpl
              ? (lang === 'ja' ? '解説を隠す' : 'Hide Explanations')
              : td('showExplanations')}
          </button>

          {showExpl && (
            <div className="space-y-2">
              {ALL_WASTES.map(w => (
                <div key={w} className={`panel p-3 flex gap-2.5 ${CORRECT_WASTES.has(w) ? 'border-green-200' : ''}`}>
                  <span className={`text-[12px] shrink-0 mt-0.5 ${CORRECT_WASTES.has(w) ? 'text-green-600' : 'text-gray-400'}`}>
                    {CORRECT_WASTES.has(w) ? '✓' : '○'}
                  </span>
                  <div>
                    <span className="text-[10px] font-semibold text-gray-700 mr-1">
                      {td(LABEL_KEYS[w])}:
                    </span>
                    <span className="text-[10px] text-gray-600 leading-relaxed">
                      {td(EXPL_KEYS[w])}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!alreadyDone && (
            <p className="text-[10px] text-gray-400 text-center">
              {lang === 'ja' ? '✓ このステップは完了しました' : '✓ Step marked complete'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
