# Dojo TPS Experience — Comprehensive Design & Implementation Plan

**Date:** 2026-02-27
**Purpose:** Transform dated 2004 TPS training content into world-class interactive Dojo learning experiences
**Platform:** The Cascade (Next.js / WebSocket)
**Languages:** EN / JA (bilingual)

---

## Part 1 — Legacy Content Audit

### What the 2004 Manual Covers (Course #030011)

| PDF Page | Topic | Format |
|----------|-------|--------|
| 1 | Title — "Introduction to TPS" | Cover |
| 3 | Debriefing — Car Simulation Cost Analysis | Worksheet |
| 5 | Flow of the Course | Agenda slide |
| 7 | Pre-Test — match TPS terms to definitions | Fill-in-blank |
| 9 | TPS Overview — process flow diagram | Fill-in-blank |
| 11 | TPS House — JIT + Jidoka pillars | Diagram + fill-in |
| 13 | Heijunka — leveled production volumes | Diagram |
| 15 | Leveled Production — mixed model line | Diagram |
| 17 | Separately Positioned Processing / JIT flow | Reflection |
| 19 | Takt Time — formula + Camry example (57s) | Calculation |
| 21 | Jidoka — Andon board, cord, team leader | Diagram + text |
| 23 | Standardized Work — basis for Kaizen | Diagram + text |
| 25 | Round 2 Simulation — Land Cruiser Assembly | Station assignments |
| 27 | Concept of Muda — Muda, Muri, Mura | Fill-in + explanation |
| 29 | Standardized Work & Kaizen — people emphasis | Text + question |
| 31 | Kaizen Break | Transition slide |
| 33 | Discussions — Compare 3 Rounds, Reflection | Debrief questions |
| 35 | TPS: Myth vs. Reality | Two-column table |
| 37 | Reflection Points — re-engineer your job | Closing prompts |

### What the Manual Does Well

1. **Simulation-based learning** — The 3-round Land Cruiser assembly is genuinely experiential
2. **Progressive revelation** — Theory is sandwiched between simulation rounds, creating "aha" moments
3. **Core concepts present** — TPS House, JIT, Jidoka, Heijunka, Takt Time, Standardized Work, Muda/Muri/Mura
4. **Reflection points** — Prompts exist for personal connection
5. **Cost analysis debrief** — Quantitative comparison across rounds grounds the learning in data

### What the Manual Gets Wrong (or Misses Entirely)

| Gap | Severity | Notes |
|-----|----------|-------|
| **No Toyota Kata** | Critical | Didn't exist in 2004 — now the gold standard for building scientific thinking habits |
| **No TWI foundations** | Critical | The WWII-era bedrock Toyota still uses — completely absent |
| **No A3 Thinking** | Critical | No structured problem-solving methodology taught |
| **No Genchi Genbutsu practice** | High | Mentioned implicitly but never practiced or developed as a skill |
| **No Value Stream Mapping** | High | The most powerful "seeing the whole" tool — missing entirely |
| **No Hoshin Kanri** | Medium | No connection from daily kaizen to organizational strategy |
| **No Ohno teaching philosophy** | High | The manual *lectures* — the opposite of how Ohno taught |
| **Passive fill-in-blanks** | High | Learners fill in words rather than think, observe, or decide |
| **No coaching model** | Critical | Instructor-led lecture with no coaching methodology |
| **Surface-level Myth vs Reality** | Medium | Good concept, poor execution — no depth or examples |
| **No people/culture dimension** | High | Brief mention that "people are the most important element" — no actual development |
| **No digital interactivity** | Foundational | 2004 paper-based format needs complete transformation |
| **Static, one-pass experience** | Medium | No daily practice, no spaced repetition, no progressive mastery |
| **No bilingual delivery** | Medium | English only — our platform requires EN/JA |

---

## Part 2 — Design Philosophy

### The Ohno Standard

> "Having no problems is the biggest problem of all."

The Dojo experience must teach the way Ohno taught: through **observation before action**, **questions not answers**, **struggle before understanding**, and **respect through high expectations**. The learner discovers — the system coaches.

### Five Design Principles

