import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
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
            <p className="ui-message ui-message--error">No session was provided.</p>
            <Button onClick={() => navigate('/assessment/start')}>Start assessment</Button>
          </Card>
        </div>
      </main>
    );
  }

  if (careerQuery.isPending) {
    return (
      <main className="app-page">
        <div className="page-shell">
          <Card animated={false} title="Career Explorer">
            <p>Loading structured career intelligence…</p>
          </Card>
        </div>
      </main>
    );
  }

  if (careerQuery.isError) {
    return (
      <main className="app-page">
        <div className="page-shell">
          <Card animated={false} title="Career Explorer">
            <p className="ui-message ui-message--error">
              {careerQuery.error?.message || 'Unable to load career recommendations.'}
            </p>
            <Button onClick={() => navigate(`/assessment/result?session=${sessionId}`)}>Back to results</Button>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="app-page">
      <div className="page-shell">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0 }}>Career Explorer</h1>
          <Button variant="ghost" onClick={() => navigate(`/assessment/result?session=${sessionId}`)}>
            Back to results
          </Button>
        </div>
        <CareerExplorerPanel payload={careerQuery.data} />
      </div>
    </main>
  );
};

export default CareerExplorerPage;
