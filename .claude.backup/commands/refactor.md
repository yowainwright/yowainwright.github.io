# Refactor

Focused refactor of a specific function, component, or module. Improve code quality without changing behavior.

## Instructions

1. Identify the target code to refactor
2. Understand its current behavior completely
3. Plan the refactor (explain approach before coding)
4. Apply changes incrementally
5. Verify behavior is preserved

## Refactoring Priorities

Apply in order of impact:

1. **Extract**: Long functions → smaller, named functions
2. **Simplify**: Complex conditionals → guard clauses, early returns
3. **Clarify**: Unclear names → descriptive names
4. **Remove**: Dead code, unused variables, redundant logic
5. **Flatten**: Deep nesting → flatter structure

## Rules

- **Behavior must not change** - This is refactoring, not feature work
- **One thing at a time** - Don't mix multiple refactoring types
- **Explain the why** - Say why each change improves the code
- **Preserve tests** - Existing tests should still pass
- **Don't gold-plate** - Stop when it's good enough, not perfect

## Output Format

```
**Target**: [Function/file being refactored]
**Approach**: [Brief description of refactoring strategy]
**Changes**:
1. [First change and why]
2. [Second change and why]
...
```

Then make the edits.

## What NOT to Do

- Don't add features
- Don't change public APIs without discussion
- Don't refactor code that isn't the target
- Don't add dependencies
- Don't change code style preferences (that's for linters)
