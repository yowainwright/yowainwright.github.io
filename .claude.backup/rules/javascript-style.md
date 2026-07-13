<!-- Version: 2024-02-16,bac0bd8 -->

# JavaScript/TypeScript Style

## Immutability

- **Always prefer `const` over `let`** - Use `const` by default, only use `let` when reassignment is truly necessary
- **Avoid mutating data structures** - Use spread operators, `.map()`, `.filter()`, `.reduce()` that return new arrays/objects
- **Prefer functional patterns** over imperative mutations

## Code Clarity

### Hoist Complex Logic

- **Extract conditional expressions** - Move complex if-statement conditions into well-named boolean variables
  ```javascript
  // Good
  const isValidUser = user.isActive && user.hasPermission && !user.isBlocked
  if (isValidUser) { ... }
  ```
- **Extract object assignment logic** - Complex expressions in object properties should be hoisted to descriptive variables
  ```javascript
  // Good
  const formattedDate = new Date(timestamp).toISOString();
  const userProfile = { name, date: formattedDate };
  ```

### Function Design

- **Keep functions single-purpose** - Each function should do one thing well
- **Break up functions over 20 lines** - Long functions should be split into smaller, focused functions
- **Avoid nested functions more than 2 levels deep** - Extract or refactor deeply nested logic

## Destructuring & Map Patterns

### Map Callbacks

- **Destructure in the parameter** - Not inside the body
- **Use defaults in the destructure** - When the value may be missing

  ```javascript
  // Good
  items.map(({ name, value = "Unknown" }) => { ... })

  // Bad
  items.map((item) => {
    const { name, value } = item
    ...
  })
  ```

### Domain/Record Lookups

- **Assign lookup to named intermediate** - Debuggable
- **Access properties explicitly** - Don't destructure the lookup result
- **Use optional chaining with fallback** - `?.` on lookup, `|| {}` fallback

  ```javascript
  // Good - debuggable intermediate
  const domainData = domains?.[domain] || {};
  const companyName = domainData?.companyName || null;
  const favicon = domainData?.favicon || null;

  // Bad - can't inspect domainData in debugger
  const { companyName = null, favicon = null } = domains[domain] ?? {};
  ```

### Guiding Principle

Destructure where it simplifies readability, but not where it prevents debugging. Named intermediates for external lookups; inline destructuring for known structures.

## Control Flow

- **Prefer array methods over loops** - Use `.map()`, `.filter()`, `.reduce()`, `.find()`, `.some()`, `.every()` instead of `for`/`while` loops
- **Avoid nested if statements** - Use early returns, guard clauses, or strategy patterns
  ```javascript
  // Good - early returns
  if (!user) return null;
  if (!user.isActive) return null;
  return processUser(user);
  ```
