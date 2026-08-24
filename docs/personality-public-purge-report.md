# Personality Assessor — Public Frontend Purge Safety & Dependency Report

Date: 24 August 2026
Baseline Commit: `0418fbb4b66fc3828429bc6e959aaeccc6d9089e`

## Candidate Purge Directories & Verification

| Path | Importing Files | Protected App Dependency? | Deletion Decision |
| :--- | :--- | :--- | :--- |
| `frontend/src/components/personality-atlas/` | `src/App.js`, `src/pages/editorial/*`, tests | NO | **PURGE / RETIRE** |
| `frontend/src/styles/personality-atlas/` | `src/main.jsx`, `scripts/check-light-theme-consistency.js` | NO | **PURGE / RETIRE** |
| `frontend/src/content/personality-atlas/` | `src/components/personality-atlas/*`, `src/pages/editorial/*` | NO | **PURGE / RETIRE** |
| `frontend/public/media/context-atlas/` | `src/content/personality-atlas/mediaManifest.js` | NO | **PURGE / RETIRE** |
| `frontend/public/motion/context-atlas-transform.lottie` | `src/components/personality-atlas/how/LottieTransformScene.jsx` | NO | **PURGE / RETIRE** |
| `frontend/src/components/personality-v7/` | `src/pages/PublicNotFoundPage.jsx` | NO | **PURGE / RETIRE** |
| `frontend/src/styles/personality-v7/` | `src/main.jsx` | NO | **PURGE / RETIRE** |
| `frontend/src/content/personality-v7/` | `src/pages/PublicNotFoundPage.jsx`, `src/media-integrity.test.js` | NO | **PURGE / RETIRE** |
| `frontend/public/media/evidence-in-context/` | `src/content/personality-v7/mediaManifest.js` | NO | **PURGE / RETIRE** |
| `frontend/src/components/personality-v6/` | None (Unused historical archive) | NO | **PURGE / RETIRE** |
| `frontend/src/styles/personality-v6/` | None (Unused historical archive) | NO | **PURGE / RETIRE** |
| `frontend/src/content/personality-v6/` | None (Unused historical archive) | NO | **PURGE / RETIRE** |
| `frontend/src/components/personality-v5/` | None (Unused historical archive) | NO | **PURGE / RETIRE** |
| `frontend/src/styles/personality-v5/` | None (Unused historical archive) | NO | **PURGE / RETIRE** |
| `frontend/src/components/personality-v4/` | None (Unused historical archive) | NO | **PURGE / RETIRE** |
| `frontend/src/styles/personality-v4/` | None (Unused historical archive) | NO | **PURGE / RETIRE** |
| `frontend/src/content/personality-v4/` | None (Unused historical archive) | NO | **PURGE / RETIRE** |
| `frontend/src/utils/personality-v4/navigation.js` | `src/pages/Auth/LoginPage.js`, `src/pages/Auth/SignupPage.js`, `src/pages/PublicNotFoundPage.jsx` | NO (Public auth utility) | **MIGRATE to `src/utils/public-experience/navigation.js` then PURGE** |
| `frontend/public/media/personality-v2/` | None | NO | **PURGE / RETIRE** |
| `frontend/public/media/personality-v3/` | `src/components/editorial/EditorialHero.jsx` (Legacy) | NO | **PURGE / RETIRE** |
| `frontend/public/media/personality-v4/` | None | NO | **PURGE / RETIRE** |
| `frontend/public/media/personality-v6/` | None | NO | **PURGE / RETIRE** |
| `frontend/public/media/personality-imprint/` | None | NO | **PURGE / RETIRE** |
| `frontend/src/pages/editorial/*.css` | None | NO | **PURGE / RETIRE** |

## Protected Application Roots Verified Untouched
- `/dashboard` -> `src/pages/Dashboard/index.js` (Preserved)
- `/analytics` -> `src/pages/AnalyticsPage.jsx` (Preserved)
- `/account/privacy` -> `src/pages/PrivacyControlsPage.jsx` (Preserved)
- `/assessment/start` -> `src/pages/AssessmentFlow/StartPage.js` (Preserved)
- `/assessment/test` -> `src/pages/AssessmentFlow/TestPage.js` (Preserved)
- `/assessment/behavior` -> `src/pages/AssessmentFlow/BehaviorPage.js` (Preserved)
- `/assessment/career` -> `src/pages/AssessmentFlow/CareerExplorerPage.jsx` (Preserved)
- `/assessment/result` -> `src/pages/AssessmentFlow/ResultPage.js` (Preserved)
- `/result/:assessmentId` -> `src/pages/Result/index.js` (Preserved)
- API Services & AuthStore: `src/api/*`, `src/store/*`, `src/hooks/useAuth.js` (Preserved)
- Canonical Career Database: `src/content/careers.json` (Preserved)
