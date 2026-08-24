/**
 * Personality Assessor - Public Route Transition Manager
 * Coordinates persistent shared actor carry, pixel reconstruction, and seamless route coexistence.
 * Zero fullscreen black overlays.
 */

import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { MediaActorRegistry } from '../canvas/MediaActorRegistry';
import { getTransitionFamily } from './routeTransitionRegistry';
import { PixelTransitionCanvas } from './PixelTransitionCanvas';
import { publicMotionController } from './publicMotionController';
import { usePublicCapabilities } from './usePublicCapabilities';

export const PublicTransitionManager = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const [pixelActive, setPixelActive] = useState(false);
  const [pixelProgress, setPixelProgress] = useState(0);
  const [pixelSourceKey, setPixelSourceKey] = useState('homeSituationDetail');
  const [pixelDestKey, setPixelDestKey] = useState('trustDiagnostic');

  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    const fromPath = prevPathRef.current;
    const toPath = location.pathname;

    if (fromPath === toPath) return;

    const transitionMeta = getTransitionFamily(fromPath, toPath);

    // 1. Reset scroll to top smoothly via publicMotionController
    publicMotionController.scrollTo(0, { immediate: true });

    // 2. Family-specific transition logic
    if (!prefersReducedMotion) {
      if (transitionMeta.family === 'PIXEL_RECONSTRUCTION') {
        // Home -> Trust pixel dissolve
        setPixelSourceKey('homeSituationDetail');
        setPixelDestKey('trustDiagnostic');
        setPixelActive(true);

        gsap.fromTo(
          { p: 0 },
          { p: 1, duration: 0.65, ease: 'power2.inOut', onUpdate: function () {
            setPixelProgress(this.targets()[0].p);
          }, onComplete: () => {
            setPixelActive(false);
            setPixelProgress(0);
            publicMotionController.refresh();
          }}
        );
      } else if (transitionMeta.family === 'MEDIA_CARRY') {
        // Carry active Workworld image into Career spatial placement
        const actor = MediaActorRegistry.get('home-observation-primary');
        if (actor) {
          MediaActorRegistry.update('home-observation-primary', {
            mode: 'manual',
            transitionRole: 'shared',
          });

          // Animate actor geometry toward center-screen destination
          gsap.to(actor.rect, {
            x: window.innerWidth * 0.25,
            y: window.innerHeight * 0.2,
            width: window.innerWidth * 0.5,
            height: window.innerHeight * 0.6,
            duration: 0.7,
            ease: 'power3.inOut',
            onComplete: () => {
              MediaActorRegistry.update('home-observation-primary', { mode: 'tracking' });
              publicMotionController.refresh();
            },
          });
        }
      } else {
        // Standard / Quiet transition: refresh ScrollTrigger once destination DOM mounts
        setTimeout(() => {
          publicMotionController.refresh();
        }, 120);
      }
    } else {
      publicMotionController.refresh();
    }

    prevPathRef.current = toPath;
  }, [location.pathname, prefersReducedMotion]);

  return (
    <>
      {pixelActive && (
        <PixelTransitionCanvas
          progress={pixelProgress}
          sourceAssetKey={pixelSourceKey}
          destAssetKey={pixelDestKey}
          onComplete={() => setPixelActive(false)}
        />
      )}
    </>
  );
};

export default PublicTransitionManager;
