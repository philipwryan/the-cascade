// MIFC Symbol Library — all Toyota-standard MIFC / VSM symbols as React SVG components
// Each symbol is self-contained at a nominal 60×60 viewBox.
// The SYMBOLS array drives the interactive reference browser and quiz.

import React from 'react';

// ─── Individual Symbol Components ───────────────────────────────────────────

/** Customer / Supplier factory (the rectangle with a building silhouette) */
export function SymCustomer({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="52" height="40" rx="2" stroke="#1a1a1a" strokeWidth="2.5" fill="#e8f4fd" />
      <rect x="14" y="20" width="10" height="10" rx="1" stroke="#1a1a1a" strokeWidth="1.5" fill="white" />
      <rect x="36" y="20" width="10" height="10" rx="1" stroke="#1a1a1a" strokeWidth="1.5" fill="white" />
      <rect x="22" y="32" width="16" height="18" rx="1" stroke="#1a1a1a" strokeWidth="1.5" fill="white" />
      <line x1="30" y1="32" x2="30" y2="50" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="4" y1="16" x2="56" y2="16" stroke="#1a1a1a" strokeWidth="1.5" />
    </svg>
  );
}

/** Supplier (same shape, different fill colour) */
export function SymSupplier({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="52" height="40" rx="2" stroke="#1a1a1a" strokeWidth="2.5" fill="#fef3c7" />
      <rect x="14" y="20" width="10" height="10" rx="1" stroke="#1a1a1a" strokeWidth="1.5" fill="white" />
      <rect x="36" y="20" width="10" height="10" rx="1" stroke="#1a1a1a" strokeWidth="1.5" fill="white" />
      <rect x="22" y="32" width="16" height="18" rx="1" stroke="#1a1a1a" strokeWidth="1.5" fill="white" />
      <line x1="30" y1="32" x2="30" y2="50" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="4" y1="16" x2="56" y2="16" stroke="#1a1a1a" strokeWidth="1.5" />
    </svg>
  );
}

/** Process Box — rectangle with process name, C/T, C/O, Uptime fields */
export function SymProcess({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="52" height="34" rx="2" stroke="#1a1a1a" strokeWidth="2.5" fill="#f0fdf4" />
      <text x="30" y="22" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1a1a1a" fontFamily="sans-serif">PROCESS</text>
      <line x1="4" y1="28" x2="56" y2="28" stroke="#1a1a1a" strokeWidth="1" />
      <text x="30" y="37" textAnchor="middle" fontSize="6" fill="#555" fontFamily="sans-serif">C/T  C/O  Uptime</text>
      <rect x="4" y="44" width="52" height="10" rx="1" stroke="#888" strokeWidth="1" fill="#f8f8f8" />
      <text x="30" y="51.5" textAnchor="middle" fontSize="6" fill="#555" fontFamily="sans-serif">Operators: ○○</text>
    </svg>
  );
}

/** Inventory Triangle — standard WIP/inventory symbol */
export function SymInventory({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="30,8 56,50 4,50" stroke="#1a1a1a" strokeWidth="2.5" fill="#fef9c3" />
      <text x="30" y="40" textAnchor="middle" fontSize="16" fontFamily="sans-serif">I</text>
      <text x="30" y="56" textAnchor="middle" fontSize="6.5" fill="#555" fontFamily="sans-serif">pcs / days</text>
    </svg>
  );
}

/** Push Arrow — solid thick arrow for push material flow */
export function SymPushArrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 24 H42 V16 L56 30 L42 44 V36 H6 Z" stroke="#1a1a1a" strokeWidth="2" fill="#dbeafe" />
      <text x="24" y="33" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1e40af" fontFamily="sans-serif">PUSH</text>
    </svg>
  );
}

/** Pull (Kanban) Arrow — hollow striped arrow */
export function SymPullArrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 24 H42 V16 L56 30 L42 44 V36 H6 Z" stroke="#15803d" strokeWidth="2.5" fill="none"
        strokeDasharray="4 2" />
      <text x="24" y="33" textAnchor="middle" fontSize="7" fontWeight="700" fill="#15803d" fontFamily="sans-serif">PULL</text>
    </svg>
  );
}

