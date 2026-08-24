/**
 * Personality Assessor - Home Cinematic Experience
 * Single continuous cinematic journey: THE RESPONSE TRAVELS THROUGH WORLDS.
 * Replaces isolated sibling component model with continuous actor lineage and overlapping states.
 */

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PersistentMediaSlot } from '../canvas/PersistentMediaSlot';
import { MediaActorRegistry } from '../canvas/MediaActorRegistry';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress, registerActor } from '../motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

export const HomeCinematicExperience = () => {
  const containerRef = useRef(null);
  const { prefersReducedMotion } = usePublicCapabilities();

  const [activeEnvIndex, setActiveEnvIndex] = useState(0);
  const [aperturePos, setAperturePos] = useState({ x: 50, y: 50 });
  const [isApertureActive, setIsApertureActive] = useState(false);

  const data = PUBLIC_CONTENT.home;

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // ── Main Master Timeline for Continuous Home Experience ──
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // 1:1 direct scrub authority
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            registerSceneProgress('home-master-journey', p, true);

            // Update Workworld active environment index smoothly
            if (p < 0.55) {
              setActiveEnvIndex(0); // Precision
            } else if (p < 0.62) {
              setActiveEnvIndex(1); // Autonomy
            } else if (p < 0.69) {
              setActiveEnvIndex(2); // Collaboration
            } else {
              setActiveEnvIndex(3); // Operational Pressure
            }
          },
        },
      });

      // Target DOM actors
      const worldPrimary = containerRef.current.querySelector('.pa-px-home-world__primary');
      const worldSecondary = containerRef.current.querySelector('.pa-px-home-world__secondary');
      const worldTitle = containerRef.current.querySelector('.pa-px-home-world__title');
      const worldSupport = containerRef.current.querySelector('.pa-px-home-world__support');
      const questionActor = containerRef.current.querySelector('.pa-px-home-question-actor');
      const responseActor = containerRef.current.querySelector('.pa-px-home-response-actor');
      const phraseWords = containerRef.current.querySelectorAll('.pa-px-phrase-word');
      const readingNodes = containerRef.current.querySelectorAll('.pa-px-reading-destination');
      const trajectorySvg = containerRef.current.querySelector('.pa-px-branch-svg');

      const workworldStage = containerRef.current.querySelector('.pa-px-workworld-continuous-stage');
      const envPrecision = containerRef.current.querySelector('.pa-px-env-precision');
      const envAutonomy = containerRef.current.querySelector('.pa-px-env-autonomy');
      const envCollaboration = containerRef.current.querySelector('.pa-px-env-collaboration');
      const envPressure = containerRef.current.querySelector('.pa-px-env-pressure');

      const calibrationField = containerRef.current.querySelector('.pa-px-calibration-field');
      const calMasses = containerRef.current.querySelectorAll('.pa-px-cal-mass');

      const timeStage = containerRef.current.querySelector('.pa-px-time-continuous-stage');
      const laterMedia = containerRef.current.querySelector('.pa-px-time-later-crop');

      const provenanceStage = containerRef.current.querySelector('.pa-px-provenance-stage');
      const finaleStage = containerRef.current.querySelector('.pa-px-finale-stage');
      const finaleCta = containerRef.current.querySelector('.pa-px-finale-cta');

      // ── S0 & S1: World Entry -> 4:5 Plate Collapse (0.00 - 0.25) ──
      masterTl
        // Title parallax line separation
        .to(worldTitle, { y: '-35%', opacity: 0.15, ease: 'none' }, 0)
        .to(worldSupport, { y: '-50%', opacity: 0, ease: 'none' }, 0)
        // Zoom Parallax & 4:5 Plate collapse
        .to(
          worldPrimary,
          {
            scale: 0.72,
            x: '-12vw',
            y: '4vh',
            borderRadius: '4px',
            ease: 'none',
          },
          0.04
        )
        // Secondary detail plate travels faster at 1.3x velocity
        .fromTo(
          worldSecondary,
          { x: '120vw', y: '20vh', opacity: 0 },
          { x: '42vw', y: '8vh', opacity: 1, ease: 'none' },
          0.06
        )
        // Contextual Question emerges in negative space (Zone D -> Zone C)
        .fromTo(
          questionActor,
          { y: '80px', opacity: 0 },
          { y: '0px', opacity: 1, ease: 'none' },
          0.12
        );

      // ── S2 & S3: Response Arrival & Semantic Word Branching (0.25 - 0.50) ──
      masterTl
        .fromTo(
          responseActor,
          { opacity: 0, y: '40px' },
          { opacity: 1, y: '0px', ease: 'none' },
          0.24
        )
        // Question recedes quietly
        .to(questionActor, { opacity: 0.2, y: '-20px', ease: 'none' }, 0.28)
        // Semantic words detach along trajectories
        .to(phraseWords[0], { x: '-18vw', y: '-8vh', scale: 1.05, ease: 'none' }, 0.32) // clarify
        .to(phraseWords[1], { x: '12vw', y: '-14vh', fontVariationSettings: "'wdth' 72", ease: 'none' }, 0.32) // constraints
        .to(phraseWords[2], { x: '-10vw', y: '12vh', scale: 0.85, ease: 'none' }, 0.34) // smallest
        .to(phraseWords[3], { x: '16vw', y: '8vh', ease: 'none' }, 0.34) // reversible
        .to(phraseWords[4], { x: '0vw', y: '18vh', fontVariationSettings: "'wdth' 96", ease: 'none' }, 0.36) // step
        // Trajectory SVG paths draw
        .fromTo(
          trajectorySvg,
          { strokeDashoffset: 1000, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.6, ease: 'none' },
          0.32
        )
        // 4 Asymmetric Readings arrive in negative space
        .fromTo(
          readingNodes,
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1, stagger: 0.03, ease: 'none' },
          0.38
        );

      // ── S4: Workworld 4-Environment Centerpiece (0.50 - 0.72) ──
      masterTl
        .to([worldPrimary, worldSecondary, responseActor, readingNodes, trajectorySvg], {
          opacity: 0,
          pointerEvents: 'none',
          ease: 'none',
        }, 0.48)
        .fromTo(
          workworldStage,
          { opacity: 0 },
          { opacity: 1, ease: 'none' },
          0.50
        )
        // Precision -> Autonomy Hand-off
        .to(
          envPrecision,
          { x: '-38vw', scale: 0.82, opacity: 0.4, ease: 'none' },
          0.54
        )
        .fromTo(
          envAutonomy,
          { x: '100vw', y: '15vh', scale: 0.88, opacity: 0.6 },
          { x: '0vw', y: '0vh', scale: 1.0, opacity: 0.96, ease: 'none' },
          0.54
        )
        // Autonomy -> Collaboration Hand-off
        .to(
          envAutonomy,
          { x: '35vw', y: '-12vh', scale: 0.82, opacity: 0.4, ease: 'none' },
          0.61
        )
        .fromTo(
          envCollaboration,
          { x: '-100vw', y: '-10vh', opacity: 0.6 },
          { x: '0vw', y: '0vh', opacity: 0.96, ease: 'none' },
          0.61
        )
        // Collaboration -> Operational Pressure Hand-off
        .to(
          envCollaboration,
          { scale: 0.85, opacity: 0.35, ease: 'none' },
          0.67
        )
        .fromTo(
          envPressure,
          { scale: 1.15, opacity: 0.6 },
          { scale: 1.0, opacity: 0.96, ease: 'none' },
          0.67
        );

      // ── S5: Calibration Spatial Mass Field (0.72 - 0.80) ──
      masterTl
        .to(workworldStage, { opacity: 0, ease: 'none' }, 0.72)
        .fromTo(
          calibrationField,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1.0, ease: 'none' },
          0.73
        )
        // Proportional masses depth travel
        .fromTo(
          calMasses,
          { y: '50px', opacity: 0 },
          { y: '0px', opacity: 1, stagger: 0.015, ease: 'none' },
          0.74
        );

      // ── S6: Time Exposure Temporal Double Exposure (0.80 - 0.87) ──
      masterTl
        .to(calibrationField, { opacity: 0, ease: 'none' }, 0.80)
        .fromTo(
          timeStage,
          { opacity: 0 },
          { opacity: 1, ease: 'none' },
          0.81
        )
        .fromTo(
          laterMedia,
          { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', scale: 1.08 },
          { clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 38% 100%)', scale: 1.0, ease: 'none' },
          0.82
        );

      // ── S7: Provenance Inspection (0.87 - 0.94) ──
      masterTl
        .to(timeStage, { opacity: 0, ease: 'none' }, 0.87)
        .fromTo(
          provenanceStage,
          { opacity: 0 },
          { opacity: 1, ease: 'none' },
          0.88
        );

      // ── S8: Finale Journey Reconstruction (0.94 - 1.00) ──
      masterTl
        .to(provenanceStage, { opacity: 0, ease: 'none' }, 0.94)
        .fromTo(
          finaleStage,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1.0, ease: 'none' },
          0.95
        )
        .fromTo(
          finaleCta,
          { y: '30px', opacity: 0 },
          { y: '0px', opacity: 1, ease: 'none' },
          0.97
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Provenance Aperture Pointer Handler
  const handleProvenancePointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setAperturePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="pa-px-home-continuous-root"
      style={{
        position: 'relative',
        width: '100%',
        height: prefersReducedMotion ? 'auto' : '650svh', // Single authoritative pinned scroll track
        backgroundColor: 'var(--px-ink)',
      }}
    >
      {/* Sticky Cinematic Viewport Stage */}
      <div
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
        {/* ── S0 & S1: World Entry & Opening Evidence Plate ── */}
        <section className="pa-px-home-world-layer" aria-label="World Observation">
          <div className="pa-px-home-world__primary">
            <PersistentMediaSlot
              actorId="home-observation-primary"
              assetKey="homeWorldEntry"
              alt="Contextual architectural design studio environment"
              priority={true}
              transitionRole="shared"
            />
          </div>

          <div className="pa-px-home-world__secondary">
            <PersistentMediaSlot
              actorId="home-observation-secondary"
              assetKey="homeSituationDetail"
              alt="Analytical inspection of engineering materials"
              priority={true}
            />
          </div>

          <div className="pa-px-home-world__hero-content">
            <h1 className="pa-px-home-world__title">{data.worldEntry.headline}</h1>
            <p className="pa-px-home-world__support">{data.worldEntry.support}</p>
            <div className="pa-px-home-world__actions">
              <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
                {data.worldEntry.ctaPrimary}
              </Link>
              <Link to="/how-it-works" className="pa-px-btn-secondary">
                {data.worldEntry.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* S1: Contextual Inquiry Question */}
          <div className="pa-px-home-question-actor" aria-live="polite">
            <span className="pa-px-inquiry-tag">Observed Condition</span>
            <p className="pa-px-inquiry-prompt">{data.situation.prompt}</p>
          </div>

          {/* S2 & S3: Traceable Source Response & Multiple Readings */}
          <div className="pa-px-home-response-actor">
            <span className="pa-px-source-tag">Source Response Anchor</span>
            <p className="pa-px-source-sentence">
              <span className="pa-px-phrase-word">I clarify</span>{' '}
              <span className="pa-px-phrase-word">the constraints</span>{' '}
              <span className="pa-px-phrase-word">first, then choose</span>{' '}
              <span className="pa-px-phrase-word">the smallest</span>{' '}
              <span className="pa-px-phrase-word">reversible step.</span>
            </p>
          </div>

          {/* SVG Motion Trajectories */}
          <svg className="pa-px-branch-svg" viewBox="0 0 1440 900" aria-hidden="true">
            <path d="M 450,450 C 350,300 200,250 160,220" stroke="rgba(247, 248, 248, 0.4)" strokeWidth="1.5" fill="none" />
            <path d="M 450,450 C 600,320 850,260 1100,220" stroke="rgba(247, 248, 248, 0.4)" strokeWidth="1.5" fill="none" />
            <path d="M 450,450 C 380,600 240,700 180,740" stroke="rgba(247, 248, 248, 0.4)" strokeWidth="1.5" fill="none" />
            <path d="M 450,450 C 650,580 950,680 1140,740" stroke="rgba(247, 248, 248, 0.4)" strokeWidth="1.5" fill="none" />
          </svg>

          {/* 4 Asymmetric Readings in Negative Space */}
          <div className="pa-px-readings-field">
            {data.readings.destinations.map((dest, idx) => (
              <div
                key={dest.id || idx}
                className={`pa-px-reading-destination pa-px-reading--${dest.id || idx}`}
              >
                <span className="pa-px-reading-role">{dest.axis || 'Analytical Axis'}</span>
                <strong className="pa-px-reading-title">{dest.name}</strong>
                <p className="pa-px-reading-desc">{dest.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── S4: Workworld 4-Environment Centerpiece Stage ── */}
        <section className="pa-px-workworld-continuous-stage" aria-label="Workworld Environments">
          <div className="pa-px-env-plane pa-px-env-precision">
            <PersistentMediaSlot actorId="home-workworld-precision" assetKey="workworldPrecision" alt="Precision lathe operation in workshop" />
            <div className="pa-px-env-label">
              <span>Condition 01</span>
              <h3>Precision Engineering</h3>
            </div>
          </div>

          <div className="pa-px-env-plane pa-px-env-autonomy">
            <PersistentMediaSlot actorId="home-workworld-autonomy" assetKey="workworldAutonomy" alt="Focused autonomous design work" />
            <div className="pa-px-env-label">
              <span>Condition 02</span>
              <h3>Autonomous Focus</h3>
            </div>
          </div>

          <div className="pa-px-env-plane pa-px-env-collaboration">
            <PersistentMediaSlot actorId="home-workworld-collaboration" assetKey="workworldCollaboration" alt="Design team collaborating on technical artifacts" />
            <div className="pa-px-env-label">
              <span>Condition 03</span>
              <h3>Collaborative Alignment</h3>
            </div>
          </div>

          <div className="pa-px-env-plane pa-px-env-pressure">
            <PersistentMediaSlot actorId="home-workworld-pressure" assetKey="workworldPressure" alt="Operational coordination in control room" />
            <div className="pa-px-env-label">
              <span>Condition 04</span>
              <h3>Operational Pressure</h3>
            </div>
          </div>
        </section>

        {/* ── S5: Calibration Spatial Mass Field ── */}
        <section className="pa-px-calibration-field" aria-label="Calibration Weighting">
          <header className="pa-px-cal-header">
            <h2>{data.calibration.headline}</h2>
            <p>{data.calibration.lead || data.calibration.support}</p>
          </header>

          <div className="pa-px-cal-proportions">
            {data.calibration.weights.map((w) => (
              <div key={w.id} className={`pa-px-cal-mass pa-px-cal-mass--${w.id}`}>
                <span className="pa-px-cal-val">{w.percentage}%</span>
                <span className="pa-px-cal-name">{w.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── S6: Time Exposure Stage ── */}
        <section className="pa-px-time-continuous-stage" aria-label="Longitudinal Consistency">
          <div className="pa-px-time-base-media">
            <PersistentMediaSlot actorId="home-temporal-base" assetKey="homeWorldEntry" alt="Initial baseline assessment context" />
          </div>
          <div className="pa-px-time-later-crop">
            <PersistentMediaSlot actorId="home-temporal-baseline" assetKey="workworldAutonomy" alt="Shifted working condition over time" transitionRole="shared" />
          </div>
          <div className="pa-px-time-content">
            <h2>{data.timeExposure.headline}</h2>
            <p>{data.timeExposure.support}</p>
          </div>
        </section>

        {/* ── S7: Provenance Reveal Stage ── */}
        <section
          className="pa-px-provenance-stage"
          aria-label="Provenance Inspection"
          onMouseMove={handleProvenancePointer}
          onClick={() => setIsApertureActive((prev) => !prev)}
        >
          <div className="pa-px-provenance-base-layer">
            <PersistentMediaSlot actorId="home-provenance-source" assetKey="homeSituationDetail" alt="Original source evidence" transitionRole="shared" />
          </div>

          <div
            className="pa-px-provenance-aperture"
            style={{
              clipPath: isApertureActive
                ? `circle(120px at ${aperturePos.x}% ${aperturePos.y}%)`
                : `circle(80px at ${aperturePos.x}% ${aperturePos.y}%)`,
            }}
          >
            <PersistentMediaSlot actorId="home-provenance-derived" assetKey="trustDiagnostic" alt="Derived algorithmic calibration" />
          </div>

          <div className="pa-px-provenance-header">
            <h2>{data.trace.headline}</h2>
            <p>{data.trace.support}</p>
            <span className="pa-px-provenance-hint">{data.trace.inspectPrompt}</span>
          </div>
        </section>

        {/* ── S8: Finale Reconstruction Stage ── */}
        <section className="pa-px-finale-stage" aria-label="Journey Resolution">
          <div className="pa-px-finale-fragments">
            <div className="pa-px-finale-frag pa-px-finale-frag--1">
              <PersistentMediaSlot actorId="home-finale-1" assetKey="workworldPrecision" alt="Precision craft fragment" />
            </div>
            <div className="pa-px-finale-frag pa-px-finale-frag--2">
              <PersistentMediaSlot actorId="home-finale-2" assetKey="workworldCollaboration" alt="Collaboration fragment" />
            </div>
            <div className="pa-px-finale-frag pa-px-finale-frag--3">
              <PersistentMediaSlot actorId="home-finale-3" assetKey="workworldPressure" alt="Operational consequence fragment" />
            </div>
          </div>

          <div className="pa-px-finale-content">
            <h2 className="pa-px-finale-title">{data.finale.headline}</h2>
            <p className="pa-px-finale-support">{data.finale.support}</p>
            <div className="pa-px-finale-cta">
              <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
                {data.finale.ctaPrimary || data.finale.cta}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeCinematicExperience;
