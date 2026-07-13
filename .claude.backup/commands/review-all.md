# Comprehensive Code Review

Run all code quality checks in sequence for a complete audit.

## Instructions

- **Be succinct and opinionated** - State what's wrong, state the fix
- **Summarize first** - 1-2 sentences about overall findings, then run checks
- **Prove your work** - Show all tests/checks passing at the end
- **No closing summary** - End when all checks pass

## Review Sequence

Run these checks in order on the codebase:

1. **`/simplify`** - Remove bloat first (unnecessary code, comments, dependencies)
2. **`/type-review`** - Fix type safety issues
3. **`/js-file-check`** or `/go-review`** - Language-specific code quality
4. **`/test-review`** - Clean up tests
5. **`/security-review`** - Check for vulnerabilities

## Output Format

1. State overall audit findings (1-2 sentences)
2. Run each check sequentially
3. Fix issues as you find them
4. Prove all checks pass (tests pass, linters clean, type checkers pass)
5. Stop

## Skip What Doesn't Apply

- No Bun code? Skip `/bun-review`
- No Koa/Fastify? Skip those framework reviews
- Focus on what exists
