import React from "react";
import { ChartDisplayProps, ChartBarProps, ChartItem } from "./types";
import { CHART_STYLES, CHART_CONFIG } from "./constants";

function ChartLabel({ children }: { children: React.ReactNode }) {
  return <div style={CHART_STYLES.label}>{children}</div>;
}

function ChartValue({ children }: { children: React.ReactNode }) {
  return <div style={CHART_STYLES.value}>{children}</div>;
}

function ChartBarVisual({ width }: { width: number }) {
  return (
    <div
      style={{
        ...CHART_STYLES.bar,
        width: `${width}px`,
      }}
    />
  );
}

function ChartBar({ item, maxValue }: ChartBarProps) {
  const barWidth = (item.secondary / maxValue) * CHART_CONFIG.MAX_BAR_WIDTH;

  return (
    <div style={CHART_STYLES.barContainer}>
      <ChartLabel>{item.primary}</ChartLabel>
      <ChartBarVisual width={barWidth} />
      <ChartValue>{item.secondary}</ChartValue>
    </div>
  );
}

export function ChartDisplay({ data }: ChartDisplayProps) {
  const chartItems = Array.isArray(data) ? data[0]?.data : data;

  if (!chartItems?.length) {
    return null;
  }

  const maxValue = Math.max(...chartItems.map((d: ChartItem) => d.secondary));
  const displayItems = chartItems.slice(0, CHART_CONFIG.MAX_ITEMS);

  return (
    <div style={CHART_STYLES.container}>
      {displayItems.map((item: ChartItem, i: number) => (
        <ChartBar key={i} item={item} maxValue={maxValue} />
      ))}
    </div>
  );
}
