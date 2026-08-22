# PERSONALITY ASSESSOR
# NEW CREATIVE THESIS + ART-DIRECTION STORYBOARD
## Deep Product-Truth Research, Reference Synthesis, Protagonist Study, Route Worlds, Motion Physics, Media Editing, Mobile Art Direction
### Research / design-direction document only — NOT an implementation brief

**Date:** 22 August 2026  
**Project:** Valtum Studio / Personality Assessor  
**Repository:** `analyticsmath/PersonalityAnalysis`  
**Research basis:** live/reference corpus + fresh web research + current backend/product source audit  
**Status:** replaces the previous section-first “Evidence Field” implementation mentality

---

# 0. Executive decision

The previous public-site design process failed because it started with **web sections** and only later tried to inject product meaning through motion.

That process is retired.

This document starts from the product's real data model and asks a much harder question:

> **What visual world can exist only because this product works the way it works?**

The answer is not “floating evidence cards.”

The answer is not “four framework labels connected by an SVG.”

The answer is not “a 3D image gallery.”

The answer is not “a smoother scroll.”

The strongest product truth discovered in the current source is:

> **A human response is retained as a source, then produces multiple weighted evidence items across several interpretive dimensions. Those evidence items accumulate into deterministic scores, feed career comparisons, carry confidence/validity metadata, and can be revisited across later assessments without erasing earlier records.**

That is substantially richer than the previous public-site metaphor.

The selected new thesis is:

# **THE LIVING RECORD**

The visual protagonist is:

# **THE EVIDENCE STRIP**

A recognizable, persistent typographic/physical record fragment that begins as one human response and accumulates marks, branches, comparisons, dates, and provenance as the user moves through the site.

It is not a card.

It is not a dashboard tile.

It is closer to a **specimen strip / archival tape / annotated record fragment** that can live inside photography, cross a viewport, pass through environments, separate into evidence traces, return through time, and be inspected back to its source.

The site's dominant world is:

# **DOCUMENTARY PROFESSIONAL ENVIRONMENTS + ANNOTATED EVIDENCE**

The user's eye should experience:

> a real professional world first  
> a retained source second  
> interpretation third  
> interface chrome last.

This is the White Desert lesson translated correctly:
the **world** owns the page, while the product's real data becomes orientation and proof.

---

# 1. Research foundation

This direction synthesizes:

## Existing Valtum corpus
- White Desert
- Lando Norris
- Bram van Vugt historical portfolio
- Oryzo
- EverWonder
- Palomino
- Moto Card
- The Watch
- Siena Film Foundation
- Obys
- Bruno Simon
- LIKOVA
- Oimachi

## Fresh current research
- White Desert current homepage/camps/itineraries
- Lenis.dev
- Lando Norris current site and current race/calendar data
- OFF+BRAND Lando case study
- Oryzo current site and Lusion's 2026 BTS Parts 1–3
- EverWonder current homepage
- Palomino current homepage
- Moto current homepage
- LottieFiles / dotLottie current state-machine and runtime documentation

## Current Personality Assessor source
Important audited source paths include:

```text
source_of_truth_audit_report.md
backend/models/AssessmentSession.js
backend/models/AssessmentResult.js
backend/data/adaptiveQuestionBank.js
backend/data/careers.json

backend/services/scoring/evidenceBuilder.service.js
backend/services/scoring/questionMetadata.adapter.js
backend/services/scoring/assessmentScoringOrchestrator.service.js
backend/services/scoring/careerFitTypes.js

backend/services/career/careerMatching.service.js

backend/services/assessmentResultView.service.js

backend/services/analytics/assessmentHistory.service.js
backend/services/analytics/traitTrends.service.js
```

---

# 2. The product truth, re-audited from source

Before art direction, the product must be described without marketing language.

Personality Assessor is a multi-stage professional psychometric/career system.

The source implements:

- adaptive assessment questions;
- CV/manual background input;
- Big Five scoring;
- RIASEC scoring;
- Work Values scoring;
- Career Signals;
- deterministic career matching;
- career roadmaps;
- assessment history;
- trait trends across attempts;
- confidence/validity metadata;
- optional AI narrative/coaching;
- privacy/export/delete controls.

The core deterministic scoring exists independently of optional AI narrative.

That last point is strategically important.

The visual identity must not make AI the protagonist.

---

# 3. The most important product object is already in the backend

The old design tried to invent an “evidence” metaphor.

The backend already has one.

`evidenceBuilder.service.js` creates actual evidence records from assessment answers.

Each evidence record can contain:

```text
source
sourceId
dimension
key
signal
weight
direction
```

For one answer, the builder can create:

- a Big Five evidence item;
- zero or more RIASEC evidence items;
- zero or more Work Value evidence items;
- zero or more Career Signal evidence items.

This is the single strongest design discovery in this phase.

The product literally does:

> one source → several evidence contributions.

That should become visible.

---

# 4. One answer can create several different interpretations

The source's `questionMetadata.adapter.js` searches question/context/answer language for signals.

Examples of actual pattern families include:

## RIASEC
- realistic
- investigative
- artistic
- social
- enterprising
- conventional

## Work Values
- achievement
- independence
- recognition
- relationships
- support
- working conditions
- security
- autonomy
- learning
- impact
- work-life balance
- compensation

## Career Signals
- technical depth
- communication
- leadership
- collaboration
- analytical thinking
- creativity
- problem solving
- adaptability
- planning
- risk tolerance
- learning orientation
- domain focus

This means “context changes interpretation” is not abstract marketing language.

The scoring pipeline actually maps a source response into multiple downstream evidence records.

---

# 5. The assessment questions themselves are professional-world material

The adaptive bank contains real prompts about:

- learning new tools;
- debugging;
- quality ownership;
- stakeholder communication;
- collaboration;
- ownership under pressure;
- motivation;
- tradeoffs;
- systems thinking;
- customer focus;
- initiative;
- failure;
- technical depth;
- execution;
- conflict;
- risk;
- career direction;
- problem framing;
- decision confidence;
- focus;
- feedback;
- ambiguity.

These are useful because the public site does not need generic personality-quiz copy.

It has a credible professional-world vocabulary already.

Examples from the source:

> “Describe how you take initiative when a project has unclear ownership.”

> “How do you communicate tradeoffs when stakeholders ask for faster delivery than is realistic?”

> “How do you decide whether a problem needs a quick patch or a deeper redesign?”

> “How do you make progress when goals are clear but implementation details are undefined?”

These questions are dramatically more specific than generic “discover who you are” marketing.

---

# 6. Deterministic score validity is a design asset

The scoring orchestrator produces real metadata including:

