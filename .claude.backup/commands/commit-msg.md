# Commit Msg

Generate a clear, conventional commit message for the current staged changes.

## Instructions

1. Run `git diff --cached` to see staged changes
2. Run `git diff` to see unstaged changes (for context)
3. Analyze what changed and why
4. Generate a commit message following conventions

## Commit Message Format

```
<type>(<scope>): <subject>

<body>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `docs`: Documentation only
- `test`: Adding or updating tests
- `chore`: Maintenance (deps, config, build)
- `style`: Formatting, whitespace (no code change)
- `perf`: Performance improvement

### Rules for Subject Line
- Lowercase, no period at end
- Imperative mood ("add" not "added" or "adds")
- Max 50 characters
- Complete the sentence: "This commit will..."

### Rules for Body (if needed)
- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

## Examples

**Simple fix:**
```
fix(auth): handle expired token refresh correctly
```

**Feature with context:**
```
feat(api): add rate limiting to public endpoints

Prevents abuse and ensures fair usage across clients.
Configured at 100 requests per minute per IP.
```

**Refactor:**
```
refactor(utils): extract date formatting into separate module

Reduces duplication across 5 files and makes testing easier.
```

## Output

Just output the commit message, ready to copy. No explanation needed unless the changes are ambiguous.

## IMPORTANT

**DO NOT run git commit.** Only generate the message. The user will commit manually.
