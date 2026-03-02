'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

interface QuizQuestion {
  qEn: string;
  qJa: string;
  choices: { en: string; ja: string }[];
  correct: number; // 0-indexed
  explEn: string;
  explJa: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    qEn: 'In JIT, "Takt Time" is defined as:',
    qJa: 'JITにおける「タクトタイム」の定義は：',
    choices: [
      { en: 'The time it takes to manufacture one unit', ja: '1ユニットを製造するのにかかる時間' },
      { en: 'Available production time ÷ Customer demand rate', ja: '利用可能生産時間 ÷ 顧客需要率' },
      { en: 'The speed of the fastest machine in the cell', ja: 'セル内の最も速い機械の速度' },
      { en: 'The time between equipment failures', ja: '設備故障の間隔' },
    ],
    correct: 1,
    explEn: 'Takt Time = Available Time ÷ Customer Demand. It sets the rhythm of production — make one unit every N seconds, no faster, no slower.',
    explJa: 'タクトタイム＝利用可能時間÷顧客需要。生産のリズムを設定する—N秒ごとに1ユニット製造、それ以上でも以下でもない。',
  },
  {
    qEn: 'Jidoka (自働化) is best described as:',
    qJa: '自働化（Jidoka）の最も適切な説明は：',
    choices: [
      { en: 'Full automation without human oversight', ja: '人間の監視なしの完全自動化' },
      { en: 'Automation that detects abnormalities and stops to allow human intervention', ja: '異常を検知して停止し、人間の介入を可能にする自動化' },
      { en: 'A Japanese word for robotic assembly', ja: 'ロボット組立の日本語' },
      { en: 'Reducing the number of operators on a line', ja: 'ライン上の作業者数を減らすこと' },
    ],
    correct: 1,
    explEn: 'Jidoka = "autonomation" — automation WITH a human touch. Machines detect abnormalities, stop, and signal humans to fix the root cause. Quality built in, not inspected in.',
    explJa: '自働化＝「人の手を加えた自動化」。機械は異常を検知して停止し、人間に根本原因の修正を促す。品質は検査で確保するのではなく、作り込む。',
  },
  {
    qEn: 'A "pull system" in JIT means:',
    qJa: 'JITにおける「プルシステム」とは：',
    choices: [
      { en: 'Upstream processes push parts downstream as fast as possible', ja: '上流工程が部品をできる限り速く下流に押し出す' },
      { en: 'Downstream processes signal upstream when they need parts', ja: '下流工程が必要な時に上流に信号を送る' },
      { en: 'A rope attached to conveyors to control speed', ja: 'コンベアに取り付けられた速度制御用のロープ' },
      { en: 'Management pulling operators from different departments', ja: '管理職が異なる部門から作業者を引き集めること' },
    ],
    correct: 1,
    explEn: 'Pull = make nothing until the downstream process asks for it. Prevents overproduction. Kanban cards are the most common pull signal.',
    explJa: 'プル＝下流工程が要求するまで何も作らない。過剰生産を防ぐ。カンバンカードが最も一般的なプルシグナル。',
  },
  {
    qEn: 'When an Andon cord is pulled on a Toyota assembly line, what happens?',
    qJa: 'トヨタの組立ラインでアンドンコードが引かれると何が起こるか？',
    choices: [
      { en: 'The operator is disciplined for stopping production', ja: '作業者は生産を止めたとして罰せられる' },
      { en: 'A team leader responds, the problem is identified, and the line stops if not fixed by the next station', ja: 'チームリーダーが対応し、問題を特定し、次のステーションまでに解決しなければラインが停止する' },
      { en: 'The entire factory shuts down immediately', ja: '工場全体が即座に停止する' },
      { en: 'Quality inspectors come to approve or reject the part', ja: '品質検査官が部品を承認または拒否しに来る' },
    ],
    correct: 1,
    explEn: 'The Andon system gives operators authority to signal problems. Team leaders respond immediately. The line only stops if the problem cannot be resolved before the "fixed position stop" — maintaining flow while ensuring quality.',
    explJa: 'アンドンシステムは作業者に問題を知らせる権限を与える。チームリーダーが即座に対応。「固定停止位置」までに解決できない場合のみラインが停止する—品質を確保しながらフローを維持する。',
  },
  {
    qEn: 'Which of these is NOT a characteristic of JIT production?',
    qJa: '次のうち、JIT生産の特徴でないものは：',
    choices: [
      { en: 'Small lot sizes', ja: '小ロットサイズ' },
      { en: 'Large safety stock buffers at every station', ja: '各ステーションに大きな安全在庫バッファー' },
      { en: 'Continuous flow between processes', ja: '工程間の連続フロー' },
      { en: 'Production matched to customer demand rate', ja: '顧客需要率に合わせた生産' },
    ],
    correct: 1,
    explEn: 'JIT eliminates large inventory buffers. Safety stock hides problems — JIT exposes them by reducing the "water level" until you see the rocks (problems) beneath.',
    explJa: 'JITは大きな在庫バッファーを排除する。安全在庫は問題を隠す—JITは「水位」を下げることで問題という「岩」を露出させる。',
  },
];

