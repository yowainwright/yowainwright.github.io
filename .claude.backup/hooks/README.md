# Claude Code Hooks

This directory contains hook scripts that run in response to Claude Code events.

## Hook Types

| Hook | Trigger | Use Case |
|------|---------|----------|
| `PreToolUse` | Before a tool runs | Block dangerous operations, validate inputs |
| `PostToolUse` | After a tool runs | Log actions, validate outputs |
| `Notification` | On notifications | Custom alerts, logging |
| `Stop` | When Claude stops | Cleanup, final validations |

## Configuration

Hooks are configured in `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash hooks/pre-write-check.sh $FILEPATH"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash hooks/post-bash-log.sh"
          }
        ]
      }
    ]
  }
}
```

## Hook Scripts

### pre-write-check.sh
Validates files before writing (e.g., no secrets, valid syntax).

### post-bash-log.sh
Logs bash commands for audit trail.

### pre-tool-security.sh
Security checks before tool execution.

## Environment Variables

Hooks receive context via environment variables:
- `$TOOL_NAME` - Name of the tool being used
- `$FILEPATH` - File path (for file operations)
- `$CONTENT` - Content being written (for Write tool)

## Best Practices

1. **Keep hooks fast** - They run synchronously
2. **Exit 0 to allow** - Non-zero blocks the operation
3. **Log sparingly** - Avoid noisy output
4. **Test thoroughly** - Broken hooks break Claude Code

## Examples

See individual hook files in this directory for implementation examples.