1. **Observe → Think → Act → Reflect** — Every module follows this cycle, never jumps to answers
2. **Coaching over lecturing** — The Dojo asks questions (Socratic/Kata style), never simply presents information
3. **Progressive mastery** — Belt-like progression from white (foundations) through levels of demonstrated competency
4. **Daily practice cadence** — Designed for 15–20 minute daily sessions (Toyota Kata rhythm), not marathon workshops
5. **Bilingual from birth** — Every piece of content exists in both EN and JA, with correct terminology (漢字 for TPS terms)

### The Learning Journey Structure (Toyota Way 4P Progression)

```
FOUNDATION (白帯 White Belt)
├── Module 1: The Eyes of Ohno — Observation & Seeing Waste
├── Module 2: The TPS House — Architecture of a System
└── Module 3: TWI Foundations — How Toyota Teaches

PROCESS (緑帯 Green Belt)
├── Module 4: Flow & Pull — From Batch to One-Piece
├── Module 5: Takt, Heijunka & Leveling — The Heartbeat
├── Module 6: Jidoka & Andon — Quality at the Source
├── Module 7: Standardized Work — The Basis for Kaizen
└── Module 8: Value Stream Mapping — Seeing the Whole

PEOPLE (青帯 Blue Belt)
├── Module 9: The Coaching Kata — Developing Others
├── Module 10: A3 Thinking — Structured Problem Solving
└── Module 11: Respect for People — TWI Job Relations

PROBLEM SOLVING (黒帯 Black Belt)
├── Module 12: Hoshin Kanri — Strategy to Daily Work
├── Module 13: The Cascade Challenge — Full Integration
└── Module 14: Teaching Others — The Multiplier
```

---

## Part 3 — Module Designs

### Module 1: The Eyes of Ohno (大野の眼) — Observation & Seeing Waste

**Legacy equivalent:** Pre-test matching exercise (p.7), Muda concept (p.27)
**Uplift philosophy:** Replace passive matching with active observation challenges

**Experience Flow:**

1. **The Chalk Circle** (観察の円)
   - Interactive: A virtual production process plays on screen (animated or video)
   - The learner is told only: "Watch. What do you see?"
   - After 2 minutes, they write observations in a free-text field
   - The system responds with Ohno-style coaching: "What else?" / "Look again."
   - After 3 rounds of observation, the system reveals layers of waste the learner may have missed
   - Scoring: depth and specificity of observations, not just count

2. **Seven Wastes Discovery** (七つのムダ)
   - NOT a definition list — instead, interactive scenes where learners must *identify* each waste type
   - Progressive difficulty: obvious → subtle → systemic
   - Each waste connects to the broader Muda/Muri/Mura framework
   - Learner builds their own waste dictionary from observations

3. **Five Whys Drill** (なぜなぜ分析)
   - Present a problem symptom from a simulated factory
   - Learner must ask and answer "Why?" iteratively
   - Branching paths: shallow analysis leads to ineffective countermeasures; deep analysis reveals root causes
   - Visual "root tree" grows as learner digs deeper

**Interactive elements:**
- Timed observation challenges with scoring
- "Spot the waste" image/video exercises with progressive reveals
- Free-text reflection journal entries
- AI coaching responses that push deeper thinking

---

### Module 2: The TPS House (TPSの家) — Architecture of a System

**Legacy equivalent:** TPS House diagram (p.11), TPS Overview (p.9)
**Uplift philosophy:** Transform passive diagram into an interactive building experience

**Experience Flow:**

1. **Build the House** (家を建てる)
   - Learner receives scattered TPS components (cards/blocks): JIT, Jidoka, Heijunka, Standardized Work, Kaizen, Customer Goals
   - They must arrange them into the correct TPS House structure
   - Wrong placements trigger coaching questions: "Why did you put Kaizen there? What is the relationship between standardization and improvement?"
   - Multiple valid arrangements spark discussion of *why* Toyota chose this structure

2. **The Foundation Challenge**
   - Interactive scenario: "What happens when you try to build JIT on an unstable foundation?"
   - Simulation where removing standardized work causes the "house" to collapse
   - Demonstrates why sequence matters: stability → flow → improvement

3. **Pillar Deep Dives**
   - Each pillar (JIT, Jidoka) has a mini-scenario showing how it works in practice
   - Cross-references to dedicated modules (4-8) for deeper learning

