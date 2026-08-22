import React from 'react';
import './EvidenceBranch.css';

/**
 * EvidenceBranch
 * Renders an asymmetric trace line from the EvidenceStrip to a dimension reading.
 */
export const EvidenceBranch = ({
  dimension = 'BIG FIVE',
  trait = 'conscientiousness',
  direction = 'positive contribution',
  pathData = 'M 350 400 L 180 200',
  endPoint = { x: 180, y: 200 },
  active = true,
  opacity = 1,
  className = '',
}) => {
  return (
    <g className={`pa-evidence-branch ${active ? 'is-active' : 'is-residue'} ${className}`} opacity={opacity}>
      <path
        d={pathData}
        fill="none"
        stroke="var(--pa-oxblood, #642832)"
        strokeWidth={active ? 2.5 : 1.5}
        strokeOpacity={active ? 0.95 : 0.4}
        className="pa-evidence-branch__path"
      />

      {/* Registration notch at endpoint */}
      {endPoint && (
        <circle
          cx={endPoint.x}
          cy={endPoint.y}
          r={active ? 4 : 3}
          fill="var(--pa-oxblood, #642832)"
          className="pa-evidence-branch__endpoint"
        />
      )}
    </g>
  );
};

export default EvidenceBranch;
