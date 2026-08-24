import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../content/public-experience/navigation';

const indexItems = [
  { path: '/', label: 'Home', mediaKey: 'homeWorldEntry', desc: 'A continuous cinematic field study of professional behavior under different conditions.' },
  { path: '/career-intelligence', label: 'Career Intelligence', mediaKey: 'workworldPrecision', desc: 'Spatial 3D workworld exploration with 17 canonical occupational profiles.' },
  { path: '/how-it-works', label: 'How It Works', mediaKey: 'howTransformation', desc: 'Follow one answer from raw capture to deterministic multi-model calibration.' },
  { path: '/progress', label: 'Progress', mediaKey: 'workworldAutonomy', desc: 'Temporal double-exposure comparing baseline records against later work contexts.' },
  { path: '/trust', label: 'Trust & X-Ray', mediaKey: 'trustDiagnostic', desc: 'Inspect the evidence chain from participant response to user-sovereign data rights.' },
  { path: '/methodology', label: 'Methodology', mediaKey: 'homeSituationDetail', desc: 'Unboxed psychometric frameworks and fixed mathematical career weights.' },
  { path: '/privacy', label: 'Privacy', mediaKey: 'workworldAutonomy', desc: 'Plain-language governance, zero third-party AI training, and data ownership.' },
  { path: '/login', label: 'Sign In', mediaKey: 'authLogin', desc: 'Return to your saved assessment history and career trajectory.' },
  { path: '/signup', label: 'Start Assessment', mediaKey: 'authSignup', desc: 'Begin with one contextual assessment to build your permanent record.' },
];

export const PublicIndex = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState(indexItems[0]);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const mainEl = document.getElementById('main-content');

    if (isOpen) {
      if (mainEl) mainEl.setAttribute('inert', '');
      closeBtnRef.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (mainEl) mainEl.removeAttribute('inert');
      };
    } else {
      if (mainEl) mainEl.removeAttribute('inert');
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeMedia = MEDIA_MANIFEST_PX[activeItem.mediaKey];

  return (
    <div
      ref={overlayRef}
      className="pa-px-index-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Atlas Index Navigation"
      aria-hidden={!isOpen}
    >
      <div className="pa-px-index-overlay__header">
        <span className="pa-px-context-data">Personality Assessor Atlas Index</span>
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="pa-px-index-overlay__close-btn"
          aria-label="Close Atlas Index Menu"
        >
          Close (Esc)
        </button>
      </div>

      <div className="pa-px-index-overlay__content">
        <nav className="pa-px-index-overlay__nav-list" aria-label="Index destinations">
          {indexItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              onMouseEnter={() => setActiveItem(item)}
              onFocus={() => setActiveItem(item)}
              className="pa-px-index-overlay__nav-item"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pa-px-index-overlay__preview-pane">
          {activeMedia && (
            <img
              src={activeMedia.sourceWebp || activeMedia.fallbackJpg}
              alt=""
              className="pa-px-index-overlay__floating-image"
            />
          )}
          <div className="pa-px-index-overlay__preview-desc">
            <span className="pa-px-context-data" style={{ display: 'block', marginBottom: '8px' }}>
              {activeItem.label}
            </span>
            <p>{activeItem.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicIndex;
