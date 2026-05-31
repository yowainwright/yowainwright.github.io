import { Data, Effect, Metric, Schema } from "effect";

const DEFAULT_SEARCH_DATA_PATH = "/search-data.json";

export const SearchResultSchema = Schema.Struct({
  title: Schema.String,
  description: Schema.String,
  slug: Schema.String,
  type: Schema.Literal("post", "project"),
  url: Schema.String,
});

export const SearchDataSchema = Schema.Array(SearchResultSchema);

export type SearchResultData = Schema.Schema.Type<typeof SearchResultSchema>;
export type SearchData = Schema.Schema.Type<typeof SearchDataSchema>;

class SearchDataFetchError extends Data.TaggedError("SearchDataFetchError")<{
  readonly path: string;
  readonly reason: unknown;
}> {}

class SearchDataHttpError extends Data.TaggedError("SearchDataHttpError")<{
  readonly path: string;
  readonly status: number;
}> {}

class SearchDataValidationError extends Data.TaggedError("SearchDataValidationError")<{
  readonly path: string;
  readonly reason: unknown;
}> {}

export type SearchDataError =
  | SearchDataFetchError
  | SearchDataHttpError
  | SearchDataValidationError;

export const searchDataLoadAttempts = Metric.counter("search_data_load_attempts", {
  description: "Search data load attempts",
  incremental: true,
});

export const searchDataLoadFailures = Metric.counter("search_data_load_failures", {
  description: "Search data load failures",
  incremental: true,
});

export const searchDataLoadSuccesses = Metric.counter("search_data_load_successes", {
  description: "Search data load successes",
  incremental: true,
});

export const loadSearchDataEffect = (
  path = DEFAULT_SEARCH_DATA_PATH,
): Effect.Effect<SearchData, SearchDataError, never> =>
  Metric.increment(searchDataLoadAttempts).pipe(
    Effect.zipRight(
      Effect.tryPromise({
        try: (signal) => fetch(path, { signal }),
        catch: (reason) => new SearchDataFetchError({ path, reason }),
      }),
    ),
    Effect.flatMap((response) =>
      response.ok
        ? Effect.succeed(response)
        : Effect.fail(new SearchDataHttpError({ path, status: response.status })),
    ),
    Effect.flatMap((response) =>
      Effect.tryPromise({
        try: () => response.json() as Promise<unknown>,
        catch: (reason) => new SearchDataFetchError({ path, reason }),
      }),
    ),
    Effect.flatMap((json) =>
      Schema.decodeUnknown(SearchDataSchema)(json).pipe(
        Effect.mapError((reason) => new SearchDataValidationError({ path, reason })),
      ),
    ),
    Effect.tap(() => Metric.increment(searchDataLoadSuccesses)),
    Effect.tapError(() => Metric.increment(searchDataLoadFailures)),
  );
