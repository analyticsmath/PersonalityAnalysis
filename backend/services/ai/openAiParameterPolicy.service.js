/**
 * OpenAI parameter policy for reasoning/o-series and GPT-5.x models.
 *
 * These models do not accept temperature, top_p, presence_penalty,
 * frequency_penalty, logprobs, or top_logprobs. Passing them causes a 400.
 * All call sites must route through sanitizeOpenAiParams before calling
 * client.responses.create or client.chat.completions.create.
 */

/** Matches gpt-5*, o1*, o3*, o4* model IDs (case-insensitive). */
const REASONING_PATTERN = /^(o1|o3|o4|gpt-5)/i;

/**
 * Returns true when the model ID belongs to the reasoning / o-series family
 * that does not accept inference-time sampling parameters.
 *
 * @param {string} model
 * @returns {boolean}
 */
const isReasoningModel = (model) => REASONING_PATTERN.test(String(model || ''));

/** Parameters that are forbidden for reasoning models. */
const STRIP_FOR_REASONING = new Set([
  'temperature',
  'top_p',
  'presence_penalty',
  'frequency_penalty',
  'logprobs',
  'top_logprobs',
  'n',
]);

/**
 * Returns a clean copy of `params` with forbidden keys removed when the model
 * is a reasoning model.  For non-reasoning models the params are returned
 * unchanged (shallow copy).
 *
 * @param {string} model
 * @param {Record<string, unknown>} params
 * @returns {Record<string, unknown>}
 */
const sanitizeOpenAiParams = (model, params) => {
  const clean = { ...params };
  if (isReasoningModel(model)) {
    for (const key of STRIP_FOR_REASONING) {
      delete clean[key];
    }
  }
  return clean;
};

module.exports = { isReasoningModel, sanitizeOpenAiParams };
