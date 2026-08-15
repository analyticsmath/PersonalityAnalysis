# Personality Assessor — Phase 3 C52 Integrated Product Visual System Board
## Evidence Imprint — Award-Level Pre-Implementation Synthesis

**Date:** 15 August 2026  
**Status:** **PRE-IMPLEMENTATION VISUAL SYSTEM BOARD — NO PRODUCTION CODING YET**  
**Creative thesis:** **Professional evidence as material**  
**Concept:** **The Evidence Imprint**  
**Signature transformation:** **Evidence Lift**  
**Motion verbs:** **Locate → Lift → Resolve → Translate → Align → Return**  
**Primary mobile acceptance canvas:** **390×844**  
**Primary desktop acceptance canvases:** **1440×900 and 1366×768**

---

# 0. What this board is

This is the C52 Integrated Product Visual System Board required by the Valtum Master Brain before a final Codex production contract.

It exists to stop the implementation agent from receiving abstract words such as:

- premium;
- editorial;
- immersive;
- award-level;
- creative;
- smooth;

and resolving them into:

> heading → paragraph → bordered rectangle → cards → image → repeat.

The board therefore turns Phase 1 research and Phase 2 creative-direction thinking into **specific visual states**.

This document is **not** permission for Codex to improvise.

It is also not a coding prototype.

The next production contract must translate these locked frames into exact files, assets, responsive rules and motion code.

---

# 1. External research synthesis applied to this board

This board was refined after another research pass through award-winning and highly recognized interactive work.

## 1.1 Awwwards score structure

Awwwards score pages continue to expose the weighting:

- Design — 40%;
- Usability — 30%;
- Creativity — 20%;
- Content — 10%.

That weighting is useful internally because it demonstrates why a site cannot win primarily through copy.

The visual/interactive system has to carry far more of the experience.

## 1.2 Tracing Art — Resn + Getty

Tracing Art is particularly relevant to Personality Assessor because it faces a similar conceptual challenge:

- a complex evidence domain;
- incomplete and ambiguous records;
- substantial data;
- a need to remain understandable for non-experts;
- a need to preserve rigor.

The project turns archival provenance records into a continuous visual narrative rather than exposing the database as a dashboard of cards.

The important transfer is:

> **complex evidence can remain complex while becoming visually navigable.**

Tracing Art uses:
- narrative chapters;
- timelines;
- archival records;
- data visualization;
- scroll-linked transitions;
- a visual language derived from the source domain.

Personality Assessor should do the same with:
- professional work;
- evidence;
- adaptive questions;
- profile instruments;
- career relationships.

We do not copy Tracing Art’s archival aesthetic or Three.js sphere.

## 1.3 Telescope

Telescope’s team built the identity around a product-native metaphor: zooming in to focus on what matters.

The relevant transfer is not the literal zoom effect.

It is:

> **one metaphor governs brand identity, imagery, typography, interaction and motion.**

Our equivalent is Evidence Imprint / Evidence Lift.

## 1.4 Data Disappeared

This project derived its design core directly from subject matter:
- “visual information decay”;
- outdated governmental data technology;
- punch-card motifs.

The team explicitly researched subject artifacts and converted them into design material.

That reinforces our decision to use:
- actual professional documents;
- plans;
- work surfaces;
- evidence fragments;

rather than generic abstract shapes.

## 1.5 Data visualization studios

Research into data-storytelling practice repeatedly reinforces that a chart should not be treated as a neutral content widget.

The best work asks:
- what pattern matters;
- what story exists inside the data;
- what human relationship must become obvious.

For Personality Assessor:

- Big Five should answer “where are these tendencies positioned?”;
- RIASEC should answer “which vocational territories dominate relative to one another?”;
- Work Values should answer “what is the hierarchy?”;
- Career Signals should answer “which professional evidence relationships are stronger or weaker?”;
- longitudinal analytics should answer “what changed and when?”

The visualization should embody the question.

---

# 2. Board-level success definition

The final system succeeds when:

