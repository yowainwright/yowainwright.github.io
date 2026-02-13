export const TOKEN_COST_CHART_LABELS = {
  TITLE: "Approximate Cost Per Query",
  SECONDARY_LABEL: "USD",
};

export const tokenCostData = [
  {
    label: "Cost for Human Query (700 input tokens + typical output)",
    data: [
      { primary: "DeepSeek R1 (700i→1050o)", secondary: 0.0031 },
      { primary: "Grok 4.1 (700i→1200o)", secondary: 0.0008 },
      { primary: "Gemini 3 Ultra (700i→1100o)", secondary: 0.0096 },
      { primary: "GPT-5 (700i→1400o)", secondary: 0.084 },
      { primary: "Claude Opus 4.5 (700i→1750o)", secondary: 0.2095 },
    ],
  },
];

export const sources = [
  {
    link: "https://artificialanalysis.ai/models/comparisons/deepseek-v3-1-reasoning-vs-claude-4-opus",
    author: "Artificial Analysis",
    publication: "Model Cost Comparisons",
  },
  {
    link: "https://openai.com/api/pricing/",
    author: "OpenAI",
    publication: "API Pricing",
  },
  {
    link: "https://www.anthropic.com/api",
    author: "Anthropic",
    publication: "Claude API Pricing",
  },
];
