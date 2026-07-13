# MCP Launch

Preflight-checked launch of Claude Code with secrets injected from 1Password.

Workflow:

1. Switches to the named profile (default: `dev`)
2. Runs preflight on each server in the profile
3. Blocks if any `block` finding exists (unless `FORCE=1`); strict profiles can't be forced
4. Verifies `op` CLI is signed in
5. `op run --env-file=tmpl/.op-env.tmpl -- claude …` — secrets only live in the subprocess env

```bash
~/code/config/agent-sync/scripts/managers/mcp.sh launch dev
# or with extra claude args:
~/code/config/agent-sync/scripts/managers/mcp.sh launch observability --verbose
```

Prereqs: `op signin` active, `jq`, `curl`, `gh` (optional, for GHSA checks).
