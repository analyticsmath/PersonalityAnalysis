import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';

gsap.registerPlugin(ScrollTrigger);

export const Finale = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.finale;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mediaBg = containerRef.current.querySelector('.pa-px-home-finale__media-bg');
      const content = containerRef.current.querySelector('.pa-px-home-finale__content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          fastScrollEnd: true,
        },
      });

      tl.fromTo(mediaBg, { scale: 1.25, opacity: 0.15 }, { scale: 1, opacity: 0.45, duration: 1 })
        .fromTo(content, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.2);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-home-finale" aria-label="Finale">
      <div className="pa-px-home-finale__stage">
        <div className="pa-px-home-finale__media-bg">
          <PublicPicture assetKey="homeWorldEntry" alt="Architectural environment wide pullback" />
        </div>

        <div className="pa-px-home-finale__content">
          <span className="pa-px-context-data" style={{ color: 'var(--px-soft)' }}>
            Continuous Professional Observation
          </span>
          <h2 className="pa-px-home-finale__title">{data.headline}</h2>
          <p className="pa-px-home-finale__support">{data.support}</p>
          <div className="pa-px-home-finale__actions">
            <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
              {data.ctaPrimary}
            </Link>
            <Link to="/how-it-works" className="pa-px-btn-secondary">
              {data.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Finale;
