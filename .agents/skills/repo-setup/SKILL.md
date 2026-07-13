---
name: repo-setup
description: Set up or verify repository defaults. Use when user asks to initialize a repo, check repo setup, ensure defaults, or scaffold project structure.
---

# Repository Setup

Ensure a repository has standard configuration files and structure based on project type.

## Usage

```
/repo-setup              # Analyze current repo, report missing defaults
/repo-setup --init       # Create missing default files
/repo-setup --type node  # Force project type detection
```

## Detection

Detect project type by examining:

- `package.json` → Node/TypeScript
- `go.mod` → Go
- `pyproject.toml` or `requirements.txt` → Python
- `Cargo.toml` → Rust
- `Gemfile` → Ruby

## Required Files by Type

### All Projects

| File            | Purpose                               |
| --------------- | ------------------------------------- |
| `.gitignore`    | Ignore build artifacts, deps, secrets |
| `.editorconfig` | Consistent editor settings            |
| `README.md`     | Project documentation                 |
| `LICENSE`       | License file (if open source)         |

### Node/TypeScript

| File                                          | Purpose                  |
| --------------------------------------------- | ------------------------ |
| `package.json`                                | Project manifest         |
| `tsconfig.json`                               | TypeScript configuration |
| `.nvmrc` or `.node-version`                   | Node version pinning     |
| `oxlint.json`, `biome.json`, or `.eslintrc.*` | Linting configuration    |

**Recommended linter:** oxlint (fastest) or biome (fast + formatter)

### Go

| File            | Purpose              |
| --------------- | -------------------- |
| `go.mod`        | Module definition    |
| `go.sum`        | Dependency checksums |
| `.golangci.yml` | Linter configuration |

### Python

| File                                        | Purpose                |
| ------------------------------------------- | ---------------------- |
| `pyproject.toml`                            | Project configuration  |
| `.python-version`                           | Python version pinning |
| `ruff.toml` or `pyproject.toml [tool.ruff]` | Linting                |

## .gitignore Templates

### Node/TypeScript

```gitignore
node_modules/
dist/
build/
.next/
coverage/
*.log
.env
.env.*
!.env.example
.DS_Store
```

### Go

```gitignore
bin/
*.exe
*.test
*.out
vendor/
.env
.DS_Store
```

### Python

```gitignore
__pycache__/
*.py[cod]
*$py.class
.venv/
venv/
env/
dist/
build/
*.egg-info/
.env
.DS_Store
```

## .editorconfig Template

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[*.go]
indent_style = tab

[*.py]
indent_size = 4

[Makefile]
indent_style = tab
```

## Git Hooks

### .githooks/ Directory

```
.githooks/
├── pre-commit       # Run before commit (lint, format)
├── commit-msg       # Validate commit message
├── pre-push         # Run before push (tests)
└── prepare-commit-msg  # Auto-generate commit template
```

### Enable Project Hooks

```bash
git config core.hooksPath .githooks
```

### pre-commit Hook

```bash
#!/bin/sh
set -e

# Node/TypeScript
if [ -f "package.json" ]; then
  # Prefer oxlint (fastest), fallback to biome, then eslint
  if [ -f "oxlint.json" ] || command -v oxlint &> /dev/null; then
    oxlint .
  elif [ -f "biome.json" ]; then
    biome check .
  else
    npm run lint --if-present
  fi
  npm run typecheck --if-present
fi

# Go
if [ -f "go.mod" ]; then
  go fmt ./...
  golangci-lint run
fi

# Python
if [ -f "pyproject.toml" ]; then
  ruff check .
  ruff format --check .
fi
```

### commit-msg Hook

```bash
#!/bin/sh
# Enforce conventional commits
commit_msg=$(cat "$1")
pattern="^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,72}$"

if ! echo "$commit_msg" | grep -qE "$pattern"; then
  echo "Invalid commit message format"
  echo "Expected: type(scope): description"
  echo "Types: feat, fix, docs, style, refactor, test, chore"
  exit 1
fi
```

### pre-push Hook

```bash
#!/bin/sh
set -e

# Node/TypeScript
if [ -f "package.json" ]; then
  npm test --if-present
fi

# Go
if [ -f "go.mod" ]; then
  go test ./...
fi

# Python
if [ -f "pyproject.toml" ]; then
  pytest
fi
```

### Alternative: Husky (Node)

```bash
husky init
```

```json
// package.json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

### Alternative: pre-commit (Python)

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.0
    hooks:
      - id: ruff
      - id: ruff-format
```

## Tests Setup

### Test Directory Structure

#### Node/TypeScript

```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/            # End-to-end tests
└── fixtures/       # Shared test utilities
    ├── index.ts
    └── mocks.ts
```

Or colocated:

```
src/
├── utils.ts
├── utils.test.ts   # Test next to source
└── api/
    ├── client.ts
    └── client.test.ts
```

#### Go

```
pkg/
├── service/
│   ├── service.go
│   └── service_test.go    # Go convention: same directory
└── testutil/              # Shared test helpers
    └── testutil.go
