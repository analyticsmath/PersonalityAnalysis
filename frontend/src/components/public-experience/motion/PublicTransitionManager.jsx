/**
 * Personality Assessor - Public Transition Manager
 * Orchestrates DOM transition portal carries, Canvas2D/WebGL pixel reconstruction,
 * and seamless cross-route continuity.
 * Zero full-screen white/black overlays.
 */

import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { VisualActorRegistry } from '../canvas/VisualActorRegistry';
import { getTransitionFamily, TRANSITION_FAMILIES } from './routeTransitionRegistry';
import { transitionLayerController } from '../canvas/TransitionLayer';
import { transitionPortalController } from './TransitionPortal';
import { publicMotionController } from './publicMotionController';
import { usePublicCapabilities } from './usePublicCapabilities';

export const PublicTransitionManager = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const { prefersReducedMotion, hasWebGL } = usePublicCapabilities();

  useEffect(() => {
    const fromPath = prevPathRef.current;
    const toPath = location.pathname;

    if (fromPath === toPath) return;

    const transition = getTransitionFamily(fromPath, toPath);

    if (prefersReducedMotion) {
      publicMotionController.scrollTo(0, { immediate: true });
      publicMotionController.refresh();
      prevPathRef.current = toPath;
      return;
    }

    // Expose authoritative debug state without fake placeholders
    if (typeof window !== 'undefined') {
      window.__PX_DEBUG__ = window.__PX_DEBUG__ || {};
      window.__PX_DEBUG__.transition = {
        family: transition.family,
        phase: 'start',
        sourceRect: null,
        destRect: null,
        actorType: transition.sourceActorId || 'dom-clone',
        progress: 0,
        fallbackMode: hasWebGL ? 'webgl' : 'dom',
      };
    }

    // ── A. SHARED_MEDIA: Home -> Career / Progress ──
    if (transition.family === TRANSITION_FAMILIES.SHARED_MEDIA) {
      const sourceEl = document.querySelector('.pa-px-home-primary-actor') || document.querySelector('.visual-actor');
      const srcRect = sourceEl ? sourceEl.getBoundingClientRect() : {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const initialRect = {
        x: srcRect.left,
        y: srcRect.top,
        width: srcRect.width,
        height: srcRect.height,
      };

      transitionPortalController.startMediaCarry({
        sourceEl,
        assetKey: transition.sourceAssetKey || 'homeWorldEntry',
        alt: 'Contextual environment',
        initialRect,
      });

      if (window.__PX_DEBUG__?.transition) {
        window.__PX_DEBUG__.transition.sourceRect = initialRect;
      }

      // Smoothly scroll window to top
      window.scrollTo(0, 0);

      // Destination measurement & animation
      const targetDestWidth = Math.min(window.innerWidth * 0.48, 680);
      const targetDestHeight = targetDestWidth * 0.625;
      const targetDestRect = {
        x: window.innerWidth * 0.08,
        y: window.innerHeight * 0.24,
        width: targetDestWidth,
        height: targetDestHeight,
      };

      if (window.__PX_DEBUG__?.transition) {
        window.__PX_DEBUG__.transition.destRect = targetDestRect;
      }

      const animState = {
        x: initialRect.x,
        y: initialRect.y,
        width: initialRect.width,
        height: initialRect.height,
        opacity: 1,
      };

      gsap.to(animState, {
        x: targetDestRect.x,
        y: targetDestRect.y,
        width: targetDestRect.width,
        height: targetDestRect.height,
        opacity: 0,
        duration: transition.duration || 0.75,
        ease: 'power3.inOut',
        onUpdate: function () {
          transitionPortalController.updateMediaRect(animState, animState.opacity);
          if (window.__PX_DEBUG__?.transition) {
            window.__PX_DEBUG__.transition.progress = this.progress();
            window.__PX_DEBUG__.transition.phase = 'animating';
          }
        },
        onComplete: () => {
          transitionPortalController.end();
          if (window.__PX_DEBUG__?.transition) {
            window.__PX_DEBUG__.transition.phase = 'settled';
            window.__PX_DEBUG__.transition.progress = 1.0;
          }
          publicMotionController.refresh();
        },
      });
    }

    // ── B. SHARED_PHRASE: Home -> How ──
    else if (transition.family === TRANSITION_FAMILIES.SHARED_PHRASE) {
      const sourcePhraseEl = document.querySelector('.pa-px-source-sentence');
      const srcRect = sourcePhraseEl ? sourcePhraseEl.getBoundingClientRect() : {
        left: window.innerWidth * 0.06,
        top: window.innerHeight * 0.36,
        width: Math.min(window.innerWidth * 0.5, 720),
        height: 80,
      };

      const initialRect = {
        x: srcRect.left,
        y: srcRect.top,
        width: srcRect.width,
        height: srcRect.height,
      };

      transitionPortalController.startPhraseCarry({
        phraseText: 'I clarify the constraints first, then choose the smallest reversible step.',
        initialRect,
        fontSettings: "'wdth' 86",
      });

      window.scrollTo(0, 0);

      const destRect = {
        x: window.innerWidth * 0.06,
        y: window.innerHeight * 0.38,
        width: Math.min(window.innerWidth * 0.5, 700),
        height: 80,
      };

      const animState = {
        x: initialRect.x,
        y: initialRect.y,
        width: initialRect.width,
        opacity: 1,
      };

      gsap.to(animState, {
        x: destRect.x,
        y: destRect.y,
        width: destRect.width,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.inOut',
        onUpdate: function () {
          transitionPortalController.updatePhraseRect(animState, "'wdth' 90", animState.opacity);
          if (window.__PX_DEBUG__?.transition) {
            window.__PX_DEBUG__.transition.progress = this.progress();
          }
        },
        onComplete: () => {
          transitionPortalController.end();
          if (window.__PX_DEBUG__?.transition) {
            window.__PX_DEBUG__.transition.phase = 'settled';
          }
          publicMotionController.refresh();
        },
      });
    }

    // ── C. PIXEL_RECONSTRUCTION: Home -> Trust ──
    else if (transition.family === TRANSITION_FAMILIES.PIXEL_RECONSTRUCTION) {
      window.scrollTo(0, 0);

      // Start Canvas2D pixel reconstruction fallback
      transitionPortalController.startPixelDissolve({
        sourceKey: transition.sourceAssetKey || 'homeSituationDetail',
        destKey: transition.destAssetKey || 'trustDiagnostic',
      });

      // Also trigger WebGL shader if active
      if (hasWebGL) {
        transitionLayerController.start({
          sourceKey: transition.sourceAssetKey || 'homeSituationDetail',
          destKey: transition.destAssetKey || 'trustDiagnostic',
        });
      }

      const animState = { p: 0 };
      gsap.to(animState, {
        p: 1,
        duration: transition.duration || 0.7,
        ease: 'power2.inOut',
        onUpdate: function () {
          transitionPortalController.updatePixelProgress(animState.p);
          if (hasWebGL) {
            transitionLayerController.setProgress(animState.p);
          }
          if (window.__PX_DEBUG__?.transition) {
            window.__PX_DEBUG__.transition.progress = animState.p;
            window.__PX_DEBUG__.transition.fallbackMode = hasWebGL ? 'webgl' : 'canvas2d';
          }
        },
        onComplete: () => {
          transitionPortalController.end();
          if (hasWebGL) {
            transitionLayerController.end();
          }
          if (window.__PX_DEBUG__?.transition) {
            window.__PX_DEBUG__.transition.phase = 'settled';
          }
          publicMotionController.refresh();
        },
      });
    }

    // ── D. QUIET_EDITORIAL / AUTH_LAYOUT ──
    else {
      window.scrollTo(0, 0);
      if (window.__PX_DEBUG__?.transition) {
        window.__PX_DEBUG__.transition.phase = 'settled';
        window.__PX_DEBUG__.transition.progress = 1.0;
      }
      const timer = setTimeout(() => {
        publicMotionController.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }

    prevPathRef.current = toPath;
  }, [location.pathname, prefersReducedMotion, hasWebGL]);

  return null;
};

export default PublicTransitionManager;

