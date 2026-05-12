const test = require('node:test');
const assert = require('node:assert/strict');
const { listCareers, CAREER_TAXONOMY_COUNT } = require('../services/career/careerTaxonomy.service');
const { runCareerRecommendationOrchestrator } = require('../services/career/careerRecommendationOrchestrator.service');
const { analyzeSkillGap } = require('../services/career/skillGap.service');
const { buildCareerRoadmap } = require('../services/career/careerRoadmap.service');
const { computeCareerFit } = require('../services/career/careerMatching.service');
const { runAssessmentScoring } = require('../services/scoring/assessmentScoringOrchestrator.service');
const { buildDeterministicCareerOutput } = require('../services/assessment/career-recommendation.service');
const { mapResultToLegacySummary } = require('../services/assessment/unified-contracts.service');
const { generateResultNarrative } = require('../services/ai-result-narrative.service');

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

test('taxonomy has at least 30 careers with required fields', () => {
  assert.ok(CAREER_TAXONOMY_COUNT >= 30);
  const careers = listCareers();
  assert.equal(careers.length, CAREER_TAXONOMY_COUNT);
  careers.forEach((c) => {
    assert.ok(c.careerId);
    assert.ok(c.title);
    assert.ok(c.riasecProfile);
    assert.ok(c.workValues);
    assert.ok(Array.isArray(c.requiredSkills) && c.requiredSkills.length > 0);
  });
});

test('skill gap synonym maps js to JavaScript and matches case-insensitive', () => {
  const software = listCareers().find((c) => c.careerId === 'software_engineer');
  assert.ok(software);
  const gap = analyzeSkillGap({
    career: software,
    cvSkillNames: ['js', 'GIT'],
    profileSkills: [],
    careerSignalsUser: { technicalDepth: 70, problemSolving: 70 },
  });
  assert.ok(gap.matchedSkills.length >= 1);
  assert.ok(gap.matchedSkills.some((s) => /javascript/i.test(s)));
});

test('roadmap includes deterministic stages and references skills', () => {
  const software = listCareers().find((c) => c.careerId === 'software_engineer');
  const gap = analyzeSkillGap({
    career: software,
    cvSkillNames: [],
    profileSkills: [],
    careerSignalsUser: {},
  });
  const rm = buildCareerRoadmap({ career: software, skillGap: gap });
  const labels = (rm.timeline || []).map((t) => t.stage);
  assert.ok(labels.some((s) => String(s).includes('30')));
  assert.ok(labels.some((s) => String(s).includes('3')));
});

test('orchestrator marks preliminary for insufficient_data and still returns buckets', () => {
  const scoringOutput = runAssessmentScoring({
    session: {},
    unifiedAnswers: likertAnswers.slice(0, 2),
    questionPlan: sampleQuestionPlan.slice(0, 2),
    oceanTraitScores: { O: 50, C: 50, E: 50, A: 50, N: 50 },
    aiProfile: {},
    traitBehaviorVector: {},
    cognitiveVector: {},
  });
  assert.equal(scoringOutput.scoreMeta.scoreValidity, 'insufficient_data');
  const out = runCareerRecommendationOrchestrator({
    scoringOutput,
    cvData: { skills: [{ name: 'Python' }] },
    aiProfile: { domain: 'software' },
    userProfile: { skills: ['SQL'] },
  });
  assert.equal(out.preliminary, true);
  assert.equal(out.locked, false);
  const sum =
    (out.recommendations.bestFits?.length || 0) +
    (out.recommendations.stretchFits?.length || 0) +
    (out.recommendations.exploratoryFits?.length || 0) +
    (out.recommendations.lowerFitButPossible?.length || 0);
  assert.ok(sum > 0);
});

test('orchestrator locks on invalid score meta without ranked recommendations', () => {
  const out = runCareerRecommendationOrchestrator({
    scoringOutput: {
      scores: {},
      scoreMeta: { scoreValidity: 'invalid' },
      warnings: [],
    },
  });
  assert.equal(out.locked, true);
  assert.equal(out.topRecommendations.length, 0);
});

