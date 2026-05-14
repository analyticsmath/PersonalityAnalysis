/**
 * Smoke: Cognitive & Behavior signal variance verification.
 *
 * Runs 4 deterministic fixtures through buildTraitVector and
 * validates that cognitive/behavior signals vary meaningfully by profile.
 * Also verifies the canonical serializer detects legacy/default patterns.
 *
 * Exits 0 if all checks pass, 1 on failure.
 */

const { buildTraitVector } = require('../services/trait-vector.service');
const {
  buildCanonicalCognitiveSignal,
  buildCanonicalBehaviorSignal,
} = require('../services/assessment/unified-contracts.service');

const likertAnswer = ({ id, trait, value }) => ({
  questionId: id,
  type: 'likert',
  value,
  metadata: { trait, normalizedScore: value },
});

const qp = ({ id, trait }) => ({
  questionId: id,
  text: `Q ${id}`,
  type: 'likert',
  traitFocus: trait,
  reasoningWeight: 0.85,
});

const FIXTURES = {
  introverted_engineer: {
    answers: [
      likertAnswer({ id: 'a-c1', trait: 'C', value: 5 }),
      likertAnswer({ id: 'a-c2', trait: 'C', value: 5 }),
      likertAnswer({ id: 'a-e1', trait: 'E', value: 1 }),
      likertAnswer({ id: 'a-e2', trait: 'E', value: 2 }),
      likertAnswer({ id: 'a-o1', trait: 'O', value: 4 }),
      likertAnswer({ id: 'a-n1', trait: 'N', value: 2 }),
    ],
    plan: [
      qp({ id: 'a-c1', trait: 'C' }), qp({ id: 'a-c2', trait: 'C' }),
      qp({ id: 'a-e1', trait: 'E' }), qp({ id: 'a-e2', trait: 'E' }),
      qp({ id: 'a-o1', trait: 'O' }), qp({ id: 'a-n1', trait: 'N' }),
    ],
  },
  social_leader: {
    answers: [
      likertAnswer({ id: 'b-e1', trait: 'E', value: 5 }),
      likertAnswer({ id: 'b-e2', trait: 'E', value: 5 }),
      likertAnswer({ id: 'b-a1', trait: 'A', value: 5 }),
      likertAnswer({ id: 'b-a2', trait: 'A', value: 4 }),
      likertAnswer({ id: 'b-c1', trait: 'C', value: 3 }),
      likertAnswer({ id: 'b-n1', trait: 'N', value: 3 }),
    ],
    plan: [
      qp({ id: 'b-e1', trait: 'E' }), qp({ id: 'b-e2', trait: 'E' }),
      qp({ id: 'b-a1', trait: 'A' }), qp({ id: 'b-a2', trait: 'A' }),
      qp({ id: 'b-c1', trait: 'C' }), qp({ id: 'b-n1', trait: 'N' }),
    ],
  },
  creative_designer: {
    answers: [
      likertAnswer({ id: 'c-o1', trait: 'O', value: 5 }),
      likertAnswer({ id: 'c-o2', trait: 'O', value: 5 }),
      likertAnswer({ id: 'c-c1', trait: 'C', value: 2 }),
      likertAnswer({ id: 'c-e1', trait: 'E', value: 3 }),
      likertAnswer({ id: 'c-a1', trait: 'A', value: 3 }),
      likertAnswer({ id: 'c-n1', trait: 'N', value: 3 }),
    ],
    plan: [
      qp({ id: 'c-o1', trait: 'O' }), qp({ id: 'c-o2', trait: 'O' }),
      qp({ id: 'c-c1', trait: 'C' }), qp({ id: 'c-e1', trait: 'E' }),
      qp({ id: 'c-a1', trait: 'A' }), qp({ id: 'c-n1', trait: 'N' }),
    ],
  },
  low_evidence: {
    answers: [],
    plan: [],
  },
};

const LEGACY_COGNITIVE_OLD_STYLE = {
  analytical: 45, creative: 46, strategic: 47,
  systematic: 46, practical: 45, abstract: 46,
};

const LEGACY_BEHAVIOR_SCALE_ERROR = {
  leadership: 3, risk_tolerance: 1, decision_speed: 3,
  stress_tolerance: 54, team_preference: 1,
};

const isNarrowBand = (values) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return max - min <= 6 && min >= 43 && max <= 53;
};

let failed = false;
const check = (label, cond) => {
  if (!cond) {
    console.error(`FAIL: ${label}`);
    failed = true;
  } else {
    console.log(`PASS: ${label}`);
  }
};

