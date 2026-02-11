export interface ProjectCostData {
  totalProjectCosts: Array<{
    label: string;
    data: Array<{ primary: string; secondary: number }>;
  }>;
  sources: Array<{ link: string; author: string; publication: string }>;
}

export interface ProjectCostComparisonChartProps {
  className?: string;
}