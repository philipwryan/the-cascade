import json
import asyncio
from contextlib import asynccontextmanager

import redis.asyncio as aioredis
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from game_engine.engine import GameEngine
from api.routes import router as api_router
from api.websocket_handler import router as ws_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load scenario definition
    with open(settings.scenario_path) as f:
        scenario = json.load(f)
    app.state.scenario = scenario

    # Connect to Redis
    app.state.redis = await aioredis.from_url(settings.redis_url, decode_responses=True)

    # Initialise game engine
    app.state.engine = GameEngine(redis=app.state.redis, scenario=scenario)

    print(f"[cascade] Scenario loaded: {scenario['title']}")
    print(f"[cascade] Personas: {list(scenario['personas'].keys())}")

    yield

    await app.state.redis.aclose()


app = FastAPI(title="The Cascade — Game Engine", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")
app.include_router(ws_router)


@app.get("/health")
async def health():
    return {"status": "ok", "scenario": app.state.scenario.get("title", "unknown")}