```text
scoreSource: deterministic
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

Validity can include:

```text
valid
partial
insufficient_data
```

Warnings can explicitly say that confidence is limited and rankings should be treated as directional.

This is unusually strong public-story material.

Most personality/career marketing hides uncertainty.

This product has an opportunity to make uncertainty and provenance part of the premium identity.

---

# 7. Career matching has real, exact compositional data

The career engine is not a vague AI career prediction.

The current deterministic weights are:

```text
RIASEC fit        25%
Skill fit         25%
Work Values fit   20%
Personality fit   15%
Education fit     10%
Goal fit           5%
```

Signal fit contributes to confidence rather than the weighted fit score.

The model also adjusts confidence based on:

- whether CV data exists;
- score validity;
- whether scoring is final.

This is the Personality Assessor equivalent of White Desert's:

- coordinates;
- flight time;
- distance;
- temperature.

It is **real product infrastructure that can become visual language**.

Do not put these values in a six-card grid.

They should become a spatial/calibration moment.

---

# 8. History is genuinely first-class in the product

Assessment history stores/derives:

```text
assessmentId
createdAt
completedAt
status
scoreValidity
primaryArchetype
topCareer
confidence
hasAiReport
hasCareerRecommendations
```

Trend data can carry:

```text
date
resultId
dimension
score
confidence
validity
```

and supports:

- Big Five series;
- RIASEC series;
- top Work Values series.

At least two eligible assessments are required before trends exist.

This gives Progress a real concept:

> the product does not overwrite the previous self; it retains dated records and compares later evidence against history.

---

# 9. AI is optional, not the engine identity

The source exposes AI narrative/coaching as an optional layer and preserves deterministic scoring/fallback.

Art-direction consequence:

AI should never be the hero.

If AI appears visually at all, it should appear late and subordinate, as one annotated layer in a record whose source and deterministic computation are already visible.

---

# 10. Concept-candidate study

Before choosing the new world, four competing theses were tested.

---

# 11. Candidate A — Context Lens

## Idea
One stable response is seen through changing “lenses”:
personality, interests, values, career, history.

## Strengths
- easy to understand;
- direct mapping to context;
- can support mask/crop transitions.

## Weaknesses
- “lens” is a visual-effects cliché;
- encourages circles/masks and before/after tricks;
- weak provenance;
- weak finale;
- can become another animation demo.

## Verdict
Rejected as primary concept.

It can remain a local interaction primitive, not the world.

---

# 12. Candidate B — Professional Atlas

## Idea
The site is an atlas of workplace environments and professional behavior.

## Strengths
- powerful photography;
- strong Career route;
- White Desert-like geography/world logic;
- human.

## Weaknesses
- overweights Career;
- weak Big Five/Work Values/provenance connection;
- progress/history feels bolted on;
- can become an editorial photography site.

## Verdict
Rejected as global thesis.

Retain atlas logic for Career.

---

# 13. Candidate C — Assessment Engine

## Idea
The site exposes how raw inputs move through scoring layers.

## Strengths
- product-specific;
- easy to show real deterministic weights;
- strong methodology/trust.

## Weaknesses
- cold;
- software/HR-tool aesthetic risk;
- weak human emotion;
- encourages diagrams and dashboards;
- photography becomes secondary.

## Verdict
Rejected as global thesis.

Retain engine/calibration logic for How It Works and Methodology.

---

# 14. Candidate D — The Living Record

## Idea
One human response becomes an evidence record that remains attached to its source while accumulating interpretations, comparisons, dates and provenance.

## Strengths
- maps directly to actual evidence schema;
- persistent;
- transformable;
- works with full-screen photography;
- works in quiet analytical states;
- naturally supports history;
- naturally supports provenance;
- can survive route transitions;
- can carry the finale;
- works with or without WebGL.

## Risks
- if rendered as a bordered card, the concept fails;
- if rendered too small, it becomes UI metadata;
- if over-annotated, it becomes a dashboard;
- if too clinical, it loses humanity.

## Verdict
Selected.

---

# 15. Selected creative thesis

# **THE LIVING RECORD**

The site visualizes one principle:

> **A professional response can keep its source while accumulating different contributions over time.**

The world is not “an evidence dashboard.”

The world is:

> **documentary professional environments being annotated by a record that never loses its source.**

---

# 16. The protagonist: The Evidence Strip

The Evidence Strip is the visual embodiment of one retained source.

It is a long, narrow, high-contrast typographic object.

Not a rounded card.

Not a pill.

Not a modal.

Think closer to:

- an archival strip;
- a specimen label;
- a piece of annotation tape;
- a physical caption that can leave the page and re-enter;
- a film/record fragment.

## It contains only a small amount of stable information

Example:

```text
ILLUSTRATIVE RESPONSE
“I clarify responsibilities before committing work.”
SOURCE RETAINED
```

The word `ILLUSTRATIVE` is functional provenance, not a decorative eyebrow.

At later states it can accumulate compact marks such as:

```text
SOURCE: answer
DIMENSION: bigFive
KEY: C
DIRECTION: positive
```

and then additional evidence traces.

Do not show every internal field at once.

The strip should **gain information through the narrative**.

---

# 17. Why the Evidence Strip is stronger than a floating sentence

A plain sentence has semantic meaning but weak object identity.

A strip gives it:

- shape;
- edge;
- orientation;
- front/back logic;
- a place to hold metadata;
- a way to cross media;
- a way to fold/rotate/clip;
- a way to persist through transitions;
- a way to stack across time.

It can be recognized even when the full sentence is not readable.

That makes it finale-capable.

---

# 18. Physical/material behavior of the strip

The strip should feel precise but human.

Not glass.

Not holographic.

Not “AI.”

Preferred qualities:

- Mineral or Carbon base;
- Oxblood edge/notch/registration mark;
- printed/typographic feel;
- sharp corners or one authored cut;
- no shadow-heavy card styling;
- no gradient;
- no glow.

It can:

- lie flat over photography;
- turn edge-on;
- pass behind a person/object;
- become larger than the viewport;
- split into thinner evidence traces;
- stack with a dated prior strip;
- be magnified during Trust;
- become a route-transition handoff object.

---

# 19. The site world

The world has three visual states.

## State 1 — Documentary World
Real professional environments.

Used for:
- Home entry;
- Career;
- parts of How;
- Signup;
- finale.

## State 2 — Analytical Void
Carbon/Mineral fields where the record is isolated and interpreted.

Used for:
- branching;
- Methodology;
- Trust;
- parts of How.

## State 3 — Temporal Archive
Multiple versions/crops of the same world overlap.

Used for:
- Progress;
- Home temporal scene;
- finale residue.

The site continuously moves between these three states.

---

# 20. Dominant-material hierarchy

The design should not let every medium fight for attention.

Recommended global hierarchy:

## 55–65% — photography / environmental media
This is the White Desert / Palomino / EverWonder lesson.

## 15–20% — Evidence Strip / provenance traces
Persistent product identity.

## 10–15% — typography
Headlines/body/support.

## 5–10% — product data / metadata
Actual weights, dates, validity, source labels.

## 0–10% — realtime 3D/vector
Only where concept earns it.

The exact percentage is perceptual, not a CSS quota.

---

# 21. Color direction

Keep the narrow existing world:

```text
Carbon   #0D0F0E
Mineral  #F3F5F2
Graphite #222724
Pewter   #AEB4AF
Oxblood  #642832
```

No new brand colors are required.

Photography carries:
- workplace light;
- material color;
- skin tones;
- machine color;
- environmental temperature.

Oxblood has one job:

> source / provenance / active relationship.

That consistency makes it more meaningful.

---

# 22. Typography reset

Oryzo's strongest design-system lesson is restraint.

The new marketing world should reduce the number of visible typographic voices.

## Primary system
**Mona Sans Variable**

Use for:
- display;
- navigation;
- metadata;
- controls;
- body where readable.

The width axis should do more work than extreme weight.

## Human evidence
**Newsreader**

Use only for:
- direct human response;
- quoted professional evidence.

Do not place one random italic serif word in a sans headline.

Do not use Newsreader for general route headings.

## Instrument Sans
Can remain in protected/product UI and where existing functional form work benefits from it, but the marketing identity should not rely on three competing type systems.

---

# 23. Display behavior

No default giant H1 formula.

Every route title gets a scale based on the world.

### Home
Large but partially embedded in media.

### Career
May be smaller because environment owns scene.

### How
Functional/structural.

### Progress
Temporal and restrained.

### Methodology
Editorial.

### Trust
Precise.

### Auth
Functional, not cinematic.

---

# 24. New motion verbs from actual product behavior

The previous verbs were useful but still generic.

The product source gives us stronger verbs.

# **ATTACH**
A response keeps a source identity.

# **BRANCH**
One answer creates evidence across multiple dimensions.

# **ACCUMULATE**
Evidence items contribute to scores.

# **COMPARE**
Scores are compared against career profiles/layers.

# **QUALIFY**
Validity/confidence can strengthen or weaken conclusions.

# **REVISIT**
Later assessments create additional records.

# **TRACE**
A conclusion can be followed back to source evidence.

# **RETAIN**
The original record remains.

These verbs should generate motion.

---

# 25. Motion physics mapped to verbs

## ATTACH
The Evidence Strip locks to a visual source/environment.
Low movement after attachment.

## BRANCH
Oxblood registration marks pull thin traces out of the strip.
Not a symmetric four-way explosion.

## ACCUMULATE
Several small traces converge into one larger reading.
Use mass/opacity/stacking, not particle effects.

## COMPARE
The record stays fixed while environments or comparison fields move around it.

## QUALIFY
Visual ownership changes rather than color-coded “good/bad.”
Low-confidence states can be less resolved, more open, or show missing paths.

## REVISIT
A dated earlier strip remains under the later strip.
Same world, different crop.

## TRACE
The user can reverse the visible relationship to the source.

## RETAIN
At finale, all accumulated annotations collapse back around the source rather than replacing it.

---

# 26. White Desert translation: what becomes our “Antarctica”?

Not a color.

Not a background effect.

Not “evidence” as a word.

Our equivalent of Antarctica is:

> **the professional situation surrounding a response.**

The site should repeatedly place one record inside real situations:

- collaboration;
- technical investigation;
- ambiguous ownership;
- deep focus;
- tangible output;
- operational control;
- autonomous work.

The world changes.

The record remains.

That is the central sensory experience.

---

# 27. Lenis translation: what becomes our live product demonstration?

Lenis makes scrolling itself demonstrate Lenis.

Personality Assessor must make **context switching** demonstrate Personality Assessor.

Therefore the core homepage interaction should not be:

> scroll to see an explanation of context.

It should be:

> scroll and watch the same source retain its identity while the environment and interpretive contribution change around it.

That is the product demo.

---

# 28. HOME — master narrative

The homepage should no longer have seven obviously separate marketing sections.

It should feel like one expedition through the life of a record.

The narrative:

# **1. A response enters a real situation.**
# **2. The source is retained.**
# **3. The response branches into several evidence contributions.**
# **4. The same evidence meets different work environments.**
# **5. The system shows how it actually compares evidence.**
# **6. A later assessment creates another dated layer.**
# **7. The user traces a conclusion back to source.**
# **8. The original record returns with history attached.**

---

# 29. Home intensity curve

Use an explicit intensity graph.

```text
WORLD ENTRY            9/10
SOURCE QUIET            3/10
BRANCHING               8/10
CAREER TAKEOVER         9/10
CALIBRATION QUIET       4/10
TIME REVISIT            7/10
TRACEBACK               6/10
FINALE                   8/10
FOOTER                   2/10
```

Do not keep every viewport at 8/10.

---

# 30. HOME SCENE 1 — WORLD ENTRY

## Purpose
Immediate world ownership.

## Media
Primary:
`home-context-ctufaw5vbm8.jpg`

Secondary:
`home-analysis-vjg1teprcd0.jpg`

## Desktop static Frame 0

Viewport about `1440 × 900`.

### Dominant mass
Primary documentary image takes roughly 78–88% of visible viewport.

Not a right-side image.

Image can bleed:
- beyond right edge;
- slightly beyond bottom;
- across the centreline.

### Headline
Occupies negative space in image/world.

Candidate copy:

> **Keep the source attached.**

Supporting sentence:

> A professional response can contribute to personality, interests, values and career interpretation without losing the context it came from.

This is explanatory copy, not the visual protagonist.

### Evidence Strip
Crosses the lower-middle part of the photograph.

It contains an illustrative response:

> “I clarify responsibilities before committing work.”

Possible small metadata:

```text
illustrative response
workplace decision
source retained
```

### Secondary image
A smaller analytical/whiteboard crop sits partly behind foreground media or type.

It should read like another context plane, not a second image card.

---

# 31. Home Scene 1 — Frame 25

The visitor scrolls.

Changes:

- headline reduces width / shifts upward;
- primary image crop tightens;
- secondary analytical image moves at a different ratio;
- Evidence Strip remains almost fixed;
- a small Oxblood registration mark appears on the strip.

Meaning:

> the environment is moving away, but the source remains attached.

No framework labels yet.

---

# 32. Home Scene 1 — Frame 50

The primary environment begins to recede into Carbon.

The strip becomes more visually dominant.

The large photograph does **not** simply fade out.

Instead:
- crop closes;
- environment moves behind strip;
- part of strip occludes media;
- Oxblood mark becomes a visible edge/trace.

The user should feel the record being lifted out of the situation.

---

# 33. Home Scene 1 — Frame 75

Most environmental media is gone.

The strip is now isolated in an analytical Carbon field.

One compact source descriptor appears:

```text
source: answer
```

A second line/mark begins to separate.

The next scene has already begun.

No hard section boundary.

---

# 34. Home Scene 1 — Frame 100

The strip remains.

The environment is now only a faint memory crop.

The next branch is visible.

Continuity object:

> Evidence Strip.

This is the exact opposite of “hero fades out; next section fades up.”

---

# 35. HOME SCENE 2 — SOURCE QUIET

A deliberately quiet scene.

No huge animation.

The strip is centred or slightly off-centre on Mineral/Carbon.

One short statement:

> **One response can create more than one evidence record.**

Nearby, real evidence fields begin appearing one at a time:

```text
source
dimension
key
direction
weight
```

Do not show them in a table.

They appear as registration marks around the strip.

This is the breathing space before branching.

---

# 36. HOME SCENE 3 — BRANCHING EVIDENCE
## Primary signature mechanic

This replaces the old four-corner framework diagram.

The visual model is not:

> four destinations around the screen.

It is:

> one strip physically produces several thinner evidence traces that remain connected to the source.

---

# 37. Branching — Frame 0

Evidence Strip owns the middle third.

Full human response is readable.

No framework blocks.

One small mark:

```text
SOURCE / ANSWER
```

---

# 38. Branching — Frame 25

A first Oxblood trace separates from the strip.

It ends in a compact reading marker, not a card.

Example:

```text
BIG FIVE
conscientiousness
positive contribution
```

The source remains fully visible.

The trace has a physical attachment point on the strip.

---

# 39. Branching — Frame 50

A second branch emerges in a different direction.

RIASEC content appears.

The first branch remains as a residue with lower ownership.

The system must look **asymmetric**.

The two traces should not mirror one another.

One may curve into the background.
One may cut through foreground type.

---

# 40. Branching — Frame 75

Work Values and Career Signals enter.

Instead of adding two more clean nodes, one trace should pass through a small documentary crop.

This is where the analytical world reconnects to real work.

The viewer should see that interpretation is not a detached chart.

It remains tied to lived professional context.

---

# 41. Branching — Frame 100

All evidence traces are visible, but not equally.

The source strip regains the highest ownership.

The traces have accumulated small marks.

Visual message:

> multiple contributions exist without replacing the original response.

This is the first major “proof” moment.

---

# 42. Branching — fast-scroll behavior

If user scrolls quickly:

- do not force them through four serialized 100vh stages;
- branches resolve directly to the final coherent state;
- source remains readable;
- the next Career environment begins.

Reverse:
branches retract back into the same attachment points.

---

# 43. HOME SCENE 4 — CAREER WORLD TAKEOVER

This is the second visual peak.

The same strip stays visible while the entire surrounding professional environment changes.

This is the Lenis/White Desert product-demo moment.

Use:

- `career-complex-machine-shbyg6mb3o.jpg`
- `career-coordination-qnfckqwyu1k.jpg`
- `career-deep-inquiry-gnasyqdkdbi.jpg`

Only 2–3 contexts on Home.

Career route gets the full atlas.

---

# 44. Career takeover — Frame 0

Carbon branching world remains.

One Career Signal trace is active.

A professional image begins opening behind it.

The strip remains foreground.

---

# 45. Career takeover — Frame 25

Complex-machine environment owns 65–75% viewport.

Evidence Strip sits over/inside the scene.

A small line reads:

> same source / different working conditions

No generic “Career Intelligence” heading block required.

---

# 46. Career takeover — Frame 50

The environment itself changes.

Do not slide one image out and another in like a carousel.

Use:
- crop takeover;
- occlusion;
- depth;
- media replacement.

The strip remains in the same approximate visual position.

A different evidence trace becomes nearer/farther.

The user experiences:

> context changed around the record.

---

# 47. Career takeover — Frame 75

Shared-decision environment replaces the world.

The strip may partially pass behind a person or work surface.

This is an important photographic-composition move.

Media can occlude the protagonist without making it disappear.

---

# 48. Career takeover — Frame 100

The world settles.

CTA:

> Explore career conditions

The CTA lives inside the environment.

Not beneath a standard content block.

---

# 49. HOME SCENE 5 — CALIBRATION QUIET

White Desert uses logistics/data after spectacle.

Personality Assessor should do the same.

After the media peak, the page becomes quiet and exposes real product structure.

Possible headline:

> **The comparison is weighted, not guessed.**

Use the actual career-fit weights:

```text
25  RIASEC
25  SKILLS
20  WORK VALUES
15  PERSONALITY
10  EDUCATION
05  GOALS
```

This should not look like six KPI cards.

---

# 50. Calibration composition

The Evidence Strip becomes a horizontal baseline.

Each fit layer sits at a different physical distance/weight along the baseline.

The two 25% layers occupy more visual mass.

The 5% layer is physically smallest.

This is a true information-design moment.

No icons.

No boxes.

No pie chart unless it genuinely improves comprehension.

Small product-truth note:

> deterministic comparison layers

AI does not appear here.

---

# 51. HOME SCENE 6 — TIME REVISIT

The user has seen one source move through contexts.

Now show that the record can be revisited later.

Use:
`progress-studio-rjziomx-slq.jpg`

The same image source should appear twice under different crops.

This is intentional.

---

# 52. Time — Frame 0

Earlier Evidence Strip with date marker.

One crop of studio image.

Metadata can show:

```text
assessment 01
validity: partial/valid illustrative state
```

Do not fake a real user score.

If using values, label them illustrative.

---

# 53. Time — Frame 25

A later crop from the same image enters.

A second strip appears.

The first does not disappear.

The viewer understands that the second assessment is another record, not an overwrite.

---

# 54. Time — Frame 50

The two strips overlap in depth.

A new date boundary becomes visible.

A revised reading begins appearing **between** them.

No three equal columns.

---

# 55. Time — Frame 75

One or two trend traces extend between dates.

Actual supported concepts can include:

- Big Five dimension;
- RIASEC dimension;
- Work Value.

Do not invent a trend if fewer than two assessments exist in the real product demo.

This marketing scene remains illustrative.

---

# 56. Time — Frame 100

Earlier and later both remain inspectable.

The user sees:

> history retained.

CTA:

> See how progress works

---

# 57. HOME SCENE 7 — TRACEBACK

This is the Trust preview.

Visual mode becomes close, quiet, precise.

Use:
- `trust-inspection-ney2bbwmfnq.jpg`
- `trust-diagnostic-aq7oa5ikihs.jpg`

A human inspection image owns the background.

The strip is magnified.

---

# 58. Traceback interaction

Pointer/touch can inspect a reading.

Instead of revealing a grid, the interaction exposes one actual evidence chain.

Example:

```text
SOURCE
answer

