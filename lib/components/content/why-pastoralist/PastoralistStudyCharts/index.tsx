"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  CartesianGrid,
  Cell,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLORS, CHART_STYLES } from "../../../charts/constants";
import { GlobalState } from "../../../../../pages/_app";
import {
  pastoralistStudyMetrics,
  pastoralistStudyTotals,
  type PastoralistStudyMetric,
} from "./constants";

type MetricKey = "entries" | "packageManifests";

type MetricChartProps = {
  data: PastoralistStudyMetric[];
  dataKey: MetricKey;
  title: string;
  label: string;
};

const CHART_HEIGHT = 420;

const formatNumber = (value: number | string) => Number(value).toLocaleString();
const formatLabelValue = (value: React.ReactNode) => {
  if (typeof value !== "number" && typeof value !== "string") return "";
  return formatNumber(value);
};

const sortByMetric = (metric: MetricKey) =>
  [...pastoralistStudyMetrics].sort((a, b) => b[metric] - a[metric]);

const MetricChart = ({ data, dataKey, title, label }: MetricChartProps) => {
  const state = useContext(GlobalState);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const isDark = state?.isDarkMode ?? false;
  const colors = isDark ? CHART_COLORS.dark : CHART_COLORS.light;
  const palette = [
    colors.primary,
    colors.success,
    colors.warning,
    colors.purple,
  ];

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return undefined;
    }

    const updateWidth = () => {
      setChartWidth(Math.round(chart.getBoundingClientRect().width));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(chart);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pastoralist-study-charts__panel">
      <div className="chart-title">{title}</div>
      <div className="pastoralist-study-charts__chart" ref={chartRef}>
        {chartWidth > 0 ? (
          <RechartsBarChart
            data={data}
            height={CHART_HEIGHT}
            layout="vertical"
            margin={{ top: 8, right: 48, bottom: 8, left: 8 }}
            width={chartWidth}
          >
            <CartesianGrid
              strokeDasharray={CHART_STYLES.grid.strokeDasharray}
            />
            <XAxis
              type="number"
              allowDecimals={false}
              fontSize={CHART_STYLES.axis.fontSize}
            />
            <YAxis
              type="category"
              dataKey="project"
              width={112}
              fontSize={CHART_STYLES.axis.fontSize}
            />
            <Tooltip
              formatter={(value: number) => [formatNumber(value), label]}
              labelFormatter={(project) => `${project}`}
              contentStyle={CHART_STYLES.tooltip.content}
              itemStyle={CHART_STYLES.tooltip.item}
              labelStyle={CHART_STYLES.tooltip.label}
            />
            <Bar dataKey={dataKey} maxBarSize={18} radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`${dataKey}-${entry.project}`}
                  fill={palette[index % palette.length]}
                />
              ))}
              <LabelList
                dataKey={dataKey}
                position="right"
                formatter={formatLabelValue}
                fontSize={CHART_STYLES.line.label.fontSize}
              />
            </Bar>
          </RechartsBarChart>
        ) : null}
      </div>
    </div>
  );
};

export const PastoralistStudyCharts = () => (
  <div className="pastoralist-study-charts">
    <div
      className="pastoralist-study-charts__summary"
      aria-label="Pastoralist study totals"
    >
      <div>
        <strong>{formatNumber(pastoralistStudyTotals.appendixEntries)}</strong>
        <span>appendix entries</span>
      </div>
      <div>
        <strong>{formatNumber(pastoralistStudyTotals.packageManifests)}</strong>
        <span>manifests scanned</span>
      </div>
      <div>
        <strong>{formatNumber(pastoralistStudyTotals.pullRequests)}</strong>
        <span>fork PRs</span>
      </div>
    </div>
    <div className="pastoralist-study-charts__grid">
      <MetricChart
        data={sortByMetric("entries")}
        dataKey="entries"
        title="Audit Entries Created"
        label="entries"
      />
      <MetricChart
        data={sortByMetric("packageManifests")}
        dataKey="packageManifests"
        title="Package Manifests Scanned"
        label="manifests"
      />
    </div>
  </div>
);
