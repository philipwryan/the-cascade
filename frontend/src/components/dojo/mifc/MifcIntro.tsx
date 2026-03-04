'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

const SECTIONS = ['memo', 'concept', 'rules'] as const;
type Section = typeof SECTIONS[number];

export default function MifcIntro({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const [read, setRead] = useState<Set<Section>>(new Set());
  const [active, setActive] = useState<Section>('memo');

  const allRead = SECTIONS.every(s => read.has(s));

  function open(s: Section) {
    setActive(s);
    setRead(prev => new Set([...prev, s]));
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Dana Wren header */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-red-700 flex items-center justify-center text-2xl font-bold shrink-0">
            DW
          </div>
          <div>
            <p className="font-bold text-lg leading-tight">Dana Wren</p>
            <p className="text-red-400 text-sm">Operations Director, Riverstone Audio</p>
            <p className="text-neutral-400 text-xs mt-0.5">
              {lang === 'en' ? 'Sent via internal ops memo' : '社内オペレーションメモで送信'}
            </p>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'memo' as Section, labelEn: '📋 Assignment Memo', labelJa: '📋 任務メモ' },
          { id: 'concept' as Section, labelEn: '🗺 What is an MIFC?', labelJa: '🗺 MIFCとは？' },
          { id: 'rules' as Section, labelEn: '📐 The 5 Rules', labelJa: '📐 5つのルール' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => open(tab.id)}
            className={`pb-2 px-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 ${
              active === tab.id
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {lang === 'en' ? tab.labelEn : tab.labelJa}
            {read.has(tab.id) && <span className="text-green-500 text-xs">✓</span>}
          </button>
        ))}
      </div>

      {/* Content panels */}
      {active === 'memo' && (
        <div className="panel p-6 space-y-4 font-mono text-sm bg-amber-50 border border-amber-200">
          <div className="flex justify-between text-xs text-gray-500 border-b border-amber-200 pb-2">
            <span className="font-bold uppercase tracking-widest text-amber-800">Internal Memo — Confidential</span>
            <span>Riverstone Audio · Columbus OH</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 border-b border-amber-200 pb-3">
            <span><span className="font-semibold">TO:</span> Field Analyst (you)</span>
            <span><span className="font-semibold">FROM:</span> D. Wren, Ops Director</span>
            <span><span className="font-semibold">RE:</span> RS-7 Production Flow Review</span>
            <span><span className="font-semibold">DATE:</span> Week 11, Q1</span>
          </div>

          {lang === 'en' ? (
            <div className="space-y-3 text-gray-800 leading-relaxed">
              <p>
                I need a complete <strong>Material and Information Flow Chart</strong> of the RS-7 Bluetooth speaker line—start-to-finish—on my desk by end of week.
              </p>
              <p>
                We are shipping 800 units per day to AudioZone retail. Our PCB lead time is sitting at <strong>14 days</strong>. Assembly is falling behind takt. Someone told me we have a scheduling problem. I need to see it with my own eyes on paper before I believe anything.
              </p>
              <p>
                Your job: walk every step from raw PCB receipt to finished goods dispatch. Capture the data. Draw the map. Then tell me where the waste is.
              </p>
              <p className="text-amber-800 font-semibold border-l-4 border-amber-500 pl-3">
                Do not come back with opinions. Come back with a map and facts.
              </p>
              <p className="text-xs text-gray-500">— D. Wren</p>
            </div>
          ) : (
            <div className="space-y-3 text-gray-800 leading-relaxed">
              <p>
                RS-7 Bluetoothスピーカーラインの<strong>物と情報の流れ図（MIFC）</strong>が必要です。最初から最後まで—今週末までに私のデスクに。
              </p>
              <p>
                AudioZoneリテールへ1日800台を出荷しています。PCBのリードタイムは<strong>14日間</strong>のまま。組み立てはタクトに追いつけていない。スケジュールに問題があると言われましたが、何かを信じる前に自分の目で確かめる必要があります。
              </p>
              <p>
                あなたの仕事：PCB入荷から完成品出荷まで全工程を歩いてください。データを収集し、マップを描き、無駄がどこにあるか教えてください。
              </p>
              <p className="text-amber-800 font-semibold border-l-4 border-amber-500 pl-3">
                意見を持って戻らないでください。マップと事実を持って戻ってください。
              </p>
              <p className="text-xs text-gray-500">— D. Wren</p>
            </div>
          )}
        </div>
      )}

      {active === 'concept' && (
        <div className="panel p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {lang === 'en' ? 'What is a Material & Information Flow Chart?' : '物と情報の流れ図とは？'}
            </h2>
            <p className="text-sm text-gray-600">
              {lang === 'en'
                ? 'Toyota\'s tool for making the invisible visible. Called "Value Stream Map" (VSM) in the West.'
                : 'トヨタが見えないものを見えるようにするためのツール。欧米では「バリューストリームマップ（VSM）」と呼ばれる。'}
            </p>
          </div>

          {/* Two-flow diagram */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              {lang === 'en' ? 'The Two Flows' : '2つの流れ'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-0.5 bg-gray-900" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {lang === 'en' ? '→ Material Flow (solid line, L to R)' : '→ 物の流れ（実線、左から右へ）'}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === 'en'
                      ? 'Raw material → Process 1 → Process 2 → Finished Goods → Customer'
                      : '原材料 → 工程1 → 工程2 → 完成品 → 顧客'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-amber-500" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-700">
                    {lang === 'en' ? '← Information Flow (dashed line, R to L)' : '← 情報の流れ（点線、右から左へ）'}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === 'en'
                      ? 'Customer orders → Scheduler → Purchase orders → Supplier'
                      : '顧客注文 → スケジューラー → 発注書 → サプライヤー'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Three questions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {lang === 'en' ? 'An MIFC answers 3 questions:' : 'MIFCは3つの質問に答える：'}
            </h3>
            <div className="space-y-2">
              {[
                {
                  q: lang === 'en' ? '1. How does material actually move?' : '1. 材料は実際にどのように動くか？',
                  a: lang === 'en' ? 'Push or pull? Batches or single piece?' : 'プッシュかプルか？バッチか1個流しか？',
                },
                {
                  q: lang === 'en' ? '2. How does information trigger action?' : '2. 情報はどのようにアクションを引き起こすか？',
                  a: lang === 'en' ? 'MRP schedules? Kanban cards? Verbal shouts?' : 'MRPスケジュール？かんばんカード？口頭指示？',
                },
                {
                  q: lang === 'en' ? '3. Where does time go?' : '3. 時間はどこへ行くか？',
                  a: lang === 'en' ? 'Value-added time vs. total lead time' : '付加価値時間 vs. 総リードタイム',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-800">{item.q}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {active === 'rules' && (
        <div className="panel p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {lang === 'en' ? 'The 5 Non-Negotiable Rules' : '5つの絶対ルール'}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === 'en'
                ? 'These rules are what separate a real MIFC from a pretty diagram.'
                : 'これらのルールが本物のMIFCと単なる綺麗な図を区別する。'}
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                rule: lang === 'en' ? 'Walk the flow yourself' : '自分で流れを歩く',
                detail: lang === 'en'
                  ? 'No MIFC from a conference room. You must stand in the factory and observe. Dana\'s rule #1.'
                  : '会議室からMIFCを描かない。工場に立って観察すること。Danaのルール#1。',
                icon: '🚶',
              },
              {
                rule: lang === 'en' ? 'One product family, one map' : '1製品ファミリー、1マップ',
                detail: lang === 'en'
                  ? 'Pick one product family (e.g., RS-7 speakers). Map that flow end-to-end. Do not average across products.'
                  : '1つの製品ファミリーを選ぶ（例：RS-7スピーカー）。その流れを端から端まで描く。製品間で平均しない。',
                icon: '🎯',
              },
              {
                rule: lang === 'en' ? 'Material left-to-right, Info right-to-left' : '物は左から右、情報は右から左',
                detail: lang === 'en'
                  ? 'Supplier top-left. Customer top-right. Material flows across the bottom. Information flows back across the top.'
                  : 'サプライヤーは左上。顧客は右上。物は下を流れる。情報は上を逆流する。',
                icon: '↔️',
              },
              {
                rule: lang === 'en' ? 'Pencil and paper first' : 'まず鉛筆と紙で',
                detail: lang === 'en'
                  ? 'Always sketch by hand on the gemba. No laptops. Data accuracy over drawing beauty.'
                  : '常に現場で手書きスケッチ。ノートパソコン禁止。図の美しさより数据の正確さ。',
                icon: '✏️',
              },
              {
                rule: lang === 'en' ? 'Show takt time on every map' : '全てのマップにタクトタイムを表示',
                detail: lang === 'en'
                  ? 'Takt = heartbeat of the customer. Without it you cannot identify where processes are behind or over-running.'
                  : 'タクト＝顧客の鼓動。これなしでは工程が遅れているか過剰かを特定できない。',
                icon: '⏱',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-2xl shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{i + 1}. {item.rule}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion gate */}
      {!alreadyDone && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex gap-2">
            {SECTIONS.map(s => (
              <div
                key={s}
                className={`w-2.5 h-2.5 rounded-full ${read.has(s) ? 'bg-green-500' : 'bg-gray-300'}`}
                title={s}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              {lang === 'en' ? `${read.size} of ${SECTIONS.length} sections read` : `${read.size}/${SECTIONS.length}セクション読了`}
            </span>
          </div>
          <button
            onClick={onComplete}
            disabled={!allRead}
            className={`text-xs font-semibold py-2 px-4 rounded-lg transition-all ${
              allRead
                ? 'bg-blue-700 hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {allRead
              ? (lang === 'en' ? 'Assignment Accepted →' : '任務承諾 →')
              : (lang === 'en' ? 'Read all sections first' : '全セクションを読んでください')}
          </button>
        </div>
      )}

      {alreadyDone && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 text-sm font-medium">
          ✅ {lang === 'en' ? 'Assignment accepted. You understand the mission.' : '任務承諾済み。ミッションを理解しています。'}
        </div>
      )}
    </div>
  );
}
