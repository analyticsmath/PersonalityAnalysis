import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';

const WORLD_PLANES_CONFIG = [
  { x: -3.2, y: 0.55, z: -1.8, rotY: 0.1, mediaKey: 'careerComplexMachine' },
  { x: -1.25, y: -0.25, z: -0.35, rotY: 0.05, mediaKey: 'careerDeepInquiry' },
  { x: 0.55, y: 0.1, z: 0.7, rotY: -0.02, mediaKey: 'careerCoordination' },
  { x: 2.35, y: -0.45, z: -0.85, rotY: -0.07, mediaKey: 'career3dPrinting' },
  { x: 4.1, y: 0.35, z: -2.15, rotY: -0.11, mediaKey: 'careerControl' },
];

const WorldPlane = ({ config, index, activeIndex, onSelect }) => {
  const meshRef = useRef();
  const asset = MEDIA_ASSETS_ATLAS[config.mediaKey];
  const texture = useLoader(THREE.TextureLoader, asset?.source || '/media/context-atlas/career-complex-machine-1080.webp');

  const isActive = index === activeIndex;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetZ = isActive ? config.z + 1.2 : config.z;
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, targetZ, 4, delta);
  });

  return (
    <mesh
      ref={meshRef}
      position={[config.x, config.y, config.z]}
      rotation={[0, config.rotY, 0]}
      onClick={() => onSelect(index)}
    >
      <planeGeometry args={[3.2, 2.1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={isActive ? 1.0 : 0.45}
      />
    </mesh>
  );
};

const SceneRig = ({ mouseRef }) => {
  useFrame(({ camera }, delta) => {
    const targetYaw = (mouseRef.current.x * 0.04);
    const targetPitch = (-mouseRef.current.y * 0.025);
    camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, targetYaw, 3, delta);
    camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, targetPitch, 3, delta);
  });

  return null;
};

const CareerWorldCanvas = ({ activeIndex = 0, onSelectIndex }) => {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pa-atlas-career-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={Math.min(window.devicePixelRatio, 1.75)}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneRig mouseRef={mouseRef} />
        <ambientLight intensity={1.5} />
        <Suspense fallback={null}>
          {WORLD_PLANES_CONFIG.map((conf, idx) => (
            <WorldPlane
              key={idx}
              config={conf}
              index={idx}
              activeIndex={activeIndex}
              onSelect={onSelectIndex}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default React.memo(CareerWorldCanvas);
