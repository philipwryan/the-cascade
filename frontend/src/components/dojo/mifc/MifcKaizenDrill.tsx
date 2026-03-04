'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

interface KaizenPoint {
  id: string;
  x: number;
  y: number;
  labelEn: string;
  labelJa: string;
  kpi: string;
  wasteTypeEn: string;
  wasteTypeJa: string;
  rootCauseEn: string;
  rootCauseJa: string;
  recommendationEn: string;
  recommendationJa: string;
  leanCategory: '7-wastes' | 'flow' | 'pull' | 'quality' | 'OEE';
}

interface DrillQuestion {
  id: string;
  kaizenPointId: string;
  questionEn: string;
  questionJa: string;
  options: { id: string; labelEn: string; labelJa: string }[];
  correctId: string;
  explanationEn: string;
  explanationJa: string;
}

const KAIZEN_POINTS: KaizenPoint[] = [
  {
    id: 'injection',
    x: 155,
    y: 168,
    labelEn: 'Injection Molding\n52% OEE',
    labelJa: '射出成形\n52% OEE',
    kpi: '52% OEE',
    wasteTypeEn: 'Defects / Waiting (machine downtime)',
    wasteTypeJa: '不良 / 待機（機械ダウンタイム）',
    rootCauseEn: 'Equipment reliability — 52% OEE means the machine is only producing good parts 52% of available time. Industry target is >85%.',
    rootCauseJa: '設備信頼性 — OEE52%は稼働可能時間の52%しか良品を生産していない。業界目標は85%以上。',
    recommendationEn: 'Launch TPM (Total Productive Maintenance) program. Track 6 big losses. Target OEE ≥80% within 90 days.',
    recommendationJa: 'TPM（全員参加の生産保全）プログラムを開始する。6大ロスを追跡。90日以内にOEE≥80%を目標。',
    leanCategory: 'OEE',
  },
  {
    id: 'pcb-stock',
    x: 243,
    y: 265,
    labelEn: 'PCB Inventory\n8-day buffer',
    labelJa: 'PCB在庫\n8日バッファ',
    kpi: '8 days',
    wasteTypeEn: 'Inventory (overstock)',
    wasteTypeJa: '在庫（過剰在庫）',
    rootCauseEn: 'Weekly batch ordering from Shenzhen. 500 boards arrive at once; daily consumption is ~800. Mismatch between order frequency and demand rate.',
    rootCauseJa: '深センからの週次バッチ発注。500基板が一度に到着；1日の消費量は約800。発注頻度と需要レートの不一致。',
    recommendationEn: 'Negotiate smaller, more frequent deliveries (daily or 2×/week). Aim for ≤2 day PCB buffer. Consider local PCB stockist as fallback supplier.',
    recommendationJa: 'より小さく頻繁な納品を交渉（毎日または週2回）。PCBバッファ≤2日を目標。フォールバックサプライヤーとしてローカルPCB在庫業者を検討。',
    leanCategory: '7-wastes',
  },
  {
    id: 'qc-inspect',
    x: 553,
    y: 168,
    labelEn: 'QC: 200%\nInspection',
    labelJa: 'QC: 200%\n検査',
    kpi: '200% inspect',
    wasteTypeEn: 'Over-processing',
    wasteTypeJa: '過剰加工',
    rootCauseEn: '100% inspection at Test & QC, PLUS a second verification pass. This doubles inspection time (C/T already 45s) without improving defect rates — it just catches the same defects twice.',
    rootCauseJa: 'テスト&QCで100%検査、さらに2回目の確認パス。これにより検査時間が倍増（C/Tはすでに45秒）するが、不良率は改善されない — 同じ不良を2回検出するだけ。',
    recommendationEn: 'Root-cause the defects driving the 2nd pass. Implement poka-yoke at Final Assembly to prevent defects at source. Target: eliminate 2nd pass within 60 days.',
    recommendationJa: '2回目のパスを引き起こす不良の根本原因を追究。最終組立でポカヨケを実装して不良を発生源で防止。目標：60日以内に2回目のパスを廃止。',
    leanCategory: 'quality',
  },
  {
    id: 'push-sched',
    x: 400,
    y: 82,
    labelEn: 'Paper Push\nScheduling',
    labelJa: 'ペーパープッシュ\nスケジューリング',
    kpi: 'Push / MRP',
    wasteTypeEn: 'Overproduction / Inventory (push creates WIP)',
    wasteTypeJa: '過剰生産 / 在庫（プッシュがWIPを生み出す）',
    rootCauseEn: 'MRP-generated weekly paper schedules pushed to all 5 processes independently. Each process produces to plan, not to downstream demand. WIP accumulates at every handoff point.',
    rootCauseJa: 'MRP生成の週次紙スケジュールが5つの工程すべてに独立してプッシュされる。各工程は下流需要ではなく計画通りに生産。すべての引き渡しポイントでWIPが蓄積する。',
    recommendationEn: 'Pilot a pull system between Final Assembly and Test & QC using kanban cards. Expand upstream once stable. Replace paper with electronic kanban board.',
    recommendationJa: '最終組立とテスト&QCの間でかんばんカードを使用したプルシステムをパイロット実施。安定したら上流に拡大。紙を電子かんばんボードに置き換える。',
    leanCategory: 'pull',
  },
];

