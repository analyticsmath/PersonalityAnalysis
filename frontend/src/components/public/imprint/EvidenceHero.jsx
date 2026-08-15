// frontend/src/components/public/imprint/EvidenceHero.jsx
// Flagship Hero Scene — The Evidence Imprint

import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { imprintMedia } from '../../../content/personalityImprintMedia';
import EvidenceImprint from './EvidenceImprint';
import { animateEvidenceLift, createImprintScope } from './imprintAnime';
import { useImprintScene } from './ImprintSceneContext';
import '../../../styles/imprint/hero-imprint.css';

export default function EvidenceHero() {
  const containerRef = useRef(null);
  const imprintRef = useRef(null);
  const dominantRef = useRef(null);
  const evidenceSourceRef = useRef(null);
  const humanRef = useRef(null);
  const { setHeaderTone } = useImprintScene();

  const { dominant, evidenceSource, humanProximity } = imprintMedia.hero;
  const blueprintFragment = imprintMedia.fragments.blueprintLift;

  useLayoutEffect(() => {
    setHeaderTone('transparent');

    // 1. Anime.js local material lift choreography on mount
    const scope = createImprintScope(containerRef.current);
    if (imprintRef.current) {
      animateEvidenceLift(imprintRef.current, {
        duration: 900,
        delay: 150,
        translateY: -14,
        scale: 1.03,
      });
    }

    // 2. GSAP macro scroll handoff
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (pointer: fine)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'hero-handoff',
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            onLeave: () => setHeaderTone('released'),
            onEnterBack: () => setHeaderTone('transparent'),
          },
        });

        tl.addLabel('hero-establish')
          .to(imprintRef.current, { y: 60, scale: 0.95, opacity: 0.8, ease: 'power1.inOut' }, 'hero-exit')
          .to(dominantRef.current, { y: 40, opacity: 0.7, ease: 'power1.inOut' }, 'hero-exit')
          .to(humanRef.current, { y: 80, opacity: 0.6, ease: 'power1.inOut' }, 'hero-exit');

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, containerRef);

    return () => {
      ctx.revert();
      if (scope) scope.revert();
    };
  }, [setHeaderTone]);

  return (
    <section className="evidence-hero" ref={containerRef} aria-label="Evidence Hero">
      <div className="hero-world">
        {/* ── Typographic / Action Group ── */}
        <div className="hero-copy-group">
          <h1 className="hero-title">Your work leaves evidence.</h1>
          <p className="hero-support">
            See how professional context becomes questions, readings and career direction you can inspect.
          </p>
          <div className="hero-actions">
            <Link className="imprint-btn imprint-btn--primary" to="/signup">
              Build my profile
            </Link>
            <a className="imprint-btn imprint-btn--text" href="#work-worlds">
              See how it works
            </a>
          </div>
        </div>

        {/* ── Photographic Spatial Actors ── */}
        {/* Actor 1: Dominant Environment (Pexels 9618456) */}
        <figure className="hero-actor hero-actor--dominant" ref={dominantRef}>
          <picture>
            <source srcSet={`${dominant.basePath}-1920.avif 1920w, ${dominant.basePath}-1440.avif 1440w, ${dominant.basePath}-960.avif 960w, ${dominant.basePath}-640.avif 640w`} type="image/avif" />
            <source srcSet={`${dominant.basePath}-1920.webp 1920w, ${dominant.basePath}-1440.webp 1440w, ${dominant.basePath}-960.webp 960w, ${dominant.basePath}-640.webp 640w`} type="image/webp" />
            <img
              src={`${dominant.basePath}-1440.jpg`}
              alt={dominant.alt}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
        </figure>

        {/* Actor 2: Evidence Source (Pexels 9617376) */}
        <figure className="hero-actor hero-actor--evidence-source" ref={evidenceSourceRef}>
          <picture>
            <source srcSet={`${evidenceSource.basePath}-1440.avif 1440w, ${evidenceSource.basePath}-960.avif 960w, ${evidenceSource.basePath}-640.avif 640w, ${evidenceSource.basePath}-480.avif 480w`} type="image/avif" />
            <source srcSet={`${evidenceSource.basePath}-1440.webp 1440w, ${evidenceSource.basePath}-960.webp 960w, ${evidenceSource.basePath}-640.webp 640w, ${evidenceSource.basePath}-480.webp 480w`} type="image/webp" />
            <img
              src={`${evidenceSource.basePath}-960.jpg`}
              alt={evidenceSource.alt}
              loading="eager"
              decoding="async"
            />
          </picture>
        </figure>

        {/* Actor 3: Human Proximity (Pexels 5940721) */}
        <figure className="hero-actor hero-actor--human" ref={humanRef}>
          <picture>
            <source srcSet={`${humanProximity.basePath}-960.avif 960w, ${humanProximity.basePath}-640.avif 640w, ${humanProximity.basePath}-480.avif 480w`} type="image/avif" />
            <source srcSet={`${humanProximity.basePath}-960.webp 960w, ${humanProximity.basePath}-640.webp 640w, ${humanProximity.basePath}-480.webp 480w`} type="image/webp" />
            <img
              src={`${humanProximity.basePath}-640.jpg`}
              alt={humanProximity.alt}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </figure>

        {/* Actor 4: Lifted Photographic Blueprint Imprint (Crossing the Text/Media Boundary) */}
        <div className="hero-lifted-imprint" ref={imprintRef}>
          <EvidenceImprint fragment={blueprintFragment} priority />
        </div>
      </div>
    </section>
  );
}
