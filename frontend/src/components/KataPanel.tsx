'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';

interface KataGuide {
  id: string;
  icon: string;
  titleEn: string;
  titleJa: string;
  bodyEn: string[];
  bodyJa: string[];
}

const KATA: KataGuide[] = [
  {
    id: 'ar_aging',
    icon: '📊',
    titleEn: 'Reading AR Aging',
    titleJa: '売掛金エイジング分析',
    bodyEn: [
      'AR aging buckets (0–30, 31–60, 61–90, 90+ days) show how long invoices remain unpaid.',
      'Key signal: "90+ days" growth = distress. Apex averaged 87-day collections — cash isn\'t returning.',
      'Watch for concentration risk: one large customer > 20% of AR amplifies any payment delay.',
      'In this scenario: Apex\'s customers pay late → Apex can\'t pay its suppliers → supply freezes upstream.',
    ],
    bodyJa: [
      '売掛金エイジング区分（0-30日、31-60日、61-90日、90日超）は請求書の未払い期間を示します。',
      '重要シグナル：「90日超」の増加＝経営困難。Apexの平均87日回収は現金が戻っていないことを意味します。',
      '集中リスクに注意：1顧客がARの20%超を占める場合、支払い遅延の影響が増幅されます。',
      'このシナリオ：Apexの顧客が支払い遅延→Apexがサプライヤーに支払えない→上流の供給が止まる。',
    ],
  },
  {
    id: 'covenants',
    icon: '📋',
    titleEn: 'Credit Covenants 101',
    titleJa: 'クレジット・コベナンツ基礎',
    bodyEn: [
      'Covenants are financial thresholds in loan agreements. Breaching them triggers lender rights.',
      'Common tests: Interest Coverage Ratio (EBIT ÷ Interest ≥ 2.5×), Net Debt/EBITDA, Current Ratio.',
      'A breach doesn\'t always mean immediate default — but lenders can FREEZE the revolver on the same day.',
      'Cascade: covenant breach → revolver hold → no working capital → supplier payments stop → line down.',
    ],
    bodyJa: [
      'コベナンツは融資契約の財務上の閾値です。違反すると貸し手の権利が発動します。',
      '一般的なテスト：インタレスト・カバレッジ・レシオ（EBIT÷利息≧2.5×）、純負債/EBITDA、流動比率。',
      '違反が即座にデフォルトとは限りませんが、貸し手は同日にリボルバーを凍結できます。',
      'カスケード：コベナンツ違反→リボルバー保留→運転資本なし→サプライヤー支払い停止→ライン停止。',
    ],
  },
  {
    id: 'revolver',
    icon: '🔄',
    titleEn: 'Revolving Credit Facilities',
    titleJa: 'リボルビング・クレジット',
    bodyEn: [
      'A revolver is a flexible credit line: borrow, repay, borrow again — like a corporate credit card.',
      'Utilization > 80% is a warning sign. At 98.5%, Apex has essentially zero liquidity buffer.',
      'Lenders can place a "hold" blocking further draws — even before formal default — on covenant breach.',
      'Without the revolver, daily operations (payroll, supplier payments) must come from cash receipts only.',
    ],
    bodyJa: [
      'リボルバーは柔軟な信用枠です：借りて、返済して、また借りる—法人クレジットカードのようなもの。',
      '利用率80%超は警告サイン。98.5%ではApexはほぼ流動性バッファーがゼロの状態です。',
      '貸し手はコベナンツ違反時、正式なデフォルト前でも追加引き出しを禁止する「保留」を設定できます。',
      'リボルバーなしでは、日常業務（給与、サプライヤー支払い）は営業収入のみで賄わなければなりません。',
    ],
  },
  {
    id: 'working_capital',
    icon: '💧',
    titleEn: 'Working Capital Cascade',
    titleJa: '運転資本のカスケード',
    bodyEn: [
      'Working Capital = Current Assets − Current Liabilities. It funds the gap between paying suppliers and collecting from customers.',
      'Extending terms from Net-30 to Net-60 means suppliers wait 30 extra days — double the outstanding balance.',
      'For Apex: $3.8M/month in sales to your company × 30 extra days = ~$1.9M more AR locked up at any moment.',
      'If Apex\'s revolver is near-maxed, they can\'t fund operations during the extended wait — shipments stop.',
    ],
    bodyJa: [
      '運転資本＝流動資産−流動負債。サプライヤー支払いと顧客回収の間のギャップを資金調達します。',
      '支払条件をNet-30からNet-60に延長すると、サプライヤーは30日間追加で現金を待つことになります。',
      'Apexの場合：月間$380万の売上×30日追加＝常時約$190万のARが追加でロックされます。',
      'Apexのリボルバーが限界近くであれば、延長された待機中に業務資金が不足し、出荷が停止します。',
    ],
  },
  {
    id: 'supply_risk',
    icon: '⚠️',
    titleEn: 'Supply Chain Risk Signals',
    titleJa: 'サプライチェーン・リスクシグナル',
    bodyEn: [
      'Early warnings: 3+ consecutive missed deliveries, communication blackouts, sudden quality improvement (staff fire-fighting).',
      'Financial signals: supplier requests payment acceleration, asks for early-pay discounts, stops quoting new orders.',
      'The single-source trap: no alternate supplier = any distress at Apex immediately stops your line.',
      'Mitigation: dual sourcing, quarterly supplier financial reviews, monitor public credit ratings and trade press.',
    ],
    bodyJa: [
      '早期警告：3回以上連続した納期遅れ、コミュニケーション断絶、品質の突然の改善（スタッフが消火活動に集中）。',
      '財務シグナル：支払条件の前倒し要求、早期支払い割引の要求、新規注文の見積もり停止。',
      '単一ソースの罠：代替サプライヤーなし＝Apexの困難がすぐあなたのラインを止めることを意味します。',
      '緩和策：複数調達源の確保、四半期ごとのサプライヤー財務健全性レビュー、信用格付けの監視。',
    ],
  },
];

