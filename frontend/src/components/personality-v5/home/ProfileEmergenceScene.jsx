import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';
import SegmentedImageTransition from '../motion/SegmentedImageTransition';
import useCinematicScene from '../motion/useCinematicScene';

/**
 * Scene 01 — Profile Emergence (V5)
 *
 * Choreography:
 * - 0–18% (Establish): A01 vertical 40vw portrait plane, offset right of center. Headline bottom-left.
 * - 18–48% (Transform): A01 expands across viewport; headline translates away safely.
 * - 48–72% (Reassemble): A01 slice-transitions into A02.
 * - 72–100% (Release): A02 holds as wide photographic ground into Scene 02.
 */
export const ProfileEmergenceScene = () => {
  const { hero } = PUBLIC_CONTENT.home;
  const [activeAsset, setActiveAsset] = useState(MEDIA_ASSETS.a01);
  const [incomingAsset, setIncomingAsset] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const imagePlaneRef = useRef(null);
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

      // 0 -> 40%: Expand portrait plane, fade/move content away
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
          y: -100,
          opacity: 0,
          ease: 'power2.in',
        },
        0.15
      );

      // 50%: Trigger transition to A02
      tl.add(() => {
        setIncomingAsset(MEDIA_ASSETS.a02);
        setIsTransitioning(true);
      }, 0.5);

      // 85% -> 100%: Hold A02 for release
      tl.to(imagePlaneRef.current, { scale: 1.04, ease: 'none' }, 0.7);
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
      tl.to(contentRef.current, { opacity: 0, y: -40, ease: 'power2.in' }, 0.2);
    });
  }, []);

  return (
    <section ref={containerRef} className="pa-hero-v5" aria-label="Profile Emergence">
      <div className="pa-hero-v5__viewport">
        {/* Photographic Image Plane */}
        <div ref={imagePlaneRef} className="pa-hero-v5__image-plane">
          <SegmentedImageTransition
            currentAsset={activeAsset}
            incomingAsset={incomingAsset}
            isTransitioning={isTransitioning}
            onTransitionComplete={() => {
              setActiveAsset(MEDIA_ASSETS.a02);
              setIsTransitioning(false);
              setIncomingAsset(null);
            }}
            priority={true}
            objectPosition="50% 38%"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        </div>

        {/* Typographic Content Bay */}
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
