# The Cascade — AI Crisis Simulation POC

A web-based corporate escape room that trains executives in practical AI/GenAI tool usage. Players must identify a cascading financial failure that has halted a Tier-1 automotive supplier — using Claude, ChatGPT, or any AI assistant to analyze documents and collaborate in real time.

## Scenario

> **Apex Precision Parts (APP)** — your sole-source brake component supplier — has gone completely dark. No shipments for 18 days. Assembly lines are 48 hours from stoppage at **$480,000/hour**.

Two players each hold different pieces of the puzzle:

| Role | Data Access |
|------|-------------|
| **Supply Chain Manager** | Shipment logs, inventory data, supplier contacts, logistics reports |
| **Finance Analyst** | AR aging reports, credit risk files, bank alerts, payment memos |

Neither player can solve it alone. Collaboration through the War Room is required.

### Root Cause (Spoiler)

A well-intentioned Net-30→Net-60 payment terms extension, combined with a 23% steel price spike, pushed APP's EBITDA/Interest ratio below its bank covenant threshold (2.5x). First Industrial Bank froze their $10M revolving credit facility. APP can't buy raw materials. They can't tell you because revealing a credit default would breach their bank agreement.

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, WebSockets
- **Backend**: Python 3.11, FastAPI, WebSockets, Anthropic SDK
- **AI**: Claude claude-haiku-4-5 (hints), claude-opus-4-5 (evaluation + debrief)
- **State**: Redis (session storage)
- **Infrastructure**: Docker Compose

---

## Prerequisites

- Docker Desktop
- An Anthropic API key with access to Claude claude-haiku-4-5 and claude-opus-4-5

---

## Quick Start

### 1. Clone and configure

```bash
git clone <repo>
cd the-cascade
cp .env.example .env
```

Edit `.env` and set your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 2. Start all services

```bash
docker compose up --build
```

First build takes a few minutes. Subsequent starts are fast.

Services:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Redis: localhost:6379

### 3. Play

**Option A — Two browser windows (solo)**
1. Open http://localhost:3000 in Window 1
2. Click **Start New Session** → choose **Supply Chain Manager** → **Create Session**
3. Copy the 8-character session ID from the URL bar
4. Open http://localhost:3000 in Window 2 (or incognito)
5. Click **Join Existing Session** → paste the session ID → choose **Finance Analyst** → **Join**
6. Both windows will activate simultaneously

**Option B — Two players on a network**
1. Player 1 starts a session and shares the session ID
2. Player 2 joins using that session ID
3. Both players connect to the same backend (ensure the host machine is accessible)

### 4. How to play

- Open files in your workspace and use any AI assistant (Claude.ai, ChatGPT) to analyze them
- Share findings in the **War Room** chat
- An **Advisor** (AI coach) will provide contextual hints automatically and on request
- When you've identified the root cause, go to the **Escape** tab to submit your answer
- Claude evaluates your submission semantically — you don't need exact wording

---

## Project Structure

```
the-cascade/
├── backend/
│   ├── agents/
│   │   └── coach.py           # Agentic coach (Claude haiku)
│   ├── api/
│   │   ├── routes.py          # REST endpoints
│   │   └── websocket_handler.py # WebSocket events
│   ├── game_engine/
│   │   ├── engine.py          # Session management
│   │   ├── evaluator.py       # Escape evaluation (Claude opus)
│   │   └── state.py           # Pydantic models
│   ├── config.py
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── game/page.tsx  # Main game view
│       │   └── page.tsx       # Lobby
│       ├── components/
│       │   ├── CoachPanel.tsx
│       │   ├── DocumentViewer.tsx
│       │   ├── EscapeSubmit.tsx
│       │   ├── FileExplorer.tsx
│       │   └── WarRoom.tsx
│       └── lib/
│           ├── api.ts          # REST client
│           ├── types.ts        # TypeScript types
│           └── useGameSocket.ts # WebSocket hook
├── scenario/
│   └── cascade.scenario.json  # All scenario content
└── docker-compose.yml
```

