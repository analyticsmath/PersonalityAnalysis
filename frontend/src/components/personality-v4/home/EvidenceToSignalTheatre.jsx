import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../media/ResponsivePicture';
import useReducedMotion from '../../../hooks/personality-v4/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const EvidenceToSignalTheatre = () => {
  const envelopeRef = useRef(null);
  const docRef = useRef(null);
  const interactiveRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const { evidenceSignal } = PUBLIC_CONTENT.home;

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: envelopeRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
        },
      });

      tl.addLabel('establish', 0);
      tl.fromTo(docRef.current, { opacity: 0.7, y: 30 }, { opacity: 1, y: 0, duration: 0.2 }, 'establish');

      tl.addLabel('transform', 0.20);
      tl.to(docRef.current, { opacity: 0.4, scale: 0.98, duration: 0.28 }, 'transform');
      tl.fromTo(interactiveRef.current, { opacity: 0.5, y: 40 }, { opacity: 1, y: 0, duration: 0.28 }, 'transform');

      tl.addLabel('dwell', 0.48);
      // Dwell state allows reading and interacting with choices

      tl.addLabel('release', 0.86);
      tl.to(interactiveRef.current, { opacity: 0.3, y: -20, duration: 0.14 }, 'release');
    }, envelopeRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const activeOptionObj = evidenceSignal.demoOptions.find((opt) => opt.id === selectedOption);

  return (
    <section id="evidence-theatre" ref={envelopeRef} className="pa-evidence-envelope" aria-label="Evidence to Signal Scene">
      <div className="pa-evidence-stage">
        <div className="pa-evidence-bg-fragment" aria-hidden="true">
          <ResponsivePicture
            asset={MEDIA_ASSETS.a02}
            alt=""
            sizes="25vw"
            objectPosition="50% 42%"
          />
        </div>

        <div className="pa-evidence-grid">
          <div className="pa-evidence-left">
            <div className="pa-evidence-header">
              <h2>{evidenceSignal.title}</h2>
              <p>{evidenceSignal.support}</p>
            </div>

            <div ref={docRef} className="pa-evidence-document">
              <div className="pa-evidence-item">
                <span className="pa-evidence-label">Observed Role Context</span>
                <span className="pa-evidence-value">{evidenceSignal.demoEvidence.role}</span>
              </div>
              <div className="pa-evidence-item">
                <span className="pa-evidence-label">Operational Situation</span>
                <span className="pa-evidence-value">{evidenceSignal.demoEvidence.context}</span>
              </div>
              <div className="pa-evidence-item">
                <span className="pa-evidence-label">Demonstrated Pattern</span>
                <span className="pa-evidence-value">{evidenceSignal.demoEvidence.observedPattern}</span>
              </div>
              <div className="pa-evidence-item">
                <span className="pa-evidence-label">Calculated Trade-off</span>
                <span className="pa-evidence-value">{evidenceSignal.demoEvidence.tradeoff}</span>
              </div>
            </div>
          </div>

          <div ref={interactiveRef} className="pa-evidence-interactive-stage">
            <h3 className="pa-evidence-question">{evidenceSignal.demoQuestion}</h3>

            <fieldset className="pa-evidence-options" style={{ border: 'none', padding: 0 }}>
              <legend className="pa-sr-only">Choose a constraint prioritization</legend>
              {evidenceSignal.demoOptions.map((opt) => (
                <label key={opt.id} className="pa-evidence-opt-label" htmlFor={opt.id}>
                  <input
                    type="radio"
                    id={opt.id}
                    name="adaptive-demo-option"
                    checked={selectedOption === opt.id}
                    onChange={() => setSelectedOption(opt.id)}
                  />
                  <span className="pa-evidence-opt-content">{opt.label}</span>
                </label>
              ))}
            </fieldset>

            {activeOptionObj && (
              <div className="pa-evidence-signal-result" role="region" aria-live="polite">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--pa-ink)' }}>
                    {activeOptionObj.dimension}
                  </span>
                  <span className="pa-tabular" style={{ color: 'var(--pa-cool-600)' }}>
                    {activeOptionObj.scorePoint} / 100
                  </span>
                </div>

                <div className="pa-evidence-spectrum-bar">
                  <div
                    className="pa-evidence-spectrum-point"
                    style={{ left: `${activeOptionObj.scorePoint}%` }}
                  />
                </div>

                <div style={{ fontSize: '12px', color: 'var(--pa-cool-600)', marginTop: '6px' }}>
                  Derived Signal: {activeOptionObj.weightSignal}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvidenceToSignalTheatre;
