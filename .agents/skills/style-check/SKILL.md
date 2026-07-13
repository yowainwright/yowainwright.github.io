---
name: style-check
description: Run linters and style checks on files or the entire project. Use when user asks to check code style, run linters, or verify code quality before commit.
---

# Style Check Skill

Run language-specific linters and report violations. Supports JavaScript/TypeScript, Go, and Python.

## Usage

Run on specific file(s):

```
/style-check src/utils.ts
/style-check src/**/*.go
```

Run on staged changes:

```
/style-check --staged
```

Run on entire project:

```
/style-check
```

## Execution Steps

### 1. Detect Project Type

Check for config files to determine which linters to run:

- `package.json` / `tsconfig.json` → oxlint, oxfmt
- `go.mod` → gofmt, golangci-lint, go vet
- `pyproject.toml` / `requirements.txt` → ruff, black, mypy

### 2. Run Linters

**JavaScript/TypeScript:**

```bash
oxlint "$FILE_OR_DIR" 2>&1
oxfmt --check "$FILE_OR_DIR" 2>&1
```

**Go:**

```bash
gofmt -l "$FILE_OR_DIR" 2>&1
go vet "$FILE_OR_DIR" 2>&1
golangci-lint run "$FILE_OR_DIR" 2>&1 || true
```

**Python:**

```bash
ruff check "$FILE_OR_DIR" 2>&1
ruff format --check "$FILE_OR_DIR" 2>&1
mypy "$FILE_OR_DIR" 2>&1 || true
```

### 3. Report Format

Output a summary table:

```markdown
## Style Check Results

| File         | Issues               | Fixable        |
| ------------ | -------------------- | -------------- |
| src/utils.ts | 3 errors, 2 warnings | 4 auto-fixable |
| src/api.ts   | 0                    | -              |

### Details

**src/utils.ts:12:5** - Unexpected var, use const or let (no-var)
**src/utils.ts:25:1** - Function has too many lines (47). Maximum allowed is 20 (max-lines-per-function)
**src/utils.ts:34:10** - 'data' is defined but never used (no-unused-vars)

### Quick Fix

Run to auto-fix:
\`\`\`bash
oxlint --fix src/utils.ts
oxfmt --write src/utils.ts
\`\`\`
```

## Jeff's Style Priorities

Based on stored preferences, prioritize these violations:

1. **const over let** - Flag any `let` that could be `const`
2. **Function length** - Functions over 20 lines
3. **Nesting depth** - More than 2 levels of nesting
4. **Loop vs array methods** - `for`/`while` that could be `.map`/`.filter`/`.reduce`
5. **Complex conditionals** - If conditions that should be hoisted

## Exit Codes

- `0` - All checks passed
- `1` - Style violations found (fixable)
- `2` - Style violations found (manual fix required)
