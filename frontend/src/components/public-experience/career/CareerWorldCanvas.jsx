import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';
import { scrollState } from '../motion/scrollState';

function WorkworldPlane({ position, rotation, dimensions, textureUrl, activeIndex, myIndex }) {
  const meshRef = useRef();
  const texture = useTexture(textureUrl);

  useFrame(() => {
    if (!meshRef.current) return;
    const isFocused = Math.abs(activeIndex - myIndex) < 0.6;
    const targetScale = isFocused ? 1.06 : 0.88;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.08);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
    >
      <planeGeometry args={dimensions || [4.2, 2.6, 16, 16]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={Math.abs(activeIndex - myIndex) < 1.2 ? 1.0 : 0.6}
      />
    </mesh>
  );
}

function CameraRig({ scrollProgressRef }) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // 5 spatial camera rail waypoints mapped to normalized route progress
  const waypoints = [
    { p: 0.00, pos: [-4.6, 0.3, 4.8], look: [-4.6, 0.1, 0] },
    { p: 0.20, pos: [-3.8, 0.2, 4.4], look: [-3.8, 0.0, 0] },
    { p: 0.38, pos: [-1.9, 0.1, 4.2], look: [-1.9, 0.0, 0] },
    { p: 0.56, pos: [0.0, 0.0, 4.2], look: [0.0, 0.0, 0] },
    { p: 0.74, pos: [1.9, -0.1, 4.2], look: [1.9, 0.0, 0] },
    { p: 0.90, pos: [3.8, -0.2, 4.5], look: [3.8, 0.0, 0] },
    { p: 1.00, pos: [4.6, -0.3, 4.8], look: [4.6, -0.1, 0] },
  ];

  useFrame(({ pointer }) => {
    const rawProgress = scrollProgressRef.current || scrollState.progress || 0;
    const p = Math.max(0, Math.min(1, rawProgress));

    // Find bounding waypoints and interpolate
    let w1 = waypoints[0];
    let w2 = waypoints[waypoints.length - 1];

    for (let i = 0; i < waypoints.length - 1; i++) {
      if (p >= waypoints[i].p && p <= waypoints[i + 1].p) {
        w1 = waypoints[i];
        w2 = waypoints[i + 1];
        break;
      }
    }

    const t = (p - w1.p) / (w2.p - w1.p || 1);
    const smoothT = t * t * (3 - 2 * t); // Smoothstep

    const posX = THREE.MathUtils.lerp(w1.pos[0], w2.pos[0], smoothT);
    const posY = THREE.MathUtils.lerp(w1.pos[1], w2.pos[1], smoothT);
    const posZ = THREE.MathUtils.lerp(w1.pos[2], w2.pos[2], smoothT);

    const lookX = THREE.MathUtils.lerp(w1.look[0], w2.look[0], smoothT);
    const lookY = THREE.MathUtils.lerp(w1.look[1], w2.look[1], smoothT);

    // Pointer adds ONLY a small local parallax offset
    const ptrX = pointer ? pointer.x * 0.25 : 0;
    const ptrY = pointer ? -pointer.y * 0.15 : 0;

    targetCamPos.current.set(posX + ptrX, posY + ptrY, posZ);
    targetLookAt.current.set(lookX + ptrX * 0.5, lookY, 0);

    camera.position.lerp(targetCamPos.current, 0.08);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

function Scene({ scrollProgressRef }) {
  const planes = [
    { pos: [-4.6, 0.3, -1.0], rot: [0, 0.24, 0], dim: [4.4, 2.8], mediaKey: 'workworldPrecision' },
    { pos: [-2.2, -0.1, -0.3], rot: [0, 0.12, 0], dim: [3.8, 2.5], mediaKey: 'careerDeepInquiry' },
    { pos: [0, 0, 0], rot: [0, 0, 0], dim: [4.2, 2.6], mediaKey: 'careerCoordination' },
    { pos: [2.2, 0.2, -0.3], rot: [0, -0.12, 0], dim: [3.8, 2.5], mediaKey: 'workworldPressure' },
    { pos: [4.6, -0.2, -1.0], rot: [0, -0.24, 0], dim: [4.4, 2.8], mediaKey: 'careerSynthesis' },
  ];

  return (
    <>
      <CameraRig scrollProgressRef={scrollProgressRef} />
      <group>
        {planes.map((p, i) => {
          const asset = MEDIA_MANIFEST_PX[p.mediaKey];
          const url = asset?.sourceWebp || asset?.fallbackJpg || '';
          const activeIndex = (scrollProgressRef.current || 0) * 4;
          return (
            <WorkworldPlane
              key={p.mediaKey}
              position={p.pos}
              rotation={p.rot}
              dimensions={p.dim}
              textureUrl={url}
              activeIndex={activeIndex}
              myIndex={i}
            />
          );
        })}
      </group>
    </>
  );
}

export const CareerWorldCanvas = ({ scrollProgress = 0 }) => {
  const scrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [-4.6, 0.3, 4.8], fov: 45 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5)}
        style={{ background: 'transparent' }}
      >
        <Scene scrollProgressRef={scrollProgressRef} />
      </Canvas>
    </div>
  );
};

export default CareerWorldCanvas;
