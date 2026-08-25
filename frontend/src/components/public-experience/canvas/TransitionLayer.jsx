/**
 * Personality Assessor - Transition Layer
 * Persistent WebGL transition plane for shader-based pixel reconstruction between routes (e.g. Home -> Trust)
 * and shared element handoffs.
 */

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PixelReconstructionShader } from './PixelReconstructionMaterial';
import { TextureRegistry } from './TextureRegistry';

// Global transition controller state observable
class TransitionLayerController {
  constructor() {
    this.active = false;
    this.progress = 0;
    this.sourceKey = null;
    this.destKey = null;
    this.sourceTexture = null;
    this.destTexture = null;
    this.rect = null; // optional custom transition bounds
    this.opacity = 1;
    this.subscribers = new Set();
  }

  start({ sourceKey, destKey, sourceTexture, destTexture, rect = null }) {
    this.active = true;
    this.progress = 0;
    this.sourceKey = sourceKey;
    this.destKey = destKey;
    this.sourceTexture = sourceTexture || null;
    this.destTexture = destTexture || null;
    this.rect = rect;
    this.opacity = 1;
    this.notify();
  }

  setProgress(p) {
    this.progress = Math.max(0, Math.min(1, p));
  }

  end() {
    this.active = false;
    this.progress = 0;
    this.notify();
  }

  subscribe(cb) {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  notify() {
    this.subscribers.forEach((cb) => cb());
  }
}

export const transitionLayerController = new TransitionLayerController();

export const TransitionLayer = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  const { size } = useThree();

  const [texA, setTexA] = useState(null);
  const [texB, setTexB] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return transitionLayerController.subscribe(() => {
      setIsActive(transitionLayerController.active);

      if (transitionLayerController.active) {
        if (transitionLayerController.sourceTexture) {
          setTexA(transitionLayerController.sourceTexture);
        } else if (transitionLayerController.sourceKey) {
          TextureRegistry.loadTexture(transitionLayerController.sourceKey).then((t) => setTexA(t));
        }

        if (transitionLayerController.destTexture) {
          setTexB(transitionLayerController.destTexture);
        } else if (transitionLayerController.destKey) {
          TextureRegistry.loadTexture(transitionLayerController.destKey).then((t) => setTexB(t));
        }
      }
    });
  }, []);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current || !isActive || !texA || !texB) {
      if (meshRef.current) meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;

    // Transition rect geometry: full screen or specific measured region
    const rect = transitionLayerController.rect || {
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
    };

    const posX = rect.x + rect.width / 2 - size.width / 2;
    const posY = -(rect.y + rect.height / 2) + size.height / 2;
    const posZ = 50; // Above regular media planes

    meshRef.current.position.set(posX, posY, posZ);
    meshRef.current.scale.set(rect.width, rect.height, 1);

    const mat = materialRef.current;
    mat.uniforms.uTextureA.value = texA;
    mat.uniforms.uTextureB.value = texB;
    mat.uniforms.uProgress.value = transitionLayerController.progress;
    mat.uniforms.uOpacity.value = transitionLayerController.opacity;
    mat.uniforms.uResolution.value.set(size.width, size.height);
    mat.uniforms.uPlaneAspect.value = rect.width / (rect.height || 1);

    if (texA.image) mat.uniforms.uAspectA.value = texA.image.width / (texA.image.height || 1);
    if (texB.image) mat.uniforms.uAspectB.value = texB.image.width / (texB.image.height || 1);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 50]} visible={false}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        args={[PixelReconstructionShader]}
        transparent={true}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

export default TransitionLayer;
