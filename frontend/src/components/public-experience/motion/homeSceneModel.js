/**
 * Personality Assessor - Home Scene Model
 * Pure mathematical functions for deterministic scroll interpolation, scene weight curves,
 * and strict visibility budget assertions.
 */

export const HOME_RANGES = {
  world: { start: 0.000, peakIn: 0.000, peakOut: 0.055, end: 0.120 },
  observe: { start: 0.045, peakIn: 0.090, peakOut: 0.160, end: 0.220 },
  source: { start: 0.150, peakIn: 0.200, peakOut: 0.280, end: 0.350 },
  branch: { start: 0.250, peakIn: 0.300, peakOut: 0.380, end: 0.440 },
  workworld: {
    precision: { start: 0.380, peakIn: 0.420, peakOut: 0.490, end: 0.570 },
    autonomy: { start: 0.480, peakIn: 0.530, peakOut: 0.590, end: 0.660 },
    collaboration: { start: 0.580, peakIn: 0.630, peakOut: 0.680, end: 0.740 },
    pressure: { start: 0.660, peakIn: 0.700, peakOut: 0.730, end: 0.780 },
  },
  calibration: { start: 0.680, peakIn: 0.730, peakOut: 0.780, end: 0.840 },
  time: { start: 0.760, peakIn: 0.800, peakOut: 0.850, end: 0.900 },
  provenance: { start: 0.830, peakIn: 0.870, peakOut: 0.930, end: 0.965 },
  finale: { start: 0.910, peakIn: 0.950, peakOut: 1.000, end: 1.000 },
};

export function clamp01(val) {
  return Math.max(0, Math.min(1, val));
}

export function lerp(a, b, t) {
  return a + (b - a) * clamp01(t);
}

export function easeInOutCubic(t) {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function easeOutCubic(t) {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

export function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function localProgress(p, start, end) {
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}

export function sceneWeight(p, start, peakIn, peakOut, end) {
  if (p <= start || p >= end) return 0;
  if (p < peakIn) {
    return easeInOutCubic((p - start) / Math.max(0.0001, peakIn - start));
  }
  if (p <= peakOut) {
    return 1;
  }
  return 1 - easeInOutCubic((p - peakOut) / Math.max(0.0001, end - peakOut));
}

export function mixRect(r1, r2, t) {
  const f = easeInOutCubic(t);
  return {
    x: lerp(r1.x, r2.x, f),
    y: lerp(r1.y, r2.y, f),
    width: lerp(r1.width, r2.width, f),
    height: lerp(r1.height, r2.height, f),
  };
}

/**
 * Calculates master state weights and verifies visibility budget
 * @param {number} p - Normalized master progress 0 -> 1
 * @returns {Object} Full scene frame calculation
 */
export function calculateHomeFrame(p, viewport = { width: 1440, height: 900 }) {
  const weights = {
    world: sceneWeight(p, HOME_RANGES.world.start, HOME_RANGES.world.peakIn, HOME_RANGES.world.peakOut, HOME_RANGES.world.end),
    observe: sceneWeight(p, HOME_RANGES.observe.start, HOME_RANGES.observe.peakIn, HOME_RANGES.observe.peakOut, HOME_RANGES.observe.end),
    source: sceneWeight(p, HOME_RANGES.source.start, HOME_RANGES.source.peakIn, HOME_RANGES.source.peakOut, HOME_RANGES.source.end),
    branch: sceneWeight(p, HOME_RANGES.branch.start, HOME_RANGES.branch.peakIn, HOME_RANGES.branch.peakOut, HOME_RANGES.branch.end),
    workworld: {
      precision: sceneWeight(p, HOME_RANGES.workworld.precision.start, HOME_RANGES.workworld.precision.peakIn, HOME_RANGES.workworld.precision.peakOut, HOME_RANGES.workworld.precision.end),
      autonomy: sceneWeight(p, HOME_RANGES.workworld.autonomy.start, HOME_RANGES.workworld.autonomy.peakIn, HOME_RANGES.workworld.autonomy.peakOut, HOME_RANGES.workworld.autonomy.end),
      collaboration: sceneWeight(p, HOME_RANGES.workworld.collaboration.start, HOME_RANGES.workworld.collaboration.peakIn, HOME_RANGES.workworld.collaboration.peakOut, HOME_RANGES.workworld.collaboration.end),
      pressure: sceneWeight(p, HOME_RANGES.workworld.pressure.start, HOME_RANGES.workworld.pressure.peakIn, HOME_RANGES.workworld.pressure.peakOut, HOME_RANGES.workworld.pressure.end),
    },
    calibration: sceneWeight(p, HOME_RANGES.calibration.start, HOME_RANGES.calibration.peakIn, HOME_RANGES.calibration.peakOut, HOME_RANGES.calibration.end),
    time: sceneWeight(p, HOME_RANGES.time.start, HOME_RANGES.time.peakIn, HOME_RANGES.time.peakOut, HOME_RANGES.time.end),
    provenance: sceneWeight(p, HOME_RANGES.provenance.start, HOME_RANGES.provenance.peakIn, HOME_RANGES.provenance.peakOut, HOME_RANGES.provenance.end),
    finale: sceneWeight(p, HOME_RANGES.finale.start, HOME_RANGES.finale.peakIn, HOME_RANGES.finale.peakOut, HOME_RANGES.finale.end),
  };

  const workworldTotal = Math.max(
    weights.workworld.precision,
    weights.workworld.autonomy,
    weights.workworld.collaboration,
    weights.workworld.pressure
  );

  // Group major owners
  const majorOwnerEntries = [
    { name: 'world', weight: weights.world },
    { name: 'observe', weight: weights.observe },
    { name: 'source', weight: weights.source },
    { name: 'branch', weight: weights.branch },
    { name: 'workworld', weight: workworldTotal },
    { name: 'calibration', weight: weights.calibration },
    { name: 'time', weight: weights.time },
    { name: 'provenance', weight: weights.provenance },
    { name: 'finale', weight: weights.finale },
  ];

  const activeMajorOwners = majorOwnerEntries.filter((entry) => entry.weight > 0.15);
  const dominantOwner = majorOwnerEntries.reduce((prev, curr) => (curr.weight > prev.weight ? curr : prev), majorOwnerEntries[0]);

  // Expose to window.__PX_DEBUG__.home in dev
  if (typeof window !== 'undefined' && window.__PX_DEBUG__) {
    window.__PX_DEBUG__.home = {
      progress: p,
      sceneWeights: weights,
      majorOwners: activeMajorOwners.map((o) => o.name),
      majorOwnerCount: activeMajorOwners.length,
      dominantOwner: dominantOwner.name,
      dominantWeight: dominantOwner.weight,
    };
  }

  return {
    progress: p,
    weights,
    majorOwners: activeMajorOwners.map((o) => o.name),
    dominantOwner: dominantOwner.name,
  };
}

export default { HOME_RANGES, calculateHomeFrame, sceneWeight, localProgress, mixRect, clamp01, lerp };
