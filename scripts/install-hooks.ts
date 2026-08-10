#!/usr/bin/env -S nub

import { existsSync, writeFileSync, chmodSync, mkdirSync } from "fs";
import { join } from "path";
import { createLogger } from "../lib/server/logger";

const log = createLogger("install-hooks");

const HOOKS_DIR = ".git/hooks";

const PRE_COMMIT = `#!/usr/bin/env sh
set -eu

printf '%s\\n' 'Running pre-commit checks...'
nub run build:local
nub run lint
printf '%s\\n' 'All pre-commit checks passed'
`;

const COMMIT_MSG = `#!/usr/bin/env sh
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
set -eu

printf '%s\\n' 'Running post-merge checks...'
changed_files=$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)

case "$changed_files" in
  *pnpm-lock.yaml*|*package.json*)
    printf '%s\\n' 'Dependencies changed, running nub install...'
    nub install
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

  const hooksDir = HOOKS_DIR;
  if (!existsSync(hooksDir)) {
    mkdirSync(hooksDir, { recursive: true });
  }

  let installed = 0;
  let skipped = 0;

  const hookNames = Object.keys(HOOKS) as Array<keyof typeof HOOKS>;
  for (const hookName of hookNames) {
    const hookPath = join(hooksDir, hookName);
    const hookExists = existsSync(hookPath);

    if (hookExists) {
      skipped = skipped + 1;
      continue;
    }

    const hookContent = HOOKS[hookName];
    writeFileSync(hookPath, hookContent, { mode: 0o755 });
    chmodSync(hookPath, 0o755);
    installed = installed + 1;
    log.info({ hook: hookName }, "installed hook");
  }

  const hasInstalledHooks = installed > 0;
  if (hasInstalledHooks) {
    log.info({ count: installed }, "installed git hooks");
  }

  const hasSkippedHooks = skipped > 0;
  if (hasSkippedHooks) {
    log.info({ count: skipped }, "skipped existing hooks");
  }

  const hasNoChanges = installed === 0 && skipped === 0;
  if (hasNoChanges) {
    log.info("no hooks to install");
  }
};

installHooks();
