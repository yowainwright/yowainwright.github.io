#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VET_HOOK="$SCRIPT_DIR/../../src/hooks/vet/index.ts"

if [ -f "$VET_HOOK" ]; then
  bun "$VET_HOOK" --content "$1" --project-root "$2"
fi

exit 0