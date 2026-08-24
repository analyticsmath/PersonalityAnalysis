/**
 * Personality Assessor - Career Spatial 3D Scene
 * Perspective R3F scene with scroll-driven camera rail through 5 environmental world planes.
 * Only active and rendered when on the Career Intelligence route.
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureRegistry } from './TextureRegistry';
import { scrollState } from '../motion/scrollState';

const WORLDS = [
  {
    key: 'workworldPrecision',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [5.2, 3.4, 1],
    aspect: 1.5,
  },
  {
    key: 'careerDeepInquiry',
    position: [2.8, -0.6, -6.5],
    rotation: [0, -0.18, 0],
    scale: [6.4, 3.6, 1],
    aspect: 1.778,
  },
  {
    key: 'careerCoordination',
    position: [-2.6, 0.8, -13.0],
    rotation: [0, 0.22, 0],
    scale: [5.8, 3.8, 1],
    aspect: 1.5,
  },
  {
    key: 'workworldPressure',
    position: [1.8, -0.4, -19.5],
    rotation: [0, -0.14, 0],
    scale: [6.0, 4.0, 1],
    aspect: 1.5,
  },
  {
    key: 'careerSynthesis',
    position: [0, 0, -26.0],
    rotation: [0, 0, 0],
    scale: [5.4, 4.0, 1],
    aspect: 1.333,
  },
];

export const CareerScene = () => {
  const { camera } = useThree();
  const [textures, setTextures] = useState({});
  const pointerOffset = useRef({ x: 0, y: 0 });

  // Continuous Camera Rail Path
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 5),      // Establishing wide
      new THREE.Vector3(0.6, 0, -1),    // Precision world
      new THREE.Vector3(1.8, -0.3, -7), // Deep Inquiry
      new THREE.Vector3(-1.4, 0.4, -14),// Coordination
      new THREE.Vector3(1.0, -0.2, -20),// Pressure
      new THREE.Vector3(0, 0, -23),     // Synthesis
    ]);
  }, []);

  // Preload textures
  useEffect(() => {
    let isMounted = true;
    WORLDS.forEach((w) => {
      TextureRegistry.loadTexture(w.key).then((tex) => {
        if (isMounted && tex) {
          setTextures((prev) => ({ ...prev, [w.key]: tex }));
        }
      });
    });

    const handlePointer = (e) => {
      pointerOffset.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
      pointerOffset.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.3;
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });

    return () => {
      isMounted = false;
      window.removeEventListener('pointermove', handlePointer);
    };
  }, []);

  useFrame(() => {
    // Derive progress directly from route scene progress or scrollState
    const progress = Math.max(0, Math.min(1, scrollState.activeScenes['career-spatial-stage']?.progress ?? scrollState.progress));

    // Continuous camera position along 3D Catmull-Rom curve
    const camPos = curve.getPointAt(progress);
    const lookTarget = curve.getPointAt(Math.min(1, progress + 0.12));

    // Apply isolated subtle pointer offset
    camera.position.set(
      camPos.x + pointerOffset.current.x,
      camPos.y + pointerOffset.current.y,
      camPos.z
    );

    camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);
  });

  return (
    <group>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={0.6} />

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
              color={tex ? '#ffffff' : '#222628'}
              transparent={true}
              opacity={0.94}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default CareerScene;
