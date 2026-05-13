const { config } = require('../../config/env');
const { logAiAuditEvent } = require('./aiAudit.service');
const { runOpenAiResponses } = require('./aiProvider.service');
const { buildDefaultAiStatus } = require('./aiTypes');
const { AI_PROVIDER, AI_STATUS } = require('./aiTypes');

/**
 * Thin orchestration: provider call + audit + standardized errors.
 * Callers supply domain-specific validation and fallbacks.
 */
const runOrchestratedAiCall = async ({
  promptId,
  promptVersion,
  schemaId,
  buildInput,
  userId = null,
  sessionId = null,
  injectionMeta = null,
  timeoutMs = 55000,
  maxRetries = 1,
} = {}) => {
  const started = Date.now();
  const baseAudit = {
    promptId,
    promptVersion,
    schemaId,
    userId,
    sessionId,
    provider: AI_PROVIDER.OPENAI,
    model: config.openaiModel,
    injectionFlags: injectionMeta?.patterns || [],
  };

  if (!config.openaiApiKey) {
    logAiAuditEvent({
      ...baseAudit,
      provider: AI_PROVIDER.NONE,
      schemaValidated: false,
      safetyChecked: false,
      fallbackUsed: true,
      latencyMs: Date.now() - started,
      errorCode: 'NO_API_KEY',
    });
    return {
      ok: false,
      errorCode: 'NO_API_KEY',
      response: null,
      text: '',
      usage: null,
      model: '',
      latencyMs: Date.now() - started,
    };
  }

  let response;
  let text = '';
  try {
    const input = typeof buildInput === 'function' ? buildInput() : buildInput;
    const out = await runOpenAiResponses({
      input,
      model: config.openaiModel,
      timeoutMs,
      maxRetries,
    });
    response = out.response;
    text = out.text || '';
    const latencyMs = Date.now() - started;
    return {
      ok: true,
      errorCode: null,
      response,
      text,
      usage: response?.usage || null,
      model: response?.model || config.openaiModel,
      latencyMs,
    };
  } catch (err) {
    const latencyMs = Date.now() - started;
    const rawCode = String(err?.status || err?.message || 'AI_ERROR');
    const errMsg = String(err?.message || '').toLowerCase();
    const errType = String(err?.type || err?.error?.type || '').toLowerCase();
    const isModelUnavailable =
      err?.status === 404 ||
      errType.includes('model_not_found') ||
      errMsg.includes('model_not_found') ||
      errMsg.includes('does not exist') ||
      errMsg.includes('no such model') ||
      errMsg.includes('model is not available') ||
      (err?.status === 400 && errMsg.includes('model'));
    const code = isModelUnavailable ? 'OPENAI_MODEL_UNAVAILABLE' : rawCode;
    logAiAuditEvent({
      ...baseAudit,
      schemaValidated: false,
      safetyChecked: false,
      fallbackUsed: true,
      latencyMs,
      errorCode: code,
    });
    return {
      ok: false,
      errorCode: code,
      response: null,
      text,
      usage: null,
      model: config.openaiModel,
      latencyMs,
    };
  }
};

const finalizeAiStatus = ({
  basePromptVersion,
  schemaValidated,
  safetyChecked,
  fallbackUsed,
  errorCode,
  noKey,
  latencyMs = 0,
  model = '',
} = {}) => {
  if (noKey) {
    return buildDefaultAiStatus({
      status: AI_STATUS.SKIPPED,
      provider: AI_PROVIDER.NONE,
      promptVersion: basePromptVersion,
      schemaValidated,
      safetyChecked,
      fallbackUsed,
      errorCode: errorCode || 'NO_API_KEY',
      latencyMs,
      model: model || 'n/a',
    });
  }
  if (fallbackUsed) {
    return buildDefaultAiStatus({
      status: AI_STATUS.FALLBACK,
      provider: AI_PROVIDER.LOCAL_FALLBACK,
      promptVersion: basePromptVersion,
      schemaValidated,
      safetyChecked,
      fallbackUsed: true,
      errorCode,
      latencyMs,
      model: model || config.openaiModel || 'n/a',
    });
  }
  return buildDefaultAiStatus({
    status: AI_STATUS.READY,
    provider: AI_PROVIDER.OPENAI,
    promptVersion: basePromptVersion,
    schemaValidated,
    safetyChecked,
    fallbackUsed: false,
    errorCode: null,
    latencyMs,
    model: model || config.openaiModel || '',
  });
};

module.exports = {
  runOrchestratedAiCall,
  finalizeAiStatus,
};
