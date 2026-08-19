import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../../personality-v4/media/ResponsivePicture';
import useCinematicScene from '../motion/useCinematicScene';

/**
 * Scene 02 — Evidence Canvas (V5)
 *
 * Replaces card documents with one sparse photographic evidence canvas:
 * - A02 backdrop.
 * - Sparse typographic evidence anchors revealed sequentially.
 * - Minimalist accessible radio options on dark ground.
 * - Single psychometric data mark responding to interaction.
 */
export const EvidenceCanvasScene = () => {
  const { evidenceSignal } = PUBLIC_CONTENT.home;
  const [selectedOption, setSelectedOption] = useState(null);

  const anchorListRef = useRef(null);
  const promptRef = useRef(null);

  const containerRef = useCinematicScene((self, mm, el) => {
    mm.add('(min-width: 1025px)', () => {
      const anchors = anchorListRef.current?.querySelectorAll('.pa-evidence-anchor-item');
      if (!anchors) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true,
        },
      });

      // Reveal sparse evidence anchors one by one
      anchors.forEach((anchor, i) => {
        tl.to(anchor, { opacity: 1, y: 0, duration: 0.3 }, i * 0.2);
      });

      // Bring focus to prompt
      if (promptRef.current) {
        tl.fromTo(promptRef.current, { opacity: 0.6, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.4);
      }
    });
  }, []);

  const handleSelect = (idx) => {
    setSelectedOption(idx);
  };

  const demoEvidence = evidenceSignal?.demoEvidence || {};
  const options = evidenceSignal?.demoOptions || [];

  // Trait marker offset percentage
  const markerPositions = [25, 55, 82];
  const markerLeft = selectedOption !== null ? `${markerPositions[selectedOption]}%` : '50%';

  return (
    <section ref={containerRef} className="pa-evidence-v5" aria-label="Evidence to Signal">
      <div className="pa-evidence-v5__viewport">
        {/* Background Photographic Actor */}
        <div className="pa-evidence-v5__backdrop">
          <ResponsivePicture
            asset={MEDIA_ASSETS.a02}
            alt={MEDIA_ASSETS.a02.alt}
            sizes="100vw"
            objectPosition="50% 40%"
          />
        </div>

        {/* Dynamic Evidence Canvas */}
        <div className="pa-evidence-v5__canvas">
          {/* Sparse Anchors */}
          <div ref={anchorListRef} className="pa-evidence-anchors">
            <div className="pa-evidence-anchor-item is-active">
              <h4>Role Context</h4>
              <p>{demoEvidence.role || 'Systems Engineer & Technical Lead'}</p>
            </div>
            <div className="pa-evidence-anchor-item">
              <h4>Operational Setting</h4>
              <p>{demoEvidence.context || 'Cross-functional architecture review'}</p>
            </div>
            <div className="pa-evidence-anchor-item">
              <h4>Observed Pattern</h4>
              <p>{demoEvidence.observedPattern || 'Formal interface contracts'}</p>
            </div>
            <div className="pa-evidence-anchor-item">
              <h4>Strategic Trade-off</h4>
              <p>{demoEvidence.tradeoff || 'Structural clarity over early speed'}</p>
            </div>
          </div>

          {/* Editorial Prompt & Minimal Choice Line */}
          <div ref={promptRef} className="pa-evidence-interactive">
            <h3 className="pa-evidence-prompt">{evidenceSignal?.demoQuestion}</h3>

            <div className="pa-evidence-options-list" role="radiogroup" aria-label="Behavioral response scenario">
              {options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <label
                    key={opt.id || opt.label}
                    className={`pa-evidence-choice-row ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelect(idx)}
                  >
                    <input
                      type="radio"
                      name="pa-v5-evidence-choice"
                      className="pa-evidence-radio"
                      checked={isSelected}
                      onChange={() => handleSelect(idx)}
                      aria-label={opt.label}
                    />
                    <span className="pa-evidence-choice-label">{opt.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Dimensional Spectrum Line */}
            <div className="pa-evidence-spectrum-bar" aria-hidden="true">
              <div className="pa-evidence-spectrum-marker" style={{ left: markerLeft }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvidenceCanvasScene;
