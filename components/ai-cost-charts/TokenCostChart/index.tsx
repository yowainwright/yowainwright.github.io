import React from "react";
import dynamic from "next/dynamic";
import { ChartSources } from "../../charts";
import { tokenCostData, sources } from "./constants";

const BarChart = dynamic(
  () => import("../../charts").then((mod) => mod.BarChart),
  { ssr: false },
);

export const TokenCostChart = () => (
  <>
    <BarChart
      data={tokenCostData}
      secondaryLabel="USD per query"
      yDomain={[0, 0.25]}
    />
    <ChartSources sources={sources} />
  </>
);