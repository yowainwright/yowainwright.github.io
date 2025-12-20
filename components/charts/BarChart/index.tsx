'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  Cell,
} from 'recharts';
import type { BarChartProps } from '../types';
import { CHART_COLORS, CHART_STYLES } from '../constants';

export const BarChart = ({
  data,
  primaryLabel = '',
  secondaryLabel = '',
  height = '400px'
}: BarChartProps) => {
  const chartData = data[0]?.data || [];
  const colors = Object.values(CHART_COLORS.light);

  return (
    <div style={{ width: '100%', height, padding: '20px 0' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={chartData} margin={CHART_STYLES.margin}>
          <CartesianGrid strokeDasharray={CHART_STYLES.grid.strokeDasharray} />
          <XAxis dataKey="primary" fontSize={CHART_STYLES.axis.fontSize}>
            {primaryLabel && <Label value={primaryLabel} offset={-10} position="insideBottom" />}
          </XAxis>
          <YAxis fontSize={CHART_STYLES.axis.fontSize}>
            {secondaryLabel && <Label value={secondaryLabel} angle={-90} position="insideLeft" />}
          </YAxis>
          <Tooltip
            contentStyle={CHART_STYLES.tooltip.content}
            itemStyle={CHART_STYLES.tooltip.item}
            labelStyle={CHART_STYLES.tooltip.label}
          />
          <Bar
            dataKey="secondary"
            maxBarSize={CHART_STYLES.bar.maxBarSize}
            label={{
              position: 'top',
              fontSize: CHART_STYLES.label.fontSize,
              fontWeight: CHART_STYLES.label.fontWeight,
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
