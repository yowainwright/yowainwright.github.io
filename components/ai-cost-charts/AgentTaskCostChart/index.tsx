import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { ChartSources } from "../../charts";
import { AGENT_TASK_CHART_LABELS } from './constants';
import { SHARED_CHART_CONSTANTS } from '../shared/constants';
import type { AgentCostData } from './types';

const BarChart = dynamic(
  () => import("../../charts").then((mod) => mod.BarChart),
  { ssr: false },
);


export const AgentTaskCostChart = () => {
  const [data, setData] = useState<AgentCostData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SHARED_CHART_CONSTANTS.DATA_SOURCE);
        const agentData = await response.json();
        setData(agentData);
      } catch {
        setData(SHARED_CHART_CONSTANTS.ERROR_HANDLING.FALLBACK_STATE);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div style={SHARED_CHART_CONSTANTS.LOADING_STATES.CONTAINER_STYLE}>
        <Loader2
          size={SHARED_CHART_CONSTANTS.LOADING_STATES.SPINNER_SIZE}
          style={{ animation: SHARED_CHART_CONSTANTS.LOADING_STATES.SPINNER_ANIMATION }}
        />
        {AGENT_TASK_CHART_LABELS.LOADING_TEXT}
      </div>
    );
  }

  return (
    <>
      <BarChart
        data={data.agentTaskCosts}
        secondaryLabel={AGENT_TASK_CHART_LABELS.SECONDARY_LABEL}
        yDomain={[0, AGENT_TASK_CHART_LABELS.Y_DOMAIN_MAX]}
      />
      <ChartSources sources={data.sources} />
    </>
  );
};
