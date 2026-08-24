/**
 * Personality Assessor - Media Plane
 * Orthographic R3F plane mesh mapping DOM CSS pixels deterministically.
 * Supports UV counter-parallax, directional velocity tension deformation, and crop bounds.
 */

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureRegistry } from './TextureRegistry';
import { MediaActorRegistry } from './MediaActorRegistry';
import { scrollState } from '../motion/scrollState';

const MediaPlaneShader = {
  uniforms: {
    uTexture: { value: null },
    uOpacity: { value: 1.0 },
    uUvParallax: { value: new THREE.Vector2(0, 0) },
    uVelocityDeform: { value: 0.0 },
    uCrop: { value: new THREE.Vector4(0, 0, 0, 0) }, // top, right, bottom, left [0-1]
    uImageAspect: { value: 1.5 },
    uPlaneAspect: { value: 1.5 },
  },
  vertexShader: `
    uniform float uVelocityDeform;
    uniform vec2 uUvParallax;
    varying vec2 vUv;

    void main() {
      vUv = uv + uUvParallax;

      // Directional velocity curvature displacement along Y axis
      vec3 pos = position;
      float bend = sin(uv.x * 3.14159) * uVelocityDeform * 12.0;
      pos.z += bend;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uOpacity;
    uniform vec4 uCrop; // top, right, bottom, left
    uniform float uImageAspect;
    uniform float uPlaneAspect;
    varying vec2 vUv;

    void main() {
      // Cover-fit UV calculation
      vec2 st = vUv;
      if (uPlaneAspect > uImageAspect) {
        float scale = uImageAspect / uPlaneAspect;
        st.y = (st.y - 0.5) * scale + 0.5;
      } else {
        float scale = uPlaneAspect / uImageAspect;
        st.x = (st.x - 0.5) * scale + 0.5;
      }

      // Crop bounds discard
      if (vUv.y > (1.0 - uCrop.x) || vUv.x > (1.0 - uCrop.y) || vUv.y < uCrop.z || vUv.x < uCrop.w) {
        discard;
      }

      // Clamp UV to prevent edge repeat artifacts
      st = clamp(st, 0.001, 0.999);

      vec4 texColor = texture2D(uTexture, st);
      gl_FragColor = vec4(texColor.rgb, texColor.a * uOpacity);
    }
  `,
};

export const MediaPlane = ({ actorId }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const { size } = useThree();

  const [texture, setTexture] = useState(null);
  const [ready, setReady] = useState(false);

  const actor = MediaActorRegistry.get(actorId);

  useEffect(() => {
    let isMounted = true;
    if (!actor?.assetKey) return;

    TextureRegistry.loadTexture(actor.assetKey).then((tex) => {
      if (isMounted && tex) {
        setTexture(tex);
        setReady(true);
        MediaActorRegistry.update(actorId, { textureReady: true });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [actor?.assetKey, actorId]);

  useFrame((_, delta) => {
    if (!meshRef.current || !materialRef.current || !actor) return;

    // Update tracking bounds from DOM if tracking
    if (actor.mode === 'tracking' && actor.element) {
      const rect = actor.element.getBoundingClientRect();
      actor.rect.x = rect.left;
      actor.rect.y = rect.top;
      actor.rect.width = rect.width;
      actor.rect.height = rect.height;
    }

    if (actor.mode === 'hidden' || actor.rect.width <= 0 || actor.rect.height <= 0) {
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;

    // Map DOM CSS pixels directly to orthographic scene
    // Center of screen is (0, 0), top-left is (-width/2, height/2)
    const posX = actor.rect.x + actor.rect.width / 2 - size.width / 2;
    const posY = -(actor.rect.y + actor.rect.height / 2) + size.height / 2;
    const posZ = actor.z || 0;

    meshRef.current.position.set(posX, posY, posZ);
    meshRef.current.scale.set(actor.rect.width * (actor.scale || 1), actor.rect.height * (actor.scale || 1), 1);

    // Uniforms update
    const mat = materialRef.current;
    if (texture) {
      mat.uniforms.uTexture.value = texture;
      const img = texture.image;
      if (img && img.width && img.height) {
        mat.uniforms.uImageAspect.value = img.width / img.height;
      }
    }

    mat.uniforms.uPlaneAspect.value = actor.rect.width / (actor.rect.height || 1);
    mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      mat.uniforms.uOpacity.value,
      ready ? (typeof actor.opacity === 'number' ? actor.opacity : 1.0) : 0.0,
      Math.min(delta * 12, 1)
    );

    mat.uniforms.uUvParallax.value.set(actor.uvParallax?.x || 0, actor.uvParallax?.y || 0);

    // Scroll velocity tension shader response (clamped to max 1.5% deformation)
    const targetVelDeform = Math.max(-0.015, Math.min(0.015, (scrollState.velocity || 0) * 0.003));
    mat.uniforms.uVelocityDeform.value = THREE.MathUtils.lerp(
      mat.uniforms.uVelocityDeform.value,
      targetVelDeform,
      Math.min(delta * 8, 1)
    );

    if (actor.crop) {
      mat.uniforms.uCrop.value.set(
        actor.crop.top || 0,
        actor.crop.right || 0,
        actor.crop.bottom || 0,
        actor.crop.left || 0
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        ref={materialRef}
        args={[MediaPlaneShader]}
        transparent={true}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

export default MediaPlane;