1. a homepage screenshot is recognizable without logo;
2. paragraphs are not required to understand the story;
3. different routes have distinct silhouettes;
4. professional evidence is a persistent material language;
5. motion visually explains evidence transformation;
6. data visualizations are native representations, not dashboard filler;
7. mobile feels authored separately;
8. operational product UX remains direct;
9. no scene can be described primarily as “heading + paragraph + cards”;
10. no technology appears merely to signal technical sophistication.

---

# 3. Board A — Product visual DNA

## 3.1 Core visual equation

```text
REAL WORK
   ↓
PHOTOGRAPHIC ENVIRONMENT
   ↓
MATERIAL EVIDENCE
   ↓
TRACE / ANNOTATION
   ↓
STRUCTURED INSTRUMENT
   ↓
RELATIONSHIP
   ↓
NEW WORK RETURNS
```

The site does not need a new decorative motif for each section.

These six material states are sufficient.

## 3.2 Protagonist hierarchy

### Level 1 — Environment
Large professional photography.

### Level 2 — Evidence material
Plans, documents, tool/desk fragments, notes, artifact crops.

### Level 3 — Trace
Sparse SVG line/outline/measurement.

### Level 4 — Instrument
Charts and structured interpretation.

The material progresses through these levels.

## 3.3 Visual prohibitions

Never introduce:
- blank floating rectangles pretending to be “artifacts”;
- pills;
- fake scores;
- abstract AI brains;
- personality orbs;
- generic mesh gradients;
- generic corporate vector characters;
- sticky-note decoration with no semantic role;
- random circles/lines merely because the composition is empty.

---

# 4. Board B — Hero final system

## 4.1 Hero message

### H1
**Your work leaves evidence.**

### Support
**See how professional context becomes questions, readings and career direction you can inspect.**

### Actions
**Build my profile**  
**See how it works**

Total visible marketing prose before interaction:
approximately **20–30 words**.

## 4.2 Approved photographic actors

### Actor H1 — Dominant environment
Pexels 9618456  
Role: **source world / professional work**

### Actor H2 — Human proximity
Pexels 5940721  
Role: **professional human presence**

### Actor H3 — Evidence source
Pexels 9617376  
Role: **plan/document material source**

All three remain.

## 4.3 Missing asset family that must be produced before implementation

The existing CSS blank fragments are rejected.

Required local evidence fragment assets:

1. `hero-blueprint-fragment`
2. `hero-document-edge`
3. `hero-tool-fragment`
4. optional `hero-laptop-surface-fragment`
5. mobile-specific `hero-evidence-fragment-mobile`

Preferred creation method:
- crop/extract from approved photo sources;
- use transparent WebP/PNG where actual alpha extraction works;
- otherwise use SVG/CSS mask around real pixels;
- preserve photographic texture.

CSS `mask-image`, SVG `<mask>` and `clip-path` are now broadly available enough to support this kind of non-rectangular media treatment in modern browsers, while still requiring a simple rectangular fallback when necessary.

## 4.4 Desktop 1440×900 composition

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ brand            nav                              sign in    primary      │
│                                                                          │
│                         [evidence source — partial]                       │
│                                                                          │
│ Your work                 ╲                                              │
│ leaves evidence.        [lifted imprint]     [dominant work environment] │
│                ───────────────╲───────────────────────────────────────     │
│ support copy                    ╲                                         │
│ CTA   text action                [human/professional crop]                │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

Key rule:
the dominant photo must cross the invisible text/media boundary.

The composition must not resolve into two columns.

## 4.5 Optical geometry

### Header
- integrated over hero;
- 64–72px visual height;
- transparent;
- no horizontal divider.

### H1
- x: 4–5vw;
- top: ~29–34svh;
- width: 47–54vw;
- Source Serif 4;
- ~82–96px depending viewport;
- line height ~0.9–0.95.

### Dominant image
- x: 44–49vw;
- y: ~23–26svh;
- width: 47–53vw;
- height: 48–54svh.

### Evidence source
- upper right / behind;
- width 14–20vw;
- intentionally partially cropped.

### Human crop
- lower right / foreground;
- width 18–23vw;
- overlap dominant image.

