import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const ProfessionalConditionsJourney = () => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const panelsRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const data = PUBLIC_CONTENT.home.workworlds;
  const { prefersReducedMotion, isMobile, isTouch } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || isMobile || isTouch || !containerRef.current || !stageRef.current) return;

    const container = containerRef.current;
    const panels = panelsRef.current.filter(Boolean);
    if (!panels.length) return;

    const ctx = gsap.context(() => {
      // 4 Conditions -> 3 Handoffs. Total scroll distance: ~300vh
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=300%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const raw = self.progress * 3;
            const current = Math.min(3, Math.floor(raw));
            setActiveIdx(current);
          },
        },
      });

      // Initial state: Panel 0 active, others prepared off-stage
      panels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { opacity: 1, xPercent: 0, pointerEvents: 'auto', zIndex: 5 });
        } else {
          gsap.set(panel, { opacity: 0, xPercent: 35, pointerEvents: 'none', zIndex: 1 });
        }
      });

      // Choreography across 3 transitions:
      // i = 0 -> 1 (Precision to Autonomy)
      // i = 1 -> 2 (Autonomy to Collaboration)
      // i = 2 -> 3 (Collaboration to Operational Pressure)
      for (let i = 0; i < 3; i++) {
        const curr = panels[i];
        const next = panels[i + 1];
        if (!curr || !next) continue;

        const currFrame = curr.querySelector('.pa-px-condition-silhouette__media-frame');
        const currImg = curr.querySelector('img');
        const currType = curr.querySelector('.pa-px-condition-silhouette__typography');
        const currResidue = curr.querySelector('.pa-px-condition-silhouette__residue');

        const nextFrame = next.querySelector('.pa-px-condition-silhouette__media-frame');
        const nextImg = next.querySelector('img');
        const nextType = next.querySelector('.pa-px-condition-silhouette__typography');
        const nextDetail = next.querySelector('.pa-px-condition-silhouette__detail-plane');

        const startProgress = i;

        // 1. Anticipation & Travel A (0.08 - 0.31 of slot)
        // Current frame begins translating left, inner crop shifts at counter-velocity
        if (currFrame) {
          masterTl.to(currFrame, {
            xPercent: -20,
            duration: 0.35,
            ease: 'power2.in',
          }, startProgress + 0.1);
        }
        if (currImg) {
          masterTl.to(currImg, {
            xPercent: 12,
            scale: 1.05,
            duration: 0.45,
            ease: 'none',
          }, startProgress + 0.1);
        }
        if (currType) {
          masterTl.to(currType, {
            x: -45,
            opacity: 0.4,
            duration: 0.3,
            ease: 'power1.in',
          }, startProgress + 0.15);
        }

        // 2. Evidence Hold & Overlap (0.35 - 0.65 of slot)
        // Incoming actor becomes visible, advances into frame while old remains as residue
        masterTl.set(next, { zIndex: 6, pointerEvents: 'auto' }, startProgress + 0.35);
        masterTl.fromTo(
          next,
          { opacity: 0, xPercent: 30 },
          { opacity: 1, xPercent: 0, duration: 0.45, ease: 'power2.out' },
          startProgress + 0.35
        );

        if (nextFrame) {
          masterTl.fromTo(
            nextFrame,
            { scale: 0.94, yPercent: 4 },
            { scale: 1, yPercent: 0, duration: 0.45, ease: 'power3.out' },
            startProgress + 0.38
          );
        }
        if (nextImg) {
          masterTl.fromTo(
            nextImg,
            { scale: 1.08, yPercent: -6 },
            { scale: 1, yPercent: 0, duration: 0.55, ease: 'none' },
            startProgress + 0.38
          );
        }

        // 3. Takeover & Resolve (0.65 - 1.00 of slot)
        // Outgoing actor fades out cleanly, incoming typography counter-travels into reading window
        masterTl.to(curr, {
          opacity: 0,
          xPercent: -35,
          duration: 0.3,
          ease: 'power2.in',
        }, startProgress + 0.55);
        masterTl.set(curr, { pointerEvents: 'none', zIndex: 1 }, startProgress + 0.85);

        if (nextType) {
          masterTl.fromTo(
            nextType,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
            startProgress + 0.6
          );
        }

        if (nextDetail) {
          masterTl.fromTo(
            nextDetail,
            { opacity: 0, xPercent: 20, scale: 0.95 },
            { opacity: 1, xPercent: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
            startProgress + 0.68
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
      aria-label="Flagship Multi-Plane Professional Conditions Journey"
    >
      <div className="pa-px-conditions-stage__header">
        <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '6px' }}>
          FLAGSHIP PARALLAX MOTION &middot; 4 WORK CONDITIONS
        </div>
        <h2 className="pa-px-conditions-stage__title">{data.headline}</h2>
        <div className="pa-px-conditions-progress-dots" aria-hidden="true">
          {data.conditions.map((c, idx) => (
            <span
              key={c.id}
              className={`pa-px-cond-dot ${activeIdx === idx ? 'pa-px-cond-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Authored Multi-Plane Stage (Desktop Pinned / Mobile Native Touch Rail) */}
      <div ref={stageRef} className="pa-px-conditions-stage__viewport">
        {data.conditions.map((cond, idx) => {
          const isPrecision = cond.id === 'precision';
          const isAutonomy = cond.id === 'autonomy';
          const isCollaboration = cond.id === 'collaboration';
          const isPressure = cond.id === 'pressure';

          return (
            <div
              key={cond.id}
              ref={(el) => (panelsRef.current[idx] = el)}
              className={`pa-px-condition-silhouette pa-px-condition-silhouette--${cond.id}`}
              data-condition-id={cond.id}
              aria-hidden={!isMobile && !isTouch && activeIdx !== idx ? 'true' : 'false'}
            >
              <div className="pa-px-condition-silhouette__layout">
                {/* 1. Outer Media Frame + Inner Parallax Crop */}
                <div className="pa-px-condition-silhouette__media-plane">
                  <div className="pa-px-condition-silhouette__media-frame">
                    <PublicPicture
                      assetKey={cond.mediaKey}
                      alt={`Professional working context: ${cond.name}`}
                      priority={idx === 0}
                    />
                  </div>

                  {/* Secondary Foreground / Detail Plane for Operational Pressure */}
                  {isPressure && (
                    <div className="pa-px-condition-silhouette__detail-plane">
                      <PublicPicture
                        assetKey="workworldPressureHuman"
                        alt="Control room human detail"
                      />
                    </div>
                  )}
                </div>

                {/* 2. Counter-Moving Typographic Reading Window */}
                <div className="pa-px-condition-silhouette__typography">
                  <div className="pa-px-data pa-px-condition-silhouette__badge">
                    0{idx + 1} &middot; {cond.name}
                  </div>
                  <h3 className="pa-px-condition-silhouette__interp">
                    {cond.interpretation}
                  </h3>
                  <p className="pa-px-condition-silhouette__detail">
                    {cond.detail}
                  </p>

                  <div className="pa-px-condition-silhouette__source-anchor">
                    <span className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>
                      HELD SOURCE ANCHOR:
                    </span>
                    <span className="pa-px-body-sm" style={{ fontStyle: 'italic', display: 'block', marginTop: '2px' }}>
                      &ldquo;I clarify the constraints first...&rdquo;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProfessionalConditionsJourney;
