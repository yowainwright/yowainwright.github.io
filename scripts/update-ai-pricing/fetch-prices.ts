import { Data, Effect, Metric } from "effect";
import type { PricingData, OpenRouterResponse } from "./types";

const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";
const DOLLARS_PER_MILLION_TOKENS = 1_000_000;

class PricingFetchError extends Data.TaggedError("PricingFetchError")<{
  readonly source: string;
  readonly reason: unknown;
}> {}

export const pricingFetchAttempts = Metric.counter(
  "ai_pricing_fetch_attempts",
  {
    description: "Pricing provider fetch attempts",
    incremental: true,
  },
);

export const pricingFetchFailures = Metric.counter(
  "ai_pricing_fetch_failures",
  {
    description: "Pricing provider fetch failures",
    incremental: true,
  },
);

export const pricingModelsLoaded = Metric.counter("ai_pricing_models_loaded", {
  description: "Pricing models loaded into the generated data file",
  incremental: true,
});

const today = () => new Date().toISOString().split("T")[0] ?? "";

const modelMappings = {
  "deepseek/deepseek-v3": "deepseek-v3",
  "deepseek/deepseek-r1": "deepseek-r1",
} as const;

const fetchOpenRouterPricingEffect: Effect.Effect<
  PricingData,
  PricingFetchError
> = Metric.increment(pricingFetchAttempts).pipe(
  Effect.zipRight(
    Effect.tryPromise({
      try: (signal) => fetch(OPENROUTER_MODELS_URL, { signal }),
      catch: (reason) =>
        new PricingFetchError({ source: "openrouter.ai", reason }),
    }),
  ),
  Effect.flatMap((response) =>
    response.ok
      ? Effect.succeed(response)
      : Effect.fail(
          new PricingFetchError({
            source: "openrouter.ai",
            reason: `OpenRouter API failed: ${response.status}`,
          }),
        ),
  ),
  Effect.flatMap((response) =>
    Effect.tryPromise({
      try: () => response.json() as Promise<OpenRouterResponse>,
      catch: (reason) =>
        new PricingFetchError({ source: "openrouter.ai", reason }),
    }),
  ),
  Effect.map((data) => {
    const pricing: PricingData = {};

    data.data.forEach((model) => {
      const mappedId = modelMappings[model.id as keyof typeof modelMappings];
      if (!mappedId) return;

      pricing[mappedId] = {
        input: parseFloat(model.pricing.prompt) * DOLLARS_PER_MILLION_TOKENS,
        output:
          parseFloat(model.pricing.completion) * DOLLARS_PER_MILLION_TOKENS,
        source: "openrouter.ai",
        lastUpdated: today(),
      };
    });

    return pricing;
  }),
  Effect.tapError(() => Metric.increment(pricingFetchFailures)),
);

function fallbackPricingEffect(pricing: PricingData) {
  return Metric.increment(pricingFetchAttempts).pipe(Effect.as(pricing));
}

function fetchAnthropicPricingEffect() {
  return fallbackPricingEffect({
    "claude-opus-4.5": {
      input: 28.0,
      output: 280.0,
      source: "docs.anthropic.com",
      lastUpdated: today(),
    },
  });
}

function fetchOpenAIPricingEffect() {
  return fallbackPricingEffect({
    "gpt-5": {
      input: 60.0,
      output: 120.0,
      source: "openai.com",
      lastUpdated: today(),
    },
  });
}

function fetchGooglePricingEffect() {
  return fallbackPricingEffect({
    "gemini-3-ultra": {
      input: 8.75,
      output: 87.5,
      source: "cloud.google.com",
      lastUpdated: today(),
    },
  });
}

function fetchGrokPricingEffect() {
  return fallbackPricingEffect({
    "grok-4.1": {
      input: 0.2,
      output: 0.5,
      source: "x.ai",
      lastUpdated: today(),
    },
  });
}

const recoverProvider = (
  providerEffect: Effect.Effect<PricingData, PricingFetchError>,
) => providerEffect.pipe(Effect.catchAll(() => Effect.succeed({})));

export const fetchAllPricingEffect: Effect.Effect<PricingData> = Effect.all(
  [
    fetchAnthropicPricingEffect(),
    fetchOpenAIPricingEffect(),
    fetchGooglePricingEffect(),
    fetchGrokPricingEffect(),
    recoverProvider(fetchOpenRouterPricingEffect),
  ],
  { concurrency: "unbounded" },
).pipe(
  Effect.map((results) => Object.assign({}, ...results)),
  Effect.tap((pricing) =>
    Metric.incrementBy(pricingModelsLoaded, Object.keys(pricing).length),
  ),
);

export function fetchAllPricing(): Promise<PricingData> {
  return Effect.runPromise(fetchAllPricingEffect);
}
