import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MOBILE_ROUTES = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/career-intelligence', label: 'Career intelligence' },
  { to: '/progress', label: 'Progress' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/trust', label: 'Trust' },
  { to: '/privacy', label: 'Privacy' },
];

export const MobileNavigation = ({ isOpen, onClose, activePath }) => {
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button when opened
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-navigation-menu"
      ref={containerRef}
      className={`pa-mobile-menu ${isOpen ? '' : 'pa-mobile-menu--closed'}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <div className="pa-mobile-menu__header">
        <Link to="/" className="pa-header__brand" onClick={onClose}>
          <span>Personality Assessor</span>
        </Link>
        <button
          ref={closeButtonRef}
          type="button"
          className="pa-header__menu-btn"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          Close
        </button>
      </div>

      <nav className="pa-mobile-menu__links" aria-label="Mobile menu links">
        {MOBILE_ROUTES.map(({ to, label }) => {
          const isActive = activePath === to;
          return (
            <Link
              key={to}
              to={to}
              className="pa-mobile-menu__link"
              onClick={onClose}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && <span className="pa-mobile-menu__link-marker" aria-hidden="true" />}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pa-mobile-menu__footer">
        <div className="pa-mobile-menu__actions">
          <Link
            to="/signup"
            className="pa-mobile-menu__cta"
            onClick={onClose}
          >
            Build profile
          </Link>
          <Link
            to="/login"
            className="pa-mobile-menu__signin"
            onClick={onClose}
          >
            Sign in to existing record
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
