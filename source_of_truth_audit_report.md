# PERSONALITY ASSESSOR — SOURCE OF TRUTH AUDIT

## 1. Executive Summary

**Personality Assessor** is an end-to-end, multi-stage psychometric evaluation, career intelligence, and personal analytics platform. It combines adaptive psychometric question queues, deterministic weighted multi-dimensional career matching, automated CV text extraction, deterministic trait scoring engines, and optional AI-driven narrative synthesis (via Groq or OpenAI).

### Primary Problem Solved
The platform bridges psychological self-discovery and practical career planning. Users receive objective evaluations of their Big Five personality traits (OCEAN), vocational interests (RIASEC), work values, and career signals, matched directly against curated career profiles (`careers.json`) and customizable career roadmaps.

### Target Audience & Core Personas
1. **Self-Evaluators / Job Seekers**: Complete adaptive assessments, upload CVs for skill extraction, receive personality insights, career recommendations, and actionable development roadmaps.
2. **Platform Administrators**: Superusers with schema and middleware support for administrative authority (`role: 'admin'`). Note: Administration exists strictly as a backend-only / schema-level capability; no dedicated admin frontend interface or admin-only API routes are implemented in the current product surface.

### Principal Functionality
- **Adaptive Psychometric Questionnaire**: Dynamic stage progression (`cv` → `profile` → `cognitive` → `behavior` → `summary` → `completed`), serving tailored questions and Likert/MCQ/Scenario/Text inputs.
- **Multidimensional Scoring Engine**: Deterministic calculation of OCEAN traits, RIASEC vocational codes, Work Values, and Career Signals with evidence-weighted scoring and confidence metrics. (Note: Cognitive Styles represent an assessment stage and question category, while Behavior Vectors represent intermediate evidence metadata feeding into primary trait scoring).
- **Career Matching System**: Real-time evaluation of user score vectors against 17 curated career profiles across 5 fit layers (RIASEC, Big Five, Work Values, Signals, Education) using deterministic weighted closeness algorithms.
- **CV / Resume Intelligence**: Automated extraction of text from PDF/DOCX files directly in-memory via `pdf-parse` and `mammoth`, using taxonomy keyword matching and optional AI enhancement.
- **Personal Analytics Hub**: Comprehensive tracking of assessment history, trait trends across attempts, skill progress, career readiness scores, and milestone roadmaps.
- **AI-Enhanced Narrative & Career Coaching**: Optional AI synthesis for detailed report narratives and interactive career coaching, with strict deterministic fallback capabilities when API keys are absent.

### Overall Implementation Maturity
The platform demonstrates **high source-level functional maturity** and **strong automated verification under isolated configuration**. Core functionality operates deterministically without external third-party service dependencies. Under an isolated test environment (with ambient `.env` overrides suppressed), 254 test cases (114 frontend, 140 backend) pass cleanly. In the local `.env` configuration, 10 backend tests fail due to test-harness configuration coupling with Groq settings. Code visual presentation and UI/UX polish remain a separate redesign concern.

---

## 2. Repository State and Audit Scope

### Repository Integrity Snapshot
- **Repository Root**: `d:\Projects\PersonalityAnalysis`
- **Git Branch**: `main` (tracking `origin/main`)
- **Git Commit**: `0f6535560b4a4cb698e6c70ebcfbc6b7e1bd2ff8` ("Polished phase3 hero stat & result page metric card themes")
- **Git Working Tree**: Clean working environment (all test suites and verification scripts validated without altering source code).

### Codebase Breakdown
- **Total Files**: 467 files (excluding `node_modules`, `.git`, `dist`, `build`, `coverage`).
  - **Backend Files**: 166 files (`backend/Controllers`, `backend/models`, `backend/routes`, `backend/services`, `backend/middleware`, `backend/config`, `backend/scripts`, `backend/tests`).
  - **Frontend Files**: 281 files (`frontend/src` components, pages, hooks, store, utils, api, styles, tests, assets).
  - **Documentation Files**: 11 files (`docs/architecture/`, `docs/audits/`, `docs/personality_analysis_runtime_closure_report.md`).
  - **Root Files**: 9 files (`package.json`, `package-lock.json`, `vercel.json`, `.env.example`, `.gitignore`, `.github/workflows/ci.yml`).

### Audit Execution Verification & Test Status
- **Frontend Test Suite (`npm run test --prefix frontend`)**: **114 passed / 0 failed (100% pass rate)** (Vitest runner across 24 test files).
- **Frontend Theme Consistency (`npm run check:theme --prefix frontend`)**: **Passed (0 light-theme violations)**.
- **Backend Syntax Check (`npm run check:syntax --prefix backend`)**: **Passed**.
- **Backend Test Suite (`node --test backend/tests/*.test.js`)**:
  - **Isolated Verification Configuration (Ambient `.env` suppressed / default setup)**: **140 passed / 0 failed (100% pass rate)**.
  - **With Local `backend/.env` Active (`AI_PROVIDER=groq`, `GROQ_API_KEY` set)**: **130 passed / 10 failed**.
    - *Empirical Analysis of Failing Assertions under Groq env*:
      - 8 unit tests in `repair-phase3-parameter-policy.test.js` test OpenAI reasoning model parameter sanitization (`gpt-5.5`). When `AI_PROVIDER=groq` is active in `.env`, `isReasoningModel` evaluates to `false` for Groq providers, bypassing temperature removal when default `config.aiProvider` is read. Passing `provider = 'openai'` or executing with `AI_PROVIDER=openai` yields 100% pass rate.
      - 1 test in `phase9-ai-runtime-matrix.test.js` checks missing API key fallback; when `GROQ_API_KEY` is present in `.env`, it attempts a network call returning HTTP 401 instead of `NO_API_KEY`.
      - 1 test in `repair-phase1-pdf-and-model.test.js` checks model fallback to `gpt-5.4-mini` when `OPENAI_MODEL` is absent; `AI_MODEL=openai/gpt-oss-120b` in `.env` overrides the default.
  - *Classification*: These 10 failures represent a test-harness configuration coupling issue rather than a runtime application defect.
  - *Code Coverage Note*: The pass count of 254 isolated tests demonstrates execution correctness across tested code paths; however, it should not be described as "100% code coverage" as no formal coverage tool (e.g., Istanbul/c8) report was executed in this pass.

---

## 3. Product Definition

**Personality Assessor** is an intelligence system that converts user answers, behavior choices, manual inputs, and CV text into structured psychological and career profiles.

### Primary User Workflows
1. **Adaptive Evaluation**:
   - Step 1: Optional CV upload or manual background profile submission.
   - Step 2: Adaptive cognitive and scenario questions tailored to profile context.
   - Step 3: Behavioral assessment through Likert and interactive scenario options.
   - Step 4: Instant generation of OCEAN, RIASEC, Work Values, and Career Signals scores.
2. **Career Exploration & Roadmapping**:
   - Direct matching against 17 career roles via deterministic weighted multi-dimensional closeness formulas, returning fit percentages, skill gap breakdowns, "Why Not" contrast analysis, and interactive career coaching.
3. **Analytics & Progress Tracking**:
   - Long-term tracking of personality evolution, skill acquisition, career readiness index, and actionable roadmap check-offs.
4. **Data Ownership & Privacy**:
   - Self-service data export (JSON format), per-assessment deletion, complete account deletion, and AI transparency controls.

---

## 4. User Personas and Roles

The system enforces user roles via `backend/models/User.js` (`role: { type: String, enum: ['user', 'admin'], default: 'user' }`) and provides middleware support via `backend/middleware/roleCheck.js` (`isAdmin`).

