import React from "react";
import dynamic from "next/dynamic";
import { ChartSources } from "../../../charts";
import {
  gradsVsJobsData,
  layoffsVsStockData,
  entryLevelData,
  profitsVsHeadcountData,
  sources,
} from "./constants";

const LineChart = dynamic(
  () => import("../../../charts").then((mod) => mod.LineChart),
  { ssr: false },
);

const BarChart = dynamic(
  () => import("../../../charts").then((mod) => mod.BarChart),
  { ssr: false },
);

export const SWEMetricsGrid = () => (
  <>
    <div className="metrics-grid">
      <div className="metrics-grid__item">
        <div className="metrics-grid__title">CS Grads vs Job Postings</div>
        <LineChart data={gradsVsJobsData} height="200px" />
      </div>
      <div className="metrics-grid__item">
        <div className="metrics-grid__title">Layoffs vs Stock Price</div>
        <LineChart data={layoffsVsStockData} height="200px" />
      </div>
      <div className="metrics-grid__item">
        <div className="metrics-grid__title">Entry-Level Jobs (Index)</div>
        <BarChart data={entryLevelData} height="200px" />
      </div>
      <div className="metrics-grid__item">
        <div className="metrics-grid__title">Profits vs Headcount</div>
        <LineChart data={profitsVsHeadcountData} height="200px" />
      </div>
    </div>
    <ChartSources sources={sources} />
  </>
);
