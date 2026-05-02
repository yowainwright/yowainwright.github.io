export interface AgentCostData {
  agentTaskCosts: Array<{
    label: string;
    data: Array<{ primary: string; secondary: number }>;
  }>;
  sources: Array<{ link: string; author: string; publication: string }>;
}

export interface AgentTaskCostChartProps {
  className?: string;
}
