import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';
import ResponsivePicture from '../../personality-v4/media/ResponsivePicture';
import useCinematicScene from '../motion/useCinematicScene';

/**
 * Scene 01 — Profile Emergence (V5)
 *
 * Continuous Layered Photographic Hand-off (Zero Black Dead Zone):
 * - A01 and A02 are stacked directly in the sticky viewport.
 * - 0–40%: A01 enters as an offset portrait plane, then expands to 100vw × 100svh. Headline clears out safely.
 * - 40–80%: A01 transforms and cross-dissolves directly into A02 with directional translation and scale.
 * - 80–100%: A02 holds as the established visual field for Scene 02.
 */
export const ProfileEmergenceScene = () => {
  const { hero } = PUBLIC_CONTENT.home;

  const imagePlaneRef = useRef(null);
  const layerA01Ref = useRef(null);
  const layerA02Ref = useRef(null);
  const contentRef = useRef(null);

  const containerRef = useCinematicScene((self, mm, el) => {
    // Desktop Choreography (>1024px)
    mm.add('(min-width: 1025px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initial layer setups
      gsap.set(layerA01Ref.current, { opacity: 1, scale: 1 });
      gsap.set(layerA02Ref.current, { opacity: 0, scale: 1.08 });

      // 0 -> 40%: Expand portrait plane to full bleed, move headline out safely
      tl.to(
        imagePlaneRef.current,
        {
          width: '100vw',
          height: '100svh',
          left: '50%',
          top: '50%',
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        contentRef.current,
        {
          y: -120,
          opacity: 0,
          ease: 'power2.in',
        },
        0.12
      );

      // 40% -> 80%: Continuous cross-dissolve & directional scale from A01 to A02
      tl.to(
        layerA01Ref.current,
        {
          opacity: 0,
          scale: 0.96,
          ease: 'power1.inOut',
        },
        0.4
      );

      tl.to(
        layerA02Ref.current,
        {
          opacity: 1,
          scale: 1,
          ease: 'power1.inOut',
        },
        0.4
      );

      // 80% -> 100%: Hold A02 with subtle scale breathing as Scene 02 ground
      tl.to(
        layerA02Ref.current,
        {
          scale: 1.04,
          ease: 'none',
        },
        0.8
      );
    });

    // Tablet Choreography (641px - 1024px)
    mm.add('(min-width: 641px) and (max-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true,
        },
      });

      tl.to(imagePlaneRef.current, { width: '100vw', height: '100svh', ease: 'power2.inOut' }, 0);
      tl.to(contentRef.current, { opacity: 0, y: -50, ease: 'power2.in' }, 0.2);
      tl.to(layerA01Ref.current, { opacity: 0 }, 0.5);
      tl.to(layerA02Ref.current, { opacity: 1 }, 0.5);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-hero-v5"
      data-header-theme="dark"
      aria-label="Profile Emergence"
    >
      <div className="pa-hero-v5__viewport">
        {/* Layered Continuous Image Plane Container */}
        <div ref={imagePlaneRef} className="pa-hero-v5__image-plane">
          {/* Layer A01 (Top) */}
          <div
            ref={layerA01Ref}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              willChange: 'transform, opacity',
            }}
          >
            <ResponsivePicture
              asset={MEDIA_ASSETS.a01}
              alt={MEDIA_ASSETS.a01.alt}
              sizes="(max-width: 1024px) 100vw, 70vw"
              objectPosition="50% 38%"
              priority={true}
            />
          </div>

          {/* Layer A02 (Underneath) */}
          <div
            ref={layerA02Ref}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              willChange: 'transform, opacity',
            }}
          >
            <ResponsivePicture
              asset={MEDIA_ASSETS.a02}
              alt={MEDIA_ASSETS.a02.alt}
              sizes="100vw"
              objectPosition="50% 42%"
            />
          </div>
        </div>

        {/* Typographic Content Bay with Header Clearance */}
        <div ref={contentRef} className="pa-hero-v5__content">
          <h1 className="pa-hero-v5__title">{hero.headline || hero.title}</h1>
          <p className="pa-hero-v5__subtitle">{hero.lead}</p>
          <div className="pa-hero-v5__cta-row">
            <Link
              to={getSignupAcquisitionUrl('/assessment/start')}
              className="pa-btn pa-btn--inverse"
            >
              Build my profile →
            </Link>
            <Link
              to={getLoginUrl('/dashboard')}
              className="pa-btn pa-btn--inverse-outline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileEmergenceScene;
