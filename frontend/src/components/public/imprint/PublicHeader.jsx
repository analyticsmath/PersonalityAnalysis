// frontend/src/components/public/imprint/PublicHeader.jsx
// Concept-Named Public Header with Scene-Aware Tone Negotiation

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useImprintScene } from './ImprintSceneContext';
import '../../../styles/imprint/public-routes-imprint.css';

export default function PublicHeader({ forceReleased = false }) {
  const { headerTone } = useImprintScene();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isReleased = forceReleased || headerTone === 'released';
  const isDark = headerTone === 'dark';

  const headerClass = `imprint-header ${
    isDark
      ? 'imprint-header--dark'
      : isReleased
      ? 'imprint-header--released'
      : 'imprint-header--transparent'
  }`;

  return (
    <header className={headerClass} aria-label="Main Navigation">
      <div className="imprint-header-inner">
        <Link to="/" className="imprint-brand">
          Personality Assessor
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="imprint-nav" aria-label="Primary navigation">
          <NavLink to="/how-it-works" className="imprint-nav-link">
            How It Works
          </NavLink>
          <NavLink to="/career-intelligence" className="imprint-nav-link">
            Career Intelligence
          </NavLink>
          <NavLink to="/progress" className="imprint-nav-link">
            Progress
          </NavLink>
          <NavLink to="/methodology" className="imprint-nav-link">
            Methodology
          </NavLink>
          <NavLink to="/trust" className="imprint-nav-link">
            Trust
          </NavLink>
          <NavLink to="/privacy" className="imprint-nav-link">
            Privacy
          </NavLink>
        </nav>

        {/* Header Actions */}
        <div className="imprint-header-actions">
          <Link to="/login" className="imprint-btn imprint-btn--text">
            Sign in
          </Link>
          <Link to="/signup" className="imprint-btn imprint-btn--primary">
            Build profile
          </Link>

          {/* Mobile Drawer Toggle */}
          <button
            type="button"
            className="imprint-nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="imprint-mobile-drawer" role="dialog" aria-modal="true">
          <NavLink
            to="/how-it-works"
            className="imprint-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </NavLink>
          <NavLink
            to="/career-intelligence"
            className="imprint-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Career Intelligence
          </NavLink>
          <NavLink
            to="/progress"
            className="imprint-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Progress
          </NavLink>
          <NavLink
            to="/methodology"
            className="imprint-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Methodology
          </NavLink>
          <NavLink
            to="/trust"
            className="imprint-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Trust
          </NavLink>
          <NavLink
            to="/privacy"
            className="imprint-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Privacy
          </NavLink>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              to="/signup"
              className="imprint-btn imprint-btn--primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Build my profile
            </Link>
            <Link
              to="/login"
              className="imprint-btn imprint-btn--text"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
