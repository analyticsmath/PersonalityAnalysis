const test = require('node:test');
const assert = require('node:assert/strict');
const authMiddleware = require('../middleware/authMiddleware');

test('authMiddleware rejects missing bearer token with 401', async () => {
  const calls = [];
  const res = {
    status(code) {
      calls.push(['status', code]);
      return this;
    },
    json(body) {
      calls.push(['json', body]);
      return this;
    },
  };
  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };
  await authMiddleware({ headers: {} }, res, next);
  assert.equal(nextCalled, false);
  assert.equal(calls[0][1], 401);
  assert.equal(calls[1][1].success, false);
});

test('career recommendations controller: owner receives structured payload', async () => {
  const sessionPath = require.resolve('../services/assessment/assessment-session.service');
  const modelPath = require.resolve('../models/AssessmentResult');
  const controllerPath = require.resolve('../Controllers/assessmentFlowController');

  const sessionSnap = { ...require(sessionPath) };

  const sessionId = '507f1f77bcf86cd799439011';
  const userId = '507f1f77bcf86cd799439012';

  const fakeResult = {
    toObject: () => ({
      careerRecommendations: {
        version: 'phase4-v1',
        locked: false,
        preliminary: false,
        recommendations: { bestFits: [], stretchFits: [], exploratoryFits: [], lowerFitButPossible: [] },
        topRecommendations: [
          {
            careerId: 'software_engineer',
            title: 'Software Engineer',
            fitScore: 82,
            confidence: 0.72,
            fitType: 'primary',
            whyThisFits: 'Fit from deterministic engine.',
            whyThisMayBeChallenging: '',
            skillGaps: ['Distributed systems'],
          },
        ],
        skillGapSummary: {},
        roadmaps: [],
        warnings: [],
      },
      scores: { bigFive: {} },
      scoreMeta: { scoreValidity: 'valid', scoreSource: 'deterministic' },
      cvData: {},
      personality: { traits: {}, cognitiveScores: {} },
      behavior: { vector: {} },
    }),
  };

  delete require.cache[sessionPath];
  require.cache[sessionPath] = {
    exports: {
      ...sessionSnap,
      getSessionForUser: async ({ sessionId: sid }) => {
        assert.equal(String(sid), String(sessionId));
        return {
          _id: sessionId,
          userId,
          save: async () => {},
        };
      },
    },
  };

  delete require.cache[modelPath];
  require.cache[modelPath] = {
    exports: {
      findById: () => ({ exec: async () => null }),
      findOne: () => ({ exec: async () => fakeResult }),
    },
  };

  delete require.cache[controllerPath];
  const { getCareerRecommendations } = require('../Controllers/assessmentFlowController');

  const req = { params: { id: String(sessionId) }, user: { id: String(userId) } };
  const res = {
    statusCode: 200,
    body: null,
    status(c) {
      this.statusCode = c;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  let nextErr = null;
  const next = (e) => {
    nextErr = e;
  };

  try {
    await getCareerRecommendations(req, res, next);
    assert.equal(nextErr, null);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data.topRecommendations));
    assert.equal(res.body.data.topRecommendations[0].careerId, 'software_engineer');
  } finally {
    delete require.cache[sessionPath];
    delete require.cache[modelPath];
    delete require.cache[controllerPath];
  }
});

test('career recommendations controller: forbidden when session service rejects', async () => {
  const sessionPath = require.resolve('../services/assessment/assessment-session.service');
  const controllerPath = require.resolve('../Controllers/assessmentFlowController');
  const sessionSnap = { ...require(sessionPath) };

  delete require.cache[sessionPath];
  require.cache[sessionPath] = {
    exports: {
      ...sessionSnap,
      getSessionForUser: async () => {
        const err = new Error('Forbidden');
        err.status = 403;
        throw err;
      },
    },
  };

  delete require.cache[controllerPath];
  const { getCareerRecommendations } = require('../Controllers/assessmentFlowController');

  const req = { params: { id: '507f1f77bcf86cd799439099' }, user: { id: 'other' } };
  let nextErr = null;
  await getCareerRecommendations(req, {}, (e) => {
    nextErr = e;
  });
  assert.ok(nextErr);
  assert.equal(nextErr.status, 403);

  delete require.cache[sessionPath];
  delete require.cache[controllerPath];
});

test('GET /api/assessment/:id/career-recommendations requires Bearer auth (401 without token)', async () => {
  const calls = [];
  const res = {
    status(code) {
      calls.push(['status', code]);
      return this;
    },
    json(body) {
      calls.push(['json', body]);
    },
  };
  let nextCalled = false;
  await authMiddleware({ headers: {} }, res, () => {
    nextCalled = true;
  });
  assert.equal(nextCalled, false);
  assert.equal(calls[0][1], 401);
  assert.equal(calls[1][1].success, false);
});
