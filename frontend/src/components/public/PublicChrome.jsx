import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import PublicMotionRoot from './PublicMotionRoot';

const nav = [['How it works', '/how-it-works'], ['Career intelligence', '/career-intelligence'], ['Progress', '/progress'], ['Methodology', '/methodology'], ['Trust', '/trust']];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState('light');
  const toggle = useRef(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [open]);
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll('[data-header-scene]'));
    if (!scenes.length) return undefined;
    const observer = new window.IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setTone(current.target.dataset.headerScene || 'light');
    }, { rootMargin: '-1px 0px -76% 0px', threshold: [0, 0.15, 0.5] });
    scenes.forEach((scene) => observer.observe(scene));
    setTone(scenes[0].dataset.headerScene || 'light');
    return () => observer.disconnect();
  }, [location.pathname]);

  return <header className={`public-header public-header--${tone} ${open ? 'is-open' : ''}`}>
    <Link className="public-brand" to="/" aria-label="Personality Assessor home"><span aria-hidden="true" className="public-brand__mark"><i /><i /><i /><i /></span><span>Personality Assessor</span></Link>
    <nav id="public-nav" className="public-header__nav" aria-label="Primary navigation">{nav.map(([label, to]) => <NavLink key={to} to={to}>{label}</NavLink>)}<Link className="public-header__mobile-cta" to="/signup">Build my profile</Link></nav>
    <div className="public-header__actions"><Link to="/login">Sign in</Link><Link className="public-button public-button--light" to="/signup">Build my profile <Arrow /></Link></div>
    <button ref={toggle} type="button" className="public-menu" aria-expanded={open} aria-controls="public-nav" onClick={() => setOpen((value) => !value)}><span>{open ? 'Close' : 'Menu'}</span></button>
  </header>;
}

export function Arrow() { return <svg aria-hidden="true" viewBox="0 0 18 18" fill="none"><path d="M3 9h11M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

export function PublicFooter({ integrated = false }) {
  return <footer className={`public-footer ${integrated ? 'public-footer--integrated' : ''}`} data-header-scene="dark"><div className="public-footer__statement"><h2>Keep a profile that changes with your work.</h2><Link className="public-button public-button--light" to="/signup">Build my profile <Arrow /></Link></div><div className="public-footer__utilities"><Link className="public-brand" to="/"><span aria-hidden="true" className="public-brand__mark"><i /><i /><i /><i /></span><span>Personality Assessor</span></Link><nav aria-label="Footer navigation">{nav.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}<Link to="/privacy">Privacy</Link></nav><p>Professional reflection and career exploration. Not diagnosis, a hiring decision, or a guarantee of career success.</p></div></footer>;
}

export function PublicLayout({ children, page, footerMode = 'standard' }) {
  return <div className="public-site" data-page={page}><a className="public-skip" href="#main-content">Skip to content</a><PublicHeader /><PublicMotionRoot>{children}{footerMode !== 'integrated' && <PublicFooter />}</PublicMotionRoot></div>;
}

export function ResponsiveImage({ media, className, alt, priority = false, sizes = '(min-width: 1100px) 60vw, 90vw' }) {
  const widths = media.file === 'hero-h1' ? [640, 960, 1440, 1920, 2560] : [640, 960, 1440, 1920];
  const base = `/media/personality-v2/${media.folder}/${media.file}`;
  const srcSet = (extension) => widths.map((width) => `${base}-${width}.${extension} ${width}w`).join(', ');
  return <picture className={className}><source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} /><source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} /><img src={`${base}-1440.jpg`} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding={priority ? 'sync' : 'async'} style={{ objectPosition: media.position || '50% 50%' }} alt={alt || media.alt || ''} /></picture>;
}
