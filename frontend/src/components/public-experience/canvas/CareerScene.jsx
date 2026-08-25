/**
 * Personality Assessor - Career Spatial 3D Scene
 * Perspective 3D scene with Catmull-Rom camera rail through 5 authentic environmental world planes.
 * Rendered concurrently into the persistent WebGL canvas using portal + perspective camera,
 * ensuring 2D media planes remain mounted and active for seamless Home -> Career carries.
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, createPortal } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureRegistry } from './TextureRegistry';
import { scrollState } from '../motion/scrollState';

const WORLDS = [
  {
    key: 'workworldPrecision',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [5.2, 3.4, 1],
  },
  {
    key: 'careerDeepInquiry',
    position: [2.8, -0.6, -6.5],
    rotation: [0, -0.18, 0],
    scale: [6.4, 3.6, 1],
  },
  {
    key: 'careerCoordination',
    position: [-2.6, 0.8, -13.0],
    rotation: [0, 0.22, 0],
    scale: [5.8, 3.8, 1],
  },
  {
    key: 'workworldPressure',
    position: [1.8, -0.4, -19.5],
    rotation: [0, -0.14, 0],
    scale: [6.0, 4.0, 1],
  },
  {
    key: 'careerSynthesis',
    position: [0, 0, -26.0],
    rotation: [0, 0, 0],
    scale: [5.4, 4.0, 1],
  },
];

const CareerSceneContent = ({ textures }) => {
  return (
    <>
      <ambientLight intensity={1.4} />
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
              opacity={0.96}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </>
  );
};

export const CareerScene = () => {
  const [textures, setTextures] = useState({});
  const pointerOffset = useRef({ x: 0, y: 0 });

  // Dedicated Three.js Scene and Perspective Camera for 3D world
  const careerScene = useMemo(() => new THREE.Scene(), []);
  const perspectiveCamera = useMemo(() => {
    const cam = new THREE.PerspectiveCamera(45, typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 1.5, 0.1, 100);
    cam.position.set(0, 0, 5);
    return cam;
  }, []);

  // Continuous Camera Rail Path
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 5),       // Establishing wide
      new THREE.Vector3(0.6, 0, -1),     // Precision world
      new THREE.Vector3(1.8, -0.3, -7),  // Deep Inquiry
      new THREE.Vector3(-1.4, 0.4, -14), // Coordination
      new THREE.Vector3(1.0, -0.2, -20), // Pressure
      new THREE.Vector3(0, 0, -23),      // Synthesis
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
      pointerOffset.current.x = (e.clientX / window.innerWidth - 0.5) * 0.25;
      pointerOffset.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.25;
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });

    return () => {
      isMounted = false;
      window.removeEventListener('pointermove', handlePointer);
    };
  }, []);

  useFrame(({ gl, size }, delta) => {
    // 1. Update perspective camera aspect
    perspectiveCamera.aspect = size.width / size.height;
    perspectiveCamera.updateProjectionMatrix();

    // 2. Derive progress directly from route scene progress or scrollState
    const progress = Math.max(
      0,
      Math.min(1, scrollState.activeScenes['career-spatial-stage']?.progress ?? scrollState.progress)
    );

    // 3. Continuous camera position along 3D Catmull-Rom curve
    const camPos = curve.getPointAt(progress);
    const lookTarget = curve.getPointAt(Math.min(1, progress + 0.12));

    perspectiveCamera.position.set(
      camPos.x + pointerOffset.current.x,
      camPos.y + pointerOffset.current.y,
      camPos.z
    );
    perspectiveCamera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);

    // 4. Render Career 3D scene behind 2D media layers with depth buffer clear
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(careerScene, perspectiveCamera);
  }, 1); // render priority 1

  return createPortal(<CareerSceneContent textures={textures} />, careerScene);
};

export default CareerScene;
