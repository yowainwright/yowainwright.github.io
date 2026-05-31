import { afterEach, describe, expect, test } from "bun:test";
import { fetchAllPricing } from "../scripts/update-ai-pricing/fetch-prices";

const originalFetch = globalThis.fetch;

const mockFetch = (response: Response) =>
  (() => Promise.resolve(response)) as unknown as typeof fetch;

describe("fetchAllPricing", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("combines fallback providers with OpenRouter pricing", async () => {
    globalThis.fetch = mockFetch(
      Response.json({
        data: [
          {
            id: "deepseek/deepseek-r1",
            name: "DeepSeek R1",
            pricing: {
              prompt: "0.0000007",
              completion: "0.0000025",
            },
          },
        ],
      }),
    );

    const pricing = await fetchAllPricing();

    expect(pricing["gpt-5"]?.source).toBe("openai.com");
    expect(pricing["deepseek-r1"]).toMatchObject({
      input: 0.7,
      output: 2.5,
      source: "openrouter.ai",
    });
  });

  test("keeps fallback provider pricing when OpenRouter fails", async () => {
    globalThis.fetch = mockFetch(new Response(null, { status: 500 }));

    const pricing = await fetchAllPricing();

    expect(pricing["gpt-5"]?.source).toBe("openai.com");
    expect(pricing["deepseek-r1"]).toBeUndefined();
  });
});
