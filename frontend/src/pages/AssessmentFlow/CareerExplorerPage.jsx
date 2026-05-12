import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SectionHeader from '../../components/ui/SectionHeader';
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
          <Card animated={false} title="Career Explorer">
            <EmptyState
              title="No active session"
              description="Start or resume an assessment to generate deterministic career intelligence for this explorer."
              action={
                <Button onClick={() => navigate('/assessment/start')}>Start assessment</Button>
              }
            />
          </Card>
        </div>
      </main>
    );
  }

  if (careerQuery.isPending) {
    return (
      <main className="app-page">
        <div className="page-shell">
          <SectionHeader
            title="Career Explorer"
            subtitle="Structured fit scores, skill gaps, and roadmaps from your latest assessment."
          />
          <Card animated={false}>
            <LoadingState message="Loading structured career intelligence…" variant="question" />
          </Card>
        </div>
      </main>
    );
  }

  if (careerQuery.isError) {
    return (
      <main className="app-page">
        <div className="page-shell">
          <SectionHeader title="Career Explorer" subtitle="We could not load recommendations for this session." />
          <Card animated={false}>
            <ErrorState
              message={careerQuery.error?.message || 'Unable to load career recommendations.'}
              onRetry={() => careerQuery.refetch()}
            />
            <Button variant="ghost" onClick={() => navigate(`/assessment/result?session=${sessionId}`)}>
              Back to results
            </Button>
          </Card>
        </div>
      </main>
    );
  }

  const top = Array.isArray(careerQuery.data?.topRecommendations) ? careerQuery.data.topRecommendations : [];
  const first = top[0];

  return (
    <main className="app-page">
      <div className="page-shell">
        <SectionHeader
          title="Career Explorer"
          subtitle="Recommendations are deterministic guidance from your assessment — not hiring decisions."
          actions={
            <Button variant="ghost" onClick={() => navigate(`/assessment/result?session=${sessionId}`)}>
              Back to results
            </Button>
          }
        />
        {first ? (
          <div className="career-explorer-sticky" role="status">
            <strong>Top match:</strong> {first.title} · {Math.round(Number(first.fitScore || 0))}% fit
            {careerQuery.data?.preliminary ? ' · Preliminary' : ''}
          </div>
        ) : null}
        <CareerExplorerPanel payload={careerQuery.data} />
      </div>
    </main>
  );
};

export default CareerExplorerPage;
