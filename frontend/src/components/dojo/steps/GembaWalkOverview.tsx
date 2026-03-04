'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';

interface Props {
    onComplete: () => void;
    alreadyDone: boolean;
}

export default function GembaWalkOverview({ onComplete, alreadyDone }: Props) {
    const { lang } = useLang();
    const td = getDojoT(lang);

    const [submitted, setSubmitted] = useState(alreadyDone);
    const [readSections, setReadSections] = useState<Record<string, boolean>>({});
    const [flipped, setFlipped] = useState<Record<string, boolean>>({});
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    function handleSectionClick(sectionId: string) {
        if (!alreadyDone && !readSections[sectionId]) {
            setReadSections(prev => ({ ...prev, [sectionId]: true }));
        }
        setFlipped(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    }

    const allRead = Object.keys(readSections).length === 4;

    function handleComplete() {
        setSubmitted(true);
        onComplete();
    }

    const WALK_TYPES = [
        {
            id: 'audit',
            titleKey: 'auditWalkTitle',
            whatKey: 'auditWalkWhat',
            whyKey: 'auditWalkWhy',
            howKey: 'auditWalkHow',
            exampleKey: 'auditWalkExample',
            colorHead: 'bg-amber-100/80',
            colorBorder: 'border-amber-300',
            colorIcon: 'text-amber-600',
            icon: '📋',
            image: '/images/gemba_audit.png',
            dialogue: [
                { text: "Have you checked the safety guards?", top: "12%", left: "55%" },
                { text: "Safety incident rate is zero. Excellent.", top: "45%", left: "45%" },
                { text: "Cell 4 passes the audit.", top: "78%", left: "50%" }
            ]
        },
        {
            id: 'learning',
            titleKey: 'learningWalkTitle',
            whatKey: 'learningWalkWhat',
            whyKey: 'learningWalkWhy',
            howKey: 'learningWalkHow',
            exampleKey: 'learningWalkExample',
            colorHead: 'bg-emerald-100/80',
            colorBorder: 'border-emerald-300',
            colorIcon: 'text-emerald-600',
            icon: '🌱',
            image: '/images/gemba_learning.png',
            dialogue: [
                { text: "Can you show me how you do this?", top: "12%", left: "30%" },
                { text: "The machine usually jams here...", top: "45%", left: "65%" },
                { text: "I see. It's a design flaw.", top: "78%", left: "75%" }
            ]
        },
        {
            id: 'problem',
            titleKey: 'problemWalkTitle',
            whatKey: 'problemWalkWhat',
            whyKey: 'problemWalkWhy',
            howKey: 'problemWalkHow',
            exampleKey: 'problemWalkExample',
            colorHead: 'bg-orange-100/80',
            colorBorder: 'border-orange-300',
            colorIcon: 'text-orange-600',
            icon: '🔍',
            image: '/images/gemba_problem.png',
            dialogue: [
                { text: "Why did the gear break?", top: "12%", left: "45%" },
                { text: "Why? ...Why? ...Why?", top: "45%", left: "65%" },
                { text: "Ah! The cooling line was clogged.", top: "78%", left: "60%" }
            ]
        },
        {
            id: 'teaching',
            titleKey: 'teachingWalkTitle',
            whatKey: 'teachingWalkWhat',
            whyKey: 'teachingWalkWhy',
            howKey: 'teachingWalkHow',
            exampleKey: 'teachingWalkExample',
            colorHead: 'bg-blue-100/80',
            colorBorder: 'border-blue-300',
            colorIcon: 'text-blue-600',
            icon: '💡',
            image: '/images/gemba_teaching.png',
            dialogue: [
                { text: "I can't get this aligned.", top: "12%", left: "30%" },
                { text: "Hold the bracket here first.", top: "45%", left: "65%" },
                { text: "That's it! Perfect.", top: "78%", left: "65%" }
            ]
        },
    ] as const;

    return (
        <div className="space-y-6">
            {/* ── Intro ── */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl border border-indigo-200 shrink-0">
                        👁
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                        {td('gembaWalkTitle')}
                    </h2>
                </div>

                <div className="panel p-5 space-y-3 bg-white shadow-sm border border-gray-200">
                    <p className="text-sm font-semibold text-gray-800 leading-relaxed">
                        {td('gembaWalkIntro1')}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {td('gembaWalkIntro2')}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {td('gembaWalkLearning')}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── 2x2 Grid for Walk Types ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WALK_TYPES.map((walk) => {
                    const isRead = readSections[walk.id] || alreadyDone;
                    const isFlipped = flipped[walk.id];

                    return (
                        <div key={walk.id} className="cursor-pointer relative h-[420px] sm:h-[360px]" style={{ perspective: '1000px' }} onClick={() => handleSectionClick(walk.id)}>
                            <div
                                className="w-full h-full relative transition-transform duration-700"
                                style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                            >
                                <div
                                    className={`rounded-xl border-2 overflow-hidden flex flex-col w-full h-full absolute inset-0
                        ${walk.colorBorder} bg-white shadow-sm transition-all duration-300
                        ${!isRead && !alreadyDone ? 'hover:shadow-md hover:-translate-y-0.5' : ''}
                        ${isRead ? 'ring-2 ring-offset-1 ring-green-400/50' : 'opacity-90 grayscale-[20%] hover:grayscale-0 hover:opacity-100'}
                      `}
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    <div className={`px-4 py-3 ${walk.colorHead} border-b ${walk.colorBorder} flex items-center justify-between`}>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-lg ${walk.colorIcon}`}>{walk.icon}</span>
                                            <h3 className="font-bold text-gray-800">{td(walk.titleKey as any)}</h3>
                                        </div>
                                        {isRead && (
                                            <span className="text-green-600 text-sm">✓</span>
                                        )}
                                    </div>

                                    <div className="p-4 space-y-3 flex-grow text-xs leading-relaxed">
                                        {(() => {
                                            const whatText = td(walk.whatKey as any) || '';
                                            const whyText = td(walk.whyKey as any) || '';
                                            const howText = td(walk.howKey as any) || '';

                                            const splitString = (str: string) => {
                                                const match = str.match(/(: |：)(.*)/);
                                                return match ? [str.substring(0, match.index), match[2]] : [str, ''];
                                            };

                                            const [whatLabel, whatContent] = splitString(whatText);
                                            const [whyLabel, whyContent] = splitString(whyText);
                                            const [howLabel, howContent] = splitString(howText);

                                            // Split sentences by dot or Japanese period for the list
                                            const howPoints = howContent.split(/(?:\. |。)/).filter(Boolean);

                                            return (
                                                <>
                                                    <div>
                                                        <span className="font-semibold text-gray-700 underline decoration-gray-300 underline-offset-2">
                                                            {whatLabel}:
                                                        </span>
                                                        <span className="text-gray-600 ml-1">
                                                            {whatContent}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-700 underline decoration-gray-300 underline-offset-2">
                                                            {whyLabel}:
                                                        </span>
                                                        <span className="text-gray-600 ml-1">
                                                            {whyContent}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-700 underline decoration-gray-300 underline-offset-2">
                                                            {howLabel}:
                                                        </span>
                                                        <div className="mt-1 pl-2 text-gray-600 space-y-1">
                                                            {howPoints.map((point, idx) => (
                                                                <div key={idx}>• {point.replace('.', '')}</div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>

                                    <div className={`px-4 py-2.5 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-600 italic`}>
                                        {(() => {
                                            const exText = td(walk.exampleKey as any) || '';
                                            const match = exText.match(/(: |：)(.*)/);
                                            const label = match ? exText.substring(0, match.index) : 'Example';
                                            const content = match ? match[2] : exText;
                                            return (
                                                <>
                                                    <span className="font-semibold not-italic mr-1">{label}:</span>
                                                    {content}
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                                <div
                                    className={`absolute inset-0 rounded-xl border-2 ${walk.colorBorder} overflow-hidden shadow-sm flex flex-col bg-white`}
                                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                                >
                                    <div className={`px-4 py-2 ${walk.colorHead} border-b ${walk.colorBorder} flex items-center justify-between shrink-0`}>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-lg ${walk.colorIcon}`}>{walk.icon}</span>
                                            <h3 className="font-bold text-gray-800 text-sm">{td(walk.titleKey as any)}</h3>
                                        </div>
                                    </div>

                                    <div className="relative flex-grow flex items-center justify-center bg-gray-200 overflow-hidden group/back">
                                        <div className="relative aspect-square w-full max-h-full max-w-full shadow-inner bg-gray-100">
                                            <img src={walk.image} alt={td(walk.titleKey as any) || ''} className="absolute inset-0 w-full h-full object-contain" />
                                            {walk.dialogue.map((d, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute bg-white text-gray-800 border border-gray-400 rounded-lg p-1 sm:p-1.5 text-[10px] sm:text-xs leading-tight font-medium shadow-md z-10 max-w-[45%] text-center"
                                                    style={{ top: d.top, left: d.left, transform: 'translate(-50%, -50%)' }}
                                                >
                                                    {d.text}
                                                </div>
                                            ))}
                                            <div
                                                className="absolute inset-0 bg-black/40 opacity-0 group-hover/back:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-20"
                                                onClick={(e) => { e.stopPropagation(); setZoomedImage(walk.image); }}
                                            >
                                                <div className="bg-white/95 text-gray-900 rounded-full w-14 h-14 flex items-center justify-center shadow-xl text-2xl hover:scale-110 transition-transform">
                                                    🔍
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setFlipped(prev => ({ ...prev, [walk.id]: false })); }}
                                            className="absolute top-2 right-2 bg-white/90 w-8 h-8 rounded-full shadow-md z-30 hover:bg-white text-gray-800 flex items-center justify-center text-lg hover:-rotate-180 transition-transform duration-500"
                                            title="Flip Back"
                                        >
                                            ↺
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Completion ── */}
            <div className="flex justify-center pt-4">
                {!submitted ? (
                    <button
                        onClick={handleComplete}
                        disabled={!allRead}
                        className={`btn-primary px-8 py-3 rounded-full text-sm font-bold shadow-lg 
              transition-all duration-300 ${!allRead ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-105 hover:shadow-green-500/25'}
            `}
                    >
                        {td('completeGembaWalkRead')}
                        <span className="ml-2 inline-block transition-transform duration-300">
                            →
                        </span>
                    </button>
                ) : (
                    <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-6 py-2 rounded-full border border-green-200">
                        <span>✓</span>
                        <span className="text-sm">{td('stepComplete')}</span>
                    </div>
                )}
            </div>

            {!allRead && !submitted && (
                <p className="text-center text-xs text-gray-400 mt-2 animate-pulse">
                    {lang === 'ja' ? '確認のため、すべてのパネルをクリックしてください。' : 'Click all four panels to acknowledge them.'}
                </p>
            )}

            {/* ── Lightbox for Zoomed Comic ── */}
            {zoomedImage && (() => {
                const activeWalk = WALK_TYPES.find(w => w.image === zoomedImage);
                return (
                    <div
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
                        onClick={() => setZoomedImage(null)}
                    >
                        <div className="relative max-w-4xl w-full max-h-[95vh] flex flex-col items-center">
                            <div className={`w-full ${activeWalk?.colorHead || 'bg-white'} border-b ${activeWalk?.colorBorder} rounded-t-xl px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center shrink-0`}>
                                <div className="flex items-center gap-3">
                                    <span className={`text-2xl ${activeWalk?.colorIcon}`}>{activeWalk?.icon}</span>
                                    <h3 className="text-xl font-bold text-gray-800">{activeWalk ? td(activeWalk.titleKey as any) : ''}</h3>
                                </div>
                            </div>

                            <div className="relative w-full overflow-hidden bg-gray-200 rounded-b-xl flex justify-center" style={{ height: 'calc(95vh - 80px)' }}>
                                <div className="relative aspect-square max-h-full max-w-full bg-white shadow-2xl">
                                    <img
                                        src={zoomedImage}
                                        alt="Zoomed comic"
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                    {activeWalk?.dialogue.map((d, i) => (
                                        <div
                                            key={i}
                                            className="absolute bg-white text-gray-900 border-2 border-gray-400 rounded-xl p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base leading-snug font-semibold shadow-lg z-10 max-w-[45%] text-center"
                                            style={{ top: d.top, left: d.left, transform: 'translate(-50%, -50%)' }}
                                        >
                                            <p>{d.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="absolute -top-12 right-0 sm:-right-8 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors shadow-lg"
                                onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
                                title="Close Zoom"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
