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
import { GitCommitHorizontal } from 'lucide-react';
import type { LineChartProps } from '../types';
import { CHART_COLORS, CHART_STYLES } from '../constants';
import { LabelPosition } from 'recharts/types/component/Label';

export const LineChart = ({
  data,
  primaryLabel = '',
  secondaryLabel = '',
  height = '400px',
  yDomain
}: LineChartProps) => {
  const colors = Object.values(CHART_COLORS.light);

  const allPrimaryKeys = [...new Set(data.flatMap(s => s.data.map(d => d.primary)))].sort();
  const series = data.map((s) => s.label);

  const formattedData = allPrimaryKeys.map((primary) => {
    const dataPoint: any = { primary };
    data.forEach((s) => {
      const match = s.data.find(d => d.primary === primary);
      dataPoint[s.label] = match?.secondary;
    });
    return dataPoint;
  });

  const legendContent = ({ payload }: any) => {
    return (
      <ul>
        {
          payload.map((entry: any, index: number) => {
            return <li
              key={`item-${index}`}
              style={{
                fontSize: CHART_STYLES.legend.content.fontSize,
                listStyleType: 'none',
              }}><GitCommitHorizontal size={12} style={{ color: entry.color, paddingRight: '2px' }} />{entry.value}</li>
          })
        }
      </ul>
    );
  }

  return (
    <div style={{ width: '100%', height, padding: '20px 0' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={formattedData} margin={CHART_STYLES.margin}>
          <CartesianGrid strokeDasharray={CHART_STYLES.grid.strokeDasharray} />
          <XAxis dataKey="primary" fontSize={CHART_STYLES.axis.fontSize}>
            {primaryLabel && <Label value={primaryLabel} offset={-10} position="insideBottom" fontSize={CHART_STYLES.axis.fontSize} />}
          </XAxis>
          <YAxis fontSize={CHART_STYLES.axis.fontSize} domain={yDomain}>
            {secondaryLabel && <Label value={secondaryLabel} angle={-90} position="insideLeft" fontSize={CHART_STYLES.axis.fontSize} />}
          </YAxis>
          <Tooltip
            contentStyle={CHART_STYLES.tooltip.content}
            itemStyle={CHART_STYLES.tooltip.item}
            labelStyle={CHART_STYLES.tooltip.label}
          />
          <Legend verticalAlign='bottom' content={legendContent} />
          {series.map((seriesLabel, index) => (
            <Line
              key={seriesLabel}
              type="monotone"
              dataKey={seriesLabel}
              stroke={colors[index % colors.length]}
              strokeWidth={CHART_STYLES.line.strokeWidth}
              dot={{ r: CHART_STYLES.line.dotRadius }}
              label={{
                position: CHART_STYLES.line.position as LabelPosition,
                fontSize: CHART_STYLES.line.fontSize,
              }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
