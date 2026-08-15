# Personality Assessor — Phase 4 Full Production Reconstruction Specification

**Date:** 15 August 2026  
**Repository:** `analyticsmath/PersonalityAnalysis`  
**Implementation target:** real production frontend on the current local `main` branch  
**Last remote production commit inspected:** `02f1ecf319d2cafdf26b73cbdb8f4c5d5f174d7f` (`Phase 3C Production redesign`)  
**Canonical UI/UX constitution already in the repo:** `docs/ui-ux/Valtum_UI_UX_Frontend_Brain_MASTER_LATEST_2026-08-15.md`  
**Implementation mode:** **DIRECT PHASE 4 PRODUCTION RECONSTRUCTION — NO LAB, NO PROTOTYPE, NO A/B VERSIONS, NO DESIGN EXPERIMENT, NO “TRY THREE OPTIONS” PASS.**

---

# 0. Actual execution request

Implement the complete Phase 4 frontend reconstruction described here directly in the real Personality Assessor production codebase.

This is the definitive corrective redesign after the rejected Phase 3C production pass. It covers every visible frontend surface: public homepage and chrome; all public secondary routes; login/signup; protected product shell; dashboard; analytics; assessment start/context; adaptive questions; behavior assessment; results; Career Explorer; privacy/account; and important loading, empty, error, reduced-motion, desktop, tablet and mobile states.

Do **not** create another design lab, hidden prototype route, temporary visual experiment, A/B variant, visual sandbox, or alternative direction for later selection. Codex is the implementation agent, not the art director. The design decisions below are already resolved from the Master Brain, current product truth, rejected browser screenshots, repository source, previous implementation failures, award-level case studies, app/mobile guidance, typography research, animation documentation and performance research.

---

# 1. Authority order

Before editing anything:

1. Read `docs/ui-ux/Valtum_UI_UX_Frontend_Brain_MASTER_LATEST_2026-08-15.md` completely.
2. Give latest superseding rules, especially **C52/C53**, highest design priority.
3. Read this Phase 4 file completely.
4. Inspect current local `main` HEAD, not merely the last remote SHA above.
5. Inspect real imports, hooks, routes, backend-facing contracts and runtime states for every surface you touch.
6. Preserve backend, authentication, assessment-state, scoring, persistence, career logic, privacy and data semantics unless a frontend-safe compatibility fix is strictly necessary.
7. When Phase 4 conflicts with older Phase 3A/3B/3C visual choices, **Phase 4 wins**.
8. When a requirement is technically impossible, report the exact conflict instead of silently substituting a generic pattern.

Authority sequence:

`current product truth → latest Master Brain/C53 → this Phase 4 spec → current production code → older design/implementation docs`

Mona Sans, the mineral/green-black palette, ManyPixels, giant Work Worlds image cards, the universal dashboard-widget system, and the current Context theatre are rejected historical evidence, not current locks.

---

# 2. Why this reconstruction exists

Personality Assessor is being built as a flagship Valtum Studio portfolio/case-study product for an imminent Australian studio launch. It must credibly demonstrate the level of thinking and execution expected in premium custom software and web engagements, not the visual grammar of a low-budget template customization.

The frontend therefore needs to demonstrate, in one coherent product:

- original art direction;
- high-resolution UI/UX reasoning;
- media art direction;
- typography with character and usability;
- motion design with product meaning;
- truthful charts/data representation;
- app-quality mobile interaction;
- accessible forms/tasks;
- responsive performance;
- production engineering discipline.

This does **not** mean adding more effects. The governing definition remains:

> **Premium means resolution.**

Every crop, line break, state, scroll boundary, interaction, chart, loading state and mobile composition must feel deliberately resolved.

---

# 3. Verified product truth — preserve the real product

The frontend must continue to support the real journey:

1. Account creation/sign-in.
2. Professional stage/context selection.
3. CV upload or manual professional context.
4. Structured interpretation of professional context.
5. Adaptive assessment.
6. Normal question target around 22, with extension possible up to 26 according to current product contracts.
7. Question types returned by the product, including MCQ, Likert, scale/slider, text and scenario/behavior interactions.
8. Results including Big Five/OCEAN, RIASEC, Work Values, Career Signals and career intelligence.
9. Curated career comparison with relationship/gap/development reasoning.
10. Stored history and longitudinal analytics only when enough real history exists.
11. Real privacy/account-data controls supported by the backend.

Core numeric scoring and career logic are structured/deterministic. AI may participate in context/question/narrative assistance, but UI must never imply that free-form AI prose is the source of deterministic scores.

Never invent clinical validity, diagnostic authority, guaranteed career success, accuracy percentages, confidence percentages, testimonials, customer counts, certifications, employer endorsements, benchmark claims, unsupported retention periods, or fake zero values. Missing is unknown, not zero.

---

# 4. Phase 3C rejection forensics — remove the system, not individual styles

## 4.1 TEXT–CONTAINER–CARD LOOP

Hard failure:

`heading → paragraph → rounded/bordered container → heading → paragraph → repeated cards/rows → another section repeating the same syntax`

If a public page still reads primarily as “heading, paragraph, cards, heading, paragraph, cards,” Phase 4 has failed.

## 4.2 Hero failure

Reject the current combination of detached white header slab, divider line, predictable left-copy/right-photo split, generic modern-sans display, one large rounded rectangle plus one small floating rectangle, and little true image/type interlock. The three current hero photos are useful; their timid composition is the problem.

## 4.3 Work Worlds failure

Reject enormous same-shaped 16:10 images, continuous horizontal tween, opacity-only active state, media that consumes too much viewport height, central `Previous / 1 of 6 / Next` carousel grammar, and movement with no settle/dwell plateau.

## 4.4 Context → Question → Signal failure

Reject centered title/paragraph + giant white macro-card + three equal mini-cards + uppercase tag + divider + answer cards + preselected answer + selected tint + colored signal edge + all states visible at once. Also reject the broken ghost/debug artifacts observed in the screenshots: duplicated `Inspect match`, black progress/guide lines, overlapping intermediate text and sticky-header collisions.

The new section must **show** evidence becoming a question and a user response becoming a signal.

## 4.5 Secondary-route failure

Reject:
- How It Works = text cards + sticky rectangle;
- Career Intelligence = role cards + large rectangle + three reasoning cards;
- Progress = equal card/filmstrip grid;
- Methodology = framework explanation cards;
- Trust = numbered white rows;
- every route sharing one macro silhouette.

