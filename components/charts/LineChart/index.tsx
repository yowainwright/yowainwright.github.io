'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import type { LineChartProps } from '../types';
import { CHART_COLORS, CHART_STYLES } from '../constants';

export const LineChart = ({
  data,
  primaryLabel = '',
  secondaryLabel = '',
  height = '400px'
}: LineChartProps) => {
  const colors = Object.values(CHART_COLORS.light);

  const chartData = data[0]?.data || [];
  const series = data.map((s) => s.label);

  const formattedData = chartData.map((item, idx) => {
    const dataPoint: any = { primary: item.primary };
    data.forEach((series, seriesIdx) => {
      dataPoint[series.label] = series.data[idx]?.secondary;
    });
    return dataPoint;
  });

  return (
    <div style={{ width: '100%', height, padding: '20px 0' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={formattedData} margin={CHART_STYLES.margin}>
          <CartesianGrid strokeDasharray={CHART_STYLES.grid.strokeDasharray} />
          <XAxis dataKey="primary">
            {primaryLabel && <Label value={primaryLabel} offset={-10} position="insideBottom" />}
          </XAxis>
          <YAxis>
            {secondaryLabel && <Label value={secondaryLabel} angle={-90} position="insideLeft" />}
          </YAxis>
          <Tooltip />
          <Legend />
          {series.map((seriesLabel, index) => (
            <Line
              key={seriesLabel}
              type="monotone"
              dataKey={seriesLabel}
              stroke={colors[index % colors.length]}
              strokeWidth={CHART_STYLES.line.strokeWidth}
              dot={{ r: CHART_STYLES.line.dotRadius }}
              label={{
                position: 'top',
                fontSize: CHART_STYLES.label.fontSize,
                fontWeight: CHART_STYLES.label.fontWeight,
              }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
