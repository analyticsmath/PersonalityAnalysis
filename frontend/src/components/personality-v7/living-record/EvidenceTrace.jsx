import React from 'react';

/**
 * EvidenceTrace
 * Single connecting stroke from an EvidenceStrip registration point.
 */
export const EvidenceTrace = ({
  startX = 0,
  startY = 0,
  endX = 100,
  endY = 100,
  strokeWidth = 2,
  color = 'var(--pa-oxblood, #642832)',
  opacity = 0.9,
  dashed = false,
  className = '',
}) => {
  return (
    <line
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeOpacity={opacity}
      strokeDasharray={dashed ? '4 4' : undefined}
      className={`pa-evidence-trace ${className}`}
    />
  );
};

export default EvidenceTrace;
