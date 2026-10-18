import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CinemaLink } from './CinematicPublicShell';
import './siteIndex.css';

const MEDIA = '/media/public-experience/digital/';
const DESTINATIONS = [
  ['/', 'The beginning', 'designer', 'Understand the patterns. Explore the possibilities.'],
  ['/how-it-works', 'How it works', 'wireframe', 'From the words you share to a picture you can inspect.'],
  ['/career-intelligence', 'Career intelligence', 'studio', 'See how your evidence meets different working worlds.'],
  ['/progress', 'Progress', 'collaborate', 'A later perspective. An earlier record, kept in view.'],
  ['/trust', 'Trust & evidence', 'code-detail', 'Know what was supplied, inferred and calculated.'],
  ['/methodology', 'Methodology', 'wireframe', 'The models, contribution weights and limits behind the picture.'],
];

export default function SiteIndex({ pathname, onClose, closeRef, drawerRef }) {
  const rootRef = useRef(null);
  const [preview, setPreview] = useState(() => Math.max(0, DESTINATIONS.findIndex(([path]) => path === pathname)));

  useEffect(() => {
    const root = rootRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    let closing = false;
    const context = gsap.context(() => {
      if (!reduce) {
        gsap.fromTo(root, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.85, ease: 'power3.inOut' });
        gsap.from('.vt-site-index__link-text', { yPercent: 110, duration: 1.05, stagger: 0.065, delay: 0.24, ease: 'power3.out' });
        gsap.from('.vt-site-index__preview, .vt-site-index__bottom', { opacity: 0, y: 18, duration: 0.9, stagger: 0.08, delay: 0.4, ease: 'power2.out' });
      }
    }, root);
    closeRef.current = () => {
      if (closing) return;
      closing = true;
      if (reduce) onClose();
      else gsap.to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'power3.inOut', overwrite: true, onComplete: onClose });
    };
    return () => {
      closeRef.current = null;
      gsap.killTweensOf(root);
      context.revert();
    };
  }, [closeRef, onClose]);

  return <div ref={rootRef} className="vt-site-index" data-lenis-prevent>
    <aside id="vt-site-index" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Explore Personality Assessor">
      <div className="vt-site-index__top">
        <span className="vt-site-index__brand">Personality<span>Assessor</span></span>
        <button type="button" onClick={() => closeRef.current?.()} aria-label="Close menu">Close <span aria-hidden="true">×</span></button>
      </div>
      <div className="vt-site-index__body">
        <nav className="vt-site-index__nav" aria-label="Explore the website">
          {DESTINATIONS.map(([path, label], index) => <CinemaLink key={path} to={path}
            aria-current={pathname === path ? 'page' : undefined}
            className={pathname === path ? 'is-current' : ''} onClick={onClose}
            onMouseEnter={() => setPreview(index)} onFocus={() => setPreview(index)}>
            <span className="vt-site-index__link-mask"><span className="vt-site-index__link-text">{label}</span></span>
            <span className="vt-site-index__arrow" aria-hidden="true">↗</span>
          </CinemaLink>)}
        </nav>
        <div className="vt-site-index__preview" aria-hidden="true">
          <div className="vt-site-index__images">{DESTINATIONS.map(([path, , photo], index) => <img key={path} src={`${MEDIA}${photo}-960.webp`} alt="" loading="lazy" decoding="async" className={preview === index ? 'is-visible' : ''} />)}</div>
          <p>{DESTINATIONS[preview][3]}</p>
        </div>
      </div>
      <div className="vt-site-index__bottom">
        <div><CinemaLink to="/signup?next=%2Fassessment%2Fstart" onClick={onClose} className="vt-site-index__start">Build my profile <span aria-hidden="true">↗</span></CinemaLink><CinemaLink to="/login" onClick={onClose}>Sign in</CinemaLink></div>
        <CinemaLink to="/privacy" onClick={onClose}>Privacy & your record <span aria-hidden="true">↗</span></CinemaLink>
      </div>
    </aside>
  </div>;
}