## 4.6 Product-app failure

Reject universal `.dashboard-grid`/`.dashboard-widget` thinking, desktop 12-column layout merely stacking on phone, MetricCard repetition, ManyPixels identity, analytics as module inventory, and result/career pages as report-card walls.

## 4.7 Motion failure

Reject fade/translate as the entire motion language, IntersectionObserver threshold swaps presented as cinematic continuity, long scrub without settle/dwell, actors never reaching a stable optical position, duplicate intermediate artifacts, and global smooth scrolling used as a substitute for choreography.

---

# 5. Research synthesis translated to Personality Assessor

## 5.1 Lusion / Oryzo principles

Use the principles, not the surface: believable world over sterile abstraction; protagonist at the center; fewer typefaces/colors/UI ideas when media already carries richness; UI supports the world; premium storytelling often means dialing chaos down; seamless continuity matters more than isolated flashy sections; custom human intent beats stock illustration packs; much of UX is deciding what not to add.

Do not copy Oryzo’s coaster, desk joke, palette, 3D, exact type, or exact motion.

## 5.2 Vizcom / OFF+BRAND principles

The experience itself can explain a product. Motion should compress understanding and demonstrate the core transformation rather than decorate paragraphs. For Personality Assessor this means the chain `professional evidence → adaptive question → interpretable profile` must be visually experienced, not merely written out.

## 5.3 Dogstudio / Zoox principles

Build a strong product-native concept before components. Use native product material to drive art direction. Technology follows the concept. Our recurring material is professional evidence: environments, documents, selected context, responses, signals, profile measures, career relationships and new work returning to the profile.

## 5.4 OFF+BRAND / Lando Norris principles

Motion belongs to identity. Lando earns speed because racing is the subject. Personality Assessor earns motion that feels like gathering, isolating, connecting, resolving and returning evidence — not generic speed/parallax/cinematic decoration. Responsive performance is part of the experience.

## 5.5 White Desert / live-forensic principles

Let photography carry chromatic/emotional load, alternate environment and close detail, use stable spatial anchors, allow different content to earn different compositions, and preserve meaning rather than desktop camera paths on mobile.

## 5.6 App/mobile principles

Mobile must respect safe areas, direct touch, essential information first, stable top-level navigation, comfortable targets, preserved navigation state and full-bleed content where useful. The target is not “responsive.” The target is that someone seeing only 390px believes it was a primary design canvas.

---

# 6. Final visual identity lock

**North star:** humane interpretation of professional complexity.  
**Persistent protagonist:** professional evidence becoming legible.

The visual material family includes professional environments, documents, notes, plans, work artifacts, selected evidence, response choices, connected signals, profile measures, career relationships, and new work returning to the profile.

It is not a floating AI brain, personality sphere, horoscope avatar, HR dial, gradient orb, stock dashboard, or generic career SaaS.

Emotional target: intelligent, human, editorial, analytical, calm, specific, professional, authored, confident without certainty theater.

---

# 7. Final typography — reject Mona Sans for Personality Assessor

## 7.1 Families

### Source Sans 3 Variable
Use for body, UI, navigation, forms, assessment, product shell, charts/data, buttons, compact facts and operational headings.

### Source Serif 4 Variable
Use selectively for the hero proposition, a small number of major narrative statements and the final terminal statement where appropriate.

Do not make every H2 serif. The serif is a human/editorial countervoice, not a luxury-site costume.

## 7.2 Implementation

- Restore/add local `@fontsource-variable/source-sans-3` and `@fontsource-variable/source-serif-4`, or equivalent local WOFF2 assets if already available.
- No Google Fonts/CDN dependency.
- Remove Instrument Sans and Mona Sans imports/assets only after repo-wide usage audit proves they are dead.
- `font-display: swap`.
- `font-optical-sizing: auto` for Source Serif where supported.
- tabular figures for scores/history where useful.

## 7.3 Weight discipline

Source Serif: hero `430–470`; editorial statements `430–500`; no 700/800 default.  
Source Sans: body `400–430`; UI `450–520`; strong operational labels `560–620` only when needed.

## 7.4 Type scale

### 1440×900
- hero: `clamp(4.8rem, 6.15vw, 6.4rem)`, ~78–98px, line-height `0.90–0.95`, tracking `-0.035em`;
- cap 1366×768 hero around `78–84px`;
- major narrative serif `58–72px`;
- public sans section title `42–56px`;
- public body `17–19px`, line-height `1.45–1.58`;
- compact body `15–17px`;
- UI `14–16px`;
- data labels `12–14px`;
- dominant data values `28–54px` according to hierarchy.

### 390×844
- hero serif `52–58px`, line-height `0.92–0.98`;
- major statement `38–46px`;
- route H1 `44–54px` if the text length permits;
- product page title `28–34px`;
- assessment question `28–36px`;
- body `16–17px`;
- UI `13–15px`.

Hard failures: Mona Sans identity, modern-grotesk-everywhere, extra-bold hero, giant centered H2+paragraph repeated, uppercase micro-eyebrows, decorative tiny labels, paragraph walls.

---

# 8. Final color system — Neutral Gallery + Media Color

The mineral/chocolate/green-black system is rejected.

```css
--pa-bg: #FFFFFF;
--pa-bg-soft: #F4F5F6;
--pa-surface: #ECEFF1;
--pa-ink: #0B0B0B;
--pa-ink-2: #171717;
--pa-text: #4F5358;
--pa-muted: #767B81;
--pa-rule: #D9DDE1;
--pa-dark: #0B0B0B;
--pa-dark-text: #F7F7F5;
--pa-dark-muted: #B7BBC0;
--pa-info: #2F5D91;
--pa-success: #15704E;
--pa-warning: #94610C;
--pa-error: #A33A45;
--pa-focus: #245BD6;
```

There is **no permanent marketing accent**. Photography, real professional artifacts, custom graphics and data semantics carry color.

Semantic colors are for real application state — not selected marketing tints, decorative side stripes or section branding.

No muddy near-black, lime/citron, purple-blue AI palette, glowing cyan, amber luxury-tech accent, gradients, or rainbow charts.

---

# 9. Geometry / spacing / surfaces

Public gutters: 1440+ `56–72px`; 1366 `48–56px`; 1024 `32–40px`; 768 `24–32px`; phone `18–20px`.

