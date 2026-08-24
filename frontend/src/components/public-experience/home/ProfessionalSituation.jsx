import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const ProfessionalSituation = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.situation;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const promptEl = containerRef.current.querySelector('.pa-px-situation__prompt');
      const c1 = containerRef.current.querySelector('.pa-px-clause-1');
      const c2 = containerRef.current.querySelector('.pa-px-clause-2');
      const c3 = containerRef.current.querySelector('.pa-px-clause-3');
      const media = containerRef.current.querySelector('.pa-px-situation__media');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(promptEl, { y: '-40%', opacity: 0.3, ease: 'none' }, 0)
        .fromTo(c1, { y: '60px', opacity: 0.6, fontVariationSettings: "'wdth' 100, 'opsz' 48" }, { y: '0px', opacity: 1, fontVariationSettings: "'wdth' 85, 'opsz' 64", ease: 'none' }, 0.1)
        .fromTo(c2, { y: '100px', opacity: 0.4, fontVariationSettings: "'wdth' 90, 'opsz' 48" }, { y: '-20px', opacity: 1, fontVariationSettings: "'wdth' 100, 'opsz' 56", ease: 'none' }, 0.2)
        .fromTo(c3, { y: '140px', opacity: 0.2, fontVariationSettings: "'wdth' 80, 'opsz' 48" }, { y: '-40px', opacity: 1, fontVariationSettings: "'wdth' 75, 'opsz' 72", ease: 'none' }, 0.3)
        .to(media, { scale: 1.1, opacity: 0.75, ease: 'none' }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-situation-section" aria-label="The Professional Situation">
      <div className="pa-px-situation-stage">
        {/* Macro Environmental Inset */}
        <div className="pa-px-situation__media">
          <PublicPicture assetKey="homeSituationDetail" alt="Analytical inspection of materials in design studio" />
        </div>

        {/* Spatial Source Inquiry & Separating Semantic Clauses */}
        <div className="pa-px-situation__dialogue">
          <h2 className="pa-px-situation__prompt">{data.prompt}</h2>

          <div className="pa-px-situation__clauses-field" aria-label="Participant Response">
            <span className="pa-px-clause pa-px-clause-1">{data.clauses[0].text}</span>
            <span className="pa-px-clause pa-px-clause-2">{data.clauses[1].text}</span>
            <span className="pa-px-clause pa-px-clause-3">{data.clauses[2].text}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSituation;
