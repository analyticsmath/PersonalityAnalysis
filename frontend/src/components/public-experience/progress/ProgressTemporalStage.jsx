/**
 * Personality Assessor - Progress Temporal Experience
 * Title: WHAT CHANGED, AND WHAT DIDN'T?
 * Shared actor baseline carry from Home into Progress route.
 * Pinned double-exposure temporal relationship without unsupported numbers or generic timeline dots.
 */

import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PersistentMediaSlot } from '../canvas/PersistentMediaSlot';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';
import { registerSceneProgress } from '../motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

export const ProgressTemporalStage = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.progress;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const laterMedia = containerRef.current.querySelector('.pa-px-progress__later-media');
      const findings = containerRef.current.querySelector('.pa-px-progress__findings');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            registerSceneProgress('progress-temporal-stage', self.progress, true);
          },
        },
      });

      tl.fromTo(
        laterMedia,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', scale: 1.08 },
        { clipPath: 'polygon(32% 0, 100% 0, 100% 100%, 42% 100%)', scale: 1, ease: 'none' }
      ).fromTo(findings, { y: '30px', opacity: 0.5 }, { y: '0px', opacity: 1, ease: 'none' }, 0.2);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="pa-px-progress-root">
      {/* Pinned Double-Exposure Temporal Stage */}
      <section
        ref={containerRef}
        className="pa-px-progress-section"
        aria-label="Longitudinal Progress"
        data-scene-id="progress-temporal-stage"
        style={{
          position: 'relative',
          width: '100%',
          height: prefersReducedMotion ? 'auto' : '300svh',
          backgroundColor: 'var(--px-ink, #121416)',
          color: 'var(--px-white, #F7F8F8)',
        }}
      >
        <div
          className="pa-px-progress-stage"
          style={{
            position: prefersReducedMotion ? 'relative' : 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: prefersReducedMotion ? 'auto' : '100svh',
            overflow: 'hidden',
          }}
        >
          {/* Base Assessment Layer (Shared Actor Slot from Home) */}
          <div className="pa-px-progress__base-media">
            <PersistentMediaSlot
              actorId="home-observation-primary"
              slotId="progress-baseline-slot"
              assetKey="homeWorldEntry"
              alt="Initial baseline assessment environment"
              transitionRole="shared"
            />
          </div>

          {/* Shifted Context Layer (Double Exposure) */}
          <div className="pa-px-progress__later-media">
            <PersistentMediaSlot
              actorId="progress-later-media"
              slotId="progress-later-slot"
              assetKey="workworldAutonomy"
              alt="Later shifted work environment"
            />
          </div>

          {/* Editorial Content & Illustrative Findings */}
          <div className="pa-px-progress__content">
            <h1 className="pa-px-progress__headline">WHAT CHANGED, AND WHAT DIDN&apos;T?</h1>
            <p className="pa-px-progress__support">{data.hero.support}</p>

            <div className="pa-px-progress__findings">
              <div className="pa-px-progress__finding-row">
                {data.stabilityFinding}
              </div>
              <div className="pa-px-progress__finding-row">
                {data.adaptationFinding}
              </div>
              <span className="pa-px-progress__disclaimer">({data.disclaimer})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calm Baseline Continuation */}
      <section className="pa-px-progress-empty-section" aria-label="Initial Baseline Requirement">
        <div className="pa-px-progress-empty__inner">
          <h2>{data.emptyState.headline}</h2>
          <p>{data.emptyState.support}</p>
          <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
            {data.emptyState.cta}
          </Link>
        </div>
      </section>
    </div>
  );
};

export const ProgressTemporalExperience = ProgressTemporalStage;
export default ProgressTemporalStage;
