---
name: git-conflict-resolve
description: Resolve git merge conflicts. Use when user mentions merge conflict, conflict markers, git merge, rebase conflict, or shows standard conflict marker blocks.
---

# Git Conflict Resolve Skill

When helping resolve merge conflicts:

## Understanding Conflict Markers

```
<<<<<<< HEAD (or current branch name)
Your current changes
=======
Incoming changes from the branch being merged
>>>>>>> feature-branch (or commit hash)
```

## Resolution Strategies

### 1. Keep Current (Ours)

Use the version from the current branch:

```javascript
// Before
<<<<<<< HEAD
const timeout = 5000
=======
const timeout = 3000
>>>>>>> feature

// After - keeping current
const timeout = 5000
```

### 2. Keep Incoming (Theirs)

Use the version from the merging branch:

```javascript
// Before
<<<<<<< HEAD
const timeout = 5000
=======
const timeout = 3000
>>>>>>> feature

// After - accepting incoming
const timeout = 3000
```

### 3. Keep Both

When both changes should be preserved:

```javascript
// Before
<<<<<<< HEAD
import { Button } from './Button'
=======
import { Card } from './Card'
>>>>>>> feature

// After - keeping both
import { Button } from './Button'
import { Card } from './Card'
```

### 4. Manual Merge

Combine logic from both versions:

```javascript
// Before
<<<<<<< HEAD
const config = {
  timeout: 5000,
  retries: 3,
}
=======
const config = {
  timeout: 3000,
  maxConnections: 10,
}
>>>>>>> feature

// After - merged manually
const config = {
  timeout: 5000,        // Keep current
  retries: 3,           // Keep current
  maxConnections: 10,   // Add from incoming
}
```

## Common Conflict Patterns

### Import Conflicts

Often both are needed:

```javascript
// Usually resolve by keeping both imports
import { A } from "./a";
import { B } from "./b"; // Add both
```

### Package.json Conflicts

Merge dependency lists:

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "next": "^15.0.0",
    "new-dep-from-current": "^1.0.0",
    "new-dep-from-incoming": "^2.0.0"
  }
}
```

**Important:** After resolving package.json, run `bun install` / `npm install` to regenerate lockfile.

### Lock File Conflicts

**Never manually resolve lockfiles.** Instead:

```bash
# Accept either version, then regenerate
git checkout --theirs bun.lock  # or package-lock.json
bun install  # regenerates correctly
```

### Adjacent Line Changes

When changes are near each other but don't overlap:

```javascript
// Before
<<<<<<< HEAD
function process(data) {
  validate(data)
  return transform(data)
=======
function process(data) {
  log('processing')
  return transform(data)
>>>>>>> feature
}

// After - include both changes
function process(data) {
  log('processing')      // From incoming
  validate(data)         // From current
  return transform(data)
}
```

## Resolution Workflow

1. **Identify all conflicts**

   ```bash
   git diff --name-only --diff-filter=U
   ```

2. **For each file:**
   - Read the conflict context
   - Understand what each side intended
   - Choose resolution strategy
   - Remove ALL conflict markers

3. **Verify resolution**

   ```bash
   # Check no markers remain
   grep -r "<<<<<<" .
   grep -r "======" .
   grep -r ">>>>>>" .
   ```

4. **Test the resolved code**
   - Run linting
   - Run tests
   - Build project

5. **Stage and continue**
   ```bash
   git add <resolved-files>
   git merge --continue   # or git rebase --continue
   ```

## Questions to Ask

When the right resolution isn't obvious:

1. **What was the intent of each change?**
   - Look at commit messages
   - Check PR descriptions

2. **Are the changes compatible?**
   - Can both coexist?
   - Is one a superset of the other?

3. **What's the correct behavior?**
   - Which version is correct for the current requirements?
   - Do we need functionality from both?

4. **Are there related changes elsewhere?**
   - A change in one file may depend on changes in another
   - Check if incoming branch modified other files

## Output Format

When resolving conflicts:

1. **Show the conflict** - Display original markers
2. **Explain both sides** - What each version does
3. **Recommend resolution** - Which strategy and why
4. **Show resolved code** - Clean version without markers
5. **Note dependencies** - If other files may be affected
