import { Lang } from '@/lib/i18n';

const en = {
  // ── Landing ────────────────────────────────────────────────────────────────
  gembaTitle:       'TPS Gemba',
  dojoTitle:        'TPS Gemba',       // legacy alias
  dojoTitleJa:      '現場研修',
  dojoSubtitle:     'Toyota Production System · Individual Training',
  dojoTagline:      'Go to the actual place. See the actual thing.',
  yourBelt:         'Your Belt',
  yourXP:           'Total XP',
  toNextBelt:       'to next belt',
  allModules:       'Training Modules',
  beginModule:      'Begin',
  continueModule:   'Continue',
  reviewModule:     'Review',
  moduleLocked:     'Locked',
  moduleCompleted:  'Completed ✓',
  unlockAt:         'Unlock at',
  xpLabel:          'XP',
  totalXP:          'Total XP',
  dailyPractice:    'Daily Practice',
  practiceTagline:  'Consistency builds mastery.',

  // ── Module Shell ───────────────────────────────────────────────────────────
  backToGemba:      'Gemba',
  backToDojo:       'Gemba',           // legacy alias
  stepLabel:        'Step',
  ofLabel:          'of',
  nextStep:         'Next Step →',
  prevStep:         '← Back',
  completeModule:   'Complete Module',
  moduleProgress:   'Module Progress',
  stepComplete:     '✓ Step Complete',
  earnedXP:         'XP earned',
  moduleComplete:   '🎉 Module Complete!',
  returnToGemba:    'Return to Gemba',
  returnToDojo:     'Return to Gemba', // legacy alias
  comingSoon:       'Coming Soon',
  comingSoonDesc:   'This module is in development. Complete Module 1 & 2 first.',
  wellDone:         'Well done. Every step forward is improvement.',

  // Step type labels
  typeObservation:  'Observation',
  typeQuiz:         'Quiz',
  typeSimulation:   'Simulation',
  typeBuilder:      'Builder',
  typeDrill:        'Drill',
  typeReflection:   'Reflection',

  // ── Module 1 Step 1: Chalk Circle ─────────────────────────────────────────
  chalkCircleTitle:       'The Chalk Circle',
  chalkCircleQuote:       '"Stand in the circle. Observe for three hours. You will begin to see."',
  chalkCircleAttrib:      '— Taiichi Ohno, to a young Toyota engineer',
  chalkCircleIntro:
    'Ohno\'s method: draw a chalk circle on the factory floor, put a manager inside, and tell them to observe. ' +
    'Not to fix, not to talk — just to see. Most people watch a factory and see nothing. ' +
    'A trained eye sees waste everywhere.',
  chalkCircleSceneLabel:  'The Scene',
  chalkCircleScene:
    'You arrive at a machining cell at 7:15 AM. Six CNC machines line the walls in a U-shape. ' +
    'Parts travel in large grey bins — each holding 50 pieces — between machines on a wheeled cart pushed by two operators. ' +
    'Machine 3 is dark; a yellow caution light blinks. The operator at Machine 3 sits on a stool reading a phone. ' +
    'Between Machine 4 and Machine 5, three full bins wait in a row. ' +
    'Machine 5\'s operator runs it at 60% speed — "to match the pace of the slowest machine," he explains. ' +
    'A whiteboard near the entrance shows yesterday\'s target: 240 parts. Actual: 191. ' +
    'On the supervisor\'s desk: a stack of 14 pink rework tickets.',
  observationPrompt:
    'Spend 3 minutes. What do you see? Write your observations below. Be specific.',
  observationPlaceholder:
    'What is moving? What is stopped? What is waiting? What looks uneven? ' +
    'What would a customer pay for — and what would they not?',
  wastePrompt:         'From your observations, what might be non-value-added (waste)?',
  wastePlaceholder:    'Identify the waste types you observed and where you saw them…',
  submitObservation:   'Submit Observations',

  // Coaching feedback after submission
  coachPerspective:    'Coach\'s Perspective',
  coachFeedback1:
    'Operator seated at Machine 1 (left of frame) — Waiting waste. ' +
    'The shift started at 07:15 and the machine is dark. The operator is idle because the process stopped, ' +
    'not because there was no demand. This is a Jidoka moment: stop, signal, fix — don\'t wait in silence.',
  coachFeedback2:
    'Grey bins stacked on the wheeled cart (center of frame) — Inventory waste. ' +
    'Each bin holds ~50 pieces. Moving parts in large batches means a defect made at step 1 ' +
    'hides for 50 cycles before anyone discovers it at step 2.',
  coachFeedback3:
    'One operator pushing a fully loaded cart alone — Transport & Motion waste. ' +
    'Parts are traveling in large lots across the floor instead of flowing piece-by-piece between machines. ' +
    'Every push of that cart is lead time that the customer is not paying for.',
  coachFeedback4:
    '14 pink rework tickets on the desk (lower left of frame) — Defect waste. ' +
    'Each ticket represents a part that was touched, rejected, and will be touched again. ' +
    'Double the labor, double the cost, and a quality signal that should have stopped the line.',
  coachFeedback5:
    'Whiteboard on the left wall: Target 240 — Actual 191. A −20.4% gap by 07:15 AM. ' +
    'This number is the cumulative result of every waste above: idle machines, batch transport, rework. ' +
    'Ohno\'s insight: the board doesn\'t lie — but it only tells you the score, not the cause.',

  // ── Module 1 Step 2: Waste Spotter ────────────────────────────────────────
  wasteSpotterTitle:     'Waste Spotter',
  wasteSpotterInstruction:
    'Read the scene below. Check every waste type you can identify. ' +
    'Then check your answer to see how many you found.',
  wasteSpotterSceneLabel: 'Dashboard Assembly Cell — Day Shift',
  wasteSpotterScene:
    'You observe a dashboard assembly cell:\n' +
    '1. An operator walks 8 meters to fetch parts from a storage rack, 12 times per shift.\n' +
    '2. Three full bins of finished sub-assemblies sit between Station 1 and Station 2, waiting for Station 2 to clear.\n' +
    '3. Station 2 has been stopped for 45 minutes. The team leader is waiting for a replacement cutting insert.\n' +
    '4. Yesterday\'s production count: 120 units built, 80 units shipped. 40 units sit in finished-goods stock.\n' +
    '5. Six dashboards per shift are sent to rework for a minor burr that could be eliminated by a fixture modification.\n' +
    '6. Two senior assembly technicians — the best in the plant — were reassigned to material handling three months ago.',
  checkWastes:           'Check My Selections',
  wasteResults:          'Results',
  tryAgainWaste:         'Try Again',
  showExplanations:      'Show Explanations',

  // Waste type labels (TIMWOOD+S)
  wasteTransport:        'Transport',
  wasteInventory:        'Inventory',
  wasteMotion:           'Motion',
  wasteWaiting:          'Waiting',
  wasteOverproduction:   'Overproduction',
  wasteOverprocessing:   'Overprocessing',
  wasteDefects:          'Defects',
  wasteSkills:           'Unused Skills / Talent',

  // Waste explanations
  explTransport:    'Not identified here — the operator\'s walk is Motion (person moving), not Transport (materials moving by conveyor or vehicle).',
  explInventory:    '✓ Three bins between stations = WIP inventory. Parts waiting = money locked, problems hidden.',
  explMotion:       '✓ 8-meter walk × 12 times = wasted human movement. Can parts come to the operator?',
  explWaiting:      '✓ Station 2 down 45 minutes = people and machines idle. This is the loudest waste.',
  explOverprod:     '✓ 120 built, 80 needed — making 40 parts nobody asked for yet. "Just-in-case" is muda.',
  explOverproc:     'Not clearly identified here — though rework (doing work twice) edges into this.',
  explDefects:      '✓ 6 rework parts per shift. Rework is double labor, double cost, half quality.',
  explSkills:       '✓ Senior technicians doing material handling. Their assembly knowledge is going unused — the hardest waste to see.',

  // ── Module 1 Step 3: 5-Why Drill ──────────────────────────────────────────
  fiveWhyTitle:          '5-Why Drill',
  fiveWhyOhnoQuote:
    '"By repeating why five times, the nature of the problem and the solution becomes clear."',
  fiveWhyAttrib:         '— Taiichi Ohno',
  fiveWhyIntro:
    'The 5-Why technique does not aim to find blame. It aims to find the root — the system condition ' +
    'that, if changed, prevents the problem from recurring. Ask "why?" not "who?"',
  fiveWhyProblemLabel:   'Problem Statement',
  fiveWhyProblem:
    'Apex Automotive missed 3 consecutive shipments, putting an assembly line at risk of stoppage.',
  fiveWhyCoachAsk:       'Why did this happen?',
  fiveWhyYourAnswer:     'Your answer:',
  fiveWhyAnswerPlaceholder: 'Write your "why" here…',
  fiveWhySubmit:         'Ask "Why?" Again →',
  fiveWhyCoachAnswer:    'Root answer:',
  fiveWhyRootLabel:      'Root Cause Identified',
  fiveWhyComplete:       'You\'ve reached the root.',
  fiveWhyNextPrompt:     'The coach reveals the next layer:',

  // The 5-Why chain (canonical answers shown after each user submission)
  why1answer:
    'Apex could not source raw materials — their tier-2 suppliers refused to ship without payment.',
  why2answer:
    'Apex\'s accounts payable was frozen. They had no cash to pay suppliers.',
  why3answer:
    'Apex\'s revolving credit line was placed on hold by their bank.',
  why4answer:
    'Apex breached a key financial covenant — their interest coverage ratio fell below 2.5×.',
  why5answer:
    'Apex\'s customer unilaterally extended payment terms from Net-30 to Net-60, ' +
    'creating a $1.9M working capital gap that wiped out Apex\'s liquidity buffer.',
  rootCauseText:
    'A payment term extension was made without a supplier impact assessment. ' +
    'No one asked: "If we pay Apex 30 days later, can they survive the gap?"',

  // ── Module 2 Step 1: TPS House Builder ────────────────────────────────────
  tpsHouseTitle:         'Foundation First',
  tpsHouseInstruction:
    'The TPS House only stands if the foundation is solid. ' +
    'Place each element into its correct position in the house.',
  tpsHouseClickPrompt:   'Click a slot to place an element.',
  tpsHouseSelectPrompt:  'Select the element that belongs here:',
  tpsHouseCorrect:       'Correct! Well placed.',
  tpsHouseWrong:         'Not quite — think about what this section represents.',
  tpsHouseComplete:      'The House stands! You\'ve placed all elements correctly.',

  // TPS House section labels
  tpsGoal:      'Goal',
  tpsLeftPillar:  'Left Pillar',
  tpsRightPillar: 'Right Pillar',
  tpsCenter:    'Center',
  tpsFoundation1: 'Foundation (left)',
  tpsFoundation2: 'Foundation (center)',
  tpsFoundation3: 'Foundation (right)',

  // TPS elements
  elemJIT:          'Just-In-Time (JIT)',
  elemJidoka:       'Jidoka (自働化)',
  elemHeijunka:     'Heijunka (平準化)',
  elemStdWork:      'Standardized Work (標準作業)',
  elemKaizen:       'Kaizen (改善)',
  elemPeople:       'People & Teamwork',
  elemGoal:         'Best Quality · Lowest Cost · Shortest Lead Time',

  // Explanations after correct placement
  explJIT:
    'JIT — the left pillar. Make only what is needed, when needed, in the quantity needed. ' +
    'Powered by Takt Time, continuous flow, and pull systems.',
  explJidoka:
    'Jidoka — the right pillar. 自働化: automation with a human touch. ' +
    'Machines stop when abnormalities occur. Humans fix the root cause.',
  explHeijunka:
    'Heijunka — the foundation\'s first stone. Level production by volume and mix ' +
    'so the whole system breathes steadily.',
  explStdWork:
    'Standardized Work — the center stone. Without a standard, you cannot improve. ' +
    'It\'s the baseline from which all Kaizen starts.',
  explKaizen:
    'Kaizen — the third stone. Continuous, incremental improvement by everyone, every day. ' +
    'Not a project — a practice.',
  explPeople:
    'People & Teamwork — the heart of the house. TPS is not a machine system; ' +
    'it is a people system. Respect for people is non-negotiable.',
  explGoal:
    'The goal at the top: Best Quality, Lowest Cost, Shortest Lead Time — ' +
    'achieved only when the entire house is in order.',

  // ── Module 2 Step 2: Two Pillars Quiz ─────────────────────────────────────
  twoPillarsTitle:       'The Two Pillars',
  twoPillarsInstruction: 'Five questions on JIT and Jidoka. Take your time.',
  questionLabel:         'Question',
  submitAnswer:          'Submit',
  nextQuestion:          'Next Question →',
  quizComplete:          'Quiz Complete',
  yourScore:             'Your Score',
  outOf:                 'out of',
  reviewAnswers:         'Review Answers',

  // ── Module 2 Step 3: Living Roof ──────────────────────────────────────────
  livingRoofTitle:       'The Living Roof',
  livingRoofIntro:
    'Kaizen (改善) sits at the foundation AND lives as the roof\'s spirit. ' +
    '"Kai" means change. "Zen" means good. Change for the better — every day, by everyone.',
  kaizenOhnoQuote:
    '"There is no limit to improvement. That is what Kaizen means."',
  kaizenAttrib:          '— Masaaki Imai, Kaizen: The Key to Japan\'s Competitive Success',
  kaizenReflectionLabel: 'Your Kaizen Commitment',
  kaizenReflectionPrompt:
    'Ohno believed improvement starts with honest observation of the current state. ' +
    'In your current work (or life), what is one waste or unevenness you can address this week?',
  kaizenPlaceholder:
    'Describe the current situation, the waste or problem you see, and one small change you will make…',
  submitReflection:      'Submit My Commitment',
  reflectionSaved:       'Commitment recorded. The first step of Kaizen is naming what to improve.',
};

