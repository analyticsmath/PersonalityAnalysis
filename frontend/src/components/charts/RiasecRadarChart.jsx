import React, { useId, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import ChartSummary from '../a11y/ChartSummary';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import tokens, { chartTokens } from '../../theme/tokens';

const ORDER = [
  { key: 'realistic', label: 'R' },
  { key: 'investigative', label: 'I' },
  { key: 'artistic', label: 'A' },
  { key: 'social', label: 'S' },
  { key: 'enterprising', label: 'E' },
  { key: 'conventional', label: 'C' },
];

const RiasecRadarChart = ({ riasec = {}, scoreMeta = null, height = 300 }) => {
  const summaryId = useId();
  const prefersReducedMotion = useReducedMotion();
  const dims = riasec?.dimensions && typeof riasec.dimensions === 'object' ? riasec.dimensions : {};
  const data = useMemo(
    () =>
      ORDER.map(({ key, label }) => ({
        trait: label,
        score: Math.max(0, Math.min(100, Math.round(Number(dims[key]?.score ?? 0)))),
      })),
    [dims]
  );

  const summaryLines = useMemo(
    () => data.map((row) => `${row.trait} interest near ${row.score} percent`),
    [data]
  );

  const hasModel = riasec && typeof riasec === 'object' && Object.keys(dims).length > 0;
  const scored = ORDER.filter(({ key }) => (dims[key]?.evidenceCount || 0) > 0).length;
  const blocked =
    scoreMeta &&
    (['mock', 'unknown'].includes(String(scoreMeta.scoreSource || '')) ||
      ['insufficient_data', 'invalid'].includes(String(scoreMeta.scoreValidity || '')));

  if (!hasModel || blocked || scored < 2) {
    return (
      <div className="chart-shell" aria-label="RIASEC chart unavailable">
        RIASEC interest profile needs more targeted responses before it can be shown.
      </div>
    );
  }

  const code = String(riasec.hollandCode || '---');
  const preliminary = Boolean(riasec.hollandCodePreliminary);

  return (
    <div className="chart-shell" aria-label="RIASEC radar chart" aria-describedby={summaryId}>
      <ChartSummary id={summaryId} title="RIASEC interest summary" lines={summaryLines} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontWeight: 700 }}>Holland code: {code}</span>
        {preliminary ? (
          <span className="ui-message ui-message--neutral" style={{ fontSize: 12 }}>
            Preliminary
          </span>
        ) : null}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke={chartTokens.grid} />
          <PolarAngleAxis dataKey="trait" tick={{ fill: chartTokens.axis, fontSize: 12, fontWeight: 700 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={6} tick={{ fill: chartTokens.mutedAxis, fontSize: 10 }} />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Interest']}
            contentStyle={{
              borderRadius: 12,
              border: chartTokens.tooltip.border,
              background: chartTokens.tooltip.background,
              color: chartTokens.tooltip.text,
            }}
          />
          <Radar
            name="RIASEC"
            dataKey="score"
            fill={tokens.accent.cyan}
            fillOpacity={0.35}
            stroke={tokens.accent.blueGlow}
            strokeWidth={2}
            dot={{ r: 3 }}
            isAnimationActive={!prefersReducedMotion}
            animationDuration={prefersReducedMotion ? 0 : 900}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(RiasecRadarChart);
