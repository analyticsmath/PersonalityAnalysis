import React, { useRef, useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

export const ProvenanceReveal = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.trace;
  const [aperturePos, setAperturePos] = useState({ x: 50, y: 50 });
  const [isInspecting, setIsInspecting] = useState(false);
  const { hasFinePointer } = usePublicCapabilities();

  const handleMouseMove = (e) => {
    if (!containerRef.current || !hasFinePointer) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setAperturePos({ x, y });
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setAperturePos({ x, y });
    setIsInspecting(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsInspecting((prev) => !prev);
    } else if (e.key === 'Escape' && isInspecting) {
      setIsInspecting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="pa-px-trace-section"
      aria-label="Provenance & Inspection"
      tabIndex={0}
      onMouseEnter={() => setIsInspecting(true)}
      onMouseLeave={() => setIsInspecting(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsInspecting(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsInspecting(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="pa-px-trace-stage">
        {/* Layer 1: Interpreted Reading */}
        <div className="pa-px-trace__interpreted-layer">
          <div className="pa-px-trace__content">
            <h2 className="pa-px-trace__title">{data.headline}</h2>
            <p className="pa-px-trace__support">{data.support}</p>
            <div className="pa-px-trace__instruction" aria-hidden="true">
              {data.inspectPrompt}
            </div>
            <button
              type="button"
              className="pa-px-trace__keyboard-btn"
              onClick={() => setIsInspecting((prev) => !prev)}
              aria-label={isInspecting ? 'Hide source layer' : 'Inspect source layer'}
            >
              {isInspecting ? 'Release to view interpretation' : 'Press to inspect underlying source'}
            </button>
          </div>
        </div>

        {/* Layer 2: Raw Underlying Source Evidence Layer (X-Ray Aperture) */}
        <div
          className="pa-px-trace__source-layer"
          style={{
            clipPath: isInspecting
              ? `circle(110px at ${aperturePos.x}% ${aperturePos.y}%)`
              : 'circle(0% at 50% 50%)',
            transition: 'clip-path 70ms linear',
          }}
          aria-hidden={!isInspecting}
        >
          <div className="pa-px-trace__content">
            <h2 className="pa-px-trace__title" style={{ color: 'var(--px-ink)' }}>
              ORIGINAL SOURCE EVIDENCE
            </h2>
            <p className="pa-px-trace__support" style={{ color: 'var(--px-ink)' }}>
              Source prompt: "How do you make progress when the goal is clear but the implementation is not?"
              <br />
              Raw response: "I clarify the constraints first, then choose the smallest reversible step."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvenanceReveal;