/** Material flow arrow — solid horizontal arrow (L to R between processes) */
export function SymMaterialFlow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="30" x2="48" y2="30" stroke="#1a1a1a" strokeWidth="3" />
      <polygon points="48,23 58,30 48,37" fill="#1a1a1a" />
      <text x="30" y="46" textAnchor="middle" fontSize="6.5" fill="#555" fontFamily="sans-serif">Material Flow</text>
    </svg>
  );
}

/** Information flow arrow — dashed arrow (R to L for information) */
export function SymInfoFlow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="54" y1="30" x2="14" y2="30" stroke="#d97706" strokeWidth="2.5" strokeDasharray="5 3" />
      <polygon points="14,23 4,30 14,37" fill="#d97706" />
      <text x="30" y="46" textAnchor="middle" fontSize="6.5" fill="#d97706" fontFamily="sans-serif">Info Flow</text>
    </svg>
  );
}

/** Electronic info flow — lightning bolt styled dashed arrow */
export function SymElectronicInfo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M54 22 Q40 22 30 30 Q20 38 6 38" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="5 3" fill="none" />
      <polygon points="6,31 2,38 10,38" fill="#7c3aed" />
      <path d="M28 24 L24 30 L28 30 L24 36" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <text x="30" y="52" textAnchor="middle" fontSize="6" fill="#7c3aed" fontFamily="sans-serif">Electronic</text>
    </svg>
  );
}

/** Production Control / Scheduling box */
export function SymProductionControl({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="52" height="36" rx="4" stroke="#1a1a1a" strokeWidth="2.5" fill="#ede9fe" />
      <text x="30" y="26" textAnchor="middle" fontSize="7" fontWeight="700" fill="#4c1d95" fontFamily="sans-serif">Production</text>
      <text x="30" y="36" textAnchor="middle" fontSize="7" fontWeight="700" fill="#4c1d95" fontFamily="sans-serif">Control</text>
      <line x1="4" y1="44" x2="56" y2="44" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 2" />
      <text x="30" y="52" textAnchor="middle" fontSize="5.5" fill="#7c3aed" fontFamily="sans-serif">MRP / Scheduling</text>
    </svg>
  );
}

/** Operator circle — person standing at a process */
export function SymOperator({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="18" r="9" stroke="#1a1a1a" strokeWidth="2" fill="#f3f4f6" />
      <path d="M14 50 Q14 35 30 35 Q46 35 46 50" stroke="#1a1a1a" strokeWidth="2" fill="#f3f4f6" />
      <line x1="20" y1="42" x2="14" y2="50" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="40" y1="42" x2="46" y2="50" stroke="#1a1a1a" strokeWidth="1.5" />
    </svg>
  );
}

/** Kaizen Burst — the iconic starburst / angry cloud */
export function SymKaizenBurst({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 4 L34 16 L44 8 L40 20 L52 18 L44 27 L56 30 L44 33 L52 42 L40 40 L44 52 L34 44 L30 56 L26 44 L16 52 L20 40 L8 42 L16 33 L4 30 L16 27 L8 18 L20 20 L16 8 L26 16 Z"
        stroke="#dc2626" strokeWidth="2" fill="#fef2f2"
      />
      <text x="30" y="34" textAnchor="middle" fontSize="8" fontWeight="900" fill="#dc2626" fontFamily="sans-serif">改善!</text>
    </svg>
  );
}

/** Timeline / Lead Time ladder — bottom of the MIFC */
export function SymTimeline({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="4" y1="30" x2="56" y2="30" stroke="#1a1a1a" strokeWidth="2" />
      <line x1="4" y1="20" x2="4" y2="30" stroke="#1a1a1a" strokeWidth="2" />
      <line x1="30" y1="30" x2="30" y2="40" stroke="#1a1a1a" strokeWidth="2" />
      <line x1="56" y1="20" x2="56" y2="30" stroke="#1a1a1a" strokeWidth="2" />
      <text x="17" y="26" textAnchor="middle" fontSize="7" fill="#555" fontFamily="sans-serif">7d</text>
      <text x="43" y="44" textAnchor="middle" fontSize="7" fill="#555" fontFamily="sans-serif">2d</text>
      <text x="30" y="56" textAnchor="middle" fontSize="6" fill="#1a1a1a" fontFamily="sans-serif" fontWeight="700">Lead Time</text>
    </svg>
  );
}

