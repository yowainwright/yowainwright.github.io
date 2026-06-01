import { Effect } from "effect";
import { loadExpensiveAiDataEffect } from "../client/data/expensive-ai";
import { useEffectResource } from "../client/effect/useEffectResource";

const expensiveAiDataResource = Effect.runSync(Effect.cached(loadExpensiveAiDataEffect()));

export function useExpensiveAiData() {
  return useEffectResource(() => expensiveAiDataResource, []);
}
