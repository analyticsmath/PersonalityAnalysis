/**
 * Personality Assessor - Trust Provenance Experience
 * Title: SHOW ME WHERE THAT CAME FROM.
 * Continuous transforming record: Supplied -> Inferred -> Calculated -> Compared -> Controlled.
 * Direct DOM/SVG manipulation via progressRef - ZERO per-frame React rerenders.
 */

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress, scrollBus } from '../motion/scrollState';
import { clamp01, adjacentWeights, easeInOutCubic, easeOutCubic } from '../motion/homeSceneModel';

gsap.registerPlugin(ScrollTrigger);

const TRUST_KNOTS = [
  { id: 'supplied', index: 0, at: 0.00 },
  { id: 'inferred', index: 1, at: 0.25 },
  { id: 'calculated', index: 2, at: 0.50 },
  { id: 'compared', index: 3, at: 0.75 },
  { id: 'controlled', index: 4, at: 1.00 },
];

export const TrustProvenanceExperience = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.trust;
  const steps = data.recordStateSteps;

  const [semanticPhaseIdx, setSemanticPhaseIdx] = useState(0);
  const lastPhaseRef = useRef(0);
  const { prefersReducedMotion, isMobile } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Direct DOM element references for imperative scrubbing
    const svgCircleOrigin = containerRef.current.querySelector('.pa-px-trust-node--origin');
    const svgCircleMid = containerRef.current.querySelector('.pa-px-trust-node--mid');
    const svgCircleEnd = containerRef.current.querySelector('.pa-px-trust-node--end');
    const svgPathBranch1 = containerRef.current.querySelector('.pa-px-trust-path--branch-1');
    const svgPathBranch2 = containerRef.current.querySelector('.pa-px-trust-path--branch-2');
    const svgPathSpine = containerRef.current.querySelector('.pa-px-trust-path--spine');
    const svgCalibrationBox = containerRef.current.querySelector('.pa-px-trust-rect--calibrated');
    const svgDualTraj = containerRef.current.querySelector('.pa-px-trust-path--dual');

    const updateFrame = (p) => {
      const clampedP = clamp01(p);
      registerSceneProgress('trust-inspection-stage', clampedP, true);

      // 1. Semantic phase update ONLY when discrete boundary changes (for assistive text)
      const phaseIdx = Math.min(Math.floor(clampedP * steps.length), steps.length - 1);
      if (phaseIdx !== lastPhaseRef.current) {
        lastPhaseRef.current = phaseIdx;
        setSemanticPhaseIdx(phaseIdx);
      }

      // 2. Direct SVG geometry interpolation
      const weights = adjacentWeights(clampedP, TRUST_KNOTS);

      // Origin circle translation
      if (svgCircleOrigin) {
        const cx = 80 + clampedP * 120;
        const cy = 120 - Math.sin(clampedP * Math.PI) * 20;
        const r = 8 + (weights.supplied || 0) * 4;
        svgCircleOrigin.setAttribute('cx', `${cx}`);
        svgCircleOrigin.setAttribute('cy', `${cy}`);
        svgCircleOrigin.setAttribute('r', `${r}`);
      }

      // Mid-stage model node
      if (svgCircleMid) {
        const midOpacity = Math.max(0, 1 - (weights.supplied || 0) - (weights.controlled || 0));
        svgCircleMid.setAttribute('opacity', `${midOpacity}`);
        svgCircleMid.setAttribute('cx', `${260 + clampedP * 80}`);
        svgCircleMid.setAttribute('cy', `${120 + Math.sin(clampedP * Math.PI * 2) * 15}`);
      }

      // Final controlled node
      if (svgCircleEnd) {
        const endOpacity = (weights.compared || 0) * 0.5 + (weights.controlled || 0);
        svgCircleEnd.setAttribute('opacity', `${endOpacity}`);
        svgCircleEnd.setAttribute('cx', `${460 + easeOutCubic(clampedP) * 40}`);
        svgCircleEnd.setAttribute('cy', `${120}`);
      }

      // Spine path scrub
      if (svgPathSpine) {
        const endX = 80 + clampedP * 420;
        const cpY = 120 + Math.sin(clampedP * Math.PI * 2) * 40;
        svgPathSpine.setAttribute('d', `M 80,120 Q ${160 + clampedP * 150},${cpY} ${endX},120`);
      }

      // Branching evidence paths (Active during Inferred -> Calculated)
      if (svgPathBranch1 && svgPathBranch2) {
        const branchOpacity = (weights.inferred || 0) + (weights.calculated || 0) * 0.8;
        svgPathBranch1.setAttribute('opacity', `${branchOpacity * 0.7}`);
        svgPathBranch2.setAttribute('opacity', `${branchOpacity * 0.7}`);
        if (branchOpacity > 0.01) {
          const spreadY = branchOpacity * 45;
          svgPathBranch1.setAttribute('d', `M ${140 + clampedP * 60},120 C 200,${120 - spreadY} 260,${120 - spreadY} 320,120`);
          svgPathBranch2.setAttribute('d', `M ${140 + clampedP * 60},120 C 200,${120 + spreadY} 260,${120 + spreadY} 320,120`);
        }
      }

      // Calibrated bounding frame (Active during Calculated -> Compared)
      if (svgCalibrationBox) {
        const boxOpacity = (weights.calculated || 0) + (weights.compared || 0) * 0.6;
        svgCalibrationBox.setAttribute('opacity', `${boxOpacity * 0.6}`);
        const boxW = 140 * easeOutCubic(boxOpacity);
        svgCalibrationBox.setAttribute('width', `${boxW}`);
        svgCalibrationBox.setAttribute('x', `${250 - boxW / 2}`);
      }

      // Dual comparative trajectory (Active during Compared -> Controlled)
      if (svgDualTraj) {
        const dualOpacity = (weights.compared || 0) + (weights.controlled || 0);
        svgDualTraj.setAttribute('opacity', `${dualOpacity * 0.8}`);
      }
    };

    const computeProgress = () => {
      if (!containerRef.current) return 0;
      const start = containerRef.current.offsetTop;
      const travel = containerRef.current.offsetHeight - window.innerHeight;
      if (travel <= 0) return 0;
      return Math.max(0, Math.min(1, (window.scrollY - start) / travel));
    };

    updateFrame(computeProgress());

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateFrame(self.progress);
      },
    });

    const unsubscribeBus = scrollBus.subscribe(() => {
      updateFrame(computeProgress());
    });

    return () => {
      unsubscribeBus();
      st.kill();
    };
  }, [prefersReducedMotion, steps.length]);

  const currentStep = steps[semanticPhaseIdx] || steps[0];
  const trackHeight = prefersReducedMotion ? 'auto' : (isMobile ? '260svh' : '380svh');

  return (
    <section
      ref={containerRef}
      className="pa-px-trust-section"
      aria-label="Trust and Provenance Chain"
      data-scene-id="trust-inspection-stage"
      style={{
        position: 'relative',
        width: '100%',
        height: trackHeight,
        backgroundColor: 'var(--px-ink, #121416)',
        color: 'var(--px-white, #F7F8F8)',
      }}
    >
      <div
        className="pa-px-trust-stage-sticky"
        style={{
          position: prefersReducedMotion ? 'relative' : 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: prefersReducedMotion ? 'auto' : '100svh',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Background Evidence Ground (Guaranteed visible at 0.35 opacity) */}
        <div
          className="pa-px-trust-bg-slot visual-actor"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.35,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <PublicPicture
            assetKey="trustDiagnostic"
            alt="Calibrated diagnostic signal analysis"
            priority={true}
          />
        </div>

        {/* Clean Editorial Heading */}
        <div
          className="pa-px-trust-header"
          style={{
            position: 'relative',
            zIndex: 10,
            padding: 'clamp(40px, 8vh, 80px) var(--px-outer-gutter, 6vw) 0',
            maxWidth: '54rem',
          }}
        >
          <h1 className="pa-px-trust-title">SHOW ME WHERE THAT CAME FROM.</h1>
          <p className="pa-px-trust-lead">{data.hero.support}</p>
        </div>

        {/* The Single Persistent Transforming Record Object */}
        <div
          className="pa-px-trust-record-actor"
          aria-label="Interactive Record Transformation"
          style={{
            position: 'relative',
            zIndex: 12,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Transforming SVG Record Geometry */}
          <div
            className="pa-px-trust-geometry-stage"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '28%',
              left: 'var(--px-outer-gutter, 6vw)',
              right: 'var(--px-outer-gutter, 6vw)',
              height: '36vh',
              pointerEvents: 'none',
            }}
          >
            <svg viewBox="0 0 600 240" className="pa-px-trust-svg" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Continuous Spine Curve */}
              <path
                className="pa-px-trust-path--spine"
                d="M 80,120 L 480,120"
                stroke="var(--px-white)"
                strokeWidth={2}
                fill="none"
              />

              {/* Inferred Branching Paths */}
              <path
                className="pa-px-trust-path--branch-1"
                d="M 140,120 C 200,80 260,80 320,120"
                stroke="rgba(247, 248, 248, 0.5)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="none"
                opacity={0}
              />
              <path
                className="pa-px-trust-path--branch-2"
                d="M 140,120 C 200,160 260,160 320,120"
                stroke="rgba(247, 248, 248, 0.5)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="none"
                opacity={0}
              />

              {/* Calculated Calibrated Boundary */}
              <rect
                className="pa-px-trust-rect--calibrated"
                x={180}
                y={60}
                width={140}
                height={120}
                fill="none"
                stroke="rgba(247, 248, 248, 0.4)"
                strokeWidth={1.5}
                opacity={0}
              />

              {/* Compared Dual Trajectory */}
              <path
                className="pa-px-trust-path--dual"
                d="M 280,90 L 420,90 L 460,120"
                fill="none"
                stroke="rgba(247, 248, 248, 0.7)"
                strokeWidth={2}
                opacity={0}
              />

              {/* Origin / Intermediate / Final Nodes */}
              <circle
                className="pa-px-trust-node--origin"
                cx={80}
                cy={120}
                r={8}
                fill="var(--px-white)"
              />
              <circle
                className="pa-px-trust-node--mid"
                cx={280}
                cy={120}
                r={6}
                fill="var(--px-white)"
                opacity={0}
              />
              <circle
                className="pa-px-trust-node--end"
                cx={480}
                cy={120}
                r={7}
                fill="var(--px-white)"
                opacity={0}
              />
            </svg>
          </div>

          {/* Continuous Narrative Display */}
          <div
            className="pa-px-trust-narrative"
            aria-live="polite"
            style={{
              position: 'absolute',
              bottom: 'clamp(40px, 8vh, 80px)',
              left: 'var(--px-outer-gutter, 6vw)',
              maxWidth: '44rem',
            }}
          >
            <h2 className="pa-px-trust-record__title" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 500, marginBottom: '8px' }}>
              {currentStep.title}
            </h2>
            <p className="pa-px-trust-record__desc" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.2rem)', color: 'var(--px-soft, #DDE1E3)', lineHeight: 1.45, marginBottom: '12px' }}>
              {currentStep.description}
            </p>
            <div className="pa-px-trust-record__details-body" style={{ fontSize: '0.92rem', color: 'var(--px-soft, #DDE1E3)', opacity: 0.85 }}>
              {currentStep.details}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TrustInspectionStage = TrustProvenanceExperience;
export default TrustProvenanceExperience;

