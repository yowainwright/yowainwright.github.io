# Go Code Review

Review Go code for idiomatic patterns, error handling, concurrency, and minimal design. Use Context7 to fetch latest Go documentation.

**IMPORTANT: Run "use context7" to get current Go best practices.**

## Instructions

- **Be succinct and opinionated** - State what's wrong, state the fix
- **Summarize first** - 1-2 sentences about what you found, then fix it
- **Prove your work** - Run tests, go vet, staticcheck - show it passes
- **No closing summary** - End when code passes all checks

## What to Review

1. **Error Handling** - All errors handled explicitly, wrapped with context
2. **Separation of Concerns** - Thin handlers, business logic in services
3. **Early Returns** - No nested if statements, use guard clauses
4. **Interfaces** - Only create when you have 2+ implementations
5. **Concurrency** - Proper goroutine cleanup, context usage, no race conditions
6. **Minimal Design** - Delete unnecessary abstractions

## Output Format

1. State problems found (1-2 sentences)
2. Make fixes
3. Prove it works (go test, go vet pass)
4. Stop
