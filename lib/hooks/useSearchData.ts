import { Effect } from "effect";
import { loadSearchDataEffect } from "../client/data/search";
import { useEffectResource } from "../client/effect/useEffectResource";

const searchDataResource = Effect.runSync(
  Effect.cached(loadSearchDataEffect()),
);

export function useSearchData() {
  return useEffectResource(searchDataResource);
}
