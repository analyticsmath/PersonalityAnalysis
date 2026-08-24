import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';

gsap.registerPlugin(ScrollTrigger);

export const WorldEntry = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.worldEntry;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const media = containerRef.current.querySelector('.pa-px-home-entry__media-plane');
      const title = containerRef.current.querySelector('.pa-px-home-entry__title');
      const support = containerRef.current.querySelector('.pa-px-home-entry__support');
      const actions = containerRef.current.querySelector('.pa-px-home-entry__actions');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          fastScrollEnd: true,
        },
      });

      tl.to(media, { scale: 1.14, y: '6%', ease: 'none' }, 0)
        .to(title, { y: '-40%', opacity: 0.1, fontVariationSettings: "'wdth' 92, 'opsz' 96", ease: 'none' }, 0)
        .to(support, { y: '-25%', opacity: 0, ease: 'none' }, 0.1)
        .to(actions, { y: '20%', opacity: 0, ease: 'none' }, 0.15);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-home-entry" aria-label="World Entry">
      <div className="pa-px-home-entry__stage">
        <div className="pa-px-home-entry__media-plane">
          <PublicPicture assetKey="homeWorldEntry" alt="Design studio architecture environment" priority={true} />
        </div>

        <div className="pa-px-home-entry__content">
          <h1 className="pa-px-home-entry__title">{data.headline}</h1>
          <p className="pa-px-home-entry__support">{data.support}</p>
          <div className="pa-px-home-entry__actions">
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

export default WorldEntry;
