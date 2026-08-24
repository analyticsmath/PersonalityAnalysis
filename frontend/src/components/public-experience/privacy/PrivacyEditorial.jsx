import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const PrivacyEditorial = () => {
  const data = PUBLIC_CONTENT.privacy;

  return (
    <div className="pa-px-privacy-root">
      <div className="pa-px-privacy-hero">
        <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '8px' }}>
          Data Governance & Integrity
        </span>
        <h1>{data.hero.headline}</h1>
        <p>{data.hero.support}</p>
      </div>

      <div className="pa-px-privacy-layout">
        <aside className="pa-px-privacy-toc" aria-label="Table of Contents">
          <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', marginBottom: '4px' }}>
            Sections
          </span>
          {data.sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.title}
            </a>
          ))}
        </aside>

        <div className="pa-px-privacy-content">
          {data.sections.map((s) => (
            <section key={s.id} id={s.id} className="pa-px-privacy-section">
              <h2>{s.title}</h2>
              <p>{s.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyEditorial;
