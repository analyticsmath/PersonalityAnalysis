# Assessment API contract (Phase 2)

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
| GET | `/api/assessment/:id/result` | Result / scoring payload |
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
| GET | `/api/assessment/analytics/trends/:userId` | Trait trends |
| GET | `/api/assessment/analytics/compare` | Compare two assessments |

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

## Utilities

- `backend/utils/apiResponse.js` — `buildMeta`, `sendStructuredSuccess`, `sendStructuredError`
- `backend/utils/response.js` — `sendSuccess` / `sendError` (extended optional `meta` + `req`)
