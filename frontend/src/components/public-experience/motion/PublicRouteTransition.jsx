import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { getRouteTransition } from '../../../content/public-experience/transitionMap';
import { scrollState, getActor, getPreNavSnapshot, clearPreNavSnapshot } from './scrollState';
import { usePublicCapabilities } from './usePublicCapabilities';
import { PixelTransitionCanvas } from './PixelTransitionCanvas';

export const PublicRouteTransition = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const [activeTransition, setActiveTransition] = useState(null);
  const [pixelProgress, setPixelProgress] = useState(0);
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prevPathRef.current === location.pathname) return;

    const fromPath = prevPathRef.current;
    const toPath = location.pathname;
    prevPathRef.current = toPath;

    // Window scroll to top immediately upon navigation
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    if (prefersReducedMotion) {
      clearPreNavSnapshot();
      return;
    }

    const config = getRouteTransition(fromPath, toPath);

    // Identify if pixel transition applies (Home -> Trust, Trust state)
    const isPixelRoute = (fromPath === '/' && toPath === '/trust') || (fromPath === '/trust' && toPath === '/');

    if (isPixelRoute) {
      let start = performance.now();
      const duration = 480;
      const animatePixel = (now) => {
        const elapsed = now - start;
        const p = Math.min(elapsed / duration, 1);
        setPixelProgress(p);
        if (p < 1) {
          requestAnimationFrame(animatePixel);
        } else {
          setPixelProgress(0);
        }
      };
      requestAnimationFrame(animatePixel);
    }

    // Shared Actor Carry Identification from Pre-Navigation Snapshot
    const snapshot = getPreNavSnapshot();
    if (snapshot && snapshot.actor && performance.now() - snapshot.timestamp < 1500) {
      const sourceRect = snapshot.actor.rect;

      setActiveTransition({
        type: 'carry',
        rect: sourceRect,
        actorKey: snapshot.actor.actorKey,
        targetPath: toPath,
      });

      // Clear the snapshot once consumed
      clearPreNavSnapshot();

      // On next tick after destination route mounts, resolve position
      const frameId = requestAnimationFrame(() => {
        const destElement = document.querySelector(`[data-transition-actor]`);
        if (destElement) {
          const destRect = destElement.getBoundingClientRect();
          setActiveTransition((prev) =>
            prev ? { ...prev, destRect } : null
          );
        }
      });

      const timer = setTimeout(() => {
        setActiveTransition(null);
      }, 420);

      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(timer);
      };
    } else {
      // Fallback: check registered actor
      let carryActor = null;
      if (fromPath === '/' && toPath === '/career-intelligence') {
        carryActor = getActor('workworld-active-media') || getActor('home-hero-media');
      } else if (fromPath === '/' && (toPath === '/how-it-works' || toPath === '/trust')) {
        carryActor = getActor('source-phrase');
      } else if (fromPath === '/' && toPath === '/progress') {
        carryActor = getActor('temporal-baseline');
      }

      if (carryActor && carryActor.element) {
        try {
          const rect = carryActor.element.getBoundingClientRect();
          setActiveTransition({
            type: 'carry',
            rect,
            text: carryActor.text,
            assetKey: carryActor.assetKey,
          });

          const timer = setTimeout(() => {
            setActiveTransition(null);
          }, 380);

          return () => clearTimeout(timer);
        } catch {
          setActiveTransition(null);
        }
      }
    }
  }, [location.pathname, prefersReducedMotion]);

  return (
    <>
      {pixelProgress > 0 && (
        <PixelTransitionCanvas progress={pixelProgress} />
      )}

      {activeTransition && activeTransition.type === 'carry' && (
        <div
          className="pa-px-transition-carry-actor"
          style={{
            position: 'fixed',
            top: activeTransition.destRect ? activeTransition.destRect.top : activeTransition.rect.top,
            left: activeTransition.destRect ? activeTransition.destRect.left : activeTransition.rect.left,
            width: activeTransition.destRect ? activeTransition.destRect.width : activeTransition.rect.width,
            height: activeTransition.destRect ? activeTransition.destRect.height : activeTransition.rect.height,
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: activeTransition.destRect ? 0.3 : 0.85,
            transition: 'all 380ms cubic-bezier(0.16, 1, 0.3, 1)',
            transform: activeTransition.destRect ? 'none' : 'translateY(-14px) scale(0.98)',
            backgroundColor: 'var(--pa-mineral)',
            borderRadius: 'var(--px-radius-xs)',
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default PublicRouteTransition;
