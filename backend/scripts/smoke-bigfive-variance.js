/**
 * Smoke: Big Five variance verification.
 * Runs 4 deterministic answer fixtures through buildTraitVector and prints
 * OCEAN vectors. Exits 1 if vectors are indistinguishably flat.
 */
const { buildTraitVector } = require('../services/trait-vector.service');

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
  structured_ops: {
    answers: [
      likertAnswer({ id: 'd-c1', trait: 'C', value: 5 }),
      likertAnswer({ id: 'd-c2', trait: 'C', value: 5 }),
      likertAnswer({ id: 'd-o1', trait: 'O', value: 1 }),
      likertAnswer({ id: 'd-o2', trait: 'O', value: 2 }),
      likertAnswer({ id: 'd-e1', trait: 'E', value: 3 }),
      likertAnswer({ id: 'd-n1', trait: 'N', value: 2 }),
    ],
    plan: [
      qp({ id: 'd-c1', trait: 'C' }), qp({ id: 'd-c2', trait: 'C' }),
      qp({ id: 'd-o1', trait: 'O' }), qp({ id: 'd-o2', trait: 'O' }),
      qp({ id: 'd-e1', trait: 'E' }), qp({ id: 'd-n1', trait: 'N' }),
    ],
  },
};

const isFlat = (ocean) =>
  Object.values(ocean).every((v) => v >= 48 && v <= 52);

(async () => {
  console.log('\n=== Big Five Variance Smoke ===\n');
  const results = {};

  for (const [name, { answers, plan }] of Object.entries(FIXTURES)) {
    const out = await buildTraitVector({ answers, questionPlan: plan, aiProfile: {} });
    results[name] = out.oceanVector;
    const flat = isFlat(out.oceanVector) ? ' ← FLAT (bug!)' : '';
    console.log(`${name}:${flat}`);
    console.log(`  O=${out.oceanVector.O} C=${out.oceanVector.C} E=${out.oceanVector.E} A=${out.oceanVector.A} N=${out.oceanVector.N}`);
  }

  // Assertions
  let failed = false;

  const eng = results.introverted_engineer;
  const soc = results.social_leader;
  const cre = results.creative_designer;
  const str = results.structured_ops;

  const check = (label, cond) => {
    if (!cond) {
      console.error(`\nFAIL: ${label}`);
      failed = true;
    } else {
      console.log(`\nPASS: ${label}`);
    }
  };

  check('social E > introverted E by >=12', soc.E - eng.E >= 12);
  check('creative O > structured O by >=10', cre.O - str.O >= 10);
  check('structured C > creative C by >=8', str.C - cre.C >= 8);
  check('introverted engineer is not flat', !isFlat(eng));
  check('social leader is not flat', !isFlat(soc));
  check('creative designer is not flat', !isFlat(cre));
  check('structured ops is not flat', !isFlat(str));

  if (failed) {
    console.error('\nSmoke FAILED — Big Five variance is insufficient.\n');
    process.exit(1);
  } else {
    console.log('\nSmoke PASSED — Big Five variance is valid.\n');
  }
})();
