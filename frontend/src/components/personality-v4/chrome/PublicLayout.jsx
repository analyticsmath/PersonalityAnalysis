import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PersonalityHeader from './PersonalityHeader';
import PersonalityFooter from './PersonalityFooter';

export const PublicLayout = ({ children, headerTheme = 'dark', showFooter = true }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route navigation
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="pa-public-v4">
      <a href="#main-content" className="pa-skip-link">
        Skip to main content
      </a>

      <PersonalityHeader theme={headerTheme} />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      {showFooter && <PersonalityFooter />}
    </div>
  );
};

export default PublicLayout;
