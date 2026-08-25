/**
 * Personality Assessor - Home Cinematic Experience
 * Single continuous cinematic journey: THE RESPONSE TRAVELS THROUGH WORLDS.
 * Authoritative CSS sticky viewport stage with deterministic per-frame rendering.
 * Zero React state updates on scroll frames.
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress, scrollBus } from '../motion/scrollState';
import { HomeSceneRenderer } from './HomeSceneRenderer';
import { HomeTypographyLayer } from './HomeTypographyLayer';
import { HomeEvidenceLayer } from './HomeEvidenceLayer';
import { HomeCalibrationField } from './HomeCalibrationField';
import { HomeProvenance } from './HomeProvenance';
import { HomeFinale } from './HomeFinale';

gsap.registerPlugin(ScrollTrigger);

export const HomeCinematicExperience = () => {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const rendererRef = useRef(null);

  const { prefersReducedMotion, isMobile, isTouch } = usePublicCapabilities();
  const data = PUBLIC_CONTENT.home;

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !viewportRef.current) return;

    // Instantiate deterministic scene renderer
    const renderer = new HomeSceneRenderer(viewportRef.current);
    rendererRef.current = renderer;

    // Compute progress directly from container geometry and actual scrollY
    const computeProgress = () => {
      if (!containerRef.current) return 0;
      const start = containerRef.current.offsetTop;
      const travel = containerRef.current.offsetHeight - window.innerHeight;
      if (travel <= 0) return 0;
      return Math.max(0, Math.min(1, (window.scrollY - start) / travel));
    };

    // Render initial frame at exact current scroll
    const initialP = computeProgress();
    renderer.renderFrame(initialP);
    registerSceneProgress('home-master-journey', initialP, true);

    // Authoritative ScrollTrigger for Home journey
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        registerSceneProgress('home-master-journey', p, true);
        renderer.renderFrame(p);
      },
    });

    // Central ScrollBus subscription ensures keyboard (ArrowDown, PageDown) immediately renders
    const unsubscribeBus = scrollBus.subscribe(() => {
      const p = computeProgress();
      registerSceneProgress('home-master-journey', p, true);
      renderer.renderFrame(p);
    });

    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.cachedTargetRect = null;
        rendererRef.current.renderFrame(computeProgress());
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      unsubscribeBus();
      window.removeEventListener('resize', handleResize);
      st.kill();
      rendererRef.current = null;
    };
  }, [prefersReducedMotion]);

  // Tuned track height: desktop 540svh, mobile 380svh, reduced motion auto
  const trackHeight = prefersReducedMotion ? 'auto' : (isMobile || isTouch ? '380svh' : '540svh');

  return (
    <div
      ref={containerRef}
      className="pa-px-home-continuous-root"
      data-scene-id="home-master-journey"
      style={{
        position: 'relative',
        width: '100%',
        height: trackHeight,
        backgroundColor: 'var(--px-ink, #121416)',
        color: 'var(--px-white, #F7F8F8)',
      }}
    >
      {/* Sticky Cinematic Viewport Stage */}
      <div
        ref={viewportRef}
        className="pa-px-home-sticky-stage"
        style={{
          position: prefersReducedMotion ? 'relative' : 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: prefersReducedMotion ? 'auto' : '100svh',
          overflow: 'hidden',
        }}
      >
        {/* ── 1. Semantic Typography & Trajectory Layer ── */}
        <HomeTypographyLayer data={data} containerRef={viewportRef} />

        {/* ── 2. Evidence Plates & Workworld Environments Layer ── */}
        <HomeEvidenceLayer />

        {/* ── 3. Calibration Spatial Mass Field ── */}
        <HomeCalibrationField />

        {/* ── 4. Temporal Double Exposure & Provenance Inspection ── */}
        <HomeProvenance />

        {/* ── 5. Finale Synthesis Stage ── */}
        <HomeFinale />
      </div>
    </div>
  );
};

export default HomeCinematicExperience;

