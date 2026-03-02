# The Cascade — Product Requirements Document
**Version:** 1.0
**Date:** 2026-03-02
**Status:** Living Document

---

## 1. Product Vision

**The Cascade** is a web-based experiential learning platform that trains operations and supply chain professionals in the Toyota Production System (TPS) and AI-augmented problem solving.

The platform has two distinct but connected surfaces:

| Surface | What It Is | Who It's For |
|---------|-----------|--------------|
| **The Cascade Crisis Simulation** | A multiplayer escape-room-style crisis exercise | Executives, cross-functional teams, MBA programs |
| **TPS Gemba Training** | A 14-module progressive TPS curriculum with belt progression | Operations teams, supply chain managers, lean practitioners |

The platform is **bilingual (EN/JA) by design**, reflects genuine Toyota teaching philosophy (observe → think → act → reflect), and uses AI as a coach rather than a teacher.

---

## 2. Design Principles

### The Ohno Standard
Every feature must pass this test: *"If Taiichi Ohno walked into this digital Gemba, would he recognize his teaching philosophy at work?"*

### Five Platform Principles
1. **Observe → Think → Act → Reflect** — Every module follows this cycle; never jumps to answers
2. **Coaching over lecturing** — The system asks Socratic/Kata questions; it never simply presents information
3. **Progressive mastery** — Belt-like progression from white (foundations) through demonstrated competency gates
4. **Daily practice cadence** — Designed for 15–20 minute daily sessions (Toyota Kata rhythm), not marathon workshops
5. **Bilingual from birth** — All content exists in EN and JA, with correct Japanese terminology (漢字 for TPS terms)

---

## 3. Current State (What Is Built — v0.1)

### 3.1 The Cascade Crisis Simulation ✅
A fully functional multiplayer crisis scenario with:
- **Scenario:** Apex Precision Parts (APP), a Tier-1 automotive supplier, has gone dark — assembly lines 48 hours from stoppage at $480K/hour
- **Two player roles:** Supply Chain Manager + Finance Analyst, each holding different puzzle pieces
- **Real-time collaboration** via WebSocket War Room chat
- **AI-powered hints** (Claude Haiku) with trigger-based hint engine (time, clue, inactivity)
- **Semantic escape evaluation** (Claude Opus) — natural language scoring, no exact match required
- **Moderator panel** for facilitators to observe and manage sessions
- **Scenario engine** — all content in `cascade.scenario.json`, hot-swappable without rebuild
- **Docker Compose** deployment — single command to run full stack

**Tech stack:** Next.js 14 (App Router), FastAPI, WebSockets, Redis, PostgreSQL, Anthropic SDK

### 3.2 TPS Gemba Training ✅ (Module 1–2 built, 3–14 designed)
A progressive TPS learning experience accessible from the main app:
- **Gemba landing page** at `/gemba` — module grid with belt visualization
- **ModuleShell** — shared layout with breadcrumb nav (Lobby › Gemba › Module), step progress pips, XP display
- **Belt progression system** — White → Green → Blue → Black, XP-based, localStorage persistence
- **Bilingual i18n** — full EN/JA string coverage for all Gemba UI
- **Module 1: Eyes of Ohno** (built)
  - Step 1: The Chalk Circle — Gemba walk observation with real factory floor photo
  - Step 2: Waste Spotter — identify the 7 wastes interactively
  - Step 3: Five Why Drill — root cause analysis with branching depth
- **Module 2: The TPS House** (built)
  - Step 1: TPS House Builder — drag-and-drop construction
  - Step 2: The Two Pillars Quiz — JIT + Jidoka knowledge check
  - Step 3: The Living Roof Reflection — Kaizen and People synthesis
- **Modules 3–14:** fully designed (see Section 5), not yet built
- **Navigation:** `/dojo/*` URLs redirect server-side to `/gemba/*` (backward compatible)

---

## 4. Architecture

### 4.1 Route Structure
```
/                           → Main lobby (game + gemba entry)
/game                       → Crisis simulation (multiplayer)
/gemba                      → TPS Gemba landing — module selector
/gemba/[moduleId]           → Redirects to /gemba/[moduleId]/step-1
/gemba/[moduleId]/[stepId]  → Step within a module
/moderator                  → Facilitator view (session control)
/dojo/*                     → Server-side redirects to /gemba/*
```

