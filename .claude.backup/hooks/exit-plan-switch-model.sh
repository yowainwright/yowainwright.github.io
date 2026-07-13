#!/bin/bash

# Hook: Automatically switch from Opus to Sonnet when exiting plan mode
# This saves costs by using expensive Opus only during planning

# Check if we're using Opus and the tool is ExitPlanMode
if [[ "$TOOL_NAME" == "ExitPlanMode" ]]; then
    # Get current model from Claude
    current_model=$(claude --status 2>/dev/null | grep -i "model:" | awk '{print $2}')

    if [[ "$current_model" == "opus" ]] || [[ "$current_model" == *"opus"* ]]; then
        echo "🔄 Planning complete! Switching from Opus to Sonnet for execution..."
        # Note: This will be picked up by Claude to switch models
        echo "[SWITCH_MODEL:sonnet]"
    fi
fi

# Always exit 0 to allow the operation
exit 0