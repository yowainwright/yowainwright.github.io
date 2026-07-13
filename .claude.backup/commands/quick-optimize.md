# Quick Optimize

Instantly reduce token usage by clearing non-essential loaded resources.

Unloads all agents and disables non-core MCP servers.

```bash
echo "🧹 Optimizing token usage..."
~/code/config/agent-sync/scripts/managers/agents.sh clear
~/code/config/agent-sync/scripts/managers/mcp.sh /off
echo "✅ Optimized! Only core services active."
```
