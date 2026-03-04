'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

interface BuildChallenge {
  id: string;
  layerEn: string;
  layerJa: string;
  instructionEn: string;
  instructionJa: string;
  questionEn: string;
  questionJa: string;
  options: { id: string; labelEn: string; labelJa: string }[];
  correctId: string;
  explanationEn: string;
  explanationJa: string;
  danaEn: string;  // Dana Wren validation quote
  danaJa: string;
}

const CHALLENGES: BuildChallenge[] = [
  {
    id: 'takt',
    layerEn: 'Step 1: Establish Takt Time',
    layerJa: 'ステップ1：タクトタイムを設定する',
    instructionEn: 'Before drawing anything, calculate the customer\'s heartbeat. AudioZone Retail needs 800 units/day. Riverstone operates 1 shift (450 min available after breaks).',
    instructionJa: '何かを描く前に、顧客の鼓動を計算してください。AudioZone Retailは1日800台が必要。Riverstoneは1シフト（休憩後450分稼働）。',
    questionEn: 'What is the Takt Time?',
    questionJa: 'タクトタイムはいくつですか？',
    options: [
      { id: 'a', labelEn: '33.75 seconds/unit', labelJa: '33.75秒/台' },
      { id: 'b', labelEn: '45 seconds/unit', labelJa: '45秒/台' },
      { id: 'c', labelEn: '0.5625 minutes/unit', labelJa: '0.5625分/台' },
      { id: 'd', labelEn: '800 units / 450 minutes', labelJa: '800台÷450分' },
    ],
    correctId: 'a',
    explanationEn: 'Takt = (450 min × 60 sec) ÷ 800 units = 27,000 ÷ 800 = 33.75 sec/unit. This is your pace target — every process must aim for ≤33.75s.',
    explanationJa: 'タクト＝（450分×60秒）÷800台＝27,000÷800＝33.75秒/台。これがペース目標で、すべての工程は33.75秒以下を目指す必要があります。',
    danaEn: 'Good. 33.75 seconds. Write it at the top of your map. That\'s the law.',
    danaJa: '良し。33.75秒。マップの上部に書いてください。それが法則です。',
  },
  {
    id: 'external',
    layerEn: 'Step 2: Place External Entities',
    layerJa: 'ステップ2：外部エンティティを配置する',
    instructionEn: 'Every MIFC starts with who orders and who supplies. Place the Customer (top-right) and the Supplier (top-left). PCB-Tech Ltd. in Shenzhen ships weekly in batches of 500 boards.',
    instructionJa: 'すべてのMIFCは「誰が注文し、誰が供給するか」から始まります。顧客（右上）とサプライヤー（左上）を配置します。PCB-Tech Ltd.（深セン）は週1回500基板をバッチで出荷。',
    questionEn: 'PCB-Tech ships once per week. AudioZone orders daily. What does this mismatch create?',
    questionJa: 'PCB-Techは週1回出荷。AudioZoneは毎日注文。このミスマッチは何を生み出しますか？',
    options: [
      { id: 'a', labelEn: 'A pull system that reduces WIP', labelJa: 'WIPを減らすプルシステム' },
      { id: 'b', labelEn: 'Inventory buffer — boards pile up until consumed', labelJa: '在庫バッファ — 使い切るまで基板が溜まる' },
      { id: 'c', labelEn: 'A heijunka box is automatically created', labelJa: 'ヘイジュンカボックスが自動的に作られる' },
      { id: 'd', labelEn: 'Takt time is irrelevant when batch shipping', labelJa: 'バッチ出荷の場合タクトタイムは無関係' },
    ],
    correctId: 'b',
    explanationEn: 'Weekly batch in + daily demand out = inventory accumulation. 500 boards/week ÷ 800 units/day × 1 board/unit = ~0.625 days per batch — but if timing is off, boards wait days. This is the 8-day PCB buffer we see on the map.',
    explanationJa: '週1回入荷＋毎日需要＝在庫蓄積。500基板/週÷800台/日×1基板/台≈0.625日分/バッチ — しかしタイミングがずれると基板は何日も待機する。これがマップで見る8日間のPCBバッファです。',
    danaEn: 'Correct. That\'s 8 days of PCB sitting there not moving. Mark it on the map.',
    danaJa: '正解。それが8日間動かないPCBです。マップに記録してください。',
  },
  {
    id: 'process',
    layerEn: 'Step 3: Map the Process Boxes',
    layerJa: 'ステップ3：プロセスボックスをマッピングする',
    instructionEn: 'Walk the floor. There are 5 processes in sequence. Each gets a process box with a data box below it. Which process is the bottleneck — running SLOWER than Takt?',
    instructionJa: '現場を歩きます。5つの工程が順番に並んでいます。各工程にはデータボックス付きのプロセスボックスがあります。タクトより遅く動いているボトルネック工程はどれですか？',
    questionEn: 'Takt = 33.75s. Which process(es) exceed Takt? (Select the worst offender)',
    questionJa: 'タクト＝33.75秒。タクトを超えている工程は？（最悪の工程を選んでください）',
    options: [
      { id: 'a', labelEn: 'Injection Molding — C/T 28s', labelJa: '射出成形 — C/T 28秒' },
      { id: 'b', labelEn: 'PCB Sub-Assembly — C/T 62s ⚠️', labelJa: 'PCBサブ組立 — C/T 62秒 ⚠️' },
      { id: 'c', labelEn: 'Final Assembly — C/T 38s', labelJa: '最終組立 — C/T 38秒' },
      { id: 'd', labelEn: 'Packaging — C/T 22s', labelJa: '梱包 — C/T 22秒' },
    ],
    correctId: 'b',
    explanationEn: 'PCB Sub-Assembly at 62s is nearly 2× Takt (33.75s). Final Assembly at 38s also exceeds Takt slightly, but PCB Sub-Assembly is the true constraint — it limits the entire line\'s throughput.',
    explanationJa: 'PCBサブ組立62秒はタクト（33.75秒）のほぼ2倍。最終組立38秒も僅かにタクトを超えるが、PCBサブ組立が真の制約 — ライン全体のスループットを制限している。',
    danaEn: 'PCB Sub-Assembly. 62 seconds. Almost twice takt. That\'s where we\'re hemorrhaging.',
    danaJa: 'PCBサブ組立。62秒。タクトのほぼ2倍。そこが出血しているところです。',
  },
  {
    id: 'inventory',
    layerEn: 'Step 4: Draw Inventory Triangles',
    layerJa: 'ステップ4：在庫三角形を描く',
    instructionEn: 'Inventory sits between every process. Mark each with a triangle (△) and count the days. The map shows 6 inventory points. Which inventory point is DIRECTLY caused by the PCB Sub-Assembly bottleneck?',
    instructionJa: '在庫はすべての工程の間にあります。各在庫に三角形（△）をマークして日数を数えます。マップには6つの在庫ポイントがあります。PCBサブ組立ボトルネックによって直接引き起こされる在庫ポイントはどれですか？',
    questionEn: 'Where does inventory build UPSTREAM of the PCB bottleneck?',
    questionJa: 'PCBボトルネックの上流で在庫はどこに溜まりますか？',
    options: [
      { id: 'a', labelEn: 'Finished Goods — units pile up waiting to ship', labelJa: '完成品 — 出荷待ちで積み上がる' },
      { id: 'b', labelEn: 'Between PCB Sub-Assembly and Final Assembly', labelJa: 'PCBサブ組立と最終組立の間' },
      { id: 'c', labelEn: 'Between Injection Molding and PCB Sub-Assembly', labelJa: '射出成形とPCBサブ組立の間' },
      { id: 'd', labelEn: 'At the supplier — PCB-Tech accumulates boards', labelJa: 'サプライヤー側 — PCB-Techが基板を蓄積する' },
    ],
    correctId: 'c',
    explanationEn: 'When a downstream process (PCB Sub-Assembly, 62s) is slower than the upstream process (Injection Molding, 28s), parts pile up BETWEEN them. Injection Molding produces at 28s but PCB only consumes at 62s — so housings queue up waiting to be assembled.',
    explanationJa: '下流工程（PCBサブ組立、62秒）が上流工程（射出成形、28秒）より遅い場合、部品はその間に溜まります。射出成形は28秒で生産するが、PCBは62秒でしか消費しない — だからハウジングが組み立て待ちで並ぶ。',
    danaEn: 'Right. The slow process starves what follows it and floods what precedes it. Classic WIP buildup.',
    danaJa: '正解。遅い工程は後続を枯渇させ、前工程を溢れさせる。典型的なWIP蓄積です。',
  },
  {
    id: 'info',
    layerEn: 'Step 5: Draw Information Flows',
    layerJa: 'ステップ5：情報の流れを描く',
    instructionEn: 'Information flows right-to-left across the top. The Production Control box (center-top) receives orders from AudioZone and issues schedules. What type of signal does each process receive?',
    instructionJa: '情報は上部を右から左に流れます。生産管理ボックス（中央上部）はAudioZoneから注文を受け、スケジュールを発行します。各工程はどのタイプの信号を受け取りますか？',
    questionEn: 'Riverstone uses weekly MRP-generated paper schedules pushed to each process. What problem does this create?',
    questionJa: 'RiverstoneはMRP生成の週次紙スケジュールを各工程にプッシュしています。これはどんな問題を生み出しますか？',
    options: [
      { id: 'a', labelEn: 'Processes produce to plan, not to actual customer demand — overproduction risk', labelJa: '工程は計画通りに生産する。実際の顧客需要ではない — 過剰生産リスク' },
      { id: 'b', labelEn: 'Kanban cards cannot be used with MRP', labelJa: 'かんばんカードはMRPと併用できない' },
      { id: 'c', labelEn: 'Weekly schedules are faster than daily pull signals', labelJa: '週次スケジュールは日次プル信号より速い' },
      { id: 'd', labelEn: 'Production Control needs more computers', labelJa: '生産管理はより多くのコンピューターが必要' },
    ],
    correctId: 'a',
    explanationEn: 'Push scheduling (MRP → paper schedule → all processes) disconnects production from real demand. Processes run to their schedule even if downstream inventory is already high. This is a root cause of the WIP buildup we see throughout the map.',
    explanationJa: 'プッシュスケジューリング（MRP→紙スケジュール→全工程）は生産を実際の需要から切り離す。下流在庫がすでに高くても工程はスケジュール通りに動く。これがマップ全体で見るWIP蓄積の根本原因です。',
    danaEn: 'Push scheduling is our biggest hidden problem. The map just made it visible.',
    danaJa: 'プッシュスケジューリングが最大の隠れた問題です。マップがそれを可視化しました。',
  },
  {
    id: 'timeline',
    layerEn: 'Step 6: Add the Lead Time Ladder',
    layerJa: 'ステップ6：リードタイムラダーを追加する',
    instructionEn: 'The timeline at the bottom alternates between inventory wait time (peaks = waste) and process cycle time (valleys = value). Add up the delays you\'ve found.',
    instructionJa: '下部のタイムラインは在庫待ち時間（山＝無駄）とプロセスサイクルタイム（谷＝価値）を交互に示します。見つけた遅延を合計します。',
    questionEn: 'Total lead time = PCB wait (8d) + queue (2d) + WIP queues (3×0.5d) + finished goods (2d) + process times (195s). Which is TRUE?',
    questionJa: '総リードタイム＝PCB待ち（8日）＋キュー（2日）＋WIPキュー（3×0.5日）＋完成品（2日）＋工程時間（195秒）。どれが正しいですか？',
    options: [
      { id: 'a', labelEn: 'Value-added time is >50% of total lead time', labelJa: '付加価値時間は総リードタイムの50%以上' },
      { id: 'b', labelEn: 'Process times (195s ≈ 3.25 min) are less than 0.1% of total lead time (~22 days)', labelJa: '工程時間（195秒≈3.25分）は総リードタイム（約22日）の0.1%未満' },
      { id: 'c', labelEn: 'Lead time and cycle time are equal in a pull system', labelJa: 'プルシステムではリードタイムとサイクルタイムは等しい' },
      { id: 'd', labelEn: 'The 8-day PCB buffer is value-adding time', labelJa: '8日間PCBバッファは付加価値時間' },
    ],
    correctId: 'b',
    explanationEn: 'Total lead time ≈ 22 days = 1,900,800 seconds. Value-added process time = 195 seconds. VA% = 195 ÷ 1,900,800 = 0.01%. The overwhelming majority of time is pure waste — material sitting in queues.',
    explanationJa: '総リードタイム≈22日＝1,900,800秒。付加価値工程時間＝195秒。VA%＝195÷1,900,800＝0.01%。圧倒的大多数の時間は純粋な無駄 — キューで待機している材料。',
    danaEn: '0.01% value-added. Write that down. That\'s what we brought to Dana Wren. A map and facts.',
    danaJa: '付加価値0.01%。書き留めてください。それがDana Wrenに持ってきたものです。マップと事実。',
  },
  {
    id: 'synthesis',
    layerEn: 'Step 7: Read Your Completed Map',
    layerJa: 'ステップ7：完成したマップを読む',
    instructionEn: 'The map is complete. Now read it as an analyst. Dana Wren is waiting. What is the single highest-leverage improvement you would recommend?',
    instructionJa: 'マップが完成しました。今、アナリストとして読んでください。Dana Wrenが待っています。あなたが推奨する最も高い影響力のある改善策は何ですか？',
    questionEn: 'If you could recommend ONE change to dramatically improve flow, what should Riverstone do first?',
    questionJa: 'フローを劇的に改善するために1つの変更を推奨するとしたら、Riverstoneが最初にすべきことは何ですか？',
    options: [
      { id: 'a', labelEn: 'Add a 2nd packaging line (Packaging is the fastest process)', labelJa: '梱包ラインを追加する（梱包が最速工程のため）' },
      { id: 'b', labelEn: 'Address PCB Sub-Assembly bottleneck (62s vs 33.75s Takt) to unlock line throughput', labelJa: 'PCBサブ組立ボトルネック（62秒vsタクト33.75秒）を解決してライン全体のスループットを解放する' },
      { id: 'c', labelEn: 'Order PCB boards more frequently to reduce the 8-day inventory', labelJa: 'PCB基板の発注頻度を増やして8日間在庫を削減する' },
      { id: 'd', labelEn: 'Hire more QC inspectors to speed up the 200% inspection', labelJa: 'QC検査員を増やして200%検査を高速化する' },
    ],
    correctId: 'b',
    explanationEn: 'The Theory of Constraints says: identify the constraint (PCB Sub-Assembly at 62s), exploit it, then subordinate everything else. Fixing the bottleneck doubles throughput potential. More inspectors or faster packaging don\'t help if the constraint is still at 62s.',
    explanationJa: '制約の理論が言う：制約を特定し（PCBサブ組立62秒）、活用し、その後他のすべてを従属させる。ボトルネックを修正するとスループット可能性が倍増する。制約が62秒のままなら、検査員を増やしても梱包を速くしても意味がない。',
    danaEn: 'PCB Sub-Assembly is the constraint. That\'s your answer. Now go fix it.',
    danaJa: 'PCBサブ組立が制約です。それがあなたの答えです。今すぐ修正してください。',
  },
];

