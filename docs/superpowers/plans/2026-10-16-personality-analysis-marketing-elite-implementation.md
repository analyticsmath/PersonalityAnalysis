# Personality Analysis Marketing Elite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public marketing experience into a unified, award-competitive Human Trace system while preserving the protected application, product truth, accessibility, performance, and deterministic scoring semantics.

**Architecture:** Consolidate all public marketing routes under one persistent React shell and one motion/scroll lifecycle. Replace the Home shadow-root/string implementation with first-class React scenes, replace Career's 17-scroll-state model with five cinematic work worlds plus local role exploration, and give each remaining route its own deliberate operating mode while sharing semantic route-transition actors and a narrowed visual token system.

**Tech Stack:** React 19, React Router 7, GSAP 3.15 + ScrollTrigger, Lenis 1.3.26, Framer Motion where local layout animation is appropriate, Vitest + Testing Library, Playwright, Vite.

**Spec:** `docs/superpowers/specs/2026-10-16-personality-analysis-marketing-elite-design.md`

## Global Constraints

- Marketing/public routes only; do not change dashboard, assessment, backend, database, APIs, scoring formulas, or authenticated application behavior.
- Preserve canonical source content from `frontend/src/content/public-experience/publicContent.js` and occupation data from `frontend/src/content/careers.json`.
- Preserve the non-clinical positioning and evidence-sufficiency caveats; do not imply a single response yields a valid scored profile.
- Preserve deterministic career weighting at 25/25/20/15/10/5.
- Fine-pointer desktop may use Lenis; touch/coarse pointer stays native; reduced motion gets a complete alternate composition.
- No generic universal fade-up grammar, fake smooth-scroll delay, decorative 3D, invented career scores, or interaction that teleports scroll position on local selection.
- Every pinned segment must produce meaningful state change throughout its travel; fast scroll and reverse scroll must land on coherent states.
- Route transitions must use semantic actors, not guessed destination geometry or “largest visible media wins.”
- Existing image-rights/legal/security claims remain subject to the existing release gate.

## Review Focus

1. **Fast/reverse scroll:** flagship Home/Career/How/Trust sequences must resolve to coherent states with no stale opacity, `inert`, clipping, or pointer ownership.
2. **Touch/coarse pointer:** no Lenis interception, no desktop-only pin assumptions, no horizontal overflow, and all route content remains directly reachable.
3. **Reduced motion:** no empty cinematic tracks; the same content hierarchy and CTAs remain available with direct state changes.
4. **Keyboard/focus:** role fields, provenance steps, menu, route transitions, and range comparison remain operable without focus being moved by scroll.
5. **Transition interruption:** repeated/rapid navigation must not leave `viewTransitionName`, body overflow, inert state, or focus locks behind.

---

## File Structure

### Create
- `frontend/src/components/public-experience/human-trace/HomeHumanTracePage.jsx` — React-first Home scene composition.
- `frontend/src/components/public-experience/human-trace/homeHumanTrace.css` — Home-only composition and responsive/reduced-motion rules.
- `frontend/src/components/public-experience/human-trace/homeHumanTraceMotion.js` — deterministic Home scroll renderer/controller.
- `frontend/src/components/public-experience/human-trace/careerWorlds.js` — canonical five-world presentation model and role grouping.
- `frontend/src/components/public-experience/human-trace/semanticTransitions.js` — transition actor registration/resolution helpers.
- `frontend/src/components/public-experience/human-trace/marketingExperience.contract.test.jsx` — shell/route/content contract tests.
- `frontend/src/components/public-experience/human-trace/careerWorlds.test.js` — career grouping and non-teleport behavior contracts.
- `frontend/src/components/public-experience/human-trace/semanticTransitions.test.js` — semantic actor resolution/interruption tests.

