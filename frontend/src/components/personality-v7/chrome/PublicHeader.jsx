import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CurvedMenu from './CurvedMenu';
import MobileNavigation from './MobileNavigation';
import MagneticTarget from '../motion/MagneticTarget';
import useHeaderTone from './useHeaderTone';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

const PRIMARY_LINKS = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/career-intelligence', label: 'Career' },
  { to: '/progress', label: 'Progress' },
];

export const PublicHeader = ({ theme = 'light-content' }) => {
  const location = useLocation();
  const { navigateWithTransition } = useRouteTransition();
  const [indexOpen, setIndexOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const indexTriggerRef = useRef(null);

  // Synchronize section-aware header tone
  useHeaderTone(theme);

  const handleNavClick = (e, to) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  return (
    <>
      <header className="pa-header" data-tone={theme} role="banner">
        <div className="pa-v7-grid pa-header__inner">
          {/* Brand */}
          <div className="pa-header__left">
            <Link
              to="/"
              className="pa-header__brand"
              aria-label="Personality Assessor home"
              onClick={(e) => handleNavClick(e, '/')}
            >
              <span>Personality Assessor</span>
            </Link>
          </div>

          {/* Desktop Center/Right Navigation */}
          <div className="pa-header__right">
            <nav className="pa-header__nav" aria-label="Primary site navigation">
              {PRIMARY_LINKS.map(({ to, label }) => {
                const isActive = location.pathname === to;
                return (
                  <a
                    key={to}
                    href={to}
                    className={`pa-header__link ${isActive ? 'pa-header__link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, to)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </a>
                );
              })}

              <button
                ref={indexTriggerRef}
                type="button"
                className="pa-header__index-btn"
                onClick={() => setIndexOpen(true)}
                aria-expanded={indexOpen}
                aria-haspopup="dialog"
                aria-label="Open complete site index"
              >
                <span>Index</span>
                <span className="pa-header__index-icon" aria-hidden="true">
                  +
                </span>
              </button>
            </nav>

            <div className="pa-header__actions">
              <a
                href="/login"
                className="pa-header__signin"
                onClick={(e) => handleNavClick(e, '/login')}
              >
                Sign in
              </a>

              <MagneticTarget>
                <a
                  href="/signup"
                  className="pa-header__cta"
                  onClick={(e) => handleNavClick(e, '/signup')}
                >
                  Build profile
                </a>
              </MagneticTarget>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="pa-header__menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-menu"
              aria-label="Open mobile navigation menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Curved Menu Drawer */}
      <CurvedMenu
        isOpen={indexOpen}
        onClose={() => setIndexOpen(false)}
        triggerRef={indexTriggerRef}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activePath={location.pathname}
      />
    </>
  );
};

export default PublicHeader;
