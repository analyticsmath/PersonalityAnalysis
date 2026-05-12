# Career intelligence engine (Phase 4)

This document describes the **deterministic occupation matching**, **skill-gap analysis**, **roadmaps**, and **API** introduced in Phase 4. It complements `scoring-methodology.md` (Phase 3 inputs) and `assessment-api-contract.md` (HTTP surface).

## Safety and product language

- Recommendations are **guidance**, not hiring decisions, guarantees of success or failure, or clinical judgments.
- For regulated occupations, taxonomy entries may include `licensingNote` text; the UI and AI prompts must treat licensing as **context**, not automated clearance.
- When `scoreMeta.scoreValidity` is `partial` or `insufficient_data`, outputs are labeled **preliminary** and confidence is damped.
- When validity is **`invalid`** (or stored results lack scoring metadata), career intelligence is **locked**: no ranked “final-looking” lists are returned.

## Taxonomy

- **Location:** `backend/services/career/careerTaxonomy.service.js`
- **Version string:** `phase4-v1` (`CAREER_PROFILE_VERSION` in `careerFitTypes.js`)
- **Shape:** each career includes `careerId`, `title`, `category`, `description`, `typicalEducation`, `experienceLevel`, `riasecProfile`, `bigFiveProfile`, `workValues`, `requiredSkills`, `recommendedSkills`, `careerSignals`, `workEnvironment`, `growthPath`, `portfolioProjects`, `riskFactors`, `keywords`, optional `licensingNote`.
- **Size:** curated list (30+ roles) across technology, business, creative, education, finance, engineering, and healthcare-adjacent domains — structured for future expansion (not a full O*NET import).

## Fit formula (deterministic)

Weights in `FIT_WEIGHTS` (`careerFitTypes.js`), defaulting to:

| Component | Weight |
| --- | --- |
| RIASEC fit | 25% |
| Skill fit (from readiness / gaps) | 25% |
| Work values fit | 20% |
| Big Five work-style fit | 15% |
| Education / context fit | 10% |
| Goal / domain alignment | 5% |

Implementation: `careerMatching.service.js` — dimension closeness on 0–100 scales, weighted sum → `fitScore`; confidence blends signal strength, CV presence, and `scoreMeta` validity flags.

**AI must not alter** `fitScore`, `fitBreakdown`, or `skillReadinessScore`; narratives only interpret the provided JSON.

## Recommendation buckets

Produced by `careerRecommendationOrchestrator.service.js`:

| Bucket | Intent |
| --- | --- |
| `bestFits` | Higher fit with adequate confidence and skill readiness |
| `stretchFits` | Strong profile alignment with material skill gaps |
| `exploratoryFits` | Moderate fit worth exploring |
| `lowerFitButPossible` | Lower current fit; development-heavy path |

Copy avoids “unsuitable career” language.

## Skill gaps

`skillGap.service.js`:

- Case-insensitive matching against `requiredSkills` / user CV + profile skills.
- **Synonym rules** (examples): `js` → JavaScript, `react.js` → React, `node` → Node.js, `ml` → Machine Learning.
- Outputs: `matchedSkills`, `missingCriticalSkills`, `recommendedSkills`, `skillReadinessScore`, `evidenceSources` (`cv`, `assessment`).
- No invented skills: only taxonomy + user-provided strings participate.

## Roadmaps

`careerRoadmap.service.js` builds **deterministic** timelines (0–30 days, 1–3 months, 3–6 months, optional 6–12 months) from missing/recommended skills, growth path labels, and portfolio prompts. AI may polish wording later, but **structure and actions** are owned by this service.

## Orchestration & persistence

- `runCareerRecommendationOrchestrator` composes fit, gaps, roadmap, “why fits” / “why challenging”, `topMatchedSignals`, and warnings.
- `recommendCareers` (`career-recommendation.service.js`) uses the orchestrator whenever Phase 3 `scoringOutput` is present; legacy AI ranking remains only as a fallback when scoring is absent (e.g. older scripts).
- `AssessmentResult.careerRecommendations` stores `{ version, generatedAt, locked, preliminary, recommendations, topRecommendations, skillGapSummary, roadmaps, warnings }`.
- `mapResultToLegacySummary` exposes `career_recommendations_phase4` for the dashboard/result UI.

## HTTP API

`GET /api/assessment/:id/career-recommendations` (auth + session ownership via `getSessionForUser`):

- Returns Phase 4 payload fields (`assessmentId`, `scoreMeta`, `careerProfileVersion`, `locked`, `preliminary`, `recommendations`, `topRecommendations`, `skillGapSummary`, `roadmaps`, `warnings`).
- If the stored document lacks `careerRecommendations` but Phase 3 scores exist, the handler **recomputes** deterministically from `scores` + `scoreMeta` + session CV/profile.

## AI boundary (reports + chat + observability)

- `ai-result-narrative.service.js` receives a **slimmed** Phase 4 block inside `phase3ContextBlock`.
- `career-chatbot.service.js` includes `phase4CareerIntelligence` in JSON context with explicit instructions: **do not change fit scores or invent gaps**.
- **Phase 5:** client and HTTP responses may surface `aiStatus` (`schemaValidated`, `fallbackUsed`, `safetyChecked`, `latencyMs`, `model`, …) alongside narratives. **`aiStatus` never overrides** stored `fitScore`, `skillReadinessScore`, or Phase 3 `scores` — it is provenance metadata only.

## Tests

See `backend/tests/career-intelligence.test.js` and `frontend/src/components/career/career-components.test.jsx`.
