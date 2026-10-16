# Personality Analysis Marketing Experience — Elite Redesign Design Spec

Date: 2026-10-16
Status: Design approved in conversation; written-spec review required before implementation planning
Scope: Public marketing experience only. Protected dashboard, assessment, API, backend, database, scoring logic, and authenticated application routes are out of scope.

## 1. Objective

Raise the Personality Analysis marketing experience from a strong ~8/10 implementation to a genuinely award-competitive, top-tier experience without replacing the product identity or discarding the strong engineering already present.

The target is not “more animation.” The target is a coherent digital film whose motion explains the product, whose static compositions are authored, whose interaction cost is justified, and whose accessibility/performance remain production-grade.

Primary success criteria:

- The site reads as one authored universe rather than several separately animated routes.
- The product-native protagonist is unmistakable: **The Human Trace** — a human response that remains traceable as it becomes interpretation, context, calculation, time, and provenance.
- Every major scroll segment earns its length through meaningful state change.
- Career Intelligence stops using 17 occupations as 17 scroll chapters.
- Route motion modes become deliberately different: cinematic, explanatory, exploratory, temporal, forensic, editorial, quiet.
- The site remains keyboard-accessible, reduced-motion aware, touch-native where appropriate, and free of scroll trapping.
- Existing product claims and caveats remain truthful; no new psychometric claims, personal scores, or “AI magic” are fabricated.
- Protected application routes are unchanged.

## 2. Current-state findings

### 2.1 What is already strong

The existing marketing implementation has substantial production-quality foundations:

- React 19, GSAP 3.15, Lenis 1.3.26, Framer Motion, Three.js/R3F, Playwright, and Vitest are already available.
- Desktop smooth scrolling is synchronized with ScrollTrigger; touch remains native.
- Reduced-motion handling exists.
- Home has an authored photographic film and product-specific narrative language.
- Marketing routes already distinguish source evidence from interpretation and include careful non-clinical / non-fabricated-score language.
- The global shell has focus trapping, skip navigation, route transitions, and keyboard-aware controls.
- Existing route and media contract tests provide a useful regression base.

These foundations should be preserved rather than replaced with a new generic animation system.

### 2.2 Architectural seams holding the work below the target

1. **Home is isolated from the rest of the marketing shell.** `/` owns a separate shadow-root film, a separate header/footer, and its own Lenis lifecycle, while the remaining routes use `CinematicPublicShell`. This weakens route continuity and duplicates behavior.
2. **Home is authored as HTML/CSS strings.** `filmContent.js` plus a shadow root was effective as an isolation phase, but it now limits first-class React semantics, shared transition actors, route continuity, component-level testing, and maintainability.
3. **Career scroll economics are poor.** Seventeen occupations are represented as seventeen scroll states. The scroll travel is data-count-driven rather than story-driven.
4. **A reusable route choreography has become visible as a template.** Cover parallax, masked headings, generic clip reveals, and “Scroll to explore” cues repeat across multiple routes.
5. **Route transitions choose a visually prominent media actor rather than a semantic actor.** This is clever but not sufficiently authored for the flagship continuity system.
6. **Public CSS has iteration residue.** The current loaded system contains more fonts, colors, radii, shadows, and repeated route-specific variants than the final art direction needs.
7. **The closing acts are under-directed.** Provenance and final resolution are product differentiators and need more narrative territory.

## 3. Research principles adopted

The redesign uses reference mechanics, not copied visual branding.

### Oryzo / Lusion

- Keep one protagonist mentally continuous while its representation changes.
- Continuity matters more than isolated flashy sections.
- The UI should support the hero content, not compete with it.
- Use fewer type families, fewer colors, and fewer UI ideas.
- Choose technology after the visual problem is known.
- Hybrid rendering is preferable to forcing one technique everywhere.

### Awwwards evaluation reality