const DRILL_QUESTIONS: DrillQuestion[] = [
  {
    id: 'q1',
    kaizenPointId: 'injection',
    questionEn: 'Injection Molding has 52% OEE. In the Toyota 7 wastes framework, which waste type best describes this loss?',
    questionJa: '射出成形のOEEが52%。トヨタ7つの無駄のフレームワークでは、どの無駄のタイプがこの損失を最もよく表していますか？',
    options: [
      { id: 'a', labelEn: 'Transportation — moving parts too far', labelJa: '運搬 — 部品を遠くに移動しすぎる' },
      { id: 'b', labelEn: 'Waiting — machine downtime reduces available capacity', labelJa: '待機 — 機械ダウンタイムが利用可能な能力を減らす' },
      { id: 'c', labelEn: 'Motion — operators walk too much', labelJa: '動作 — オペレーターが歩きすぎる' },
      { id: 'd', labelEn: 'Inventory — too many raw materials stored', labelJa: '在庫 — 原材料が多すぎる' },
    ],
    correctId: 'b',
    explanationEn: 'Low OEE is primarily Waiting waste — the machine sits idle during breakdowns, setups, and minor stoppages. It can also include Defects waste if poor quality runs are included in the OEE calculation.',
    explanationJa: '低いOEEは主に待機の無駄 — 機械は故障、段取り、小停止中にアイドル状態。OEE計算に品質不良稼働が含まれる場合は不良の無駄も含まれる。',
  },
  {
    id: 'q2',
    kaizenPointId: 'pcb-stock',
    questionEn: 'The 8-day PCB buffer costs money. If one PCB board costs $12 and Riverstone holds 8 days × 800 units of stock, what is the approximate inventory holding cost at 20% annual carrying cost?',
    questionJa: '8日間PCBバッファはお金がかかります。PCB基板1枚が$12で、Riverstoneが8日×800台の在庫を保有する場合、年間保有コスト20%での概算在庫保有コストはいくらですか？',
    options: [
      { id: 'a', labelEn: '$15,360 per year', labelJa: '年間$15,360' },
      { id: 'b', labelEn: '$1,280 per year', labelJa: '年間$1,280' },
      { id: 'c', labelEn: '$76,800 per year', labelJa: '年間$76,800' },
      { id: 'd', labelEn: '$384 per year', labelJa: '年間$384' },
    ],
    correctId: 'a',
    explanationEn: 'Stock value = 8d × 800 units × $12 = $76,800. Annual carrying cost = $76,800 × 20% = $15,360/year. That\'s over $1,200/month just for holding the excess PCB inventory.',
    explanationJa: '在庫価値＝8日×800台×$12＝$76,800。年間保有コスト＝$76,800×20%＝$15,360/年。過剰PCB在庫を保有するだけで月$1,200以上。',
  },
  {
    id: 'q3',
    kaizenPointId: 'qc-inspect',
    questionEn: 'The 200% inspection at QC doubles cycle time. What lean principle does this violate, and what is the better approach?',
    questionJa: 'QCでの200%検査はサイクルタイムを倍増させる。これはどのリーン原則に違反しており、より良いアプローチは何ですか？',
    options: [
      { id: 'a', labelEn: 'It violates heijunka — we should level inspect evenly', labelJa: 'ヘイジュンカに違反 — 均等に検査を平準化すべき' },
      { id: 'b', labelEn: 'It violates "build quality in" — detect defects at source with poka-yoke, not after the fact', labelJa: '「品質を作り込む」に違反 — 事後ではなく発生源でポカヨケで不良を検出すべき' },
      { id: 'c', labelEn: 'It violates 5S — the inspection station is disorganized', labelJa: '5Sに違反 — 検査ステーションが整理されていない' },
      { id: 'd', labelEn: 'Inspection is never waste — it always adds value', labelJa: '検査は決して無駄ではない — 常に価値を加える' },
    ],
    correctId: 'b',
    explanationEn: 'Toyota\'s quality philosophy is "build it right the first time." Detection-based quality (inspection) is waste — it only finds defects AFTER they\'re made. Prevention-based quality (poka-yoke, jidoka) stops defects from being made at all.',
    explanationJa: 'トヨタの品質哲学は「最初から正しく作る」。検出ベースの品質（検査）は無駄 — 不良が作られた後でしか見つけない。防止ベースの品質（ポカヨケ、自働化）はそもそも不良が作られないようにする。',
  },
  {
    id: 'q4',
    kaizenPointId: 'push-sched',
    questionEn: 'Riverstone uses paper push scheduling (MRP → all processes). Which lean scheduling mechanism would best replace this for the final 2 processes (Final Assembly → Test & QC)?',
    questionJa: 'RiverstoneはペーパープッシュスケジューリングMRP→全工程）を使用。最後の2工程（最終組立→テスト&QC）に最も適したリーンスケジューリングメカニズムはどれですか？',
    options: [
      { id: 'a', labelEn: 'FIFO lane — parts flow in strict sequence, no kanban needed', labelJa: 'FIFOレーン — 部品が厳密な順序で流れ、かんばん不要' },
      { id: 'b', labelEn: 'Replenishment kanban — QC signals Final Assembly when it needs more units', labelJa: '補充かんばん — QCが追加ユニットが必要なときに最終組立に信号送信' },
      { id: 'c', labelEn: 'Heijunka box — level the production across all 5 processes simultaneously', labelJa: 'ヘイジュンカボックス — 5つの工程すべてを同時に生産平準化' },
      { id: 'd', labelEn: 'Continue paper push but print schedules daily instead of weekly', labelJa: 'ペーパープッシュを継続するが週次ではなく毎日スケジュールを印刷' },
    ],
    correctId: 'b',
    explanationEn: 'A replenishment kanban between Final Assembly and Test & QC creates a direct pull signal: QC only authorizes Final Assembly to produce when QC capacity is available. This prevents WIP buildup between the two processes.',
    explanationJa: '最終組立とテスト&QCの間の補充かんばんは直接的なプル信号を作る：QCはQC能力が利用可能な時のみ最終組立に生産を許可する。これにより2工程間のWIP蓄積が防がれる。',
  },
];

