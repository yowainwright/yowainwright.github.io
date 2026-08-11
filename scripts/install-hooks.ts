#!/usr/bin/env -S pnpm exec tsx

import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createLogger } from "../lib/server/logger";

const log = createLogger("install-hooks");

const HOOKS_DIR = ".git/hooks";
const MANAGED_HOOK_MARKER = "managed_by=scripts/install-hooks.ts";

const PRE_COMMIT = `#!/usr/bin/env sh
${MANAGED_HOOK_MARKER}
set -eu

printf '%s\\n' 'Running pre-commit checks...'
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

const HOOKS = {
  "pre-commit": PRE_COMMIT,
  "commit-msg": COMMIT_MSG,
  "post-merge": POST_MERGE,
};

type HookName = keyof typeof HOOKS;
type HookFingerprint = {
  checksum: number;
  length: number;
};

const LEGACY_HOOK_FINGERPRINTS: Record<HookName, HookFingerprint[]> = {
  "pre-commit": [
    { checksum: 3110674589, length: 291 },
    { checksum: 3996017543, length: 382 },
    { checksum: 237759147, length: 375 },
    { checksum: 3879112420, length: 284 },
  ],
  "commit-msg": [{ checksum: 3584248908, length: 648 }],
  "post-merge": [{ checksum: 2275438918, length: 471 }],
};

const writeHook = (hookPath: string, hookContent: string) => {
  writeFileSync(hookPath, hookContent, { mode: 0o755 });
  chmodSync(hookPath, 0o755);
};

const updateChecksum = (checksum: number, character: string) => {
  const characterCode = character.charCodeAt(0);
  const mixedChecksum = checksum ^ characterCode;
  const multipliedChecksum = Math.imul(mixedChecksum, 16777619);

  return multipliedChecksum >>> 0;
};

const getHookFingerprint = (hookContent: string): HookFingerprint => {
  const characters = Array.from(hookContent);
  const checksum = characters.reduce(updateChecksum, 2166136261);

  return { checksum, length: hookContent.length };
};

const matchesFingerprint = (fingerprint: HookFingerprint, candidate: HookFingerprint) => {
  const hasMatchingChecksum = fingerprint.checksum === candidate.checksum;
  const hasMatchingLength = fingerprint.length === candidate.length;

  return hasMatchingChecksum && hasMatchingLength;
};

export const isManagedHook = (hookName: HookName, hookContent: string) => {
  const isCurrentHook = hookContent.includes(MANAGED_HOOK_MARKER);
  const hookFingerprint = getHookFingerprint(hookContent);
  const legacyFingerprints = LEGACY_HOOK_FINGERPRINTS[hookName];
  const isKnownLegacyHook = legacyFingerprints.some((legacyFingerprint) =>
    matchesFingerprint(hookFingerprint, legacyFingerprint),
  );

  return isCurrentHook || isKnownLegacyHook;
};

const syncHook = (hookName: HookName) => {
  const hookPath = join(HOOKS_DIR, hookName);
  const hookContent = HOOKS[hookName];

  if (!existsSync(hookPath)) {
    writeHook(hookPath, hookContent);
    return "installed";
  }

  const existingContent = readFileSync(hookPath, "utf8");
  const shouldUpdate = isManagedHook(hookName, existingContent) && existingContent !== hookContent;

  if (!shouldUpdate) return "skipped";

  writeHook(hookPath, hookContent);
  return "updated";
};

const installHooks = (): void => {
  const isCI = process.env.CI === "true";
  if (isCI) {
    log.info("CI detected, skipping hook installation");
    return;
  }

  const isGitRepo = existsSync(".git");
  if (!isGitRepo) {
    log.info("not a git repository, skipping hook installation");
    return;
  }

  mkdirSync(HOOKS_DIR, { recursive: true });

  const hookNames = Object.keys(HOOKS) as HookName[];
  const actions = hookNames.map(syncHook);
  const installed = actions.filter((action) => action === "installed").length;
  const updated = actions.filter((action) => action === "updated").length;
  const skipped = actions.filter((action) => action === "skipped").length;

  log.info({ installed, updated, skipped }, "synchronized git hooks");
};

installHooks();