test('deterministic career output uses orchestrator when scoring present', () => {
  const scoringOutput = runAssessmentScoring({
    session: {},
    unifiedAnswers: likertAnswers,
    questionPlan: sampleQuestionPlan,
    oceanTraitScores: { O: 62, C: 58, E: 55, A: 60, N: 48 },
    aiProfile: { domain: 'software', skills: [{ name: 'JavaScript' }] },
    traitBehaviorVector: { leadership: 60, collaboration: 55, analysis: 58, risk: 50, creativity: 52, execution: 57 },
    cognitiveVector: { analytical: 60 },
  });
  const out = buildDeterministicCareerOutput({
    cvData: { skills: [{ name: 'JavaScript' }] },
    aiProfile: { domain: 'software' },
    cognitiveScores: {},
    scoringOutput,
    userProfile: {},
  });
  assert.ok(out.careerIntelligence);
  assert.ok(Array.isArray(out.recommendations));
  if (!out.careerIntelligence.locked) {
    assert.ok(out.recommendations[0].career);
    assert.ok(Number.isFinite(Number(out.recommendations[0].score)));
  }
});

test('mapResultToLegacySummary exposes career_recommendations_phase4', () => {
  const summary = mapResultToLegacySummary({
    personality: {
      traits: { O: 60, C: 60, E: 60, A: 60, N: 40 },
      archetypes: { dominantTrait: 'O', personalityType: 'Test' },
    },
    analytics: { confidence: 0.5, insightHeatmap: [], facetScores: {} },
    career: { recommendations: [] },
    answers: [],
    careerRecommendations: { version: 'phase4-v1', locked: false, preliminary: true, recommendations: {} },
  });
  assert.equal(summary.career_recommendations_phase4.version, 'phase4-v1');
});

test('AI narrative accepts Phase 4 career intelligence without throwing', async () => {
  const out = await generateResultNarrative({
    aiProfile: { domain: 'software' },
    traitVector: { O: 55, C: 55, E: 55, A: 55, N: 45 },
    careers: [{ career: 'Software Engineer', score: 80 }],
    skills: [],
    cognitiveVector: {},
    behaviorVector: {},
    phase3Scores: { bigFive: { openness: { score: 55 } } },
    phase3ScoreMeta: { scoreValidity: 'partial', confidence: 0.4 },
    phase3EvidencePreview: [],
    phase3Warnings: [],
    phase4CareerIntelligence: {
      careerProfileVersion: 'phase4-v1',
      locked: false,
      preliminary: true,
      topRecommendations: [{ careerId: 'x', title: 'Y', fitScore: 70, confidence: 0.5, fitType: 'exploratoryFit' }],
    },
  });
  assert.ok(out.summary);
});

test('high investigative RIASEC user gets relatively strong fit for data-heavy careers', () => {
  const careers = listCareers();
  const dataSci = careers.find((c) => c.careerId === 'data_scientist');
  const scores = {
    riasec: {
      dimensions: {
        realistic: { score: 40 },
        investigative: { score: 92 },
        artistic: { score: 45 },
        social: { score: 40 },
        enterprising: { score: 50 },
        conventional: { score: 55 },
      },
    },
    bigFive: {
      openness: { score: 80 },
      conscientiousness: { score: 75 },
      extraversion: { score: 45 },
      agreeableness: { score: 55 },
      emotionalStability: { score: 60 },
    },
    workValues: Object.fromEntries(
      Object.entries(dataSci.workValues).map(([key, value]) => [key, { score: value }])
    ),
    careerSignals: Object.fromEntries(
      Object.entries(dataSci.careerSignals || {}).map(([key, value]) => [key, { score: value }])
    ),
  };
  const flatSignals = Object.fromEntries(
    Object.entries(scores.careerSignals || {}).map(([k, v]) => [k, Number(v?.score ?? v ?? 0)])
  );
  const gap = analyzeSkillGap({
    career: dataSci,
    cvSkillNames: ['Python', 'Machine Learning'],
    profileSkills: [],
    careerSignalsUser: flatSignals,
  });
  const fit = computeCareerFit({
    career: dataSci,
    scores,
    skillReadinessScore: gap.skillReadinessScore,
    cvEducation: ['MS Statistics'],
    aiDomain: 'data science',
    hasCv: true,
    scoreMeta: { scoreValidity: 'valid', isFinal: true },
  });
  assert.ok(fit.fitScore >= 65);
});