### Identified Roles & Surface Classification
1. **Unauthenticated Visitor**: Can view `/login` and `/signup`. Access to `/` redirects to `/login`.
2. **Authenticated User (`role: 'user'`)**: Can run assessments, upload CVs, view results, access dashboard/analytics, export/delete data, and chat with the AI career coach.
3. **Administrator (`role: 'admin'`)**: Backend schema and middleware support exist for the `admin` role. However, inspection of the codebase confirms that **no admin frontend page, navigation, or dashboard exists**, and **no mounted admin-only API routes exist** in production route files. Administration is strictly a **backend-only / schema-level capability** rather than a complete administrator UX.

### Role × Capability Matrix

| Capability | Unauthenticated Visitor | Authenticated User | Administrator | Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Login / Signup** | Allowed | Redirects to Dashboard | Redirects to Dashboard | [authRoutes.js](file:///d:/Projects/PersonalityAnalysis/backend/routes/authRoutes.js) |
| **View Dashboard** | Denied (Redirect) | Allowed | Allowed | [App.js](file:///d:/Projects/PersonalityAnalysis/frontend/src/App.js#L140) |
| **Start Assessment** | Denied (401) | Allowed | Allowed | [assessmentFlowRoutes.js](file:///d:/Projects/PersonalityAnalysis/backend/routes/assessmentFlowRoutes.js#L91) |
| **Upload CV / Manual Profile**| Denied (401) | Allowed | Allowed | [assessmentFlowRoutes.js](file:///d:/Projects/PersonalityAnalysis/backend/routes/assessmentFlowRoutes.js#L63-L64) |
| **Download PDF Report** | Denied (401) | Allowed (Owned session) | Allowed | [assessmentFlowController.js](file:///d:/Projects/PersonalityAnalysis/backend/Controllers/assessmentFlowController.js#L350) |
| **View Personal Analytics** | Denied (401) | Allowed (Current User) | Allowed | [personalAnalyticsController.js](file:///d:/Projects/PersonalityAnalysis/backend/Controllers/personalAnalyticsController.js) |
| **Export / Delete Account** | Denied (401) | Allowed (Confirmation required) | Allowed | [accountController.js](file:///d:/Projects/PersonalityAnalysis/backend/Controllers/accountController.js) |
| **Admin Frontend / Routes** | N/A (Does not exist) | N/A (Does not exist) | Backend Schema/Middleware Only | [roleCheck.js](file:///d:/Projects/PersonalityAnalysis/backend/middleware/roleCheck.js) |

---

## 5. Technology Stack

### Runtime & Core Frameworks
- **Backend Environment**: Node.js (`>=20.16.0 <21 || >=22.3.0`), Express `v5.1.0`.
- **Frontend Framework**: React `v19.1.0`, Vite `v7.1.11`, React Router DOM `v7.11.0`.
- **Database Layer**: MongoDB `v7.0.0`, Mongoose ORM `v8.20.2`.

### Frontend Libraries & Utilities
- **Server State / Fetching**: `@tanstack/react-query` `v5.99.0`, `axios` `v1.13.5`.
- **Authentication**: `@react-oauth/google` `v0.13.4`.
- **Styling**: Bootstrap `v5.3.6`, React-Bootstrap `v2.10.10`, Custom CSS System (`index.css`, `theme.css`, `phase6-ui.css`), `react-icons` `v5.5.0`, `react-hot-toast` `v2.6.0`.
- **Data Visualization**: `recharts` `v2.15.3`, `react-circular-progressbar` `v2.2.0`.
- **Animation & Motion**: `framer-motion` `v11.18.2`, `gsap` `v3.15.0`, `@barba/core` `v2.10.3`, `three` `v0.183.2`, `@react-three/fiber` `v9.5.0`, `@react-three/drei` `v10.7.7`.

### Backend Libraries & Infrastructure
- **Security & Middleware**: `bcrypt` `v6.0.0`, `jsonwebtoken` `v9.0.3`, `helmet` `v8.1.0`, `cors` `v2.8.5`, `compression` `v1.8.1`, `morgan` `v1.10.1`, `express-rate-limit` `v8.1.0`, `express-validator` `v7.3.1`.
- **File Parsing & Utility Management**: `multer` `v2.1.1` (in-memory storage), `pdf-parse` `v2.4.5`, `mammoth` `v1.12.0`, `sharp` `v0.34.4`, `cloudinary` `v2.8.0` (installed utility service, unused in active CV upload and PDF download runtime flows).
- **AI Integrations**: `openai` `v6.34.0` (interfaces OpenAI and Groq OpenAI-compatible REST endpoints).

---

## 6. System Architecture

```
                               ┌────────────────────────────────────────┐
                               │             React 19 Frontend          │
                               │  Vite, React Router v7, React Query    │
                               └───────────────────┬────────────────────┘
                                                   │ HTTPS / REST API
                                                   ▼
                               ┌────────────────────────────────────────┐
                               │           Express 5.1 Backend           │
                               │ Helmet, CORS, RateLimit, AuthMiddleware│
                               └───────┬────────────────────────┬───────┘
                                       │                        │
               ┌───────────────────────┴──────┐          ┌──────┴──────────────────────┐
               │  Deterministic Scoring & DB │          │    AI / External Services    │
               │  - Mongoose DB (MongoDB 7)   │          │  - Groq / OpenAI API        │
               │  - OCEAN, RIASEC, WorkValues │          │  - Google OAuth 2.0         │
               │  - Career Matcher (17 roles) │          │  - Cloudinary (Utility Only)  │
               └──────────────────────────────┘          └─────────────────────────────┘
```

---

## 7. Repository Architecture

- **`backend/Controllers/`**: HTTP handlers (`auth`, `assessmentFlow`, `account`, `analytics`, `ai`, `personalAnalytics`).
- **`backend/models/`**: 8 Mongoose model files containing 5 canonical active schemas (`User`, `AssessmentSession`, `AssessmentResult`, `CareerRoadmapProgress`, `Question`), 2 legacy schemas (`Assessment`, `LegacyAssessmentSession`), and 1 compatibility alias (`AssessmentFlowSession`).
- **`backend/routes/`**: Route registries (`assessmentFlowRoutes.js` is the canonical router mounted at `/api/assessment`; `authRoutes.js`, `googleAuth.routes.js`, `accountRoutes.js`, `questionRoutes.js` handle auth, account, and question operations; `assessmentRoutes.js`, `cvRoutes.js`, `aiRoutes.js`, `analyticsRoutes.js` are legacy wrappers with `Deprecation: true` headers).
- **`backend/services/`**: Core business domain logic partitioned into `scoring/`, `career/`, `ai/`, `analytics/`, `account/`, `assessment/`.
- **`frontend/src/pages/`**: Primary app views (`Dashboard`, `AssessmentFlow`, `AnalyticsPage`, `PrivacyControlsPage`, `TrustTransparencyPage`, `Auth`).
- **`frontend/src/components/`**: Modular UI components (`charts/`, `career/`, `analytics/`, `assessment/`, `privacy/`, `ui/`, `avatar/`, `3d/`).

---

## 8. Application Route / Page Inventory

| Route | Page/Screen | Public/Protected | Role | Purpose | Main Data Source | API Dependencies | Implementation Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Redirect | Public | Visitor / User | Entry route; redirects authenticated users to `/dashboard` and visitors to `/login`. | `AuthStore` state | None | `IMPLEMENTED` |
| `/login` | `LoginPage` | Public | Visitor | User authentication via email/password or Google OAuth. | Auth Form | `POST /api/auth/login`, `POST /api/auth/google` | `IMPLEMENTED` |
| `/signup` | `SignupPage` | Public | Visitor | New user registration. | Registration Form | `POST /api/auth/signup` | `IMPLEMENTED` |
| `/dashboard` | `DashboardPage` | Protected | User / Admin | Central hub displaying latest scores, career matches, and assessment progress. | `getDashboardSnapshot` | `GET /api/assessment/dashboard/:userId` | `IMPLEMENTED` |
| `/analytics` | `AnalyticsPage` | Protected | User / Admin | Long-term analytics tracking trait trends, skill progress, and timeline. | Personal Analytics Service | `GET /api/assessment/analytics/*` | `IMPLEMENTED` |
| `/assessment/start` | `StartPage` | Protected | User / Admin | Onboarding step for assessment flow (CV upload / manual profile). | Active Session | `POST /api/assessment/start`, `POST /api/assessment/cv/upload` | `IMPLEMENTED` |
| `/assessment/test` | `TestPage` | Protected | User / Admin | Main adaptive cognitive question answering page. | Question Queue | `GET /api/assessment/:id/question`, `POST /api/assessment/:id/answer` | `IMPLEMENTED` |
| `/assessment/behavior` | `BehaviorPage` | Protected | User / Admin | Behavioral scenario and Likert assessment page. | Session State | `POST /api/assessment/:id/answer` | `IMPLEMENTED` |
| `/assessment/career` | `CareerExplorerPage` | Protected | User / Admin | Interactive career role matching, skill gap analysis, and roadmap. | Career Matching Service | `GET /api/assessment/:id/career-recommendations` | `IMPLEMENTED` |
| `/assessment/result` | `ResultPage` | Protected | User / Admin | Comprehensive results dashboard (OCEAN radar, RIASEC, Work Values, AI Narrative). | Assessment Result Model | `GET /api/assessment/:id/result` | `IMPLEMENTED` |
| `/account/privacy` | `PrivacyControlsPage` | Protected | User / Admin | Self-service data export, per-assessment deletion, and AI transparency controls. | Account Service | `GET /api/account/export`, `DELETE /api/account` | `IMPLEMENTED` |
| `/trust` | `TrustTransparencyPage` | Protected | User / Admin | Platform disclaimers, scientific boundaries, and AI usage policies. | Static Content | None | `IMPLEMENTED` |
| `/legacy/assessment-static` | `LegacyStaticPage` | Protected | User / Admin | Backward-compatibility page for static 120-item Big Five questionnaire. | Question Model | `GET /api/questions`, `POST /api/assessment/legacy/save` | `LEGACY` |

---

## 9. Information Architecture

```
                                ┌───────────────────────────┐
                                │       App Shell           │
                                └─────────────┬─────────────┘
                                              │
        ┌───────────────────┬─────────────────┼───────────────────┬───────────────────┐
        ▼                   ▼                 ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Dashboard   │    │  Assessment  │  │  Analytics   │    │   Privacy    │    │    Trust     │
│  Overview    │    │  Wizard      │  │  Hub         │    │   Controls   │    │   & Safety   │
└──────────────┘    └───────┬──────┘  └──────────────┘    └──────────────┘    └──────────────┘
                            │
       ┌────────────────────┼────────────────────┬────────────────────┐
       ▼                    ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Start / CV   │    │  Cognitive   │    │  Behavioral  │    │  Result &    │
│ Onboarding   │    │  Adaptive    │    │  Scenarios   │    │  Career Fit  │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

---

## 10. Complete End-to-End User Journeys

### Journey 1: Adaptive Assessment Journey
1. **Initiation**: User clicks "Start Assessment" on Dashboard. Navigates to `/assessment/start`.
2. **Onboarding**: Option to upload CV (PDF/DOCX) or complete manual background profile. `POST /api/assessment/cv/upload` parses text in-memory and extracts skills, education, and subjects.
3. **Session Creation**: `POST /api/assessment/start` creates an `AssessmentSession` in MongoDB (`status: 'in_progress'`).
4. **Adaptive Testing**: Navigates to `/assessment/test`. The frontend calls `GET /api/assessment/:id/question`. System serves questions from `adaptiveQuestionBank.js` dynamically based on previous answers.
5. **Behavior Testing**: Navigates to `/assessment/behavior`. User responds to situational scenarios and Likert options (`POST /api/assessment/:id/answer`).
6. **Scoring & Completion**: Once final stage is completed, `assessmentScoringOrchestrator.service.js` calculates OCEAN traits, RIASEC scores, Work Values, and Career Signals. An `AssessmentResult` record is written to MongoDB, and session status converts to `completed`.
7. **Results View**: User is redirected to `/assessment/result` displaying trait radar charts, career fits, and PDF export option.

### Journey 2: Career Intelligence & Coaching Journey
1. User opens `/assessment/career` or clicks a career card on `/assessment/result`.
2. Frontend queries `GET /api/assessment/:id/career-recommendations`. Backend evaluates score maps against 17 career definitions in `careers.json` using `careerMatching.service.js`.
3. User expands a career card to view skill gaps, required subjects, and interactive roadmap milestones.
4. User submits a question in the AI Career Coach chat box (`POST /api/assessment/:id/chat`). Backend executes `career-chatbot.service.js` using OpenAI/Groq or fallback responses.

### Journey 3: Privacy & Account Management Journey
1. User navigates to `/account/privacy`.
2. User requests data backup via "Export My Data" (`GET /api/account/export`). Backend returns a full JSON file containing user profile, assessment sessions, and results.
3. User deletes a single assessment (`DELETE /api/account/assessment/:resultId`) or initiates full account deletion (`DELETE /api/account`). Confirm parameter (`confirm: true`) is validated by `assertConfirm()`.

---

## 11. Master Feature Catalog

| ID | Feature | User Role | Entry Point | Frontend Component | Backend Route | Database Entity | Status | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `AUTH-001` | Password Authentication | Visitor | `/login`, `/signup` | `LoginPage`, `SignupPage` | `POST /api/auth/login`, `POST /api/auth/signup` | `User` | `IMPLEMENTED` | [authRoutes.js](file:///d:/Projects/PersonalityAnalysis/backend/routes/authRoutes.js) |
| `AUTH-002` | Google OAuth Login | Visitor | `/login` | `GoogleLoginButton` | `POST /api/auth/google` | `User` | `IMPLEMENTED_WITH_CONFIGURATION` | [googleAuth.routes.js](file:///d:/Projects/PersonalityAnalysis/backend/routes/googleAuth.routes.js) |
| `ASSESS-001` | Adaptive Assessment | User | `/assessment/start` | `StartPage`, `TestPage`, `BehaviorPage` | `POST /api/assessment/start`, `POST /api/assessment/:id/answer` | `AssessmentSession` | `IMPLEMENTED` | [assessmentFlowController.js](file:///d:/Projects/PersonalityAnalysis/backend/Controllers/assessmentFlowController.js) |
| `ASSESS-002` | Legacy 120-Item Big Five | User | `/legacy/assessment-static` | `LegacyStaticPage` | `GET /api/questions`, `POST /api/assessment/legacy/save` | `Question`, `LegacyAssessmentSession` | `LEGACY` | [assessmentController.js](file:///d:/Projects/PersonalityAnalysis/backend/Controllers/assessmentController.js) |
| `CV-001` | CV PDF/DOCX Parsing | User | `/assessment/start` | `StepCV` | `POST /api/assessment/cv/upload` | `AssessmentSession.cvData` | `IMPLEMENTED` | [cvAnalysis.service.js](file:///d:/Projects/PersonalityAnalysis/backend/services/assessment/cvAnalysis.service.js) |
| `CAREER-001` | Career Fit Engine | User | `/assessment/career` | `CareerExplorerPage` | `GET /api/assessment/:id/career-recommendations` | `AssessmentResult` | `IMPLEMENTED` | [careerMatching.service.js](file:///d:/Projects/PersonalityAnalysis/backend/services/career/careerMatching.service.js) |
| `CAREER-002` | Interactive Career Coach | User | `/assessment/result` | `ResultPage` | `POST /api/assessment/:id/chat` | `AssessmentSession.chatHistory` | `CONFIGURATION_DEPENDENT` | [career-chatbot.service.js](file:///d:/Projects/PersonalityAnalysis/backend/services/assessment/career-chatbot.service.js) |
| `ANALYTICS-001`| Personal Analytics Hub | User | `/analytics` | `AnalyticsPage` | `GET /api/assessment/analytics/*` | `AssessmentResult` | `IMPLEMENTED` | [personalAnalyticsController.js](file:///d:/Projects/PersonalityAnalysis/backend/Controllers/personalAnalyticsController.js) |
| `REPORT-001` | PDF Report Generation | User | `/assessment/result` | `ResultPage` | `GET /api/assessment/:id/result/pdf` | `AssessmentResult` | `IMPLEMENTED` | [pdf-report.service.js](file:///d:/Projects/PersonalityAnalysis/backend/services/assessment/pdf-report.service.js) |
| `PRIVACY-001` | Data Export & Deletion | User | `/account/privacy` | `PrivacyControlsPage` | `GET /api/account/export`, `DELETE /api/account` | `User`, `AssessmentSession`, `AssessmentResult` | `IMPLEMENTED` | [accountController.js](file:///d:/Projects/PersonalityAnalysis/backend/Controllers/accountController.js) |

---

## 12. Feature Traceability

```
UI Component (ResultPage.js)
  └─► Client API Hook (useAssessmentFlow.js)
        └─► HTTP Client (client.js -> GET /api/assessment/:id/career-recommendations)
              └─► Auth Middleware (authMiddleware.js)
                    └─► Controller (assessmentFlowController.getCareerRecommendations)
                          └─► Service (careerRecommendationOrchestrator.service.js)
                                ├─► Database Query (AssessmentResult.findById)
                                ├─► Engine (careerMatching.service.js score evaluation against careers.json)
                                └─► Optional AI Enhancement (ai-career-intelligence.service.js)
                                      └─► HTTP Response (JSON Response Envelope)
```

---

## 13. API Inventory

The repository mounts **41 distinct API endpoints** across system, auth, account, flow, dashboard, analytics, and legacy routes.

| Method | Endpoint | Auth Required | Validation | Handler | Primary Entity | Service/Dependency | Classification | Response Envelope | Frontend Consumer |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | No | None | `server.js` | None | None | `CANONICAL` / `HEALTH` | `{ success: true, data: { status: 'ok' } }` | External Monitoring |
| `GET` | `/api/health` | No | None | `server.js` | None | None | `CANONICAL` / `HEALTH` | `{ status: 'ok', dataRetention: {...} }` | External Monitoring |
| `POST` | `/api/auth/google` | No | Google token verify | `googleAuth.controller.js` | `User` | Google OAuth API | `CANONICAL` | `{ success, data: { token, user } }` | `GoogleLoginButton.jsx` |
| `POST` | `/api/auth/signup` | No | `validateSignup` | `authRoutes.js` | `User` | bcrypt | `CANONICAL` | `{ success, data: { userId, role } }` | `SignupPage.js` |
| `POST` | `/api/auth/login` | No | `validateLogin` | `authRoutes.js` | `User` | bcrypt, JWT | `CANONICAL` | `{ success, data: { token, user } }` | `LoginPage.js` |
| `GET` | `/api/auth/me` | Yes | Token verify | `authRoutes.js` | `User` | None | `CANONICAL` | `{ success, data: { id, name, email } }` | `AuthStore.js` |
| `GET` | `/api/account/export` | Yes | User ID | `accountController.js` | All User Models | None | `CANONICAL` | JSON file attachment | `PrivacyControlsPage.jsx` |
| `DELETE`| `/api/account/profile-data` | Yes | `assertConfirm` | `accountController.js` | `User` | None | `CANONICAL` | `{ success, message }` | `PrivacyControlsPage.jsx` |
| `DELETE`| `/api/account/assessment/:resultId` | Yes | `assertConfirm` | `accountController.js` | `AssessmentResult` | None | `CANONICAL` | `{ success, message }` | `PrivacyControlsPage.jsx` |
| `DELETE`| `/api/account` | Yes | `assertConfirm` | `accountController.js` | User & Sessions | None | `CANONICAL` | `{ success, message }` | `DataDeletionPanel.jsx` |
| `POST` | `/api/assessment/cv/upload` | Yes | Multer 6MB max | `assessmentFlowController.js` | `AssessmentSession` | pdf-parse, mammoth | `CANONICAL` | `{ success, data: { cvData } }` | `StepCV.jsx` |
| `POST` | `/api/assessment/profile/manual` | Yes | Payload check | `assessmentFlowController.js` | `AssessmentSession` | None | `CANONICAL` | `{ success, data: { session } }` | `StepCV.jsx` |
| `GET` | `/api/assessment/session/active` | Yes | Token verify | `assessmentFlowController.js` | `AssessmentSession` | None | `CANONICAL` | `{ success, data: { session } }` | `useAssessmentWizard.js` |
| `POST` | `/api/assessment/start` | Yes | Session check | `assessmentFlowController.js` | `AssessmentSession` | None | `CANONICAL` | `{ success, data: { sessionId } }` | `useAssessmentWizard.js` |
| `GET` | `/api/assessment/:id` | Yes | Session ID | `assessmentFlowController.js` | `AssessmentSession` | None | `CANONICAL` | `{ success, data: { session } }` | `TestPage.js` |
| `GET` | `/api/assessment/:id/events` | Yes | Session ID | `assessmentFlowController.js` | `AssessmentSession` | SSE stream | `CANONICAL` | SSE event stream | `useAssessmentWizard.js` |
| `GET` | `/api/assessment/:id/question` | Yes | Session ID | `assessmentFlowController.js` | `AssessmentSession` | Question Engine | `CANONICAL` | `{ success, data: { question } }` | `TestPage.js` |
| `POST` | `/api/assessment/:id/question/previous` | Yes | Session ID | `assessmentFlowController.js` | `AssessmentSession` | Question Engine | `CANONICAL` | `{ success, data: { question } }` | `TestPage.js` |
| `POST` | `/api/assessment/:id/answer` | Yes | Payload check | `assessmentFlowController.js` | `AssessmentSession` | Scoring Engine | `CANONICAL` | `{ success, data: { isComplete } }` | `TestPage.js`, `BehaviorPage.js` |
| `GET` | `/api/assessment/:id/result` | Yes | Session ID | `assessmentFlowController.js` | `AssessmentResult` | Result Engine | `CANONICAL` | `{ success, data: { result } }` | `ResultPage.js` |
| `GET` | `/api/assessment/:id/result/pdf` | Yes | Result ID | `assessmentFlowController.js` | `AssessmentResult` | Native Stream PDF | `CANONICAL` | Binary PDF Buffer | `ResultPage.js` |
| `GET` | `/api/assessment/:id/career-recommendations` | Yes | Session ID | `assessmentFlowController.js` | `AssessmentResult` | `careers.json` | `CANONICAL` | `{ success, data: { recommendations } }` | `CareerExplorerPage.jsx` |
| `POST` | `/api/assessment/:id/chat` | Yes | Message text | `assessmentFlowController.js` | `AssessmentSession` | Groq / OpenAI / Fallback | `CANONICAL` | `{ success, data: { reply } }` | `ResultPage.js` |
| `POST` | `/api/assessment/:id/why-not` | Yes | Role ID | `assessmentFlowController.js` | `AssessmentResult` | Contrast Engine | `CANONICAL` | `{ success, data: { contrast } }` | `CareerExplorerPage.jsx` |
| `GET` | `/api/assessment/dashboard/:userId` | Yes | User ID | `assessmentController.js` | User & Results | Dashboard Service | `CANONICAL` | `{ success, data: { dashboard } }` | `DashboardPage.jsx` |
| `GET` | `/api/assessment/history/:userId` | Yes | User ID | `assessmentController.js` | `AssessmentResult` | Analytics Service | `CANONICAL` | `{ success, data: { history } }` | `DashboardPage.jsx` |
| `GET` | `/api/assessment/report/:assessmentId` | Yes | Result ID | `assessmentController.js` | `AssessmentResult` | Report Service | `CANONICAL` | `{ success, data: { report } }` | `ResultPage.js` |
| `POST` | `/api/assessment/report/:assessmentId/ai` | Yes | Result ID | `aiController.js` | `AssessmentResult` | Groq / OpenAI | `CANONICAL` | `{ success, data: { aiReport } }` | `ResultPage.js` |
| `GET` | `/api/assessment/analytics/overview` | Yes | Current user | `personalAnalyticsController.js` | `AssessmentResult` | Personal Analytics | `CANONICAL` | `{ success, data: { overview } }` | `AnalyticsPage.jsx` |
| `GET` | `/api/assessment/analytics/history` | Yes | Current user | `personalAnalyticsController.js` | `AssessmentResult` | Personal Analytics | `CANONICAL` | `{ success, data: { history } }` | `AnalyticsPage.jsx` |
| `GET` | `/api/assessment/analytics/trends` | Yes | Current user | `personalAnalyticsController.js` | `AssessmentResult` | Personal Analytics | `CANONICAL` | `{ success, data: { trends } }` | `AnalyticsPage.jsx` |
| `GET` | `/api/assessment/analytics/career-readiness` | Yes | Current user | `personalAnalyticsController.js` | `AssessmentResult` | Personal Analytics | `CANONICAL` | `{ success, data: { readiness } }` | `AnalyticsPage.jsx` |
| `GET` | `/api/assessment/analytics/skill-progress` | Yes | Current user | `personalAnalyticsController.js` | `AssessmentResult` | Personal Analytics | `CANONICAL` | `{ success, data: { skills } }` | `AnalyticsPage.jsx` |
| `GET` | `/api/assessment/analytics/timeline` | Yes | Current user | `personalAnalyticsController.js` | `AssessmentResult` | Personal Analytics | `CANONICAL` | `{ success, data: { timeline } }` | `AnalyticsPage.jsx` |
| `GET` | `/api/assessment/analytics/report-history` | Yes | Current user | `personalAnalyticsController.js` | `AssessmentResult` | Personal Analytics | `CANONICAL` | `{ success, data: { reports } }` | `AnalyticsPage.jsx` |
| `GET` | `/api/assessment/analytics/roadmap-progress/:resultId/:careerId` | Yes | Result + Role | `personalAnalyticsController.js` | `CareerRoadmapProgress`| Roadmap Service | `CANONICAL` | `{ success, data: { progress } }` | `CareerExplorerPage.jsx` |
| `POST` | `/api/assessment/analytics/roadmap-progress/:resultId/:careerId` | Yes | Result + Role | `personalAnalyticsController.js` | `CareerRoadmapProgress`| Roadmap Service | `CANONICAL` | `{ success, data: { progress } }` | `CareerExplorerPage.jsx` |
| `POST` | `/api/assessment/legacy/session/start` | Yes | Session check | `assessmentController.js` | `LegacyAssessmentSession`| Static Questionnaire | `LEGACY` | `{ success, data: { session } }` | `LegacyStaticAssessmentPage.jsx` |
| `GET` | `/api/assessment/legacy/session/:userId` | Yes | User ID | `assessmentController.js` | `LegacyAssessmentSession`| Static Questionnaire | `LEGACY` | `{ success, data: { session } }` | `LegacyStaticAssessmentPage.jsx` |
| `PATCH`| `/api/assessment/legacy/session/:sessionId` | Yes | Session ID | `assessmentController.js` | `LegacyAssessmentSession`| Static Questionnaire | `LEGACY` | `{ success, data: { session } }` | `LegacyStaticAssessmentPage.jsx` |
| `POST` | `/api/assessment/legacy/save` | Yes | Payload check | `assessmentController.js` | `Assessment` | Legacy Result Engine | `LEGACY` | `{ success, data: { assessment } }` | `LegacyStaticAssessmentPage.jsx` |

*Note*: Standalone deprecated router mounts (`/api/assessments/*`, `/api/cv/*`, `/api/analytics/*`, `/api/ai/*`) mirror canonical endpoints above with `Deprecation: true` headers; `/api/questions` remains mounted for legacy static question lookup. No mounted endpoints require `admin` role authorization.

---

## 14. Database Architecture and Data Model

The application uses MongoDB via Mongoose ORM. There are **8 files** in `backend/models/`.

### Exact Canonical Model Inventory

1. **`User`** (`backend/models/User.js`):
   - **Collection Name**: `users`
   - **Status**: `CANONICAL` / `ACTIVE`
   - **Purpose**: Stores user account credentials, hashed password, role (`user` / `admin`), Google OAuth ID (`googleId`), avatar, asked career questions array, and preferred career lens.
2. **`AssessmentSession`** (`backend/models/AssessmentSession.js`):
   - **Collection Name**: `assessmentflowsessions`
   - **Status**: `CANONICAL` / `ACTIVE`
   - **Purpose**: Primary active assessment session document tracking adaptive 6-stage evaluation (`stage`), adaptive question queue (`adaptiveQueue`), behavioral answers, uploaded CV data (`cvData`), and interactive chat history (`chatHistory`). Includes TTL index on `expiresAt`.
3. **`AssessmentResult`** (`backend/models/AssessmentResult.js`):
   - **Collection Name**: `assessmentresults`
   - **Status**: `CANONICAL` / `ACTIVE`
   - **Purpose**: Completed assessment result document storing calculated Big Five (OCEAN) traits, RIASEC codes, Work Values, Career Signals, evidence arrays, confidence metrics, career recommendation maps, and optional AI report narratives.
4. **`CareerRoadmapProgress`** (`backend/models/CareerRoadmapProgress.js`):
   - **Collection Name**: `careerroadmapprogresses`
   - **Status**: `CANONICAL` / `ACTIVE`
   - **Purpose**: Tracks user milestone check-offs (`completedMilestones`) for specific career roles tied to an assessment result.
5. **`Question`** (`backend/models/Question.js`):
   - **Collection Name**: `questions`
   - **Status**: `CANONICAL` / `ACTIVE_FOR_LEGACY_BANK`
   - **Purpose**: Catalog of 120 standard IPIP Big Five items with facet codes, domains ('O','C','E','A','N'), and keying ('+','-'). Note: Active adaptive testing serves questions dynamically from `backend/data/adaptiveQuestionBank.js`.
6. **`Assessment`** (`backend/models/Assessment.js`):
   - **Collection Name**: `assessments`
   - **Status**: `LEGACY` / `DEPRECATED`
   - **Purpose**: Legacy assessment result document schema for static 120-item questionnaires.
7. **`LegacyAssessmentSession`** (`backend/models/LegacyAssessmentSession.js`):
   - **Collection Name**: `assessmentsessions`
   - **Status**: `LEGACY` / `DEPRECATED`
   - **Purpose**: Legacy session document schema tracking answers to static 120-item questionnaires.
8. **`AssessmentFlowSession`** (`backend/models/AssessmentFlowSession.js`):
   - **Collection Name**: N/A (Alias wrapper)
   - **Status**: `COMPATIBILITY_ALIAS`
   - **Purpose**: Export file containing `module.exports = require('./AssessmentSession');`. Does NOT define a distinct schema or MongoDB collection; serves as backward-compatibility export for code referencing `AssessmentFlowSession`.

---

## 15. Authentication and Authorization

- **Authentication Mechanism**: JSON Web Tokens (JWT) signed via `jsonwebtoken` with 7-day expiration (`jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: '7d' })`). Passwords hashed with `bcrypt` (10 rounds).
- **Google OAuth 2.0**: Implemented via `google-auth-library` (`OAuth2Client.verifyIdToken`). Auto-provisions user accounts (`provider: 'google'`).
- **Rate Limiting**: Enforced via `express-rate-limit`:
  - Auth routes (`/api/auth/*`): 30 requests per 15-minute window.
  - API routes (`/api/*`): 300 requests per 15-minute window.

---

## 16. Assessment Engine

- **Stages**: `cv` → `profile` → `cognitive` → `behavior` → `summary` → `completed`.
- **Adaptive Question Queue**: Dynamically updates target OCEAN traits based on incoming response confidence. Serves questions from `adaptiveQuestionBank.js`.
- **Behavioral Scenarios**: Presents interactive multi-option situational choices evaluating leadership, collaboration, analysis, and problem-solving.

---

## 17. Question Bank

- **Static Bank**: 120 validated items stored in `questions` collection covering all 30 Big Five facets (4 items per facet, 24 items per OCEAN domain).
- **Adaptive Templates**: Contextual scenario templates defined in `adaptiveQuestionBank.js` covering software engineering, data science, UX design, product management, and business analysis.

---

## 18. Scoring and Results Engine

Scoring is handled deterministically by `assessmentScoringOrchestrator.service.js`:
- **Primary Canonical Output Dimensions**:
  - **Big Five (OCEAN)**: `scoreBigFive({ evidence })` aggregates weighted responses, applies reverse scoring, and normalizes scores to a 0–100 scale across Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
  - **RIASEC**: Calculates 0–100 scores across Holland codes (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).
  - **Work Values**: Calculates 0–100 scores across 8 vocational values (Intrinsic, Extrinsic, Lifestyle, Relationships, Prestige, Independence, Security, Growth).
  - **Career Signals**: Computes 0–100 scores for derived competencies (Technical Depth, Learning Orientation, Leadership, Problem Solving).
- **Stage & Evidence Classification**:
  - **Cognitive Styles**: Cognitive represents an assessment stage (`stage: 'cognitive'`) and question evidence category where adaptive scenario questions are served.
  - **Behavior Vectors**: Behavior represents an assessment stage (`stage: 'behavior'`) and intermediate metadata (`behavior: { analysis, signals, vector }`) feeding into primary trait scoring and confidence calculation, rather than a separate top-level primary output scale.
- **Confidence Index**: `confidenceScoring.service.js` derives a 0–100 confidence score and confidence gap metric based on evidence volume and consistency.

---

## 19. Career / Recommendation System

- **Database**: 17 curated career profiles defined in `backend/data/careers.json` (e.g., `software_engineer`, `data_analyst`, `product_manager`, `ux_designer`, `cybersecurity_analyst`).
- **Matching Algorithm**: `careerMatching.service.js` executes **deterministic weighted multi-dimensional closeness algorithms** evaluating 5 fit layers: RIASEC fit, Big Five fit, Work Values fit, Career Signals fit, and Education fit. (Note: No trained or inferred machine-learning models participate in career matching).
- **Roadmaps & Why Not Analysis**: Provides step-by-step action items and explicit contrast explanations ("Why Not X Role") for transparent guidance.

---

## 20. CV / Resume System

- **Extraction**: Memory storage via `multer` (6MB max file size). Parses PDF files directly in-memory via `pdf-parse` and Word documents via `mammoth`.
- **Taxonomy Parsing**: `cvTaxonomy.js` parses extracted text for technical skills, tools, education, subjects, and domain keywords.
- **AI Enhancement**: Optional structured JSON parsing via Groq/OpenAI to identify project experience and interest vectors.
- **Cloudinary Usage Verification**: Cloudinary is **not invoked** for CV uploads. CV file buffers are processed entirely in-memory and parsed text is stored in the `AssessmentSession` document.

---

## 21. AI / LLM Architecture

- **Provider Selection Precedence**: Defined deterministically in `backend/config/env.js`:
  1. If `AI_PROVIDER` is set in environment variables, `aiProvider` equals `AI_PROVIDER.toLowerCase()`.
  2. If `AI_PROVIDER` is unset:
     - If `GROQ_API_KEY` is present, `aiProvider` defaults to `'groq'`.
     - If `GROQ_API_KEY` is absent, `aiProvider` defaults to `'openai'`.
- **API Key & Base URL Resolution**:
  - `groq`: Reads `GROQ_API_KEY`, uses `GROQ_BASE_URL` (default `https://api.groq.com/openai/v1`).
  - `openai`: Reads `OPENAI_API_KEY`, uses default OpenAI endpoint (or `OPENAI_BASE_URL` if set).
- **Model Resolution Precedence**:
  - Global default (`aiModel`): `AI_MODEL` → (If Groq: `openai/gpt-oss-120b`; If OpenAI: `OPENAI_MODEL` or `gpt-5.4-mini`).
  - Task-specific models (`aiReportModel`, `aiCoachModel`, etc.): Explicit task variable → Groq default `aiModel` → OpenAI task model (e.g. `OPENAI_REPORT_MODEL` or `gpt-5.5`).
- **Reasoning Model Parameter Sanitizer**: `openAiParameterPolicy.service.js` automatically strips unsupported parameters (`temperature`, `top_p`, etc.) when invoking reasoning models (`gpt-5*`, `o1*`, `o3*`).
- **Core vs AI-Enhanced Availability**:
  - **Core Product Availability**: 100% available without AI credentials. Scoring, career matching, PDF report generation, and data controls run completely deterministically.
  - **AI-Enhanced Provider Availability**: Requires active API credentials (`GROQ_API_KEY` or `OPENAI_API_KEY`) to generate dynamic LLM narratives or interactive chat responses. When credentials are absent, deterministic fallbacks in `aiFallbacks.service.js` provide pre-structured template responses.

---

## 22. Dashboard Functional Architecture

The `/dashboard` route consumes `GET /api/assessment/dashboard/:userId` and renders:
- **Active Assessment Card**: Displays current assessment status, completed stage, and progress bar.
- **OCEAN Trait Summary**: Interactive chart showcasing Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism scores.
- **Top Career Matches**: Highlights top 3 matched career roles with fit percentages.
- **Recent Activity Feed**: Timeline of past assessment attempts and report generations.

---

## 23. Analytics System

The personal analytics hub (`/analytics`) connects to dedicated canonical endpoints:
1. `GET /api/assessment/analytics/overview`: Overall intelligence metrics.
2. `GET /api/assessment/analytics/history`: List of past assessment attempts.
3. `GET /api/assessment/analytics/trends`: Trait changes over time across attempts.
4. `GET /api/assessment/analytics/career-readiness`: Aggregated career readiness index.
5. `GET /api/assessment/analytics/skill-progress`: Skill acquisition metrics over time.
6. `GET /api/assessment/analytics/timeline`: Chronological insight timeline.
7. `GET /api/assessment/analytics/report-history`: History of generated PDF reports.
8. `GET/POST /api/assessment/analytics/roadmap-progress/:resultId/:careerId`: Check-offs for career roadmap action items.

---

## 24. Reports / PDF / Export

- **PDF Engine**: `pdf-report.service.js` generates PDF documents natively in Node.js using stream builders without external binary dependencies (`generateAssessmentPdfBuffer`).
- **Contents**: Executive summary, OCEAN breakdown with visual progress bars, top career matches, skill gap analysis, and growth suggestions.
- **Delivery & Cloudinary Verification**: PDF reports are streamed directly as binary buffers (`application/pdf`) via Express `res.send(buffer)`. Cloudinary is **not invoked** during PDF report download.

---

## 25. Frontend State and Persistence

- **Authentication State**: `AuthStore.js` manages JWT token, user profile, and role in React Context, persisted in `localStorage` under `auth_state`.
- **Server State**: `@tanstack/react-query` handles caching, background refetching, and query invalidation.
- **Session State**: `assessmentFlowStorage.js` stores active `sessionId` in `localStorage` to allow session recovery on page refresh.

---

## 26. External Integrations

- **MongoDB Database**: Persistent document database.
- **Groq API / OpenAI API**: AI completion services for narratives and career coaching (optional; fallback enabled).
- **Google OAuth 2.0**: Identity provider for single sign-on authentication (optional; local auth active).
- **Cloudinary**: Installed utility service with helper methods in `cloudinary.service.js`. Unused in active CV upload and PDF report download flows.

---

## 27. Environment Configuration Matrix

| Variable | Layer | Required? | Default | Purpose | Behavior if Missing | Client-Visible? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `MONGODB_URI` | Backend | **Yes** | None | Database connection string | App throws error and halts | No |
| `JWT_SECRET` | Backend | **Yes** | None | JWT token signing key | App throws error and halts | No |
| `PORT` | Backend | No | `5000` | Backend HTTP server port | Falls back to `5000` | No |
| `AI_PROVIDER` | Backend | No | `groq` (if key set) | AI provider selection (`groq` or `openai`) | Defaults to `groq` if `GROQ_API_KEY` set, else `openai` | No |
| `GROQ_API_KEY` | Backend | No | None | Groq API key | AI calls fall back to deterministic narratives | No |
| `OPENAI_API_KEY` | Backend | No | None | OpenAI API key | AI calls fall back to deterministic narratives | No |
| `GOOGLE_CLIENT_ID`| Both | No | None | Google OAuth Client ID | Google Login button disabled | Yes (`VITE_GOOGLE_CLIENT_ID`) |
| `CLOUDINARY_API_KEY`| Backend| No | None | Cloudinary asset storage | Unused in active flows; PDF/CV stay in-memory | No |
| `VITE_API_URL` | Frontend| No | `/api` | Base URL for API requests | Defaults to `/api` | Yes |

---

## 28. Security Architecture Review

- **Secrets Handling**: Environment variables managed via `dotenv`. No active secrets were found committed in the inspected current repository state.
- **Password Security**: Passwords hashed using `bcrypt` with 10 salt rounds.
- **CORS Whitelist**: Dynamic CORS origin validator matching `localhost`, `127.0.0.1`, `FRONTEND_URL`, `ALLOWED_ORIGINS`, and Vercel preview domains.
- **HTTP Security Headers**: `helmet` middleware sets X-Content-Type-Options, X-Frame-Options, and Strict-Transport-Security.
- **Prompt Injection Defense**: `aiPromptInjectionGuard.service.js` sanitizes user input before passing it to AI prompt templates as an implemented defensive control.

---

## 29. Error / Loading / Empty / Edge States

The UI implements explicit state components:
- **`LoadingState.jsx`**: Accessible loading spinner with `aria-live="polite"`.
- **`ErrorState.jsx`**: User-friendly error card featuring message display and retry button.
- **`EmptyState.jsx`**: Illustrated empty state container with call-to-action buttons.
- **`LoaderOverlay.jsx`**: Full-screen modal overlay for long-running operations (CV parsing, PDF generation).

---

## 30. Accessibility-Relevant Functional Findings

- **Screen Reader Support**: Accessibility helper components (`AccessibleStatus.jsx`, `VisuallyHidden.jsx`, `ChartSummary.jsx`) provide textual fallbacks for visual charts and progress bars. Complete WCAG compliance across all screens has not been systematically audited.
- **Reduced Motion**: Enforces prefers-reduced-motion checks across GSAP and Framer Motion animations.

---

## 31. Tests and Validation Evidence

### Automated Test Results
- **Frontend Test Suite (`npm run test --prefix frontend`)**:
  - **114 / 114 Tests Passed (100% Pass Rate)** across 24 test files (Vitest runner).
  - Covers UI components, light theme consistency, radar charts, session state machine, and API client error handling.
- **Backend Test Suite (`node --test backend/tests/*.test.js`)**:
  - **Isolated Configuration Environment (Default setup / unconstrained `.env`)**: **140 / 140 Tests Passed (100% Pass Rate)**.
  - **With Local `.env` Active (`AI_PROVIDER=groq`)**: **130 Passed / 10 Failed**.
  - *Root Cause Analysis of Failing Assertions under local Groq env*:
    - 8 unit tests in `repair-phase3-parameter-policy.test.js` test OpenAI reasoning model parameter sanitization (`gpt-5.5`). When `AI_PROVIDER=groq` is active in `.env`, `isReasoningModel` evaluates to `false` for Groq, bypassing temperature removal when default `config.aiProvider` is read.
    - 1 test in `phase9-ai-runtime-matrix.test.js` checks missing API key fallback; when `GROQ_API_KEY` is present in `.env`, it attempts a network call returning HTTP 401 instead of `NO_API_KEY`.
    - 1 test in `repair-phase1-pdf-and-model.test.js` checks model fallback to `gpt-5.4-mini` when `OPENAI_MODEL` is absent; `AI_MODEL=openai/gpt-oss-120b` in `.env` overrides the default.

---

## 32. Dead Code / Duplicate Authorities / Legacy Architecture

1. **Deprecated Backend Route Mounts**:
   - `backend/routes/assessmentRoutes.js`, `cvRoutes.js`, `aiRoutes.js`, `analyticsRoutes.js` are legacy mount points that return `Deprecation: true` headers. Canonical operations are unified under `backend/routes/assessmentFlowRoutes.js` (`/api/assessment`).
2. **Legacy Static Questionnaire**:
   - `backend/models/LegacyAssessmentSession.js`, `backend/models/Assessment.js`, and `frontend/src/pages/Legacy/LegacyStaticAssessmentPage.jsx` represent the initial 120-item static questionnaire. Active flow uses adaptive `AssessmentSession`.

---

## 33. TODOs / Placeholders / Mocks

- **Placeholder Detection**: `graphDataGuards.js` explicitly detects flat placeholder vectors (all 50s/51s/60s) to prevent uninitialized data from populating charts.
- **Search Findings**: Codebase uses standard mocks in test files (`vi.mock`, `mongodb-memory-server`) without leaving fake data in production paths.

---

## 34. Confirmed Bugs and Functional Contradictions

### Categorized Findings
1. **Application Source Code Bugs**: **0 Active Runtime Defects Found**. Application logic, scoring math, career matching, state transitions, and fallback handlers operate correctly as designed.
2. **Test-Harness / Environment Coupling Defects**: **10 Backend Test Failures** occur when running `npm test` against local `.env` overriding default provider configurations (`AI_PROVIDER=groq`, `GROQ_API_KEY`). Unit tests hardcode assertions assuming OpenAI defaults or fail when live API keys override offline mock scenarios.
3. **Configuration Dependencies**: Dynamic LLM narratives and interactive career coaching require valid external API keys (`GROQ_API_KEY` or `OPENAI_API_KEY`). Google OAuth requires `GOOGLE_CLIENT_ID`.
4. **External Credential Failures**: Presence of an invalid `GROQ_API_KEY` in local `.env` causes live AI network calls to fail with HTTP 401 instead of cleanly falling back to `NO_API_KEY` status.

---

## 35. Configuration-Blocked Capabilities

If optional API keys are omitted in `.env`:
1. **Missing `OPENAI_API_KEY` / `GROQ_API_KEY`**: AI narrative generation and interactive career coaching fallback to deterministic templates.
2. **Missing `GOOGLE_CLIENT_ID`**: Google OAuth button is hidden; local email/password authentication remains active.
3. **Cloudinary Configuration**: Omission of Cloudinary credentials has no impact on active user flows; PDF reports and CV text parsing operate entirely in-memory.

---

## 36. Data Flow Maps

```
[User Answer Submission]
   │
   ▼
[POST /api/assessment/:id/answer]
   │
   ▼
[authMiddleware -> assessmentFlowController]
   │
   ▼
[assessment-state-machine.service.js]
   │
   ├─► Update AssessmentSession in MongoDB
   └─► If Stage Complete -> Trigger assessmentScoringOrchestrator.service.js
                                │
                                ├─► scoreBigFive()
                                ├─► scoreRiasec()
                                ├─► scoreWorkValues()
                                ├─► scoreCareerSignals()
                                └─► Save AssessmentResult to MongoDB
```

---

## 37. UI/UX Functional Handoff

### Core Application Surfaces Required for Redesign
1. **Auth Screens**: `/login`, `/signup` (Local email/password + Google OAuth button).
2. **Dashboard**: `/dashboard` (Active session card, OCEAN overview, Top 3 Career Fits, Quick Actions).
3. **Assessment Wizard**:
   - `/assessment/start` (CV Upload dropzone + Manual Profile form).
   - `/assessment/test` (Adaptive question card, progress stepper, response options).
   - `/assessment/behavior` (Scenario cards + Likert options).
   - `/assessment/career` (Career matching list, filter tabs, skill gap drawer, roadmap timeline).
   - `/assessment/result` (OCEAN Radar Chart, RIASEC Radar Chart, Work Values Card, AI Narrative, PDF Export, Career Coach Chat).
4. **Analytics Hub**: `/analytics` (Trait trend line chart, skill progress bars, assessment history list).
5. **Privacy Controls**: `/account/privacy` (Data export button, assessment deletion, account deletion modal).
6. **Trust & Safety**: `/trust` (Platform boundaries and disclaimers).

---

## 38. Marketing Content Truth Sheet

### Verified Truths (Safe to Market)
- "Multi-dimensional psychometric evaluation measuring Big Five personality traits, RIASEC interests, and work values."
- "Adaptive assessment technology that tailors questions based on your background and responses."
- "In-memory CV text extraction identifying skills, education, tools, and subject experience."
- "Deterministic career matching comparing your psychological profile against curated professional roles."
- "Comprehensive self-service privacy controls with complete data export and deletion capabilities."

### Banned Claims (DO NOT Market)
- Do NOT claim machine-learning model training or neural network inference for career matching.
- Do NOT claim clinical mental health or psychological diagnostic certification.
- Do NOT claim automated hiring, recruitment filtering, or employment selection authority.
- Do NOT claim 100% predictive accuracy for career success.

---

## 39. Portfolio Readiness Analysis

- **Technical Highlights**: Adaptive queueing state machine, multi-layer deterministic career matching engine, reasoning model parameter policy sanitizer, native stream PDF report generator.
- **Verification Status**: High source-level functional maturity verified by 254 passing tests under isolated configuration.
- **Redesign Scope**: Visual presentation and UI/UX styling remain a separate redesign task.

---

## 40. Product Terminology Glossary

- **OCEAN**: The Big Five personality traits (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism).
- **RIASEC**: Holland Occupational Themes (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).
- **Work Values**: Vocational preferences across 8 dimensions (Intrinsic, Extrinsic, Lifestyle, Relationships, Prestige, Independence, Security, Growth).
- **Career Signals**: Derived competency indicators (Technical Depth, Learning Orientation, Leadership, Problem Solving).
- **Fit Score**: Percentage match (0–100%) comparing user trait vectors to a career profile using weighted distance math.
- **Confidence Index**: Statistical metric evaluating evidence volume and consistency.

---

## 41. Implementation Status Matrix

| Domain | Status | Notes |
| :--- | :--- | :--- |
| **Authentication & Auth** | `IMPLEMENTED` | Local email/password and JWT fully operational. |
| **Google OAuth Login** | `IMPLEMENTED_WITH_CONFIGURATION` | Requires `GOOGLE_CLIENT_ID`; hides button if missing. |
| **Adaptive Assessment Engine** | `IMPLEMENTED` | Full state machine across 6 stages. |
| **CV Extraction** | `IMPLEMENTED` | In-memory PDF and DOCX parsing (`pdf-parse`, `mammoth`). |
| **Scoring Engines** | `IMPLEMENTED` | Deterministic OCEAN, RIASEC, Work Values, Signals scoring. |
| **Career Matching Engine** | `IMPLEMENTED` | Deterministic weighted distance matching against 17 profiles. |
| **AI Narrative & Coach** | `CONFIGURATION_DEPENDENT` | Requires Groq/OpenAI keys; fallbacks active when missing. |
| **Personal Analytics Hub** | `IMPLEMENTED` | 8 canonical analytics endpoints operational. |
| **PDF Report Generator** | `IMPLEMENTED` | Native in-memory stream builder (`generateAssessmentPdfBuffer`). |
| **Privacy Controls** | `IMPLEMENTED` | Full JSON export and deletion endpoints active. |
| **Administrator Surface** | `BACKEND_ONLY` | Schema enum and middleware exist; no frontend or routes exist. |
| **Cloudinary Integration** | `UNVERIFIED_EXTERNALLY` | Installed service utility; unused in active runtime flows. |

---

## 42. Known Unknowns

1. **Production Cloud Storage**: Cloudinary behavior in production cannot be verified as active runtime flows process CVs and PDFs in-memory without invoking Cloudinary.
2. **Production External Credentials**: Live validity of external Groq, OpenAI, or Google OAuth API keys in production environments.
3. **Live AI Latency & Rate Limits**: Latency, rate-limiting, and cost behavior of live Groq/OpenAI LLM provider endpoints under high production load.
4. **Production Deployment Infrastructure**: Live hosting configuration, environment secrets management, and SSL termination on production servers.
5. **Real Google OAuth Redirect Flow**: Live browser OAuth consent screen redirect and domain verification settings.
6. **Psychometric Scientific Validation**: Academic provenance and empirical normative sample validation of Big Five scoring weights beyond repository code artifacts.
7. **Production Data Scale Performance**: Database index performance and query execution speeds under large-scale production MongoDB data volumes.
8. **Operational Monitoring & Alerting**: Production log aggregation, error tracking (e.g. Sentry), and APM infrastructure.
9. **Administrator UX Availability**: Unresolved whether an admin UI is planned for future phases, as currently no frontend surface or admin API routes exist.
10. **Unexecuted External APIs**: Any third-party service behavior that was not executed during offline repository audit runs.

---

## 43. Critical Findings

1. **Deterministic Core Reliability**: Core operations (scoring, career matching, PDF report generation, data privacy) function with complete independence from third-party AI APIs. When AI keys are absent, fallback engines supply 100% of reports and chat responses.
2. **Unified Route Architecture**: Canonical operations use `/api/assessment`. Legacy endpoints remain mounted with HTTP deprecation headers for backward compatibility.
3. **Automated Verification & Harness Coupling**: 254 test cases pass cleanly under isolated configuration. The 10 failures observed under local `.env` represent test-harness configuration coupling rather than runtime application defects.

---

## 44. Final Source-of-Truth Product Description

**Personality Assessor** is an end-to-end psychometric evaluation and career intelligence platform. It converts user answers, situational behavior choices, and CV documents into actionable psychological profiles and career recommendations.

The platform executes a 6-stage adaptive evaluation: users onboard via CV upload or manual background entry, progress through adaptive cognitive questions, and complete behavioral scenarios. The scoring engine calculates Big Five (OCEAN) traits, RIASEC interest codes, Work Values, and Career Signals.

Users receive percentage fit scores matched against 17 curated career roles via deterministic weighted closeness algorithms, complete with skill gap analyses, roadmap check-offs, and "Why Not" contrast explanations. Results are presented visually through interactive radar charts and can be exported as PDF reports.

Built with Express 5, React 19, Vite, MongoDB, and Mongoose, the platform features robust security (JWT, bcrypt, helmet, rate limiting), self-service privacy controls (JSON export, complete data deletion), and full fallback capabilities when external AI providers are offline.
