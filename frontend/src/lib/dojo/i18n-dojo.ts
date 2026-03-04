import { Lang } from '@/lib/i18n';

const en = {
  // ── Landing ────────────────────────────────────────────────────────────────
  gembaTitle: 'TPS Gemba: Investigation Prep',
  dojoTitle: 'TPS Gemba: Investigation Prep',       // legacy alias
  dojoTitleJa: '現場研修：調査準備',
  dojoSubtitle: 'Toyota Production System · Apex Case Study',
  dojoTagline: 'Before you can solve the Apex Meltdown, you must learn to see the factory floor correctly.',
  yourBelt: 'Your Belt',
  yourXP: 'Total XP',
  toNextBelt: 'to next belt',
  allModules: 'Training Modules',
  beginModule: 'Begin',
  continueModule: 'Continue',
  reviewModule: 'Review',
  moduleLocked: 'Locked',
  moduleCompleted: 'Completed ✓',
  unlockAt: 'Unlock at',
  xpLabel: 'XP',
  totalXP: 'Total XP',
  dailyPractice: 'Daily Practice',
  practiceTagline: 'Consistency builds mastery.',

  // ── Module Shell ───────────────────────────────────────────────────────────
  backToGemba: 'Gemba',
  backToDojo: 'Gemba',           // legacy alias
  stepLabel: 'Step',
  ofLabel: 'of',
  nextStep: 'Next Step →',
  prevStep: '← Back',
  completeModule: 'Complete Module',
  moduleProgress: 'Module Progress',
  stepComplete: '✓ Step Complete',
  earnedXP: 'XP earned',
  moduleComplete: '🎉 Module Complete!',
  returnToGemba: 'Return to Gemba',
  returnToDojo: 'Return to Gemba', // legacy alias
  comingSoon: 'Coming Soon',
  comingSoonDesc: 'This module is in development. Complete Module 1 & 2 first.',
  wellDone: 'Well done. Every step forward is improvement.',

  // Step type labels
  typeObservation: 'Observation',
  typeQuiz: 'Quiz',
  typeSimulation: 'Simulation',
  typeBuilder: 'Builder',
  typeDrill: 'Drill',
  typeReflection: 'Reflection',

  // ── Module 1 Step 1: The Gemba Walk ───────────────────────────────────────
  gembaWalkTitle: 'The Gemba Walk',
  gembaWalkIntro1: 'Data tells you what is happening. The Gemba tells you why.',
  gembaWalkIntro2: 'A true Lean practitioner goes beyond reports. You must develop the habit of direct observation to understand the reality of the work.',
  gembaWalkLearning: 'There are four distinct types of Gemba walks. Before you step into Ohno\'s Chalk Circle to observe, you must know what kind of walk you are taking.',

  auditWalkTitle: 'The Audit Walk',
  auditWalkWhat: 'What: Check if standards are being followed',
  auditWalkWhy: 'Why: Ensures discipline and catches deviations early',
  auditWalkHow: 'How: Use a checklist. Focus on compliance. Document gaps. Follow up.',
  auditWalkExample: 'Example: Are 5S boards updated? Is PPE worn?',

  learningWalkTitle: 'The Learning Walk',
  learningWalkWhat: 'What: Understand how the work actually gets done',
  learningWalkWhy: 'Why: Builds respect and uncovers hidden problems',
  learningWalkHow: 'How: Ask open questions. Watch without judging. Take notes, not photos.',
  learningWalkExample: 'Example: "Can you show me how you handle rework?"',

  problemWalkTitle: 'The Problem-Solving Walk',
  problemWalkWhat: 'What: Go deep on a specific issue',
  problemWalkWhy: 'Why: Shows you care about fixing, not just checking',
  problemWalkHow: 'How: Target one problem area. Use 5 Whys. Commit to action.',
  problemWalkExample: 'Example: "Let\'s trace back this quality defect together."',

  teachingWalkTitle: 'The Teaching Walk',
  teachingWalkWhat: 'What: Coach employees in real time',
  teachingWalkWhy: 'Why: Builds capability and reinforces culture',
  teachingWalkHow: 'How: Spot coaching moments. Ask guiding questions. Model behavior.',
  teachingWalkExample: 'Example: "What would happen if we moved this earlier?"',

  completeGembaWalkRead: 'I understand the 4 types of walks',

  // ── Module 1 Step 2: Chalk Circle ─────────────────────────────────────────
  chalkCircleTitle: 'The Chalk Circle',
  chalkCircleQuote: '"Stand in the circle. Observe for three hours. You will begin to see."',
  chalkCircleAttrib: '— Taiichi Ohno, to a young Toyota engineer',
  chalkCircleIntro:
    'Ohno\'s method: draw a chalk circle on the factory floor, put a manager inside, and tell them to observe. ' +
    'Not to fix, not to talk — just to see. Most people watch a factory and see nothing. ' +
    'A trained eye sees waste everywhere.',
  chalkCircleSceneLabel: 'Apex Headquarters — Accounts Receivable Desk',
  chalkCircleScene:
    'It is mid-October. You stand in the Chalk Circle near the Accounts Receivable desk at Apex Headquarters. A financial analyst is reviewing the OEM payment portal. The portal shows $1.9M in approved invoices, but the payment date has been pushed from 30 days to 60 days. ' +
    'The analyst refreshes the Bank portal: the $10M revolving credit facility shows "STATUS: HOLD - PENDING REVIEW". ' +
    'A stack of paper invoices sits in an "Aging > 60 Days" tray. ' +
    'The analyst spends 15 minutes drafting an email to the OEM Procurement team asking for an exception, but leaves it in Drafts when they realize they have no leverage.',
  observationPrompt:
    'Spend 3 minutes. What do you see? Write your observations below. Think about how the "flow" of cash has stopped. ' +
    '(Hint: Notice the fragility being built into the Apex system by the new payment terms).',
  observationPlaceholder:
    'What is moving? What is stopped? What is waiting? What looks uneven? ' +
    'What would a customer pay for — and what would they not?',
  wastePrompt: 'From your observations, what might be non-value-added (waste)?',
  wastePlaceholder: 'Identify the waste types you observed and where you saw them…',
  submitObservation: 'Submit Observations',

  // Coaching feedback after submission
  coachPerspective: 'Coach\'s Perspective',
  coachFeedback1:
    'Analyst refreshing the bank portal — Waiting waste. ' +
    'The cash flow has stopped, not because there was no demand for parts, but because the payment terms were unilaterally changed. ' +
    'This is a Jidoka moment: stop, signal the covenant breach, fix — don\'t wait in silence.',
  coachFeedback2:
    'The $1.9M in approved but unpaid invoices (in the portal and in the tray) — Inventory waste. ' +
    'Instead of physical parts sitting on a cart, this is working capital sitting idle. Unpaid invoices are just inventory by another name. ' +
    'They hide the liquidity problem just like physical inventory hides quality problems.',
  coachFeedback3:
    'Drafting the exception email and deleting it — Overprocessing and Motion waste. ' +
    'The analyst is performing work (typing the email) that adds no value to the customer and doesn\'t solve the root cause, ' +
    'because they lack the authority to enforce payment.',
  coachFeedback4:
    'The "HOLD - PENDING REVIEW" status on the revolver — Defect waste (Financial). ' +
    'The system failed. By allowing the Net-60 terms to compress margins alongside the 23% steel price shock, ' +
    'Apex breached their 2.5x Interest Coverage covenant. This is a massive defect in their working capital strategy.',
  coachFeedback5:
    'The impact: If Apex is running out of cash by mid-October due to the Net-60 extension, ' +
    'a sudden supplier demand for upfront payment (due to commodity shocks) will destroy them.',

  // ── Module 1 Step 2: Waste Spotter ────────────────────────────────────────
  wasteSpotterTitle: 'Waste Spotter',
  wasteSpotterInstruction:
    'Read the scene below. Check every waste type you can identify. ' +
    'Then check your answer to see how many you found.',
  wasteSpotterSceneLabel: 'OEM Headquarters — Procurement Department',
  wasteSpotterScene:
    'You observe the Procurement department rolling out the "Working Capital Optimization (Net-60)" program:\n' +
    '1. The policy was implemented across 400 suppliers without reviewing if any critical Tier-2 suppliers would face bankruptcy.\n' +
    '2. A buyer spends 4 hours a day manually replying to angry emails from suppliers about delayed payments.\n' +
    '3. The legal team required 7 rounds of revisions on the standard contract language, resulting in a 40-page document no supplier reads.\n' +
    '4. Due to the 60-day delay, APEX has to wait twice as long to restock steel coils, slowing down the entire supply chain.\n' +
    '5. The OEM holds $50M in excess emergency cash reserves "just in case" suppliers fail, earning zero interest.\n' +
    '6. The most experienced supply chain risk analyst was reassigned to formatting PowerPoint decks for the Net-60 rollout.',
  checkWastes: 'Check My Selections',
  wasteResults: 'Results',
  tryAgainWaste: 'Try Again',
  showExplanations: 'Show Explanations',

  // Waste type labels (TIMWOOD+S)
  wasteTransport: 'Transport',
  wasteInventory: 'Inventory',
  wasteMotion: 'Motion',
  wasteWaiting: 'Waiting',
  wasteOverproduction: 'Overproduction',
  wasteOverprocessing: 'Overprocessing',
  wasteDefects: 'Defects',
  wasteSkills: 'Unused Skills / Talent',

  // Waste explanations
  explTransport: 'Not clearly identified here — information flow doesn\'t typically have physical transport waste, unless we count routing the 40-page contracts.',
  explInventory: '✓ $50M in excess emergency cash reserves. Cash sitting idle "just in case" is exactly like physical inventory sitting in a warehouse.',
  explMotion: '✓ Buyer spending 4 hours manually replying to emails. This is repetitive, non-value-added motion in a digital environment.',
  explWaiting: '✓ APEX and other suppliers waiting twice as long for payment (Net-60), which slows down the flow of raw materials across the entire value stream.',
  explOverprod: '✓ Implementing the policy across 400 suppliers without assessing risk. Overproducing the policy scope beyond what the supply chain could safely handle.',
  explOverproc: '✓ 7 rounds of legal revisions resulting in a 40-page contract no one reads. Doing more work than the customer (or the process) requires.',
  explDefects: 'Not clearly identified here — though the policy itself caused a massive defect (a supplier bankruptcy).',
  explSkills: '✓ The experienced risk analyst formatting PowerPoints. Their critical thinking skills are going unused.',

  // ── Module 1 Step 3: 5-Why Drill ──────────────────────────────────────────
  fiveWhyTitle: '5-Why Drill',
  fiveWhyOhnoQuote:
    '"By repeating why five times, the nature of the problem and the solution becomes clear."',
  fiveWhyAttrib: '— Taiichi Ohno',
  fiveWhyIntro:
    'The 5-Why technique does not aim to find blame. It aims to find the root — the system condition ' +
    'that, if changed, prevents the problem from recurring. Ask "why?" not "who?"',
  fiveWhyProblemLabel: 'Problem Statement',
  fiveWhyProblem:
    'Apex Automotive missed 3 consecutive shipments, putting an assembly line at risk of stoppage.',
  fiveWhyCoachAsk: 'Why did this happen?',
  fiveWhyYourAnswer: 'Your answer:',
  fiveWhyAnswerPlaceholder: 'Write your "why" here…',
  fiveWhySubmit: 'Ask "Why?" Again →',
  fiveWhyCoachAnswer: 'Root answer:',
  fiveWhyRootLabel: 'Root Cause Identified',
  fiveWhyComplete: 'You\'ve reached the root.',
  fiveWhyNextPrompt: 'The coach reveals the next layer:',

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
  tpsHouseTitle: 'Foundation First',
  tpsHouseInstruction:
    'The TPS House only stands if the foundation is solid. ' +
    'Place each element into its correct position in the house.',
  tpsHouseClickPrompt: 'Click a slot to place an element.',
  tpsHouseSelectPrompt: 'Select the element that belongs here:',
  tpsHouseCorrect: 'Correct! Well placed.',
  tpsHouseWrong: 'Not quite — think about what this section represents.',
  tpsHouseComplete: 'The House stands! You\'ve placed all elements correctly.',

  // TPS House section labels
  tpsGoal: 'Goal',
  tpsLeftPillar: 'Left Pillar',
  tpsRightPillar: 'Right Pillar',
  tpsCenter: 'Center',
  tpsFoundation1: 'Foundation (left)',
  tpsFoundation2: 'Foundation (center)',
  tpsFoundation3: 'Foundation (right)',

  // TPS elements
  elemJIT: 'Just-In-Time (JIT)',
  elemJidoka: 'Jidoka (自働化)',
  elemHeijunka: 'Heijunka (平準化)',
  elemStdWork: 'Standardized Work (標準作業)',
  elemKaizen: 'Kaizen (改善)',
  elemPeople: 'People & Teamwork',
  elemGoal: 'Best Quality · Lowest Cost · Shortest Lead Time',

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
  twoPillarsTitle: 'The Two Pillars',
  twoPillarsInstruction: 'Five questions on JIT and Jidoka. Take your time.',
  questionLabel: 'Question',
  submitAnswer: 'Submit',
  nextQuestion: 'Next Question →',
  quizComplete: 'Quiz Complete',
  yourScore: 'Your Score',
  outOf: 'out of',
  reviewAnswers: 'Review Answers',

  // ── Module 2 Step 3: Living Roof ──────────────────────────────────────────
  livingRoofTitle: 'The Living Roof',
  livingRoofIntro:
    'Kaizen (改善) sits at the foundation AND lives as the roof\'s spirit. ' +
    '"Kai" means change. "Zen" means good. Change for the better — every day, by everyone.',
  kaizenOhnoQuote:
    '"There is no limit to improvement. That is what Kaizen means."',
  kaizenAttrib: '— Masaaki Imai, Kaizen: The Key to Japan\'s Competitive Success',
  kaizenReflectionLabel: 'Your Kaizen Commitment',
  kaizenReflectionPrompt:
    'Ohno believed improvement starts with honest observation of the current state. ' +
    'In your current work (or life), what is one waste or unevenness you can address this week?',
  kaizenPlaceholder:
    'Describe the current situation, the waste or problem you see, and one small change you will make…',
  submitReflection: 'Submit My Commitment',
  reflectionSaved: 'Commitment recorded. The first step of Kaizen is naming what to improve.',
};

