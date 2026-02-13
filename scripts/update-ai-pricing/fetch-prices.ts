import type { PricingData, OpenRouterResponse } from "./types";

const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";

async function fetchOpenRouterPricing(): Promise<Partial<PricingData>> {
  try {
    const response = await fetch(OPENROUTER_MODELS_URL);
    if (!response.ok)
      throw new Error(`OpenRouter API failed: ${response.status}`);

    const data: OpenRouterResponse = await response.json();
    const pricing: Partial<PricingData> = {};

    const modelMappings = {
      "deepseek/deepseek-v3": "deepseek-v3",
      "deepseek/deepseek-r1": "deepseek-r1",
    };

    data.data.forEach((model) => {
      const mappedId = modelMappings[model.id as keyof typeof modelMappings];
      if (mappedId) {
        pricing[mappedId] = {
          input: parseFloat(model.pricing.prompt) * 1000000,
          output: parseFloat(model.pricing.completion) * 1000000,
          source: "openrouter.ai",
          lastUpdated: new Date().toISOString().split("T")[0],
        };
      }
    });

    return pricing;
  } catch {
    return {};
  }
}

async function fetchAnthropicPricing(): Promise<Partial<PricingData>> {
  const fallbackPricing: Partial<PricingData> = {
    "claude-opus-4.5": {
      input: 28.0,
      output: 280.0,
      source: "docs.anthropic.com",
      lastUpdated: new Date().toISOString().split("T")[0],
    },
  };

  return fallbackPricing;
}

async function fetchOpenAIPricing(): Promise<Partial<PricingData>> {
  const fallbackPricing: Partial<PricingData> = {
    "gpt-5": {
      input: 60.0,
      output: 120.0,
      source: "openai.com",
      lastUpdated: new Date().toISOString().split("T")[0],
    },
  };

  return fallbackPricing;
}

async function fetchGooglePricing(): Promise<Partial<PricingData>> {
  const fallbackPricing: Partial<PricingData> = {
    "gemini-3-ultra": {
      input: 8.75,
      output: 87.5,
      source: "cloud.google.com",
      lastUpdated: new Date().toISOString().split("T")[0],
    },
  };

  return fallbackPricing;
}

async function fetchGrokPricing(): Promise<Partial<PricingData>> {
  const fallbackPricing: Partial<PricingData> = {
    "grok-4.1": {
      input: 0.2,
      output: 0.5,
      source: "x.ai",
      lastUpdated: new Date().toISOString().split("T")[0],
    },
  };

  return fallbackPricing;
}

export async function fetchAllPricing(): Promise<PricingData> {
  const results = await Promise.allSettled([
    fetchAnthropicPricing(),
    fetchOpenAIPricing(),
    fetchGooglePricing(),
    fetchGrokPricing(),
    fetchOpenRouterPricing(),
  ]);

  return results.reduce((pricing, result) => {
    if (result.status === "fulfilled") {
      return { ...pricing, ...result.value };
    }
    return pricing;
  }, {} as PricingData);
}
