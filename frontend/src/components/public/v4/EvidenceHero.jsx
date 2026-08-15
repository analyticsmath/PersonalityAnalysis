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

      // Dominant protagonist establishes in spatial canvas
      tl.fromTo(
        '.hero-v4-plane--dominant',
        { y: 36, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85 },
        '-=0.65'
      );

      // Supporting human context, evidence wall, and material fragments
      tl.fromTo(
        ['.hero-v4-plane--supporting', '.hero-v4-plane--wall', '.hero-v4-material-fragment'],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        '-=0.55'
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
        {/* Typographic and Primary Action Spatial Lead Field */}
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

        {/* Spatial Layered Media Canvas (3 Approved Pexels Media + Natural Material Fragments) */}
        <div className="evidence-hero-v4__world" aria-hidden="true">
          {/* Plane 3: Evidence Wall Schematics (Pexels 9617376) */}
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

          {/* Material Fragment A: Cropped Blueprint Schematic (Natural Material Actor) */}
          <div className="hero-v4-material-fragment hero-v4-material-fragment--blueprint">
            <div className="hero-v4-material-edge" />
          </div>

          {/* Material Fragment B: Document Structure Edge */}
          <div className="hero-v4-material-fragment hero-v4-material-fragment--doc">
            <div className="hero-v4-material-lines" />
          </div>
        </div>
      </div>
    </section>
  );
}