const ja: typeof en = {
  // ── Landing ────────────────────────────────────────────────────────────────
  gembaTitle: 'TPS現場：調査準備',
  dojoTitle: 'TPS現場：調査準備',         // legacy alias
  dojoTitleJa: '現場研修：調査準備',
  dojoSubtitle: 'トヨタ生産方式・Apex事例研究',
  dojoTagline: 'Apexの崩壊を解明する前に、工場の現場を正しく見る方法を学ばねばならない。',
  yourBelt: 'あなたの帯',
  yourXP: '合計XP',
  toNextBelt: '次の帯まで',
  allModules: '研修モジュール',
  beginModule: '開始',
  continueModule: '続ける',
  reviewModule: '復習',
  moduleLocked: 'ロック中',
  moduleCompleted: '完了 ✓',
  unlockAt: '解除条件',
  xpLabel: 'XP',
  totalXP: '合計XP',
  dailyPractice: '日々の修練',
  practiceTagline: '継続が習得を築く。',

  // ── Module Shell ───────────────────────────────────────────────────────────
  backToGemba: '現場',
  backToDojo: '現場',           // legacy alias
  stepLabel: 'ステップ',
  ofLabel: '/',
  nextStep: '次のステップ →',
  prevStep: '← 前へ',
  completeModule: 'モジュール完了',
  moduleProgress: 'モジュール進捗',
  stepComplete: '✓ ステップ完了',
  earnedXP: 'XP獲得',
  moduleComplete: '🎉 モジュール完了！',
  returnToGemba: '現場に戻る',
  returnToDojo: '現場に戻る',     // legacy alias
  comingSoon: '近日公開',
  comingSoonDesc: 'このモジュールは開発中です。まずモジュール1・2を完了してください。',
  wellDone: 'よくできました。前に進んだすべての一歩が改善です。',

  typeObservation: '観察',
  typeQuiz: 'クイズ',
  typeSimulation: 'シミュレーション',
  typeBuilder: 'ビルダー',
  typeDrill: 'ドリル',
  typeReflection: '振り返り',

  // ── Module 1 Step 1 ────────────────────────────────────────────────────────
  gembaWalkTitle: '現場歩行（Gemba Walk）',
  gembaWalkIntro1: 'データは何が起きているかを教えてくれる。現場は「なぜ」を教えてくれる。',
  gembaWalkIntro2: '真の実践者は報告書では満足しません。仕事の実態を理解するために、直接観察する習慣を身につける必要があります。',
  gembaWalkLearning: '現場歩行には明確に4つの種類があります。大野の「チョークの輪」に入って観察する前に、自分がどの歩行（ウォーク）を行っているのかを知る必要があります。',

  auditWalkTitle: '監査ウォーク (Audit Walk)',
  auditWalkWhat: '目的：標準が守られているか確認する',
  auditWalkWhy: '理由：規律を徹底し、逸脱を早期に発見する',
  auditWalkHow: '方法：チェックリストを使用。コンプライアンスに焦点。ギャップを記録。フォローアップ。',
  auditWalkExample: '例：「5Sボードは更新されていますか？PPEは着用されていますか？」',

  learningWalkTitle: '学習ウォーク (Learning Walk)',
  learningWalkWhat: '目的：仕事が実際にどのように行われているかを理解する',
  learningWalkWhy: '理由：敬意を築き、隠れた問題を発見する',
  learningWalkHow: '方法：開かれた質問をする。判断せずに観察する。写真ではなくメモを取る。',
  learningWalkExample: '例：「手直し（リワーク）の処理方法を見せてもらえますか？」',

  problemWalkTitle: '問題解決ウォーク (Problem-Solving Walk)',
  problemWalkWhat: '目的：特定の問題に深く踏み込む',
  problemWalkWhy: '理由：単なる確認ではなく、解決への姿勢を示す',
  problemWalkHow: '方法：一つの問題領域に絞る。5つの「なぜ」を使用。行動を確約する。',
  problemWalkExample: '例：「この品質不良の発生源を一緒に遡ってみましょう。」',

  teachingWalkTitle: '指導ウォーク (Teaching Walk)',
  teachingWalkWhat: '目的：リアルタイムで従業員をコーチングする',
  teachingWalkWhy: '理由：能力を構築し、文化を強化する',
  teachingWalkHow: '方法：コーチングの機会を見つける。導きの質問をする。模範を示す。',
  teachingWalkExample: '例：「この工程を早めたらどうなると思いますか？」',

  completeGembaWalkRead: '4種類のウォークを理解しました',

  // ── Module 1 Step 2 ────────────────────────────────────────────────────────
  chalkCircleTitle: 'チョークの輪',
  chalkCircleQuote: '「輪の中に立て。三時間観察せよ。そうすれば見えてくる。」',
  chalkCircleAttrib: '— 大野耐一、若いトヨタエンジニアへ',
  chalkCircleIntro:
    '大野の方法：工場の床にチョークで輪を描き、管理者をその中に立たせ、観察するよう命じる。' +
    '修正するのでも、話すのでもなく—ただ見る。ほとんどの人は工場を見ても何も気づかない。' +
    '訓練された目は、至る所に無駄を見出す。',
  chalkCircleSceneLabel: '現場（Apex Precision Parts — CNCセル4）',
  chalkCircleScene:
    '2024年8月です。午前7時15分、Apex Precision Partsの機械加工セルに到着。ここでは重要なBRK-A-2201キャリパーのサブアッセンブリを製造しています。6台のCNCマシンがU字型に並んでいます。' +
    '部品は大きなグレーのビン（1個50個入り）に入れられ、2人の作業者が台車で機械間を運搬しています。' +
    'マシン3は停止中で、黄色の警告ランプが点滅しています。マシン3の作業者はスツールに座り、スマートフォンを見ています。' +
    'マシン4とマシン5の間には、満杯のビンが3つ並んで待機しています。' +
    'マシン5の作業者は60%の速度で稼働させています—「最も遅いマシンに合わせるため」と彼は説明します。' +
    '入口近くのホワイトボードには昨日の目標：240個のBRK-Aキャリパー。実績：191個。' +
    '監督者のデスクには：ボア径の不良による14枚のピンクの手直し伝票が積まれています。',
  observationPrompt:
    '3分間。何が見えますか？以下に観察を記述してください。具体的に。' +
    '（ヒント：危機が襲う前にApexのシステムに組み込まれている「脆弱性」に注目してください）。',
  observationPlaceholder:
    '何が動いているか？何が停止しているか？何が待機しているか？何が不均一か？' +
    '顧客が対価を払うもの—そうでないものは何か？',
  wastePrompt: 'あなたの観察から、非付加価値（無駄）と思われるものは？',
  wastePlaceholder: '観察した無駄の種類と、その場所を特定してください…',
  submitObservation: '観察を提出',

  coachPerspective: 'コーチの視点',
  coachFeedback1:
    'マシン1に座る作業者（フレーム左）—待機の無駄。' +
    '07:15にシフトが始まっているのにマシンは停止中。需要がないからではなく、プロセスが止まったから待機している。' +
    'これは自働化の好機：異常を知らせ、止め、直せ—沈黙の中で待つな。',
  coachFeedback2:
    '台車に積まれたグレーのビン（フレーム中央）—在庫の無駄。' +
    '各ビンには約50個のBRK-A-2201が詰め込まれている。大ロットでの移動は、工程1のボア径不良を' +
    '発見されるまで50サイクル隠し続けることを意味する。',
  coachFeedback3:
    '一人の作業者が重い台車を一人で押している—運搬・動作の無駄。' +
    '部品は機械間を一個流しではなく、大ロットで床を移動している。' +
    'その台車を押すたびに、OEM顧客が対価を払っていないリードタイムが積み上がる。',
  coachFeedback4:
    'デスク上の14枚のピンク手直し伝票（フレーム左下）—不良品の無駄。' +
    '各伝票は一度タッチされ、不合格になり、もう一度タッチされるApexのキャリパーを表している。' +
    '工数2倍、コスト2倍—そしてラインを止めるべき品質シグナルだ。',
  coachFeedback5:
    '左壁のホワイトボード：目標240個—実績191個。07:15時点で−20.4%の差。' +
    'この数字は上記のすべての無駄の累積結果だ：停止マシン、バッチ運搬、手直し。' +
    '8月の時点でApexがこんな状態であれば、9月のキャッシュフローショックによって彼らは破壊されるだろう。',

  // ── Module 1 Step 2 ────────────────────────────────────────────────────────
  wasteSpotterTitle: '無駄発見者',
  wasteSpotterInstruction:
    '以下の現場を読んでください。確認できる無駄の種類にチェックを入れてください。' +
    '答え合わせで何個発見できたか確認しましょう。',
  wasteSpotterSceneLabel: 'Apex Precision Parts — 最終組立エリア',
  wasteSpotterScene:
    'Apex Precision Partsの最終組立エリアを観察しています：\n' +
    '1. 作業者が保管ラックからOリングを取りに8メートル歩き、これをシフト中12回繰り返す。\n' +
    '2. 完成したBRK-A-2201キャリパーのパレット3つが、ステーション1と2の間で待機中。\n' +
    '3. ステーション2が45分間停止中。チームリーダーが交換用トルクレンチを待っている。\n' +
    '4. 昨日の生産数：120ユニット製造、80ユニットをOEMに出荷。残りの40ユニットは「念のため」の在庫として積まれ、貴重な現金を消費している。\n' +
    '5. 治具の改善で解消できるバリのために、1シフトあたり6台のキャリパーが手直しに送られる。\n' +
    '6. 工場で最も熟練した上級組立技術者2名が、3ヶ月前に資材搬送業務に配置転換された。',
  checkWastes: '答え合わせ',
  wasteResults: '結果',
  tryAgainWaste: 'もう一度',
  showExplanations: '解説を表示',

  wasteTransport: '運搬',
  wasteInventory: '在庫',
  wasteMotion: '動作',
  wasteWaiting: '待機',
  wasteOverproduction: '過剰生産',
  wasteOverprocessing: '過剰加工',
  wasteDefects: '不良品',
  wasteSkills: '未使用のスキル・人材',

  explTransport: 'ここでは確認されません—作業者の歩行は動作の無駄（人が動く）であり、運搬の無駄（コンベアや車両で材料が動く）ではありません。',
  explInventory: '✓ ステーション間の3つのビン＝仕掛品在庫。待機中の部品＝ロックされた資金、隠れた問題。',
  explMotion: '✓ 8メートルの歩行×12回＝無駄な人の動作。部品を作業者の元に届けることはできないか？',
  explWaiting: '✓ ステーション2が45分停止＝人と機械のアイドル。最も目立つ無駄。',
  explOverprod: '✓ 120個製造、80個必要—誰も要求していない40個を製造。「念のため」は無駄。',
  explOverproc: 'ここでは明確に確認されません—ただし手直し（作業を2回行う）は過剰加工に接近する。',
  explDefects: '✓ 1シフトあたり6個の手直し品。手直しはダブルの工数、ダブルのコスト、半分の品質。',
  explSkills: '✓ 上級技術者が資材搬送。彼らの組立知識が活用されていない—最も見えにくい無駄。',

  // ── Module 1 Step 3 ────────────────────────────────────────────────────────
  fiveWhyTitle: '5なぜドリル',
  fiveWhyOhnoQuote:
    '「なぜを5回繰り返せば、問題の本質と解決策が明らかになる。」',
  fiveWhyAttrib: '— 大野耐一',
  fiveWhyIntro:
    '5なぜは犯人探しではありません。根本—変えることで問題の再発を防ぐシステム的な条件—を見つけることです。' +
    '「誰が？」ではなく「なぜ？」と問いなさい。',
  fiveWhyProblemLabel: '問題文',
  fiveWhyProblem:
    'Apex Automotiveが3回連続で出荷を遅延し、組立ラインの停止が脅かされている。',
  fiveWhyCoachAsk: 'なぜこうなったのですか？',
  fiveWhyYourAnswer: 'あなたの答え：',
  fiveWhyAnswerPlaceholder: '「なぜ」を記述してください…',
  fiveWhySubmit: 'もう一度「なぜ？」→',
  fiveWhyCoachAnswer: '根本的な答え：',
  fiveWhyRootLabel: '根本原因を特定',
  fiveWhyComplete: '根本に到達しました。',
  fiveWhyNextPrompt: 'コーチが次の層を明かします：',

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
  tpsHouseTitle: '基盤から始める',
  tpsHouseInstruction:
    'TPSの家は基盤が固いときのみ立ちます。' +
    '各要素を家の正しい位置に配置してください。',
  tpsHouseClickPrompt: 'スロットをクリックして要素を配置してください。',
  tpsHouseSelectPrompt: 'ここに属する要素を選択してください：',
  tpsHouseCorrect: '正解！正しく配置されました。',
  tpsHouseWrong: '惜しい—このセクションが何を表しているか考えてみてください。',
  tpsHouseComplete: '家が立ちました！すべての要素を正しく配置しました。',

  tpsGoal: '目標',
  tpsLeftPillar: '左の柱',
  tpsRightPillar: '右の柱',
  tpsCenter: '中心',
  tpsFoundation1: '基盤（左）',
  tpsFoundation2: '基盤（中）',
  tpsFoundation3: '基盤（右）',

  elemJIT: 'ジャスト・イン・タイム（JIT）',
  elemJidoka: '自働化（Jidoka）',
  elemHeijunka: '平準化（Heijunka）',
  elemStdWork: '標準作業',
  elemKaizen: '改善（Kaizen）',
  elemPeople: '人・チームワーク',
  elemGoal: '最高品質・最低コスト・最短リードタイム',

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
  twoPillarsTitle: '二本の柱',
  twoPillarsInstruction: 'JITと自働化に関する5つの問題。じっくり取り組んでください。',
  questionLabel: '問題',
  submitAnswer: '回答',
  nextQuestion: '次の問題 →',
  quizComplete: 'クイズ完了',
  yourScore: 'あなたのスコア',
  outOf: '/',
  reviewAnswers: '答えを確認',

  // ── Module 2 Step 3 ────────────────────────────────────────────────────────
  livingRoofTitle: '生きている屋根',
  livingRoofIntro:
    '改善（Kaizen）は基盤に座り、屋根の精神として生きています。' +
    '「改」は変化を意味します。「善」は良いを意味します。より良い変化—毎日、全員で。',
  kaizenOhnoQuote:
    '「改善に限界はない。それが改善の意味だ。」',
  kaizenAttrib: '— 今井正明、『改善：日本の競争力の鍵』',
  kaizenReflectionLabel: 'あなたの改善コミットメント',
  kaizenReflectionPrompt:
    '大野は、改善は現状の正直な観察から始まると信じていました。' +
    '現在の仕事（または生活）において、今週取り組める無駄または不均一は何ですか？',
  kaizenPlaceholder:
    '現状、あなたが見る無駄または問題、そして行う一つの小さな変化を記述してください…',
  submitReflection: '私のコミットメントを提出',
  reflectionSaved: 'コミットメントが記録されました。改善の最初のステップは改善すべきことに名前をつけることです。',
};

export type DojoTKey = keyof typeof en;
export const dojoTranslations: Record<Lang, typeof en> = { en, ja };

export function getDojoT(lang: Lang) {
  return (key: DojoTKey): string => dojoTranslations[lang][key];
}
