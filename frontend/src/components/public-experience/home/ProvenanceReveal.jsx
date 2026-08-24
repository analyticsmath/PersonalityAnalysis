import React, { useRef, useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

export const ProvenanceReveal = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.trace;
  const [aperturePos, setAperturePos] = useState({ x: 50, y: 50 });
  const [isInside, setIsInside] = useState(false);
  const { hasFinePointer } = usePublicCapabilities();

  const handleMouseMove = (e) => {
    if (!containerRef.current || !hasFinePointer) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setAperturePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      className="pa-px-home-trace"
      aria-label="Provenance & Trace"
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="pa-px-home-trace__stage">
        {/* Base Layer: Interpreted Output */}
        <div className="pa-px-home-trace__base-layer">
          <div className="pa-px-home-trace__content">
            <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '8px' }}>
              Trace & Provenance
            </span>
            <h2>{data.headline}</h2>
            <p>{data.support}</p>
            <div style={{ marginTop: '24px', fontSize: 'var(--px-caption)', opacity: 0.7 }}>
              {data.inspectPrompt}
            </div>
          </div>
        </div>

        {/* X-Ray / Inspect Layer: Underlying Source Evidence */}
        <div
          className="pa-px-home-trace__inspect-layer"
          style={{
            clipPath: isInside && hasFinePointer
              ? `circle(90px at ${aperturePos.x}% ${aperturePos.y}%)`
              : 'circle(0% at 50% 50%)',
            transition: 'clip-path 80ms linear',
          }}
        >
          <div className="pa-px-home-trace__content">
            <span className="pa-px-context-data" style={{ color: 'var(--px-ink)', display: 'block', marginBottom: '8px' }}>
              Underlying Source Evidence Layer
            </span>
            <h2 style={{ color: 'var(--px-ink)' }}>VERIFIED PARTICIPANT RECORD</h2>
            <p style={{ color: 'var(--px-ink)' }}>
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