// ── Partial MIFC SVG that fills in progressively ─────────────────────────────

interface MifcLayerProps {
  unlockedUpTo: number; // 0-7, how many layers to show
  highlightLayer: number | null;
}

function PartialMifcSVG({ unlockedUpTo, highlightLayer }: MifcLayerProps) {
  const show = (layer: number) => unlockedUpTo >= layer;
  const highlight = (layer: number) => highlightLayer === layer ? 'drop-shadow(0 0 6px rgba(59,130,246,0.8))' : '';

  return (
    <svg viewBox="0 0 800 420" className="w-full border border-gray-200 rounded-xl bg-white" style={{ fontFamily: 'sans-serif', fontSize: 10 }}>

      {/* ── Layer 0: Static skeleton labels ─────────────────────────────── */}
      <text x="400" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6b7280">
        Riverstone Audio — RS-7 Speaker Line
      </text>

      {/* ── Layer 1: Takt Time label ──────────────────────────────────── */}
      {show(1) && (
        <g style={{ filter: highlight(1) }}>
          <rect x="310" y="22" width="180" height="22" rx="4" fill={highlightLayer === 1 ? '#dbeafe' : '#f0fdf4'} stroke={highlightLayer === 1 ? '#3b82f6' : '#16a34a'} strokeWidth="1.5" />
          <text x="400" y="37" textAnchor="middle" fontSize="9" fontWeight="bold" fill={highlightLayer === 1 ? '#1d4ed8' : '#15803d'}>
            Takt Time = 33.75 s/unit
          </text>
        </g>
      )}
      {!show(1) && (
        <rect x="310" y="22" width="180" height="22" rx="4" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3" />
      )}

      {/* ── Layer 2: External entities ──────────────────────────────────── */}
      {/* Supplier */}
      {show(2) && (
        <g style={{ filter: highlight(2) }}>
          <rect x="20" y="35" width="90" height="55" rx="4" fill={highlightLayer === 2 ? '#dbeafe' : '#fafafa'} stroke={highlightLayer === 2 ? '#3b82f6' : '#374151'} strokeWidth="2" />
          <text x="65" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111827">PCB-Tech Ltd.</text>
          <text x="65" y="67" textAnchor="middle" fontSize="7" fill="#6b7280">Shenzhen</text>
          <text x="65" y="77" textAnchor="middle" fontSize="7" fill="#6b7280">LT: 14 days</text>
          <text x="65" y="87" textAnchor="middle" fontSize="7" fill="#6b7280">Weekly batch 500</text>
        </g>
      )}
      {!show(2) && (
        <rect x="20" y="35" width="90" height="55" rx="4" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3" />
      )}

      {/* Customer */}
      {show(2) && (
        <g style={{ filter: highlight(2) }}>
          <rect x="690" y="35" width="90" height="55" rx="4" fill={highlightLayer === 2 ? '#dbeafe' : '#fafafa'} stroke={highlightLayer === 2 ? '#3b82f6' : '#374151'} strokeWidth="2" />
          <text x="735" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111827">AudioZone Retail</text>
          <text x="735" y="67" textAnchor="middle" fontSize="7" fill="#6b7280">Columbus, OH</text>
          <text x="735" y="77" textAnchor="middle" fontSize="7" fill="#6b7280">800 units/day</text>
          <text x="735" y="87" textAnchor="middle" fontSize="7" fill="#6b7280">Daily order</text>
        </g>
      )}
      {!show(2) && (
        <rect x="690" y="35" width="90" height="55" rx="4" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3" />
      )}

      {/* ── Layer 3: Process boxes ──────────────────────────────────────── */}
      {/* Process box helper */}
      {(['Injection\nMolding', 'PCB\nSub-Assy', 'Final\nAssembly', 'Test &\nQC', 'Packaging'] as const).map((name, i) => {
        const x = 100 + i * 130;
        const ct = [28, 62, 38, 45, 22][i];
        const isBottleneck = i === 1;
        const overTakt = ct > 33.75;
        return show(3) ? (
          <g key={i} style={{ filter: i === 1 && highlightLayer === 3 ? 'drop-shadow(0 0 6px rgba(239,68,68,0.8))' : highlight(3) }}>
            {/* Process box */}
            <rect x={x} y="155" width="100" height="55" rx="4"
              fill={overTakt ? '#fff1f2' : (highlightLayer === 3 ? '#dbeafe' : '#f0f9ff')}
              stroke={overTakt ? '#f87171' : (highlightLayer === 3 ? '#3b82f6' : '#0369a1')}
              strokeWidth={isBottleneck ? 2.5 : 1.5}
            />
            <text x={x + 50} y={174} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111827">{name.split('\n')[0]}</text>
            <text x={x + 50} y={184} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111827">{name.split('\n')[1]}</text>
            {/* Data box */}
            <rect x={x} y="210" width="100" height="30" rx="0" fill="white" stroke={overTakt ? '#f87171' : '#93c5fd'} strokeWidth="1" />
            <text x={x + 50} y="223" textAnchor="middle" fontSize="7" fill={overTakt ? '#dc2626' : '#374151'}>C/T: {ct}s {overTakt ? '⚠' : ''}</text>
            <text x={x + 50} y="234" textAnchor="middle" fontSize="7" fill="#6b7280">
              {i === 0 ? 'OEE: 52%' : i === 3 ? '200% inspect' : `Op: ${[2,3,4,2,2][i]}`}
            </text>
          </g>
        ) : (
          <rect key={i} x={x} y="155" width="100" height="85" rx="4" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3" />
        );
      })}

      {/* ── Layer 4: Inventory triangles ────────────────────────────────── */}
      {show(4) && [
        { x: 115, label: 'PCB Stock', days: '8d' },
        { x: 243, label: 'Housing Q', days: '2d' },
        { x: 373, label: 'Sub-Assy', days: '0.5d' },
        { x: 503, label: 'Pre-QC', days: '0.5d' },
        { x: 633, label: 'Post-QC', days: '0.5d' },
        { x: 695, label: 'FG Store', days: '2d' },
      ].map((inv, i) => (
        <g key={i} style={{ filter: highlight(4) }}>
          <polygon points={`${inv.x},248 ${inv.x - 12},268 ${inv.x + 12},268`}
            fill={highlightLayer === 4 ? '#93c5fd' : '#fef08a'} stroke={highlightLayer === 4 ? '#3b82f6' : '#ca8a04'} strokeWidth="1.5" />
          <text x={inv.x} y="280" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#92400e">{inv.days}</text>
          <text x={inv.x} y="290" textAnchor="middle" fontSize="6" fill="#6b7280">{inv.label}</text>
        </g>
      ))}

      {/* ── Layer 5: Information flows ──────────────────────────────────── */}
      {show(5) && (
        <g style={{ filter: highlight(5) }}>
          {/* Production Control box */}
          <rect x="330" y="55" width="140" height="45" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="400" y="73" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#713f12">Production Control</text>
          <text x="400" y="84" textAnchor="middle" fontSize="7" fill="#92400e">MRP – weekly paper push</text>
          <text x="400" y="94" textAnchor="middle" fontSize="7" fill="#92400e">⚠ paper-based</text>

          {/* Info arrows dashed */}
          {/* Customer → Prod Control */}
          <path d="M690 62 Q600 50 470 75" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowOrange)" />
          {/* Prod Control → Supplier */}
          <path d="M330 75 Q220 60 110 75" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowOrange)" />
          {/* Prod Control → Processes (push arrows going down) */}
          {[150, 280, 410, 540, 670].map((px, i) => (
            <line key={i} x1={px + 50} y1="100" x2={px + 50} y2="153" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#arrowGray)" />
          ))}
          <defs>
            <marker id="arrowOrange" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
            </marker>
            <marker id="arrowGray" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#9ca3af" />
            </marker>
          </defs>
        </g>
      )}

      {/* ── Layer 3 continued: Push arrows between processes ─────────────── */}
      {show(3) && [0, 1, 2, 3].map(i => {
        const fromX = 200 + i * 130;
        const toX = fromX + 30;
        return (
          <g key={i}>
            <polygon points={`${fromX},180 ${fromX + 28},172 ${fromX + 28},188`}
              fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
            <text x={fromX + 14} y={195} textAnchor="middle" fontSize="6" fill="#1d4ed8">push</text>
          </g>
        );
      })}

      {/* ── Layer 3: Truck from supplier + to customer ─────────────────── */}
      {show(2) && (
        <>
          {/* Supplier truck */}
          <g transform="translate(112,162) scale(0.7)">
            <rect x="0" y="8" width="32" height="18" rx="2" fill="#374151" />
            <rect x="22" y="3" width="14" height="13" rx="1" fill="#4b5563" />
            <circle cx="7" cy="28" r="4" fill="#9ca3af" />
            <circle cx="25" cy="28" r="4" fill="#9ca3af" />
          </g>
          {/* Customer truck */}
          <g transform="translate(648,162) scale(0.7)">
            <rect x="0" y="8" width="32" height="18" rx="2" fill="#374151" />
            <rect x="22" y="3" width="14" height="13" rx="1" fill="#4b5563" />
            <circle cx="7" cy="28" r="4" fill="#9ca3af" />
            <circle cx="25" cy="28" r="4" fill="#9ca3af" />
          </g>
        </>
      )}

      {/* ── Layer 6: Lead time ladder ────────────────────────────────────── */}
      {show(6) && (
        <g style={{ filter: highlight(6) }}>
          {/* Zigzag line */}
          <polyline
            points="70,310 115,310 115,325 243,325 243,310 373,310 373,325 503,325 503,310 633,310 633,325 730,325"
            fill="none" stroke={highlightLayer === 6 ? '#3b82f6' : '#374151'} strokeWidth="1.5"
          />
          {/* Delay labels (peaks) */}
          {[{ x: 115, t: '8d' }, { x: 243, t: '2d' }, { x: 373, t: '0.5d' }, { x: 503, t: '0.5d' }, { x: 633, t: '0.5d' }, { x: 730, t: '2d' }].map((pt, i) => (
            <text key={i} x={pt.x} y={340} textAnchor="middle" fontSize="7" fill="#dc2626" fontWeight="bold">{pt.t}</text>
          ))}
          {/* VA labels (valleys) */}
          {[{ x: 180, t: '28s' }, { x: 310, t: '62s' }, { x: 440, t: '38s' }, { x: 570, t: '45s' }, { x: 660, t: '22s' }].map((pt, i) => (
            <text key={i} x={pt.x} y={352} textAnchor="middle" fontSize="7" fill="#15803d">{pt.t}</text>
          ))}
          {/* Total LT summary */}
          <rect x="20" y="358" width="760" height="24" rx="4" fill={highlightLayer === 6 ? '#dbeafe' : '#f0fdf4'} stroke={highlightLayer === 6 ? '#3b82f6' : '#86efac'} />
          <text x="400" y="374" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="bold">
            Total Lead Time: ~22 days | Value-Added: 195s (3.25 min) | VA%: 0.01%
          </text>
        </g>
      )}

      {/* ── Layer 7: Synthesis highlight (kaizen bursts) ─────────────────── */}
      {show(7) && (
        <g style={{ filter: highlight(7) }}>
          {/* 4 kaizen starburst points */}
          {[
            { cx: 150, cy: 165, label: '52% OEE' },
            { cx: 243, cy: 258, label: '8d PCB' },
            { cx: 553, cy: 165, label: '200%\nInspect' },
            { cx: 400, cy: 82, label: 'Paper\nPush' },
          ].map((kb, i) => (
            <g key={i}>
              <circle cx={kb.cx} cy={kb.cy} r="18" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />
              <text x={kb.cx} y={kb.cy - 4} textAnchor="middle" fontSize="6" fill="#dc2626" fontWeight="bold">{kb.label.split('\n')[0]}</text>
              {kb.label.includes('\n') && <text x={kb.cx} y={kb.cy + 6} textAnchor="middle" fontSize="6" fill="#dc2626" fontWeight="bold">{kb.label.split('\n')[1]}</text>}
            </g>
          ))}
        </g>
      )}

      {/* Locked overlay hint */}
      {unlockedUpTo === 0 && (
        <g>
          <rect x="0" y="0" width="800" height="420" fill="rgba(249,250,251,0.9)" />
          <text x="400" y="200" textAnchor="middle" fontSize="14" fill="#6b7280">
            Complete Step 1 to start building your MIFC
          </text>
          <text x="400" y="220" textAnchor="middle" fontSize="11" fill="#9ca3af">
            Each answer unlocks the next layer
          </text>
        </g>
      )}
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function MifcBuildSteps({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(CHALLENGES.length).fill(null));
  const [chosen, setChosen] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [buildComplete, setBuildComplete] = useState(false);

  const challenge = CHALLENGES[currentStep];
  const unlockedLayers = answers.filter(a => a !== null).length;
  const isCorrect = chosen === challenge?.correctId;

  function handleChoose(id: string) {
    if (chosen) return;
    setChosen(id);
    const newAnswers = [...answers];
    newAnswers[currentStep] = id;
    setAnswers(newAnswers);
    setShowExplanation(true);
  }

  function handleNext() {
    if (currentStep < CHALLENGES.length - 1) {
      setCurrentStep(s => s + 1);
      setChosen(null);
      setShowExplanation(false);
    } else {
      setBuildComplete(true);
    }
  }

  // ── Complete screen ────────────────────────────────────────────────────────
  if (buildComplete || alreadyDone) {
    const correctCount = answers.filter((a, i) => a === CHALLENGES[i]?.correctId).length;
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="panel p-6 text-center space-y-4 border-green-200 bg-green-50">
          <div className="text-5xl">🗺️</div>
          <h2 className="text-2xl font-bold text-gray-900">
            {lang === 'en' ? 'MIFC Complete!' : 'MIFC完成！'}
          </h2>
          <p className="text-sm text-gray-600">
            {lang === 'en'
              ? `You built the Riverstone Audio current-state MIFC layer by layer. ${correctCount}/${CHALLENGES.length} layers answered correctly.`
              : `Riverstoneオーディオの現状MIFCをレイヤーごとに構築しました。${correctCount}/${CHALLENGES.length}レイヤーを正確に回答。`}
          </p>
          <div className="text-left">
            <PartialMifcSVG unlockedUpTo={7} highlightLayer={null} />
          </div>
          <p className="text-xs text-gray-500 italic">
            {lang === 'en'
              ? '"You came back with a map and facts. That\'s the job." — D. Wren'
              : '「マップと事実を持って帰ってきた。それが仕事です。」— D. Wren'}
          </p>
          <div className="flex gap-3 justify-center">
            {!alreadyDone && (
              <button onClick={onComplete} className="btn-primary text-sm">
                {lang === 'en' ? 'Find the Waste →' : '無駄を発見する →'}
              </button>
            )}
            {alreadyDone && (
              <span className="text-sm text-green-700 font-medium">
                ✓ {lang === 'en' ? 'Build completed' : '構築完了'}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Active build step ──────────────────────────────────────────────────────
  return (
    <div className="space-y-5 animate-fade-in">

      {/* Progress header */}
      <div className="panel p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
            {lang === 'en' ? 'Build the MIFC' : 'MIFCを構築する'}
          </h2>
          <span className="text-xs text-gray-500">{currentStep + 1}/{CHALLENGES.length}</span>
        </div>
        <div className="flex gap-1">
          {CHALLENGES.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                i < currentStep
                  ? (answers[i] === CHALLENGES[i].correctId ? 'bg-green-500' : 'bg-yellow-400')
                  : i === currentStep
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* MIFC canvas — progressive */}
      <div className="panel p-3">
        <p className="text-xs text-gray-400 mb-2 text-center">
          {lang === 'en'
            ? `Map layers unlocked: ${unlockedLayers}/7 — answer each question to reveal the next layer`
            : `マップレイヤー解放済み: ${unlockedLayers}/7 — 各質問に答えて次のレイヤーを表示`}
        </p>
        <PartialMifcSVG
          unlockedUpTo={unlockedLayers}
          highlightLayer={unlockedLayers > 0 ? unlockedLayers : null}
        />
      </div>

      {/* Current challenge card */}
      <div className="panel p-5 space-y-4">
        {/* Layer heading */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {currentStep + 1}
          </div>
          <h3 className="text-base font-bold text-gray-900">
            {lang === 'en' ? challenge.layerEn : challenge.layerJa}
          </h3>
        </div>

        {/* Instruction */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {lang === 'en' ? challenge.instructionEn : challenge.instructionJa}
        </p>

        {/* Question */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-sm font-semibold text-gray-800">
            {lang === 'en' ? challenge.questionEn : challenge.questionJa}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {challenge.options.map(opt => {
            let state: 'default' | 'correct' | 'wrong' | 'reveal' = 'default';
            if (chosen) {
              if (opt.id === challenge.correctId) state = 'reveal';
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
        {showExplanation && (
          <div className={`rounded-xl p-4 space-y-3 animate-fade-in ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {isCorrect
                ? (lang === 'en' ? '✅ Correct' : '✅ 正解')
                : (lang === 'en' ? '⚠️ Not quite — here\'s why:' : '⚠️ 惜しい — 理由は：')}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang === 'en' ? challenge.explanationEn : challenge.explanationJa}
            </p>

            {/* Dana quote */}
            <div className="flex items-start gap-3 pt-1 border-t border-gray-200 mt-2">
              <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                DW
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Dana Wren</p>
                <p className="text-sm italic text-gray-600">
                  "{lang === 'en' ? challenge.danaEn : challenge.danaJa}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      {chosen && (
        <div className="flex justify-end animate-fade-in">
          <button onClick={handleNext} className="btn-primary text-sm">
            {currentStep < CHALLENGES.length - 1
              ? (lang === 'en' ? 'Add Next Layer →' : '次のレイヤーを追加 →')
              : (lang === 'en' ? 'Complete Map →' : 'マップを完成させる →')}
          </button>
        </div>
      )}
    </div>
  );
}
