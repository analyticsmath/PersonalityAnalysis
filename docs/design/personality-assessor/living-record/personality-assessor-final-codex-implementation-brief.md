# PERSONALITY ASSESSOR — FINAL CODEX IMPLEMENTATION BRIEF
## The Living Record
### Production reconstruction from approved art direction

**Date:** 22 August 2026  
**Repository:** `analyticsmath/PersonalityAnalysis`  
**Branch:** `main`  
**Scope:** Public marketing and authentication routes only  
**Implementation authority:** This brief + `personality-assessor-high-fidelity-static-frame-specification.md` + `personality-assessor-motion-interaction-architecture.md` + `personality-assessor-responsive-fallback-accessibility-spec.md`  
**Mode:** Full public-frontend visual reconstruction in place. Preserve backend/product contracts. Do not preserve the current marketing composition merely because it exists.

# 0. Read this before touching code

The current public frontend has gone through multiple implementation passes and should not be used as visual design authority.

The approved art direction is now **The Living Record**.

The public experience must behave as:

> **one recognisable professional record moving from a human situation into evidence, interpretation, career comparison, later history, and provenance while its source remains traceable.**

The persistent visual protagonist is the **Evidence Strip**.

Do not patch the current section architecture into compliance.

Reconstruct the public/auth presentation layer around the approved static frames.

# 1. Product truth is binding

Before implementation, inspect the current main branch and confirm the following real product structures remain true.

## Evidence records
One response can generate multiple evidence records with fields such as:

```text
source
sourceId
dimension
key
signal
weight
direction
```

## Dimensions
```text
Big Five
RIASEC
Work Values
Career Signals
```

## Scoring metadata
```text
scoreSource
scoreValidity
confidence
evidenceCount
evidenceSources
missingEvidence
missingDimensions
contradictions
isFinal
scoringVersion
layerConfidences
```

## Career comparison weights
Current deterministic weights expected from the audited source:

```text
RIASEC fit         25%
skill fit          25%
work values fit    20%
personality fit    15%
education fit      10%
goal fit            5%
```

Reverify before hard-coding public copy.

## History
Trend/history requires at least two eligible assessments.

## AI
AI narrative/coaching is optional and subordinate to deterministic scoring.

If source truth has changed, stop and report the exact contradiction before implementing misleading copy.

# 2. Preserve functional contracts

Do not break:
- React Router route URLs;
- protected route behavior;
- AuthStore/auth state;
- email/password auth;
- Google OAuth using official component;
- `getSafeNextUrl`;
- signup/login mutation behavior;
- current backend password minimum;
- assessment/backend contracts;
- career data logic;
- privacy/export/delete functionality;
- SEO/meta behavior;
- accessibility semantics.

Protected application/dashboard routes are not part of this reconstruction.

# 3. Public routes in scope

```text
/
/career-intelligence
/how-it-works
/progress
/methodology
/trust
/privacy
/login
/signup
```

Do not create preview/v8/v9/lab routes.

Do not create a design branch.

# 4. Delete visual authority from the current v7 section system

Existing public code may be reused for:
- data;
- routing;
- form behavior;
- media pipeline;
- tested utilities;
- Lenis coordinator;
- route transition lifecycle where still useful.

But current DOM/CSS structures are not sacred.

Remove/rewrite components where necessary.

Do not preserve:
- split heroes;
- three-column explanatory scenes;
- equal destination grids;
- tab rows posing as spatial navigation;
- card-shaped evidence/provenance panels;
- global custom cursor;
- mobile stacks that delete desktop signature mechanics.

# 5. Required design source files

Use these as design authority:

```text
personality-assessor-high-fidelity-static-frame-specification.md
personality-assessor-motion-interaction-architecture.md
personality-assessor-responsive-fallback-accessibility-spec.md
```

The frame spec defines composition.
The motion spec defines temporal behavior.
The responsive spec defines alternate modes.

If implementation convenience conflicts with those documents, implementation convenience loses unless a genuine browser/accessibility/performance constraint requires an equivalent alternative.

# 6. Media source authority

Use the existing verified **Evidence in Context** media pipeline under:

```text
frontend/public/media/evidence-in-context/
frontend/src/content/personality-v7/mediaManifest.js
```

Do not introduce the unrelated/older `personalityImprintMedia.js` Pexels visual system as the new design source.

The 20-image licensed Evidence in Context pack is the approved production pack.