### Lifted imprint
- 9–15vw;
- crosses type/media seam;
- no UI border/shadow.

## 4.6 1366×768

Hero should feel compressed, not cropped.

Targets:
- H1 ~76–84px;
- support <= 2–3 lines;
- dominant image <= 49svh;
- all three photo actors visible;
- primary CTA visible;
- no page horizontal scrollbar.

## 4.7 390×844 mobile hero

```text
┌──────────────────────┐
│ Brand             ≡  │
│                      │
│ Your work            │
│ leaves evidence.     │
│                      │
│ support               │
│ [Build profile]       │
│                      │
│   [evidence source]   │
│        ╲              │
│ [dominant portrait]   │
│      [human crop]     │
│ [lifted evidence]     │
└──────────────────────┘
```

Rules:
- one dominant portrait crop;
- evidence source becomes partial plane;
- human crop smaller;
- one evidence fragment only;
- title remains spatially interlocked;
- no desktop absolute coordinates copied blindly.

## 4.8 Hero motion board

```text
LOAD
environment establishes
      ↓
human plane establishes
      ↓
evidence source settles
      ↓
Locate — contour appears
      ↓
Lift — real evidence fragment separates
      ↓
DWELL
      ↓
scroll
      ↓
fragment becomes handoff actor to Work Worlds
```

Maximum motion density:
one meaningful movement at a time.

---

# 5. Board C — Color system

## 5.1 Identity base

```css
--pa-white: #FFFFFF;
--pa-soft: #F4F5F6;
--pa-ink: #0B0B0B;
--pa-ink-soft: #171717;
--pa-text: #4F5358;
--pa-muted: #767B81;
--pa-rule: #D9DDE1;
```

No fixed marketing accent.

## 5.2 Scene chroma

Every Work World may sample **one restrained chroma value** from its real approved image.

Usage is limited to:
- one evidence trace;
- one small annotation/measurement state;
- one transitional SVG state.

Not allowed:
- colored backgrounds for cards;
- selected tints;
- full accent systems;
- gradients.

## 5.3 Product semantics

Separate from marketing identity:

- focus;
- success;
- warning;
- error;
- information.

These exist only when the UI state warrants them.

## 5.4 Dark scene

True neutral black:
`#0B0B0B`.

No green-black, brown-black, chocolate or olive perception.

---

# 6. Board D — Typography system

## 6.1 Narrative voice
**Source Serif 4 Variable**

Use for:
- hero;
- selected big narrative transitions;
- final resolution.

Do not use for:
- navigation;
- every H2;
- charts;
- task controls.

## 6.2 Instrument voice
**Source Sans 3 Variable**

Use for:
- body;
- UI;
- data;
- assessment;
- dashboard;
- navigation;
- analytical labels.

## 6.3 Type behavior board

### Hero
Large, low-weight serif.

### Scene transition statement
Potential serif, but only 2–3 total across homepage.

### Work World titles
Sans.

### Data
Sans + tabular numerals.

### Question
Sans, substantial but operational.

### Footer resolution
Serif allowed.

## 6.4 Anti-label rule

Delete the design reflex:

```text
ILLUSTRATIVE INTERACTION
ADAPTIVE PROMPT
PROFESSIONAL CONTEXT DOCUMENT
FRAMEWORK #01
WORLD:
```

A label is permitted only when it prevents misunderstanding.

`Illustrative example` may appear once, quietly.

## 6.5 390 mobile

Line breaks are separately authored.

Never rely solely on desktop `clamp()` values.

---

# 7. Board E — Work Worlds six-state visual system

The worlds are not navigation tabs attached to a slideshow.

Each world owns a visual behavior.

## 7.1 Build

### Image role
Code/workbench/structured environment.

### Imprint behavior
A loose evidence fragment becomes rectilinear.

### Trace
Orthogonal construction lines.

### Motion verb
**Align**

### Dwell frame
one dominant environment + structured imprint + short statement.

---

## 7.2 Investigate

### Image role
Lab/research environment.

### Imprint behavior
Noise fades; one meaningful area remains.

### Trace
Focus contour / measurement bracket.

