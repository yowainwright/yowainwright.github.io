import { createHash, randomUUID } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export async function withBuildCache<A>(
  kind: string,
  input: string,
  build: () => Promise<A>,
  isValid: (value: unknown) => value is A,
): Promise<A> {
  const key = getBuildCacheKey(kind, input);
  const file = path.join(process.cwd(), ".cache", "compiled-content", `${key}.json`);
  const cached = await readCachedValue(file, isValid);
  if (cached !== undefined) return cached;
  const value = await build();
  await writeCachedValue(file, value);
  return value;
}

export function getBuildCacheKey(kind: string, input: string) {
  const directories = ["lib/server/markdown", "lib/server/themes"];
  const files = directories.flatMap(getDependencyFiles);
  const dependencies = files.concat(
    "lib/server/post-page/index.ts", "lib/client/styles/scss/_variables.scss", "pnpm-lock.yaml",
  );
  const environment = [kind, input, process.version, process.env.NODE_ENV, process.env.MERMAID_BROWSER_PATH];
  const hash = createHash("sha256").update(JSON.stringify(environment));
  dependencies.forEach((file) => hash.update(file).update(readFileSync(path.join(process.cwd(), file))));
  return hash.digest("hex");
}

export function hasDiagramAssets(compiledSource: string) {
  const assets = compiledSource.match(/\/assets\/mermaid\/[a-f0-9]+\.svg/g) || [];
  return assets.every((asset) => existsSync(path.join(process.cwd(), "public", asset)));
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  const object = value !== null && typeof value === "object";
  const valid = object && !Array.isArray(value);
  return valid;
}

function getDependencyFiles(directory: string) {
  const files = readdirSync(path.join(process.cwd(), directory)).sort();
  return files.map((file) => path.join(directory, file));
}

async function readCachedValue<A>(file: string, isValid: (value: unknown) => value is A) {
  try {
    const value: unknown = JSON.parse(await readFile(file, "utf8"));
    if (isValid(value)) return value;
  } catch {
    return undefined;
  }
  return undefined;
}

async function writeCachedValue(file: string, value: unknown) {
  const temporary = `${file}.${randomUUID()}.tmp`;
  try {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(temporary, JSON.stringify(value), "utf8");
    await rename(temporary, file);
  } catch {
    await rm(temporary, { force: true }).catch(() => undefined);
  }
}
