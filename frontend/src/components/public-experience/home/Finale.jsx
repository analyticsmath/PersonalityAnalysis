import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';
import { registerSceneProgress } from '../motion/scrollState';

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
          scrub: true, // Immediate 1:1 scrub
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            registerSceneProgress('home-finale', self.progress, true);
          },
        },
      });

      // 0.10: First fragment returns
      // 0.25: Second fragment
      // 0.35: Source phrase returns
      // 0.45 - 0.65: Spatial pullback & climax
      // 0.70: Final statement resolves
      // 0.82: Primary CTA appears
      // 0.90: Quiet rest
      tl.fromTo(f1,
        { xPercent: -25, scale: 0.88, opacity: 0.5 },
        { xPercent: 0, scale: 1, opacity: 0.92, ease: 'none' },
        0
      )
      .fromTo(f2,
        { yPercent: 30, scale: 0.88, opacity: 0.5 },
        { yPercent: 0, scale: 1, opacity: 0.92, ease: 'none' },
        0.08
      )
      .fromTo(f3,
        { xPercent: 25, scale: 0.88, opacity: 0.5 },
        { xPercent: 0, scale: 1, opacity: 0.92, ease: 'none' },
        0.16
      )
      .fromTo(phrase,
        { opacity: 0, yPercent: 30 },
        { opacity: 1, yPercent: 0, ease: 'none' },
        0.25
      )
      .fromTo(title,
        { yPercent: 30, fontVariationSettings: "'wdth' 92, 'opsz' 72" },
        { yPercent: 0, fontVariationSettings: "'wdth' 80, 'opsz' 96", ease: 'none' },
        0.35
      )
      .fromTo(actions,
        { opacity: 0, yPercent: 20 },
        { opacity: 1, yPercent: 0, ease: 'none' },
        0.55
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-finale-section" aria-label="Finale & Reconstruction" data-scene-id="home-finale">
      <div className="pa-px-finale-stage">
        {/* Reconstructed Asymmetric Environmental Fragments (Irregular scales: 1.2fr, 0.8fr, 1.1fr) */}
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
