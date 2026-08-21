import React, { useState, useRef, useEffect } from 'react';

export const InspectionAperture = ({
  surfaceContent,
  revealedContent,
  className = '',
  buttonLabel = 'Inspect reading',
  apertureRadius = 88,
}) => {
  const containerRef = useRef(null);
  const [pointerPos, setPointerPos] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [clipId] = useState(() => `aperture-clip-${Math.random().toString(36).slice(2, 9)}`);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPointerPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePointerEnter = (e) => {
    setIsHovered(true);
    handlePointerMove(e);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setPointerPos({ x: -500, y: -500 });
  };

  return (
    <div className={`pa-inspection-wrapper ${className}`}>
      <div
        ref={containerRef}
        className={`pa-inspection-container ${isToggled ? 'pa-inspection-container--toggled' : ''}`}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {/* Base Layer: Human-language interpretation */}
        <div className="pa-inspection-layer pa-inspection-layer--surface" aria-hidden={isToggled}>
          {surfaceContent}
        </div>

        {/* Revealed Layer: Structured Provenance */}
        <div
          className="pa-inspection-layer pa-inspection-layer--revealed"
          style={{
            clipPath: isToggled
              ? 'inset(0 0 0 0)'
              : isHovered
              ? `url(#${clipId})`
              : 'circle(0px at -500px -500px)',
          }}
          aria-hidden={!isToggled}
        >
          {revealedContent}
        </div>

        {/* SVG clipPath definition for fine pointer circle */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <circle cx={pointerPos.x} cy={pointerPos.y} r={apertureRadius} />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Direct accessible toggle control for keyboard, touch & reduced motion */}
      <div className="pa-inspection-controls">
        <button
          type="button"
          className="pa-inspection-toggle-btn"
          onClick={() => setIsToggled((prev) => !prev)}
          aria-pressed={isToggled}
          aria-label={`${buttonLabel}: ${isToggled ? 'show human interpretation' : 'show structured provenance'}`}
        >
          <span>{isToggled ? 'View interpretation' : buttonLabel}</span>
          <span className="pa-inspection-toggle-indicator" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default InspectionAperture;
