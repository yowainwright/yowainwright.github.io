#!/usr/bin/env -S pnpm exec tsx

import {
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
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

const LEGACY_BUN_MARKERS: Record<HookName, string> = {
  "pre-commit": "bun run build:local",
  "commit-msg": "conventionalCommitPattern",
  "post-merge": "Dependencies changed, running bun install",
};

const writeHook = (hookPath: string, hookContent: string) => {
  writeFileSync(hookPath, hookContent, { mode: 0o755 });
  chmodSync(hookPath, 0o755);
};

const isManagedHook = (hookName: HookName, hookContent: string) => {
  const isCurrentHook = hookContent.includes(MANAGED_HOOK_MARKER);
  const isLegacyBunHook = hookContent.startsWith("#!/usr/bin/env bun");
  const hasLegacyMarker = hookContent.includes(LEGACY_BUN_MARKERS[hookName]);
  const isKnownLegacyHook = isLegacyBunHook && hasLegacyMarker;

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
  const shouldUpdate =
    isManagedHook(hookName, existingContent) && existingContent !== hookContent;

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