The public scoring model places the largest weight on Design and Usability, then Creativity and Content. Developer evaluation separately rewards semantics/SEO, animation/transitions, accessibility, web performance, responsive design, and markup/meta-data. The redesign therefore cannot trade usability or engineering quality for spectacle.

### Performance/accessibility

- Favor transforms and opacity for high-frequency animation.
- Avoid layout work on every scroll frame unless measurement is cached and intentionally refreshed.
- Respect `prefers-reduced-motion` with a coherent non-cinematic composition, not a broken/empty sequence.
- Touch scrolling remains native; no forced smooth-touch physics.
- Pinned sections must have useful semantic change throughout their duration.

## 4. Canonical creative thesis

### Commercial opening

**Understand what drives you.**

The current user-facing value statement stays because it is immediately legible and commercially clear.

### Film thesis

**One answer is not one result.**

This becomes the internal dramatic thesis introduced after the human context is established.

### Persistent protagonist

**The Human Trace** is the single continuous protagonist across the site:

human context → response → clauses → evidence → perspectives → working conditions → career possibilities → weighted contribution → temporal record → provenance → user-controlled record

The visitor should repeatedly recognize that the “new” visual material came from something they already saw.

## 5. Global experience architecture

### 5.1 One marketing shell

Move Home into the same persistent `CinematicPublicShell` used by the other marketing routes.

The shell owns:

- one Lenis instance on fine-pointer / no-reduced-motion desktop
- native scroll on touch/coarse pointer
- route navigation
- persistent header/menu/footer
- transition registry
- route progress treatment
- global focus and scroll restoration behavior

Home no longer owns a separate header/footer or separate smooth-scroll engine.

### 5.2 Migrate Home out of the shadow-root string architecture

Replace `HumanTraceFilm`’s `innerHTML` / shadow-root delivery with first-class React scene components while preserving the established photographic art direction.

Reasons:

- shared semantic transition actors can participate across routes
- route navigation becomes one system
- headings and landmarks become directly testable
- JSX supports route-aware content and accessibility state without manual DOM mutation
- CSS can be split and audited rather than carried in one monolithic template string
- SEO/semantic inspection becomes simpler

This is an architectural migration, not a visual reset.

### 5.3 Route operating modes

Each route gets one dominant motion grammar:

| Route | Operating mode | Primary interaction |
| --- | --- | --- |
| `/` | Continuous cinematic film | Scroll-driven causal handoffs |
| `/how-it-works` | Explanatory transformation | Scroll through five real transformation stages |
| `/career-intelligence` | Exploratory spatial field | Five cinematic work worlds + local role exploration |
| `/progress` | Temporal comparison | Time-based reveal + accessible comparator |
| `/trust` | Forensic provenance | Five evidence states with inspectable record |
| `/methodology` | Technical publication | Reading + restrained interactive diagrams |
| `/privacy` | Quiet publication | Reading + in-page navigation |
| `/login`, `/signup` | Focused transactional | Minimal motion, no cinematic scroll |

## 6. Motion grammar

The canonical sequence is:

**MOVE → HOLD → COUNTER-MOVE → OVERLAP → HANDOFF → RESOLVE → READ**

For any flagship handoff:

1. Current composition is readable before it moves.
2. Incoming material may appear early as anticipation.
3. Outgoing actor moves.
4. An internal crop, phrase, line, or subordinate actor counter-moves.
5. Old and new owners overlap briefly.
6. The new scene becomes dominant.
7. The old owner becomes inert/hidden.
8. The new state is allowed to settle before the next event.

Scene-ownership rule: one dominant scene, one incoming scene, optionally one residue. Never a stack of competing translucent scenes.

Fast scrolling must skip nonessential microstates and land on coherent scene endpoints. Reverse scrolling must reconstruct a coherent prior state rather than leaving stale DOM state.

## 7. Home redesign

Home is the trailer for the entire product universe. It should prove the product idea before asking the visitor to inspect details elsewhere.