(async () => {
  console.log('\n=== Cognitive & Behavior Variance Smoke ===\n');

  const results = {};
  for (const [name, { answers, plan }] of Object.entries(FIXTURES)) {
    const out = await buildTraitVector({ answers, questionPlan: plan, aiProfile: {} });
    results[name] = out;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const round = (v) => Math.round(Number(v) || 0);
    const legacyBeh = {
      leadership: clamp(round(out.behaviorVector.leadership || 50), 0, 100),
      risk_tolerance: clamp(round(out.behaviorVector.risk || 50), 0, 100),
      decision_speed: clamp(round(out.behaviorVector.execution || 50), 0, 100),
      stress_tolerance: clamp(round(100 - Number(out.oceanVector.N || 50)), 0, 100),
      team_preference: clamp(round(out.behaviorVector.collaboration || 50), 0, 100),
    };

    const cogSig = buildCanonicalCognitiveSignal(out.cognitiveVector);
    const behSig = buildCanonicalBehaviorSignal(legacyBeh);

    console.log(`\n${name}:`);
    console.log(`  OCEAN:     O=${out.oceanVector.O} C=${out.oceanVector.C} E=${out.oceanVector.E} A=${out.oceanVector.A} N=${out.oceanVector.N}`);
    console.log(`  Cognitive: ${JSON.stringify(out.cognitiveVector)}`);
    console.log(`  BehRaw:    ${JSON.stringify(out.behaviorVector)}`);
    console.log(`  LegacyBeh: ${JSON.stringify(legacyBeh)}`);
    console.log(`  CogSig:    status=${cogSig.status} values=${JSON.stringify(cogSig.values)}`);
    console.log(`  BehSig:    status=${behSig.status} dominant=${behSig.dominant} values=${JSON.stringify(behSig.values)}`);
  }

  console.log('\n--- Fixture Assertions ---\n');

  const eng = results.introverted_engineer;
  const soc = results.social_leader;
  const cre = results.creative_designer;
  const low = results.low_evidence;

  // Engineer should have higher systematic/analytical than creative
  check('engineer analytical > 50',
    Number(eng.cognitiveVector.analytical) > 50);
  check('engineer systematic > 50',
    Number(eng.cognitiveVector.systematic) > 50);
  check('creative designer creative > engineer creative',
    Number(cre.cognitiveVector.creative) > Number(eng.cognitiveVector.creative));
  check('social leader leadership behavior > engineer leadership',
    Number(soc.behaviorVector.leadership) > Number(eng.behaviorVector.leadership));

  // No valid fixture should produce all 45–47 cognitive range
  for (const name of ['introverted_engineer', 'social_leader', 'creative_designer']) {
    const vals = Object.values(results[name].cognitiveVector).map(Number);
    check(`${name} cognitive NOT all in 43–52 narrow band`, !isNarrowBand(vals));
  }

  // Low evidence yields neutral all-50 → canonical says insufficient
  const lowCogSig = buildCanonicalCognitiveSignal(low.cognitiveVector);
  check('low_evidence cognitive → insufficient_data', lowCogSig.status === 'insufficient_data');

  const lowLegacyBeh = {
    leadership: 50, risk_tolerance: 50, decision_speed: 50,
    stress_tolerance: 50, team_preference: 50,
  };
  const lowBehSig = buildCanonicalBehaviorSignal(lowLegacyBeh);
  check('low_evidence behavior all-50 → insufficient_data', lowBehSig.status === 'insufficient_data');

  // Legacy fallback patterns must be detected as insufficient
  const legCogSig = buildCanonicalCognitiveSignal(LEGACY_COGNITIVE_OLD_STYLE);
  check('old 45–47 cognitive → insufficient_data', legCogSig.status === 'insufficient_data');

  const legBehSig = buildCanonicalBehaviorSignal(LEGACY_BEHAVIOR_SCALE_ERROR);
  check('old 1–3 behavior scale error → insufficient_data', legBehSig.status === 'insufficient_data');

  // Engineer canonical signals should be valid
  const engClamp = (v) => Math.max(0, Math.min(100, Math.round(v)));
  const engLegBeh = {
    leadership: engClamp(eng.behaviorVector.leadership),
    risk_tolerance: engClamp(eng.behaviorVector.risk),
    decision_speed: engClamp(eng.behaviorVector.execution),
    stress_tolerance: engClamp(100 - Number(eng.oceanVector.N)),
    team_preference: engClamp(eng.behaviorVector.collaboration),
  };
  const engCogSig = buildCanonicalCognitiveSignal(eng.cognitiveVector);
  const engBehSig = buildCanonicalBehaviorSignal(engLegBeh);
  check('engineer canonical cognitive is valid', engCogSig.status === 'valid');
  check('engineer canonical behavior is valid', engBehSig.status === 'valid');
  check('engineer canonical behavior has dominant field', Boolean(engBehSig.dominant));

  // Creative designer canonical
  const creClamp = (v) => Math.max(0, Math.min(100, Math.round(v)));
  const creLegBeh = {
    leadership: creClamp(cre.behaviorVector.leadership),
    risk_tolerance: creClamp(cre.behaviorVector.risk),
    decision_speed: creClamp(cre.behaviorVector.execution),
    stress_tolerance: creClamp(100 - Number(cre.oceanVector.N)),
    team_preference: creClamp(cre.behaviorVector.collaboration),
  };
  const creCogSig = buildCanonicalCognitiveSignal(cre.cognitiveVector);
  check('creative designer canonical cognitive is valid', creCogSig.status === 'valid');
  check('creative designer creative cognitive > analytical',
    Number(creCogSig.values?.creative || 0) > Number(creCogSig.values?.analytical || 0));

  console.log();
  if (failed) {
    console.error('Smoke FAILED — cognitive/behavior variance or canonical serializer has issues.\n');
    process.exit(1);
  } else {
    console.log('Smoke PASSED — cognitive/behavior signals are valid and canonical serializer works.\n');
  }
})();
