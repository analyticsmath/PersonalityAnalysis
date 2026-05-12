import React from 'react';
import { Link } from 'react-router-dom';
import AssessmentPage from '../Assessment';

/**
 * Non-adaptive (legacy) questionnaire UI. Kept for backward compatibility only.
 * Not linked from primary navigation; reachable at /legacy/assessment-static.
 */
const LegacyStaticAssessmentPage = () => {
  return (
    <div className="legacy-static-assessment">
      <div
        role="note"
        aria-label="Legacy assessment notice"
        style={{
          padding: '12px 16px',
          marginBottom: 12,
          borderRadius: 8,
          background: 'rgba(251, 191, 36, 0.15)',
          border: '1px solid rgba(251, 191, 36, 0.45)',
          color: '#422006',
          fontSize: 14,
          lineHeight: 1.45,
        }}
      >
        <strong>Legacy static assessment (development / compatibility).</strong>{' '}
        The supported product flow is the CV-driven adaptive assessment.{' '}
        <Link to="/assessment/start" style={{ fontWeight: 600 }}>
          Go to adaptive assessment
        </Link>
        .
      </div>
      <AssessmentPage />
    </div>
  );
};

export default LegacyStaticAssessmentPage;
