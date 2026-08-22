import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

const MOBILE_ROUTES = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/career-intelligence', label: 'Career intelligence' },
  { to: '/progress', label: 'Progress' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/trust', label: 'Trust' },
  { to: '/privacy', label: 'Privacy' },
];

export const MobileNavigation = ({ isOpen, onClose, activePath, triggerRef }) => {
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const { navigateWithTransition } = useRouteTransition();

  // Lock background scroll when open & manage focus
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
        if (triggerRef?.current) {
          triggerRef.current.focus();
        }
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
  }, [isOpen, onClose, triggerRef]);

  const handleCloseAndRestoreFocus = () => {
    onClose();
    if (triggerRef?.current) {
      try {
        triggerRef.current.focus();
      } catch {
        // ignore
      }
    }
  };

  const handleNavClick = (e, to) => {
    e.preventDefault();
    onClose();
    if (to === activePath) {
      if (triggerRef?.current) triggerRef.current.focus();
    } else {
      navigateWithTransition(to);
    }
  };

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
        <Link to="/" className="pa-header__brand" onClick={(e) => handleNavClick(e, '/')}>
          <span>Personality Assessor</span>
        </Link>
        <button
          ref={closeButtonRef}
          type="button"
          className="pa-header__menu-btn"
          onClick={handleCloseAndRestoreFocus}
          aria-label="Close navigation menu"
        >
          Close
        </button>
      </div>

      <nav className="pa-mobile-menu__links" aria-label="Mobile menu links">
        {MOBILE_ROUTES.map(({ to, label }) => {
          const isActive = activePath === to;
          return (
            <a
              key={to}
              href={to}
              className="pa-mobile-menu__link"
              onClick={(e) => handleNavClick(e, to)}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && <span className="pa-mobile-menu__link-marker" aria-hidden="true" />}
              <span>{label}</span>
            </a>
          );
        })}
      </nav>

      <div className="pa-mobile-menu__footer">
        <div className="pa-mobile-menu__actions">
          <a
            href="/signup"
            className="pa-mobile-menu__cta"
            onClick={(e) => handleNavClick(e, '/signup')}
          >
            Build profile
          </a>
          <a
            href="/login"
            className="pa-mobile-menu__signin"
            onClick={(e) => handleNavClick(e, '/login')}
          >
            Sign in to existing record
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