export default function KataPanel() {
  const { lang, t } = useLang();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="shrink-0 px-4 py-2.5 border-b border-gray-200 bg-gray-50">
        <div className="text-xs font-semibold text-gray-800">{t('kataHeader')}</div>
        <div className="text-[10px] text-gray-500 mt-0.5">{t('kataSubtitle')}</div>
      </div>

      {/* Kata accordion list */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {KATA.map(kata => {
          const isOpen = openId === kata.id;
          const title = lang === 'ja' ? kata.titleJa : kata.titleEn;
          const body  = lang === 'ja' ? kata.bodyJa  : kata.bodyEn;

          return (
            <div key={kata.id}>
              {/* Accordion header */}
              <button
                onClick={() => setOpenId(isOpen ? null : kata.id)}
                className="w-full px-4 py-2.5 flex items-center gap-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-sm shrink-0">{kata.icon}</span>
                <span className="flex-1 text-[11px] font-medium text-gray-700 leading-snug">
                  {title}
                </span>
                <span className="text-gray-400 text-[10px] shrink-0">
                  {isOpen ? '▲' : '▼'}
                </span>
              </button>

              {/* Accordion body */}
              {isOpen && (
                <div className="px-4 pb-3 pt-1 bg-amber-50/40 border-t border-amber-100/60">
                  <ul className="space-y-2">
                    {body.map((line, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#00a651] text-[9px] mt-1 shrink-0">▸</span>
                        <span className="text-[10px] text-gray-600 leading-relaxed">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="shrink-0 px-4 py-2.5 border-t border-gray-100 bg-gray-50 space-y-2">
        <p className="text-[9px] text-gray-400 leading-relaxed">
          {t('kataScenarioNote')}{' '}
          <span className="text-gray-500 font-mono">
            terms → AR → covenant → revolver → supply
          </span>
        </p>
        <Link
          href="/gemba"
          className="flex items-center gap-1.5 text-[10px] font-semibold text-[#00a651] hover:text-green-700 transition-colors"
        >
          <span>🏭</span>
          <span>{lang === 'ja' ? 'TPS現場へ →' : 'Enter TPS Gemba →'}</span>
        </Link>
      </div>
    </div>
  );
}
