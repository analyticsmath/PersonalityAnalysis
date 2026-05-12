import React from 'react';
import Card from '../ui/Card';

const CareerRecommendationCard = ({
  title = '',
  fitScore = 0,
  confidence = 0,
  preliminary = false,
  fitType = '',
  whyThisFits = [],
  skillGaps = null,
}) => {
  const confPct = typeof confidence === 'number' && confidence <= 1 ? Math.round(confidence * 100) : Math.round(Number(confidence || 0));

  return (
    <Card title={title || 'Career'} subtitle={fitType ? `Type: ${String(fitType).replace(/([A-Z])/g, ' $1')}` : ''} animated={false}>
      <p className="phase3-career-card__metric">
        Fit score: <strong>{Math.round(Number(fitScore || 0))}</strong> · Confidence: <strong>{confPct}%</strong>
      </p>
      {preliminary ? (
        <p className="ui-message ui-message--neutral" role="status">
          Preliminary — assessment evidence is limited; treat fit as directional guidance.
        </p>
      ) : null}
      {Array.isArray(whyThisFits) && whyThisFits.length ? (
        <div>
          <strong>Why this may fit</strong>
          <ul>
            {whyThisFits.slice(0, 4).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {skillGaps?.missingCriticalSkills?.length ? (
        <p>
          <strong>Skill gaps:</strong> {skillGaps.missingCriticalSkills.slice(0, 5).join(', ')}
        </p>
      ) : null}
    </Card>
  );
};

export default CareerRecommendationCard;
