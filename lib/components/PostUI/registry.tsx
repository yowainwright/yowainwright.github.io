import type { ComponentRegistry, ComponentRenderProps } from "@json-render/react";
import { Schema } from "effect";
import React from "react";
import { BarChart as PostBarChart, ChartSources } from "../charts";
import {
  BarChartPropsSchema,
  CalloutPropsSchema,
  MetricGridPropsSchema,
  SourceListPropsSchema,
} from "./schema";

const decodeBarChartProps = Schema.decodeUnknownSync(BarChartPropsSchema);
const decodeCalloutProps = Schema.decodeUnknownSync(CalloutPropsSchema);
const decodeMetricGridProps = Schema.decodeUnknownSync(MetricGridPropsSchema);
const decodeSourceListProps = Schema.decodeUnknownSync(SourceListPropsSchema);

const isStackGap = (gap: unknown): gap is "small" | "medium" | "large" => {
  const isSmall = gap === "small";
  const isMedium = gap === "medium";
  const isLarge = gap === "large";
  const isCompact = isSmall || isMedium;

  return isCompact || isLarge;
};

const getStackGap = (gap: unknown) => {
  if (isStackGap(gap)) return gap;
  return "medium";
};

const Stack = ({ element, children }: ComponentRenderProps) => {
  const gap = getStackGap(element.props.gap);
  const className = `post-ui__stack post-ui__stack--${gap}`;

  return <div className={className}>{children}</div>;
};

const Text = ({ element }: ComponentRenderProps) => {
  const text = element.props.text;
  if (typeof text !== "string") return null;

  return <p className="post-ui__text">{text}</p>;
};

const createChartDatumMapper = (values: readonly number[]) => (label: string, index: number) => {
  const secondary = values[index];
  return { primary: label, secondary };
};

const getYDomain = (
  min: number | undefined,
  max: number | undefined,
): [number, number] | undefined => {
  const isIncomplete = min === undefined || max === undefined;
  if (isIncomplete) return undefined;
  return [min, max];
};

const BarChart = ({ element }: ComponentRenderProps) => {
  const props = decodeBarChartProps(element.props);
  const toChartDatum = createChartDatumMapper(props.values);
  const chartData = props.labels.map(toChartDatum);
  const series = { label: props.title, data: chartData };
  const data = [series];
  const yDomain = getYDomain(props.min, props.max);

  return (
    <PostBarChart
      data={data}
      primaryLabel={props.xLabel}
      secondaryLabel={props.yLabel}
      title={props.title}
      yDomain={yDomain}
    />
  );
};

type Metric = Schema.Schema.Type<typeof MetricGridPropsSchema>["items"][number];

const MetricDetail = ({ detail }: { detail: string | undefined }) => {
  if (!detail) return null;
  return <p>{detail}</p>;
};

const MetricItem = ({ item }: { item: Metric }) => (
  <div className="post-ui__metric">
    <dt>{item.label}</dt>
    <dd>{item.value}</dd>
    <MetricDetail detail={item.detail} />
  </div>
);

const toMetricItem = (item: Metric) => <MetricItem item={item} key={item.label} />;

const MetricGrid = ({ element }: ComponentRenderProps) => {
  const props = decodeMetricGridProps(element.props);
  const metrics = props.items.map(toMetricItem);

  return <dl className="post-ui__metric-grid">{metrics}</dl>;
};

type CalloutTone = Schema.Schema.Type<typeof CalloutPropsSchema>["tone"];

const getCalloutTone = (tone: CalloutTone) => {
  if (tone) return tone;
  return "neutral";
};

const Callout = ({ element }: ComponentRenderProps) => {
  const props = decodeCalloutProps(element.props);
  const tone = getCalloutTone(props.tone);
  const className = `post-ui__callout post-ui__callout--${tone}`;

  return (
    <aside className={className}>
      <strong>{props.title}</strong>
      <p>{props.text}</p>
    </aside>
  );
};

const SourceList = ({ element }: ComponentRenderProps) => {
  const props = decodeSourceListProps(element.props);
  const sources = props.sources.map((source) => Object.assign({}, source));

  return <ChartSources sources={sources} />;
};

export const postUIRegistry: ComponentRegistry = {
  Stack,
  Text,
  BarChart,
  MetricGrid,
  Callout,
  SourceList,
};
