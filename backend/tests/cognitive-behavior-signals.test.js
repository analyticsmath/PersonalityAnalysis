/**
 * Tests: Cognitive & Behavior Signal Variance + Canonical Serializer
 *
 * Covers:
 * - Signal variance across different fixture profiles
 * - Scale conversion (0-1, 1-5, -1..1 → 0-100)
 * - Canonical serializer detects legacy/default patterns
 * - Low evidence produces insufficient_data status
 */

const assert = require('node:assert/strict');
const { describe, it } = require('node:test');

const { buildTraitVector } = require('../services/trait-vector.service');
const {
  buildCanonicalCognitiveSignal,
  buildCanonicalBehaviorSignal,
} = require('../services/assessment/unified-contracts.service');

const likertAnswer = ({ id, trait, value }) => ({
  questionId: id, type: 'likert', value,
  metadata: { trait, normalizedScore: value },
});

const qp = ({ id, trait }) => ({
  questionId: id, text: 'Q', type: 'likert', traitFocus: trait, reasoningWeight: 0.85,
});

const ENGINEER_FIXTURE = {
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
};

const SOCIAL_LEADER_FIXTURE = {
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
};

const CREATIVE_FIXTURE = {
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
};

const clamp = (v, a, b) => Math.max(a, Math.min(b, Math.round(v)));

const toLegacyBeh = (bv, ocean) => ({
  leadership: clamp(bv.leadership || 50, 0, 100),
  risk_tolerance: clamp(bv.risk || 50, 0, 100),
  decision_speed: clamp(bv.execution || 50, 0, 100),
  stress_tolerance: clamp(100 - Number(ocean.N || 50), 0, 100),
  team_preference: clamp(bv.collaboration || 50, 0, 100),
});

describe('Cognitive signal variance', () => {
  it('engineer profile has higher analytical and systematic than low-O creative', async () => {
    const eng = await buildTraitVector({ answers: ENGINEER_FIXTURE.answers, questionPlan: ENGINEER_FIXTURE.plan, aiProfile: {} });
    const cre = await buildTraitVector({ answers: CREATIVE_FIXTURE.answers, questionPlan: CREATIVE_FIXTURE.plan, aiProfile: {} });
    assert.ok(eng.cognitiveVector.analytical > cre.cognitiveVector.analytical, 'engineer analytical > creative');
    assert.ok(eng.cognitiveVector.systematic > cre.cognitiveVector.systematic, 'engineer systematic > creative');
  });

  it('creative profile has higher creative and abstract than engineer', async () => {
    const eng = await buildTraitVector({ answers: ENGINEER_FIXTURE.answers, questionPlan: ENGINEER_FIXTURE.plan, aiProfile: {} });
    const cre = await buildTraitVector({ answers: CREATIVE_FIXTURE.answers, questionPlan: CREATIVE_FIXTURE.plan, aiProfile: {} });
    assert.ok(cre.cognitiveVector.creative > eng.cognitiveVector.creative, 'creative > engineer on creative');
    assert.ok(cre.cognitiveVector.abstract > eng.cognitiveVector.abstract, 'creative > engineer on abstract');
  });

  it('no valid fixture produces all values in 43-52 narrow band', async () => {
    for (const fixture of [ENGINEER_FIXTURE, SOCIAL_LEADER_FIXTURE, CREATIVE_FIXTURE]) {
      const out = await buildTraitVector({ answers: fixture.answers, questionPlan: fixture.plan, aiProfile: {} });
      const vals = Object.values(out.cognitiveVector).map(Number);
      const min = Math.min(...vals);
      const max = Math.max(...vals);
      const isNarrow = max - min <= 6 && min >= 43 && max <= 53;
      assert.ok(!isNarrow, `fixture should not be in 43-52 narrow band: min=${min} max=${max}`);
    }
  });

  it('low evidence profile produces all-50 cognitive → canonical insufficient_data', async () => {
    const out = await buildTraitVector({ answers: [], questionPlan: [], aiProfile: {} });
    const sig = buildCanonicalCognitiveSignal(out.cognitiveVector);
    assert.strictEqual(sig.status, 'insufficient_data');
    assert.strictEqual(sig.values, null);
  });
});

describe('Behavior signal variance', () => {
  it('social leader has higher leadership behavior than engineer', async () => {
    const eng = await buildTraitVector({ answers: ENGINEER_FIXTURE.answers, questionPlan: ENGINEER_FIXTURE.plan, aiProfile: {} });
    const soc = await buildTraitVector({ answers: SOCIAL_LEADER_FIXTURE.answers, questionPlan: SOCIAL_LEADER_FIXTURE.plan, aiProfile: {} });
    assert.ok(soc.behaviorVector.leadership > eng.behaviorVector.leadership,
      `social leadership (${soc.behaviorVector.leadership}) > engineer leadership (${eng.behaviorVector.leadership})`);
  });

  it('engineer has higher decision_speed behavior than social leader', async () => {
    const eng = await buildTraitVector({ answers: ENGINEER_FIXTURE.answers, questionPlan: ENGINEER_FIXTURE.plan, aiProfile: {} });
    const soc = await buildTraitVector({ answers: SOCIAL_LEADER_FIXTURE.answers, questionPlan: SOCIAL_LEADER_FIXTURE.plan, aiProfile: {} });
    const engBeh = toLegacyBeh(eng.behaviorVector, eng.oceanVector);
    const socBeh = toLegacyBeh(soc.behaviorVector, soc.oceanVector);
    assert.ok(engBeh.decision_speed > socBeh.decision_speed,
      `engineer decision_speed (${engBeh.decision_speed}) > social (${socBeh.decision_speed})`);
  });

  it('low evidence behavior all-50 → canonical insufficient_data', async () => {
    const allFifty = { leadership: 50, risk_tolerance: 50, decision_speed: 50, stress_tolerance: 50, team_preference: 50 };
    const sig = buildCanonicalBehaviorSignal(allFifty);
    assert.strictEqual(sig.status, 'insufficient_data');
  });
});

