'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT, DojoTKey } from '@/lib/dojo/i18n-dojo';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

type SlotId = 'goal' | 'leftPillar' | 'rightPillar' | 'center' | 'found1' | 'found2' | 'found3';
type ElemId = 'goal' | 'jit' | 'jidoka' | 'people' | 'heijunka' | 'stdWork' | 'kaizen';

interface Slot {
  id: SlotId;
  labelKey: DojoTKey;
  correctElem: ElemId;
  explKey: DojoTKey;
  gridArea: string;
  color: string;
}

interface Element {
  id: ElemId;
  labelKey: DojoTKey;
  emoji: string;
}

const SLOTS: Slot[] = [
  { id: 'goal',       labelKey: 'tpsGoal',        correctElem: 'goal',    explKey: 'explGoal',    gridArea: 'goal',   color: '#00a651' },
  { id: 'leftPillar', labelKey: 'tpsLeftPillar',  correctElem: 'jit',     explKey: 'explJIT',     gridArea: 'lp',     color: '#1d4ed8' },
  { id: 'rightPillar',labelKey: 'tpsRightPillar', correctElem: 'jidoka',  explKey: 'explJidoka',  gridArea: 'rp',     color: '#1d4ed8' },
  { id: 'center',     labelKey: 'tpsCenter',      correctElem: 'people',  explKey: 'explPeople',  gridArea: 'center', color: '#d97706' },
  { id: 'found1',     labelKey: 'tpsFoundation1', correctElem: 'heijunka',explKey: 'explHeijunka',gridArea: 'f1',     color: '#6b7280' },
  { id: 'found2',     labelKey: 'tpsFoundation2', correctElem: 'stdWork', explKey: 'explStdWork', gridArea: 'f2',     color: '#6b7280' },
  { id: 'found3',     labelKey: 'tpsFoundation3', correctElem: 'kaizen',  explKey: 'explKaizen',  gridArea: 'f3',     color: '#6b7280' },
];

const ELEMENTS: Element[] = [
  { id: 'goal',     labelKey: 'elemGoal',     emoji: '🏆' },
  { id: 'jit',      labelKey: 'elemJIT',      emoji: '⏱' },
  { id: 'jidoka',   labelKey: 'elemJidoka',   emoji: '🚨' },
  { id: 'people',   labelKey: 'elemPeople',   emoji: '🤝' },
  { id: 'heijunka', labelKey: 'elemHeijunka', emoji: '🌊' },
  { id: 'stdWork',  labelKey: 'elemStdWork',  emoji: '📐' },
  { id: 'kaizen',   labelKey: 'elemKaizen',   emoji: '🔄' },
];

