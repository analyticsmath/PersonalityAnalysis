import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress, registerActor } from '../motion/scrollState';

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
      const mediaWrap = containerRef.current.querySelector('.pa-px-situation__media');
      const mediaImg = containerRef.current.querySelector('.pa-px-situation__media img');
      const clausesField = containerRef.current.querySelector('.pa-px-situation__clauses-field');

      if (clausesField) {
        registerActor('source-phrase', {
          element: clausesField,
          text: data.clauses.map((c) => c.text).join(' '),
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // Deterministic 1:1 scrub
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            registerSceneProgress('home-situation', self.progress, true);
          },
        },
      });

      // Continuous spatial clause detachment across normalized timeline
      tl.to(promptEl, {
        yPercent: -25,
        opacity: 0.45,
        ease: 'none',
      }, 0)
      .to(mediaWrap, {
        scale: 1.08,
        ease: 'none',
      }, 0)
      .to(mediaImg, {
        yPercent: -10,
        ease: 'none',
      }, 0)
      .fromTo(c1,
        { yPercent: 40, opacity: 0.7, fontVariationSettings: "'wdth' 98, 'opsz' 48" },
        { yPercent: -10, opacity: 1, fontVariationSettings: "'wdth' 82, 'opsz' 64", ease: 'none' },
        0.1
      )
      .fromTo(c2,
        { yPercent: 70, opacity: 0.5, fontVariationSettings: "'wdth' 94, 'opsz' 48" },
        { yPercent: -20, opacity: 1, fontVariationSettings: "'wdth' 96, 'opsz' 56", ease: 'none' },
        0.2
      )
      .fromTo(c3,
        { yPercent: 100, opacity: 0.3, fontVariationSettings: "'wdth' 88, 'opsz' 48" },
        { yPercent: -35, opacity: 1, fontVariationSettings: "'wdth' 74, 'opsz' 72", ease: 'none' },
        0.35
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, data.clauses]);

  return (
    <section ref={containerRef} className="pa-px-situation-section" aria-label="The Professional Situation" data-scene-id="home-situation">
      <div className="pa-px-situation-stage">
        {/* Macro Environmental Inset with High-Res Photographic Depth */}
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
