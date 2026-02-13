import React from "react";
import dynamic from "next/dynamic";
import { ChartSources } from "../../../charts";
import { tokenCostData, sources, TOKEN_COST_CHART_LABELS } from "./constants";

const BarChart = dynamic(
  () => import("../../../charts").then((mod) => mod.BarChart),
  { ssr: false },
);

export const TokenCostChart = () => (
  <>
    <BarChart
      data={tokenCostData}
      title={TOKEN_COST_CHART_LABELS.TITLE}
      secondaryLabel={TOKEN_COST_CHART_LABELS.SECONDARY_LABEL}
      yDomain={[0, 0.25]}
    />
    <ChartSources sources={sources} />
  </>
);
