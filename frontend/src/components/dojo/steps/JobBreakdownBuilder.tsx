'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';
import ZoomableImage from '@/components/dojo/ui/ZoomableImage';


interface Props {
    onComplete: () => void;
    alreadyDone: boolean;
}

interface BreakdownRow {
    step: string;
    keyPoint: string;
    reason: string;
}

export default function JobBreakdownBuilder({ onComplete, alreadyDone }: Props) {
    const { lang } = useLang();
    const td = getDojoT(lang);

    const [rows, setRows] = useState<BreakdownRow[]>([
        { step: '', keyPoint: '', reason: '' }
    ]);
    const [isSubmitted, setIsSubmitted] = useState(alreadyDone);

    const handleRowChange = (index: number, field: keyof BreakdownRow, value: string) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const addRow = () => {
        if (rows.length < 5) {
            setRows([...rows, { step: '', keyPoint: '', reason: '' }]);
        }
    };

    const removeRow = (index: number) => {
        if (rows.length > 1) {
            const newRows = [...rows];
            newRows.splice(index, 1);
            setRows(newRows);
        }
    };

    const handleSubmit = () => {
        // Basic validation: ensure at least one full row is filled
        const isValid = rows.some(r => r.step.trim() && r.keyPoint.trim() && r.reason.trim());
        if (isValid) {
            setIsSubmitted(true);
            onComplete();
        }
    };

    return (
        <div className="space-y-6 animate-fade-in fade-in-delay-1">
            <div className="panel p-6 space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Job Instruction (JI) Breakdown</h2>
                    <p className="text-sm text-gray-600">
                        {lang === 'en'
                            ? "Break down a job into Important Steps, Key Points, and Reasons. This is the foundation of standardized training."
                            : "仕事を重要なステップ、急所、およびその理由に分解します。これは標準化されたトレーニングの基礎です。"}
                    </p>
                </div>

                <div className="mb-6 rounded-xl overflow-hidden shadow-sm border border-gray-100 flex justify-center bg-gray-50 w-full">
                    <ZoomableImage
                        src="/images/apex_credit_watch.png"
                        alt="Supplier Credit Watch Alert"
                        className="w-full object-cover"
                        style={{ maxHeight: '300px' }}
                    />
                </div>

                <div className="bg-blue-50/50 p-4 border border-blue-100 rounded-lg text-sm text-blue-800 space-y-2">
                    <p><strong>Scenario:</strong> {lang === 'en' ? "Processing a Supplier Credit Watch Alert (OEM Finance Department)." : "サプライヤークレジット監視アラートの処理（OEM財務部門）。"}</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>{lang === 'en' ? "Important Step: A logical segment of the operation that advances the work." : "重要なステップ：作業を進める操作の論理的な区切り。"}</li>
                        <li>{lang === 'en' ? "Key Point: Anything that makes or breaks the job, injures the worker, or makes it easier." : "急所：成否を分けるもの、安全を脅かすもの、または作業を容易にするもの。"}</li>
                        <li>{lang === 'en' ? "Reason: Why the key point is critical." : "理由：なぜその急所が重要なのか。"}</li>
                    </ul>
                </div>

                <div className="space-y-4 mt-8">
                    {rows.map((row, index) => (
                        <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="pt-2 font-bold text-gray-400 w-6">
                                {index + 1}.
                            </div>
                            <div className="flex-1 space-y-3">
                                <input
                                    type="text"
                                    placeholder={lang === 'en' ? "Important Step (What to do)" : "重要なステップ（何をすべきか）"}
                                    value={row.step}
                                    onChange={(e) => handleRowChange(index, 'step', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    disabled={isSubmitted}
                                />
                                <input
                                    type="text"
                                    placeholder={lang === 'en' ? "Key Point (How to do it)" : "急所（どのように行うか）"}
                                    value={row.keyPoint}
                                    onChange={(e) => handleRowChange(index, 'keyPoint', e.target.value)}
                                    className="w-full px-3 py-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white/50"
                                    disabled={isSubmitted}
                                />
                                <input
                                    type="text"
                                    placeholder={lang === 'en' ? "Reason (Why it matters)" : "理由（なぜ重要か）"}
                                    value={row.reason}
                                    onChange={(e) => handleRowChange(index, 'reason', e.target.value)}
                                    className="w-full px-3 py-2 border border-green-200 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors bg-white/50"
                                    disabled={isSubmitted}
                                />
                            </div>
                            {!isSubmitted && rows.length > 1 && (
                                <button
                                    onClick={() => removeRow(index)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                    title="Remove step"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {!isSubmitted && (
                    <div className="flex justify-between items-center pt-4">
                        <button
                            onClick={addRow}
                            disabled={rows.length >= 5}
                            className="px-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded transition-colors disabled:opacity-50"
                        >
                            + {lang === 'en' ? 'Add Step' : 'ステップを追加'}
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors shadow-sm"
                        >
                            {lang === 'en' ? 'Submit Breakdown' : '内訳を提出する'}
                        </button>
                    </div>
                )}

                {isSubmitted && (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mt-6">
                        <h3 className="font-bold flex items-center gap-2">
                            <span>✅</span> {lang === 'en' ? "Job Breakdown Complete" : "作業分解完了"}
                        </h3>
                        <p className="text-sm mt-1">
                            {lang === 'en'
                                ? "Excellent. You've broken down the job into teachable components. This is the prerequisite for effective Job Instruction."
                                : "素晴らしい。仕事を教えやすい構成要素に分解しました。これは効果的な仕事の教え方の前提条件です。"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
