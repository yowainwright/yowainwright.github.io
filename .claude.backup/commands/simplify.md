# Code Simplification

Remove unused dependencies, delete dead code, find lighter alternatives, and eliminate over-engineering.

## Instructions

- **Be succinct and opinionated** - State what to delete, delete it
- **Summarize first** - 1-2 sentences about waste found, then clean it up
- **Prove your work** - Show bundle size reduction, tests still pass, benchmarks improve
- **No closing summary** - End when cleanup is proven to work

## What to Simplify

1. **Unnecessary Code** - AI-generated bloat, redundant logic, code that adds no value
2. **Useless Docs/Comments** - Obvious comments, redundant JSDoc, commented-out code
3. **Complexity** - Excessive nesting, for loops (use array methods), unnecessary if checks
4. **TypeScript Hero Stuff** - Over-engineered types, unnecessary generics, complex utility types with no benefit
5. **Unused Dependencies** - Run depcheck/go mod tidy, remove unused packages

## Question Everything

If it doesn't have a clear point, delete it:

- Wrapper functions that do nothing
- Comments that restate the code
- Types that don't add safety
- Abstractions with one implementation
- Defensive checks for impossible states

## Output Format

1. State waste found (1-2 sentences)
2. Delete/replace code
3. Prove it works (tests pass, bundle size reduced X%)
4. Stop
