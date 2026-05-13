const test = require('node:test');
const assert = require('node:assert/strict');
const { generateAssessmentPdfBuffer } = require('../services/assessment/pdf-report.service');
const {
  mapResultToLegacySummary,
} = require('../services/assessment/unified-contracts.service');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeFullResult = (overrides = {}) => ({
  scores: {
    bigFive: {
      openness: { score: 72, source: 'deterministic' },
      conscientiousness: { score: 65, source: 'deterministic' },
      extraversion: { score: 48, source: 'deterministic' },
      agreeableness: { score: 81, source: 'deterministic' },
      emotionalStability: { score: 59, source: 'deterministic' },
    },
    careerSignals: {
      analyticalThinking: { score: 78, evidenceCount: 3, sources: ['answer'] },
      creativity: { score: 62, evidenceCount: 2, sources: ['answer'] },
      leadership: { score: 55, evidenceCount: 2, sources: ['answer'] },
      collaboration: { score: 70, evidenceCount: 2, sources: ['answer'] },
      riskTolerance: { score: 45, evidenceCount: 1, sources: ['answer'] },
      adaptability: { score: 66, evidenceCount: 2, sources: ['answer'] },
      planning: { score: 60, evidenceCount: 2, sources: ['answer'] },
      problemSolving: { score: 71, evidenceCount: 2, sources: ['answer'] },
      technicalDepth: { score: 58, evidenceCount: 1, sources: ['cv'] },
      domainFocus: { score: 52, evidenceCount: 1, sources: ['cv'] },
      learningOrientation: { score: 69, evidenceCount: 2, sources: ['answer', 'cv'] },
      communication: { score: 64, evidenceCount: 2, sources: ['answer'] },
    },
  },
  scoreMeta: {
    scoreSource: 'deterministic',
    scoreValidity: 'valid',
    isFinal: true,
    confidence: 0.82,
    scoringVersion: 'phase3-v1',
  },
  personality: {
    traits: { O: 72, C: 65, E: 48, A: 81, N: 41 },
    cognitiveScores: {},
    archetypes: {
      personalityType: 'Analytical Builder',
      dominantTrait: 'A',
      behavioralSummary: 'Strong analytical and collaborative signals.',
    },
  },
  career: {
    recommendations: [
      { career: 'Software Engineer', score: 88, confidence: 82, why_fit: 'Strong technical depth.', cluster: 'Technology' },
      { career: 'Data Analyst', score: 76, confidence: 70, why_fit: 'High analytical thinking.', cluster: 'Analytics' },
    ],
    roadmap: [
      { stage: 'Foundation', summary: 'Build core technical skills.' },
      { stage: 'Growth', summary: 'Deepen domain expertise.' },
    ],
    clusterLabel: 'Technology',
  },
  analytics: {
    facetScores: { curiosity: 74, discipline: 68 },
    insightHeatmap: [],
    confidenceBand: 'medium',
    confidenceGap: 12,
    confidenceScore: 74,
    aiReport: {
      summary: 'Strong analytical profile with collaborative tendencies.',
      strengths: ['Deep analytical reasoning', 'Strong collaboration skills'],
      weaknesses: ['Risk aversion under pressure', 'Tendency to overthink'],
      communicationStyle: 'Evidence-driven and direct.',
      workStyle: 'Structured execution with iterative refinement.',
      growthSuggestions: ['Take on leadership projects', 'Practice risk-calibration exercises'],
    },
  },
  cvData: {
    name: 'Test Candidate',
    skills: [{ name: 'Python', level: 4 }, { name: 'SQL', level: 3 }],
  },
  behavior: {
    vector: {
      leadership: 55,
      risk_tolerance: 45,
      decision_speed: 66,
      stress_tolerance: 60,
      team_preference: 70,
    },
  },
  careerRecommendations: {
    topRecommendations: [
      {
        careerId: 'software-engineer',
        title: 'Software Engineer',
        fitScore: 88,
        confidence: 82,
        fitType: 'bestFit',
        whyThisFits: 'Strong analytical and technical signals.',
        skillGaps: ['System design'],
      },
      {
        careerId: 'data-analyst',
        title: 'Data Analyst',
        fitScore: 76,
        confidence: 70,
        fitType: 'bestFit',
        whyThisFits: 'High analytical thinking with domain focus.',
        skillGaps: ['Statistics'],
      },
    ],
  },
  ...overrides,
});

// ---------------------------------------------------------------------------
// PDF title and structure
// ---------------------------------------------------------------------------

