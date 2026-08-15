import React from 'react';
import { ResponsiveImage } from '../PublicChrome';
import { publicMedia } from '../../../content/personalityMarketingDemo';

const loopSteps = [
  {
    step: '01',
    name: 'Gap Discovery',
    description: 'Pinpoint specific competencies or experiential voids between your profile and target roles.',
  },
  {
    step: '02',
    name: 'Deliberate Action',
    description: 'Execute focused technical or strategic initiatives designed to develop unproven capabilities.',
  },
  {
    step: '03',
    name: 'Visible Artifact',
    description: 'Produce reviewable outputs—architecture records, codebases, research syntheses or operational frameworks.',
  },
  {
    step: '04',
    name: 'New Evidence',
    description: 'Integrate verified project deliverables and updated context into your assessment records.',
  },
  {
    step: '05',
    name: 'Profile Return',
    description: 'Re-calibrate dimensional interpretations and career alignment as your verified work evolves.',
  },
];

export default function DevelopmentEvidenceLoop() {
  const processMedia = publicMedia.hero.process || publicMedia.hero.evidenceWall;

  return (
    <section
      id="scene-development-loop"
      className="development-evidence-loop-v4"
      data-header-scene="light"
      aria-labelledby="dev-loop-title"
    >
      <div className="dev-loop-v4-inner">
        <header className="dev-loop-v4-header">
          <h2 id="dev-loop-title" className="dev-loop-v4-title">
            New work changes the profile.
          </h2>
          <p className="dev-loop-v4-support">
            Development is a continuous feedback loop where real deliverables evolve your calibrated readings over time.
          </p>
        </header>

        <div className="dev-loop-v4-stage">
          {/* Visual Evidence Canvas with Process Media & Product Artifacts */}
          <div className="dev-loop-canvas">
            <figure className="dev-loop-canvas__media">
              {processMedia && (
                <ResponsiveImage
                  media={processMedia}
                  alt="Professional visual planning session and project evidence"
                  sizes="(min-width: 1024px) 44vw, 92vw"
                />
              )}
            </figure>

            {/* Bespoke Product SVG Loop Diagram */}
            <div className="dev-loop-svg-layer" aria-hidden="true">
              <svg viewBox="0 0 400 120" className="dev-loop-flow-svg" fill="none">
                <path
                  d="M20 60 H 380"
                  stroke="#D9DDE1"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx="40" cy="60" r="8" fill="#0B0B0B" />
                <circle cx="120" cy="60" r="8" fill="#0B0B0B" />
                <circle cx="200" cy="60" r="8" fill="#0B0B0B" />
                <circle cx="280" cy="60" r="8" fill="#0B0B0B" />
                <circle cx="360" cy="60" r="8" fill="#15704E" />
              </svg>
            </div>
          </div>

          {/* Sequential Step Flow */}
          <div className="dev-loop-sequence">
            {loopSteps.map((s) => (
              <div key={s.step} className="dev-loop-node">
                <div className="dev-loop-node__marker">{s.step}</div>
                <div className="dev-loop-node__content">
                  <h3 className="dev-loop-node__title">{s.name}</h3>
                  <p className="dev-loop-node__desc">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
