import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../content/public-experience/navigation';

export const PublicHeader = ({ onOpenIndex }) => {
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

  return (
    <header className={`pa-px-header ${isScrolled ? 'pa-px-header--scrolled' : ''}`}>
      <Link to="/" className="pa-px-header__brand" aria-label="Personality Assessor Home">
        Personality Assessor
      </Link>

      <nav className="pa-px-header__nav" aria-label="Primary navigation">
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          type="button"
          onClick={onOpenIndex}
          className="pa-px-header__index-btn"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-label="Open Atlas Index Menu"
        >
          Index
        </button>

        <Link to={getLoginUrl(location.pathname)} className="pa-px-header__link" style={{ display: 'none' }}>
          Sign in
        </Link>

        <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary" style={{ height: '38px', padding: '0 16px', fontSize: '0.88rem' }}>
          Build profile
        </Link>
      </div>
    </header>
  );
};

export default PublicHeader;
