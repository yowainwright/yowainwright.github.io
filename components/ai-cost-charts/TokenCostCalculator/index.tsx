import React, { useState, useEffect } from 'react';
import type { ModelCalculation } from './types';

const STORAGE_KEY = 'ai-token-calculator-input';
const DEFAULT_TOKENS = 700;

interface AIData {
  models: Record<string, { input: number; output: number; source: string; lastUpdated: string }>;
  reasoningMultipliers: Record<string, number>;
  inputTokenEfficiency: Record<string, number>;
  modelNames: Record<string, string>;
  lastUpdated: string;
  sources: Array<{ link: string; author: string; publication: string }>;
}

function calculateCosts(inputTokens: number, data: AIData): ModelCalculation[] {
  return Object.entries(data.models).map(([modelId, pricing]) => {
    const outputMultiplier = data.reasoningMultipliers[modelId] || 1;
    const inputEfficiency = data.inputTokenEfficiency[modelId] || 1;
    const actualInputTokens = Math.round(inputTokens * inputEfficiency);
    const outputTokens = Math.round(inputTokens * outputMultiplier);
    const inputCost = (actualInputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;

    return {
      modelId,
      modelName: data.modelNames[modelId] || modelId,
      inputCost,
      outputCost,
      totalCost: inputCost + outputCost,
      outputTokens
    };
  }).sort((a, b) => a.totalCost - b.totalCost);
}

export const TokenCostCalculator = () => {
  const [inputTokens, setInputTokens] = useState(DEFAULT_TOKENS);
  const [calculations, setCalculations] = useState<ModelCalculation[]>([]);
  const [aiData, setAiData] = useState<AIData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/expensive-ai.json');
        const data = await response.json();
        setAiData(data);
      } catch (error) {
        console.error('Failed to load AI pricing data:', error);
      }
    };

    fetchData();

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedTokens = parseInt(saved, 10);
      if (!isNaN(parsedTokens) && parsedTokens >= 0) {
        setInputTokens(parsedTokens);
      }
    }
  }, []);

  useEffect(() => {
    if (aiData) {
      localStorage.setItem(STORAGE_KEY, inputTokens.toString());
      setCalculations(calculateCosts(inputTokens, aiData));
    }
  }, [inputTokens, aiData]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setInputTokens(0);
      return;
    }

    // Only allow numeric characters
    if (!/^\d+$/.test(inputValue)) {
      return;
    }

    // Remove leading zeros and convert to number
    const cleanValue = inputValue.replace(/^0+/, '') || '0';
    const value = parseInt(cleanValue, 10);

    if (!isNaN(value) && value >= 0) {
      setInputTokens(value);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputTokens === 0) {
      e.target.select();
    }
  };

  return (
    <div className="calculator">
      <div className="calculator__header">
        <h3 className="calculator__title">AI Token Cost Calculator</h3>
        <p className="calculator__description">
          Calculate costs for different AI models based on your token usage
        </p>
      </div>

      <div className="calculator__input-section">
        <label htmlFor="token-input" className="calculator__label">
          Input Tokens:
          <span className="calculator__helper-text">(500 words ≈ 700 tokens)</span>
        </label>
        <input
          id="token-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputTokens}
          onChange={handleTokenChange}
          onFocus={handleFocus}
          className="calculator__input"
        />
      </div>

      <div className="calculator__table-wrapper">
        <table className="calculator__table">
          <thead>
            <tr>
              <th className="calculator__table-cell calculator__table-header">Model</th>
              <th className="calculator__table-cell calculator__table-header">Output Tokens</th>
              <th className="calculator__table-cell calculator__table-header">Input Cost</th>
              <th className="calculator__table-cell calculator__table-header">Output Cost</th>
              <th className="calculator__table-cell calculator__table-header">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {calculations.map((calc) => (
              <tr key={calc.modelId}>
                <td className="calculator__table-cell calculator__model-name">
                  {calc.modelName}
                </td>
                <td className="calculator__table-cell">
                  {calc.outputTokens.toLocaleString()}
                </td>
                <td className="calculator__table-cell">
                  ${calc.inputCost.toFixed(4)}
                </td>
                <td className="calculator__table-cell">
                  ${calc.outputCost.toFixed(4)}
                </td>
                <td className="calculator__table-cell calculator__total-cost">
                  ${calc.totalCost.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!aiData && (
        <div className="calculator__loading">
          Loading pricing data...
        </div>
      )}

      <div className="calculator__footer">
        <p className="calculator__pricing-note">
          Prices last updated: {aiData ? new Date(aiData.lastUpdated).toLocaleDateString() : 'Loading...'}
        </p>
        <p className="calculator__helper-note">
          Output tokens calculated using reasoning multipliers based on model capabilities.
          Actual usage may vary.
        </p>
      </div>
    </div>
  );
};