Do not fetch new licensed media.

Do not authenticate to Unsplash.

Do not use watermarked or legacy sources.

# 7. Required primary media mapping

Home opening/finale:
`homeContext`

Home collaborative context:
`homeSharedContext`

Home analytical depth:
`homeAnalysis`

Career primary worlds:
`careerComplexMachine`
`careerDeepInquiry`
`careerCoordination`
`evidenceVisible`
`careerAutonomy`

Career support worlds:
`careerControl`
`evidenceLabDetail`
`careerBroadcast`
`careerTeamDevice`
`career3dPrinting`
`careerAnalysis`

Progress:
`progressStudio`

Trust:
`trustInspection`
`trustDiagnostic`

Signup:
`signupFirstRecord`
Optional support: `signupAgency`

How:
`howProcess`
Optional support: `evidenceLabDetail`

# 8. Media rule

Photography is composition.

No default image card.

No repeated 50% image column.

No generic rounded rectangle + caption treatment.

Use:
- viewport bleed;
- asymmetric crop;
- occlusion;
- same-source recrop;
- one primary + one support plane;
- image replacement.

All image wrappers must explicitly constrain dimensions. Never allow intrinsic dimensions to determine layout.

# 9. The Evidence Strip component

Build one reusable semantic protagonist component.

Suggested path:

```text
frontend/src/components/personality-v7/living-record/EvidenceStrip.jsx
```

Possible variants:

```text
source
branched
dated
inspect
new-record
transition
```

It must remain real DOM text.

No canvas-only protagonist.

## Visual properties

- Mineral or Carbon surface;
- square/near-square edges;
- no card shadow;
- no glass;
- Oxblood source notch;
- Newsreader for direct evidence sentence;
- Mona Sans for operational metadata.

## Metadata

Only render metadata earned by scene state.

Do not turn component into dense developer-object dump.

# 10. Evidence trace primitives

Create reusable SVG trace primitives.

Suggested:

```text
EvidenceTrace.jsx
EvidenceBranch.jsx
ProvenanceTrace.jsx
MobileEvidenceSpine.jsx
```

Oxblood 2–3px effective stroke.

No glow.
No gradient.
No symmetric four-quadrant diagram.

All travelling visual elements should share SVG coordinate space or use correct CTM conversion.

Never take `getPointAtLength()` values from a viewBox and apply them directly as CSS pixels.

# 11. Global style reset

Keep palette:

```text
Carbon #0D0F0E
Graphite #222724
Mineral #F3F5F2
Pewter #AEB4AF
Cool Secondary #DDE1DD
Muted #69716C
Oxblood #642832
```

No gradients.
No glow.
No glass.
No purple/indigo/cyan tech identity.
No ivory/cream identity.
No decorative orange.

Remove structural divider-line grammar from marketing pages.

# 12. Typography

Primary marketing identity:
- Mona Sans Variable.

Direct evidence:
- Newsreader.

Functional/product UI can retain existing Instrument Sans where appropriate, but public marketing should not feel like three unrelated type systems.

Use variable width/tracking before heavy weight.

Do not default to 800/900 display weight.

Do not use one italic serif word in sans headline.

No decorative uppercase eyebrow before every heading.

# 13. Lenis global coordinator

Preserve/refactor into one public/auth scroll authority.

Recommended:

```text
Lenis RAF driven from GSAP ticker
ScrollTrigger.update on Lenis scroll
```

No high-frequency React state.

Expose imperative subscription/ref values only as needed.

Home CTA and internal scroll actions must use Lenis scrollTo, not native smooth-scroll competing with Lenis.

Reduced motion disables Lenis smoothing.

# 14. Home route architecture

Rebuild Home as one narrative flow:

```text
World Entry
Source Quiet
Branching
Career World Takeover
Calibration Quiet
Time Revisit
Traceback
Finale
```

Do not expose these as visible numbered section modules.

# 15. Home World Entry

Implement the static frame geometry from the frame spec.

At 1440×900:
- `homeContext` owns ~78–88% of visual frame;
- image crosses centreline and can bleed right;
- H1 lives in image/world negative space;
- `homeAnalysis` is a small depth plane;
- Evidence Strip crosses lower-middle media;
- supporting copy is quiet;
- one primary action + one quiet link.

Do not use:

```text
content grid-column 1/7
image grid-column 8/13
```

