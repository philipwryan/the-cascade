'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

export default function LivingRoofReflection({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const td = getDojoT(lang);

  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted]   = useState(alreadyDone);

  function handleSubmit() {
    if (reflection.trim().length < 20) return;
    setSubmitted(true);
    if (!alreadyDone) onComplete();
  }

  return (
    <div className="space-y-5">

      {/* Quote */}
      <div className="panel p-4 border-l-4" style={{ borderLeftColor: '#00a651' }}>
        <p className="text-sm text-gray-700 italic leading-relaxed mb-1">
          {td('kaizenOhnoQuote')}
        </p>
        <p className="text-[10px] text-gray-500">{td('kaizenAttrib')}</p>
      </div>

      {/* Intro */}
      <div className="panel p-4">
        <p className="text-xs text-gray-600 leading-relaxed">{td('livingRoofIntro')}</p>
      </div>

      {/* Kaizen concept */}
      <div className="grid grid-cols-2 gap-2">
        <div className="panel p-3 text-center">
          <p className="text-2xl font-bold text-gray-800 mb-0.5">改</p>
          <p className="text-[10px] text-gray-500">
            {lang === 'ja' ? 'Kai — 変化' : 'Kai — change'}
          </p>
        </div>
        <div className="panel p-3 text-center">
          <p className="text-2xl font-bold text-gray-800 mb-0.5">善</p>
          <p className="text-[10px] text-gray-500">
            {lang === 'ja' ? 'Zen — 良い' : 'Zen — good'}
          </p>
        </div>
      </div>

      {/* Key principles */}
      <div className="panel p-4 space-y-2.5">
        {[
          { icon: '🔄', en: 'Continuous improvement — not a project, a daily practice', ja: '継続的改善—プロジェクトではなく、日々の実践' },
          { icon: '👥', en: 'Everyone participates — from CEO to floor operator', ja: '全員が参加する—CEOから現場作業者まで' },
          { icon: '📐', en: 'Start with the standard — you cannot improve what you haven\'t defined', ja: '標準から始める—定義していないものは改善できない' },
          { icon: '🔍', en: 'Small, frequent improvements beat rare large projects', ja: '小さく頻繁な改善は、稀な大きなプロジェクトより優れている' },
        ].map((pt, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-sm shrink-0">{pt.icon}</span>
            <span className="text-[11px] text-gray-600 leading-relaxed">
              {lang === 'ja' ? pt.ja : pt.en}
            </span>
          </div>
        ))}
      </div>

      {/* Reflection input */}
      {!submitted ? (
        <div className="panel p-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              {td('kaizenReflectionLabel')}
            </label>
            <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
              {td('kaizenReflectionPrompt')}
            </p>
          </div>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder={td('kaizenPlaceholder')}
            rows={6}
            className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-400
                       focus:outline-none focus:border-green-500 resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400">
              {reflection.trim().split(/\s+/).filter(Boolean).length}{' '}
              {lang === 'ja' ? '語' : 'words'}
            </span>
            <button
              onClick={handleSubmit}
              disabled={reflection.trim().length < 20}
              className="btn-primary text-xs disabled:opacity-40"
            >
              {td('submitReflection')}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Saved confirmation */}
          <div className="panel p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <span className="text-white text-[10px]">✓</span>
              </div>
              <p className="text-xs font-bold text-green-800">{td('reflectionSaved')}</p>
            </div>
            {reflection && (
              <p className="text-[10px] text-green-700 italic leading-relaxed pl-7">
                "{reflection}"
              </p>
            )}
          </div>

          {/* Module 2 summary */}
          <div className="panel p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-700">
              {lang === 'ja' ? 'TPSの家 — 復習' : 'The TPS House — recap'}
            </p>
            {[
              { icon: '🏛', en: 'Goal: Best Quality · Lowest Cost · Shortest Lead Time', ja: '目標：最高品質・最低コスト・最短リードタイム' },
              { icon: '⏱', en: 'Left pillar: JIT — right part, right time, right amount', ja: '左柱：JIT—必要なものを、必要なときに、必要な量だけ' },
              { icon: '🚨', en: 'Right pillar: Jidoka — stop and fix, quality built-in', ja: '右柱：自働化—止めて直せ、品質を作り込む' },
              { icon: '🌊', en: 'Foundation: Heijunka → Standardized Work → Kaizen', ja: '基盤：平準化→標準作業→改善' },
              { icon: '🤝', en: 'Heart: People & Teamwork — the non-negotiable core', ja: '心臓：人・チームワーク—交渉の余地のない核心' },
            ].map((pt, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-sm shrink-0">{pt.icon}</span>
                <span className="text-[11px] text-gray-600 leading-relaxed">
                  {lang === 'ja' ? pt.ja : pt.en}
                </span>
              </div>
            ))}
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
