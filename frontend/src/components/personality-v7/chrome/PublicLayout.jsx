import React from 'react';
import V7Header from './V7Header';
import MobileAtlasDock from './MobileAtlasDock';
import EditorialFooter from './EditorialFooter';

export const PublicLayout = ({ children, headerTheme = 'dark', withFooter = true }) => {
  return (
    <div className="pa-v7-root pa-public-v4 pa-v7-shell">
      <a href="#main-content" className="pa-skip-link">
        Skip to main content
      </a>

      <V7Header headerTheme={headerTheme} />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      {withFooter && <EditorialFooter />}

      <MobileAtlasDock />
    </div>
  );
};

export default PublicLayout;
