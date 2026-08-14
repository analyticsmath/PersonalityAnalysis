import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
  useAssessmentFlowResultQuery,
  useRetryAiReportMutation,
} from '../../hooks/useAssessmentFlow';
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

const formatObjectValue = (val) => {
  if (val === null || val === undefined) return 'Not available';
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
    return String(val);
  }
  if (typeof val === 'object') {
    if (val.text) return String(val.text);
    if (val.description) return String(val.description);
    if (val.summary) return String(val.summary);
    if (val.label) return String(val.label);
    if (val.name) return String(val.name);
    if (val.score !== undefined && Number.isFinite(Number(val.score))) return `${Math.round(Number(val.score))}%`;
    if (val.rank !== undefined) return `Priority ${val.rank}`;
    if (val.value !== undefined) return String(val.value);
  }
  return 'Recorded';
};

export default function AssessmentFlowResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const auth = useAuth();

  const sessionId = searchParams.get('session') || '';
  const stateResult = location.state?.result || null;

  const resultQuery = useAssessmentFlowResultQuery(sessionId, Boolean(sessionId));
  const retryAiMutation = useRetryAiReportMutation(sessionId);

  const [activeLens, setActiveLens] = useState('personality');
  const [shareStatus, setShareStatus] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const payload = resultQuery.data || null;
  const result = payload?.result || stateResult || payload || null;
  const reportStatus = payload?.state?.reportStatus || null;

  const rawTraits = result?.traits || result?.trait_scores || {};
  const traits = normalizeTraits(rawTraits);
  const hasTraits = Object.keys(traits).length > 0;

  const rawCareers = result?.recommendedCareers || result?.career_recommendations || [];
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

  const handleRetryAi = async () => {
    if (!sessionId) return;
    try {
      await retryAiMutation.mutateAsync({ assessmentId: sessionId });
    } catch {
      // Handled by mutation state
    }
  };

  if (resultQuery.isPending && !stateResult) {
    return (
      <ProductShell title="Synthesizing Profile…">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
          <Skeleton height="36px" />
          <Skeleton height="140px" />
          <Skeleton height="280px" />
        </div>
      </ProductShell>
    );
  }

  if (!result && resultQuery.isError) {
    return (
      <ProductShell title="Profile Unavailable">
        <EmptyProductState
          title="Profile Session Unavailable"
          description={resultQuery.error?.message || 'Unable to load your profile session.'}
          action={
            <Button variant="primary" onClick={() => navigate('/assessment/start')}>
              Start New Assessment
            </Button>
          }
        />
      </ProductShell>
    );
  }

  const riasecScores = result?.phaseScores?.riasec || result?.riasec || null;
  const workValues = result?.phaseScores?.workValues || result?.workValues || result?.values || null;
  const careerSignals = result?.phaseScores?.careerSignals || result?.careerSignals || null;

  const validityState = result?.validity || result?.scoreValidity || result?.meta?.scoreValidity || null;
  const rawConfidence = result?.confidence ?? result?.confidence_score ?? result?.meta?.confidence_score ?? null;
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

        {/* Report Status Banners */}
        {reportStatus?.status === 'scoring_required' && (
          <p className="ui-message ui-message--neutral" role="status">
            Scoring is required for this assessment.
          </p>
        )}
        {reportStatus?.status === 'generating' && (
          <p className="ui-message ui-message--info" role="status">
            Preparing your AI summary…
          </p>
        )}
        {reportStatus?.status === 'failed' && (
          <div className="ui-message ui-message--error" role="alert" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>AI narrative could not be generated.</span>
            <Button
              data-testid="retry-ai-report-btn"
              variant="ghost"
              size="sm"
              onClick={handleRetryAi}
              disabled={retryAiMutation.isPending}
            >
              Retry AI Summary
            </Button>
          </div>
        )}

        {/* ── Statement / Overview ── */}
        <section className="profile-primary-statement-section" aria-labelledby="flow-result-title">
          <div className="profile-primary-statement-header">
            <h1 id="flow-result-title" className="profile-primary-title">
              Personality &amp; Career Intelligence Report
            </h1>
            <p className="profile-primary-subtitle">
              Synthesized from adaptive psychometric responses, vocational preferences, and work context.
            </p>
            <span className="profile-timestamp-label">
              Recorded {formatDate(result?.completedAt || result?.createdAt || result?.meta?.generated_at)}
            </span>
          </div>

          <div className="profile-summary-card">
            <p className="profile-summary-text">
              {result?.summary ||
                result?.profile_summary ||
                result?.narrative_summary ||
                'Your responses synthesize into calibrated profile dimensions, vocational affinities, work values, and demonstrated career signals.'}
            </p>
          </div>
        </section>

        {/* ── 3-Zone Evidence & Confidence Summary (Truthful, No Invented Claims) ── */}
        <section aria-labelledby="flow-evidence-title">
          <h2 id="flow-evidence-title" className="visually-hidden">
            Evidence and Confidence Zones
          </h2>
          <div className="evidence-confidence-zones">
            <div className="evidence-zone-card evidence-zone-card--supporting">
              <span className="evidence-zone-card__head">Direct Evidence</span>
              <p className="evidence-zone-card__status">
                {confidencePct !== null ? `${confidencePct}% Confidence` : 'Evidence Recorded'}
              </p>
              <p className="evidence-zone-card__detail">
                {confidencePct !== null
                  ? `Computed from completed item responses and profile context completeness.`
                  : 'Detailed evidence metrics are not available for this record.'}
              </p>
            </div>
            <div className="evidence-zone-card evidence-zone-card--interpretation">
              <span className="evidence-zone-card__head">Scoring Validity</span>
              <p className="evidence-zone-card__status">
                {validityState ? `Status: ${validityState}` : 'Standard Evaluation'}
              </p>
              <p className="evidence-zone-card__detail">
                {result?.meta?.scoreSource
                  ? `Evaluation source: ${result.meta.scoreSource}.`
                  : 'Computed deterministically from structured item responses.'}
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
        <section className="profile-readings-section" aria-labelledby="flow-readings-title">
          <div className="profile-readings-header">
            <div>
              <h2 id="flow-readings-title" className="profile-section-title">
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
          <section aria-labelledby="flow-careers-heading">
            <div style={{ marginBottom: '14px' }}>
              <h2 id="flow-careers-heading" className="profile-section-title">
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
        <section className="dashboard-widget" aria-labelledby="flow-ai-report-title">
          <div className="dashboard-widget__head">
            <div>
              <h2 id="flow-ai-report-title" className="dashboard-widget__title">
                AI Career Intelligence Report
              </h2>
              <p className="dashboard-widget__subtitle">
                {result?.aiReport || result?.ai_analysis
                  ? 'Comprehensive personalized interpretation generated from your data.'
                  : 'Synthesize a detailed natural language breakdown of your strengths and stretch areas.'}
              </p>
            </div>
          </div>
          <div className="dashboard-widget__body">
            {result?.aiReport || result?.ai_analysis ? (
              <div style={{ fontSize: '0.96875rem', lineHeight: 1.6, color: 'var(--ink)', whiteSpace: 'pre-line' }}>
                {result.aiReport || result.ai_analysis}
              </div>
            ) : (
              <p style={{ color: 'var(--secondary)', fontSize: '0.875rem', margin: 0 }}>
                Natural language interpretation of your psychometric profile and career alignment.
              </p>
            )}
          </div>
        </section>

        {/* ── Sticky Career Coach Launcher ── */}
        <button
          type="button"
          data-testid="chatbot-sticky-launcher"
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
