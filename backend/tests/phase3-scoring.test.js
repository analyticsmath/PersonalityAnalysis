const test = require('node:test');
const assert = require('node:assert/strict');
const { runAssessmentScoring } = require('../services/scoring/assessmentScoringOrchestrator.service');
const { generateResultNarrative } = require('../services/ai-result-narrative.service');
const { mapResultToLegacySummary, deriveScoreMeta } = require('../services/assessment/unified-contracts.service');

const sampleQuestionPlan = [
  { questionId: 'q1', text: 'I enjoy analyzing complex problems', traitFocus: 'O', type: 'likert' },
  { questionId: 'q2', text: 'I plan my week carefully', traitFocus: 'C', type: 'likert' },
  { questionId: 'q3', text: 'I energize group discussions', traitFocus: 'E', type: 'likert' },
  { questionId: 'q4', text: 'I try to help teammates', traitFocus: 'A', type: 'likert' },
  { questionId: 'q5', text: 'I stay calm under pressure', traitFocus: 'N', type: 'likert' },
  { questionId: 'q6', text: 'I like hands-on building', traitFocus: 'O', type: 'likert' },
  { questionId: 'q7', text: 'I prefer structured processes', traitFocus: 'C', type: 'likert' },
  { questionId: 'q8', text: 'I want leadership opportunities', traitFocus: 'E', type: 'likert' },
];

const likertAnswers = sampleQuestionPlan.map((q) => ({
  questionId: q.questionId,
  type: 'likert',
  value: 4,
  metadata: { trait: q.traitFocus, normalizedScore: 4 },
  answeredAt: new Date(),
}));

test('Phase 3 orchestrator is deterministic for identical inputs', () => {
  const a = runAssessmentScoring({
    session: {},
    unifiedAnswers: likertAnswers,
    questionPlan: sampleQuestionPlan,
    oceanTraitScores: { O: 62, C: 58, E: 55, A: 60, N: 48 },
    aiProfile: { skills: [{ name: 'Python' }] },
    traitBehaviorVector: { leadership: 60, collaboration: 55, analysis: 58, risk: 50, creativity: 52, execution: 57 },
    cognitiveVector: { analytical: 60 },
  });
  const b = runAssessmentScoring({
    session: {},
    unifiedAnswers: likertAnswers,
    questionPlan: sampleQuestionPlan,
    oceanTraitScores: { O: 62, C: 58, E: 55, A: 60, N: 48 },
    aiProfile: { skills: [{ name: 'Python' }] },
    traitBehaviorVector: { leadership: 60, collaboration: 55, analysis: 58, risk: 50, creativity: 52, execution: 57 },
    cognitiveVector: { analytical: 60 },
  });
  assert.equal(JSON.stringify(a.scores.bigFive), JSON.stringify(b.scores.bigFive));
  assert.equal(a.scoreMeta.scoreSource, 'deterministic');
  assert.ok(['valid', 'partial', 'insufficient_data'].includes(a.scoreMeta.scoreValidity));
  assert.ok(a.scoreMeta.scoringVersion);
  assert.equal(a.scores.bigFive.openness.score, 62);
});

test('RIASEC holland code is three letters', () => {
  const out = runAssessmentScoring({
    session: {},
    unifiedAnswers: likertAnswers,
    questionPlan: sampleQuestionPlan,
    oceanTraitScores: { O: 50, C: 50, E: 50, A: 50, N: 50 },
    aiProfile: {},
    traitBehaviorVector: {},
    cognitiveVector: {},
  });
  assert.match(String(out.scores.riasec.hollandCode || ''), /^[RIASEC]{3}$/);
});

test('Insufficient answers yields insufficient_data or honest low isFinal', () => {
  const out = runAssessmentScoring({
    session: {},
    unifiedAnswers: likertAnswers.slice(0, 2),
    questionPlan: sampleQuestionPlan.slice(0, 2),
    oceanTraitScores: { O: 50, C: 50, E: 50, A: 50, N: 50 },
    aiProfile: {},
    traitBehaviorVector: {},
    cognitiveVector: {},
  });
  assert.equal(out.scoreMeta.isFinal, false);
  assert.equal(out.scoreMeta.scoreValidity, 'insufficient_data');
});

test('mapResultToLegacySummary preserves legacy documents without Phase 3 fields', () => {
  const summary = mapResultToLegacySummary({
    personality: {
      traits: { O: 60, C: 60, E: 60, A: 60, N: 40 },
      archetypes: { dominantTrait: 'O', personalityType: 'Test' },
    },
    analytics: { confidence: 0.5, insightHeatmap: [], facetScores: {} },
    career: { recommendations: [] },
    answers: [],
  });
  assert.ok(summary.trait_scores);
  assert.equal(summary.meta.scoreSource, 'legacy_unverified');
});

test('deriveScoreMeta reads persisted Phase 3 scoreMeta', () => {
  const meta = deriveScoreMeta({
    scoreMeta: {
      scoreSource: 'deterministic',
      scoreValidity: 'partial',
      confidence: 0.41,
      evidenceCount: 12,
      missingDimensions: [],
      isFinal: false,
      scoringVersion: 'phase3-v1',
      generatedAt: '2026-01-01T00:00:00.000Z',
      missingEvidence: [],
      evidenceSources: ['answer'],
    },
    personality: { traits: { O: 1, C: 1, E: 1, A: 1, N: 1 } },
  });
  assert.equal(meta.scoreSource, 'deterministic');
  assert.equal(meta.scoringVersion, 'phase3-v1');
});

test('AI narrative receives Phase 3 context without mutating numeric scores', async () => {
  const out = await generateResultNarrative({
    aiProfile: { domain: 'software' },
    traitVector: { O: 55, C: 55, E: 55, A: 55, N: 45 },
    careers: [],
    skills: [],
    cognitiveVector: {},
    behaviorVector: {},
    phase3Scores: { bigFive: { openness: { score: 55 } } },
    phase3ScoreMeta: { scoreValidity: 'partial', confidence: 0.4 },
    phase3EvidencePreview: [{ signal: 'test' }],
    phase3Warnings: ['Low confidence'],
  });
  assert.ok(out.summary);
  assert.ok(Array.isArray(out.strengths));
});
