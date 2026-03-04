'use client';

import { useState, useMemo } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { MIFC_SYMBOLS, type MifcSymbol } from './MifcSymbols';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

interface Question {
  symbol: MifcSymbol;
  options: MifcSymbol[];   // 4 options including the correct one
  correctId: string;
}

const QUIZ_SIZE = 12;
const PASS_THRESHOLD = 0.75; // 75%

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(): Question[] {
  const pool = shuffle(MIFC_SYMBOLS).slice(0, QUIZ_SIZE);
  return pool.map(sym => {
    // Pick 3 wrong answers from the rest, prioritizing same category first
    const sameCat = MIFC_SYMBOLS.filter(s => s.id !== sym.id && s.category === sym.category);
    const diffCat = MIFC_SYMBOLS.filter(s => s.id !== sym.id && s.category !== sym.category);
    const distractors = shuffle([...sameCat, ...diffCat]).slice(0, 3);
    const options = shuffle([sym, ...distractors]);
    return { symbol: sym, options, correctId: sym.id };
  });
}

export default function MifcSymbolQuiz({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const [questions] = useState<Question[]>(() => buildQuestions());
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(QUIZ_SIZE).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);  // selected this turn (before advancing)
  const [quizComplete, setQuizComplete] = useState(false);

  const q = questions[current];

  const score = useMemo(() => {
    return answers.filter((a, i) => a === questions[i]?.correctId).length;
  }, [answers, questions]);

  const passed = score / QUIZ_SIZE >= PASS_THRESHOLD;

  function handleChoice(id: string) {
    if (chosen) return; // already answered
    setChosen(id);
    const newAnswers = [...answers];
    newAnswers[current] = id;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (current < QUIZ_SIZE - 1) {
      setCurrent(c => c + 1);
      setChosen(null);
    } else {
      setQuizComplete(true);
    }
  }

  function handleRetry() {
    // Re-shuffle by reloading state — but we can't reset questions state (useState initializer only runs once)
    // so we reload the page for a fresh quiz
    window.location.reload();
  }

  // ── Results screen ────────────────────────────────────────────────────────
  if (quizComplete) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className={`panel p-8 text-center space-y-4 ${passed ? 'border-green-300 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <div className="text-6xl">{passed ? '🎯' : '📚'}</div>
          <h2 className="text-2xl font-bold text-gray-900">
            {passed
              ? (lang === 'en' ? 'Symbol Library Certified!' : '記号ライブラリ認定！')
              : (lang === 'en' ? 'Not Quite Yet' : 'もう少し')}
          </h2>
          <div className="text-5xl font-black" style={{ color: passed ? '#15803d' : '#dc2626' }}>
            {score}/{QUIZ_SIZE}
          </div>
          <p className="text-sm text-gray-600">
            {passed
              ? (lang === 'en'
                  ? 'You correctly identified the symbols. You\'re ready to read a real MIFC.'
                  : '記号を正確に識別できました。本物のMIFCを読む準備ができています。')
              : (lang === 'en'
                  ? `You need ${Math.ceil(QUIZ_SIZE * PASS_THRESHOLD)} correct to pass (${Math.round(PASS_THRESHOLD * 100)}%). Review the Symbol Reference and try again.`
                  : `合格には${Math.ceil(QUIZ_SIZE * PASS_THRESHOLD)}問正解が必要です（${Math.round(PASS_THRESHOLD * 100)}%）。記号リファレンスを見直してもう一度挑戦してください。`)}
          </p>

          {/* Per-question review */}
          <div className="text-left space-y-2 mt-4">
            {questions.map((qu, i) => {
              const userAns = answers[i];
              const correct = userAns === qu.correctId;
              const wrongSym = !correct && userAns ? MIFC_SYMBOLS.find(s => s.id === userAns) : null;
              return (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <span className="text-base shrink-0">{correct ? '✅' : '❌'}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <qu.symbol.Component className="w-8 h-8 shrink-0" />
                      <span className="text-sm font-semibold text-gray-800">
                        {lang === 'en' ? qu.symbol.nameEn : qu.symbol.nameJa}
                      </span>
                    </div>
                    {!correct && wrongSym && (
                      <p className="text-xs text-red-600 mt-0.5">
                        {lang === 'en' ? `You answered: ${wrongSym.nameEn}` : `あなたの回答：${wrongSym.nameJa}`}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={handleRetry}
              className="btn text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
            >
              {lang === 'en' ? 'Retry Quiz' : 'クイズを再挑戦'}
            </button>
            {(passed || alreadyDone) && (
              <button
                onClick={onComplete}
                className="btn-primary text-sm"
              >
                {lang === 'en' ? 'Read the Map →' : 'マップを読む →'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Active quiz ───────────────────────────────────────────────────────────
  const isCorrect = chosen === q.correctId;
  const isWrong = chosen && chosen !== q.correctId;

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                i < current ? (answers[i] === questions[i].correctId ? 'bg-green-500' : 'bg-red-400')
                  : i === current ? 'bg-blue-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 shrink-0">{current + 1}/{QUIZ_SIZE}</span>
      </div>

      {/* Question card */}
      <div className="panel p-6 text-center space-y-4">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {lang === 'en' ? 'Which symbol is this?' : 'これはどの記号ですか？'}
        </p>

        {/* Big symbol display */}
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center p-4">
            <q.symbol.Component className="w-full h-full" />
          </div>
        </div>

        {/* Feedback */}
        {chosen && (
          <div className={`text-sm font-semibold py-2 px-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isCorrect
              ? (lang === 'en' ? '✅ Correct!' : '✅ 正解！')
              : (lang === 'en' ? `❌ That's ${MIFC_SYMBOLS.find(s => s.id === chosen)?.nameEn || ''}. The answer is ${q.symbol.nameEn}.` : `❌ それは${MIFC_SYMBOLS.find(s => s.id === chosen)?.nameJa || ''}です。正解は${q.symbol.nameJa}。`)}
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {q.options.map(opt => {
            let state: 'default' | 'correct' | 'wrong' | 'reveal' = 'default';
            if (chosen) {
              if (opt.id === q.correctId) state = 'reveal';
              else if (opt.id === chosen) state = 'wrong';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleChoice(opt.id)}
                disabled={!!chosen}
                className={`p-3 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                  state === 'reveal'
                    ? 'border-green-500 bg-green-50'
                    : state === 'wrong'
                      ? 'border-red-400 bg-red-50'
                      : state === 'default' && chosen
                        ? 'border-gray-200 bg-gray-50 opacity-50'
                        : 'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                }`}
              >
                <opt.Component className="w-10 h-10 shrink-0" />
                <span className="text-sm font-medium text-gray-800">
                  {lang === 'en' ? opt.nameEn : opt.nameJa}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Next button */}
      {chosen && (
        <div className="flex justify-end animate-fade-in">
          <button onClick={handleNext} className="btn-primary text-sm">
            {current < QUIZ_SIZE - 1
              ? (lang === 'en' ? 'Next →' : '次へ →')
              : (lang === 'en' ? 'See Results →' : '結果を見る →')}
          </button>
        </div>
      )}
    </div>
  );
}
