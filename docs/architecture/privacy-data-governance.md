# Privacy & data governance (Phase 8)

This document describes **what data exists in this codebase**, **why it is processed**, **how long it is kept by default**, and **what user controls exist**. It is **product and engineering transparency**, not legal advice, and **does not claim GDPR, SOC 2, HIPAA, or other regulatory compliance**.

## Data categories & storage

| Category | Primary storage | Purpose |
|----------|-----------------|---------|
| Account identity | `User` (`users` collection): name, email, auth provider fields, optional avatar, `askedQuestions`, `preferredCareerLens` | Authentication, UX, adaptive question de-duplication memory |
| CV upload & raw text | `AssessmentSession.cvRawText`, `AssessmentSession.cvData` | Personalize adaptive questions and career signals for the active flow |
| Manual profile | Same session fields plus `manualProfileArtifact` (sanitized summary + injection heuristics metadata) | Same pipeline as CV without file upload |
| Consent | `AssessmentSession.profileConsent`, `AssessmentSession.profileSource` | Transparency for profile processing path |
| Adaptive answers | `AssessmentSession.answers` (unified), legacy mirrors | Scoring inputs |
| Scores & evidence | `AssessmentResult.scores`, `scoreMeta`, `evidence`, `personality`, `behavior` | Deterministic reporting and analytics |
| Career recommendations & roadmaps | `AssessmentResult.career`, `careerRecommendations` | Career intelligence UX |
| AI reports | `AssessmentResult.analytics.aiReport` | Optional narrative layer |
| Coach / chat | `AssessmentSession.chatHistory` | Post-result conversational UX |
| Analytics history | Derived reads from `AssessmentResult` (Phase 7 services) | Dashboards, trends, timelines (real stored data only) |
| Roadmap progress | `CareerRoadmapProgress` | Checkbox completion for deterministic roadmap keys |
| AI audit (in-process) | In-memory ring buffer in `aiAudit.service` (not Mongo) | Engineering diagnostics; **not exported** in account JSON export |

## Retention stance

Aligned with `backend/config/dataRetention.constants.js`:

- Data is retained until the user deletes it via **Privacy controls** (`/account/privacy`) or deletes their account.
- No automatic inactivity purge is applied by default in this deployment.

## User controls (API + UI)

| Action | API | UI |
|--------|-----|-----|
| Export JSON | `GET /api/account/export` | Privacy page — download |
| Delete profile / CV fields | `DELETE /api/account/profile-data` with `{ "confirm": true }` | Privacy page — clears structured CV/manual fields and scrubs narrative/evidence pointers as implemented in `accountData.service` |
| Delete one assessment | `DELETE /api/account/assessment/:resultId` with `{ "confirm": true }` | Privacy page — requires result id |
| Delete account | `DELETE /api/account` with `{ "confirm": true }` | Privacy page — **hard deletes** user, sessions, results, roadmap rows |

Exact deletion semantics are implemented in `backend/services/account/accountData.service.js` and should be updated there first when behavior changes.

## AI processing notes

- CV text and manual profile text are passed to models **only as labeled user-data blocks** where applicable (`wrapUntrustedUserContent`).
- Heuristic **prompt-injection scanning** flags suspicious phrases; it does not silently execute user instructions as system directives.
- **Do not log raw manual profile or CV text** in application logs for privacy; use metadata counts instead.

## Audit / redaction

- Export excludes password hashes and server secrets.
- Raw in-process AI audit payloads are not part of the portable export.

## Limitations

- AI outputs can be wrong; users should not rely on them as sole evidence for high-stakes decisions.
- This document may lag code briefly; the source of truth is the services and models referenced above.
