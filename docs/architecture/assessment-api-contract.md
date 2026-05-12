# Assessment API contract (Phase 2 + Phase 3)

Canonical active assessment traffic uses **`/api/assessment/*`** (mounted in `backend/server.js` as `app.use('/api/assessment', assessmentFlowRoutes)`). All routes on this router require `authMiddleware` (Bearer JWT).

## Canonical user journey (frontend)

1. `/assessment/start` — CV / profile wizard (`assessmentFlowApi.uploadCv`, `startAdaptiveAssessment`)
2. `/assessment/test` — adaptive questions (`getAdaptiveQuestion`, `submitAdaptiveAnswer`, …)
3. `/assessment/behavior` — behavior prompts when applicable
4. `/assessment/result` — scoring + report UX (`getAssessmentFlowResult`, PDF, chat)

`/assessment` redirects to `/assessment/start` **preserving the query string**.

## Response shape

Most handlers use `utils/response.js` `sendSuccess`:

```json
{
  "success": true,
  "data": {},
  "message": "OK"
}
```

**Session read endpoints** `GET /api/assessment/session/active` and `GET /api/assessment/:id` also include:

```json
{
  "meta": {
    "requestId": "…",
    "timestamp": "ISO-8601"
  }
}
```

`requestId` is taken from the `x-request-id` request header when present; otherwise a UUID is generated.

Errors from `middleware/errorHandler.js` remain **flat** for compatibility:

```json
{ "success": false, "message": "…" }
```

Structured errors (`success` + `error` + `meta`) are available via `utils/apiResponse.js` `sendStructuredError` for incremental adoption.

## Canonical route list (ACTIVE_CANONICAL)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/assessment/cv/upload` | CV upload + parse into session |
| GET | `/api/assessment/session/active` | Active in-progress flow session + normalized `state` |
| POST | `/api/assessment/start` | Start / continue adaptive flow |
| GET | `/api/assessment/:id` | Session by id (user-scoped) |
| GET | `/api/assessment/:id/events` | SSE progress stream |
| GET | `/api/assessment/:id/question` | Current adaptive question |
| POST | `/api/assessment/:id/question/previous` | Previous question |
| POST | `/api/assessment/:id/answer` | Submit answer (expected-stage + idempotency) |
| GET | `/api/assessment/:id/career-recommendations` | Phase 4 deterministic career intelligence (recomputes if missing on stored result) |
| GET | `/api/assessment/:id/result/pdf` | PDF download |
| POST | `/api/assessment/:id/chat` | Career chat (post-result) |
| POST | `/api/assessment/:id/why-not` | Explain career exclusion |

## Active aliases on the same router (ACTIVE_ALIAS)

