import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * CareerSpatialCanvas — Progressive WebGL 3D Spatial Canvas for Career Atlas
 * Enhances desktop fine-pointer perceptual depth without bloom/glow/chromatic distortion.
 * Disposes all GPU resources on unmount.
 */
export const CareerSpatialCanvas = ({ activeIndex = 0, items = [], isMobile = false }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const planesRef = useRef([]);
  const frameIdRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || isMobile) return;

    // Capability check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const planes = [];

    // Create subtle spatial image planes
    items.forEach((item, idx) => {
      const texture = textureLoader.load(item.asset.source);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const geometry = new THREE.PlaneGeometry(1.6, 1.1);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: idx === activeIndex ? 0.95 : 0.45,
      });

      const mesh = new THREE.Mesh(geometry, material);
      const xOffset = (idx - 2) * 1.2;
      const zOffset = idx === activeIndex ? 0.8 : (idx - 2) * -0.4;
      mesh.position.set(xOffset, 0, zOffset);

      scene.add(mesh);
      planes.push(mesh);
    });
    planesRef.current = planes;

    // Pointer move listener for subtle spatial parallax
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotY = normX * 0.08;
      targetRotX = -normY * 0.06;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Animation render loop
    const animate = () => {
      camera.rotation.y += (targetRotY - camera.rotation.y) * 0.05;
      camera.rotation.x += (targetRotX - camera.rotation.x) * 0.05;

      planes.forEach((mesh, idx) => {
        const isSelected = idx === activeIndex;
        const targetZ = isSelected ? 0.8 : (idx - 2) * -0.4;
        mesh.position.z += (targetZ - mesh.position.z) * 0.08;
        mesh.material.opacity += ((isSelected ? 0.95 : 0.4) - mesh.material.opacity) * 0.08;
      });

      renderer.render(scene, camera);
      frameIdRef.current = window.requestAnimationFrame(animate);
    };

    animate();

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

      if (frameIdRef.current) {
        window.cancelAnimationFrame(frameIdRef.current);
      }

      planes.forEach((mesh) => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (mesh.material.map) mesh.material.map.dispose();
          mesh.material.dispose();
        }
        scene.remove(mesh);
      });

      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      sceneRef.current = null;
      rendererRef.current = null;
      planesRef.current = [];
    };
  }, [activeIndex, items, isMobile]);

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
