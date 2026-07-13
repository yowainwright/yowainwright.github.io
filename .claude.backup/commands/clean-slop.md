# Clean Slop

Remove AI-generated cruft, comments, and verbose patterns from code.

## What it removes:

- Comments (you write your own)
- Emojis in code
- Console.log spam
- Nested ternaries
- for...of loops (prefers .map/.filter)
- Complex inline values (hoists to variables)
- Functions > 20 lines
- O(n²) patterns

## Usage

Run this command to check and clean the current file or recent edits.

```bash
# Check specific file
bun run ~/code/config/agent-sync/scripts/check-slop.ts path/to/file.js

# Check all recent changes
git diff --name-only | xargs -I {} bun run ~/code/config/agent-sync/scripts/check-slop.ts {}
```

The cleaner will:

1. Identify slop patterns
2. Show what needs fixing
3. Guide cleanup to match your style preferences
