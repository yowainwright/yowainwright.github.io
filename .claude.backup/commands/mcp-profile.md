# MCP Profile

Switch the active MCP profile. Profiles control which servers are enabled via `enabledMcpjsonServers` in `~/.claude/settings.json`.

Available profiles: `minimal`, `dev`, `observability`, `browser`, `graphics`, `security`, `all`.

```bash
# List all profiles:
~/code/config/agent-sync/scripts/managers/mcp.sh profile

# Switch:
~/code/config/agent-sync/scripts/managers/mcp.sh profile observability
```

Switching is idempotent. A daily snapshot of `settings.json` is kept so the prior profile is always recoverable.
