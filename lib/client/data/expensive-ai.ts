import { Data, Effect, Metric, Schema } from "effect";

const DEFAULT_DATA_PATH = "/data/expensive-ai.json";

const ModelPricingSchema = Schema.Struct({
  input: Schema.Number,
  output: Schema.Number,
  source: Schema.String,
  lastUpdated: Schema.String,
});

const SourceSchema = Schema.Struct({
  link: Schema.String,
  author: Schema.String,
  publication: Schema.String,
});

const ChartDatumSchema = Schema.Struct({
  primary: Schema.String,
  secondary: Schema.Number,
});

const ChartSeriesSchema = Schema.Struct({
  label: Schema.String,
  data: Schema.Array(ChartDatumSchema),
});

export const ExpensiveAiChartDataSchema = Schema.Struct({
  sources: Schema.Array(SourceSchema),
  agentTaskCosts: Schema.Array(ChartSeriesSchema),
  totalProjectCosts: Schema.Array(ChartSeriesSchema),
});

export const ExpensiveAiDataSchema = Schema.Struct({
  title: Schema.String,
  lastUpdated: Schema.String,
  models: Schema.Record({ key: Schema.String, value: ModelPricingSchema }),
  sources: Schema.Array(SourceSchema),
  reasoningMultipliers: Schema.Record({
    key: Schema.String,
    value: Schema.Number,
  }),
  inputTokenEfficiency: Schema.Record({
    key: Schema.String,
    value: Schema.Number,
  }),
  modelNames: Schema.Record({ key: Schema.String, value: Schema.String }),
  agentTaskCosts: Schema.Array(ChartSeriesSchema),
  totalProjectCosts: Schema.Array(ChartSeriesSchema),
});

export type ExpensiveAiData = Schema.Schema.Type<typeof ExpensiveAiDataSchema>;
export type ExpensiveAiChartData = Schema.Schema.Type<typeof ExpensiveAiChartDataSchema>;

export const EMPTY_EXPENSIVE_AI_CHART_DATA = Schema.decodeUnknownSync(ExpensiveAiChartDataSchema)({
  sources: [],
  agentTaskCosts: [],
  totalProjectCosts: [],
});

class ExpensiveAiFetchError extends Data.TaggedError("ExpensiveAiFetchError")<{
  readonly path: string;
  readonly reason: unknown;
}> {}

class ExpensiveAiHttpError extends Data.TaggedError("ExpensiveAiHttpError")<{
  readonly path: string;
  readonly status: number;
}> {}

class ExpensiveAiValidationError extends Data.TaggedError("ExpensiveAiValidationError")<{
  readonly path: string;
  readonly reason: unknown;
}> {}

export type ExpensiveAiDataError =
  | ExpensiveAiFetchError
  | ExpensiveAiHttpError
  | ExpensiveAiValidationError;

export const expensiveAiDataLoadAttempts = Metric.counter("expensive_ai_data_load_attempts", {
  description: "Expensive AI data load attempts",
  incremental: true,
});

export const expensiveAiDataLoadFailures = Metric.counter("expensive_ai_data_load_failures", {
  description: "Expensive AI data load failures",
  incremental: true,
});

export const expensiveAiDataLoadSuccesses = Metric.counter("expensive_ai_data_load_successes", {
  description: "Expensive AI data load successes",
  incremental: true,
});

export const loadExpensiveAiDataEffect = (
  path = DEFAULT_DATA_PATH,
): Effect.Effect<ExpensiveAiData, ExpensiveAiDataError, never> =>
  Metric.increment(expensiveAiDataLoadAttempts).pipe(
    Effect.zipRight(
      Effect.tryPromise({
        try: (signal) => fetch(path, { signal }),
        catch: (reason) => new ExpensiveAiFetchError({ path, reason }),
      }),
    ),
    Effect.flatMap((response) =>
      response.ok
        ? Effect.succeed(response)
        : Effect.fail(new ExpensiveAiHttpError({ path, status: response.status })),
    ),
    Effect.flatMap((response) =>
      Effect.tryPromise({
        try: () => response.json() as Promise<unknown>,
        catch: (reason) => new ExpensiveAiFetchError({ path, reason }),
      }),
    ),
    Effect.flatMap((json) =>
      Schema.decodeUnknown(ExpensiveAiDataSchema)(json).pipe(
        Effect.mapError((reason) => new ExpensiveAiValidationError({ path, reason })),
      ),
    ),
    Effect.tap(() => Metric.increment(expensiveAiDataLoadSuccesses)),
    Effect.tapError(() => Metric.increment(expensiveAiDataLoadFailures)),
  );
