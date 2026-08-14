import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import {
  usePersonalAnalyticsHistoryQuery,
  usePersonalAnalyticsOverviewQuery,
  usePersonalCareerReadinessQuery,
  usePersonalInsightTimelineQuery,
  usePersonalReportHistoryQuery,
  usePersonalSkillProgressQuery,
  usePersonalTraitTrendsQuery,
} from '../hooks/usePersonalAnalytics';
import PersonalIntelligenceOverview from '../components/analytics/PersonalIntelligenceOverview';
import AssessmentHistoryList from '../components/analytics/AssessmentHistoryList';
import TraitTrendChart from '../components/analytics/TraitTrendChart';
import CareerReadinessCard from '../components/analytics/CareerReadinessCard';
import SkillProgressPanel from '../components/analytics/SkillProgressPanel';
import RoadmapProgressPanel from '../components/analytics/RoadmapProgressPanel';
import InsightTimeline from '../components/analytics/InsightTimeline';
import ReportHistoryPanel from '../components/analytics/ReportHistoryPanel';
import GrowthRecommendationsPanel from '../components/analytics/GrowthRecommendationsPanel';

export default function AnalyticsPage() {
  const auth = useAuth();
  const enabled = Boolean(auth.userId);

  const overviewQ = usePersonalAnalyticsOverviewQuery(enabled);
  const historyQ = usePersonalAnalyticsHistoryQuery(enabled);
  const trendsQ = usePersonalTraitTrendsQuery(enabled);
  const readinessQ = usePersonalCareerReadinessQuery(enabled);
  const skillQ = usePersonalSkillProgressQuery(enabled);
  const timelineQ = usePersonalInsightTimelineQuery(enabled);
  const reportHistQ = usePersonalReportHistoryQuery(enabled);

  const latestResultId = historyQ.data?.[0]?.resultId || '';
  const topCareerId = skillQ.data?.topCareerId || '';

  return (
    <main className="app-page analytics-page">
      <div className="page-shell">
        <header className="page-header">
          <div className="page-header__actions-row">
            <Link to="/dashboard" className="public-text-action">
              <FiArrowLeft /> Back to dashboard
            </Link>
          </div>
          <h1 className="page-header__title">Longitudinal Profile Analytics</h1>
          <p className="page-header__subtitle">
            Track continuous dimension shifts, career readiness evolution, and verified skill milestones across your
            historical assessments.
          </p>
        </header>

        <PersonalIntelligenceOverview query={overviewQ} />
        <CareerReadinessCard query={readinessQ} />
        <SkillProgressPanel query={skillQ} />
        <RoadmapProgressPanel resultId={latestResultId} careerId={topCareerId} />
        <TraitTrendChart query={trendsQ} />
        <AssessmentHistoryList query={historyQ} />
        <InsightTimeline query={timelineQ} />
        <ReportHistoryPanel query={reportHistQ} />
        <GrowthRecommendationsPanel
          query={reportHistQ}
          items={reportHistQ.data?.growthRecommendations || []}
        />
      </div>
    </main>
  );
}
