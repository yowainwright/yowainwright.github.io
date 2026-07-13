# Restore Checkpoint

Restore a previously created checkpoint (savepoint):

## Purpose

Safely rollback to a previous checkpoint when experiments fail or changes don't work out as planned.

## Process

### 1. **List Available Checkpoints**

Show all available checkpoints:

```bash
git tag -l "checkpoint/*"
```

Show checkpoints with commit info:

```bash
git tag -l "checkpoint/*" | xargs -I {} sh -c 'echo "{}:" && git log -1 --oneline {}'
```

### 2. **Review Current Changes**

Before restoring, check what will be lost:

```bash
git status
git diff
```

### 3. **Choose Restore Strategy**

#### Option A: Hard Reset (Destructive - loses all changes)

**⚠️ WARNING: This permanently deletes uncommitted changes**

```bash
# Stash current work first (safety net)
git stash push -m "Before checkpoint restore"

# Reset to checkpoint
git reset --hard checkpoint/CHECKPOINT-NAME

# If you need the stashed work later
git stash list
git stash pop
```

#### Option B: New Branch (Safe - keeps current work)

**✓ RECOMMENDED: Non-destructive approach**

```bash
# Create new branch from checkpoint
git checkout -b restore-CHECKPOINT-NAME checkpoint/CHECKPOINT-NAME

# Your original branch remains unchanged
# Switch back with: git checkout [original-branch]
```

#### Option C: Cherry-pick Specific Changes

```bash
# View what's in the checkpoint
git show checkpoint/CHECKPOINT-NAME

# Cherry-pick specific commits from checkpoint
git cherry-pick [commit-sha]
```

### 4. **Verify Restoration**

Check that you're at the expected state:

```bash
git log -1 --oneline
git status
```

### 5. **Clean Up**

After successful restore, optionally delete the checkpoint:

```bash
git tag -d checkpoint/CHECKPOINT-NAME
```

## Output Format

After restore, provide summary:

```
✓ Restored checkpoint: checkpoint/CHECKPOINT-NAME
  Strategy: [new-branch | hard-reset | cherry-pick]
  Current branch: [branch-name]
  Current commit: [short-sha]

Previous state saved:
  [Information about stash or original branch]
```

## Safety Checklist

Before restoring:

- [ ] Listed all available checkpoints
- [ ] Reviewed current uncommitted changes
- [ ] Chose appropriate restore strategy
- [ ] Stashed or committed current work (if using hard reset)
- [ ] Verified restoration was successful

## Common Scenarios

**Experiment failed, revert everything:**

```bash
git stash push -m "Failed experiment"
git reset --hard checkpoint/before-experiment
```

**Want to compare experiment with checkpoint:**

```bash
git checkout -b experiment-review checkpoint/before-experiment
git diff experiment-branch
```

**Extract specific working code from checkpoint:**

```bash
git show checkpoint/working-version:path/to/file.js > file.js
```

## Best Practices

- Always use new branch strategy unless you're certain about hard reset
- Keep checkpoint tags until feature is completely finished and merged
- Document why you're restoring in commit messages
- Review what changed between checkpoint and current state before restoring
