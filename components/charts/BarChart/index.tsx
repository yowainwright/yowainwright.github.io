"use client";

import React, { useContext } from "react";
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
import { CHART_COLORS, CHART_STYLES } from "../constants";
import { GlobalState } from "../../../pages/_app";

export const BarChart = ({
  data,
  primaryLabel = "",
  secondaryLabel = "",
  height = "400px",
  title,
}: BarChartProps) => {
  const state = useContext(GlobalState);
  const isDark = state?.isDarkMode ?? false;
  const colors = isDark ? CHART_COLORS.dark : CHART_COLORS.light;
  const hasData = data && data.length > 0;
  const chartData = hasData ? data[0].data || [] : [];
  const zebraColors = [colors.grey, colors.primary];

  return (
    <div
      className="post__chart"
      style={{ width: "100%", height, padding: "20px 0" }}
    >
      {title && <div className="chart-title">{title}</div>}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={chartData} margin={CHART_STYLES.margin}>
          <CartesianGrid strokeDasharray={CHART_STYLES.grid.strokeDasharray} />
          <XAxis dataKey="primary" fontSize={CHART_STYLES.axis.fontSize}>
            {primaryLabel && (
              <Label
                value={primaryLabel}
                offset={-10}
                position="insideBottom"
              />
            )}
          </XAxis>
          <YAxis fontSize={CHART_STYLES.axis.fontSize}>
            {secondaryLabel && (
              <Label value={secondaryLabel} angle={-90} position="insideLeft" />
            )}
          </YAxis>
          <Tooltip
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
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={zebraColors[index % 2]} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