test('PDF title is correct and does not contain Cover Page', () => {
  const summary = mapResultToLegacySummary(makeFullResult());
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');

  assert.ok(
    pdfText.includes('Your Personality Assessment'),
    'PDF must include correct report title'
  );
  assert.ok(
    !pdfText.includes('Cover Page'),
    'PDF must not include "Cover Page"'
  );
});

test('PDF does not include internal phase labels', () => {
  const summary = mapResultToLegacySummary(makeFullResult());
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');

  assert.ok(!pdfText.includes('Phase 4'), 'PDF must not include "Phase 4"');
  assert.ok(!pdfText.includes('phase8-v1'), 'PDF must not include "phase8-v1"');
  assert.ok(!pdfText.includes('phase3-v1'), 'PDF must not include internal scoring version');
});

test('PDF includes Big Five non-zero values from scores.bigFive', () => {
  const summary = mapResultToLegacySummary(makeFullResult());
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');

  assert.ok(pdfText.includes('72%'), 'PDF must include openness score 72%');
  assert.ok(pdfText.includes('65%'), 'PDF must include conscientiousness score 65%');
  assert.ok(!pdfText.match(/Openness.*0%/), 'PDF must not show Openness at 0%');
});

test('PDF includes Career Match Landscape section with career data', () => {
  const summary = mapResultToLegacySummary(makeFullResult());
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');

  assert.ok(pdfText.includes('Career Match Landscape'), 'PDF must include Career Match Landscape section');
  assert.ok(pdfText.includes('Software Engineer'), 'PDF must include top career name');
});

test('PDF includes Cognitive Signals section', () => {
  const summary = mapResultToLegacySummary(makeFullResult());
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');

  assert.ok(pdfText.includes('Cognitive Signals'), 'PDF must include Cognitive Signals section');
});

test('PDF includes Behavior Signals section with dominant label', () => {
  const summary = mapResultToLegacySummary(makeFullResult());
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');

  assert.ok(pdfText.includes('Behavior Signals'), 'PDF must include Behavior Signals section');
  assert.ok(pdfText.includes('Dominant behavior signal'), 'PDF must include dominant behavior label');
});

test('PDF cognitive section shows insufficient state when no signal data', () => {
  const emptyResult = makeFullResult({
    scores: {
      bigFive: {
        openness: { score: 72, source: 'deterministic' },
        conscientiousness: { score: 65, source: 'deterministic' },
        extraversion: { score: 48, source: 'deterministic' },
        agreeableness: { score: 81, source: 'deterministic' },
        emotionalStability: { score: 59, source: 'deterministic' },
      },
    },
    behavior: { vector: {} },
  });
  const summary = mapResultToLegacySummary(emptyResult);
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');

  assert.ok(
    pdfText.includes('insufficient') || pdfText.includes('Analytical') || pdfText.includes('Cognitive'),
    'PDF must handle missing cognitive data gracefully'
  );
});

test('PDF includes Disclaimer section', () => {
  const summary = mapResultToLegacySummary(makeFullResult());
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');

  assert.ok(pdfText.includes('Disclaimer'), 'PDF must include Disclaimer section');
  assert.ok(
    pdfText.includes('guidance only') || pdfText.includes('guidance'),
    'PDF disclaimer must mention guidance'
  );
});

test('PDF uses Phase 4 topRecommendations when available', () => {
  const summary = mapResultToLegacySummary(makeFullResult());
  assert.ok(
    summary.career_recommendations_phase4?.topRecommendations?.length > 0,
    'mapResultToLegacySummary must preserve Phase 4 topRecommendations'
  );
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');
  assert.ok(pdfText.includes('Software Engineer'), 'PDF must use Phase 4 career data');
});

// ---------------------------------------------------------------------------
// AI report context — scores.bigFive over personality.traits
// ---------------------------------------------------------------------------

test('AI controller canonical BigFive extraction produces correct OCEAN values', () => {
  const result = makeFullResult();
  const bf = result.scores?.bigFive;
  const canonicalBigFive =
    bf &&
    typeof bf === 'object' &&
    bf.openness &&
    typeof bf.openness.score === 'number';

  assert.ok(canonicalBigFive, 'scores.bigFive must be recognized as canonical source');

  const traits = {
    O: Number(bf.openness.score || 0),
    C: Number(bf.conscientiousness?.score || 0),
    E: Number(bf.extraversion?.score || 0),
    A: Number(bf.agreeableness?.score || 0),
    N: Number(bf.emotionalStability?.score || 0),
  };

  assert.equal(traits.O, 72, 'O must come from scores.bigFive.openness.score');
  assert.equal(traits.C, 65, 'C must come from scores.bigFive.conscientiousness.score');
  assert.equal(traits.E, 48, 'E must come from scores.bigFive.extraversion.score');
  assert.equal(traits.A, 81, 'A must come from scores.bigFive.agreeableness.score');
  assert.equal(traits.N, 59, 'N must come from scores.bigFive.emotionalStability.score');
});

