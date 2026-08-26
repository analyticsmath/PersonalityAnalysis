import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

const CONDITIONS = [
  {
    id: 'precision',
    name: 'PRECISION',
    mediaKey: 'workworldPrecision',
    statement: 'Clear constraints make this pattern decisive.',
    sourceFragment: 'clarify the constraints first...',
    silhouetteClass: 'pa-px-silhouette--precision',
  },
  {
    id: 'autonomy',
    name: 'AUTONOMY',
    mediaKey: 'workworldAutonomy',
    statement: 'Clear boundaries make independent execution easier.',
    sourceFragment: 'choose the smallest step...',
    silhouetteClass: 'pa-px-silhouette--autonomy',
  },
  {
    id: 'collaboration',
    name: 'COLLABORATION',
    mediaKey: 'workworldCollaboration',
    statement: 'The reasoning becomes useful when other people can inspect it.',
    sourceFragment: 'clarify boundaries first...',
    silhouetteClass: 'pa-px-silhouette--collaboration',
  },
  {
    id: 'pressure',
    name: 'UNDER PRESSURE',
    mediaKey: 'workworldPressure',
    detailMediaKey: 'workworldPressureHuman',
    statement: 'Reversible steps reduce the cost of uncertainty.',
    sourceFragment: 'smallest reversible step...',
    silhouetteClass: 'pa-px-silhouette--pressure',
  },
];

