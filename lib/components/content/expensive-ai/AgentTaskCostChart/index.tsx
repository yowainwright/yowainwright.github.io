import React from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { ChartSources } from "../../../charts";
import { matchEffectResource } from "../../../../client/effect/useEffectResource";
import type { ExpensiveAiChartData } from "../../../../client/data/expensive-ai";
import { useExpensiveAiData } from "../../../../hooks/useExpensiveAiData";
import { AGENT_TASK_CHART_LABELS } from "./constants";
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
    {AGENT_TASK_CHART_LABELS.LOADING_TEXT}
  </div>
);

const AgentTaskChartContent = ({ chartData }: { chartData: ExpensiveAiChartData }) => {
  const hasAgentTaskCosts = chartData.agentTaskCosts && Array.isArray(chartData.agentTaskCosts);
  const hasSources = chartData.sources && Array.isArray(chartData.sources);

  return (
    <>
      {hasAgentTaskCosts && (
        <BarChart
          data={chartData.agentTaskCosts}
          title={AGENT_TASK_CHART_LABELS.TITLE}
          secondaryLabel={AGENT_TASK_CHART_LABELS.SECONDARY_LABEL}
          yDomain={[0, AGENT_TASK_CHART_LABELS.Y_DOMAIN_MAX]}
        />
      )}
      {hasSources && <ChartSources sources={chartData.sources} />}
    </>
  );
};

export const AgentTaskCostChart = () => {
  const resource = useExpensiveAiData();

  return matchEffectResource(resource, {
    onLoading: () => <ChartLoading />,
    onFailure: () => (
      <AgentTaskChartContent chartData={SHARED_CHART_CONSTANTS.ERROR_HANDLING.FALLBACK_STATE} />
    ),
    onSuccess: (chartData) => <AgentTaskChartContent chartData={chartData} />,
  });
};
