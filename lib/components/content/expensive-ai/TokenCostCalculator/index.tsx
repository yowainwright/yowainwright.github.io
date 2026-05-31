import React, { useMemo, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Effect, Either } from "effect";
import { matchEffectResource } from "../../../../client/effect/useEffectResource";
import { useExpensiveAiData } from "../../../../hooks/useExpensiveAiData";
import { FALLBACK_AI_DATA, GRAMMARS, STORAGE_KEY } from "./constants";
import {
  calculateCostsEffect,
  DEFAULT_TOKEN_COUNT,
  parseTokenInputEffect,
  persistTokenCountEffect,
  readStoredTokenCountEffect,
} from "./model";

export const TokenCostCalculator = () => {
  const [inputTokens, setInputTokens] = useState(DEFAULT_TOKEN_COUNT);
  const resource = useExpensiveAiData();
  const aiData = matchEffectResource(resource, {
    onLoading: () => null,
    onFailure: () => FALLBACK_AI_DATA,
    onSuccess: (data) => data,
  });
  const calculations = useMemo(
    () => (aiData ? Effect.runSync(calculateCostsEffect(inputTokens, aiData)) : []),
    [aiData, inputTokens],
  );

  useEffect(() => {
    setInputTokens(Effect.runSync(readStoredTokenCountEffect(STORAGE_KEY)));
  }, []);

  useEffect(() => {
    if (aiData) {
      Effect.runSync(persistTokenCountEffect(STORAGE_KEY, inputTokens));
    }
  }, [inputTokens, aiData]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const nextTokens = Effect.runSync(Effect.either(parseTokenInputEffect(inputValue)));

    if (Either.isRight(nextTokens)) {
      setInputTokens(nextTokens.right);
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
        <p className="calculator__description">{GRAMMARS.DESCRIPTION}</p>
      </div>

      <div className="calculator__input-section">
        <label htmlFor="token-input" className="calculator__label">
          {GRAMMARS.LABEL}
          <span className="calculator__helper-text">{GRAMMARS.INPUT_LABEL}</span>
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
        <table className="calculator__table post__table">
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
                <td className="calculator__table-cell calculator__model-name">{calc.modelName}</td>
                <td className="calculator__table-cell">{calc.outputTokens.toLocaleString()}</td>
                <td className="calculator__table-cell">${calc.inputCost.toFixed(4)}</td>
                <td className="calculator__table-cell">${calc.outputCost.toFixed(4)}</td>
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
          <Loader2 size={16} className="calculator__spinner" />
          <strong>Pricing data</strong>
        </div>
      )}

      <div className="calculator__footer">
        <p className="calculator__pricing-note">
          {GRAMMARS.META_TITLE}{" "}
          {aiData?.lastUpdated ? (
            new Date(aiData.lastUpdated).toLocaleDateString()
          ) : (
            <Loader2 size={8} style={{ animation: "spin 1s linear infinite" }} />
          )}
        </p>
        <p className="calculator__helper-note">{GRAMMARS.META_DESCRIPTION}</p>
      </div>
    </div>
  );
};
