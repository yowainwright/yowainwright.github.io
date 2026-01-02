import React from 'react';
import dynamic from 'next/dynamic';
import { ChartSources } from '../../charts';
import {
  gradsVsJobsData,
  layoffsVsStockData,
  entryLevelData,
  profitsVsHeadcountData,
  sources
} from './constants';

const LineChart = dynamic(
  () => import('../../charts').then(mod => mod.LineChart),
  { ssr: false }
);

const BarChart = dynamic(
  () => import('../../charts').then(mod => mod.BarChart),
  { ssr: false }
);

const gridStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1.5rem',
  margin: '2rem 0'
};

const chartContainerStyles: React.CSSProperties = {
  border: '1px solid var(--color-border-light)',
  borderRadius: '0.5rem',
  padding: '1rem'
};

const chartTitleStyles: React.CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
  textAlign: 'center'
};

export const SWEMetricsGrid = () => (
  <>
    <div style={gridStyles}>
      <div style={chartContainerStyles}>
        <div style={chartTitleStyles}>CS Grads vs Job Postings</div>
        <LineChart data={gradsVsJobsData} height="200px" />
      </div>
      <div style={chartContainerStyles}>
        <div style={chartTitleStyles}>Layoffs vs Stock Price</div>
        <LineChart data={layoffsVsStockData} height="200px" />
      </div>
      <div style={chartContainerStyles}>
        <div style={chartTitleStyles}>Entry-Level Jobs (Index)</div>
        <BarChart data={entryLevelData} height="200px" />
      </div>
      <div style={chartContainerStyles}>
        <div style={chartTitleStyles}>Profits vs Headcount</div>
        <LineChart data={profitsVsHeadcountData} height="200px" />
      </div>
    </div>
    <ChartSources sources={sources} />
  </>
);
