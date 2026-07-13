# MCP Search

Enable web search MCPs (tavily + brave-search) for 5 minutes, then auto-disable.

```bash
~/code/config/agent-sync/scripts/managers/mcp.sh search
```

Under the hood: snapshots the current `enabledMcpjsonServers`, adds `tavily` and `brave-search`, schedules a background restore in 300s.
