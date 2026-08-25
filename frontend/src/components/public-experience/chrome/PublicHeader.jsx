import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../content/public-experience/navigation';

export const PublicHeader = ({ onOpenIndex, isIndexOpen = false, triggerRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`pa-px-header ${isScrolled ? 'pa-px-header--scrolled' : ''}`}>
      <Link to="/" className="pa-px-header__brand" aria-label="Personality Assessor Home">
        Personality Assessor
      </Link>

      <nav className="pa-px-header__nav" aria-label="Primary public navigation">
        <Link
          to="/career-intelligence"
          className={`pa-px-header__link ${isActive('/career-intelligence') ? 'pa-px-header__link--active' : ''}`}
        >
          Career
        </Link>
        <Link
          to="/how-it-works"
          className={`pa-px-header__link ${isActive('/how-it-works') ? 'pa-px-header__link--active' : ''}`}
        >
          How it works
        </Link>
        <Link
          to="/progress"
          className={`pa-px-header__link ${isActive('/progress') ? 'pa-px-header__link--active' : ''}`}
        >
          Progress
        </Link>
        <Link
          to="/trust"
          className={`pa-px-header__link ${isActive('/trust') ? 'pa-px-header__link--active' : ''}`}
        >
          Trust
        </Link>
        <Link
          to="/methodology"
          className={`pa-px-header__link ${isActive('/methodology') ? 'pa-px-header__link--active' : ''}`}
        >
          Methodology
        </Link>
      </nav>

      <div className="pa-px-header__actions">
        <button
          ref={triggerRef}
          type="button"
          onClick={onOpenIndex}
          className="pa-px-header__index-btn"
          aria-haspopup="dialog"
          aria-expanded={isIndexOpen ? 'true' : 'false'}
          aria-label="Open Site Index Menu"
        >
          Index
        </button>

        <Link to={getLoginUrl(location.pathname)} className="pa-px-header__link pa-px-header__login-link">
          Sign in
        </Link>

        <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary pa-px-header__cta">
          Build profile
        </Link>
      </div>
    </header>
  );
};

export default PublicHeader;
