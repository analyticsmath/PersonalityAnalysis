// frontend/src/components/public/imprint/imprintAnime.js
// Anime.js 4.5.0 local SVG contour and material choreography helpers

import { animate, createScope, createDrawable, morphTo, svg } from 'animejs';

/**
 * Creates an Anime.js scope bound to a React DOM root with automatic cleanup capability.
 */
export function createImprintScope(root) {
  if (!root) return null;
  return createScope({ root });
}

/**
 * Animates drawing of an SVG stroke contour using Anime.js createDrawable / strokeDashoffset.
 */
export function animateSvgContour(target, options = {}) {
  if (!target) return null;
  const { duration = 800, delay = 0, ease = 'outQuad' } = options;

  try {
    const drawable = createDrawable(target);
    return animate(drawable, {
      draw: '0 1',
      duration,
      delay,
      ease,
    });
  } catch {
    // Fallback standard stroke animation
    return animate(target, {
      strokeDashoffset: [200, 0],
      opacity: [0, 1],
      duration,
      delay,
      ease,
    });
  }
}

/**
 * Animates the signature Evidence Lift (material lifts subtly in perceived depth).
 */
export function animateEvidenceLift(target, options = {}) {
  if (!target) return null;
  const { duration = 750, delay = 100, translateY = -12, scale = 1.02 } = options;

  return animate(target, {
    translateY: [0, translateY],
    scale: [1, scale],
    opacity: [0.85, 1],
    duration,
    delay,
    ease: 'outCubic',
  });
}

/**
 * Morphs an SVG path smoothly between two shapes using Anime.js morphTo.
 */
export function animatePathMorph(pathElement, targetPathD, options = {}) {
  if (!pathElement || !targetPathD) return null;
  const { duration = 850, ease = 'inOutQuad' } = options;

  try {
    return animate(pathElement, {
      d: morphTo(targetPathD),
      duration,
      ease,
    });
  } catch {
    return null;
  }
}
