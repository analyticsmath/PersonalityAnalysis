const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');

const sessionServicePath = require.resolve('../services/assessment/assessment-session.service');
const questionQueuePath = require.resolve('../services/assessment/question-queue.service');
const assessmentResultPath = require.resolve('../services/assessment/assessment-result.service');
const assessmentSessionModelPath = require.resolve('../models/AssessmentSession');
const assessmentFlowControllerPath = require.resolve('../Controllers/assessmentFlowController');

const restoreSessionService = () => {
  delete require.cache[sessionServicePath];
  require(sessionServicePath);
};

const restoreQuestionQueue = () => {
  delete require.cache[questionQueuePath];
  require(questionQueuePath);
};

const restoreAssessmentResult = () => {
  delete require.cache[assessmentResultPath];
  require(assessmentResultPath);
};

const restoreAssessmentSessionModel = () => {
  delete require.cache[assessmentSessionModelPath];
  try {
    mongoose.deleteModel('AssessmentSession');
  } catch {
    /* model may not be registered when tests used a stub module */
  }
  require(assessmentSessionModelPath);
};

const restoreAssessmentFlowController = () => {
  delete require.cache[assessmentFlowControllerPath];
  require(assessmentFlowControllerPath);
};

const makeQuestionPlan = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: `q${index}`,
    questionId: `q${index}`,
    type: 'likert',
    text: `Question ${index}`,
    trait: 'O',
    category: 'personality',
    stage: 'personality',
    difficulty: 'medium',
    answerFormat: 'rating',
    scoringType: 'numeric',
    options: [],
  }));

const makeQuestionnaireSession = () => {
  const session = {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    stage: 'questionnaire',
    status: 'in_progress',
    currentQuestionIndex: 0,
    answers: [],
    answersJson: [],
    questionPlan: makeQuestionPlan(28),
    adaptiveMetrics: {},
    askedQuestions: [],
    usedIntents: [],
    behaviorPrompts: [],
    currentBehaviorIndex: 0,
    profileVector: {},
    progressEvents: [],
    lastEventId: 0,
    cvData: {},
    saveCalls: 0,
    async save() {
      this.saveCalls += 1;
    },
  };
  return session;
};

const loadControllerWithSessionAndQueueMocks = (session) => {
  const savedSessionExports = require(sessionServicePath);
  const savedQueueExports = require(questionQueuePath);
  let scoringCalls = 0;

  delete require.cache[questionQueuePath];
  require.cache[questionQueuePath] = {
    exports: {
      ...savedQueueExports,
      enqueueRemainingQuestions: () => {},
      isQuestionGenerationPending: () => false,
      setQuestionGenerationStatus: () => {},
    },
  };

  delete require.cache[assessmentResultPath];
  require.cache[assessmentResultPath] = {
    exports: {
      generateAssessmentResult: async () => {
        scoringCalls += 1;
        throw new Error('generateAssessmentResult should not run in this test');
      },
    },
  };

  delete require.cache[sessionServicePath];
  require.cache[sessionServicePath] = {
    exports: {
      ...savedSessionExports,
      getSessionForUser: async () => session,
    },
  };

  delete require.cache[assessmentFlowControllerPath];
  const controller = require(assessmentFlowControllerPath);

  return { controller, getScoringCalls: () => scoringCalls };
};

const makeReqRes = (paramsId, body = {}, user = { id: 'u1' }) => {
  const req = { params: { id: paramsId }, body, user };
  const res = {
    statusCode: 200,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.payload = data;
      return this;
    },
  };
  let nextErr = null;
  const next = (err) => {
    nextErr = err;
  };
  return { req, res, next, getErr: () => nextErr };
};

test('duplicate adaptive answer with same idempotency key is a safe no-op after first persist', async () => {
  const session = makeQuestionnaireSession();
  const sessionId = String(session._id);
  const idempotencyKey = 'client-action-dup-1';

  const { controller, getScoringCalls } = loadControllerWithSessionAndQueueMocks(session);

  const baseBody = {
    expectedStage: 'ASSESSMENT_IN_PROGRESS',
    idempotencyKey,
    questionId: 'q0',
    questionSequence: 1,
    currentQuestion: { id: 'q0', questionId: 'q0', sequence: 1 },
    type: 'likert',
    value: 4,
    answer: { value: 4, normalizedScore: 4 },
  };

  try {
    const first = makeReqRes(sessionId, baseBody);
    await controller.answerAdaptiveQuestion(first.req, first.res, first.next);
    assert.equal(first.getErr(), null);
    assert.equal(first.res.payload?.data?.duplicateActionIgnored, undefined);
    assert.equal(session.answers.length, 1);
    assert.equal(session.adaptiveMetrics?.lastIdempotencyKey, idempotencyKey);
    assert.equal(getScoringCalls(), 0);

    const savesAfterFirst = session.saveCalls;

    const second = makeReqRes(sessionId, baseBody);
    await controller.answerAdaptiveQuestion(second.req, second.res, second.next);
    assert.equal(second.getErr(), null);
    assert.equal(second.res.payload?.data?.duplicateActionIgnored, true);
    assert.equal(second.res.payload?.message, 'Duplicate action ignored');
    assert.equal(session.answers.length, 1);
    assert.equal(session.saveCalls, savesAfterFirst);
    assert.equal(getScoringCalls(), 0);
  } finally {
    restoreQuestionQueue();
    restoreAssessmentResult();
    restoreSessionService();
    restoreAssessmentFlowController();
  }
});

