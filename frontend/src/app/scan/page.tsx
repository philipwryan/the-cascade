'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Loader2, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function MobileScanPage() {
    const searchParams = useSearchParams();
    const itemArg = searchParams.get('item');

    // We expect URLs like /scan?item=clue_credit_facility_called
    const [clueId, setClueId] = useState<string | null>(itemArg);
    const [teamSessionId, setTeamSessionId] = useState<string>('');
    const [status, setStatus] = useState<'idle' | 'scanning' | 'verifying' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState<string>('');

    // If no item on mount, we might just be showing a "Ready to Scan" page
    // but ideally the user arrived here via scanning a physical QR code.

    useEffect(() => {
        // Hydrate team session from local storage if available from previous scans
        const storedSession = localStorage.getItem('apex_team_session');
        if (storedSession) {
            setTeamSessionId(storedSession);
        }
    }, []);

    const handleUnlockClue = async () => {
        if (!clueId || !teamSessionId) return;

        setStatus('verifying');
        try {
            // Persist the session ID so they don't have to enter it again for the next physical prop
            localStorage.setItem('apex_team_session', teamSessionId);

            // POST to the Next.js API route which will act as a proxy to the Python backend
            const res = await fetch('/api/scan/discover', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: teamSessionId,
                    clue_id: clueId
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to unlock artifact.');
            }

            setStatus('success');

        } catch (err: any) {
            console.error(err);
            setErrorMsg(err.message || 'Network error scanning artifact.');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6 font-sans">
                <div className="bg-neutral-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-green-500/30">
                    <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
                    <h1 className="text-2xl font-bold mb-2">Artifact Secured</h1>
                    <p className="text-gray-400 text-sm mb-6">
                        This physical artifact has been digitally unlocked and transmitted to the War Room.
                    </p>
                    <div className="bg-neutral-900 rounded p-4 mb-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Clue Identifier</p>
                        <p className="text-green-400 font-mono break-all">{clueId}</p>
                    </div>
                    <button
                        onClick={() => { setStatus('idle'); setClueId(null); }}
                        className="w-full bg-neutral-700 hover:bg-neutral-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                    >
                        Scan Another Item
                    </button>
                    <p className="mt-4 text-xs text-gray-500">Return your attention to the main dashboard.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-sm">

                {/* Header block */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-full mb-4">
                        <ShieldCheck className="w-6 h-6 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1">Apex Meltdown</h1>
                    <p className="text-sm text-gray-400">Physical Artifact Scanner</p>
                </div>

                {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex items-start">
                        <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{errorMsg}</p>
                    </div>
                )}

                <div className="bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-700">

                    {!clueId ? (
                        <div className="text-center py-8">
                            <p className="text-gray-400 mb-4 text-sm">No artifact detected in URL parameters. Please scan a physical QR code.</p>
                            <div className="bg-white p-4 inline-block rounded-xl opacity-20 filter blur-sm">
                                <QRCodeSVG value="placeholder" size={150} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                                    Detected Artifact
                                </label>
                                <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-3 font-mono text-sm text-blue-400 break-all">
                                    {clueId}
                                </div>
                            </div>

                            <div className="mb-8">
                                <label htmlFor="team-pin" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                                    Team Identity (Session ID)
                                </label>
                                <p className="text-xs text-gray-500 mb-3">Enter the Active Session ID shown on your main dashboard to link this clue.</p>
                                <input
                                    id="team-pin"
                                    type="text"
                                    value={teamSessionId}
                                    onChange={(e) => setTeamSessionId(e.target.value)}
                                    placeholder="e.g. session-abc-123"
                                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg p-3 text-white placeholder-neutral-600 outline-none transition-all"
                                />
                            </div>

                            <button
                                onClick={handleUnlockClue}
                                disabled={!teamSessionId || status === 'verifying'}
                                className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all ${!teamSessionId || status === 'verifying'
                                        ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                                    }`}
                            >
                                {status === 'verifying' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Transmitting...
                                    </>
                                ) : (
                                    'Unlock on Main Dashboard'
                                )}
                            </button>
                        </>
                    )}
                </div>

                <p className="text-center text-xs text-gray-600 mt-6">
                    Physical Genba Bridge v1.0
                </p>
            </div>
        </div>
    );
}
