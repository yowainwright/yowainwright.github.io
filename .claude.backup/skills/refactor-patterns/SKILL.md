---
name: refactor-patterns
description: Apply refactoring patterns. Use when user asks to clean up code, reduce complexity, extract functions, or improve code structure.
---

# Refactoring Patterns Skill

When refactoring code:

## Priority Order

1. **Extract** - Pull out reusable logic
2. **Simplify** - Remove unnecessary complexity
3. **Clarify** - Better names, structure
4. **Flatten** - Reduce nesting depth

## Common Refactors

### Extract Function

```javascript
// Before
if (user.age >= 18 && user.verified && !user.banned) { ... }

// After
const canAccessContent = (user) =>
  user.age >= 18 && user.verified && !user.banned;

if (canAccessContent(user)) { ... }
```

### Replace Conditionals with Early Returns

```javascript
// Before
function process(user) {
  if (user) {
    if (user.active) {
      return doWork(user);
    }
  }
  return null;
}

// After
function process(user) {
  if (!user) return null;
  if (!user.active) return null;
  return doWork(user);
}
```

### Replace Loop with Array Methods

```javascript
// Before
const results = [];
for (let i = 0; i < items.length; i++) {
  if (items[i].active) {
    results.push(items[i].name);
  }
}

// After
const results = items.filter((item) => item.active).map((item) => item.name);
```

### Extract Configuration

```javascript
// Before
if (retries > 3) { ... }
setTimeout(fn, 5000);

// After
const CONFIG = { maxRetries: 3, timeoutMs: 5000 };
if (retries > CONFIG.maxRetries) { ... }
setTimeout(fn, CONFIG.timeoutMs);
```

## Rules

- One change at a time
- Run tests after each refactor
- Keep behavior identical
- Prefer small, incremental changes
