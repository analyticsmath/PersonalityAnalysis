import React, { useRef, useEffect } from 'react';

/**
 * Deterministic Pixel Transition Canvas (WebGL / 2D Canvas Fallback)
 * Renders an authored block-pixel dissolve effect across progress [0.00, 1.00]
 */
export const PixelTransitionCanvas = ({
  progress = 0, // 0.00 (clean) -> 0.50 (max pixelation) -> 1.00 (clean destination)
  width = '100%',
  height = '100%',
  className = '',
  style = {},
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Calculate pixel block size based on bell curve of progress (peaks at progress ~0.5)
    const factor = Math.sin(progress * Math.PI);
    const blockSize = Math.max(1, Math.floor(factor * 24));

    if (blockSize <= 1 || progress <= 0.01 || progress >= 0.99) {
      ctx.clearRect(0, 0, w, h);
      return;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = `rgba(247, 248, 248, ${0.15 * factor})`;

    for (let x = 0; x < w; x += blockSize) {
      for (let y = 0; y < h; y += blockSize) {
        // Deterministic pseudo-random seed per block
        const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        const rand = seed - Math.floor(seed);
        if (rand < factor) {
          ctx.fillRect(x, y, blockSize - 1, blockSize - 1);
        }
      }
    }
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={240}
      className={`pa-px-pixel-canvas ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width,
        height,
        pointerEvents: 'none',
        zIndex: 10,
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

export default PixelTransitionCanvas;