### Motion verb
**Resolve**

---

## 7.3 Make

### Image role
Making/creative production.

### Imprint behavior
Controlled historical echoes show iteration.

### Trace
2–3 prior contour states.

### Motion verb
**Translate**

No infinite trail.

---

## 7.4 Shape

### Image role
Design/creative ambiguity.

### Imprint behavior
One real contour morphs into a second related contour.

### Trace
Anime.js SVG morph.

### Motion verb
**Translate**

---

## 7.5 Structure

### Image role
Organization/system environment.

### Imprint behavior
One fragment separates into ordered hierarchy.

### Trace
nested alignment rules.

### Motion verb
**Align**

---

## 7.6 Collaborate

### Image role
Team environment.

### Imprint behavior
2–3 fragments converge without becoming one generic Venn diagram.

### Trace
shared boundaries.

### Motion verb
**Align / Return**

---

## 7.7 Work Worlds desktop silhouette

```text
title / brief statement                small open index

      previous fragment
             ╲
       [ACTIVE ENVIRONMENT]      current world
             ╲                  4–10 word statement
         [EVIDENCE IMPRINT]
                     ╲
                 next fragment
```

No:
- image card row;
- 56svh generic rectangle;
- tab pills;
- “1 of 6”.

Preferred image height:
**42–46svh**.

## 7.8 Work Worlds mobile

One world = one authored vertical composition.

No pin.

World index may be:
- horizontal text strip;
- compact selector;
- swipe-enhanced but not swipe-dependent.

---

# 8. Board F — Evidence → Question signature transformation

This is the homepage proof-of-product scene.

## 8.1 Static start frame

A real evidence surface dominates.

Not a white panel.

Example visual components:
- selected document crop;
- project image;
- source phrase;
- sparse metadata only where necessary.

## 8.2 Transformation storyboard

```text
F0  SOURCE
[full evidence material]

F1  LOCATE
[contour appears around one relevant area]

F2  RESOLVE
[other material loses contrast]

F3  LIFT
[relevant phrase / artifact detaches]

F4  TRANSLATE
[detached evidence crosses the canvas]

F5  QUESTION
[question grows from evidence origin]

F6  RESPONSES
[open response rows establish]

F7  USER ACTION
[selected response compresses to qualitative signal]

F8  CARRY
[signal becomes material entering profile]
```

## 8.3 Desktop composition at F5/F6

```text
       faint source document / environment

             [lifted evidence phrase]
                       │
                       │
                       ▼
     When delivery pressure rises,
     what do you protect first?

     ○ Protect reliability first
     ○ Preserve speed with rollback
     ○ Reduce scope

                    [quiet illustrative note]
```

No two-column split.

## 8.4 Response controls

Real controls may have structure.

Use:
- open rows;
- optional subtle separators;
- neutral circle;
- no card background by default;
- no shadow;
- no color edge;
- no preselection.

## 8.5 Signal result

After click:

```text
response
  ↓
small movement / compression
  ↓
Reliability first under delivery pressure
```

No numeric weight.

No claim that one answer directly raises a psychometric trait.

---

# 9. Board G — Four profile instruments

## 9.1 Instrument selector

Open text.

No pill tab container.

Active state:
- weight;
- position;
- one moving neutral line.

## 9.2 Personality / Big Five

```text
Openness          ─────────────●──────  72
Conscientiousness ─────────●──────────  58
Extraversion      ─────●──────────────  41
Agreeableness     ───────────●────────  66
Stability         ───────●────────────  49
```

Illustrative numbers must be labeled as illustrative at field level.

No trait cards.

## 9.3 RIASEC

True radar shape + ranked list.

No six pills.

The shape is the protagonist.

## 9.4 Work Values

A ranked hierarchy.

Example:

```text
Autonomy       █████████████
Mastery        ███████████
Purpose        █████████
Collaboration  ███████
...
```

No cells.

## 9.5 Career Signals

Evidence-linked measures.

Each signal can expose the evidence source on interaction.

This is where the Evidence Imprint concept becomes particularly valuable.

---

# 10. Board H — Career Relationship Field

