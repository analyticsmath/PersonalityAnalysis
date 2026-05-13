import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import tokens, { chartTokens } from '../../theme/tokens';

const toData = (metrics = {}, labels = {}) =>
  Object.entries(labels)
    .map(([key, label]) => ({
      key,
      label,
      value: Math.max(0, Math.min(100, Math.round(Number(metrics?.[key] || 0)))),
    }))
    .filter((item) => item.value > 0 || Object.keys(metrics || {}).includes(item.key));

let gradientCounter = 0;

const MetricBarChart = ({ metrics = {}, labels = {}, barColor = tokens.accent.cyan, height = 300 }) => {
  const data = useMemo(() => toData(metrics, labels), [metrics, labels]);
  const gradientId = useMemo(() => `metricBarGrad-${(gradientCounter += 1)}`, []);

  if (!data.length) {
    return <p className="empty-state">Chart data will appear after assessment scoring completes.</p>;
  }

  return (
    <div className="chart-shell" aria-label="Metric bar chart">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={barColor} stopOpacity={0.92} />
              <stop offset="100%" stopColor={barColor} stopOpacity={0.42} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={chartTokens.grid} vertical={false} />
          <XAxis dataKey="label" tick={{ fill: chartTokens.axis, fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: chartTokens.mutedAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Score']}
            contentStyle={{
              borderRadius: 12,
              border: chartTokens.tooltip.border,
              background: chartTokens.tooltip.background,
              color: chartTokens.tooltip.text,
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}
            labelStyle={{ color: chartTokens.tooltip.text, fontWeight: 700, marginBottom: 4 }}
            cursor={<Rectangle radius={6} fill={barColor} fillOpacity={0.06} stroke={barColor} strokeOpacity={0.15} strokeWidth={1} />}
          />
          <Bar
            dataKey="value"
            fill={`url(#${gradientId})`}
            radius={[8, 8, 0, 0]}
            isAnimationActive
            animationDuration={960}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(MetricBarChart);
