---
description: Log grep patterns and file changes for session tracking
---

Captures current session context by logging:

- Recently modified files from git
- Common search patterns
- Current project and branch

Run this command to save a snapshot of your session for later reference.

## Usage

```bash
~/.claude/bin/grepfile
```

The output is saved to `.claude/grepfile.log` with timestamp, project name, and git branch information.
