---
name: code-quality-check
description: Comprehensive code quality audit. Use when user asks to check code quality, review for best practices, audit a file, or ensure code meets standards.
---

# Code Quality Check

Audit code for quality issues across multiple dimensions: type safety, immutability, reactiveness, testing, and more.

## Usage

```
/code-quality-check src/utils.ts
/code-quality-check src/**/*.ts
/code-quality-check --fix src/
```

## Quality Dimensions

### 1. Type Safety (TypeScript)

#### No `any` Types

```typescript
// BAD
const data: any = fetchData();
function process(input: any): any;

// GOOD
const data: User = fetchData();
function process(input: unknown): Result;
function process<T>(input: T): ProcessedResult<T>;
```

#### No Type Assertions Without Validation

```typescript
// BAD
const user = data as User

// GOOD
const user = validateUser(data)
if (isUser(data)) { ... }
```

#### Prefer `unknown` Over `any`

```typescript
// BAD
catch (e: any) { console.log(e.message) }

// GOOD
catch (e: unknown) {
  if (e instanceof Error) console.log(e.message)
}
```

### 2. Immutability

#### Prefer `const`

```typescript
// BAD
let name = "Alice";
let items = [];
var config = {};

// GOOD
const name = "Alice";
const items: string[] = [];
const config: Config = {};
```

#### No Direct Mutations

```typescript
// BAD
user.name = "Bob";
items.push(newItem);
arr.sort();

// GOOD
const updatedUser = { ...user, name: "Bob" };
const newItems = [...items, newItem];
const sorted = [...arr].sort();
```

#### Prefer Readonly Types

```typescript
// BAD
interface Config {
  apiUrl: string;
  timeout: number;
}

// GOOD
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}
// or
type Config = Readonly<{
  apiUrl: string;
  timeout: number;
}>;
```

### 3. Reactiveness

#### Prefer Reactive Patterns

```typescript
// BAD - imperative polling
setInterval(() => {
  const data = fetchData();
  updateUI(data);
}, 1000);

// GOOD - reactive stream
const data$ = interval(1000).pipe(
  switchMap(() => from(fetchData())),
  shareReplay(1),
);
data$.subscribe(updateUI);
```

#### Prefer Observables Over Promises for Streams

```typescript
// BAD - promise chain for ongoing events
async function watchChanges() {
  while (true) {
    const change = await getNextChange();
    process(change);
  }
}

// GOOD - observable stream
function watchChanges(): Observable<Change> {
  return new Observable((subscriber) => {
    const unsubscribe = onChange((change) => subscriber.next(change));
    return unsubscribe;
  });
}
```

#### Prefer Declarative Over Imperative

```typescript
// BAD
let result = [];
for (const item of items) {
  if (item.active) {
    result.push(transform(item));
  }
}

// GOOD
const result = items.filter((item) => item.active).map(transform);
```

### 4. Testing

#### Has Corresponding Test File

```
src/utils.ts       -> src/utils.test.ts OR tests/utils.test.ts
src/api/client.ts  -> src/api/client.test.ts
```

#### Tests Cover Key Paths

- Happy path
- Error cases
- Edge cases (null, empty, boundary)
- Async behavior

#### Test Structure

```typescript
// GOOD - clear arrange/act/assert
test("returns user when found", async () => {
  const mockUser = createMockUser();
  db.users.findOne.mockResolvedValue(mockUser);

  const result = await getUser("123");

  expect(result).toEqual(mockUser);
});
```

### 5. Error Handling

#### No Swallowed Errors

```typescript
// BAD
try {
  riskyOp();
} catch {}
try {
  riskyOp();
} catch (e) {
  console.log(e);
}

// GOOD
try {
  riskyOp();
} catch (e) {
  logger.error("riskyOp failed", { error: e });
  throw new AppError("Operation failed", { cause: e });
}
```

#### Typed Error Handling

```typescript
// BAD
throw new Error("not found");

// GOOD
class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`);
    this.name = "NotFoundError";
  }
}
throw new NotFoundError("User", userId);
```

### 6. Function Design

#### Single Responsibility

```typescript
// BAD - does too much
function processUser(user: User) {
  validate(user)
  const enriched = enrich(user)
  save(enriched)
  notify(enriched)
  log(enriched)
}

// GOOD - single purpose
const validateUser = (user: User): ValidatedUser => ...
const enrichUser = (user: ValidatedUser): EnrichedUser => ...
const saveUser = (user: EnrichedUser): Promise<void> => ...
```

#### Max 20 Lines

Flag functions exceeding 20 lines for potential extraction.

#### Pure When Possible

```typescript
// BAD - side effect
function calculateTotal(items: Item[]): number {
  console.log("calculating..."); // side effect
  return items.reduce((sum, i) => sum + i.price, 0);
}

// GOOD - pure
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, i) => sum + i.price, 0);
}
```

### 7. Async Patterns

#### No Floating Promises

```typescript
// BAD
saveData(data); // unhandled promise

// GOOD
await saveData(data);
void saveData(data); // explicitly fire-and-forget
saveData(data).catch(handleError);
```

#### Prefer async/await Over .then()

```typescript
// BAD
function getData() {
  return fetch(url)
    .then((r) => r.json())
    .then((data) => process(data));
}

// GOOD
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  return process(data);
}
```

### 8. Naming

#### Descriptive Names

```typescript
// BAD
const d = new Date();
const u = getUser();
const fn = (x) => x * 2;

// GOOD
const createdAt = new Date();
const currentUser = getUser();
const double = (value: number) => value * 2;
```

#### Boolean Prefixes

```typescript
// BAD
const active = true;
const permission = hasAccess();

// GOOD
const isActive = true;
const hasPermission = hasAccess();
const canEdit = checkEditPermission();
const shouldRefresh = needsRefresh();
```

## Output Format

```markdown
## Code Quality Report: src/utils.ts

### Summary

- Type Safety: 🔴 3 issues
- Immutability: 🟡 2 issues
- Reactiveness: 🟢 OK
- Testing: 🔴 No tests found
- Error Handling: 🟡 1 issue

### Issues

#### Type Safety 🔴

| Line | Issue                   | Suggestion                        |
| ---- | ----------------------- | --------------------------------- |
| 12   | `any` type used         | Use `unknown` or define interface |
| 34   | Unsafe type assertion   | Add type guard                    |
| 56   | Implicit `any` in catch | Type as `unknown`                 |

#### Immutability 🟡

| Line | Issue                 | Suggestion                   |
| ---- | --------------------- | ---------------------------- |
| 23   | `let` can be `const`  | Change to `const`            |
| 45   | Direct array mutation | Use spread: `[...arr, item]` |

#### Testing 🔴

- No test file found at `src/utils.test.ts`
- Suggested test cases:
  - `processData` happy path
  - `processData` with empty input
  - `processData` error handling

### Auto-fixable

Run with `--fix` to automatically fix:

- 2x `let` → `const`
- 1x Add explicit `unknown` type

### Manual Review Required

- Line 12: Define proper interface for API response
- Line 34: Implement type guard for User validation
```

## Grep Patterns

```bash
# any types
rg ': any' --type ts
rg 'as any' --type ts

# let that could be const
rg '^(\s*)let ' --type ts

# direct mutations
rg '\.push\(|\.pop\(|\.shift\(|\.unshift\(|\.splice\(' --type ts

# empty catch
rg 'catch\s*\(\s*\w*\s*\)\s*\{\s*\}' --type ts

# floating promises (rough)
rg '^\s+\w+\([^)]*\)\s*$' --type ts

# missing test files
# Compare src/**/*.ts against **/*.test.ts
```
