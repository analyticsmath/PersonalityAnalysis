import React, { useState } from 'react';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';

export const HowItWorksSequence = () => {
  const data = PUBLIC_CONTENT.howItWorks;
  const [expandedFaq, setExpandedFaq] = useState(null);

  const stageAssets = [
    MEDIA_ASSETS_V7.a02, // Context
    MEDIA_ASSETS_V7.a03, // Adaptive inquiry
    MEDIA_ASSETS_V7.a07, // Separate readings
    MEDIA_ASSETS_V7.a08, // Interpretation & controls
  ];

  const toggleFaq = (idx) => {
    setExpandedFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="pa-v7-hiw-stage">
      {/* Route Header */}
      <div className="pa-v7-route-header">
        <span className="pa-v7-eyebrow">The Method Sequence</span>
        <h1 className="pa-v7-route-title" style={{ color: 'var(--pa-bone)' }}>
          {data.title}
        </h1>
        <p className="pa-v7-route-lead">
          {data.lead}
        </p>
      </div>

      {/* 4 Authored Full-Width Chapters */}
      <div className="pa-v7-hiw-chapter-list">
        {data.stages.map((stage, idx) => (
          <article key={stage.step} className="pa-v7-hiw-chapter" aria-label={`Stage ${stage.step} — ${stage.title}`}>
            <div className="pa-v7-hiw-chapter__copy">
              <span className="pa-v7-hiw-chapter__step">Stage {stage.step}</span>
              <h2 className="pa-v7-hiw-chapter__title">{stage.title}</h2>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--pa-bone)' }}>
                {stage.subtitle}
              </div>
              <p style={{ color: 'var(--pa-stone)', lineHeight: 1.6, margin: 0 }}>
                {stage.body}
              </p>
            </div>

            <div className="pa-v7-hiw-chapter__media">
              <MediaPlane
                asset={stageAssets[idx]}
                priority={idx === 0}
                alt={`Method stage ${stage.step}: ${stage.title}`}
              />
            </div>
          </article>
        ))}
      </div>

      {/* Quiet Paper FAQ Appendix with Expandable Rows */}
      <section className="pa-v7-hiw-faq" aria-label="Frequently Asked Questions">
        <div className="pa-v7-hiw-faq__inner">
          <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>
            Method Inquiries
          </span>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--pa-ink)', marginBottom: '2.5rem' }}>
            Frequently Asked Questions
          </h2>

          <div className="pa-v7-faq-list">
            {data.faq.map((item, idx) => (
              <div key={idx} className="pa-v7-faq-row">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={expandedFaq === idx}
                  style={{
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h3 className="pa-v7-faq-row__question">{item.q}</h3>
                  <span style={{ fontSize: '1.25rem', color: 'var(--pa-ink)', fontWeight: 300, marginLeft: '1rem' }}>
                    {expandedFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {expandedFaq === idx && (
                  <p className="pa-v7-faq-row__answer" style={{ marginTop: '0.75rem' }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksSequence;
