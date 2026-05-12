/**
 * Map backend / client error messages to stable codes when present in payload.
 * Axios interceptor often surfaces only `message`; callers may pass raw Error.
 */
export const ERROR_CODES = Object.freeze({
  ASSESSMENT_STAGE_CONFLICT: 'ASSESSMENT_STAGE_CONFLICT',
  SCORING_REQUIRED: 'SCORING_REQUIRED',
  INVALID_SCORE_SOURCE: 'INVALID_SCORE_SOURCE',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  AI_TIMEOUT: 'AI_TIMEOUT',
  REPORT_GENERATION_FAILED: 'REPORT_GENERATION_FAILED',
});

const tryParseJson = (value) => {
  if (!value || typeof value !== 'string') {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

/**
 * @param {unknown} error - typically Error from axios wrapper or thrown string
 * @returns {{ code: string | null, message: string, raw: unknown }}
 */
export const parseApiError = (error) => {
  const message = error instanceof Error ? error.message : String(error || '');
  const parsed = tryParseJson(message);
  const code = parsed?.code || null;
  return { code, message, raw: error, details: parsed && typeof parsed === 'object' ? parsed : null };
};

export const isStageConflictError = (error) =>
  parseApiError(error).code === ERROR_CODES.ASSESSMENT_STAGE_CONFLICT ||
  /ASSESSMENT_STAGE_CONFLICT/i.test(parseApiError(error).message);
