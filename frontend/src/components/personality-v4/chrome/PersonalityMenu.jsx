import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';
import ResponsivePicture from '../media/ResponsivePicture';

export const PersonalityMenu = ({ isOpen, onClose, triggerRef }) => {
  const overlayRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus first interactive element in menu
    firstLinkRef.current?.focus();

    // Escape listener
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={`pa-menu-overlay ${isOpen ? 'pa-menu-overlay--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation menu"
    >
      <div className="pa-menu-overlay__content">
        <div className="pa-menu-overlay__header">
          <Link to="/" onClick={onClose} className="pa-header__brand">
            Personality Assessor
          </Link>
          <button
            type="button"
            className="pa-menu-overlay__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            Close ✕
          </button>
        </div>

        <nav className="pa-menu-overlay__nav" aria-label="Mobile Navigation">
          <Link
            ref={firstLinkRef}
            to="/how-it-works"
            onClick={onClose}
            className="pa-menu-overlay__link"
          >
            How It Works
          </Link>
          <Link
            to="/career-intelligence"
            onClick={onClose}
            className="pa-menu-overlay__link"
          >
            Career Intelligence
          </Link>
          <Link
            to="/methodology"
            onClick={onClose}
            className="pa-menu-overlay__link"
          >
            Methodology
          </Link>
          <Link
            to="/trust"
            onClick={onClose}
            className="pa-menu-overlay__link"
          >
            Trust & Transparency
          </Link>
          <Link
            to="/progress"
            onClick={onClose}
            className="pa-menu-overlay__link"
          >
            Progress Record
          </Link>
          <Link
            to="/privacy"
            onClick={onClose}
            className="pa-menu-overlay__link"
          >
            Privacy
          </Link>
        </nav>

        <div className="pa-menu-overlay__footer">
          <Link
            to={getSignupAcquisitionUrl()}
            onClick={onClose}
            className="pa-btn pa-btn--primary"
          >
            Build my profile
          </Link>
          <Link
            to={getLoginUrl()}
            onClick={onClose}
            className="pa-btn pa-btn--secondary"
          >
            Sign in
          </Link>
        </div>
      </div>

      <div className="pa-menu-overlay__visual" aria-hidden="true">
        <ResponsivePicture
          asset={MEDIA_ASSETS.a01}
          alt=""
          sizes="34vw"
          objectPosition="50% 38%"
        />
      </div>
    </div>
  );
};

export default PersonalityMenu;
