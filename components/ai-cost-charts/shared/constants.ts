export const SHARED_CHART_CONSTANTS = {
  LOADING_STATES: {
    SPINNER_SIZE: 16,
    SPINNER_ANIMATION: 'spin 1s linear infinite',
    CONTAINER_STYLE: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '2rem'
    },
  },
  DATA_SOURCE: '/data/agent-cost-data.json',
  ERROR_HANDLING: {
    FALLBACK_STATE: null,
  },
};

export const BLOG_POST_CONTEXT = {
  TITLE: 'When the AI Token Gravy Train Stops',
  EXPERIENCE: 'My $150 single hour Claude Code cost wake-up call',
  WORKFLOW: 'Orchestrator agent pattern with specialized Claude Code agents',
  AGENTS: [
    'QA Lead Agent',
    'TypeScript Expert Agent',
    'Principal Engineer Agent',
    'Fastify Expert Agent'
  ],
};