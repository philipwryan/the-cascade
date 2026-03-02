'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSession, getSession } from '@/lib/api';
import { DILogo } from '@/components/DILogo';

const PERSONAS = [
  {
    id: 'supply_chain_manager',
    label: 'Supply Chain Manager',
    desc: 'Access logistics, shipment logs, supplier contacts, and inventory data.',
    color: 'border-blue-300 hover:border-blue-500',
    tag: 'bg-blue-100 text-blue-700',
    selectedBg: 'bg-blue-50',
  },
  {
    id: 'finance_analyst',
    label: 'Finance Analyst',
    desc: 'Access AR aging, credit risk reports, bank alerts, and financial health data.',
    color: 'border-purple-300 hover:border-purple-500',
    tag: 'bg-purple-100 text-purple-700',
    selectedBg: 'bg-purple-50',
  },
];

export default function LobbyPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'home' | 'create' | 'join'>('home');
  const [selectedPersona, setSelectedPersona] = useState('');
  const [joinSessionId, setJoinSessionId] = useState('');
  const [joinPersona, setJoinPersona] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCreate() {
    if (!selectedPersona) return;
    setLoading(true);
    setError('');
    try {
      const session = await createSession();
      router.push(`/game?session=${session.session_id}&persona=${selectedPersona}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to create session');
      setLoading(false);
    }
  }

  async function handleJoin() {
    const sid = joinSessionId.trim().toUpperCase();
    if (!sid || !joinPersona) return;
    setLoading(true);
    setError('');
    try {
      await getSession(sid);
      router.push(`/game?session=${sid}&persona=${joinPersona}`);
    } catch {
      setError('Session not found. Check the ID and try again.');
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-6">
      {/* Logo / title */}
      <div className="mb-8 text-center">
        <div className="flex flex-col items-center mb-4 gap-1.5">
          <DILogo size={52} />
          <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-[0.25em]">Digital Innovations</span>
        </div>
        <div className="text-[11px] text-red-500 uppercase tracking-[0.3em] mb-2 font-mono">
          ● CRISIS SIMULATION ACTIVE
        </div>
        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-2">
          APEX MELTDOWN
        </h1>
        <p className="text-gray-500 text-sm max-w-md leading-relaxed">
          A Tier-1 automotive supplier has gone dark. Assembly plants are 48 hours from
          production stoppage. Your team has one hour to identify the cascading failure
          and prevent a $480K/hour crisis.
        </p>
      </div>

      <div className="w-full max-w-lg">
        {mode === 'home' && (
          <div className="space-y-3">
            <button
              onClick={() => setMode('create')}
              className="w-full panel py-4 text-left px-5 hover:border-blue-400 transition-colors"
            >
              <div className="text-sm font-bold text-gray-900 mb-0.5">Start New Session</div>
              <div className="text-xs text-gray-500">
                Create a new game session as the first player
              </div>
            </button>
            <button
              onClick={() => setMode('join')}
              className="w-full panel py-4 text-left px-5 hover:border-purple-400 transition-colors"
            >
              <div className="text-sm font-bold text-gray-900 mb-0.5">Join Existing Session</div>
              <div className="text-xs text-gray-500">
                Enter a session ID shared by your colleague
              </div>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Gemba entry */}
            <Link
              href="/gemba"
              className="w-full panel py-4 px-5 hover:border-green-400 transition-colors flex items-center gap-3 group"
            >
              <span className="text-2xl">🏭</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900 mb-0.5 flex items-center gap-2">
                  TPS Gemba Training
                  <span className="text-[10px] font-normal px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
                    White Belt
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Learn Toyota Production System principles through interactive drills
                </div>
              </div>
              <span className="text-gray-400 group-hover:text-green-600 transition-colors text-sm">→</span>
            </Link>
          </div>
        )}

        {mode === 'create' && (
          <div className="panel p-5">
            <button
              onClick={() => { setMode('home'); setSelectedPersona(''); setError(''); }}
              className="text-xs text-gray-500 hover:text-gray-700 mb-4 block"
            >
              ← Back
            </button>
            <h2 className="text-sm font-bold text-gray-900 mb-1">Choose Your Role</h2>
            <p className="text-xs text-gray-500 mb-4">
              Each role has a different dataset. Both perspectives are needed to solve the crisis.
            </p>
            <div className="space-y-3 mb-5">
              {PERSONAS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`w-full text-left border rounded-lg p-3 transition-colors ${p.color} ${
                    selectedPersona === p.id
                      ? `${p.selectedBg} border-opacity-100`
                      : 'bg-white border-opacity-40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${p.tag}`}>
                      {p.id === 'supply_chain_manager' ? 'SCM' : 'FIN'}
                    </span>
                    <span className="text-xs font-semibold text-gray-800">{p.label}</span>
                    {selectedPersona === p.id && (
                      <span className="ml-auto text-xs" style={{ color: '#00a651' }}>✓</span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{p.desc}</p>
                </button>
              ))}
            </div>
            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
            <button
              onClick={handleCreate}
              disabled={!selectedPersona || loading}
              className="btn-primary w-full disabled:opacity-40"
            >
              {loading ? 'Creating session…' : 'Create Session & Enter'}
            </button>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              You'll get a session ID to share with the second player
            </p>
          </div>
        )}

        {mode === 'join' && (
          <div className="panel p-5">
            <button
              onClick={() => { setMode('home'); setJoinSessionId(''); setJoinPersona(''); setError(''); }}
              className="text-xs text-gray-500 hover:text-gray-700 mb-4 block"
            >
              ← Back
            </button>
            <h2 className="text-sm font-bold text-gray-900 mb-1">Join a Session</h2>
            <p className="text-xs text-gray-500 mb-4">
              Enter the session ID from your colleague and choose the remaining role.
            </p>
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">Session ID</label>
                <input
                  value={joinSessionId}
                  onChange={e => setJoinSessionId(e.target.value.toUpperCase())}
                  placeholder="ABCD1234"
                  maxLength={8}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2
                             text-sm font-mono text-gray-900 placeholder-gray-400 focus:outline-none
                             focus:border-blue-500 uppercase tracking-widest"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">Your Role</label>
                <div className="space-y-2">
                  {PERSONAS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setJoinPersona(p.id)}
                      className={`w-full text-left border rounded-lg p-2.5 transition-colors ${p.color} ${
                        joinPersona === p.id
                          ? `${p.selectedBg} border-opacity-100`
                          : 'bg-white border-opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${p.tag}`}>
                          {p.id === 'supply_chain_manager' ? 'SCM' : 'FIN'}
                        </span>
                        <span className="text-xs text-gray-700">{p.label}</span>
                        {joinPersona === p.id && (
                          <span className="ml-auto text-xs" style={{ color: '#00a651' }}>✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
            <button
              onClick={handleJoin}
              disabled={!joinSessionId.trim() || !joinPersona || loading}
              className="btn-primary w-full disabled:opacity-40"
            >
              {loading ? 'Joining…' : 'Join Session'}
            </button>
          </div>
        )}
      </div>

      <footer className="mt-10 text-[10px] text-gray-400 text-center">
        Apex Meltdown — AI Crisis Simulation POC
      </footer>
    </main>
  );
}