as visible architecture.

Use a bounded positioned scene with semantic DOM order.

# 16. Home World Entry motion

Implement 0/25/50/75/100 states from the motion spec.

The environment moves much more than the Evidence Strip.

No universal fade-up.

Fast-scroll resolves to final state.

Reverse returns environment cleanly.

# 17. Home Source Quiet

Minimal motion.

One Evidence Strip.
One statement.
One registration mark.

No image-card section.

# 18. Home Branching signature

This is the primary signature scene.

One source strip produces asymmetric connected evidence traces.

Sequence:
- Big Five;
- RIASEC;
- Work Values through documentary media;
- Career Signal.

Previous branches remain as residue.

The source remains locatable at all times.

Do not build four equal reading blocks around centre.

Mobile uses a dedicated vertical spine with a visible travelling source marker and connected branch states.

# 19. Home Career World Takeover

Use only a subset of Career worlds on Home.

Required sequence:
- complex machine;
- deep inquiry;
- coordination.

The environment itself is the state.

The Evidence Strip remains stable while the world replaces around it.

Do not build a photo carousel.

No selector buttons on Home.

# 20. Home Calibration Quiet

Use real deterministic career weights after re-verifying source:

```text
25 / 25 / 20 / 15 / 10 / 5
```

Build as one calibration baseline/scale.

No six cards.
No KPI strip.
No colored progress bars.

Headline direction:
> The comparison is weighted, not guessed.

# 21. Home Time Revisit

Use `progressStudio` twice under deliberately different crops.

Render two dated Evidence Strips.

They physically overlap.

Revised reading appears in the overlap boundary.

No Earlier/Later/Revised columns.

Marketing values are illustrative only.

# 22. Home Traceback

Use `trustInspection` as human world and `trustDiagnostic` as support detail.

Evidence Strip enlarges/open-inspects.

Expose real field names:
- source;
- sourceId;
- dimension;
- key;
- direction;
- scoring source;
- validity where appropriate.

Do not expose real user identifiers.

Contextual cursor label `TRACE` only inside interaction zone.

Keyboard/touch controls provide same information.

# 23. Home Finale

Return `homeContext` with a different crop.

The original Evidence Strip returns carrying accumulated registration marks.

No giant logo.
No generic CTA band.
No sticky footer reveal.

Footer follows normal flow.

# 24. Career route

Operating mode: **Workworld Atlas**.

Open directly inside a professional environment.

Do not build a generic route hero.

The five editorial work-condition lenses remain editorial, not backend classifications.

Primary selection is through media/world state.

A compact edge index provides direct accessible navigation.

No dominant five-button tab row.

# 25. Career media mapping

Complex problems:
- primary `careerComplexMachine`
- support `careerControl`

Open questions:
- primary `careerDeepInquiry`
- support `evidenceLabDetail`

Shared decisions:
- primary `careerCoordination`
- support `careerTeamDevice` or `careerBroadcast`

Visible output:
- primary `evidenceVisible`
- support `career3dPrinting`

Autonomy:
- primary `careerAutonomy`
- support `careerAnalysis`

# 26. Career optional WebGL

Implement DOM fallback first.

Only add R3F/Three if it materially improves the approved media depth.

If enabled:
- desktop >1024;
- fine pointer;
- WebGL capability success;
- reduced motion false.

Renderer initializes once.

Selection updates existing mesh targets.

One active support mesh.

Do not duplicate DOM photos while canvas is visible.

Canvas code lazy-loaded.

Clamp DPR.

Dispose on unmount.

Fallback must remain full-quality DOM composition.

# 27. Career relationship annotations

If using Alignment/Tension/Develop language, place them asymmetrically around media.

No three equal columns or 33.333% flex basis.

Mobile can use sequential annotation blocks tied to active image.

# 28. Career factual calibration

After editorial environments, switch to a quiet factual state using real deterministic career comparison layers.

Explicitly state that work-condition environments are editorial exploration lenses while actual comparison uses the deterministic profile layers.

No fake live career score without authenticated user data.

# 29. Career role atlas

Use all 17 real supported roles.

No ranking or fake match percentage.

No autoplay marquee.

Use curated profile information from `careers.json` where appropriate.

# 30. How It Works

Operating mode: **Evidence Engine**.

Use a real/adapted question-bank prompt as the narrative source.

Suggested prompt:
> Describe how you take initiative when a project has unclear ownership.