---

## Architecture

### Session lifecycle

```
POST /api/sessions → creates session in Redis (status: waiting)
Player 1 connects via WebSocket → status: waiting
Player 2 connects via WebSocket → status: active, game clock starts
                                 → hint loop starts (background task)
Players open files → clues auto-discovered from file metadata
Players collaborate in War Room
POST escape submission → Claude opus evaluates semantically → result broadcast
```

### Hint system

Hints fire automatically based on triggers defined in `cascade.scenario.json`:
- `time_elapsed`: After 10 min and 20 min
- `clue_discovered`: When specific clues are found (e.g., shipment stoppage, credit facility)
- `no_activity`: If no War Room messages in 5 min

Hints are generated by Claude claude-haiku-4-5 with full game context (files opened, clues found, recent messages).

### Scenario customization

All scenario content lives in `scenario/cascade.scenario.json`. The backend mounts this as a Docker volume so edits take effect on restart without rebuilding.

Key sections:
- `personas`: Define player roles and their file access
- `files`: Documents per persona (content, folder, clue metadata, red_herring flag)
- `escape_conditions`: What elements the correct answer must contain
- `hint_triggers`: When and how hints fire

---

## API Reference

### REST

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/sessions` | Create new session |
| `GET` | `/api/sessions/{id}` | Get session state |
| `GET` | `/api/sessions/{id}/files/{persona}` | List persona's files |
| `GET` | `/api/sessions/{id}/files/{persona}/{file_id}` | Get file content |
| `GET` | `/api/scenario` | Get scenario metadata |
| `GET` | `/health` | Health check |

### WebSocket

Connect: `ws://localhost:8000/ws/{session_id}/{persona}`

**Client → Server events:**

```json
{ "type": "open_file", "file_id": "shipment_log_q4" }
{ "type": "warroom_message", "content": "Found something in the AR aging..." }
{ "type": "request_hint" }
{ "type": "submit_escape", "root_cause": "...", "recommended_action": "..." }
```

**Server → Client events:**

```json
{ "type": "session_state", "session": { ... } }
{ "type": "player_joined", "persona": "finance_analyst" }
{ "type": "file_opened", "file_id": "...", "persona": "..." }
{ "type": "clue_discovered", "clue_key": "credit_facility_hold_identified" }
{ "type": "warroom_message", "message": { ... } }
{ "type": "escape_submitted", "persona": "...", "root_cause": "...", "recommended_action": "..." }
{ "type": "evaluating" }
{ "type": "escape_result", "result": { "success": true, "score": 87, "evaluation": "...", "debrief": "..." } }
```

---

## Development (without Docker)

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Start Redis separately (e.g. docker run -d -p 6379:6379 redis:7-alpine)

ANTHROPIC_API_KEY=sk-ant-... \
REDIS_URL=redis://localhost:6379 \
SCENARIO_PATH=../scenario/cascade.scenario.json \
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
NEXT_PUBLIC_API_URL=http://localhost:8000 npm run dev
```

---

## Customizing the Scenario

To create a new crisis scenario:

1. Copy `scenario/cascade.scenario.json` to `scenario/my_scenario.json`
2. Update `SCENARIO_PATH=./scenario/my_scenario.json` in `.env`
3. Edit the JSON — all fields are self-documented
4. `docker compose restart backend`

Key design principles from the original scenario:
- **Both personas need each other**: Include connector clues that only make sense when combined
- **Red herrings**: Include 2-3 plausible-but-wrong leads per persona to reward careful analysis
- **Cascading failure**: The root cause should have 3-4 steps (policy → financial metric → bank action → operational impact)
- **Semantic evaluation**: The escape condition uses `key_elements` that Claude checks semantically — players don't need exact wording

---

## Known Limitations (POC)

- No authentication — session IDs are the only access control
- No persistence beyond Redis TTL (24 hours)
- CORS is fully open — not for production
- Single scenario hardcoded at startup
- Hint loop polling interval is 30s (configurable in `websocket_handler.py`)