Use pressure/release rather than one universal section padding token. Alternate dense media world, short open statement, focused interaction, quiet transition, analytical field and image-led chapter.

Whitespace is premium only when it focuses, releases, establishes atmosphere or improves task clarity. Empty space caused by weak composition is unfinished, not premium.

No universal radius. Imagery `0–14px` depending material; form controls `6–10px`; true cards `8–14px`. Public narrative fields normally have no enclosing rounded rectangle.

Shadows are not default separators. Prefer position, media layering, crop, overlap, field change and typography.

No decorative full-width section dividers. Functional list/table separators are allowed.

---

# 10. Media system

## 10.1 Approved hero sources — keep all three

1. Pexels `9618456` — architectural workspace — dominant.
2. Pexels `5940721` — professional laptop/documents — human context.
3. Pexels `9617376` — architectural plans/evidence wall — supporting evidence plane.

Do not replace them in Phase 4.

## 10.2 Work Worlds Build

Keep processed Pexels `34804003` if the current derivatives are correct. Never reintroduce rejected Pexels `7988086` silently.

## 10.3 Hero treatment

Stop treating every image as a rounded rectangle. Use asymmetric crop hierarchy, partial off-canvas placement, image/type interlock, overlapping planes, purposeful edge escape and precise hard-edged `clip-path` fragments.

Create **3–5 maximum** foreground fragments from the same approved evidence world: blueprint/paper edge, notebook/page fragment, drafting-tool cluster, document corner, laptop/keyboard edge, hand/document crop when clean.

If a clean alpha cutout cannot be made without looking fake, do not make a sloppy pseudo-cutout. Use a precise irregular crop instead.

No stickers, floating labels, icon overlays, random shapes or feature captions on photos.

## 10.4 Registry

For each important photo maintain source/provenance, semantic role, desktop/tablet/mobile focal point, width/height envelope, object-position, responsive sizes, loading priority, alt text, transition participation and fallback.

Preserve AVIF/WebP/JPG responsive delivery, mobile art direction, eager/high priority for LCP hero media and lazy below-fold media.

# 11. Final motion architecture

## 11.1 Native scroll is the source of truth

Phase 4 selects **native browser scrolling + GSAP ScrollTrigger for owned flagship sequences**.

Remove global `ScrollSmoother` creation from `PublicMotionRoot`. Do not add Lenis.

Current defects are choreography/geometry defects, not a lack of smooth-scroll technology. Native scroll is more predictable for touch, accessibility, sticky/pin interactions and launch-time reliability. Smoothness must come from correct interpolation, settle/dwell and media continuity.

`PublicMotionRoot` may remain as a lightweight provider for reduced-motion state, pointer capability and explicit scroll-to helpers. It must no longer own an alternate scroll universe.

## 11.2 Ownership

**GSAP + ScrollTrigger:** homepage hero carry, desktop Work Worlds, desktop Evidence→Question sequencing, `/how-it-works` persistent sequence, and only genuinely shared cross-scene carries.

**Framer Motion:** profile lens exchange, career list→detail, dashboard reflow, drawers/sheets, selected app state and mobile detail transitions.

**CSS:** focus, pressed, hover and small non-cinematic feedback.

## 11.3 Grammar

Every flagship sequence follows:

`enter → establish → transform → dwell → carry → resolve → release`

A dwell is a finished readable composition, not extra scrolling while the actor keeps drifting.

Where scroll-linked, prefer numeric scrub around `0.25–0.40s`; avoid slow lag that disconnects animation from scrolling. Use semantic timeline labels.

## 11.4 Reduced motion

Reduced motion is an alternate composition: no long pin, no large panning/scale camera move, direct static states, direct controls, meaningful DOM order. Do not retain 500vh pin distances with duration zero.

---

# 12. Public header — integrate it with the scene

At `/`, the header belongs to the hero:

- transparent;
- no white slab;
- no bottom border;
- no blur;
- no floating pill;
- brand left;
- nav quiet;
- sign-in and primary action right.

When the **hero actually releases**, the header may become a compact neutral surface. Tie this to the hero boundary/timeline or explicit ScrollTrigger callback — not the current generic IntersectionObserver “largest intersecting scene” approach.

For later dark/light route regions, use explicit route/section ownership instead of a universal cinematic threshold observer.

Mobile header: ~`60–64px`, brand left, menu right, safe-area-aware, touch targets >=44px. The menu must feel like an intentional mobile navigation view, not compressed desktop navigation.

---

# 13. Homepage — seven connected scenes, not ten text-heavy sections

Reduce visible public homepage prose by approximately **50–65%** relative to rejected Phase 3C. A visitor must understand the core product even if body paragraphs are hidden.

---

# 14. Homepage Scene 1 — Evidence Studio Hero

## Copy lock

**H1:** `Your work leaves evidence.`  
**Support:** `Professional context becomes adaptive questions, distinct profile readings and career direction you can inspect.`  
**Primary:** `Build my profile`  
**Secondary:** `See how it works`

No eyebrow, badge or third explanatory paragraph.

## 1440×900 geometry

Do **not** use a two-column grid.

### Text
- x `56–72px`;
- y approximately `22–28svh`;
- width `48–54vw`;
- can overlap media field;
- CTA remains in first viewport.

### Dominant Pexels 9618456
- x `46–50vw`;
- y `18–22svh`;
- width `48–52vw`;
- visible height `50–56svh`;
- irregular crop/hard-edged mask allowed;
- not a standard 16:10 card.

### Supporting Pexels 5940721
- x `61–66vw`;
- y `58–64svh`;
- width `18–22vw`;
- height `22–28svh`;
- foreground relative to dominant.

### Evidence-wall Pexels 9617376
- x `76–82vw`;
- y `10–15svh`;
- width `14–19vw`;
- height `24–32svh`;
- behind/partially off canvas.

### Artifact fragments
- `3–5` maximum;
- mostly `8–16vw`;
- one may cross the type/media boundary;
- no critical word more than ~10–15% occluded.

## 1366×768

This is a first-class acceptance viewport:

- hero H1 cap `78–84px`;
- dominant media height `46–50svh`;
- support copy max ~2–3 lines;
- CTA visible;
- no actor touching/covering header;
- width and height both constrain media.

## Hero arrival

Cold load after critical media/font readiness:
- title line-mask/clip reveal;
- dominant establishes with minimal transform;
- supporting/evidence planes arrive from their spatial directions;
- fragments settle;
- total ~`650–950ms`;
- after settlement, actors stop moving.

