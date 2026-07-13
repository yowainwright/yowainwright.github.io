---
name: thinking-reps
description: 'Shortcut into thought-improvement and grilling workflows, including official mattpocock/skills routes. Use when the user asks for "thinking reps", "thought reps", "matt thought reps", "grill me", "thought improvement exercise", "stress-test this plan", "sharpen my thinking", "ask me hard questions", "design interview", or wants a structured reasoning drill.'
---

# Thinking Reps

Run a short grilling session to improve a plan, design, or decision before implementation.

This is a local trigger wrapper for <https://github.com/mattpocock/skills>. Prefer the official upstream skills when available:

- `~/.agents/skills/matt-pocock/engineering/ask-matt/SKILL.md` when the right flow is unclear.
- `~/.agents/skills/matt-pocock/productivity/grill-me/SKILL.md` for user-invoked plan sharpening.
- `~/.agents/skills/matt-pocock/productivity/grilling/SKILL.md` for the reusable interview loop.
- `~/.agents/skills/matt-pocock/engineering/grill-with-docs/SKILL.md` when the discussion should update domain docs or ADRs.
- `~/.agents/skills/matt-pocock/engineering/domain-modeling/SKILL.md` when terminology or concepts are fuzzy.
- `~/.agents/skills/matt-pocock/engineering/to-prd/SKILL.md` when sharpened thinking should become a PRD.
- `~/.agents/skills/matt-pocock/engineering/to-issues/SKILL.md` when sharpened thinking should become implementation work.

If the upstream skill is missing, tell the user to run `agent-sync sync` to populate official skills, then continue with this fallback loop if they still want to proceed.

## Loop

1. Restate the decision or plan in one sentence.
2. Ask up to 5 high-leverage questions. Do not ask trivia.
3. For each answer, push on one of:
   - unstated constraint
   - edge case
   - failure mode
   - irreversible decision
   - missing owner or success signal
4. Stop when the next action is obvious or the remaining unknowns are explicitly accepted.
5. End with:
   - Decision
   - Assumptions
   - Risks
   - Next verification step

## Rules

- Keep the user answering, not reading essays.
- Ask one compact batch, then adapt.
- Prefer concrete examples over abstract principles.
- If the discussion creates durable terminology or decisions, offer to update `CONTEXT.md` or an ADR.