export default function TwoPillarsQuiz({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const td = getDojoT(lang);

  const [currentQ, setCurrentQ]       = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [confirmed, setConfirmed]     = useState(false);
  const [answers, setAnswers]         = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [phase, setPhase]             = useState<'quiz' | 'review'>(alreadyDone ? 'review' : 'quiz');

  if (alreadyDone && answers.every(a => a === null)) {
    // Pre-fill all correct for alreadyDone
  }

  function handleConfirm() {
    if (selectedOpt === null) return;
    const next = [...answers];
    next[currentQ] = selectedOpt;
    setAnswers(next);
    setConfirmed(true);
  }

  function handleNext() {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setSelectedOpt(null);
      setConfirmed(false);
    } else {
      setPhase('review');
      if (!alreadyDone) onComplete();
    }
  }

  const q = QUESTIONS[currentQ];
  const question  = lang === 'ja' ? q.qJa : q.qEn;
  const expl      = lang === 'ja' ? q.explJa : q.explEn;
  const score     = answers.filter((a, i) => a === QUESTIONS[i].correct).length;

  if (phase === 'review') {
    return (
      <div className="space-y-5">
        <div className="panel p-4 bg-green-50 border-green-200 text-center">
          <p className="text-xs font-bold text-green-800">{td('quizComplete')}</p>
          <p className="text-2xl font-bold text-green-700 mt-1">
            {score}/{QUESTIONS.length}
          </p>
          <p className="text-[10px] text-green-600 mt-0.5">
            {td('yourScore')} {score} {td('outOf')} {QUESTIONS.length}
          </p>
        </div>

        <div className="space-y-3">
          {QUESTIONS.map((qq, i) => {
            const userAns = alreadyDone ? qq.correct : answers[i];
            const isRight = userAns === qq.correct;
            return (
              <div key={i} className={`panel p-3 ${isRight ? 'border-green-200' : 'border-red-200'}`}>
                <div className="flex items-start gap-2 mb-2">
                  <span className={`text-[11px] shrink-0 mt-0.5 ${isRight ? 'text-green-600' : 'text-red-500'}`}>
                    {isRight ? '✓' : '✗'}
                  </span>
                  <p className="text-[10px] font-semibold text-gray-700 leading-snug">
                    {lang === 'ja' ? qq.qJa : qq.qEn}
                  </p>
                </div>
                <div className="ml-4">
                  <p className="text-[10px] text-green-700 font-medium mb-1">
                    {lang === 'ja' ? '正解：' : 'Answer: '}{lang === 'ja' ? qq.choices[qq.correct].ja : qq.choices[qq.correct].en}
                  </p>
                  <p className="text-[10px] text-gray-500 leading-relaxed italic">
                    {lang === 'ja' ? qq.explJa : qq.explEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {!alreadyDone && (
          <p className="text-[10px] text-gray-400 text-center">
            {lang === 'ja' ? '✓ このステップは完了しました' : '✓ Step marked complete'}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Progress */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-500 shrink-0">
          {td('questionLabel')} {currentQ + 1} {td('ofLabel')} {QUESTIONS.length}
        </span>
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="panel p-4">
        <p className="text-xs font-semibold text-gray-800 leading-relaxed">{question}</p>
      </div>

      {/* Choices */}
      <div className="space-y-2">
        {q.choices.map((choice, i) => {
          const label = lang === 'ja' ? choice.ja : choice.en;
          let cls = 'border-gray-200 hover:border-gray-300';

          if (confirmed) {
            if (i === q.correct) cls = 'border-green-400 bg-green-50';
            else if (i === selectedOpt) cls = 'border-red-300 bg-red-50';
            else cls = 'border-gray-200 opacity-50';
          } else if (selectedOpt === i) {
            cls = 'border-blue-400 bg-blue-50';
          }

          return (
            <button
              key={i}
              onClick={() => { if (!confirmed) setSelectedOpt(i); }}
              className={`w-full p-3 rounded border text-left transition-colors ${cls}
                          ${confirmed ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-start gap-2">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
                                 ${selectedOpt === i && !confirmed ? 'border-blue-500' :
                                   confirmed && i === q.correct ? 'border-green-500' :
                                   confirmed && i === selectedOpt ? 'border-red-400' :
                                   'border-gray-300'}`}>
                  {confirmed && i === q.correct && (
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                  {!confirmed && selectedOpt === i && (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <span className="text-[11px] text-gray-700 leading-snug">{label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation after confirming */}
      {confirmed && (
        <div className="panel p-3 bg-amber-50/50 border-amber-100">
          <p className="text-[10px] text-amber-800 leading-relaxed">{expl}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        {!confirmed ? (
          <button
            onClick={handleConfirm}
            disabled={selectedOpt === null}
            className="btn-primary text-xs disabled:opacity-40"
          >
            {td('submitAnswer')}
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary text-xs">
            {currentQ < QUESTIONS.length - 1
              ? td('nextQuestion')
              : (lang === 'ja' ? '結果を見る →' : 'See Results →')}
          </button>
        )}
      </div>
    </div>
  );
}