test('wrong-stage adaptive answer returns conflict and does not persist answers', async () => {
  const session = makeQuestionnaireSession();
  const sessionId = String(session._id);

  const { controller } = loadControllerWithSessionAndQueueMocks(session);

  try {
    const { req, res, next, getErr } = makeReqRes(sessionId, {
      expectedStage: 'COMPLETED',
      idempotencyKey: 'wrong-stage-1',
      questionId: 'q0',
      questionSequence: 1,
      currentQuestion: { id: 'q0', questionId: 'q0', sequence: 1 },
      type: 'likert',
      value: 4,
      answer: { value: 4, normalizedScore: 4 },
    });
    await controller.answerAdaptiveQuestion(req, res, next);
    assert.ok(getErr());
    assert.equal(getErr().status, 409);
    assert.match(String(getErr().message || ''), /ASSESSMENT_STAGE_CONFLICT/);
    assert.equal(session.answers.length, 0);
    assert.equal(session.saveCalls, 0);
  } finally {
    restoreQuestionQueue();
    restoreAssessmentResult();
    restoreSessionService();
    restoreAssessmentFlowController();
  }
});

test('getSessionForUser rejects access when session belongs to another user', async () => {
  const ownerId = new mongoose.Types.ObjectId();
  const otherId = new mongoose.Types.ObjectId();
  const sessionId = new mongoose.Types.ObjectId();

  delete require.cache[assessmentSessionModelPath];
  require.cache[assessmentSessionModelPath] = {
    exports: {
      findById: () => ({
        exec: async () => ({
          _id: sessionId,
          userId: ownerId,
          save: async () => {},
        }),
      }),
    },
  };

  try {
    restoreSessionService();
    const { getSessionForUser } = require(sessionServicePath);

    await assert.rejects(
      () =>
        getSessionForUser({
          sessionId: String(sessionId),
          user: { id: String(otherId) },
        }),
      (err) => err.status === 403
    );
  } finally {
    restoreAssessmentSessionModel();
    restoreSessionService();
  }
});

test('getActiveInProgressSession scopes lookup to the requesting user id', async () => {
  const userId = new mongoose.Types.ObjectId();
  let capturedFilter = null;

  delete require.cache[assessmentSessionModelPath];
  require.cache[assessmentSessionModelPath] = {
    exports: {
      findOne: (filter) => {
        capturedFilter = filter;
        return {
          sort: () => ({
            exec: async () => null,
          }),
        };
      },
    },
  };

  try {
    restoreSessionService();
    const { getActiveInProgressSession } = require(sessionServicePath);
    await getActiveInProgressSession({ userId: String(userId) });
    assert.ok(capturedFilter);
    assert.equal(String(capturedFilter.userId), String(userId));
    assert.equal(capturedFilter.status, 'in_progress');
  } finally {
    restoreAssessmentSessionModel();
    restoreSessionService();
  }
});

test('getActiveFlowSession exposes normalized state for the authenticated user only', async () => {
  const userId = new mongoose.Types.ObjectId();
  const session = makeQuestionnaireSession();
  session.userId = userId;
  session.answers = [
    {
      questionId: 'q0',
      type: 'likert',
      value: 4,
      metadata: { trait: 'O' },
      answeredAt: new Date(),
    },
  ];
  session.currentQuestionIndex = 1;

  const savedSessionExports = require(sessionServicePath);

  delete require.cache[sessionServicePath];
  require.cache[sessionServicePath] = {
    exports: {
      ...savedSessionExports,
      getActiveInProgressSession: async ({ userId: incoming }) => {
        assert.equal(String(incoming), String(userId));
        return session;
      },
    },
  };

  delete require.cache[assessmentFlowControllerPath];
  const { getActiveFlowSession } = require(assessmentFlowControllerPath);

  try {
    const res = {
      payload: null,
      status() {
        return this;
      },
      json(data) {
        this.payload = data;
      },
    };
    const req = { user: { id: String(userId) } };
    await getActiveFlowSession(req, res, () => {});

    const state = res.payload?.data?.state;
    assert.ok(state);
    assert.ok(state.stage);
    assert.ok(Array.isArray(state.allowedActions));
    assert.ok(state.scoreStatus);
    assert.ok(state.reportStatus);
    assert.equal(String(res.payload?.data?.session?.sessionId || ''), String(session._id));
  } finally {
    restoreSessionService();
    restoreAssessmentFlowController();
  }
});
