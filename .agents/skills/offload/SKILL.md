---
name: offload
description: Run heavy shell commands (builds, test suites, lint sweeps) on the least-loaded Mac in the Tailscale fleet. Use when local load is high, a command is long-running, or the user mentions offload, mac studio, remote execution, or fleet.
---

# Offload

Route heavy commands to the least-loaded Mac on the tailnet instead of running them locally.

## When to offload

- The command is long-running (full test suite, build, lint sweep)
- Session-start fleet status shows a remote host with much lower load per core
- The user asks to offload or mentions a specific machine

Do not offload commands that need local state outside the project directory, interactive input, or the local network context.

## Commands

```bash
bash ~/.claude/skills/offload/scripts/offload.sh status
bash ~/.claude/skills/offload/scripts/offload.sh best
bash ~/.claude/skills/offload/scripts/offload.sh run -- bun test
bash ~/.claude/skills/offload/scripts/offload.sh run --host jeffrys-mac-studio-123672 -- bun run build
bash ~/.claude/skills/offload/scripts/offload.sh run --pull dist -- bun run build
```

`run` rsyncs the current project to `~/.offload/<project>` on the chosen host, executes the command in a login shell there, streams output back, and exits with the remote exit code. `--pull <dir>` rsyncs that directory back afterward.

## Setup

One-time per machine, run by the user in a terminal:

```bash
bash ~/.claude/skills/offload/scripts/offload.sh setup
```

Hosts refusing port 22 need Remote Login enabled on that machine (System Settings > General > Sharing > Remote Login). Re-run setup afterward.

## Fleet status at session start

A SessionStart hook runs `offload.sh status` so every session begins with one line per online Mac (cores, load, free memory). Use it to decide whether offloading is worthwhile.
