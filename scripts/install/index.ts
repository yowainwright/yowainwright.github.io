#!/usr/bin/env -S pnpm exec tsx

import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import manifest from "../../lib/agents/sources.json";
import { createLogger } from "../../lib/server/logger";
import { ROOT } from "./constants";
import { installHooks, installSkills, readOptions } from "./utils";

const log = createLogger("install");

const installBlogSkills = async (includeWalter: boolean) => {
  const sources = manifest.sources.filter((source) => !source.requiresWalterMcp || includeWalter);
  const installed = await installSkills(ROOT, sources);
  log.info({ installed }, "Skills installed in ignored provider directories");
  if (!includeWalter) return;
  log.warn(
    "Walter workflows require a separately configured MCP service; using it sends drafts to Walter",
  );
};

export const main = async (args = process.argv.slice(2)) => {
  const options = readOptions(args);
  const skipSetup = options.target === "all" && process.env.CI === "true";
  if (skipSetup) {
    log.info("CI detected, skipping agent setup");
    return;
  }
  if (options.target === "hooks") return installHooks();
  if (options.target === "all") installHooks();
  await installBlogSkills(options.includeWalter);
};

const entryPoint = process.argv[1] && pathToFileURL(resolve(process.argv[1])).href;
if (entryPoint === import.meta.url) {
  main().catch((error: Error) => {
    log.error(error, "Installation failed");
    process.exitCode = 1;
  });
}
