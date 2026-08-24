import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

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
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const { hasFinePointer } = usePublicCapabilities();

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

  const handleMouseMove = (e) => {
    if (!hasFinePointer) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setPointerOffset({ x, y });
  };

  if (!isOpen) return null;

  const activeMedia = MEDIA_MANIFEST_PX[activeItem.mediaKey];

  return (
    <div
      ref={overlayRef}
      className="pa-px-index-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Public Experience Index"
      aria-hidden={!isOpen}
      onMouseMove={handleMouseMove}
    >
      <div className="pa-px-index-overlay__header">
        <div className="pa-px-index-overlay__brand">Personality Assessor</div>
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="pa-px-index-overlay__close-btn"
          aria-label="Close Index Menu"
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
              style={{
                fontVariationSettings: activeItem.path === item.path ? "'wdth' 98, 'opsz' 48" : "'wdth' 82, 'opsz' 36",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Floating preview with pointer parallax (retained in portrait on mobile) */}
        <div
          className="pa-px-index-overlay__preview-pane"
          style={{
            transform: `translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0)`,
            transition: 'transform 120ms ease-out',
          }}
        >
          {activeMedia && (
            <img
              src={activeMedia.sourceWebp || activeMedia.fallbackJpg}
              alt=""
              className="pa-px-index-overlay__floating-image"
            />
          )}
          <div className="pa-px-index-overlay__preview-desc">
            <span className="pa-px-index-overlay__preview-tag">
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
