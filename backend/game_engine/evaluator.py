import json
import re
from datetime import datetime, timezone

from anthropic import AsyncAnthropic

from game_engine.state import GameSession, EscapeResult


class EscapeEvaluator:
    def __init__(self, client: AsyncAnthropic, scenario: dict):
        self.client = client
        self.scenario = scenario

    async def evaluate(self, session: GameSession) -> EscapeResult:
        conditions = self.scenario["escape_conditions"]

        submissions_text = "\n\n".join(
            f"**Submitted by {s.persona}:**\n"
            f"Root Cause: {s.root_cause}\n"
            f"Recommended Action: {s.recommended_action}"
            for s in session.escape_submissions
        )

        prompt = f"""You are evaluating whether participants in a crisis simulation exercise have correctly solved a supply chain crisis.

CORRECT ANSWER:
Root Cause: {conditions['correct_root_cause']}
Required Action: {conditions['correct_action']}
Key Elements: {json.dumps(conditions['key_elements'], indent=2)}

PLAYER SUBMISSIONS:
{submissions_text}

CLUES DISCOVERED BY PLAYERS:
{self._summarize_clues(session)}

Evaluate whether the team identified the essential root cause and proposed a workable response.
Score 70+ = success (they got the core insight even if details differ slightly).

Respond with ONLY valid JSON in this exact format:
{{
  "success": true,
  "score": 85,
  "root_cause_accuracy": "Yes",
  "action_accuracy": "Partial",
  "evaluation": "2-3 sentence assessment of what they got right and wrong.",
  "missed_elements": ["any key elements they missed"]
}}"""

        response = await self.client.messages.create(
            model="claude-opus-4-5",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}],
        )

        raw = response.content[0].text
        json_match = re.search(r"\{.*\}", raw, re.DOTALL)
        if json_match:
            result_data = json.loads(json_match.group())
        else:
            result_data = {
                "success": False,
                "score": 0,
                "evaluation": "Evaluation could not be parsed.",
                "missed_elements": [],
            }

        debrief = await self._generate_debrief(session, result_data)

        return EscapeResult(
            success=result_data.get("success", False),
            score=result_data.get("score", 0),
            evaluation=result_data.get("evaluation", ""),
            debrief=debrief,
        )

    async def _generate_debrief(self, session: GameSession, evaluation: dict) -> str:
        duration_str = ""
        if session.started_at and session.ended_at:
            delta = (session.ended_at - session.started_at).total_seconds()
            mins = int(delta // 60)
            secs = int(delta % 60)
            duration_str = f"{mins}m {secs}s"

        files_opened = {
            persona: player.files_opened
            for persona, player in session.players.items()
        }

        prompt = f"""Generate a structured post-game debrief for an AI-assisted crisis simulation called "The Cascade."

OUTCOME: {"SUCCESS" if evaluation.get("success") else "FAILED"} | Score: {evaluation.get("score", 0)}/100 | Duration: {duration_str}
EVALUATION: {evaluation.get("evaluation", "")}
MISSED ELEMENTS: {evaluation.get("missed_elements", [])}
FILES OPENED: {json.dumps(files_opened, indent=2)}

THE ACTUAL SCENARIO:
{self.scenario["escape_conditions"]["correct_root_cause"]}

Generate a professional debrief in Markdown covering:

## What Actually Happened
(The correct answer — full explanation of the cascading failure)

## What Your Team Got Right
(Specific things they identified correctly)

## What Was Missed
(Key elements or connections they didn't make)

## AI Tool Usage — Lessons Learned
(How could AI tools like Claude or ChatGPT have been used more effectively to analyze the documents and connect the dots faster?)

## Business Implications
(What real-world supply chain risk management lessons does this scenario illustrate?)

## Recommended Actions
(3 concrete takeaways for managing this risk profile in practice)

Be specific. Reference actual document names and data points from the scenario. Tone: professional, educational, direct."""

        response = await self.client.messages.create(
            model="claude-opus-4-5",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.content[0].text

    def _summarize_clues(self, session: GameSession) -> str:
        parts = []
        for persona, player in session.players.items():
            for clue in player.clues_discovered:
                parts.append(f"  [{persona}] {clue}")
        return "\n".join(parts) if parts else "  (none)"
