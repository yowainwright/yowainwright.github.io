---
name: code-hygiene
description: Remove comments, emojis, debug logs, and AI-generated bloat from code files. Use when user asks to clean generated clutter, remove noisy comments, strip debug output, or make code less verbose.
---

Remove all comments, emojis, debug console.logs, and AI-generated bloat.

**Targets:**

- `//` and `/* */` comments
- Emojis in strings/comments
- Debug logs: `console.log('debug')`, `console.log('here')`
- AI attribution comments
- Empty README files
- Section divider comments

**Usage:**

```bash
rg '//' --type ts | head -20  # Find comments to remove
```

**Common patterns:**

```js
// Remove obvious comments
// Initialize counter
let counter = 0

// Remove debug logs
console.log('here')
console.log(someVar)

// Remove emojis
console.log('🚀 Starting..') → console.log('Starting..')
```

Verify syntax after cleanup: `npm run lint`