### Act 1 — The Human

- Keep the current real working-context photography.
- Keep the commercial headline **Understand what drives you.**
- Begin almost still. Motion budget is intentionally low.
- Establish the person/context before exposing analytical layers.
- The existing “Scroll to discover” cue may appear only in the opening orientation moment and must disappear once scrolling begins.

### Act 2 — The Source

- Introduce **One answer is not one result.**
- The response is visually extracted from the working context, not simply faded in.
- A source slip/phrase becomes the persistent actor for the next scenes.
- The original context remains as faint residue long enough to preserve causality.

### Act 3 — Perspectives / Branch

- One response separates into meaningful clauses.
- Clauses lead toward Personality, Interests, and Work Values.
- Paths start before the source fully exits (visual J-cut).
- Source residue remains while the readings become dominant (visual L-cut).
- This becomes one of the signature scenes of the site.
- Existing methodology terms remain content source; no invented score output.

### Act 4 — Work Worlds

Use four states, matching canonical content rather than the current three-state simplification:

1. Precision
2. Autonomy
3. Collaboration
4. Operational pressure

The same Human Trace reacts differently in each environment:

- Precision: geometry tightens and aligns.
- Autonomy: composition opens and gains spatial freedom.
- Collaboration: multiple nodes/people enter the relationship.
- Pressure: pace and density increase; the trace must adapt.

The environments should not be generic photo crossfades. The same evidence actor must physically survive each takeover.

### Act 5 — Weight / Possibility

Introduce the deterministic career contribution model without turning the scene into a dashboard.

Use the canonical 25/25/20/15/10/5 values as physical territory/mass rather than six generic progress bars:

- RIASEC 25
- Skills 25
- Values 20
- Personality 15
- Education 10
- Goals 5

The scene resolves into a possibility field rather than a “final answer.”

### Act 6 — Time

- Slow the film down.
- Use the same actor in baseline and later context.
- Show stability and adaptation through double exposure / match composition.
- Do not imply real longitudinal user history unless two records exist.

### Act 7 — Provenance

Reverse the directional logic of the film.

The visitor has travelled source → interpretation → context → calculation. Provenance travels result → calculation → evidence → source.

Use technical annotations, thin rule lines, source labels, and precise inspection states. This scene should feel more forensic than cinematic.

### Act 8 — The Record / Finale

- Fragments recombine.
- The original response returns.
- Work-world residues echo briefly.
- Weighted contribution resolves into one inspectable record.
- Only then does the primary CTA arrive.

The CTA is a consequence of the resolution, not a footer button placed after animation.

### Home pacing

Reduce unnecessary dead travel and redistribute time toward the final argument. Exact values are tuned after browser QA, but target narrative allocation is approximately:

- Human 0–10%
- Source 10–22%
- Branch 22–38%
- Work Worlds 38–58%
- Weight 58–70%
- Time 70–81%
- Provenance 81–92%
- Record 92–100%

## 8. Career Intelligence redesign

### 8.1 Fundamental change

Remove the current model:

`17 roles = 17 scroll states`

Replace it with:

`5 work worlds = 5 cinematic scroll states`

`17 roles = local interactive data inside those worlds`

Scrolling teaches the model. Clicking/keyboard/touch interaction inspects the data.

### 8.2 Five work worlds

Use the canonical work-world content already in `publicContent.js`:

1. Structured Systems
2. Deep Inquiry
3. Collaborative Delivery
4. Technical Control
5. Creative Synthesis

Each state gets a distinct composition and motion physics. The same Human Trace persists across all five.

### 8.3 Primary occupation grouping

Each canonical role gets one primary world for exploration:

