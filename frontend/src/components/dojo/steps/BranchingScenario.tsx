'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { getDojoT } from '@/lib/dojo/i18n-dojo';
import ZoomableImage from '@/components/dojo/ui/ZoomableImage';

interface Props {
    onComplete: () => void;
    alreadyDone: boolean;
}

export default function BranchingScenario({ onComplete, alreadyDone }: Props) {
    const { lang } = useLang();
    const td = getDojoT(lang);

    const [currentNode, setCurrentNode] = useState<number>(0);
    const [history, setHistory] = useState<number[]>([]);

    // Simple branching logic tree
    const nodes = [
        {
            id: 0,
            textEn: "You are Marcus, Supply Chain Manager at the OEM. Finance just rolled out the Net-60 payment extension policy. Sarah, a senior buyer, is furious. She says this will bankrupt a critical Tier-2 supplier (Apex) and wants to send an unauthorized exception to them immediately. What do you do?",
            textJa: "あなたはOEMのサプライチェーンマネージャーであるマーカスです。財務部門がNet-60支払い延長ポリシーを展開したばかりです。シニアバイヤーのサラは激怒しています。彼女は、これが重要なTier-2サプライヤー（Apex）を倒産させると言い、ただちに無許可の例外通知を彼らに送りたいと考えています。どうしますか？",
            options: [
                { textEn: "Reprimand her for insubordination and tell her to enforce the Net-60 policy as written by Finance.", textJa: "反抗的な態度を叱責し、財務部門が作成した通りにNet-60ポリシーを施行するよう彼女に指示する。", nextNode: 1, type: 'bad' },
                { textEn: "Pull her aside, listen to her analysis of Apex's liquidity, and agree to escalate the risk to the CFO together.", textJa: "彼女を私的に呼び出し、Apexの流動性に関する分析を聞き、一緒にCFOにリスクをエスカレーションすることに同意する。", nextNode: 2, type: 'good' }
            ]
        },
        {
            id: 1,
            textEn: "You write her up. She complies resentfully and sends the Net-60 notice to Apex. Two weeks later, Apex defaults on their credit facility and halts production, shutting down your entire assembly line.",
            textJa: "あなたは彼女を懲戒処分にします。彼女はしぶしぶ従い、ApexにNet-60の通知を送ります。2週間後、Apexは信用枠でデフォルト（債務不履行）を起こし、生産を停止、あなたの組立ライン全体が停止します。",
            options: [
                { textEn: "Restart the scenario and try a Job Relations approach.", textJa: "シナリオを再起動し、職場の人間関係（JR）アプローチを試す。", nextNode: 0, type: 'neutral' }
            ]
        },
        {
            id: 2,
            textEn: "Sarah shows you the Supplier Risk Dashboard. Apex has a 2.5x Interest Coverage covenant which will be breached if they wait 60 days for payment. Finance is refusing to listen to her.",
            textJa: "サラはサプライヤーリスクダッシュボードをあなたに見せます。Apexには2.5倍のインタレスト・カバレッジ・コベナンツがあり、支払いを60日待たされれば違反することになります。財務部門は彼女の話を聞こうとしません。",
            options: [
                { textEn: "Tell her that Finance makes the rules and we just have to manage the fallout.", textJa: "ルールを作るのは財務部門であり、私たちはその影響に対処するしかないと彼女に伝える。", nextNode: 3, type: 'bad' },
                { textEn: "Acknowledge the systemic risk. You and Sarah walk over to Finance to present the data, showing how bankrupting Apex will cost 100x more than the working capital savings.", textJa: "システミックリスクを認めます。あなたとサラは財務部門に出向きデータを提示し、Apexを倒産させることは、運転資本の節約額の100倍のコストがかかることを説明する。", nextNode: 4, type: 'good' }
            ]
        },
        {
            id: 3,
            textEn: "She gets frustrated, feeling unheard. Over the next month, 3 of your best buyers quit due to the toxic environment, and the Apex meltdown hits with full force.",
            textJa: "彼女は話を聞いてもらえないと感じ、不満を募らせます。その後の1ヶ月間で、有害な職場環境のために優秀なバイヤー3名が辞め、Apexの崩壊が本格化します。",
            options: [
                { textEn: "Restart the scenario and try a Job Relations approach.", textJa: "シナリオを再起動し、職場の人間関係（JR）アプローチを試す。", nextNode: 0, type: 'neutral' }
            ]
        },
        {
            id: 4,
            textEn: "Finance reviews your data and grants an immediate exception for Apex, saving the supply chain. Sarah feels respected and her critical thinking skills were utilized.",
            textJa: "財務部門はあなたのデータを確認し、Apexに対する即時の例外を認め、サプライチェーンを救います。サラは尊重されていると感じ、彼女の批判的思考スキル（才能の無駄遣い）が活用されました。",
            options: [
                { textEn: "Complete Exercise", textJa: "演習を完了する", nextNode: -1, type: 'success' }
            ]
        }
    ];

    const handleChoice = (nextNode: number) => {
        if (nextNode === -1) {
            if (!alreadyDone) onComplete();
        } else {
            setHistory([...history, currentNode]);
            setCurrentNode(nextNode);
        }
    };

    const node = nodes.find(n => n.id === currentNode);

    if (!node) return null;

    return (
        <div className="space-y-6 animate-fade-in fade-in-delay-1">
            <div className="panel p-6 space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Job Relations (JR)</h2>
                    <p className="text-sm text-gray-600">
                        {lang === 'en'
                            ? "Navigate this leadership scenario using the Respect for People pillar."
                            : "人間性尊重の柱を使用して、このリーダーシップシナリオをナビゲートします。"}
                    </p>
                </div>

                <div className="mb-6 rounded-xl overflow-hidden shadow-sm border border-gray-100 flex justify-center bg-gray-50 w-full">
                    <ZoomableImage
                        src="/images/apex_stressed_operator.png"
                        alt="Stressed Apex Supervisor"
                        className="w-full object-cover"
                        style={{ maxHeight: '300px' }}
                    />
                </div>

                <div className="bg-white border-2 border-gray-200 p-6 rounded-lg text-lg text-gray-800 shadow-sm min-h-[150px] flex items-center">
                    <p>{lang === 'en' ? node.textEn : node.textJa}</p>
                </div>

                <div className="space-y-3 mt-6">
                    {node.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleChoice(option.nextNode)}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${option.type === 'good' || option.type === 'success' ? 'hover:bg-blue-50 hover:border-blue-300 border-gray-200' :
                                option.type === 'bad' ? 'hover:bg-red-50 hover:border-red-300 border-gray-200' :
                                    'hover:bg-gray-100 border-gray-200'
                                }`}
                        >
                            <span className="font-medium text-gray-800">
                                {lang === 'en' ? option.textEn : option.textJa}
                            </span>
                        </button>
                    ))}
                </div>

                {alreadyDone && currentNode === 4 && (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mt-6">
                        <h3 className="font-bold flex items-center gap-2">
                            <span>✅</span> {lang === 'en' ? "Scenario Complete" : "シナリオ完了"}
                        </h3>
                        <p className="text-sm mt-1">
                            {lang === 'en'
                                ? "You demonstrated true Job Relations by building strong relationships across silos (Supply Chain & Finance) and utilizing your team's skills to prevent a crisis."
                                : "サイロ（サプライチェーンと財務）を越えて強力な関係を構築し、チームのスキルを活用して危機を防ぐことで、真の職場の人間関係（JR）を実証しました。"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
