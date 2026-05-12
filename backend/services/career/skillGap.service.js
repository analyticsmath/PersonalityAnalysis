const { SIGNAL_KEYS } = require('./careerFitTypes');

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

const SYNONYM_RULES = [
  [/^(js|javascript|ecmascript)$/i, 'JavaScript'],
  [/^(ts|typescript)$/i, 'TypeScript'],
  [/^(node|nodejs|node\.js)$/i, 'Node.js'],
  [/^(react|reactjs|react\.js)$/i, 'React'],
  [/^(ml|machine learning)$/i, 'Machine Learning'],
  [/^(ai|artificial intelligence)$/i, 'Artificial Intelligence'],
  [/^(db|database|sql)$/i, 'SQL'],
  [/^(postgres|postgresql)$/i, 'PostgreSQL'],
  [/^(k8s|kubernetes)$/i, 'Kubernetes'],
  [/^(aws)$/i, 'AWS'],
  [/^(gcp)$/i, 'GCP'],
  [/^(excel)$/i, 'Excel'],
];

const normalizeSkillName = (raw) => {
  const s = String(raw || '')
    .trim()
    .replace(/\s+/g, ' ');
  if (!s) return '';
  const lower = s.toLowerCase();
  for (const [re, canon] of SYNONYM_RULES) {
    if (re.test(lower)) return canon;
  }
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
};

const canonicalSet = (names = []) => {
  const out = new Map();
  (Array.isArray(names) ? names : []).forEach((n) => {
    const c = normalizeSkillName(n);
    if (c) out.set(c.toLowerCase(), c);
  });
  return out;
};

const analyzeSkillGap = ({ career, cvSkillNames = [], profileSkills = [], careerSignalsUser = {} }) => {
  const userCanon = canonicalSet([...cvSkillNames, ...profileSkills]);
  const required = career.requiredSkills || [];
  const recommended = career.recommendedSkills || [];

  const matchedSkills = [];
  const missingCriticalSkills = [];

  required.forEach((req) => {
    const canon = normalizeSkillName(req);
    const hit = [...userCanon.values()].find(
      (u) => u.toLowerCase() === canon.toLowerCase() || u.toLowerCase().includes(canon.toLowerCase())
    );
    if (hit) matchedSkills.push(hit);
    else missingCriticalSkills.push(canon);
  });

  const recHits = [];
  recommended.forEach((r) => {
    const canon = normalizeSkillName(r);
    const hit = [...userCanon.values()].find((u) => u.toLowerCase().includes(canon.toLowerCase()));
    if (hit) recHits.push(hit);
  });

  const readinessBase =
    required.length > 0 ? (matchedSkills.length / required.length) * 100 : 55;
  const signalBoost = clamp(
    SIGNAL_KEYS.reduce((s, k) => s + (Number(careerSignalsUser[k] || 50) - 50) * 0.08, 0),
    -12,
    12
  );
  const skillReadinessScore = clamp(Math.round(readinessBase + signalBoost), 0, 100);

  const evidenceSources = [];
  if (cvSkillNames.length) evidenceSources.push('cv');
  if (Object.keys(careerSignalsUser || {}).length) evidenceSources.push('assessment');

  return {
    matchedSkills: [...new Set(matchedSkills)].slice(0, 12),
    missingCriticalSkills: [...new Set(missingCriticalSkills)].slice(0, 12),
    recommendedSkills: recommended
      .map(normalizeSkillName)
      .filter((r) => !userCanon.has(r.toLowerCase()))
      .slice(0, 10),
    skillReadinessScore,
    evidenceSources: [...new Set(evidenceSources)],
  };
};

module.exports = {
  normalizeSkillName,
  analyzeSkillGap,
};
