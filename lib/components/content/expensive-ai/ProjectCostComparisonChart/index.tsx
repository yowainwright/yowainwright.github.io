import React from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { ChartSources } from "../../../charts";
import { matchEffectResource } from "../../../../client/effect/useEffectResource";
import type { ExpensiveAiChartData } from "../../../../client/data/expensive-ai";
import { useExpensiveAiData } from "../../../../hooks/useExpensiveAiData";
import { PROJECT_COMPARISON_LABELS } from "./constants";
import { SHARED_CHART_CONSTANTS } from "../shared/constants";

const BarChart = dynamic(() => import("../../../charts").then((mod) => mod.BarChart), {
  ssr: false,
});

const ChartLoading = () => (
  <div style={SHARED_CHART_CONSTANTS.LOADING_STATES.CONTAINER_STYLE}>
    <Loader2
      size={SHARED_CHART_CONSTANTS.LOADING_STATES.SPINNER_SIZE}
      style={{
        animation: SHARED_CHART_CONSTANTS.LOADING_STATES.SPINNER_ANIMATION,
      }}
    />
    {PROJECT_COMPARISON_LABELS.LOADING_TEXT}
  </div>
);

const ProjectComparisonChartContent = ({ chartData }: { chartData: ExpensiveAiChartData }) => {
  const hasTotalProjectCosts =
    chartData.totalProjectCosts && Array.isArray(chartData.totalProjectCosts);
  const hasSources = chartData.sources && Array.isArray(chartData.sources);

  return (
    <>
      {hasTotalProjectCosts && (
        <BarChart
          data={chartData.totalProjectCosts}
          title={PROJECT_COMPARISON_LABELS.TITLE}
          secondaryLabel={PROJECT_COMPARISON_LABELS.SECONDARY_LABEL}
          yDomain={[0, PROJECT_COMPARISON_LABELS.Y_DOMAIN_MAX]}
        />
      )}
      {hasSources && <ChartSources sources={chartData.sources} />}
    </>
  );
};

export const ProjectCostComparisonChart = () => {
  const resource = useExpensiveAiData();

  return matchEffectResource(resource, {
    onLoading: () => <ChartLoading />,
    onFailure: () => (
      <ProjectComparisonChartContent
        chartData={SHARED_CHART_CONSTANTS.ERROR_HANDLING.FALLBACK_STATE}
      />
    ),
    onSuccess: (chartData) => <ProjectComparisonChartContent chartData={chartData} />,
  });
};