## 10.1 Homepage role

Career fit is not a percentage directory.

Show one role relationship deeply.

## 10.2 Structure

```text
role index        [active environment]
                     ╲
                      ╲ aligned trace
                       ╲
         profile --------●-------- role
                         │
                         │ stretch
                         │
                 evidence to build
```

The actual visual does not need to be a literal line diagram.

The relationship logic must be spatially understandable.

## 10.3 Demo percentage policy

If public illustrative percentages are retained:
- one explicit `Illustrative example` notice at scene level;
- percentage is secondary;
- not used as active-state badge.

Preferred direction:
de-emphasize percentage entirely on homepage.

## 10.4 Reasoning

Only one active reasoning excerpt should be visually prominent at a time.

Avoid:
- three equal explanation columns;
- three cards.

---

# 11. Board I — Development Return Loop

## 11.1 Desktop composition

```text
             [WORK ENVIRONMENT]
                  ╱
              Artifact
                ╱
             Evidence
              ╲
               ╲
[PROFILE GAP] → Return → [UPDATED PROFILE]
```

One artifact physically persists.

## 11.2 Static visual states

### Gap
Missing/weak trace in profile.

### Work
Environment expands.

### Artifact
Real professional output.

### Evidence
Artifact is lifted/marked.

### Return
Same material enters profile.

No separate card per label.

## 11.3 Copy

Only active state gets a short explanatory phrase.

---

# 12. Board J — Trust System Cutaway

## 12.1 Structure

```text
SOURCE MATERIAL
     │
     ▼
Context / responses
     │
     ├──────────────► optional AI interpretation of context/free-text
     │
     ▼
Structured deterministic scoring
     │
     ▼
Stored profile / career outputs
     │
     ├──────────────► AI narrative assistance where configured
     │
     ▼
User-visible controls / export / deletion
```

This is the factual high-level model.

The visual can be much more refined than this diagram.

## 12.2 Important truth lock

Do not say:
- “AI never affects scoring inputs”;
- “strictly air-gapped from numeric scoring”;
- “one-click complete deletion”;
- unsupported retention promises.

## 12.3 Visual character

Dark scene is allowed.

But it must be a cutaway, not four equal columns.

---

# 13. Board K — Secondary public route silhouettes

## 13.1 How It Works — Exploded Evidence Engine

Silhouette:

```text
small process index
        │
        ▼
   [large persistent evidence mechanism]
      transform
      transform
      transform
        │
minimal copy around the mechanism
```

Not:
left text rail + right image.

---

## 13.2 Career Intelligence — Relationship Field

Silhouette:

```text
role index at edge
           [large environment field]
       relationship traces / inspect
                    ↓
            focused explanation
```

Dark scene can be appropriate.

---

## 13.3 Progress — Return Loop

Silhouette changes continuously:

large image → artifact close-up → open profile trace → image/detail → return.

No repeated vertical nodes.

---

## 13.4 Methodology — Instrument Bench

One large instrument area.

Framework selection changes the instrument itself.

Detailed methodology appears through progressive disclosure.

No framework cards.

---

## 13.5 Trust — Provenance Cutaway

One continuous system map.

No numbered steps.

---

## 13.6 Privacy — Ownership Map

Visualize:
- source;
- storage category;
- export;
- delete controls.

Do not promise what backend cannot prove.

---

# 14. Board L — Authentication

## 14.1 Desktop

```text
evidence fragment / quiet narrative

                        Create account
                        label
                        input
                        label
                        input
                        action
```

The form remains the protagonist.

No 50/50 tinted split.

No giant stock image rectangle.

## 14.2 Mobile

Form first.

Optional evidence fragment appears after primary action content.

---

# 15. Board M — Dashboard data maturity

## 15.1 D0 — No completed assessment

```text
Welcome / direct explanation
     [product-native evidence-empty graphic]
Start assessment
Add professional context

quiet: methodology / privacy
```

No empty analytics grid.

## 15.2 D1 — First result

```text
[CURRENT PROFILE — dominant instrument field]
                      [career relationship index]
latest assessment metadata
next useful action
```

No trend chart.

