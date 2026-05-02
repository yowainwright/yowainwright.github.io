export interface ModelPricing {
  input: number;
  output: number;
  source: string;
  lastUpdated: string;
}

export interface PricingData {
  [modelId: string]: ModelPricing;
}

export interface OpenRouterModel {
  id: string;
  name: string;
  pricing: {
    prompt: string;
    completion: string;
  };
}

export interface OpenRouterResponse {
  data: OpenRouterModel[];
}

export interface ReasoningMultipliers {
  [modelId: string]: number;
}
