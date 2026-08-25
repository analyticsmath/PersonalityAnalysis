/**
 * Personality Assessor - Public Route Stage
 * Coexistence-aware stage component rendering public route content.
 * Guarantees outgoing route DOM remains mounted while incoming route mounts simultaneously,
 * eliminating sequential blank flashes or unmounted gaps.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

export const PublicRouteStage = ({ children }) => {
  const location = useLocation();
  const { prefersReducedMotion } = usePublicCapabilities();

  // State model for simultaneous route coexistence
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [currentChildren, setCurrentChildren] = useState(children);

  const [outgoingPath, setOutgoingPath] = useState(null);
  const [outgoingChildren, setOutgoingChildren] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPathRef.current) {
      setCurrentChildren(children);
      return;
    }

    if (prefersReducedMotion) {
      prevPathRef.current = location.pathname;
      setCurrentPath(location.pathname);
      setCurrentChildren(children);
      setOutgoingPath(null);
      setOutgoingChildren(null);
      setIsTransitioning(false);
      return;
    }

    // New route navigated: start dual layer coexistence
    setOutgoingPath(prevPathRef.current);
    setOutgoingChildren(currentChildren);
    setCurrentPath(location.pathname);
    setCurrentChildren(children);
    setIsTransitioning(true);

    prevPathRef.current = location.pathname;

    // Settle coexistence after transition duration (~450ms)
    const settleTimer = setTimeout(() => {
      setOutgoingPath(null);
      setOutgoingChildren(null);
      setIsTransitioning(false);
    }, 450);

    return () => clearTimeout(settleTimer);
  }, [location.pathname, children, prefersReducedMotion]);

  return (
    <div
      className="pa-px-route-stage"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--px-ink, #121416)',
        color: 'var(--px-white, #F7F8F8)',
        overflow: 'hidden',
      }}
    >
      {/* ── Outgoing Route Layer (Remains during transition) ── */}
      {isTransitioning && outgoingChildren && (
        <div
          key={`outgoing-${outgoingPath}`}
          className="pa-px-route-layer pa-px-route-layer--outgoing"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            minHeight: '100vh',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 380ms cubic-bezier(0.25, 1, 0.5, 1)',
            zIndex: 1,
          }}
        >
          {outgoingChildren}
        </div>
      )}

      {/* ── Incoming / Active Route Layer ── */}
      <div
        key={`current-${currentPath}`}
        className="pa-px-route-layer pa-px-route-layer--incoming"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          opacity: 1,
          zIndex: 2,
          transition: isTransitioning ? 'opacity 380ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        }}
      >
        {currentChildren}
      </div>
    </div>
  );
};

export default PublicRouteStage;
