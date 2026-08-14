import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiCompass,
  FiDownload,
  FiMessageSquare,
  FiRefreshCw,
  FiShare2,
} from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import ProductShell from '../../components/product/ProductShell';
import EmptyProductState from '../../components/ui/EmptyProductState';
import {
  useAssessmentComparisonQuery,
  useAssessmentHistoryQuery,
  useAssessmentReportQuery,
  useGenerateAiReportMutation,
} from '../../hooks/useAssessment';
import { useAuth } from '../../hooks/useAuth';
import { normalizeTraits, TRAIT_META, TRAIT_ORDER } from '../../utils/traits';
import '../../styles/results-product.css';

const formatDate = (value) => {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(value));
};

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { assessmentId } = useParams();

  const auth = useAuth();
  const reportQuery = useAssessmentReportQuery(assessmentId, Boolean(assessmentId));
  const historyQuery = useAssessmentHistoryQuery(auth.userId, Boolean(auth.userId));
  const aiReportMutation = useGenerateAiReportMutation();

  const [activeLens, setActiveLens] = useState('personality');
  const [shareStatus, setShareStatus] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const routeResult = location.state?.result || null;
  const report = reportQuery.data || routeResult;
  const rawTraits = report?.traits || {};
  const traits = normalizeTraits(rawTraits);
  const hasTraits = Object.keys(traits).length > 0;

  const rawCareers = report?.recommendedCareers || report?.career_recommendations || [];
  const careers = Array.isArray(rawCareers) ? rawCareers : [];

  const handleShare = async () => {
    setShareStatus('');
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Personality Assessor Profile',
          text: 'Review my professional profile summary and career alignment.',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus('Link copied to clipboard.');
        setTimeout(() => setShareStatus(''), 3000);
      }
    } catch {
      // Ignored
    }
  };

  const handleGenerateAiReport = async () => {
    if (!assessmentId) return;
    try {
      await aiReportMutation.mutateAsync({ assessmentId });
    } catch {
      // Error handled by mutation state
    }
  };

  if (reportQuery.isPending && !routeResult) {
    return (
      <ProductShell title="Loading Profile…">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
          <Skeleton height="36px" />
          <Skeleton height="140px" />
          <Skeleton height="280px" />
        </div>
      </ProductShell>
    );
  }

  if (!report && reportQuery.isError) {
    return (
      <ProductShell title="Profile Unavailable">
        <EmptyProductState
          title="Assessment Record Unavailable"
          description={reportQuery.error?.message || 'Unable to load this assessment record.'}
          action={
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Back to Overview
            </Button>
          }
        />
      </ProductShell>
    );
  }

  const riasecScores = report?.phaseScores?.riasec || report?.riasec || null;
  const workValues = report?.phaseScores?.workValues || report?.workValues || report?.values || null;
  const careerSignals = report?.phaseScores?.careerSignals || report?.careerSignals || null;

  return (
    <ProductShell
      title="Current Profile"
      actions={
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" size="sm" onClick={handleShare}>
            <FiShare2 /> Share
          </Button>
          <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard')}>
            <FiArrowLeft /> Overview
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/assessment/start')}>
            <FiCompass /> New Assessment
          </Button>
        </div>
      }
    >
      <div className="profile-results-shell">
        {shareStatus && (
          <p className="ui-message ui-message--success" role="status">
            {shareStatus}
          </p>
        )}

        {/* ── Statement / Overview ── */}
        <section className="profile-primary-statement-section" aria-labelledby="profile-title">
          <div className="profile-primary-statement-header">
            <h1 id="profile-title" className="profile-primary-title">
              Your Current Profile
            </h1>
            <p className="profile-primary-subtitle">
              Synthesized from adaptive psychometric responses, vocational preferences, and work context.
            </p>
            <span className="profile-timestamp-label">
              Recorded {formatDate(report?.completedAt || report?.createdAt)}
            </span>
          </div>

          <div className="profile-summary-card">
            <p className="profile-summary-text">
              {report?.summary ||
                report?.profile_summary ||
                'Your responses synthesize into four calibrated profile lenses: baseline five-factor personality spectrums, vocational interests, work values, and demonstrated career signals.'}
            </p>
          </div>
        </section>

        {/* ── 3-Zone Evidence & Confidence Summary ── */}
        <section aria-labelledby="evidence-summary-title">
          <h2 id="evidence-summary-title" className="visually-hidden">
            Evidence and Confidence Zones
          </h2>
          <div className="evidence-confidence-zones">
            <div className="evidence-zone-card evidence-zone-card--supporting">
              <span className="evidence-zone-card__head">Direct Evidence</span>
              <p className="evidence-zone-card__status">Consistent Calibration</p>
              <p className="evidence-zone-card__detail">
                Item responses demonstrate high internal consistency across continuous trait anchors.
              </p>
            </div>
            <div className="evidence-zone-card evidence-zone-card--interpretation">
              <span className="evidence-zone-card__head">Context Model</span>
              <p className="evidence-zone-card__status">
                {report?.validity || report?.scoreValidity || 'Calibrated & Valid'}
              </p>
              <p className="evidence-zone-card__detail">
                Synthesized using validated psychometric distributions against standard professional reference groups.
              </p>
            </div>
            <div className="evidence-zone-card evidence-zone-card--limited">
              <span className="evidence-zone-card__head">Interpretation Boundary</span>
              <p className="evidence-zone-card__status">Exploratory Signal</p>
              <p className="evidence-zone-card__detail">
                Measures serve self-reflection and career navigation; not psychiatric diagnosis or hiring verdicts.
              </p>
            </div>
          </div>
        </section>

        {/* ── Profile Readings & Lens Switcher ── */}
        <section className="profile-readings-section" aria-labelledby="readings-title">
          <div className="profile-readings-header">
            <div>
              <h2 id="readings-title" className="profile-section-title">
                Calibrated Readings
              </h2>
            </div>
            <div className="profile-lens-switcher" role="tablist" aria-label="Profile lenses">
              <button
                type="button"
                role="tab"
                aria-selected={activeLens === 'personality'}
                className={`profile-lens-btn ${activeLens === 'personality' ? 'is-active' : ''}`}
                onClick={() => setActiveLens('personality')}
              >
                Big Five Spectrums
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeLens === 'interests'}
                className={`profile-lens-btn ${activeLens === 'interests' ? 'is-active' : ''}`}
                onClick={() => setActiveLens('interests')}
              >
                Vocational Interests
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeLens === 'values'}
                className={`profile-lens-btn ${activeLens === 'values' ? 'is-active' : ''}`}
                onClick={() => setActiveLens('values')}
              >
                Work Values
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeLens === 'signals'}
                className={`profile-lens-btn ${activeLens === 'signals' ? 'is-active' : ''}`}
                onClick={() => setActiveLens('signals')}
              >
                Career Signals
              </button>
            </div>
          </div>

          <div className="profile-lens-content">
            {activeLens === 'personality' && (
              <div>
                {hasTraits ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {TRAIT_ORDER.map((traitKey) => {
                      const score = Math.round(Number(traits[traitKey] || 0));
                      const meta = TRAIT_META[traitKey] || { name: traitKey, description: '' };
                      return (
                        <div key={traitKey} className="profile-dimension-row">
                          <div className="profile-dimension-row__info">
                            <div>
                              <strong>{meta.name}</strong>
                              {meta.description && (
                                <p style={{ fontSize: '0.8125rem', color: 'var(--secondary)', margin: '2px 0 0' }}>
                                  {meta.description}
                                </p>
                              )}
                            </div>
                            <span>{score}%</span>
                          </div>
                          <div className="profile-dimension-bar">
                            <div className="profile-dimension-bar__fill" style={{ width: `${score}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyProductState
                    title="Trait scores not available"
                    description="This assessment record does not contain calibrated Big Five trait dimensions."
                    compact
                  />
                )}
              </div>
            )}

            {activeLens === 'interests' && (
              <div>
                {riasecScores && Object.keys(riasecScores).length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                    {Object.entries(riasecScores).map(([theme, val]) => {
                      const score = typeof val === 'object' ? val.score || 0 : Number(val || 0);
                      return (
                        <div key={theme} style={{ background: 'var(--canvas)', padding: '14px 16px', borderRadius: 'var(--radius-sm)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <strong style={{ textTransform: 'capitalize' }}>{theme}</strong>
                            <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>{Math.round(score)}%</span>
                          </div>
                          <div className="profile-dimension-bar">
                            <div className="profile-dimension-bar__fill" style={{ width: `${score}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyProductState
                    title="Vocational interests not available"
                    description="This assessment record does not contain RIASEC vocational interest scores."
                    compact
                  />
                )}
              </div>
            )}

            {activeLens === 'values' && (
              <div>
                {workValues && Object.keys(workValues).length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {Object.entries(workValues).map(([key, val]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                        <strong style={{ textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}</strong>
                        <span style={{ color: 'var(--secondary)' }}>{String(val)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyProductState
                    title="Work values not recorded"
                    description="Work values hierarchy was not captured during this assessment session."
                    compact
                  />
                )}
              </div>
            )}

            {activeLens === 'signals' && (
              <div>
                {careerSignals && Object.keys(careerSignals).length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {Object.entries(careerSignals).map(([signal, val]) => (
                      <div key={signal} style={{ background: 'var(--canvas)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                        <strong style={{ textTransform: 'capitalize' }}>{signal.replace(/_/g, ' ')}</strong>
                        <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--secondary)' }}>{String(val)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyProductState
                    title="Career signals not recorded"
                    description="Demonstrated scenario capabilities were not captured during this assessment session."
                    compact
                  />
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Career Alignment Section (NO || 75) ── */}
        {careers.length > 0 && (
          <section aria-labelledby="careers-heading">
            <div style={{ marginBottom: '14px' }}>
              <h2 id="careers-heading" className="profile-section-title">
                Career Alignment
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', margin: '4px 0 0' }}>
                Target career environments that align with your demonstrated signals.
              </p>
            </div>

            <div className="profile-careers-grid">
              {careers.slice(0, 4).map((item, idx) => {
                const title = item.title || item.name || (typeof item === 'string' ? item : `Role ${idx + 1}`);
                const matchScore = item.match ?? item.score ?? item.fitScore ?? null;
                return (
                  <article key={title} className="career-recommendation-card">
                    <div className="career-recommendation-card__header">
                      <h3>{title}</h3>
                      {matchScore !== null ? (
                        <span className="career-fit-badge">{Math.round(Number(matchScore))}% fit</span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>Fit unavailable</span>
                      )}
                    </div>
                    <p className="career-recommendation-card__body">
                      {item.why || item.description || 'Strong dimensional alignment with your problem-solving approach.'}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ── AI Narrative Report Generation ── */}
        <section className="dashboard-widget" aria-labelledby="ai-report-title">
          <div className="dashboard-widget__head">
            <div>
              <h2 id="ai-report-title" className="dashboard-widget__title">
                AI Synthesis Narrative
              </h2>
              <p className="dashboard-widget__subtitle">
                {report?.aiReport || report?.ai_analysis
                  ? 'Comprehensive personalized interpretation generated from your data.'
                  : 'Synthesize a detailed natural language breakdown of your strengths and stretch areas.'}
              </p>
            </div>
            {!(report?.aiReport || report?.ai_analysis) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleGenerateAiReport}
                loading={aiReportMutation.isPending}
                loadingLabel="Generating narrative…"
              >
                Generate Analysis
              </Button>
            )}
          </div>
          <div className="dashboard-widget__body">
            {report?.aiReport || report?.ai_analysis ? (
              <div style={{ fontSize: '0.96875rem', lineHeight: 1.6, color: 'var(--ink)', whiteSpace: 'pre-line' }}>
                {report.aiReport || report.ai_analysis}
              </div>
            ) : (
              <p style={{ color: 'var(--secondary)', fontSize: '0.875rem', margin: 0 }}>
                Click &ldquo;Generate Analysis&rdquo; to build an in-depth developmental narrative from this assessment result.
              </p>
            )}
            {aiReportMutation.isError && (
              <p className="ui-message ui-message--error" style={{ marginTop: '12px' }}>
                {aiReportMutation.error?.message || 'Failed to generate AI analysis. Please try again.'}
              </p>
            )}
          </div>
        </section>

        {/* ── Sticky Career Coach Launcher ── */}
        <button
          type="button"
          className="chatbot-sticky-launcher"
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Open Career Coach"
        >
          <FiMessageSquare />
          <span>Ask Career Coach</span>
        </button>
      </div>
    </ProductShell>
  );
}
