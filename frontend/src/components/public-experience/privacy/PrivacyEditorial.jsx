import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const PrivacyEditorial = () => {
  const data = PUBLIC_CONTENT.privacy;

  return (
    <div className="pa-px-privacy-root">
      <header className="pa-px-privacy-hero">
        <h1>{data.hero.headline}</h1>
        <p className="pa-px-privacy-lead">{data.hero.support}</p>
      </header>

      <div className="pa-px-privacy-layout">
        <aside className="pa-px-privacy-toc" aria-label="Table of Contents">
          <div className="pa-px-privacy-toc__heading">Policy Sections</div>
          <nav className="pa-px-privacy-toc__nav">
            {data.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="pa-px-privacy-toc__link">
                {s.title}
              </a>
            ))}
          </nav>
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