### 4.2 Key Components Built
| Component | Location | Purpose |
|-----------|----------|---------|
| `ModuleShell` | `components/dojo/` | Shared shell for all module steps |
| `BeltProgress` | `components/dojo/` | Belt + XP visualization |
| `ChalkCircle` | `components/dojo/steps/` | Observation step (Module 1, Step 1) |
| `WasteSpotter` | `components/dojo/steps/` | Waste identification (Module 1, Step 2) |
| `FiveWhyDrill` | `components/dojo/steps/` | Root cause drill (Module 1, Step 3) |
| `TPSHouseBuilder` | `components/dojo/steps/` | House builder (Module 2, Step 1) |
| `TwoPillarsQuiz` | `components/dojo/steps/` | JIT/Jidoka quiz (Module 2, Step 2) |
| `LivingRoofReflection` | `components/dojo/steps/` | Synthesis (Module 2, Step 3) |
| `WarRoom` | `components/` | Real-time chat for crisis simulation |
| `CoachPanel` | `components/` | AI hint display |
| `KataPanel` | `components/` | Gemba gateway link from game sidebar |

### 4.3 Data Model (Current — localStorage)
```typescript
interface DojoProgress {
  belt: 'white' | 'green' | 'blue' | 'black';
  modulesCompleted: string[];
  currentModule: string | null;
  currentStep: number;
  xp: number;
  streakDays: number;
  lastPracticeDate: string;
  observations: ObservationEntry[];
  a3Drafts: A3Draft[];
  kataExperiments: KataExperiment[];
  reflections: ReflectionEntry[];
  scores: Record<string, ModuleScore>;
}
```

---

## 5. TPS Gemba — Full Module Curriculum (14 Modules)

### Belt Structure
```
WHITE BELT (白帯) — Foundations
  Module 1: Eyes of Ohno — Observation & Seeing Waste        [BUILT]
  Module 2: The TPS House — Architecture of a System         [BUILT]
  Module 3: TWI Foundations — How Toyota Teaches             [DESIGNED]

GREEN BELT (緑帯) — Process Tools
  Module 4: Flow & Pull — From Batch to One-Piece            [DESIGNED]
  Module 5: Takt & Heijunka — The Heartbeat                  [DESIGNED]
  Module 6: Jidoka & Andon — Quality at the Source           [DESIGNED]
  Module 7: Standardized Work — The Basis for Kaizen         [DESIGNED]
  Module 8: Value Stream Mapping — Seeing the Whole          [DESIGNED]

BLUE BELT (青帯) — People & Problem Solving
  Module 9:  Toyota Kata — Scientific Thinking               [DESIGNED]
  Module 10: A3 Thinking — Structured Problem Solving        [DESIGNED]
  Module 11: Respect for People — TWI Job Relations          [DESIGNED]

BLACK BELT (黒帯) — Integration & Mastery
  Module 12: Hoshin Kanri — Strategy to Daily Work           [DESIGNED]
  Module 13: Cascade Challenge — Full TPS Integration        [DESIGNED]
  Module 14: Teaching Others — The Multiplier                [DESIGNED]
```

### Module 3: TWI Foundations (TWIの基盤)
Three-part module covering the WWII-era foundations Toyota still uses:
- **Job Instruction (JI):** Learner breaks down a real task into Steps → Key Points → Reasons; simulates teaching a virtual worker
- **Job Methods (JM):** Eliminate → Combine → Rearrange → Simplify framework applied to a sample process
- **Job Relations (JR):** Branching narrative scenarios — team conflict, underperformance, change resistance
- *Key component needed:* `JobBreakdownBuilder.tsx`, `BranchingScenario.tsx`

### Module 4: Flow & Pull (流れとプル)
Digital reimagining of the classic Land Cruiser assembly simulation:
- Round 1: Batch processing — experience WIP buildup, waiting, quality defects
- Round 2: One-piece flow — dramatic lead time reduction
- Round 3: Pull system — kanban signals, customer-paced production
- Real-time metrics dashboard: lead time, WIP, quality, cost per round
- *Key component needed:* `SimulationEngine.tsx`, `KanbanDesigner.tsx`

### Module 5: Takt & Heijunka (タクトと平準化)
- Interactive takt time calculator with visual heartbeat animation
- Drag-and-drop Heijunka box — level volume AND mix across time slots
- Side-by-side leveled vs. unleveled production impact comparison
- *Key component needed:* `TaktCalculator.tsx`, `HeijunkaBox.tsx`

