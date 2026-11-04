"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";
import { CHART_SERIES_COLORS, CHART_STYLES } from "../../../charts/constants";
import { pastoralistCleanupMetrics } from "./constants";

const unusedColor = CHART_SERIES_COLORS[0];
const overrideColor = CHART_SERIES_COLORS[1];
const studyData = pastoralistCleanupMetrics;

export const PastoralistStudyCharts = () => (
  <div className="pastoralist-study-charts">
    <div className="chart-title">Unused overrides out of total overrides</div>
    <StudyChart />
  </div>
);

function StudyChart() {
  const margin = { top: 4, right: 36, bottom: 20, left: 4 };
  const cursor = { fill: "var(--chart-hover-fill)" };
  return (
    <div className="pastoralist-study-charts__chart">
      <ResponsiveContainer
        width="100%"
        height="100%"
        initialDimension={CHART_STYLES.initialDimension}
      >
        <RechartsBarChart data={studyData} layout="vertical" margin={margin}>
          <CartesianGrid
            xAxisId="overrides"
            yAxisId="unused"
            horizontal={false}
            stroke={CHART_STYLES.grid.stroke}
            strokeDasharray={CHART_STYLES.grid.strokeDasharray}
          />
          <StudyAxes />
          <Tooltip<number, string> axisId="unused" content={StudyTooltip} cursor={cursor} />
          <StudyBars />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

function StudyAxes() {
  const axis = {
    type: "number" as const,
    allowDecimals: false,
    height: 40,
    fontSize: CHART_STYLES.axis.fontSize,
  };
  const overridesTick = { fill: overrideColor };
  const projectTick = { fill: "var(--color-text-primary)", fontSize: 12 };
  const overridesLabel = {
    value: "Total overrides",
    position: "bottom" as const,
    offset: 10,
    fill: overrideColor,
    fontSize: 12,
  };
  return (
    <>
      <XAxis
        {...axis}
        xAxisId="overrides"
        tick={overridesTick}
        stroke={overrideColor}
        label={overridesLabel}
      />
      <YAxis
        yAxisId="unused"
        type="category"
        dataKey="project"
        width={140}
        interval={0}
        tick={projectTick}
        tickLine={false}
        axisLine={false}
      />
      <YAxis yAxisId="overrides" type="category" dataKey="project" width={0} hide />
    </>
  );
}

function StudyBars() {
  return (
    <>
      <Bar
        className="study-overrides"
        dataKey="overrides"
        name="Total overrides"
        xAxisId="overrides"
        yAxisId="overrides"
        fill={overrideColor}
        fillOpacity={0.25}
        barSize={22}
        isAnimationActive={false}
      />
      <Bar
        className="study-unused"
        dataKey="unused"
        name="Unused overrides"
        xAxisId="overrides"
        yAxisId="unused"
        fill={unusedColor}
        barSize={12}
        minPointSize={2}
        isAnimationActive={false}
      >
        <LabelList
          dataKey="unused"
          position="right"
          formatter={formatLabelValue}
          fill={CHART_STYLES.line.label.color}
          fontSize={CHART_STYLES.line.label.fontSize}
        />
      </Bar>
    </>
  );
}

function StudyTooltip({ active, label }: TooltipContentProps<number, string>) {
  const metric = studyData.find((entry) => entry.project === label);
  const visible = active && metric;
  if (!visible) return null;
  return (
    <div className="pastoralist-study-charts__tooltip" style={CHART_STYLES.tooltip.content}>
      <strong>{metric.project}</strong>
      <div>Total overrides: {formatNumber(metric.overrides)}</div>
      <div>Unused overrides: {formatNumber(metric.unused)}</div>
    </div>
  );
}

function formatLabelValue(value: React.ReactNode) {
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "string") return formatNumber(value);
  return "";
}

function formatNumber(value: number | string) {
  return Number(value).toLocaleString();
}
