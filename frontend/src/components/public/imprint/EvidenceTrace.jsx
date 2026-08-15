// frontend/src/components/public/imprint/EvidenceTrace.jsx
// SVG Contour and Technical Measurement Trace Overlay Component

import React from 'react';

export default function EvidenceTrace({
  type = 'build',
  className = '',
  style = {},
  strokeColor = 'currentColor',
}) {
  return (
    <div className={`evidence-trace-overlay ${className}`} style={style} aria-hidden="true">
      {type === 'build' && (
        <svg viewBox="0 0 400 300" fill="none" stroke={strokeColor} strokeWidth="1.5">
          <path d="M 40,40 L 360,40 L 360,260 L 40,260 Z" strokeDasharray="4,4" opacity="0.35" />
          <path d="M 80,80 L 320,80 L 320,220 L 80,220 Z" className="trace-path" />
          <line x1="80" y1="150" x2="320" y2="150" opacity="0.4" />
          <line x1="200" y1="80" x2="200" y2="220" opacity="0.4" />
          <circle cx="80" cy="80" r="3" fill={strokeColor} />
          <circle cx="320" cy="80" r="3" fill={strokeColor} />
          <circle cx="320" cy="220" r="3" fill={strokeColor} />
          <circle cx="80" cy="220" r="3" fill={strokeColor} />
        </svg>
      )}

      {type === 'investigate' && (
        <svg viewBox="0 0 400 300" fill="none" stroke={strokeColor} strokeWidth="1.5">
          <path d="M 60,110 L 60,60 L 110,60" className="trace-path" />
          <path d="M 290,60 L 340,60 L 340,110" className="trace-path" />
          <path d="M 340,190 L 340,240 L 290,240" className="trace-path" />
          <path d="M 110,240 L 60,240 L 60,190" className="trace-path" />
          <circle cx="200" cy="150" r="48" strokeDasharray="2,3" />
          <line x1="200" y1="85" x2="200" y2="105" />
          <line x1="200" y1="195" x2="200" y2="215" />
          <line x1="135" y1="150" x2="155" y2="150" />
          <line x1="245" y1="150" x2="265" y2="150" />
        </svg>
      )}

      {type === 'make' && (
        <svg viewBox="0 0 400 300" fill="none" stroke={strokeColor} strokeWidth="1.5">
          <path d="M 70,70 L 310,70 L 310,210 L 70,210 Z" opacity="0.2" strokeDasharray="2,2" />
          <path d="M 75,75 L 315,75 L 315,215 L 75,215 Z" opacity="0.4" strokeDasharray="3,3" />
          <path d="M 80,80 L 320,80 L 320,220 L 80,220 Z" className="trace-path" />
        </svg>
      )}

      {type === 'shape' && (
        <svg viewBox="0 0 400 300" fill="none" stroke={strokeColor} strokeWidth="1.5">
          <path
            id="morph-target-path"
            d="M 90,80 Q 200,40 310,90 Q 360,180 300,230 Q 180,260 80,210 Q 50,130 90,80 Z"
            className="trace-path"
          />
        </svg>
      )}

      {type === 'structure' && (
        <svg viewBox="0 0 400 300" fill="none" stroke={strokeColor} strokeWidth="1.5">
          <line x1="50" y1="75" x2="350" y2="75" className="trace-path" />
          <line x1="70" y1="150" x2="330" y2="150" className="trace-path" />
          <line x1="90" y1="225" x2="310" y2="225" className="trace-path" />
          <circle cx="50" cy="75" r="3" fill={strokeColor} />
          <circle cx="350" cy="75" r="3" fill={strokeColor} />
        </svg>
      )}

      {type === 'collaborate' && (
        <svg viewBox="0 0 400 300" fill="none" stroke={strokeColor} strokeWidth="1.5">
          <circle cx="160" cy="150" r="70" strokeDasharray="4,4" opacity="0.5" />
          <circle cx="240" cy="150" r="70" strokeDasharray="4,4" opacity="0.5" />
          <path d="M 200,100 L 200,200" className="trace-path" />
        </svg>
      )}
    </div>
  );
}