### Modify
- `frontend/src/components/public-experience/shell/PublicExperienceLayout.jsx` — route all marketing pages through the unified cinematic shell.
- `frontend/src/pages/editorial/EditorialHomePage.jsx` — mount the new React Home page.
- `frontend/src/components/public-experience/human-trace/CinematicPublicShell.jsx` — become the single marketing shell/Lenis owner.
- `frontend/src/components/public-experience/human-trace/CinematicRoutes.jsx` — route-specific compositions for How, Career, Progress, Trust, Methodology, Privacy.
- `frontend/src/components/public-experience/human-trace/cinematicRoutes.css` — route motion modes, responsive art direction, narrowed tokens.
- `frontend/src/components/public-experience/human-trace/useScrollSequence.js` — remove Career dataset-length scroll ownership; retain Trust-specific sequence support only where semantically justified.
- `frontend/src/components/public-experience/human-trace/routeNavigation.js` — semantic actor transitions and interruption cleanup.
- `frontend/src/components/public-experience/human-trace/filmContent.js` / `filmMotion.js` / `HumanTraceFilm.jsx` — deprecate/remove after Home migration once no imports remain.
- Existing frontend contract tests where expected markup/route ownership changes.

---

### Task 1: Unify the Marketing Shell and Establish Contracts

**Files:**
- Create: `frontend/src/components/public-experience/human-trace/marketingExperience.contract.test.jsx`
- Modify: `frontend/src/components/public-experience/shell/PublicExperienceLayout.jsx`
- Modify: `frontend/src/components/public-experience/human-trace/CinematicPublicShell.jsx`
- Modify: `frontend/src/pages/editorial/EditorialHomePage.jsx`

**Interfaces:**
- Consumes: React Router public route tree from `frontend/src/App.js`.
- Produces: one `CinematicPublicShell` that wraps `/`, `/how-it-works`, `/career-intelligence`, `/progress`, `/trust`, `/methodology`, `/privacy`; Auth remains in the existing public shell path.

- [ ] **Step 1: Write failing shell contract tests** asserting Home no longer bypasses `CinematicPublicShell`, marketing routes share one skip target/header/menu/footer lifecycle, and protected routes remain absent from this shell contract.
- [ ] **Step 2: Run** `npm run test --prefix frontend -- marketingExperience.contract.test.jsx` and verify the new shell assertions fail for the current Home bypass.
- [ ] **Step 3: Implement unified route ownership** in `PublicExperienceLayout.jsx` and adjust `CinematicPublicShell.jsx` so one shell survives marketing route navigation.
- [ ] **Step 4: Run the targeted test** and verify it passes.
- [ ] **Step 5: Run** `npm run test --prefix frontend` and record unrelated/pre-existing failures separately.
- [ ] **Step 6: Commit** `refactor(marketing): unify public cinematic shell`.

### Task 2: Migrate Home to First-Class React and Lock the Eight-Act Story

**Files:**
- Create: `frontend/src/components/public-experience/human-trace/HomeHumanTracePage.jsx`
- Create: `frontend/src/components/public-experience/human-trace/homeHumanTrace.css`
- Create: `frontend/src/components/public-experience/human-trace/homeHumanTraceMotion.js`
- Modify: `frontend/src/pages/editorial/EditorialHomePage.jsx`
- Test: `frontend/src/components/public-experience/human-trace/marketingExperience.contract.test.jsx`

**Interfaces:**
- Produces: `HomeHumanTracePage`; `mountHomeHumanTrace(root, options)` returning a cleanup function.
- Uses canonical sequence: Human → Source → Branch → Work Worlds → Weight → Time → Provenance → Record.

- [ ] **Step 1: Add failing tests** for eight semantic Home acts, presence of the source-response actor, four work-world labels including Operational Pressure, canonical 25/25/20/15/10/5 labels, provenance section, and a resolved finale CTA.
- [ ] **Step 2: Run targeted tests** and verify failure because the React-first Home does not yet exist.
- [ ] **Step 3: Implement semantic JSX structure** with real landmarks/headings and transition actor keys; keep current product claims and working-context photography.
- [ ] **Step 4: Implement deterministic Home motion controller** using one ScrollTrigger master progress, cached measurements, coherent direct state painting, `fastScrollEnd`, reverse-safe rendering, and no React state updates per frame.
- [ ] **Step 5: Implement reduced-motion/touch compositions** without long pinned travel.
- [ ] **Step 6: Run targeted tests and full frontend suite.**
- [ ] **Step 7: Commit** `feat(marketing): rebuild home as Human Trace film`.

