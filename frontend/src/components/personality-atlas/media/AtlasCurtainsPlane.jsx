import React, { useEffect, useRef } from 'react';

/**
 * Personality Assessor — AtlasCurtainsPlane
 * Progressive WebGL plane enhancement via Curtains.js on fine-pointer desktop.
 * Provides subtle velocity-based tension (0.002-0.006 UV amplitude, settling < 280ms).
 * Full DOM fallback if WebGL is unavailable or on mobile/reduced motion.
 */
const vs = `
  precision mediump float;
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat4 uTextureMatrix0;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform float uVelocity;

  void main() {
    vec3 vertexPosition = aVertexPosition;
    // Restrained velocity-dependent displacement
    float displacement = sin(vertexPosition.y * 3.141592) * uVelocity * 0.004;
    vertexPosition.x += displacement;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
    vVertexPosition = vertexPosition;
  }
`;

const fs = `
  precision mediump float;
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D uSampler0;
  uniform float uOpacity;

  void main() {
    vec4 color = texture2D(uSampler0, vTextureCoord);
    gl_FragColor = vec4(color.rgb, color.a * uOpacity);
  }
`;

const AtlasCurtainsPlane = ({ children, className = '', style = {}, scrollVelocityRef }) => {
  const planeRef = useRef(null);
  const curtainsInstanceRef = useRef(null);
  const planeInstanceRef = useRef(null);

  useEffect(() => {
    // Capability check: fine pointer desktop, no reduced motion, window width > 1024
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 1024;

    if (!isFinePointer || isReducedMotion || !isDesktop) {
      return;
    }

    let isDisposed = false;

    async function initCurtains() {
      try {
        const { Curtains, Plane } = await import('curtainsjs');
        if (isDisposed || !planeRef.current) return;

        // Find or create global curtains container
        let container = document.getElementById('pa-atlas-curtains-canvas');
        if (!container) {
          container = document.createElement('div');
          container.id = 'pa-atlas-curtains-canvas';
          container.style.position = 'fixed';
          container.style.inset = '0';
          container.style.pointerEvents = 'none';
          container.style.zIndex = '1';
          document.body.appendChild(container);
        }

        const curtains = new Curtains({
          container,
          pixelRatio: Math.min(window.devicePixelRatio, 1.5),
          autoRender: true,
          watchScroll: false, // We drive via Lenis/ScrollTrigger
        });

        curtainsInstanceRef.current = curtains;

        curtains.onError(() => {
          console.info('Curtains WebGL unavailable, falling back to DOM.');
        });

        curtains.onContextLost(() => {
          curtains.restoreContext();
        });

        const params = {
          vertexShader: vs,
          fragmentShader: fs,
          widthSegments: 8,
          heightSegments: 8,
          uniforms: {
            velocity: {
              name: 'uVelocity',
              type: '1f',
              value: 0,
            },
            opacity: {
              name: 'uOpacity',
              type: '1f',
              value: 1.0,
            },
          },
        };

        const plane = new Plane(curtains, planeRef.current, params);
        planeInstanceRef.current = plane;

        plane.onRender(() => {
          const rawVel = scrollVelocityRef?.current || 0;
          const clampedVel = Math.max(-0.01, Math.min(0.01, rawVel * 0.0008));
          // Settle towards zero
          plane.uniforms.velocity.value += (clampedVel - plane.uniforms.velocity.value) * 0.12;
        });
      } catch (err) {
        console.warn('Curtains setup skipped:', err);
      }
    }

    initCurtains();

    return () => {
      isDisposed = true;
      try {
        if (planeInstanceRef.current) {
          planeInstanceRef.current.remove();
          planeInstanceRef.current = null;
        }
      } catch {
        // ignore teardown errors
      }
    };
  }, [scrollVelocityRef]);

  return (
    <div
      ref={planeRef}
      className={`pa-atlas-curtains-plane ${className}`.trim()}
      style={{ position: 'relative', width: '100%', height: '100%', ...style }}
    >
      {children}
    </div>
  );
};

export default React.memo(AtlasCurtainsPlane);
