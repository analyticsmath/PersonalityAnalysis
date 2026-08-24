import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../content/public-experience/navigation';

export const PublicHeader = ({ onOpenIndex }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`pa-px-header ${isScrolled ? 'pa-px-header--scrolled' : ''}`}>
      <Link to="/" className="pa-px-header__brand" aria-label="Personality Assessor Home">
        Personality Assessor
      </Link>

      <nav className="pa-px-header__nav" aria-label="Primary public routes">
        <Link to="/career-intelligence" className="pa-px-header__link">
          Career
        </Link>
        <Link to="/how-it-works" className="pa-px-header__link">
          How it works
        </Link>
        <Link to="/progress" className="pa-px-header__link">
          Progress
        </Link>
        <Link to="/trust" className="pa-px-header__link">
          Trust
        </Link>
      </nav>

      <div className="pa-px-header__actions">
        <button
          type="button"
          onClick={onOpenIndex}
          className="pa-px-header__index-btn"
          aria-haspopup="dialog"
          aria-expanded="false"
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
