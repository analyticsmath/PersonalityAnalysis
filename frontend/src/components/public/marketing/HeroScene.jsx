import { Link } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';
import { ResponsiveImage } from '../PublicChrome';
import { motion, publicMedia } from './publicContent';

export default function HeroScene() {
  const root = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const context = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo('.pa-hero__media img', { scale: 1.025 }, { scale: 1, duration: motion.hero, ease: 'power3.out' })
        .fromTo('.pa-hero__line', { yPercent: 105 }, { yPercent: 0, duration: 0.85, stagger: 0.10, ease: 'power3.out' }, 0.08)
        .fromTo('.pa-hero__support', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.70, ease: 'power3.out' }, 0.22);
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return <section ref={root} className="pa-hero" data-header-tone="dark" aria-labelledby="public-title">
    <ResponsiveImage className="pa-hero__media" media={publicMedia.work[1]} alt="A professional working through software at a desk" priority sizes="100vw" />
    <div className="pa-hero__copy">
      <h1 id="public-title"><span><span className="pa-hero__line">Your work</span></span><span><span className="pa-hero__line">has a pattern</span></span></h1>
    </div>
    <div className="pa-hero__support">
      <p>Add your CV or enter your background, then answer questions shaped around your field. Personality Assessor turns that evidence into a clearer picture of personality and career direction.</p>
      <div><Link className="pa-button pa-button--accent" to="/signup">Build my profile</Link><Link className="pa-button pa-button--light" to="/how-it-works">See how it works</Link></div>
    </div>
  </section>;
}
