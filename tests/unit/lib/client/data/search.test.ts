import { afterEach, describe, expect, test } from "bun:test";
import { Cause, Effect, Exit, Option } from "effect";
import { loadSearchDataEffect, type SearchDataError } from "../../../../../lib/client/data/search";

const originalFetch = globalThis.fetch;

const mockFetch = (response: Response) =>
  (() => Promise.resolve(response)) as unknown as typeof fetch;

const expectFailureTag = async (
  effect: Effect.Effect<unknown, SearchDataError, never>,
  tag: SearchDataError["_tag"],
) => {
  const exit = await Effect.runPromiseExit(effect);

  expect(Exit.isFailure(exit)).toBe(true);
  if (!Exit.isFailure(exit)) return;

  const failure = Cause.failureOption(exit.cause);
  expect(Option.isSome(failure)).toBe(true);
  if (!Option.isSome(failure)) return;

  expect(failure.value._tag).toBe(tag);
};

describe("loadSearchDataEffect", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("loads and validates generated search data", async () => {
    globalThis.fetch = mockFetch(
      Response.json([
        {
          title: "Pastoralist",
          description: "A post",
          slug: "why-pastoralist",
          type: "post",
          url: "/why-pastoralist/",
        },
      ]),
    );

    const data = await Effect.runPromise(loadSearchDataEffect());

    expect(data[0]?.slug).toBe("why-pastoralist");
    expect(data[0]?.type).toBe("post");
  });

  test("fails with a typed validation error for malformed search data", async () => {
    globalThis.fetch = mockFetch(
      Response.json([
        {
          title: "Broken",
          description: "Nope",
          slug: "broken",
          type: "note",
          url: "/broken/",
        },
      ]),
    );

    await expectFailureTag(loadSearchDataEffect(), "SearchDataValidationError");
  });
});
