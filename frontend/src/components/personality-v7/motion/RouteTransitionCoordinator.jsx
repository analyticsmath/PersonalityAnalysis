import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const ROUTE_KEYWORDS = {
  '/': 'CONTEXT',
  '/career-intelligence': 'ENVIRONMENT',
  '/how-it-works': 'PROCESS',
  '/progress': 'LATER EVIDENCE',
  '/methodology': 'METHOD',
  '/trust': 'PROVENANCE',
  '/privacy': 'CONTROL',
  '/login': 'EXISTING RECORD',
  '/signup': 'FIRST RECORD',
};

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/analytics',
  '/assessment',
  '/result',
  '/reports',
  '/account',
  '/legacy',
];

const RouteTransitionContext = createContext({
  navigateWithTransition: () => {},
});

export const useRouteTransition = () => useContext(RouteTransitionContext);

export const RouteTransitionCoordinator = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [transitionState, setTransitionState] = useState({
    active: false,
    keyword: '',
    target: '',
  });

  const overlayRef = useRef(null);
  const traceLineRef = useRef(null);
  const wordRef = useRef(null);
  const currentTimelineRef = useRef(null);
  const pendingTargetRef = useRef(null);

  const isProtectedRoute = (path) => {
    return PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix));
  };

  const navigateWithTransition = useCallback(
    (targetPath) => {
      // If either route is protected or reduced motion is enabled, navigate directly
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced || isProtectedRoute(location.pathname) || isProtectedRoute(targetPath)) {
        navigate(targetPath);
        return;
      }

      if (location.pathname === targetPath) return;

      const isMobile = window.innerWidth <= 768;
      const totalDuration = isMobile ? 0.52 : 0.72;

      const keyword = ROUTE_KEYWORDS[targetPath] || 'EVIDENCE';
      pendingTargetRef.current = targetPath;

      // Interruption handling: kill active timeline if running
      if (currentTimelineRef.current) {
        currentTimelineRef.current.kill();
      }

      setTransitionState({
        active: true,
        keyword,
        target: targetPath,
      });

      const overlay = overlayRef.current;
      const trace = traceLineRef.current;
      const word = wordRef.current;
      const mainContent = document.getElementById('main-content');

      const tl = gsap.timeline({
        onComplete: () => {
          setTransitionState({ active: false, keyword: '', target: '' });
          currentTimelineRef.current = null;
          pendingTargetRef.current = null;
        },
      });

      currentTimelineRef.current = tl;

      // Phase 1 (0–20%): Current composition scales slightly
      if (mainContent) {
        tl.to(mainContent, {
          scale: 0.985,
          opacity: 0.85,
          duration: totalDuration * 0.2,
          ease: 'power2.inOut',
        });
      }

      // Phase 2 (15–50%): Oxblood trace enters and curved mask expands
      tl.set(overlay, { display: 'flex', opacity: 1 }, 0);
      tl.fromTo(
        overlay,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: totalDuration * 0.35,
          ease: 'power4.inOut',
        },
        totalDuration * 0.15
      );

      if (trace) {
        tl.fromTo(
          trace,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: totalDuration * 0.3, ease: 'power3.out' },
          totalDuration * 0.18
        );
      }

      if (word) {
        tl.fromTo(
          word,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: totalDuration * 0.25, ease: 'power3.out' },
          totalDuration * 0.22
        );
      }

      // Phase 3 (45–70%): Mount target route and reset scroll behind mask
      tl.add(() => {
        const destination = pendingTargetRef.current;
        if (destination) {
          navigate(destination);
          window.scrollTo(0, 0);
          document.body.focus();
        }
      }, totalDuration * 0.5);

      // Phase 4 (65–100%): Mask retracts & destination enters
      tl.to(
        overlay,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: totalDuration * 0.35,
          ease: 'power4.inOut',
        },
        totalDuration * 0.65
      );

      if (mainContent) {
        tl.fromTo(
          mainContent,
          { y: 24, opacity: 0.7, scale: 1 },
          { y: 0, opacity: 1, duration: totalDuration * 0.35, ease: 'power3.out' },
          totalDuration * 0.65
        );
      }
    },
    [location.pathname, navigate]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (currentTimelineRef.current) {
        currentTimelineRef.current.kill();
      }
    };
  }, []);

  return (
    <RouteTransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      <div
        ref={overlayRef}
        className="pa-route-transition-overlay"
        aria-hidden={!transitionState.active}
        style={{ display: 'none' }}
      >
        <div className="pa-route-transition-inner">
          <div ref={traceLineRef} className="pa-route-transition-trace" />
          <span ref={wordRef} className="pa-route-transition-word">
            {transitionState.keyword}
          </span>
        </div>
      </div>
    </RouteTransitionContext.Provider>
  );
};

export default RouteTransitionCoordinator;
