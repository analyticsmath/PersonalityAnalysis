const { parseJsonFromText } = require('../assessment/aiJson');
const {
  validateReportNarrative,
  validateCareerCoachStructured,
  validateCvEnhancement,
  validateAdaptiveQuestionBlock,
} = require('./aiSchemas');

const tryParseObject = (text) => {
  try {
    return parseJsonFromText(text, 'invalid_json');
  } catch {
    return null;
  }
};

/**
 * Attempt primary parse, then a single "repair" pass via slice re-parse.
 */
const parseWithRepair = (text) => {
  const first = tryParseObject(text);
  if (first && typeof first === 'object') {
    return { value: first, repaired: false };
  }
  const normalized = String(text || '')
    .replace(/^[\s\S]*?(\{)/m, '$1')
    .replace(/(\})[\s\S]*$/m, '$1');
  const second = tryParseObject(normalized);
  if (second && typeof second === 'object') {
    return { value: second, repaired: true };
  }
  return { value: null, repaired: false };
};

const validateReportWithRepair = (text) => {
  const { value, repaired } = parseWithRepair(text);
  if (!value) {
    return { ok: false, repaired, result: validateReportNarrative(null) };
  }
  const result = validateReportNarrative(value);
  return { ok: result.ok, repaired, result };
};

const validateCoachWithRepair = (text) => {
  const { value, repaired } = parseWithRepair(text);
  if (!value) {
    return { ok: false, repaired, result: validateCareerCoachStructured(null) };
  }
  const result = validateCareerCoachStructured(value);
  return { ok: result.ok, repaired, result };
};

const validateCvEnhancementWithRepair = (text) => {
  const { value, repaired } = parseWithRepair(text);
  if (!value) {
    return { ok: false, repaired, result: validateCvEnhancement(null) };
  }
  const result = validateCvEnhancement(value);
  return { ok: result.ok, repaired, result };
};

const validateAdaptiveQuestionsWithRepair = (text) => {
  const { value, repaired } = parseWithRepair(text);
  if (!value) {
    return { ok: false, repaired, result: validateAdaptiveQuestionBlock(null) };
  }
  const result = validateAdaptiveQuestionBlock(value);
  return { ok: result.ok, repaired, result };
};

module.exports = {
  parseWithRepair,
  validateReportWithRepair,
  validateCoachWithRepair,
  validateCvEnhancementWithRepair,
  validateAdaptiveQuestionsWithRepair,
};
