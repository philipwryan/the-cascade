'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getFile, listFiles } from '@/lib/api';
import { useGameSocket } from '@/lib/useGameSocket';
import { FileContent, FileInfo, WarRoomMessage } from '@/lib/types';
import FileExplorer from '@/components/FileExplorer';
import DocumentViewer from '@/components/DocumentViewer';
import WarRoom from '@/components/WarRoom';
import CoachPanel from '@/components/CoachPanel';
import KataPanel from '@/components/KataPanel';
import EscapeSubmit from '@/components/EscapeSubmit';
import NotesZone from '@/components/NotesZone';
import CluesDrawer from '@/components/CluesDrawer';
import { DILogo } from '@/components/DILogo';
import { CLUE_META } from '@/lib/clues';
import { useLang } from '@/lib/LanguageContext';

type Tab = 'investigate' | 'warroom' | 'escape';
type RightTab = 'status' | 'kata';

// Persona display config
const PERSONA_CONFIG: Record<
  string,
  { label: string; short: string; color: string; lightColor: string; border: string; bg: string }
> = {
  supply_chain_manager: {
    label: 'Supply Chain Manager',
    short: 'SCM',
    color: 'text-blue-400',
    lightColor: 'text-blue-700',
    border: 'border-blue-600',
    bg: 'bg-black',
  },
  finance_analyst: {
    label: 'Finance Analyst',
    short: 'FIN',
    color: 'text-purple-400',
    lightColor: 'text-purple-700',
    border: 'border-purple-600',
    bg: 'bg-black',
  },
};

interface ClueToast {
  id: string;
  clue_id: string;
  persona: string;
}

function GameContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { t, toggle } = useLang();

  const sessionId = params.get('session') ?? '';
  const persona   = params.get('persona') ?? '';

  const gameState = useGameSocket(sessionId, persona);
  const {
    sendOpenFile,
    sendWarRoomMessage,
    sendRequestHint,
    sendEscapeSubmission,
    sendGateAnswer,
    pendingGate,
  } = gameState;

  const [files, setFiles] = useState<FileInfo[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<FileContent | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('investigate');
  const [rightTab, setRightTab] = useState<RightTab>('status');
  const [unreadWarRoom, setUnreadWarRoom] = useState(0);
  const [cluesOpen, setCluesOpen] = useState(false);
  const [clueToasts, setClueToasts] = useState<ClueToast[]>([]);
  const toastTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const personaConfig = PERSONA_CONFIG[persona] ?? PERSONA_CONFIG['supply_chain_manager'];

  // Redirect if no session/persona
  useEffect(() => {
    if (!sessionId || !persona) router.replace('/');
  }, [sessionId, persona, router]);

  // Load file list
  useEffect(() => {
    if (!sessionId || !persona) return;
    listFiles(sessionId, persona)
      .then(data => setFiles(data.files))
      .catch(console.error);
  }, [sessionId, persona]);

  // Track unread war room messages when not on war room tab
  const warRoomMsgCount = gameState.session?.war_room?.length ?? 0;
  useEffect(() => {
    if (activeTab !== 'warroom') {
      setUnreadWarRoom(warRoomMsgCount);
    } else {
      setUnreadWarRoom(0);
    }
  }, [warRoomMsgCount, activeTab]);

  // Clue discovery toasts — auto-dismiss after 5s
  const seenClues = useRef(new Set<string>());
  useEffect(() => {
    for (const clue of gameState.recentClues) {
      const key = `${clue.persona}:${clue.clue_id}`;
      if (seenClues.current.has(key)) continue;
      seenClues.current.add(key);

      const toast: ClueToast = { id: key, clue_id: clue.clue_id, persona: clue.persona };
      setClueToasts(prev => [...prev, toast]);

      const timer = setTimeout(() => {
        setClueToasts(prev => prev.filter(t => t.id !== key));
        toastTimers.current.delete(key);
      }, 5000);
      toastTimers.current.set(key, timer);
    }
  }, [gameState.recentClues]);

  async function handleFileSelect(fileId: string) {
    if (fileId === selectedFileId) return;
    setSelectedFileId(fileId);
    setFileContent(null);
    setFileLoading(true);
    try {
      const content = await getFile(sessionId, persona, fileId);
      setFileContent(content);
      sendOpenFile(fileId);
    } catch (e) {
      console.error('Failed to load file', e);
    } finally {
      setFileLoading(false);
    }
  }

  const session    = gameState.session;
  const myState    = session?.players[persona];
  const openedFileIds  = new Set(myState?.files_opened ?? []);
  const status     = session?.status ?? 'waiting';
  const gameDisabled   = status !== 'active';
  const totalPlayers   = session ? Object.keys(session.players).length : 2;
  const checkpointFired    = session?.checkpoint_fired ?? false;
  const myCheckpointResponse = session?.checkpoint_responses[persona] ?? false;

  const warRoomMessages: WarRoomMessage[] = session?.war_room ?? [];

  // All unique discovered clues across both players
  const allDiscoveredClues = session
    ? Object.values(session.players)
        .flatMap(p => p.clues_discovered)
        .filter((v, i, a) => a.indexOf(v) === i)
    : [];
  const cluesCount = allDiscoveredClues.length;
  const totalClues = Object.keys(CLUE_META).length;

  // Tab styling
  const TAB_CLASSES = (tab: Tab) =>
    `px-3 py-1.5 text-xs font-medium transition-colors ${
      activeTab === tab
        ? `text-gray-900 border-b-2 ${personaConfig.border}`
        : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
    }`;

  // Right sidebar tab styling
  const RIGHT_TAB_CLASSES = (tab: RightTab) =>
    `flex-1 py-1.5 text-[10px] uppercase tracking-widest font-medium transition-colors border-b-2 ${
      rightTab === tab
        ? tab === 'kata'
          ? 'text-[#00a651] border-[#00a651]'
          : 'text-gray-800 border-gray-800'
        : 'text-gray-400 hover:text-gray-600 border-transparent'
    }`;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[var(--bg)]">

      {/* Persona colour accent bar */}
      <div className={`h-0.5 w-full ${personaConfig.border.replace('border', 'bg')}`} />

      {/* ── Top bar ── */}
      <header className="shrink-0 border-b border-gray-900 px-4 h-10 flex items-center gap-3 bg-black">
        <div className="flex items-center gap-2">
          <DILogo size={22} />
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-slow" />
          <span className="text-xs font-bold text-white tracking-tight">APEX MELTDOWN</span>
        </div>
        <span className="text-gray-700 text-xs">|</span>
        <span className="font-mono text-xs text-gray-500">
          {t('sessionLabel')} <span className="text-gray-300">{sessionId}</span>
        </span>
        <span className="text-gray-700 text-xs">|</span>
        <span className={`text-xs font-semibold ${personaConfig.color}`}>
          [{personaConfig.short}] {personaConfig.label}
        </span>

        {!gameState.connected && (
          <span className="text-[10px] text-red-400 animate-pulse">{t('reconnecting')}</span>
        )}

        {/* Right side: status badge · lang toggle · new session */}
        <div className="ml-auto flex items-center gap-2">
          {status === 'waiting' && (
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-amber-900/30 border border-amber-700/50 text-amber-400">
              {t('statusWaiting')}
            </span>
          )}
          {status === 'active' && (
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-green-900/30 border border-green-700/50 text-green-400">
              {t('statusActive')}
            </span>
          )}
          {status === 'escaped' && (
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-green-900/30 border border-green-700/50 text-green-400">
              {t('statusEscaped')}
            </span>
          )}
          {status === 'failed' && (
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-red-900/30 border border-red-700/50 text-red-400">
              {t('statusFailed')}
            </span>
          )}

          <span className="text-gray-700 text-xs">|</span>

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="text-[10px] text-gray-400 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 px-2 py-0.5 rounded"
          >
            {t('langToggle')}
          </button>

          <span className="text-gray-700 text-xs">|</span>

          <button
            onClick={() => router.push('/')}
            className="text-[10px] text-gray-500 hover:text-white transition-colors"
            title="Return to lobby"
          >
            {t('newSession')}
          </button>
        </div>
      </header>

      {/* ── Waiting banner ── */}
      {status === 'waiting' && (
        <div className="shrink-0 bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2">
          <span className="text-xs text-amber-700 animate-pulse">{t('waitingForPlayer')}</span>
          <span className="ml-auto text-xs text-gray-500">
            {t('shareSessionId')}{' '}
            <span className="font-mono text-gray-700 font-bold">{sessionId}</span>
          </span>
        </div>
      )}

      {/* ── Checkpoint banner ── */}
      {checkpointFired && !myCheckpointResponse && status === 'active' && (
        <div className="shrink-0 bg-orange-50 border-b border-orange-200 px-4 py-2 flex items-center gap-2">
          <span className="text-xs text-orange-700 font-medium">{t('checkpointBanner')}</span>
          <button
            className="ml-auto text-[10px] text-orange-500 hover:text-orange-700 transition-colors"
            onClick={() => setActiveTab('warroom')}
          >
            {t('goToWarRoom')}
          </button>
        </div>
      )}

      {/* ── Clue toasts ── */}
      {clueToasts.length > 0 && (
        <div className="shrink-0 space-y-0">
          {clueToasts.map(toast => (
            <div
              key={toast.id}
              className="bg-emerald-50 border-b border-emerald-200 px-4 py-1.5 flex items-center gap-2"
            >
              <span className="text-xs font-medium text-[#00a651]">{t('clueUnlocked')}</span>
              <span className="text-xs text-gray-700">
                {CLUE_META[toast.clue_id]?.label ?? toast.clue_id}
              </span>
              <span className="ml-auto text-[10px] text-gray-400">
                {PERSONA_CONFIG[toast.persona]?.short ?? toast.persona}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Main content row ── */}
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* Left sidebar: file explorer */}
        <aside className="w-52 shrink-0 border-r border-gray-200 overflow-hidden flex flex-col">
          <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
            <div className={`text-[10px] uppercase tracking-widest font-medium ${personaConfig.lightColor}`}>
              {personaConfig.label} Workspace
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <FileExplorer
              files={files}
              selectedFileId={selectedFileId}
              openedFiles={Array.from(openedFileIds)}
              onSelect={handleFileSelect}
            />
          </div>
        </aside>

        {/* ── Center: tabs + content + notes (relative for CluesDrawer) ── */}
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden relative">

          {/* Tab bar */}
          <div className="shrink-0 border-b border-gray-200 bg-white px-2 flex items-end gap-0">
            <button
              className={TAB_CLASSES('investigate')}
              onClick={() => setActiveTab('investigate')}
            >
              {t('tabInvestigation')}
              {pendingGate && pendingGate.file_id === selectedFileId && (
                <span className="ml-1.5 bg-amber-100 text-amber-700 text-[9px] px-1 rounded-full">
                  🔒
                </span>
              )}
            </button>

            <button
              className={TAB_CLASSES('warroom')}
              onClick={() => { setActiveTab('warroom'); setUnreadWarRoom(0); }}
            >
              {t('tabWarRoom')}
              {unreadWarRoom > 0 && activeTab !== 'warroom' && (
                <span className="ml-1.5 bg-red-600 text-white text-[9px] px-1 rounded-full">
                  {unreadWarRoom}
                </span>
              )}
            </button>

            <button
              className={TAB_CLASSES('escape')}
              onClick={() => setActiveTab('escape')}
            >
              {t('tabEscape')}
              {gameState.submittedPersonas.length > 0 && !gameState.escapeResult && (
                <span className="ml-1.5 bg-amber-100 text-amber-700 text-[9px] px-1 rounded-full">
                  {gameState.submittedPersonas.length}/{totalPlayers}
                </span>
              )}
            </button>

            {/* Clues flyout button — right-aligned */}
            <div className="ml-auto flex items-center pb-1 pr-1">
              <button
                onClick={() => setCluesOpen(v => !v)}
                className={`text-[10px] px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                  cluesOpen
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                🔍 {t('tabClues')}
                {cluesCount > 0 && (
                  <span className="bg-[#00a651] text-white text-[8px] px-1.5 rounded-full font-semibold">
                    {cluesCount}/{totalClues}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Tab content — flex-[2] gives it ~2/3 of the center height */}
          <div className="flex-[2] min-h-0 overflow-hidden">
            {activeTab === 'investigate' && (
              <DocumentViewer
                file={fileContent}
                loading={fileLoading}
                currentFileId={selectedFileId}
                pendingGate={pendingGate}
                onGateAnswer={sendGateAnswer}
                persona={persona}
              />
            )}
            {activeTab === 'warroom' && (
              <WarRoom
                messages={warRoomMessages}
                persona={persona}
                onSend={sendWarRoomMessage}
                onRequestHint={sendRequestHint}
                disabled={gameDisabled}
              />
            )}
            {activeTab === 'escape' && (
              <div className="h-full overflow-y-auto px-4 py-4 space-y-4">

                {/* Checkpoint status */}
                {checkpointFired && (
                  <div
                    className={`panel p-3 text-[11px] leading-relaxed ${
                      myCheckpointResponse
                        ? 'border-green-200 bg-green-50'
                        : 'border-orange-200 bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={myCheckpointResponse ? 'text-[#00a651]' : 'text-orange-600'}>
                        {myCheckpointResponse ? '✅' : '⚡'}
                      </span>
                      <span
                        className={`font-semibold text-xs ${
                          myCheckpointResponse ? 'text-[#00a651]' : 'text-orange-600'
                        }`}
                      >
                        {myCheckpointResponse
                          ? t('checkpointComplete')
                          : t('checkpointPending')}
                      </span>
                    </div>
                    {!myCheckpointResponse && (
                      <p className="mt-1 text-gray-500 ml-5">{t('checkpointShareNote')}</p>
                    )}
                  </div>
                )}

                {gameState.escapeResult || !gameDisabled ? (
                  <EscapeSubmit
                    onSubmit={sendEscapeSubmission}
                    escapeResult={gameState.escapeResult}
                    evaluating={gameState.evaluating}
                    disabled={gameDisabled || (checkpointFired && !myCheckpointResponse)}
                    connected={gameState.connected}
                    myPersona={persona}
                    submittedPersonas={gameState.submittedPersonas}
                    totalPlayers={totalPlayers}
                  />
                ) : (
                  <div className="text-xs text-gray-500 py-6 text-center">
                    {t('gameNotActive')}
                  </div>
                )}

                {!gameState.escapeResult && (
                  <div className="panel p-3 text-[11px] text-gray-500 leading-relaxed">
                    <p className="mb-1 font-semibold text-gray-600">{t('escapeConditions')}</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>{t('escapeCondition1')}</li>
                      <li>{t('escapeCondition2')}</li>
                      <li>{t('escapeCondition3')}</li>
                    </ul>
                    <p className="mt-2 text-gray-500 font-medium">{t('bothMustSubmit')}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notes zone — always visible at center bottom (~1/3 height) */}
          <NotesZone sessionId={sessionId} persona={persona} />

          {/* Clues flyout drawer — absolutely positioned inside this relative container */}
          <CluesDrawer
            session={session ?? null}
            open={cluesOpen}
            onClose={() => setCluesOpen(false)}
            myPersona={persona}
          />
        </main>

        {/* ── Right sidebar: Status | Kata ── */}
        <aside className="w-56 shrink-0 border-l border-gray-200 overflow-hidden flex flex-col">

          {/* Tab switcher */}
          <div className="shrink-0 flex border-b border-gray-200 bg-gray-50">
            <button
              onClick={() => setRightTab('status')}
              className={RIGHT_TAB_CLASSES('status')}
            >
              {t('sideStatus')}
            </button>
            <button
              onClick={() => setRightTab('kata')}
              className={RIGHT_TAB_CLASSES('kata')}
            >
              {t('sideKata')}
            </button>
          </div>

          {/* Panel content */}
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            {rightTab === 'status' ? (
              <CoachPanel
                session={session ?? null}
                connected={gameState.connected}
                evaluating={gameState.evaluating}
                myPersona={persona}
              />
            ) : (
              <KataPanel />
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-[var(--bg)]">
          <div className="text-xs text-gray-600 animate-pulse">Loading session…</div>
        </div>
      }
    >
      <GameContent />
    </Suspense>
  );
}
