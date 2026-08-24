/**
 * Personality Assessor - Texture Registry
 * Asynchronous texture manager for Three.js WebGL canvas.
 * Manages caching, responsive resolution selection (WebP/AVIF/JPG), and automatic disposal.
 */

import * as THREE from 'three';
import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';

class TextureRegistryClass {
  constructor() {
    this.textures = new Map();
    this.loadingPromises = new Map();
    this.loader = new THREE.TextureLoader();
  }

  /**
   * Determine best image URL for current viewport and device pixel ratio
   * @param {string} assetKey - Key from MEDIA_MANIFEST_PX
   * @returns {string} Image path
   */
  resolveImageUrl(assetKey) {
    const asset = MEDIA_MANIFEST_PX[assetKey];
    if (!asset) return '';

    const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const targetWidth = width * dpr;

    // Use WebP format available locally in public/media/public-experience/
    if (targetWidth <= 480 && asset.sourceWebp.includes('1920')) {
      return `/media/public-experience/${assetKey}-mobile-480.webp`;
    }
    if (targetWidth <= 720 && asset.sourceWebp.includes('1920')) {
      return `/media/public-experience/${assetKey}-720.webp`;
    }
    if (targetWidth <= 1080 && asset.sourceWebp.includes('1920')) {
      return `/media/public-experience/${assetKey}-1080.webp`;
    }
    if (targetWidth <= 1440 && asset.sourceWebp.includes('1920')) {
      return `/media/public-experience/${assetKey}-1440.webp`;
    }

    return asset.sourceWebp || asset.fallbackJpg;
  }

  /**
   * Load texture asynchronously or return from cache
   * @param {string} assetKey
   * @returns {Promise<THREE.Texture>}
   */
  async loadTexture(assetKey) {
    if (!assetKey) return null;

    if (this.textures.has(assetKey)) {
      return this.textures.get(assetKey);
    }

    if (this.loadingPromises.has(assetKey)) {
      return this.loadingPromises.get(assetKey);
    }

    const url = this.resolveImageUrl(assetKey);
    if (!url) return null;

    const promise = new Promise((resolve) => {
      this.loader.load(
        url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;

          this.textures.set(assetKey, texture);
          this.loadingPromises.delete(assetKey);
          resolve(texture);
        },
        undefined,
        (err) => {
          console.warn(`TextureRegistry failed to load WebP for ${assetKey}, falling back to JPG:`, err);
          const asset = MEDIA_MANIFEST_PX[assetKey];
          if (asset?.fallbackJpg) {
            this.loader.load(
              asset.fallbackJpg,
              (fallbackTexture) => {
                fallbackTexture.colorSpace = THREE.SRGBColorSpace;
                this.textures.set(assetKey, fallbackTexture);
                this.loadingPromises.delete(assetKey);
                resolve(fallbackTexture);
              },
              undefined,
              () => {
                this.loadingPromises.delete(assetKey);
                resolve(null);
              }
            );
          } else {
            this.loadingPromises.delete(assetKey);
            resolve(null);
          }
        }
      );
    });

    this.loadingPromises.set(assetKey, promise);
    return promise;
  }

  get(assetKey) {
    return this.textures.get(assetKey) || null;
  }

  has(assetKey) {
    return this.textures.has(assetKey);
  }

  dispose(assetKey) {
    const texture = this.textures.get(assetKey);
    if (texture) {
      texture.dispose();
      this.textures.delete(assetKey);
    }
  }

  clear() {
    this.textures.forEach((tex) => tex.dispose());
    this.textures.clear();
    this.loadingPromises.clear();
  }
}

export const TextureRegistry = new TextureRegistryClass();
export default TextureRegistry;
