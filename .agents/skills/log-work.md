# Log Work to Obsidian

Log the current session's work to your Obsidian daily note.

## Instructions

1. First, gather context about what was done this session:
   - Run `git status` to see current changes
   - Run `git diff --stat` to see file change summary
   - Run `git log --oneline -5` to see recent commits

2. Create a concise task entry for Obsidian with this format:
   ```
   - [x] `HH:MM` **project-name** (`branch`) — summary
     - `abc1234` commit message
     - Files: `file1.ts`, `file2.ts`
   ```

3. Append to today's daily note at `~/code/thoughts/daily/YYYY-MM-DD.md` under `## Tasks`

4. Keep it extremely concise:
   - One line summary of what was accomplished
   - List commits if any (just hash + message)
   - List key files touched (max 5)
   - Note PR status if relevant (opened, merged, etc.)

## Example Output

```markdown
- [x] `14:32` **vim-adventure** (`main`) — Added nvim learning materials
  - `dee59f0` Initial commit
  - Files: `CHEATSHEET.md`, `EXERCISES.md`, `CONFIG-EXPLAINED.md`
```

## Rules

- Do NOT ask for confirmation, just log it
- Keep summaries under 10 words
- Use backticks for code/files/hashes
- Mark task as complete `[x]` since work was done
