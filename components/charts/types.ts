export type DataPoint = {
  primary: string | number;
  secondary: number;
};

export type Series = {
  label: string;
  data: DataPoint[];
};

export interface BarChartProps {
  data: Series[];
  primaryLabel?: string;
  secondaryLabel?: string;
  height?: string;
  title?: string;
}

export interface LineChartProps {
  data: Series[];
  primaryLabel?: string;
  secondaryLabel?: string;
  height?: string;
  yDomain?: [number, number];
  title?: string;
}

export interface ChartSource {
  link: string;
  author: string;
  publication: string;
}

export interface ChartSourcesProps {
  sources: ChartSource[];
}

export interface WrappedYAxisLabelProps {
  value: string;
  x: number;
  y: number;
  maxWidth?: number;
  fontSize?: number;
}
