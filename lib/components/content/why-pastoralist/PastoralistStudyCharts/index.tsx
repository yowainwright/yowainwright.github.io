"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_SERIES_COLORS, CHART_STYLES } from "../../../charts/constants";
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

const formatNumber = (value: number | string) => Number(value).toLocaleString();
const formatLabelValue = (value: React.ReactNode) => {
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "string") return formatNumber(value);
  return "";
};

const sortByMetric = (metric: MetricKey) =>
  pastoralistStudyMetrics.slice().sort((a, b) => b[metric] - a[metric]);

const MetricChart = ({ data, dataKey, title, label }: MetricChartProps) => (
  <div className="pastoralist-study-charts__panel">
    <div className="chart-title">{title}</div>
    <div className="pastoralist-study-charts__chart">
      <ResponsiveContainer
        width="100%"
        height="100%"
        initialDimension={CHART_STYLES.initialDimension}
      >
        <RechartsBarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 44, bottom: 0, left: 4 }}
        >
          <CartesianGrid
            horizontal={false}
            stroke={CHART_STYLES.grid.stroke}
            strokeDasharray={CHART_STYLES.grid.strokeDasharray}
          />
          <XAxis
            type="number"
            allowDecimals={false}
            axisLine={{ stroke: CHART_STYLES.axis.color }}
            fontSize={CHART_STYLES.axis.fontSize}
            tick={{ fill: CHART_STYLES.axis.color }}
            tickLine={{ stroke: CHART_STYLES.axis.color }}
          />
          <YAxis
            type="category"
            dataKey="project"
            width={112}
            axisLine={{ stroke: CHART_STYLES.axis.color }}
            fontSize={CHART_STYLES.axis.fontSize}
            tick={{ fill: CHART_STYLES.axis.color }}
            tickLine={{ stroke: CHART_STYLES.axis.color }}
          />
          <Tooltip
            cursor={{ fill: "var(--chart-hover-fill)" }}
            formatter={(value: number) => [formatNumber(value), label]}
            labelFormatter={(project) => `${project}`}
            contentStyle={CHART_STYLES.tooltip.content}
            itemStyle={CHART_STYLES.tooltip.item}
            labelStyle={CHART_STYLES.tooltip.label}
          />
          <Bar dataKey={dataKey} maxBarSize={18}>
            {data.map((entry, index) => (
              <Cell
                key={`${dataKey}-${entry.project}`}
                fill={CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length]}
              />
            ))}
            <LabelList
              dataKey={dataKey}
              position="right"
              formatter={formatLabelValue}
              fill={CHART_STYLES.line.label.color}
              fontSize={CHART_STYLES.line.label.fontSize}
            />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

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
