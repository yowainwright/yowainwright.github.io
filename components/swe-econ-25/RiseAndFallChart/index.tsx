import React from "react";
import dynamic from "next/dynamic";
import { ChartSources } from "../../charts";
import { comparisonData, sources } from "./constants";

const LineChart = dynamic(
  () => import("../../charts").then((mod) => mod.LineChart),
  { ssr: false },
);

export const RiseAndFallChart = () => (
  <>
    <LineChart
      data={comparisonData}
      secondaryLabel="% of Peak"
      yDomain={[80, 105]}
    />
    <ChartSources sources={sources} />
  </>
);
