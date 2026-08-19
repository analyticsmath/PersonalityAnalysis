import React from 'react';
import V7Header from './V7Header';
import MobileAtlasDock from './MobileAtlasDock';
import EditorialFooter from './EditorialFooter';

export const PublicLayout = ({ children, headerTheme = 'dark', withFooter = true, withMobileAtlasDock = true }) => {
  return (
    <div className={`pa-v7-root pa-public-v4 pa-v7-shell${withMobileAtlasDock ? '' : ' pa-v7-shell--without-dock'}`}>
      <a href="#main-content" className="pa-skip-link">
        Skip to main content
      </a>

      <V7Header headerTheme={headerTheme} />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      {withFooter && <EditorialFooter />}

      {withMobileAtlasDock && <MobileAtlasDock />}
    </div>
  );
};

export default PublicLayout;
