# Runtime Verification and Real Data Audit (Phase 9)

## OpenAI setup
- Runtime uses `OPENAI_MODEL`, `OPENAI_TIMEOUT_MS`, and `OPENAI_MAX_OUTPUT_TOKENS` from `backend/config/env.js`.
- Missing key is supported and routes to deterministic fallback with `aiStatus.fallbackUsed=true`.

## Timeout/fallback behavior
- Provider timeout is bounded by `runOpenAiResponses(... timeoutMs ...)` and orchestration maps failures to fallback status codes.
- Invalid/auth errors are mapped to non-ready ai status and must not hang report generation.

## Smoke scripts
- `node backend/scripts/smoke-openai-provider.js`
- `node backend/scripts/smoke-ai-report-generation.js`
- `node backend/scripts/smoke-assessment-runtime.js`
- `node backend/scripts/smoke-graph-data-audit.js`

## Graph inventory summary
- Final result graphs must only render when `scoreMeta` is trusted and evidence-backed.
- Placeholder arrays (`50/51/60`) are rejected for non-trusted metadata.

## Repeated 51 root cause
- Legacy/unverified payload fallback and weak metadata defaults allowed uniform placeholder vectors to reach chart rendering.
- Guarding logic now blocks those vectors unless metadata proves deterministic validity.

## Fake graph policy
- No mock/default/placeholder graph data can render as final.
- Insufficient data must render empty/insufficient state.

## Scoring variance verification
- Added backend runtime matrix tests and deterministic runtime smoke to verify differing profile outcomes and evidence-based validity gates.
