'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';
import ZoomableImage from '@/components/dojo/ui/ZoomableImage';

interface Props {
    onComplete: () => void;
    alreadyDone: boolean;
}

export default function JobMethodsEliminator({ onComplete, alreadyDone }: Props) {
    const { lang } = useLang();
    const td = getDojoT(lang);

    const [step1State, setStep1State] = useState<'pending' | 'eliminate' | 'combine' | 'rearrange' | 'simplify' | 'keep'>('pending');
    const [step2State, setStep2State] = useState<'pending' | 'eliminate' | 'combine' | 'rearrange' | 'simplify' | 'keep'>('pending');
    const [step3State, setStep3State] = useState<'pending' | 'eliminate' | 'combine' | 'rearrange' | 'simplify' | 'keep'>('pending');

    const isSubmitted = alreadyDone || (step1State !== 'pending' && step2State !== 'pending' && step3State !== 'pending');

    const handleSubmit = () => {
        if (step1State !== 'pending' && step2State !== 'pending' && step3State !== 'pending') {
            onComplete();
        }
    };

    const getButtonClass = (state: string, match: string) => {
        return `px-3 py-1 rounded text-sm transition-colors ${state === match ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`;
    };

    return (
        <div className="space-y-6 animate-fade-in fade-in-delay-1">
            <div className="panel p-6 space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Job Methods (JM) - ECRS</h2>
                    <p className="text-sm text-gray-600">
                        {lang === 'en'
                            ? "Apply the ECRS framework to improve a process: Eliminate, Combine, Rearrange, and Simplify."
                            : "プロセスを改善するためにECRSフレームワークを適用します：排除、結合、交換、簡素化。"}
                    </p>
                </div>

                <div className="mb-6 rounded-xl overflow-hidden shadow-sm border border-gray-100 flex justify-center bg-gray-50 w-full">
                    <ZoomableImage
                        src="/images/genba_cfo_memo.png"
                        alt="Net-60 Policy Directive"
                        className="w-full object-cover"
                        style={{ maxHeight: '300px' }}
                    />
                </div>

                <div className="bg-blue-50/50 p-4 border border-blue-100 rounded-lg text-sm text-blue-800">
                    <p className="font-bold mb-2">{lang === 'en' ? "Current Process (Net-60 Rollout):" : "現在のプロセス（Net-60展開）："}</p>
                    <ol className="list-decimal pl-5 space-y-1">
                        <li>{lang === 'en' ? "Send a mass PDF email to 400 suppliers announcing the Net-60 terms without checking risk status." : "リスク状況を確認せずに、400社のサプライヤーにNet-60条件を発表するPDFメールを一斉送信する。"}</li>
                        <li>{lang === 'en' ? "Procurement buyers manually log incoming angry emails from suppliers into an Excel tracker." : "調達バイヤーが、サプライヤーから届く怒りのメールを手動でExcelトラッカーに記録する。"}</li>
                        <li>{lang === 'en' ? "Draft custom individual legal contracts for every supplier that requests an exception." : "例外を要求するすべてのサプライヤーに対して、個別の法的契約書を起草する。"}</li>
                    </ol>
                </div>

                <div className="space-y-4 mt-8">
                    {/* Step 1 */}
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                        <p className="font-medium text-gray-800 mb-3">1. {lang === 'en' ? "Send a mass PDF email to 400 suppliers announcing the Net-60 terms without checking risk status." : "リスク状況を確認せずに、400社のサプライヤーにNet-60条件を発表するPDFメールを一斉送信する。"}</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setStep1State('eliminate')}
                                className={getButtonClass(step1State, 'eliminate')}
                                disabled={isSubmitted}
                            >Eliminate</button>
                            <button
                                onClick={() => setStep1State('rearrange')}
                                className={getButtonClass(step1State, 'rearrange')}
                                disabled={isSubmitted}
                            >Rearrange</button>
                        </div>
                        {step1State === 'eliminate' && (
                            <p className="text-sm text-green-600 mt-2 bg-green-50 p-2 rounded">
                                ✓ {lang === 'en' ? "Correct. Eliminate the blanket rollout. Exclude sole-source high-risk Tier-2 suppliers (like Apex) entirely." : "正解。一律の展開を排除します。Apexのような単独供給で高リスクのTier-2サプライヤーを最初から除外します。"}
                            </p>
                        )}
                        {step1State === 'rearrange' && (
                            <p className="text-sm text-red-600 mt-2 bg-red-50 p-2 rounded">
                                ✗ {lang === 'en' ? "Sending it at a different time (Rearrange) doesn't fix the core risk of bankrupting a supplier." : "送信のタイミングを変えても（交換）、サプライヤーを倒産させるという根本的なリスクは解決しません。"}
                            </p>
                        )}
                    </div>

                    {/* Step 2 */}
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                        <p className="font-medium text-gray-800 mb-3">2. {lang === 'en' ? "Procurement buyers manually log incoming angry emails from suppliers into an Excel tracker." : "調達バイヤーが、サプライヤーから届く怒りのメールを手動でExcelトラッカーに記録する。"}</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setStep2State('combine')}
                                className={getButtonClass(step2State, 'combine')}
                                disabled={isSubmitted}
                            >Combine</button>
                            <button
                                onClick={() => setStep2State('simplify')}
                                className={getButtonClass(step2State, 'simplify')}
                                disabled={isSubmitted}
                            >Simplify</button>
                        </div>
                        {step2State === 'combine' && (
                            <p className="text-sm text-green-600 mt-2 bg-green-50 p-2 rounded">
                                ✓ {lang === 'en' ? "Correct. Combine the announcement with an automated portal acknowledgment system that logs responses instantly." : "正解。発表と自動化されたポータル承認システムを結合し、回答を即座に記録します。"}
                            </p>
                        )}
                        {step2State === 'simplify' && (
                            <p className="text-sm text-red-600 mt-2 bg-red-50 p-2 rounded">
                                ✗ {lang === 'en' ? "Using a shorter form simplifies it, but Combining the communication and tracking into one workflow removes the manual data entry." : "短いフォームを使うと簡素化されますが、コミュニケーションとトラッキングを一つのワークフローに結合すれば、手動のデータ入力をなくせます。"}
                            </p>
                        )}
                    </div>

                    {/* Step 3 */}
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                        <p className="font-medium text-gray-800 mb-3">3. {lang === 'en' ? "Draft custom individual legal contracts for every supplier that requests an exception." : "例外を要求するすべてのサプライヤーに対して、個別の法的契約書を起草する。"}</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setStep3State('simplify')}
                                className={getButtonClass(step3State, 'simplify')}
                                disabled={isSubmitted}
                            >Simplify</button>
                            <button
                                onClick={() => setStep3State('rearrange')}
                                className={getButtonClass(step3State, 'rearrange')}
                                disabled={isSubmitted}
                            >Rearrange</button>
                        </div>
                        {step3State === 'simplify' && (
                            <p className="text-sm text-green-600 mt-2 bg-green-50 p-2 rounded">
                                ✓ {lang === 'en' ? "Correct. Create a single, standardized 1-page exception form with pre-approved clauses." : "正解。事前承認された条項を持つ、標準化された1ページの例外申請フォームを一つ作成します。"}
                            </p>
                        )}
                        {step3State === 'rearrange' && (
                            <p className="text-sm text-red-600 mt-2 bg-red-50 p-2 rounded">
                                ✗ {lang === 'en' ? "Drafting the contract before the email (Rearrange) just moves the waste; Simplifying the legal form stops the overprocessing." : "メールの前に契約書を起草しても（交換）無駄を移動させるだけです。法的フォームを簡素化することで過剰加工を止めます。"}
                            </p>
                        )}
                    </div>
                </div>

                {!isSubmitted && (
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={step1State === 'pending' || step2State === 'pending' || step3State === 'pending'}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {lang === 'en' ? 'Complete ECRS Analysis' : 'ECRS分析を完了する'}
                        </button>
                    </div>
                )}

                {isSubmitted && (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mt-6">
                        <h3 className="font-bold flex items-center gap-2">
                            <span>✅</span> {lang === 'en' ? "Job Methods Applied" : "改善手法の適用完了"}
                        </h3>
                        <p className="text-sm mt-1">
                            {lang === 'en'
                                ? "You've successfully improved the process using the Eliminate, Combine, Rearrange, Simplify framework."
                                : "排除、結合、交換、簡素化のフレームワークを使用して、プロセスを正常に改善しました。"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
