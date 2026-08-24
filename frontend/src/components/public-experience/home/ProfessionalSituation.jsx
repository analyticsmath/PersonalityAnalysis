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
      const prompt = containerRef.current.querySelector('.pa-px-home-situation__prompt');
      const response = containerRef.current.querySelector('.pa-px-home-situation__response');
      const media = containerRef.current.querySelector('.pa-px-home-situation__media');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          fastScrollEnd: true,
        },
      });

      tl.fromTo(prompt, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo(response, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, '+=0.1')
        .to(media, { scale: 1.08, opacity: 0.65, duration: 0.8 }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-home-situation" aria-label="The Professional Situation">
      <div className="pa-px-home-situation__stage">
        <div className="pa-px-home-situation__media">
          <PublicPicture assetKey="homeSituationDetail" alt="Analytical inspection of materials" />
        </div>

        <div className="pa-px-home-situation__dialogue">
          <div className="pa-px-context-data" style={{ color: 'var(--px-soft)' }}>
            Observed Professional Inquiry
          </div>
          <h2 className="pa-px-home-situation__prompt">{data.prompt}</h2>
          <blockquote className="pa-px-home-situation__response">
            "{data.response}"
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSituation;