- **Structured Systems:** Software Engineer, Backend Engineer, Electrical Engineer, Embedded Engineer
- **Deep Inquiry:** Data Analyst, Machine Learning Engineer, Cybersecurity Analyst, Business Analyst
- **Collaborative Delivery:** Product Manager, Technical Program Manager, Customer Success Manager
- **Technical Control:** DevOps Engineer, Power Systems Engineer, Control Systems Engineer, Automation Engineer
- **Creative Synthesis:** Frontend Engineer, UX Designer

This is a presentation grouping, not a new scoring rule. The site must not imply that a role only belongs to one environment psychometrically.

### 8.4 Career interaction behavior

Desktop:

- Scroll changes work world.
- Local role labels can be focused/hovered/clicked.
- Selecting a role updates media crop, skill/subject annotations, and inspection text locally.
- Selection never teleports the page to a hidden scroll coordinate.
- Selected role can persist into the next-chapter transition when appropriate.

Keyboard:

- Roving tabindex within the active world.
- Arrow keys move between roles in that world.
- Home/End supported.
- Focus never moves because of scroll without explicit user intent.

Touch:

- Native vertical scroll between worlds.
- Local role navigation uses tap / horizontal control where needed; no forced smooth-touch scrolling.

### 8.5 Career scroll budget

The route may still have a sticky cinematic centerpiece, but its travel is based on five meaningful world transformations, not dataset length. Target range: approximately 320–450svh for the centerpiece, tuned after real viewport QA.

The “Scroll to explore” instruction appears only as a transient onboarding cue near the start of the interactive sequence and then disappears.

## 9. How It Works redesign

Keep the left-fixed/right-progressive concept because the content contains five genuine transformations:

1. Capture
2. Isolate
3. Branch
4. Weight
5. Recompose

Replace the current “five separate supporting images” feeling with one continuous source actor:

- Capture: full response and source context
- Isolate: sentence separates into clauses
- Branch: clauses connect to independent models
- Weight: model evidence becomes proportional contribution
- Recompose: material resolves into an inspectable record

The right column supplies the narrative copy. The left stage owns continuity.

Mobile does not reproduce a giant sticky sequence. It becomes a vertically authored series of compact visual transformations with the same semantic order.

## 10. Trust redesign

Trust becomes the provenance documentary of the site.

Keep the five canonical record states:

**Supplied → Inferred → Calculated → Compared → Controlled**

Use one persistent evidence document / record actor. Each state reveals another layer rather than replacing the entire panel.

Visual grammar:

- source coordinates
- trace lines
- formula annotations
- comparison labels
- ownership/control marks

The final **Controlled** state returns the record visually toward the user to reinforce data sovereignty.

A sticky sequence is justified here because all five steps are semantic transformations.

## 11. Progress redesign

Progress gets a temporal operating mode, not generic cinematic route treatment.

- Opening establishes baseline and later context.
- Same composition/actor appears at two points in time.
- Scroll introduces the time relationship; the range comparator remains the explicit inspection control.
- Comparator remains a real keyboard-accessible `input[type=range]` or equivalent accessible control.
- Copy continues to state that real personal comparison requires multiple completed records.
- No fabricated “before/after” score claims.

## 12. Methodology redesign

Methodology becomes the calmest information-dense route.

- One strong opening composition.
- Persistent desktop chapter index; inline mobile chapter navigation.
- Eight canonical sections remain source-derived.
- Use restrained diagrams for Big Five, RIASEC, work values, career weights, validity, and AI role.
- Avoid a long pin and avoid generic reveal animation on every chapter.
- The design should resemble a precise technical publication, not a second homepage.

## 13. Privacy redesign

Privacy remains quiet and highly readable.

- No cinematic pinning.
- No decorative 3D/WebGL.
- Strong typographic hierarchy and in-page contents.
- Subtle Human Trace rule/annotation motif may connect it to the broader brand.
- Existing legal/security claims are not strengthened or rewritten as verified guarantees without separate audit.

## 14. Auth routes

Login/signup logic is not redesigned functionally.

Only align surface language with the marketing system:

- typography
- palette
- spacing
- focus treatment
- route transition entry/exit

