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
import { pastoralistStudyMetrics, type PastoralistStudyMetric } from "./constants";

type ProjectTickProps = { x?: number; y?: number; payload?: { value: string } };

const entryColor = CHART_SERIES_COLORS[0];
const manifestColor = CHART_SERIES_COLORS[1];
const studyData = pastoralistStudyMetrics.slice().sort((a, b) => b.entries - a.entries);

export const PastoralistStudyCharts = () => (
  <div className="pastoralist-study-charts">
    <div className="chart-title">Audit entries over manifests scanned</div>
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
            xAxisId="manifests"
            yAxisId="entries"
            horizontal={false}
            stroke={CHART_STYLES.grid.stroke}
            strokeDasharray={CHART_STYLES.grid.strokeDasharray}
          />
          <StudyAxes />
          <Tooltip<number, string> axisId="entries" content={StudyTooltip} cursor={cursor} />
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
  const manifestsTick = { fill: manifestColor };
  const manifestsLabel = {
    value: "Manifests scanned",
    position: "bottom" as const,
    offset: 10,
    fill: manifestColor,
    fontSize: 12,
  };
  return (
    <>
      <XAxis
        {...axis}
        xAxisId="manifests"
        tick={manifestsTick}
        stroke={manifestColor}
        label={manifestsLabel}
      />
      <YAxis
        yAxisId="entries"
        type="category"
        dataKey="project"
        width={140}
        interval={0}
        tick={<ProjectTick />}
        tickLine={false}
        axisLine={false}
      />
      <YAxis yAxisId="manifests" type="category" dataKey="project" hide />
    </>
  );
}

function StudyBars() {
  return (
    <>
      <Bar
        className="study-manifests"
        dataKey="packageManifests"
        name="Manifests scanned"
        xAxisId="manifests"
        yAxisId="manifests"
        fill={manifestColor}
        fillOpacity={0.25}
        barSize={22}
        isAnimationActive={false}
      />
      <Bar
        className="study-entries"
        dataKey="entries"
        name="Audit entries"
        xAxisId="manifests"
        yAxisId="entries"
        fill={entryColor}
        barSize={12}
        minPointSize={2}
        isAnimationActive={false}
      >
        <LabelList
          dataKey="entries"
          position="right"
          formatter={formatLabelValue}
          fill={CHART_STYLES.line.label.color}
          fontSize={CHART_STYLES.line.label.fontSize}
        />
      </Bar>
    </>
  );
}

function ProjectTick({ x = 0, y = 0, payload }: ProjectTickProps) {
  const metric = studyData.find((entry) => entry.project === payload?.value);
  if (!metric) return null;
  const href = getRepositoryUrl(metric);
  const transform = `translate(${x}, ${y})`;
  const label = `${metric.project} repository (${metric.upstreamRef})`;
  const prLabel = `${metric.project} study PR (${metric.upstreamRef})`;
  return (
    <g transform={transform}>
      <a
        className="study-project-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <text x={-30} dy="0.32em" textAnchor="end" fontSize={12}>
          {metric.project}
        </text>
      </a>
      <a
        className="study-pr-link"
        href={metric.prUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={prLabel}
      >
        <text x={-4} dy="0.32em" textAnchor="end" fontSize={10}>
          PR
        </text>
      </a>
    </g>
  );
}

function StudyTooltip({ active, label }: TooltipContentProps<number, string>) {
  const metric = studyData.find((entry) => entry.project === label);
  const visible = active && metric;
  if (!visible) return null;
  return (
    <div className="pastoralist-study-charts__tooltip" style={CHART_STYLES.tooltip.content}>
      <strong>{metric.project}</strong>
      <div>Audit entries: {formatNumber(metric.entries)}</div>
      <div>Manifests scanned: {formatNumber(metric.packageManifests)}</div>
      <small>{metric.upstreamRef}</small>
    </div>
  );
}

function getRepositoryUrl(metric: PastoralistStudyMetric) {
  const repository = metric.upstreamRef.split("@")[0];
  return `https://github.com/${repository}`;
}

function formatLabelValue(value: React.ReactNode) {
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "string") return formatNumber(value);
  return "";
}

function formatNumber(value: number | string) {
  return Number(value).toLocaleString();
}