### Module 6: Jidoka & Andon (自働化とアンドン)
- **The Andon Pull Decision:** Real-time production line simulation — defects appear, learner must decide to stop the line or let it pass; consequences unfold either way
- **Poka-Yoke Design:** add error-proofing devices to a process; before/after defect rate
- **Kanji exploration:** 自動化 (automation) vs 自働化 (autonomation) — the significance of the added 人 radical
- *Key component needed:* `AndonSimulator.tsx`, `PokaYokeDesigner.tsx`

### Module 7: Standardized Work (標準作業)
- Watch a process video; document takt time, work sequence, standard WIP
- Build a Standardized Work Combination Table + Work Chart (layout with movement paths)
- Kaizen cycle: identify waste → propose improvement → update standard → measure results
- *Key component needed:* `StandardWorkBuilder.tsx`, `WorkChartTool.tsx`

### Module 8: Value Stream Mapping (価値流れ図)
- **Current State Mapping:** virtual gemba walk to collect process data; build VSM with standard icons
- System auto-calculates value-added ratio (the "shock moment" — typically <5% VA time)
- **Future State Design:** apply the 8 future state design questions; redesign the value stream
- Visual timeline: value-added (green) vs. non-value-added (red) — dramatic ratio visualization
- *Key component needed:* `VSMBuilder.tsx` (drag-and-drop, icon library, auto-calculation)

### Module 9: Toyota Kata (トヨタ型)
- **Improvement Kata 4-Step Pattern:** understand direction → grasp current condition → target condition → experiment
- **5 Coaching Questions:** AI-powered dialogue where learner practices both coach and learner roles
- **Digital Storyboard:** tracks running experiments with expected vs. actual results
- Daily practice loop — designed to return to each day (15-min cadence)
- *Key component needed:* `CoachingDialogue.tsx`, `KataStoryboard.tsx`

### Module 10: A3 Thinking (A3思考)
- **Guided A3 Builder:** step-by-step digital A3 template — Background → Current Condition → Goal → Root Cause → Countermeasures → Plan → Follow-up
- AI coaching reviews each section draft: "How do you know this is the root cause, not a symptom?"
- **A3 Critique Exercise:** review weak examples, compare to expert critiques
- Fishbone diagram builder + 5-Why branching with consequence visualization
- *Key component needed:* `A3Builder.tsx`, `FishboneBuilder.tsx`

### Module 11: Respect for People (人間性尊重)
- TWI Job Relations 4-Step: Get Facts → Weigh & Decide → Take Action → Check Results
- Branching narrative scenarios: team conflict, underperformance, safety concern, organizational change
- Consequences unfold immediately and over time; scoring on JR principles
- Reflection: "How does this change who is responsible when someone doesn't understand?"
- *Key component needed:* `BranchingScenario.tsx` (reusable from Module 3)

### Module 12: Hoshin Kanri (方針管理)
- **X-Matrix Builder:** connect breakthrough objectives → annual targets → improvement priorities → metrics
- **Catchball Simulation:** multi-perspective — play roles at different organizational levels; experience back-and-forth strategy negotiation
- **Line of Sight:** trace daily kaizen up to strategy; trace strategic objective down to daily task
- *Key component needed:* `XMatrixBuilder.tsx`, `CatchballEngine.tsx`

### Module 13: Cascade Challenge (カスケード統合演習)
Where Gemba meets The Cascade — the capstone exercise applying ALL TPS tools to the supply chain crisis:
1. Observe (Module 1 skills) — examine with gemba data
2. Map (Module 8) — build VSM of the disrupted chain
3. Analyze (Module 10) — complete an A3 on root cause
4. Countermeasure (Modules 4–7) — apply flow, pull, standardized work, jidoka
5. Align (Module 12) — connect to organizational strategy via Hoshin
6. Coach (Module 9) — use Kata questions with a virtual team member
7. Reflect (Module 11) — the people dimension of crisis response
*Scoring dimensions:* Observation depth, Root cause accuracy, Countermeasure quality, Systemic thinking, People focus

### Module 14: Teaching Others (他者への伝授)
The capstone — mastery demonstrated by ability to teach:
- Design a JI breakdown for a TPS concept
- Teach-back practice to a virtual learner (choose what to say/show at each step)
- Coach another learner through a Kata cycle
- Capstone reflection on personal TPS philosophy
*Certification gate:* Belt is awarded by demonstrating ability to teach, not just know