Follow this pipeline:

```text
question
→ source record
→ evidence records
→ Big Five/RIASEC/Work Values/Career Signals
→ validity/confidence
→ career comparison
→ dated stored record
```

No numbered step cards.

No five equal destinations.

Evidence Strip persists.

# 31. How product data

Use actual evidence field names.

Use actual validity terminology.

Use actual fit weights after revalidation.

AI appears only as an optional assisted layer after deterministic calculation.

No fake AI engine visuals.

# 32. How mobile

Dedicated vertical pipeline/spine.

Do not hide desktop path and replace with ordinary text list.

One major state per viewport segment.

# 33. Progress

Operating mode: **Longitudinal Film**.

Open with same-source photographic recrops and two dated records.

No split hero.

No generic trend-chart hero.

Actual temporal overlap is required.

Design the insufficient-history state explicitly.

Do not imply trends exist before two eligible assessments.

# 34. Methodology

Operating mode: **Calibration Room**.

Quiet.

One central Evidence Strip expands into real product fields and framework relationships.

No card panels.
No visible divider-line system.
No heavy photography requirement.

# 35. Trust

Operating mode: **Traceback**.

Start with a human-readable reading and let the user trace backward.

Use a real provenance trace, not tabs.

Possible public states after content verification:

```text
Supplied
Inferred
Calculated
Compared
Assisted
Controlled
```

No cyber-security aesthetic.

# 36. Privacy

Document-first.

No cinematic scene requirement.

Readable measure.
Accessible contents/jump navigation.
No decorative divider lines.

# 37. Login

Operating mode: **Reopen Record**.

Form is primary.

Carbon field.

At most one distant Evidence Strip.

No floating fragments behind inputs.
No custom cursor.
No card shell required.

# 38. Signup

Operating mode: **Create First Record**.

Use `signupFirstRecord` as a crossing environmental field.

Do not encode visual architecture as:

```text
form left 50%
image right 50%
```

A blank/new Evidence Strip may gain account/setup marks only.

Do not display fake assessment scores before assessment begins.

Mobile form begins in first viewport.

# 39. Global navigation

Keep semantic direct routes.

Header is quiet, fixed where current UX supports it.

No pill nav.

Index is an experimental catalog mode, but routes remain directly accessible.

# 40. Index

Build as a record catalog.

Route list + one active preview + Evidence Strip alignment.

No card grid.

No generic full-screen menu with a giant circular reveal simply for spectacle.

# 41. Cursor

Native pointer by default.

Only contextual states:
- Home/Trust inspect/trace;
- Career environment label if useful.

No global ring.
No blue/cyan.
No glow.
No forms cursor.

Coarse pointer/reduced motion: no custom cursor.

# 42. Route transitions

Keep React Router authoritative.

Use Evidence Strip as continuity object.

Destination must be prepared behind transition.

Total desktop ~560–720ms.

Latest navigation wins.

Query/hash preservation required.

Focus new `#main-content` after transition.

No white flash.

# 43. Suspense / direct load

Destination-aware tone shell.

No generic white `Loading page`.

No theatrical loader.

Opening content should become interactive as soon as possible.

# 44. Header tone

Scene-driven light/dark tone.

Must remain readable through pinned/overlapping media.

Avoid flicker near boundaries.

# 45. Footer

Normal document flow.

Sticky Footer Reveal remains permanently excluded.

A scroll-responsive vocabulary line may remain only if it is subtle, stops when scroll stops, and has static reduced-motion equivalent.

# 46. Responsive modes

Implement the responsive/fallback spec as design requirements, not post-build polish.

Desktop/tablet/mobile are authored modes.

Tablet cannot simply become desktop stacked.

Mobile signature mechanics must be replaced, not deleted.

# 47. Reduced motion

Use approved static board compositions.

- Lenis smoothing off;
- no long pins;
- no pointer parallax;
- no WebGL camera travel;
- short route transition;
- all evidence relationships visible/readable.

# 48. No-WebGL

Full-quality DOM fallback.

No blank Career route.

No technical warning presented to visitor.

# 49. Accessibility

Required:
- semantic headings;
- skip link;
- visible focus;
- Index focus trap + Escape + restore;
- route focus management;
- all interactive traces keyboard/touch accessible;
- forms labelled;
- errors announced;
- no essential pointer-only state;
- reduced motion;
- accessible alt text;
- no duplicate canvas/SVG text announced.