No endless floating.

## Hero → Work Worlds carry

One document/media fragment begins moving toward the next chapter. Avoid a hard reset where all hero actors disappear at once.

---

# 15. Homepage Scene 2 — Work Worlds Theatre

Keep six worlds: Build, Investigate, Make, Shape, Structure, Collaborate.

**H2:** `Work changes the evidence.`  
**Support:** `Different environments reveal different ways of solving, making, structuring and collaborating.`

World descriptions should be 4–10 words, e.g.:
- Build — `Constraints reveal how you construct systems.`
- Investigate — `Uncertainty reveals how you search for proof.`
- Make — `Iteration reveals how you refine.`
- Shape — `Ambiguity reveals what you notice.`
- Structure — `Complexity reveals how you organize.`
- Collaborate — `Shared pressure reveals how you align.`

## Desktop stage

At 1366×768 and 1440×900:
- stage max `100svh`;
- title + compact controls ~`14–18svh`;
- active media width `44–48vw`;
- active media height `40–46svh`;
- previous visible context `8–12vw`;
- next visible context `10–16vw`;
- active title/description/navigation all visible during dwell.

## No giant horizontal card track

Do not render six equal flex cards and tween the whole track. Use one persistent stage with active protagonist plus previous/next spatial fragments. Data-driven rendering is fine; visual geometry must use shared stage slots rather than repeated cards.

## Desktop timeline

One GSAP timeline + one ScrollTrigger with semantic labels:

```text
build-enter
build-settled
investigate-enter
investigate-settled
make-enter
make-settled
shape-enter
shape-settled
structure-enter
structure-settled
collaborate-enter
collaborate-settled
release
```

Per transition duration ratio `0.70–0.95`; per dwell `1.00–1.35`. During `*-settled`, no material continuous movement.

Tune total narrative around `460–520vh`; never implement a single arbitrary 3.8-screen tween.

Previous/Next must target the same timeline labels using `labelToScroll()` or a timeline-derived equivalent. Do not maintain a separate index-scroll geometry system.

Do not make `1 of 6` central UI. Position may be announced via aria-live.

## Mobile

No desktop pin. Use touch-native native scrolling with one dominant portrait/art-directed image, current world name/short description, visible next-world peek and direct controls. Native scroll-snap is allowed only if the composition remains excellent; otherwise use an authored vertical sequence. Preserve meaning, not the desktop camera path.

---

# 16. Homepage Scene 3 — Evidence → Question → Signal

This replaces the old quiet bridge and the giant white Context card.

Use one compositional statement:

`Context changes the question.`

No paragraph before a giant container.

## Persistent actors

Keep stable DOM actors for raw context document, 2–3 evidence phrases, selected anchor, question, response group, signal measure and carry target into profile. Never remount whole scenes at scroll thresholds.

## Scroll-owned states

```text
c0-evidence
c1-isolate
c2-anchor
c3-question
c4-responses
```

- `c0`: real document/evidence field.
- `c1`: secondary context recedes; one phrase isolates.
- `c2`: phrase becomes the question anchor.
- `c3`: question emerges from that coordinate relationship.
- `c4`: responses appear; **nothing selected**.

Scrolling stops owning causality at the response state. Scroll must never pick an answer.

## User-owned selection

Click/tap/keyboard selection triggers a short local transition:

`response → compressed decision token → visible signal measure`

Use movement, connection, weight, neutral marker and accessible checked state. No blue/purple/yellow side stripe. No selected marketing tint. No giant signal card.

## No-selection path

Do not trap the visitor. If they continue without selecting, resolve into a neutral “many signals feed the profile” visual and continue. Do not fabricate a personalized signal. If they interact, label the public demo as illustrative.

Desktop scroll length target `260–320vh`, tuned to content. Never pin a static container for `+=2800`.

Mobile: natural vertical sequence with one major state per screen region. No long pin, ghost text, guide bars, or overlap with the header.

---

# 17. Homepage Scene 4 — Living Profile Field

**H2:** `Four readings. Kept separate.`  
**Support:** `Personality, interests, values and career signals answer different questions.`

Use one open analytical field, not a white tab-card.

Four direct lenses:
1. Personality;
2. Vocational Interests;
3. Work Values;
4. Career Signals.

Selector may be a left rail on desktop and compact horizontal selector on mobile, with proper accessible tab semantics if appropriate. The visual field is the protagonist.

Representations:
- Big Five — horizontal lollipop/position measures on shared 0–100 scale;
- RIASEC — radar + exact ranked list;
- Work Values — ordered horizontal bars;
- Career Signals — evidence-linked lollipop/measures.

No 3D sphere, trait bubbles, rainbow palette or four giant cards.

Lens change uses Framer Motion/shared layout or modest app-state motion. Old geometry resolves and next representation occupies the same field.

---

# 18. Homepage Scene 5 — Career Relationship

**H2:** `A fit score should explain itself.`  
Optional support: `Inspect where a role aligns, where it stretches and what could strengthen the relationship.`

Desktop architecture:
- editorial role index left;
- active environment image dominates middle/right;
- reasoning open around/below image;
- fit breakdown only if clearly illustrative public demo or truthful endpoint data.

Do not make role cards, repeated `Inspect fit` badges or three reasoning cards.

`Why it relates`, `Where it stretches`, `What can strengthen it` are semantic concepts, not automatic boxes. At desktop they can be open columns or staggered text. At mobile show focused reasoning without card wall.

---

# 19. Homepage Scene 6 — Development / New Evidence Loop

**H2:** `New work changes the profile.`

Represent one continuous loop:

`gap → deliberate work → artifact → new evidence → profile return`

Use approved photography, document/artifact fragments, product UI/profile measures and bespoke product-native SVG evidence graphics.

**Do not use ManyPixels, Storyset, unDraw or Icons8 illustration packs.** If a true high-quality custom human illustration family is unavailable, do not invent a poor programmatic person. Build this chapter from real media and product-native artifacts instead.

The return-to-profile relationship must be visually obvious.

---

# 20. Homepage Scene 7 — Trust Resolution + Integrated Footer

Trust statement: `See what shaped the result.`

Represent compactly:

`professional context → structured scoring → narrative assistance → your controls`

Terminal statement: `Build a profile you can return to.`  
Support: `Your work changes. Your evidence can change with it.`  
Primary: `Build my profile`  
Secondary: `Sign in`

