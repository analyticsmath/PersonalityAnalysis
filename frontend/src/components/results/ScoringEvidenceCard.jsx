import React from 'react';

const ScoringEvidenceCard = ({ scoreMeta = null, evidence = [], warnings = [] }) => {
  const signals = (Array.isArray(evidence) ? evidence : [])
    .filter((e) => e && e.signal)
    .slice(0, 6)
    .map((e) => String(e.signal));

  const conf = scoreMeta && Number.isFinite(Number(scoreMeta.confidence)) ? Number(scoreMeta.confidence) : null;
  const count = scoreMeta && Number.isFinite(Number(scoreMeta.evidenceCount)) ? Number(scoreMeta.evidenceCount) : 0;

  return (
    <div className="phase3-scoring-evidence" data-testid="scoring-evidence-card">
      <h4 style={{ margin: '0 0 8px' }}>Why these scores?</h4>
      <p style={{ margin: '0 0 8px', fontSize: 14 }}>
        Evidence items: <strong>{count}</strong>
        {conf != null ? (
          <>
            {' '}
            · Model confidence: <strong>{Math.round(conf * 100)}%</strong>
          </>
        ) : null}
      </p>
      {signals.length ? (
        <ul style={{ margin: '0 0 8px', paddingLeft: 18 }}>
          {signals.map((s, i) => (
            <li key={`${i}-${s}`} style={{ fontSize: 14 }}>
              {s}
            </li>
          ))}
        </ul>
      ) : (
        <p className="ui-message ui-message--neutral" style={{ fontSize: 13 }}>
          Detailed evidence summaries will grow as you answer more targeted prompts.
        </p>
      )}
      {Array.isArray(scoreMeta?.missingDimensions) && scoreMeta.missingDimensions.length ? (
        <p className="ui-message ui-message--neutral" style={{ fontSize: 13 }}>
          Gaps: {scoreMeta.missingDimensions.slice(0, 6).join(', ')}
        </p>
      ) : null}
      {warnings && warnings.length ? (
        <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
          {warnings.slice(0, 5).map((w, i) => (
            <li key={`w-${i}`} style={{ fontSize: 13 }}>
              {String(w)}
            </li>
          ))}
        </ul>
      ) : null}
      <p style={{ marginTop: 12, fontSize: 12, opacity: 0.85 }}>
        Guidance for careers and development — not a medical or clinical diagnosis. Scores are calculated from your
        assessment responses and profile evidence.
      </p>
    </div>
  );
};

export default React.memo(ScoringEvidenceCard);
