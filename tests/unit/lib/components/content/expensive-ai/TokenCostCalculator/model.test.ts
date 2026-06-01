import { describe, expect, test } from "bun:test";
import { Cause, Effect, Exit, Option } from "effect";
import { FALLBACK_AI_DATA } from "../../../../../../../lib/components/content/expensive-ai/TokenCostCalculator/constants";
import {
  calculateCostsEffect,
  parseTokenInputEffect,
} from "../../../../../../../lib/components/content/expensive-ai/TokenCostCalculator/model";

describe("parseTokenInputEffect", () => {
  test("normalizes numeric token input through the schema", () => {
    const tokens = Effect.runSync(parseTokenInputEffect("00700"));

    expect(tokens).toBe(700);
  });

  test("rejects non-numeric token input with a typed error", async () => {
    const exit = await Effect.runPromiseExit(parseTokenInputEffect("70a"));

    expect(Exit.isFailure(exit)).toBe(true);
    if (!Exit.isFailure(exit)) return;

    const failure = Cause.failureOption(exit.cause);
    expect(Option.isSome(failure)).toBe(true);
    if (!Option.isSome(failure)) return;

    expect(failure.value._tag).toBe("TokenInputError");
  });
});

describe("calculateCostsEffect", () => {
  test("returns schema-validated model calculations sorted by total cost", () => {
    const calculations = Effect.runSync(
      calculateCostsEffect(Effect.runSync(parseTokenInputEffect("1000")), FALLBACK_AI_DATA),
    );

    expect(calculations[0]?.modelId).toBe("grok-4.1");
    expect(calculations.every((calculation) => calculation.totalCost >= 0)).toBe(true);
  });
});
