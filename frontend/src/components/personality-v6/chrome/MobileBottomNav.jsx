import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { getLoginUrl } from '../../../utils/personality-v4/navigation';

export const MobileBottomNav = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="pa-v6-mobile-bottom-nav" aria-label="Mobile Navigation">
      <Link
        to="/"
        className={`pa-v6-bottom-tab ${path === '/' ? 'active' : ''}`}
        aria-current={path === '/' ? 'page' : undefined}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>Home</span>
      </Link>

      <Link
        to="/how-it-works"
        className={`pa-v6-bottom-tab ${path === '/how-it-works' ? 'active' : ''}`}
        aria-current={path === '/how-it-works' ? 'page' : undefined}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
        <span>Explore</span>
      </Link>

      <Link
        to="/methodology"
        className={`pa-v6-bottom-tab ${path === '/methodology' ? 'active' : ''}`}
        aria-current={path === '/methodology' ? 'page' : undefined}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        <span>Frameworks</span>
      </Link>

      <Link
        to={isAuthenticated ? '/dashboard' : getLoginUrl('/dashboard')}
        className={`pa-v6-bottom-tab ${path.startsWith('/login') || path.startsWith('/dashboard') || path.startsWith('/signup') ? 'active' : ''}`}
        aria-current={path.startsWith('/dashboard') ? 'page' : undefined}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>Account</span>
      </Link>
    </nav>
  );
};

export default MobileBottomNav;