These are first-class for the product but are not “core session” verbs:

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/assessment/history/:userId` | Past assessments list (must match auth user) |
| GET | `/api/assessment/report/:assessmentId` | Legacy-shaped report fetch |
| POST | `/api/assessment/report/:assessmentId/ai` | AI narrative report |
| GET | `/api/assessment/dashboard/:userId` | Dashboard snapshot |
| GET | `/api/assessment/analytics/trends/:userId` | Trait trends (legacy path; requires `:userId` match token) |
| GET | `/api/assessment/analytics/compare` | Compare two assessments |
| GET | `/api/assessment/analytics/overview` | Phase 7 personal analytics overview (current user) |
| GET | `/api/assessment/analytics/history` | Phase 7 assessment history rows |
| GET | `/api/assessment/analytics/trends` | Phase 7 multi-dimensional trends (requires ≥2 eligible results for series) |
| GET | `/api/assessment/analytics/career-readiness` | Career readiness **indicator** (not hireability) |
| GET | `/api/assessment/analytics/skill-progress` | Skill gap snapshot + honest deltas when comparable |
| GET | `/api/assessment/analytics/timeline` | Insight timeline from stored events only |
| GET | `/api/assessment/analytics/report-history` | Report / AI presence per result |
| GET | `/api/assessment/analytics/roadmap-progress/:resultId/:careerId` | Roadmap completion keys for one career on a result |
| POST | `/api/assessment/analytics/roadmap-progress/:resultId/:careerId` | Replace completed roadmap action keys (body: `{ completedActionKeys: string[] }`) |

## Legacy routes on canonical router (LEGACY)

Mounted under **`/api/assessment/legacy/*`** for static questionnaire compatibility:

- `POST /legacy/session/start`
- `GET /legacy/session/:userId`
- `PATCH /legacy/session/:sessionId`
- `POST /legacy/save`

Frontend `assessmentApi.js` targets these paths only (not `/api/assessments`).

## Deprecated top-level mounts (DEPRECATED)

Still mounted for backward compatibility; responses include **`Deprecation`**, **`Sunset`**, and **`Link`** successor headers pointing at `/api/assessment/...`:

| Mount | Replacement |
|-------|-------------|
| `/api/assessments/*` | `/api/assessment/legacy/*` or flow routes |
| `/api/cv/upload` | `POST /api/assessment/cv/upload` |
| `/api/analytics/*` | `/api/assessment/analytics/*` |
| `POST /api/ai/report/:assessmentId` | `POST /api/assessment/report/:assessmentId/ai` |

**Frontend:** main adaptive journey uses **`assessmentFlowApi.js`** and **`assessmentApi.js`** only against `/api/assessment/*`. Do not wire new UI to `/api/cv`, `/api/ai`, or `/api/analytics`.

## Error codes (assessment flow)

| Code | HTTP | Meaning |
|------|------|---------|
| `ASSESSMENT_STAGE_CONFLICT` | 409 | `expectedStage` guard (Phase 1) |
| Various scoring/report strings | 409 | Report blocked before scoring / invalid score source (Phase 1 guards) |

Exact messages are asserted in backend Phase 1 tests.

## Phase 3 result summary fields (`mapResultToLegacySummary`)

Flow `GET /api/assessment/:id/result` returns `data.result` with legacy keys **plus**:

- `scores.bigFive` — formal trait blocks (`openness`, `conscientiousness`, `extraversion`, `agreeableness`, `emotionalStability`)
- `scores.riasec` — dimensions, `hollandCode`, `hollandCodePreliminary`
- `scores.workValues` — keyed value blocks
- `scores.careerSignals` — structured career signal metadata
- `meta` — chart gating + `scoringVersion`, `isFinal`, `missingEvidence`, `evidenceSources`, `generatedAt` / `generated_at`
- `evidence` — capped evidence list for transparency UI
- `warnings` — scoring warnings
- `career_recommendations_phase4` — persisted Phase 4 bundle (`version`, `locked`, `preliminary`, `recommendations` buckets, `topRecommendations`, `skillGapSummary`, `roadmaps`, `warnings`) when available; `null` for legacy results
- `ai_report` — optional dashboard AI narrative payload (includes `narrativeExtended` when present)
- `ai_status` — last known AI pipeline status (`schemaValidated`, `fallbackUsed`, `provider`, `promptVersion`, …)

## Phase 5 — coach + report safety fields

`POST /api/assessment/:id/chat` now returns, in addition to `answer` and `history`:

- `coachResponse` — structured JSON (`answer`, `referencedScores`, `referencedCareers`, `suggestedNextSteps`, `uncertaintyNotes`, `safetyFlags`, `shouldEscalateToHuman`, `version`)
- `aiStatus` — orchestration metadata (see `docs/architecture/ai-reliability-and-safety.md`)
- `safetyFlags` — merged injection + output safety flags for the UI

`POST /api/assessment/report/:assessmentId/ai` echoes `aiStatus` on success, cached, and duplicate-idempotency responses.

`GET /api/assessment/:id/career-recommendations` requires a Bearer token (**401** without). Session access is enforced via `getSessionForUser` (**403** for non-owners). Owners receive deterministic Phase 4 payloads independent of AI availability.

### `GET /api/assessment/:id/career-recommendations`

Returns `success: true` and `data` shaped as:

- `assessmentId` — session id string
- `scoreMeta` — copied from the stored result for transparency
- `careerProfileVersion` — e.g. `phase4-v1`
- `locked` / `preliminary` — gating flags
- `recommendations` — `{ bestFits, stretchFits, exploratoryFits, lowerFitButPossible }` (each an array of career objects with `fitScore`, `confidence`, `fitBreakdown`, `whyThisFits`, `skillGaps`, etc.)
- `topRecommendations`, `skillGapSummary`, `roadmaps`, `warnings`

When stored metadata is missing but Phase 3 scores exist, the handler recomputes deterministically from the result document and session CV/profile.

Dashboard `GET /api/assessment/report/:assessmentId` returns the same blocks on `report` (`scores`, `scoreMeta`, `evidence`, `warnings`).

Scoring error code constants live in `backend/services/scoring/scoringErrors.js` for reuse (not all are thrown as HTTP errors yet).

## Utilities

- `backend/utils/apiResponse.js` — `buildMeta`, `sendStructuredSuccess`, `sendStructuredError`
- `backend/utils/response.js` — `sendSuccess` / `sendError` (extended optional `meta` + `req`)
