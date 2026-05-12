import React, { useMemo, useState } from 'react';
import Card from '../ui/Card';
import CareerRecommendationCard from './CareerRecommendationCard';
import CareerFitBreakdown from './CareerFitBreakdown';
import SkillGapPanel from './SkillGapPanel';
import CareerRoadmapTimeline from './CareerRoadmapTimeline';
import CareerComparisonTable from './CareerComparisonTable';

const flattenBuckets = (rec) => {
  if (!rec || typeof rec !== 'object') return [];
  return [
    ...(rec.bestFits || []).map((r) => ({ ...r, fitType: r.fitType || 'bestFit' })),
    ...(rec.stretchFits || []).map((r) => ({ ...r, fitType: r.fitType || 'stretchFit' })),
    ...(rec.exploratoryFits || []).map((r) => ({ ...r, fitType: r.fitType || 'exploratoryFit' })),
    ...(rec.lowerFitButPossible || []).map((r) => ({ ...r, fitType: r.fitType || 'lowerFitButPossible' })),
  ];
};

const CareerExplorerPanel = ({ payload = null }) => {
  const [selectedId, setSelectedId] = useState('');

  const locked = Boolean(payload?.locked);
  const preliminary = Boolean(payload?.preliminary);
  const rec = payload?.recommendations || {};
  const flat = useMemo(() => flattenBuckets(rec), [rec]);
  const top = useMemo(() => (Array.isArray(payload?.topRecommendations) ? payload.topRecommendations : []), [payload]);
  const selected =
    top.find((r) => r.careerId === selectedId) || top[0] || flat[0] || null;
  const roadmap =
    (payload?.roadmaps || []).find((r) => r.careerId === (selected?.careerId || ''))?.timeline ||
    selected?.roadmap?.timeline ||
    [];

  if (!payload) {
    return (
      <Card animated={false} title="Career Explorer">
        <p className="empty-state">No career intelligence payload was loaded.</p>
      </Card>
    );
  }

  if (locked) {
    return (
      <Card animated={false} title="Career Explorer" subtitle="Insufficient or invalid score data">
        <p className="ui-message ui-message--error" role="status">
          Career recommendations are unavailable because score validity is insufficient or invalid. Complete the
          assessment with reliable answers to unlock structured guidance.
        </p>
      </Card>
    );
  }

  return (
    <div className="career-explorer-panel" data-testid="career-explorer-panel">
      <p className="ui-message ui-message--neutral">
        Career recommendations are guidance based on your assessment, CV signals, and stated preferences. They are
        not final career decisions or hiring judgments.
      </p>
      {preliminary ? (
        <p className="ui-message ui-message--neutral" role="status">
          Career recommendations are preliminary because the assessment evidence is limited.
        </p>
      ) : null}

      <Card animated={false} title="Grouped recommendations" subtitle="Best, stretch, exploratory, and development paths">
        <div className="career-explorer-panel__groups">
          {['bestFits', 'stretchFits', 'exploratoryFits', 'lowerFitButPossible'].map((key) => (
            <div key={key} data-group={key}>
              <h4>{key}</h4>
              <ul>
                {(rec[key] || []).slice(0, 6).map((item) => (
                  <li key={item.careerId}>
                    {item.title} ({Math.round(item.fitScore || 0)})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card animated={false} title="Select a career" subtitle="Inspect fit, gaps, and roadmap">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {top.map((item) => (
            <button
              type="button"
              key={item.careerId}
              className={item.careerId === selected?.careerId ? 'is-active' : ''}
              onClick={() => setSelectedId(item.careerId)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </Card>

      {selected ? (
        <>
          <CareerRecommendationCard
            title={selected.title}
            fitScore={selected.fitScore}
            confidence={selected.confidence}
            preliminary={preliminary}
            fitType={selected.fitType}
            whyThisFits={selected.whyThisFits}
            skillGaps={selected.skillGaps}
          />
          <Card animated={false} title="Fit breakdown" subtitle="Deterministic component scores (0–100)">
            <CareerFitBreakdown fitBreakdown={selected.fitBreakdown} />
          </Card>
          <Card animated={false} title="Skill gaps" subtitle="Matched vs missing vs recommended">
            <SkillGapPanel skillGaps={selected.skillGaps} />
          </Card>
        </>
      ) : null}

      <Card animated={false} title="Roadmap timeline" subtitle="0–30 days through longer horizons">
        <CareerRoadmapTimeline timeline={roadmap} />
      </Card>

      <Card animated={false} title="Compare careers" subtitle="Top structured matches">
        <CareerComparisonTable rows={top} />
      </Card>

      {Array.isArray(payload.warnings) && payload.warnings.length ? (
        <Card animated={false} title="Warnings">
          <ul>
            {payload.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  );
};

export default CareerExplorerPanel;