## 15.3 D2+ — Longitudinal

```text
[WHAT CHANGED — dominant visualization]
[CURRENT PROFILE]          [EVIDENCE TIMELINE]
next action / history
```

The layout visibly changes with maturity.

---

# 16. Board N — Analytics grammar

Analytics is organized by questions.

## Q1
**How has your profile changed?**

Dominant small-multiple / line field.

## Q2
**How has career direction changed?**

Focused relationship comparison.

## Q3
**What evidence changed?**

Timeline.

## Q4
**What should you inspect next?**

Compact action list.

No numbered eyebrow.

No paired widgets by default.

---

# 17. Board O — Assessment task

The assessment is operational, not cinematic.

## Desktop

```text
quiet progress

When delivery pressure rises,
what do you protect first?

○ response
○ response
○ response

Back                           Continue
```

## Mobile 390×844

Question owns top half.

Responses occupy lower half.

Primary action is safe-area aware.

No bottom navigation inside active questionnaire if it distracts from the task; task exit/back remains explicit.

No card around the whole question.

---

# 18. Board P — Mobile app system

## 18.1 Protected top-level navigation

Bottom tab bar:
- Overview;
- Progress / Analytics;
- Assess;
- Account.

Tabs are navigation, not action.

Primary “new assessment” action lives inside relevant screen context rather than abusing tab navigation.

## 18.2 Safe area

Bottom padding uses:
`env(safe-area-inset-bottom)`.

Frequent controls:
~44px+ target.

## 18.3 Mobile data presentation

One visual question per viewport region.

Do not fit four desktop panels into the phone.

## 18.4 Mobile motion

Shorter.

Direct.

No heavy scroll lag.

No long pin.

---

# 19. Board Q — Component grammar

## 19.1 Buttons

Primary:
- dark neutral;
- compact radius;
- no pill;
- no glow.

Secondary:
- text action or subtle outlined control.

## 19.2 Inputs

Real form boundaries allowed.

No floating label.

No giant pill.

## 19.3 Response row

A true control.

May have:
- separator;
- radio marker.

Does not need:
- card background;
- shadow.

## 19.4 True cards — allowed examples

A card is justified when the object is independently actionable/persistable:
- saved assessment;
- notification;
- report record;
- isolated user-owned file.

## 19.5 Public narrative

Open composition by default.

---

# 20. Board R — Loading / empty / error

## Loading
Skeleton follows actual final geometry.

Do not show generic card skeletons for open compositions.

## Empty
Product-native evidence state.

## Error
Direct operational feedback.

No decorative illustration required.

---

# 21. Board S — Data visualization truth rules

## Missing data
Display:
- `Not available`;
- `Not enough history`;
- `No evidence yet`.

Do not display:
- zero;
- 50;
- 80%;
- midpoint marker;

unless zero/midpoint is actual data.

## Illustrative public demos
One clear field-level label:
`Illustrative example`.

Do not repeat “demo” labels everywhere.

---

# 22. Board T — Motion architecture

## 22.1 Macro scroll

**GSAP + ScrollTrigger**

Own:
- hero handoff;
- Work Worlds;
- Evidence → Question;
- How It Works process engine.

## 22.2 Local Evidence Imprint animation

**Anime.js v4**

When the production contract is written, add current stable Anime.js v4 if still current at implementation time.

At this research date, the current GitHub release is **v4.5.0**.

Expected modules:
- `createScope`;
- `animate`;
- `createTimeline`;
- `svg.createDrawable`;
- `svg.morphTo`;
- optional `createDraggable`;
- optional `waapi`.

Anime.js docs support scoped React cleanup/media queries, SVG drawing/morphing, draggable interactions, and a lightweight WAAPI path.

## 22.3 Protected app state

**Framer Motion**

## 22.4 Simple micro-motion

CSS / WAAPI.

## 22.5 No double ownership

Never let GSAP and Anime.js animate the same transform/property on the same actor.

---

# 23. Board U — Reduced-motion version

Reduced motion retains the conceptual sequence without large spatial movement.

## Hero
Evidence fragment is already separated.

