# Bun Code Review

Review Bun-specific code for performance, correctness, and best practices. Use Context7 to fetch the latest Bun documentation.

**IMPORTANT: Start by running "use context7" to get current Bun APIs and patterns.**

## Instructions

- **Be succinct and opinionated** - State what's wrong, state the fix
- **Summarize first** - 1-2 sentences about what you found, then fix it
- **Prove your work** - Run tests, benchmarks, or show tangible improvement
- **No closing summary** - End when fixes are proven to work

## What to Review

1. **Runtime APIs** - Use Bun.serve (not http), Bun.file (not fs), Bun.env
2. **Performance** - Fast file ops, async patterns, bundling optimization
3. **Testing** - Bun test framework, benchmarks for performance-critical code
4. **Package Management** - Remove unused deps, optimize bundle size

## Output Format

1. State findings (1-2 sentences)
2. Make fixes
3. Prove fixes work (tests pass, benchmark shows improvement)
4. Stop
