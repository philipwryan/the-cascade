'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

export default function ChalkCircle({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const td = getDojoT(lang);

  const [observations, setObservations] = useState('');
  const [wastes, setWastes] = useState('');
  const [submitted, setSubmitted] = useState(alreadyDone);
  const [phase, setPhase] = useState<'observe' | 'waste' | 'feedback'>(
    alreadyDone ? 'feedback' : 'observe',
  );
  const [imgError, setImgError] = useState(false);

  function handleSubmitObservations() {
    if (observations.trim().length < 20) return;
    setPhase('waste');
  }

  function handleSubmitAll() {
    if (wastes.trim().length < 10) return;
    setSubmitted(true);
    setPhase('feedback');
    onComplete();
  }

  const FEEDBACKS = [
    { key: 'coachFeedback1' as const, icon: '🧍' },
    { key: 'coachFeedback2' as const, icon: '📦' },
    { key: 'coachFeedback3' as const, icon: '🛒' },
    { key: 'coachFeedback4' as const, icon: '🩷' },
    { key: 'coachFeedback5' as const, icon: '📊' },
  ];

  return (
    <div className="space-y-5">

      {/* ── Quote ── */}
      <div className="panel p-4 border-l-4" style={{ borderLeftColor: '#00a651' }}>
        <p className="text-sm text-gray-700 italic leading-relaxed mb-1">
          {td('chalkCircleQuote')}
        </p>
        <p className="text-[10px] text-gray-500">{td('chalkCircleAttrib')}</p>
      </div>

      {/* ── Context ── */}
      <div className="panel p-4">
        <p className="text-xs text-gray-600 leading-relaxed">{td('chalkCircleIntro')}</p>
      </div>

      {/* ── Scene ── */}
      <div className="panel p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm">🏭</span>
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            {td('chalkCircleSceneLabel')}
          </span>
        </div>

        {/* Photo — falls back to text description if image not found */}
        {!imgError ? (
          <div className="relative rounded-md overflow-hidden bg-gray-900 mb-3">
            <img
              src="/images/dojo/chalk-circle-scene.jpg"
              alt={lang === 'ja' ? '機械加工セル — 07:15 AM' : 'Machining cell — 07:15 AM. Find the waste.'}
              className="w-full object-cover"
              style={{ maxHeight: '340px', objectPosition: 'center 30%' }}
              onError={() => setImgError(true)}
            />
            {/* Clock overlay matching the real display in the photo */}
            <div
              className="absolute top-3 left-3 text-[11px] font-mono font-bold px-2 py-1 rounded"
              style={{ background: 'rgba(0,0,0,0.72)', color: '#ff3b30', letterSpacing: '0.15em' }}
            >
              07:15 AM
            </div>
            {/* "Stand here" marker */}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] px-2 py-1 rounded">
              {lang === 'ja' ? '◉ あなたはここに立っている' : '◉ You are standing here'}
            </div>
          </div>
        ) : (
          /* Text fallback when image is unavailable */
          <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-line mb-3">
            {td('chalkCircleScene')}
          </p>
        )}

        {/* Data bar — key numbers readable in the scene */}
        <div className="flex items-center flex-wrap gap-2 text-[10px]">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-100">
            <span className="text-gray-500">{lang === 'ja' ? '目標' : 'Target'}</span>
            <span className="font-bold text-gray-700">240 {lang === 'ja' ? '個' : 'parts'}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-50">
            <span className="text-red-500">{lang === 'ja' ? '実績' : 'Actual'}</span>
            <span className="font-bold text-red-700">191</span>
            <span className="text-red-400 font-mono">−20.4%</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-100">
            <span className="text-gray-500">Haas CNC ×6</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-pink-50">
            <span className="text-pink-600 font-bold">14</span>
            <span className="text-pink-700">{lang === 'ja' ? '手直し伝票' : 'rework tickets'}</span>
          </div>
        </div>
      </div>

      {/* ── Phase: Observe ── */}
      {phase === 'observe' && (
        <div className="panel p-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              {td('observationPrompt')}
            </label>
            {!imgError && (
              <p className="text-[10px] text-[#00a651] mb-2">
                {lang === 'ja'
                  ? '↑ 写真をじっくり観察してください。動いているものは？止まっているものは？待機中のものは？'
                  : '↑ Study the photo carefully before writing. What is moving, stopped, or waiting?'}
              </p>
            )}
          </div>
          <textarea
            value={observations}
            onChange={e => setObservations(e.target.value)}
            placeholder={td('observationPlaceholder')}
            rows={6}
            className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-400
                       focus:outline-none focus:border-green-500 resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400">
              {observations.trim().split(/\s+/).filter(Boolean).length}{' '}
              {lang === 'ja' ? '文字' : 'words'}
            </span>
            <button
              onClick={handleSubmitObservations}
              disabled={observations.trim().length < 20}
              className="btn-primary text-xs disabled:opacity-40"
            >
              {lang === 'ja' ? '次のステップ →' : 'Continue →'}
            </button>
          </div>
        </div>
      )}

      {/* ── Phase: Waste ── */}
      {phase === 'waste' && (
        <div className="panel p-4 space-y-3">
          <label className="block text-xs font-semibold text-gray-700">
            {td('wastePrompt')}
          </label>
          <textarea
            value={wastes}
            onChange={e => setWastes(e.target.value)}
            placeholder={td('wastePlaceholder')}
            rows={5}
            className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-400
                       focus:outline-none focus:border-green-500 resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPhase('observe')}
              className="btn-ghost text-xs"
            >
              {lang === 'ja' ? '← 観察に戻る' : '← Back to Observations'}
            </button>
            <button
              onClick={handleSubmitAll}
              disabled={wastes.trim().length < 10}
              className="btn-primary text-xs disabled:opacity-40"
            >
              {td('submitObservation')}
            </button>
          </div>
        </div>
      )}

      {/* ── Phase: Feedback ── */}
      {phase === 'feedback' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <span className="text-white text-[10px]">✓</span>
            </div>
            <h3 className="text-sm font-bold text-gray-800">{td('coachPerspective')}</h3>
          </div>

          <div className="panel p-3 bg-amber-50/50 border-amber-100">
            <p className="text-[10px] text-amber-700 italic">
              {lang === 'ja'
                ? 'これらはコーチが同じ現場で見たものです。あなたの観察と比較してください。'
                : 'Here is what a trained coach sees in the same scene. Compare with your observations.'}
            </p>
          </div>

          <div className="space-y-2">
            {FEEDBACKS.map(({ key, icon }, i) => (
              <div key={key} className="panel p-3 flex gap-2.5">
                <span className="text-base shrink-0">{icon}</span>
                <div>
                  <span className="text-[10px] text-gray-400 font-mono mr-2">#{i + 1}</span>
                  <span className="text-[11px] text-gray-700 leading-relaxed">{td(key)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="panel p-3 bg-green-50 border-green-200">
            <p className="text-[11px] text-green-800 leading-relaxed">
              {lang === 'ja'
                ? '大野の言葉：「見えない人に何も教えることはできない。まず、見ることを学べ。」'
                : 'Ohno\'s lesson: "I cannot teach those who cannot see. First, learn to see."'}
            </p>
          </div>

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
