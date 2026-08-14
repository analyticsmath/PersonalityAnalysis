import React from 'react';
import Card from '../ui/Card';

const CareerRecommendationCard = ({
  item = null,
  title: directTitle = '',
  fitScore: directFitScore = null,
  confidence: directConfidence = null,
  preliminary = false,
  fitType: directFitType = '',
  whyThisFits: directWhy = null,
  skillGaps: directGaps = null,
}) => {
  const title = directTitle || item?.title || item?.name || 'Career Match';
  const rawFit = directFitScore ?? item?.fitScore ?? item?.match ?? item?.score ?? null;
  const fitScore = rawFit !== null ? Math.round(Number(rawFit)) : null;

  const rawConfidence = directConfidence ?? item?.confidence ?? null;
  const confPct =
    rawConfidence !== null
      ? typeof rawConfidence === 'number' && rawConfidence <= 1
        ? Math.round(rawConfidence * 100)
        : Math.round(Number(rawConfidence))
      : null;

  const fitType = directFitType || item?.fitType || item?.environmentType || '';
  const whyThisFits = directWhy || (Array.isArray(item?.whyThisFits) ? item.whyThisFits : item?.why ? [item.why] : []);
  const skillGaps = directGaps || item?.skillGaps || null;

  return (
    <Card
      title={title}
      subtitle={fitType ? `Category: ${String(fitType).replace(/([A-Z])/g, ' $1')}` : ''}
      animated={false}
      className="dashboard-widget"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
        {fitScore !== null && (
          <span className="career-fit-badge" style={{ fontSize: '0.9375rem', padding: '6px 12px' }}>
            Fit Score: {fitScore}%
          </span>
        )}
        {confPct !== null && (
          <span style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>
            Confidence: <strong>{confPct}%</strong>
          </span>
        )}
      </div>

      {preliminary && (
        <p className="ui-message ui-message--neutral" role="status">
          Preliminary — assessment evidence is limited; treat fit as directional guidance.
        </p>
      )}

      {Array.isArray(whyThisFits) && whyThisFits.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <strong style={{ fontSize: '0.875rem', color: 'var(--ink)' }}>Why this fits:</strong>
          <ul style={{ margin: '6px 0 0 18px', padding: 0, fontSize: '0.875rem', color: 'var(--secondary)' }}>
            {whyThisFits.slice(0, 4).map((line) => (
              <li key={line} style={{ marginBottom: '4px' }}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {skillGaps?.missingCriticalSkills?.length > 0 && (
        <p style={{ marginTop: '10px', fontSize: '0.875rem', color: 'var(--secondary)' }}>
          <strong style={{ color: 'var(--ink)' }}>Critical skill gaps:</strong> {skillGaps.missingCriticalSkills.slice(0, 5).join(', ')}
        </p>
      )}
    </Card>
  );
};

export default CareerRecommendationCard;
