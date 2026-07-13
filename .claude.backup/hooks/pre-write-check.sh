#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRE_WRITE_HOOK="$SCRIPT_DIR/../../src/hooks/pre-write/index.ts"

if [ -f "$PRE_WRITE_HOOK" ]; then
  bun "$PRE_WRITE_HOOK" --filepath "$1" --content "$2"
else
  exit 0
fi
