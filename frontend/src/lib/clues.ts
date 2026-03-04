export type ClueType = 'symptom' | 'elimination' | 'causal' | 'mechanism' | 'exposure';

export interface ClueMeta {
  label: string;
  type: ClueType;
}

export const CLUE_META: Record<string, ClueMeta> = {
  clue_shipments_stopped: { label: '3 consecutive missed deliveries from Apex', type: 'symptom' },
  clue_inventory_zeroed: { label: 'Apex production floor confirmed idle', type: 'symptom' },
  clue_comms_dark: { label: 'Communication blackout — lender signal', type: 'symptom' },
  clue_quality_ruled_out: { label: 'Quality not the cause — zero PPM since August', type: 'elimination' },
  clue_logistics_ruled_out: { label: 'Logistics disruption ruled out (Oct 15–18)', type: 'elimination' },
  clue_payment_terms_changed: { label: 'Net-30→60 extension created $1.9M liquidity drain', type: 'causal' },
  clue_invoices_aging: { label: 'AR aging: avg payment slipped to 87 days', type: 'causal' },
  clue_credit_downgraded: { label: 'Interest coverage below 2.5× — covenant breached', type: 'causal' },
  clue_financial_distress: { label: 'Revolver 98.5% utilized — near freeze', type: 'causal' },
  clue_steel_price_spike: { label: 'Steel +23% Q4 — $370K EBITDA compression', type: 'causal' },
  clue_working_capital_policy: { label: 'CFO memo: terms extension removed $1.9M from Apex', type: 'causal' },
  clue_credit_facility_called: { label: 'Revolver HOLD placed Oct 27 → supply stopped Oct 28', type: 'mechanism' },
  clue_no_alternate_supplier: { label: 'No viable alternate supplier exists', type: 'exposure' },
  clue_production_exposure: { label: '$11.5M/day production exposure confirmed', type: 'exposure' },
};

export const CLUE_TYPE_ORDER: ClueType[] = ['symptom', 'elimination', 'causal', 'mechanism', 'exposure'];

export const CLUE_TYPE_LABELS: Record<ClueType, string> = {
  symptom: 'Symptoms',
  elimination: 'Eliminations',
  causal: 'Causal Chain',
  mechanism: 'Mechanism',
  exposure: 'Exposure',
};