## Work Worlds
Direct state switch / subtle dissolve.

## Evidence → Question
Static stacked narrative:
source → evidence → question → responses.

## Profile
Direct instrument change.

## Development
Static loop diagram.

The page becomes shorter when motion is reduced.

Do not preserve 400vh pin ranges with animation disabled.

---

# 24. Board V — Performance contract

## Images
- local derivatives;
- AVIF/WebP/JPG fallback;
- `<picture>` for art-directed crops;
- proper `srcset` / `sizes`;
- explicit dimensions.

Responsive image guidance consistently shows that serving desktop-size media to mobile wastes substantial bandwidth and can delay LCP.

## Hero
Only the true LCP actor receives high priority.

Do not eagerly load every overlapping hero image at maximum priority.

## Motion
Prefer transform/opacity for large DOM movement.

Mask/clip effects should be tested on target devices because paint-heavy operations can become expensive.

Use `will-change` temporarily and sparingly.

## WebGL
Not required.

## Target
- LCP <= 2.5s where practical;
- CLS <= 0.1;
- INP <= 200ms where practical.

---

# 25. Board W — Accessibility contract

- semantic DOM order follows meaning even when actors overlap visually;
- keyboard navigation for all interactive states;
- focus-visible;
- no hover-only career details;
- chart text alternatives;
- reduced motion;
- no autoplay sound;
- direct next/back alternatives for scroll storytelling;
- touch target comfort;
- no color-only encoding;
- headings remain logical despite visual interlock.

SVG/animation must avoid flashing and respect motion preferences.

---

# 26. Board X — 390px primary acceptance storyboard

## Screen 1 — Hero
Title + one dominant portrait image + one fragment.

## Screen 2 — Work World
Full-width/portrait environment, short world statement, compact index.

## Screen 3 — Evidence
Real document/evidence crop.

## Screen 4 — Question
Question + responses.

## Screen 5 — Profile
One instrument.

## Screen 6 — Career
Role list or focused detail.

## Screen 7 — Return
Artifact returning into profile.

The phone version should feel like a sequence of intentional app-like screens, not a long stack of desktop fragments.

---

# 27. Board Y — Route silhouette matrix

| Route | Dominant visual idea | Must NOT resemble |
|---|---|---|
| Home | Evidence transforming across acts | SaaS landing page |
| How It Works | Exploded evidence engine | text + sticky image |
| Career | Relationship field | role-card directory |
| Progress | Return loop | numbered timeline |
| Methodology | Instrument bench | framework cards |
| Trust | System cutaway | four-column feature list |
| Privacy | Ownership map | trust page recolored |
| Login/Signup | Form + evidence atmosphere | generic split auth |
| Dashboard D0 | unstarted evidence state | empty widgets |
| Dashboard D1 | current profile | analytics grid |
| Dashboard D2+ | trajectory/change | D1 with more cards |
| Assessment | focused task | marketing scene |
| Results | four instruments | report-card wall |

---

# 28. Board Z — Text deletion target

## Homepage

Target visible explanatory copy:
approximately **140–190 words**, excluding:
- navigation;
- button labels;
- chart labels;
- accessibility text.

The design must carry the rest.

## Secondary routes

More text allowed only where intent supports it:
- Methodology;
- Trust;
- Privacy.

But even these must use visual representation to reduce explanatory burden.

---

# 29. Award-level judge simulation

This is an internal critique exercise, not a prediction.

## Design — target 9/10
Questions:
- is the hero recognizable?
- does the composition feel authored?
- are imagery and typography interlocked?
- are all scenes visually resolved?

## Usability — target 8.5–9/10
Questions:
- can users still navigate without scroll tricks?
- are controls obvious?
- is mobile direct?
- does reduced motion work?
- does product UX remain fast?

## Creativity — target 9/10
Questions:
- is Evidence Imprint specific to this product?
- does the site demonstrate rather than decorate?
- are route silhouettes meaningfully different?
- could a template builder plausibly generate the same thing?

## Content — target 8+/10
Questions:
- is the copy concise?
- is methodology truthful?
- are demo values clearly labeled?
- is AI/scoring separation accurate?

