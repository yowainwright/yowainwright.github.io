export const agentCostData = [
  {
    label: "Agent Task Costs with Claude Opus 4.5",
    data: [
      { primary: "Direct Coding (700i→1750o)", secondary: 0.21 },
      { primary: "QA Lead Agent (700i→4000o)", secondary: 0.47 },
      { primary: "TypeScript Expert (700i→3500o)", secondary: 0.41 },
      { primary: "Principal Engineer (700i→5000o)", secondary: 0.59 },
      { primary: "Fastify Expert (700i→3000o)", secondary: 0.36 },
      { primary: "Design Document (700i→8000o)", secondary: 0.92 },
      { primary: "Project Plan (700i→6000o)", secondary: 0.70 },
    ],
  },
];

export const totalCostData = [
  {
    label: "Total Project Cost Comparison",
    data: [
      { primary: "Solo Development (700i→1750o)", secondary: 0.21 },
      { primary: "5-Agent Orchestration (3500i→26500o)", secondary: 3.08 },
    ],
  },
];

export const sources = [
  {
    link: "https://www.anthropic.com/api",
    author: "Anthropic",
    publication: "Claude API Pricing - Opus $15/$75 per 1M tokens"
  },
  {
    link: "https://artificialanalysis.ai/models/comparisons/deepseek-v3-1-reasoning-vs-claude-4-opus",
    author: "Artificial Analysis",
    publication: "Realistic agent response token counts"
  }
];