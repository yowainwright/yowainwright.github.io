# MCP Preflight

Run security preflight against one or all MCP servers.

Checks, per server:

1. **Status page** — vendor's Statuspage.io shows "All Systems Operational"
2. **Version pin** — `npm view <pkg> version` matches `tmpl/.mcp-locked.json`
3. **GHSA (last 7 days)** — no new security advisories for the package

```bash
~/code/config/agent-sync/scripts/managers/mcp.sh preflight all
# or a single server:
~/code/config/agent-sync/scripts/managers/mcp.sh preflight datadog
```

Exit codes: `0` all clean, `1` one or more blocking findings.
