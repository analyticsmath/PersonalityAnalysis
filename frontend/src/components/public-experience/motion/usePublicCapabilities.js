import { useState, useEffect } from 'react';

/**
 * Three-state WebGL capability detection: 'unknown' | 'supported' | 'unsupported'
 * Initial state is 'unknown' to ensure DOM baseline renders first without speculative canvas mounting.
 */
let cachedWebglStatus = 'unknown';

function detectWebGLSupport() {
  if (typeof window === 'undefined') return 'unsupported';
  if (cachedWebglStatus !== 'unknown') return cachedWebglStatus;

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('experimental-webgl', { failIfMajorPerformanceCaveat: false });

    if (gl) {
      cachedWebglStatus = 'supported';
      const loseContextExt = gl.getExtension('WEBGL_lose_context');
      if (loseContextExt) {
        loseContextExt.loseContext();
      }
    } else {
      cachedWebglStatus = 'unsupported';
    }
  } catch {
    cachedWebglStatus = 'unsupported';
  }

  return cachedWebglStatus;
}

/**
 * Hook to inspect runtime capabilities for public experience scenes
 */
export function usePublicCapabilities() {
  const [capabilities, setCapabilities] = useState({
    hasFinePointer: true,
    isTouch: false,
    isMobile: false,
    webgl: cachedWebglStatus, // 'unknown' | 'supported' | 'unsupported'
    hasWebGL: cachedWebglStatus === 'supported',
    prefersReducedMotion: false,
    devicePixelRatio: 1,
    tier: 2, // 0: fallback, 1: mobile, 2: standard desktop, 3: high performance
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isTouchDevice = !finePointerQuery.matches || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isMobileViewport = window.innerWidth <= 768;

    const webglStatus = detectWebGLSupport();
    const hasWebgl = webglStatus === 'supported';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let tier = 2;
    if (reducedMotionQuery.matches || !hasWebgl) {
      tier = 0;
    } else if (isMobileViewport || isTouchDevice) {
      tier = 1;
    } else if (dpr >= 1.5 && finePointerQuery.matches) {
      tier = 3;
    }

    setCapabilities({
      hasFinePointer: finePointerQuery.matches,
      isTouch: isTouchDevice,
      isMobile: isMobileViewport,
      webgl: webglStatus,
      hasWebGL: hasWebgl,
      prefersReducedMotion: reducedMotionQuery.matches,
      devicePixelRatio: dpr,
      tier,
    });
  }, []);

  return capabilities;
}

export default usePublicCapabilities;

