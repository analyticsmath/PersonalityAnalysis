/**
 * Personality Assessor - How Scene Model
 * Pure mathematical functions for How It Works causal transformation stages.
 */

export const HOW_PHASES = [
  { id: 'source', name: 'Source capture', range: [0.00, 0.16] },
  { id: 'isolate', name: 'Clause isolation', range: [0.12, 0.34] },
  { id: 'branch', name: 'Multi-axis branching', range: [0.28, 0.56] },
  { id: 'weight', name: 'Deterministic weighting', range: [0.50, 0.78] },
  { id: 'recompose', name: 'Synthesized record', range: [0.72, 1.00] },
];

export function phaseFromProgress(p) {
  if (p < 0.20) return 0;
  if (p < 0.42) return 1;
  if (p < 0.62) return 2;
  if (p < 0.82) return 3;
  return 4;
}

export default { HOW_PHASES, phaseFromProgress };
