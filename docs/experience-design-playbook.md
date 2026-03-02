# The Cascade — Experience Design Playbook
### How to convert a real business crisis into a playable scenario

---

## Overview

A Cascade scenario is a structured investigation experience built on a **real or plausible historical crisis**. Two players with different professional lenses work through asymmetric evidence, pool findings in a shared war room, and must correctly identify the root cause — and the specific mechanism that made it catastrophic — before time runs out.

This playbook walks through every design decision you need to make, and where AI accelerates each one.

---

## Part 1 — Choosing the Right Crisis

### 1.1 The Five Criteria

Not every crisis makes a good scenario. Screen candidates against these criteria before investing in design:

| Criterion | What to look for | Red flag |
|---|---|---|
| **Causal chain depth** | 3–5 distinct causal layers, each amplifying the next | Single-cause failure; pure bad luck |
| **Information asymmetry** | Different functions genuinely saw different signals at the time | One team already had the full picture |
| **Root cause non-obviousness** | Discoverable through evidence, but not visible from the surface | Requires insider knowledge to ever solve |
| **Escapability** | Concrete actions existed that would have changed the outcome | Structural inevitability; fraud only solvable by law enforcement |
| **Teaching value** | Insight generalises to participants' real work | Too industry-specific to transfer |

### 1.2 Productive Crisis Archetypes

These categories reliably produce strong scenarios:

**Supplier financial fragility** *(Apex Meltdown)* — A supplier's balance sheet deteriorates while your procurement team only sees operational symptoms. Root cause is financial; discovery requires cross-functional synthesis.

**Demand signal failure** — A company acts on lagged or mis-aggregated demand data. The bullwhip effect creates either excess inventory or a stockout that looks like a supply problem.

**Counterparty concentration risk** — Over-reliance on a single logistics partner, freight lane, or commodity exposes the organisation to a correlated shock.

**Working capital cascade** — A policy change (payment terms, credit limits, hedging) has second- and third-order effects that surface weeks or months later as operational failures.

**Regulatory or compliance trip-wire** — A quiet regulatory change or sanctions event that procurement and finance interpret differently, creating a co-ordination failure.

### 1.3 AI-Assisted Crisis Sourcing

Use this prompt to surface candidates:

```
You are a supply chain and financial risk analyst.
Generate 5 plausible historical business crises that:
- Involved at least two distinct functions (e.g. procurement + finance)
- Had a root cause that was discoverable in hindsight but not obvious at the time
- Resulted in a measurable operational disruption (production stoppage, stockout, etc.)
- Could be structured as an investigation with 12–16 discrete evidence clues

For each crisis, provide:
1. A one-sentence summary
2. The surface symptom (what players would first notice)
3. The true root cause (what actually drove it)
4. The key mechanism (the specific trigger that made it irreversible)
5. What a good response would have looked like
```

---

## Part 2 — The Anatomy of a Scenario

### 2.1 Structural Model

Every Cascade scenario has the same skeleton:

```
SURFACE SYMPTOMS
  └─ visible to one or both personas immediately

ELIMINATIONS (2–3)
  └─ clues that rule out the obvious explanations
  └─ force players toward the real causal path

CAUSAL CHAIN (4–6 clues)
  └─ each clue reveals one layer of cause
  └─ distributed across both personas' file sets
  └─ requires war room sharing to assemble the full picture

MECHANISM CLUE (1 critical clue)
  └─ the specific event that made the cascade irreversible
  └─ often a threshold crossing: covenant breach, revolver hold, etc.

EXPOSURE QUANTIFICATION (2–3 clues)
  └─ the scale of damage; reinforces urgency
  └─ often one persona's domain (e.g. finance owns the $11.5M/day figure)
```

### 2.2 Persona Pair Design

The two personas should have **complementary blind spots**. Neither should be able to solve the crisis alone.

**Design principle:** *Each persona sees a different slice of the causal chain, and must share findings to see the whole picture.*