### Task 3: Replace Career's 17-Stop Scroll with Five Work Worlds

**Files:**
- Create: `frontend/src/components/public-experience/human-trace/careerWorlds.js`
- Create: `frontend/src/components/public-experience/human-trace/careerWorlds.test.js`
- Modify: `frontend/src/components/public-experience/human-trace/CinematicRoutes.jsx`
- Modify: `frontend/src/components/public-experience/human-trace/cinematicRoutes.css`
- Modify: `frontend/src/components/public-experience/human-trace/useScrollSequence.js`

**Interfaces:**
- Produces: `CAREER_WORLDS`, `getCareerWorldForRole(roleKey)`, and a Career route where scroll selects one of five worlds while local interaction selects roles.
- Career selection must never call `scrollTo` merely because a role was clicked/focused.

- [ ] **Step 1: Write failing tests** for exactly five presentation worlds, all 17 canonical role keys assigned once as a primary presentation grouping, and selection helpers that do not mutate scroll position.
- [ ] **Step 2: Run** `npm run test --prefix frontend -- careerWorlds.test.js` and verify failure.
- [ ] **Step 3: Implement `careerWorlds.js`** with the approved five groupings and explicit disclaimer metadata that grouping is editorial, not scoring logic.
- [ ] **Step 4: Replace Career markup** with five cinematic world chapters plus a local roving-tabindex role field; preserve occupation skills/subjects and “not a personal career-fit score” language.
- [ ] **Step 5: Replace dataset-length travel** with a five-state scroll timeline; remove direct-selection page teleport behavior for Career while preserving Trust sequence behavior.
- [ ] **Step 6: Add transient onboarding cue** that expires once sequence progress leaves the opening range.
- [ ] **Step 7: Run targeted tests and full frontend suite.**
- [ ] **Step 8: Commit** `feat(marketing): rebuild career around five work worlds`.

### Task 4: Rebuild How It Works as One Continuous Transformation

**Files:**
- Modify: `frontend/src/components/public-experience/human-trace/CinematicRoutes.jsx`
- Modify: `frontend/src/components/public-experience/human-trace/cinematicRoutes.css`
- Test: `frontend/src/components/public-experience/human-trace/marketingExperience.contract.test.jsx`

**Interfaces:**
- Five canonical steps stay `capture → isolate → branch → weight → recompose`.
- Left stage owns one persistent source actor; right column owns explanatory copy.

- [ ] **Step 1: Add failing tests** asserting five source-derived steps and one persistent transformation stage instead of five unrelated gallery scenes.
- [ ] **Step 2: Verify the tests fail** against current image-swapping implementation.
- [ ] **Step 3: Implement persistent-source JSX** that transforms sentence/clauses/model paths/weight mass/record while the text steps progress.
- [ ] **Step 4: Implement desktop sticky choreography and mobile vertical authored states** with no long mobile pin.
- [ ] **Step 5: Run targeted tests and full frontend suite.**
- [ ] **Step 6: Commit** `feat(marketing): direct how-it-works as source transformation`.

### Task 5: Make Trust Forensic and Progress Temporal

**Files:**
- Modify: `frontend/src/components/public-experience/human-trace/CinematicRoutes.jsx`
- Modify: `frontend/src/components/public-experience/human-trace/cinematicRoutes.css`
- Modify: `frontend/src/components/public-experience/human-trace/useScrollSequence.js`
- Test: `frontend/src/components/public-experience/human-trace/marketingExperience.contract.test.jsx`

**Interfaces:**
- Trust keeps `Supplied → Inferred → Calculated → Compared → Controlled` as five genuine transformation states.
- Progress keeps a real keyboard-accessible comparator and explicit two-record caveat.

