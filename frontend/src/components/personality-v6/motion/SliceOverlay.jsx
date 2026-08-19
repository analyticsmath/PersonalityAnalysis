import React, { useMemo } from 'react';

/**
 * SliceOverlay
 * Temporary tactile fragment overlay that mounts only during mid-handoff (e.g. progress 0.30 - 0.70).
 * Never controls layout, never LCP.
 * Supports 3x4 (12 fragments) or 2x3 (6 fragments).
 */
export const SliceOverlay = ({
  asset,
  progress = 0.5,
  layout = '3x4', // '3x4' | '2x3'
  className = '',
}) => {
  // Only display during transition window 0.30 to 0.70
  if (progress < 0.30 || progress > 0.70 || !asset) {
    return null;
  }

  // Normalized mid-progress 0.0 to 1.0 within the active slice window
  const sliceProgress = (progress - 0.30) / 0.40;
  const rows = layout === '3x4' ? 3 : 2;
  const cols = layout === '3x4' ? 4 : 3;
  const total = rows * cols;

  const fragments = useMemo(() => {
    const items = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        items.push({ row: r, col: c, index: r * cols + c });
      }
    }
    return items;
  }, [rows, cols]);

  const defaultSrc = asset.webp?.[960] || asset.webp?.[640] || asset.source || '';

  return (
    <div
      className={`pa-v6-slice-overlay pa-v6-slice-overlay--${layout} ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: '2px',
        pointerEvents: 'none',
        zIndex: 5,
        opacity: Math.sin(sliceProgress * Math.PI), // peaks at middle of handoff
      }}
    >
      {fragments.map(({ row, col, index }) => {
        // Staggered subtle offset
        const staggerOffset = Math.sin((index / total) * Math.PI) * (1 - Math.abs(sliceProgress - 0.5) * 2) * 6;

        return (
          <div
            key={index}
            className="pa-v6-slice-overlay__fragment"
            style={{
              position: 'relative',
              overflow: 'hidden',
              transform: `translateY(${staggerOffset}px)`,
            }}
          >
            <img
              src={defaultSrc}
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                width: `${cols * 100}%`,
                height: `${rows * 100}%`,
                left: `-${col * 100}%`,
                top: `-${row * 100}%`,
                objectFit: 'cover',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SliceOverlay;
