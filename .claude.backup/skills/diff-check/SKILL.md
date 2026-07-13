---
name: diff-check
description: Run relevant format, lint, build, and test commands based on changed files. Use when user asks to check changes, validate diff, run checks on modified files, or verify before commit.
---

# Diff Check Skill

When running checks based on changed files:

## Workflow

1. **Get changed files** from git diff
2. **Detect project type** from config files
3. **Identify affected areas** (src, tests, configs)
4. **Run relevant commands** in order: format → lint → typecheck → build → test

## Step 1: Get Changed Files

```bash
# Staged changes
git diff --cached --name-only

# Unstaged changes
git diff --name-only

# All uncommitted changes
git diff HEAD --name-only

# Changes on branch vs main
git diff main --name-only
```

## Step 2: Detect Project Type

Check for these files to determine tooling:

| File                         | Project Type | Likely Commands                           |
| ---------------------------- | ------------ | ----------------------------------------- |
| `package.json`               | Node/Bun     | npm/bun scripts                           |
| `bun.lockb` or `bunfig.toml` | Bun          | `bun run <script>`                        |
| `go.mod`                     | Go           | `go fmt`, `go vet`, `go test`             |
| `pyproject.toml`             | Python       | `ruff`, `pytest`, `mypy`                  |
| `requirements.txt`           | Python       | `black`, `flake8`, `pytest`               |
| `Cargo.toml`                 | Rust         | `cargo fmt`, `cargo clippy`, `cargo test` |
| `Makefile`                   | Any          | Check make targets                        |

## Step 3: Parse Available Scripts

### From package.json

```bash
# List all scripts
cat package.json | jq -r '.scripts | keys[]'
```

Common script patterns to look for:

- **Format**: `format`, `fmt`, `oxfmt`, `format:check`, `format:fix`
- **Lint**: `lint`, `lint:fix`, `eslint`, `oxlint`
- **Typecheck**: `typecheck`, `tsc`, `type-check`, `types`
- **Build**: `build`, `compile`, `bundle`
- **Test**: `test`, `test:unit`, `test:integration`, `test:e2e`

### From scripts/ directory

```bash
# Check for script files
ls scripts/ 2>/dev/null
ls bin/ 2>/dev/null
```

### From Makefile

```bash
# List make targets
make -qp | awk -F':' '/^[a-zA-Z0-9][^$#\/\t=]*:([^=]|$)/ {print $1}'
```

## Step 4: Determine What to Run

### By Changed File Type

| Changed Files                    | Run                                  |
| -------------------------------- | ------------------------------------ |
| `*.ts`, `*.tsx`, `*.js`, `*.jsx` | format, lint, typecheck, build, test |
| `*.go`                           | fmt, vet, build, test                |
| `*.py`                           | format, lint, typecheck, test        |
| `*.css`, `*.scss`                | format, lint                         |
| `*.json`, `*.yaml`, `*.toml`     | format, lint (config validation)     |
| `*.md`                           | format (if configured)               |
| `*test*`, `*spec*`               | test (specific file or suite)        |
| `package.json`                   | install, typecheck, build, test      |
| `tsconfig.json`                  | typecheck, build                     |
| `go.mod`, `go.sum`               | go mod tidy, build, test             |

### By Changed Directory

| Directory                       | Additional Checks      |
| ------------------------------- | ---------------------- |
| `src/`                          | Full check suite       |
| `test/`, `tests/`, `__tests__/` | Run affected tests     |
| `lib/`                          | Build, test dependents |
| `scripts/`                      | Lint scripts           |
| `.github/`                      | Validate workflows     |
| `docs/`                         | Format, link check     |

## Step 5: Run Commands

### Node.js/Bun Project

```bash
# Detect runner
RUNNER="npm run"
[ -f "bun.lockb" ] || [ -f "bunfig.toml" ] && RUNNER="bun run"

# Get changed TS/JS files
CHANGED=$(git diff --name-only HEAD | grep -E '\.(ts|tsx|js|jsx)$' | tr '\n' ' ')

# Format (if script exists)
$RUNNER format 2>/dev/null || $RUNNER fmt 2>/dev/null || true

# Lint changed files (some tools support file args)
$RUNNER lint 2>/dev/null || true

# Typecheck
$RUNNER typecheck 2>/dev/null || $RUNNER tsc 2>/dev/null || true

# Build (if src files changed)
$RUNNER build 2>/dev/null || true

# Test (related to changed files)
$RUNNER test 2>/dev/null || true
```

### Go Project

```bash
# Get changed Go files
CHANGED=$(git diff --name-only HEAD | grep '\.go$')

if [ -n "$CHANGED" ]; then
  # Format
  gofmt -w $CHANGED
  # Or: goimports -w $CHANGED

  # Vet
  go vet ./...

  # Build
  go build ./...

  # Test packages with changes
  PKGS=$(echo "$CHANGED" | xargs -n1 dirname | sort -u | sed 's|^|./|')
  go test $PKGS
fi
```

### Python Project

```bash
CHANGED=$(git diff --name-only HEAD | grep '\.py$')

if [ -n "$CHANGED" ]; then
  # Format
  ruff format $CHANGED 2>/dev/null || black $CHANGED 2>/dev/null || true

  # Lint
  ruff check $CHANGED 2>/dev/null || flake8 $CHANGED 2>/dev/null || true

  # Typecheck
  mypy $CHANGED 2>/dev/null || true

  # Test
  pytest 2>/dev/null || python -m pytest 2>/dev/null || true
fi
```

### Rust Project

```bash
CHANGED=$(git diff --name-only HEAD | grep '\.rs$')

if [ -n "$CHANGED" ]; then
  cargo fmt
  cargo clippy -- -D warnings
  cargo build
  cargo test
fi
```

## Monorepo / Workspace Handling

### Turborepo

```bash
# Run only affected
turbo run lint build test --filter=...[HEAD~1]
```

### Nx

```bash
nx affected --target=lint
nx affected --target=build
nx affected --target=test
```

### Bun Workspaces

```bash
# Find affected workspace
CHANGED_DIRS=$(git diff --name-only HEAD | xargs -n1 dirname | sort -u)

for dir in $CHANGED_DIRS; do
  if [ -f "$dir/package.json" ]; then
    (cd "$dir" && bun run lint && bun run build && bun test)
  fi
done
```

## Output Format

Report results as:

```
## Diff Check Results

**Changed Files:** 5 files (3 src, 2 test)

| Check | Status | Details |
|-------|--------|---------|
| Format | ✅ Pass | No changes needed |
| Lint | ⚠️ Warn | 2 warnings in src/utils.ts |
| Typecheck | ✅ Pass | |
| Build | ✅ Pass | |
| Test | ✅ Pass | 12 tests, 0 failures |

**Ready to commit:** Yes
```

## Smart Test Selection

If test runner supports it, run only related tests:

```bash
# Jest - find related
npx jest --findRelatedTests $CHANGED

# Vitest - related
npx vitest related $CHANGED

# Bun - specific files
bun test $TEST_FILES

# Go - specific packages
go test ./path/to/changed/package

# Pytest - specific files
pytest $CHANGED_TEST_FILES
```

## Pre-commit Integration

If `.husky/` or `.git/hooks/` exists, check what hooks run:

```bash
cat .husky/pre-commit 2>/dev/null
cat .git/hooks/pre-commit 2>/dev/null
```

Run the same checks manually to preview what commit will do.
