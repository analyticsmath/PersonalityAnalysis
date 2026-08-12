import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const nav = [
  ['How it works', '/how-it-works'],
  ['Career intelligence', '/career-intelligence'],
  ['Progress', '/progress'],
  ['Methodology', '/methodology'],
];

export function Trace({ labels = [], className = '' }) {
  return <div className={`evidence-trace ${className}`} aria-hidden="true"><span />{labels.map((label) => <small key={label}>{label}</small>)}<i /></div>;
}

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return <header className="public-header">
    <Link className="public-brand" to="/">Personality<br />Assessor</Link>
    <nav id="public-menu-links" className={open ? 'is-open' : ''} aria-label="Primary navigation">{nav.map(([label, to]) => <NavLink key={to} to={to}>{label}</NavLink>)}</nav>
    <div className="public-header__actions"><Link to="/login">Sign in</Link><Link className="public-button public-button--signal" to="/signup">Start assessment</Link></div>
    <button ref={toggle} type="button" className="public-menu" aria-expanded={open} aria-controls="public-menu-links" onClick={() => setOpen((value) => !value)}>{open ? 'Close' : 'Menu'}</button>
  </header>;
}

export function PublicFooter() {
  return <footer className="public-footer">
    <Trace labels={['EVIDENCE', 'DIRECTION', 'TIME']} />
    <div><Link className="public-brand" to="/">Personality<br />Assessor</Link><p>Career intelligence built from evidence, not one answer.</p></div>
    <nav aria-label="Product"><b>Product</b>{nav.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</nav>
    <nav aria-label="Trust"><b>Trust</b><Link to="/trust">Trust</Link><Link to="/privacy">Privacy</Link></nav>
    <nav aria-label="Account"><b>Account</b><Link to="/login">Sign in</Link><Link to="/signup">Start assessment</Link></nav>
  </footer>;
}

export function PublicLayout({ children, page }) {
  return <div className="public-site" data-page={page}><a className="skip-link" href="#main-content">Skip to content</a><PublicHeader />{children}<PublicFooter /></div>;
}

export function ResponsiveImage({ media, folder = 'work', className, alt = '', priority = false, sizes = '(min-width: 1100px) 60vw, 90vw', style }) {
  const path = `/media/personality/${folder}/${media.file}`;
  return <picture className={className} style={style}>
    <source type="image/webp" srcSet={`${path}-480.webp 480w, ${path}-768.webp 768w, ${path}-1200.webp 1200w, ${path}-1600.webp 1600w`} sizes={sizes} />
    <img src={`${path}.jpg`} width={media.width} height={media.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding={priority ? 'sync' : 'async'} alt={alt} />
  </picture>;
}
