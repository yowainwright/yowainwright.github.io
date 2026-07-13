# Create Checkpoint

Create a git-based checkpoint (savepoint) for safe experimentation:

## Purpose

Create a named savepoint before making risky changes, refactoring, or trying experimental approaches. Checkpoints allow you to safely explore without fear of breaking working code.

## Process

### 1. **Verify Clean State**

Check git status to ensure current work is committed or stashed:

```bash
git status
```

If there are uncommitted changes, decide:

- Commit them first (recommended)
- Stash them (will be included in checkpoint restore)
- Abort checkpoint creation

### 2. **Create Checkpoint Tag**

Create a lightweight git tag with descriptive name:

```bash
git tag checkpoint/DESCRIPTION
```

Examples:

- `checkpoint/before-auth-refactor`
- `checkpoint/working-api`
- `checkpoint/pre-performance-optimization`

### 3. **Verify Checkpoint Created**

List recent checkpoints:

```bash
git tag -l "checkpoint/*" | tail -5
```

### 4. **Document Checkpoint**

Output checkpoint information:

```
✓ Checkpoint created: checkpoint/DESCRIPTION
  Branch: [current-branch]
  Commit: [short-sha]

To restore this checkpoint:
  git checkout -b restore-branch checkpoint/DESCRIPTION

To delete this checkpoint:
  git tag -d checkpoint/DESCRIPTION
```

## Usage Pattern

**Before risky changes:**

```
/checkpoint-create before-database-migration
[Make experimental changes...]
[If successful: continue]
[If failed: /checkpoint-restore before-database-migration]
```

## Best Practices

- Use descriptive checkpoint names
- Create checkpoints before major refactors
- Create checkpoints before dependency upgrades
- Create checkpoints before architecture changes
- Don't create too many - clean up old ones periodically

## Cleanup

List and remove old checkpoints:

```bash
# List all checkpoints
git tag -l "checkpoint/*"

# Delete specific checkpoint
git tag -d checkpoint/old-experiment

# Delete all checkpoints older than working branch
git tag -l "checkpoint/*" | xargs git tag -d
```