| Persona | Information domain | Natural blind spot |
|---|---|---|
| Supply Chain Manager | Operational signals, supplier relationships, logistics data | Financial health of counterparties |
| Finance Analyst | Balance sheet, AR aging, covenant compliance, credit facilities | Operational dependency and substitutability |

When designing new scenarios, the persona pair should be chosen so that:
- Persona A sees symptoms and surface exposure
- Persona B sees the financial or structural root cause
- The **mechanism clue** is only visible to Persona B
- The **exposure quantification** is split: Persona A owns operational impact, Persona B owns financial impact

### 2.3 The 14-Clue System

Fourteen clues is the design target. This number is:
- Large enough that no single document reveals everything
- Small enough to be discovered in 45–60 minutes of investigation
- Balanced across two personas (approximately 7–8 each, with some shared)

**Clue taxonomy:**

| Type | Count | Purpose | Example |
|---|---|---|---|
| **Symptom** | 2–3 | First evidence something is wrong | "3 consecutive missed deliveries" |
| **Elimination** | 2–3 | Rules out the obvious explanations | "Quality not the cause — zero PPM" |
| **Causal** | 4–6 | Builds the root cause narrative | "AR aging slipped to 87 days avg" |
| **Mechanism** | 1 | The specific trigger that made it irreversible | "Revolver HOLD placed Oct 27" |
| **Exposure** | 2–3 | Quantifies the stakes | "$11.5M/day production exposure" |

**Clue distribution rules:**
- No single document should contain more than 2 clues
- The mechanism clue should be buried (not in the first file players open)
- At least 3 clues require the *other* persona to have already found something for them to make sense
- 2–3 clues should only be discoverable through the war room (i.e. they require combining findings)

---

## Part 3 — AI-Assisted Crisis Decomposition

This is the core design workflow. Run it with any crisis candidate.

### Step 1: Causal Chain Extraction

```
I'm designing a business simulation scenario based on the following crisis:

[DESCRIBE THE CRISIS IN 2–3 PARAGRAPHS]

Map the causal chain for this crisis as follows:
1. Surface symptoms (what was first visible to each of these functions: [PERSONA A], [PERSONA B])
2. The elimination layer (what obvious explanations were ruled out, and what evidence ruled them out)
3. The causal chain (3–5 steps from proximate to root cause, with the specific evidence that reveals each step)
4. The mechanism (the single event or threshold that made the cascade irreversible)
5. The exposure (how the damage was quantified, and by whom)

Format as a structured JSON with these sections.
```

### Step 2: Information Asymmetry Mapping

```
Given this causal chain:
[PASTE CAUSAL CHAIN OUTPUT]

Map each causal element to the persona that would most naturally hold the evidence:
- [PERSONA A]: [role description]
- [PERSONA B]: [role description]

For each element, specify:
- Which persona's file library it belongs in
- What document type would contain this evidence (email, report, spreadsheet, system export, memo)
- Whether it can be discovered independently or requires cross-persona sharing

Produce a table with columns: Clue | Evidence Type | Persona | Can Discover Alone | Shared Discovery Condition
```

### Step 3: Clue ID Assignment

Once you have your clue list, assign short snake_case IDs that will live in the game engine:

```
missed_deliveries          ← symptom
comms_blackout             ← symptom
quality_ruled_out          ← elimination
logistics_ruled_out        ← elimination
payment_terms_stress       ← causal
ar_aging_deterioration     ← causal
covenant_breach            ← causal
revolver_maxed             ← causal
steel_commodity_shock      ← causal (root)
working_capital_policy     ← root cause document
creditwatch_hold           ← mechanism (the irreversible trigger)
site_shutdown              ← exposure
no_alternate_supplier      ← exposure
production_exposure        ← exposure quantification
```

These IDs go into `CLUE_LABELS` in the frontend and into the backend's clue trigger configuration.

---

## Part 4 — Building the Document Library

### 4.1 Document Types and Their Role

