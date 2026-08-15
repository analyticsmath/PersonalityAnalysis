import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import PublicMotionRoot from './PublicMotionRoot';

const primaryNav = [
  ['How it works', '/how-it-works'],
  ['Career intelligence', '/career-intelligence'],
  ['Progress', '/progress'],
  ['Methodology', '/methodology'],
  ['Trust', '/trust'],
];

const footerNav = [
  ['How it works', '/how-it-works'],
  ['Career intelligence', '/career-intelligence'],
  ['Progress', '/progress'],
  ['Methodology', '/methodology'],
  ['Trust', '/trust'],
  ['Privacy', '/privacy'],
  ['Sign in', '/login'],
];

export function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" fill="none" className="public-arrow-icon" width="16" height="16">
      <path d="M3 9h11M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState('light');
  const toggle = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => setOpen(false), [location.pathname]);

  // Track scroll position for header surface reveal
  useEffect(() => {
    const handleScroll = () => {
      const isPastHero = window.scrollY > 120;
      setScrolled(isPastHero);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header tone observer for explicit route scenes
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll('[data-header-scene]'));
    if (!scenes.length) {
      if (location.pathname === '/career-intelligence') {
        setTone('dark');
      } else {
        setTone('light');
      }
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          const topScene = intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (topScene) {
            setTone(topScene.target.dataset.headerScene || 'light');
          }
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: [0.1, 0.5] }
    );

    scenes.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  // Mobile menu body lock and escape key
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

  const headerClass = [
    'public-header',
    `public-header--${tone}`,
    isHome && !scrolled ? 'public-header--hero-transparent' : 'public-header--scrolled',
    open ? 'is-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClass}>
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
          <Link className="public-cta-button public-cta-button--primary" to="/signup">
            Build my profile
          </Link>
        </div>

        <button
          ref={toggle}
          type="button"
          className="public-menu-trigger"
          aria-expanded={open}
          aria-controls="public-nav"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {open && (
        <div className="public-header__mobile-overlay" onClick={() => setOpen(false)}>
          <div className="public-header__mobile-panel" onClick={(e) => e.stopPropagation()}>
            <div className="public-header__mobile-head">
              <span className="public-brand__name">Personality Assessor</span>
              <button
                type="button"
                className="public-mobile-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <nav className="public-header__mobile-links" aria-label="Mobile navigation">
              {primaryNav.map(([label, to]) => (
                <NavLink key={to} to={to} onClick={() => setOpen(false)}>
                  {label}
                </NavLink>
              ))}
              <NavLink to="/privacy" onClick={() => setOpen(false)}>
                Privacy
              </NavLink>
            </nav>
            <div className="public-header__mobile-actions">
              <Link
                className="public-cta-button public-cta-button--primary public-cta-button--wide"
                to="/signup"
                onClick={() => setOpen(false)}
              >
                Build my profile
              </Link>
              <Link
                className="public-header__signin public-header__signin--mobile"
                to="/login"
                onClick={() => setOpen(false)}
              >
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
              Build a profile<br />
              you can return to.
            </h2>
            <p className="public-terminal-footer__supporting">
              Your work changes. Your evidence can change with it.
            </p>
            <div className="public-terminal-footer__cta-wrap">
              <Link className="public-cta-button public-cta-button--inverted" to="/signup">
                Build my profile <Arrow />
              </Link>
              <Link className="public-terminal-footer__signin-link" to="/login">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="public-terminal-footer__subordinate">
          <div className="public-terminal-footer__brand-row">
            <span className="public-brand__name">Personality Assessor</span>
            <p className="public-terminal-footer__notice">
              Professional reflection and career exploration. Not clinical diagnosis, an HR gatekeeping mechanism, or a guarantee of employment success.
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
        <div className="public-content-flow">
          {children}
          {footerMode !== 'integrated' && <PublicFooter />}
        </div>
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
  artDirectedMobile = false,
}) {
  if (!mediaItem || !mediaItem.file) {
    return null;
  }

  const isV3 = mediaItem.v3 ?? true;
  const folder = mediaItem.folder || 'hero';
  const file = mediaItem.file;

  const isHero = file.includes('hero-a') || file.includes('hero-b') || file.includes('hero-h1');
  const widths = isHero ? [640, 960, 1440, 1920, 2560] : [640, 960, 1440, 1920];
  const base = isV3 ? `/media/personality-v3/${folder}/${file}` : `/media/personality-v2/${folder}/${file}`;
  const srcSet = (ext) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');

  const mobileBase = `${base}-mobile`;

  return (
    <picture className={`responsive-evidence-image ${className}`.trim()}>
      {artDirectedMobile && (
        <>
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet={`${mobileBase}-480.webp 480w, ${mobileBase}-720.webp 720w`}
            sizes="92vw"
          />
          <source
            media="(max-width: 767px)"
            srcSet={`${mobileBase}-480.jpg 480w, ${mobileBase}-720.jpg 720w`}
            sizes="92vw"
          />
        </>
      )}
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
