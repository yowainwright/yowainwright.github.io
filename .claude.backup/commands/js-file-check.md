# JavaScript File Review

Review JavaScript/TypeScript for immutability, functional patterns, and minimal design.

## Instructions

- **Be succinct and opinionated** - State what's wrong, state the fix
- **Summarize first** - 1-2 sentences about what you found, then fix it
- **Prove your work** - Run tests, linter, show it passes
- **No closing summary** - End when fixes are proven to work

## What to Review

1. **Immutability** - Use `const`, not `let`. Use spread/map/filter, not mutations
2. **Hoist Complex Logic** - Extract complex if/object expressions into named variables
3. **Function Size** - Functions over 20 lines should be split
4. **Array Methods** - Use `.map()/.filter()/.reduce()` instead of for loops
5. **Early Returns** - No nested if statements, use guard clauses
6. **Nesting Depth** - Max 2 levels deep, flatten or extract

## Output Format

1. State problems found (1-2 sentences)
2. Make fixes
3. Prove it works (tests pass, oxlint clean)
4. Stop