| Document type | Best for | Authenticity signals |
|---|---|---|
| **Internal memo** | Policy decisions, escalations, decisions with context | Sender/receiver, date, org unit, action items |
| **Email thread** | Real-time communication, urgency, partial information | Reply chain, CC list, informal tone |
| **System export / report** | Hard data — AR aging, inventory positions, KPIs | Column headers, totals, timestamps, system name |
| **Third-party document** | External signals — credit agency, freight forwarder, lender | Letterhead, reference numbers, formal language |
| **Dashboard screenshot** | Operational metrics, trend data | Chart labels, date ranges, data source |
| **Meeting notes** | Decisions made, commitments, open questions | Action owner column, date, attendees |

### 4.2 Document Library Structure

Organise documents into a folder hierarchy that matches how each persona would actually work:

```
[PERSONA_A]/
  00_overview/        ← orientation documents (what's the situation)
  01_supplier/        ← supplier relationship documents
  02_operations/      ← operational data and reports
  03_escalations/     ← internal flags and alerts

[PERSONA_B]/
  00_overview/
  01_financial/       ← balance sheet, AR, covenants
  02_credit/          ← lender communications, credit facility
  03_policy/          ← CFO memos, working capital policy
```

### 4.3 AI Document Generation Workflow

For each document in the library, use this generation prompt:

```
Generate a realistic [DOCUMENT TYPE] for the following scenario:

Context: [CRISIS SUMMARY]
Organization: [COMPANY NAME] — [COMPANY TYPE]
Supplier/Counterparty: [THIRD PARTY NAME]
Date: [DOCUMENT DATE — set this to create a realistic timeline]
Persona who holds this document: [PERSONA NAME, ROLE]

This document should:
- Reveal the following clue(s): [CLUE IDs]
- Not reveal: [CLUES TO WITHHOLD — maintain information asymmetry]
- Be consistent with these previously established facts: [FACTS FROM OTHER DOCUMENTS]
- Use realistic business language for [INDUSTRY/FUNCTION]
- Be [LENGTH] — realistic for this document type

The document should feel like it was written by someone inside the situation,
not by someone who knows the outcome. Write with the uncertainty and partial
information that real professionals would have had at the time.
```

### 4.4 Clue Trigger Configuration

Each clue is triggered when a player reads a document and their response contains certain signals. The backend evaluates this with an LLM. Define triggers as:

```python
clue_triggers = {
    "missed_deliveries": {
        "description": "Player recognises that deliveries have been consecutively missed",
        "trigger_keywords": ["missed", "delivery", "shipment", "consecutive", "october"],
        "confirmation_prompt": "Did the player's response demonstrate understanding that Apex has missed 3 consecutive deliveries, not just one isolated incident?"
    },
    "covenant_breach": {
        "description": "Player identifies the interest coverage covenant has been breached",
        "trigger_keywords": ["covenant", "interest coverage", "2.5x", "breach", "lender"],
        "confirmation_prompt": "Did the player's response show understanding that Apex has breached a financial covenant with their lender, not just that they have debt?"
    }
}
```

**Trigger design principle:** The trigger should fire on *understanding*, not just keyword presence. A player who pastes the document without engaging shouldn't unlock the clue.

---

## Part 5 — Gate Design

### 5.1 What Is a Gate?

A gate is a comprehension checkpoint embedded within a specific document. Before the player can fully access a file's content (or unlock a clue), they must answer a question that demonstrates they've actually processed what they read.

Gates serve two purposes:
1. **Pedagogical:** Forces active reading rather than skimming
2. **Mechanical:** Creates a natural pacing mechanism and adds tension

### 5.2 Gate Placement Strategy

Place gates on:
- The mechanism clue document (the most critical single document)
- Any document that contains 2+ clues
- Documents where skimming would miss the critical detail

Do **not** gate:
- Elimination documents (players need to move through these quickly)
- Symptom documents (front-loaded momentum matters)
- More than 3–4 documents per persona (gates lose impact if overused)

### 5.3 Gate Question Design

Good gate questions:
- Cannot be answered by skimming the first paragraph
- Require the player to synthesise across sections of the document
- Have a specific correct answer (not opinion-based)
- Reveal something the player *should* want to know, not just test recall