/** Kanban Post — the triangular kanban signal card */
export function SymKanbanPost({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="40" height="30" rx="2" stroke="#1a1a1a" strokeWidth="2" fill="#fef3c7" />
      <polygon points="30,50 20,38 40,38" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
      <text x="30" y="20" textAnchor="middle" fontSize="7" fontWeight="700" fill="#92400e" fontFamily="sans-serif">KANBAN</text>
      <text x="30" y="32" textAnchor="middle" fontSize="6" fill="#78350f" fontFamily="sans-serif">Qty: ___</text>
    </svg>
  );
}

/** Withdrawal Kanban — (customer pulling from supermarket) */
export function SymWithdrawalKanban({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="48" height="36" rx="3" stroke="#1a1a1a" strokeWidth="2" fill="#ecfdf5" />
      <path d="M18 28 L30 16 L42 28" stroke="#15803d" strokeWidth="2.5" fill="none" />
      <line x1="30" y1="16" x2="30" y2="42" stroke="#15803d" strokeWidth="2.5" />
      <text x="30" y="54" textAnchor="middle" fontSize="6.5" fill="#14532d" fontFamily="sans-serif">Withdrawal</text>
    </svg>
  );
}

/** Supermarket — row of product-stocked shelves */
export function SymSupermarket({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="52" height="48" rx="2" stroke="#1a1a1a" strokeWidth="2" fill="#f0fdf4" />
      <line x1="4" y1="20" x2="56" y2="20" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="4" y1="34" x2="56" y2="34" stroke="#1a1a1a" strokeWidth="1.5" />
      <rect x="10" y="8" width="8" height="10" rx="1" fill="#86efac" />
      <rect x="24" y="8" width="8" height="10" rx="1" fill="#86efac" />
      <rect x="38" y="8" width="8" height="10" rx="1" fill="#86efac" />
      <rect x="10" y="22" width="8" height="10" rx="1" fill="#6ee7b7" />
      <rect x="24" y="22" width="8" height="10" rx="1" fill="#6ee7b7" />
      <rect x="38" y="22" width="8" height="10" rx="1" fill="#6ee7b7" />
      <text x="30" y="48" textAnchor="middle" fontSize="6.5" fill="#14532d" fontFamily="sans-serif" fontWeight="700">Supermarket</text>
    </svg>
  );
}

/** Truck / Shipment (external transport) */
export function SymTruck({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="18" width="34" height="24" rx="2" stroke="#1a1a1a" strokeWidth="2" fill="#e0f2fe" />
      <path d="M38 28 L50 28 L56 36 L56 42 L38 42 Z" stroke="#1a1a1a" strokeWidth="2" fill="#bae6fd" />
      <circle cx="14" cy="44" r="5" stroke="#1a1a1a" strokeWidth="2" fill="#94a3b8" />
      <circle cx="46" cy="44" r="5" stroke="#1a1a1a" strokeWidth="2" fill="#94a3b8" />
      <text x="20" y="34" textAnchor="middle" fontSize="7" fill="#0c4a6e" fontFamily="sans-serif" fontWeight="700">SHIP</text>
    </svg>
  );
}

/** Data Box — the small table attached below a process box */
export function SymDataBox({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="52" height="48" rx="2" stroke="#1a1a1a" strokeWidth="2" fill="white" />
      <line x1="4" y1="18" x2="56" y2="18" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="30" y="14" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a1a1a" fontFamily="sans-serif">Data Box</text>
      <text x="8" y="28" fontSize="6" fill="#555" fontFamily="sans-serif">C/T:</text>
      <text x="8" y="38" fontSize="6" fill="#555" fontFamily="sans-serif">C/O:</text>
      <text x="8" y="48" fontSize="6" fill="#555" fontFamily="sans-serif">Uptime:</text>
    </svg>
  );
}

