import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';

export const ProgressTeaser = () => {
  const data = PUBLIC_CONTENT.home.timeExposure;
  const [scrubValue, setScrubValue] = useState(0); // 0 = baseline, 1 = later

  const isLater = scrubValue > 0.5;

  return (
    <section className="pa-px-ch-progress-teaser pa-px-temporal-teaser-stage" aria-label="Progress Longitudinal Teaser">
      <div className="pa-px-temporal-teaser__inner">
        <div className="pa-px-temporal-teaser__content">
          <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '8px' }}>
            LONGITUDINAL EVIDENCE &middot; TEMPORAL SCRUB
          </div>
          <h2 className="pa-px-heading-xl">{data.headline}</h2>
          <p className="pa-px-lead" style={{ marginBottom: '24px' }}>
            {data.support}
          </p>

          {/* Interactive Temporal Scrub Slider Control */}
          <div className="pa-px-mini-scrub-wrap">
            <div className="pa-px-mini-scrub-labels">
              <span className={`pa-px-data ${!isLater ? 'pa-px-data--active' : ''}`}>
                {data.baselineLabel}
              </span>
              <span className={`pa-px-data ${isLater ? 'pa-px-data--active' : ''}`}>
                {data.laterLabel}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={scrubValue}
              onChange={(e) => setScrubValue(parseFloat(e.target.value))}
              className="pa-px-temporal-scrub-input"
              aria-label="Temporal progress scrub control"
            />
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link to="/progress" className="pa-px-btn-secondary">
              Explore Full Longitudinal Route &rarr;
            </Link>
          </div>
        </div>

        {/* Morphing Context Record Plate */}
        <div className="pa-px-temporal-teaser__card" aria-live="polite">
          <div className="pa-px-temporal-teaser__media-frame">
            <div
              className="pa-px-temporal-teaser__media-layer"
              style={{ opacity: 1 - scrubValue }}
            >
              <PublicPicture
                assetKey="homeSituationDetail"
                alt="Initial baseline assessment context"
              />
            </div>
            <div
              className="pa-px-temporal-teaser__media-layer"
              style={{ opacity: scrubValue }}
            >
              <PublicPicture
                assetKey="workworldAutonomy"
                alt="Shifted later responsibilities context"
              />
            </div>
          </div>

          <div className="pa-px-temporal-teaser__body">
            <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', marginBottom: '4px' }}>
              {isLater ? 'LATER RESPONSIBILITIES CONTEXT' : 'BASELINE PROVENANCE RECORD'}
            </div>
            <p className="pa-px-body" style={{ color: 'var(--pa-ink)', fontWeight: 500 }}>
              {isLater ? data.adaptationFinding : data.stabilityFinding}
            </p>
            <div className="pa-px-data" style={{ marginTop: '8px', color: 'var(--pa-context)' }}>
              {data.disclaimer} &middot; Held Traits: Conscientiousness, Technical Inquiry
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressTeaser;
