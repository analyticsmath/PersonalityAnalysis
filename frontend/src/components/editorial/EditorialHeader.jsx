// frontend/src/components/editorial/EditorialHeader.jsx
// Personality Assessor — Integrated Editorial Navigation Header

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import '../../styles/editorial/editorial-hero.css';

export default function EditorialHeader({ forceDark = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const { brand, navLinks, signIn, cta } = EDITORIAL_CONTENT.header;

  return (
    <>
      <header className={`ed-header ${forceDark ? 'ed-header--dark' : ''}`}>
        <Link to="/" className="ed-header__brand" aria-label="Personality Assessor Home">
          <span className="ed-header__brand-dot" aria-hidden="true" />
          <span>{brand}</span>
        </Link>

        <nav className="ed-header__nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `ed-header__nav-link ${isActive ? 'active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ed-header__actions">
          <Link to={signIn.href} className="ed-header__sign-in">
            {signIn.label}
          </Link>
          <Link to={cta.href} className="ed-header__cta">
            {cta.label}
          </Link>
        </div>

        <button
          type="button"
          className="ed-header__mobile-toggle"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* Accessible Mobile Drawer Overlay */}
      <div
        className={`ed-mobile-drawer ${mobileOpen ? 'ed-mobile-drawer--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="ed-mobile-drawer__panel">
          <button
            type="button"
            className="ed-mobile-drawer__close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          <nav className="ed-mobile-drawer__links" aria-label="Mobile Navigation">
            <Link to="/" className="ed-mobile-drawer__link">
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="ed-mobile-drawer__link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ed-mobile-drawer__actions">
            <Link to={signIn.href} className="ed-btn ed-btn--secondary" style={{ width: '100%' }}>
              {signIn.label}
            </Link>
            <Link to={cta.href} className="ed-btn ed-btn--primary" style={{ width: '100%' }}>
              {cta.label} →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
