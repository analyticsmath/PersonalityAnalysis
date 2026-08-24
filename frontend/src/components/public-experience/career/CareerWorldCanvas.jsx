import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';

function WorkworldPlane({ position, rotation, dimensions, textureUrl, active, onPointerOver }) {
  const meshRef = useRef();
  const texture = useTexture(textureUrl);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetScale = active ? 1.08 : 0.92;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.08);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={onPointerOver}
    >
      <planeGeometry args={dimensions || [4.2, 2.6, 16, 16]} />
      <meshBasicMaterial map={texture} transparent opacity={active ? 1.0 : 0.6} />
    </mesh>
  );
}

function CameraRig({ activeIdx }) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // 5 distinct camera rail anchor positions
  const cameraRailPositions = [
    { pos: [-3.8, 0.2, 4.4], look: [-3.8, 0, 0] },
    { pos: [-1.9, 0.1, 4.2], look: [-1.9, 0, 0] },
    { pos: [0, 0, 4.2], look: [0, 0, 0] },
    { pos: [1.9, -0.1, 4.2], look: [1.9, 0, 0] },
    { pos: [3.8, -0.2, 4.4], look: [3.8, 0, 0] },
  ];

  useFrame(({ pointer }) => {
    const activeTarget = cameraRailPositions[activeIdx] || cameraRailPositions[2];
    targetCamPos.current.set(
      activeTarget.pos[0] + pointer.x * 0.4,
      activeTarget.pos[1] - pointer.y * 0.25,
      activeTarget.pos[2]
    );
    targetLookAt.current.set(
      activeTarget.look[0] + pointer.x * 0.2,
      activeTarget.look[1],
      0
    );

    camera.position.lerp(targetCamPos.current, 0.06);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

function Scene({ activeIdx, setActiveIdx }) {
  const planes = [
    { pos: [-4.6, 0.3, -1.0], rot: [0, 0.24, 0], dim: [4.4, 2.8], mediaKey: 'workworldPrecision' },
    { pos: [-2.2, -0.1, -0.3], rot: [0, 0.12, 0], dim: [3.8, 2.5], mediaKey: 'careerDeepInquiry' },
    { pos: [0, 0, 0], rot: [0, 0, 0], dim: [4.2, 2.6], mediaKey: 'careerCoordination' },
    { pos: [2.2, 0.2, -0.3], rot: [0, -0.12, 0], dim: [3.8, 2.5], mediaKey: 'workworldPressure' },
    { pos: [4.6, -0.2, -1.0], rot: [0, -0.24, 0], dim: [4.4, 2.8], mediaKey: 'careerSynthesis' },
  ];

  return (
    <>
      <CameraRig activeIdx={activeIdx} />
      <group>
        {planes.map((p, i) => {
          const asset = MEDIA_MANIFEST_PX[p.mediaKey];
          const url = asset?.sourceWebp || asset?.fallbackJpg || '';
          return (
            <WorkworldPlane
              key={p.mediaKey}
              position={p.pos}
              rotation={p.rot}
              dimensions={p.dim}
              textureUrl={url}
              active={activeIdx === i}
              onPointerOver={() => setActiveIdx(i)}
            />
          );
        })}
      </group>
    </>
  );
}

export const CareerWorldCanvas = ({ activeIdx = 0, onSelectWorld }) => {
  const [currentIdx, setCurrentIdx] = useState(activeIdx);

  const handleSelect = (idx) => {
    setCurrentIdx(idx);
    if (onSelectWorld) onSelectWorld(idx);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
        style={{ background: 'transparent' }}
      >
        <Scene activeIdx={currentIdx} setActiveIdx={handleSelect} />
      </Canvas>
    </div>
  );
};

export default CareerWorldCanvas;