Bad gate questions:
- Factual recall that doesn't require understanding ("What was the date of the memo?")
- Leading questions ("Does this suggest a covenant breach?")
- Opinion-based questions with no right answer

**Gate question template:**
```
Gate document: [DOCUMENT TITLE]
Clue this gate protects: [CLUE ID]

Gate question: [A question that requires the player to have read and understood the full document]

Correct answer indicators: [What phrases or concepts must appear in a correct answer]
Wrong answer indicators: [Common misreadings to detect and redirect]

Unlock response (shown on correct): [Brief affirmation + what they should now be thinking about]
Redirect response (shown on incorrect): [Gentle prompt to re-read, without giving away the answer]
```

---

## Part 6 — Escape Condition Design

### 6.1 The Three-Part Escape

Every Cascade escape submission requires the player to demonstrate three things:

| Component | What it tests | Example from Apex Meltdown |
|---|---|---|
| **Root cause** | Correctly identifies the underlying cause, not the surface symptom | "Apex's financial fragility, driven by a covenant breach after steel commodity shock" |
| **Mechanism** | Names the specific trigger that made it irreversible | "The revolver hold placed by their lender on Oct 27 cut off their ability to purchase raw materials" |
| **Response** | Recommends concrete, specific, immediate actions | "Emergency direct-pay to clear Apex's lender hold; activate alternate supplier protocol; CFO-level call within 2 hours" |

A response that identifies the root cause but misses the mechanism scores ~60. A response that names all three correctly and specifically scores 90+.

### 6.2 Writing the Evaluator Prompt

This is the most important design decision in the scenario. The evaluator prompt is what the AI uses to score each escape submission.

```
You are evaluating an escape submission for a business simulation scenario.

## Scenario Summary
[2-3 sentence summary of the crisis]

## The True Root Cause
[Detailed explanation of what actually happened and why]

## Scoring Rubric

Score 90–100 (Escaped — Full Credit):
- Correctly identifies [ROOT CAUSE] as the driver, not just [SURFACE SYMPTOM]
- Names [SPECIFIC MECHANISM] as the irreversible trigger
- Recommends [SPECIFIC ACTIONS] with appropriate urgency
- Shows understanding that this is a financial fragility problem, not an operational one

Score 70–89 (Escaped — Partial):
- Identifies the financial dimension but attributes it to [COMMON WRONG CAUSE]
- Understands the crisis is serious but mislabels the mechanism
- Recommends reasonable but generic actions
- Shows synthesis without complete precision

Score 50–69 (Failed — Close):
- Focuses on [SYMPTOM] without reaching the root cause
- Proposes tactical responses (find another supplier) without addressing the financial mechanism
- May mention [ROOT CAUSE ADJACENT CONCEPT] without connecting it correctly

Score 0–49 (Failed — Fundamental Miss):
- Treats this as a [WRONG CATEGORY] problem
- Recommends actions that would not address the actual cause
- Shows no synthesis of the financial and operational evidence

## Player Submission to Evaluate
[This will be inserted dynamically]

## Your Response
Return a JSON object with:
- score: integer 0–100
- passed: boolean (true if score >= 70)
- headline: one sentence summary of what they got right or wrong
- debrief: 3–5 paragraph markdown debrief explaining:
  1. What the root cause actually was
  2. What they identified correctly
  3. What they missed or misattributed
  4. What the correct response would have looked like
  5. What this means for their real work
```

### 6.3 Calibrating the Evaluator

Before launching a scenario, run 5–10 test submissions through the evaluator:
- A perfect response (all three components, specific)
- A good-but-vague response (right direction, wrong mechanism)
- A plausible-wrong response (focused on operations, ignores finance)
- A clearly wrong response (wrong category entirely)
- An incomplete response (only one component)

Adjust the rubric until the scores feel right. The passing threshold should reward synthesis, not just recall.

---

## Part 7 — The Advisor Hint System

### 7.1 When Hints Fire

