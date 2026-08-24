/**
 * Personality Assessor - Pixel Reconstruction Material
 * Three.js ShaderMaterial executing deterministic block-pixel reconstruction
 * between actual source and destination textures.
 */

import * as THREE from 'three';

export const PixelReconstructionShader = {
  uniforms: {
    uTextureA: { value: null },
    uTextureB: { value: null },
    uProgress: { value: 0.0 },
    uBlockSize: { value: 24.0 },
    uNoiseSeed: { value: 42.0 },
    uResolution: { value: new THREE.Vector2(1440, 900) },
    uOpacity: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTextureA;
    uniform sampler2D uTextureB;
    uniform float uProgress;
    uniform float uBlockSize;
    uniform float uNoiseSeed;
    uniform vec2 uResolution;
    uniform float uOpacity;
    varying vec2 vUv;

    // High quality pseudo-random block hash
    float hash(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031 + uNoiseSeed);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    void main() {
      // Direct pass-through at extremes
      if (uProgress <= 0.001) {
        vec4 colA = texture2D(uTextureA, vUv);
        gl_FragColor = vec4(colA.rgb, colA.a * uOpacity);
        return;
      }
      if (uProgress >= 0.999) {
        vec4 colB = texture2D(uTextureB, vUv);
        gl_FragColor = vec4(colB.rgb, colB.a * uOpacity);
        return;
      }

      // Compute pixelated block coordinates
      vec2 screenCoord = vUv * uResolution;
      vec2 blockCoord = floor(screenCoord / uBlockSize);
      vec2 blockCenterUv = (blockCoord * uBlockSize + (uBlockSize * 0.5)) / uResolution;

      // Deterministic pseudo-random threshold for this block
      float blockThreshold = hash(blockCoord);

      // Transition wave biased diagonally (top-left to bottom-right)
      float wave = (vUv.x + (1.0 - vUv.y)) * 0.5;
      float combinedThreshold = mix(blockThreshold, wave, 0.4);

      // Quantized block state
      bool showB = uProgress >= combinedThreshold;

      // Sample source and destination textures
      // Near transition edge, sample at block center for authentic reconstruction mosaic
      float edgeDist = abs(uProgress - combinedThreshold);
      vec2 sampleUv = edgeDist < 0.25 ? blockCenterUv : vUv;

      vec4 colorA = texture2D(uTextureA, sampleUv);
      vec4 colorB = texture2D(uTextureB, sampleUv);

      vec4 finalColor = showB ? colorB : colorA;

      // Slight edge micro-luminescence at block transition seam
      if (edgeDist < 0.04 && uProgress > 0.1 && uProgress < 0.9) {
        finalColor.rgb += vec3(0.08);
      }

      gl_FragColor = vec4(finalColor.rgb, finalColor.a * uOpacity);
    }
  `,
};

export class PixelReconstructionMaterial extends THREE.ShaderMaterial {
  constructor(options = {}) {
    super({
      uniforms: THREE.UniformsUtils.clone(PixelReconstructionShader.uniforms),
      vertexShader: PixelReconstructionShader.vertexShader,
      fragmentShader: PixelReconstructionShader.fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      ...options,
    });

    if (options.textureA) this.uniforms.uTextureA.value = options.textureA;
    if (options.textureB) this.uniforms.uTextureB.value = options.textureB;
    if (typeof options.progress === 'number') this.uniforms.uProgress.value = options.progress;
    if (typeof options.blockSize === 'number') this.uniforms.uBlockSize.value = options.blockSize;
  }

  setProgress(p) {
    this.uniforms.uProgress.value = Math.max(0, Math.min(1, p));
  }

  setTextures(texA, texB) {
    if (texA) this.uniforms.uTextureA.value = texA;
    if (texB) this.uniforms.uTextureB.value = texB;
  }
}

export default PixelReconstructionMaterial;
