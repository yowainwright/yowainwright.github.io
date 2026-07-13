---
name: code-improve
description: Improve code quality following best practices. Use when user asks to clean up code, improve a file, refactor for readability, optimize code structure, or apply coding standards.
---

# Code Improve Skill

When improving a file, apply these transformations in order:

## 1. Big-O Optimization

Look for algorithmic improvements:

```javascript
// BAD: O(n²) - nested loops with includes
const duplicates = arr.filter((item, i) => arr.indexOf(item) !== i);

// GOOD: O(n) - use Set
const seen = new Set();
const duplicates = arr.filter((item) => {
  if (seen.has(item)) return true;
  seen.add(item);
  return false;
});
```

```javascript
// BAD: O(n) lookup each time
const users = [{ id: 1, name: 'Alice' }, ...]
const getUser = (id) => users.find(u => u.id === id)

// GOOD: O(1) lookup with Map
const usersById = new Map(users.map(u => [u.id, u]))
const getUser = (id) => usersById.get(id)
```

```javascript
// BAD: O(n²) - repeated array operations
items.forEach((item) => {
  if (!result.includes(item.category)) {
    result.push(item.category);
  }
});

// GOOD: O(n) - Set then spread
const categories = [...new Set(items.map((item) => item.category))];
```

## 2. Prefer Immutability

Always use `const`. Use `let` only when reassignment is truly necessary:

```javascript
// BAD
let name = "Alice";
let items = [];
var config = {};

// GOOD
const name = "Alice";
const items = [];
const config = {};
```

Avoid mutations - return new values:

```javascript
// BAD: mutates original
function addItem(arr, item) {
  arr.push(item);
  return arr;
}

// GOOD: returns new array
const addItem = (arr, item) => [...arr, item];

// BAD: mutates object
user.name = "Bob";

// GOOD: spread to new object
const updatedUser = { ...user, name: "Bob" };
```

## 3. Array/Object/String Prototype Methods Over Loops

Replace `for` loops with declarative methods (unless performance-critical hot path):

```javascript
// BAD: for loop
const results = [];
for (let i = 0; i < items.length; i++) {
  if (items[i].active) {
    results.push(items[i].name);
  }
}

// GOOD: filter + map
const results = items.filter((item) => item.active).map((item) => item.name);
```

```javascript
// BAD: for loop to find
let found = null;
for (let i = 0; i < items.length; i++) {
  if (items[i].id === targetId) {
    found = items[i];
    break;
  }
}

// GOOD: find
const found = items.find((item) => item.id === targetId);
```

```javascript
// BAD: for loop to check existence
let hasAdmin = false;
for (let i = 0; i < users.length; i++) {
  if (users[i].role === "admin") {
    hasAdmin = true;
    break;
  }
}

// GOOD: some
const hasAdmin = users.some((user) => user.role === "admin");
```

```javascript
// BAD: for loop to sum
let total = 0;
for (let i = 0; i < items.length; i++) {
  total += items[i].price;
}

// GOOD: reduce
const total = items.reduce((sum, item) => sum + item.price, 0);
```

```javascript
// BAD: for loop to build object
const byId = {};
for (let i = 0; i < items.length; i++) {
  byId[items[i].id] = items[i];
}

// GOOD: Object.fromEntries
const byId = Object.fromEntries(items.map((item) => [item.id, item]));
```

String methods:

```javascript
// BAD: manual iteration
let result = "";
for (let i = 0; i < words.length; i++) {
  result += words[i] + " ";
}

// GOOD: join
const result = words.join(" ");
```

**Exception**: Keep `for` loop if profiling shows significant perf difference in hot path.

## 4. Hoist If-Statement Logic

Extract complex conditions to named booleans:

```javascript
// BAD: inline complex condition
if (user.age >= 18 && user.verified && !user.banned && user.subscription.active) {
  grantAccess();
}

// GOOD: hoisted with descriptive name
const isEligibleForAccess =
  user.age >= 18 && user.verified && !user.banned && user.subscription.active;

if (isEligibleForAccess) {
  grantAccess();
}
```

```javascript
// BAD: nested conditions
if (request.method === "POST") {
  if (request.headers["content-type"] === "application/json") {
    if (request.body && request.body.data) {
      process(request.body.data);
    }
  }
}

// GOOD: hoisted conditions with early returns
const isPostRequest = request.method === "POST";
const isJsonContent = request.headers["content-type"] === "application/json";
const hasData = request.body?.data;

if (!isPostRequest || !isJsonContent || !hasData) return;

process(request.body.data);
```

