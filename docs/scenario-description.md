# The Cascade — Game Scenario Description
## *Apex Precision Parts: The Supply Chain Crisis*

> **Classification:** Facilitator & Designer Reference
> **Version:** 1.0 — sourced directly from `scenario/cascade.scenario.json`
> **Date:** March 2026

---

## 1. The World

### Setting
**Apex Precision Parts (APP)** is a tier-1 automotive supplier headquartered in **Lansing, Michigan**. They manufacture brake assemblies — safety-critical components that cannot be substituted. APP is the **sole-source supplier** for this part family, which means every day they cannot ship is a day the OEM line stops.

The game takes place in **early November** of an unspecified near-present year. The automotive industry's Q4 production push is in full swing. Line rates are at their seasonal peak.

### The Precipitating Event
Twenty-one days ago, **APP's production went dark.** No warning. No formal notice. A single email from a VP named D. Kowalski — *"We'll be in touch shortly"* — and then silence.

The player's organization is the OEM **customer**. You rely on APP's brake assemblies. You have **48 hours of buffer inventory** remaining. After that, your own assembly line stops. The financial exposure is **$480,000 per hour**.

The clock is running.

---

## 2. The Mystery

### What Players Don't Know (At First)
The production stoppage appears to be a logistics or operational failure. Shipments simply stopped arriving on October 28. Nobody at APP is answering the phone. Their facility appears locked.

The actual cause is a **cascading financial failure** — five distinct events that compounded over seven months, each one making the next inevitable. No single event would have caused the stoppage alone. Together, they created a crisis that APP could not survive without external intervention.

### The Five-Step Causal Chain

```
Step 1  →  Step 2  →  Step 3  →  Step 4  →  Step 5
 ↓             ↓            ↓            ↓            ↓
Payment      Steel       Covenant     Credit       Production
Terms        Price       Breach       Frozen       Stopped
Extended     Spike       (EBITDA)     ($10M        (Oct 28)
Net-30→60   +23% Q4     2.3x < 2.5x  Revolver)
(Apr 10)     ($370K      (Oct 28)     (Oct 27)
             unbudgeted)
```

**Step 1 — Payment Terms Extended (April 10)**
The OEM's CFO issued a Working Capital Optimization Program (WCOP) memo extending supplier payment terms from Net-30 to Net-60. The stated rationale was improving OEM working capital by ~$340M annually. The Treasury department flagged that suppliers with high leverage ratios were at acute liquidity risk. APP was on that list. No exception was granted. APP did not request one.

**Step 2 — Steel Price Spike (Q4)**
Steel commodity prices rose 23% in Q4 — an industry-wide move driven by trade policy changes. For APP, this translated to approximately **$370,000 in unbudgeted quarterly costs**. Their Q3 EBITDA was approximately $980,000. The steel spike alone represented 38% of their quarterly earnings.

**Step 3 — Covenant Breach (October 28)**
The combination of delayed receivables (now 27 days slower due to Net-60) and surging input costs collapsed APP's financial ratios. Their **EBITDA/Interest Coverage ratio fell to 2.3x**, below the **2.5x minimum covenant** required by their bank. Their current ratio dropped to 0.91. The bank's credit risk assessment flagged them as "high risk — covenant breach imminent" on October 28.

**Step 4 — Credit Facility Frozen (October 27)**
One day before the formal covenant breach determination, **First Industrial Bank (FIB) placed a hold on APP's $10M revolving credit facility**, pending covenant review. APP had been drawing on this revolver to fund daily operations — it was 98.5% utilized. Without it, they had $300,000 in cash on hand. Their accounts payable commitments were far larger.

**Step 5 — Production Stopped (October 28)**
With no revolver access and $300K cash, APP could not purchase raw materials, could not make payroll, and could not fund operations for even one more day. Management locked the facility on October 28 — the same day as the bank's covenant review. The production floor went idle. Guards were posted "per management instruction." Eighteen days of silence followed.

---

## 3. The Players

The simulation is designed for **two players with asymmetric information**. Neither player can solve the crisis alone. Cooperation and information synthesis are required to escape.

### Player 1: Supply Chain Manager (SCM)
**Perspective:** Operational
**Mental Model at Start:** "APP had a logistics problem — weather, labor, quality, maybe capacity."

