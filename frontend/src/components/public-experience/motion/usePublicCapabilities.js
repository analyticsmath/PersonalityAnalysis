import { useState, useEffect } from 'react';

/**
 * Hook to inspect runtime capabilities for public experience scenes
 */
export function usePublicCapabilities() {
  const [capabilities, setCapabilities] = useState({
    hasFinePointer: false,
    hasWebGL: true,
    prefersReducedMotion: false,
    devicePixelRatio: 1,
    tier: 2, // 0: low/fallback, 1: mobile, 2: standard desktop, 3: high performance
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let webglSupported = false;
    try {
      const canvas = document.createElement('canvas');
      webglSupported = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      webglSupported = false;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.innerWidth < 768;

    let tier = 2;
    if (reducedMotionQuery.matches || !webglSupported) {
      tier = 0;
    } else if (isMobile) {
      tier = 1;
    } else if (dpr >= 1.5 && finePointerQuery.matches) {
      tier = 3;
    }

    setCapabilities({
      hasFinePointer: finePointerQuery.matches,
      hasWebGL: webglSupported,
      prefersReducedMotion: reducedMotionQuery.matches,
      devicePixelRatio: dpr,
      tier,
    });
  }, []);

  return capabilities;
}

export default usePublicCapabilities;
