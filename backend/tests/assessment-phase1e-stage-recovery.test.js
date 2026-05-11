const test = require('node:test');
const assert = require('node:assert/strict');

const { __test__ } = require('../Controllers/assessmentFlowController');
const { toSessionState } = require('../services/assessment/assessment-state-machine.service');

test('wrong-stage answer returns conflict via expected stage guard', () => {
  assert.throws(() => __test__.ensureExpectedStage({ expectedStage: 'COMPLETED', sessionStage: 'questionnaire' }), (error) => {
    assert.ok([409, undefined].includes(error.statusCode));
    assert.match(error.message, /ASSESSMENT_STAGE_CONFLICT/);
    return true;
  });
});

test('active recovery normalized state includes required fields', () => {
  const state = toSessionState({
    session: { stage: 'questionnaire', totalQuestions: 12, answersCount: 5 },
    scoreStatus: { hasValidScores: false, scoreSource: 'unknown', confidence: null },
    reportStatus: { status: 'unavailable', available: false },
  });
  assert.ok(state.stage);
  assert.ok(Array.isArray(state.allowedActions));
  assert.ok(state.progress);
  assert.ok(state.scoreStatus);
  assert.ok(state.reportStatus);
});