const ja: typeof en = {
  // ── Landing ────────────────────────────────────────────────────────────────
  gembaTitle:       'TPS現場',
  dojoTitle:        'TPS現場',         // legacy alias
  dojoTitleJa:      '現場研修',
  dojoSubtitle:     'トヨタ生産方式・個人研修',
  dojoTagline:      '実際の場所へ行け。実際のものを見よ。',
  yourBelt:         'あなたの帯',
  yourXP:           '合計XP',
  toNextBelt:       '次の帯まで',
  allModules:       '研修モジュール',
  beginModule:      '開始',
  continueModule:   '続ける',
  reviewModule:     '復習',
  moduleLocked:     'ロック中',
  moduleCompleted:  '完了 ✓',
  unlockAt:         '解除条件',
  xpLabel:          'XP',
  totalXP:          '合計XP',
  dailyPractice:    '日々の修練',
  practiceTagline:  '継続が習得を築く。',

  // ── Module Shell ───────────────────────────────────────────────────────────
  backToGemba:      '現場',
  backToDojo:       '現場',           // legacy alias
  stepLabel:        'ステップ',
  ofLabel:          '/',
  nextStep:         '次のステップ →',
  prevStep:         '← 前へ',
  completeModule:   'モジュール完了',
  moduleProgress:   'モジュール進捗',
  stepComplete:     '✓ ステップ完了',
  earnedXP:         'XP獲得',
  moduleComplete:   '🎉 モジュール完了！',
  returnToGemba:    '現場に戻る',
  returnToDojo:     '現場に戻る',     // legacy alias
  comingSoon:       '近日公開',
  comingSoonDesc:   'このモジュールは開発中です。まずモジュール1・2を完了してください。',
  wellDone:         'よくできました。前に進んだすべての一歩が改善です。',

  typeObservation:  '観察',
  typeQuiz:         'クイズ',
  typeSimulation:   'シミュレーション',
  typeBuilder:      'ビルダー',
  typeDrill:        'ドリル',
  typeReflection:   '振り返り',

  // ── Module 1 Step 1 ────────────────────────────────────────────────────────
  chalkCircleTitle:       'チョークの輪',
  chalkCircleQuote:       '「輪の中に立て。三時間観察せよ。そうすれば見えてくる。」',
  chalkCircleAttrib:      '— 大野耐一、若いトヨタエンジニアへ',
  chalkCircleIntro:
    '大野の方法：工場の床にチョークで輪を描き、管理者をその中に立たせ、観察するよう命じる。' +
    '修正するのでも、話すのでもなく—ただ見る。ほとんどの人は工場を見ても何も気づかない。' +
    '訓練された目は、至る所に無駄を見出す。',
  chalkCircleSceneLabel:  '現場',
  chalkCircleScene:
    '午前7時15分、機械加工セルに到着。6台のCNCマシンがU字型に並ぶ。' +
    '部品は大きなグレーのビン（1個50個入り）で、2人の作業者が台車で運搬する。' +
    'マシン3は停止中で、黄色の警告ランプが点滅している。' +
    'マシン3の作業者はスツールに座り、スマートフォンを見ている。' +
    'マシン4とマシン5の間には、満杯のビンが3つ並んで待機している。' +
    'マシン5の作業者は60%の速度で稼働させている—「最も遅いマシンに合わせるため」と説明する。' +
    '入口近くのホワイトボードには昨日の目標：240個。実績：191個。' +
    '監督者のデスクには：14枚のピンクの手直し伝票が積まれている。',
  observationPrompt:
    '3分間。何が見えますか？以下に観察を記述してください。具体的に。',
  observationPlaceholder:
    '何が動いているか？何が停止しているか？何が待機しているか？何が不均一か？' +
    '顧客が対価を払うもの—そうでないものは何か？',
  wastePrompt:         'あなたの観察から、非付加価値（無駄）と思われるものは？',
  wastePlaceholder:    '観察した無駄の種類と、その場所を特定してください…',
  submitObservation:   '観察を提出',

  coachPerspective:    'コーチの視点',
  coachFeedback1:
    'マシン1に座る作業者（フレーム左）—待機の無駄。' +
    '07:15にシフトが始まっているのにマシンは停止中。需要がないからではなく、プロセスが止まったから待機している。' +
    'これは自働化の好機：異常を知らせ、止め、直せ—沈黙の中で待つな。',
  coachFeedback2:
    '台車に積まれたグレーのビン（フレーム中央）—在庫の無駄。' +
    '各ビンには約50個の部品が入っている。大ロットで移動させると、工程1で発生した不良が' +
    '工程2で発見されるまで50サイクル隠れ続ける。',
  coachFeedback3:
    '一人の作業者が重い台車を一人で押している—運搬・動作の無駄。' +
    '部品は機械間を一個流しではなく、大ロットで床を移動している。' +
    'その台車を押すたびに、顧客が対価を払っていないリードタイムが積み上がる。',
  coachFeedback4:
    'デスク上の14枚のピンク手直し伝票（フレーム左下）—不良品の無駄。' +
    '各伝票は一度タッチされ、不合格になり、もう一度タッチされる部品を表している。' +
    '工数2倍、コスト2倍—そしてラインを止めるべき品質シグナル。',
  coachFeedback5:
    '左壁のホワイトボード：目標240個—実績191個。07:15時点で−20.4%の差。' +
    'この数字は上記のすべての無駄の累積結果だ：停止マシン、バッチ運搬、手直し。' +
    '大野の洞察：ボードは嘘をつかない—しかしスコアを示すだけで、原因は示さない。',

  // ── Module 1 Step 2 ────────────────────────────────────────────────────────
  wasteSpotterTitle:     '無駄発見者',
  wasteSpotterInstruction:
    '以下の現場を読んでください。確認できる無駄の種類にチェックを入れてください。' +
    '答え合わせで何個発見できたか確認しましょう。',
  wasteSpotterSceneLabel: 'ダッシュボード組立セル — 日勤',
  wasteSpotterScene:
    'ダッシュボード組立セルを観察しています：\n' +
    '1. 作業者が保管ラックから部品を取りに8メートル歩き、これをシフト中12回繰り返す。\n' +
    '2. 完成した中間組立品が入った3つのビンが、ステーション1と2の間で待機中。\n' +
    '3. ステーション2が45分間停止中。チームリーダーが交換用切削インサートを待っている。\n' +
    '4. 昨日の生産数：120ユニット製造、80ユニット出荷。40ユニットが完成品在庫として積まれている。\n' +
    '5. 治具の改善で解消できるバリのために、1シフトあたり6台のダッシュボードが手直しに送られる。\n' +
    '6. 工場で最も熟練した上級組立技術者2名が、3ヶ月前に資材搬送業務に配置転換された。',
  checkWastes:           '答え合わせ',
  wasteResults:          '結果',
  tryAgainWaste:         'もう一度',
  showExplanations:      '解説を表示',

  wasteTransport:        '運搬',
  wasteInventory:        '在庫',
  wasteMotion:           '動作',
  wasteWaiting:          '待機',
  wasteOverproduction:   '過剰生産',
  wasteOverprocessing:   '過剰加工',
  wasteDefects:          '不良品',
  wasteSkills:           '未使用のスキル・人材',

  explTransport:    'ここでは確認されません—作業者の歩行は動作の無駄（人が動く）であり、運搬の無駄（コンベアや車両で材料が動く）ではありません。',
  explInventory:    '✓ ステーション間の3つのビン＝仕掛品在庫。待機中の部品＝ロックされた資金、隠れた問題。',
  explMotion:       '✓ 8メートルの歩行×12回＝無駄な人の動作。部品を作業者の元に届けることはできないか？',
  explWaiting:      '✓ ステーション2が45分停止＝人と機械のアイドル。最も目立つ無駄。',
  explOverprod:     '✓ 120個製造、80個必要—誰も要求していない40個を製造。「念のため」は無駄。',
  explOverproc:     'ここでは明確に確認されません—ただし手直し（作業を2回行う）は過剰加工に接近する。',
  explDefects:      '✓ 1シフトあたり6個の手直し品。手直しはダブルの工数、ダブルのコスト、半分の品質。',
  explSkills:       '✓ 上級技術者が資材搬送。彼らの組立知識が活用されていない—最も見えにくい無駄。',

  // ── Module 1 Step 3 ────────────────────────────────────────────────────────
  fiveWhyTitle:          '5なぜドリル',
  fiveWhyOhnoQuote:
    '「なぜを5回繰り返せば、問題の本質と解決策が明らかになる。」',
  fiveWhyAttrib:         '— 大野耐一',
  fiveWhyIntro:
    '5なぜは犯人探しではありません。根本—変えることで問題の再発を防ぐシステム的な条件—を見つけることです。' +
    '「誰が？」ではなく「なぜ？」と問いなさい。',
  fiveWhyProblemLabel:   '問題文',
  fiveWhyProblem:
    'Apex Automotiveが3回連続で出荷を遅延し、組立ラインの停止が脅かされている。',
  fiveWhyCoachAsk:       'なぜこうなったのですか？',
  fiveWhyYourAnswer:     'あなたの答え：',
  fiveWhyAnswerPlaceholder: '「なぜ」を記述してください…',
  fiveWhySubmit:         'もう一度「なぜ？」→',
  fiveWhyCoachAnswer:    '根本的な答え：',
  fiveWhyRootLabel:      '根本原因を特定',
  fiveWhyComplete:       '根本に到達しました。',
  fiveWhyNextPrompt:     'コーチが次の層を明かします：',

  why1answer:
    'Apexは原材料を調達できませんでした—tier-2サプライヤーが支払いなしに出荷を拒否。',
  why2answer:
    'Apexの買掛金が凍結されました。サプライヤーに支払う現金がありませんでした。',
  why3answer:
    'Apexの銀行がリボルビングクレジットラインを保留にしました。',
  why4answer:
    'Apexが主要な財務コベナンツ—インタレスト・カバレッジ・レシオが2.5x未満—に違反しました。',
  why5answer:
    'Apexの顧客が支払条件をNet-30からNet-60に一方的に延長し、' +
    '$190万の運転資本ギャップを生み出してApexの流動性バッファーを枯渇させました。',
  rootCauseText:
    'サプライヤーへの影響評価なしに支払条件の延長が行われた。' +
    '誰もこう問いませんでした：「30日遅く支払ったら、Apexはそのギャップを生き残れるか？」',

  // ── Module 2 Step 1 ────────────────────────────────────────────────────────
  tpsHouseTitle:         '基盤から始める',
  tpsHouseInstruction:
    'TPSの家は基盤が固いときのみ立ちます。' +
    '各要素を家の正しい位置に配置してください。',
  tpsHouseClickPrompt:   'スロットをクリックして要素を配置してください。',
  tpsHouseSelectPrompt:  'ここに属する要素を選択してください：',
  tpsHouseCorrect:       '正解！正しく配置されました。',
  tpsHouseWrong:         '惜しい—このセクションが何を表しているか考えてみてください。',
  tpsHouseComplete:      '家が立ちました！すべての要素を正しく配置しました。',

  tpsGoal:        '目標',
  tpsLeftPillar:  '左の柱',
  tpsRightPillar: '右の柱',
  tpsCenter:      '中心',
  tpsFoundation1: '基盤（左）',
  tpsFoundation2: '基盤（中）',
  tpsFoundation3: '基盤（右）',

  elemJIT:      'ジャスト・イン・タイム（JIT）',
  elemJidoka:   '自働化（Jidoka）',
  elemHeijunka: '平準化（Heijunka）',
  elemStdWork:  '標準作業',
  elemKaizen:   '改善（Kaizen）',
  elemPeople:   '人・チームワーク',
  elemGoal:     '最高品質・最低コスト・最短リードタイム',

  explJIT:
    'JIT—左の柱。必要なものを、必要なときに、必要な量だけ作る。' +
    'タクトタイム、連続フロー、プルシステムで支えられる。',
  explJidoka:
    '自働化—右の柱。人の手を加えた自動化。' +
    '機械は異常が発生したら止まる。人間は根本原因を直す。',
  explHeijunka:
    '平準化—基盤の最初の石。量と品種で生産を平準化し、' +
    'システム全体が安定したリズムで呼吸できるようにする。',
  explStdWork:
    '標準作業—中心の石。標準なしでは改善できない。' +
    'すべての改善が始まるベースラインだ。',
  explKaizen:
    '改善—3番目の石。全員が毎日、継続的に、段階的に改善する。' +
    'プロジェクトではなく—実践だ。',
  explPeople:
    '人・チームワーク—家の心臓。TPSは機械のシステムではなく、' +
    '人のシステムだ。人間性尊重は交渉の余地がない。',
  explGoal:
    '頂上の目標：最高品質、最低コスト、最短リードタイム—' +
    '家全体が整ったときにのみ達成される。',

  // ── Module 2 Step 2 ────────────────────────────────────────────────────────
  twoPillarsTitle:       '二本の柱',
  twoPillarsInstruction: 'JITと自働化に関する5つの問題。じっくり取り組んでください。',
  questionLabel:         '問題',
  submitAnswer:          '回答',
  nextQuestion:          '次の問題 →',
  quizComplete:          'クイズ完了',
  yourScore:             'あなたのスコア',
  outOf:                 '/',
  reviewAnswers:         '答えを確認',

  // ── Module 2 Step 3 ────────────────────────────────────────────────────────
  livingRoofTitle:       '生きている屋根',
  livingRoofIntro:
    '改善（Kaizen）は基盤に座り、屋根の精神として生きています。' +
    '「改」は変化を意味します。「善」は良いを意味します。より良い変化—毎日、全員で。',
  kaizenOhnoQuote:
    '「改善に限界はない。それが改善の意味だ。」',
  kaizenAttrib:          '— 今井正明、『改善：日本の競争力の鍵』',
  kaizenReflectionLabel: 'あなたの改善コミットメント',
  kaizenReflectionPrompt:
    '大野は、改善は現状の正直な観察から始まると信じていました。' +
    '現在の仕事（または生活）において、今週取り組める無駄または不均一は何ですか？',
  kaizenPlaceholder:
    '現状、あなたが見る無駄または問題、そして行う一つの小さな変化を記述してください…',
  submitReflection:      '私のコミットメントを提出',
  reflectionSaved:       'コミットメントが記録されました。改善の最初のステップは改善すべきことに名前をつけることです。',
};

export type DojoTKey = keyof typeof en;
export const dojoTranslations: Record<Lang, typeof en> = { en, ja };

export function getDojoT(lang: Lang) {
  return (key: DojoTKey): string => dojoTranslations[lang][key];
}
