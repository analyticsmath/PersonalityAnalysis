import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';

export const PrivacyDocument = () => {
  const data = PUBLIC_CONTENT.privacy;

  return (
    <div className="pa-v7-document-stage">
      {/* Document Header on Paper */}
      <div className="pa-v7-document-header">
        <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>
          Policy Ledger — Last Updated {data.lastUpdated}
        </span>
        <h1 className="pa-v7-route-title" style={{ color: 'var(--pa-ink)' }}>
          {data.title}
        </h1>
        <p className="pa-v7-route-lead" style={{ color: 'var(--pa-ink)', opacity: 0.85 }}>
          {data.lead}
        </p>
      </div>

      {/* Document Body with Table of Contents Rail */}
      <div className="pa-v7-document-body">
        <div className="pa-v7-document-rail-layout">
          {/* Left TOC Rail */}
          <nav className="pa-v7-document-toc" aria-label="Privacy document sections">
            <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)', marginBottom: '0.25rem' }}>
              Contents
            </span>
            {data.sections.map((sec) => (
              <a key={sec.id} href={`#${sec.id}`}>
                {sec.title}
              </a>
            ))}
          </nav>

          {/* Main Legal Content */}
          <div className="pa-v7-document-content">
            {data.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="pa-v7-document-section">
                <h2>{sec.title}</h2>
                <p>{sec.content}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyDocument;
