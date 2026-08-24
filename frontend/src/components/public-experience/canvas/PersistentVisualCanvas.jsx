/**
 * Personality Assessor - Persistent Visual Canvas
 * Single fixed Three.js / R3F WebGL canvas layer mounted across all public routes.
 * Owns 2D orthographic media planes, 3D perspective Career scene, and pixel reconstruction shader.
 */

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { MediaActorRegistry } from './MediaActorRegistry';
import { MediaPlane } from './MediaPlane';
import { CareerScene } from './CareerScene';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const MediaPlanesLayer = () => {
  const actorIds = useSyncExternalStore(
    (onStoreChange) => MediaActorRegistry.subscribe(onStoreChange),
    () => MediaActorRegistry.getActorIds()
  );

  return (
    <group>
      {actorIds.map((id) => (
        <MediaPlane key={id} actorId={id} />
      ))}
    </group>
  );
};

export const PersistentVisualCanvas = () => {
  const location = useLocation();
  const { hasWebGL, prefersReducedMotion } = usePublicCapabilities();
  const isCareerRoute = location.pathname === '/career-intelligence';

  if (!hasWebGL || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className="pa-px-persistent-canvas-root"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        orthographic={!isCareerRoute}
        camera={
          isCareerRoute
            ? { fov: 45, near: 0.1, far: 100, position: [0, 0, 5] }
            : { zoom: 1, position: [0, 0, 100], near: 0.1, far: 1000 }
        }
      >
        {isCareerRoute ? <CareerScene /> : <MediaPlanesLayer />}
      </Canvas>
    </div>
  );
};

export default PersistentVisualCanvas;