The SCM has access to APP's operational data. Their files reveal symptoms: shipments that stopped, a facility that appears locked, a supplier that won't communicate, and several plausible operational explanations that turn out to be dead ends.

**What the SCM sees:**
- A shipment log showing the exact date production stopped (Oct 28) and 18 days of consecutive misses
- A site visit inventory snapshot: facility locked, guards posted, raw materials at zero, production floor idle
- An APP communications log: sparse, evasive, the D. Kowalski email, then nothing
- An alternate supplier assessment: no viable alternatives exist at any price for the lead time available
- A payment terms supplier notification: APP was notified of Net-60 terms on April 15 — a connector clue linking to the financial story

**What the SCM does NOT see:**
Why any of this happened. The financial catastrophe is invisible in operational data.

**Red Herrings in the SCM's Files:**
- A **logistics weather alert** for Storm Cleo — a Great Lakes storm that caused disruption Oct 18-21. Resolved October 22. Six days before the first shipment miss. Completely irrelevant.
- A **quality holdback report** from Q2: APP had a brake assembly quality issue. Holdback closed August 28. Zero PPM since. Also irrelevant — but feels significant to someone who doesn't know what happened.

---

### Player 2: Finance Analyst (FA)
**Perspective:** Financial
**Mental Model at Start:** "Something happened with APP's credit, or maybe a currency/FX exposure."

The FA has access to APP's financial profile and the bank relationship documents. Their files reveal the true cause — but only if they can read the signals correctly and share them with the SCM.

**What the FA sees:**
- An **AR Aging Report** showing APP has been paying 27 days late since Net-60 terms began — a liquidity distress signal
- A **Credit Risk Assessment (Q3)** from their internal risk team: EBITDA/interest coverage 2.3x, below 2.5x covenant; current ratio 0.91; HIGH RISK rating
- A **Financial Health Dashboard (Nov 1)**: cash $300K, revolver 98.5% drawn, "functionally insolvent since mid-October"
- A **First Industrial Bank CreditWatch Alert (Oct 27)**: FIB placed the $10M revolving credit on hold pending covenant review — the smoking gun
- A **Steel Commodity Price Analysis**: 23% Q4 spike, $370K unbudgeted cost for APP
- A **CFO Memo on WCOP (Apr 10)**: the payment terms extension memo, identifying leveraged suppliers as at-risk — including APP

**What the FA does NOT see:**
The operational consequences. They can understand APP is in financial distress, but not that the production floor is physically locked and workers sent home.

**Red Herrings in the FA's Files:**
- An **FX Variance Report**: shows foreign exchange exposure analysis. APP is a US domestic manufacturer with no material FX exposure. Pure noise.
- A **Duplicate Invoice Audit**: involves a different supplier entirely. Included to create cognitive load and suggest financial irregularities that aren't there.

---

## 4. The Evidence Structure

### How Clues Are Accessed
Each file is locked behind a **gate question** — a 4-option multiple choice question testing whether the player correctly interpreted the document's significance. Players must answer correctly before the clue is "unlocked" and its contents contribute to the shared investigation.

This mechanic prevents passive reading — players must actively engage with each piece of evidence and articulate what it means before moving forward.

### Clue Weights
Each clue is classified by its causal weight:

| Weight | Description | Count |
|--------|-------------|-------|
| **Primary** | Directly proves a step in the causal chain | 4 |
| **Supporting** | Corroborates or quantifies the chain | 2 |
| **Connector** | Links the two personas' stories | 2 |
| **Red Herring** | Plausible but irrelevant | 4 |

### The Checkpoint
After **4 total clues are discovered** across both players, the simulation pauses for a mandatory **War Room synthesis checkpoint**. Both players must share what they've found and attempt to connect the operational story (SCM) to the financial story (FA) before submitting their final escape answer.

This is the moment where the asymmetric design pays off. The SCM knows production stopped on Oct 28. The FA knows FIB froze the revolver on Oct 27. These two facts, combined, tell the complete story.

---

## 5. Evidence Inventory

### Supply Chain Manager Files