Hints are injected by the moderator or triggered automatically when:
- A player has been idle (no war room messages) for N minutes
- Clue discovery has stalled (no new clues unlocked in N minutes)
- A checkpoint deadline is approaching

### 7.2 Hint Design Philosophy

Hints should:
- **Redirect attention**, not reveal answers
- Sound like an internal advisor who has partial knowledge
- Use the language of the simulation (in-world voice)
- Never name the root cause directly

**Hint ladder** (from vague to specific):

```
Tier 1 (hint 1): Redirection to domain
"The signals you're seeing on the operational side are real — but they're symptoms.
 The finance team's data may tell a different story about what's driving this."

Tier 2 (hint 2): Redirection to specific document type
"When a supplier goes quiet like this, the first thing I'd want to know is their
 credit position. Has anyone looked at their lender relationship recently?"

Tier 3 (hint 3): Near-reveal
"Apex's revolver utilisation figure is the number I'd want in front of me right now.
 If that's maxed out and there's a hold on it, they literally cannot buy raw materials —
 regardless of what else is happening."
```

### 7.3 Hint Authoring Template

For each scenario, write 3 tiers × 2 personas = 6 hints minimum:

```
Scenario: [NAME]
Hint target: [What the player is missing]
Persona: [Who receives this hint]
Tier: [1/2/3]
Trigger condition: [What must be true for this hint to fire]

Hint text (in-world voice, 1–3 sentences):
[HINT]
```

---

## Part 8 — Scoring and Debrief Design

### 8.1 Score Bands and What They Mean

| Score | Band | Interpretation |
|---|---|---|
| 90–100 | **Full escape** | Complete synthesis; named root cause, mechanism, and response correctly |
| 70–89 | **Escaped** | Right direction; one component was vague or mislabelled |
| 50–69 | **Failed — close** | Understood urgency; stayed at symptom layer or mislabelled mechanism |
| 30–49 | **Failed** | Significant gaps; operational-only thinking |
| 0–29 | **Failed — fundamental miss** | Wrong category of problem; diagnosis would have made things worse |

### 8.2 Debrief Structure

The AI-generated debrief should follow this narrative arc:

1. **What actually happened** — A clear explanation of the causal chain in 2–3 sentences. Written for someone who just spent 45 minutes in the simulation.

2. **What you got right** — Specific acknowledgement of correct identifications. This is motivating and validates the effort.

3. **What you missed or misattributed** — Precise, non-patronising explanation of where the analysis fell short. The gap between their answer and the correct answer.

4. **The correct response** — What a well-informed team would have done, and why it would have worked. Concrete and actionable.

5. **The transfer question** — "What does this mean for your real work?" This is where the simulation connects to their actual context. Name the analogue.

### 8.3 Learning Objectives Specification

Before designing a scenario, write the three learning objectives explicitly. These drive everything else:

```
Scenario: [NAME]

Learning Objective 1 (Cross-functional synthesis):
"Participants will recognise that [SYMPTOM TYPE] in their domain can be caused by
 [ROOT CAUSE TYPE] in a partner function's domain, and that resolution requires
 cross-functional diagnosis, not unilateral action."

Learning Objective 2 (Mechanism identification):
"Participants will be able to identify [SPECIFIC MECHANISM TYPE] as a category of
 irreversible trigger, and understand why addressing the symptom after the mechanism
 fires is ineffective."

Learning Objective 3 (Early signal detection):
"Participants will recognise [LEADING INDICATOR TYPE] as an early warning signal
 they can monitor in their own work to surface this class of risk before it cascades."
```

These objectives should be referenced in the debrief and in any post-session facilitation guide.

---

## Part 9 — The Production Pipeline

### 9.1 End-to-End Workflow

