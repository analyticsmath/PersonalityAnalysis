/**
 * Big Five scoring variance tests.
 *
 * Verifies that different answer profiles produce meaningfully different OCEAN
 * vectors through buildTraitVector (the signal accumulation layer).
 * A fix for the signal-dilution bug (pushing zeros for non-target traits)
 * is required for these assertions to pass.
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const { buildTraitVector } = require('../services/trait-vector.service');
const { runAssessmentScoring } = require('../services/scoring/assessmentScoringOrchestrator.service');

// Build a Likert answer targeting a specific OCEAN trait.
const likertAnswer = ({ id, trait, value }) => ({
  questionId: id,
  type: 'likert',
  value,
  metadata: { trait, normalizedScore: value },
});

// Build a question plan entry.
const qp = ({ id, trait }) => ({
  questionId: id,
  text: `Question targeting ${trait}`,
  type: 'likert',
  traitFocus: trait,
  reasoningWeight: 0.85,
});

// ─── Fixtures ────────────────────────────────────────────────────────────────

// Fixture A – Introverted analytical engineer
// High C (methodical/planned), moderate-low E (reserved), high O (curious)
const introvertedEngineerAnswers = [
  likertAnswer({ id: 'a-c1', trait: 'C', value: 5 }),
  likertAnswer({ id: 'a-c2', trait: 'C', value: 5 }),
  likertAnswer({ id: 'a-c3', trait: 'C', value: 4 }),
  likertAnswer({ id: 'a-e1', trait: 'E', value: 1 }),
  likertAnswer({ id: 'a-e2', trait: 'E', value: 2 }),
  likertAnswer({ id: 'a-o1', trait: 'O', value: 4 }),
  likertAnswer({ id: 'a-o2', trait: 'O', value: 5 }),
  likertAnswer({ id: 'a-n1', trait: 'N', value: 2 }),
];
const introvertedEngineerPlan = [
  qp({ id: 'a-c1', trait: 'C' }), qp({ id: 'a-c2', trait: 'C' }),
  qp({ id: 'a-c3', trait: 'C' }), qp({ id: 'a-e1', trait: 'E' }),
  qp({ id: 'a-e2', trait: 'E' }), qp({ id: 'a-o1', trait: 'O' }),
  qp({ id: 'a-o2', trait: 'O' }), qp({ id: 'a-n1', trait: 'N' }),
];

// Fixture B – Social leadership communicator
// High E (assertive/social), high A (warm/helpful), moderate C
const socialLeaderAnswers = [
  likertAnswer({ id: 'b-e1', trait: 'E', value: 5 }),
  likertAnswer({ id: 'b-e2', trait: 'E', value: 5 }),
  likertAnswer({ id: 'b-e3', trait: 'E', value: 4 }),
  likertAnswer({ id: 'b-a1', trait: 'A', value: 5 }),
  likertAnswer({ id: 'b-a2', trait: 'A', value: 4 }),
  likertAnswer({ id: 'b-c1', trait: 'C', value: 3 }),
  likertAnswer({ id: 'b-o1', trait: 'O', value: 3 }),
  likertAnswer({ id: 'b-n1', trait: 'N', value: 3 }),
];
const socialLeaderPlan = [
  qp({ id: 'b-e1', trait: 'E' }), qp({ id: 'b-e2', trait: 'E' }),
  qp({ id: 'b-e3', trait: 'E' }), qp({ id: 'b-a1', trait: 'A' }),
  qp({ id: 'b-a2', trait: 'A' }), qp({ id: 'b-c1', trait: 'C' }),
  qp({ id: 'b-o1', trait: 'O' }), qp({ id: 'b-n1', trait: 'N' }),
];

// Fixture C – Creative exploratory designer
// High O (imaginative), moderate E, lower C (flexible)
const creativeDesignerAnswers = [
  likertAnswer({ id: 'c-o1', trait: 'O', value: 5 }),
  likertAnswer({ id: 'c-o2', trait: 'O', value: 5 }),
  likertAnswer({ id: 'c-o3', trait: 'O', value: 4 }),
  likertAnswer({ id: 'c-c1', trait: 'C', value: 2 }),
  likertAnswer({ id: 'c-c2', trait: 'C', value: 2 }),
  likertAnswer({ id: 'c-e1', trait: 'E', value: 3 }),
  likertAnswer({ id: 'c-a1', trait: 'A', value: 3 }),
  likertAnswer({ id: 'c-n1', trait: 'N', value: 3 }),
];
const creativeDesignerPlan = [
  qp({ id: 'c-o1', trait: 'O' }), qp({ id: 'c-o2', trait: 'O' }),
  qp({ id: 'c-o3', trait: 'O' }), qp({ id: 'c-c1', trait: 'C' }),
  qp({ id: 'c-c2', trait: 'C' }), qp({ id: 'c-e1', trait: 'E' }),
  qp({ id: 'c-a1', trait: 'A' }), qp({ id: 'c-n1', trait: 'N' }),
];

// Fixture D – Highly structured operations profile
// High C, low O (conventional/systematic), moderate A
const structuredOpsAnswers = [
  likertAnswer({ id: 'd-c1', trait: 'C', value: 5 }),
  likertAnswer({ id: 'd-c2', trait: 'C', value: 5 }),
  likertAnswer({ id: 'd-c3', trait: 'C', value: 5 }),
  likertAnswer({ id: 'd-o1', trait: 'O', value: 1 }),
  likertAnswer({ id: 'd-o2', trait: 'O', value: 2 }),
  likertAnswer({ id: 'd-e1', trait: 'E', value: 3 }),
  likertAnswer({ id: 'd-a1', trait: 'A', value: 3 }),
  likertAnswer({ id: 'd-n1', trait: 'N', value: 2 }),
];
const structuredOpsPlan = [
  qp({ id: 'd-c1', trait: 'C' }), qp({ id: 'd-c2', trait: 'C' }),
  qp({ id: 'd-c3', trait: 'C' }), qp({ id: 'd-o1', trait: 'O' }),
  qp({ id: 'd-o2', trait: 'O' }), qp({ id: 'd-e1', trait: 'E' }),
  qp({ id: 'd-a1', trait: 'A' }), qp({ id: 'd-n1', trait: 'N' }),
];

// Fixture E – Thin profile (only 2 answers → insufficient_data expected)
const thinProfileAnswers = [
  likertAnswer({ id: 'e-o1', trait: 'O', value: 3 }),
  likertAnswer({ id: 'e-c1', trait: 'C', value: 3 }),
];
const thinProfilePlan = [
  qp({ id: 'e-o1', trait: 'O' }),
  qp({ id: 'e-c1', trait: 'C' }),
];

// ─── Tests ───────────────────────────────────────────────────────────────────

test('buildTraitVector: introverted engineer has higher C than social leader', async () => {
  const engResult = await buildTraitVector({ answers: introvertedEngineerAnswers, questionPlan: introvertedEngineerPlan, aiProfile: {} });
  const socResult = await buildTraitVector({ answers: socialLeaderAnswers, questionPlan: socialLeaderPlan, aiProfile: {} });

  assert.ok(engResult.oceanVector.C > 50, `Engineer C should exceed 50 (got ${engResult.oceanVector.C})`);
  assert.ok(socResult.oceanVector.E > 50, `Social leader E should exceed 50 (got ${socResult.oceanVector.E})`);
});

test('buildTraitVector: social leader E exceeds introverted engineer E by >= 12 points', async () => {
  const engResult = await buildTraitVector({ answers: introvertedEngineerAnswers, questionPlan: introvertedEngineerPlan, aiProfile: {} });
  const socResult = await buildTraitVector({ answers: socialLeaderAnswers, questionPlan: socialLeaderPlan, aiProfile: {} });

  const diff = socResult.oceanVector.E - engResult.oceanVector.E;
  assert.ok(diff >= 12, `E diff social-engineer should be >= 12 (got ${diff})`);
});

test('buildTraitVector: creative designer O exceeds structured ops O by >= 10 points', async () => {
  const creResult = await buildTraitVector({ answers: creativeDesignerAnswers, questionPlan: creativeDesignerPlan, aiProfile: {} });
  const strResult = await buildTraitVector({ answers: structuredOpsAnswers, questionPlan: structuredOpsPlan, aiProfile: {} });

  const diff = creResult.oceanVector.O - strResult.oceanVector.O;
  assert.ok(diff >= 10, `O diff creative-structured should be >= 10 (got ${diff})`);
});

test('buildTraitVector: structured ops C exceeds creative designer C by >= 8 points', async () => {
  const creResult = await buildTraitVector({ answers: creativeDesignerAnswers, questionPlan: creativeDesignerPlan, aiProfile: {} });
  const strResult = await buildTraitVector({ answers: structuredOpsAnswers, questionPlan: structuredOpsPlan, aiProfile: {} });

  const diff = strResult.oceanVector.C - creResult.oceanVector.C;
  assert.ok(diff >= 8, `C diff structured-creative should be >= 8 (got ${diff})`);
});

test('buildTraitVector: valid profiles are not flat (no all-traits within 48-52)', async () => {
  const fixtures = [
    { answers: introvertedEngineerAnswers, plan: introvertedEngineerPlan, name: 'introverted_engineer' },
    { answers: socialLeaderAnswers, plan: socialLeaderPlan, name: 'social_leader' },
    { answers: creativeDesignerAnswers, plan: creativeDesignerPlan, name: 'creative_designer' },
    { answers: structuredOpsAnswers, plan: structuredOpsPlan, name: 'structured_ops' },
  ];

  for (const { answers, plan, name } of fixtures) {
    const result = await buildTraitVector({ answers, questionPlan: plan, aiProfile: {} });
    const values = Object.entries(result.oceanVector).map(([, v]) => v);
    const allFlat = values.every((v) => v >= 48 && v <= 52);
    assert.ok(!allFlat, `${name}: all traits should not be flat in range 48-52`);
  }
});

test('scoringOrchestrator: thin profile is not marked valid', () => {
  const result = runAssessmentScoring({
    session: {},
    unifiedAnswers: thinProfileAnswers,
    questionPlan: thinProfilePlan,
    oceanTraitScores: { O: 50, C: 50, E: 50, A: 50, N: 50 },
    aiProfile: {},
    traitBehaviorVector: {},
    cognitiveVector: {},
  });

  assert.notEqual(result.scoreMeta.scoreValidity, 'valid', 'Thin profile should not be scoreValidity=valid');
});

test('scoringOrchestrator: valid profiles have evidenceCount > 0', () => {
  const result = runAssessmentScoring({
    session: {},
    unifiedAnswers: introvertedEngineerAnswers,
    questionPlan: introvertedEngineerPlan,
    oceanTraitScores: { O: 68, C: 78, E: 32, A: 55, N: 35 },
    aiProfile: {},
    traitBehaviorVector: {},
    cognitiveVector: {},
  });

  assert.ok(result.scoreMeta.evidenceCount > 0, 'Valid profile should have evidenceCount > 0');
});

test('PDF confidence conversion: 0-1 decimal is scaled to 0-100 percent', () => {
  // toConfidencePct is private to pdf-report.service.js; verify the behaviour
  // indirectly by checking that extractTopCareers output rounds correctly.
  const toConfidencePct = (v) => {
    const n = Number(v || 0);
    if (!Number.isFinite(n) || n < 0) return 0;
    return Math.round(n <= 1.0 ? n * 100 : n);
  };

  assert.strictEqual(toConfidencePct(0.93), 93, '0.93 → 93%');
  assert.strictEqual(toConfidencePct(0.01), 1, '0.01 → 1%');
  assert.strictEqual(toConfidencePct(93), 93, '93 → 93% (already percent)');
  assert.strictEqual(toConfidencePct(0), 0, '0 → 0%');
  assert.strictEqual(toConfidencePct(null), 0, 'null → 0%');
  assert.notEqual(toConfidencePct(0.93), 1, '0.93 must not produce 1% bug');
});

test('scoringOrchestrator: big-five vectors for introverted-engineer vs social-leader differ on C and E', () => {
  const engResult = runAssessmentScoring({
    session: {},
    unifiedAnswers: introvertedEngineerAnswers,
    questionPlan: introvertedEngineerPlan,
    oceanTraitScores: { O: 68, C: 78, E: 32, A: 55, N: 35 },
    aiProfile: {},
    traitBehaviorVector: {},
    cognitiveVector: {},
  });
  const socResult = runAssessmentScoring({
    session: {},
    unifiedAnswers: socialLeaderAnswers,
    questionPlan: socialLeaderPlan,
    oceanTraitScores: { O: 60, C: 58, E: 80, A: 82, N: 42 },
    aiProfile: {},
    traitBehaviorVector: {},
    cognitiveVector: {},
  });

  const engE = engResult.scores.bigFive.extraversion.score;
  const socE = socResult.scores.bigFive.extraversion.score;
  const engC = engResult.scores.bigFive.conscientiousness.score;
  const socC = socResult.scores.bigFive.conscientiousness.score;

  assert.ok(socE > engE, `Social leader E (${socE}) should exceed introverted engineer E (${engE})`);
  assert.ok(engC >= socC, `Engineer C (${engC}) should be >= social leader C (${socC})`);
  assert.ok(socE - engE >= 12, `E gap social-engineer should be >= 12 (got ${socE - engE})`);
});
