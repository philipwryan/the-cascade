'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT, DojoTKey } from '@/lib/dojo/i18n-dojo';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

const WHY_ANSWERS: DojoTKey[] = [
  'why1answer',
  'why2answer',
  'why3answer',
  'why4answer',
  'why5answer',
];

export default function FiveWhyDrill({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const td = getDojoT(lang);

  // currentWhy: 0–4 while drilling, 5 = complete
  const [currentWhy, setCurrentWhy] = useState(alreadyDone ? 5 : 0);
  const [userAnswers, setUserAnswers] = useState<string[]>(['', '', '', '', '']);
  const [submitted, setSubmitted]     = useState<boolean[]>([false, false, false, false, false]);
  const [inputVal, setInputVal]       = useState('');

  function handleSubmitWhy() {
    if (inputVal.trim().length < 5) return;

    const next = [...userAnswers];
    next[currentWhy] = inputVal.trim();
    setUserAnswers(next);

    const nextSubmitted = [...submitted];
    nextSubmitted[currentWhy] = true;
    setSubmitted(nextSubmitted);

    setInputVal('');

    if (currentWhy === 4) {
      setCurrentWhy(5);
      if (!alreadyDone) onComplete();
    } else {
      setCurrentWhy(c => c + 1);
    }
  }

  const whyLabels = lang === 'ja'
    ? ['なぜ1：', 'なぜ2：', 'なぜ3：', 'なぜ4：', 'なぜ5：']
    : ['Why 1:', 'Why 2:', 'Why 3:', 'Why 4:', 'Why 5:'];

  return (
    <div className="space-y-5">

      {/* Quote */}
      <div className="panel p-4 border-l-4" style={{ borderLeftColor: '#00a651' }}>
        <p className="text-sm text-gray-700 italic leading-relaxed mb-1">
          {td('fiveWhyOhnoQuote')}
        </p>
        <p className="text-[10px] text-gray-500">{td('fiveWhyAttrib')}</p>
      </div>

      {/* Intro */}
      <div className="panel p-4">
        <p className="text-xs text-gray-600 leading-relaxed">{td('fiveWhyIntro')}</p>
      </div>

      {/* Problem statement */}
      <div className="panel p-4 bg-red-50/60 border-red-200">
        <p className="text-[10px] font-semibold text-red-700 uppercase tracking-wider mb-1">
          {td('fiveWhyProblemLabel')}
        </p>
        <p className="text-xs text-red-900 font-medium leading-snug">
          {td('fiveWhyProblem')}
        </p>
      </div>

      {/* Previously answered whys */}
      {submitted.map((done, i) => {
        if (!done) return null;
        return (
          <div key={i} className="space-y-2">
            {/* User's answer */}
            <div className="panel p-3">
              <p className="text-[10px] font-semibold text-gray-500 mb-1">{whyLabels[i]} {td('fiveWhyYourAnswer')}</p>
              <p className="text-[11px] text-gray-700 italic leading-relaxed">"{userAnswers[i]}"</p>
            </div>
            {/* Coach's canonical answer */}
            <div className="panel p-3 bg-amber-50/50 border-amber-100 flex gap-2">
              <span className="text-base shrink-0">💡</span>
              <div>
                <p className="text-[10px] font-semibold text-amber-800 mb-0.5">{td('fiveWhyCoachAnswer')}</p>
                <p className="text-[11px] text-amber-900 leading-relaxed">{td(WHY_ANSWERS[i])}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Current why input */}
      {currentWhy < 5 && (
        <div className="panel p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-bold">{currentWhy + 1}</span>
            </div>
            <p className="text-xs font-semibold text-gray-700">
              {td('fiveWhyCoachAsk')}
            </p>
          </div>

          {currentWhy > 0 && (
            <div className="text-[10px] text-gray-500 italic leading-relaxed">
              {lang === 'ja' ? 'コーチが次の層を明かします：' : td('fiveWhyNextPrompt')} {td(WHY_ANSWERS[currentWhy - 1])}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500">{td('fiveWhyYourAnswer')}</label>
            <textarea
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder={td('fiveWhyAnswerPlaceholder')}
              rows={3}
              className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-400
                         focus:outline-none focus:border-green-500 resize-none leading-relaxed"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmitWhy}
              disabled={inputVal.trim().length < 5}
              className="btn-primary text-xs disabled:opacity-40"
            >
              {currentWhy === 4
                ? (lang === 'ja' ? '根本原因を特定 →' : 'Identify Root Cause →')
                : td('fiveWhySubmit')}
            </button>
          </div>
        </div>
      )}

      {/* Complete state */}
      {currentWhy === 5 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <span className="text-white text-[10px]">✓</span>
            </div>
            <h3 className="text-sm font-bold text-gray-800">{td('fiveWhyRootLabel')}</h3>
          </div>

          <div className="panel p-4 bg-green-50 border-green-200">
            <p className="text-[10px] font-semibold text-green-800 mb-1.5">
              {lang === 'ja' ? '根本原因：' : 'Root Cause:'}
            </p>
            <p className="text-[11px] text-green-900 leading-relaxed font-medium">
              {td('rootCauseText')}
            </p>
          </div>

          <div className="panel p-3 bg-amber-50/50 border-amber-100">
            <p className="text-[10px] text-amber-800 leading-relaxed italic">
              {lang === 'ja'
                ? '大野の教え：根本原因は常に「システム」にある。個人ではなく、プロセスや政策の中に。'
                : 'Ohno\'s lesson: the root cause always lives in the system — in a process or policy, not a person.'}
            </p>
          </div>

          {!alreadyDone && (
            <p className="text-[10px] text-gray-400 text-center">
              {lang === 'ja' ? '✓ このステップは完了しました' : '✓ Step marked complete'}
            </p>
          )}
        </div>
      )}

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5">
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i < currentWhy
                ? 'bg-green-500'
                : i === currentWhy && currentWhy < 5
                ? 'bg-green-300'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