**Interactive elements:**
- Drag-and-drop house builder with physics feedback
- "What if?" scenarios that demonstrate systemic connections
- Bilingual terminology explorer (hover for JA/EN definitions)

---

### Module 3: TWI Foundations (TWIの基盤) — How Toyota Teaches

**Legacy equivalent:** None — completely new content
**Uplift philosophy:** Introduce the WWII-era methodology that became Toyota's teaching DNA

**Experience Flow:**

1. **The Instructor's Credo**
   - Opens with the TWI principle: "If the worker hasn't learned, the instructor hasn't taught"
   - Reflection prompt: "How does this change who is responsible when someone doesn't understand?"

2. **Job Instruction (JI) Simulator** (作業指導)
   - Watch a video of a process being taught — rate the instruction quality
   - Then: learner must break down a simple task into Steps → Key Points → Reasons
   - Interactive job breakdown sheet builder
   - Practice: teach the process to a virtual learner (choose what to say/show at each step)
   - Virtual learner responds realistically — skipping key points causes errors

3. **Job Methods (JM) Workshop** (作業改善)
   - Present a process; learner questions every detail (Why? What? Where? When? Who? How?)
   - Use Eliminate → Combine → Rearrange → Simplify framework
   - Before/after comparison with expert solution
   - Quantify the improvement

4. **Job Relations (JR) Scenarios** (人間関係)
   - Branching narrative scenarios: a team member is struggling, a conflict arises, a change is coming
   - Learner chooses responses; consequences unfold
   - Scoring on the TWI JR method: Get facts → Weigh & decide → Take action → Check results

**Interactive elements:**
- Video-based instruction critique exercises
- Job breakdown sheet builder tool
- Branching narrative decision trees
- Scored JR scenario outcomes

---

### Module 4: Flow & Pull (流れと引き) — From Batch to One-Piece

**Legacy equivalent:** Separately Positioned Processing (p.17), Continuous Flow (p.19), Simulation Rounds
**Uplift philosophy:** Replace fill-in-blanks with an interactive factory simulation

**Experience Flow:**

1. **Batch vs. Flow Simulation**
   - Digital version of the legacy Land Cruiser simulation concept
   - Round 1: Batch processing — learner operates a station, experiences WIP buildup, waiting, quality issues
   - Round 2: Introduction of flow — one-piece flow experiment, dramatic improvement in lead time
   - Round 3: Pull system — kanban signals, customer-paced production
   - After each round: data dashboard showing lead time, WIP, quality, cost
   - Coaching questions between rounds: "What changed? Why did it improve?"

2. **Pull System Builder**
   - Interactive exercise: design a kanban system for a simple process
   - Set kanban quantities, trigger points, replenishment rules
   - Run the simulation and see if the pull system works under varying demand
   - Iterate and improve

3. **The Supermarket Concept**
   - Visual explanation of supermarket-style inventory management
   - Interactive: learner manages a supermarket buffer, making decisions about when to replenish
   - Experience the tension between too much inventory (waste) and stockout (failure)

**Interactive elements:**
- Multi-round factory simulation with real-time metrics dashboard
- Kanban system designer with run/test capability
- Inventory management micro-game
- Round comparison analytics

---

### Module 5: Takt, Heijunka & Leveling (タクトと平準化) — The Heartbeat

**Legacy equivalent:** Takt Time formula (p.19), Heijunka (p.13-15)
**Uplift philosophy:** Move from static formulas to dynamic, visual understanding

**Experience Flow:**

1. **Takt Time Calculator** (タクトタイム)
   - Interactive: input operating time and customer demand → calculate takt time
   - Then: apply to a real scenario (not just Camry) — the learner's own context
   - Visualization: heartbeat animation that speeds up/slows down with takt
   - Challenge: "What happens when demand changes? How does takt respond?"

2. **Heijunka Box Simulation** (平準化ボックス)
   - Visual heijunka box with product cards
   - Learner must level both volume AND mix across time slots
   - Start with 2 products, progress to 5+ products with varying demand
   - Show impact on upstream processes: leveled schedule = stable demand signal

3. **Leveling Impact Game**
   - Side-by-side comparison: unleveled vs. leveled production
   - Learner sees inventory waves, overtime spikes, quality variation in unleveled
   - Learner sees smooth flow, predictable workload, consistent quality in leveled
   - Quiz: identify which production schedule is leveled

