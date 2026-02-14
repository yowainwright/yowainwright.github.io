export interface ChartItem {
  primary: string;
  secondary: number;
}

export interface ChartDisplayProps {
  data: ChartItem[] | unknown;
}

export interface ChartBarProps {
  item: ChartItem;
  maxValue: number;
}
