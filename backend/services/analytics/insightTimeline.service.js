const AssessmentResult = require('../../models/AssessmentResult');
const CareerRoadmapProgress = require('../../models/CareerRoadmapProgress');
const { deriveScoreMeta } = require('../assessment/unified-contracts.service');
const { assertReadableUserId } = require('./assessmentHistory.service');

const push = (events, entry) => {
  events.push(entry);
};

const getInsightTimelineForUser = async ({ requester, userId }) => {
  assertReadableUserId({ requester, targetUserId: userId });

  const results = await AssessmentResult.find({ userId })
    .sort({ createdAt: -1 })
    .limit(40)
    .select(
      '_id analytics careerRecommendations completedAt createdAt updatedAt scoreMeta legacyAssessmentId cvData'
    )
    .lean();

  const events = [];

  const progressRows = await CareerRoadmapProgress.find({ userId })
    .sort({ updatedAt: -1 })
    .limit(20)
    .lean();

  results.forEach((doc) => {
    const sm = deriveScoreMeta(doc);
    const resultId = String(doc._id);
    const at = doc.completedAt || doc.createdAt;

    if (doc.completedAt) {
      push(events, {
        type: 'assessment_completed',
        date: at,
        title: 'Assessment completed',
        description:
          sm.scoreValidity === 'valid'
            ? 'Valid scoring profile generated.'
            : `Scoring completed with status: ${sm.scoreValidity}.`,
        severity: sm.scoreValidity === 'valid' ? 'info' : 'warning',
        resultId,
      });
    }

    const ai = doc.analytics?.aiReport;
    if (ai && (String(ai.summary || '').trim() || ai.generatedAt)) {
      push(events, {
        type: 'report_generated',
        date: ai.generatedAt || doc.updatedAt || at,
        title: 'Report generated',
        description: 'AI or narrative report payload is present on this result.',
        severity: 'info',
        resultId,
      });
    }

    const st = ai?.aiStatus;
    if (st && (st.fallbackUsed === true || String(st.mode || '').includes('fallback'))) {
      push(events, {
        type: 'ai_fallback_used',
        date: ai.generatedAt || at,
        title: 'AI fallback used',
        description: 'A deterministic or local fallback path was used for this report.',
        severity: 'warning',
        resultId,
      });
    }

    const cr = doc.careerRecommendations;
    if (cr && typeof cr === 'object' && Array.isArray(cr.topRecommendations) && cr.topRecommendations.length) {
      push(events, {
        type: 'career_recommendations_generated',
        date: cr.generatedAt || at,
        title: 'Career recommendations generated',
        description: 'Deterministic career intelligence attached to this assessment.',
        severity: cr.preliminary ? 'warning' : 'info',
        resultId,
      });
    }

    const conf = Number(sm.confidence ?? doc.analytics?.confidence ?? 0);
    if (conf > 0 && conf < 0.35) {
      push(events, {
        type: 'low_confidence_warning',
        date: at,
        title: 'Low confidence signal',
        description: 'Overall model confidence for this result is low; interpret cautiously.',
        severity: 'warning',
        resultId,
      });
    }

    if (String(sm.scoreSource) === 'legacy_unverified' || doc.legacyAssessmentId) {
      push(events, {
        type: 'legacy_result',
        date: at,
        title: 'Legacy or unverified scoring path',
        description: 'This result predates verified Phase 3 scoring metadata.',
        severity: 'warning',
        resultId,
      });
    }
  });

  progressRows.forEach((row) => {
    const n = Array.isArray(row.completedActionKeys) ? row.completedActionKeys.length : 0;
    if (!n) return;
    push(events, {
      type: 'roadmap_action_completed',
      date: row.updatedAt || new Date(),
      title: 'Roadmap progress updated',
      description: `${n} roadmap action(s) marked complete for a target role.`,
      severity: 'info',
      resultId: String(row.resultId),
    });
  });

  const cv = results.find((r) => r.cvData && (r.cvData.skills?.length || r.cvData.name));
  if (cv && (cv.cvData?.skills?.length || cv.cvData?.name)) {
    push(events, {
      type: 'cv_present',
      date: cv.createdAt,
      title: 'CV or profile signals present',
      description: 'Structured CV-derived fields exist on a stored result.',
      severity: 'info',
      resultId: String(cv._id),
    });
  }

  events.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { events };
};

module.exports = {
  getInsightTimelineForUser,
};