export default function TPSHouseBuilder({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const td = getDojoT(lang);

  // slotFills: slotId → elemId placed there
  const [slotFills, setSlotFills] = useState<Partial<Record<SlotId, ElemId>>>(() =>
    alreadyDone
      ? Object.fromEntries(SLOTS.map(s => [s.id, s.correctElem])) as Record<SlotId, ElemId>
      : {},
  );
  const [selectedSlot, setSelectedSlot] = useState<SlotId | null>(null);
  const [flash, setFlash]               = useState<{ slotId: SlotId; ok: boolean } | null>(null);
  const [done, setDone]                 = useState(alreadyDone);
  const [showExpl, setShowExpl]         = useState<SlotId | null>(null);

  const placedElems = new Set(Object.values(slotFills));

  function handleSlotClick(slotId: SlotId) {
    if (done) {
      setShowExpl(prev => prev === slotId ? null : slotId);
      return;
    }
    setSelectedSlot(slotId);
  }

  function handleElemClick(elemId: ElemId) {
    if (!selectedSlot || done) return;

    const slot = SLOTS.find(s => s.id === selectedSlot)!;
    const isCorrect = slot.correctElem === elemId;

    setFlash({ slotId: selectedSlot, ok: isCorrect });
    setTimeout(() => setFlash(null), 900);

    if (isCorrect) {
      const next = { ...slotFills, [selectedSlot]: elemId };
      setSlotFills(next);
      setSelectedSlot(null);

      if (Object.keys(next).length === SLOTS.length) {
        setDone(true);
        if (!alreadyDone) onComplete();
      }
    } else {
      setSelectedSlot(null);
    }
  }

  const correctCount = SLOTS.filter(s => slotFills[s.id] === s.correctElem).length;

  // ── Render ──────────────────────────────────────────────────────────────────

  function renderSlot(slot: Slot) {
    const filled  = slotFills[slot.id];
    const elem    = filled ? ELEMENTS.find(e => e.id === filled) : null;
    const isFlash = flash?.slotId === slot.id;
    const isActive = selectedSlot === slot.id;
    const explOpen = showExpl === slot.id;

    const bgCls = isFlash
      ? flash?.ok
        ? 'bg-green-100 border-green-400'
        : 'bg-red-100 border-red-400'
      : elem
        ? 'bg-white border-green-300'
        : isActive
          ? 'bg-blue-50 border-blue-400 border-dashed'
          : 'bg-gray-50 border-gray-300 border-dashed';

    return (
      <div key={slot.id} className="space-y-1">
        <button
          onClick={() => handleSlotClick(slot.id)}
          className={`w-full rounded border-2 p-2.5 text-left transition-all ${bgCls}
                      ${!done ? 'hover:border-gray-400 cursor-pointer' : 'cursor-pointer'}`}
        >
          <div className="flex items-center gap-2">
            {elem ? (
              <>
                <span className="text-base">{elem.emoji}</span>
                <span className="text-[11px] font-semibold text-gray-800">{td(elem.labelKey)}</span>
                <span className="text-green-500 text-[10px] ml-auto">✓</span>
              </>
            ) : (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-dashed border-gray-300" />
                <span className="text-[10px] text-gray-400">
                  {isActive
                    ? (lang === 'ja' ? '↓ 要素を選択' : '↓ Select element')
                    : td(slot.labelKey)}
                </span>
              </>
            )}
          </div>
        </button>

        {/* Explanation when done */}
        {done && explOpen && elem && (
          <div className="panel p-2.5 bg-amber-50/60 border-amber-100 text-[10px] text-amber-800 leading-relaxed">
            {td(slot.explKey)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Instruction */}
      <div className="panel p-4">
        <p className="text-xs text-gray-600 leading-relaxed">{td('tpsHouseInstruction')}</p>
        {!done && (
          <p className="text-[10px] text-gray-400 mt-1">{td('tpsHouseClickPrompt')}</p>
        )}
        {done && (
          <p className="text-[10px] text-gray-400 mt-1">
            {lang === 'ja' ? 'スロットをクリックして解説を表示' : 'Click any slot to see the explanation'}
          </p>
        )}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${(correctCount / SLOTS.length) * 100}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-500 shrink-0">{correctCount}/{SLOTS.length}</span>
      </div>

      {/* House visual */}
      <div className="panel p-4 space-y-2">
        {/* Roof / Goal */}
        <div className="flex justify-center">
          <div className="w-2/3">{renderSlot(SLOTS[0])}</div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-2 gap-2">
          {renderSlot(SLOTS[1])}
          {renderSlot(SLOTS[2])}
        </div>

        {/* Center (People) */}
        <div className="flex justify-center">
          <div className="w-2/3">{renderSlot(SLOTS[3])}</div>
        </div>

        {/* Foundation */}
        <div className="border-t-2 border-gray-300 pt-2">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest text-center mb-2">
            {lang === 'ja' ? '基盤' : 'Foundation'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {renderSlot(SLOTS[4])}
            {renderSlot(SLOTS[5])}
            {renderSlot(SLOTS[6])}
          </div>
        </div>
      </div>

      {/* Element palette */}
      {!done && (
        <div className="panel p-4 space-y-2">
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
            {selectedSlot
              ? td('tpsHouseSelectPrompt')
              : (lang === 'ja' ? 'スロットをクリック後、ここから要素を選択' : 'Click a slot above, then pick an element:')}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ELEMENTS.filter(e => !placedElems.has(e.id)).map(elem => (
              <button
                key={elem.id}
                onClick={() => handleElemClick(elem.id)}
                disabled={!selectedSlot}
                className={`flex items-center gap-2 p-2.5 rounded border text-left
                            transition-colors
                            ${selectedSlot
                              ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                              : 'border-gray-200 opacity-50 cursor-not-allowed'}`}
              >
                <span className="text-base">{elem.emoji}</span>
                <span className="text-[10px] font-medium text-gray-700">{td(elem.labelKey)}</span>
              </button>
            ))}
            {ELEMENTS.filter(e => !placedElems.has(e.id)).length === 0 && !done && (
              <p className="col-span-2 text-[10px] text-gray-400 text-center py-2">
                {lang === 'ja' ? 'すべて配置されました！' : 'All elements placed!'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Complete banner */}
      {done && (
        <div className="panel p-4 bg-green-50 border-green-200">
          <p className="text-xs font-bold text-green-800 mb-1">{td('tpsHouseComplete')}</p>
          <p className="text-[10px] text-green-700 leading-relaxed">
            {lang === 'ja'
              ? '各スロットをクリックして、その要素の意味を確認してください。'
              : 'Click each slot above to read what each element means in the TPS House.'}
          </p>
        </div>
      )}

      {done && !alreadyDone && (
        <p className="text-[10px] text-gray-400 text-center">
          {lang === 'ja' ? '✓ このステップは完了しました' : '✓ Step marked complete'}
        </p>
      )}
    </div>
  );
}
