/**
 * Personality Assessor - Career Spatial 3D Scene
 * Perspective 3D scene with Catmull-Rom camera rail through 5 authentic environmental world planes.
 * Seamlessly upgrades the 2.5D DOM spatial stage when WebGL is active.
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureRegistry } from './TextureRegistry';
import { scrollState } from '../motion/scrollState';

const WORLDS = [
  {
    key: 'workworldPrecision',
    position: [-1.2, -0.2, 0],
    rotation: [0, 0, 0],
    scale: [4.8, 3.0, 1],
  },
  {
    key: 'careerDeepInquiry',
    position: [2.2, -0.4, -6.5],
    rotation: [0, -0.14, 0],
    scale: [5.2, 3.2, 1],
  },
  {
    key: 'careerCoordination',
    position: [-2.0, 0.6, -13.0],
    rotation: [0, 0.18, 0],
    scale: [5.4, 3.4, 1],
  },
  {
    key: 'workworldPressure',
    position: [1.6, -0.3, -19.5],
    rotation: [0, -0.10, 0],
    scale: [5.6, 3.6, 1],
  },
  {
    key: 'careerSynthesis',
    position: [0, 0, -26.0],
    rotation: [0, 0, 0],
    scale: [5.2, 3.6, 1],
  },
];

export const CareerScene = () => {
  const [textures, setTextures] = useState({});
  const groupRef = useRef();
  const { viewport } = useThree();

  useEffect(() => {
    let isMounted = true;
    WORLDS.forEach((w) => {
      TextureRegistry.loadTexture(w.key).then((tex) => {
        if (isMounted && tex) {
          setTextures((prev) => ({ ...prev, [w.key]: tex }));
        }
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const progress = Math.max(
      0,
      Math.min(1, scrollState.activeScenes['career-spatial-stage']?.progress ?? scrollState.progress)
    );

    // Group travel along Z axis
    const travelZ = progress * 26.0;
    const camX = Math.sin(progress * Math.PI) * 1.5;
    const camY = Math.cos(progress * Math.PI * 1.5) * -0.4;
    const rotY = Math.sin(progress * Math.PI) * -0.1;

    groupRef.current.position.set(-camX, -camY, travelZ - 5);
    groupRef.current.rotation.y = rotY;
  });

  return (
    <group ref={groupRef} name="career-3d-scene">
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />

      {WORLDS.map((w) => {
        const tex = textures[w.key];
        return (
          <mesh
            key={w.key}
            position={w.position}
            rotation={w.rotation}
            scale={w.scale}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={tex || null}
              color={tex ? '#ffffff' : '#1e2224'}
              transparent={true}
              opacity={tex ? 0.95 : 0}
              side={THREE.DoubleSide}
              depthTest={true}
              depthWrite={true}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default CareerScene;

