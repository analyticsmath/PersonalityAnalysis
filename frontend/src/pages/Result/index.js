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
  useAssessmentHistoryQuery,
  useAssessmentReportQuery,
  useGenerateAiReportMutation,
} from '../../hooks/useAssessment';
import { useAuth } from '../../hooks/useAuth';
import { normalizeTraits, TRAIT_META, TRAIT_ORDER } from '../../utils/traits';
import '../../styles/results-product.css';

const formatDate = (value) => {
  if (!value) return 'Not available';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Not available';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(d);
};

const formatObjectValue = (val) => {
  if (val === null || val === undefined) return 'Not available';
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
    return String(val);
  }
  if (typeof val === 'object') {
    if (typeof val.text === 'string' || typeof val.text === 'number') return String(val.text);
    if (typeof val.description === 'string' || typeof val.description === 'number') return String(val.description);
    if (typeof val.summary === 'string' || typeof val.summary === 'number') return String(val.summary);
    if (typeof val.label === 'string' || typeof val.label === 'number') return String(val.label);
    if (typeof val.name === 'string' || typeof val.name === 'number') return String(val.name);
    if (val.score !== undefined && val.score !== null && val.score !== '' && Number.isFinite(Number(val.score))) {
      return `${Math.round(Number(val.score))}%`;
    }
    if (val.rank !== undefined && val.rank !== null && val.rank !== '' && Number.isFinite(Number(val.rank))) {
      return `Priority ${val.rank}`;
    }
    if (val.value !== undefined && val.value !== null && (typeof val.value === 'string' || typeof val.value === 'number' || typeof val.value === 'boolean')) {
      return String(val.value);
    }
  }
  return 'Not available';
};

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { assessmentId } = useParams();

  const auth = useAuth();
  const reportQuery = useAssessmentReportQuery(assessmentId, Boolean(assessmentId));
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

  const validityState = report?.validity || report?.scoreValidity || report?.meta?.scoreValidity || null;
  const rawConfidence = report?.confidence ?? report?.confidence_score ?? report?.meta?.confidence_score ?? null;
  const confidencePct =
    rawConfidence !== null && Number.isFinite(Number(rawConfidence))
      ? typeof rawConfidence === 'number' && rawConfidence <= 1
        ? Math.round(rawConfidence * 100)
        : Math.round(Number(rawConfidence))
      : null;

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
                'Your responses synthesize into calibrated profile dimensions, vocational affinities, work values, and demonstrated career signals.'}
            </p>
          </div>
        </section>

        {/* ── 3-Zone Evidence & Confidence Summary (Truthful, No Invented Claims) ── */}
        <section aria-labelledby="evidence-summary-title">
          <h2 id="evidence-summary-title" className="visually-hidden">
            Evidence and Confidence Zones
          </h2>
          <div className="evidence-confidence-zones">
            <div className="evidence-zone-card evidence-zone-card--supporting">
              <span className="evidence-zone-card__head">Direct Evidence</span>
              <p className="evidence-zone-card__status">
                {confidencePct !== null ? `Confidence: ${confidencePct}%` : 'Confidence unavailable'}
              </p>
              <p className="evidence-zone-card__detail">
                {confidencePct !== null
                  ? 'See methodology for how scoring metadata is interpreted.'
                  : 'Detailed evidence metrics are not available for this record.'}
              </p>
            </div>
            <div className="evidence-zone-card evidence-zone-card--interpretation">
              <span className="evidence-zone-card__head">Scoring Validity</span>
              <p className="evidence-zone-card__status">
                {validityState ? `Status: ${validityState}` : 'Validity status unavailable'}
              </p>
              <p className="evidence-zone-card__detail">
                {validityState
                  ? (report?.meta?.scoreSource ? `Evaluation source: ${report.meta.scoreSource}.` : 'Computed deterministically from structured item responses.')
                  : 'Detailed evidence metrics are not available for this record.'}
              </p>
            </div>
            <div className="evidence-zone-card evidence-zone-card--limited">
              <span className="evidence-zone-card__head">Use boundary</span>
              <p className="evidence-zone-card__detail">
                Results support professional reflection and career exploration; they are not clinical diagnoses, hiring decisions or guarantees.
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
                      const raw = traits[traitKey];
                      const hasValue = raw !== null && raw !== undefined && raw !== '' && Number.isFinite(Number(raw));
                      const score = hasValue ? Math.round(Number(raw)) : null;
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
                            <span>{hasValue ? `${score}%` : 'Not available'}</span>
                          </div>
                          <div className="profile-dimension-bar">
                            <div
                              className="profile-dimension-bar__fill"
                              style={{ width: hasValue ? `${score}%` : '0%' }}
                            />
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
                    {Object.entries(riasecScores).map(([theme, raw]) => {
                      const rawScore = typeof raw === 'object' && raw !== null ? raw.score : raw;
                      const hasScore = rawScore !== null && rawScore !== undefined && rawScore !== '' && Number.isFinite(Number(rawScore));
                      const score = hasScore ? Math.round(Number(rawScore)) : null;
                      return (
                        <div key={theme} style={{ background: 'var(--canvas)', padding: '14px 16px', borderRadius: 'var(--radius-sm)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <strong style={{ textTransform: 'capitalize' }}>{theme}</strong>
                            <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>
                              {hasScore ? `${score}%` : 'Not available'}
                            </span>
                          </div>
                          <div className="profile-dimension-bar">
                            <div
                              className="profile-dimension-bar__fill"
                              style={{ width: hasScore ? `${score}%` : '0%' }}
                            />
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
                    {Object.entries(workValues).map(([key, raw]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-sm)' }}>
                        <strong style={{ textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}</strong>
                        <span style={{ color: 'var(--secondary)' }}>{formatObjectValue(raw)}</span>
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
                    {Object.entries(careerSignals).map(([signal, raw]) => (
                      <div key={signal} style={{ background: 'var(--canvas)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                        <strong style={{ textTransform: 'capitalize' }}>{signal.replace(/_/g, ' ')}</strong>
                        <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--secondary)' }}>
                          {formatObjectValue(raw)}
                        </p>
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
                const rawMatch = item.match ?? item.score ?? item.fitScore ?? null;
                const hasMatch = rawMatch !== null && Number.isFinite(Number(rawMatch));
                const matchScore = hasMatch ? Math.round(Number(rawMatch)) : null;
                return (
                  <article key={title} className="career-recommendation-card">
                    <div className="career-recommendation-card__header">
                      <h3>{title}</h3>
                      {hasMatch ? (
                        <span className="career-fit-badge">{matchScore}% fit</span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>Fit unavailable</span>
                      )}
                    </div>
                    {item.why || item.description ? (
                      <p className="career-recommendation-card__body">
                        {item.why || item.description}
                      </p>
                    ) : null}
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
                  ? 'Personalized qualitative interpretation generated from your data.'
                  : 'Synthesize a natural language breakdown of strengths and stretch areas.'}
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
