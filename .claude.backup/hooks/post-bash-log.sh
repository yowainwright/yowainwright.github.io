#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
POST_BASH_HOOK="$SCRIPT_DIR/../../src/hooks/post-bash/index.ts"

if [ -f "$POST_BASH_HOOK" ]; then
  bun "$POST_BASH_HOOK" --command "$1" --exit-code "$2" --output "$3"
fi

exit 0
