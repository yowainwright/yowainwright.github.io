"use client";

import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { GitCommitHorizontal } from "lucide-react";
import type { LineChartProps, Series } from "../types";
import { CHART_SERIES_COLORS, CHART_STYLES } from "../constants";
import type { LabelPosition } from "recharts/types/component/Label";

type IndexedSeries = {
  label: string;
  values: Map<string | number, number>;
};

type FormattedChartData = Record<string, string | number | undefined>;

const getSeriesPrimaryKeys = (series: Series) =>
  series.data.map((point) => point.primary);

const addSeriesPrimaryKeys = (
  primaryKeys: Set<string | number>,
  series: Series,
) => {
  for (const primary of getSeriesPrimaryKeys(series)) {
    primaryKeys.add(primary);
  }
  return primaryKeys;
};

const getIndexedSeries = (series: Series): IndexedSeries => ({
  label: series.label,
  values: new Map(
    series.data.map((point) => [point.primary, point.secondary] as const),
  ),
});

const addSeriesValue = (
  dataPoint: FormattedChartData,
  primary: string | number,
  series: IndexedSeries,
) =>
  Object.assign({}, dataPoint, {
    [series.label]: series.values.get(primary),
  });

const formatDataPoint = (
  primary: string | number,
  indexedSeries: IndexedSeries[],
) =>
  indexedSeries.reduce<FormattedChartData>(
    (dataPoint, series) => addSeriesValue(dataPoint, primary, series),
    { primary },
  );

const formatChartData = (data: Series[]) => {
  const allPrimaryKeys = Array.from(
    data.reduce(addSeriesPrimaryKeys, new Set<string | number>()),
  ).sort();
  const indexedSeries = data.map(getIndexedSeries);

  return allPrimaryKeys.map((primary) =>
    formatDataPoint(primary, indexedSeries),
  );
};

const LegendContent = ({
  payload,
}: {
  payload?: readonly { color?: string; value?: string }[];
}) => (
  <ul className="chart-legend">
    {payload?.map((entry, index) => (
      <li
        key={`item-${index}`}
        style={{
          fontSize: CHART_STYLES.legend.item.fontSize,
          listStyleType: CHART_STYLES.legend.item.listStyleType,
        }}
      >
        <GitCommitHorizontal
          size={CHART_STYLES.legend.iconSize}
          style={{
            color: entry.color,
            paddingRight: CHART_STYLES.legend.icon.paddingRight,
          }}
        />
        {entry.value}
      </li>
    ))}
  </ul>
);

export const LineChart = ({
  data,
  primaryLabel = "",
  secondaryLabel = "",
  height = "400px",
  yDomain,
  title,
}: LineChartProps) => {
  const series = data.map((s) => s.label);
  const formattedData = formatChartData(data);
  const containerStyle = Object.assign({}, CHART_STYLES.container, { height });

  return (
    <div className="post__chart" style={containerStyle}>
      {title && <div className="chart-title">{title}</div>}
      <ResponsiveContainer
        width="100%"
        height="100%"
        initialDimension={CHART_STYLES.initialDimension}
      >
        <RechartsLineChart data={formattedData} margin={CHART_STYLES.margin}>
          <CartesianGrid
            stroke={CHART_STYLES.grid.stroke}
            strokeDasharray={CHART_STYLES.grid.strokeDasharray}
            vertical={false}
          />
          <XAxis
            axisLine={{ stroke: CHART_STYLES.axis.color }}
            dataKey="primary"
            fontSize={CHART_STYLES.axis.fontSize}
            tick={{ fill: CHART_STYLES.axis.color }}
            tickLine={{ stroke: CHART_STYLES.axis.color }}
          >
            {primaryLabel && (
              <Label
                fill={CHART_STYLES.axis.label.color}
                fontSize={CHART_STYLES.axis.label.fontSize}
                value={primaryLabel}
                offset={CHART_STYLES.axis.label.x.offset}
                position={CHART_STYLES.axis.label.x.position}
              />
            )}
          </XAxis>
          <YAxis
            axisLine={{ stroke: CHART_STYLES.axis.color }}
            domain={yDomain}
            fontSize={CHART_STYLES.axis.fontSize}
            tick={{ fill: CHART_STYLES.axis.color }}
            tickLine={{ stroke: CHART_STYLES.axis.color }}
          >
            {secondaryLabel && (
              <Label
                fill={CHART_STYLES.axis.label.color}
                fontSize={CHART_STYLES.axis.label.fontSize}
                value={secondaryLabel}
                angle={CHART_STYLES.axis.label.y.angle}
                position={CHART_STYLES.axis.label.y.position}
              />
            )}
          </YAxis>
          <Tooltip
            contentStyle={CHART_STYLES.tooltip.content}
            itemStyle={CHART_STYLES.tooltip.item}
            labelStyle={CHART_STYLES.tooltip.label}
          />
          <Legend
            verticalAlign={CHART_STYLES.legend.verticalAlign}
            content={LegendContent}
          />
          {series.map((seriesLabel, index) => (
            <Line
              key={seriesLabel}
              type={CHART_STYLES.line.type}
              dataKey={seriesLabel}
              stroke={CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length]}
              strokeWidth={CHART_STYLES.line.strokeWidth}
              dot={{
                fill: "var(--color-bg-primary)",
                r: CHART_STYLES.line.dotRadius,
                strokeWidth: CHART_STYLES.line.strokeWidth,
              }}
              label={{
                position: CHART_STYLES.line.label.position as LabelPosition,
                fontSize: CHART_STYLES.line.label.fontSize,
                fill: CHART_STYLES.line.label.color,
              }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