/** Go-See / Manual Info arrow (with glasses icon) */
export function SymGoSee({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="54" y1="30" x2="14" y2="30" stroke="#1a1a1a" strokeWidth="2.5" strokeDasharray="5 3" />
      <polygon points="14,23 4,30 14,37" fill="#1a1a1a" />
      <circle cx="38" cy="22" r="5" stroke="#1a1a1a" strokeWidth="1.5" fill="#f8fafc" />
      <circle cx="50" cy="22" r="5" stroke="#1a1a1a" strokeWidth="1.5" fill="#f8fafc" />
      <line x1="43" y1="22" x2="45" y2="22" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="33" y1="22" x2="30" y2="22" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="30" y="46" textAnchor="middle" fontSize="6.5" fill="#555" fontFamily="sans-serif">Go-See</text>
    </svg>
  );
}

/** Verbal info / spoken instruction */
export function SymVerbalInfo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="24" rx="22" ry="14" stroke="#1a1a1a" strokeWidth="2" fill="#fef9c3" />
      <polygon points="22,38 18,50 32,38" fill="#fef9c3" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="30" y="28" textAnchor="middle" fontSize="8" fill="#78350f" fontFamily="sans-serif">話し言葉</text>
      <text x="30" y="54" textAnchor="middle" fontSize="6.5" fill="#555" fontFamily="sans-serif">Verbal Info</text>
    </svg>
  );
}

/** FIFO lane — first in, first out connector */
export function SymFIFO({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="20" width="52" height="20" rx="2" stroke="#1a1a1a" strokeWidth="2" fill="#f1f5f9" />
      <polygon points="52,20 56,30 52,40" fill="#1a1a1a" />
      <text x="30" y="33" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1a1a1a" fontFamily="sans-serif">FIFO</text>
      <text x="30" y="50" textAnchor="middle" fontSize="6.5" fill="#555" fontFamily="sans-serif">First In, First Out</text>
    </svg>
  );
}

/** Sequenced Pull Ball — colored ball used in mixed model sequencing */
export function SymSequencedPull({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="26" r="18" stroke="#1a1a1a" strokeWidth="2" fill="#fce7f3" />
      <circle cx="22" cy="22" r="5" fill="#ec4899" />
      <circle cx="36" cy="18" r="5" fill="#3b82f6" />
      <circle cx="38" cy="32" r="5" fill="#22c55e" />
      <text x="30" y="52" textAnchor="middle" fontSize="6.5" fill="#555" fontFamily="sans-serif">Seq. Pull</text>
    </svg>
  );
}

/** Load-levelling box (Heijunka box) */
export function SymHeijunka({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="52" height="36" rx="2" stroke="#1a1a1a" strokeWidth="2" fill="#ede9fe" />
      {[0, 1, 2].map(row => (
        [0, 1, 2, 3].map(col => (
          <rect key={`${row}-${col}`}
            x={8 + col * 12} y={14 + row * 10}
            width={10} height={8} rx={1}
            fill={row === 0 ? '#a78bfa' : row === 1 ? '#c4b5fd' : '#ddd6fe'}
            stroke="#7c3aed" strokeWidth={0.5}
          />
        ))
      ))}
      <text x="30" y="54" textAnchor="middle" fontSize="6.5" fill="#4c1d95" fontFamily="sans-serif" fontWeight="700">Heijunka Box</text>
    </svg>
  );
}

/** Safety stock / buffer stock indicator */
export function SymSafetyStock({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="30,8 56,50 4,50" stroke="#d97706" strokeWidth="2.5" fill="#fef3c7" />
      <polygon points="30,16 50,44 10,44" fill="#fde68a" />
      <text x="30" y="42" textAnchor="middle" fontSize="9" fill="#92400e" fontFamily="sans-serif" fontWeight="700">S</text>
      <text x="30" y="57" textAnchor="middle" fontSize="6" fill="#555" fontFamily="sans-serif">Safety Stock</text>
    </svg>
  );
}

