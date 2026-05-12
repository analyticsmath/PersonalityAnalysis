/**
 * Deterministic safety checks for user input and model output.
 * OpenAI Moderation can be wired later; tests use this local layer only.
 */

const SELF_HARM = /\b(kill\s+myself|suicide|end\s+my\s+life|self[- ]harm)\b/i;
const CRISIS = /\b(can't\s+go\s+on|cannot\s+go\s+on|want\s+to\s+die)\b/i;
const CLINICAL = /\b(diagnos(e|is)|dsm[-\s]?5|you\s+have\s+adhd|bipolar\s+disorder|clinical\s+depression)\b/i;
const HIRING_AUTH = /\b(you\s+(are\s+)?(hired|fired)|we\s+reject\s+you|guaranteed\s+job\s+offer)\b/i;
const PROTECTED_CLASS = /\b(because\s+of\s+your\s+(race|gender|religion|age|disability))\b/i;
const ILLEGAL_ADVICE = /\b(how\s+to\s+(make|build)\s+a\s+bomb|synthesize\s+meth)\b/i;

const scanOutputForSafetyFlags = (text = '') => {
  const t = String(text || '');
  const flags = [];
  if (SELF_HARM.test(t) || CRISIS.test(t)) flags.push('self_harm_or_crisis');
  if (CLINICAL.test(t)) flags.push('clinical_diagnosis_tone');
  if (HIRING_AUTH.test(t)) flags.push('hiring_authority_claim');
  if (PROTECTED_CLASS.test(t)) flags.push('protected_class_inference');
  if (ILLEGAL_ADVICE.test(t)) flags.push('illegal_advice');
  if (/\b100%\s+certain\b|\bguaranteed\s+outcome\b/i.test(t)) flags.push('unsupported_certainty');
  return flags;
};

const scanUserMessageForRisk = (text = '') => {
  const t = String(text || '');
  if (SELF_HARM.test(t) || CRISIS.test(t)) {
    return { level: 'crisis', flags: ['self_harm_or_crisis'] };
  }
  if (CLINICAL.test(t)) {
    return { level: 'clinical_request', flags: ['clinical_request'] };
  }
  return { level: 'ok', flags: [] };
};

const crisisSupportFallback =
  "I'm not able to help with crisis or self-harm topics here. If you're in immediate danger, please contact local emergency services or a trusted crisis line in your area. If you're safe right now, consider reaching out to someone you trust or a mental health professional for support.";

const clinicalRequestFallback =
  'I cannot provide medical or clinical diagnoses. The assessment offers developmental career and personality guidance only. For health concerns, please speak with a qualified clinician.';

const unsafeOutputReplacement =
  'This response was limited by automated safety checks. Here is a safer summary: focus on evidence-based career development steps from your stored assessment results, and treat all guidance as non-deterministic self-insight rather than selection or diagnosis.';

const runLocalModerationStub = (text) => ({
  flagged: scanOutputForSafetyFlags(text).length > 0,
  categories: scanOutputForSafetyFlags(text),
});

module.exports = {
  scanOutputForSafetyFlags,
  scanUserMessageForRisk,
  crisisSupportFallback,
  clinicalRequestFallback,
  unsafeOutputReplacement,
  runLocalModerationStub,
};
