---
name: test-debug
description: Debug failing tests. Use when user mentions test failures, failing specs, test errors, jest/vitest/pytest failures, or needs help fixing broken tests.
---

# Test Debug Skill

When helping debug failing tests:

## Diagnostic Approach

1. **Read the error** - Understand what failed
2. **Identify the type** - Assertion, timeout, setup, mock?
3. **Isolate the cause** - Is it the test or the code?
4. **Fix systematically** - One issue at a time

---

## Common Failure Patterns

### Assertion Failures

```
Expected: "hello"
Received: "Hello"
```

**Diagnose:**

- Case sensitivity issue
- Check actual vs expected carefully
- Look for whitespace differences

```typescript
// Fix: Use case-insensitive match
expect(result.toLowerCase()).toBe("hello");

// Or fix the code
return text.toLowerCase();
```

### Timeout Errors

```
Timeout - Async callback was not invoked within 5000ms
```

**Diagnose:**

- Missing await
- Unresolved promise
- Infinite loop
- Slow external service

```typescript
// Bad - missing await
test("fetches data", () => {
  const data = fetchData(); // Promise not awaited
  expect(data).toBeDefined();
});

// Good
test("fetches data", async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

### Mock Issues

```
Cannot read property 'mockReturnValue' of undefined
```

**Diagnose:**

- Mock not set up correctly
- Wrong import path
- Module not hoisted

```typescript
// Bad - mock after import
import { api } from "./api";
jest.mock("./api");

// Good - mock before import (or use vi.mock at top)
vi.mock("./api", () => ({
  api: {
    fetch: vi.fn(),
  },
}));

import { api } from "./api";
```

### State Pollution

```
Expected: 0
Received: 3
```

**Diagnose:**

- Previous test modified shared state
- Missing cleanup/reset
- Singleton not reset

```typescript
// Add cleanup
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  resetStore();
});

afterEach(() => {
  cleanup();
});
```

---

## Framework-Specific Debugging

### Vitest / Jest

```typescript
// Run single test
npx vitest run -t "should fetch user"

// Run with verbose output
npx vitest run --reporter=verbose

// Debug mode (Node inspector)
npx vitest --inspect-brk

// Show full diff
npx vitest --diff
```

**Common fixes:**

```typescript
// Async/await issues
test("async test", async () => {
  await expect(asyncFn()).resolves.toBe("value");
  await expect(asyncFn()).rejects.toThrow("error");
});

// Timer issues
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("debounce", () => {
  const fn = vi.fn();
  const debounced = debounce(fn, 100);

  debounced();
  expect(fn).not.toHaveBeenCalled();

  vi.advanceTimersByTime(100);
  expect(fn).toHaveBeenCalledTimes(1);
});
```

### React Testing Library

```
Unable to find an element with the text: /hello/i
```

**Diagnose:**

- Element not rendered yet
- Wrong query method
- Text in nested element

```typescript
// Bad - sync query for async content
const element = screen.getByText("Loading...");

// Good - wait for element
const element = await screen.findByText("Hello");

// Debug what's rendered
screen.debug();

// Find by role (more resilient)
const button = screen.getByRole("button", { name: /submit/i });

// Check element exists
expect(screen.queryByText("Error")).not.toBeInTheDocument();
```

### Pytest

```
AssertionError: assert 'hello' == 'Hello'
```

**Diagnose:**

```python
# Run single test
pytest tests/test_user.py::test_create_user -v

# Show print statements
pytest -s

# Stop on first failure
pytest -x

# Show locals on failure
pytest -l

# Debug with pdb
pytest --pdb
```

**Common fixes:**

```python
# Fixture not applied
@pytest.fixture
def db():
    return create_test_db()

def test_user(db):  # Must accept fixture as arg
    user = db.create_user("test")
    assert user.name == "test"

# Async test
@pytest.mark.asyncio
async def test_async_fetch():
    result = await fetch_data()
    assert result == expected

# Parametrized test
@pytest.mark.parametrize("input,expected", [
    ("hello", "HELLO"),
    ("world", "WORLD"),
])
def test_upper(input, expected):
    assert input.upper() == expected
```

### Go Tests

```
--- FAIL: TestUser (0.00s)
    user_test.go:15: expected "hello", got "Hello"
```

**Diagnose:**

```bash
# Run single test
go test -run TestUser -v

# With race detection
go test -race ./...

# Show coverage
go test -cover

# Generate coverage report
go test -coverprofile=coverage.out
go tool cover -html=coverage.out
```

**Common fixes:**

```go
// Table-driven tests
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive", 1, 2, 3},
        {"negative", -1, -2, -3},
        {"zero", 0, 0, 0},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := Add(tt.a, tt.b)
            if result != tt.expected {
                t.Errorf("Add(%d, %d) = %d; want %d",
                    tt.a, tt.b, result, tt.expected)
            }
        })
    }
}

// Cleanup
func TestWithDB(t *testing.T) {
    db := setupTestDB(t)
    t.Cleanup(func() {
        db.Close()
    })
    // test code
}
```

---

## Debug Strategies

### Isolate the Test

```bash
# Run just the failing test
npx vitest run -t "specific test name"
pytest -k "test_specific_function"
go test -run TestSpecificFunction
```

### Add Logging

```typescript
// Temporarily add console.log
test("debug me", () => {
  const result = complexFunction(input);
  console.log("Result:", JSON.stringify(result, null, 2));
  expect(result).toBe(expected);
});
```

### Check Test in Isolation

```typescript
// Does it fail when run alone?
npx vitest run path/to/test.ts

// Does it only fail with other tests?
npx vitest run  # All tests
```

### Simplify the Test

```typescript
// Comment out parts to find the failure point
test("complex test", () => {
  const user = createUser();
  // const result = processUser(user)
  // expect(result.status).toBe('active')
  expect(user).toBeDefined(); // Start simple
});
```

---

## Flaky Test Patterns

### Race Conditions

```typescript
// Bad - race condition
test("concurrent updates", async () => {
  await Promise.all([update(1), update(2)]);
  expect(counter).toBe(2); // Flaky!
});

// Good - sequential or explicit handling
test("concurrent updates", async () => {
  await update(1);
  await update(2);
  expect(counter).toBe(2);
});
```

### Time-Dependent

```typescript
// Bad - depends on real time
test("expiration", () => {
  const token = createToken();
  expect(token.isExpired()).toBe(false);
});

// Good - control time
test("expiration", () => {
  vi.setSystemTime(new Date("2024-01-01"));
  const token = createToken();

  vi.setSystemTime(new Date("2024-01-02"));
  expect(token.isExpired()).toBe(true);
});
```

### Order-Dependent

```typescript
// Bad - relies on test order
let user: User;

test("creates user", () => {
  user = createUser();
});

test("updates user", () => {
  updateUser(user); // Fails if run alone!
});

// Good - each test is independent
test("updates user", () => {
  const user = createUser();
  updateUser(user);
});
```

## Output Format

When debugging tests:

1. **Quote the error** - Show exact failure message
2. **Identify the type** - Assertion, timeout, mock, etc.
3. **Explain the cause** - Why it's failing
4. **Show the fix** - Code change needed
5. **Prevent recurrence** - Patterns to avoid
