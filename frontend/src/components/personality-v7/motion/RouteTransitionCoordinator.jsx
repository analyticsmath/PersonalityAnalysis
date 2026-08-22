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
  markRouteReady: () => {},
  transitionState: { active: false, keyword: '', target: '' },
});

export const useRouteTransition = () => useContext(RouteTransitionContext);

/** Extracts clean pathname from target string (stripping query string and hash) */
export const getCleanPathname = (targetPath) => {
  if (!targetPath) return '/';
  const clean = targetPath.split('?')[0].split('#')[0];
  return clean || '/';
};

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
  const currentGenerationRef = useRef(0);
  const readyRoutesRef = useRef(new Set());
  const readyListenerRef = useRef(null);
  const safetyTimerRef = useRef(null);

  const isProtectedRoute = (path) => {
    return PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix));
  };

  /** Called by destination route (e.g. PublicLayout) to signal that its DOM is mounted */
  const markRouteReady = useCallback((pathname) => {
    const clean = getCleanPathname(pathname);
    readyRoutesRef.current.add(clean);
    if (readyListenerRef.current) {
      readyListenerRef.current(clean);
    }
  }, []);

  const navigateWithTransition = useCallback(
    (targetPath) => {
      const cleanTarget = getCleanPathname(targetPath);
      const cleanCurrent = getCleanPathname(location.pathname);

      // If either route is protected or reduced motion is enabled, navigate directly
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced || isProtectedRoute(cleanCurrent) || isProtectedRoute(cleanTarget)) {
        navigate(targetPath);
        return;
      }

      if (cleanCurrent === cleanTarget && location.search === (targetPath.includes('?') ? `?${targetPath.split('?')[1]}` : '')) {
        return;
      }

      // Increment generation token so any previous transition attempt is superseded (Amendment 9)
      const thisGeneration = ++currentGenerationRef.current;
      const keyword = ROUTE_KEYWORDS[cleanTarget] || 'EVIDENCE';
      pendingTargetRef.current = targetPath;

      // Interruption / Latest-Navigation-Wins handling
      if (currentTimelineRef.current) {
        currentTimelineRef.current.kill();
      }
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
      }

      setTransitionState({
        active: true,
        keyword,
        target: targetPath,
      });

      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const totalDuration = isMobile ? 0.48 : 0.64;

      const overlay = overlayRef.current;
      const trace = traceLineRef.current;
      const word = wordRef.current;
      const mainContent = document.getElementById('main-content');

      // Clear ready status for pending target so we wait for its fresh mount
      readyRoutesRef.current.delete(cleanTarget);

      const tl = gsap.timeline();
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

      // Phase 2 (15–50%): Oxblood trace enters and Carbon mask expands to cover viewport
      if (overlay) {
        tl.set(overlay, { display: 'flex', opacity: 1, pointerEvents: 'none' }, 0);
        tl.fromTo(
          overlay,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: totalDuration * 0.35,
            ease: 'power4.inOut',
          },
          totalDuration * 0.12
        );
      }

      if (trace) {
        tl.fromTo(
          trace,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: totalDuration * 0.28, ease: 'power3.out' },
          totalDuration * 0.16
        );
      }

      if (word) {
        tl.fromTo(
          word,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: totalDuration * 0.24, ease: 'power3.out' },
          totalDuration * 0.2
        );
      }

      // Phase 3: Once viewport is visually owned by mask, execute navigate()
      tl.add(() => {
        // If a newer navigation superseded this generation, abort this execution
        if (currentGenerationRef.current !== thisGeneration) return;

        const destination = pendingTargetRef.current;
        if (!destination) return;

        navigate(destination);

        // Function to proceed with uncovering once route DOM is ready
        const proceedWithEntrance = () => {
          if (currentGenerationRef.current !== thisGeneration) return;

          if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
          readyListenerRef.current = null;

          // Reset scroll while fully covered
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }

          // Move focus to new #main-content with preventScroll
          const newMain = document.getElementById('main-content');
          if (newMain) {
            newMain.focus({ preventScroll: true });
          }

          const exitTl = gsap.timeline({
            onComplete: () => {
              if (currentGenerationRef.current === thisGeneration) {
                setTransitionState({ active: false, keyword: '', target: '' });
                if (overlay) overlay.style.display = 'none';
                currentTimelineRef.current = null;
                pendingTargetRef.current = null;
              }
            },
          });
          currentTimelineRef.current = exitTl;

          // Mask retracts & destination enters
          if (overlay) {
            exitTl.to(
              overlay,
              {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                duration: totalDuration * 0.35,
                ease: 'power4.inOut',
              },
              0
            );
          }

          const activeMain = document.getElementById('main-content');
          if (activeMain) {
            exitTl.fromTo(
              activeMain,
              { y: 20, opacity: 0.7, scale: 1 },
              { y: 0, opacity: 1, duration: totalDuration * 0.32, ease: 'power3.out' },
              0.04
            );
          }
        };

        const targetClean = getCleanPathname(destination);

        // Check if destination route is already ready or wait for signal
        if (readyRoutesRef.current.has(targetClean)) {
          proceedWithEntrance();
        } else {
          readyListenerRef.current = (readyPath) => {
            if (readyPath === targetClean && currentGenerationRef.current === thisGeneration) {
              proceedWithEntrance();
            }
          };

          // Safety fallback timeout: max 2000ms in case bundle load is delayed
          safetyTimerRef.current = setTimeout(() => {
            if (currentGenerationRef.current === thisGeneration) {
              proceedWithEntrance();
            }
          }, 2000);
        }
      }, totalDuration * 0.48);
    },
    [location.pathname, location.search, navigate]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (currentTimelineRef.current) currentTimelineRef.current.kill();
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, []);

  return (
    <RouteTransitionContext.Provider
      value={{ navigateWithTransition, markRouteReady, transitionState }}
    >
      {children}
      <div
        ref={overlayRef}
        className="pa-route-transition-overlay"
        aria-hidden={!transitionState.active}
        style={{ display: 'none', pointerEvents: 'none' }}
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
