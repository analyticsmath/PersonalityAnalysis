import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ResponsivePicture from '../../personality-v4/media/ResponsivePicture';

/**
 * SegmentedImageTransition — V5 Photographic Image-Plane Transformation Primitive
 *
 * Requirements:
 * - Stable <picture> element remains the base LCP layer.
 * - Transient segmented slices mount ONLY during active handoffs and are removed immediately after.
 * - Slices are computed from resolved CSS URLs with corresponding background size/position offsets.
 * - Grid configuration:
 *     Desktop (>1024px): 3 cols × 4 rows (12 slices)
 *     Tablet (641px - 1024px): 2 cols × 4 rows (8 slices)
 *     Mobile (<=640px): 2 cols × 3 rows (6 slices)
 * - Motion uses 3D transforms, scale, and opacity; zero permanent clip-path overhead.
 */
export const SegmentedImageTransition = ({
  currentAsset,
  incomingAsset = null,
  isTransitioning = false,
  direction = 'forward',
  onTransitionComplete,
  sizes = '100vw',
  objectPosition = '50% 50%',
  className = '',
  priority = false,
  style = {},
}) => {
  const containerRef = useRef(null);
  const outgoingGridRef = useRef(null);
  const incomingGridRef = useRef(null);
  const [slicesActive, setSlicesActive] = useState(false);
  const [displayedAsset, setDisplayedAsset] = useState(currentAsset);

  // Synchronize displayed asset when not transitioning
  useEffect(() => {
    if (!isTransitioning && currentAsset) {
      setDisplayedAsset(currentAsset);
    }
  }, [currentAsset, isTransitioning]);

  useEffect(() => {
    if (!isTransitioning || !incomingAsset) {
      return;
    }

    // Check reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayedAsset(incomingAsset);
      onTransitionComplete?.();
      return;
    }

    setSlicesActive(true);

    // Determine responsive grid dimensions
    const width = window.innerWidth;
    let cols = 3;
    let rows = 4;
    if (width <= 640) {
      cols = 2;
      rows = 3;
    } else if (width <= 1024) {
      cols = 2;
      rows = 4;
    }

    const totalSlices = cols * rows;
    const ctx = gsap.context(() => {
      const outSlices = outgoingGridRef.current?.querySelectorAll('.pa-segment-slice');
      const inSlices = incomingGridRef.current?.querySelectorAll('.pa-segment-slice');

      if (!outSlices || !inSlices) {
        setDisplayedAsset(incomingAsset);
        setSlicesActive(false);
        onTransitionComplete?.();
        return;
      }

      const dirMultiplier = direction === 'forward' ? 1 : -1;
      const staggerDelay = 0.04;
      const duration = 0.82;
      const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

      // Initial states
      gsap.set(outSlices, { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 });
      gsap.set(inSlices, {
        transform: `translate3d(${dirMultiplier * 12}%, ${dirMultiplier * 8}%, 0) scale(1.08)`,
        opacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayedAsset(incomingAsset);
          setSlicesActive(false);
          onTransitionComplete?.();
        },
      });

      // Outgoing slices depart with directional vector
      tl.to(
        outSlices,
        {
          transform: `translate3d(${-dirMultiplier * 14}%, ${-dirMultiplier * 8}%, 0) scale(0.96)`,
          opacity: 0,
          duration: duration * 0.9,
          stagger: {
            each: staggerDelay,
            from: direction === 'forward' ? 'start' : 'end',
            grid: [rows, cols],
          },
          ease,
        },
        0
      );

      // Incoming slices arrive from opposing vector
      tl.to(
        inSlices,
        {
          transform: 'translate3d(0, 0, 0) scale(1)',
          opacity: 1,
          duration,
          stagger: {
            each: staggerDelay,
            from: direction === 'forward' ? 'start' : 'end',
            grid: [rows, cols],
          },
          ease,
        },
        0.12
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isTransitioning, incomingAsset, direction, onTransitionComplete]);

  // Helper to construct grid slices
  const renderSlices = (asset, gridRef, isIncoming = false) => {
    if (!asset) return null;
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    let cols = 3;
    let rows = 4;
    if (width <= 640) {
      cols = 2;
      rows = 3;
    } else if (width <= 1024) {
      cols = 2;
      rows = 4;
    }

    const slices = [];
    const bgUrl = asset.webp?.[1080] || asset.webp?.[960] || asset.source;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const xPos = cols > 1 ? (c / (cols - 1)) * 100 : 0;
        const yPos = rows > 1 ? (r / (rows - 1)) * 100 : 0;
        slices.push(
          <div
            key={`${r}-${c}`}
            className="pa-segment-slice"
            style={{
              gridColumn: `${c + 1} / ${c + 2}`,
              gridRow: `${r + 1} / ${r + 2}`,
              backgroundImage: `url(${bgUrl})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${xPos}% ${yPos}%`,
              backgroundRepeat: 'no-repeat',
              willChange: 'transform, opacity',
            }}
          />
        );
      }
    }

    return (
      <div
        ref={gridRef}
        className={`pa-segment-grid ${isIncoming ? 'pa-segment-grid--incoming' : 'pa-segment-grid--outgoing'}`}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: isIncoming ? 3 : 2,
          pointerEvents: 'none',
        }}
      >
        {slices}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`pa-segmented-stage ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Stable LCP / Picture Base Layer */}
      <div
        className="pa-segmented-base-picture"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: slicesActive ? 0 : 1,
          transition: 'opacity 0.15s ease',
          zIndex: 1,
        }}
      >
        {displayedAsset && (
          <ResponsivePicture
            asset={displayedAsset}
            alt={displayedAsset.alt || ''}
            sizes={sizes}
            objectPosition={objectPosition}
            priority={priority}
          />
        )}
      </div>

      {/* Transient Slices Overlay (Active only during handoff) */}
      {slicesActive && (
        <>
          {renderSlices(displayedAsset, outgoingGridRef, false)}
          {renderSlices(incomingAsset, incomingGridRef, true)}
        </>
      )}
    </div>
  );
};

export default SegmentedImageTransition;
