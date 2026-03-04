'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';

interface Props {
  onComplete: () => void;
  alreadyDone: boolean;
}

// ─── The Riverstone Audio MIFC SVG ───────────────────────────────────────────
// A simplified but authentic MIFC of the RS-7 Bluetooth speaker production line.
// 5 processes: Injection Molding → PCB Sub-Assembly → Final Assembly → Test & QC → Packaging

function RiverstoneAudioMIFC() {
  return (
    <svg viewBox="0 0 900 540" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="sans-serif">
      {/* ── Background ─────────────────────────────────────────────────────── */}
      <rect width="900" height="540" fill="#f8fafc" />

      {/* ── TITLE ──────────────────────────────────────────────────────────── */}
      <text x="450" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#374151">
        Riverstone Audio · RS-7 Bluetooth Speaker · Current State MIFC · Week 11
      </text>

      {/* ── SUPPLIER (top left) ────────────────────────────────────────────── */}
      <rect x="20" y="40" width="100" height="64" rx="3" fill="#fef3c7" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="20" y="40" width="100" height="16" fill="#fbbf24" rx="3" />
      <rect x="20" y="54" width="100" height="2" fill="#1a1a1a" />
      <text x="70" y="51" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#1a1a1a">PCB-Tech Ltd.</text>
      <text x="70" y="72" textAnchor="middle" fontSize="6.5" fill="#555">Weekly PO</text>
      <text x="70" y="82" textAnchor="middle" fontSize="6.5" fill="#555">Shenzhen, CN</text>
      <text x="70" y="94" textAnchor="middle" fontSize="6" fill="#78350f">LT: 14 days</text>

      {/* ── CUSTOMER (top right) ───────────────────────────────────────────── */}
      <rect x="778" y="40" width="108" height="64" rx="3" fill="#e8f4fd" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="778" y="40" width="108" height="16" fill="#3b82f6" rx="3" />
      <rect x="778" y="54" width="108" height="2" fill="#1a1a1a" />
      <text x="832" y="51" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="white">AudioZone Retail</text>
      <text x="832" y="72" textAnchor="middle" fontSize="6.5" fill="#555">800 units/day</text>
      <text x="832" y="82" textAnchor="middle" fontSize="6.5" fill="#555">Daily ship</text>
      <text x="832" y="94" textAnchor="middle" fontSize="6" fill="#1d4ed8">Takt: ~34s</text>

      {/* ── PRODUCTION CONTROL (center top) ───────────────────────────────── */}
      <rect x="346" y="40" width="128" height="64" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="410" y="60" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#4c1d95">Production Control</text>
      <text x="410" y="73" textAnchor="middle" fontSize="6.5" fill="#555">MRP Weekly</text>
      <text x="410" y="84" textAnchor="middle" fontSize="6.5" fill="#7c3aed">Paper-based schedule</text>
      <text x="410" y="96" textAnchor="middle" fontSize="6" fill="#dc2626">⚠ Push system</text>

      {/* ── TRUCK: Supplier → Factory ──────────────────────────────────────── */}
      <rect x="136" y="52" width="44" height="26" rx="2" fill="#e0f2fe" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M180 60 L192 60 L196 68 L196 78 L180 78 Z" fill="#bae6fd" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="146" cy="80" r="5" fill="#94a3b8" stroke="#1a1a1a" strokeWidth="1" />
      <circle cx="188" cy="80" r="5" fill="#94a3b8" stroke="#1a1a1a" strokeWidth="1" />
      <text x="162" y="68" textAnchor="middle" fontSize="6" fill="#0c4a6e" fontWeight="700">SHIP</text>
      <text x="162" y="90" textAnchor="middle" fontSize="5.5" fill="#555">Wkly</text>

      {/* ── TRUCK: Factory → Customer ─────────────────────────────────────── */}
      <rect x="710" y="52" width="44" height="26" rx="2" fill="#e0f2fe" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M754 60 L766 60 L770 68 L770 78 L754 78 Z" fill="#bae6fd" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="720" cy="80" r="5" fill="#94a3b8" stroke="#1a1a1a" strokeWidth="1" />
      <circle cx="762" cy="80" r="5" fill="#94a3b8" stroke="#1a1a1a" strokeWidth="1" />
      <text x="736" y="68" textAnchor="middle" fontSize="6" fill="#0c4a6e" fontWeight="700">SHIP</text>
      <text x="736" y="90" textAnchor="middle" fontSize="5.5" fill="#555">Daily</text>

      {/* ══════════════════════════════════════════════════════════════════════
          INFORMATION FLOWS (dashed, right-to-left, top of diagram)
          ══════════════════════════════════════════════════════════════════ */}
      {/* Customer → Prod Control */}
      <line x1="778" y1="68" x2="474" y2="68" stroke="#d97706" strokeWidth="1.5" strokeDasharray="5 3" />
      <polygon points="474,63 464,68 474,73" fill="#d97706" />
      <text x="626" y="62" textAnchor="middle" fontSize="6" fill="#d97706">Weekly Forecast</text>

      {/* Prod Control → Supplier */}
      <line x1="346" y1="68" x2="200" y2="68" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5 3" />
      <polygon points="200,63 190,68 200,73" fill="#7c3aed" />
      <text x="273" y="62" textAnchor="middle" fontSize="6" fill="#7c3aed">Weekly PO</text>

      {/* Prod Control → each process (push orders, going down) */}
      <line x1="410" y1="104" x2="410" y2="125" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 2" />
      <polygon points="405,125 410,135 415,125" fill="#7c3aed" />
      <text x="430" y="120" fontSize="6" fill="#7c3aed">Daily Schedule</text>

      {/* ══════════════════════════════════════════════════════════════════════
          PROCESS BOXES (row at y=155..250)
          ══════════════════════════════════════════════════════════════════ */}

      {/* P1: Injection Molding */}
      <rect x="30" y="145" width="100" height="60" rx="2" fill="#f0fdf4" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="30" y="145" width="100" height="14" fill="#d1fae5" />
      <text x="80" y="155" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a1a1a">Injection Molding</text>
      <line x1="30" y1="159" x2="130" y2="159" stroke="#1a1a1a" strokeWidth="0.8" />
      <text x="80" y="170" textAnchor="middle" fontSize="6" fill="#555">C/T: 28s</text>
      <text x="80" y="180" textAnchor="middle" fontSize="6" fill="#555">C/O: 45 min</text>
      <text x="80" y="190" textAnchor="middle" fontSize="6" fill="#555">Uptime: 52%</text>
      <text x="80" y="200" textAnchor="middle" fontSize="6" fill="#555">Shifts: 2</text>
      {/* Operator */}
      <circle cx="55" cy="218" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M44 236 Q44 226 55 226 Q66 226 66 236" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />

      {/* P2: PCB Sub-Assembly */}
      <rect x="212" y="145" width="110" height="60" rx="2" fill="#f0fdf4" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="212" y="145" width="110" height="14" fill="#d1fae5" />
      <text x="267" y="155" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a1a1a">PCB Sub-Assy</text>
      <line x1="212" y1="159" x2="322" y2="159" stroke="#1a1a1a" strokeWidth="0.8" />
      <text x="267" y="170" textAnchor="middle" fontSize="6" fill="#555">C/T: 62s</text>
      <text x="267" y="180" textAnchor="middle" fontSize="6" fill="#555">C/O: 20 min</text>
      <text x="267" y="190" textAnchor="middle" fontSize="6" fill="#555">Uptime: 85%</text>
      <text x="267" y="200" textAnchor="middle" fontSize="6" fill="#555">Shifts: 2</text>
      <circle cx="240" cy="218" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M229 236 Q229 226 240 226 Q251 226 251 236" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="260" cy="218" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M249 236 Q249 226 260 226 Q271 226 271 236" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />

      {/* P3: Final Assembly */}
      <rect x="400" y="145" width="100" height="60" rx="2" fill="#f0fdf4" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="400" y="145" width="100" height="14" fill="#d1fae5" />
      <text x="450" y="155" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a1a1a">Final Assembly</text>
      <line x1="400" y1="159" x2="500" y2="159" stroke="#1a1a1a" strokeWidth="0.8" />
      <text x="450" y="170" textAnchor="middle" fontSize="6" fill="#555">C/T: 38s</text>
      <text x="450" y="180" textAnchor="middle" fontSize="6" fill="#555">C/O: 5 min</text>
      <text x="450" y="190" textAnchor="middle" fontSize="6" fill="#555">Uptime: 90%</text>
      <text x="450" y="200" textAnchor="middle" fontSize="6" fill="#555">Shifts: 2</text>
      <circle cx="425" cy="218" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M414 236 Q414 226 425 226 Q436 226 436 236" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="447" cy="218" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M436 236 Q436 226 447 226 Q458 226 458 236" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="469" cy="218" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M458 236 Q458 226 469 226 Q480 226 480 236" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />

      {/* P4: Test & QC */}
      <rect x="574" y="145" width="100" height="60" rx="2" fill="#f0fdf4" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="574" y="145" width="100" height="14" fill="#d1fae5" />
      <text x="624" y="155" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a1a1a">Test &amp; QC</text>
      <line x1="574" y1="159" x2="674" y2="159" stroke="#1a1a1a" strokeWidth="0.8" />
      <text x="624" y="170" textAnchor="middle" fontSize="6" fill="#555">C/T: 45s</text>
      <text x="624" y="180" textAnchor="middle" fontSize="6" fill="#555">C/O: 0</text>
      <text x="624" y="190" textAnchor="middle" fontSize="6" fill="#555">Uptime: 95%</text>
      <text x="624" y="200" textAnchor="middle" fontSize="6" fill="#dc2626">200% inspection!</text>
      <circle cx="600" cy="218" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M589 236 Q589 226 600 226 Q611 226 611 236" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="622" cy="218" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M611 236 Q611 226 622 226 Q633 226 633 236" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />

      {/* P5: Packaging */}
      <rect x="748" y="145" width="100" height="60" rx="2" fill="#f0fdf4" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="748" y="145" width="100" height="14" fill="#d1fae5" />
      <text x="798" y="155" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a1a1a">Packaging</text>
      <line x1="748" y1="159" x2="848" y2="159" stroke="#1a1a1a" strokeWidth="0.8" />
      <text x="798" y="170" textAnchor="middle" fontSize="6" fill="#555">C/T: 22s</text>
      <text x="798" y="180" textAnchor="middle" fontSize="6" fill="#555">C/O: 10 min</text>
      <text x="798" y="190" textAnchor="middle" fontSize="6" fill="#555">Uptime: 97%</text>
      <text x="798" y="200" textAnchor="middle" fontSize="6" fill="#555">Shifts: 1</text>
      <circle cx="775" cy="218" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M764 236 Q764 226 775 226 Q786 226 786 236" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />

      {/* ══════════════════════════════════════════════════════════════════════
          INVENTORY TRIANGLES between processes
          ══════════════════════════════════════════════════════════════════ */}

      {/* I0: Raw PCB stock (before P2) */}
      <polygon points="175,290 197,260 219,290" fill="#fef9c3" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="197" y="283" textAnchor="middle" fontSize="9" fill="#555">I</text>
      <text x="197" y="302" textAnchor="middle" fontSize="6" fill="#1a1a1a" fontWeight="700">3,200 pcs</text>
      <text x="197" y="312" textAnchor="middle" fontSize="6" fill="#dc2626">8 days!</text>

      {/* I1: Between P1 and P2 */}
      <polygon points="155,270 175,245 195,270" fill="#fef9c3" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="175" y="264" textAnchor="middle" fontSize="9" fill="#555">I</text>
      <text x="175" y="282" textAnchor="middle" fontSize="6" fill="#1a1a1a" fontWeight="700">420 pcs</text>
      <text x="175" y="292" textAnchor="middle" fontSize="6" fill="#555">1.2d</text>

      {/* I2: Between P2 and P3 (PUSH — large batch) */}
      <polygon points="337,270 360,245 383,270" fill="#fef9c3" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="360" y="264" textAnchor="middle" fontSize="9" fill="#555">I</text>
      <text x="360" y="282" textAnchor="middle" fontSize="6" fill="#1a1a1a" fontWeight="700">1,150 pcs</text>
      <text x="360" y="292" textAnchor="middle" fontSize="6" fill="#555">3.2d</text>

      {/* I3: Between P3 and P4 */}
      <polygon points="517,270 540,245 563,270" fill="#fef9c3" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="540" y="264" textAnchor="middle" fontSize="9" fill="#555">I</text>
      <text x="540" y="282" textAnchor="middle" fontSize="6" fill="#1a1a1a" fontWeight="700">640 pcs</text>
      <text x="540" y="292" textAnchor="middle" fontSize="6" fill="#555">1.8d</text>

      {/* I4: Between P4 and P5 */}
      <polygon points="690,270 712,245 734,270" fill="#fef9c3" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="712" y="264" textAnchor="middle" fontSize="9" fill="#555">I</text>
      <text x="712" y="282" textAnchor="middle" fontSize="6" fill="#1a1a1a" fontWeight="700">280 pcs</text>
      <text x="712" y="292" textAnchor="middle" fontSize="6" fill="#555">0.8d</text>

      {/* I5: FG before shipping */}
      <polygon points="858,270 878,245 898,270" fill="#fef9c3" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="878" y="264" textAnchor="middle" fontSize="9" fill="#555">I</text>
      <text x="878" y="282" textAnchor="middle" fontSize="6" fill="#1a1a1a" fontWeight="700">800 pcs</text>
      <text x="878" y="292" textAnchor="middle" fontSize="6" fill="#555">1d</text>

      {/* ══════════════════════════════════════════════════════════════════════
          PUSH ARROWS between processes
          ══════════════════════════════════════════════════════════════════ */}
      {[
        [130, 175],  // P1 → I1
        [195, 212],  // I1 → P2
        [322, 337],  // P2 → I2
        [383, 400],  // I2 → P3
        [500, 517],  // P3 → I3
        [563, 574],  // I3 → P4
        [674, 690],  // P4 → I4
        [734, 748],  // I4 → P5
        [848, 858],  // P5 → I5
      ].map(([x1, x2], i) => (
        <g key={i}>
          <path d={`M${x1} 175 H${x2 - 8} V169 L${x2} 175 L${x2 - 8} 181 V175`}
            fill="#dbeafe" stroke="#1a1a1a" strokeWidth="1.2" />
        </g>
      ))}

      {/* ══════════════════════════════════════════════════════════════════════
          KAIZEN BURSTS
          ══════════════════════════════════════════════════════════════════ */}

      {/* K1: 52% OEE on Injection Molding */}
      <path d="M70 130 L76 118 L84 126 L86 114 L94 120 L94 108 L104 116 L102 104 L114 110 L110 100 L122 104 L116 94 L128 96 L120 88 L132 88 L122 80 L134 78 L126 72 L136 68 L126 64 L136 58 L126 56 L132 48 L122 50 L118 40 L110 46 L104 36 L100 46 L88 40 L88 50 L78 44 L80 54 L68 52 L72 62 L60 60 L66 70 L54 72 L62 80 L52 82 L62 90 L50 94 L62 96 L52 104 L64 104 L56 112 L68 110 L62 120 L72 116 Z"
        fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="91" y="88" textAnchor="middle" fontSize="7" fontWeight="900" fill="#dc2626">52%</text>
      <text x="91" y="98" textAnchor="middle" fontSize="6" fontWeight="700" fill="#dc2626">OEE!</text>

      {/* K2: PCB overstock / 8-day inventory */}
      <path d="M200 340 L206 328 L214 336 L216 324 L224 330 L224 318 L234 326 L232 314 L244 320 L240 310 L252 314 L246 304 L258 306 L250 298 L262 298 L252 290 L264 288 L256 282 L266 278 L256 274 L266 268 L256 266 L262 258 L252 260 L248 250 L240 256 L234 246 L230 256 L218 250 L218 260 L208 254 L210 264 L198 262 L202 272 L190 270 L196 280 L184 282 L192 290 L182 294 L192 296 L182 304 L194 304 L186 312 L198 310 L192 320 L202 316 Z"
        fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="221" y="304" textAnchor="middle" fontSize="7" fontWeight="900" fill="#dc2626">8-day</text>
      <text x="221" y="314" textAnchor="middle" fontSize="6" fontWeight="700" fill="#dc2626">PCB!</text>

      {/* K3: 200% inspection (QC) */}
      <path d="M670 135 L676 123 L684 131 L686 119 L694 125 L694 113 L704 121 L702 109 L714 115 L710 105 L722 109 L716 99 L728 101 L720 93 L732 93 L722 85 L734 83 L726 77 L736 73 L726 69 L736 63 L726 61 L732 53 L722 55 L718 45 L710 51 L704 41 L700 51 L688 45 L688 55 L678 49 L680 59 L668 57 L672 67 L660 65 L666 75 L654 77 L662 85 L652 87 L662 95 L650 99 L662 101 L652 109 L664 109 L656 117 L668 115 L662 125 L672 121 Z"
        fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="690" y="95" textAnchor="middle" fontSize="7" fontWeight="900" fill="#dc2626">200%</text>
      <text x="690" y="105" textAnchor="middle" fontSize="6" fontWeight="700" fill="#dc2626">INSP!</text>

      {/* K4: Paper-based push scheduling */}
      <path d="M430 105 L436 93 L444 101 L446 89 L454 95 L454 83 L464 91 L462 79 L474 85 L470 75 L482 79 L476 69 L488 71 L480 63 L492 63 L482 55 L494 53 L486 47 L496 43 L486 39 L496 33 L486 31 L492 23 L482 25 L478 15 L470 21 L464 11 L460 21 L448 15 L448 25 L438 19 L440 29 L428 27 L432 37 L420 35 L426 45 L414 47 L422 55 L412 59 L422 61 L412 69 L424 69 L416 77 L428 75 L422 85 L432 81 Z"
        fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="454" y="60" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#dc2626">PAPER</text>
      <text x="454" y="70" textAnchor="middle" fontSize="6" fontWeight="700" fill="#dc2626">PUSH!</text>

      {/* ══════════════════════════════════════════════════════════════════════
          LEAD TIME LADDER (bottom)
          ══════════════════════════════════════════════════════════════════ */}
      <text x="30" y="350" fontSize="7" fill="#374151" fontWeight="600">Lead Time:</text>

      {/* Inventory wait times (peaks - above the zigzag line) */}
      {/* PCB LT: 14d */}
      <line x1="40" y1="380" x2="40" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="40" y1="360" x2="120" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="120" y1="360" x2="120" y2="380" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="80" y="355" textAnchor="middle" fontSize="7" fill="#dc2626" fontWeight="700">14d (PCB LT)</text>

      {/* Process P1: 1.2d wait */}
      <line x1="120" y1="380" x2="120" y2="400" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="120" y1="400" x2="200" y2="400" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="200" y1="400" x2="200" y2="380" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="160" y="413" textAnchor="middle" fontSize="6.5" fill="#555">1.2d</text>

      {/* P1 C/T */}
      <line x1="200" y1="380" x2="200" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="200" y1="360" x2="260" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="260" y1="360" x2="260" y2="380" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="230" y="355" textAnchor="middle" fontSize="6.5" fill="#15803d">28s</text>

      {/* 3.2d wait */}
      <line x1="260" y1="380" x2="260" y2="400" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="260" y1="400" x2="370" y2="400" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="370" y1="400" x2="370" y2="380" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="315" y="413" textAnchor="middle" fontSize="6.5" fill="#555">3.2d</text>

      {/* P2 C/T */}
      <line x1="370" y1="380" x2="370" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="370" y1="360" x2="440" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="440" y1="360" x2="440" y2="380" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="405" y="355" textAnchor="middle" fontSize="6.5" fill="#15803d">62s</text>

      {/* 1.8d wait */}
      <line x1="440" y1="380" x2="440" y2="400" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="440" y1="400" x2="530" y2="400" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="530" y1="400" x2="530" y2="380" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="485" y="413" textAnchor="middle" fontSize="6.5" fill="#555">1.8d</text>

      {/* P3 C/T */}
      <line x1="530" y1="380" x2="530" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="530" y1="360" x2="610" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="610" y1="360" x2="610" y2="380" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="570" y="355" textAnchor="middle" fontSize="6.5" fill="#15803d">38s</text>

      {/* 0.8d wait */}
      <line x1="610" y1="380" x2="610" y2="400" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="610" y1="400" x2="680" y2="400" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="680" y1="400" x2="680" y2="380" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="645" y="413" textAnchor="middle" fontSize="6.5" fill="#555">0.8d</text>

      {/* P4 C/T */}
      <line x1="680" y1="380" x2="680" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="680" y1="360" x2="750" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="750" y1="360" x2="750" y2="380" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="715" y="355" textAnchor="middle" fontSize="6.5" fill="#15803d">45s</text>

      {/* 1d FG wait */}
      <line x1="750" y1="380" x2="750" y2="400" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="750" y1="400" x2="830" y2="400" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="830" y1="400" x2="830" y2="380" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="790" y="413" textAnchor="middle" fontSize="6.5" fill="#555">1d</text>

      {/* P5 C/T */}
      <line x1="830" y1="380" x2="830" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="830" y1="360" x2="890" y2="360" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="860" y="355" textAnchor="middle" fontSize="6.5" fill="#15803d">22s</text>

      {/* Totals */}
      <rect x="30" y="420" width="840" height="20" rx="3" fill="#f1f5f9" />
      <text x="450" y="433" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1a1a1a">
        Total Lead Time: ~22 days | Value-Added Time: 195s (3.25 min) | % VA: 0.68%
      </text>
    </svg>
  );
}

