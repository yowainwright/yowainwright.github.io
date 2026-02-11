import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ChartSources } from "../../charts";

const BarChart = dynamic(
  () => import("../../charts").then((mod) => mod.BarChart),
  { ssr: false },
);

interface AgentCostData {
  agentTaskCosts: Array<{
    label: string;
    data: Array<{ primary: string; secondary: number }>;
  }>;
  sources: Array<{ link: string; author: string; publication: string }>;
}

export const AgentTaskCostChart = () => {
  const [data, setData] = useState<AgentCostData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/agent-cost-data.json');
        const agentData = await response.json();
        setData(agentData);
      } catch (error) {
        console.error('Failed to load agent cost data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading agent task costs...</div>;
  }

  return (
    <>
      <BarChart
        data={data.agentTaskCosts}
        secondaryLabel="USD per task"
        yDomain={[0, 1.0]}
      />
      <ChartSources sources={data.sources} />
    </>
  );
};