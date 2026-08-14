import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCompass } from 'react-icons/fi';
import Button from '../components/ui/Button';
import ProductShell from '../components/product/ProductShell';
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
import '../styles/analytics-product.css';

export default function AnalyticsPage() {
  const navigate = useNavigate();
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
    <ProductShell
      title="Longitudinal Analytics"
      actions={
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard')}>
            <FiArrowLeft /> Overview
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/assessment/start')}>
            <FiCompass /> New Assessment
          </Button>
        </div>
      }
    >
      <div className="analytics-shell">
        <header className="analytics-header">
          <h1 className="analytics-header__title">Longitudinal Profile Analytics</h1>
          <p className="analytics-header__subtitle">
            Track continuous dimension shifts, career readiness evolution, and verified skill milestones across your historical assessments.
          </p>
        </header>

        <div className="dashboard-grid">
          {/* Top overview widget (12 cols) */}
          <div className="col-span-12">
            <PersonalIntelligenceOverview query={overviewQ} />
          </div>

          {/* Trait Trends (8 cols) + Career Readiness (4 cols) */}
          <div className="col-span-8">
            <TraitTrendChart query={trendsQ} />
          </div>
          <div className="col-span-4">
            <CareerReadinessCard query={readinessQ} />
          </div>

          {/* Skill Progress (6 cols) + Roadmap Progress (6 cols) */}
          <div className="col-span-6">
            <SkillProgressPanel query={skillQ} />
          </div>
          <div className="col-span-6">
            <RoadmapProgressPanel resultId={latestResultId} careerId={topCareerId} />
          </div>

          {/* Assessment History (7 cols) + Insight Timeline (5 cols) */}
          <div className="col-span-7">
            <AssessmentHistoryList query={historyQ} />
          </div>
          <div className="col-span-5">
            <InsightTimeline query={timelineQ} />
          </div>

          {/* Report History (6 cols) + Growth Recs (6 cols) */}
          <div className="col-span-6">
            <ReportHistoryPanel query={reportHistQ} />
          </div>
          <div className="col-span-6">
            <GrowthRecommendationsPanel
              query={reportHistQ}
              items={reportHistQ.data?.growthRecommendations || []}
            />
          </div>
        </div>
      </div>
    </ProductShell>
  );
}
