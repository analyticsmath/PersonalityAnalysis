import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const MobileAtlasDock = () => {
  const location = useLocation();
  const path = location.pathname;

  const targets = [
    {
      id: 'home',
      label: 'Home',
      to: '/',
      active: path === '/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
        </svg>
      ),
    },
    {
      id: 'explore',
      label: 'Explore',
      to: '/career-intelligence',
      active: path === '/career-intelligence',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
        </svg>
      ),
    },
    {
      id: 'method',
      label: 'Method',
      to: '/methodology',
      active: path === '/methodology' || path === '/how-it-works',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M8 7h8M8 11h6" />
        </svg>
      ),
    },
    {
      id: 'account',
      label: 'Account',
      to: '/login',
      active: path === '/login' || path === '/signup',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="pa-v7-atlas-dock" aria-label="Mobile Atlas dock navigation">
      {targets.map((t) => (
        <Link
          key={t.id}
          to={t.to}
          className={`pa-v7-dock-target ${t.active ? 'active' : ''}`}
          aria-current={t.active ? 'page' : undefined}
        >
          <span className="pa-v7-dock-target__marker" />
          {t.icon}
          <span>{t.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileAtlasDock;
