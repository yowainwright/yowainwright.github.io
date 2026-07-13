<!-- Version: 2024-02-16,bac0bd8 -->

# Git Operations Policy

This shared rule allows GitHub CLI workflows but keeps `git` itself read-only by default. Tool-specific project guidance may override it; Codex uses `AGENTS.md` for that override.

**CRITICAL: NEVER attempt to run git commit, git push, git add, or any command that modifies git history.**

## Allowed Operations (READ-ONLY)

- `git status` - Check working tree status
- `git diff` - View changes
- `git log` - View commit history
- `git branch` - List/view branches
- `git show` - View commit contents

## Allowed GitHub CLI Operations

- `gh issue` - View, create, edit, and comment on issues
- `gh pr` - View, create, edit, review, and comment on pull requests
- `gh run` - View and inspect workflow runs
- Other `gh` subcommands are allowed when directly related to the user's request

## Generate, Don't Execute

- Use `/commit-msg` to GENERATE commit messages
- Use `/pr-summary` to GENERATE PR descriptions
- If asked to run a mutating `git` command, generate the command or message only and remind user to run it manually

## Hard Rule

This policy has **no exceptions** for mutating `git` commands. The user retains full control of git history modifications.
