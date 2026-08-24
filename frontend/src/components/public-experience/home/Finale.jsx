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
      const f1 = containerRef.current.querySelector('.pa-px-finale__fragment-1');
      const f2 = containerRef.current.querySelector('.pa-px-finale__fragment-2');
      const f3 = containerRef.current.querySelector('.pa-px-finale__fragment-3');
      const title = containerRef.current.querySelector('.pa-px-finale__title');
      const phrase = containerRef.current.querySelector('.pa-px-finale__resolved-phrase');
      const actions = containerRef.current.querySelector('.pa-px-finale__actions');

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

      // Spatial multi-plane reconstruction & pullback
      tl.fromTo(f1, { x: '-80px', scale: 0.9, opacity: 0.3 }, { x: '0px', scale: 1, opacity: 0.85, duration: 0.8 }, 0)
        .fromTo(f2, { y: '80px', scale: 0.9, opacity: 0.3 }, { y: '0px', scale: 1, opacity: 0.85, duration: 0.8 }, 0.1)
        .fromTo(f3, { x: '80px', scale: 0.9, opacity: 0.3 }, { x: '0px', scale: 1, opacity: 0.85, duration: 0.8 }, 0.2)
        .fromTo(title, { y: '40px', fontVariationSettings: "'wdth' 95, 'opsz' 72" }, { y: '0px', fontVariationSettings: "'wdth' 82, 'opsz' 96", duration: 0.6 }, 0.2)
        .fromTo(phrase, { opacity: 0, y: '30px' }, { opacity: 0.9, y: '0px', duration: 0.5 }, 0.4)
        .fromTo(actions, { opacity: 0, y: '20px' }, { opacity: 1, y: '0px', duration: 0.5 }, 0.5);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-finale-section" aria-label="Finale & Reconstruction">
      <div className="pa-px-finale-stage">
        {/* Reconstructed Asymmetric Environmental Fragments */}
        <div className="pa-px-finale__mosaic-field">
          <div className="pa-px-finale__fragment pa-px-finale__fragment-1">
            <PublicPicture assetKey="workworldPrecision" alt="Precision environment fragment" />
          </div>
          <div className="pa-px-finale__fragment pa-px-finale__fragment-2">
            <PublicPicture assetKey="workworldAutonomy" alt="Autonomy environment fragment" />
          </div>
          <div className="pa-px-finale__fragment pa-px-finale__fragment-3">
            <PublicPicture assetKey="workworldCollaboration" alt="Collaboration environment fragment" />
          </div>
        </div>

        {/* Integrated Editorial Resolution */}
        <div className="pa-px-finale__editorial-resolution">
          <p className="pa-px-finale__resolved-phrase">
            "I clarify the constraints first, then choose the smallest reversible step."
          </p>

          <h2 className="pa-px-finale__title">{data.headline}</h2>
          <p className="pa-px-finale__support">{data.support}</p>

          <div className="pa-px-finale__actions">
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