Use true neutral black `#0B0B0B`, one quiet evidence/document/profile silhouette and useful footer navigation in the same resolved scene. No muddy dark, giant empty mood footer or decorative divider motif.

# 21. Secondary public routes — distinct macro silhouettes

Secondary routes share typography, token quality and craft. They **must not** share one macro-template. Sharing low-level primitives is fine. Rendering all six routes through one repeated `PublicMarketingPage` visual shell is not.

Split route modules if necessary.

---

# 22. `/how-it-works` — Persistent Process Stage

Purpose: show the product journey by transforming one evidence/profile artifact.

Four major stages:
1. `Professional context`
2. `Adaptive question`
3. `Four readings`
4. `Career direction`

The visual stage carries the main explanation. Detailed accessible copy can exist, but do not make paragraphs the protagonist.

## Desktop

- open text rail ~`30–34vw`;
- stable visual stage ~`44–48vw`;
- stage top ~`12–15svh`;
- height `56–62svh`;
- no card around either column;
- each narrative step ~`72–85svh` scroll ownership;
- actor establishes, transforms, settles, dwells.

Replace current IntersectionObserver image swapping with a real persistent GSAP timeline. The visual stage must show context artifact → isolated evidence → prompt → multi-reading profile → career relationship, not simply replace image A with image B.

## Mobile

No long desktop pin. Use an app-like story: compact anchored visual area where useful, direct step copy, touch-safe next/back or natural scrolling, and no actor hidden behind mobile chrome.

---

# 23. `/career-intelligence` — Career Atlas

Visual identity: neutral black `#0B0B0B`, photography, white/cool gray type. No olive/chocolate dark.

Architecture:
- large active profession environment;
- editorial role index;
- active role indicated by position/weight/neutral marker, not filled card;
- fit relationship visual;
- reasoning as open typography;
- methodology boundary near the data.

No repeated dark role tiles. No three Why/Stretch/Strengthen cards. No repeated `Inspect fit` badge.

Mobile: role list → focused detail using Framer Motion/shared layout where useful; back restores list scroll position; bottom app navigation is only for the protected app, not public marketing.

---

# 24. `/progress` — Longitudinal Development Journey

No six equal filmstrip cards.

Represent:

`gap discovery → deliberate action → visible work → artifact → new evidence → profile return`

Use mixed scale: one large environment, close detail, document/artifact, profile/data state, open text and final return loop. If public data is illustrative, label it clearly. Never imply a new user has historical progress.

---

# 25. `/methodology` — Analytical Atlas

This page may contain more information because the visitor asked for methodology, but it still must not become an explanation-card wall.

Desktop:
- sticky/anchored framework index;
- native representation field;
- framework copy adjacent to its visualization, not inside giant panels.

Representations:
- Big Five — continuous lollipop/spectrum field;
- RIASEC — radar + ranked territories;
- Work Values — ordered hierarchy/bars;
- Career Signals — evidence-linked measure diagram;
- scoring/AI boundary — provenance diagram separating user context/answers, deterministic numeric logic and optional narrative assistance.

Use semantic `<details>` for deeper limitations/method notes if useful.

No giant framework cards, pill clouds as the main visualization, or repeated identical section shells.

---

# 26. `/trust` — Provenance Flow

Replace numbered card rows with one inspectable flow:

`input → scoring → evidence completeness → narrative role → data controls`

Show what enters, what is deterministic, what AI can/cannot do, what may be missing and what the user controls.

No numbered decorative circles, giant rows or fake confidence percentage.

---

# 27. `/privacy` — Data Control Map

Public privacy should explain data categories and user rights without fear UI. Show account, CV/context, assessment and report/history categories only where product truth supports them.

Real actions may be bounded because they are real controls. Never publish unsupported retention duration. The page must not look like Methodology or Trust with different text.

---

# 28. Authentication — `/login` and `/signup`

Preserve current mutations, validation, Google auth where configured, redirect semantics, password behavior, live regions and accessible labels.

Reject generic 50/50 split-SaaS auth: no marketing slab left + standard form right + stock rectangle.

## Desktop

Make the form the operational protagonist:
- form width `420–480px`;
- positioned around center/right without a boxed card;
- one Source Serif narrative statement can sit left/top;
- one approved evidence/artifact photo can partially bleed behind/around the narrative region;
- media must never be required for the form to render.

## Mobile

**Form first.** Brand → title → form → submit → OAuth → account-switch link → optional visual fragment afterward. The user must not scroll through a marketing scene to create an account.

Inputs `48–54px`, visible labels, strong focus, no floating-label gimmick, no giant pills.

---

# 29. Product Shell — Desktop Product + Mobile App

Preserve the current semantic concept of desktop sidebar + product workspace + mobile bottom navigation, but reconstruct its visual hierarchy.

## Desktop

- sidebar width `216–232px`;
- neutral light or true-black treatment after optical tuning; never muddy green-black;
- no heavy boxed nav inventory;
- active navigation may use a subtle neutral surface because it is a genuine selected state;
- contextual top area is compact and subordinate;
- content owns the workspace.

## Mobile app shell

This is where “app-like, not mobile website” is literal:
- persistent bottom navigation;
- `padding-bottom: env(safe-area-inset-bottom)` / safe-area handling;
- four highest-frequency top-level destinations;
- current navigation state preserved;
- compact contextual top app bar;
- frequent actions near thumb reach;
- no desktop sidebar drawer as the primary mobile navigation model;
- minimum frequent target ~44×44 CSS px;
- content may extend full-bleed beneath/around chrome when safe.

Suggested top-level tabs: Overview, Analytics/Progress, Assess/Resume, Account. Adjust labels only to current route truth.

---

# 30. Dashboard — data maturity controls layout

Do not preserve one layout across all states.

## D0 — zero completed assessments

No grid of empty widgets.

Composition:
1. authored unstarted evidence/profile state;
2. one primary assessment action;
3. secondary CV/context action;
4. compact inline explanation of what happens next;
5. privacy/governance link.

No fake charts, zero scores, `0 Completed Assessments` eyebrow badge, or ManyPixels. Use a product-native SVG/document/evidence composition or approved photography/artifact.

## D1 — one completed assessment

Prioritize:
1. current profile;
2. four reading summaries;
3. top career relationships;
4. next useful action;
5. assessment metadata/history.

