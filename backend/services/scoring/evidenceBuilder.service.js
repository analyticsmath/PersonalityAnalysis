const { inferQuestionScoringMeta } = require('./questionMetadata.adapter');

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const toString = (v) => String(v || '').trim();

const likertToContribution = ({ answer, meta }) => {
  let v = 3;
  if (answer.type === 'likert' || answer.type === 'scale') {
    v = Number(answer.value);
  } else if (answer.type === 'mcq' && answer.value && typeof answer.value === 'object') {
    v = Number(answer.value.normalizedScore ?? answer.metadata?.normalizedScore ?? 3);
  } else if (answer.type === 'text' || answer.type === 'scenario') {
    v = Number(answer.value?.normalizedScore ?? answer.metadata?.normalizedScore ?? 3);
  }
  if (!Number.isFinite(v)) v = 3;
  v = clamp(v, 1, 5);
  if (meta.reverseScored) v = 6 - v;
  return (v - 1) / 4;
};

const buildEvidenceFromAnswers = ({ unifiedAnswers = [], questionPlan = [] } = {}) => {
  const byId = new Map(
    (Array.isArray(questionPlan) ? questionPlan : []).map((q) => [toString(q.questionId || q.id), q])
  );

  const evidence = [];

  for (const answer of Array.isArray(unifiedAnswers) ? unifiedAnswers : []) {
    const t = toString(answer.type).toLowerCase();
    if (t === 'behavior') continue;

    const question = byId.get(toString(answer.questionId)) || {};
    const meta = inferQuestionScoringMeta(question, answer);
    const contrib = likertToContribution({ answer, meta });
    const direction = contrib >= 0.55 ? 'positive' : contrib <= 0.45 ? 'negative' : 'neutral';
    const qid = meta.questionId || toString(answer.questionId);

    evidence.push({
      source: 'answer',
      sourceId: qid,
      dimension: 'bigFive',
      key: meta.traitOcean,
      signal: `Response aligned to ${meta.traitOcean} facet (${meta.answerType})`,
      weight: meta.weight * (0.5 + contrib),
      direction,
    });

    meta.riasec.forEach((r) => {
      evidence.push({
        source: 'inferred',
        sourceId: qid,
        dimension: 'riasec',
        key: r,
        signal: `Question/answer context suggests ${r} interest`,
        weight: meta.weight * 0.55,
        direction,
      });
    });

    meta.workValues.forEach((w) => {
      evidence.push({
        source: 'inferred',
        sourceId: qid,
        dimension: 'workValues',
        key: w,
        signal: `Language hints preference for ${w}`,
        weight: meta.weight * 0.45,
        direction,
      });
    });

    meta.careerSignals.forEach((c) => {
      evidence.push({
        source: 'inferred',
        sourceId: qid,
        dimension: 'careerSignal',
        key: c,
        signal: `Observable phrasing mapped to ${c}`,
        weight: meta.weight * 0.5,
        direction,
      });
    });
  }

  return { evidence, questionMetaByAnswer: null };
};

module.exports = {
  buildEvidenceFromAnswers,
};
