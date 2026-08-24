import React, { useRef, useEffect } from 'react';
import { Curtains, Plane } from 'curtainsjs';
import { PublicPicture } from './PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { scrollState } from '../motion/scrollState';

const vs = `
  precision mediump float;
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat4 uTextureMatrix0;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  uniform float uScrollVelocity;

  void main() {
    vec3 vertexPosition = aVertexPosition;
    // Restrained velocity-driven vertical curvature
    vertexPosition.y -= sin(vertexPosition.x * 3.141592) * (uScrollVelocity * 0.0004);

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;

const fs = `
  precision mediump float;
  varying vec2 vTextureCoord;
  uniform sampler2D uSampler0;
  uniform float uScrollVelocity;

  void main() {
    vec2 textureCoords = vTextureCoord;
    // Very subtle UV displacement during high velocity, returning to zero at rest
    float displacement = uScrollVelocity * 0.00015;
    textureCoords.y += sin(textureCoords.x * 12.0) * displacement;

    gl_FragColor = texture2D(uSampler0, textureCoords);
  }
`;

export const CinematicMediaPlane = ({
  assetKey,
  alt = '',
  priority = false,
  className = '',
  style = {},
}) => {
  const containerRef = useRef(null);
  const { hasWebGL, prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (!hasWebGL || prefersReducedMotion || !containerRef.current) return;

    let curtains = null;
    let plane = null;

    try {
      curtains = new Curtains({
        container: containerRef.current,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
        autoRender: true,
      });

      const params = {
        vertexShader: vs,
        fragmentShader: fs,
        widthSegments: 16,
        heightSegments: 16,
        uniforms: {
          uScrollVelocity: {
            name: 'uScrollVelocity',
            type: '1f',
            value: 0,
          },
        },
      };

      plane = new Plane(curtains, containerRef.current, params);

      plane.onRender(() => {
        // Feed velocity to shader uniform with rapid decay
        plane.uniforms.uScrollVelocity.value = scrollState.velocity * 0.92;
      });
    } catch {
      // Graceful fallback to DOM picture
    }

    return () => {
      if (plane) plane.remove();
      if (curtains) curtains.dispose();
    };
  }, [hasWebGL, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={`pa-px-media-plane ${className}`} style={{ width: '100%', height: '100%', position: 'relative', ...style }}>
      <PublicPicture assetKey={assetKey} alt={alt} priority={priority} />
    </div>
  );
};

export default CinematicMediaPlane;