# 50. Performance

Targets:
```text
LCP <= 2.5s
INP <= 200ms
CLS <= 0.1
```

Rules:
- preload only true critical opening media;
- lazy-load later media;
- R3F chunk only on Career route;
- no source originals shipped;
- no per-frame React state;
- stop offscreen RAF;
- explicit image dimensions/aspect ratio;
- no giant unbounded image wrappers.

# 51. Hard visual prohibitions

Zero:
- gradients;
- glow;
- glassmorphism;
- AI purple/indigo/cyan;
- cream/ivory identity;
- generic orange system;
- split heroes;
- split auth;
- feature-card grids;
- bento marketing;
- KPI strips;
- numbered process cards;
- logo walls;
- generic testimonial grids;
- giant wordmark finale;
- structural divider lines;
- global custom cursor;
- sticky footer reveal;
- universal fade-up;
- random parallax;
- fake dashboard;
- fabricated career percentages.

# 52. Copy rules

No em dash in website copy.

Avoid:
- unlock your potential;
- perfect career;
- generic AI hype;
- unsupported scientific certainty;
- wellness/therapy framing;
- “This isn't X, it's Y.”

Prefer:
- source;
- retain;
- branch;
- compare;
- revisit;
- trace;
- record;
- context.

# 53. Suggested working copy

Home opening:
> Keep the source attached.

Quiet:
> One response can create more than one evidence record.

Career:
> The work around you changes the relationship.

Calibration:
> The comparison is weighted, not guessed.

Time:
> A later assessment adds a record. It does not erase the first.

Trust:
> Trace a reading back to what created it.

Finale:
> The source stays. The record gets better.

Treat these as approved direction but adjust only when necessary for truth/clarity and preserve the authored tone.

# 54. Implementation architecture suggestion

Keep current v7 naming if convenient, but do not create `personality-v8`.

Suggested new component folder:

```text
frontend/src/components/personality-v7/living-record/
  EvidenceStrip.jsx
  EvidenceTrace.jsx
  EvidenceBranch.jsx
  ProvenanceTrace.jsx
  RecordDateMark.jsx
  ResponsiveEvidenceImage.jsx
  EnvironmentPlane.jsx
  LivingRecordTransition.jsx
```

Route-specific folders may be added for clarity.

Do not overabstract simple scene markup.

# 55. CSS architecture

Current v7 CSS may be replaced/refactored.

Prefer route/scene-specific files instead of one huge `routes.css` if maintainability improves.

No visible grid-debug structures.

Use CSS custom properties for:
- palette;
- header height;
- page margin;
- Evidence Strip dimensions;
- scene z-order.

Do not encode art direction as arbitrary magic numbers without scene comments/config.

# 56. Static-frame configs

For signature scenes, create route-local configuration/comments documenting:

```text
0%
25%
50%
75%
100%
fast-forward resolver
fast-reverse resolver
reduced-motion state
mobile state
```

This is required to preserve the approved storyboard through engineering.

# 57. Functional geometry checks

Allowed automated browser tests may verify geometry/state, not aesthetics.

Required:

At 1440×900 and 1366×768:
```text
scrollWidth <= viewport + 2
Home H1 intersects viewport
Home primary media intersects viewport
Evidence Strip intersects viewport
```

At 820×1180 / 768×1024:
```text
Home branching visual exists
How pipeline visual exists
Career not a five-image stack
```

At 390×844:
```text
Home vertical spine exists
How vertical pipeline exists
Progress record overlap exists
Signup form starts in first viewport
```

# 58. Source contract tests

Add narrow tests preventing old architecture from reappearing.

Examples:
- no Home split-hero primary grid;
- no How equal five-step destination grid;
- no Progress three-column Earlier/Later/Revised;
- no Career three-equal-column relationship layout;
- no Signup 48vw right-side fixed image split;
- mobile signature path/spine present;
- no global custom cursor active by default.

Do not create brittle screenshot tests.

# 59. Media integrity

Preserve:
```text
npm run check:marketing-media:sources
npm run check:marketing-media
```

Do not weaken provenance or legacy-watermark checks.

Do not reference Git-ignored source files from production JSX.

# 60. Theme guardrail

Preserve `npm run check:theme` and keep exceptions narrow.

It must still detect accidental:
- gradient;
- glass blur;
- disallowed dark pattern where relevant.

