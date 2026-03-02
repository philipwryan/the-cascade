export type ClueType = 'symptom' | 'elimination' | 'causal' | 'mechanism' | 'exposure';

export interface ClueMeta {
  label: string;
  type: ClueType;
}

export const CLUE_META: Record<string, ClueMeta> = {
  missed_deliveries:      { label: '3 consecutive missed deliveries from Apex',          type: 'symptom' },
  site_shutdown:          { label: 'Apex production floor confirmed idle',               type: 'symptom' },
  comms_blackout:         { label: 'Communication blackout — lender signal',             type: 'symptom' },
  quality_ruled_out:      { label: 'Quality not the cause — zero PPM since August',      type: 'elimination' },
  logistics_ruled_out:    { label: 'Logistics disruption ruled out (Oct 15–18)',          type: 'elimination' },
  payment_terms_stress:   { label: 'Net-30→60 extension created $1.9M liquidity drain',  type: 'causal' },
  ar_aging_deterioration: { label: 'AR aging: avg payment slipped to 87 days',           type: 'causal' },
  covenant_breach:        { label: 'Interest coverage below 2.5× — covenant breached',   type: 'causal' },
  revolver_maxed:         { label: 'Revolver 98.5% utilized — near freeze',              type: 'causal' },
  steel_commodity_shock:  { label: 'Steel +23% Q4 — $370K EBITDA compression',           type: 'causal' },
  working_capital_policy: { label: 'CFO memo: terms extension removed $1.9M from Apex',  type: 'causal' },
  creditwatch_hold:       { label: 'Revolver HOLD placed Oct 27 → supply stopped Oct 28', type: 'mechanism' },
  no_alternate_supplier:  { label: 'No viable alternate supplier exists',                type: 'exposure' },
  production_exposure:    { label: '$11.5M/day production exposure confirmed',           type: 'exposure' },
};

export const CLUE_TYPE_ORDER: ClueType[] = ['symptom', 'elimination', 'causal', 'mechanism', 'exposure'];

export const CLUE_TYPE_LABELS: Record<ClueType, string> = {
  symptom:     'Symptoms',
  elimination: 'Eliminations',
  causal:      'Causal Chain',
  mechanism:   'Mechanism',
  exposure:    'Exposure',
};
