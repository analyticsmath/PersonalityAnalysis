# Assessment data model (Phase 2)

## Active canonical models

### `AssessmentSession` (`backend/models/AssessmentSession.js`, collection `assessmentflowsessions`)

Primary document for the **CV-driven adaptive assessment**.

- **Identity:** Mongo `_id` exposed to clients as `sessionId` string in API responses (`toPublicSession`).
- **Lifecycle:** `status` (`in_progress` / `completed`), `stage` (legacy string keys `cv_upload`, `questionnaire`, `behavior`, `result` + internal states), TTL via `expiresAt`.
- **Answers:** Unified answer records (`unifiedAnswers` / hydrated legacy `answers` views) — see `unified-contracts.service.js`.
- **Adaptive:** `questionPlan`, `adaptiveMetrics` (includes `lastIdempotencyKey`, prefetch fields), `currentQuestionIndex`, `behaviorPrompts`, etc.
- **Scoring linkage:** `resultId` → `AssessmentResult`.
- **Result-side UX:** `chatHistory`, `progressEvents`, denormalized legacy result fields (marked deprecated in schema comments).

**Indexes (selected):** partial unique `{ userId, status }` for a single `in_progress` session; `{ userId, status, updatedAt: -1 }`; `{ status, stage, updatedAt: -1 }`; TTL on `expiresAt`.

### `AssessmentResult` (`backend/models/AssessmentResult.js`)

Persisted scoring + narrative payload for a completed adaptive run.

- **Links:** `userId`, `sessionId` (unique, indexed).
- **Score metadata:** trait vectors, facet scores, `scoreSource` / confidence fields (see schema — consumed by report guards and honest chart gating).

### `User` (`backend/models/User.js`)

Authentication and cross-session preferences; assessment-specific counters may live here (e.g. asked questions).

## Legacy / compatibility

### `LegacyAssessmentSession` (`legacyassessmentsessions` / `assessmentsessions` collection per model file)

Pre-adaptive static questionnaire sessions (`Question` refs, Likert answers). **No new writes** from the active adaptive pipeline.

### `AssessmentFlowSession.js` model file

Deprecated **re-export alias** of `AssessmentSession` — prefer importing `AssessmentSession` directly.

## Session vs result

1. User builds **`AssessmentSession`** while in progress (CV, questions, behavior).
2. On completion / scoring, service layer creates or updates **`AssessmentResult`** and sets `session.resultId`.
3. Report generation reads **`AssessmentResult`** and guarded score metadata; session may hold duplicate summary fields for backward compatibility.

## Where status lives

- **Orchestration stage:** `AssessmentSession.stage` (normalized in API via `assessment-state-machine.service` `toSessionState`).
- **Normalized API state:** `state.stage`, `state.allowedActions`, `state.scoreStatus`, `state.reportStatus`, `state.progress` — returned on active session reads (Phase 1 contract).

## Migration notes

- Older API mounts (`/api/assessments`, `/api/cv`, …) remain with deprecation headers; new code should use `/api/assessment/*` only.
- Static questionnaire UI is isolated at **`/legacy/assessment-static`** in the frontend; data may still use legacy session APIs under `/api/assessment/legacy/*`.
