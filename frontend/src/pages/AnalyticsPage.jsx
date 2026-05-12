import React from 'react';
import { Link } from 'react-router-dom';
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
    <main className="app-page">
      <div className="page-shell analytics-page">
        <header className="page-header">
          <p className="page-header__eyebrow">Phase 7</p>
          <h1 className="page-header__title">Personal intelligence dashboard</h1>
          <p className="page-header__subtitle">Analytics are scoped to your account and derived from stored results.</p>
          <p className="page-header__actions">
            <Link className="history-item__link" to="/dashboard">
              Back to dashboard
            </Link>
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
      </div>
    </main>
  );
}
