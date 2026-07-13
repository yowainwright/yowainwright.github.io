# Test Quality Review

Review test files for quality, complexity, mocking practices, and meaningful assertions.

## Instructions

- **Be succinct and opinionated** - State what's wrong, state the fix
- **Summarize first** - 1-2 sentences about what you found, then fix it
- **Prove your work** - Run tests, show they pass, demonstrate improvement
- **No closing summary** - End when tests pass

## What to Review

1. **Complexity** - Setup/teardown bloat, tests over 20 lines, nested describe blocks
2. **Excessive Mocking** - Mocking everything = testing nothing. Mock I/O, test logic
3. **Meaningless Tests** - Tests that don't assert anything useful, testing language features
4. **Missing Edge Cases** - No error cases, no boundary conditions, only happy path
5. **Poor Names** - Unclear test names, missing context

## Common Issues to Delete

- Tests with 50 lines of setup for 1 assertion
- Mocking every dependency (test real behavior)
- Tests that just verify mocks were called
- Tests of language features (array.push works)
- Tautological tests (expect(fn()).toBe(fn()))

## Output Format

1. State problems found (1-2 sentences)
2. Delete/fix tests
3. Prove it works (tests pass, coverage maintained)
4. Stop
