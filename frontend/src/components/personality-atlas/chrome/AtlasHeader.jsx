import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AtlasIndexMenu from './AtlasIndexMenu';

const AtlasHeader = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const indexBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="pa-atlas-header"
        data-scrolled={isScrolled ? 'true' : 'false'}
        role="banner"
      >
        <Link to="/" className="pa-atlas-header__brand" aria-label="Personality Assessor Home">
          <span className="pa-atlas-header__brand-mark" aria-hidden="true" />
          <span>Personality Assessor</span>
        </Link>

        <nav className="pa-atlas-header__nav" aria-label="Main Navigation">
          <Link
            to="/how-it-works"
            className="pa-atlas-header__link"
            aria-current={location.pathname === '/how-it-works' ? 'page' : undefined}
          >
            How it works
          </Link>
          <Link
            to="/career-intelligence"
            className="pa-atlas-header__link"
            aria-current={location.pathname === '/career-intelligence' ? 'page' : undefined}
          >
            Career
          </Link>
          <Link
            to="/progress"
            className="pa-atlas-header__link"
            aria-current={location.pathname === '/progress' ? 'page' : undefined}
          >
            Progress
          </Link>
        </nav>

        <div className="pa-atlas-header__actions">
          <button
            ref={indexBtnRef}
            onClick={() => setIsIndexOpen(true)}
            className="pa-atlas-header__index-btn"
            aria-haspopup="dialog"
            aria-expanded={isIndexOpen}
            aria-label="Open Atlas Index"
          >
            <span>Index</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link
            to="/login"
            className="pa-atlas-header__link"
            style={{ fontSize: '0.92rem' }}
          >
            Sign in
          </Link>

          <Link
            to="/assessment/start"
            className="pa-atlas-btn-primary"
            style={{ height: '40px', padding: '0 18px', fontSize: '0.92rem' }}
          >
            Build profile
          </Link>
        </div>
      </header>

      <AtlasIndexMenu
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        triggerRef={indexBtnRef}
      />
    </>
  );
};

export default React.memo(AtlasHeader);
