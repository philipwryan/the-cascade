from datetime import datetime, timezone

from anthropic import AsyncAnthropic

from game_engine.state import GameSession


class AgentCoach:
    def __init__(self, client: AsyncAnthropic, scenario: dict):
        self.client = client
        self.scenario = scenario

    async def generate_hint(self, session: GameSession, trigger: dict) -> str:
        context = self._build_context(session)
        trigger_context = trigger.get("coach_context", "")

        prompt = f"""You are a crisis management advisor observing a team work through a supply chain emergency simulation called "The Cascade."

SCENARIO OVERVIEW:
{self.scenario['description']}

CURRENT GAME STATE:
{context}

COACHING CONTEXT:
{trigger_context}

Generate a SHORT hint (2-4 sentences) that:
- Guides without giving away the answer directly
- References specific documents or data the players should examine
- Maintains the tone of a live crisis — urgent but professional
- Addresses what seems to be blocking the players based on their current state

This message will appear in the shared "War Room." Address the team collectively.
Respond with ONLY the hint text — no labels, no preamble."""

        response = await self.client.messages.create(
            model="claude-haiku-4-5",
            max_tokens=300,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.content[0].text.strip()

    def generate_welcome_message(self) -> str:
        return (
            "CRISIS MANAGEMENT ADVISOR ONLINE\n\n"
            "Both teams are now active. The clock is running — 48 hours to line stoppage.\n\n"
            "Use this War Room to share findings as you uncover them. Neither team has the full picture alone. "
            "Cross-reference everything. I'll provide guidance if you need it.\n\n"
            "Good luck. Move fast."
        )

    def _build_context(self, session: GameSession) -> str:
        lines = []

        if session.started_at:
            elapsed = (datetime.now(timezone.utc) - session.started_at).total_seconds()
            lines.append(f"Time elapsed: {int(elapsed // 60)}m {int(elapsed % 60)}s")
        lines.append(f"Status: {session.status}")
        lines.append("")

        for persona, player in session.players.items():
            lines.append(f"Player [{persona}]:")
            lines.append(f"  Files opened ({len(player.files_opened)}): {', '.join(player.files_opened) or 'none'}")
            lines.append(f"  Clues found ({len(player.clues_discovered)}): {', '.join(player.clues_discovered) or 'none'}")
            if player.last_activity:
                idle = (datetime.now(timezone.utc) - player.last_activity).total_seconds()
                lines.append(f"  Last activity: {int(idle)}s ago")
            lines.append("")

        lines.append(f"War Room messages: {len(session.war_room)}")
        if session.war_room:
            lines.append("Recent (last 3):")
            for msg in session.war_room[-3:]:
                preview = msg.content[:120].replace("\n", " ")
                lines.append(f"  [{msg.persona}]: {preview}...")

        return "\n".join(lines)
