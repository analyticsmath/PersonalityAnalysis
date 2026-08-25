/**
 * Personality Assessor - Persistent Visual Canvas
 * Single fixed Three.js / R3F WebGL canvas layer mounted across all public routes.
 * Owns 2D orthographic media planes, 3D perspective Career scene, and pixel reconstruction shader.
 * Media planes remain mounted continuously across all routes (including Career).
 */

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import { MediaPlanesLayer } from './MediaPlanesLayer';
import { TransitionLayer } from './TransitionLayer';
import { CareerScene } from './CareerScene';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

export const PersistentVisualCanvas = () => {
  const location = useLocation();
  const { webgl, prefersReducedMotion } = usePublicCapabilities();
  const isCareerRoute = location.pathname === '/career-intelligence';

  if (webgl !== 'supported' || prefersReducedMotion) {
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
          preserveDrawingBuffer: true,
        }}
        orthographic={true}
        camera={{ zoom: 1, position: [0, 0, 100], near: 0.1, far: 1000 }}
      >
        {/* 2D Media Planes Layer: ALWAYS MOUNTED on all routes */}
        <MediaPlanesLayer />

        {/* Pixel Reconstruction / Shader Transition Layer */}
        <TransitionLayer />

        {/* 3D Career Perspective Scene: active on Career route concurrently */}
        {isCareerRoute && <CareerScene />}
      </Canvas>
    </div>
  );
};

export default PersistentVisualCanvas;
