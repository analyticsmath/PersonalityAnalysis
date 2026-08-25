/**
 * Personality Assessor - Media Plane
 * Orthographic R3F plane mesh mapping DOM CSS pixels deterministically.
 * Supports cover-fit focal positioning, UV counter-parallax overscan, velocity response, and GPU handshake.
 */

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureRegistry } from './TextureRegistry';
import { VisualActorRegistry } from './VisualActorRegistry';
import { scrollState } from '../motion/scrollState';

const MediaPlaneShader = {
  uniforms: {
    uTexture: { value: null },
    uOpacity: { value: 1.0 },
    uUvOffset: { value: new THREE.Vector2(0, 0) },
    uUvScale: { value: new THREE.Vector2(1, 1) },
    uFocal: { value: new THREE.Vector2(0.5, 0.5) },
    uVelocityDeform: { value: 0.0 },
    uCrop: { value: new THREE.Vector4(0, 0, 0, 0) }, // top, right, bottom, left [0-1]
    uImageAspect: { value: 1.5 },
    uPlaneAspect: { value: 1.5 },
  },
  vertexShader: `
    uniform float uVelocityDeform;
    uniform vec2 uUvOffset;
    varying vec2 vUv;

    void main() {
      vUv = uv + uUvOffset;

      // Subtle directional velocity shear/bend along Y
      vec3 pos = position;
      float bend = sin(uv.x * 3.14159) * uVelocityDeform * 12.0;
      pos.z += bend;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uOpacity;
    uniform vec2 uUvScale;
    uniform vec2 uFocal;
    uniform vec4 uCrop; // top, right, bottom, left
    uniform float uImageAspect;
    uniform float uPlaneAspect;
    varying vec2 vUv;

    void main() {
      // Precise cover-fit UV calculation respecting focal point and overscan
      vec2 st = (vUv - 0.5) * uUvScale + 0.5;

      if (uPlaneAspect > uImageAspect) {
        float scale = uImageAspect / uPlaneAspect;
        st.y = (st.y - uFocal.y) * scale + uFocal.y;
      } else {
        float scale = uPlaneAspect / uImageAspect;
        st.x = (st.x - uFocal.x) * scale + uFocal.x;
      }

      // Crop bounds discard
      if (vUv.y > (1.0 - uCrop.x) || vUv.x > (1.0 - uCrop.y) || vUv.y < uCrop.z || vUv.x < uCrop.w) {
        discard;
      }

      // Safe clamp inside valid texture bounds
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
  const [textureLoaded, setTextureLoaded] = useState(false);
  const hasPresentedGpuRef = useRef(false);

  const actor = VisualActorRegistry.get(actorId);

  useEffect(() => {
    let isMounted = true;
    if (!actor?.assetKey) return;

    TextureRegistry.loadTexture(actor.assetKey).then((tex) => {
      if (isMounted && tex) {
        setTexture(tex);
        setTextureLoaded(true);
        VisualActorRegistry.updateLifecycle(actorId, { textureReady: true });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [actor?.assetKey, actorId]);

  useFrame((_, delta) => {
    if (!meshRef.current || !materialRef.current || !actor) return;

    // 1. Update tracking bounds from DOM if tracking
    if (actor.mode === 'tracking' && actor.element) {
      const rect = actor.element.getBoundingClientRect();
      actor.rect.x = rect.left;
      actor.rect.y = rect.top;
      actor.rect.width = rect.width;
      actor.rect.height = rect.height;
    }

    if (actor.mode === 'hidden' || actor.rect.width <= 0 || actor.rect.height <= 0 || actor.opacity <= 0.001) {
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;

    // 2. Map DOM CSS pixels directly to orthographic scene
    // Screen center is (0, 0), top-left is (-size.width/2, size.height/2)
    const posX = actor.rect.x + actor.rect.width / 2 - size.width / 2;
    const posY = -(actor.rect.y + actor.rect.height / 2) + size.height / 2;
    const posZ = actor.z || 0;

    meshRef.current.position.set(posX, posY, posZ);
    meshRef.current.scale.set(
      actor.rect.width * (actor.scale || 1),
      actor.rect.height * (actor.scale || 1),
      1
    );

    // 3. Update uniforms
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
      textureLoaded ? (typeof actor.opacity === 'number' ? actor.opacity : 1.0) : 0.0,
      Math.min(delta * 16, 1)
    );

    mat.uniforms.uUvOffset.value.set(actor.uvOffset?.x || 0, actor.uvOffset?.y || 0);
    mat.uniforms.uUvScale.value.set(actor.uvScale?.x || 1.0, actor.uvScale?.y || 1.0);
    mat.uniforms.uFocal.value.set(actor.focal?.x || 0.5, actor.focal?.y || 0.5);

    // Scroll velocity tension response
    const targetVelDeform = Math.max(-0.02, Math.min(0.02, (scrollState.velocity || 0) * 0.003));
    mat.uniforms.uVelocityDeform.value = THREE.MathUtils.lerp(
      mat.uniforms.uVelocityDeform.value,
      targetVelDeform,
      Math.min(delta * 10, 1)
    );

    if (actor.crop) {
      mat.uniforms.uCrop.value.set(
        actor.crop.top || 0,
        actor.crop.right || 0,
        actor.crop.bottom || 0,
        actor.crop.left || 0
      );
    }

    // 4. GPU Handshake completion: mark presented on first successful frame
    if (textureLoaded && mat.uniforms.uOpacity.value > 0.05 && !hasPresentedGpuRef.current) {
      hasPresentedGpuRef.current = true;
      VisualActorRegistry.updateLifecycle(actorId, { gpuPresented: true });
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
