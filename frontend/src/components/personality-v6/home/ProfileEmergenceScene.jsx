import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';
import MediaPlane from '../motion/MediaPlane';
import PlaneHandoff from '../motion/PlaneHandoff';
import SliceOverlay from '../motion/SliceOverlay';
import useCinematicScene from '../motion/useCinematicScene';

/**
 * Scene 01 — Profile Emergence (V6)
 *
 * Authored visual states:
 * establish -> inhabit -> transform -> handoff -> settle
 *
 * 1. Start: Obsidian ground. Dark theme.
 * 2. Left 5-col clear field for headline. Columns 7–12 for A01. No physical collision.
 * 3. 15–35%: Headline clears upward-left (opacity 0) before A01 crosses original text rect.
 * 4. 35–65%: A01 expands to full-stage with 3x4 SliceOverlay tactile cut, A02 active underneath.
 * 5. 65–100%: A02 settles full-stage for Scene 02. No black frame.
 */
export const ProfileEmergenceScene = () => {
  const { hero } = PUBLIC_CONTENT.home;

  const [handoffProgress, setHandoffProgress] = useState(0);
  const headlineBayRef = useRef(null);
  const actorStageRef = useRef(null);

  const containerRef = useCinematicScene(({ mm, el }) => {
    // Desktop Choreography (>900px)
    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setHandoffProgress(self.progress);
          },
        },
      });

      // 0 -> 25%: Headline exits upward-left to opacity 0 BEFORE image expands over clear field
      tl.to(
        headlineBayRef.current,
        {
          y: -80,
          opacity: 0,
          ease: 'power2.in',
        },
        0.05
      );

      // 15 -> 55%: Actor stage enlarges from cols 7-12 to full-screen
      tl.to(
        actorStageRef.current,
        {
          gridColumn: '1 / 13',
          width: '100vw',
          height: '100svh',
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '0px',
          ease: 'power2.inOut',
        },
        0.15
      );
    });

    // Mobile & Tablet (<=900px) native flow: no pinning, straightforward chapter
    mm.add('(max-width: 900px)', () => {
      setHandoffProgress(0);
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
        {/* Protected Left Clear Field for Headline */}
        <div ref={headlineBayRef} className="pa-v6-scene-hero__clear-field">
          <span style={{ fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pa-stone)', fontWeight: 600 }}>
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

        {/* Structural Base Actor Stage with Zero Black Gap Handoff */}
        <div ref={actorStageRef} className="pa-v6-scene-hero__actor-stage">
          <PlaneHandoff
            assetA={MEDIA_ASSETS_V6.a01}
            assetB={MEDIA_ASSETS_V6.a02}
            progress={handoffProgress}
            priorityA={true}
            objectPositionA={MEDIA_ASSETS_V6.a01.focalPoint.desktopExpanded}
            objectPositionB={MEDIA_ASSETS_V6.a02.focalPoint.desktop}
            overlay={
              <SliceOverlay
                asset={MEDIA_ASSETS_V6.a01}
                progress={handoffProgress}
                layout="3x4"
              />
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileEmergenceScene;