SOURCE ID
initiative-pattern-intermediate

DIMENSION
bigFive

KEY
C

DIRECTION
positive

SCORING SOURCE
deterministic
```

The user can reverse from a reading to the source.

That is a meaningful custom interaction.

Cursor label:

> TRACE

Only inside this scene.

Native cursor everywhere else.

---

# 59. HOME SCENE 8 — FINALE

The first image/world returns.

Use:
`home-context-ctufaw5vbm8.jpg`

But the crop is materially different.

The Evidence Strip returns with:

- source mark;
- several evidence notches;
- one career comparison mark;
- one date mark;
- one provenance trace.

The record is visibly richer.

Candidate finale statement:

> **The source stays. The record gets better.**

Alternative:
> **Keep what changed. Keep where it came from.**

The exact copy should be refined later.

The visual point matters more:
the same object from the first viewport is now transformed.

This is the Oryzo/Watch/Lando persistent-protagonist payoff.

---

# 60. HOME navigation and pacing

The homepage should not expose obvious section labels.

No:
- Chapter 01
- Framework
- Evidence Transformation
- Career Field
- Progress
- Trust

The user experiences the narrative.

Navigation remains clear globally, but the homepage itself is cinematic.

---

# 61. CAREER INTELLIGENCE
# Route operating mode: WORKWORLD ATLAS

Career should feel closest to White Desert's destination/camp logic and Palomino/EverWonder media confidence.

The page is a journey through **conditions around work**, not five selector buttons.

---

# 62. Career world

Five editorial work-condition lenses remain useful:

- complex problems / clear ownership;
- open questions / long focus;
- shared decisions / coordination;
- visible output / tangible feedback;
- autonomy / personal standards.

These remain **editorial lenses**, not backend career classifications.

That distinction stays explicit.

---

# 63. Career composition

The page opens inside one professional environment.

No hero split.

No selector row.

A compact index may sit on the edge.

The user scrolls/drag-selects environments.

The Evidence Strip persists.

When the environment changes:
- media replaces the world;
- one supporting detail image changes;
- strip stays stable;
- one relationship note changes.

---

# 64. Career media map

## Complex problems
Primary:
`career-complex-machine-shbyg6mb3o.jpg`

Support:
`career-control-khikhsrqgt4.jpg`

## Open questions
Primary:
`career-deep-inquiry-gnasyqdkdbi.jpg`

Support:
`evidence-lab-detail-ontjllb3kri.jpg`

## Shared decisions
Primary:
`career-coordination-qnfckqwyu1k.jpg`

Support:
`career-team-device-ivrtfrzbzrg.jpg`
or `career-broadcast-lorhdkrohvw.jpg`

## Visible output
Primary:
`evidence-visible-output-peszYfr0oba.jpg`

Support:
`career-3d-printing-6e5sxczdmce.jpg`

## Autonomy
Primary:
`career-autonomy-8-bqofhawk.jpg`

Support:
`career-analysis-gxjuznhq.jpg`

---

# 65. Career interaction

The primary selector is the media itself.

Desktop:
- wheel/drag changes environmental ownership;
- edge index remains usable;
- pointer can show environment name;
- no giant cursor.

Mobile:
- one environment per screen/state;
- swipe or controlled scroll;
- support crop peeks in;
- direct text index available.

---

# 66. Career product-truth moment

After the editorial work-condition exploration, switch to a quiet factual state.

Show actual deterministic career-matching layers:

```text
RIASEC     25
skills     25
values     20
personality 15
education   10
goals        5
```

This is where the route explains:

> environment exploration is editorial art direction; actual career comparison uses the deterministic profile layers above.

That honesty is itself premium.

---

# 67. Career role directory

Use all 17 supported roles.

Do not make a marquee.

Treat it like an atlas index.

Possible visual:
- dense but elegant typographic directory;
- role titles positioned in one plane;
- hovered role reveals profile facets/skills from `careers.json`;
- no fake “best match” without user data.

Real role-profile data can show examples such as:
- skills;
- subjects;
- interests;
- profile tendencies.

No fabricated live recommendation.

---

# 68. HOW IT WORKS
# Route operating mode: EVIDENCE ENGINE

This route should become the most product-specific route.

It should not be five marketing steps.

It should expose the actual pipeline.

---

# 69. How narrative

Use one actual/adapted professional prompt from the question bank.

Suggested anchor question:

> “Describe how you take initiative when a project has unclear ownership.”

Show an illustrative response.

Then walk through:

# Source
question + response retained

# Evidence
response produces evidence records

# Scores
evidence accumulates into Big Five / RIASEC / Work Values / Career Signals

# Validity
confidence and missing evidence qualify the result

# Comparison
career layers compare the record against curated profiles

# Record
result is stored with date/history/provenance

This is the product.

No numbered five-card process.

---

# 70. How visual mode

The Evidence Strip behaves like material entering an engine.

But avoid literal machine graphics.

Use:
- crop;
- slit;
- annotation;
- compression;
- branching;
- merge;
- scale.

The “engine” is visual logic, not a sci-fi machine.

---

# 71. How factual data

Use actual evidence field names.

Use actual validity language.

Use actual fit weights.

Use actual scoring version only if current product truth remains stable and public use is appropriate.

AI appears as:
> optional narrative assistance

after deterministic scoring.

Never before.

---

# 72. PROGRESS
# Route operating mode: LONGITUDINAL FILM

This route is about the same record across time.

The visual protagonist doubles.

The environment reappears under new crop.

The page should feel like time passing.

---

# 73. Progress product truth

Real history can contain:

- created/completed date;
- status;
- validity;
- primary archetype;
- top career;
- confidence;
- AI-report availability;
- career-recommendation availability.

Trend points can carry:
- date;
- dimension;
- score;
- confidence;
- validity.

The design should not imply every user will have trends immediately.

The actual service requires at least two eligible assessments.

Say so.

---

# 74. Progress composition

No hero plus chart.

Open with two dated strips in one shared environment.

Earlier strip:
slightly deeper / lower contrast.

Later strip:
nearer.

As scroll progresses:
- same image crop changes;
- date shifts;
- one dimension trace connects;
- revised reading appears.

Quiet ending:
> Not enough history yet is a valid state.

That empty/insufficient state should be designed, not treated as error copy.

---

# 75. METHODOLOGY
# Route operating mode: CALIBRATION ROOM

This is deliberately quiet.

The protagonist becomes more technical.

The strip is opened into its fields.

Use actual:

- evidence schema;
- Big Five dimensions;
- RIASEC dimensions;
- Work Values;
- Career Signals;
- validity concepts;
- career fit weights.

No photography required except one restrained opening/closing fragment if needed.

---

# 76. Methodology visual language

Think:

> precision instrument / calibration sheet

not:

> documentation page with sidebar.

Possible layout:
- one central Evidence Strip;
- framework relationships appear around it as the reader scrolls;
- a slim route index;
- no card panels;
- no divider rules.

Actual numbers and names do the design work.

---

# 77. TRUST
# Route operating mode: TRACEBACK

Trust gets the strongest inspection interaction.

The route begins with a conclusion/reading.

The user's job is to trace backward.

---

# 78. Trust states

Real product concepts:

# Supplied
answers / optional CV background

# Inferred / evidence-built
evidence items and mappings

# Calculated
deterministic scores

# Compared
career comparison layers

# Assisted
optional AI narrative/coaching

# Controlled
export/delete/account controls

The exact public taxonomy should be aligned to existing product/privacy copy before implementation.

---

# 79. Trust interaction

Desktop:
drag/hover the inspection aperture across the Evidence Strip.

As it crosses:
- human-language reading above;
- raw provenance underneath.

Keyboard/touch:
explicit state controls.

No pointer-only information.

No tabs in a row.

No cyber-security aesthetics.

---

# 80. PRIVACY
# Route operating mode: DOCUMENT

No cinematic reinvention.

Make it excellent to read.

Use:
- clean measure;
- meaningful contents;
- native semantic headings;
- minimal motion;
- direct account/privacy links.

The rest of the site earns the right for this route to be quiet.

---

# 81. LOGIN
# Route operating mode: REOPEN RECORD

Carbon field.

No photography required.

A single previously annotated Evidence Strip sits in the distance and slowly resolves.

The form is primary.

No particles.

No floating text behind inputs.

No custom cursor.

---

# 82. SIGNUP
# Route operating mode: CREATE FIRST RECORD

Use:
`signup-first-record-vogj3ghonk0.jpg`

The photograph is not “right side.”

It is a large environmental field.

A blank/minimal Evidence Strip begins with:

```text
record / new
```

As the user completes fields, only a few structural marks appear.

Do not imply assessment evidence exists before the assessment actually begins.

The metaphor is:
> establish the record, not score the person.

---

# 83. ROUTE CONTINUITY MAP

Each route transition carries the Evidence Strip.

## Home → Career
Strip remains while documentary environment changes.

## Home → How
Strip rotates/open-flattens into evidence fields.

## Career → Progress
Strip gains a date mark and duplicates.

## Progress → Trust
Latest strip magnifies; provenance layer opens.

## Trust → Privacy
Strip collapses into plain document metadata.

## Login → Signup
Annotated strip clears into a new-record state.

This is much more specific than generic route masks.

---

# 84. Route transition visual system

Do not use one opaque wipe as the only signature.

The Evidence Strip itself can become the handoff.

Example:

1. current world compresses slightly;
2. strip crosses/expands;
3. destination media is revealed behind it;
4. strip resolves into destination role.

Keep total transition short enough to feel responsive.

The transition should never become a loading screen.

---

# 85. NAVIGATION

Top-level public navigation should remain semantic and obvious.

Potential labels:

```text
How it works
Career
Progress
Methodology
Trust
Sign in
Build profile
Index
```

The experimental layer belongs in the Index, not in hiding routes.

---

# 86. Index concept

The Index can behave like a **record catalog**.

No pills.

No giant circle clip for its own sake.

Each route appears as:
- name;
- one short world descriptor;
- one media/state preview.

The Evidence Strip moves to the selected route.

This can be a strong place for magnetic/proximity behavior.

---

# 87. Media editing doctrine

The next implementation must treat every photograph as a shot in a film.

For each image, define:

- establish;
- detail;
- transition;
- foreground;
- occlusion;
- revisit;
- finale.

No image is assigned simply because “this section needs a picture.”

---

# 88. Current 20-image media roles

## Home context
`home-context-ctufaw5vbm8.jpg`
- opening world;
- finale return;
- alternate crops.

## Home collaboration
`home-shared-context-8ayxzntpap0.jpg`
- decision context;
- time/context intervention.

## Home analysis
`home-analysis-vjg1teprcd0.jpg`
- secondary hero depth;
- analytical transition.

## Career complex machine
`career-complex-machine-shbyg6mb3o.jpg`
- complex problems environment.

## Career deep inquiry
`career-deep-inquiry-gnasyqdkdbi.jpg`
- open questions environment.

## Career coordination
`career-coordination-qnfckqwyu1k.jpg`
- shared decision environment.

## Evidence lab detail
`evidence-lab-detail-ontjllb3kri.jpg`
- close inspection / inquiry detail.

## How process
`how-process-jhtfogpvg8.jpg`
- process environment.

## Trust diagnostic
`trust-diagnostic-aq7oa5ikihs.jpg`
- technical inspection layer.

## Career control
`career-control-khikhsrqgt4.jpg`
- operational support.

## Career broadcast
`career-broadcast-lorhdkrohvw.jpg`
- live coordination support.

## Career analysis
`career-analysis-gxjuznhq.jpg`
- autonomous/deep analytical support.

## Signup first record
`signup-first-record-vogj3ghonk0.jpg`
- signup agency / writing action.

## Signup agency
`signup-agency-yi5jlsra5j8.jpg`
- optional supporting world.

## Career 3D printing
`career-3d-printing-6e5sxczdmce.jpg`
- visible-output support.

## Career team/device
`career-team-device-ivrtfrzbzrg.jpg`
- multidisciplinary coordination support.

## Evidence visible output
`evidence-visible-output-peszYfr0oba.jpg`
- material/tangible output.

## Progress studio
`progress-studio-rjziomx-slq.jpg`
- same-source temporal recrop.

## Trust inspection
`trust-inspection-ney2bbwmfnq.jpg`
- human inspection.

## Career autonomy
`career-autonomy-8-bqofhawk.jpg`
- autonomy world.

The pack is sufficient for the new thesis.

Do not search for more imagery before the first storyboard implementation unless a genuine gap appears.

---

# 89. Photography composition rules

## Never default to:
- one 50% image column;
- one rounded rectangular image per section;
- equal image thumbnails;
- small decorative photo in a text-heavy scene.

## Prefer:
- 70–100% viewport environment;
- offscreen crop;
- foreground occlusion;
- different scale planes;
- same-source recrop;
- image replacement;
- image continuing through a scene boundary.

---

# 90. Image motion vocabulary

Use only where the scene asks for it.

- inner-image parallax;
- crop tightening;
- masked takeover;
- depth shift;
- occlusion;
- counter-parallax;
- same-source recrop;
- environmental replacement.

Do not move every image independently.

---

# 91. Lenis system

Lenis is the temporal authority.

The page's visual world should feel continuously connected to input.

Use:

```text
scroll position
direction
velocity
settling
```

to drive selected visual consequences.

But no React rerender per frame.

---

# 92. Lenis per-route role

## Home
Controls world handoff and Evidence Strip persistence.

## Career
Controls environment travel/camera/media replacement.

## How
Controls pipeline progression.

## Progress
Controls time boundary.

## Methodology
Mostly normal reading.

## Trust
Controls inspection sequence only if appropriate.

## Privacy/Auth
Minimal.

---

# 93. Fast-scroll doctrine

Every cinematic state needs two narratives.

## Slow
Full composition.

## Fast
Direct state resolution.

Example:
Home branching does not force four slow branch reveals when the user scrolls hard.
It resolves to the complete final branch state and hands into Career.

Never make the page “catch up” for seconds after input.

---

# 94. Reverse-scroll doctrine

Reverse should restore meaning.

Not just play values backward mechanically.

Examples:

- evidence branches reattach;
- later record recedes behind earlier;
- environment returns;
- provenance trace closes.

The persistent strip makes reverse easier to understand.

---

# 95. Rive / dotLottie role

Do not use Lottie merely because a Lottie library exists.

Potential justified use:

A compact **Evidence Strip registration/state marker** could be implemented as a Rive or dotLottie state machine if:

- it needs discrete causal states;
- the states are driven by actual route/interaction events;
- DOM still carries readable text;
- software/canvas fallback works.

Possible inputs:

```text
attached
branched
compared
dated
inspecting
```

This is optional.

The strip can also be DOM/SVG.

Choose the simplest implementation that preserves fidelity.

---

# 96. Three.js / WebGL role

WebGL is not required for the global identity.

Best candidate:
Career environment atlas.

Only use it if it provides:

- meaningful media depth;
- camera continuity;
- occlusion;
- smooth environment replacement

better than DOM/GSAP.

DOM fallback must still satisfy art direction.

No WebGL object is allowed to be the only carrier of meaning.

---

# 97. GSAP role

GSAP/ScrollTrigger is appropriate for:

- long scene choreography;
- Evidence Strip transform handoffs;
- pinning where necessary;
- crop/parallax states;
- time boundary;
- route-local media replacement.

Do not use GSAP to “premiumize” ordinary sections.

---

# 98. SVG / Anime role

Best uses:

- provenance trace;
- evidence branch attachments;
- mobile path;
- record registration marks.

The SVG should belong to the protagonist.

No generic decorative curves.

---

# 99. HOME MOBILE ART DIRECTION

Mobile is not desktop reduced.

The mobile world uses the same protagonist but different cinematography.

---

# 100. Mobile Home opening

Portrait crop of `home-context`.

Image occupies 65–75% of first viewport.

Evidence Strip cuts across it diagonally or horizontally.

Headline uses remaining negative space.

No two floating depth images at once.

Secondary analysis image can appear only after first scroll.

---

# 101. Mobile branching

No desktop radial branch.

Use a **vertical evidence spine**.

The strip moves downward.

Evidence traces peel left/right at different moments.

One active contribution at a time.

The source stays visible in a small sticky/returning form.

This is touch-readable and much more spatial than stacked framework text.

---

# 102. Mobile Career preview

One environment owns viewport.

Next environment is partially visible.

Evidence Strip stays near lower third.

Swipe/tap/scroll advances.

No five-image stack.

---

# 103. Mobile Time

Earlier strip sits behind later strip.

Same image crop moves under them.

A visible date mark separates records.

No three blocks.

---

# 104. Mobile Trust

No hover aperture.

Tap a visible trace point.

The Evidence Strip flips/opens into raw provenance.

Touch is primary.

---

# 105. Tablet doctrine

Tablet gets its own simplified cinematography.

Not “desktop until 1024 then stack.”

Use:
- one primary environment;
- one support image;
- shorter branch distances;
- fewer simultaneous labels;
- no large WebGL scene if touch/coarse pointer.

---

# 106. Reduced motion

Reduced motion is not a blank site.

The world becomes a sequence of strong static frames.

- no Lenis interpolation;
- no long pin;
- no pointer parallax;
- no automatic media travel;
- Evidence Strip still accumulates marks;
- route transitions are short;
- media crops remain art-directed.

If the static design is good, this mode should still feel premium.

---

# 107. No-WebGL fallback

Career becomes a DOM editorial atlas.

The same:
- crop;
- scale;
- occlusion;
- media replacement;
- Evidence Strip

must remain.

No “3D disabled” message.

No missing world.

---

# 108. Copy doctrine

Copy must be shorter and more product-native.

Avoid:

- generic self-discovery language;
- AI hype;
- “unlock your potential”;
- “find your perfect career”;
- “scientifically proven” unless explicitly supported;
- “This isn't X, it's Y” rhetoric.

Use real product verbs:

- retain;
- compare;
- trace;
- revisit;
- score;
- inspect;
- source.

---

# 109. Potential Home copy direction

These are working candidates, not locked final copy.

## Opening
> **Keep the source attached.**

## Quiet evidence
> **One response can create more than one evidence record.**

## Career
> **The work around you changes the relationship.**

## Calibration
> **The comparison is weighted, not guessed.**

## Time
> **A later assessment adds a record. It does not erase the first.**

## Trust
> **Trace a reading back to what created it.**

## Finale
> **The source stays. The record gets better.**

The copy should be refined against final storyboard.

---

# 110. What real data belongs on marketing routes

## Home
Minimal:
- source retained;
- several evidence dimension names;
- one deterministic comparison example.

## Career
Career fit weights.

## How
Evidence object fields and scoring pipeline.

## Progress
Date / validity / trend concepts.

## Methodology
Exact dimensions and fit weights.

## Trust
Source / dimension / key / weight / direction / validity / scoring source.

Do not flood Home with all technical details.

White Desert does not show every operational detail in the hero.

---

# 111. What NOT to visually use

Even though the backend contains these data, avoid making the public brand look like a dashboard.

Do not create:
- radial score charts as hero;
- fake profile dashboard;
- colorful spider graph;
- score tiles;
- 6-card career breakdown;
- confidence progress bars everywhere;
- fake live user data.

The data should orient the world, not turn it into SaaS analytics.

---

# 112. Static-frame hard gate

Before implementation, create actual composition boards for at least:

- Home opening 0/25/50/75/100;
- Home branching 0/25/50/75/100;
- Career takeover 0/25/50/75/100;
- Time revisit 0/25/50/75/100;
- Trust traceback 0/25/50/75/100;
- mobile equivalents.

These can be high-fidelity Figma boards or extremely precise visual comps.

Do not send engineering a verbal description alone.

---

# 113. The “paused frame” test

Pause the animation at 50%.

If the frame looks like:
- objects awkwardly between places;
- low-opacity text everywhere;
- empty background;
- random overlap;

the motion is rejected.

Every intermediate frame must look authored.

This is one of the most important changes from the previous process.

---

# 114. The anti-template test

For every major scene ask:

> Could I replace “Personality Assessor” with an AI SaaS, fintech product or design agency and keep the composition?

If yes, reject.

Examples that fail:

- split hero with photo;
- three columns;
- bento;
- feature cards;
- floating media gallery with no product relation;
- random SVG path.

The Evidence Strip + real product data should make the result hard to transplant.

---

# 115. The reference-comparison test

The correct question is not:

> “Does this look like White Desert?”

It is:

## White Desert
Does environment own the experience?

## Lenis
Does interaction itself demonstrate the product?

## Lando
Does subject matter determine the physics and route modes?

## Oryzo
Does one protagonist survive representation changes?

## The Watch
Can one object anchor different scales/camera states?

## Palomino / EverWonder
Does media construct the layout?

## Moto
Do we know when to become quiet?

If the answer is yes across those dimensions, the site can stand beside the references without copying them.

---

# 116. What was wrong with “Evidence Field”

The phrase itself was not necessarily wrong.

The execution model was.

It became:

- fields;
- zones;
- absolute positions;
- SVG destinations;
- cards without backgrounds.

That was still website architecture.

“The Living Record” is more constrained.

It forces us to answer:

> Where is the record?
> What changed on it?
> What survived?
> What is its source?
> What date does it belong to?
> Can I trace it backward?

Those questions generate much stronger product-specific visual behavior.

---

# 117. Why the new thesis can carry a finale

The same Evidence Strip appears in the first viewport.

At the end it can return with:

- source mark;
- evidence branch marks;
- comparison mark;
- date mark;
- provenance mark.

The visitor can visually understand that the record has accumulated history.

That is a true narrative resolution.

No giant logo required.

---

# 118. Why it works on mobile

A strip is a very strong portrait protagonist.

It can:
- span width;
- rotate vertical;
- become a spine;
- stack across time;
- open on tap;
- slide under imagery.

It does not require 3D.

That gives mobile a real authored identity rather than a reduced desktop field.

---

# 119. Why it works without WebGL

Everything essential can be built with:

- DOM;
- SVG;
- GSAP;
- responsive media.

Career may add WebGL as enhancement.

The thesis is resilient.

That is a major advantage over a concept whose identity depends on a canvas.

---

# 120. Why it is commercially useful

The concept does not hide the product behind art.

It can clearly lead to:

- Build profile;
- See how it works;
- Explore career intelligence;
- Understand methodology;
- Review privacy/trust;
- Sign in.

White Desert demonstrates that cinematic experience and clear conversion can coexist.

The same should be true here.

---

# 121. Research conclusions from the eight references

## White Desert
Primary lesson:
**world + operations + pacing.**

## Lando
Primary lesson:
**subject physics + route modes + live information.**

## Oryzo
Primary lesson:
**protagonist + concept before pipeline + UI restraint.**

## The Watch
Primary lesson:
**object continuity + camera/scale.**

## Palomino
Primary lesson:
**crop/sequence is layout.**

## EverWonder
Primary lesson:
**actual work can carry the page.**

## Moto
Primary lesson:
**quietness is premium when product truth is strong.**

## Bram historical
Primary lesson:
**DOM/media craft can be enough; WebGL is not mandatory.**

## Lenis
Primary lesson:
**the interface can be the product demo, and one temporal authority can synchronize the world.**

## Lottie/dotLottie
Primary lesson:
**state causality can be more meaningful than autoplay/timeline motion.**

---

# 122. Critical design prohibitions remain

No:

- gradients;
- glows;
- glassmorphism;
- AI purple;
- indigo;
- cyan tech aesthetic;
- ivory/cream identity;
- decorative orange system;
- generic split hero;
- centered SaaS hero;
- feature-card grids;
- bento as marketing cards;
- KPI strips;
- numbered How It Works cards;
- generic timeline;
- generic testimonials;
- logo wall;
- generic CTA band;
- giant wordmark finale;
- global custom cursor;
- random parallax;
- universal fade-up;
- heavy 800/900 display typography as identity;
- serif-word gimmick;
- divider-line architecture;
- sticky footer reveal.

---

# 123. Technology order for the eventual build

Only after static comps pass.

## Required substrate
- Lenis
- GSAP / ScrollTrigger
- React Router
- responsive image pipeline

## Likely
- SVG
- Motion

## Conditional
- Three/R3F for Career
- Rive or dotLottie for a compact causal Evidence Strip micro-state

## Specialist
- Anime.js for SVG morph/path if useful

No technology quota.

---

# 124. Performance doctrine

The visual world cannot feel premium if it stutters.

- preload only opening media;
- lazy-load later environments;
- do not load all Career textures initially;
- declare aspect ratios;
- adaptive DPR;
- offscreen animation pause;
- no per-frame React state;
- no duplicated WebGL/DOM imagery;
- route transition should not delay navigation unnecessarily.

Target:
- LCP <= 2.5s
- INP <= 200ms
- CLS <= 0.1

---

# 125. Accessibility doctrine

The product thesis itself should improve accessibility.

The Evidence Strip is real readable text in DOM.

Every interpretation has:
- semantic text;
- keyboard equivalent;
- touch equivalent.

WebGL never owns meaning.

Reduced-motion retains strong frames.

Navigation remains semantic.

Forms remain native.

---

# 126. Final creative-director verdict

The next design should not be judged by:

- number of effects;
- number of images;
- number of libraries;
- whether CSS contains `translateZ`;
- whether GSAP is active.

It should be judged by one question:

> **Can a visitor follow one recognizable professional record as it moves from a human situation into evidence, interpretation, career comparison, time, and provenance without ever feeling that the website reset into another generic section?**

If yes, the design brain has changed.

If no, implementation must not begin.

---

# 127. Next production gate

Do **not** send Gemini another repair brief.

The next artifact after this research should be:

# **PERSONALITY ASSESSOR — HIGH-FIDELITY STATIC FRAME SPECIFICATION**

It should convert this thesis into exact desktop/tablet/mobile composition boards for:

- Home Opening
- Evidence Branching
- Career World Takeover
- Calibration
- Time Revisit
- Traceback
- Finale
- Career route
- How route
- Progress route
- Trust route
- Auth routes

Only after those static frames are approved should a new implementation specification be written.

---

# 128. Source index

## Reference sites
- https://white-desert.com/
- https://lenis.dev/
- https://landonorris.com/
- https://oryzo.ai/
- https://www.everwonder.studio/
- https://palominoprod.com/en
- https://www.moto-card.com/
- https://thewatch.60fps.fr/

## Reference production/case research
- https://www.itsoffbrand.com/our-work/lando-norris
- https://blog.lusion.co/oryzo-bts-part-1-7-concept-and-creative-direction
- https://blog.lusion.co/oryzo-bts-part-2-7-3d-design-and-motion-graphics
- https://blog.lusion.co/oryzo-bts-part-3-7-website-ux-ui-and-illustrations
- https://docs.lottiefiles.com/en/creator
- https://docs.lottiefiles.com/en/runtimes/distributions/js

## Personality Assessor product source
- `source_of_truth_audit_report.md`
- `backend/models/AssessmentSession.js`
- `backend/models/AssessmentResult.js`
- `backend/data/adaptiveQuestionBank.js`
- `backend/data/careers.json`
- `backend/services/scoring/evidenceBuilder.service.js`
- `backend/services/scoring/questionMetadata.adapter.js`
- `backend/services/scoring/assessmentScoringOrchestrator.service.js`
- `backend/services/scoring/careerFitTypes.js`
- `backend/services/career/careerMatching.service.js`
- `backend/services/assessmentResultView.service.js`
- `backend/services/analytics/assessmentHistory.service.js`
- `backend/services/analytics/traitTrends.service.js`

---

# 129. Final sentence

# **The redesigned site should not show users a series of sections about an assessment. It should let them travel with one living record as professional context changes what that record contributes, while its source remains traceable.**
