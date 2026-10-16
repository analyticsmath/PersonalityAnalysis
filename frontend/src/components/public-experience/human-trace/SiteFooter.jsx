import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './siteFooter.css';

gsap.registerPlugin(ScrollTrigger);

export default function SiteFooter({ LinkComponent: Link, navigation, pathname, onBackToTop }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion:no-preference)', () => {
      const context = gsap.context(() => {
        gsap.fromTo('.vt-final-footer__signature svg', { yPercent: 72 }, {
          yPercent: 0, ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 94%', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true },
        });
        gsap.fromTo('.vt-final-footer__top', { y: 28 }, {
          y: 0, ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 45%', scrub: 0.7 },
        });
      }, root);
      return () => context.revert();
    });
    return () => motion.revert();
  }, [pathname]);

  return <footer className="vt-final-footer" ref={rootRef}>
    <div className="vt-final-footer__top">
      <div className="vt-final-footer__purpose">
        <p>Understand yourself.<br/>See the work ahead.</p>
        <Link className="vt-final-footer__start" to="/signup?next=%2Fassessment%2Fstart">Build my profile <span aria-hidden="true">↗</span></Link>
      </div>
      <nav className="vt-final-footer__navigation" aria-label="Footer navigation">
        {navigation.map(([to, label]) => <Link to={to} key={to} aria-current={pathname === to ? 'page' : undefined}>{label}<span aria-hidden="true">↗</span></Link>)}
        <Link to="/login">Sign in <span aria-hidden="true">↗</span></Link>
      </nav>
    </div>

    <Link to="/" className="vt-final-footer__signature" aria-label="Personality Assessor home">
      <svg viewBox="0 0 1400 180" aria-hidden="true" focusable="false">
        <text x="0" y="143" textLength="1400" lengthAdjust="spacingAndGlyphs">Personality Assessor</text>
      </svg>
    </Link>

    <div className="vt-final-footer__bottom">
      <p>Professional insight. Not a clinical diagnosis.</p>
      <span>By Valtum Studio</span>
      <button type="button" onClick={onBackToTop}>Back to top <span aria-hidden="true">↑</span></button>
    </div>
  </footer>;
}
