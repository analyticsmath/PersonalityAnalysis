import React from 'react';

const CareerRoadmapTimeline = ({ timeline = [] }) => {
  const stages = Array.isArray(timeline) ? timeline : [];

  return (
    <div className="career-roadmap-timeline" data-testid="career-roadmap-timeline">
      {stages.map((stage) => (
        <article key={stage.stage || stage.title} className="career-roadmap-timeline__card">
          <header>
            <strong>{stage.stage}</strong>
            <h4>{stage.title}</h4>
          </header>
          <ul>
            {(stage.actions || []).map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          {Array.isArray(stage.skills) && stage.skills.length ? (
            <p>
              <strong>Skills</strong>: {stage.skills.join(', ')}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
};

export default CareerRoadmapTimeline;