**Interactive elements:**
- Dynamic takt calculator with visual heartbeat
- Drag-and-drop heijunka box builder
- Split-screen production comparison simulator
- "What if" demand variation scenarios

---

### Module 6: Jidoka & Andon (自働化とアンドン) — Quality at the Source

**Legacy equivalent:** Jidoka page (p.21)
**Uplift philosophy:** Bring the Andon cord into the learner's hands

**Experience Flow:**

1. **The Andon Decision** (アンドン判断)
   - Simulation: learner operates a station on a moving production line
   - Defects appear — some obvious, some subtle
   - Learner must decide: pull the Andon cord or let it pass?
   - Consequence engine: letting defects pass causes downstream failures; pulling Andon stops the line but catches the problem
   - Psychological element: "Do you feel safe pulling the cord?" — explores the cultural requirement

2. **Build Quality In** (品質を工程に作り込む)
   - Interactive process design: add error-proofing (poka-yoke) devices to a process
   - Before/after defect rate comparison
   - Types of poka-yoke: contact, counting, motion-step

3. **The Real Meaning of Autonomation** (自働化の真意)
   - Etymology exercise: 自動化 (automation) vs 自働化 (autonomation) — the added 人 (human) radical
   - Historical connection to Sakichi Toyoda's automatic loom
   - Interactive: separate "machine can detect" from "human must judge" decisions

**Interactive elements:**
- Real-time production line simulation with Andon cord
- Poka-yoke design challenge
- Kanji exploration for autonomation concept
- Decision-speed scoring under time pressure

---

### Module 7: Standardized Work (標準作業) — The Basis for Kaizen

**Legacy equivalent:** Standardized Work pages (p.23, p.29)
**Uplift philosophy:** Don't just define it — have the learner CREATE and IMPROVE standardized work

**Experience Flow:**

1. **Create Standard Work** (標準作業の作成)
   - Watch a process video, document: takt time, work sequence, standard WIP
   - Build a Standardized Work Combination Table
   - Build a Standardized Work Chart (layout diagram with worker movement paths)
   - Compare to expert version — coaching questions on differences

2. **The Kaizen Cycle** (改善サイクル)
   - Given established standard work, identify waste (connecting to Module 1 skills)
   - Propose improvement → update the standard → measure results
   - Key lesson: "Without a standard, there is no kaizen" — if you change random things, you can't tell what helped
   - Before/after standard work comparison showing eliminated waste

3. **The Critical Question** (from p.23)
   - "What happens if we try to Kaizen before standardization?" — interactive scenario
   - Simulation: improvement attempts without standardization → chaos, regression
   - Simulation: improvement attempts WITH standardization → measurable progress

**Interactive elements:**
- Standardized Work Combination Table builder
- Standardized Work Chart (layout diagram) with drag-and-drop worker paths
- Process video analysis with timestamp marking
- Kaizen proposal → measure → standardize cycle

---

### Module 8: Value Stream Mapping (バリューストリームマッピング) — Seeing the Whole

**Legacy equivalent:** None — completely new content
**Uplift philosophy:** Teach the most powerful "whole system" visualization tool

**Experience Flow:**

1. **Current State Mapping** (現状マップ)
   - Virtual gemba walk: navigate a factory, collect data at each process step
   - Build a VSM using drag-and-drop standard icons
   - System auto-calculates value-added ratio (typically reveals <5% VA time)
   - The "shock moment": seeing how little time actually adds value

2. **Future State Design** (理想状態の設計)
   - Given a current state map, apply the 8 future state design questions
   - Learner redesigns the value stream using lean principles
   - Compare to expert future state — coaching on differences

3. **The Timeline Revelation** (タイムライン)
   - Interactive timeline builder: value-added time (green) vs. non-value-added (red)
   - Dramatically visual ratio — the "aha" of why lean matters
   - Calculate: if we eliminated all waste, what would lead time become?

**Interactive elements:**
- Drag-and-drop VSM builder with standard icons
- Virtual factory walkthrough for data collection
- Auto-calculated value-added ratio with visual timeline
- 8 future state questions as guided wizard

---

### Module 9: The Coaching Kata (コーチングカタ) — Developing Others

