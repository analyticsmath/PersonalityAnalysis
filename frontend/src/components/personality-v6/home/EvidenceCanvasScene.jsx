import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import MediaPlane from '../motion/MediaPlane';
import useCinematicScene from '../motion/useCinematicScene';

/**
 * Scene 02 — Evidence Canvas (V6)
 *
 * 1. A02 remains visibly active as a dominant structural crop with slow, controlled crop pan.
 * 2. 4 short evidence anchors are edge-anchored around the image with no card envelopes.
 * 3. The calibrated behavioural inquiry bay arrives after anchors settle.
 * 4. Interactive option selection updates the spectrum indicator without remounting image or restarting timeline.
 * 5. Hands A02 into framework readings without black pause.
 */
export const EvidenceCanvasScene = () => {
  const { evidenceSignal } = PUBLIC_CONTENT.home;
  const [selectedOption, setSelectedOption] = useState('');

  const anchorsRef = useRef(null);
  const inquiryBayRef = useRef(null);
  const imageFieldRef = useRef(null);

  const activeOptionData = evidenceSignal.demoOptions.find((opt) => opt.id === selectedOption);

  const containerRef = useCinematicScene(({ mm, el }) => {
    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Subtle crop zoom during scroll
      tl.to(
        imageFieldRef.current,
        { scale: 1.04, ease: 'none' },
        0
      );

      // Controlled subtle anchor float
      tl.to(
        anchorsRef.current?.children || [],
        { y: -10, stagger: 0.05, ease: 'power1.out' },
        0.1
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-v6-scene-evidence"
      data-header-theme="dark"
      data-cinematic-stage="evidence"
      aria-label="Evidence Canvas"
    >
      <div className="pa-v6-scene-evidence__sticky">
        <div className="pa-v6-scene-evidence__stage">
          {/* Edge Anchors Around Image (No Boxed Cards) */}
          <div ref={anchorsRef} aria-label="Evidence Traces">
            <div className="pa-v6-evidence-anchor pa-v6-evidence-anchor--top-left">
              <div className="pa-v6-evidence-anchor__label">Context</div>
              <div>{evidenceSignal.demoEvidence.context}</div>
            </div>

            <div className="pa-v6-evidence-anchor pa-v6-evidence-anchor--bottom-left">
              <div className="pa-v6-evidence-anchor__label">Observed Pattern</div>
              <div>{evidenceSignal.demoEvidence.observedPattern}</div>
            </div>

            <div className="pa-v6-evidence-anchor pa-v6-evidence-anchor--top-right">
              <div className="pa-v6-evidence-anchor__label">Role Anchor</div>
              <div>{evidenceSignal.demoEvidence.role}</div>
            </div>

            <div className="pa-v6-evidence-anchor pa-v6-evidence-anchor--bottom-right">
              <div className="pa-v6-evidence-anchor__label">Trade-off</div>
              <div>{evidenceSignal.demoEvidence.tradeoff}</div>
            </div>
          </div>

          {/* Central Full-Height Media Field */}
          <div ref={imageFieldRef} className="pa-v6-scene-evidence__central-image">
            <MediaPlane
              asset={MEDIA_ASSETS_V6.a02}
              objectPosition="50% 42%"
              alt="Adaptive response evidence field"
            />
          </div>

          {/* Calibrated Inquiry Bay */}
          <div ref={inquiryBayRef} className="pa-v6-scene-evidence__inquiry-bay">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pa-stone)', fontWeight: 600 }}>
                Calibrated Inquiry
              </span>
              {activeOptionData && (
                <span style={{ fontSize: '0.75rem', color: 'var(--pa-bone)', fontWeight: 600 }}>
                  {activeOptionData.weightSignal}
                </span>
              )}
            </div>

            <h2 className="pa-v6-inquiry__prompt">
              {evidenceSignal.demoQuestion}
            </h2>

            <div className="pa-v6-inquiry__options" role="radiogroup" aria-label="Coordination priorities">
              {evidenceSignal.demoOptions.map((opt) => (
                <label key={opt.id} className="pa-v6-inquiry__option">
                  <input
                    type="radio"
                    name="evidence-inquiry-choice"
                    value={opt.id}
                    checked={selectedOption === opt.id}
                    onChange={() => setSelectedOption(opt.id)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvidenceCanvasScene;
