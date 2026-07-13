#!/bin/bash
# Auto-init beads in stealth mode if not already initialized

if ! command -v bd &>/dev/null; then
  exit 0
fi

if [ ! -d ".beads" ]; then
  bd init --stealth 2>/dev/null
fi

exit 0