/** Takt Time indicator — metronome / clock dial */
export function SymTaktTime({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="28" r="22" stroke="#1a1a1a" strokeWidth="2.5" fill="#f0fdf4" />
      <line x1="30" y1="28" x2="30" y2="10" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="28" x2="44" y2="36" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="28" r="3" fill="#1a1a1a" />
      <text x="30" y="56" textAnchor="middle" fontSize="6.5" fill="#14532d" fontFamily="sans-serif" fontWeight="700">Takt Time</text>
    </svg>
  );
}

/** Demand / Order — the lightning-bolt arrow from customer */
export function SymDemand({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 18 L36 18 L26 30 L50 30 L24 52 L32 34 L12 34 Z"
        stroke="#dc2626" strokeWidth="2" fill="#fee2e2" />
      <text x="30" y="57" textAnchor="middle" fontSize="6.5" fill="#991b1b" fontFamily="sans-serif" fontWeight="700">Demand</text>
    </svg>
  );
}

// ─── Symbol Metadata Array ────────────────────────────────────────────────────

export interface MifcSymbol {
  id: string;
  nameEn: string;
  nameJa: string;
  category: 'entities' | 'flow' | 'information' | 'inventory' | 'improvement';
  descriptionEn: string;
  descriptionJa: string;
  Component: React.ComponentType<{ className?: string }>;
}