describe('Scale conversion safety', () => {
  it('0-1 cognitive scores treated as percentages if spread is wide', () => {
    // A score like { analytical: 0.73 } should NOT become valid (it's fractional, very low)
    const fractional = { analytical: 0.73, creative: 0.44, strategic: 0.61, systematic: 0.68, practical: 0.76, abstract: 0.49 };
    const sig = buildCanonicalCognitiveSignal(fractional);
    // All values are < 43 → narrow band detection catches them (max ~0.76 < 43)
    assert.strictEqual(sig.status, 'insufficient_data', 'fractional 0-1 values → insufficient');
  });

  it('valid 0-100 cognitive scores produce canonical valid signal', async () => {
    const eng = await buildTraitVector({ answers: ENGINEER_FIXTURE.answers, questionPlan: ENGINEER_FIXTURE.plan, aiProfile: {} });
    const sig = buildCanonicalCognitiveSignal(eng.cognitiveVector);
    assert.strictEqual(sig.status, 'valid');
    assert.ok(sig.values && typeof sig.values === 'object');
  });

  it('behavior scale error (1-3 values) → insufficient_data', () => {
    const badBeh = { leadership: 3, risk_tolerance: 1, decision_speed: 3, stress_tolerance: 54, team_preference: 1 };
    const sig = buildCanonicalBehaviorSignal(badBeh);
    assert.strictEqual(sig.status, 'insufficient_data');
  });

  it('valid 0-100 behavior vector → canonical valid with dominant', async () => {
    const eng = await buildTraitVector({ answers: ENGINEER_FIXTURE.answers, questionPlan: ENGINEER_FIXTURE.plan, aiProfile: {} });
    const beh = toLegacyBeh(eng.behaviorVector, eng.oceanVector);
    const sig = buildCanonicalBehaviorSignal(beh);
    assert.strictEqual(sig.status, 'valid');
    assert.ok(sig.dominant, 'dominant behavior field present');
    assert.ok(sig.values && typeof sig.values === 'object');
  });
});

describe('Canonical serializer correctness', () => {
  it('old 45-47 cognitive → insufficient_data (legacy narrow band)', () => {
    const legacy = { analytical: 45, creative: 46, strategic: 47, systematic: 46, practical: 45, abstract: 46 };
    const sig = buildCanonicalCognitiveSignal(legacy);
    assert.strictEqual(sig.status, 'insufficient_data');
    assert.strictEqual(sig.values, null);
    assert.ok(sig.warnings.length > 0, 'warning present for legacy scores');
  });

  it('old 1-3 behavior → insufficient_data (scale error)', () => {
    const legacy = { leadership: 3, risk_tolerance: 1, decision_speed: 3, stress_tolerance: 54, team_preference: 1 };
    const sig = buildCanonicalBehaviorSignal(legacy);
    assert.strictEqual(sig.status, 'insufficient_data');
    assert.strictEqual(sig.values, null);
    assert.ok(sig.warnings.length > 0);
  });

  it('engineer canonical signals are valid and vary', async () => {
    const eng = await buildTraitVector({ answers: ENGINEER_FIXTURE.answers, questionPlan: ENGINEER_FIXTURE.plan, aiProfile: {} });
    const cogSig = buildCanonicalCognitiveSignal(eng.cognitiveVector);
    const beh = toLegacyBeh(eng.behaviorVector, eng.oceanVector);
    const behSig = buildCanonicalBehaviorSignal(beh);

    assert.strictEqual(cogSig.status, 'valid');
    assert.strictEqual(behSig.status, 'valid');
    assert.ok(behSig.dominant, 'dominant label set');

    const cogVals = Object.values(cogSig.values).map(Number);
    const cogSpread = Math.max(...cogVals) - Math.min(...cogVals);
    assert.ok(cogSpread > 5, `cognitive spread ${cogSpread} should be > 5`);
  });

  it('PDF behavior extract uses canonical camelCase values', async () => {
    const eng = await buildTraitVector({ answers: ENGINEER_FIXTURE.answers, questionPlan: ENGINEER_FIXTURE.plan, aiProfile: {} });
    const beh = toLegacyBeh(eng.behaviorVector, eng.oceanVector);
    const behSig = buildCanonicalBehaviorSignal(beh);

    if (behSig.status === 'valid') {
      // Canonical behavior uses camelCase keys
      assert.ok('leadership' in behSig.values, 'leadership present');
      assert.ok('riskTolerance' in behSig.values, 'riskTolerance present');
      assert.ok('decisionSpeed' in behSig.values, 'decisionSpeed present');
      assert.ok('stressTolerance' in behSig.values, 'stressTolerance present');
      assert.ok('teamPreference' in behSig.values, 'teamPreference present');
    }
  });
});
