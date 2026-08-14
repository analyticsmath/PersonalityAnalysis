import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import EmptyState from '../../components/ui/EmptyState';
import CareerExplorerPanel from '../../components/career/CareerExplorerPanel';
import { useCareerRecommendationsQuery } from '../../hooks/useAssessmentFlow';
import { readAssessmentFlowState } from '../../utils/assessmentFlowStorage';
import { useAuth } from '../../hooks/useAuth';

const CareerExplorerPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auth = useAuth();
  const sessionId =
    searchParams.get('session') || readAssessmentFlowState(auth.userId)?.sessionId || '';

  const careerQuery = useCareerRecommendationsQuery(sessionId, Boolean(sessionId));

  if (!sessionId) {
    return (
      <main className="app-page">
        <div className="page-shell">
          <div className="profile-summary-card">
            <EmptyState
              title="No active session"
              description="Start or resume an assessment to generate personalized career guidance for this explorer."
              action={
                <Button onClick={() => navigate('/assessment/start')}>Start assessment</Button>
              }
            />
          </div>
        </div>
      </main>
    );
  }

  if (careerQuery.isPending) {
    return (
      <main className="app-page">
        <div className="page-shell">
          <div className="profile-summary-card">
            <LoadingState message="Loading structured career intelligence…" variant="question" />
          </div>
        </div>
      </main>
    );
  }

  if (careerQuery.isError) {
    return (
      <main className="app-page">
        <div className="page-shell">
          <div className="profile-summary-card">
            <ErrorState
              message={careerQuery.error?.message || 'Unable to load career recommendations.'}
              onRetry={() => careerQuery.refetch()}
            />
            <Button variant="ghost" onClick={() => navigate(`/assessment/result?session=${sessionId}`)}>
              Back to results
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const top = Array.isArray(careerQuery.data?.topRecommendations) ? careerQuery.data.topRecommendations : [];
  const first = top[0];

  return (
    <main className="app-page career-explorer-page">
      <div className="page-shell career-explorer-shell">
        <header className="career-explorer-top-bar">
          <div>
            <h1 className="career-explorer-main-title">Career Explorer</h1>
            <p className="career-explorer-main-subtitle">
              Recommendations are evidence-based guidance from your assessment—not hiring decisions.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/assessment/result?session=${sessionId}`)}>
            <FiArrowLeft /> Back to results
          </Button>
        </header>

        {first && (
          <div className="career-explorer-sticky-pill" role="status">
            <strong>Top match:</strong> {first.title} · {Math.round(Number(first.fitScore || 0))}% fit
            {careerQuery.data?.preliminary ? ' · Preliminary' : ''}
          </div>
        )}

        <CareerExplorerPanel payload={careerQuery.data} />
      </div>
    </main>
  );
};

export default CareerExplorerPage;