export const MIFC_SYMBOLS: MifcSymbol[] = [
  // ── Entities ──
  {
    id: 'customer',
    nameEn: 'Customer',
    nameJa: '顧客',
    category: 'entities',
    descriptionEn: 'The end receiver of your product. Placed top-right of the map. Shows daily/monthly demand.',
    descriptionJa: '製品の最終受取人。マップの右上に配置。日次・月次需要を示す。',
    Component: SymCustomer,
  },
  {
    id: 'supplier',
    nameEn: 'Supplier',
    nameJa: 'サプライヤー',
    category: 'entities',
    descriptionEn: 'Raw material or component source. Placed top-left. Ships to your door based on purchase orders.',
    descriptionJa: '原材料・部品の供給元。左上に配置。発注書に基づいて納品。',
    Component: SymSupplier,
  },
  {
    id: 'process',
    nameEn: 'Process Box',
    nameJa: 'プロセスボックス',
    category: 'entities',
    descriptionEn: 'A single manufacturing step or department. Contains: C/T (cycle time), C/O (changeover), Uptime %, number of operators.',
    descriptionJa: '製造工程または部門を示す。サイクルタイム、段取り時間、稼働率、作業者数を含む。',
    Component: SymProcess,
  },
  {
    id: 'production-control',
    nameEn: 'Production Control',
    nameJa: '生産管理',
    category: 'entities',
    descriptionEn: 'The scheduling brain: MRP, ERP, or manual planner. Issues production orders and purchase orders.',
    descriptionJa: '生産スケジュールの司令塔。MRP、ERP、または手動計画。製造指示と発注書を発行。',
    Component: SymProductionControl,
  },
  {
    id: 'operator',
    nameEn: 'Operator',
    nameJa: '作業者',
    category: 'entities',
    descriptionEn: 'A person working at a process. Multiple circles = multiple operators at that station.',
    descriptionJa: '工程で作業する人。複数の円＝その工程の複数作業者。',
    Component: SymOperator,
  },
  {
    id: 'truck',
    nameEn: 'Truck / Shipment',
    nameJa: 'トラック/出荷',
    category: 'entities',
    descriptionEn: 'External transport—incoming raw material or outgoing finished goods. Shows frequency (daily, weekly).',
    descriptionJa: '外部輸送。原材料の入荷または完成品の出荷。頻度（日次、週次）を示す。',
    Component: SymTruck,
  },
  // ── Flow ──
  {
    id: 'push-arrow',
    nameEn: 'Push Arrow',
    nameJa: 'プッシュ矢印',
    category: 'flow',
    descriptionEn: 'Material is pushed downstream regardless of what the next process needs. A core waste signal.',
    descriptionJa: '次工程の必要性に関係なく材料が下流へ押し出される。主要な無駄のシグナル。',
    Component: SymPushArrow,
  },
  {
    id: 'pull-arrow',
    nameEn: 'Pull Arrow',
    nameJa: 'プル矢印',
    category: 'flow',
    descriptionEn: 'Material is pulled only when the downstream process signals a need. Lean ideal.',
    descriptionJa: '下流工程が必要を知らせたときのみ材料が引き出される。リーンの理想形。',
    Component: SymPullArrow,
  },
  {
    id: 'material-flow',
    nameEn: 'Material Flow',
    nameJa: '物の流れ',
    category: 'flow',
    descriptionEn: 'Solid line showing material moving left-to-right across the process timeline.',
    descriptionJa: 'プロセスラインに沿って左から右へ材料が流れることを示す実線。',
    Component: SymMaterialFlow,
  },
  {
    id: 'fifo',
    nameEn: 'FIFO Lane',
    nameJa: 'FIFOレーン',
    category: 'flow',
    descriptionEn: 'First In, First Out sequencing between processes. Maintains sequence without a supermarket.',
    descriptionJa: '工程間の先入れ先出し順序管理。スーパーマーケットなしで順序を維持。',
    Component: SymFIFO,
  },
  {
    id: 'sequenced-pull',
    nameEn: 'Sequenced Pull',
    nameJa: '順序プル',
    category: 'flow',
    descriptionEn: 'Colored balls signal a specific sequence for mixed-model production pulls.',
    descriptionJa: '混流生産のプルに特定の順序を知らせるカラーボール。',
    Component: SymSequencedPull,
  },
  // ── Inventory ──
  {
    id: 'inventory',
    nameEn: 'Inventory',
    nameJa: '在庫',
    category: 'inventory',
    descriptionEn: 'Triangle showing WIP or finished goods between processes. Label shows quantity and days-of-supply.',
    descriptionJa: '工程間のWIPまたは完成品を示す三角形。数量と供給日数を表示。',
    Component: SymInventory,
  },
  {
    id: 'safety-stock',
    nameEn: 'Safety Stock',
    nameJa: '安全在庫',
    category: 'inventory',
    descriptionEn: 'Buffer inventory held to protect against demand spikes or supply disruption. Nested triangle.',
    descriptionJa: '需要の急増や供給途絶に備えて保有するバッファ在庫。入れ子の三角形。',
    Component: SymSafetyStock,
  },
  {
    id: 'supermarket',
    nameEn: 'Supermarket',
    nameJa: 'スーパーマーケット',
    category: 'inventory',
    descriptionEn: 'A controlled, replenished store of standard quantities that downstream processes pull from.',
    descriptionJa: '下流工程が引き取る標準数量を管理・補充する在庫貯蔵場所。',
    Component: SymSupermarket,
  },
  {
    id: 'data-box',
    nameEn: 'Data Box',
    nameJa: 'データボックス',
    category: 'inventory',
    descriptionEn: 'The table attached below a process box. Holds C/T, C/O, Uptime, batch size, shifts worked.',
    descriptionJa: 'プロセスボックスの下に付属するテーブル。CT、CO、稼働率、バッチサイズ、シフト数を保持。',
    Component: SymDataBox,
  },
  // ── Information ──
  {
    id: 'info-flow',
    nameEn: 'Information Flow',
    nameJa: '情報の流れ',
    category: 'information',
    descriptionEn: 'Dashed arrow (manual). Shows instructions flowing right-to-left: from customer → scheduler → supplier.',
    descriptionJa: '点線矢印（手動）。情報が右から左へ流れることを示す：顧客→スケジューラー→サプライヤー。',
    Component: SymInfoFlow,
  },
  {
    id: 'electronic-info',
    nameEn: 'Electronic Info',
    nameJa: '電子情報',
    category: 'information',
    descriptionEn: 'Zigzag dashed arrow. EDI, ERP data transmissions, digital orders.',
    descriptionJa: 'ジグザグ点線矢印。EDI、ERPデータ転送、デジタル注文。',
    Component: SymElectronicInfo,
  },
  {
    id: 'go-see',
    nameEn: 'Go-See / Manual Info',
    nameJa: '現地確認/手動情報',
    category: 'information',
    descriptionEn: 'Walking to the gemba to gather info manually. Dashed arrow with glasses icon.',
    descriptionJa: '情報を手動で収集するための現場への移動。眼鏡アイコン付き点線矢印。',
    Component: SymGoSee,
  },
  {
    id: 'verbal-info',
    nameEn: 'Verbal Info',
    nameJa: '口頭情報',
    category: 'information',
    descriptionEn: 'Spoken instructions or shop-floor verbal communication. Speech bubble shape.',
    descriptionJa: '口頭での指示や現場でのコミュニケーション。吹き出し形状。',
    Component: SymVerbalInfo,
  },
  {
    id: 'kanban-post',
    nameEn: 'Kanban Post',
    nameJa: 'かんばんポスト',
    category: 'information',
    descriptionEn: 'Physical kanban card that authorizes replenishment. Triangle below a card outline.',
    descriptionJa: '補充を許可する物理的なかんばんカード。カード形状の下に三角形。',
    Component: SymKanbanPost,
  },
  {
    id: 'withdrawal-kanban',
    nameEn: 'Withdrawal Kanban',
    nameJa: '引き取りかんばん',
    category: 'information',
    descriptionEn: 'Authorizes moving material from supermarket to process. Up-arrow card.',
    descriptionJa: 'スーパーマーケットから工程への材料移動を許可。上向き矢印のカード。',
    Component: SymWithdrawalKanban,
  },
  {
    id: 'heijunka',
    nameEn: 'Heijunka Box',
    nameJa: '平準化ボックス',
    category: 'information',
    descriptionEn: 'Load-levelling device that sorts kanban cards into equal time slots to smooth production.',
    descriptionJa: 'かんばんカードを均等な時間スロットに仕分けて生産を平準化する装置。',
    Component: SymHeijunka,
  },
  // ── Improvement ──
  {
    id: 'kaizen-burst',
    nameEn: 'Kaizen Burst',
    nameJa: '改善バースト',
    category: 'improvement',
    descriptionEn: 'The star-burst / angry cloud that marks a specific improvement opportunity on the MIFC.',
    descriptionJa: 'MIFCで特定の改善機会をマークするスター形状/怒り雲。',
    Component: SymKaizenBurst,
  },
  {
    id: 'takt-time',
    nameEn: 'Takt Time',
    nameJa: 'タクトタイム',
    category: 'improvement',
    descriptionEn: 'Clock dial showing the rhythm of customer demand. Available time ÷ daily demand.',
    descriptionJa: '顧客需要のリズムを示す時計の文字盤。利用可能時間÷日次需要。',
    Component: SymTaktTime,
  },
  {
    id: 'timeline',
    nameEn: 'Lead Time Ladder',
    nameJa: 'リードタイム梯子',
    category: 'improvement',
    descriptionEn: 'The zigzag timeline at the bottom of the MIFC. Alternates inventory wait time (peaks) and process time (valleys).',
    descriptionJa: 'MIFCの底部にあるジグザグのタイムライン。在庫待ち時間（山）とプロセス時間（谷）が交互に現れる。',
    Component: SymTimeline,
  },
  {
    id: 'demand',
    nameEn: 'Demand Signal',
    nameJa: '需要シグナル',
    category: 'improvement',
    descriptionEn: 'Lightning-bolt arrow from customer showing quantity and frequency of orders placed.',
    descriptionJa: '顧客からの雷状矢印。注文の数量と頻度を示す。',
    Component: SymDemand,
  },
];

// ─── Lookup helper ────────────────────────────────────────────────────────────

export function getMifcSymbol(id: string): MifcSymbol | undefined {
  return MIFC_SYMBOLS.find(s => s.id === id);
}

export const SYMBOL_CATEGORIES = [
  { id: 'entities', labelEn: 'Entities', labelJa: 'エンティティ', color: '#1d4ed8' },
  { id: 'flow', labelEn: 'Flow', labelJa: '流れ', color: '#15803d' },
  { id: 'inventory', labelEn: 'Inventory', labelJa: '在庫', color: '#d97706' },
  { id: 'information', labelEn: 'Information', labelJa: '情報', color: '#7c3aed' },
  { id: 'improvement', labelEn: 'Improvement', labelJa: '改善', color: '#dc2626' },
] as const;
