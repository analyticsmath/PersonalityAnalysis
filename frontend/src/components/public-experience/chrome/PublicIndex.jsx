import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const indexItems = [
  { path: '/', label: 'Home', mediaKey: 'homeHeroContext', desc: 'An evidence atlas tracing professional behavior from single responses across work conditions.' },
  { path: '/career-intelligence', label: 'Career Intelligence', mediaKey: 'workworldPrecision', desc: 'A multi-dimensional professional field atlas with 17 canonical occupational profiles.' },
  { path: '/how-it-works', label: 'How It Works', mediaKey: 'howTransformation', desc: 'Follow one answer from source capture to multi-model psychometric calibration.' },
  { path: '/progress', label: 'Progress', mediaKey: 'workworldAutonomy', desc: 'Longitudinal comparison: inspect what held stable and what shifted over time.' },
  { path: '/trust', label: 'Trust & Provenance', mediaKey: 'trustDiagnostic', desc: 'Inspect the evidence chain from participant response to user sovereign data rights.' },
  { path: '/methodology', label: 'Methodology', mediaKey: 'homeSituationDetail', desc: 'Independent psychometric dimensions, validity states, and fixed mathematical career-fit weights.' },
  { path: '/privacy', label: 'Privacy', mediaKey: 'homeProcessDetail', desc: 'Plain-language governance, zero third-party AI training, and sovereign data controls.' },
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
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveItem((prev) => {
            const idx = indexItems.findIndex((item) => item.path === prev.path);
            return indexItems[(idx + 1) % indexItems.length];
          });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveItem((prev) => {
            const idx = indexItems.findIndex((item) => item.path === prev.path);
            return indexItems[(idx - 1 + indexItems.length) % indexItems.length];
          });
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
    const x = (e.clientX / window.innerWidth - 0.5) * 16;
    const y = (e.clientY / window.innerHeight - 0.5) * 16;
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
              className={`pa-px-index-overlay__nav-item ${activeItem.path === item.path ? 'pa-px-index-overlay__nav-item--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Uncarded Preview Photo */}
        <div
          className="pa-px-index-overlay__preview-pane"
          style={{
            transform: `translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0)`,
            transition: 'transform 140ms ease-out',
          }}
        >
          <div className="pa-px-index-overlay__image-wrap">
            {activeMedia && (
              <img
                src={activeMedia.sourceWebp || activeMedia.fallbackJpg}
                alt=""
                className="pa-px-index-overlay__floating-image"
              />
            )}
          </div>
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