export const ProfessionalConditionsJourney = () => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const panelsRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const { prefersReducedMotion, isMobile, isTouch } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || isMobile || isTouch || !containerRef.current || !stageRef.current) return;

    const container = containerRef.current;
    const panels = panelsRef.current.filter(Boolean);
    if (!panels.length) return;

    const ctx = gsap.context(() => {
      // 4 Conditions -> 3 Handoffs over ~320vh
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=320%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const raw = self.progress * 3;
            const current = Math.min(3, Math.floor(raw));
            setActiveIdx(current);

            // Authoritative Dev & QA debug state
            if (typeof window !== 'undefined') {
              window.__PX_DEBUG__ = window.__PX_DEBUG__ || {};
              const currentPanel = panels[current];
              const currFrame = currentPanel?.querySelector('.pa-px-condition-silhouette__media-frame');
              const currImg = currentPanel?.querySelector('img');
              const currType = currentPanel?.querySelector('.pa-px-condition-silhouette__typography');

              window.__PX_DEBUG__.conditions = {
                activeCondition: CONDITIONS[current]?.id,
                masterProgress: self.progress,
                activeIdx: current,
                outgoingActor: current > 0 ? CONDITIONS[current - 1]?.id : null,
                incomingActor: current < 3 ? CONDITIONS[current + 1]?.id : null,
                outerFrameTransform: currFrame ? window.getComputedStyle(currFrame).transform : 'none',
                innerImageTransform: currImg ? window.getComputedStyle(currImg).transform : 'none',
                typeTransform: currType ? window.getComputedStyle(currType).transform : 'none',
              };

              window.__PX_DEBUG__.home = {
                dominantScene: CONDITIONS[current]?.id || 'precision',
                dominantWeight: 0.85,
                majorOwnerCount: 1,
              };
            }
          },
        },
      });

      // Initial state: Panel 0 active, others prepared off-stage
      panels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { opacity: 1, xPercent: 0, pointerEvents: 'auto', zIndex: 5 });
        } else {
          gsap.set(panel, { opacity: 0, xPercent: 30, pointerEvents: 'none', zIndex: 1 });
        }
      });

      // Choreography across 3 transitions:
      // READ -> ANTICIPATE -> TRAVEL -> HOLD -> OVERLAP -> TAKEOVER -> RESOLVE -> READ
      for (let i = 0; i < 3; i++) {
        const curr = panels[i];
        const next = panels[i + 1];
        if (!curr || !next) continue;

        const currFrame = curr.querySelector('.pa-px-condition-silhouette__media-frame');
        const currImg = curr.querySelector('img');
        const currType = curr.querySelector('.pa-px-condition-silhouette__typography');

        const nextFrame = next.querySelector('.pa-px-condition-silhouette__media-frame');
        const nextImg = next.querySelector('img');
        const nextType = next.querySelector('.pa-px-condition-silhouette__typography');
        const nextDetail = next.querySelector('.pa-px-condition-silhouette__detail-plane');

        const slotStart = i;

        // ANTICIPATE: 0.12 - 0.24 (Subtle edge entrance)
        masterTl.set(next, { zIndex: 6, pointerEvents: 'auto' }, slotStart + 0.12);
        if (nextFrame) {
          masterTl.fromTo(
            nextFrame,
            { xPercent: 16, opacity: 0.2, scale: 0.94 },
            { xPercent: 8, opacity: 0.5, scale: 0.96, duration: 0.12, ease: 'power1.out' },
            slotStart + 0.12
          );
        }

        // TRAVEL: 0.24 - 0.44 (Outer frame translates left, inner crop shifts)
        if (currFrame) {
          masterTl.to(currFrame, {
            xPercent: -16,
            duration: 0.20,
            ease: 'power2.inOut',
          }, slotStart + 0.24);
        }
        if (currImg) {
          masterTl.to(currImg, {
            xPercent: 14,
            scale: 1.05,
            duration: 0.20,
            ease: 'none',
          }, slotStart + 0.24);
        }
        if (currType) {
          masterTl.to(currType, {
            x: -30,
            opacity: 0.4,
            duration: 0.20,
            ease: 'power1.in',
          }, slotStart + 0.24);
        }

        // HOLD: 0.44 - 0.56 (Frame holds nearly stationary while crop drifts)
        if (currImg) {
          masterTl.to(currImg, {
            xPercent: 20,
            duration: 0.12,
            ease: 'none',
          }, slotStart + 0.44);
        }

        // OVERLAP: 0.52 - 0.72 (Both scenes coexist with 20-40% incoming visibility)
        masterTl.fromTo(
          next,
          { opacity: 0.5, xPercent: 12 },
          { opacity: 1, xPercent: 0, duration: 0.20, ease: 'power2.out' },
          slotStart + 0.52
        );
        if (nextFrame) {
          masterTl.to(nextFrame, {
            xPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.20,
            ease: 'power3.out',
          }, slotStart + 0.52);
        }
        if (nextImg) {
          masterTl.fromTo(
            nextImg,
            { scale: 1.06, xPercent: -10 },
            { scale: 1, xPercent: 0, duration: 0.22, ease: 'none' },
            slotStart + 0.52
          );
        }

        // TAKEOVER: 0.72 - 0.86 (Incoming becomes dominant)
        masterTl.to(curr, {
          opacity: 0,
          xPercent: -30,
          duration: 0.14,
          ease: 'power2.in',
        }, slotStart + 0.72);

        // RESOLVE: 0.86 - 1.00 (Incoming snaps into place)
        masterTl.set(curr, { pointerEvents: 'none', zIndex: 1 }, slotStart + 0.86);
        if (nextType) {
          masterTl.fromTo(
            nextType,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.14, ease: 'power2.out' },
            slotStart + 0.86
          );
        }
        if (nextDetail) {
          masterTl.fromTo(
            nextDetail,
            { opacity: 0, xPercent: 16, scale: 0.94 },
            { opacity: 1, xPercent: 0, scale: 1, duration: 0.16, ease: 'power3.out' },
            slotStart + 0.84
          );
        }
      }
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile, isTouch]);

  return (
    <section
      ref={containerRef}
      className="pa-px-ch-conditions pa-px-conditions-pinned-stage"
      aria-label="Professional Conditions Working Contexts"
    >
      <div className="pa-px-conditions-stage__header">
        <h2 className="pa-px-conditions-stage__title">
          THE SAME PATTERN READS DIFFERENTLY AT WORK.
        </h2>
        <div className="pa-px-conditions-progress-dots" aria-hidden="true">
          {CONDITIONS.map((c, idx) => (
            <span
              key={c.id}
              className={`pa-px-cond-dot ${activeIdx === idx ? 'pa-px-cond-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Authored Multi-Plane Stage (Desktop Pinned / Mobile Native Swipe-Snap Rail) */}
      <div ref={stageRef} className="pa-px-conditions-stage__viewport">
        {CONDITIONS.map((cond, idx) => {
          const isPressure = cond.id === 'pressure';

          return (
            <article
              key={cond.id}
              ref={(el) => (panelsRef.current[idx] = el)}
              className={`pa-px-condition-silhouette pa-px-condition-silhouette--${cond.id} ${cond.silhouetteClass}`}
              data-condition-id={cond.id}
              aria-hidden={!isMobile && !isTouch && activeIdx !== idx ? 'true' : 'false'}
              aria-label={`${cond.name} working condition`}
            >
              <div className="pa-px-condition-silhouette__layout">
                {/* 1. Distinct Outer Media Plane */}
                <div className="pa-px-condition-silhouette__media-plane">
                  <div className="pa-px-condition-silhouette__media-frame">
                    <PublicPicture
                      assetKey={cond.mediaKey}
                      alt={`Working context: ${cond.name}`}
                      priority={idx === 0}
                    />
                  </div>

                  {/* Secondary Overlapping Human Detail Plane for Operational Pressure */}
                  {isPressure && cond.detailMediaKey && (
                    <div className="pa-px-condition-silhouette__detail-plane">
                      <PublicPicture
                        assetKey={cond.detailMediaKey}
                        alt="Control room human detail under operational pressure"
                      />
                    </div>
                  )}
                </div>

                {/* 2. Typographic Window: Statement Only, No Paragraph Walls */}
                <div className="pa-px-condition-silhouette__typography">
                  <div className="pa-px-condition-silhouette__badge">
                    {cond.name}
                  </div>
                  <h3 className="pa-px-condition-silhouette__interp">
                    {cond.statement}
                  </h3>
                  <div className="pa-px-condition-silhouette__source-anchor">
                    &ldquo;{cond.sourceFragment}&rdquo;
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProfessionalConditionsJourney;