| File | Type | Weight | Key Finding |
|------|------|--------|-------------|
| `shipment_log_oct_nov.csv` | Operational | Primary | First miss Oct 28; 3 consecutive; 18 days dark |
| `site_inventory_snapshot.pdf` | Operational | Primary | Facility locked, guards posted, raw materials zero |
| `communications_log.txt` | Operational | Supporting | 18 days silence; "We'll be in touch shortly" |
| `logistics_weather_alert.pdf` | Logistics | Red Herring | Storm Cleo, resolved Oct 22 — irrelevant |
| `alternate_supplier_assessment.xlsx` | Procurement | Supporting | No viable alternatives at any price/lead time |
| `quality_holdback_report.pdf` | Quality | Red Herring | Q2 issue, closed Aug 28 — irrelevant |
| `payment_terms_supplier_notification.pdf` | Procurement | Connector | APP notified Apr 15 of Net-60 — links to FA story |

### Finance Analyst Files

| File | Type | Weight | Key Finding |
|------|------|--------|-------------|
| `ar_aging_report_q4.xlsx` | Finance | Supporting | APP 27 days late since Net-60 — acute liquidity signal |
| `credit_risk_assessment_q3.pdf` | Finance | Primary | EBITDA/IC 2.3x < 2.5x covenant; current ratio 0.91 |
| `financial_health_dashboard.pdf` | Finance | Primary | Cash $300K; revolver 98.5% drawn; "functionally insolvent" |
| `fib_creditwatch_alert.pdf` | Finance/Banking | Primary | FIB froze $10M revolver Oct 27 — **smoking gun** |
| `steel_commodity_price_analysis.pdf` | Finance | Supporting | 23% spike, $370K unbudgeted quarterly cost |
| `cfo_memo_payment_terms_wcop.pdf` | Finance | Connector | Apr 10 memo; flagged leveraged suppliers; links to SCM story |
| `fx_variance_report.pdf` | Finance | Red Herring | APP has no FX exposure — irrelevant |
| `duplicate_invoice_audit.pdf` | Finance | Red Herring | Different supplier entirely — irrelevant |

---

## 6. Timed Escalations

### Injection Event (25 Minutes)
At the 25-minute mark, an escalation arrives from the OEM's account management team:

> *"URGENT: [OEM] legal has confirmed APP's stoppage triggers Section 14.2 of their supply agreement. **$750,000/day in contractual penalties** begin accruing immediately if stoppage continues beyond current period. CPO and General Counsel are now engaged."*

This injection serves two purposes:
1. **Raises stakes** — the financial exposure is no longer just operational downtime; it's contractual liability
2. **Creates pressure** — teams that are meandering receive a signal that speed and precision matter

The injection does not change the correct answer. It is designed to accelerate synthesis, not redirect investigation.

### Hint Triggers

| Trigger | Timing / Condition | Hint Delivered |
|---------|-------------------|----------------|
| Hint 1 | 10 minutes elapsed | "Not everything in your files is equally relevant. Some documents exist to distract. Focus on timing — when did things actually happen?" |
| Hint 2 | 20 minutes elapsed | "The two of you are seeing different parts of the same story. What did your counterpart find that connects to what you know?" |
| Hint 3 | After shipment log unlocked | "The shipment log shows October 28 as the first miss. Something happened on or just before that date that made shipping impossible — not difficult, impossible." |
| Hint 4 | After CreditWatch alert unlocked | "A frozen credit facility is the symptom. What two forces combined to push APP below their bank covenant?" |
| Hint 5 | 5 minutes of inactivity | "You have more information than you think. Try writing out the timeline in order: what happened first, second, third, fourth, fifth." |

---

## 7. The Escape Conditions

### What Players Must Correctly Identify
To escape, teams submit a **written diagnosis and action plan**. Claude evaluates the submission semantically against six required elements. All six must be present.

#### Root Cause (All Must Be Present)
1. **Payment terms extension** — identify the Net-30→Net-60 change as a trigger
2. **Steel price spike** — identify the 23% increase and its impact on APP's cost structure
3. **Covenant breach** — identify that APP's EBITDA/interest coverage fell below the 2.5x bank covenant
4. **Credit facility frozen** — identify that First Industrial Bank froze the $10M revolving credit facility
5. **Production stoppage** — correctly state that production stopped as a direct result of the credit freeze

