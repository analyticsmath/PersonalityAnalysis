import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollContext } from '../motion/SmoothScrollProvider';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

const FOOTER_VOCABULARY = [
  'BIG FIVE',
  'RIASEC',
  'WORK VALUES',
  'CONTEXT',
  'CAREER CONDITIONS',
  'HISTORY',
  'PROVENANCE',
  'CONTROL',
];

const FOOTER_LINKS = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/career-intelligence', label: 'Career intelligence' },
  { to: '/progress', label: 'Progress' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/trust', label: 'Trust' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/login', label: 'Sign in' },
  { to: '/signup', label: 'Build profile' },
];

export const PublicFooter = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const { subscribe } = useScrollContext();
  const { navigateWithTransition } = useRouteTransition();

  const crawlerTrackRef = useRef(null);
  const positionRef = useRef(0);

  // Infinite Text Move on Scroll: translates based on scroll movement
  useEffect(() => {
    const track = crawlerTrackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const unsubscribe = subscribe((scrollState) => {
      // scrollState.velocity is positive scrolling down, negative scrolling up
      const delta = (scrollState.velocity || 0) * 0.45;
      positionRef.current -= delta;

      // Wrap around track width
      const maxScroll = track.scrollWidth / 2 || 1000;
      if (positionRef.current < -maxScroll) {
        positionRef.current += maxScroll;
      } else if (positionRef.current > 0) {
        positionRef.current -= maxScroll;
      }

      track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
    });

    return () => unsubscribe();
  }, [subscribe]);

  const handleLinkClick = (e, to) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  return (
    <footer className="pa-footer" role="contentinfo" data-tone="dark">
      {/* Infinite Text Move on Scroll Crawler */}
      <div className="pa-footer__crawler" aria-hidden="true">
        <div ref={crawlerTrackRef} className="pa-footer__crawler-track">
          {[...FOOTER_VOCABULARY, ...FOOTER_VOCABULARY, ...FOOTER_VOCABULARY].map((word, idx) => (
            <span key={`${word}-${idx}`} className="pa-footer__crawler-item">
              {word}
              <span className="pa-footer__crawler-dot">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="pa-v7-grid pa-footer__grid">
        <div className="pa-footer__brand-block">
          <span className="pa-footer__brand">Personality Assessor</span>
          <p className="pa-footer__statement">
            Evidence can change. Your record should be able to change with it.
          </p>
        </div>

        <nav className="pa-footer__nav" aria-label="Footer navigation">
          <div className="pa-footer__links">
            {FOOTER_LINKS.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <a
                  key={to}
                  href={to}
                  className={`pa-footer__link ${isActive ? 'pa-footer__link--active' : ''}`}
                  onClick={(e) => handleLinkClick(e, to)}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </nav>

        <div className="pa-footer__bottom">
          <span className="pa-footer__copy">&copy; {currentYear} Personality Assessor. All rights reserved.</span>
          <span className="pa-footer__tagline">Inspectable professional evidence</span>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
