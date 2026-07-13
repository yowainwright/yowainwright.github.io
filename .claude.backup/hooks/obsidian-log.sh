#!/bin/bash
# Log Claude Code session summary to Obsidian daily note
# Triggered: End of session (Stop hook) or manually via /log-work

OBSIDIAN_PATH="$HOME/code/thoughts/daily"
TODAY=$(date +%Y-%m-%d)
DAILY_NOTE="$OBSIDIAN_PATH/$TODAY.md"

# Get current working directory name as project
PROJECT_NAME=$(basename "$PWD")

# Get git info if available
GIT_BRANCH=""
GIT_STATUS=""
RECENT_COMMITS=""

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  GIT_BRANCH=$(git branch --show-current 2>/dev/null)

  # Count changed files
  CHANGED=$(git diff --name-only 2>/dev/null | wc -l | tr -d ' ')
  STAGED=$(git diff --cached --name-only 2>/dev/null | wc -l | tr -d ' ')

  if [ "$CHANGED" != "0" ] || [ "$STAGED" != "0" ]; then
    GIT_STATUS="$CHANGED changed, $STAGED staged"
  fi

  # Get recent commits from today
  RECENT_COMMITS=$(git log --oneline --since="midnight" --format="%h %s" 2>/dev/null | head -3)
fi

# Build the log entry
TIMESTAMP=$(date +%H:%M)
ENTRY="- [x] \`$TIMESTAMP\` **$PROJECT_NAME**"

if [ -n "$GIT_BRANCH" ]; then
  ENTRY="$ENTRY (\`$GIT_BRANCH\`)"
fi

if [ -n "$GIT_STATUS" ]; then
  ENTRY="$ENTRY — $GIT_STATUS"
fi

# Add recent commits if any
if [ -n "$RECENT_COMMITS" ]; then
  ENTRY="$ENTRY
$(echo "$RECENT_COMMITS" | while read -r line; do echo "  - \`$line\`"; done)"
fi

# Create daily note from template if it doesn't exist
if [ ! -f "$DAILY_NOTE" ]; then
  if [ -f "$OBSIDIAN_PATH/TEMPLATE.md" ]; then
    cp "$OBSIDIAN_PATH/TEMPLATE.md" "$DAILY_NOTE"
  fi
fi

# Insert entry after "## Tasks" line
if [ -f "$DAILY_NOTE" ]; then
  # Check if this exact entry already exists (avoid duplicates)
  if ! grep -qF "$TIMESTAMP\` **$PROJECT_NAME**" "$DAILY_NOTE" 2>/dev/null; then
    # Insert after ## Tasks line
    sed -i '' "/^## Tasks$/a\\
$ENTRY
" "$DAILY_NOTE" 2>/dev/null || \
    sed -i "/^## Tasks$/a\\$ENTRY" "$DAILY_NOTE" 2>/dev/null
  fi
fi

exit 0
