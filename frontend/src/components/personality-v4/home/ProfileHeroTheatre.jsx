import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import ResponsivePicture from '../media/ResponsivePicture';
import ProfileRefractionCanvas from '../media/ProfileRefractionCanvas';
import useSceneVisibility from '../../../hooks/personality-v4/useSceneVisibility';
import useReducedMotion from '../../../hooks/personality-v4/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const ProfileHeroTheatre = () => {
  const envelopeRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const headlineRef = useRef(null);
  const leadRef = useRef(null);
  const actionsRef = useRef(null);
  const traceWordsRef = useRef(null);

  const isVisible = useSceneVisibility(envelopeRef);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Named timeline matching author specification: establish -> transform -> dwell -> release
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: envelopeRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
        },
      });

      tl.addLabel('establish', 0);
      tl.fromTo(
        frameRef.current,
        { scale: 1.035, opacity: 0.95 },
        { scale: 1.0, opacity: 1, duration: 0.16, ease: 'none' },
        'establish'
      );

      tl.addLabel('transform', 0.16);
      tl.to(
        frameRef.current,
        {
          width: '100vw',
          height: '100svh',
          top: 0,
          duration: 0.36,
          ease: 'power2.inOut',
        },
        'transform'
      );
      tl.to(
        headlineRef.current,
        {
          y: -40,
          filter: 'blur(7px)',
          opacity: 0.25,
          duration: 0.36,
          ease: 'power2.inOut',
        },
        'transform'
      );

      tl.addLabel('dwell', 0.52);
      tl.to(
        traceWordsRef.current,
        {
          opacity: 1,
          duration: 0.18,
          ease: 'power3.out',
        },
        'dwell'
      );

      tl.addLabel('release', 0.70);
      tl.to(
        frameRef.current,
        {
          scale: 1.08,
          opacity: 0.35,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        'release'
      );
      tl.to(
        traceWordsRef.current,
        {
          opacity: 0,
          duration: 0.15,
        },
        'release'
      );
    }, envelopeRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const { hero } = PUBLIC_CONTENT.home;

  return (
    <section ref={envelopeRef} className="pa-hero-envelope" aria-label="Hero Scene">
      <div ref={stageRef} className="pa-hero-stage">
        <ProfileRefractionCanvas
          isVisible={isVisible}
          imageSrc={MEDIA_ASSETS.a01.source}
        />

        <div ref={frameRef} className="pa-hero-actor-frame">
          <ResponsivePicture
            asset={MEDIA_ASSETS.a01}
            alt=""
            priority={true}
            sizes="(max-width: 900px) 100vw, 42vw"
            objectPosition="50% 42%"
          />
        </div>

        <div ref={headlineRef} className="pa-hero-headline-wrap">
          <h1 className="pa-hero-h1">
            See the professional <span className="pa-hero-highlight">patterns</span> behind your
            decisions.
          </h1>
        </div>

        <div ref={traceWordsRef} className="pa-hero-trace-words" aria-hidden="true">
          {hero.traceWords.map((word) => (
            <span key={word} className="pa-hero-trace-word">
              {word}
            </span>
          ))}
        </div>

        <div className="pa-hero-footer-grid">
          <p ref={leadRef} className="pa-hero-lead">
            {hero.lead}
          </p>

          <div ref={actionsRef} className="pa-hero-actions">
            <Link
              to={getSignupAcquisitionUrl()}
              className="pa-btn pa-btn--inverse"
            >
              {PUBLIC_CONTENT.brand.ctaPrimary}
            </Link>
            <a
              href="#evidence-theatre"
              className="pa-btn pa-btn--ghost"
              style={{ color: 'var(--pa-white)' }}
            >
              {PUBLIC_CONTENT.brand.ctaSecondary} ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeroTheatre;
