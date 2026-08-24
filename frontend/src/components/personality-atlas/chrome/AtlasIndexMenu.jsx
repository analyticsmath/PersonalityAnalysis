import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AtlasResponsiveImage from '../media/AtlasResponsiveImage';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';

const PRIMARY_ROUTES = [
  {
    path: '/',
    label: 'Home',
    description: 'Field entry into professional context, multidimensional readings, and temporal evidence.',
    mediaKey: 'homeContext',
  },
  {
    path: '/how-it-works',
    label: 'How It Works',
    description: 'See one human response extract, branch, weight, and store without numbered steps.',
    mediaKey: 'howProcess',
  },
  {
    path: '/career-intelligence',
    label: 'Career Intelligence',
    description: 'Explore the 5 workworld environments and 17 benchmarked roles in a navigable spatial atlas.',
    mediaKey: 'careerComplexMachine',
  },
  {
    path: '/progress',
    label: 'Progress',
    description: 'Longitudinal context accumulation showing stability and adaptation across time.',
    mediaKey: 'progressStudio',
  },
];

const SECONDARY_ROUTES = [
  { path: '/trust', label: 'Trust & Custody' },
  { path: '/methodology', label: 'Methodology' },
  { path: '/privacy', label: 'Privacy Terms' },
];

const AtlasIndexMenu = ({ isOpen, onClose, triggerRef }) => {
  const location = useLocation();
  const [hoveredRoute, setHoveredRoute] = useState(PRIMARY_ROUTES[0]);
  const menuRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Inert & Focus Trap Contract
  useEffect(() => {
    const mainContent = document.getElementById('main-content');

    if (isOpen) {
      // Mark main content inert while menu is open
      if (mainContent) mainContent.setAttribute('inert', '');
      if (menuRef.current) menuRef.current.removeAttribute('inert');

      // Focus first actionable element (close button)
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      if (mainContent) mainContent.removeAttribute('inert');
      if (menuRef.current) menuRef.current.setAttribute('inert', '');
      document.body.style.overflow = '';
    }

    return () => {
      if (mainContent) mainContent.removeAttribute('inert');
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation & Escape key handler
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        triggerRef?.current?.focus();
      }
    },
    [isOpen, onClose, triggerRef]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) {
    return (
      <div
        ref={menuRef}
        className="pa-atlas-index-overlay"
        aria-hidden="true"
        inert=""
        style={{ display: 'none' }}
      />
    );
  }

  const activeAsset = MEDIA_ASSETS_ATLAS[hoveredRoute?.mediaKey] || MEDIA_ASSETS_ATLAS.homeContext;

  return (
    <div
      ref={menuRef}
      className="pa-atlas-index-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Atlas Navigation Index"
    >
      {/* Background Destination Preview Media */}
      <div className="pa-atlas-index-overlay__bg-media">
        <AtlasResponsiveImage
          asset={activeAsset}
          loading="eager"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Header with Close */}
      <div className="pa-atlas-index-overlay__header">
        <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)' }}>
          ATLAS NAVIGATION INDEX
        </span>
        <button
          ref={closeBtnRef}
          onClick={() => {
            onClose();
            triggerRef?.current?.focus();
          }}
          className="pa-atlas-index-overlay__close-btn"
          aria-label="Close navigation index"
        >
          <span>Close</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="pa-atlas-index-overlay__content">
        <nav className="pa-atlas-index-overlay__primary-nav" aria-label="Primary pages">
          {PRIMARY_ROUTES.map((route) => {
            const isCurrent = location.pathname === route.path;
            return (
              <Link
                key={route.path}
                to={route.path}
                onClick={onClose}
                onMouseEnter={() => setHoveredRoute(route)}
                onFocus={() => setHoveredRoute(route)}
                className="pa-atlas-index-overlay__route-item"
                aria-current={isCurrent ? 'page' : undefined}
              >
                <span>{route.label}</span>
                {isCurrent && (
                  <span
                    className="pa-atlas-mono"
                    style={{ fontSize: '0.8rem', color: 'var(--atlas-signal)' }}
                  >
                    CURRENT
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="pa-atlas-index-overlay__preview-pane">
          <p className="pa-atlas-index-overlay__preview-desc">
            {hoveredRoute.description}
          </p>

          <div className="pa-atlas-index-overlay__secondary-group">
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.75rem' }}>
              GOVERNANCE & PUBLICATION
            </span>
            {SECONDARY_ROUTES.map((sec) => (
              <Link
                key={sec.path}
                to={sec.path}
                onClick={onClose}
                className="pa-atlas-index-overlay__secondary-link"
              >
                {sec.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AtlasIndexMenu);
