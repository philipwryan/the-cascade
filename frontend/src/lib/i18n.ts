export type Lang = 'en' | 'ja';

const en = {
  // Header
  sessionLabel: 'SESSION',
  newSession: '↩ New Session',
  reconnecting: '⚠ Reconnecting…',
  langToggle: '日本語',

  // Status
  statusWaiting: 'Waiting',
  statusActive: 'Active',
  statusEscaped: 'Escaped!',
  statusFailed: 'Failed',

  // Banners
  waitingForPlayer: '⏳ Waiting for the second player to join…',
  shareSessionId: 'Share session ID:',
  checkpointBanner: '⚡ CHECKPOINT — Post your analysis to the War Room before submitting your escape.',
  goToWarRoom: 'Go to War Room →',
  clueUnlocked: '🔍 Clue unlocked:',

  // Tabs
  tabInvestigation: '📂 Investigation',
  tabWarRoom: '📡 War Room',
  tabEscape: '🚨 Escape',
  tabClues: 'Clues',

  // Right sidebar tabs
  sideStatus: 'Status',
  sideKata: 'Kata',

  // Coach panel
  statusHeader: 'Status',
  timeRemaining: 'Time Remaining',
  lineStoppage: '⚠ 48 HRS TO LINE STOPPAGE',
  connected: 'Connected',
  disconnected: 'Disconnected',
  evaluating: 'Evaluating…',
  playersHeader: 'Players',
  waitingForPlayers: 'Waiting for players…',
  youLabel: '(you)',
  filesUnit: 'files',
  myProgress: 'My Progress',
  filesOpened: 'Files opened',
  cluesFoundMine: 'Clues (mine)',
  teamCluesTotal: 'Team total',
  advisorHints: 'Advisor Hints',
  noHintsYet: 'No hints yet. The advisor is watching.',

  // Clues drawer
  cluesDiscovered: 'Clues Discovered',
  cluesProgress: 'discovered',
  notYetDiscovered: '— not yet discovered —',
  close: '✕',

  // Notes
  notesHeader: '📝 My Notes',
  notesPlaceholder:
    'Jot down findings, patterns, hypotheses…\n\n' +
    '• Apex missed 3 shipments — why?\n' +
    '• Check payment terms change date\n' +
    '• Ask FIN: covenant ratio threshold',
  notesSavedIndicator: 'saved',
  notesClear: 'Clear',
  notesClearConfirm: 'Clear all notes? This cannot be undone.',
  notesPrivate: 'Private · auto-saved locally',
  notesWords: 'words',

  // Kata panel
  kataHeader: 'Kata',
  kataSubtitle: 'Skill guides for this scenario',
  kataScenarioNote: 'In this scenario:',

  // Escape tab
  checkpointComplete: '✅ Checkpoint complete — you may submit',
  checkpointPending: '⚡ Checkpoint required — post to War Room first',
  checkpointShareNote: 'Share your analysis in the War Room to unlock the escape submission.',
  escapeConditions: 'Escape Conditions',
  escapeCondition1: 'Correctly identify the cascading root cause',
  escapeCondition2: 'Name the specific financial mechanism that froze supply',
  escapeCondition3: 'Recommend concrete immediate actions to unblock the crisis',
  bothMustSubmit: '⚠ Both players must submit independently.',
  gameNotActive: 'Game is not active. Cannot submit.',
};

const ja: typeof en = {
  // Header
  sessionLabel: 'セッション',
  newSession: '↩ 新しいセッション',
  reconnecting: '⚠ 再接続中…',
  langToggle: 'English',

  // Status
  statusWaiting: '待機中',
  statusActive: '進行中',
  statusEscaped: '脱出成功！',
  statusFailed: '失敗',

  // Banners
  waitingForPlayer: '⏳ 2人目のプレイヤーの参加を待っています…',
  shareSessionId: 'セッションIDを共有:',
  checkpointBanner: '⚡ チェックポイント — 脱出提出前にウォールームで分析を共有してください。',
  goToWarRoom: 'ウォールームへ →',
  clueUnlocked: '🔍 手掛かり発見:',

  // Tabs
  tabInvestigation: '📂 調査',
  tabWarRoom: '📡 ウォールーム',
  tabEscape: '🚨 脱出',
  tabClues: '手掛かり',

  // Right sidebar tabs
  sideStatus: 'ステータス',
  sideKata: '型',

  // Coach panel
  statusHeader: 'ステータス',
  timeRemaining: '残り時間',
  lineStoppage: '⚠ ライン停止まで48時間',
  connected: '接続中',
  disconnected: '切断',
  evaluating: '評価中…',
  playersHeader: 'プレイヤー',
  waitingForPlayers: 'プレイヤーを待っています…',
  youLabel: '(あなた)',
  filesUnit: 'ファイル',
  myProgress: '自分の進捗',
  filesOpened: '開いたファイル数',
  cluesFoundMine: '手掛かり（自分）',
  teamCluesTotal: 'チーム合計',
  advisorHints: 'アドバイザーヒント',
  noHintsYet: 'ヒントはまだありません。アドバイザーが観察しています。',

  // Clues drawer
  cluesDiscovered: '発見した手掛かり',
  cluesProgress: '発見済み',
  notYetDiscovered: '— まだ発見されていません —',
  close: '✕',

  // Notes
  notesHeader: '📝 メモ',
  notesPlaceholder:
    '発見、パターン、仮説をメモしてください…\n\n' +
    '• Apexが3回出荷を逃した — なぜ？\n' +
    '• 支払条件変更の日付を確認する\n' +
    '• FINに確認: コベナンツ比率の閾値',
  notesSavedIndicator: '保存済み',
  notesClear: 'クリア',
  notesClearConfirm: 'メモをすべてクリアしますか？',
  notesPrivate: 'プライベート · ローカル自動保存',
  notesWords: '字',

  // Kata panel
  kataHeader: '型',
  kataSubtitle: 'このシナリオのスキルガイド',
  kataScenarioNote: 'このシナリオでは:',

  // Escape tab
  checkpointComplete: '✅ チェックポイント完了 — 提出できます',
  checkpointPending: '⚡ チェックポイント必要 — まずウォールームに投稿してください',
  checkpointShareNote: 'ウォールームで分析を共有して脱出提出を解除してください。',
  escapeConditions: '脱出条件',
  escapeCondition1: 'カスケードの根本原因を正確に特定する',
  escapeCondition2: '供給を凍結させた特定の財務メカニズムを明示する',
  escapeCondition3: '危機を解除するための具体的な即時行動を推奨する',
  bothMustSubmit: '⚠ 両プレイヤーが独立して提出する必要があります。',
  gameNotActive: 'ゲームが進行中ではありません。提出できません。',
};

export type TKey = keyof typeof en;
export const translations: Record<Lang, typeof en> = { en, ja };

export function getT(lang: Lang) {
  return (key: TKey): string => translations[lang][key];
}