// ─── 7 guided questions ───────────────────────────────────────────────────────

interface GuidedQ {
  id: number;
  questionEn: string;
  questionJa: string;
  hintEn: string;
  hintJa: string;
  options: { id: string; textEn: string; textJa: string }[];
  correctId: string;
  explanationEn: string;
  explanationJa: string;
}

const GUIDED_QUESTIONS: GuidedQ[] = [
  {
    id: 1,
    questionEn: 'What is the Takt Time for the RS-7 speaker?',
    questionJa: 'RS-7スピーカーのタクトタイムは？',
    hintEn: 'Look at the Customer box (top right). Daily demand = 800 units. Assume 2 shifts × 7.5 hours = 54,000 seconds.',
    hintJa: '顧客ボックス（右上）を見てください。日次需要＝800台。2シフト×7.5時間＝54,000秒と仮定。',
    options: [
      { id: 'a', textEn: '~34 seconds', textJa: '約34秒' },
      { id: 'b', textEn: '~62 seconds', textJa: '約62秒' },
      { id: 'c', textEn: '~22 seconds', textJa: '約22秒' },
      { id: 'd', textEn: '~45 seconds', textJa: '約45秒' },
    ],
    correctId: 'a',
    explanationEn: '54,000s ÷ 800 units = 67.5s per unit. But with 2 shifts and buffer time typically it comes out ~34s per actual available second of production. The customer box confirms Takt: ~34s.',
    explanationJa: '54,000秒 ÷ 800台 = 67.5秒/台。実際の生産可能秒数から約34秒となる。顧客ボックスでタクト~34秒を確認。',
  },
  {
    id: 2,
    questionEn: 'Which process is the bottleneck (slowest cycle time vs. takt)?',
    questionJa: 'どの工程がボトルネックか（タクトに対して最も遅いC/T）？',
    hintEn: 'Compare each process C/T to takt time (~34s). Any process with C/T > 34s cannot keep up.',
    hintJa: '各工程のC/Tをタクトタイム（約34秒）と比較。C/T > 34秒の工程は需要に追いつけない。',
    options: [
      { id: 'a', textEn: 'Injection Molding (C/T: 28s)', textJa: '射出成形（C/T: 28秒）' },
      { id: 'b', textEn: 'PCB Sub-Assembly (C/T: 62s)', textJa: 'PCBサブ組立（C/T: 62秒）' },
      { id: 'c', textEn: 'Final Assembly (C/T: 38s)', textJa: '最終組立（C/T: 38秒）' },
      { id: 'd', textEn: 'Test & QC (C/T: 45s)', textJa: 'テスト&品質管理（C/T: 45秒）' },
    ],
    correctId: 'b',
    explanationEn: 'PCB Sub-Assembly at 62s is nearly 2× takt (34s). That means it can only produce ~870 units/shift, not 800/day at full demand. Plus Injection Molding\'s 52% OEE creates gaps that compound this.',
    explanationJa: 'PCBサブ組立のC/Tは62秒でタクト（34秒）の約2倍。1日800台の需要に対応できない。さらに射出成形の52% OEEが問題を複合化している。',
  },
  {
    id: 3,
    questionEn: 'What type of scheduling does Production Control use?',
    questionJa: '生産管理はどのタイプのスケジューリングを使用しているか？',
    hintEn: 'Look at the Production Control box. What does the text say?',
    hintJa: '生産管理ボックスを確認。テキストに何と書いてあるか？',
    options: [
      { id: 'a', textEn: 'Kanban-pull — processes signal when they need parts', textJa: 'かんばんプル — 工程が必要な時に信号を送る' },
      { id: 'b', textEn: 'Heijunka — load-levelled daily sequences', textJa: '平準化 — 日次の負荷平準化' },
      { id: 'c', textEn: 'Paper-based MRP push — weekly schedules pushed to all processes', textJa: '紙ベースMRPプッシュ — 全工程に週次スケジュールを押し出す' },
      { id: 'd', textEn: 'ERP electronic pull — real-time replenishment triggers', textJa: 'ERP電子プル — リアルタイム補充トリガー' },
    ],
    correctId: 'c',
    explanationEn: 'Production Control shows "Paper-based schedule" and "Push system" warning. Push arrows between all processes confirm: every upstream process produces and shoves work downstream regardless of actual need.',
    explanationJa: '生産管理ボックスに「紙ベーススケジュール」と「プッシュシステム」の警告が表示されている。全工程間のプッシュ矢印が確認：実際の必要性に関係なく全ての上流工程が生産し下流へ押し出す。',
  },
  {
    id: 4,
    questionEn: 'What is the total manufacturing lead time for one RS-7 speaker?',
    questionJa: 'RS-7スピーカー1台の総製造リードタイムは？',
    hintEn: 'Sum all the inventory wait times on the lead time ladder (the peaks), plus PCB supplier lead time.',
    hintJa: 'リードタイム梯子のすべての在庫待ち時間（山の部分）を合算。PCBサプライヤーのリードタイムも含める。',
    options: [
      { id: 'a', textEn: '~3 days', textJa: '約3日' },
      { id: 'b', textEn: '~10 days', textJa: '約10日' },
      { id: 'c', textEn: '~22 days', textJa: '約22日' },
      { id: 'd', textEn: '~5 days', textJa: '約5日' },
    ],
    correctId: 'c',
    explanationEn: 'PCB supplier LT (14d) + 1.2d + 3.2d + 1.8d + 0.8d + 1d = ~22 days. Value-added time is only ~195 seconds. That\'s 0.68% efficiency — the other 99.32% is waiting.',
    explanationJa: 'PCBサプライヤーLT（14日）+ 1.2日 + 3.2日 + 1.8日 + 0.8日 + 1日 ≈ 22日。付加価値時間は約195秒のみ。効率0.68%—残りの99.32%は待機時間。',
  },
  {
    id: 5,
    questionEn: 'The PCB raw stock shows 3,200 pcs / 8 days. Why is this a kaizen opportunity?',
    questionJa: 'PCB原材料在庫が3,200個/8日と表示されている。なぜこれが改善機会なのか？',
    hintEn: 'Compare to Lean ideals: if the supplier ships weekly, how much safety stock is truly needed?',
    hintJa: 'リーンの理想と比較：サプライヤーが週次納品の場合、実際に必要な安全在庫はどれくらいか？',
    options: [
      { id: 'a', textEn: '8 days of PCB stock is normal for a weekly-shipping overseas supplier', textJa: '週次出荷の海外サプライヤーに対する8日分のPCB在庫は通常' },
      { id: 'b', textEn: 'It ties up cash and hides quality defects from the supplier — overproduction waste', textJa: 'キャッシュを拘束し、サプライヤーからの品質欠陥を隠す — 過剰生産の無駄' },
      { id: 'c', textEn: 'Safety stock is always needed; 8 days is the minimum required', textJa: '安全在庫は常に必要；8日が最低限' },
      { id: 'd', textEn: 'The issue is packaging only runs 1 shift, not the PCB inventory', textJa: '問題はパッケージングが1シフトしか稼働していないことで、PCB在庫ではない' },
    ],
    correctId: 'b',
    explanationEn: 'Eight days of PCB stock ties up working capital and delays discovery of defects. If a supplier sends bad PCBs, you might use 8 days\' worth before catching it. The kaizen target: negotiate weekly delivery with Kanban signal to reduce to 1-2 days.',
    explanationJa: '8日分のPCB在庫は運転資本を拘束し、欠陥発見を遅らせる。サプライヤーが不良PCBを送った場合、発見前に8日分使用してしまう可能性がある。改善目標：週次納品とかんばん信号で1-2日に削減。',
  },
  {
    id: 6,
    questionEn: 'Test & QC shows "200% inspection!" — what does this mean and why is it waste?',
    questionJa: 'テスト&品質管理が「200%検査！」を示している — これはどういう意味で、なぜ無駄なのか？',
    hintEn: '100% inspection = every unit checked once. 200% = ___',
    hintJa: '100%検査＝全台を1回チェック。200%＝___',
    options: [
      { id: 'a', textEn: 'Every unit is tested twice, doubling cycle time at QC for no added quality value', textJa: '全台を2回テスト — 品質価値なしでQCのサイクルタイムが倍増' },
      { id: 'b', textEn: 'They inspect 200 units per shift, which is the correct rate for 800/day', textJa: '1シフト200台を検査 — 800台/日に対して正しいレート' },
      { id: 'c', textEn: '200% means only 2 in 100 units fail — that\'s good quality', textJa: '200%は100台中2台が不合格を意味 — 良い品質' },
      { id: 'd', textEn: 'It means Test & QC uses 200% of their available capacity, so they need more headcount', textJa: 'テスト&品質管理が利用可能キャパシティの200%を使用している — より多くの人員が必要' },
    ],
    correctId: 'a',
    explanationEn: '200% inspection means every speaker is tested twice — a legacy practice from an old quality scare that was never removed. It doubles effective C/T at QC from 22.5s to 45s. The fix: implement poka-yoke upstream to prevent defects, then reduce to statistical sampling.',
    explanationJa: '200%検査は全スピーカーを2回テストすることを意味 — かつての品質問題から残った慣行で廃止されていない。QCの実効C/Tを22.5秒から45秒に倍増させる。対策：上流でポカヨケを実装して欠陥を防止し、統計的サンプリングに削減。',
  },
  {
    id: 7,
    questionEn: 'What is the value-added percentage of this process?',
    questionJa: 'このプロセスの付加価値率は？',
    hintEn: 'Check the bottom summary bar. VA time (seconds) ÷ Total lead time (seconds).',
    hintJa: '下部の合計バーを確認。付加価値時間（秒）÷総リードタイム（秒）。',
    options: [
      { id: 'a', textEn: 'About 15%', textJa: '約15%' },
      { id: 'b', textEn: 'About 50%', textJa: '約50%' },
      { id: 'c', textEn: 'Less than 1%', textJa: '1%未満' },
      { id: 'd', textEn: 'About 5%', textJa: '約5%' },
    ],
    correctId: 'c',
    explanationEn: '195 seconds of value-added work out of ~22 days (1,900,800 seconds) = 0.01%. Even being generous, it\'s under 1%. This is normal for batch+push manufacturing — the shocking truth the MIFC reveals.',
    explanationJa: '付加価値作業195秒 ÷ 約22日（1,900,800秒）= 0.01%。寛大に見ても1%未満。これはバッチ+プッシュ製造では通常 — MIFCが明らかにする衝撃的な現実。',
  },
];

