import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';
import MediaPlane from '../motion/MediaPlane';
import SliceOverlay from '../motion/SliceOverlay';
import useCinematicScene from '../motion/useCinematicScene';

/**
 * Scene 01 — Profile Emergence (V6)
 *
 * Guaranteed Invariants:
 * 1. VISIBLE_MEDIA_COVERAGE = 1: A01 is visible on first paint before GSAP runs.
 * 2. Clearance: Header fixed above hero, title never collides with navigation.
 * 3. GSAP is sole owner of macro scroll progress, transforms, and opacities (no React re-renders on scroll).
 * 4. Overlapping handoff: A02 is solid underneath before A01 fades over it with 3x4 slice separation.
 * 5. Hands directly into Evidence Canvas with A02 settled — zero black frame.
 */
export const ProfileEmergenceScene = () => {
  const { hero } = PUBLIC_CONTENT.home;

  const headlineBayRef = useRef(null);
  const actorStageRef = useRef(null);
  const layerA01Ref = useRef(null);
  const layerA02Ref = useRef(null);
  const sliceOverlayWrapRef = useRef(null);

  const containerRef = useCinematicScene(({ mm, el }) => {
    // Desktop & Fine Pointer (>900px)
    mm.add('(min-width: 901px) and (pointer: fine)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 0.0 -> 0.25: Headline clears upward-left before photo expands over text rect
      tl.to(
        headlineBayRef.current,
        {
          y: -60,
          opacity: 0,
          ease: 'power2.in',
        },
        0.02
      );

      // 0.15 -> 0.60: Actor stage expands from portrait bay to full viewport stage
      tl.to(
        actorStageRef.current,
        {
          inset: 0,
          width: '100vw',
          height: '100svh',
          borderRadius: 0,
          ease: 'power2.inOut',
        },
        0.12
      );

      // 0.35 -> 0.55: Slice overlay fades in over A01 as tactile fragmentation
      if (sliceOverlayWrapRef.current) {
        tl.fromTo(
          sliceOverlayWrapRef.current,
          { opacity: 0 },
          { opacity: 1, ease: 'power1.inOut' },
          0.35
        );
        tl.to(
          sliceOverlayWrapRef.current,
          { opacity: 0, ease: 'power1.inOut' },
          0.65
        );
      }

      // 0.40 -> 0.78: A01 fades out over A02 (A02 is already opacity 1 underneath)
      tl.to(
        layerA01Ref.current,
        {
          opacity: 0,
          scale: 1.05,
          ease: 'power1.inOut',
        },
        0.40
      );

      // 0.75 -> 1.0: A02 subtle scale settle into next scene
      tl.fromTo(
        layerA02Ref.current,
        { scale: 1.04 },
        { scale: 1, ease: 'none' },
        0.50
      );
    });

    // Mobile / Touch / Narrow Viewports (<=900px)
    mm.add('(max-width: 900px), (pointer: coarse)', () => {
      // Normal document flow, no pinning
      if (layerA01Ref.current) gsap.set(layerA01Ref.current, { opacity: 1, scale: 1 });
      if (layerA02Ref.current) gsap.set(layerA02Ref.current, { opacity: 1, scale: 1 });
      if (headlineBayRef.current) gsap.set(headlineBayRef.current, { opacity: 1, y: 0 });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-v6-scene-hero"
      data-header-theme="dark"
      data-cinematic-stage="hero"
      aria-label="Profile Emergence"
    >
      <div className="pa-v6-scene-hero__sticky">
        {/* Protected Left Clear Field for Headline & CTAs */}
        <div ref={headlineBayRef} className="pa-v6-scene-hero__clear-field">
          <span className="pa-v6-eyebrow">
            {hero.descriptor || 'Adaptive personality and career intelligence'}
          </span>
          <h1 className="pa-v6-scene-hero__title">
            {hero.headline}
          </h1>
          <p className="pa-v6-scene-hero__lead">
            {hero.lead}
          </p>
          <div className="pa-v6-scene-hero__actions">
            <Link
              to={getSignupAcquisitionUrl('/assessment/start')}
              className="pa-v6-btn pa-v6-btn--primary"
            >
              Build my profile →
            </Link>
            <Link
              to={getLoginUrl('/dashboard')}
              className="pa-v6-scene-hero__signin-quiet"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Structural Stacked Base Actor Stage */}
        <div ref={actorStageRef} className="pa-v6-scene-hero__actor-stage">
          {/* Base Layer B: A02 (Mounted underneath from start, visible when A01 fades) */}
          <div
            ref={layerA02Ref}
            className="pa-v6-hero-layer pa-v6-hero-layer--b"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              opacity: 1,
            }}
          >
            <MediaPlane
              asset={MEDIA_ASSETS_V6.a02}
              objectPosition={MEDIA_ASSETS_V6.a02.focalPoint.desktop}
              alt={MEDIA_ASSETS_V6.a02.alt}
            />
          </div>

          {/* Base Layer A: A01 (Permanent foreground image on first paint) */}
          <div
            ref={layerA01Ref}
            className="pa-v6-hero-layer pa-v6-hero-layer--a"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              opacity: 1,
            }}
          >
            <MediaPlane
              asset={MEDIA_ASSETS_V6.a01}
              priority={true}
              objectPosition={MEDIA_ASSETS_V6.a01.focalPoint.desktopInitial}
              alt={MEDIA_ASSETS_V6.a01.alt}
            />
          </div>

          {/* Tactile 3x4 Slice Cut Overlay (Animated strictly by GSAP) */}
          <div
            ref={sliceOverlayWrapRef}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              opacity: 0,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            <SliceOverlay
              asset={MEDIA_ASSETS_V6.a01}
              progress={0.5}
              layout="3x4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileEmergenceScene;