No cinematic scroll and no hidden form state changes.

## 15. Route transitions

Replace “largest visible media wins” with semantic transition actors.

Define three families:

### A. Human Trace carry

Routes: Home ↔ How ↔ Trust

Carries a source/evidence actor with a stable semantic key.

### B. Context media carry

Routes: Home ↔ Career ↔ Progress

Carries the currently meaningful work/environment actor.

### C. Quiet editorial transition

Routes: Methodology, Privacy, Auth

Simple opacity/clip/focus transition. No forced spectacle.

Implementation rule:

- Source actor and destination actor use explicit matching transition keys.
- Destination geometry is measured from the real mounted destination.
- If the destination actor is absent, fall back to the quiet transition rather than guessing a rectangle.
- Route transition snapshots must never block focus or pointer input after navigation completes.
- Reduced motion navigates directly with a minimal crossfade or no transform.

## 16. Visual system

### 16.1 Type

Limit the marketing experience to three functional voices:

- Primary sans: Instrument Sans
- Editorial/display: Newsreader only where a true editorial contrast is required
- Technical mono: DM Mono or IBM Plex Mono; pick one for the final system

Do not expose the broader dependency font inventory in marketing styling.

### 16.2 Palette

Keep the current dark green / mineral / paper world and formalize semantic tokens:

- ink
- deep field
- paper
- mineral
- evidence line
- subdued text
- one restrained accent for focus/active evidence

Avoid new gradient systems. Photography and composition carry the visual richness.

### 16.3 Surfaces

Reduce the visual vocabulary:

- very few radii
- one or two shadow/elevation levels maximum
- no generic card farm
- no universal pill treatment
- photographs should often act as composition planes rather than “images inside cards”

## 17. CSS/component architecture

Keep the `human-trace` domain but split responsibilities.

Proposed structure:

```text
human-trace/
  CinematicPublicShell.jsx
  routeNavigation.js
  content/
    careerWorlds.js
  home/
    HumanTraceHome.jsx
    homeSceneModel.js
    useHomeFilm.js
  routes/
    HowCinematicPage.jsx
    CareerCinematicPage.jsx
    ProgressCinematicPage.jsx
    TrustCinematicPage.jsx
    MethodologyCinematicPage.jsx
    PrivacyCinematicPage.jsx
  motion/
    useCinematicScroll.js
    useSceneOwnership.js
    routeTransitionRegistry.js
  styles/
    tokens.css
    shell.css
    home.css
    how.css
    career.css
    progress.css
    trust.css
    methodology.css
    privacy.css
```

The exact split may be adjusted during implementation if a smaller boundary is clearer, but the monolithic `CinematicRoutes.jsx` and giant route stylesheet should no longer own unrelated route behavior.

## 18. Scroll engine contract

- One Lenis instance owned by the persistent marketing shell on fine pointer + no reduced motion.
- Lenis is driven from GSAP’s ticker and not from a competing RAF loop.
- `ScrollTrigger.update` subscribes to Lenis scroll.
- Disable GSAP lag smoothing for the synchronized marketing ticker if testing confirms it improves sync without regressions.
- Touch/coarse pointer stays native.
- Nested interactive controls are excluded from scroll smoothing as needed.
- Route changes destroy route-specific triggers and keep only the shell engine alive.
- ScrollTrigger refresh happens on font readiness, viewport changes, and known layout changes, not arbitrary image-load thrash.

## 19. Accessibility contract

Every new scene must satisfy the following:

- Logical DOM order independent of visual transforms.
- All interactive controls are keyboard reachable.
- Roving-tabindex patterns preserve focus location.
- No scroll state is required to access critical information.
- Pinned scenes remain understandable with `prefers-reduced-motion`.
- Reduced-motion versions use authored static compositions rather than simply hiding animated layers.
- Menu focus trap remains correct.
- Route navigation focuses the destination heading after transition completion.
- Decorative motion/imagery is hidden from assistive technology where appropriate.
- No focus is programmatically moved because the visitor merely scrolled.

