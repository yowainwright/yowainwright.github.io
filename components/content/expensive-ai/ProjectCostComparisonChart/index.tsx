import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { ChartSources } from "../../../charts";
import { PROJECT_COMPARISON_LABELS } from "./constants";
import { SHARED_CHART_CONSTANTS } from "../shared/constants";
import type { ProjectCostData } from "./types";

const BarChart = dynamic(
  () => import("../../../charts").then((mod) => mod.BarChart),
  { ssr: false },
);

export const ProjectCostComparisonChart = () => {
  const [data, setData] = useState<ProjectCostData | null>(null);

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
          style={{
            animation: SHARED_CHART_CONSTANTS.LOADING_STATES.SPINNER_ANIMATION,
          }}
        />
        {PROJECT_COMPARISON_LABELS.LOADING_TEXT}
      </div>
    );
  }

  const hasTotalProjectCosts =
    data.totalProjectCosts && Array.isArray(data.totalProjectCosts);
  const hasSources = data.sources && Array.isArray(data.sources);

  return (
    <>
      {hasTotalProjectCosts && (
        <BarChart
          data={data.totalProjectCosts}
          title={PROJECT_COMPARISON_LABELS.TITLE}
          secondaryLabel={PROJECT_COMPARISON_LABELS.SECONDARY_LABEL}
          yDomain={[0, PROJECT_COMPARISON_LABELS.Y_DOMAIN_MAX]}
        />
      )}
      {hasSources && <ChartSources sources={data.sources} />}
    </>
  );
};
