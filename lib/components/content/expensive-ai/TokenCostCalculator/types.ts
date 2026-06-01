import type { ExpensiveAiData } from "../../../../client/data/expensive-ai";
import type { ModelCalculationData } from "./model";

export type ModelPricing = ExpensiveAiData["models"][string];

export type ModelCalculation = ModelCalculationData;

export interface CalculatorState {
  inputTokens: number;
  calculations: ModelCalculation[];
}

export type AIData = ExpensiveAiData;
