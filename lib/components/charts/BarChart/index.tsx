"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Cell,
} from "recharts";
import type { BarChartProps } from "../types";
import { CHART_SERIES_COLORS, CHART_STYLES } from "../constants";

export const BarChart = ({
  data,
  primaryLabel = "",
  secondaryLabel = "",
  height = "400px",
  title,
  yDomain,
}: BarChartProps) => {
  const hasData = data && data.length > 0;
  const chartData = hasData ? data[0].data || [] : [];

  return (
    <div className="post__chart" style={{ ...CHART_STYLES.container, height }}>
      {title && <div className="chart-title">{title}</div>}
      <ResponsiveContainer
        width="100%"
        height="100%"
        initialDimension={CHART_STYLES.initialDimension}
      >
        <RechartsBarChart data={chartData} margin={CHART_STYLES.margin}>
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
                angle={CHART_STYLES.axis.label.y.angle}
                fill={CHART_STYLES.axis.label.color}
                fontSize={CHART_STYLES.axis.label.fontSize}
                position={CHART_STYLES.axis.label.y.position}
                value={secondaryLabel}
              />
            )}
          </YAxis>
          <Tooltip
            cursor={{ fill: "var(--chart-hover-fill)" }}
            contentStyle={CHART_STYLES.tooltip.content}
            itemStyle={CHART_STYLES.tooltip.item}
            labelStyle={CHART_STYLES.tooltip.label}
          />
          <Bar
            dataKey="secondary"
            maxBarSize={CHART_STYLES.bar.maxBarSize}
            label={{
              position: "top",
              fontSize: CHART_STYLES.line.label.fontSize,
              fill: CHART_STYLES.line.label.color,
            }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}-${entry.primary}`}
                fill={CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length]}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
