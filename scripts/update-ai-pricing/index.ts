#!/usr/bin/env bun

import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { Cause, Data, Effect, Exit, Metric } from "effect";
import { createLogger } from "../../lib/server/logger";
import {
  fetchAllPricingEffect,
  pricingFetchAttempts,
  pricingFetchFailures,
  pricingModelsLoaded,
} from "./fetch-prices";
import type { ReasoningMultipliers, PricingData } from "./types";

const JSON_PATH = join(process.cwd(), "public/data/expensive-ai.json");
const CACHE_PATH = join(process.cwd(), ".cache/ai-pricing.json");
const log = createLogger("update-ai-pricing");

class PricingFileError extends Data.TaggedError("PricingFileError")<{
  readonly operation: "read" | "write";
  readonly path: string;
  readonly reason: unknown;
}> {}

class PricingCacheParseError extends Data.TaggedError("PricingCacheParseError")<{
  readonly path: string;
  readonly reason: unknown;
}> {}

class PricingUnavailableError extends Data.TaggedError("PricingUnavailableError")<{
  readonly reason: string;
}> {}

type UpdatePricingSource = "fresh" | "cache";
type UpdatePricingError = PricingFileError | PricingUnavailableError;

const pricingCacheHits = Metric.counter("ai_pricing_cache_hits", {
  description: "Pricing cache reads that returned usable data",
  incremental: true,
});

const pricingCacheMisses = Metric.counter("ai_pricing_cache_misses", {
  description: "Pricing cache reads that were missing or invalid",
  incremental: true,
});

const pricingOutputWrites = Metric.counter("ai_pricing_output_writes", {
  description: "Generated pricing JSON writes",
  incremental: true,
});

const pricingCacheWrites = Metric.counter("ai_pricing_cache_writes", {
  description: "Pricing cache writes",
  incremental: true,
});

const REASONING_MULTIPLIERS: ReasoningMultipliers = {
  "claude-opus-4.5": 2.8,
  "gpt-5": 2.2,
  "gemini-3-ultra": 2.0,
  "deepseek-r1": 3.5,
  "grok-4.1": 1.8,
};

const INPUT_TOKEN_EFFICIENCY = {
  "claude-opus-4.5": 0.5,
  "gpt-5": 1.0,
  "gemini-3-ultra": 1.2,
  "deepseek-r1": 0.9,
  "grok-4.1": 1.1,
};

const MODEL_NAMES = {
  "claude-opus-4.5": "Claude Opus 4.5",
  "gpt-5": "GPT-5",
  "gemini-3-ultra": "Gemini 3 Ultra",
  "deepseek-r1": "DeepSeek R1",
  "grok-4.1": "Grok 4.1",
};

type GeneratedPricingData = {
  readonly models?: PricingData;
};

function generateJsonFile(pricingData: PricingData): string {
  const timestamp = new Date().toISOString();

  const jsonData = {
    title: "AI Model Cost Calculator",
    lastUpdated: timestamp,
    models: pricingData,
    sources: [
      {
        link: "https://platform.claude.com/docs/en/about-claude/pricing",
        author: "Anthropic",
        publication: "Claude API Pricing Documentation",
      },
      {
        link: "https://platform.openai.com/docs/pricing",
        author: "OpenAI",
        publication: "OpenAI API Pricing",
      },
      {
        link: "https://ai.google.dev/gemini-api/docs/pricing",
        author: "Google",
        publication: "Gemini API Pricing",
      },
      {
        link: "https://docs.x.ai/developers/models",
        author: "xAI",
        publication: "Grok API Pricing",
      },
      {
        link: "https://api-docs.deepseek.com/quick_start/pricing",
        author: "DeepSeek",
        publication: "DeepSeek API Pricing",
      },
    ],
    reasoningMultipliers: REASONING_MULTIPLIERS,
    inputTokenEfficiency: INPUT_TOKEN_EFFICIENCY,
    modelNames: MODEL_NAMES,
    agentTaskCosts: [
      {
        label: "Agent Task Costs (per hour of specialized work)",
        data: [
          { primary: "Simple Agent", secondary: 2.5 },
          { primary: "TypeScript Expert", secondary: 8.5 },
          { primary: "Principal Engineer", secondary: 12.0 },
          { primary: "QA Lead + Testing", secondary: 15.5 },
          { primary: "Multi-Agent Orchestrator", secondary: 35.0 },
        ],
      },
    ],
    totalProjectCosts: [
      {
        label: "Project Development Approaches",
        data: [
          { primary: "Traditional Solo Development", secondary: 0 },
          { primary: "Single LLM Assistant", secondary: 12 },
          { primary: "Multi-Agent Team (Sequential)", secondary: 45 },
          { primary: "Multi-Agent Team (Parallel)", secondary: 150 },
        ],
      },
    ],
  };

  return JSON.stringify(jsonData, null, 2);
}

const readTextFileEffect = (filePath: string) =>
  Effect.tryPromise({
    try: () => readFile(filePath, "utf-8"),
    catch: (reason) => new PricingFileError({ operation: "read", path: filePath, reason }),
  });

