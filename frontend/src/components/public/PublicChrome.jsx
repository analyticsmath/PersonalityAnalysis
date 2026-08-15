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
  const [released, setReleased] = useState(false);
  const toggle = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => setOpen(false), [location.pathname]);

  // Deterministic route tone
  const tone = location.pathname === '/career-intelligence' ? 'dark' : 'light';

  // Homepage hero release detection: derives from hero element geometry rather than arbitrary 120px
  useEffect(() => {
    if (!isHome) {
      setReleased(true);
      return undefined;
    }

    const checkHeroRelease = () => {
      const heroEl = document.querySelector('.evidence-hero-v4');
      if (!heroEl) {
        setReleased(window.scrollY > 80);
        return;
      }
      const rect = heroEl.getBoundingClientRect();
      // Released when hero top half has scrolled past viewport
      setReleased(rect.bottom < window.innerHeight * 0.55);
    };

    window.addEventListener('scroll', checkHeroRelease, { passive: true });
    window.addEventListener('resize', checkHeroRelease, { passive: true });
    checkHeroRelease();

    return () => {
      window.removeEventListener('scroll', checkHeroRelease);
      window.removeEventListener('resize', checkHeroRelease);
    };
  }, [isHome]);

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
    isHome && !released ? 'public-header--hero-transparent' : 'public-header--scrolled',
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
          <span className="public-menu-trigger__bar" />
          <span className="public-menu-trigger__bar" />
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div className="public-mobile-panel" aria-hidden={!open}>
        <nav className="public-mobile-panel__nav">
          {primaryNav.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              {label}
            </NavLink>
          ))}
          <div className="public-mobile-panel__actions">
            <Link className="public-cta-button public-cta-button--primary public-cta-button--wide" to="/signup">
              Build my profile <Arrow />
            </Link>
            <Link className="public-cta-button public-cta-button--inverted public-cta-button--wide" to="/login">
              Sign in
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="public-footer" data-header-scene="dark">
      <div className="public-footer__inner">
        <div className="public-footer__top">
          <div className="public-footer__brand-block">
            <Link className="public-brand public-brand--dark" to="/" aria-label="Personality Assessor home">
              <span className="public-brand__name">Personality Assessor</span>
            </Link>
            <p className="public-footer__statement">
              Build a profile you can return to.
            </p>
            <p className="public-footer__note">
              Your work changes. Your evidence can change with it.
            </p>
          </div>

          <nav className="public-footer__nav" aria-label="Footer navigation">
            <div className="public-footer__col">
              <span className="public-footer__col-title">Navigation</span>
              {footerNav.slice(0, 4).map(([label, to]) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="public-footer__col">
              <span className="public-footer__col-title">Governance</span>
              {footerNav.slice(4).map(([label, to]) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="public-footer__bottom">
          <span className="public-footer__copyright">
            &copy; {new Date().getFullYear()} Personality Assessor. Psychometric instruments and deterministic scoring algorithms.
          </span>
          <div className="public-footer__meta">
            <span>Deterministic Scoring</span>
            <span>Zero Archetypes</span>
            <span>Privacy Controlled</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ResponsiveImage({ media, alt = '', sizes = '100vw', priority = false, artDirectedMobile = false }) {
  if (!media) return null;

  const basePath = media.basePath || (media.folder && media.file ? `/media/personality-v3/${media.folder}/${media.file}` : '');
  const avifPath = `${basePath}-1440.avif`;
  const webpPath = `${basePath}-1440.webp`;
  const jpgPath = `${basePath}-1440.jpg`;
  const mobileJpg = artDirectedMobile && media.mobilePath ? `${media.mobilePath}-800.jpg` : null;


  return (
    <picture className="public-picture">
      <source type="image/avif" srcSet={avifPath} sizes={sizes} />
      <source type="image/webp" srcSet={webpPath} sizes={sizes} />
      {mobileJpg && (
        <source media="(max-width: 767px)" srcSet={mobileJpg} />
      )}
      <img
        src={jpgPath}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className="public-img"
      />
    </picture>
  );
}

export function PublicLayout({ children }) {
  return (
    <PublicMotionRoot>
      <div className="public-site-root">
        <PublicHeader />
        <main id="main-content" className="public-main-content">
          {children}
        </main>
        <PublicFooter />
      </div>
    </PublicMotionRoot>
  );
}
