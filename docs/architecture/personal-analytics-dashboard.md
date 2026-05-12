# Personal analytics dashboard (Phase 7)

## Purpose

Longitudinal, **user-scoped** views built only from persisted `AssessmentResult` documents and related progress rows. No synthetic history, no interpolated trend points, and no “progress” charts when the backend cannot support them honestly.

## Sources

- **Primary:** `AssessmentResult` — `scores`, `scoreMeta` (via `deriveScoreMeta`), `careerRecommendations`, `analytics.aiReport`, `evidence`, `warnings`, `completedAt`, `legacyAssessmentId`.
- **Roadmap completion:** `CareerRoadmapProgress` — `completedActionKeys` aligned to roadmap timelines on the result’s Phase 4 `careerRecommendations.roadmaps`.

## History model

`assessmentHistory.service` builds rows newest-first with:

- `status`: `completed` | `partial` | `legacy` | `failed` (honest mapping from completion + `scoreMeta` + legacy markers).
- `scoreValidity`: `valid` | `partial` | `insufficient_data` | `legacy_unverified`.
- Flags for AI report presence and Phase 4 career intelligence presence (non-locked with `topRecommendations`).

## Trend rules

`traitTrends.service`:

- Only results with `scoreValidity` of **`valid` or `partial`** and **not** `scoreSource: legacy_unverified` contribute to multi-assessment trends.
- If fewer than **two** eligible results exist, the API returns `status: insufficient_history` and **empty** `trendPoints` (no fake lines).
- Points are factual snapshots per result date; there is **no interpolation**.

## Career readiness indicator

`careerReadiness.service` blends (latest result):

- 35% top career fit score  
- 30% skill readiness (top recommendation skill gaps)  
- 15% score confidence  
- 10% roadmap completion percent (user-tracked actions / total actions)  
- 10% evidence completeness (bounded function of evidence array length)

Copy uses **“career readiness indicator”** language — not hireability. `status` may be `improving`, `stable`, `new`, or `insufficient_history`.

## Skill progress

Latest snapshot of matched / missing / recommended skills from Phase 4 `topRecommendations[0].skillGaps`. Optional `progressItems` only when **two** results share the same target career title and new matched skills appear — never fabricated deltas.

## Report history & growth recommendations

`GET /api/assessment/analytics/report-history` returns `{ items, growthRecommendations }` where `growthRecommendations` is an array of `{ source, text }` entries derived from the latest stored AI report growth suggestions, career-engine next steps, and bounded system warnings. The analytics UI renders this list as a **Growth recommendations** panel with an honest empty state when none exist.

## Roadmap progress

`roadmapProgress.service` validates `completedActionKeys` against the stored timeline for `(resultId, careerId)`. Progress percent = completed keys / total derived keys. Ownership enforced on every read/write. Responses include **`actionLabels`**: a map from stable action key → human-readable label built from roadmap stage titles and action text (string or object entries), with a deterministic fallback when titles are missing.

## Privacy

`insightTimeline.service` emits events only when backing fields exist (assessment completed, AI report present, fallback flags, career recommendations block, low confidence threshold, legacy markers, roadmap progress updates with keys, CV fields on a stored result).

## Privacy

All `/api/assessment/analytics/*` Phase 7 routes require auth and resolve the user from the JWT — **no cross-user reads** (same pattern as `assertReadableUserId` elsewhere).