// ── Kaizen annotated MIFC SVG ─────────────────────────────────────────────────

interface KaizenSvgProps {
  activeId: string | null;
  completedIds: Set<string>;
  onSelectPoint: (id: string) => void;
}

function KaizenMifcSVG({ activeId, completedIds, onSelectPoint }: KaizenSvgProps) {
  return (
    <svg viewBox="0 0 800 400" className="w-full border border-gray-200 rounded-xl bg-white" style={{ fontFamily: 'sans-serif', fontSize: 10 }}>
      {/* Static MIFC background elements */}
      <text x="400" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6b7280">
        Riverstone Audio RS-7 — Current State MIFC — Kaizen Points
      </text>

      {/* External entities */}
      <rect x="20" y="30" width="85" height="50" rx="4" fill="#fafafa" stroke="#374151" strokeWidth="1.5" />
      <text x="62" y="50" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111827">PCB-Tech Ltd.</text>
      <text x="62" y="62" textAnchor="middle" fontSize="7" fill="#6b7280">Shenzhen</text>
      <text x="62" y="73" textAnchor="middle" fontSize="7" fill="#6b7280">LT: 14d</text>

      <rect x="695" y="30" width="85" height="50" rx="4" fill="#fafafa" stroke="#374151" strokeWidth="1.5" />
      <text x="737" y="50" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111827">AudioZone</text>
      <text x="737" y="62" textAnchor="middle" fontSize="7" fill="#6b7280">800 units/day</text>
      <text x="737" y="73" textAnchor="middle" fontSize="7" fill="#6b7280">Takt: 33.75s</text>

      {/* Production Control */}
      <rect x="320" y="45" width="160" height="40" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="63" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#713f12">Production Control</text>
      <text x="400" y="75" textAnchor="middle" fontSize="7" fill="#92400e">MRP — weekly paper push</text>

      {/* Process boxes */}
      {[
        { name: 'Injection\nMolding', x: 105, ct: 28, note: '52% OEE', overTakt: false },
        { name: 'PCB\nSub-Assy', x: 235, ct: 62, note: 'BOTTLENECK', overTakt: true },
        { name: 'Final\nAssembly', x: 365, ct: 38, note: '4 operators', overTakt: true },
        { name: 'Test &\nQC', x: 495, ct: 45, note: '200% inspect', overTakt: true },
        { name: 'Packaging', x: 625, ct: 22, note: '2 operators', overTakt: false },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y="140" width="100" height="50" rx="4"
            fill={p.overTakt ? '#fff1f2' : '#f0f9ff'}
            stroke={p.overTakt ? '#f87171' : '#0369a1'}
            strokeWidth={i === 1 ? 2.5 : 1.5}
          />
          <text x={p.x + 50} y="158" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111827">{p.name.split('\n')[0]}</text>
          <text x={p.x + 50} y="168" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111827">{p.name.split('\n')[1]}</text>
          <rect x={p.x} y="190" width="100" height="22" rx="0" fill="white" stroke={p.overTakt ? '#f87171' : '#93c5fd'} strokeWidth="1" />
          <text x={p.x + 50} y="203" textAnchor="middle" fontSize="7" fill={p.overTakt ? '#dc2626' : '#374151'}>C/T: {p.ct}s</text>
        </g>
      ))}

      {/* Push arrows */}
      {[0, 1, 2, 3].map(i => (
        <polygon key={i} points={`${205 + i * 130},165 ${233 + i * 130},157 ${233 + i * 130},173`} fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
      ))}

      {/* Inventory triangles */}
      {[
        { x: 113, d: '8d' }, { x: 240, d: '2d' }, { x: 370, d: '0.5d' },
        { x: 500, d: '0.5d' }, { x: 630, d: '0.5d' }, { x: 693, d: '2d' },
      ].map((inv, i) => (
        <g key={i}>
          <polygon points={`${inv.x},225 ${inv.x - 11},243 ${inv.x + 11},243`} fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <text x={inv.x} y="255" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#92400e">{inv.d}</text>
        </g>
      ))}

      {/* Lead time bar */}
      <rect x="20" y="280" width="760" height="18" rx="3" fill="#f0fdf4" stroke="#86efac" />
      <text x="400" y="293" textAnchor="middle" fontSize="7.5" fill="#166534" fontWeight="bold">
        Total LT: ~22d | VA: 195s | VA%: 0.01%
      </text>

      {/* ── Kaizen burst points ──────────────────────────────────────────── */}
      {KAIZEN_POINTS.map(kp => {
        const isActive = activeId === kp.id;
        const isDone = completedIds.has(kp.id);
        const baseColor = isDone ? '#16a34a' : isActive ? '#2563eb' : '#dc2626';
        const fillColor = isDone ? 'rgba(22,163,74,0.12)' : isActive ? 'rgba(37,99,235,0.15)' : 'rgba(239,68,68,0.12)';

        // Starburst path around center
        const r1 = 22, r2 = 14, n = 10;
        const pts: string[] = [];
        for (let i = 0; i < n * 2; i++) {
          const angle = (i * Math.PI) / n - Math.PI / 2;
          const r = i % 2 === 0 ? r1 : r2;
          pts.push(`${kp.x + r * Math.cos(angle)},${kp.y + r * Math.sin(angle)}`);
        }

        return (
          <g key={kp.id} onClick={() => onSelectPoint(kp.id)} style={{ cursor: 'pointer' }}>
            <polygon
              points={pts.join(' ')}
              fill={fillColor}
              stroke={baseColor}
              strokeWidth={isActive ? 2 : 1.5}
            />
            {isDone ? (
              <>
                <text x={kp.x} y={kp.y - 4} textAnchor="middle" fontSize="9" fill={baseColor} fontWeight="bold">✓</text>
                <text x={kp.x} y={kp.y + 6} textAnchor="middle" fontSize="6" fill={baseColor}>done</text>
              </>
            ) : (
              <>
                <text x={kp.x} y={kp.y - 2} textAnchor="middle" fontSize="7" fill={baseColor} fontWeight="bold">
                  {kp.kpi.split('\n')[0]}
                </text>
                {kp.kpi.includes('\n') && (
                  <text x={kp.x} y={kp.y + 7} textAnchor="middle" fontSize="6" fill={baseColor} fontWeight="bold">
                    {kp.kpi.split('\n')[1]}
                  </text>
                )}
              </>
            )}
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(20, 310)">
        <polygon points="10,8 16,4 16,12" fill="rgba(239,68,68,0.15)" stroke="#dc2626" strokeWidth="1.5" />
        <text x="22" y="11" fontSize="7" fill="#6b7280">Tap a burst to analyze it</text>
        <polygon points="140,8 146,4 146,12" fill="rgba(22,163,74,0.15)" stroke="#16a34a" strokeWidth="1.5" />
        <text x="152" y="11" fontSize="7" fill="#16a34a">Analyzed ✓</text>
      </g>
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function MifcKaizenDrill({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const [completedPoints, setCompletedPoints] = useState<Set<string>>(new Set());
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [drillComplete, setDrillComplete] = useState(false);

  const activePoint = activePointId ? KAIZEN_POINTS.find(k => k.id === activePointId) : null;
  const pointQuestions = activePointId ? DRILL_QUESTIONS.filter(q => q.kaizenPointId === activePointId) : [];
  const activeQuestion = pointQuestions[activeQuestionIndex];
  const allPointsDone = KAIZEN_POINTS.every(k => completedPoints.has(k.id));

  function handleSelectPoint(id: string) {
    if (completedPoints.has(id)) return; // already done
    setActivePointId(id);
    setActiveQuestionIndex(0);
    setChosen(null);
  }

  function handleChoose(optId: string) {
    if (chosen) return;
    setChosen(optId);
  }

  function handleNextQuestion() {
    if (activeQuestionIndex < pointQuestions.length - 1) {
      setActiveQuestionIndex(i => i + 1);
      setChosen(null);
    } else {
      // Mark point as complete
      const newDone = new Set([...completedPoints, activePointId!]);
      setCompletedPoints(newDone);
      setActivePointId(null);
      setChosen(null);
      setActiveQuestionIndex(0);
    }
  }

  if (drillComplete || alreadyDone) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="panel p-8 text-center space-y-4 border-red-200 bg-red-50">
          <div className="text-5xl">🔥</div>
          <h2 className="text-2xl font-bold text-gray-900">
            {lang === 'en' ? 'All Kaizen Points Identified!' : '全カイゼンポイント識別済み！'}
          </h2>
          <p className="text-sm text-gray-600">
            {lang === 'en'
              ? 'You\'ve analyzed all 4 waste clusters on the Riverstone Audio MIFC. Dana Wren has her map and her facts.'
              : 'RiverstoneオーディオMIFCの4つの無駄クラスターすべてを分析しました。Dana Wrenはマップと事実を手に入れました。'}
          </p>

          {/* Summary table */}
          <div className="text-left space-y-2 mt-2">
            {KAIZEN_POINTS.map(kp => (
              <div key={kp.id} className="flex items-start gap-3 p-3 bg-white border border-red-100 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">✓</div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{lang === 'en' ? kp.labelEn.split('\n')[0] : kp.labelJa.split('\n')[0]}</p>
                  <p className="text-xs text-gray-500">{lang === 'en' ? kp.wasteTypeEn : kp.wasteTypeJa}</p>
                  <p className="text-xs text-blue-600 mt-0.5">{lang === 'en' ? `→ ${kp.recommendationEn.split('.')[0]}.` : `→ ${kp.recommendationJa.split('。')[0]}。`}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 italic mt-4">
            {lang === 'en'
              ? '"Four kaizen points. Four root causes. Four recommendations. That\'s a complete analysis." — D. Wren'
              : '「4つのカイゼンポイント。4つの根本原因。4つの推奨事項。それが完全な分析です。」— D. Wren'}
          </p>

          <div className="flex justify-center pt-2">
            {!alreadyDone && (
              <button onClick={onComplete} className="btn-primary text-sm">
                {lang === 'en' ? 'Complete Module →' : 'モジュールを完了する →'}
              </button>
            )}
            {alreadyDone && (
              <span className="text-sm text-green-700 font-medium">✓ {lang === 'en' ? 'Completed' : '完了'}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Header */}
      <div className="panel p-5 space-y-2">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center text-white text-sm font-bold shrink-0">DW</div>
          <div>
            <p className="font-bold text-gray-900">Dana Wren</p>
            <p className="text-sm text-gray-600 mt-0.5">
              {lang === 'en'
                ? 'The map is on the table. Now I want you to tell me exactly where the waste is and why. Tap each kaizen burst on the map and analyze it.'
                : 'マップはテーブルの上にあります。今度は無駄がどこにありなぜかを正確に教えてください。マップの各カイゼンバーストをタップして分析してください。'}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex gap-1 flex-1">
            {KAIZEN_POINTS.map(kp => (
              <div
                key={kp.id}
                className={`flex-1 h-1.5 rounded-full transition-all ${completedPoints.has(kp.id) ? 'bg-green-500' : activePointId === kp.id ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 shrink-0">
            {completedPoints.size}/{KAIZEN_POINTS.length} {lang === 'en' ? 'analyzed' : '分析済み'}
          </span>
        </div>
      </div>

      {/* MIFC with kaizen bursts */}
      <div className="panel p-3">
        <KaizenMifcSVG
          activeId={activePointId}
          completedIds={completedPoints}
          onSelectPoint={handleSelectPoint}
        />
      </div>

      {/* Active kaizen point drill */}
      {activePoint && activeQuestion && (
        <div className="panel p-5 space-y-4 animate-fade-in border-blue-200">

          {/* Point header */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-red-400 flex items-center justify-center text-red-600 text-sm">🔥</div>
            <div>
              <h3 className="font-bold text-gray-900">
                {lang === 'en' ? activePoint.labelEn.replace('\n', ' — ') : activePoint.labelJa.replace('\n', ' — ')}
              </h3>
              <p className="text-xs text-gray-500">
                {lang === 'en' ? `Waste: ${activePoint.wasteTypeEn}` : `無駄: ${activePoint.wasteTypeJa}`}
              </p>
            </div>
          </div>

          {/* Root cause context */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-3">
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
              {lang === 'en' ? 'Root Cause Analysis' : '根本原因分析'}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang === 'en' ? activePoint.rootCauseEn : activePoint.rootCauseJa}
            </p>
          </div>

          {/* Question */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-800">
              {lang === 'en' ? activeQuestion.questionEn : activeQuestion.questionJa}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {activeQuestion.options.map(opt => {
              let state: 'default' | 'correct' | 'wrong' | 'reveal' = 'default';
              if (chosen) {
                if (opt.id === activeQuestion.correctId) state = 'reveal';
                else if (opt.id === chosen) state = 'wrong';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleChoose(opt.id)}
                  disabled={!!chosen}
                  className={`w-full p-3 rounded-xl border-2 text-left text-sm transition-all ${
                    state === 'reveal'
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : state === 'wrong'
                        ? 'border-red-400 bg-red-50 text-red-900'
                        : chosen
                          ? 'border-gray-200 bg-gray-50 text-gray-400'
                          : 'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer text-gray-800'
                  }`}
                >
                  <span className="font-semibold mr-2 uppercase text-xs opacity-60">{opt.id}.</span>
                  {lang === 'en' ? opt.labelEn : opt.labelJa}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {chosen && (
            <div className={`rounded-xl p-4 space-y-3 animate-fade-in ${chosen === activeQuestion.correctId ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {chosen === activeQuestion.correctId
                  ? (lang === 'en' ? '✅ Correct' : '✅ 正解')
                  : (lang === 'en' ? '⚠️ Learn from this:' : '⚠️ ここから学ぶ：')}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {lang === 'en' ? activeQuestion.explanationEn : activeQuestion.explanationJa}
              </p>

              {/* Recommendation when last question of point */}
              {activeQuestionIndex === pointQuestions.length - 1 && (
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                    {lang === 'en' ? 'Recommended Countermeasure:' : '推奨対策：'}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {lang === 'en' ? activePoint.recommendationEn : activePoint.recommendationJa}
                  </p>
                </div>
              )}

              <button onClick={handleNextQuestion} className="btn-primary text-sm w-full">
                {activeQuestionIndex < pointQuestions.length - 1
                  ? (lang === 'en' ? 'Next Question →' : '次の質問 →')
                  : (lang === 'en' ? 'Mark Point Analyzed ✓' : 'ポイント分析完了 ✓')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* No point selected hint */}
      {!activePointId && !allPointsDone && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-sm text-amber-800">
            {lang === 'en'
              ? '👆 Tap a red kaizen burst on the map above to begin analysis'
              : '👆 上のマップの赤いカイゼンバーストをタップして分析を開始'}
          </p>
        </div>
      )}

      {/* All done CTA */}
      {allPointsDone && !drillComplete && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between animate-fade-in">
          <p className="text-sm text-green-800 font-medium">
            ✅ {lang === 'en' ? 'All 4 kaizen points analyzed!' : '4つのカイゼンポイントすべて分析済み！'}
          </p>
          <button
            onClick={() => setDrillComplete(true)}
            className="btn-primary text-sm"
          >
            {lang === 'en' ? 'Complete Module →' : 'モジュールを完了する →'}
          </button>
        </div>
      )}
    </div>
  );
}
