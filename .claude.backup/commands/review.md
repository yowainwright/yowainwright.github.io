# Unified Code Review

Comprehensive code review with multiple modes and scopes.

## Usage

```bash
/review                        # Quick review of changed files
/review --mode security        # Security-focused review
/review --mode types          # Type safety review
/review --mode full           # Complete audit (all checks)
/review --scope all           # Review entire codebase
/review src/utils.ts          # Review specific file(s)
```

## Modes

### `--mode quick` (Default)

Fast review for staged/changed files:

- Obvious bugs or logic errors
- Hardcoded secrets/credentials
- Debug code left in
- Syntax errors

Output: `LGTM` or brief issue list

### `--mode security`

Comprehensive security audit:

- Injection vulnerabilities (SQL, XSS, Command)
- Authentication & authorization flaws
- Data security issues
- Input validation problems
- Dependency vulnerabilities
- Language-specific security issues

### `--mode types`

Type safety review:

- **TypeScript**: Replace `any`, add return types, fix assertions
- **Go**: Replace `interface{}`, safe type assertions
- **Python**: Add type hints, replace `Any`

### `--mode full`

Complete audit (runs all checks):

1. Code simplification (remove bloat)
2. Type safety fixes
3. Language-specific quality checks
4. Test improvements
5. Security audit

## Scope

- **Default**: Changed files (`git diff --cached --name-only`)
- **`--scope all`**: Entire codebase
- **Specific files**: Provided file paths

## Instructions

**Be succinct and opinionated** - State what's wrong, state the fix
**Summarize first** - 1-2 sentences about findings, then act
**Prove your work** - Show tests/checks passing at end
**No closing summary** - End when all checks pass

## Security Checks

### Injection Vulnerabilities

- SQL injection via string concatenation
- Command injection in shell execution
- XSS in unescaped output
- Path traversal in file operations
- Code injection via `eval()`, `exec()`

### Authentication & Authorization

- Hardcoded credentials
- Missing access controls
- Insecure session handling
- JWT vulnerabilities

### Data Security

- Secrets in code/logs
- Missing encryption
- HTTP fallbacks
- Sensitive data logging

### Language-Specific

#### JavaScript/TypeScript

```javascript
// VULNERABLE
eval(userInput);
element.innerHTML = userData;
db.query("SELECT * FROM users WHERE id = " + userId);

// SECURE
JSON.parse(userInput);
element.textContent = userData;
db.query("SELECT * FROM users WHERE id = ?", [userId]);
```

#### Go

```go
// VULNERABLE
query := "SELECT * FROM users WHERE id = " + userID
rows, _ := db.Query(query)

// SECURE
rows, err := db.Query("SELECT * FROM users WHERE id = ?", userID)
if err != nil { /* handle */ }
```

#### Python

```python
# VULNERABLE
exec(user_code)
cursor.execute("SELECT * FROM users WHERE id = " + user_id)

# SECURE
# Don't execute user code
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

## Type Safety Patterns

### TypeScript

```typescript
// BEFORE
function process(data: any): any {
  return data.value as string;
}

// AFTER
function process(data: { value: string }): string {
  if (typeof data.value !== "string") {
    throw new Error("Invalid data");
  }
  return data.value;
}
```

### Go

```go
// BEFORE
func process(data interface{}) interface{} {
  return data.(string)
}

// AFTER
func process(data string) string {
  return data
}
```

## Output Format

### Quick Mode

```
LGTM
```

or

```
⚠️ file.ts:42 - hardcoded API key
⚠️ utils.js:15 - console.log left in
```

### Security Mode

````markdown
## Security Review: src/

### Critical Issues

| File   | Line | Type          | Issue                         |
| ------ | ---- | ------------- | ----------------------------- |
| api.ts | 23   | SQL Injection | String concatenation in query |

### Remediation

**api.ts:23** - Use parameterized query:

```typescript
db.query("SELECT * FROM users WHERE id = ?", [userId]);
```
````

### Dependency Scan

- 2 vulnerable packages found
- Run `npm audit fix`

````

### Full Mode
```markdown
## Complete Audit: src/

### Summary
Found 5 type errors, 2 security issues, 1 test failure

### 1. Type Safety ✓
- Fixed 5 `any` types in utils.ts
- Added return types to 3 functions

### 2. Security Audit ✓
- Fixed SQL injection in api.ts
- Removed hardcoded token

### 3. Tests ✓
- All tests passing

**All checks complete - codebase ready**
````

## Verification Commands

After fixes, run appropriate checks:

```bash
# TypeScript
tsc --noEmit

# Go
go vet ./...
go test ./...

# Python
mypy .
pytest

# Security
npm audit
# or dependency-check for other languages

# Linting
npm run lint  # or equivalent
```
