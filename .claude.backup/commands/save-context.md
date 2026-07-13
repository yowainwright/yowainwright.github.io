# Save Context

Save current session context for later resumption.

Captures git status, working directory, open files, loaded agents, and MCP servers.

```bash
read -p "Note for context: " note
~/code/config/agent-sync/scripts/managers/context.sh save "$note"
```
