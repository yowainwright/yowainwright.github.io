import React, { useState, useEffect } from 'react';
import { MODEL_PRICING, REASONING_MULTIPLIERS, MODEL_NAMES, LAST_UPDATED } from './constants';
import type { ModelCalculation } from './types';

const STORAGE_KEY = 'ai-token-calculator-input';
const DEFAULT_TOKENS = 700;

function calculateCosts(inputTokens: number): ModelCalculation[] {
  return Object.entries(MODEL_PRICING).map(([modelId, pricing]) => {
    const multiplier = REASONING_MULTIPLIERS[modelId] || 1;
    const outputTokens = Math.round(inputTokens * multiplier);
    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;

    return {
      modelId,
      modelName: MODEL_NAMES[modelId] || modelId,
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

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedTokens = parseInt(saved, 10);
      if (!isNaN(parsedTokens) && parsedTokens > 0) {
        setInputTokens(parsedTokens);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, inputTokens.toString());
    setCalculations(calculateCosts(inputTokens));
  }, [inputTokens]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setInputTokens(value);
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
          type="number"
          value={inputTokens}
          onChange={handleTokenChange}
          min="0"
          step="1"
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

      <div className="calculator__footer">
        <p className="calculator__pricing-note">
          Prices last updated: {new Date(LAST_UPDATED).toLocaleDateString()}
        </p>
        <p className="calculator__helper-note">
          Output tokens calculated using reasoning multipliers based on model capabilities.
          Actual usage may vary.
        </p>
      </div>
    </div>
  );
};