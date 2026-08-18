import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';
import PersonalityMenu from './PersonalityMenu';

export const PersonalityHeader = ({ theme = 'dark' }) => {
  const location = useLocation();
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Solid background after initial hero scroll
      setIsSolid(currentY > 80);

      // Hide on downscroll (past 200px), show on upscroll
      if (currentY > 200) {
        if (currentY > lastScrollY.current + 8) {
          setIsScrolledDown(true);
        } else if (currentY < lastScrollY.current - 8) {
          setIsScrolledDown(false);
        }
      } else {
        setIsScrolledDown(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = theme === 'light';

  return (
    <>
      <header
        className={`pa-header ${isScrolledDown ? 'pa-header--scrolled-down' : ''} ${
          isSolid ? 'pa-header--solid' : ''
        } ${isLight ? 'pa-header--light' : ''}`}
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
