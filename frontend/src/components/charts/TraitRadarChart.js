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
import { toTraitArray } from '../../utils/traits';
import tokens, { chartTokens } from '../../theme/tokens';

const TraitRadarChart = ({ traits = {}, compact = false, height = 320, scoreMeta = null }) => {
  const summaryId = useId();
  const prefersReducedMotion = useReducedMotion();
  const data = useMemo(
    () =>
      toTraitArray(traits).map((item) => ({
        trait: item.trait,
        label: item.label,
        score: item.score,
      })),
    [traits]
  );

  const summaryLines = useMemo(
    () =>
      data.map((row) => `${row.label} at about ${Math.round(row.score)} percent`),
    [data]
  );

  const isBlocked =
    scoreMeta &&
    (['mock', 'unknown'].includes(scoreMeta.scoreSource) ||
      ['insufficient_data', 'invalid'].includes(scoreMeta.scoreValidity));
  if (isBlocked) {
    const message = ['insufficient_data', 'invalid'].includes(scoreMeta.scoreValidity)
      ? 'Not enough valid assessment data to generate a reliable personality graph.'
      : 'Personality graph is unavailable because final scoring has not been completed.';
    return <div className="chart-shell" aria-label="Trait radar chart unavailable">{message}</div>;
  }

  const confPct =
    scoreMeta && Number.isFinite(Number(scoreMeta.confidence)) ? Math.round(Number(scoreMeta.confidence) * 100) : null;
  const validity = scoreMeta ? String(scoreMeta.scoreValidity || '') : '';
  const legacy = scoreMeta && String(scoreMeta.scoreSource || '') === 'legacy_unverified';

  return (
    <div className="chart-shell" aria-label="Trait radar chart" aria-describedby={summaryId}>
      <ChartSummary id={summaryId} title="Big Five radar summary" lines={summaryLines} />
      {(confPct != null || validity || legacy) && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8, fontSize: 12 }}>
          {confPct != null ? (
            <span className="ui-message ui-message--neutral" data-testid="trait-radar-confidence">
              Confidence {confPct}%
            </span>
          ) : null}
          {validity ? (
            <span className="ui-message ui-message--neutral" data-testid="trait-radar-validity">
              {validity}
            </span>
          ) : null}
          {legacy ? (
            <span className="ui-message ui-message--neutral" data-testid="trait-radar-legacy">
              Legacy unverified scoring
            </span>
          ) : null}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={data} outerRadius={compact ? '64%' : '74%'}>
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={tokens.chart.trait1} stopOpacity={0.42} />
              <stop offset="55%" stopColor={tokens.chart.trait2} stopOpacity={0.28} />
              <stop offset="100%" stopColor={tokens.chart.trait3} stopOpacity={0.36} />
            </linearGradient>
          </defs>
          <PolarGrid stroke={chartTokens.grid} />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fill: chartTokens.axis, fontSize: compact ? 11 : 12, fontWeight: 700 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tickCount={6}
            tick={{ fill: chartTokens.mutedAxis, fontSize: compact ? 10 : 11 }}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Score']}
            contentStyle={{
              borderRadius: 12,
              border: chartTokens.tooltip.border,
              background: chartTokens.tooltip.background,
              color: chartTokens.tooltip.text,
            }}
            labelStyle={{ color: chartTokens.tooltip.text, fontWeight: 700 }}
          />
          <Radar
            name="Trait score"
            dataKey="score"
            fill="url(#radarFill)"
            stroke={tokens.accent.blueGlow}
            strokeWidth={2.4}
            dot={{
              r: compact ? 2.8 : 3.6,
              strokeWidth: 1.4,
              stroke: tokens.text.secondary,
              fill: tokens.accent.blue,
            }}
            isAnimationActive={!prefersReducedMotion}
            animationDuration={prefersReducedMotion ? 0 : 1200}
            animationEasing="ease-out"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(TraitRadarChart);