---

## 6. Feature Roadmap

### Phase 1 — Complete Gemba White Belt (Next)
**Goal:** Finish Modules 3 (TWI Foundations) so the White Belt is completable end-to-end.

| Feature | Priority | Effort |
|---------|----------|--------|
| Module 3: TWI Foundations (all 3 steps) | P0 | L |
| `BranchingScenario.tsx` reusable component | P0 | M |
| `JobBreakdownBuilder.tsx` | P0 | M |
| White Belt certification gate (XP threshold + completion check) | P1 | S |
| Belt award animation / celebration moment | P1 | S |

### Phase 2 — Green Belt Process Tools
**Goal:** Build Modules 4–7 (Flow & Pull, Takt, Jidoka, Standardized Work)

| Feature | Priority | Effort |
|---------|----------|--------|
| `SimulationEngine.tsx` — shared multi-round factory simulation framework | P0 | XL |
| Module 4: Flow & Pull (batch vs. flow sim + kanban designer) | P0 | L |
| Module 5: Takt & Heijunka (`TaktCalculator`, `HeijunkaBox`) | P0 | L |
| Module 6: Jidoka & Andon (`AndonSimulator`, `PokaYokeDesigner`) | P0 | L |
| Module 7: Standardized Work (SW chart builder, kaizen cycle) | P0 | L |
| Metrics dashboard (lead time, WIP, quality, cost per sim round) | P1 | M |
| Green Belt certification gate | P1 | S |

### Phase 3 — Blue Belt Advanced Tools
**Goal:** Build Modules 8–11 including the two major builder tools

| Feature | Priority | Effort |
|---------|----------|--------|
| `VSMBuilder.tsx` — drag-and-drop VSM with standard icons + auto-calculations | P0 | XL |
| `A3Builder.tsx` — guided A3 with AI coaching review | P0 | XL |
| Module 8: Value Stream Mapping | P0 | L |
| Module 9: Toyota Kata + `CoachingDialogue.tsx` AI integration | P0 | L |
| Module 10: A3 Thinking + `FishboneBuilder.tsx` | P0 | L |
| Module 11: Respect for People (JR branching scenarios) | P0 | M |
| Daily Practice page (`/gemba/practice`) — 15-min daily Kata cadence | P1 | M |
| Streak tracking + last practice date | P1 | S |
| Reflection Journal with history | P1 | M |
| Blue Belt certification gate | P1 | S |

### Phase 4 — Black Belt Integration
**Goal:** Build Modules 12–14 and close the learning loop

| Feature | Priority | Effort |
|---------|----------|--------|
| Module 12: Hoshin Kanri (`XMatrixBuilder.tsx`) | P0 | L |
| Module 13: Cascade Challenge (full integration capstone) | P0 | XL |
| Module 14: Teaching Others (teach-back engine) | P0 | L |
| Black Belt certification gate | P0 | M |
| Belt certificate generation + PDF export | P1 | M |
| Learner portfolio view (A3 history, Kata experiments, reflections) | P1 | M |

### Phase 5 — Platform & Persistence
**Goal:** Move from localStorage to server-backed persistence; add multi-user features

| Feature | Priority | Effort |
|---------|----------|--------|
| User accounts (lightweight auth — email magic link or SSO) | P0 | L |
| Backend progress persistence (PostgreSQL) — sync across devices | P0 | L |
| `/gemba/progress` — full learning journey dashboard | P0 | M |
| Progress API endpoints (`GET/POST /api/progress/{userId}`) | P0 | M |
| Cross-device sync — localStorage fallback when offline | P1 | M |
| Admin/Analytics dashboard — which modules engage, where learners struggle | P1 | L |
| Facilitator controls for Gemba (assign modules, view team progress) | P1 | L |

### Phase 6 — The Cascade Simulation Expansion
**Goal:** Expand the crisis simulation with additional scenarios and richer mechanics

| Feature | Priority | Effort |
|---------|----------|--------|
| Additional crisis scenarios (scenario 2: quality crisis; scenario 3: logistics disruption) | P0 | L |
| Scenario marketplace / template — enable customers to author their own scenarios | P1 | XL |
| Solo mode — play both roles (AI plays the other persona) | P1 | L |
| 3-player scenarios (add Operations role) | P2 | XL |
| Session recording + debrief replay | P1 | L |
| Time-pressure mechanics — visible countdown with escalating stakes | P1 | M |
| Post-session debrief report (PDF export — what you found, what you missed, key lessons) | P1 | M |
| Clue cross-referencing UI — visual map of how clues connect | P1 | M |
| Red herring tracker — show what was a false lead after escape | P2 | S |

