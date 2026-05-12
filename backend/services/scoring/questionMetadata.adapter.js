const { OCEAN_KEYS } = require('./scoringTypes');

const toString = (v) => String(v || '').trim();
const lower = (v) => toString(v).toLowerCase();

const resolveOceanTrait = (question = {}, answer = {}) => {
  const fromAnswer = toString(answer.metadata?.traitTarget || answer.metadata?.trait)
    .toUpperCase()
    .charAt(0);
  if (OCEAN_KEYS.includes(fromAnswer)) return fromAnswer;

  const fromQ = toString(question.traitFocus || question.trait || question.traitTarget)
    .toUpperCase()
    .charAt(0);
  if (OCEAN_KEYS.includes(fromQ)) return fromQ;

  const token = lower(question.traitTarget || question.trait || question.traitFocus);
  if (/stress|risk|uncertain|anxi/.test(token)) return 'N';
  if (/team|empathy|cooper|conflict/.test(token)) return 'A';
  if (/leader|assert|social|influence|network/.test(token)) return 'E';
  if (/discipline|plan|system|organ|detail/.test(token)) return 'C';
  if (/curious|novel|idea|imagin/.test(token)) return 'O';
  return 'O';
};

const matchBuckets = (haystack, buckets) => {
  const found = [];
  Object.entries(buckets).forEach(([key, patterns]) => {
    if (patterns.some((re) => re.test(haystack))) found.push(key);
  });
  return found;
};

const RIASEC_PATTERNS = {
  realistic: [/\b(build|repair|tool|machine|outdoor|physical|hands-on)\b/],
  investigative: [/\b(analy|research|data|hypothesis|science|diagnos|debug)\b/],
  artistic: [/\b(design|creative|aesthetic|music|write|story|innovat)\b/],
  social: [/\b(help|teach|coach|care|community|listen|mentor)\b/],
  enterprising: [/\b(lead|sell|pitch|business|startup|negotiat|influenc)\b/],
  conventional: [/\b(organiz|process|compliance|record|schedule|detail-oriented)\b/],
};

const WORK_VALUE_PATTERNS = {
  achievement: [/\b(achiev|excel|milestone|goal|win)\b/],
  independence: [/\b(independ|autonom|self-direct)\b/],
  recognition: [/\b(recogn|credit|visible|award|status)\b/],
  relationships: [/\b(relationship|trust|team bond|collaborat)\b/],
  support: [/\b(support|mentor|resources|backing)\b/],
  workingConditions: [/\b(environment|workspace|ergonomic|office)\b/],
  security: [/\b(stable|secure|predictable|benefits|pension)\b/],
  autonomy: [/\b(autonomy|freedom|choose own)\b/],
  learning: [/\b(learn|course|growth|curious|upskill)\b/],
  impact: [/\b(impact|purpose|mission|society|meaning)\b/],
  workLifeBalance: [/\b(balance|family time|weekend|flexible hours|wellbeing)\b/],
  compensation: [/\b(salary|pay|compensation|equity|bonus)\b/],
};

const CAREER_SIGNAL_PATTERNS = {
  technicalDepth: [/\b(code|engineer|stack|architecture|api|deploy)\b/],
  communication: [/\b(present|write|stakeholder|explain|clarify)\b/],
  leadership: [/\b(lead|delegate|vision|accountable)\b/],
  collaboration: [/\b(team|pair|sync|workshop|cross-functional)\b/],
  analyticalThinking: [/\b(analy|metric|root cause|model)\b/],
  creativity: [/\b(creative|brainstorm|novel|prototype)\b/],
  problemSolving: [/\b(solve|unblock|tradeoff|debug|issue)\b/],
  adaptability: [/\b(adapt|pivot|ambiguous|change)\b/],
  planning: [/\b(plan|roadmap|milestone|backlog|priorit)\b/],
  riskTolerance: [/\b(risk|bet|uncertain|experiment)\b/],
  learningOrientation: [/\b(learn|study|course|feedback loop)\b/],
  domainFocus: [/\b(domain|specialist|deep expertise|niche)\b/],
};

const inferQuestionScoringMeta = (question = {}, answer = {}) => {
  const ocean = resolveOceanTrait(question, answer);
  const qText = lower(`${question.text || ''} ${question.category || ''} ${question.theme || ''} ${question.plannerCategory || ''}`);
  let answerBlob = '';
  if (answer.type === 'text' || answer.type === 'scenario') {
    answerBlob = lower(`${answer.value?.text || ''} ${answer.value?.example || ''}`);
  } else if (answer.type === 'behavior') {
    answerBlob = lower(toString(answer.value));
  }
  const haystack = `${qText} ${answerBlob}`;

  const riasec = matchBuckets(haystack, RIASEC_PATTERNS);
  const workValues = matchBuckets(haystack, WORK_VALUE_PATTERNS);
  const careerSignals = matchBuckets(haystack, CAREER_SIGNAL_PATTERNS);

  let dimension = 'bigFive';
  if (riasec.length && (workValues.length || careerSignals.length)) dimension = 'mixed';
  else if (riasec.length) dimension = 'riasec';
  else if (workValues.length) dimension = 'workValues';
  else if (careerSignals.length) dimension = 'careerSignal';

  const weight = Math.min(
    1.2,
    Math.max(0.35, Number(question.reasoningWeight || question.aiMeta?.reasoning_weight || 0.65) || 0.65)
  );

  return {
    questionId: toString(question.questionId || question.id || answer.questionId),
    dimension,
    traitOcean: ocean,
    riasec,
    workValues,
    careerSignals,
    weight,
    reverseScored: Boolean(question.reverse || question.keyedDirection === 'reverse'),
    answerType: lower(answer.type || question.type || 'likert'),
    scoringHints: [],
  };
};

module.exports = {
  inferQuestionScoringMeta,
  resolveOceanTrait,
  RIASEC_PATTERNS,
  WORK_VALUE_PATTERNS,
  CAREER_SIGNAL_PATTERNS,
};
