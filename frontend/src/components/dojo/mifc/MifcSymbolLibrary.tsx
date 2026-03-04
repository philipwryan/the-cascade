'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { MIFC_SYMBOLS, SYMBOL_CATEGORIES, type MifcSymbol } from './MifcSymbols';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

export default function MifcSymbolLibrary({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>('entities');
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [selectedSymbol, setSelectedSymbol] = useState<MifcSymbol | null>(null);

  const filtered = MIFC_SYMBOLS.filter(s => s.category === activeCategory);
  const totalFlipped = flipped.size;
  const allViewed = totalFlipped >= Math.min(12, MIFC_SYMBOLS.length); // gate: must flip at least 12 cards

  function flip(id: string) {
    setFlipped(prev => new Set([...prev, id]));
    const sym = MIFC_SYMBOLS.find(s => s.id === id);
    if (sym) setSelectedSymbol(sym);
  }

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Header */}
      <div className="panel p-5">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {lang === 'en' ? 'MIFC Symbol Reference' : 'MIFC記号リファレンス'}
        </h2>
        <p className="text-sm text-gray-600">
          {lang === 'en'
            ? 'Click each symbol to reveal its name and purpose. You must explore at least 12 symbols to continue.'
            : '各記号をクリックして名前と用途を確認してください。少なくとも12個の記号を確認して進んでください。'}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalFlipped / 12) * 100)}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 shrink-0">
            {totalFlipped}/{MIFC_SYMBOLS.length} {lang === 'en' ? 'explored' : '確認済み'}
          </span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {SYMBOL_CATEGORIES.map(cat => {
          const catSymbols = MIFC_SYMBOLS.filter(s => s.category === cat.id);
          const catFlipped = catSymbols.filter(s => flipped.has(s.id)).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeCategory === cat.id
                  ? 'text-white border-transparent'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
              style={activeCategory === cat.id ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
            >
              {lang === 'en' ? cat.labelEn : cat.labelJa}
              {catFlipped > 0 && (
                <span className="ml-1.5 opacity-80">({catFlipped}/{catSymbols.length})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Symbol grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {filtered.map(sym => {
          const isFlipped = flipped.has(sym.id);
          const isSelected = selectedSymbol?.id === sym.id;

          return (
            <button
              key={sym.id}
              onClick={() => flip(sym.id)}
              className={`relative group rounded-xl border-2 transition-all duration-200 p-3 text-center ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : isFlipped
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm'
              }`}
            >
              {/* Symbol SVG */}
              <div className="flex justify-center mb-2">
                <sym.Component className="w-14 h-14" />
              </div>

              {/* Name (hidden until flipped) */}
              {isFlipped ? (
                <p className="text-[10px] font-semibold text-gray-700 leading-tight">
                  {lang === 'en' ? sym.nameEn : sym.nameJa}
                </p>
              ) : (
                <p className="text-[10px] text-gray-300 italic">
                  {lang === 'en' ? 'tap to reveal' : 'タップして確認'}
                </p>
              )}

              {isFlipped && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-white">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected symbol detail panel */}
      {selectedSymbol && (
        <div className="panel p-5 border-blue-200 bg-blue-50 space-y-3 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 shrink-0 bg-white rounded-xl border border-blue-200 flex items-center justify-center p-2">
              <selectedSymbol.Component className="w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900">
                  {lang === 'en' ? selectedSymbol.nameEn : selectedSymbol.nameJa}
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full font-semibold">
                  {SYMBOL_CATEGORIES.find(c => c.id === selectedSymbol.category)?.[lang === 'en' ? 'labelEn' : 'labelJa']}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {lang === 'en' ? selectedSymbol.descriptionEn : selectedSymbol.descriptionJa}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Completion gate */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {allViewed
            ? (lang === 'en' ? '✅ You\'ve explored enough symbols to continue.' : '✅ 十分な記号を確認しました。続行できます。')
            : (lang === 'en' ? `Explore ${12 - totalFlipped} more symbol(s) to unlock next step.` : `あと${12 - totalFlipped}個の記号を確認してください。`)}
        </p>
        {!alreadyDone && (
          <button
            onClick={onComplete}
            disabled={!allViewed}
            className={`text-xs font-semibold py-2 px-4 rounded-lg transition-all ${
              allViewed
                ? 'bg-blue-700 hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {allViewed
              ? (lang === 'en' ? 'Take the Quiz →' : 'クイズへ →')
              : (lang === 'en' ? `Need ${12 - totalFlipped} more` : `あと${12 - totalFlipped}個`)}
          </button>
        )}
        {alreadyDone && (
          <span className="text-xs text-green-600 font-medium">
            ✓ {lang === 'en' ? 'Completed' : '完了'}
          </span>
        )}
      </div>
    </div>
  );
}
