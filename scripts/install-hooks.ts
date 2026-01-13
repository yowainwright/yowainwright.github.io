#!/usr/bin/env bun

import { existsSync, writeFileSync, chmodSync, mkdirSync } from "fs";
import { join } from "path";
import { createLogger } from "../lib/logger";

const log = createLogger("install-hooks");

const HOOKS_DIR = ".git/hooks";

const PRE_COMMIT = `#!/usr/bin/env bun

import { $ } from 'bun';

console.log('Running pre-commit checks...');

try {
  await $\`bun run build:local\`;
  await $\`bun run lint\`;

  // Add any newly generated OG images to the commit
  await $\`git add public/og\`;

  console.log('✓ All pre-commit checks passed');
} catch (error) {
  console.error('✗ Pre-commit checks failed');
  process.exit(1);
}
`;

const COMMIT_MSG = `#!/usr/bin/env bun

import { readFileSync } from 'fs';

const commitMsgFile = process.argv[2];
const commitMsg = readFileSync(commitMsgFile, 'utf-8').trim();

const conventionalCommitPattern = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\(.+\\))?: .{1,}/;

if (!conventionalCommitPattern.test(commitMsg)) {
  console.error('✗ Invalid commit message format');
  console.error('Expected format: <type>(<scope>): <message>');
  console.error('Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert');
  console.error(\`Received: \${commitMsg}\`);
  process.exit(1);
}

console.log('✓ Commit message is valid');
`;

const POST_MERGE = `#!/usr/bin/env bun

import { $ } from 'bun';

console.log('Running post-merge checks...');

const lockfileChanged = await $\`git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD\`.text();

if (lockfileChanged.includes('bun.lock') || lockfileChanged.includes('package.json')) {
  console.log('Dependencies changed, running bun install...');
  await $\`bun install\`;
  console.log('✓ Dependencies updated');
} else {
  console.log('✓ No dependency changes detected');
}
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
