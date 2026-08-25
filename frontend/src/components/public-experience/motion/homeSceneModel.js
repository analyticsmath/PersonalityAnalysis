/**
 * Personality Assessor - Home Scene Model
 * Strict mathematical partition-of-unity model for deterministic scroll interpolation.
 * Guarantees sum(weights) = 1.0, dominant weight >= 0.5, and zero mathematical blackouts.
 */

export const HOME_KNOTS = [
  { id: 'world', at: 0.00 },
  { id: 'observe', at: 0.11 },
  { id: 'source', at: 0.22 },
  { id: 'branch', at: 0.34 },
  { id: 'workworld', at: 0.48 },
  { id: 'calibration', at: 0.72 },
  { id: 'time', at: 0.81 },
  { id: 'provenance', at: 0.90 },
  { id: 'finale', at: 1.00 },
];

export const WORKWORLD_KNOTS = [
  { id: 'precision', at: 0.00 },
  { id: 'autonomy', at: 0.33 },
  { id: 'collaboration', at: 0.66 },
  { id: 'pressure', at: 1.00 },
];

export function clamp01(val) {
  return Math.max(0, Math.min(1, val));
}

export function lerp(a, b, t) {
  return a + (b - a) * clamp01(t);
}

export function smoothstep01(t) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export function easeInOutCubic(t) {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function easeOutCubic(t) {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

export function localProgress(p, start, end) {
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / Math.max(0.0001, end - start);
}

/**
 * Strict Partition-of-Unity macro weight calculator
 * At any progress p: sum(weights) = 1.0, only adjacent macro scenes coexist, max weight >= 0.5.
 */
export function adjacentWeights(p, knots = HOME_KNOTS) {
  const clampedP = clamp01(p);
  const result = {};
  knots.forEach((k) => {
    result[k.id] = 0;
  });

  if (clampedP <= knots[0].at) {
    result[knots[0].id] = 1.0;
    return result;
  }

  if (clampedP >= knots[knots.length - 1].at) {
    result[knots[knots.length - 1].id] = 1.0;
    return result;
  }

  for (let i = 0; i < knots.length - 1; i++) {
    const a = knots[i];
    const b = knots[i + 1];
    if (clampedP >= a.at && clampedP <= b.at) {
      const raw = (clampedP - a.at) / Math.max(0.00001, b.at - a.at);
      const t = smoothstep01(raw);
      result[a.id] = 1 - t;
      result[b.id] = t;
      return result;
    }
  }

  result[knots[0].id] = 1.0;
  return result;
}

/**
 * Calculates master state weights and verifies visibility budget
 * @param {number} p - Normalized master progress 0 -> 1
 * @returns {Object} Full scene frame calculation
 */
export function calculateHomeFrame(p, viewport = { width: 1440, height: 900 }) {
  const macroWeights = adjacentWeights(p, HOME_KNOTS);

  // Workworld local partition
  const workworldMacroProgress = localProgress(p, 0.34, 0.72);
  const wwLocalWeights = adjacentWeights(workworldMacroProgress, WORKWORLD_KNOTS);

  const weights = {
    world: macroWeights.world,
    observe: macroWeights.observe,
    source: macroWeights.source,
    branch: macroWeights.branch,
    workworld: {
      macro: macroWeights.workworld,
      precision: macroWeights.workworld * wwLocalWeights.precision,
      autonomy: macroWeights.workworld * wwLocalWeights.autonomy,
      collaboration: macroWeights.workworld * wwLocalWeights.collaboration,
      pressure: macroWeights.workworld * wwLocalWeights.pressure,
      local: wwLocalWeights,
    },
    calibration: macroWeights.calibration,
    time: macroWeights.time,
    provenance: macroWeights.provenance,
    finale: macroWeights.finale,
  };

  // Group major macro owners
  const majorOwnerEntries = [
    { name: 'world', weight: weights.world },
    { name: 'observe', weight: weights.observe },
    { name: 'source', weight: weights.source },
    { name: 'branch', weight: weights.branch },
    { name: 'workworld', weight: weights.workworld.macro },
    { name: 'calibration', weight: weights.calibration },
    { name: 'time', weight: weights.time },
    { name: 'provenance', weight: weights.provenance },
    { name: 'finale', weight: weights.finale },
  ];

  const activeMajorOwners = majorOwnerEntries.filter((entry) => entry.weight > 0.05);
  const dominantOwner = majorOwnerEntries.reduce((prev, curr) => (curr.weight > prev.weight ? curr : prev), majorOwnerEntries[0]);

  // Expose to window.__PX_DEBUG__.home without fake fallbacks
  if (typeof window !== 'undefined') {
    window.__PX_DEBUG__ = window.__PX_DEBUG__ || {};
    window.__PX_DEBUG__.home = {
      progress: p,
      sceneWeights: weights,
      majorOwners: activeMajorOwners.map((o) => o.name),
      majorOwnerCount: activeMajorOwners.length,
      dominantOwner: dominantOwner.name,
      dominantScene: dominantOwner.name,
      dominantWeight: dominantOwner.weight,
      viewport,
    };
  }


  return {
    progress: p,
    weights,
    majorOwners: activeMajorOwners.map((o) => o.name),
    majorOwnerCount: activeMajorOwners.length,
    dominantOwner: dominantOwner.name,
    dominantWeight: dominantOwner.weight,
  };
}

export default {
  HOME_KNOTS,
  WORKWORLD_KNOTS,
  adjacentWeights,
  calculateHomeFrame,
  localProgress,
  clamp01,
  lerp,
  smoothstep01,
  easeInOutCubic,
  easeOutCubic,
};

