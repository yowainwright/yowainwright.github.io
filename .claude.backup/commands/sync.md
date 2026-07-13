---
description: Manage Claude configuration for this project
---

Sync tool for managing .claude configuration in your projects.

## Commands

- `init` - Initialize .claude in current directory from global templates
- `update` - Update current project's .claude from global templates
- `backup` - Backup current project's .claude to .claude.backup
- `restore` - Restore .claude from .claude.backup
- `status` - Show sync status
- `help` - Show available commands

## Usage

```bash
~/.claude/bin/sync {{args}}
```

## Examples

Initialize .claude in a new project:

```bash
~/.claude/bin/sync init
```

Update after global templates change:

```bash
~/.claude/bin/sync update
```

Backup before making changes:

```bash
~/.claude/bin/sync backup
```