#### Correct Action (Must Include)
6. **Emergency payment acceleration** — release all 6 outstanding APP invoices ($2.4M+) via expedited ACH, revert to Net-30 terms, and escalate to CPO/CFO/FIB within 24 hours to negotiate revolver reinstatement

### Common Failure Modes
Teams frequently submit incomplete diagnoses. The most common errors:

- **Missing the payment terms cause** — Teams see the bank covenant breach and the steel price spike but don't connect the payment terms extension as the initiating event
- **Missing the covenant mechanism** — Teams know the revolver was frozen but can't explain *why* (the 2.5x EBITDA covenant)
- **Incomplete action plan** — Teams recommend "contact APP" or "find alternate supplier" without specifying payment acceleration as the mechanism to unfreeze the revolver
- **Red herring contamination** — Teams include Storm Cleo or the quality holdback in their diagnosis, indicating they haven't correctly filtered the evidence

---

## 8. Character Profiles

### D. Kowalski — APP VP, Operations
The only voice from APP throughout the crisis. His communication log is sparse and evasive:
- *October 28, 10:14 AM:* "We're experiencing some operational challenges. Shipments may be delayed."
- *October 29, 2:31 PM:* "Situation is under review. Appreciate your patience."
- *November 1, 9:00 AM:* "We'll be in touch shortly."
- *[18 days of silence]*

Kowalski is neither villain nor incompetent. He is legally constrained — APP's attorneys advised minimal communication during the insolvency period. His opacity is the product of corporate legal caution, not malice. This detail, if players realize it, actually narrows the hypothesis space: evasion usually means legal exposure, which usually means financial or regulatory problems, not operational ones.

### Margaret Chen — FIB Senior Relationship Manager
Appears in the CreditWatch alert. She placed the hold on October 27 — one day before the formal covenant breach determination — acting on the bank's leading indicators. Her note is clinical:

> *"Effective October 27, the revolving credit facility (Acct #7729-APP-RCF, $10,000,000 limit) has been placed on hold pending completion of covenant review. No draws will be processed during this period. Customer has been notified per Section 8.4 of the Credit Agreement."*

The fact that FIB acted *before* the official covenant breach date is a subtle tell — sophisticated players notice that banks place holds proactively, which means APP's situation was deteriorating visibly on internal bank dashboards before the formal numbers confirmed it.

### CFO (unnamed) — OEM Finance
Author of the April 10 WCOP memo. Does not appear in the scenario after that document. The memo is matter-of-fact:

> *"Effective Q2, standard supplier payment terms are extended from Net-30 to Net-60 days... Treasury has identified approximately 40 suppliers with leverage ratios that may create liquidity sensitivity to this change. Procurement should monitor these relationships."*

The CFO identified the risk. The organization did not act on it. This is not negligence — it is the normal information processing failure of large enterprises. The WCOP memo is simultaneously the root cause document and an indictment of the process that allowed a foreseeable crisis to become an actual one.

---

## 9. The Resolution

### Immediate Actions (0–24 Hours)
1. **Authorize expedited ACH payment** for all 6 outstanding APP invoices (total ~$2.4M)
2. **Contact First Industrial Bank** (Margaret Chen, Senior RM) directly — present the OEM's payment acceleration as evidence APP's receivables situation is resolving
3. **Revert APP to Net-30 terms** — formally and in writing, effective immediately
4. **Escalate internally** — CPO, CFO, and General Counsel must be briefed; OEM is now a creditor advocate for APP's revolver reinstatement

### Why This Works
APP's fundamental problem is a **receivables gap**, not a business failure. Their orders are real. Their product is good. Their customer (the OEM) is stable. The covenant breach was caused by delayed receivables — receivables that the OEM can accelerate. If the OEM accelerates $2.4M in payments, APP's cash position improves enough to negotiate revolver reinstatement with FIB, who will be satisfied by the covenant ratios improving.

The OEM is, paradoxically, both the cause of the crisis and the solution to it. This irony is intentional.

