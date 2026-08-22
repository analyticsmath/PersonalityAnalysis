import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';
import { useCursor } from '../motion/CursorCoordinator';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import EvidenceStrip from '../living-record/EvidenceStrip';

const MENU_ITEMS = [
  { num: '01', to: '/', label: 'Home', quote: '“Keep the source attached.”', previewAsset: MEDIA_ASSETS_V7.homeContext },
  { num: '02', to: '/career-intelligence', label: 'Career Intelligence', quote: '“Where work happens changes what evidence means.”', previewAsset: MEDIA_ASSETS_V7.careerComplexMachine },
  { num: '03', to: '/how-it-works', label: 'How It Works', quote: '“From a single response to an ongoing record.”', previewAsset: MEDIA_ASSETS_V7.howProcess },
  { num: '04', to: '/progress', label: 'Progress Record', quote: '“A later assessment adds a record without erasing the first.”', previewAsset: MEDIA_ASSETS_V7.progressStudio },
  { num: '05', to: '/methodology', label: 'Methodology', quote: '“Every calculation and weighting layer is inspectable.”', previewAsset: MEDIA_ASSETS_V7.homeAnalysis },
  { num: '06', to: '/trust', label: 'Trust & Governance', quote: '“Every reading traces back to what created it.”', previewAsset: MEDIA_ASSETS_V7.trustInspection },
  { num: '07', to: '/privacy', label: 'Privacy Document', quote: '“Data belongs entirely to the individual.”', previewAsset: MEDIA_ASSETS_V7.signupFirstRecord },
];

export const CurvedMenu = ({ isOpen, onClose, triggerRef }) => {
  const location = useLocation();
  const { navigateWithTransition } = useRouteTransition();
  const { setCursorLabel, clearCursorLabel } = useCursor();

  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const previewRef = useRef(null);
  const [activeItem, setActiveItem] = useState(MENU_ITEMS[0]);
  const closeButtonRef = useRef(null);

  // Focus management & Escape key trap
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    const prevActive = document.activeElement;
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        if (triggerRef?.current) triggerRef.current.focus();
        return;
      }

      if (e.key === 'Tab' && containerRef.current) {
        const focusables = containerRef.current.querySelectorAll('a[href], button:not([disabled])');
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (prevActive && prevActive.focus) {
        try {
          prevActive.focus();
        } catch {
          // ignore
        }
      }
    };
  }, [isOpen, onClose, triggerRef]);

  // Record catalog entrance & exit animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.killTweensOf(el);
      gsap.killTweensOf(itemsRef.current);

      gsap.fromTo(
        el,
        {
          clipPath: 'circle(0% at 92% 5%)',
          opacity: 1,
          display: 'block',
        },
        {
          clipPath: 'circle(150% at 92% 5%)',
          duration: 0.54,
          ease: 'power4.inOut',
        }
      );

      gsap.fromTo(
        itemsRef.current,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.46,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.16,
        }
      );
    } else {
      gsap.to(el, {
        clipPath: 'circle(0% at 92% 5%)',
        duration: 0.42,
        ease: 'power4.inOut',
        onComplete: () => {
          if (el) el.style.display = 'none';
        },
      });
    }
  }, [isOpen]);

  const handleItemClick = (e, targetPath) => {
    e.preventDefault();
    onClose();
    clearCursorLabel();
    navigateWithTransition(targetPath);
  };

  const handleItemHover = (item) => {
    setActiveItem(item);
    setCursorLabel(item.label.toUpperCase());
  };

  const handleItemLeave = () => {
    clearCursorLabel();
  };

  return (
    <div
      ref={containerRef}
      className={`pa-curved-menu ${isOpen ? 'pa-curved-menu--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site index and navigation"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="pa-curved-menu__backdrop" />

      {/* Atmospheric Media Preview with Embedded Evidence Strip */}
      <div ref={previewRef} className="pa-curved-menu__preview" aria-hidden="true">
        {activeItem.previewAsset && (
          <img
            src={activeItem.previewAsset.source}
            alt=""
            className="pa-curved-menu__preview-img"
            loading="lazy"
          />
        )}
        <div className="pa-curved-menu__preview-strip">
          <EvidenceStrip
            quote={activeItem.quote}
            eyebrow="CATALOG SPECIMEN"
            sourceLabel={activeItem.label.toUpperCase()}
            theme="mineral"
            variant="source"
          />
        </div>
      </div>

      <div className="pa-v7-grid pa-curved-menu__grid">
        <div className="pa-curved-menu__header">
          <Link
            to="/"
            className="pa-curved-menu__brand"
            onClick={(e) => handleItemClick(e, '/')}
          >
            Personality Assessor
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className="pa-curved-menu__close-btn"
            onClick={onClose}
            aria-label="Close navigation index"
          >
            Close ✕
          </button>
        </div>

        <nav className="pa-curved-menu__nav" aria-label="Index routes">
          <ul className="pa-curved-menu__list">
            {MENU_ITEMS.map((item, idx) => {
              const isActive = location.pathname === item.to;
              return (
                <li
                  key={item.to}
                  ref={(node) => (itemsRef.current[idx] = node)}
                  className="pa-curved-menu__item"
                >
                  <a
                    href={item.to}
                    className={`pa-curved-menu__link ${isActive ? 'pa-curved-menu__link--active' : ''}`}
                    onClick={(e) => handleItemClick(e, item.to)}
                    onMouseEnter={() => handleItemHover(item)}
                    onMouseLeave={handleItemLeave}
                    onFocus={() => handleItemHover(item)}
                    onBlur={handleItemLeave}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="pa-curved-menu__num">{item.num}</span>
                    <span className="pa-curved-menu__label">{item.label}</span>
                    {isActive && <span className="pa-curved-menu__active-notch" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pa-curved-menu__footer">
          <div className="pa-curved-menu__auth-links">
            <Link
              to="/signup"
              className="pa-btn-primary-dark"
              onClick={(e) => handleItemClick(e, '/signup')}
            >
              Build profile
            </Link>
            <Link
              to="/login"
              className="pa-curved-menu__signin"
              onClick={(e) => handleItemClick(e, '/login')}
            >
              Sign in to record
            </Link>
          </div>
          <p className="pa-curved-menu__meta">
            Inspectable professional evidence across context, personality, interests, and work values.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurvedMenu;
