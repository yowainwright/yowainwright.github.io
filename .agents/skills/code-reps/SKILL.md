---
name: code-reps
description: 'Shortcut into focused code-improvement workflows, including official mattpocock/skills routes. Use when the user asks for "code reps", "matt code reps", "code improvement exercise", "quick refactor workout", "improve this code as an exercise", "deep module reps", "Matt Pocock TDD", or wants a small, test-backed code improvement loop.'
---

# Code Reps

Run a short code improvement exercise, not a broad cleanup.

This is a local trigger wrapper for <https://github.com/mattpocock/skills>. Prefer the official upstream skills when available:

- `~/.agents/skills/matt-pocock/engineering/ask-matt/SKILL.md` when the right flow is unclear.
- `~/.agents/skills/matt-pocock/engineering/tdd/SKILL.md` for test-first feature or bug work using red-green-refactor.
- `~/.agents/skills/matt-pocock/engineering/codebase-design/SKILL.md` for module/interface design.
- `~/.agents/skills/matt-pocock/engineering/improve-codebase-architecture/SKILL.md` for architecture scans.
- `~/.agents/skills/matt-pocock/engineering/diagnosing-bugs/SKILL.md` for hard bugs or regressions.
- `~/.agents/skills/matt-pocock/engineering/implement/SKILL.md` when work is already specified.

If the upstream skill is missing, tell the user to run `agent-sync sync` to populate official skills, then continue with this fallback loop if they still want to proceed.

## Loop

1. Pick one target: a function, module interface, failing behavior, or small cluster of files.
2. State the current friction in one sentence.
3. Define the behavior or interface that should survive the refactor.
4. Add or identify one verification step before changing code.
5. Make the smallest improvement that increases locality, testability, or readability.
6. Run the focused check.
7. Report:
   - Before: the friction removed.
   - After: the new shape.
   - Proof: the command or test result.

## Constraints

- Keep each rep under one cohesive change.
- Prefer behavior tests over implementation tests.
- Do not invent abstractions unless they hide real complexity or simplify a caller.
- Keep the user in control: if several reps are available, list 2-3 options and recommend one.