**Legacy equivalent:** None — completely new content
**Uplift philosophy:** The most important modern addition — teaching the practice of scientific thinking

**Experience Flow:**

1. **The Five Questions** (五つの質問)
   - Learn the Coaching Kata five questions through practice, not lecture
   - Given a scenario, practice asking the questions (and recognizing good vs. poor answers)
   - Role-play: learner plays both coach and learner roles

2. **Improvement Kata Practice** (改善カタの練習)
   - Scenario: current condition described with data
   - Learner must: understand direction → grasp current condition → set next target condition → propose experiment
   - Track experiments on a digital storyboard
   - Daily practice loop: return each day to check experiment results and set next step

3. **Coaching Dialogue Simulator**
   - AI-powered coach asks the five questions
   - Learner responds; coach provides Socratic feedback
   - Practices the 20-minute daily coaching cadence
   - Track improvement in response quality over time

**Interactive elements:**
- Digital storyboard with experiment tracking
- AI coaching dialogue with Five Questions
- Role-play scenarios (play both coach and learner)
- Daily practice reminders and streak tracking

---

### Module 10: A3 Thinking (A3思考) — Structured Problem Solving

**Legacy equivalent:** None — completely new content

**Experience Flow:**

1. **Guided A3 Builder** (A3ビルダー)
   - Step-by-step digital A3 template with coaching prompts at each section
   - Background → Current Condition → Goal → Root Cause → Countermeasures → Plan → Follow-up
   - AI coaching reviews drafts: "How do you know this is the root cause, not a symptom?"
   - Multiple revision cycles required before "submission"

2. **A3 Critique Exercise** (A3の批評)
   - Review weak A3 examples — identify what's missing or shallow
   - Compare to expert critiques
   - Scoring on analytical depth

3. **Root Cause Deep Dives**
   - 5-Why interactive exercises with branching consequences
   - Fishbone diagram builder
   - Show how shallow analysis → ineffective countermeasures

**Interactive elements:**
- Digital A3 builder with AI coaching feedback
- Peer review capability (share A3s with other learners)
- 5-Why branching drill with consequence visualization
- A3 portfolio tracker showing growth over time

---

### Module 11: Respect for People (人間尊重) — TWI Job Relations

**Legacy equivalent:** Brief mention (p.29) — "People are by far the most important element"
**Uplift philosophy:** Transform a throwaway sentence into a practiced leadership skill

**Experience Flow:**

1. **The TWI JR Method** (人間関係の方法)
   - The 4-step framework: Get Facts → Weigh & Decide → Take Action → Check Results
   - Pocket card reference (digital version)

2. **Branching Scenarios** (シナリオ)
   - Realistic workplace narratives: team conflict, underperformance, organizational change, safety concerns
   - Learner makes decisions at each branch point
   - Consequences play out — some immediately, some over time
   - Scoring on JR principles: did you get all the facts? Did you consider the whole person?

3. **The Respect Test**
   - Reflection exercise: "In the past week, how did you show respect for someone's expertise?"
   - Connection to Ohno's philosophy: high expectations ARE respect

**Interactive elements:**
- Multi-path narrative scenarios with delayed consequences
- JR pocket card digital reference
- Reflection journal with guided prompts
- Peer discussion prompts

---

### Module 12: Hoshin Kanri (方針管理) — Strategy to Daily Work

**Legacy equivalent:** None

**Experience Flow:**

1. **X-Matrix Builder** (X マトリクス)
   - Interactive tool: connect breakthrough objectives → annual targets → improvement priorities → metrics
   - See how daily work connects to organizational purpose

2. **Catchball Simulation** (キャッチボール)
   - Multi-perspective exercise: play roles at different organizational levels
   - Experience the back-and-forth dialogue of strategy deployment
   - Practice negotiating between ambition and feasibility

3. **Line of Sight** (見通し)
   - Given a strategic objective, trace the cascade down to a daily task
   - Reverse: given a daily kaizen improvement, trace its contribution upward to strategy
   - "Why does this improvement matter?" — always answerable

**Interactive elements:**
- Interactive X-Matrix with drag-and-drop connections
- Multi-role catchball dialogue exercise
- Strategy cascade visualization tool

---

### Module 13: The Cascade Challenge (カスケード・チャレンジ) — Full Integration