### Medium-Term Actions (24–72 Hours)
- Resume production once APP confirms revolver access is restored
- Deploy emergency logistics resources to work down the 18-day shipment backlog
- Brief OEM executive team on root cause and corrective action
- Initiate supplier financial health review process — APP's leverage ratio should have triggered intervention months earlier

### Systemic Fix (Post-Crisis)
- Redesign WCOP to include **carve-outs for highly leveraged sole-source suppliers**
- Implement **quarterly financial health monitoring** for suppliers rated HIGH RISK by Treasury
- Establish **covenant breach early warning protocol** — if a supplier's bank places a revolver on hold, that is a tier-1 supply chain risk event, not an accounts payable issue

---

## 10. Design Intent

### Why Asymmetric Information?
Real supply chain crises almost never have a single person who can see both the operational symptoms and the financial root cause simultaneously. The supply chain team sees operational failure. The finance team sees financial distress. The crisis is solved only when these two views are integrated.

The asymmetric design forces the behavior that real organizations struggle with: **cross-functional information sharing under pressure**.

### Why Red Herrings?
Supply chain investigations are noisy. Real investigations generate hypotheses that turn out to be wrong. Teams that go down every rabbit hole lose time. Teams that dismiss evidence too quickly miss the real cause.

The red herrings in The Cascade are **calibrated to be plausible**, not obvious. Storm Cleo is a real weather event at a plausible time. The quality holdback is a real APP issue. The FX variance report is a real financial document. None of them are relevant to this crisis — but none of them are obviously irrelevant without investigation.

The ability to **distinguish signal from noise under time pressure** is a core professional skill. The simulation tests it.

### Why the Payment Terms Connection?
The most important design choice in this scenario is that the OEM is the root cause. The crisis did not originate at APP. It was initiated by the OEM's CFO, in a standard working capital optimization memo, in April — seven months before the production line stopped.

This creates the psychological resolution that makes the scenario memorable: the team solving the crisis must recognize that they are also the cause of it. The correct action plan requires the OEM to acknowledge culpability (through payment acceleration and Net-30 restoration) before the crisis can be resolved.

This is not a story about a supplier who failed. It is a story about how procurement decisions made in finance meetings have physical consequences on factory floors.

---

## Appendix A: Full Timeline

| Date | Event | Significance |
|------|-------|-------------|
| April 10 | CFO issues WCOP memo, Net-30→Net-60 | Root cause initiated |
| April 15 | APP notified of new payment terms | APP does not request exception |
| Q2-Q3 | APP's AR aging extends 27 days | Liquidity stress builds silently |
| Q4 | Steel prices rise 23% | $370K unbudgeted cost hits APP |
| October 27 | FIB places hold on $10M revolver | Production funding gone |
| October 28 | APP locks facility, guards posted | Production stops |
| October 28 | FIB formal covenant review: 2.3x < 2.5x | Covenant breach confirmed |
| October 29 | First OEM inquiry, Kowalski responds vaguely | 18-day silence begins |
| November 1 | "We'll be in touch shortly" — last communication | |
| November 2 | Site inventory snapshot taken: facility idle | |
| **Now** | 48 hours of buffer inventory remain | Player entry point |

---

## Appendix B: Key Numbers

| Metric | Value | Significance |
|--------|-------|-------------|
| OEM buffer inventory | 48 hours | Time horizon at scenario start |
| OEM downtime cost | $480,000/hour | Urgency multiplier |
| Contractual penalty | $750,000/day | Injection at 25 min |
| APP outstanding invoices | ~$2.4M (6 invoices) | Solution amount |
| APP revolving credit | $10,000,000 | Frozen by FIB |
| APP revolver utilization | 98.5% | Functionally maxed |
| APP cash on hand | $300,000 | Insufficient for operations |
| Steel price increase | 23% Q4 | One of two primary causes |
| Unbudgeted steel cost | ~$370,000/quarter | vs. ~$980K Q3 EBITDA |
| APP EBITDA/IC ratio | 2.3x | Below 2.5x covenant |
| APP current ratio | 0.91 | Below 1.0 (technically insolvent) |
| Days APP silent | 18 days | Oct 28 → scenario present |

---

*This document is for facilitator reference and game design documentation. It should not be distributed to players prior to the simulation.*