No longitudinal trait line from one result.

## D2+ — multiple assessments

Introduce real longitudinal information:
1. current profile + change;
2. trends where sufficient history exists;
3. career relationship/readiness where real data exists;
4. development milestones;
5. history.

The D2+ layout may differ materially from D1.

Cards are allowed for genuinely independent records/actions; `.dashboard-widget` may not remain the default wrapper for every concept.

---

# 31. Analytics — organize by questions, not widget inventory

Replace the current 12-column module inventory with a sequential analytical workspace:

1. **How has the profile changed?** — dominant trait trend/small multiples.
2. **How has career relationship changed?** — readiness/role relation if real.
3. **What skills or milestones changed?** — bars/matrix.
4. **What happened when?** — evidence/assessment timeline.
5. Report/history access.

Do not display a chart when the required history does not exist.

Keep a readable text/table alternative for visual charts. Add actual visual trend when data supports it.

Mobile: one analytical question per major block; no miniature multi-panel dashboard; charts get full width; detail can open in full-screen/sheet-style view.

---

# 32. Assessment Start / Context

This is a product task, not a marketing page.

Hierarchy:
- current stage;
- needed input;
- CV/manual context choice;
- action;
- privacy reassurance.

CV/manual are genuine mutually exclusive choices and can use bounded controls, but not huge feature cards. Prefer direct action rows, compact segmented choice and concise explanation.

Mobile: one decision per screen. No long marketing intro before the task.

---

# 33. Adaptive Questionnaire

Preserve all current session logic, polling, drafts, back behavior, recovery behavior, API payloads and submission semantics. Redesign presentation only unless a frontend bug is discovered.

## One question owns the moment

Desktop:
- quiet progress at top;
- question primary;
- response immediately below/in same reading field;
- back/save/continue reachable.

Mobile:
- question uses roughly top `28–38%` of useful space according to length;
- response owns the lower area;
- bottom primary action safe-area-aware;
- no response hidden beneath browser/product nav.

## MCQ

Compact full-width rows, mobile `56–64px` minimum target, clear radio/selection marker, no colored selected surface required, no preselection.

## Likert

Desktop: compact horizontal anchored scale when label lengths permit; endpoints explicit.  
Mobile: accessible compact five-point control if legible, otherwise `52–58px` rows. Never five giant cards.

## Slider

Large enough thumb, endpoint labels, exact value, keyboard accessible.

## Text/scenario

Readable prompt, textarea sized to expected response, examples/context secondary, no decorative card shells.

## Transition

Use subtle task transition `180–260ms` with ~`6–12px` movement/opacity. No cinematic delay after each answer.

---

# 34. Results

Results must not be a report-card wall.

Hierarchy:
1. profile overview;
2. four readings;
3. relationships/career;
4. interpretation/narrative with provenance;
5. evidence/missing context;
6. methodology/limits;
7. export/report action where supported.

Use the same visual grammar as the public Living Profile, now with real user data. AI-authored prose, if present, must be identified as narrative assistance/status rather than visually conflated with deterministic charts.

---

# 35. Career Explorer

Use master-detail application architecture.

Desktop: compact role index → focused role detail → environment/media where available → fit relationship → strengths/stretch/gaps → development actions.

Mobile: list → full detail; back returns to same list scroll position; bottom app navigation remains coherent.

Do not wrap every role/reason in `.dashboard-widget`.

---

# 36. Authenticated Privacy / Account

Use real controls only: export, delete profile/CV context, delete assessment where supported, delete account.

Organize by task/data lifecycle, not four giant red cards. Destructive action is visually separated, confirmed and explained only using backend truth.

---

# 37. Chart / Data Visualization lock

- Big Five current → horizontal lollipop/position measures on shared scale.
- Big Five longitudinal → line/small multiples only with >=2 valid comparable assessments (or stricter current product rule if applicable).
- RIASEC → radar + exact ranked list.
- Work Values → ordered horizontal bars.
- Career Signals → evidence-linked lollipops/measures.
- Skills → comparison bars/matrix.
- Gaps → matrix/list with magnitude.
- Readiness → line only with real history.
- Evidence/events → timeline.
- Career-fit components → contribution/breakdown only if endpoint returns actual component values.

Every visual has text/numeric alternative, semantic labels and non-color encoding. No rainbow palette.

---

# 38. Illustration / custom graphics

Phase 3C ManyPixels identity is rejected.

Never use ManyPixels, Storyset, unDraw, mixed Icons8 packs, generic AI corporate-vector people, giant blobs, rockets/confetti/stars/brains.

Until a true custom hand-authored human illustration family is available at production quality, use real photography, product-native document/evidence graphics, bespoke SVG diagrams, profile/data graphics and masked artifact compositions. Do not let the absence of custom illustration become an excuse for stock art.

Bespoke SVGs must relate directly to evidence/profile/data and use a neutral line/shape vocabulary. Do not create cartoon people from generic primitives.

---

# 39. Mobile-first / app-like standard

Primary canvas: **390×844**. Also stabilize 430×932, 375×812, 360×800 and 320×568.

App-like means stable navigation, persistent task state, direct touch, immediate feedback, safe-area awareness, no hover dependency, primary purpose per screen, portrait media art direction, meaningful full-bleed content, and protected bottom navigation.

## Mobile public hero

At 390×844:
- gutters `18–20px`;
- header ~60px;
- H1 begins ~`104–120px`;
- serif `52–58px`;
- media begins roughly `320–350px`, tuned to actual line breaks;
- dominant image ~`70–80vw` wide and `32–38svh` high with portrait crop;
- evidence-wall photo partial top/right plane;
- professional photo lower support;
- only 1–2 foreground fragments;
- CTA remains reachable in opening journey;
- no horizontal overflow.

Mobile Work Worlds: touch-native, no pin.  
Mobile profile: one lens owns viewport.  
Mobile dashboard: next action/current profile before inventory.  
Mobile analytics: one analytical question at a time.  
Mobile assessment: question-first, stable bottom action.  
Mobile auth: form-first.

---

# 40. Copy density

Public homepage visible prose should be approximately `50–65%` lower than rejected Phase 3C.

Normal public scene limits:
- major title `3–7 words`;
- support `8–22 words`;
- one extra sentence only when essential;
- Work World description `4–10 words`.

Move detailed methodology to Methodology/Trust/results; privacy detail to Privacy. Do not explain the whole product repeatedly.