**Legacy equivalent:** The 3-round simulation concept — but elevated dramatically

This is where Dojo meets The Cascade's existing crisis simulation format. The learner faces a **supply chain crisis scenario** (similar to the Apex Dynamics scenario in the main game) but approaches it using ALL the TPS tools they've learned:

1. **Observe** (Module 1 skills) — Examine the situation through gemba data, not reports
2. **Map** (Module 8) — Build a value stream map of the disrupted supply chain
3. **Analyze** (Module 10) — Complete an A3 on the root cause of the crisis
4. **Countermeasure** (Modules 4-7) — Apply flow, pull, leveling, standardized work, jidoka
5. **Align** (Module 12) — Connect the solution to organizational strategy via Hoshin
6. **Coach** (Module 9) — Use Kata questions to help a virtual team member understand and improve
7. **Reflect** (Module 11) — Consider the people dimension of the crisis response

**Scoring dimensions:** Observation depth, Root cause accuracy, Countermeasure quality, Systemic thinking, People focus

---

### Module 14: Teaching Others (他者を教える) — The Multiplier

**Legacy equivalent:** None

The capstone: learners demonstrate mastery by teaching. Following the TWI multiplier model:

1. **Create a lesson** on any TPS concept for a new learner
2. **Use the JI method** (prepare → present → try out → follow up)
3. **Coach** another learner through a Kata cycle
4. **Facilitate** a mini kaizen event using A3 thinking

Certification: learner earns their "belt" level by demonstrating ability to teach, not just know.

---

## Part 4 — App Architecture Updates

### New Routes & Pages

```
/dojo                       → Dojo landing / module selector
/dojo/[moduleId]            → Module experience page
/dojo/[moduleId]/[stepId]   → Step within module
/dojo/progress              → Learning journey dashboard
/dojo/practice              → Daily Kata practice page
/dojo/a3                    → A3 builder tool
/dojo/vsm                   → VSM builder tool
```

### New Components

| Component | Purpose |
|-----------|---------|
| `DojoLanding.tsx` | Module grid with belt progression, lock/unlock states |
| `ModuleShell.tsx` | Shared layout for all modules: sidebar progress, content area, coaching panel |
| `ObservationChallenge.tsx` | Timed observation exercise with free-text + scoring |
| `CoachingDialogue.tsx` | Socratic question/response interface (AI-powered or scripted) |
| `SimulationEngine.tsx` | Multi-round production simulation with metrics dashboard |
| `VSMBuilder.tsx` | Drag-and-drop value stream mapping tool |
| `A3Builder.tsx` | Step-by-step A3 template with coaching prompts |
| `StoryboardTracker.tsx` | Kata experiment storyboard (digital) |
| `HeijunkaBox.tsx` | Interactive leveling exercise |
| `AndonSimulator.tsx` | Production line with pull-the-cord mechanic |
| `BranchingScenario.tsx` | Multi-path narrative engine for JR/decision exercises |
| `JobBreakdownBuilder.tsx` | TWI JI — task decomposition tool |
| `XMatrixBuilder.tsx` | Hoshin Kanri interactive X-Matrix |
| `BeltProgress.tsx` | Learning journey visualization (belt progression) |
| `DailyPractice.tsx` | 15-min Kata practice page with streak tracking |
| `ReflectionJournal.tsx` | Guided reflection with history |
| `WasteSpotter.tsx` | "Spot the waste" image/video challenge |
| `TaktCalculator.tsx` | Dynamic takt time calculator with visual heartbeat |

### Shared Libraries

| Library | Purpose |
|---------|---------|
| `lib/dojo/modules.ts` | Module definitions, step sequences, unlock logic |
| `lib/dojo/progress.ts` | Belt progression, XP, completion tracking (localStorage + optional API) |
| `lib/dojo/coaching.ts` | Coaching dialogue scripts, Socratic question banks |
| `lib/dojo/simulation.ts` | Production simulation engine (flow, pull, batch calculations) |
| `lib/dojo/scoring.ts` | Observation depth scoring, A3 quality assessment, Kata response quality |
| `lib/dojo/vsm-icons.ts` | VSM standard icon definitions and layout logic |
| `lib/dojo/i18n-dojo.ts` | Dojo-specific EN/JA translations (extends existing i18n) |