export default function MifcReadDiagram({ onComplete, alreadyDone }: Props) {
  const { lang } = useLang();
  const [activeQ, setActiveQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [expanded, setExpanded] = useState(false);

  const q = GUIDED_QUESTIONS[activeQ];
  const userAnswer = answers[q.id];
  const isCorrect = userAnswer === q.correctId;
  const allAnswered = GUIDED_QUESTIONS.every(gq => answers[gq.id] !== undefined);
  const score = GUIDED_QUESTIONS.filter(gq => answers[gq.id] === gq.correctId).length;

  function handleAnswer(optId: string) {
    if (answers[q.id]) return;
    setAnswers(prev => ({ ...prev, [q.id]: optId }));
  }

  function handleNext() {
    if (activeQ < GUIDED_QUESTIONS.length - 1) setActiveQ(a => a + 1);
  }

  function handlePrev() {
    if (activeQ > 0) setActiveQ(a => a - 1);
  }

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Dana Wren context */}
      <div className="bg-neutral-900 text-white rounded-xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-xs font-bold shrink-0">DW</div>
        <div>
          <p className="text-xs text-red-400 font-medium">Dana Wren — Field Debrief</p>
          <p className="text-sm text-gray-200 mt-0.5">
            {lang === 'en'
              ? "Our factory team drew this Current State MIFC last week. Study it before you go to the floor. I want to know if you understand what you're looking at."
              : '工場チームが先週この現状MIFCを作成しました。現場に行く前に研究してください。あなたが何を見ているかを理解しているか確認したい。'}
          </p>
        </div>
      </div>

      {/* MIFC Diagram — expandable */}
      <div className="panel p-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-700">
            {lang === 'en' ? 'Riverstone Audio — RS-7 Current State MIFC' : 'Riverstone Audio — RS-7 現状MIFC'}
          </h3>
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            {expanded ? (lang === 'en' ? '▲ Collapse' : '▲ 折りたたむ') : (lang === 'en' ? '▼ Expand' : '▼ 拡大')}
          </button>
        </div>
        <div className={`overflow-auto ${expanded ? '' : 'max-h-64'} border border-gray-200 rounded-lg`}>
          <RiverstoneAudioMIFC />
        </div>
        <p className="text-[10px] text-gray-400 mt-1">
          {lang === 'en' ? 'Tip: Expand the diagram or scroll inside to explore details.' : 'ヒント：図を拡大するかスクロールして詳細を確認。'}
        </p>
      </div>

      {/* Question progress */}
      <div className="flex gap-1">
        {GUIDED_QUESTIONS.map((gq, i) => (
          <button
            key={gq.id}
            onClick={() => setActiveQ(i)}
            className={`flex-1 h-2 rounded-full transition-all ${
              i === activeQ ? 'bg-blue-600' :
              answers[gq.id] === gq.correctId ? 'bg-green-500' :
              answers[gq.id] ? 'bg-red-400' :
              'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Active question */}
      <div className="panel p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              {lang === 'en' ? `Question ${activeQ + 1} of ${GUIDED_QUESTIONS.length}` : `質問 ${activeQ + 1}/${GUIDED_QUESTIONS.length}`}
            </span>
            <p className="text-base font-semibold text-gray-900 mt-1">
              {lang === 'en' ? q.questionEn : q.questionJa}
            </p>
          </div>
          <button
            onClick={() => setShowHint(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
            className="text-[10px] text-amber-600 hover:text-amber-800 border border-amber-300 rounded px-2 py-1 shrink-0 mt-1"
          >
            {showHint[q.id] ? (lang === 'en' ? 'Hide hint' : 'ヒントを隠す') : (lang === 'en' ? '💡 Hint' : '💡 ヒント')}
          </button>
        </div>

        {showHint[q.id] && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            {lang === 'en' ? q.hintEn : q.hintJa}
          </div>
        )}

        <div className="space-y-2">
          {q.options.map(opt => {
            let cls = 'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
            if (userAnswer) {
              if (opt.id === q.correctId) cls = 'border-green-500 bg-green-50';
              else if (opt.id === userAnswer) cls = 'border-red-400 bg-red-50 opacity-70';
              else cls = 'border-gray-200 bg-gray-50 opacity-50';
            }
            return (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.id)}
                disabled={!!userAnswer}
                className={`w-full text-left p-3 rounded-lg border-2 text-sm transition-all ${cls}`}
              >
                <span className="font-medium text-gray-500 mr-2">{opt.id.toUpperCase()}.</span>
                {lang === 'en' ? opt.textEn : opt.textJa}
              </button>
            );
          })}
        </div>

        {userAnswer && (
          <div className={`rounded-lg p-4 text-sm space-y-1 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
            <p className="font-bold">{isCorrect ? '✅' : '🔍'} {isCorrect ? (lang === 'en' ? 'Correct' : '正解') : (lang === 'en' ? 'Not quite—here\'s why:' : '惜しい—理由はこちら：')}</p>
            <p className="text-gray-700">{lang === 'en' ? q.explanationEn : q.explanationJa}</p>
          </div>
        )}

        <div className="flex justify-between pt-1">
          <button onClick={handlePrev} disabled={activeQ === 0} className="btn-ghost text-xs disabled:opacity-30">
            ← {lang === 'en' ? 'Prev' : '前へ'}
          </button>
          {userAnswer && activeQ < GUIDED_QUESTIONS.length - 1 && (
            <button onClick={handleNext} className="btn-primary text-xs">
              {lang === 'en' ? 'Next →' : '次へ →'}
            </button>
          )}
        </div>
      </div>

      {/* Completion */}
      {allAnswered && !alreadyDone && (
        <div className="panel p-5 text-center space-y-3 border-blue-200 bg-blue-50">
          <p className="text-2xl font-black text-blue-700">{score}/{GUIDED_QUESTIONS.length}</p>
          <p className="text-sm text-gray-700">
            {lang === 'en'
              ? `You answered ${score} of ${GUIDED_QUESTIONS.length} questions correctly. Time to build your own map.`
              : `${GUIDED_QUESTIONS.length}問中${score}問正解。自分でマップを作成する時間です。`}
          </p>
          <button onClick={onComplete} className="btn-primary">
            {lang === 'en' ? 'Start Building the Map →' : 'マップ構築開始 →'}
          </button>
        </div>
      )}

      {alreadyDone && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 text-sm font-medium">
          ✅ {lang === 'en' ? 'Map analysis complete.' : 'マップ分析完了。'}
        </div>
      )}
    </div>
  );
}
