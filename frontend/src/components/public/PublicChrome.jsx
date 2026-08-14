import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import PublicMotionRoot from './PublicMotionRoot';

const primaryNav = [
  ['How it works', '/how-it-works'],
  ['Career intelligence', '/career-intelligence'],
  ['Methodology', '/methodology'],
  ['Trust', '/trust'],
];

const footerNav = [
  ['How it works', '/how-it-works'],
  ['Career intelligence', '/career-intelligence'],
  ['Methodology', '/methodology'],
  ['Trust', '/trust'],
  ['Privacy', '/privacy'],
  ['Sign in', '/login'],
];

export function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" fill="none" className="public-arrow-icon">
      <path d="M3 9h11M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll('[data-header-scene]'));
    if (!scenes.length) return undefined;
    const observer = new window.IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setTone(current.target.dataset.headerScene || 'light');
      },
      { rootMargin: '-1px 0px -76% 0px', threshold: [0, 0.15, 0.5] }
    );
    scenes.forEach((scene) => observer.observe(scene));
    setTone(scenes[0]?.dataset.headerScene || 'light');
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header className={`public-header public-header--${tone} ${open ? 'is-open' : ''}`}>
      <div className="public-header__inner">
        <Link className="public-brand" to="/" aria-label="Personality Assessor home">
          <span className="public-brand__name">Personality Assessor</span>
        </Link>

        <nav id="public-nav" className="public-header__nav" aria-label="Primary navigation">
          {primaryNav.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="public-header__actions">
          <Link className="public-header__signin" to="/login">
            Sign in
          </Link>
          <Link className="public-cta-button" to="/signup">
            Build my profile
          </Link>
        </div>

        <button
          ref={toggle}
          type="button"
          className="public-menu-trigger"
          aria-expanded={open}
          aria-controls="public-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {open && (
        <div className="public-header__mobile-overlay" onClick={() => setOpen(false)}>
          <div className="public-header__mobile-panel" onClick={(e) => e.stopPropagation()}>
            <nav className="public-header__mobile-links" aria-label="Mobile navigation">
              {primaryNav.map(([label, to]) => (
                <NavLink key={to} to={to} onClick={() => setOpen(false)}>
                  {label}
                </NavLink>
              ))}
              <NavLink to="/progress" onClick={() => setOpen(false)}>
                Progress
              </NavLink>
              <NavLink to="/privacy" onClick={() => setOpen(false)}>
                Privacy
              </NavLink>
            </nav>
            <div className="public-header__mobile-actions">
              <Link className="public-cta-button public-cta-button--wide" to="/signup" onClick={() => setOpen(false)}>
                Build my profile
              </Link>
              <Link className="public-header__signin" to="/login" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function PublicFooter({ integrated = false }) {
  return (
    <footer className={`public-terminal-footer ${integrated ? 'is-integrated' : ''}`} data-header-scene="dark">
      <div className="public-terminal-footer__inner">
        <div className="public-terminal-footer__scene">
          <div className="public-terminal-footer__lead">
            <h2 className="public-terminal-footer__headline">
              Bring new<br />
              evidence<br />
              back.
            </h2>
            <p className="public-terminal-footer__supporting">
              Your profile can change when your work does.
            </p>
            <div className="public-terminal-footer__cta-wrap">
              <Link className="public-cta-button public-cta-button--inverted" to="/signup">
                Build my profile <Arrow />
              </Link>
            </div>
          </div>
        </div>

        <div className="public-terminal-footer__subordinate">
          <div className="public-terminal-footer__brand-row">
            <span className="public-brand__name">Personality Assessor</span>
            <p className="public-terminal-footer__notice">
              Professional reflection and career exploration. Not diagnosis, a hiring decision, or a guarantee of career success.
            </p>
          </div>
          <nav className="public-terminal-footer__nav" aria-label="Footer navigation">
            {footerNav.map(([label, to]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function PublicLayout({ children, page, footerMode = 'standard' }) {
  return (
    <div className="public-site-container" data-page={page}>
      <a className="public-skip-link" href="#main-content">
        Skip to content
      </a>
      <PublicHeader />
      <PublicMotionRoot>
        {children}
        {footerMode !== 'integrated' && <PublicFooter />}
      </PublicMotionRoot>
    </div>
  );
}

export function ResponsiveImage({
  media: mediaItem,
  className = '',
  alt = '',
  priority = false,
  sizes = '(min-width: 1100px) 60vw, 90vw',
}) {
  if (!mediaItem || !mediaItem.file) {
    return null;
  }

  const widths = mediaItem.file === 'hero-h1' ? [640, 960, 1440, 1920, 2560] : [640, 960, 1440, 1920];
  const base = `/media/personality-v2/${mediaItem.folder}/${mediaItem.file}`;
  const srcSet = (extension) => widths.map((width) => `${base}-${width}.${extension} ${width}w`).join(', ');

  return (
    <picture className={`responsive-evidence-image ${className}`.trim()}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`${base}-1440.jpg`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        style={{ objectPosition: mediaItem.position || '50% 50%' }}
        alt={alt || mediaItem.alt || ''}
      />
    </picture>
  );
}
