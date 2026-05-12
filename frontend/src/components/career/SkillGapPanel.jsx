import React from 'react';

const SkillGapPanel = ({ skillGaps = {} }) => {
  const matched = Array.isArray(skillGaps.matchedSkills) ? skillGaps.matchedSkills : [];
  const missing = Array.isArray(skillGaps.missingCriticalSkills) ? skillGaps.missingCriticalSkills : [];
  const rec = Array.isArray(skillGaps.recommendedSkills) ? skillGaps.recommendedSkills : [];
  const readiness = Math.round(Number(skillGaps.skillReadinessScore ?? 0));
  const sources = Array.isArray(skillGaps.evidenceSources) ? skillGaps.evidenceSources : [];

  return (
    <div className="skill-gap-panel" data-testid="skill-gap-panel">
      <p>
        <strong>Skill readiness</strong>: {readiness}
      </p>
      <p className="ui-message ui-message--neutral">
        Evidence: {sources.length ? sources.join(', ') : 'limited structured signals'}
      </p>
      <div>
        <strong>Matched</strong>
        <ul>
          {matched.length ? matched.map((s) => <li key={s}>{s}</li>) : <li>None identified yet</li>}
        </ul>
      </div>
      <div>
        <strong>Missing (critical)</strong>
        <ul>
          {missing.length ? missing.map((s) => <li key={s}>{s}</li>) : <li>None listed</li>}
        </ul>
      </div>
      <div>
        <strong>Recommended to build</strong>
        <ul>
          {rec.length ? rec.map((s) => <li key={s}>{s}</li>) : <li>See roadmap for ideas</li>}
        </ul>
      </div>
    </div>
  );
};

export default SkillGapPanel;
