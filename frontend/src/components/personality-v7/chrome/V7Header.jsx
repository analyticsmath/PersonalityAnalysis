import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';

export const V7Header = ({ headerTheme = 'dark' }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="pa-v7-header" data-theme={headerTheme} role="banner">
      <Link to="/" className="pa-v7-header__brand" aria-label="Personality Assessor Home">
        <span>Personality Assessor</span>
      </Link>

      <nav className="pa-v7-header__nav" aria-label="Public site navigation">
        <Link
          to="/career-intelligence"
          className="pa-v7-header__link"
          aria-current={currentPath === '/career-intelligence' ? 'page' : undefined}
        >
          Explore
        </Link>
        <Link
          to="/how-it-works"
          className="pa-v7-header__link"
          aria-current={currentPath === '/how-it-works' ? 'page' : undefined}
        >
          How it works
        </Link>
        <Link
          to="/methodology"
          className="pa-v7-header__link"
          aria-current={currentPath === '/methodology' ? 'page' : undefined}
        >
          Methodology
        </Link>
        <Link
          to="/trust"
          className="pa-v7-header__link"
          aria-current={currentPath === '/trust' ? 'page' : undefined}
        >
          Trust
        </Link>
      </nav>

      <div className="pa-v7-header__actions">
        <Link to={getLoginUrl('/dashboard')} className="pa-v7-header__signin">
          Sign in
        </Link>
        <Link
          to={getSignupAcquisitionUrl()}
          className={`pa-v7-btn pa-v7-header__cta ${headerTheme === 'light' ? 'pa-v7-btn--ink' : 'pa-v7-btn--primary'}`}
        >
          Build my profile
        </Link>
      </div>
    </header>
  );
};

export default V7Header;
