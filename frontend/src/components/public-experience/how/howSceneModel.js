/**
 * Personality Assessor - How Scene Model
 * Pure mathematical partition-of-unity model for How It Works causal transformation stages.
 */

import { clamp01, smoothstep01, adjacentWeights } from '../motion/homeSceneModel';

export const HOW_KNOTS = [
  { id: 'source', index: 0, name: 'Source capture', at: 0.00 },
  { id: 'isolate', index: 1, name: 'Clause isolation', at: 0.25 },
  { id: 'branch', index: 2, name: 'Multi-axis branching', at: 0.50 },
  { id: 'weight', index: 3, name: 'Deterministic weighting', at: 0.75 },
  { id: 'recompose', index: 4, name: 'Synthesized record', at: 1.00 },
];

export const HOW_PHASES = HOW_KNOTS.map((k, idx) => ({
  id: k.id,
  name: k.name,
  range: [Math.max(0, k.at - 0.12), Math.min(1, k.at + 0.12)],
}));

export function phaseFromProgress(p) {
  const clamped = clamp01(p);
  if (clamped < 0.20) return 0;
  if (clamped < 0.42) return 1;
  if (clamped < 0.64) return 2;
  if (clamped < 0.84) return 3;
  return 4;
}

export function calculateHowWeights(p) {
  return adjacentWeights(p, HOW_KNOTS);
}

export default { HOW_KNOTS, HOW_PHASES, phaseFromProgress, calculateHowWeights };