- [ ] **Step 1: Add failing tests** for Trust's five canonical states, persistent evidence-record actor, final control/ownership state, Progress range accessibility, and two-record caveat.
- [ ] **Step 2: Run targeted tests** and confirm expected failures.
- [ ] **Step 3: Implement Trust forensic record layering** with trace lines/annotations and semantic scene ownership.
- [ ] **Step 4: Implement Progress temporal composition** so scroll establishes baseline/later relationship while the range control performs inspection.
- [ ] **Step 5: Verify keyboard control and reduced-motion markup in tests.**
- [ ] **Step 6: Run full frontend suite.**
- [ ] **Step 7: Commit** `feat(marketing): refine provenance and temporal routes`.

### Task 6: Differentiate Methodology, Privacy, and Auth Operating Modes

**Files:**
- Modify: `frontend/src/components/public-experience/human-trace/CinematicRoutes.jsx`
- Modify: `frontend/src/components/public-experience/human-trace/cinematicRoutes.css`
- Modify only if needed for surface alignment: existing Login/Signup public styles/components; do not change auth logic.
- Test: `frontend/src/components/public-experience/human-trace/marketingExperience.contract.test.jsx`

**Interfaces:**
- Methodology = technical publication; Privacy = quiet reading route; Auth = transactional.

- [ ] **Step 1: Add failing tests** ensuring Methodology contains the canonical section set and readable chapter navigation, Privacy retains source-derived sections without cinematic pin dependencies, and Auth form semantics remain unchanged.
- [ ] **Step 2: Verify failure** for any missing operating-mode contracts.
- [ ] **Step 3: Implement Methodology publication composition** with restrained diagrams and chapter navigation.
- [ ] **Step 4: Simplify Privacy motion/surface treatment** while retaining in-page navigation and readable hierarchy.
- [ ] **Step 5: Align Auth surface tokens only**; do not alter validation, submission, routing, or API behavior.
- [ ] **Step 6: Run targeted tests and full frontend suite.**
- [ ] **Step 7: Commit** `feat(marketing): separate publication and transactional modes`.

### Task 7: Replace Generic Route Media Transitions with Semantic Actor Carries

**Files:**
- Create: `frontend/src/components/public-experience/human-trace/semanticTransitions.js`
- Create: `frontend/src/components/public-experience/human-trace/semanticTransitions.test.js`
- Modify: `frontend/src/components/public-experience/human-trace/routeNavigation.js`
- Modify: Home/Career/How/Trust/Progress route markup to register semantic actor keys.

**Interfaces:**
- Produces: semantic transition families `human-trace`, `context-media`, `quiet-editorial`.
- Uses real source/destination actors when both exist; otherwise uses the quiet route transition rather than guessed geometry.

- [ ] **Step 1: Write failing tests** for deterministic actor-family resolution, missing-destination fallback, rapid-navigation cleanup, and reduced-motion immediate navigation.
- [ ] **Step 2: Run targeted transition tests** and verify failure.
- [ ] **Step 3: Implement semantic actor registry/resolution helpers.**
- [ ] **Step 4: Rewrite `navigateCinematic`** to select explicit semantic actors, clean names on interruption, and use quiet fallback when destination actor is absent.
- [ ] **Step 5: Run targeted tests and full frontend suite.**
- [ ] **Step 6: Commit** `refactor(marketing): use semantic route transitions`.

### Task 8: Token, Responsive, Reduced-Motion, and Motion-Economy Pass

**Files:**
- Modify: `frontend/src/components/public-experience/human-trace/cinematicRoutes.css`
- Modify: `frontend/src/components/public-experience/human-trace/homeHumanTrace.css`
- Modify: `frontend/src/components/public-experience/human-trace/CinematicPublicShell.jsx`
- Test: existing/new marketing contract tests.

**Interfaces:**
- Public marketing cast is narrowed to one primary sans, one editorial/display voice where needed, and one mono voice; palette remains narrow and semantic.

