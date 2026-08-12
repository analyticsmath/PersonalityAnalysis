/**
 * Shared AI orchestration types (plain objects; no runtime dependency).
 */

const AI_STATUS = {
  READY: 'ready',
  GENERATING: 'generating',
  FAILED: 'failed',
  FALLBACK: 'fallback',
  SKIPPED: 'skipped',
};

const AI_PROVIDER = {
  GROQ: 'groq',
  OPENAI: 'openai',
  LOCAL_FALLBACK: 'local_fallback',
  NONE: 'none',
};

const buildDefaultAiStatus = ({
  status = AI_STATUS.SKIPPED,
  provider = AI_PROVIDER.NONE,
  promptVersion = '',
  schemaValidated = false,
  safetyChecked = false,
  fallbackUsed = false,
  errorCode = null,
  latencyMs = 0,
  model = '',
} = {}) => ({
  status,
  provider,
  promptVersion: String(promptVersion || ''),
  schemaValidated: Boolean(schemaValidated),
  safetyChecked: Boolean(safetyChecked),
  fallbackUsed: Boolean(fallbackUsed),
  errorCode: errorCode == null ? null : String(errorCode),
  latencyMs: Number.isFinite(Number(latencyMs)) ? Math.max(0, Math.round(Number(latencyMs))) : 0,
  model: String(model || ''),
});

module.exports = {
  AI_STATUS,
  AI_PROVIDER,
  buildDefaultAiStatus,
};
