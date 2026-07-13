---
description: Pull latest config and sync Claude Code, Codex, and shared skills
---

Pull latest from the config repo and sync templates to Claude Code, Codex, and `.agents/skills`.

```bash
git -C "$HOME/code/config/agent-sync" pull && agent-sync sync --global
```
