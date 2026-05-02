import React from "react";
import dynamic from "next/dynamic";
import { ChartSources } from "../../../charts";
import { data, sources } from "./constants";

const LineChart = dynamic(
  () => import("../../../charts").then((mod) => mod.LineChart),
  { ssr: false },
);

export const WageStagnationChart = () => (
  <>
    <LineChart data={data} height="400px" />
    <ChartSources sources={sources} />
  </>
);
