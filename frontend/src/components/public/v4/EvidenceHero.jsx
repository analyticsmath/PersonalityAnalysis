import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Arrow, ResponsiveImage } from '../PublicChrome';
import { usePublicMotion } from '../PublicMotionRoot';
import { publicMedia } from '../../../content/personalityMarketingDemo';

export default function EvidenceHero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const { reducedMotion, scrollTo } = usePublicMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Title line mask reveal
      tl.fromTo(
        headlineRef.current?.querySelectorAll('.hero-v4-line-reveal'),
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.85, stagger: 0.12 }
      );

      // Dominant protagonist establishes
      tl.fromTo(
        '.hero-v4-plane--dominant',
        { y: 32, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 },
        '-=0.6'
      );

      // Supporting human context & evidence wall arrive
      tl.fromTo(
        ['.hero-v4-plane--supporting', '.hero-v4-plane--wall', '.hero-v4-fragment'],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        '-=0.5'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleSeeHowItWorks = (e) => {
    e.preventDefault();
    scrollTo('#scene-work-worlds');
  };

  return (
    <section
      className="evidence-hero-v4"
      ref={heroRef}
      data-header-scene="light"
      aria-labelledby="hero-v4-heading"
    >
      <div className="evidence-hero-v4__stage">
        {/* Typographic and Primary Action Field */}
        <div className="evidence-hero-v4__lead">
          <h1 id="hero-v4-heading" className="hero-v4-title" ref={headlineRef}>
            <span className="hero-v4-line-mask">
              <span className="hero-v4-line-reveal">Your work</span>
            </span>
            <span className="hero-v4-line-mask">
              <span className="hero-v4-line-reveal">leaves evidence.</span>
            </span>
          </h1>

          <p className="hero-v4-support">
            Professional context becomes adaptive questions, distinct profile readings and career direction you can inspect.
          </p>

          <div className="hero-v4-actions">
            <Link className="public-cta-button public-cta-button--primary" to="/signup">
              Build my profile <Arrow />
            </Link>
            <a
              className="public-text-action"
              href="#scene-work-worlds"
              onClick={handleSeeHowItWorks}
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Spatial Layered Media Composition (3 Approved Pexels Media + Native Fragments) */}
        <div className="evidence-hero-v4__world" aria-hidden="true">
          {/* Plane 3: Evidence Wall Sketched/Pinned Schematics (Pexels 9617376) */}
          <figure className="hero-v4-plane hero-v4-plane--wall">
            <ResponsiveImage
              media={publicMedia.hero.evidenceWall}
              alt=""
              sizes="(min-width: 1200px) 18vw, 30vw"
            />
          </figure>

          {/* Plane 1: Dominant Architectural Workspace (Pexels 9618456) */}
          <figure className="hero-v4-plane hero-v4-plane--dominant">
            <ResponsiveImage
              media={publicMedia.hero.dominant}
              alt=""
              priority
              artDirectedMobile
              sizes="(min-width: 1200px) 50vw, (min-width: 768px) 85vw, 92vw"
            />
          </figure>

          {/* Plane 2: Supporting Human Context on Laptop (Pexels 5940721) */}
          <figure className="hero-v4-plane hero-v4-plane--supporting">
            <ResponsiveImage
              media={publicMedia.hero.supporting}
              alt=""
              sizes="(min-width: 1200px) 20vw, 36vw"
            />
          </figure>

          {/* Professional Artifact Fragment A: Specification Document / Blueprint edge */}
          <div className="hero-v4-fragment hero-v4-fragment--doc">
            <div className="hero-v4-fragment__badge">Artifact #01</div>
            <div className="hero-v4-fragment__line" />
            <div className="hero-v4-fragment__text">System Architecture &amp; SLA Specs</div>
          </div>

          {/* Professional Artifact Fragment B: Precision Measurement / Calibration Chip */}
          <div className="hero-v4-fragment hero-v4-fragment--signal">
            <span className="hero-v4-fragment__dim">Signal: Systematic Reasoning</span>
            <span className="hero-v4-fragment__score">88/100</span>
          </div>
        </div>
      </div>
    </section>
  );
}
