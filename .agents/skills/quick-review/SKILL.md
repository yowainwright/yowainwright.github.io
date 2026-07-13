---
name: quick-review
description: Run a fast focused code review for staged or specified files. Use when the user asks for a quick review, smoke review, staged-file review, or a brief bug/security/debug-code pass without style or refactor suggestions.
---

# Quick Code Review

Fast, focused code review for staged or specified files.

## Instructions

1. Get the files to review:
   - If files specified, use those
   - Otherwise, get staged files: `git diff --cached --name-only`
   - Limit to 10 files max

2. For each file, check ONLY for:
   - Obvious bugs or logic errors
   - Hardcoded secrets/credentials/API keys
   - Debug code left in (console.log, print, debugger, etc.)
   - Syntax errors

3. Output format:
   ```
   LGTM
   ```
   or
   ```
   ⚠️ file.ts:42 - hardcoded API key
   ⚠️ utils.js:15 - console.log left in
   ```

## Rules

- Be BRIEF - one line per issue max
- Do NOT suggest style improvements
- Do NOT suggest refactoring
- Do NOT block on minor issues
- Say "LGTM" if no critical issues
- This is advisory only, not blocking
