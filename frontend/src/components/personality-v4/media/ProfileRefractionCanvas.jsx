import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useReducedMotion from '../../../hooks/personality-v4/useReducedMotion';
import useFinePointer from '../../../hooks/personality-v4/useFinePointer';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uPointer;
  uniform float uScrollVelocity;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Subtle liquid displacement based on pointer and scroll velocity
    float dist = distance(uv, uPointer);
    float wave = sin(dist * 18.0 - uTime * 2.0) * 0.006 * exp(-dist * 3.0);
    float scrollWave = sin(uv.y * 10.0 + uTime * 1.5) * clamp(uScrollVelocity * 0.012, 0.0, 0.014);

    vec2 displacedUv = uv + vec2(wave + scrollWave * 0.4, wave * 0.6 + scrollWave);
    vec4 color = texture2D(uTexture, displacedUv);

    gl_FragColor = color;
  }
`;

const RefractionMesh = ({ imageSrc }) => {
  const meshRef = useRef();
  const pointerPos = useRef(new THREE.Vector2(0.5, 0.5));
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(imageSrc);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }, [imageSrc]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uScrollVelocity: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture]
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      pointerPos.current.x = e.clientX / window.innerWidth;
      pointerPos.current.y = 1.0 - e.clientY / window.innerHeight;
    };

    const handleScroll = () => {
      const current = window.scrollY;
      scrollVelocity.current = Math.abs(current - lastScrollY.current);
      lastScrollY.current = current;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    uniforms.uTime.value += delta;
    uniforms.uPointer.value.lerp(pointerPos.current, 0.06);

    // Decay scroll velocity smoothly
    scrollVelocity.current *= 0.92;
    uniforms.uScrollVelocity.value = THREE.MathUtils.lerp(
      uniforms.uScrollVelocity.value,
      scrollVelocity.current,
      0.1
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export const ProfileRefractionCanvas = ({ isVisible, imageSrc }) => {
  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();

  if (prefersReducedMotion || !isFinePointer || !isVisible) {
    return null;
  }

  return (
    <div className="pa-hero-canvas-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 1] }}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <RefractionMesh imageSrc={imageSrc} />
      </Canvas>
    </div>
  );
};

export default ProfileRefractionCanvas;
