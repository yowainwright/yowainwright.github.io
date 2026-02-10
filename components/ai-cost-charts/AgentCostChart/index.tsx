import React from "react";
import dynamic from "next/dynamic";
import { ChartSources } from "../../charts";
import { agentCostData, totalCostData, sources } from "./constants";

const BarChart = dynamic(
  () => import("../../charts").then((mod) => mod.BarChart),
  { ssr: false },
);

export const AgentCostChart = () => (
  <>
    <BarChart
      data={agentCostData}
      secondaryLabel="USD per task"
      yDomain={[0, 1.0]}
    />
    <BarChart
      data={totalCostData}
      secondaryLabel="Total USD cost"
      yDomain={[0, 3.5]}
    />
    <ChartSources sources={sources} />
  </>
);