**Paragraph-hide gate:** if paragraphs disappear, the visitor should still understand that context matters, questions adapt, multiple readings remain separate, careers are relationships rather than labels, and new work changes evidence.

---

# 41. Suggested public file architecture

Do not keep growing one monolithic `PublicMarketingPage.jsx` or `HomeNarrativeV3.jsx`.

Recommended structure, adjusted to actual repo conventions as necessary:

```text
frontend/src/components/public/v4/
  EvidenceHero.jsx
  WorkWorldsTheatre.jsx
  EvidenceQuestionSignal.jsx
  LivingProfileField.jsx
  CareerRelationshipScene.jsx
  DevelopmentEvidenceLoop.jsx
  TrustResolution.jsx
  publicV4Motion.js

frontend/src/pages/public-v4/
  HowItWorksPage.jsx
  CareerIntelligencePage.jsx
  ProgressPage.jsx
  MethodologyPage.jsx
  TrustPage.jsx
  PrivacyPage.jsx

frontend/src/styles/personality-v4/
  foundation-v4.css
  public-home-v4.css
  public-routes-v4.css
  auth-v4.css
  product-shell-v4.css
  dashboard-v4.css
  assessment-v4.css
  analytics-v4.css
  results-v4.css
```

Exact filenames may adapt, but responsibilities must remain modular. Do not abstract route silhouettes into one generic template. Keep public/protected styles isolated and remove dead Phase 3C classes after migration.

---

# 42. Current source map — inspect before editing

At minimum inspect and follow imports from:

```text
frontend/src/App.js
frontend/src/pages/PublicHomePage.jsx
frontend/src/components/public/marketing/HomeNarrativeV3.jsx
frontend/src/pages/PublicHomePage.css
frontend/src/pages/PublicMarketingPage.jsx
frontend/src/pages/PublicSite.css
frontend/src/components/public/PublicChrome.jsx
frontend/src/components/public/PublicMotionRoot.jsx
frontend/src/content/personalityMarketingDemo.js
frontend/src/styles/foundation.css
frontend/src/styles/fonts.css
frontend/src/theme/tokens.js
frontend/src/pages/Auth/LoginPage.js
frontend/src/pages/Auth/SignupPage.js
frontend/src/components/product/ProductShell.jsx
frontend/src/styles/product-shell.css
frontend/src/pages/Dashboard/index.js
frontend/src/pages/AnalyticsPage.jsx
frontend/src/styles/analytics-product.css
frontend/src/pages/AssessmentFlow/StartPage.js
frontend/src/pages/AssessmentFlow/TestPage.js
frontend/src/pages/AssessmentFlow/BehaviorPage.js
frontend/src/pages/AssessmentFlow/ResultPage.js
frontend/src/pages/AssessmentFlow/CareerExplorerPage.jsx
frontend/src/components/assessment/QuestionRenderer.js
frontend/src/pages/PrivacyControlsPage*
frontend/src/pages/Result/*
frontend/src/components/charts/*
frontend/src/components/analytics/*
frontend/src/components/career/*
frontend/public/media/personality-v3/
frontend/scripts/*
frontend/package.json
```

Do not assume this list is exhaustive.

# 43. Dependency policy

## Add/restore

Local Source Sans 3 Variable + Source Serif 4 Variable.

## Keep

- GSAP + ScrollTrigger;
- Framer Motion;
- Recharts;
- React/Router/Query;
- Sharp/media pipeline tooling.

## Remove from active architecture

- global ScrollSmoother behavior;
- Mona Sans as Personality Assessor identity;
- ManyPixels visual registry/usage.

## Audit before removing packages

Search imports before removing `@barba/core`, Three/R3F/Drei, Lottie, Instrument Sans, Bootstrap/react-bootstrap, react-circular-progressbar or any legacy package. Remove only confirmed dead dependencies after migration.

Do not add Lenis, Anime.js, Rive, Embla, D3, new carousel packages or new WebGL frameworks unless an exact requirement is impossible with current primitives and the conflict is reported first.

---

# 44. Performance contract

Target field quality where practical:

- LCP <= `2.5s` p75;
- CLS <= `0.1`;
- INP <= `200ms` p75.

Rules:

- hero/LCP image eager + `fetchpriority="high"`;
- below-fold media lazy;
- responsive AVIF/WebP/JPG;
- mobile-specific media;
- no route-blocking preloader;
- no autoplay hero video;
- no WebGL hero;
- no giant JS carousel;
- no global perpetual animation;
- animate transform/opacity/clip rather than layout properties where practical;
- `will-change` only for actively animated elements;
- lazy/code-split heavy analytics where existing architecture permits;
- do not preload every supporting hero actor with high priority;
- local WOFF2 fonts and only critical faces preloaded.

---

# 45. Accessibility contract

Preserve/improve semantic headings, skip link, meaningful alt text, labels, error/status live regions, keyboard interaction, `:focus-visible`, contrast, reduced motion, direct controls for flagship states and non-hover access.

Touch: frequent controls ~44×44 CSS px or larger and adequate spacing. Use safe-area insets.

Charts: readable text/numeric alternative.

Pinned scenes: meaningful DOM order, no focus trap offscreen, keyboard-accessible Work Worlds/profile/career states.

---

# 46. Overflow / layout integrity

Hard rule: do not place `overflow-x: hidden` or `overflow-x: clip` on `body`, public root or broad page wrapper to conceal defects. Local clipping is allowed only for a deliberate visual stage.

At 390 and 320 verify:

`document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1`

Fix the offending actor if not.

---

# 47. Visual acceptance gates

Passing tests/build is necessary but never visual acceptance.

## Silhouette gate

Blur/zoom out. If the page becomes stacks of rounded rectangles, reject.

## Text gate

Hide paragraphs. If the product story disappears, reject.

## Swap-logo gate

If another SaaS logo could replace Personality Assessor without changing media grammar, charts, motion or composition, reject.

## Hero gate

At 1440×900, 1366×768 and 390×844 confirm:
- three approved hero actors retained;
- integrated header;
- Source family typography;
- no generic two-column split;
- no card collage;
- no muddy palette;
- CTA reachable;
- crop looks authored.

## Work Worlds gate

At every desktop settled state, active image, world name, concise explanation, direct navigation and neighbor context are visible together. Stop scrolling: the state must look complete.

## Motion gate

