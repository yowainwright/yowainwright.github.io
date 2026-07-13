---
name: bigo-check-js
description: Analyze JavaScript and TypeScript code for Big-O complexity issues. Use when user asks to check performance, find O(n²) patterns, optimize loops, or replace repeated array scans in JS or TS.
---

Scan for algorithmic inefficiencies:

**O(n²) patterns:**

- `.includes()` in loop → use `Set.has()`
- `.find()` in `.map()` → build `Map` first
- Nested loops on same data
- `arr.indexOf()` for dedup → use `new Set()`

**O(n) avoidable:**

- `[...acc, item]` in reduce → use `.push()`
- String concat in loop → use `.join()`

**Search:**

```bash
rg '\.filter\(.*\.includes\(' --type ts
rg '\.map\(.*\.find\(' --type ts
rg '\.\.\.[a-zA-Z]+,' --type ts | rg 'reduce'
```

**Fix examples:**

```js
// Bad: O(n²)
items.filter((x) => targets.includes(x));
// Good: O(n)
const set = new Set(targets);
items.filter((x) => set.has(x));
```
