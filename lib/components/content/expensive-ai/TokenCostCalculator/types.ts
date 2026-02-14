export interface ModelPricing {
  input: number;
  output: number;
  source: string;
  lastUpdated: string;
}

export interface ModelCalculation {
  modelId: string;
  modelName: string;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  outputTokens: number;
}

export interface CalculatorState {
  inputTokens: number;
  calculations: ModelCalculation[];
}

export interface AIData {
  models: Record<
    string,
    { input: number; output: number; source: string; lastUpdated: string }
  >;
  reasoningMultipliers: Record<string, number>;
  inputTokenEfficiency: Record<string, number>;
  modelNames: Record<string, string>;
  lastUpdated: string;
  sources: Array<{ link: string; author: string; publication: string }>;
}