## 20. Performance contract

- High-frequency scroll motion uses transform/opacity/clip-path where practical.
- Avoid React state updates per scroll frame.
- Cache geometry during active sequences and invalidate deliberately.
- Lazy-load below-fold imagery; prefetch only the next likely scene/route.
- Avoid adding WebGL unless a specific scene cannot communicate the idea adequately with DOM/SVG.
- No autoplay video is required for the redesign.
- Large photographic files must retain responsive derivatives and authored dimensions.
- Remove dead public-experience CSS/components only after the new canonical routes pass regression tests.

## 21. Product/content integrity

Non-negotiable:

- A single response may illustrate a trace but must never be presented as enough evidence for a scored profile.
- Career world grouping is editorial organization, not a new scoring model.
- Career-fit weights remain the existing deterministic 25/25/20/15/10/5 model.
- Progress examples remain illustrative unless real authenticated history exists.
- The product remains non-clinical.
- Privacy/security statements are not strengthened beyond the existing source without verification.

## 22. Implementation testing requirements

Implementation is not complete until all of these are run and inspected.

### Automated

- `npm run build`
- `npm test`
- `npm run check:living-record`
- existing media integrity / marketing contract tests
- new pure-function tests for scene models and career world mapping
- new component tests for keyboard role selection and provenance controls

### Browser QA

Desktop:

- 1440×900
- 1280×800
- wide 1728×1117 or similar

Mobile/touch compositions:

- 390×844
- 430×932

States:

- normal motion
- `prefers-reduced-motion: reduce`
- keyboard-only navigation
- back/forward route navigation
- fast scroll
- reverse scroll

Checks:

- no horizontal overflow
- no blank/black transition frames
- no duplicated fixed chrome
- no stale pinned scene after reverse/fast navigation
- no click-driven page teleport in Career
- route-transition focus lands correctly
- all essential content available without animation

### Performance review

Capture production-preview measurements for LCP, CLS, and INP where tooling permits. The redesign should not claim award-readiness if the visual result depends on obvious jank or long input blocking.

## 23. Acceptance bar

### Design

- Hero, signature branch scene, Career work-world centerpiece, Trust provenance state, and finale each work as strong static frames.
- No generic SaaS card/grid section becomes a flagship scene.
- Photography is compositional, not decorative filler.

### Usability

- Scroll effort corresponds to meaningful narrative change.
- Career roles are inspectable without scrolling through all seventeen.
- Touch and keyboard flows are deliberately authored.

### Creativity

- Human Trace is recognizable as a product-specific visual idea.
- Motion verbs come from the product: preserve, isolate, branch, weigh, compare, trace, return, recompose.

### Content

- Copy remains legible and truthful.
- Product limitations stay visible.
- No animation obscures required context.

### Developer quality

- Semantics, responsiveness, accessibility, transitions, and performance are first-class release criteria.
- No production merge is justified solely by visual polish.

## 24. Explicit non-goals

- No dashboard redesign in this phase.
- No assessment-flow redesign in this phase.
- No backend/scoring/data-model changes.
- No clinical positioning.
- No new 3D engine or shader system just to make the site appear more advanced.
- No wholesale replacement of the existing photography direction unless asset rights/quality review later requires it.

## 25. Delivery sequence after spec approval

Implementation planning should be ordered to protect continuity and reduce regression risk:

1. Persistent shell + unified scroll/transition foundation
2. Home React migration + new scene model
3. Career five-world architecture
4. How persistent-source transformation
5. Trust provenance sequence
6. Progress temporal treatment
7. Methodology/Privacy restraint pass
8. Auth surface alignment
9. Token/CSS cleanup and dead-code removal
10. Full automated + browser QA and surgical corrections

No protected application route should be modified to accomplish these changes.