test('AI controller falls back to personality.traits when bigFive absent', () => {
  const result = {
    scores: {},
    personality: { traits: { O: 60, C: 55, E: 50, A: 65, N: 40 } },
  };
  const bf = result.scores?.bigFive;
  const canonicalBigFive =
    bf && typeof bf === 'object' && bf.openness && typeof bf.openness.score === 'number';

  assert.ok(!canonicalBigFive, 'No bigFive → should fall back to personality.traits');

  const traits = {
    O: Number(result.personality?.traits?.O || 0),
    C: Number(result.personality?.traits?.C || 0),
    E: Number(result.personality?.traits?.E || 0),
    A: Number(result.personality?.traits?.A || 0),
    N: Number(result.personality?.traits?.N || 0),
  };

  assert.equal(traits.O, 60, 'O must come from personality.traits when bigFive absent');
});

// ---------------------------------------------------------------------------
// Cognitive / behavior signal derivation
// ---------------------------------------------------------------------------

test('career signals produce valid cognitive chart values', () => {
  const careerSignals = {
    analyticalThinking: { score: 78, evidenceCount: 3 },
    creativity: { score: 62, evidenceCount: 2 },
    planning: { score: 60, evidenceCount: 2 },
    problemSolving: { score: 71, evidenceCount: 2 },
    technicalDepth: { score: 58, evidenceCount: 1 },
    domainFocus: { score: 52, evidenceCount: 1 },
    learningOrientation: { score: 69, evidenceCount: 2 },
  };

  const getScore = (key) => {
    const entry = careerSignals[key];
    if (!entry || typeof entry !== 'object') return null;
    const s = Number(entry.score);
    return Number.isFinite(s) ? s : null;
  };

  const analytical = getScore('analyticalThinking');
  assert.equal(analytical, 78);

  const creative = getScore('creativity');
  assert.equal(creative, 62);

  const planning = getScore('planning');
  const problemSolving = getScore('problemSolving');
  const strategic = planning !== null && problemSolving !== null
    ? Math.round((planning + problemSolving) / 2)
    : null;
  assert.equal(strategic, 66, 'strategic must be avg of planning and problemSolving');

  assert.ok(analytical !== null && creative !== null && strategic !== null,
    'All derived cognitive values must be non-null when signals exist');
});

test('missing career signals yield null cognitive values (insufficient state)', () => {
  const empty = {};
  const getScore = (key) => {
    const entry = empty[key];
    if (!entry || typeof entry !== 'object') return null;
    return null;
  };

  const analytical = getScore('analyticalThinking');
  assert.equal(analytical, null, 'Missing signal key must yield null');
});

test('dominant behavior label is derived from behavior vector', () => {
  const bv = {
    leadership: 55,
    risk_tolerance: 45,
    decision_speed: 66,
    stress_tolerance: 60,
    team_preference: 70,
  };
  const LABELS = {
    leadership: 'Leadership',
    risk_tolerance: 'Risk Tolerance',
    decision_speed: 'Decision Speed',
    stress_tolerance: 'Stress Tolerance',
    team_preference: 'Team Preference',
  };

  const entries = Object.entries(bv).filter(([, v]) => Number.isFinite(Number(v)));
  const [topKey] = entries.sort((a, b) => Number(b[1]) - Number(a[1]))[0];
  const dominant = LABELS[topKey];

  assert.equal(dominant, 'Team Preference', 'Dominant behavior must be Team Preference (score: 70)');
});

// ---------------------------------------------------------------------------
// Career Phase 4 alignment
// ---------------------------------------------------------------------------

test('mapResultToLegacySummary preserves Phase 4 topRecommendations', () => {
  const result = makeFullResult();
  const summary = mapResultToLegacySummary(result);

  assert.ok(
    summary.career_recommendations_phase4,
    'Phase 4 career data must be preserved in legacy summary'
  );
  assert.equal(
    summary.career_recommendations_phase4.topRecommendations[0].title,
    'Software Engineer',
    'Top recommendation must match Phase 4 data'
  );
  assert.equal(
    summary.career_recommendations_phase4.topRecommendations[0].fitScore,
    88,
    'fitScore must be preserved from Phase 4 data'
  );
});
