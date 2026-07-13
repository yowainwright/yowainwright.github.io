---
description: Clean up Claude's verbose output
---

Remove unnecessary verbosity and preamble from Claude's responses.

## Usage

```bash
~/.claude/bin/unslop {{args}}
```

## What it removes

- Unnecessary acknowledgments and confirmations
- Verbose preambles and explanations
- Repetitive status updates
- Overly polite language
- Step-by-step narrations

## Example

Before unslop:

> "I'll help you fix that bug. Let me start by examining the code..."

After unslop:

> [Direct solution without preamble]