### Data Model (localStorage-first, API-optional)

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

interface ObservationEntry {
  moduleId: string;
  challengeId: string;
  observations: string[];
  score: number;
  timestamp: string;
}

interface A3Draft {
  id: string;
  title: string;
  sections: Record<A3Section, string>;
  revisionCount: number;
  coachingFeedback: string[];
  status: 'draft' | 'submitted' | 'reviewed';
  createdAt: string;
  updatedAt: string;
}

interface KataExperiment {
  id: string;
  targetCondition: string;
  currentCondition: string;
  obstacle: string;
  nextStep: string;
  expectedResult: string;
  actualResult: string | null;
  date: string;
}
```

### Navigation Integration

The Dojo is accessed from the main app navigation — a sibling to the Game:

```
┌─────────────────────────────────────┐
│  The Cascade                        │
│  ┌──────┐  ┌──────┐  ┌──────────┐  │
│  │ Game │  │ Dojo │  │ Moderate │  │
│  └──────┘  └──────┘  └──────────┘  │
└─────────────────────────────────────┘
```

The existing `KataPanel.tsx` in the game sidebar becomes a **gateway** — it links to the full Dojo module for each topic.

---

## Part 5 — Implementation Phases

### Phase 1: Foundation (Weeks 1-3)

**Deliverables:**
- [ ] `/dojo` landing page with module grid and belt visualization
- [ ] `ModuleShell.tsx` — shared module layout
- [ ] `DojoProgress` data model + localStorage persistence
- [ ] `lib/dojo/i18n-dojo.ts` — bilingual translations for all Dojo content
- [ ] Module 1: Eyes of Ohno (observation challenges, waste spotter, 5-Why drill)
- [ ] Module 2: TPS House (interactive builder, foundation challenge)
- [ ] `BeltProgress.tsx` component
- [ ] Connect `KataPanel.tsx` sidebar links → Dojo modules

### Phase 2: Process Tools (Weeks 4-7)

**Deliverables:**
- [ ] Module 4: Flow & Pull (batch vs. flow simulation, kanban designer)
- [ ] Module 5: Takt & Heijunka (calculator, heijunka box, leveling game)
- [ ] Module 6: Jidoka & Andon (production line sim with Andon cord)
- [ ] Module 7: Standardized Work (SW chart builder, kaizen cycle)
- [ ] `SimulationEngine.tsx` — shared multi-round simulation framework
- [ ] `TaktCalculator.tsx`, `HeijunkaBox.tsx`, `AndonSimulator.tsx`
- [ ] Metrics dashboard for simulation rounds

### Phase 3: Advanced Tools (Weeks 8-10)

**Deliverables:**
- [ ] Module 8: VSM (`VSMBuilder.tsx` with drag-and-drop, data collection, timeline)
- [ ] Module 3: TWI Foundations (JI simulator, JM workshop, JR scenarios)
- [ ] `BranchingScenario.tsx` — reusable narrative engine
- [ ] `JobBreakdownBuilder.tsx`
- [ ] `VSMBuilder.tsx` with standard icon library

### Phase 4: People & Problem Solving (Weeks 11-14)

**Deliverables:**
- [ ] Module 9: Coaching Kata (Five Questions, storyboard, AI coaching dialogue)
- [ ] Module 10: A3 Thinking (guided builder, critique exercises, 5-Why branching)
- [ ] Module 11: Respect for People (JR scenarios, reflection journal)
- [ ] `CoachingDialogue.tsx`, `A3Builder.tsx`, `StoryboardTracker.tsx`
- [ ] `DailyPractice.tsx` — 15-min daily Kata practice page with streak tracking
- [ ] `ReflectionJournal.tsx`

### Phase 5: Integration & Capstone (Weeks 15-17)

**Deliverables:**
- [ ] Module 12: Hoshin Kanri (`XMatrixBuilder.tsx`, catchball simulation)
- [ ] Module 13: Cascade Challenge (full integration exercise using all tools)
- [ ] Module 14: Teaching Others (create lesson, coach a learner, facilitate kaizen)
- [ ] Belt certification system with demonstrated competency gates
- [ ] Polish, testing, cross-module linking

### Phase 6: Continuous Improvement (Ongoing)

- [ ] Analytics: track which modules engage most, where learners struggle
- [ ] Community features: share A3s, compare observations, peer coaching
- [ ] Content expansion: industry-specific scenarios, advanced topics
- [ ] API backend for cross-device progress sync (if warranted by usage)

---

## Part 6 — Content Principles for Honoring the Toyota Founders

### Taiichi Ohno (大野耐一) Would Want:
- **Observation before everything** — never skip the "go and see" step
- **Questions, not answers** — the system coaches through inquiry
- **Discomfort is learning** — don't make it too easy; struggle produces understanding
- **Waste must be felt, not just defined** — simulation rounds create visceral experience
- **The Five Whys always** — never accept the first answer

### Sakichi Toyoda (豊田佐吉) Would Want:
- **Autonomation (自働化)** — machines serve humans, not the other way around
- **Built-in quality** — teach the mindset that defects should be impossible, not just detected
- **Invention through observation** — the automatic loom came from watching weavers struggle

### Kiichiro Toyoda (豊田喜一郎) Would Want:
- **Just-in-Time as philosophy** — not just a technique, but a way of respecting resources
- **The courage to try** — Toyota's move from looms to cars required enormous risk
- **Learning from failure** — early Toyota cars were terrible; improvement never stopped

### Eiji Toyoda (豊田英二) Would Want:
- **Respect for every worker's ideas** — the suggestion system that generated millions of improvements
- **Long-term thinking** — never sacrifice the future for this quarter
- **Global vision with local roots** — bilingual delivery honors this philosophy

### The Standard: Would They Recognize This?

Every piece of Dojo content should pass this test:
**"If Taiichi Ohno walked into this digital Dojo, would he recognize his teaching philosophy at work?"**

The answer must be yes — not because of Toyota logos or Japanese terminology, but because the learner is observing before acting, questioning before answering, struggling before understanding, and respecting the people who do the work.

---

## Appendix A — Terminology Reference (用語集)

| English | 日本語 | Meaning |
|---------|--------|---------|
| Toyota Production System | トヨタ生産方式 | Toyota's integrated manufacturing system |
| Just-in-Time | ジャスト・イン・タイム | Produce only what is needed, when needed |
| Jidoka | 自働化 | Autonomation — automation with a human touch |
| Kaizen | 改善 | Continuous improvement |
| Muda | ムダ (無駄) | Waste — non-value-adding activity |
| Muri | ムリ (無理) | Overburden — pushing beyond natural limits |
| Mura | ムラ (斑) | Unevenness — variation and inconsistency |
| Heijunka | 平準化 | Production leveling |
| Takt Time | タクトタイム | Customer demand rhythm |
| Andon | アンドン (行灯) | Signal lamp — visual management system |
| Genchi Genbutsu | 現地現物 | Go and see the real place, real thing |
| Hoshin Kanri | 方針管理 | Policy/strategy deployment |
| Standardized Work | 標準作業 | Documented best current method |
| Poka-Yoke | ポカヨケ | Error-proofing |
| Kanban | かんばん (看板) | Signal card for pull system |
| Gemba | 現場 | The actual place where work happens |
| Hansei | 反省 | Deep reflection |
| Nemawashi | 根回し | Consensus building |
| Kata | 型 | Practice routine / form |
| Obeya | 大部屋 | Big room — visual management space |

---

## Appendix B — Source Materials

### Legacy
- "Introduction to TPS" — Participant Guide, Course #030011, Revised 2/2004

### Modern Research Sources
- Toyota Kata (Mike Rother) — Improvement Kata & Coaching Kata
- Training Within Industry (TWI) — JI, JR, JM programs
- The Toyota Way (Jeffrey Liker) — 14 Principles, 4P Model
- A3 Thinking (Sobek & Smalley) — Structured problem solving
- Genchi Genbutsu — Toyota's "go and see" philosophy
- TSSC, LEI, Shingo Institute — Modern training methodologies
- Zensimu, Gemba Academy — Digital lean training platforms
- Taiichi Ohno's chalk circle teaching method
- Hoshin Kanri — Strategy deployment with X-Matrix
- Value Stream Mapping (Rother & Shook, "Learning to See")

Full research summary: `docs/TPS_Modern_Training_Research_Summary.md`
