import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';

/**
 * SceneHeader
 * Derives explicit foreground color (dark/light) directly from headerTheme prop or SceneDirector token.
 * No dynamic luminance probing of arbitrary DOM nodes.
 */
export const SceneHeader = ({ headerTheme = 'dark', className = '' }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isInk = headerTheme === 'light';

  return (
    <>
      <a href="#main-content" className="pa-skip-link">
        Skip to primary content
      </a>
      <header
        className={`pa-v6-header ${className}`}
        data-theme={headerTheme}
        role="banner"
      >
        <div className="pa-v6-header__brand">
          <Link
            to="/"
            style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}
            aria-label="Personality Assessor Home"
          >
            <span>PERSONALITY ASSESSOR</span>
          </Link>
        </div>

        <nav className="pa-v6-header__nav" aria-label="Main Navigation">
          <Link
            to="/how-it-works"
            className="pa-v6-header__link"
            style={{ color: 'inherit' }}
            aria-current={location.pathname === '/how-it-works' ? 'page' : undefined}
          >
            How it works
          </Link>
          <Link
            to="/methodology"
            className="pa-v6-header__link"
            style={{ color: 'inherit' }}
            aria-current={location.pathname === '/methodology' ? 'page' : undefined}
          >
            Methodology
          </Link>
          <Link
            to="/career-intelligence"
            className="pa-v6-header__link"
            style={{ color: 'inherit' }}
            aria-current={location.pathname === '/career-intelligence' ? 'page' : undefined}
          >
            Career Worlds
          </Link>
          <Link
            to="/trust"
            className="pa-v6-header__link"
            style={{ color: 'inherit' }}
            aria-current={location.pathname === '/trust' ? 'page' : undefined}
          >
            Trust & Privacy
          </Link>
        </nav>

        <div className="pa-v6-header__actions">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className={`pa-v6-btn ${isInk ? 'pa-v6-btn--ink' : 'pa-v6-btn--primary'}`}
              style={{ minHeight: '38px', padding: '0.45rem 1.1rem', fontSize: '0.8125rem' }}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to={getLoginUrl('/dashboard')}
                className="pa-v6-header__link"
                style={{ color: 'inherit' }}
              >
                Sign in
              </Link>
              <Link
                to={getSignupAcquisitionUrl('/assessment/start')}
                className={`pa-v6-btn ${isInk ? 'pa-v6-btn--ink' : 'pa-v6-btn--primary'}`}
                style={{ minHeight: '38px', padding: '0.45rem 1.1rem', fontSize: '0.8125rem' }}
              >
                Build my profile
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default SceneHeader;
