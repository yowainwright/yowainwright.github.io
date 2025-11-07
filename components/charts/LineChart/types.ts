export type DataPoint = {
  primary: string | number;
  secondary: number;
};

export type Series = {
  label: string;
  data: DataPoint[];
};

export interface LineChartProps {
  data: Series[];
  primaryLabel?: string;
  secondaryLabel?: string;
  height?: string;
}