Test slow forward, fast forward, slow reverse and small oscillations around boundaries. No ghost text, duplicate labels, black debug bars, stuck opacity, header collision or pin-release jump.

## Context gate

Before interaction: no answer selected and no personalized signal. After interaction: selection clear; signal visibly derives from it; no colored side stripe.

## Secondary-route gate

Screenshots of How It Works, Career, Progress, Methodology and Trust must have materially different silhouettes.

## Maturity gate

D0, D1 and D2+ must not be one widget grid with changed content.

## Mobile app gate

At 390: usable bottom product nav, task controls reachable, no desktop-stack feeling, art-directed images, re-broken typography, no overflow and no hover dependency.

---

# 48. Lean validation — no new lab

The user explicitly does not want another expensive testing phase.

After implementation run meaningful production checks only:

```bash
npm test
npm run lint
npm run build
```

If the full test command is blocked by unrelated infrastructure, run relevant frontend tests and report the constraint truthfully.

Use real production browser smoke/art-direction checks, not a lab:

Desktop:
- 1440×900 hero;
- 1366×768 Work Worlds settled state;
- 1366×768 Context before/after interaction;
- one How It Works persistent stage;
- dashboard D0/D1 when real fixture/data permits.

Mobile:
- 390×844 hero;
- Work Worlds;
- assessment question;
- dashboard;
- auth.

Do not add Playwright solely for this phase. Do not create elaborate recording matrices unless a real defect requires it.

---

# 49. Implementation order — one continuous production pass

1. Inspect current HEAD/product contracts.
2. Add typography dependencies and Phase 4 foundation tokens.
3. Remove muddy/Mona/ManyPixels visual identity.
4. Simplify PublicMotionRoot to native-scroll source.
5. Rebuild PublicHeader.
6. Rebuild homepage hero.
7. Rebuild Work Worlds.
8. Rebuild Evidence→Question→Signal.
9. Rebuild profile/career/development/trust/footer.
10. Split/rebuild secondary public routes.
11. Rebuild auth.
12. Rebuild protected shell/mobile navigation.
13. Rebuild Dashboard by maturity.
14. Rebuild Analytics.
15. Rebuild Assessment task UI.
16. Rebuild Results.
17. Rebuild Career Explorer.
18. Rebuild authenticated Privacy/Account.
19. Remove dead Phase 3C CSS/components/dependencies.
20. Run tests/lint/build.
21. Return completion report.

Do not stop after marketing while leaving the app incompatible. Do not start a fifth design phase.

---

# 50. Completion report — return this exact structure

## 1. Current HEAD inspected
- starting SHA
- branch

## 2. Files added

## 3. Files substantially changed

## 4. Files removed / obsolete Phase 3C cleanup

## 5. Dependencies added / removed
- exact resolved versions
- reason

## 6. Typography implementation
- Source Sans 3
- Source Serif 4
- old font cleanup

## 7. Palette/foundation implementation

## 8. Hero/media implementation
- all three approved hero sources retained
- artifact fragments/crops
- media-pipeline changes

## 9. Homepage seven-scene reconstruction

## 10. Secondary public routes
- describe distinct silhouette of every route

## 11. Auth

## 12. Product shell + mobile navigation

## 13. Dashboard
- D0
- D1
- D2+

## 14. Analytics

## 15. Assessment task flow

## 16. Results

## 17. Career Explorer

## 18. Privacy/account

## 19. Motion implementation
- native scroll source
- GSAP timeline ownership
- Work Worlds semantic states
- no auto-selection
- reduced-motion behavior

## 20. Mobile implementation
- 390-specific decisions
- safe areas
- touch targets
- overflow result

## 21. Accessibility

## 22. Performance/media

## 23. Tests actually run and exact result

## 24. Lint result

## 25. Build result

## 26. Exact blockers/deviations

## 27. No-silent-design-decisions declaration

Enumerate every unrequested design decision or departure from this specification.

## 28. Visual acceptance reminder

Confirm implementation completion does **not** mean visual approval; final acceptance belongs to the user/design authority after review of the real production site.

---

# 51. Absolute Never-To-Do block for Codex

Never ship:

- TEXT–CONTAINER–CARD LOOP;
- heading + paragraph + cards repeated;
- generic split hero;
- isolated white header slab over hero;
- detached floating navbar;
- five-image equal collage;
- giant same-shaped image carousel;
- Work Worlds continuous scrub without dwell;
- `1 of 6` carousel UI as visual center;
- giant white Context card;
- three equal evidence mini-cards;
- selected marketing tint;
- colored signal side edge;
- answer preselected before action;
- IntersectionObserver image replacement presented as cinematic continuity;
- static content pinned for thousands of pixels;
- repeated debug/ghost text;
- full-page overflow clipping;
- giant centered headings followed by cards;
- methodology framework cards;
- numbered trust cards;
- dark role cards + three explanation cards;
- ManyPixels;
- generic corporate illustration packs;
- Mona Sans identity;
- muddy/chocolate/olive-green near-black;
- lime/citron;
- purple/blue AI gradients;
- gradients anywhere;
- generic hover lift everywhere;
- fade-up everywhere;
- desktop grid merely stacked on mobile;
- fake zero scores;
- fake analytics;
- fake confidence;
- unsupported science;
- unsupported retention;
- WebGL/3D simply for prestige;
- a new motion library simply because it is fashionable;
- a new lab/prototype;
- a design that passes tests but fails the rendered browser.

For every removed anti-pattern, implement the positive replacement in this specification. “Do not use cards” is not itself a design.

---

# 52. Final design authority statement

The finished Personality Assessor should not look expensive because it copies the surface of an award website.

It should look expensive because:

- the product’s own material generates the composition;
- evidence behaves like evidence;
- images carry spatial/narrative weight;
- typography has distinct human and interface voices;
- hierarchy does not depend on boxes;
- motion shows relationships and then stops long enough to understand them;
- the dashboard changes with real data maturity;
- charts answer real questions;
- mobile behaves like a deliberate app;
- each route has a reason to look the way it does;
- the implementation remains fast, accessible and truthful.

If the final browser can still be described as:

> “big heading, paragraph, rounded card, more cards, dark section, more cards”

Phase 4 is not complete.

If it can instead be described as:

> “professional evidence moves through work, questioning, interpretation, career direction and new evidence in a coherent visual world”

then the reconstruction is operating from the correct design idea.

**Proceed with the direct Phase 4 production reconstruction.**
