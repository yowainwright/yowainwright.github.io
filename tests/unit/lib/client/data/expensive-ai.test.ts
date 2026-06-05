import { afterEach, describe, expect, test } from "bun:test";
import { Cause, Effect, Exit, Option, Schema } from "effect";
import {
  ExpensiveAiDataSchema,
  loadExpensiveAiDataEffect,
  type ExpensiveAiDataError,
} from "../../../../../lib/client/data/expensive-ai";
import { FALLBACK_AI_DATA } from "../../../../../lib/components/content/expensive-ai/TokenCostCalculator/constants";

const originalFetch = globalThis.fetch;

const validExpensiveAiData = {
  title: "AI Model Cost Calculator",
  lastUpdated: "2026-03-19T08:10:47.742Z",
  models: {
    "gpt-5": {
      input: 60,
      output: 120,
      source: "openai.com",
      lastUpdated: "2026-03-19",
    },
  },
  sources: [],
  reasoningMultipliers: {
    "gpt-5": 2.2,
  },
  inputTokenEfficiency: {
    "gpt-5": 1,
  },
  modelNames: {
    "gpt-5": "GPT-5",
  },
  agentTaskCosts: [],
  totalProjectCosts: [],
};

const mockFetch = (response: Response) =>
  (() => Promise.resolve(response)) as unknown as typeof fetch;

const expectFailureTag = async (
  effect: Effect.Effect<unknown, ExpensiveAiDataError, never>,
  tag: ExpensiveAiDataError["_tag"],
) => {
  const exit = await Effect.runPromiseExit(effect);

  expect(Exit.isFailure(exit)).toBe(true);
  if (!Exit.isFailure(exit)) return;

  const failure = Cause.failureOption(exit.cause);
  expect(Option.isSome(failure)).toBe(true);
  if (!Option.isSome(failure)) return;

  expect(failure.value._tag).toBe(tag);
};

describe("loadExpensiveAiDataEffect", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("loads and validates expensive AI data", async () => {
    globalThis.fetch = mockFetch(Response.json(validExpensiveAiData));

    const data = await Effect.runPromise(loadExpensiveAiDataEffect());

    expect(data.models["gpt-5"]?.source).toBe("openai.com");
    expect(data.reasoningMultipliers["gpt-5"]).toBe(2.2);
  });

  test("fails with a typed HTTP error for non-OK responses", async () => {
    globalThis.fetch = mockFetch(new Response(null, { status: 503 }));

    await expectFailureTag(loadExpensiveAiDataEffect(), "ExpensiveAiHttpError");
  });

  test("fails with a typed fetch error for invalid JSON", async () => {
    globalThis.fetch = mockFetch(
      new Response("{", {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

    await expectFailureTag(
      loadExpensiveAiDataEffect(),
      "ExpensiveAiFetchError",
    );
  });

  test("fails with a typed validation error for malformed data", async () => {
    globalThis.fetch = mockFetch(
      Response.json(Object.assign({}, validExpensiveAiData, { models: [] })),
    );

    await expectFailureTag(
      loadExpensiveAiDataEffect(),
      "ExpensiveAiValidationError",
    );
  });

  test("keeps calculator fallback data compatible with the schema", async () => {
    const decoded = await Effect.runPromise(
      Schema.decodeUnknown(ExpensiveAiDataSchema)(FALLBACK_AI_DATA),
    );

    expect(decoded.models["gpt-5"]?.source).toBe("openai.com");
  });
});
