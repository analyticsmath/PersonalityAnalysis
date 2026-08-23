import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * CareerSpatialCanvas — Progressive WebGL 3D Spatial Canvas for Career Atlas
 * Enhances desktop fine-pointer perceptual depth without bloom/glow/chromatic distortion.
 * Features 5 primary meshes and 1 reusable active support mesh.
 * Gated by desktop width (>1024), fine pointer, and no reduced motion.
 */
export const CareerSpatialCanvas = ({
  activeIndex = 0,
  items = [],
  isMobile = false,
  onCanvasReady,
  onCanvasUnavailable,
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const planesRef = useRef([]);
  const supportMeshRef = useRef(null);
  const supportTextureRef = useRef(null);
  const frameIdRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);
  const textureLoaderRef = useRef(null);
  const isHiddenRef = useRef(false);

  // Update activeIndex ref and update the single reusable support mesh texture
  useEffect(() => {
    activeIndexRef.current = activeIndex;

    const supportMesh = supportMeshRef.current;
    const loader = textureLoaderRef.current;
    const currentItem = items[activeIndex];

    if (supportMesh && loader && currentItem?.secondaryAsset?.source) {
      try {
        const newTexture = loader.load(currentItem.secondaryAsset.source);
        newTexture.generateMipmaps = true;
        newTexture.minFilter = THREE.LinearMipmapLinearFilter;

        // Dispose previous support texture safely
        if (supportTextureRef.current) {
          supportTextureRef.current.dispose();
        }
        supportTextureRef.current = newTexture;

        if (supportMesh.material) {
          supportMesh.material.map = newTexture;
          supportMesh.material.needsUpdate = true;
        }
      } catch (err) {
        console.warn('Career support texture update error:', err);
      }
    }
  }, [activeIndex, items]);

  useEffect(() => {
    const container = mountRef.current;

    // Strict capability gating
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
    const isFinePointer =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: fine)').matches || !window.matchMedia('(pointer: coarse)').matches);
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!container || isMobile || !isDesktop || !isFinePointer || prefersReduced) {
      if (onCanvasUnavailable) onCanvasUnavailable();
      return;
    }

    // Verify WebGL context creation capability
    let glContext = null;
    try {
      const testCanvas = document.createElement('canvas');
      glContext = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!glContext) {
        if (onCanvasUnavailable) onCanvasUnavailable();
        return;
      }
    } catch {
      if (onCanvasUnavailable) onCanvasUnavailable();
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    let scene, camera, renderer;
    try {
      scene = new THREE.Scene();
      sceneRef.current = scene;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);

      const textureLoader = new THREE.TextureLoader();
      textureLoaderRef.current = textureLoader;
      const planes = [];

      // Create 5 primary spatial image planes
      items.forEach((item, idx) => {
        const texture = textureLoader.load(item.asset?.source || '');
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        const geometry = new THREE.PlaneGeometry(1.6, 1.1);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: idx === activeIndexRef.current ? 0.95 : 0.45,
        });

        const mesh = new THREE.Mesh(geometry, material);
        const xOffset = (idx - 2) * 1.2;
        const zOffset = idx === activeIndexRef.current ? 0.8 : (idx - 2) * -0.4;
        mesh.position.set(xOffset, 0, zOffset);

        scene.add(mesh);
        planes.push(mesh);
      });
      planesRef.current = planes;

      // Create EXACTLY ONE reusable support mesh for activeLens.secondaryAsset
      const activeItem = items[activeIndexRef.current] || items[0];
      if (activeItem?.secondaryAsset?.source) {
        const supportTexture = textureLoader.load(activeItem.secondaryAsset.source);
        supportTexture.generateMipmaps = true;
        supportTexture.minFilter = THREE.LinearMipmapLinearFilter;
        supportTextureRef.current = supportTexture;

        const supportGeo = new THREE.PlaneGeometry(0.9, 0.65);
        const supportMat = new THREE.MeshBasicMaterial({
          map: supportTexture,
          transparent: true,
          opacity: 0.8,
        });
        const supportMesh = new THREE.Mesh(supportGeo, supportMat);
        supportMesh.position.set(1.4, -0.6, 0.4);
        scene.add(supportMesh);
        supportMeshRef.current = supportMesh;
      }

      // Pointer move listener for subtle spatial parallax
      let targetRotX = 0;
      let targetRotY = 0;

      const handlePointerMove = (e) => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normY = (e.clientY / window.innerHeight - 0.5) * 2;
        targetRotY = normX * 0.08;
        targetRotX = -normY * 0.06;
      };

      const handleVisibilityChange = () => {
        isHiddenRef.current = document.hidden;
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Animation render loop with smooth interpolation and visibility pause
      const animate = () => {
        if (!isHiddenRef.current && rendererRef.current && sceneRef.current) {
          camera.rotation.y += (targetRotY - camera.rotation.y) * 0.05;
          camera.rotation.x += (targetRotX - camera.rotation.x) * 0.05;

          const curActive = activeIndexRef.current;
          planes.forEach((mesh, idx) => {
            const isSelected = idx === curActive;
            const targetZ = isSelected ? 0.8 : (idx - 2) * -0.4;
            mesh.position.z += (targetZ - mesh.position.z) * 0.08;
            mesh.material.opacity += ((isSelected ? 0.95 : 0.4) - mesh.material.opacity) * 0.08;
          });

          if (supportMeshRef.current) {
            supportMeshRef.current.position.y += (-0.6 - supportMeshRef.current.position.y) * 0.08;
          }

          renderer.render(scene, camera);
        }
        frameIdRef.current = window.requestAnimationFrame(animate);
      };

      // Perform initial render
      renderer.render(scene, camera);
      frameIdRef.current = window.requestAnimationFrame(animate);

      // Signal confirmed readiness to caller
      if (onCanvasReady) {
        onCanvasReady();
      }

      const handleResize = () => {
        if (!container || !rendererRef.current) return;
        const newW = container.clientWidth || window.innerWidth;
        const newH = container.clientHeight || window.innerHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(newW, newH);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);

        if (frameIdRef.current) {
          window.cancelAnimationFrame(frameIdRef.current);
        }

        planes.forEach((mesh) => {
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (mesh.material.map) mesh.material.map.dispose();
            mesh.material.dispose();
          }
          if (scene) scene.remove(mesh);
        });

        if (supportMeshRef.current) {
          if (supportMeshRef.current.geometry) supportMeshRef.current.geometry.dispose();
          if (supportMeshRef.current.material) {
            if (supportMeshRef.current.material.map) supportMeshRef.current.material.map.dispose();
            supportMeshRef.current.material.dispose();
          }
          if (scene) scene.remove(supportMeshRef.current);
          supportMeshRef.current = null;
        }

        if (supportTextureRef.current) {
          supportTextureRef.current.dispose();
          supportTextureRef.current = null;
        }

        if (renderer) {
          renderer.dispose();
          if (container && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        }
        sceneRef.current = null;
        rendererRef.current = null;
        planesRef.current = [];
        textureLoaderRef.current = null;
      };
    } catch (err) {
      console.warn('Career WebGL initialization failed:', err);
      if (onCanvasUnavailable) onCanvasUnavailable();
    }
  }, [items, isMobile, onCanvasReady, onCanvasUnavailable]);

  return (
    <div
      ref={mountRef}
      className="pa-career-webgl-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: isMobile ? 0 : 0.85,
      }}
    />
  );
};

export default CareerSpatialCanvas;
