# Scoring methodology (Phase 3)

This document describes the **deterministic scientific scoring layer** used alongside (but not controlled by) AI narrative features.

## Scope and disclaimers

- Outputs are **career and self-development guidance**, not medical or clinical diagnosis.
- **AI does not own numeric scores.** OpenAI is used only for narrative text; all structured scores are computed in Node.js services under `backend/services/scoring/`.
- Users should treat low-confidence or `partial` / `insufficient_data` validity states as invitations to gather more evidence, not as fixed labels.

## Big Five (OCEAN-derived)

Traits surfaced in the product API:

| Internal key | Display |
| --- | --- |
| openness | Openness |
| conscientiousness | Conscientiousness |
| extraversion | Extraversion |
| agreeableness | Agreeableness |
| emotionalStability | Emotional Stability |

**Emotional stability vs neuroticism:** legacy pipelines still compute a reactivity-oriented **N** channel internally (higher N = higher self-reported stress sensitivity in item space). Public **emotional stability** scores use an inverse stability view on that channel for clearer, non-clinical wording. This is **not** a clinical instrument.

Each trait block includes: `score` (0–100), `confidence`, `evidenceCount`, `signals`, `contradictions`, `interpretation`, `source: "deterministic"`, and `validity` (`valid` | `partial` | `insufficient_data`).

## RIASEC career interests

Dimensions: **realistic, investigative, artistic, social, enterprising, conventional**.

Holland-style **top-3 code** is derived from ranked dimension scores. When mean confidence is below an internal threshold or fewer than three dimensions have evidence, the code is flagged **preliminary**.

## Work values

Twelve preference dimensions (achievement, independence, recognition, relationships, support, workingConditions, security, autonomy, learning, impact, workLifeBalance, compensation). These are **preference indicators**, not immutable traits.

## Career signals

Structured keys (e.g. technicalDepth, leadership) combine lightweight answer heuristics with CV-derived hints. These signals feed the **Phase 4 career intelligence engine** (occupation fit, skill gaps, and roadmaps) as read-only numeric inputs; see `docs/architecture/career-intelligence-engine.md`.

## Phase 4 consumption (Career intelligence)

Phase 3 outputs (`scores`, `scoreMeta`, `evidence`, `warnings`) are passed into `runCareerRecommendationOrchestrator` after each adaptive completion. The orchestrator computes deterministic career fit **without** OpenAI involvement in numeric scoring. AI narratives and chat may summarize the structured recommendations but must not replace or contradict the stored fit numbers.

## Score metadata (`scoreMeta`)

| Field | Meaning |
| --- | --- |
| `scoreSource` | Always `deterministic` for numeric scoring in Phase 3 |
| `scoreValidity` | `valid` \| `partial` \| `insufficient_data` \| `invalid` |
| `confidence` | Global 0–1 confidence |
| `evidenceCount` | Number of evidence rows |
| `missingDimensions` / `missingEvidence` | Honest coverage gaps |
| `isFinal` | `false` when evidence thresholds are not met |
| `scoringVersion` | e.g. `phase3-v1` |
| `generatedAt` | ISO timestamp |

Legacy documents without `scoreMeta` are surfaced as `scoreSource: legacy_unverified` in summaries.

## Evidence model

Evidence rows reference `answer`, `cv`, `behavior`, or `inferred` sources with short signal text (not full raw CV text).

## AI narrative boundary

The narrative model receives **read-only** Phase 3 JSON. It must not output replacement numeric scores. Prompts explicitly require non-clinical language and uncertainty caveats when validity is partial or confidence is low.

## Phase 5 — `aiStatus` on results and reports

API summaries and dashboard AI report payloads may include **`ai_status` / `aiStatus`** metadata: `status`, `provider`, `promptVersion`, `schemaValidated`, `safetyChecked`, `fallbackUsed`, `errorCode`, **`latencyMs`**, and **`model`**. These fields describe the last AI pipeline step only; they **do not** change Phase 3 numeric scores stored on `AssessmentResult`.

## Versioning

Bump `scoringVersion` in `backend/services/scoring/scoringTypes.js` when materially changing thresholds or formulas.

- Phase 9 variance checks require non-identical Big Five/RIASEC/work-values vectors across at least three deterministic profile fixtures.
