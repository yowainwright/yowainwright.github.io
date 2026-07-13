# Type Safety Review

Review type usage and safety across TypeScript, Go, and Python. Use Context7 to fetch latest TypeScript/Go documentation.

**IMPORTANT: For TypeScript reviews, run "use context7" to get current best practices.**

## Instructions

- **Be succinct and opinionated** - State the type issue, fix it
- **Summarize first** - 1-2 sentences about type problems found, then fix them
- **Prove your work** - Run type checker (tsc --noEmit, mypy, go vet), show zero errors
- **No closing summary** - End when type checker passes

## What to Review

### TypeScript
- **`any` Usage** - Replace with proper types or `unknown`
- **Missing Return Types** - Add explicit return types to all functions
- **Type Assertions** - Replace `as` with type guards
- **Overly Broad Types** - Replace `object`, `Function`, `{}` with specific types

### Go
- **Empty Interface** - Replace `interface{}` with concrete types or generics
- **Unsafe Assertions** - Use comma-ok idiom for type assertions
- **Unnecessary Interfaces** - Delete interfaces with only one implementation

### Python
- **Missing Type Hints** - Add type annotations to all functions
- **`Any` Usage** - Replace with specific types
- **Missing Return Types** - Add return type hints

## Output Format

1. State type problems (1-2 sentences)
2. Fix types
3. Prove it works (tsc/mypy/go vet passes with zero errors)
4. Stop
