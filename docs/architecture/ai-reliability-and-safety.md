# AI reliability and safety (Phase 5)

This document summarizes how the platform keeps **AI surfaces bounded**, **outputs schema-checked**, **failures non-fatal**, and **telemetry privacy-preserving**—without moving numeric scoring or career-fit math into models.

## Principles

- **Deterministic ownership:** Phase 3 scores and Phase 4 career intelligence (fit numbers, gaps, roadmaps) are computed in Node.js. AI writes **narrative and coaching text only**.
- **Guidance, not authority:** No clinical diagnosis, no hiring/firing claims, no protected-class inference, no “guaranteed outcomes.”
- **Fail open on AI, not on scores:** If OpenAI is missing, times out, or returns invalid JSON, users still receive deterministic summaries and stored career intelligence.

## AI surfaces (inventory)

| AI Surface | Location | Purpose | Structured output | Safety guard | Fallback |
| --- | --- | --- | --- | --- | --- |
| Dashboard AI report | `services/aiService.js`, `Controllers/aiController.js` | JSON personality narrative + narrative career blurbs | `report-narrative-v1` via `aiSchemas.js` | Local output scan + moderation stub | `aiFallbacks.service.js` template |
| Adaptive result narrative | `services/ai-result-narrative.service.js` | Post-assessment summary tied to Phase 3/4 context | Mapped to `report-narrative-v1` | Injection scan on profile blob + output scan | Deterministic `fallbackNarrative` |
| Career coach chat | `services/assessment/career-chatbot.service.js` | Profile-grounded Q&A | `career-coach-v1` JSON | Crisis/clinical fast-path + injection wrapper | `buildStructuredCoachFallback` |
| CV parse (structured) | `services/assessment/cvAnalysis.service.js` | ATS-style extraction | Legacy CV schema (existing) | User text treated as data in prompts + **magic-byte / extension validation** | Heuristic parser |
| Manual profile (structured) | `services/assessment/manualProfile.service.js` | Same adaptive pipeline without file upload | Normalized CV-shaped payload | Strip tags / length limits + **injection scan** + `wrapUntrustedUserContent` blocks | Reject insufficient text |
| CV intelligence profile | `services/ai-cv-intelligence.service.js` | Profile vector hints | Normalized profile object | Output scan (light) | `buildFallbackProfile` |
| Adaptive question refinement / generation | `question-refiner`, `ai-question-generator` | Question text assistance | Partial / legacy | Prompt rules in services | Internal templates |

## Orchestrator / provider layer

- **`aiOrchestrator.service.js`:** `runOrchestratedAiCall` wraps OpenAI Responses calls with timeout + single retry (`aiProvider.service.js`). Missing API keys short-circuit without throwing.
- **`aiProvider.service.js`:** `runOpenAiResponses` uses `Promise.race` for hard timeouts and classifies retryable transport errors.
- **`aiAudit.service.js`:** Ring buffer of redacted events (`promptId`, `promptVersion`, `schemaValidated`, `fallbackUsed`, `latencyMs`, hashed ids). **No** raw CV blobs, full answers, or chat transcripts.
- **`aiOutputValidator.service.js`:** JSON repair (`parseWithRepair`) + schema validators in `aiSchemas.js`.

## Structured schemas (`aiSchemas.js`)

- **Report narrative (`report-narrative-v1`):** `summary`, `strengths`, `growthAreas`, `communicationStyle`, `leadershipStyle`, `workStyle`, `careerGuidance` (array of strings; legacy single string accepted), `learningRecommendations`, `confidenceNotes`, `disclaimers`, `safetyFlags`, `version`.
- **Career coach (`career-coach-v1`):** `answer`, `referencedScores`, `referencedCareers`, `suggestedNextSteps`, `uncertaintyNotes`, `safetyFlags`, `shouldEscalateToHuman`, `version`.
- **CV enhancement (`cv-enhancement-v1`)** and **adaptive questions (`adaptive-question-v1`)** validate optional AI surfaces when those endpoints return model JSON.

## Prompt governance

- **`aiPromptRegistry.js`** aggregates metadata objects under `services/ai/prompts/*.prompt.js`.
- Each entry includes `promptId`, `version`, `purpose`, `allowedInputs`, `forbiddenClaims`, `outputSchemaId`, `safetyRules`, and `lastUpdated`.
- Personality report copy is versioned in `prompts/personalityReport.prompt.js` (`PROMPT_VERSION`).

## Prompt injection handling

- **`aiPromptInjectionGuard.service.js`** scans for common jailbreak phrases with low false-positive design.
- Suspicious text is **flagged** (not hard-blocked) and wrapped with `wrapUntrustedUserContent` so models treat payloads as **data, not instructions**.
- Flags surface in chat `safetyFlags` and audit `injectionFlags` (pattern ids only).
- **Phase 8:** manual profile submissions run the same scanner; suspicious patterns add **warnings** on the normalized manual artifact returned to the client (not hard-blocked unless validation fails).

## Moderation / safety

- **`aiSafety.service.js`** implements deterministic pattern checks (self-harm, clinical tone, hiring authority, protected-class phrasing, illegal advice, over-certainty).
- `runLocalModerationStub` mirrors future OpenAI moderation wiring; today it is fully local for CI.
- Crisis-seeking user messages receive supportive escalation copy without region-specific hotlines.

## Fallback behavior

- Missing key / provider errors / invalid JSON → **template narrative** with `aiStatus.fallbackUsed=true` and `provider: local_fallback`.
- Chat failures → structured coach fallback grounded in stored recommendations.
- **Career recommendations endpoint** never depends on AI; it serves deterministic Phase 4 payloads.

## `aiStatus` shape (API)

```json
{
  "status": "ready | generating | failed | fallback | skipped",
  "provider": "openai | local_fallback | none",
  "promptVersion": "string",
  "schemaValidated": true,
  "safetyChecked": true,
  "fallbackUsed": false,
  "errorCode": null,
  "latencyMs": 123,
  "model": "configured-openai-model-or-deterministic-fallback"
}
```

Persisted on `AssessmentResult.analytics.aiReport.aiStatus` for dashboard reports when generated.

## Frontend status badges (Phase 6)

- `AiStatusBadges` (`frontend/src/components/results/AiStatusBadges.jsx`) renders **compact, user-facing** labels derived from the same `aiStatus` object:
  - **Fallback summary** when `fallbackUsed` or `status === "fallback"`.
  - **Preliminary insight** when `status === "skipped"`.
  - **AI-assisted** / **AI generating** for successful / in-progress narrative paths.
  - **AI checked** when the automated safety pipeline ran (`safetyChecked`).
  - **Safety limited** when `errorCode` suggests moderation-style limits (heuristic on known codes).
- **Technical detail** (prompt version, provider, latency, model, schema validated) is kept in the **native `title` tooltip** on each pill — not as noisy inline jargon.

## Privacy rules for logging

- Audit events store **metadata only** (lengths, ids redacted, flags).
- Never log raw CV text, full answer payloads, or entire chat transcripts.

## Related docs

- `assessment-api-contract.md` — HTTP fields for `ai_status`, chat coach payloads.
- `career-intelligence-engine.md` — deterministic ownership of fit scores.
- `scoring-methodology.md` — Phase 3 numeric ownership.