### Phase 7 — Community & Social
**Goal:** Add shared learning features

| Feature | Priority | Effort |
|---------|----------|--------|
| Share A3s — publish an A3 for peer review and commenting | P1 | L |
| Cohort leaderboards (XP, completion, streak) | P2 | M |
| Peer coaching — match Black Belt learners with White Belt learners | P2 | XL |
| Discussion threads per module/step | P2 | M |
| Team challenges — coordinated Gemba walks for entire operations teams | P2 | L |

### Phase 8 — Enterprise & Integration
**Goal:** Make the platform deployable in enterprise training contexts

| Feature | Priority | Effort |
|---------|----------|--------|
| SCORM/xAPI export — integrate with corporate LMS (Cornerstone, SAP SuccessFactors) | P1 | XL |
| SSO / SAML authentication | P1 | L |
| Multi-tenant architecture (each client gets isolated data) | P1 | XL |
| Branded white-label mode (remove "The Cascade" branding, inject customer logo) | P2 | M |
| Batch user enrollment + progress reporting for L&D teams | P1 | L |
| Completion certificates with customer logo + QR-verifiable credential | P2 | M |
| API for LMS webhooks (completion events, scores) | P1 | L |

### Phase 9 — Mobile & Offline
**Goal:** Support plant-floor usage where desktop access may be limited

| Feature | Priority | Effort |
|---------|----------|--------|
| Mobile-responsive Gemba modules (all steps work on phone) | P1 | L |
| Progressive Web App (PWA) — installable, offline capability | P2 | L |
| Native iOS/Android app (React Native or Expo) | P3 | XL |
| Offline module completion sync on reconnect | P2 | L |

---

## 7. AI / Claude Integration Roadmap

The platform already uses Claude (Haiku for hints, Opus for evaluation). Future AI features:

| Feature | Model | Purpose |
|---------|-------|---------|
| Coaching Dialogue (Module 9) | Claude claude-sonnet-4-5 | Socratic Five Questions practice — reads learner's target condition answers and asks follow-up |
| A3 Review Coach (Module 10) | Claude claude-sonnet-4-5 | Reviews each A3 section: "Is this a root cause or a symptom?" |
| Observation Depth Scoring (Module 1) | Claude Haiku | Scores free-text Gemba observations for depth, specificity, waste category coverage |
| Waste Classification | Claude Haiku | Classifies learner's waste identifications against 7-waste framework |
| JR Scenario Outcome Engine | Claude claude-sonnet-4-5 | Evaluates learner's JR decisions; generates realistic consequence narrative |
| Kata Response Quality | Claude claude-sonnet-4-5 | Scores responses to the 5 Coaching Questions |
| Teach-Back Evaluator (Module 14) | Claude Opus | Evaluates learner's teaching — did they use JI method correctly? |
| Adaptive Difficulty | Claude Haiku | Adjusts scenario difficulty based on learner performance signals |
| Debrief Narrative Generator | Claude Opus | Generates personalized post-session debrief reports |

---

## 8. Technical Debt & Known Limitations

| Item | Severity | Notes |
|------|----------|-------|
| No authentication | High | Session IDs are only access control; not for production |
| No server-side progress persistence | High | All Gemba progress in localStorage — lost on browser clear, not cross-device |
| CORS fully open | High | Backend accepts all origins — not production-safe |
| Redis only (no DB persistence beyond TTL) | Medium | Game sessions expire after 24h |
| Single scenario hardcoded at startup | Medium | SCENARIO_PATH env var; no hot swap in prod |
| No input validation on WebSocket | Medium | Trust all client messages |
| No rate limiting on AI endpoints | Medium | Haiku can be called freely |
| `package-lock.json` committed | Low | Fine for now, but consider `.npmrc` settings for production |
| No test suite | Medium | No unit, integration, or E2E tests exist yet |
| Image assets in repo | Low | `chalk-circle-scene.jpg/.png` — consider CDN for larger assets |

---

## 9. UX / Design Tokens

