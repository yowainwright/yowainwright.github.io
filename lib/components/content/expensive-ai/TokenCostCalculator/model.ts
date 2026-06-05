import { Data, Effect, Schema } from "effect";
import type { ExpensiveAiData } from "../../../../client/data/expensive-ai";
import { DEFAULT_TOKENS } from "./constants";

export const TokenCountSchema = Schema.Number.pipe(Schema.int(), Schema.nonNegative());

export const ModelCalculationSchema = Schema.Struct({
  modelId: Schema.String,
  modelName: Schema.String,
  inputCost: Schema.Number,
  outputCost: Schema.Number,
  totalCost: Schema.Number,
  outputTokens: TokenCountSchema,
});

export const ModelCalculationsSchema = Schema.Array(ModelCalculationSchema);

export type TokenCount = Schema.Schema.Type<typeof TokenCountSchema>;
export type ModelCalculationData = Schema.Schema.Type<typeof ModelCalculationSchema>;

export class TokenInputError extends Data.TaggedError("TokenInputError")<{
  readonly input: string;
  readonly reason: unknown;
}> {}

const decodeTokenCount = (
  value: number,
  input = String(value),
): Effect.Effect<TokenCount, TokenInputError, never> =>
  Schema.decodeUnknown(TokenCountSchema)(value).pipe(
    Effect.mapError((reason) => new TokenInputError({ input, reason })),
  );

export const parseTokenInputEffect = (
  input: string,
): Effect.Effect<TokenCount, TokenInputError, never> => {
  if (input === "") {
    return decodeTokenCount(0, input);
  }

  if (!/^\d+$/.test(input)) {
    return Effect.fail(new TokenInputError({ input, reason: "Expected numeric input" }));
  }

  const cleanValue = input.replace(/^0+/, "") || "0";
  return decodeTokenCount(parseInt(cleanValue, 10), input);
};

export const DEFAULT_TOKEN_COUNT = Effect.runSync(parseTokenInputEffect(String(DEFAULT_TOKENS)));

export const readStoredTokenCountEffect = (
  storageKey: string,
): Effect.Effect<TokenCount, never, never> =>
  Effect.sync(() => localStorage.getItem(storageKey)).pipe(
    Effect.flatMap((stored) =>
      stored ? parseTokenInputEffect(stored) : decodeTokenCount(DEFAULT_TOKENS),
    ),
    Effect.catchAll(() => decodeTokenCount(DEFAULT_TOKENS)),
    Effect.orDie,
  );

export const persistTokenCountEffect = (
  storageKey: string,
  inputTokens: TokenCount,
): Effect.Effect<void, never, never> =>
  Effect.sync(() => {
    localStorage.setItem(storageKey, inputTokens.toString());
  });

export const calculateCostsEffect = (
  inputTokens: TokenCount,
  data: ExpensiveAiData,
): Effect.Effect<ReadonlyArray<ModelCalculationData>, never, never> =>
  Effect.sync(() =>
    Object.entries(data.models)
      .map(([modelId, pricing]) => {
        const outputMultiplier = data.reasoningMultipliers?.[modelId] || 1;
        const inputEfficiency = data.inputTokenEfficiency?.[modelId] || 1;
        const actualInputTokens = Math.round(inputTokens * inputEfficiency);
        const outputTokens = Math.round(inputTokens * outputMultiplier);
        const inputCost = (actualInputTokens / 1_000_000) * pricing.input;
        const outputCost = (outputTokens / 1_000_000) * pricing.output;

        return {
          modelId,
          modelName: data.modelNames?.[modelId] || modelId,
          inputCost,
          outputCost,
          totalCost: inputCost + outputCost,
          outputTokens,
        };
      })
      .sort((a, b) => a.totalCost - b.totalCost),
  ).pipe(
    Effect.flatMap((calculations) => Schema.decodeUnknown(ModelCalculationsSchema)(calculations)),
    Effect.orDie,
  );