```

#### Python

```
tests/
├── __init__.py
├── conftest.py     # Pytest fixtures
├── unit/
├── integration/
└── e2e/
```

### Test Configuration

#### Bun (bun:test)

```json
// package.json
{
  "scripts": {
    "lint": "oxlint .",
    "test": "bun test",
    "test:unit": "bun test tests/unit",
    "test:integration": "bun test tests/integration",
    "test:e2e": "bun test tests/e2e",
    "test:watch": "bun test --watch",
    "test:coverage": "bun test --coverage"
  }
}
```

#### Oxlint Configuration

```json
// oxlint.json (optional - works without config)
{
  "rules": {
    "no-console": "warn",
    "no-debugger": "error"
  },
  "ignorePatterns": ["dist", "node_modules"]
}
```

Install: `bun add -d oxlint` or `npm i -D oxlint`

#### Vitest

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
```

#### Go

```bash
go test ./...
go test -cover ./...
go test -race ./...
```

#### Python (pytest)

```toml
# pyproject.toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
addopts = "-v --tb=short"

[tool.coverage.run]
source = ["src"]
```

### CI Workflow

#### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Node/Bun
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test

      # Go
      # - uses: actions/setup-go@v5
      #   with:
      #     go-version: '1.22'
      # - run: go test ./...

      # Python
      # - uses: actions/setup-python@v5
      #   with:
      #     python-version: '3.12'
      # - run: pip install -e ".[dev]"
      # - run: pytest
```

### Test Fixtures Pattern

```typescript
// tests/fixtures/index.ts
export const createMockUser = (overrides = {}) => ({
  id: "user-123",
  name: "Test User",
  email: "test@example.com",
  ...overrides,
});

export const createMockRequest = (overrides = {}) => ({
  headers: new Headers(),
  method: "GET",
  ...overrides,
});
```

## Claude Code Setup

### .claude/ Directory

```
.claude/
├── settings.json       # Project-specific settings
└── rules/              # Project rules
    └── *.md
```

### Minimal .claude/settings.json

```json
{
  "permissions": {
    "allow": ["Bash(bun test:*)", "Bash(npm test:*)"]
  }
}
```

### Add to .gitignore

```gitignore
# Claude configuration should be committed to version control
# No need to ignore settings.json anymore
```

## GitHub Setup

### .github/ Directory

```
.github/
├── CODEOWNERS
├── PULL_REQUEST_TEMPLATE.md
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   └── feature_request.md
└── workflows/
    └── ci.yml
```

### Minimal CODEOWNERS

```
* @username
```

### Minimal PR Template

```markdown
## Summary

<!-- Brief description of changes -->

## Test Plan

<!-- How to verify changes work -->
```

## Output Format

```markdown
## Repository Setup Report

**Project Type:** Node/TypeScript
**Root:** /path/to/project

### Status

| Category   | Status       | Files                          |
| ---------- | ------------ | ------------------------------ |
| Core       | ✅ Complete  | .gitignore, README.md, LICENSE |
| Editor     | ⚠️ Missing   | .editorconfig                  |
| TypeScript | ✅ Complete  | tsconfig.json, package.json    |
| Linting    | ⚠️ Missing   | biome.json or .eslintrc        |
| Git Hooks  | ❌ Not setup | .githooks/ or husky            |
| Tests      | ✅ Complete  | tests/, package.json scripts   |
| CI/CD      | ⚠️ Partial   | .github/workflows/ci.yml       |
| Claude     | ❌ Not setup | .claude/                       |
| GitHub     | ⚠️ Partial   | Missing CODEOWNERS             |

### Recommendations

1. **Add .editorconfig** - Ensures consistent formatting across editors
2. **Add linting config** - Run `biome init` or configure ESLint
3. **Setup git hooks** - Run `git config core.hooksPath .githooks`
4. **Add test structure** - Create tests/unit, tests/integration, tests/fixtures
5. **Setup CI workflow** - Add .github/workflows/ci.yml
6. **Setup .claude/** - Create .claude/settings.json for project rules
7. **Add CODEOWNERS** - Define code ownership for reviews

### Auto-setup Available

Run `/repo-setup --init` to create:

- .editorconfig (from template)
- .githooks/pre-commit (lint on commit)
- .githooks/pre-push (test on push)
- tests/ directory structure
- .github/workflows/ci.yml
- .claude/settings.json (minimal)
- .github/CODEOWNERS (template)
```

## Checklist

When running setup, verify:

### Core Files

- [ ] `.gitignore` exists and covers common patterns
- [ ] `.gitignore` includes `.env*` patterns
- [ ] `.gitignore` includes environment files only
- [ ] `.editorconfig` exists
- [ ] README.md exists with basic sections
- [ ] License file exists (if open source)

### Language Config

- [ ] Language-specific config exists (tsconfig, go.mod, etc.)
- [ ] Linting configured (biome, eslint, golangci-lint, ruff)
- [ ] Formatter configured

### Git Hooks

- [ ] `.githooks/` directory exists OR husky/pre-commit configured
- [ ] pre-commit hook runs linting
- [ ] commit-msg hook validates format (optional)
- [ ] pre-push hook runs tests
- [ ] `git config core.hooksPath` set (if using .githooks/)

### Tests

- [ ] Test directory structure exists (tests/ or colocated)
- [ ] Test runner configured (bun test, vitest, go test, pytest)
- [ ] Test scripts in package.json/Makefile
- [ ] CI workflow runs tests
- [ ] Fixtures/helpers directory for shared utilities

### CI/CD

- [ ] `.github/workflows/ci.yml` exists
- [ ] CI runs lint, typecheck, tests
- [ ] CI runs on push and PR to main

### Claude Code

- [ ] `.claude/` directory exists for Claude Code projects
- [ ] `.github/` has at least PR template