const writeTextFileEffect = (filePath: string, content: string) =>
  Effect.tryPromise({
    try: () => writeFile(filePath, content),
    catch: (reason) => new PricingFileError({ operation: "write", path: filePath, reason }),
  });

const selectPricingData = (parsed: unknown): PricingData => {
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Pricing data must be an object.");
  }

  const generated = parsed as GeneratedPricingData;
  if (generated.models && typeof generated.models === "object") {
    return generated.models;
  }

  return parsed as PricingData;
};

const parsePricingDataEffect = (filePath: string, content: string) =>
  Effect.try({
    try: () => selectPricingData(JSON.parse(content)),
    catch: (reason) => new PricingCacheParseError({ path: filePath, reason }),
  });

const loadPricingDataEffect = (filePath: string) =>
  readTextFileEffect(filePath).pipe(
    Effect.flatMap((content) => parsePricingDataEffect(filePath, content)),
  );

const loadCachedPricingEffect = loadPricingDataEffect(CACHE_PATH).pipe(
  Effect.tap(() => Metric.increment(pricingCacheHits)),
  Effect.catchAll(() => Metric.increment(pricingCacheMisses).pipe(Effect.as(null))),
);

const loadGeneratedPricingEffect = loadPricingDataEffect(JSON_PATH).pipe(
  Effect.catchAll(() => Effect.succeed(null)),
);

const loadPreviousPricingEffect = Effect.all([
  loadGeneratedPricingEffect,
  loadCachedPricingEffect,
]).pipe(
  Effect.map(([generatedPricing, cachedPricing]) =>
    Object.assign({}, generatedPricing, cachedPricing),
  ),
);

const mergeWithPreviousPricingEffect = (pricing: PricingData) =>
  loadPreviousPricingEffect.pipe(
    Effect.map((previousPricing) => ({ ...previousPricing, ...pricing })),
  );

const saveCachedPricingEffect = (pricing: PricingData) =>
  writeTextFileEffect(CACHE_PATH, JSON.stringify(pricing, null, 2)).pipe(
    Effect.tap(() => Metric.increment(pricingCacheWrites)),
    Effect.catchAll(() => Effect.void),
  );

const writeGeneratedPricingEffect = (pricing: PricingData) =>
  writeTextFileEffect(JSON_PATH, generateJsonFile(pricing)).pipe(
    Effect.tap(() => Metric.increment(pricingOutputWrites)),
  );

const writeCachedPricingEffect: Effect.Effect<"cache", UpdatePricingError> =
  loadCachedPricingEffect.pipe(
    Effect.flatMap(
      (cached): Effect.Effect<"cache", UpdatePricingError> =>
        cached
          ? writeGeneratedPricingEffect(cached).pipe(Effect.as("cache" as const))
          : Effect.fail(
              new PricingUnavailableError({
                reason: "No live pricing data or cached pricing data was available.",
              }),
            ),
    ),
  );

const writeFreshPricingEffect: Effect.Effect<"fresh", UpdatePricingError> =
  fetchAllPricingEffect.pipe(
    Effect.flatMap((pricing): Effect.Effect<"fresh", UpdatePricingError> => {
      if (Object.keys(pricing).length === 0) {
        return Effect.fail(
          new PricingUnavailableError({
            reason: "No live pricing data was returned.",
          }),
        );
      }

      return mergeWithPreviousPricingEffect(pricing).pipe(
        Effect.flatMap((mergedPricing) =>
          saveCachedPricingEffect(mergedPricing).pipe(
            Effect.zipRight(writeGeneratedPricingEffect(mergedPricing)),
          ),
        ),
        Effect.as("fresh" as const),
      );
    }),
  );

const updatePricingEffect: Effect.Effect<UpdatePricingSource, UpdatePricingError> =
  writeFreshPricingEffect.pipe(Effect.catchAll(() => writeCachedPricingEffect));

const logMetricsEffect = (source: UpdatePricingSource) =>
  Effect.all([
    Metric.value(pricingFetchAttempts),
    Metric.value(pricingFetchFailures),
    Metric.value(pricingModelsLoaded),
    Metric.value(pricingCacheHits),
    Metric.value(pricingCacheMisses),
    Metric.value(pricingOutputWrites),
    Metric.value(pricingCacheWrites),
  ]).pipe(
    Effect.flatMap(
      ([
        fetchAttempts,
        fetchFailures,
        modelsLoaded,
        cacheHits,
        cacheMisses,
        outputWrites,
        cacheWrites,
      ]) =>
        Effect.sync(() =>
          log.info(
            {
              source,
              fetchAttempts: fetchAttempts.count,
              fetchFailures: fetchFailures.count,
              modelsLoaded: modelsLoaded.count,
              cacheHits: cacheHits.count,
              cacheMisses: cacheMisses.count,
              outputWrites: outputWrites.count,
              cacheWrites: cacheWrites.count,
            },
            "pricing data updated",
          ),
        ),
    ),
  );

Effect.runPromiseExit(updatePricingEffect.pipe(Effect.tap(logMetricsEffect))).then((exit) => {
  if (Exit.isSuccess(exit)) return;

  log.error({ cause: Cause.pretty(exit.cause) }, "pricing update failed");
  process.exit(1);
});
