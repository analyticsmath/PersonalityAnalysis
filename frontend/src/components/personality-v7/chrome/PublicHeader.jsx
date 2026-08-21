import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';

const NAV_LINKS = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/career-intelligence', label: 'Career intelligence' },
  { to: '/progress', label: 'Progress' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/trust', label: 'Trust' },
];

export const PublicHeader = ({ theme = 'light-content' }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className="pa-header"
        data-tone={theme}
        role="banner"
      >
        <Link to="/" className="pa-header__brand" aria-label="Personality Assessor home">
          <span>Personality Assessor</span>
        </Link>

        <div className="pa-header__right">
          <nav className="pa-header__nav" aria-label="Primary site navigation">
            {NAV_LINKS.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="pa-header__link"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && <span className="pa-header__link-marker" aria-hidden="true" />}
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pa-header__actions">
            <Link to="/login" className="pa-header__signin">
              Sign in
            </Link>
            <Link to="/signup" className="pa-header__cta">
              Build profile
            </Link>
          </div>

          <button
            type="button"
            className="pa-header__menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label="Open navigation menu"
          >
            Menu
          </button>
        </div>
      </header>

      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activePath={location.pathname}
      />
    </>
  );
};

export default PublicHeader;
