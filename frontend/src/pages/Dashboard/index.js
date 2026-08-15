import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiBarChart2,
  FiCompass,
  FiPlay,
  FiShield,
  FiUploadCloud,
} from 'react-icons/fi';

import Button from '../../components/ui/Button';
import ProductShell from '../../components/product/ProductShell';
import { useAuth } from '../../hooks/useAuth';
import {
  useAssessmentHistoryQuery,
  useAssessmentReportQuery,
} from '../../hooks/useAssessment';
import { useActiveFlowSessionQuery } from '../../hooks/useAssessmentFlow';
import { readAssessmentFlowState } from '../../utils/assessmentFlowStorage';
import { normalizeTraits, TRAIT_META, TRAIT_ORDER } from '../../utils/traits';

const formatDate = (value) => {
  if (!value) return 'Not recorded';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const historyQuery = useAssessmentHistoryQuery(auth.userId, Boolean(auth.userId));
  const activeFlowSessionQuery = useActiveFlowSessionQuery();

  const assessments = useMemo(() => historyQuery.data || [], [historyQuery.data]);
  const latestAssessment = assessments[0] || null;
  const previousAssessment = assessments[1] || null;

  const latestReportQuery = useAssessmentReportQuery(
    latestAssessment?.assessmentId,
    Boolean(latestAssessment?.assessmentId)
  );

  const rawFlowSession = activeFlowSessionQuery.data?.session || null;
  const localFlowState = readAssessmentFlowState(auth.userId);
  const activeSessionId = rawFlowSession?.sessionId || localFlowState?.sessionId || null;
  const activeSessionStage = rawFlowSession?.stage || localFlowState?.stage || 'questionnaire';

  const isSessionActive = Boolean(
    activeSessionId &&
      activeSessionStage !== 'result' &&
      activeSessionStage !== 'completed'
  );

  const latestTraits = normalizeTraits(
    latestReportQuery.data?.traits || latestAssessment?.traits || {}
  );
  const hasTraits = Object.keys(latestTraits).length > 0;

  const previousTraits = previousAssessment ? normalizeTraits(previousAssessment.traits || {}) : null;

  const traitDeltas = useMemo(() => {
    if (!previousTraits || !hasTraits) return null;
    const comparable = [];
    for (const traitKey of TRAIT_ORDER) {
      const curRaw = latestTraits[traitKey];
      const prevRaw = previousTraits[traitKey];
      const hasCur = curRaw !== null && curRaw !== undefined && curRaw !== '' && Number.isFinite(Number(curRaw));
      const hasPrev = prevRaw !== null && prevRaw !== undefined && prevRaw !== '' && Number.isFinite(Number(prevRaw));
      if (hasCur && hasPrev) {
        const current = Math.round(Number(curRaw));
        const prev = Math.round(Number(prevRaw));
        const delta = current - prev;
        comparable.push({
          traitKey,
          label: TRAIT_META[traitKey]?.name || traitKey,
          current,
          previous: prev,
          delta,
        });
      }
    }
    return comparable.length >= 3 ? comparable : null;
  }, [latestTraits, previousTraits, hasTraits]);

  const rawCareers =
    latestReportQuery.data?.recommendedCareers ||
    latestReportQuery.data?.career_recommendations ||
    latestAssessment?.recommendedCareers ||
    [];
  const recommendedCareers = Array.isArray(rawCareers) ? rawCareers : [];

  const resumeActiveAssessment = () => {
    if (!activeSessionId) {
      navigate('/assessment/start');
      return;
    }
    if (activeSessionStage === 'behavior') {
      navigate(`/assessment/behavior?session=${activeSessionId}`);
      return;
    }
    navigate(`/assessment/test?session=${activeSessionId}`);
  };

  const userName = auth.user?.name || auth.name || 'User';

  /* ── 1. D0 Maturity: Zero Completed Assessments (Authored Unstarted State) ── */
  if (assessments.length === 0 && !historyQuery.isLoading) {
    return (
      <ProductShell
        title="Overview"
        actions={
          <Button variant="primary" size="sm" onClick={() => navigate('/assessment/start')}>
            <FiPlay /> Start Assessment
          </Button>
        }
      >
        <div className="dashboard-grid">
          {/* Main Hero Unstarted Evidence Container (8 cols) */}
          <div className="col-span-8">
            <section className="dashboard-widget dashboard-widget--hero" aria-labelledby="zero-data-title">
              <div className="dashboard-widget__head">
                <div>
                  <h2 id="zero-data-title" className="dashboard-widget__title" style={{ fontSize: '1.5rem' }}>
                    Welcome, {userName}. Your professional profile starts here.
                  </h2>
                  <p className="dashboard-widget__subtitle">
                    Calibrated profile readings require verified background context and your first adaptive response session.
                  </p>
                </div>
              </div>

              <div className="dashboard-widget__body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ color: 'var(--pa-text, #4F5358)', fontSize: '0.9375rem', lineHeight: '1.55', margin: 0 }}>
                  Personality Assessor builds four distinct readings: continuous Big Five dimensions, vocational interest territories (RIASEC), ranked work values, and demonstrated career signals.
                </p>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button variant="primary" size="md" onClick={() => navigate('/assessment/start')}>
                    <FiPlay /> Start Your First Assessment <FiArrowRight />
                  </Button>
                  <Button variant="secondary" size="md" onClick={() => navigate('/assessment/start')}>
                    <FiUploadCloud /> Upload or Review Your CV
                  </Button>
                </div>
              </div>

              <div className="dashboard-widget__footer" style={{ justifyContent: 'flex-start', gap: '24px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--pa-muted, #767B81)' }}>
                  Deterministic psychometric calibration
                </span>
                <Link to="/methodology" style={{ fontSize: '0.8125rem', color: 'var(--pa-ink, #0B0B0B)', textDecoration: 'underline' }}>
                  Inspect methodology
                </Link>
              </div>
            </section>
          </div>

          {/* Side Guidance / What to Expect (4 cols) */}
          <div className="col-span-4">
            <section className="dashboard-widget" aria-labelledby="guide-title">
              <div className="dashboard-widget__head">
                <h3 id="guide-title" className="dashboard-widget__title" style={{ fontSize: '1.1rem' }}>
                  What happens next
                </h3>
              </div>
              <div className="dashboard-widget__body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: '600', color: 'var(--pa-ink, #0B0B0B)' }}>01</span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--pa-text, #4F5358)', margin: 0 }}>
                    <strong>Add Context:</strong> Upload a CV or enter professional background anchors.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: '600', color: 'var(--pa-ink, #0B0B0B)' }}>02</span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--pa-text, #4F5358)', margin: 0 }}>
                    <strong>Adaptive Questions:</strong> Complete 22–26 scenario-driven questions.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: '600', color: 'var(--pa-ink, #0B0B0B)' }}>03</span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--pa-text, #4F5358)', margin: 0 }}>
                    <strong>Inspect Readings:</strong> Explore your four independent readings and career fit.
                  </p>
                </div>
              </div>
              <div className="dashboard-widget__footer">
                <Link to="/account/privacy" style={{ fontSize: '0.8125rem', color: 'var(--pa-muted, #767B81)' }}>
                  <FiShield style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Privacy &amp; Data Controls
                </Link>
              </div>
            </section>
          </div>
        </div>
      </ProductShell>
    );
  }

  /* ── 2. D1 Maturity: Exactly 1 Completed Assessment ──────────────────────── */
  if (assessments.length === 1) {
    return (
      <ProductShell
        title="Overview"
        actions={
          <div style={{ display: 'flex', gap: '10px' }}>
            {isSessionActive && (
              <Button variant="secondary" size="sm" onClick={resumeActiveAssessment}>
                <FiCompass /> Resume Active
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={() => navigate('/assessment/start')}>
              <FiPlay /> New Assessment
            </Button>
          </div>
        }
      >
        <div className="dashboard-grid">
          {/* Active Profile Readings (8 cols) */}
          <div className="col-span-8">
            <section className="dashboard-widget" aria-labelledby="d1-profile-title">
              <div className="dashboard-widget__head">
                <div>
                  <h2 id="d1-profile-title" className="dashboard-widget__title">
                    Current Calibrated Profile
                  </h2>
                  <p className="dashboard-widget__subtitle">
                    Recorded on {formatDate(latestAssessment.createdAt || latestAssessment.date)}
                  </p>
                </div>
                <Link
                  to={`/result/${latestAssessment.assessmentId}`}
                  className="public-text-action"
                  style={{ fontSize: '0.875rem' }}
                >
                  Full Report <FiArrowRight />
                </Link>
              </div>

              <div className="dashboard-widget__body">
                {hasTraits ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {TRAIT_ORDER.map((traitKey) => {
                      const score = Math.round(Number(latestTraits[traitKey] ?? 50));
                      const meta = TRAIT_META[traitKey] || { name: traitKey };
                      return (
                        <div key={traitKey} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                            <span style={{ fontWeight: '550', color: 'var(--pa-ink, #0B0B0B)' }}>{meta.name}</span>
                            <span style={{ fontWeight: '600', color: 'var(--pa-ink, #0B0B0B)' }} className="tabular-nums">{score}/100</span>
                          </div>
                          <div style={{ position: 'relative', width: '100%', height: '6px', background: '#D9DDE1', borderRadius: '3px' }}>
                            <div style={{ width: `${score}%`, height: '100%', background: 'var(--pa-ink, #0B0B0B)', borderRadius: '3px' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p style={{ color: 'var(--pa-text, #4F5358)' }}>Profile dimensions are being calculated.</p>
                )}
              </div>

              <div className="dashboard-widget__footer">
                <span style={{ fontSize: '0.8125rem', color: 'var(--pa-muted, #767B81)' }}>
                  Single assessment calibration. Complete subsequent assessments to unlock longitudinal trend analytics.
                </span>
              </div>
            </section>
          </div>

          {/* Top Career Relationships (4 cols) */}
          <div className="col-span-4">
            <section className="dashboard-widget" aria-labelledby="d1-careers-title">
              <div className="dashboard-widget__head">
                <h3 id="d1-careers-title" className="dashboard-widget__title" style={{ fontSize: '1.1rem' }}>
                  Top Career Relationships
                </h3>
              </div>

              <div className="dashboard-widget__body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recommendedCareers.slice(0, 4).map((career, i) => {
                  const title = career.title || career.careerTitle || career.name || `Role #${i + 1}`;
                  const fit = Math.round(Number(career.match || career.fitScore || career.score || 80));
                  return (
                    <div
                      key={title}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        background: 'var(--pa-bg-soft, #F4F5F6)',
                        borderRadius: '6px',
                      }}
                    >
                      <span style={{ fontSize: '0.875rem', fontWeight: '550', color: 'var(--pa-ink, #0B0B0B)' }}>{title}</span>
                      <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--pa-ink, #0B0B0B)' }} className="tabular-nums">{fit}% Fit</span>
                    </div>
                  );
                })}
              </div>

              <div className="dashboard-widget__footer">
                <Link to="/assessment/career" style={{ fontSize: '0.8125rem', color: 'var(--pa-ink, #0B0B0B)', textDecoration: 'underline' }}>
                  Explore all career matches
                </Link>
              </div>
            </section>
          </div>
        </div>
      </ProductShell>
    );
  }

  /* ── 3. D2+ Maturity: Multiple Assessments (Real Longitudinal Insights) ── */
  return (
    <ProductShell
      title="Overview"
      actions={
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" size="sm" onClick={() => navigate('/analytics')}>
            <FiBarChart2 /> Full Analytics
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/assessment/start')}>
            <FiPlay /> New Assessment
          </Button>
        </div>
      }
    >
      <div className="dashboard-grid">
        {/* Longitudinal Dimension Comparison (8 cols) */}
        <div className="col-span-8">
          <section className="dashboard-widget" aria-labelledby="d2-profile-title">
            <div className="dashboard-widget__head">
              <div>
                <h2 id="d2-profile-title" className="dashboard-widget__title">
                  Longitudinal Profile &amp; Shifts
                </h2>
                <p className="dashboard-widget__subtitle">
                  Comparing latest assessment ({formatDate(latestAssessment?.createdAt)}) against baseline ({formatDate(previousAssessment?.createdAt)})
                </p>
              </div>
              <Link to="/analytics" className="public-text-action" style={{ fontSize: '0.875rem' }}>
                Trajectory Details <FiArrowRight />
              </Link>
            </div>

            <div className="dashboard-widget__body">
              {traitDeltas && traitDeltas.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {traitDeltas.map((item) => (
                    <div key={item.traitKey} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                        <span style={{ fontWeight: '550', color: 'var(--pa-ink, #0B0B0B)' }}>{item.label}</span>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <span className="tabular-nums" style={{ color: 'var(--pa-text, #4F5358)' }}>
                            {item.previous} → {item.current}
                          </span>
                          <span
                            className="tabular-nums"
                            style={{
                              fontWeight: '600',
                              color: item.delta > 0 ? 'var(--pa-success, #15704E)' : item.delta < 0 ? 'var(--pa-warning, #94610C)' : 'var(--pa-muted, #767B81)',
                            }}
                          >
                            {item.delta > 0 ? `+${item.delta}` : item.delta}
                          </span>
                        </div>
                      </div>
                      <div style={{ position: 'relative', width: '100%', height: '6px', background: '#D9DDE1', borderRadius: '3px' }}>
                        <div style={{ width: `${item.current}%`, height: '100%', background: 'var(--pa-ink, #0B0B0B)', borderRadius: '3px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : hasTraits ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {TRAIT_ORDER.map((traitKey) => {
                    const score = Math.round(Number(latestTraits[traitKey] ?? 50));
                    const meta = TRAIT_META[traitKey] || { name: traitKey };
                    return (
                      <div key={traitKey} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                        <span style={{ fontWeight: '550', color: 'var(--pa-ink, #0B0B0B)' }}>{meta.name}</span>
                        <span style={{ fontWeight: '600' }} className="tabular-nums">{score}/100</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="dashboard-widget__footer">
              <span style={{ fontSize: '0.8125rem', color: 'var(--pa-muted, #767B81)' }}>
                {assessments.length} assessments on record.
              </span>
            </div>
          </section>
        </div>

        {/* Career & Assessment History (4 cols) */}
        <div className="col-span-4">
          <section className="dashboard-widget" aria-labelledby="history-summary-title">
            <div className="dashboard-widget__head">
              <h3 id="history-summary-title" className="dashboard-widget__title" style={{ fontSize: '1.1rem' }}>
                Assessment Records
              </h3>
            </div>

            <div className="dashboard-widget__body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {assessments.slice(0, 4).map((ass) => (
                <div
                  key={ass.assessmentId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    background: 'var(--pa-bg-soft, #F4F5F6)',
                    borderRadius: '6px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '550', color: 'var(--pa-ink, #0B0B0B)' }}>
                      Assessment #{ass.assessmentId?.slice(-4) || '1'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--pa-muted, #767B81)' }}>
                      {formatDate(ass.createdAt || ass.date)}
                    </div>
                  </div>
                  <Link
                    to={`/result/${ass.assessmentId}`}
                    style={{ fontSize: '0.8125rem', color: 'var(--pa-ink, #0B0B0B)', textDecoration: 'underline' }}
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>

            <div className="dashboard-widget__footer">
              <Link to="/analytics" style={{ fontSize: '0.8125rem', color: 'var(--pa-ink, #0B0B0B)', textDecoration: 'underline' }}>
                View complete history timeline
              </Link>
            </div>
          </section>
        </div>
      </div>
    </ProductShell>
  );
}
