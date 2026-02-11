export const MODEL_PRICING = {
  "claude-opus-4.5": {
    "input": 28,
    "output": 280,
    "source": "docs.anthropic.com",
    "lastUpdated": "2026-02-11"
  },
  "gpt-5": {
    "input": 60,
    "output": 120,
    "source": "openai.com",
    "lastUpdated": "2026-02-11"
  },
  "gemini-3-ultra": {
    "input": 8.75,
    "output": 87.5,
    "source": "cloud.google.com",
    "lastUpdated": "2026-02-11"
  },
  "grok-4.1": {
    "input": 0.2,
    "output": 0.5,
    "source": "x.ai",
    "lastUpdated": "2026-02-11"
  },
  "deepseek-r1": {
    "input": 0.7,
    "output": 2.5,
    "source": "openrouter.ai",
    "lastUpdated": "2026-02-11"
  }
};

export const REASONING_MULTIPLIERS = {
  "claude-opus-4.5": 2.8,
  "gpt-5": 2.2,
  "gemini-3-ultra": 2,
  "deepseek-r1": 3.5,
  "grok-4.1": 1.8
};

export const INPUT_TOKEN_EFFICIENCY = {
  "claude-opus-4.5": 0.5,
  "gpt-5": 1,
  "gemini-3-ultra": 1.2,
  "deepseek-r1": 0.9,
  "grok-4.1": 1.1
};

export const MODEL_NAMES = {
  "claude-opus-4.5": "Claude Opus 4.5",
  "gpt-5": "GPT-5",
  "gemini-3-ultra": "Gemini 3 Ultra",
  "deepseek-r1": "DeepSeek R1",
  "grok-4.1": "Grok 4.1"
};

export const LAST_UPDATED = '2026-02-11T03:10:57.337Z';

export const STORAGE_KEY = 'ai-token-calculator-input';
export const DEFAULT_TOKENS = 700;

export const GRAMMARS = {
  DESCRIPTION: 'Calculate approximate costs for different AI models based on token usage',
  LABEL: 'Input Tokens:',
  INPUT_LABEL: '(500 words ≈ 700 tokens)',
  META_TITLE: 'Pricing data',
  META_DESCRIPTION: 'Approximate output tokens calculated using reasoning multipliers based on model capabilities. Actual usage may vary.',
}
