import { describe, it, expect } from 'vitest';
import { parseApiError, isStageConflictError, ERROR_CODES } from './apiError';

describe('apiError', () => {
  it('parses JSON message bodies for code', () => {
    const err = new Error(JSON.stringify({ code: 'ASSESSMENT_STAGE_CONFLICT', foo: 1 }));
    const parsed = parseApiError(err);
    expect(parsed.code).toBe(ERROR_CODES.ASSESSMENT_STAGE_CONFLICT);
  });

  it('detects stage conflict from message substring', () => {
    expect(isStageConflictError(new Error('ASSESSMENT_STAGE_CONFLICT'))).toBe(true);
  });
});
