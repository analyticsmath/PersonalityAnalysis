import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import useCinematicScene from '../motion/useCinematicScene';

gsap.registerPlugin(ScrollTrigger);

export const OrientationChapter = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const copyRef = useRef(null);
  const mediaStageRef = useRef(null);
  const apertureRef = useRef(null);
  const paperStripRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const evidence = PUBLIC_CONTENT.home.evidenceSignal;

  useCinematicScene(({ isDesktop }) => {
    if (!isDesktop || !containerRef.current || !stickyRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: stickyRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      },
    });

    // 1. Hero copy gently fades out and shifts left in the first 30% of scroll
    tl.to(copyRef.current, {
      x: -40,
      opacity: 0,
      duration: 0.28,
      ease: 'power1.out',
    }, 0);

    // 2. Transition background from light paper opening to deep ground for evidence
    tl.to(containerRef.current, {
      backgroundColor: '#0c0e0c',
      duration: 0.45,
      ease: 'power1.inOut',
    }, 0.15);

    // 3. Media stage expands from offset interlocking position (cols 5–12) to centered field (cols 2–11)
    tl.to(mediaStageRef.current, {
      gridColumn: '2 / 12',
      duration: 0.38,
      ease: 'power2.inOut',
    }, 0.05);

    // 4. A02 vertical seam reveal over A01 (both persistently mounted, seamless overlap)
    tl.fromTo(apertureRef.current, {
      clipPath: 'inset(0 0 0 100%)',
    }, {
      clipPath: 'inset(0 0 0 0%)',
      duration: 0.38,
      ease: 'power2.inOut',
    }, 0.3);

    // 5. Hairline edge annotations fade into place
    tl.fromTo(
      containerRef.current.querySelectorAll('.pa-v7-evidence-hairline-annotation'),
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.22,
        ease: 'power1.out',
      },
      0.6
    );

    // 6. Calm paper questionnaire strip settles smoothly below A02
    if (paperStripRef.current) {
      tl.fromTo(
        paperStripRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.26,
          ease: 'power2.out',
        },
        0.66
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-v7-chapter-orientation pa-v7-opening-composition"
      aria-label="Chapter 01 — Orientation and Evidence Composition"
    >
      {/* ── Desktop Continuous Pinned Stage ── */}
      <div ref={stickyRef} className="pa-v7-chapter-orientation__sticky">
        {/* Columns 1–8: Quiet Left Field Interlocking with Image Plane */}
        <div ref={copyRef} className="pa-v7-orientation__copy-rail">
          <h1 className="pa-v7-orientation__h1">
            {PUBLIC_CONTENT.home.hero.headline}
          </h1>
          <p className="pa-v7-orientation__lead">
            {PUBLIC_CONTENT.home.hero.lead}
          </p>
          <div className="pa-v7-orientation__actions">
            <Link to={getSignupAcquisitionUrl()} className="pa-v7-btn pa-v7-btn--ink">
              {PUBLIC_CONTENT.home.hero.ctaPrimary}
            </Link>
            <Link to="/how-it-works" className="pa-v7-btn pa-v7-btn--outline-ink">
              {PUBLIC_CONTENT.home.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Offset Photographic Plane: Starts in Columns 5–12 (Interlocking with Type Field), Expands to Columns 2–11 */}
        <div ref={mediaStageRef} className="pa-v7-orientation__media-stage">
          {/* Base Layer: A01 Clean Photographic Plane (Visible On First Paint) */}
          <div className="pa-v7-orientation__base-plane">
            <MediaPlane
              asset={MEDIA_ASSETS_V7.a01}
              priority={true}
              objectPosition="50% 42%"
              alt="Blurred profile seen through textured glass establishing orientation"
            />
          </div>

          {/* Handoff Layer: A02 Persistent Mount Revealed Via Vertical Seam Clip-Path */}
          <div ref={apertureRef} className="pa-v7-orientation__aperture-overlay">
            <MediaPlane
              asset={MEDIA_ASSETS_V7.a02}
              priority={true}
              objectPosition="50% 42%"
              alt="Contextual work evidence plane"
            />

            {/* 4 Perimeter Edge Hairline Annotations (No filled backgrounds, no all-caps) */}
            <div className="pa-v7-evidence-hairline-annotation pa-v7-evidence-hairline-annotation--top-left">
              <span className="pa-v7-evidence-hairline-annotation__label">Context</span>
              <span className="pa-v7-evidence-hairline-annotation__text">{evidence.demoEvidence.context}</span>
            </div>

            <div className="pa-v7-evidence-hairline-annotation pa-v7-evidence-hairline-annotation--top-right">
              <span className="pa-v7-evidence-hairline-annotation__label">Observed pattern</span>
              <span className="pa-v7-evidence-hairline-annotation__text">{evidence.demoEvidence.observedPattern}</span>
            </div>

            <div className="pa-v7-evidence-hairline-annotation pa-v7-evidence-hairline-annotation--mid-right">
              <span className="pa-v7-evidence-hairline-annotation__label">Role anchor</span>
              <span className="pa-v7-evidence-hairline-annotation__text">{evidence.demoEvidence.role}</span>
            </div>

            <div className="pa-v7-evidence-hairline-annotation pa-v7-evidence-hairline-annotation--bottom-right">
              <span className="pa-v7-evidence-hairline-annotation__label">Trade-off</span>
              <span className="pa-v7-evidence-hairline-annotation__text">{evidence.demoEvidence.tradeoff}</span>
            </div>
          </div>
        </div>

        {/* Calm Paper Strip Anchored Below A02 in Evidence Phase */}
        <div ref={paperStripRef} className="pa-v7-evidence__paper-strip-wrapper">
          <div className="pa-v7-evidence__paper-strip">
            <p className="pa-v7-evidence__paper-prompt">
              {evidence.demoQuestion}
            </p>

            <div className="pa-v7-evidence__paper-options" role="radiogroup" aria-label="Sample assessment question">
              {evidence.demoOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`pa-v7-evidence__paper-option ${selectedOption === opt.id ? 'is-selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="evidence-demo-opt"
                    checked={selectedOption === opt.id}
                    onChange={() => setSelectedOption(opt.id)}
                    value={opt.id}
                  />
                  <span className="pa-v7-evidence__paper-option-text">{opt.label}</span>
                </label>
              ))}
            </div>

            {selectedOption && (
              <div className="pa-v7-evidence__paper-marker" aria-live="polite">
                <span className="pa-v7-evidence__marker-dot" />
                <span>Signal: {evidence.demoOptions.find((o) => o.id === selectedOption)?.weightSignal}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Layout (< 900px): Native Scrolling & Image-First 72dvh Composition ── */}
      <div className="pa-v7-opening-mobile">
        {/* 1. Image-First 72dvh Composition (A01) */}
        <div className="pa-v7-opening-mobile__hero-media">
          <MediaPlane
            asset={MEDIA_ASSETS_V7.a01}
            priority={true}
            objectPosition="51% 34%"
            alt="Blurred profile seen through textured glass"
          />
        </div>

        {/* 2. Quiet Hero Copy */}
        <div className="pa-v7-opening-mobile__hero-copy">
          <h1 className="pa-v7-opening-mobile__h1">
            {PUBLIC_CONTENT.home.hero.headline}
          </h1>
          <p className="pa-v7-opening-mobile__lead">
            {PUBLIC_CONTENT.home.hero.lead}
          </p>
          <div className="pa-v7-opening-mobile__actions">
            <Link to={getSignupAcquisitionUrl()} className="pa-v7-btn pa-v7-btn--ink">
              {PUBLIC_CONTENT.home.hero.ctaPrimary}
            </Link>
            <Link to="/how-it-works" className="pa-v7-btn pa-v7-btn--outline-ink">
              {PUBLIC_CONTENT.home.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* 3. Direct Visual Handoff to A02 Contextual Evidence */}
        <div className="pa-v7-opening-mobile__evidence-media">
          <MediaPlane
            asset={MEDIA_ASSETS_V7.a02}
            priority={false}
            objectPosition="50% 42%"
            alt="Contextual work evidence plane"
          />
        </div>

        {/* 4. Mobile Hairline Annotations */}
        <div className="pa-v7-opening-mobile__annotations">
          <div className="pa-v7-opening-mobile__annotation-item">
            <span className="pa-v7-opening-mobile__annotation-label">Context</span>
            <span>{evidence.demoEvidence.context}</span>
          </div>
          <div className="pa-v7-opening-mobile__annotation-item">
            <span className="pa-v7-opening-mobile__annotation-label">Observed pattern</span>
            <span>{evidence.demoEvidence.observedPattern}</span>
          </div>
          <div className="pa-v7-opening-mobile__annotation-item">
            <span className="pa-v7-opening-mobile__annotation-label">Role anchor</span>
            <span>{evidence.demoEvidence.role}</span>
          </div>
          <div className="pa-v7-opening-mobile__annotation-item">
            <span className="pa-v7-opening-mobile__annotation-label">Trade-off</span>
            <span>{evidence.demoEvidence.tradeoff}</span>
          </div>
        </div>

        {/* 5. Mobile Calm Paper Strip Questionnaire */}
        <div className="pa-v7-opening-mobile__paper-strip">
          <p className="pa-v7-evidence__paper-prompt">
            {evidence.demoQuestion}
          </p>

          <div className="pa-v7-evidence__paper-options" role="radiogroup" aria-label="Sample assessment question">
            {evidence.demoOptions.map((opt) => (
              <label
                key={opt.id}
                className={`pa-v7-evidence__paper-option ${selectedOption === opt.id ? 'is-selected' : ''}`}
              >
                <input
                  type="radio"
                  name="evidence-demo-opt-mobile"
                  checked={selectedOption === opt.id}
                  onChange={() => setSelectedOption(opt.id)}
                  value={opt.id}
                />
                <span className="pa-v7-evidence__paper-option-text">{opt.label}</span>
              </label>
            ))}
          </div>

          {selectedOption && (
            <div className="pa-v7-evidence__paper-marker" aria-live="polite">
              <span className="pa-v7-evidence__marker-dot" />
              <span>Signal: {evidence.demoOptions.find((o) => o.id === selectedOption)?.weightSignal}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrientationChapter;
