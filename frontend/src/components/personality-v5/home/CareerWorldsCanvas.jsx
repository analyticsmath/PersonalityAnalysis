import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import SegmentedImageTransition from '../motion/SegmentedImageTransition';
import useCinematicScene from '../motion/useCinematicScene';

const WORLDS_ASSETS = [
  MEDIA_ASSETS.a03,
  MEDIA_ASSETS.a04,
  MEDIA_ASSETS.a05,
  MEDIA_ASSETS.a06,
  MEDIA_ASSETS.a02,
];

/**
 * Scene 04 — Career Worlds Canvas (V5)
 *
 * Built on the White Desert camp principle:
 * - Persistent dark visual field across 5 world transitions.
 * - Active image plane (74vw × 66svh) transforms via SegmentedImageTransition.
 * - 01/05 index counter and 3 requirement markers tied to the image edge.
 */
export const CareerWorldsCanvas = () => {
  const { careerWorlds } = PUBLIC_CONTENT.home;
  const worlds = careerWorlds.worlds;

  const [activeIdx, setActiveIdx] = useState(0);
  const [incomingIdx, setIncomingIdx] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDir, setTransitionDir] = useState('forward');

  const activeWorld = worlds[activeIdx] || worlds[0];

  const containerRef = useCinematicScene((self, mm, el) => {
    mm.add('(min-width: 1025px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const step = Math.min(worlds.length - 1, Math.floor(self.progress * worlds.length));
            if (step !== activeIdx && !isTransitioning) {
              setTransitionDir(step > activeIdx ? 'forward' : 'backward');
              setIncomingIdx(step);
              setIsTransitioning(true);
            }
          },
        },
      });

      // Subtle scale breathing across the timeline
      tl.to('.pa-career-canvas-stage', { scale: 1.02, duration: 1, ease: 'none' }, 0);
    });
  }, [activeIdx, isTransitioning, worlds.length]);

  return (
    <section
      ref={containerRef}
      className="pa-career-canvas-v5"
      data-header-theme="dark"
      aria-label="Career Worlds Theatre"
    >
      <div className="pa-career-canvas-v5__viewport">
        {/* Core Stage Image Plane */}
        <div className="pa-career-canvas-stage">
          <SegmentedImageTransition
            currentAsset={WORLDS_ASSETS[activeIdx]}
            incomingAsset={incomingIdx !== null ? WORLDS_ASSETS[incomingIdx] : null}
            isTransitioning={isTransitioning}
            direction={transitionDir}
            onTransitionComplete={() => {
              if (incomingIdx !== null) {
                setActiveIdx(incomingIdx);
                setIncomingIdx(null);
              }
              setIsTransitioning(false);
            }}
            objectPosition="50% 40%"
            sizes="(max-width: 1024px) 100vw, 74vw"
          />
        </div>

        {/* Dynamic Meta Bay: Title, Requirements, and Index */}
        <div className="pa-career-canvas-meta">
          <div>
            <h3 className="pa-career-world-headline">{activeWorld.title}</h3>
            <div className="pa-career-world-reqs">
              {activeWorld.requirements?.slice(0, 3).map((req) => (
                <span key={req}>{req}</span>
              ))}
            </div>
          </div>

          <div className="pa-career-index-counter">
            0{activeIdx + 1} / 0{worlds.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerWorldsCanvas;