- [ ] **Step 1: Add/extend tests** for no horizontal overflow hooks/classes, reduced-motion state availability, touch-native scroll ownership, and disappearing onboarding cues.
- [ ] **Step 2: Verify the new contracts fail where current generic behavior remains.**
- [ ] **Step 3: Consolidate route CSS custom properties** for ink/paper/muted/accent, type roles, spatial rhythm, and transition timing.
- [ ] **Step 4: Remove repeated macro reveal patterns** and route-generic “Scroll to explore” copy except transient, context-specific onboarding.
- [ ] **Step 5: Author 1440×900, 390×844, and 430×932 composition rules** plus reduced-motion equivalents.
- [ ] **Step 6: Run full frontend suite and build.**
- [ ] **Step 7: Commit** `style(marketing): finish elite visual system and responsive art direction`.

### Task 9: Remove Superseded Home Architecture and Dead Motion Paths

**Files:**
- Delete when unreferenced: `frontend/src/components/public-experience/human-trace/HumanTraceFilm.jsx`
- Delete when unreferenced: `frontend/src/components/public-experience/human-trace/filmContent.js`
- Delete when unreferenced: `frontend/src/components/public-experience/human-trace/filmMotion.js`
- Delete or retain only if still used: obsolete lens/image crawler helpers and their tests.
- Modify: documentation under `frontend/src/components/public-experience/human-trace/`.

**Interfaces:**
- No production route may depend on the shadow-root Home implementation after this task.

- [ ] **Step 1: Add a failing source-contract assertion** that production Home does not import `HumanTraceFilm` or HTML-string film modules.
- [ ] **Step 2: Verify failure if legacy imports remain.**
- [ ] **Step 3: Remove dead imports/files only after proving they are no longer referenced.**
- [ ] **Step 4: Update Human Trace README/marketing route documentation** to describe the unified architecture and remaining release gates.
- [ ] **Step 5: Run full frontend suite and build.**
- [ ] **Step 6: Commit** `refactor(marketing): remove superseded shadow film`.

### Task 10: Production Verification and Award-Readiness QA

**Files:**
- Add or extend Playwright specs under the repository's existing E2E location if available.
- Update release/readiness documentation only with verified results.

**Interfaces:**
- Deliverable is a branch whose public marketing routes pass automated contracts and build, with explicit reporting of any pre-existing CI failures.

- [ ] **Step 1: Add E2E checks** for Home, How, Career, Progress, Trust, Methodology, Privacy at desktop and portrait viewport sizes.
- [ ] **Step 2: Verify menu/focus/route navigation/Back behavior, Career keyboard selection, Progress keyboard range, and reduced-motion rendering.**
- [ ] **Step 3: Verify fast-scroll/reverse-scroll invariants** on Home, Career, How, and Trust.
- [ ] **Step 4: Run** `npm run test --prefix frontend`.
- [ ] **Step 5: Run** `npm run build --prefix frontend`.
- [ ] **Step 6: Run repository CI where available** and explicitly distinguish pre-existing lint/backend failures from regressions introduced by this branch.
- [ ] **Step 7: Inspect the deployed/preview marketing pages at 1440×900, 390×844, and 430×932; check images, overflow, focus, motion ownership, and route handoffs.**
- [ ] **Step 8: Perform a final source audit** for protected-route changes; expected diff outside public marketing/test/docs is zero except surface-only auth styling if required.
- [ ] **Step 9: Commit** `test(marketing): complete award-readiness verification`.

## Completion Gate

Do not claim the redesign is “9/10,” Awwwards-ready, or production-ready merely because the code compiles. Completion requires evidence for the automated test/build gates, desktop and portrait visual QA, reduced-motion behavior, touch-native behavior, fast/reverse scroll coherence, transition interruption cleanup, and a protected-application diff audit. Image rights, legal/security-claim verification, real-device performance/Core Web Vitals, and final production deployment remain explicitly separate release gates unless verified during execution.
