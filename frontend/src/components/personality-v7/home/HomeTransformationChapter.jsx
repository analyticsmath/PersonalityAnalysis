import React from 'react';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';

const DEFAULT_SOURCE_PHRASE = 'Clarify responsibilities before committing work.';

export const HomeTransformationChapter = ({ selectedChoice }) => {
  const currentPhrase = selectedChoice?.text || DEFAULT_SOURCE_PHRASE;
  const asset = MEDIA_ASSETS_V7.evidenceVisible;

  return (
    <section className="pa-home-transformation" aria-label="Evidence Transformation">
      <div className="pa-v7-grid">
        <div className="pa-home-transformation__stage" style={{ gridColumn: '1 / -1' }}>
          <div className="pa-home-transformation__origin">
            <h2 className="pa-home-transformation__h2">
              The same evidence can contribute to different readings.
            </h2>

            <div className="pa-evidence-source-card">
              <span className="pa-evidence-source-card__meta">Evidence Origin</span>
              <p className="pa-evidence-source-card__phrase">"{currentPhrase}"</p>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--pa-muted-light)', lineHeight: 1.45 }}>
              These readings remain inspectable and separate. One response is never treated as a complete profile.
            </p>

            <div style={{ width: '100%', height: '240px', overflow: 'hidden', borderRadius: 'var(--pa-radius-control)' }}>
              <picture>
                <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 30vw, 100vw" />
                <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 30vw, 100vw" />
                <img
                  src={asset.source}
                  alt={asset.alt}
                  width={asset.intrinsicDimensions.width}
                  height={asset.intrinsicDimensions.height}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </div>

          <div className="pa-home-transformation__readings">
            <div className="pa-reading-item">
              <span className="pa-reading-item__framework">Big Five</span>
              <p className="pa-reading-item__text">
                A preference for structure may contribute to a Conscientiousness reading when it appears alongside other evidence.
              </p>
            </div>

            <div className="pa-reading-item">
              <span className="pa-reading-item__framework">RIASEC</span>
              <p className="pa-reading-item__text">
                The way someone approaches an uncertain problem can contribute to vocational-interest patterns such as Investigative or Enterprising interests.
              </p>
            </div>

            <div className="pa-reading-item">
              <span className="pa-reading-item__framework">Work Values</span>
              <p className="pa-reading-item__text">
                The response can also reflect the conditions a person values around independence, support or achievement.
              </p>
            </div>

            <div className="pa-reading-item">
              <span className="pa-reading-item__framework">Contextual Career Signal</span>
              <p className="pa-reading-item__text">
                The situation itself adds evidence about how a decision was framed under uncertainty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTransformationChapter;
