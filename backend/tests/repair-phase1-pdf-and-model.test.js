const test = require('node:test');
const assert = require('node:assert/strict');
const { generateAssessmentPdfBuffer } = require('../services/assessment/pdf-report.service');
const {
  buildOceanScoresFromResult,
  mapResultToLegacySummary,
} = require('../services/assessment/unified-contracts.service');
const { config } = require('../config/env');

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

const makePhase3Result = (overrides = {}) => ({
  scores: {
    bigFive: {
      openness: { score: 72, source: 'deterministic' },
      conscientiousness: { score: 65, source: 'deterministic' },
      extraversion: { score: 48, source: 'deterministic' },
      agreeableness: { score: 81, source: 'deterministic' },
      emotionalStability: { score: 59, source: 'deterministic' },
    },
  },
  scoreMeta: {
    scoreSource: 'deterministic',
    scoreValidity: 'valid',
    isFinal: true,
    confidence: 0.82,
    scoringVersion: 'phase3-v1',
  },
  personality: { traits: {}, cognitiveScores: {}, archetypes: {} },
  career: { recommendations: [], roadmap: [] },
  analytics: { facetScores: {}, insightHeatmap: [], confidenceBand: 'medium', confidenceGap: 12 },
  cvData: {},
  behavior: { vector: {} },
  ...overrides,
});

// ---------------------------------------------------------------------------
// PDF Report — OCEAN score source
// ---------------------------------------------------------------------------

test('buildOceanScoresFromResult reads scores.bigFive when available', () => {
  const ocean = buildOceanScoresFromResult(makePhase3Result());
  assert.equal(ocean._scoreSource, 'phase3');
  assert.equal(ocean.O, 72);
  assert.equal(ocean.C, 65);
  assert.equal(ocean.E, 48);
  assert.equal(ocean.A, 81);
  assert.equal(ocean.ES, 59);
});

test('PDF buffer shows non-zero OCEAN when scores.bigFive exists', () => {
  const summary = mapResultToLegacySummary(makePhase3Result());
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');
  assert.ok(pdfText.includes('72%'), 'PDF should include 72% for openness');
  assert.ok(pdfText.includes('65%'), 'PDF should include 65% for conscientiousness');
  assert.ok(!pdfText.match(/Openness.*0%/), 'PDF should not show Openness at 0%');
});

test('PDF buffer shows insufficient state when bigFive is absent', () => {
  const emptyResult = {
    scores: {},
    personality: { traits: {}, cognitiveScores: {}, archetypes: {} },
    career: { recommendations: [], roadmap: [] },
    analytics: { facetScores: {}, insightHeatmap: [], confidenceBand: '', confidenceGap: 0 },
    cvData: {},
    behavior: { vector: {} },
  };
  const summary = mapResultToLegacySummary(emptyResult);
  const buffer = generateAssessmentPdfBuffer({ resultSummary: summary });
  const pdfText = buffer.toString('utf8');
  assert.ok(pdfText.includes('Insufficient scored evidence'), 'PDF should display insufficient state message');
});

test('empty object {} is not treated as valid bigFive score source', () => {
  const ocean = buildOceanScoresFromResult({ scores: { bigFive: {} } });
  const nonMeta = Object.keys(ocean).filter((k) => k !== '_scoreSource');
  assert.equal(nonMeta.length, 0, 'Empty bigFive object should produce no score keys');
});

test('buildOceanScoresFromResult falls back to personality.traits when bigFive absent', () => {
  const legacyResult = {
    scores: {},
    personality: { traits: { O: 55, C: 60, E: 45, A: 70, N: 40 } },
  };
  const ocean = buildOceanScoresFromResult(legacyResult);
  assert.equal(ocean._scoreSource, 'legacy_unverified');
  assert.equal(ocean.O, 55);
});

// ---------------------------------------------------------------------------
// mapResultToLegacySummary score consistency
// ---------------------------------------------------------------------------

test('mapResultToLegacySummary includes canonical ocean_scores from Phase 3', () => {
  const summary = mapResultToLegacySummary(makePhase3Result());
  assert.equal(summary.ocean_scores._scoreSource, 'phase3');
  assert.equal(summary.ocean_scores.O, 72);
  assert.ok(summary.scores, 'scores block must be present');
  assert.equal(summary.meta.scoreSource, 'deterministic');
  assert.equal(summary.meta.scoreValidity, 'valid');
});

test('legacy-only result is marked legacy_unverified in meta', () => {
  const result = {
    scores: {},
    personality: { traits: { O: 50, C: 55, E: 45, A: 60, N: 40 } },
    analytics: {},
  };
  const summary = mapResultToLegacySummary(result);
  assert.equal(summary.meta.scoreSource, 'legacy_unverified');
});

test('mapResultToLegacySummary preserves legacy documents without Phase 3 fields', () => {
  const legacy = {
    personality: { traits: { O: 60, C: 70, E: 55, A: 65, N: 45 }, cognitiveScores: {}, archetypes: {} },
    analytics: { confidenceBand: 'medium', confidenceGap: 10 },
    career: { recommendations: [] },
    scores: null,
  };
  const summary = mapResultToLegacySummary(legacy);
  assert.ok(summary.meta, 'meta must exist');
  assert.ok(summary.ocean_scores.O === 60, 'legacy trait O should be preserved');
});

// ---------------------------------------------------------------------------
// OpenAI model config
// ---------------------------------------------------------------------------

test('config.openaiModel never defaults to gpt-4o', () => {
  assert.notEqual(config.openaiModel, 'gpt-4o');
  assert.notEqual(config.openaiModel, 'gpt-4o-mini');
});

test('config.openaiModel defaults to gpt-5 family when env absent', () => {
  assert.ok(
    config.openaiModel.startsWith('gpt-5'),
    `Expected gpt-5 family, got: ${config.openaiModel}`
  );
});

test('config exposes openaiReportModel and openaiCoachModel', () => {
  assert.ok(config.openaiReportModel, 'openaiReportModel must be defined');
  assert.ok(config.openaiCoachModel, 'openaiCoachModel must be defined');
});

test('config.openaiTimeoutMs is at least 30000ms', () => {
  assert.ok(config.openaiTimeoutMs >= 30000, `Timeout too low: ${config.openaiTimeoutMs}`);
});

test('config.openaiMaxOutputTokens is at least 1000 tokens', () => {
  assert.ok(config.openaiMaxOutputTokens >= 1000, `Max tokens too low: ${config.openaiMaxOutputTokens}`);
});