Do not allowlist entire new route files.

# 61. Required verification commands

Run from the appropriate frontend/root context:

```bash
npm run check:marketing-media:sources
npm run check:marketing-media
npm run check:theme
npm run lint
npm run test
npm run build
```

If media crop/derivative configuration changes:

```bash
npm run generate:evidence-media
```

then rerun integrity checks.

# 62. Functional runtime smoke checks

Allowed:
- direct route load;
- navigation;
- rapid latest-navigation-wins;
- Back/forward;
- focus management;
- form validation;
- Google official button presence;
- WebGL capability/fallback;
- media load;
- geometry bounds;
- reduced-motion branch.

Not allowed:
- screenshot-based autonomous aesthetic grading;
- coding-agent claims that site “looks premium” or “is Awwwards-level.”

# 63. Implementation sequence

## Phase A — audit and clean slate
1. inspect current main;
2. identify reusable functional infrastructure;
3. identify public visual components to delete/rewrite;
4. reverify product truth and career weights;
5. verify 20 approved media assets.

## Phase B — global visual system
1. tokens/type;
2. Evidence Strip;
3. traces;
4. media primitive;
5. header;
6. Index;
7. Lenis coordinator;
8. route transition;
9. reduced-motion substrate.

## Phase C — Home static composition first
1. World Entry;
2. Source Quiet;
3. Branching;
4. Career Takeover;
5. Calibration;
6. Time Revisit;
7. Traceback;
8. Finale.

Before full motion, ensure DOM at initial/end states matches approved frame geometry.

## Phase D — Home motion
Implement temporal storyboard and fast/reverse handling.

## Phase E — Career DOM atlas
Build full-quality non-WebGL version first.

## Phase F — Career optional WebGL enhancement
Only after DOM route is complete.

## Phase G — How
Actual evidence engine pipeline.

## Phase H — Progress
Longitudinal film + insufficient-history state.

## Phase I — Methodology/Trust/Privacy
Quiet analytical routes.

## Phase J — Auth
Login/Signup.

## Phase K — tablet/mobile
Do not postpone to final cleanup; build each route's alternate mode immediately after desktop route is stable.

## Phase L — verification/cleanup
Tests, build, performance, accessibility, dead code removal.

# 64. Completion report format

Return facts only.

## A. Starting/ending commit
No branch.

## B. Product truth verification
State whether audited fields/weights/history assumptions were confirmed.

## C. Visual architecture rebuilt
Per route, list major DOM/component replacements.

## D. Evidence Strip
Explain variants and semantic ownership.

## E. Motion ownership
Lenis / GSAP / Motion / SVG / Three / Rive-dotLottie if used.

## F. Responsive modes
Desktop/tablet/mobile implementation facts.

## G. Fallbacks
Reduced motion, no WebGL, slow media.

## H. Media
Approved asset usage and integrity.

## I. Accessibility
Keyboard/touch/focus/forms.

## J. Verification commands
Exact outputs/pass counts.

## K. Functional runtime checks
Facts only.

## L. Known limitations

End exactly with:

> **Independent live-browser visual QA has not yet been performed on this commit. No premium/Awwwards visual-quality claim is made by the implementation agent.**

# 65. Do not stop for design approval

This brief is the approved implementation authority.

Stop only for a genuine blocker:
- product/backend truth conflicts with the specified public claim;
- required approved media is missing/corrupt;
- repository architecture changed so substantially that functional contracts cannot be preserved;
- an accessibility/browser constraint makes an exact composition impossible and an equivalent design decision is required.

Do not stop to ask whether:
- a split hero is easier;
- a card grid is acceptable;
- mobile can drop a signature mechanic;
- WebGL is required;
- more gradients/effects would help.

# 66. Final implementation test

Before declaring technical completion, ask of every major scene:

> **Can I identify the same Living Record, understand what changed around it or on it, and explain why that change comes from the real Personality Assessor product model?**

If not, the scene is not complete.

# 67. Final instruction to Codex

Proceed through the full reconstruction on `main`.

Do not patch the current visual design into another iteration.

Rebuild the public/auth visual system around the approved Living Record static frames, then implement the motion and responsive systems without changing backend/product contracts.

The target is not “more animation.”

The target is:

> **a coherent professional world in which one retained evidence record visibly accumulates interpretation, comparison, history, and provenance.**
