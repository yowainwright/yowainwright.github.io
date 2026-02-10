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