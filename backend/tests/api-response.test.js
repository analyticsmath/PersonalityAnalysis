const test = require('node:test');
const assert = require('node:assert/strict');
const { buildMeta, sendStructuredSuccess, sendStructuredError } = require('../utils/apiResponse');

test('buildMeta honors x-request-id header', () => {
  const req = { headers: { 'x-request-id': 'trace-1' } };
  const meta = buildMeta(req);
  assert.equal(meta.requestId, 'trace-1');
  assert.match(meta.timestamp, /^\d{4}-/);
});

test('buildMeta generates UUID when no request id', () => {
  const a = buildMeta(null);
  const b = buildMeta(null);
  assert.ok(a.requestId);
  assert.ok(b.requestId);
  assert.notEqual(a.requestId, b.requestId);
});

test('sendStructuredSuccess attaches meta', () => {
  const res = {
    statusCode: 0,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
    },
  };

  sendStructuredSuccess(res, {
    status: 200,
    data: { ok: true },
    message: 'OK',
    req: { headers: {} },
  });

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.ok, true);
  assert.ok(res.body.meta?.requestId);
  assert.ok(res.body.meta?.timestamp);
});

test('sendStructuredError attaches error + meta', () => {
  const res = {
    statusCode: 0,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
    },
  };

  sendStructuredError(res, {
    status: 409,
    code: 'ASSESSMENT_STAGE_CONFLICT',
    message: 'bad stage',
    details: { expectedStage: 'X' },
    req: { headers: {} },
  });

  assert.equal(res.statusCode, 409);
  assert.equal(res.body.success, false);
  assert.equal(res.body.error.code, 'ASSESSMENT_STAGE_CONFLICT');
  assert.equal(res.body.error.details.expectedStage, 'X');
  assert.ok(res.body.meta?.requestId);
});
