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

        {/* Section 1: Overview Summary */}
        <section className="analytics-v4-section" aria-labelledby="overview-heading">
          <PersonalIntelligenceOverview query={overviewQ} />
        </section>

        {/* Section 2: How has the profile changed? */}
        <section className="analytics-v4-section" aria-labelledby="profile-shifts-heading">
          <div className="analytics-section-title-row">
            <span className="analytics-section-tag">01. Trajectory Analysis</span>
            <h2 id="profile-shifts-heading" className="analytics-section-title">
              How has your profile evolved?
            </h2>
          </div>
          <div className="analytics-section-grid">
            <div className="analytics-grid-main">
              <TraitTrendChart query={trendsQ} />
            </div>
            <div className="analytics-grid-side">
              <CareerReadinessCard query={readinessQ} />
            </div>
          </div>
        </section>

        {/* Section 3: What skills & milestones changed? */}
        <section className="analytics-v4-section" aria-labelledby="skills-milestones-heading">
          <div className="analytics-section-title-row">
            <span className="analytics-section-tag">02. Verified Progress</span>
            <h2 id="skills-milestones-heading" className="analytics-section-title">
              What capabilities and milestones have advanced?
            </h2>
          </div>
          <div className="analytics-section-grid">
            <div className="analytics-grid-col">
              <SkillProgressPanel query={skillQ} />
            </div>
            <div className="analytics-grid-col">
              <RoadmapProgressPanel resultId={latestResultId} careerId={topCareerId} />
            </div>
          </div>
        </section>

        {/* Section 4: What happened when? */}
        <section className="analytics-v4-section" aria-labelledby="timeline-heading">
          <div className="analytics-section-title-row">
            <span className="analytics-section-tag">03. Evidence Timeline</span>
            <h2 id="timeline-heading" className="analytics-section-title">
              What milestones occurred when?
            </h2>
          </div>
          <div className="analytics-section-grid">
            <div className="analytics-grid-col">
              <AssessmentHistoryList query={historyQ} />
            </div>
            <div className="analytics-grid-col">
              <InsightTimeline query={timelineQ} />
            </div>
          </div>
        </section>

        {/* Section 5: Reports & Recommendations */}
        <section className="analytics-v4-section" aria-labelledby="reports-heading">
          <div className="analytics-section-title-row">
            <span className="analytics-section-tag">04. Deliverables &amp; Direction</span>
            <h2 id="reports-heading" className="analytics-section-title">
              Reports and strategic recommendations
            </h2>
          </div>
          <div className="analytics-section-grid">
            <div className="analytics-grid-col">
              <ReportHistoryPanel query={reportHistQ} />
            </div>
            <div className="analytics-grid-col">
              <GrowthRecommendationsPanel
                query={reportHistQ}
                items={reportHistQ.data?.growthRecommendations || []}
              />
            </div>
          </div>
        </section>
      </div>
    </ProductShell>
  );
}
