import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { HookFingerprint, HookName } from "./types";

export const ROOT = fileURLToPath(new URL("../../", import.meta.url));
export const GLOBAL_SKILLS = join(homedir(), ".agents/skills");
export const DOWNLOAD_TIMEOUT_MS = 15_000;
export const MAX_SKILL_NAME_LENGTH = 64;
export const CHECKSUM_SEED = 2166136261;
export const CHECKSUM_PRIME = 16777619;
export const INSTALL_USAGE = "Usage: install all | hooks | skills [--include-walter-mcp]";
export const MAX_BYTES = 64 * 1024;
export const REPOSITORIES = new Set([
  "walterwritesai/no-slop-ai-humanizer-rewriter",
  "walterwritesai/walter-skills",
]);

export const HOOKS_DIR = ".git/hooks";
// Keep the marker stable so previously installed hooks remain recognized.
export const MANAGED_HOOK_MARKER = "managed_by=scripts/install-hooks.ts";

const PRE_COMMIT = `#!/usr/bin/env sh
${MANAGED_HOOK_MARKER}
set -eu

printf '%s\\n' 'Running pre-commit checks...'
pnpm run review:content
pnpm run build:local
pnpm run lint
printf '%s\\n' 'All pre-commit checks passed'
`;

const COMMIT_MSG = `#!/usr/bin/env sh
${MANAGED_HOOK_MARKER}
set -eu

commit_msg=$(cat "$1")
pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\(.+\\))?: .{1,}'

if ! printf '%s' "$commit_msg" | grep -Eq "$pattern"; then
  printf '%s\\n' 'Invalid commit message format' >&2
  printf '%s\\n' 'Expected format: <type>(<scope>): <message>' >&2
  printf 'Received: %s\\n' "$commit_msg" >&2
  exit 1
fi

printf '%s\\n' 'Commit message is valid'
`;

const POST_MERGE = `#!/usr/bin/env sh
${MANAGED_HOOK_MARKER}
set -eu

printf '%s\\n' 'Running post-merge checks...'
changed_files=$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)

case "$changed_files" in
  *pnpm-lock.yaml*|*package.json*)
    printf '%s\\n' 'Dependencies changed, running pnpm install...'
    pnpm install
    printf '%s\\n' 'Dependencies updated'
    ;;
  *)
    printf '%s\\n' 'No dependency changes detected'
    ;;
esac
`;

export const HOOKS = {
  "pre-commit": PRE_COMMIT,
  "commit-msg": COMMIT_MSG,
  "post-merge": POST_MERGE,
} satisfies Record<HookName, string>;

export const LEGACY_HOOK_FINGERPRINTS: Record<HookName, HookFingerprint[]> = {
  "pre-commit": [
    { checksum: 3110674589, length: 291 },
    { checksum: 3996017543, length: 382 },
    { checksum: 237759147, length: 375 },
    { checksum: 3879112420, length: 284 },
  ],
  "commit-msg": [{ checksum: 3584248908, length: 648 }],
  "post-merge": [{ checksum: 2275438918, length: 471 }],
};
