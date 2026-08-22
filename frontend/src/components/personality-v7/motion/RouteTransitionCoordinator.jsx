import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import EvidenceStrip from '../living-record/EvidenceStrip';

const ROUTE_METADATA = {
  '/': { keyword: 'CONTEXT', quote: '“Keep the source attached.”', label: 'SOURCE RETAINED' },
  '/career-intelligence': { keyword: 'ENVIRONMENT', quote: '“Where work happens changes what evidence means.”', label: 'WORKWORLD ATLAS' },
  '/how-it-works': { keyword: 'PROCESS', quote: '“From a single response to an ongoing record.”', label: 'EVIDENCE ENGINE' },
  '/progress': { keyword: 'LATER EVIDENCE', quote: '“A later assessment adds a record without erasing the first.”', label: 'LONGITUDINAL FILM' },
  '/methodology': { keyword: 'METHOD', quote: '“Every calculation and career weighting layer is inspectable.”', label: 'CALIBRATION ROOM' },
  '/trust': { keyword: 'PROVENANCE', quote: '“Every reading traces back to what created it.”', label: 'TRACEBACK' },
  '/privacy': { keyword: 'CONTROL', quote: '“Data belongs entirely to the individual.”', label: 'USER RIGHTS' },
  '/login': { keyword: 'EXISTING RECORD', quote: '“Reopen your stored living record.”', label: 'REOPEN RECORD' },
  '/signup': { keyword: 'FIRST RECORD', quote: '“Establish your initial living record.”', label: 'FIRST RECORD' },
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
    quote: '',
    label: '',
  });

  const overlayRef = useRef(null);
  const stripWrapRef = useRef(null);
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

      // Increment generation token so any previous transition attempt is superseded (latest-navigation-wins)
      const thisGeneration = ++currentGenerationRef.current;
      const meta = ROUTE_METADATA[cleanTarget] || { keyword: 'EVIDENCE', quote: '“Keep the source attached.”', label: 'LIVING RECORD' };
      pendingTargetRef.current = targetPath;

      // Interruption / Latest-Navigation-Wins handling
      if (currentTimelineRef.current) {
        currentTimelineRef.current.kill();
        currentTimelineRef.current = null;
      }
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = null;
      }

      setTransitionState({
        active: true,
        keyword: meta.keyword,
        target: targetPath,
        quote: meta.quote,
        label: meta.label,
      });

      const overlay = overlayRef.current;
      const stripWrap = stripWrapRef.current;

      const totalDuration = 0.58;

      const tl = gsap.timeline({
        onComplete: () => {
          // Keep covered while waiting for destination route-ready signal
        },
      });
      currentTimelineRef.current = tl;

      if (overlay) {
        overlay.style.display = 'flex';
        overlay.style.pointerEvents = 'auto';

        // Phase 1: Carbon ground sweeps across (0–280ms)
        tl.fromTo(
          overlay,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: totalDuration * 0.48,
            ease: 'power3.inOut',
          },
          0
        );
      }

      // Phase 2: EvidenceStrip protagonist handoff
      if (stripWrap) {
        tl.fromTo(
          stripWrap,
          { y: 30, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: totalDuration * 0.4,
            ease: 'power3.out',
          },
          totalDuration * 0.18
        );
      }

      // Phase 3: Execute navigation while fully covered
      setTimeout(() => {
        if (currentGenerationRef.current !== thisGeneration) return;

        const destination = pendingTargetRef.current || targetPath;
        navigate(destination);

        // Reset scroll while covered
        window.scrollTo(0, 0);

        const proceedWithEntrance = () => {
          if (currentGenerationRef.current !== thisGeneration) return;

          const exitTl = gsap.timeline({
            onComplete: () => {
              if (currentGenerationRef.current === thisGeneration) {
                setTransitionState({ active: false, keyword: '', target: '', quote: '', label: '' });
                if (overlay) {
                  overlay.style.display = 'none';
                  overlay.style.pointerEvents = 'none';
                }
                currentTimelineRef.current = null;
                pendingTargetRef.current = null;

                // Handoff focus to main content
                const mainEl = document.getElementById('main-content');
                if (mainEl) {
                  mainEl.setAttribute('tabindex', '-1');
                  mainEl.focus({ preventScroll: true });
                }
              }
            },
          });
          currentTimelineRef.current = exitTl;

          if (stripWrap) {
            exitTl.to(
              stripWrap,
              { y: -20, opacity: 0, duration: totalDuration * 0.22, ease: 'power2.in' },
              0
            );
          }

          if (overlay) {
            exitTl.to(
              overlay,
              {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                duration: totalDuration * 0.35,
                ease: 'power4.inOut',
              },
              totalDuration * 0.1
            );
          }

          const activeMain = document.getElementById('main-content');
          if (activeMain) {
            exitTl.fromTo(
              activeMain,
              { y: 16, opacity: 0.8 },
              { y: 0, opacity: 1, duration: totalDuration * 0.32, ease: 'power3.out' },
              totalDuration * 0.12
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

          // Safety fallback timeout: max 2000ms
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
        <div ref={stripWrapRef} className="pa-route-transition-strip-wrap">
          <EvidenceStrip
            quote={transitionState.quote || '“Keep the source attached.”'}
            eyebrow="NAVIGATING RECORD"
            sourceLabel={transitionState.label || 'LIVING RECORD'}
            theme="mineral"
            variant="source"
          />
        </div>
      </div>
    </RouteTransitionContext.Provider>
  );
};

export default RouteTransitionCoordinator;
