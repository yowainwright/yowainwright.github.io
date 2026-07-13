# Test Gen

Generate tests for the specified code. Create practical, maintainable tests that catch real bugs.

## Instructions

1. Read the target code to understand its behavior
2. Identify the testing framework in use (or ask)
3. Determine test cases needed
4. Generate tests following project conventions

## Test Case Categories

### Always Include

- **Happy path**: Normal, expected usage
- **Edge cases**: Empty inputs, boundaries, nulls
- **Error cases**: Invalid inputs, expected failures

### Include When Relevant

- **Integration points**: API calls, database, file system
- **State transitions**: Before/after behavior
- **Concurrency**: Race conditions, async behavior

## Test Quality Rules

- **One assertion focus** - Each test should verify one behavior
- **Descriptive names** - Test name should describe the scenario
- **Arrange-Act-Assert** - Clear structure in each test
- **No logic in tests** - No conditionals, loops, or complex setup
- **Independent tests** - Tests shouldn't depend on each other
- **Fast tests** - Mock external dependencies

## Output Format

```
**Testing**: [Function/file name]
**Framework**: [Jest/Pytest/Go testing/etc.]
**Test cases**:
1. [Test case description]
2. [Test case description]
...
```

Then generate the test file.

## Framework Conventions

### JavaScript/TypeScript (Jest/Vitest)

```typescript
describe("functionName", () => {
  it("should do expected behavior when given valid input", () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Python (Pytest)

```python
def test_function_name_does_expected_behavior():
    # Arrange
    # Act
    # Assert
```

### Go

```go
func TestFunctionName_DoesExpectedBehavior(t *testing.T) {
    // Arrange
    // Act
    // Assert
}
```

## What NOT to Do

- Don't test implementation details (private methods, internal state)
- Don't create tests that are harder to read than the code
- Don't mock everything - some integration is valuable
- Don't skip error cases - they're often where bugs hide
