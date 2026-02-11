import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ChartSources } from "../../charts";

const BarChart = dynamic(
  () => import("../../charts").then((mod) => mod.BarChart),
  { ssr: false },
);

interface ProjectCostData {
  totalProjectCosts: Array<{
    label: string;
    data: Array<{ primary: string; secondary: number }>;
  }>;
  sources: Array<{ link: string; author: string; publication: string }>;
}

export const ProjectCostComparisonChart = () => {
  const [data, setData] = useState<ProjectCostData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/agent-cost-data.json');
        const agentData = await response.json();
        setData(agentData);
      } catch (error) {
        console.error('Failed to load project cost data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading project cost comparison...</div>;
  }

  return (
    <>
      <BarChart
        data={data.totalProjectCosts}
        secondaryLabel="Total USD cost"
        yDomain={[0, 3.5]}
      />
      <ChartSources sources={data.sources} />
    </>
  );
};