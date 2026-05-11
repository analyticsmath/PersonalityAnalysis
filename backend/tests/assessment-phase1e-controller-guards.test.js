const test = require('node:test');
const assert = require('node:assert/strict');

const aiServicePath = require.resolve('../services/aiService');
const resultServicePath = require.resolve('../services/assessmentResultView.service');
const unifiedPath = require.resolve('../services/assessment/unified-contracts.service');

const loadController = ({ scoreMeta, reportState = {}, existingAiReport = null }) => {
  let aiCalls = 0;
  const saveCalls = [];
  const fakeResult = {
    _id: 'r1',
    personality: { traits: { O: 60 } },
    career: { recommendations: [] },
    analytics: { reportState, aiReport: existingAiReport },
    toObject: () => ({}),
    save: async () => { saveCalls.push({ ...fakeResult.analytics }); },
  };

  require.cache[aiServicePath] = { exports: { generatePersonalityReport: async () => { aiCalls += 1; return { summary: 'ok', strengths: [], weaknesses: [], communicationStyle: '', workStyle: '', growthSuggestions: [], careerRecommendations: [], metadata: { model: 'm', promptVersion: '1', generatedAt: new Date().toISOString(), usage: {} }, deterministicInsights: [], staticCareerMatches: [] }; } } };
  require.cache[resultServicePath] = { exports: { getResultByIdForUpdate: async () => fakeResult, normalizeCareerRecommendations: (x) => x, toAiReportMeta: () => ({}), toPublicAiReport: () => ({}), toTraitPayload: () => ({ O: 60 }) } };
  require.cache[unifiedPath] = { exports: { deriveScoreMeta: () => scoreMeta } };
  delete require.cache[require.resolve('../Controllers/aiController')];
  const controller = require('../Controllers/aiController');
  return { controller, getAiCalls: () => aiCalls, fakeResult, saveCalls };
};

const makeReqRes = (body = {}) => {
  const req = { params: { assessmentId: 'a1' }, query: {}, body, headers: {}, user: { id: 'u1' } };
  const res = { statusCode: 200, payload: null, status(code){ this.statusCode=code; return this; }, json(data){ this.payload=data; return this; } };
  let nextErr = null;
  const next = (err) => { nextErr = err; };
  return { req, res, next, getErr: () => nextErr };
};

test('report blocked before scoring and source guards', async () => {
  for (const meta of [
    { scoreValidity: 'insufficient_data', scoreSource: 'deterministic' },
    { scoreValidity: 'valid', scoreSource: 'mock' },
    { scoreValidity: 'valid', scoreSource: 'unknown' },
  ]) {
    const { controller, getAiCalls } = loadController({ scoreMeta: meta });
    const { req, res, next, getErr } = makeReqRes();
    await controller.generateAssessmentAiReport(req, res, next);
    assert.equal(getAiCalls(), 0);
    assert.ok(getErr());
    assert.ok([409, undefined].includes(getErr().statusCode));
    assert.match(String(getErr().message || ''), /SCORING_REQUIRED|INVALID_SCORE_SOURCE/);
  }
});

test('duplicate report generation with same idempotency key is suppressed', async () => {
  const { controller, getAiCalls } = loadController({
    scoreMeta: { scoreValidity: 'valid', scoreSource: 'deterministic' },
    reportState: { lastActionId: 'dup-1', generating: true },
  });
  const { req, res, next, getErr } = makeReqRes({ idempotencyKey: 'dup-1' });
  await controller.generateAssessmentAiReport(req, res, next);
  assert.equal(getErr(), null);
  assert.equal(getAiCalls(), 0);
  assert.equal(res.payload?.message, 'Duplicate report action ignored');
});
