import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiCompass } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import ProductShell from '../../components/product/ProductShell';
import EmptyProductState from '../../components/ui/EmptyProductState';
import CareerExplorerPanel from '../../components/career/CareerExplorerPanel';
import { useCareerRecommendationsQuery } from '../../hooks/useAssessmentFlow';
import { readAssessmentFlowState } from '../../utils/assessmentFlowStorage';
import { useAuth } from '../../hooks/useAuth';

export default function CareerExplorerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auth = useAuth();
  const sessionId =
    searchParams.get('session') || readAssessmentFlowState(auth.userId)?.sessionId || '';

  const careerQuery = useCareerRecommendationsQuery(sessionId, Boolean(sessionId));

  if (!sessionId) {
    return (
      <ProductShell title="Career Explorer">
        <EmptyProductState
          title="No active session"
          description="Start or resume an assessment to generate calibrated career alignment."
          action={
            <Button variant="primary" onClick={() => navigate('/assessment/start')}>
              Start assessment
            </Button>
          }
        />
      </ProductShell>
    );
  }

  if (careerQuery.isPending) {
    return (
      <ProductShell title="Career Explorer">
        <LoadingState message="Loading calibrated career intelligence…" variant="question" />
      </ProductShell>
    );
  }

  if (careerQuery.isError) {
    return (
      <ProductShell title="Career Explorer">
        <EmptyProductState
          title="Career Intelligence Unavailable"
          description={careerQuery.error?.message || 'Unable to load career recommendations.'}
          action={
            <Button variant="secondary" onClick={() => careerQuery.refetch()}>
              Try Again
            </Button>
          }
        />
      </ProductShell>
    );
  }

  const top = Array.isArray(careerQuery.data?.topRecommendations) ? careerQuery.data.topRecommendations : [];
  const first = top[0];

  return (
    <ProductShell
      title="Career Explorer"
      actions={
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" size="sm" onClick={() => navigate(`/assessment/result?session=${sessionId}`)}>
            <FiArrowLeft /> Profile Result
          </Button>
          <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard')}>
            Overview
          </Button>
        </div>
      }
    >
      <div className="career-explorer-shell">
        <header style={{ marginBottom: '20px' }}>
          <h1 className="dashboard-widget__title" style={{ fontSize: '1.75rem', marginBottom: '6px' }}>
            Career Explorer
          </h1>
          <p style={{ color: 'var(--secondary)', fontSize: '0.9375rem', margin: 0 }}>
            Recommendations represent dimensional alignment with your demonstrated signals—not hiring decisions.
          </p>
        </header>

        {first && (
          <div className="ui-message ui-message--info" role="status" style={{ marginBottom: '20px' }}>
            <strong>Top alignment:</strong> {first.title} · {first.fitScore != null ? `${Math.round(Number(first.fitScore))}% fit` : 'Calibrated match'}
            {careerQuery.data?.preliminary ? ' · Preliminary' : ''}
          </div>
        )}

        <CareerExplorerPanel payload={careerQuery.data} sessionId={sessionId} />
      </div>
    </ProductShell>
  );
}
