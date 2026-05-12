/**
 * Motion helpers — always pair with prefers-reduced-motion in components.
 */

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function getPrefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Short entrance durations (seconds) */
export const motionDurations = {
  fast: 0.22,
  standard: 0.36,
  chart: 0.45,
};

export function gsapScrollRevealDefaults(reduced) {
  if (reduced) {
    return { autoAlpha: 1, y: 0, duration: 0, delay: 0 };
  }
  return {
    from: { autoAlpha: 0, y: 26 },
    to: { autoAlpha: 1, y: 0, duration: 0.56, ease: 'power3.out' },
    staggerCap: 0.2,
    staggerStep: 0.04,
  };
}
