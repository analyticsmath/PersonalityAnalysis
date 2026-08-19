import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';
import PersonalityMenu from './PersonalityMenu';

/**
 * PersonalityHeader — V5 Luminance-Aware Global Chrome
 *
 * Dynamically detects whether the header is currently positioned over a light
 * or dark section (via data-header-theme="light" | "dark") and adjusts contrast,
 * text color, backdrop blur, and CTA button styling.
 */
export const PersonalityHeader = ({ theme = 'dark' }) => {
  const location = useLocation();
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuBtnRef = useRef(null);

  // Sync initial theme when route changes
  useEffect(() => {
    setCurrentTheme(theme);
  }, [location.pathname, theme]);

  // Dynamic luminance detection based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Solid background after initial scroll
      setIsSolid(currentY > 60);

      // Hide on fast downscroll, reveal on upscroll
      if (currentY > 200) {
        if (currentY > lastScrollY.current + 10) {
          setIsScrolledDown(true);
        } else if (currentY < lastScrollY.current - 10) {
          setIsScrolledDown(false);
        }
      } else {
        setIsScrolledDown(false);
      }

      lastScrollY.current = currentY;

      // Detect luminance from underlying DOM element at header center
      if (typeof document !== 'undefined') {
        const headerY = 40;
        const headerX = window.innerWidth / 2;
        const elements = document.elementsFromPoint ? document.elementsFromPoint(headerX, headerY) : [];
        for (const el of elements) {
          const themedAncestor = el.closest ? el.closest('[data-header-theme]') : null;
          if (themedAncestor) {
            const detectedTheme = themedAncestor.getAttribute('data-header-theme');
            if (detectedTheme && (detectedTheme === 'light' || detectedTheme === 'dark')) {
              setCurrentTheme(detectedTheme);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = currentTheme === 'light';

  return (
    <>
      <header
        className={`pa-header ${isScrolledDown ? 'pa-header--scrolled-down' : ''} ${
          isSolid ? 'pa-header--solid' : ''
        } ${isLight ? 'pa-header--light' : 'pa-header--dark'}`}
        role="banner"
      >
        <div className="pa-header__inner">
          <Link to="/" className="pa-header__brand" aria-label="Personality Assessor Home">
            <span>Personality Assessor</span>
          </Link>

          <nav className="pa-header__nav" aria-label="Primary Navigation">
            <Link
              to="/how-it-works"
              className={`pa-header__link ${
                location.pathname === '/how-it-works' ? 'pa-header__link--active' : ''
              }`}
            >
              How It Works
            </Link>
            <Link
              to="/career-intelligence"
              className={`pa-header__link ${
                location.pathname === '/career-intelligence' ? 'pa-header__link--active' : ''
              }`}
            >
              Career Intelligence
            </Link>
            <Link
              to="/methodology"
              className={`pa-header__link ${
                location.pathname === '/methodology' ? 'pa-header__link--active' : ''
              }`}
            >
              Methodology
            </Link>
            <Link
              to="/trust"
              className={`pa-header__link ${
                location.pathname === '/trust' ? 'pa-header__link--active' : ''
              }`}
            >
              Trust
            </Link>
          </nav>

          <div className="pa-header__actions">
            <Link to={getLoginUrl()} className="pa-header__action-signin">
              Sign in
            </Link>
            <Link
              to={getSignupAcquisitionUrl()}
              className={`pa-btn pa-header__action-cta ${
                isLight ? 'pa-btn--primary' : 'pa-btn--inverse'
              }`}
            >
              Build my profile
            </Link>
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            className="pa-header__menu-btn"
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Open navigation menu"
          >
            Menu
          </button>
        </div>
      </header>

      <PersonalityMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={menuBtnRef}
      />
    </>
  );
};

export default PersonalityHeader;