```
1. CRISIS SELECTION (1–2 hours)
   └─ Apply the 5 criteria
   └─ Run AI sourcing prompt
   └─ Select and validate with a domain expert if available

2. CAUSAL CHAIN DECOMPOSITION (2–3 hours)
   └─ Run AI extraction prompt
   └─ Map information asymmetry
   └─ Assign 14 clue IDs with taxonomy

3. DOCUMENT LIBRARY GENERATION (4–6 hours)
   └─ Design folder structure
   └─ Write document briefs (one per document)
   └─ Run AI generation for each document
   └─ Human review for factual consistency and authenticity
   └─ Cross-check: every clue is present in at least one document

4. CLUE TRIGGER CONFIGURATION (2–3 hours)
   └─ Write trigger conditions for each clue
   └─ Configure backend scenario YAML
   └─ Test each trigger with 3–5 test responses

5. GATE DESIGN (1–2 hours)
   └─ Select 3–4 gate documents
   └─ Write gate questions and answer rubrics
   └─ Configure gate YAML

6. ESCAPE CONDITION AND EVALUATOR (2–3 hours)
   └─ Write the three-part escape specification
   └─ Draft evaluator prompt
   └─ Calibrate with 5+ test submissions
   └─ Adjust rubric until score distribution feels right

7. HINT LIBRARY (1 hour)
   └─ Write 6+ hints across two tiers
   └─ Review for in-world voice consistency

8. PLAYTESTING (2–3 hours, with real participants)
   └─ Run at least 2 full playthroughs before launch
   └─ Track: time to each clue, war room message patterns, common wrong answers
   └─ Adjust document difficulty, gate questions, and evaluator based on findings

9. FACILITATOR GUIDE (1 hour)
   └─ Document the correct causal chain in full
   └─ Write debrief talking points
   └─ List common wrong answers and how to redirect them
```

**Total production time:** 16–24 hours for a well-tested scenario, including AI assistance.

### 9.2 Quality Checklist

Before launch, verify:

- [ ] Every clue ID appears in at least one document
- [ ] No document reveals more than 2 clues
- [ ] The mechanism clue is not in the first 3 documents players are likely to open
- [ ] A player who only reads Persona A's documents cannot correctly identify the full causal chain
- [ ] A player who only reads Persona B's documents cannot correctly identify the full causal chain
- [ ] The escape evaluator correctly scores a perfect response at 90+
- [ ] The escape evaluator correctly scores a symptom-only response below 60
- [ ] At least 2 hint triggers are configured and tested
- [ ] The debrief's "transfer question" connects explicitly to participants' real work context
- [ ] All document dates form a consistent and plausible timeline

### 9.3 Scenario Configuration File Structure

Each scenario lives in a YAML/JSON config:

```yaml
scenario:
  id: apex_meltdown
  name: "Apex Meltdown"
  tagline: "A supplier goes dark. The line stops in 48 hours. Find out why."
  duration_minutes: 60
  checkpoint_at_minutes: 35

personas:
  - id: supply_chain_manager
    label: "Supply Chain Manager"
    files_root: "supply_chain_manager/"
  - id: finance_analyst
    label: "Finance Analyst"
    files_root: "finance_analyst/"

clues:
  - id: missed_deliveries
    label: "3 consecutive missed deliveries from Apex"
    type: symptom
  - id: creditwatch_hold
    label: "Revolver HOLD placed Oct 27 → supply stopped Oct 28"
    type: mechanism
  # ... all 14 clues

escape:
  required_submissions: 2   # both personas must submit
  passing_score: 70
  time_limit_minutes: 60
  evaluator_model: "claude-opus-4-5"

hints:
  - id: hint_finance_redirect
    tier: 1
    target_persona: supply_chain_manager
    trigger: "no_war_room_message_for_10_minutes"
    text: "The signals you're seeing operationally are real — but they're symptoms..."
```

---

## Part 10 — Scenario Variations and Scaling

### 10.1 Difficulty Levers

| Lever | Easy | Hard |
|---|---|---|
| **Clue density** | 1 clue per document | 1 clue per 3 documents |
| **Information asymmetry** | Some overlap between personas | Zero shared evidence |
| **Gate difficulty** | Factual gates | Synthesis gates |
| **Mechanism obviousness** | Mechanism clue clearly labelled | Mechanism buried in appendix |
| **Document volume** | 8–10 files per persona | 20+ files per persona |
| **Hint availability** | Automatic hints every 10 min | No hints unless moderator injects |
| **Time pressure** | 90 minutes | 45 minutes |

