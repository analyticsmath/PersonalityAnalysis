import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const ProfessionalConditionsJourney = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const data = PUBLIC_CONTENT.home.workworlds;
  const { prefersReducedMotion, isMobile } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || isMobile || !containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;

    const scrollWidth = track.scrollWidth - window.innerWidth + 120;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth * 1.2}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  return (
    <section
      ref={containerRef}
      className="pa-px-ch-conditions"
      aria-label="Professional Conditions Journey"
    >
      <div className="pa-px-ch-conditions__header">
        <h2 className="pa-px-ch-conditions__title">{data.headline}</h2>
        <p className="pa-px-lead">
          How the same deliberate, constraint-first instinct performs across four distinct workplace environments.
        </p>
      </div>

      <div ref={trackRef} className="pa-px-conditions-track">
        {data.conditions.map((cond) => (
          <div
            key={cond.id}
            className={`pa-px-condition-panel pa-px-condition-panel--${cond.id}`}
          >
            <div className="pa-px-condition-panel__media-wrap">
              <PublicPicture
                assetKey={cond.mediaKey}
                alt={`Professional environment for ${cond.name}`}
              />
            </div>
            <div className="pa-px-condition-panel__body">
              <div className="pa-px-condition-panel__name">{cond.name}</div>
              <h3 className="pa-px-condition-panel__interp">{cond.interpretation}</h3>
              <p className="pa-px-condition-panel__detail">{cond.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalConditionsJourney;
