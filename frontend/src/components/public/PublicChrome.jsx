import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import PublicMotionRoot from './PublicMotionRoot';

const nav = [['How it works', '/how-it-works'], ['Career intelligence', '/career-intelligence'], ['Progress', '/progress'], ['Methodology', '/methodology']];
export function PublicHeader() {
  const [open, setOpen] = useState(false); const [tone, setTone] = useState('light'); const toggle = useRef(null); const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const onKey = (event) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [open]);
  useEffect(() => {
    let frame;
    const updateTone = () => {
      frame = 0;
      const beneath = document.elementFromPoint(window.innerWidth * 0.5, 78)?.closest('[data-header-tone]');
      setTone(beneath?.dataset.headerTone === 'dark' ? 'dark' : 'light');
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateTone); };
    updateTone(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [location.pathname]);
  return <header className={`pa-header pa-header--${tone} ${open ? 'is-menu-open' : ''}`}>
    <Link className="pa-brand" to="/">Personality Assessor</Link>
    <nav id="pa-menu-links" className={open ? 'is-open' : ''} aria-label="Primary navigation">{nav.map(([label, to]) => <NavLink key={to} to={to}>{label}</NavLink>)}<Link className="pa-mobile-cta" to="/signup">Build my profile</Link></nav>
    <div className="pa-header__actions"><Link to="/login">Sign in</Link><Link className="pa-button pa-button--primary" to="/signup">Build my profile</Link></div>
    <button ref={toggle} type="button" className="pa-menu" aria-expanded={open} aria-controls="pa-menu-links" onClick={() => setOpen((value) => !value)}>{open ? 'Close' : 'Menu'}</button>
  </header>;
}
export function PublicFooter({ integrated = false }) { return <footer className={`pa-footer ${integrated ? 'pa-footer--integrated' : ''}`}><div><Link className="pa-brand" to="/">Personality Assessor</Link><p>Professional self-understanding and career intelligence built from context, assessment evidence and explainable comparison.</p></div><nav aria-label="Product"><b>Product</b>{nav.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</nav><nav aria-label="Trust"><b>Trust</b><Link to="/trust">Trust &amp; transparency</Link><Link to="/privacy">Privacy</Link></nav><nav aria-label="Account"><b>Account</b><Link to="/login">Sign in</Link><Link to="/signup">Build my profile</Link></nav></footer>; }
export function PublicLayout({ children, page, footerMode = 'standard' }) { return <div className="pa-public" data-page={page}><a className="pa-skip" href="#main-content">Skip to content</a><PublicHeader /><PublicMotionRoot>{children}{footerMode !== 'integrated' && <PublicFooter />}</PublicMotionRoot></div>; }
export function ResponsiveImage({ media, folder = 'work', className, alt = '', priority = false, sizes = '(min-width: 1100px) 60vw, 90vw' }) { const path = `/media/personality/${folder}/${media.file}`; const srcSet = (extension) => [640, 960, 1440, 1920].map((width) => `${path}-${width}.${extension} ${width}w`).join(', '); return <picture className={className}><source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} /><source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} /><img src={`${path}.jpg`} width={media.width} height={media.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding={priority ? 'sync' : 'async'} style={{ objectPosition: media.position }} alt={alt} /></picture>; }