### Belt Color System
| Belt | Color | Hex |
|------|-------|-----|
| White | `#E5E7EB` | white/gray |
| Yellow | `#FCD34D` | amber-300 |
| Orange | `#FB923C` | orange-400 |
| Green | `#4ADE80` | green-400 |
| Blue | `#60A5FA` | blue-400 |
| Brown | `#92400E` | amber-900 |
| Black | `#1F2937` | gray-900 |

### Navigation Hierarchy
```
Lobby (/)
├── Crisis Simulation (/game)
├── TPS Gemba (/gemba)
│   ├── Module 1 (/gemba/module-1)
│   │   ├── Step 1 (/gemba/module-1/step-1)
│   │   ├── Step 2 (/gemba/module-1/step-2)
│   │   └── Step 3 (/gemba/module-1/step-3)
│   └── ... (Modules 2–14)
└── Moderator (/moderator)
```

### Breadcrumb Pattern (ModuleShell)
`Lobby › Gemba › [Module Name]`
Each segment is a clickable link. Module name has a belt-colored indicator pip.

---

## 10. Terminology (用語集)

| English | 日本語 | Used In |
|---------|--------|---------|
| Toyota Production System | トヨタ生産方式 | All modules |
| Gemba | 現場 | Navigation, Module 1 |
| Just-in-Time | ジャスト・イン・タイム | Module 2, 4 |
| Jidoka | 自働化 | Module 2, 6 |
| Kaizen | 改善 | Module 2, 7 |
| Muda / Waste | ムダ | Module 1 |
| Muri / Overburden | ムリ | Module 1 |
| Mura / Unevenness | ムラ | Module 1 |
| Heijunka | 平準化 | Module 5 |
| Takt Time | タクトタイム | Module 5 |
| Andon | アンドン | Module 6 |
| Poka-Yoke | ポカヨケ | Module 6 |
| Kanban | かんばん | Module 4 |
| Standardized Work | 標準作業 | Module 7 |
| Value Stream Mapping | 価値流れ図 | Module 8 |
| Toyota Kata | トヨタ型 | Module 9 |
| A3 Thinking | A3思考 | Module 10 |
| Hoshin Kanri | 方針管理 | Module 12 |
| TWI | TWI (訓練内教育) | Modules 3, 11, 14 |
| Genchi Genbutsu | 現地現物 | Module 1 |
| Hansei | 反省 | Reflection steps |
| Kata | 型 | Module 9 |

---

## 11. Success Metrics

### Engagement
- Module completion rate (target: >60% of started modules completed)
- Daily active learners (target: 15+ min/day for streak learners)
- Streak retention (% of learners maintaining 7-day streak)
- Average observation depth score (Module 1 — measures quality of gemba thinking)

### Learning Outcomes
- Belt completion rates by level (White → Green → Blue → Black funnel)
- A3 quality improvement across revisions (AI-scored)
- Kata response quality progression over multiple sessions
- Crisis simulation escape rate + average score (by team)

### Platform
- Time to first meaningful interaction (<3 min from landing to first step)
- Session length distribution (target: 15–20 min Gemba sessions)
- Error rate on AI coaching endpoints
- Cross-device sync reliability (post-Phase 5)

---

## 12. Source Materials & Inspiration

### Legacy Content
- "Introduction to TPS" — Participant Guide, Course #030011, Revised 2/2004 (Dependency International)

### Academic / Practitioner Sources
- *Toyota Kata* — Mike Rother (Improvement Kata & Coaching Kata)
- *Training Within Industry* — WWII-era JI, JR, JM programs
- *The Toyota Way* — Jeffrey Liker (14 Principles, 4P Model)
- *A3 Thinking* — Sobek & Smalley
- *Learning to See* — Rother & Shook (Value Stream Mapping)
- Taiichi Ohno's chalk circle teaching method
- Hoshin Kanri with X-Matrix

### Competitive Landscape
- Gemba Academy — video-based lean training
- Zensimu — lean simulation games
- KaiNexus — continuous improvement software (not training-focused)
- LEI (Lean Enterprise Institute) — workshops and certification

### What Differentiates The Cascade
1. **Simulation-first** — not video-watching, but doing
2. **AI coaching** — Socratic questions powered by Claude, not canned feedback
3. **Crisis simulation + curriculum linked** — Module 13 bridges both surfaces
4. **Bilingual EN/JA** — correct Japanese terminology from birth
5. **Ohno philosophy** — observe before act, struggle before understand
6. **Belt progression** — clear mastery pathway, not completion certificates

---

*Last updated: 2026-03-02. This is a living document — update after each major feature release.*
