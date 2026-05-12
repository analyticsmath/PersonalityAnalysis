import React from 'react';
import SectionHeader from '../ui/SectionHeader';

export default function AiTransparencyPanel() {
  return (
    <section className="analytics-section">
      <SectionHeader
        as="div"
        eyebrow="AI layer"
        title="AI processing transparency"
        subtitle="Generative features summarize and narrate; they do not replace deterministic scoring or professional judgment."
      />
      <ul className="growth-recs">
        <li>Outputs are guidance-oriented, not hiring, legal, medical, or psychological diagnoses.</li>
        <li>User text is treated as data, not instructions; heuristic checks flag common prompt-injection phrases.</li>
        <li>Models may be wrong or outdated; cross-check important decisions with human expertise.</li>
        <li>This deployment does not claim GDPR, SOC 2, or other certifications.</li>
      </ul>
    </section>
  );
}