## 5. Hoist Object Value Assignment

Extract complex expressions from object literals:

```javascript
// BAD: complex inline expressions
const response = {
  user: {
    name: user.firstName + " " + user.lastName,
    age: new Date().getFullYear() - new Date(user.birthDate).getFullYear(),
    permissions: user.roles
      .flatMap((role) => role.permissions)
      .filter((p, i, arr) => arr.indexOf(p) === i),
  },
  timestamp: new Date().toISOString(),
};

// GOOD: hoisted with clear names
const fullName = `${user.firstName} ${user.lastName}`;
const birthYear = new Date(user.birthDate).getFullYear();
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;
const permissions = [...new Set(user.roles.flatMap((role) => role.permissions))];
const timestamp = new Date().toISOString();

const response = {
  user: { name: fullName, age, permissions },
  timestamp,
};
```

## 6. Break Up Long Functions

Functions should be single-purpose and ideally under 20 lines:

```javascript
// BAD: one long function doing everything
function processOrder(order) {
  // 50+ lines of validation, calculation, formatting, saving...
}

// GOOD: broken into focused functions
const validateOrder = (order) => {
  const hasItems = order.items.length > 0;
  const hasValidTotal = order.total > 0;
  return hasItems && hasValidTotal;
};

const calculateTax = (subtotal, taxRate) => subtotal * taxRate;

const calculateTotal = (items, taxRate) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = calculateTax(subtotal, taxRate);
  return subtotal + tax;
};

const formatOrderResponse = (order, total) => ({
  orderId: order.id,
  total,
  status: "confirmed",
});

const processOrder = (order) => {
  if (!validateOrder(order)) return null;

  const total = calculateTotal(order.items, order.taxRate);
  return formatOrderResponse(order, total);
};
```

## 7. Extract Constants

Move magic numbers and strings to a constants file:

**Before** (in component file):

```javascript
if (retries > 3) { ... }
setTimeout(fn, 5000)
if (status === 'PENDING_REVIEW') { ... }
```

**After** - create `constants.ts`:

```typescript
// constants.ts
export const MAX_RETRIES = 3;
export const TIMEOUT_MS = 5000;

export const ORDER_STATUS = {
  PENDING_REVIEW: "PENDING_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;
```

```typescript
// component file
import { MAX_RETRIES, TIMEOUT_MS, ORDER_STATUS } from './constants'

if (retries > MAX_RETRIES) { ... }
setTimeout(fn, TIMEOUT_MS)
if (status === ORDER_STATUS.PENDING_REVIEW) { ... }
```

## 8. Extract Types and Interfaces

Move type definitions to dedicated files:

**Before** (types inline):

```typescript
interface User {
  id: string
  name: string
  email: string
}

interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
}

interface OrderItem {
  productId: string
  quantity: number
  price: number
}

function processOrder(user: User, order: Order): void { ... }
```

**After** - create `types.ts` or `interfaces.ts`:

```typescript
// types.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
}
```

```typescript
// service file
import type { User, Order } from './types'

const processOrder = (user: User, order: Order): void => { ... }
```

## Output Format

When improving a file, provide:

1. **Summary of changes** - Brief list of what was improved
2. **Before/After** - Show key transformations
3. **New files created** - If constants.ts or types.ts were extracted
4. **Performance notes** - If any changes affect Big-O or runtime

```markdown
## Improvements Applied

1. **Big-O**: Replaced O(n²) lookup with Map for O(1) access
2. **Immutability**: Changed 3 `let` to `const`, removed 2 mutations
3. **Array methods**: Replaced 2 for-loops with filter/map/reduce
4. **Hoisted conditions**: Extracted 2 complex if-conditions to named booleans
5. **Hoisted values**: Extracted 3 complex object values to variables
6. **Split functions**: Broke `processData` (47 lines) into 4 focused functions
7. **Constants**: Moved 5 magic values to `constants.ts`
8. **Types**: Extracted 3 interfaces to `types.ts`
```

## Checklist Before Finishing

- [ ] All `var` → `const` (or `let` if truly needed)
- [ ] No direct mutations of arrays/objects
- [ ] No `for`/`while` loops that could be array methods
- [ ] Complex conditions hoisted to named booleans
- [ ] Complex object values hoisted to named variables
- [ ] No function over 20 lines
- [ ] Magic numbers/strings in constants file
- [ ] Types/interfaces in dedicated file
- [ ] Big-O is optimal (no nested loops when avoidable)
