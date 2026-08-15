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
      title="Analytics"
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
      <div className="analytics-v4-workspace">
        <header className="analytics-v4-header">
          <h1 className="analytics-v4-title">Longitudinal Intelligence</h1>
          <p className="analytics-v4-subtitle">
            Sequential analysis of dimensional shifts, career readiness, and verified skill milestones across your history.
          </p>
        </header>

        {/* Section 1: Overview Summary Strip */}
        <section className="analytics-v4-chapter" aria-labelledby="overview-heading">
          <PersonalIntelligenceOverview query={overviewQ} />
        </section>

        {/* Question 1: How has your profile evolved? (Dominant Full-Width Trend Visualization) */}
        <section className="analytics-v4-chapter analytics-v4-chapter--trend" aria-labelledby="profile-shifts-heading">
          <div className="analytics-chapter-header">
            <h2 id="profile-shifts-heading" className="analytics-chapter-title">
              How has your profile evolved?
            </h2>
          </div>
          <div className="analytics-trend-layout">
            <div className="analytics-trend-main">
              <TraitTrendChart query={trendsQ} />
            </div>
            <div className="analytics-trend-side">
              <CareerReadinessCard query={readinessQ} />
            </div>
          </div>
        </section>

        {/* Question 2: How has career direction changed? (Verified Progress) */}
        <section className="analytics-v4-chapter" aria-labelledby="skills-milestones-heading">
          <div className="analytics-chapter-header">
            <h2 id="skills-milestones-heading" className="analytics-chapter-title">
              How has career direction changed?
            </h2>
          </div>
          <div className="analytics-capabilities-layout">
            <SkillProgressPanel query={skillQ} />
            <RoadmapProgressPanel resultId={latestResultId} careerId={topCareerId} />
          </div>
        </section>

        {/* Question 3: What evidence changed? (Timeline) */}
        <section className="analytics-v4-chapter" aria-labelledby="timeline-heading">
          <div className="analytics-chapter-header">
            <h2 id="timeline-heading" className="analytics-chapter-title">
              What evidence changed?
            </h2>
          </div>
          <div className="analytics-timeline-layout">
            <AssessmentHistoryList query={historyQ} />
            <InsightTimeline query={timelineQ} />
          </div>
        </section>

        {/* Question 4: What should you inspect next? (Deliverables & Actions) */}
        <section className="analytics-v4-chapter" aria-labelledby="reports-heading">
          <div className="analytics-chapter-header">
            <h2 id="reports-heading" className="analytics-chapter-title">
              What should you inspect next?
            </h2>
          </div>
          <div className="analytics-actions-layout">
            <ReportHistoryPanel query={reportHistQ} />
            <GrowthRecommendationsPanel
              query={reportHistQ}
              items={reportHistQ.data?.growthRecommendations || []}
            />
          </div>
        </section>
      </div>
    </ProductShell>
  );
}