### 10.2 Adding a Third Persona

For three-player scenarios, the design principles extend:
- Each persona should own a distinct causal layer
- The mechanism clue is still owned by one persona
- 2 of the 3 cross-persona discoveries should require all three to have posted in the war room
- The escape evaluator must be told to expect submissions from three different perspectives

### 10.3 Series Design

If you're building a series of scenarios (e.g., a multi-session programme):

- **Scenario 1:** Teach the basic cross-functional synthesis skill (financial root cause of operational symptom)
- **Scenario 2:** Increase abstraction — root cause is a policy or process, not an event
- **Scenario 3:** Introduce a red herring causal path that must be actively eliminated
- **Scenario 4:** Time-pressure variant — some clues expire; you must sequence correctly

Each scenario's debrief should explicitly connect to the next scenario's challenge.

---

## Appendix A — Prompt Library

### Causal Chain Extraction
*See Part 3, Step 1*

### Information Asymmetry Mapping
*See Part 3, Step 2*

### Document Generation
*See Part 4.3*

### Escape Evaluator
*See Part 6.2*

### Hint Generation

```
You are writing moderator hints for a business simulation scenario.

The scenario is: [SUMMARY]
The true root cause is: [ROOT CAUSE]
The mechanism is: [MECHANISM]
The persona receiving this hint is: [PERSONA — ROLE]
This is hint tier [1/2/3] — [vague redirect / domain redirect / near-reveal]

The hint should:
- Sound like an internal advisor with partial but not complete knowledge
- Use the language and perspective of [PERSONA'S ROLE]
- Redirect their attention without naming the root cause
- Be 1–3 sentences
- Feel like something a real colleague would say, not a teacher

Write the hint.
```

### Debrief Generation (if not auto-generated by evaluator)

```
Write a debrief for a business simulation scenario.

Scenario: [SUMMARY]
True causal chain: [CAUSAL CHAIN]
Player submission: [THEIR ANSWER]
Score awarded: [SCORE]

The debrief should:
1. Open by affirming what they got right (specific)
2. Explain the true causal chain clearly
3. Identify exactly where their analysis diverged from the correct path
4. Describe what an optimal response would have looked like
5. Close with a "transfer question" — one insight they can take back to their real work

Tone: direct, collegial, never condescending. This is a peer-level debrief, not a teacher's feedback.
Format: Markdown, 4–5 paragraphs
```

---

## Appendix B — The Apex Meltdown as Reference

The shipped scenario illustrates all of the above principles in practice.

**Crisis:** A key supplier (Apex Precision) stops delivering. The surface cause appears operational (quality? logistics?). The true cause is financial: a steel commodity shock compressed their margins → extended payment terms drained their liquidity → their revolving credit facility hit max utilisation → their lender placed a hold → they literally cannot buy raw materials.

**Causal chain depth:** 5 layers (commodity → margin → liquidity → covenant → freeze)

**Information asymmetry:** SCM sees the operational symptoms; Finance holds the balance sheet data. The lender hold (mechanism clue) is only in Finance's files.

**Mechanism:** The revolver hold on Oct 27 — one day before supply stopped. This is what made it irreversible. A company with an intact credit facility could have bought materials elsewhere.

**Escape:** Requires identifying financial fragility as the cause (not quality, not logistics), naming the revolver hold as the mechanism, and recommending direct financial intervention (not just finding another supplier).

**Score distribution in playtesting:**
- ~20% of teams score 85+ (correctly identified financial cause and mechanism)
- ~40% score 60–75 (right direction, attributed mechanism incorrectly)
- ~40% score below 60 (focused on operational solutions)

This distribution is intentional — the scenario is designed to be challenging enough that most teams leave with at least one genuine learning.

---

*Last updated: February 2026*
*This playbook is a living document — update it as you learn from each new scenario build.*
