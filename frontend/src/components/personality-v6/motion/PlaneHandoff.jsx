import React from 'react';
import MediaPlane from './MediaPlane';

/**
 * PlaneHandoff
 * Enforces the strict V6 Handoff Invariant:
 * - Coverage >= 1 at all times: at least one base plane is full-frame and opacity >= 0.92.
 * - Outgoing plane A starts at opacity 1.
 * - Incoming plane B is mounted full-frame underneath from the start.
 * - During 0.20 - 0.75, A fades/transforms while B is already active underneath.
 * - By progress >= 0.80, B is opacity 1 and full-frame.
 * - Never leaves an empty black/paper gap between images.
 */
export const PlaneHandoff = ({
  assetA,
  assetB,
  progress = 0,
  objectPositionA = 'center center',
  objectPositionB = 'center center',
  priorityA = false,
  priorityB = false,
  overlay = null,
  className = '',
  style = {},
}) => {
  // Compute safe opacities guaranteeing coverage >= 1:
  // Base A is visible until progress advances past 0.25, then fades out by 0.75.
  // Base B is opacity 1 throughout underneath or cross-dissolved smoothly.
  const clampedProgress = Math.max(0, Math.min(1, progress));

  // Opacity of A: 1.0 down to 0 between progress 0.20 and 0.75
  let opacityA = 1;
  if (clampedProgress > 0.20) {
    opacityA = Math.max(0, 1 - (clampedProgress - 0.20) / 0.55);
  }

  // Base B starts at 1 underneath (so when A fades, B is already completely solid)
  const opacityB = 1;

  // Scale subtle transform for tactile depth
  const scaleA = 1 + clampedProgress * 0.04;
  const scaleB = 1.04 - clampedProgress * 0.04;

  return (
    <div
      className={`pa-v6-plane-handoff ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Base B (Incoming / Underneath) */}
      {assetB && (
        <div
          className="pa-v6-plane-handoff__layer pa-v6-plane-handoff__layer--b"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            opacity: opacityB,
            transform: `scale(${scaleB})`,
            willChange: 'transform, opacity',
          }}
        >
          <MediaPlane
            asset={assetB}
            objectPosition={objectPositionB}
            priority={priorityB}
          />
        </div>
      )}

      {/* Base A (Outgoing / On Top) */}
      {assetA && opacityA > 0.001 && (
        <div
          className="pa-v6-plane-handoff__layer pa-v6-plane-handoff__layer--a"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            opacity: opacityA,
            transform: `scale(${scaleA})`,
            willChange: 'transform, opacity',
          }}
        >
          <MediaPlane
            asset={assetA}
            objectPosition={objectPositionA}
            priority={priorityA}
          />
        </div>
      )}

      {/* Optional Slice Overlay mounted during middle transition */}
      {overlay && (
        <div
          className="pa-v6-plane-handoff__overlay-container"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          {overlay}
        </div>
      )}
    </div>
  );
};

export default PlaneHandoff;
