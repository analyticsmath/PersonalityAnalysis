/**
 * Personality Assessor - Public Transition Manager
 * Orchestrates shared media carries, shader pixel reconstruction, and route coexistence.
 * Zero full-screen white/black overlays.
 */

import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { VisualActorRegistry } from '../canvas/VisualActorRegistry';
import { VisualSlotRegistry } from '../canvas/VisualSlotRegistry';
import { getTransitionFamily, TRANSITION_FAMILIES } from './routeTransitionRegistry';
import { transitionLayerController } from '../canvas/TransitionLayer';
import { publicMotionController } from './publicMotionController';
import { usePublicCapabilities } from './usePublicCapabilities';

export const PublicTransitionManager = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const { prefersReducedMotion } = usePublicCapabilities();

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

    // ── A. SHARED_MEDIA: Home -> Career / Progress ──
    if (transition.family === TRANSITION_FAMILIES.SHARED_MEDIA) {
      const sourceActor = VisualActorRegistry.get(transition.sourceActorId || 'home-observation-primary');
      if (sourceActor) {
        // 1. Capture current source geometry and switch to manual mode
        const initialRect = { ...sourceActor.rect };
        VisualActorRegistry.mutateFrame(sourceActor.id, {
          mode: 'manual',
          transitionRole: 'shared',
        });

        // 2. Scroll destination route to top smoothly
        publicMotionController.scrollTo(0, { immediate: true });

        // 3. Poll / wait for destination slot registration
        let destinationMeasured = false;
        const targetSlotId = transition.destSlotId || 'career-entry-world';

        const checkSlotAndAnimate = () => {
          const destSlot = VisualSlotRegistry.get(targetSlotId);
          if (destSlot && destSlot.element) {
            destinationMeasured = true;
            const destRect = VisualSlotRegistry.updateRect(targetSlotId);

            const animState = {
              x: initialRect.x || 0,
              y: initialRect.y || 0,
              width: initialRect.width || window.innerWidth * 0.4,
              height: initialRect.height || window.innerHeight * 0.5,
            };

            gsap.to(animState, {
              x: destRect.x,
              y: destRect.y,
              width: destRect.width,
              height: destRect.height,
              duration: transition.duration || 0.75,
              ease: 'power3.inOut',
              onUpdate: () => {
                VisualActorRegistry.mutateFrame(sourceActor.id, {
                  rect: {
                    x: animState.x,
                    y: animState.y,
                    width: animState.width,
                    height: animState.height,
                  },
                });
              },
              onComplete: () => {
                VisualActorRegistry.updateLifecycle(sourceActor.id, {
                  mode: 'tracking',
                  boundSlotId: targetSlotId,
                });
                publicMotionController.refresh();
              },
            });
          }
        };

        // Attempt immediate measurement or delay slightly for DOM mount
        checkSlotAndAnimate();
        if (!destinationMeasured) {
          const timer = setTimeout(checkSlotAndAnimate, 60);
          return () => clearTimeout(timer);
        }
      } else {
        publicMotionController.scrollTo(0, { immediate: true });
        publicMotionController.refresh();
      }
    }

    // ── B. PIXEL_RECONSTRUCTION: Home -> Trust ──
    else if (transition.family === TRANSITION_FAMILIES.PIXEL_RECONSTRUCTION) {
      publicMotionController.scrollTo(0, { immediate: true });

      transitionLayerController.start({
        sourceKey: transition.sourceAssetKey || 'homeSituationDetail',
        destKey: transition.destAssetKey || 'trustDiagnostic',
      });

      const animState = { p: 0 };
      gsap.to(animState, {
        p: 1,
        duration: transition.duration || 0.7,
        ease: 'power2.inOut',
        onUpdate: () => {
          transitionLayerController.setProgress(animState.p);
        },
        onComplete: () => {
          transitionLayerController.end();
          publicMotionController.refresh();
        },
      });
    }

    // ── C. QUIET_EDITORIAL / AUTH_LAYOUT / SHARED_PHRASE ──
    else {
      publicMotionController.scrollTo(0, { immediate: true });
      const timer = setTimeout(() => {
        publicMotionController.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }

    prevPathRef.current = toPath;
  }, [location.pathname, prefersReducedMotion]);

  return null;
};

export default PublicTransitionManager;
