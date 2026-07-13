---
name: pr-prep
description: Prepare code for PR. Use when user says "ready for PR", "prepare PR", "before I commit", "check my changes", or wants to validate work before submitting.
---

# PR Preparation Skill

When preparing code for a pull request:

## Automated Checklist

Run these checks in sequence:

### 1. Review Changes

```bash
git status
git diff --stat
```

Understand what files changed and scope of changes.

### 2. Run Quality Checks

Based on project type, run appropriate checks:

- **TypeScript/JavaScript**: `npm run lint && npm run typecheck && npm run test`
- **Go**: `go fmt ./... && go vet ./... && go test ./...`
- **Python**: `ruff check . && pytest`

### 3. Code Review

Apply the `code-reviewer` agent perspective:

- Critical issues (bugs, security)
- Important issues (maintainability, performance)
- Minor issues (style, naming)

### 4. Generate PR Summary

Use `/pr-summary` to create PR description with:

- Summary of changes
- What was changed and why
- Test plan

## Output Format

Provide:

1. **Status**: Pass/Fail with specific issues
2. **Blockers**: Must fix before PR
3. **Suggestions**: Nice to have improvements
4. **PR Summary**: Ready-to-use description

## Reminder

Do NOT run git commit/push - only prepare and validate. User will commit manually.
