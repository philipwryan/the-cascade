from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    # env_ignore_empty=True prevents an empty ANTHROPIC_API_KEY env var (injected
    # by Claude Desktop into child processes) from overriding the value in .env
    model_config = SettingsConfigDict(env_file=".env", env_ignore_empty=True)

    anthropic_api_key: str = "sk-ant-placeholder"
    redis_url: str = "redis://localhost:6379"
    database_url: str = "postgresql+asyncpg://cascade:cascade_dev@localhost/cascade"
    scenario_path: str = "../scenario/cascade.scenario.json"


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