---

# 30. Pre-Codex resource checklist

Before implementation instructions are generated, the design authority still needs:

## Already approved
- three hero source photographs;
- Source Sans 3;
- Source Serif 4;
- neutral palette;
- Work World photography set;
- Evidence Imprint concept;
- animation ownership model.

## Must be produced / verified
- real hero evidence fragments;
- final responsive crops for all three hero actors;
- six scene-chroma samples;
- SVG imprint contour shapes for 6 Work Worlds;
- RIASEC radar visual language;
- trust cutaway visual;
- mobile hero crop;
- mobile Evidence → Question composition.

If a resource remains pending when the final Codex contract is written, it must be explicitly blocked rather than substituted by a generic stock/UI shape.

---

# 31. Tiny R&D validations allowed before Codex production

No lab website.

Only isolated proof tests for uncertain mechanics:

1. hero mask quality using approved image material;
2. SVG line drawing on one evidence contour;
3. one Anime.js contour morph;
4. one GSAP hero-to-world carry;
5. 390px no-overflow hero geometry.

Each test exists to answer one technical question.

The implementation agent is not asked to invent a design while running the test.

---

# 32. Final board rejection checklist

Reject the visual system if any of these remain true:

- hero still reads text-left/image-right;
- evidence fragments look like empty CSS cards;
- Work Worlds is still an image carousel;
- Context is still a document box beside form controls;
- profile is still four containers;
- career is still percentages beside a photo;
- development is still five rows;
- trust is still four columns;
- Methodology is still cards;
- mobile is desktop stacking;
- animation is mostly fade/translate;
- page needs paragraphs to explain itself;
- horizontal page scrollbar appears at desktop/mobile acceptance sizes.

---

# 33. Research references applied in this board

Key sources used during this phase:

- Awwwards score pages — Design 40%, Usability 30%, Creativity 20%, Content 10%.
- Resn + Getty / Tracing Art coverage — complex evidence transformed into visual storytelling, accessibility + depth, timeline/data choreography.
- Telescope project documentation — product-native metaphor governing brand and interaction.
- Data Disappeared — design language derived from source subject/material.
- Communication Arts data-storytelling features — data treated as human narrative rather than passive chart inventory.
- Anime.js official v4 docs — React Scope, SVG line drawing, SVG morphing, Draggable, WAAPI.
- GSAP ScrollTrigger official docs — timeline ownership and label-to-scroll navigation.
- MDN CSS/SVG masking and clipping documentation.
- web.dev responsive image / art-direction guidance.
- web.dev animation-performance guidance.
- Apple HIG / WWDC design guidance — top-level navigation, essential tabs, safe areas and direct mobile interaction.
- Valtum Master Brain C52 and C53.
- latest Personality Assessor screenshot rejection evidence.

---

# 34. Board approval meaning

Approving this board means approving:

- **Evidence Imprint** as the product-specific art-direction system;
- the seven-act homepage story;
- the visual role of real professional evidence;
- the different route silhouettes;
- the typography roles;
- the neutral/media-chroma color logic;
- the motion ownership model;
- Anime.js as a justified local SVG/material tool;
- the mobile app-native direction;
- the anti-card representation strategy.

It does **not** approve:
- any fabricated data;
- accidental placeholder copy;
- an unverified asset;
- a specific generated crop that has not been visually checked;
- any future Codex improvisation outside the system.

---

# 35. Next step

Once this C52 board is accepted, the next step is:

# **Phase 4 — Final Award-Level Production Architecture + Codex Execution Contract**

That phase will convert every approved board state into:

- exact source files;
- exact component responsibilities;
- exact copy;
- exact asset paths;
- exact masks/crops;
- exact desktop/mobile geometry;
- exact Anime.js/GSAP ownership;
- exact timeline labels;
- exact chart implementation;
- exact reduced-motion alternative;
- exact product-truth constraints;
- exact cleanup;
- exact test/build/browser acceptance requirements.

Codex should then receive **one implementation direction only**.

No card-based reinterpretation.

No alternative design pass.

No lab.

