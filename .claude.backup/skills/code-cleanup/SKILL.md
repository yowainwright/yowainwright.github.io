---
name: code-cleanup
description: Remove code comments, emojis, and verbose text. Use when user mentions cleaning comments, removing emojis, cleanup before commit, or code hygiene.
---

# Code Cleanup Skill

Remove all comments, emojis, and verbose text from changed files.

## Workflow

1. **Get changed files from git diff**
2. **Remove ALL comments**
3. **Remove ALL emojis**
4. **Remove verbose/unnecessary text**
5. **Verify code still works**

---

## What to Remove

### All Code Comments

```javascript
// Remove ALL of these - no exceptions
// Single line comments
/* Block comments */
/** JSDoc comments */
/// Triple slash comments

// The user will add comments back if needed
```

### All Emojis

```javascript
// Remove from everywhere
console.log('🚀 Starting...')  // → console.log('Starting...')
const msg = "Done! 🎉"         // → const msg = "Done!"
```

### Verbose Console Logs

```javascript
// Remove debug/development logs
console.log('here')
console.log('debugging')
console.log('test')
console.log('---')
console.log(someVar)  // Remove if just logging a variable with no context
```

---

## Cleanup Process

### Step 1: Get Changed Files

```bash
git diff --name-only --diff-filter=ACMR
```

### Step 2: For Each File

Remove:
- All `//` comments
- All `/* */` block comments
- All `/** */` JSDoc comments
- All emojis in strings and elsewhere
- Debug console.log statements
- Empty lines left behind (collapse to single blank line max)

### Step 3: Verify

```bash
npm run lint
npm test
```

---

## Patterns to Remove

```javascript
// Single line comments
const x = 1 // comment    →    const x = 1

// Block comments
/* anything */            →    (removed)

// JSDoc
/** @param x */           →    (removed)

// Emojis anywhere
'🚀✨🎉💡🔥⚠️✅🐛'       →    ''

// Trailing emoji
'Hello 👋'                →    'Hello'
```

---

## Output Format

When cleaning up:

1. **List changed files**
2. **Remove all comments from each**
3. **Remove all emojis**
4. **Clean up extra whitespace**
5. **Run lint/tests**

```
## Cleanup Report

### src/utils/api.ts
- Removed 12 comments
- Removed 3 emojis
- Removed 2 debug logs

### src/components/Button.tsx
- Removed 5 comments
- Removed 1 emoji

**Summary:** Cleaned 2 files, removed 17 comments, 4 emojis, 2 debug logs
```
