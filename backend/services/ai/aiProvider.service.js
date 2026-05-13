const { config } = require('../../config/env');
const { getOpenAiClient } = require('../assessment/openaiClient');
const { createHttpError } = require('../../utils/httpError');
const { extractOutputText } = require('../assessment/aiJson');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const isRetryableError = (err) => {
  const code = String(err?.code || err?.cause?.code || '');
  const status = Number(err?.status || err?.response?.status || 0);
  if (status === 429 || status >= 500) return true;
  if (/ECONNRESET|ETIMEDOUT|EAI_AGAIN|ENETUNREACH|fetch failed/i.test(String(err?.message || err))) {
    return true;
  }
  if (/abort|timeout/i.test(String(err?.message || ''))) return true;
  return code === 'ETIMEDOUT';
};

const withTimeout = async (promise, ms) => {
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(createHttpError(504, 'AI provider timeout')), ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer);
  }
};

/**
 * OpenAI Responses API wrapper with timeout and limited retry.
 */
const runOpenAiResponses = async ({
  input,
  model,
  temperature = 0.3,
  max_output_tokens = config.openaiMaxOutputTokens || 1800,
  timeoutMs = config.openaiTimeoutMs || 55000,
  maxRetries = 1,
} = {}) => {
  if (!config.openaiApiKey) {
    throw createHttpError(503, 'OPENAI_API_KEY missing');
  }

  const client = getOpenAiClient();
  let attempt = 0;
  let lastErr;
  while (attempt <= maxRetries) {
    try {
      const response = await withTimeout(
        client.responses.create({
          model: model || config.openaiModel,
          input,
          temperature,
          max_output_tokens,
        }),
        timeoutMs
      );
      return { response, text: extractOutputText(response) };
    } catch (err) {
      lastErr = err;
      if (attempt < maxRetries && isRetryableError(err)) {
        attempt += 1;
        await sleep(400 * attempt);
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
};

module.exports = {
  runOpenAiResponses,
  withTimeout,
  isRetryableError,
};
