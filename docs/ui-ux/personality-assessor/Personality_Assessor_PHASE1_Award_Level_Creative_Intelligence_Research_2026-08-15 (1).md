# Personality Assessor — Phase 1 Award-Level Creative Intelligence Research
**Date:** 15 August 2026  
**Status:** Research / Creative Direction Foundation — **DO NOT IMPLEMENT YET**  
**Purpose:** Rebuild the creative decision-making model before another line of redesign code is written.

---

# 0. Executive conclusion

The current Personality Assessor is not failing because it needs another spacing patch, another set of rounded corners, another scroll library, or another pass of “make this section premium.”

It is failing because the design process has repeatedly started from **content units** instead of a **creative concept**.

The current thinking pattern has been:

> What content do we need?  
> Put that content in a section.  
> Put the section in a rectangle.  
> Add an image.  
> Add motion to the rectangle.  
> Repeat.

That process can produce a competent SaaS website. It cannot reliably produce an award-level authored digital experience.

The new process must reverse the order:

> What single idea can this product uniquely own?  
> What visual behavior embodies that idea?  
> What is the persistent protagonist?  
> What should the user *experience* instead of read?  
> What content can therefore disappear?  
> What technology is actually necessary to make that experience real?  
> How does the same idea become native on mobile?

This report establishes that new mental model.

---

# 1. The screenshots: what is objectively wrong

The latest screenshots are valuable because they make the failure visible without looking at source code.

## 1.1 Hero

What improved:
- Source Serif 4 gives the opening more humanity than the previous all-grotesk system.
- The three approved images are directionally useful.
- The opening statement is concise.

What still fails:
- the media still reads as large rectangles layered over each other;
- the small white/gray “material fragments” look like blank cards/placeholders;
- the header is still a separate white horizontal slab rather than part of the hero world;
- the composition still resolves into “large copy zone + media zone”;
- the hero does not yet contain a unique behavior that belongs to Personality Assessor;
- a visible horizontal scrollbar indicates unresolved viewport composition.

The hero is aesthetically improved, but it is still a **layout** rather than an **idea**.

## 1.2 Work Worlds

The section is:
- heading;
- paragraph;
- six text navigation items;
- one giant rectangular image;
- one label;
- one large sentence.

This is cleaner than the previous card carousel, but still not creatively authored.

The main problem is not card radius. It is that **the world itself does not transform**. We are simply replacing a large media rectangle and changing text.

A truly authored Work Worlds scene should make the same evidence protagonist behave differently in each professional environment.

## 1.3 Context → Question

This screenshot demonstrates the recurring failure most clearly:

- heading;
- explanatory paragraph;
- uppercase “Illustrative Interaction” label;
- white document card;
- uppercase “Professional Context Document” label;
- uppercase “Adaptive Prompt” label;
- question text;
- three large horizontal answer cards.

This is still the TEXT–CONTAINER–CARD LOOP.

The page tells the visitor that evidence becomes a question, but visually it shows **a document card beside a form**.

The visual behavior does not embody the proposition.

## 1.4 Career relationship

The route is:
- a vertical role list;
- percentages;
- one large rectangular image;
- three explanatory text blocks below.

Again, the information is valid enough as demo content, but the representation is not authored enough.

“Career relationship” should feel like a relationship map / tension / alignment field, not a directory beside a photograph.

## 1.5 Development loop

This is currently:
- one large image on the left;
- five stacked rows on the right:
  - Gap
  - Work
  - Artifact
  - Evidence
  - Return

This is exactly the anti-pattern in another form:

> five horizontal cards stacked vertically.

The content is describing a loop while the composition is linear and static.

## 1.6 Trust

The dark background changed, but the information architecture did not.

It is still:
- heading;
- paragraph;
- four equal text columns;
- dot;
- heading;
- paragraph;
- divider;
- links.

Changing the canvas to black does not create a new design idea.

---

# 2. The award-scoring reality

A useful correction: “design and creativity are 75%” is not the visible Awwwards formula.

Awwwards score pages expose:

- **Design: 40%**
- **Usability: 30%**
- **Creativity: 20%**
- **Content: 10%**

That is an extremely important framing for this project.

It means:

> Design + Usability + Creativity = **90%**  
> Content = **10%**

The current Personality Assessor has repeatedly optimized the 10% category — written explanation — while underinvesting in the other 90%.

This does **not** mean text is unimportant. It means content must become part of a designed experience rather than being the experience itself.

CSS Design Awards evaluates:
- UI;
- UX;
- Innovation.

Its published FAQ says WOTD consideration generally requires an average judge score above approximately 8.0, subject to the quality of the submission pool.

The Webby Awards judge Websites and Mobile Sites on:
- content;
- structure/navigation;
- visual design;
- functionality;
- interactivity;
- innovation;
- overall experience.

Therefore the correct internal target is not:
> “Does the homepage look stylish?”

It is:
> “Does every layer — visual system, interaction, mobile usability, performance, structure, content and technology — reinforce one authored idea?”

---

# 3. The “designer brain” behind top-tier work

Award-winning studios do not start with components.

They work through a sequence closer to this:

## Step 1 — Find an ownable truth

Not:
> What is our hero layout?

But:
> What idea is genuinely native to this brand/product?

Examples:
- Vizcom: **sketch becomes product**.
- Zoox: the **physical form of the vehicle** becomes the visual grammar.
- MindMarket: **human connection / listening** becomes a persistent visual thread.
- Obys: **Obys as a space**; identity, logo, type and layout become one system.
- Oryzo: an ordinary physical product is treated with absurd premium seriousness, inside a believable desk world.
- Bruno Simon: a portfolio becomes a world you literally drive through.

The best concept is not a decoration.
It explains why the site looks and behaves the way it does.

## Step 2 — Define the protagonist

The strongest experiences usually have something that survives longer than one section:

- a product;
- a character;
- a line/thread;
- a vehicle form;
- a logo;
- an object;
- a camera/world;
- a material;
- a transformation.

A persistent protagonist creates continuity. Without one, each section becomes a new template.

## Step 3 — Storyboard behavior before components

Dogstudio describes beginning Zoox with many low-fidelity sketches for:
- motion;
- transitions;
- content.

Only after the motion/story thinking did they resolve the wireframe and final system.

The key implication:

**We should sketch what happens, not just where boxes go.**

## Step 4 — Turn the concept into a grammar

A good concept affects:
- crop;
- shape;
- typography;
- motion;
- navigation;
- data representation;
- image behavior;
- transitions;
- even error/empty states.

Zoox is a strong example: the rounded vehicle shape influences frames, borders, buttons and art direction.

## Step 5 — Remove anything the experience already explains

OFF+BRAND’s Vizcom case study is explicit: the hero is a short story — sketch → transform → iterate — so visitors understand the product without long explanation.

Lusion’s Oryzo team reached a similar conclusion from a different direction:
- fewer typefaces;
- fewer colors;
- fewer UI ideas;
- UI supports the visual world.

Award-level restraint is not “minimalism.”
It is **removing redundant explanation because the design already communicates it.**

## Step 6 — Choose technology after the concept

Lusion states this directly: the pipeline follows the idea, not the other way around.

Obys used:
- Bun;
- React only for server-side templating;
- TypeScript interactions;
- an in-house RAF + WAAPI animation system;
- native WebGL;
- Strapi;
- plain CSS.

Vizcom used:
- Webflow;
- WebGL/3D;
- Rive;
- GSAP.

Zoox used WebGL because it solved the fidelity/asset-weight experience problem.

The lesson is not “copy their stack.”

The lesson is:
> **technology is an implementation consequence of the creative idea.**

## Step 7 — Refine in browser

Obys explains that much of the time was spent refining:
- timing;
- spacing;
- behavior;
- micro-interactions

during development.

The effortless feeling is not produced by a one-shot design file.
It is tuned in the real medium.

---

# 4. Seven case-study lessons we should internalize

## 4.1 Oryzo / Lusion — believable world + controlled UI

Why it matters:
Personality Assessor has also become too sterile and “designed by UI components.”

Key lesson:
Oryzo’s early clean studio-style concept looked polished but felt lifeless. The team improved it by placing the protagonist inside a believable work desk environment.

Their principles:
- realistic image;
- product at the center;
- seamless transitions;
- humor.

They then intentionally reduced:
- typefaces;
- colors;
- UI styles.

**Personality translation:**
We need believable professional evidence worlds — real work, real material, real artifacts — not more informational panels.

## 4.2 MindMarket / KOKI-KIKO — make an intangible service visible

This is one of the closest conceptual references to our problem.

MindMarket is a qualitative research company. Their business value is intangible: human understanding.

Instead of explaining research through business cards and service paragraphs, they created:
- a persistent connecting visual thread;
- custom hand-drawn illustrations;
- animation as narrative structure;
- depth through layered scenes.

The design expresses **how the company thinks**.

**Personality translation:**
Psychological/professional interpretation is also intangible.
We need a visual mechanism that makes interpretation *feel physical*.

## 4.3 Vizcom / OFF+BRAND — the experience is the explanation

Objective:
make Vizcom understandable within seconds.

Solution:
the hero literally demonstrates:
- sketch;
- transformation;
- iteration.

The visual proves the headline.

**Personality translation:**
A visitor should see:
> work evidence → interpretation → adaptive question → profile relationship

before reading a methodology paragraph.

## 4.4 Zoox / Dogstudio — product-native geometry

Dogstudio did not invent random “premium shapes.”
They used the actual rounded geometry of the Zoox vehicle throughout the visual language.

**Personality translation:**
We need a native material/behavior from professional evidence itself — not arbitrary circles, rounded cards or abstract AI geometry.

## 4.5 Obys — identity system before website layout

The new Obys did not begin with page wireframes.
It began with a custom typeface.

That typeface then influenced:
- rhythm;
- hierarchy;
- spacing;
- identity.

The logo became an active interface participant and persisted across layouts.

The team also intentionally excluded non-essential content.

**Personality translation:**
We should stop treating typography as a token choice made after the page structure.
Type, image material, movement and product concept should be designed together.

## 4.6 Anime.js — documentation as product demonstration

The Anime.js website is powerful because the website **behaves like the product it is selling**.

It does not merely claim:
> “We support SVG morphing.”

The site demonstrates:
- SVG morphing;
- line drawing;
- motion paths;
- timelines;
- draggable interactions;
- staggering;
- scroll synchronization;
- responsive animation behavior.

The interface becomes proof.

**Personality translation:**
The Personality Assessor site should demonstrate interpretation rather than explain interpretation.

## 4.7 GQ × Audemars Piguet / Immersive Garden — coherence over excess

The important lesson from high-end cinematic projects is not “use 3D.”

It is:
- continuous pacing;
- precise transitions;
- attention to material;
- camera restraint;
- timing;
- scene coherence.

The strongest immersive sites often hold the camera still long enough for the subject to matter.

**Personality translation:**
Our current long scrubs are not premium simply because they move.
The user needs complete, composed dwell states.

---

# 5. What creativity actually means in our project

Creativity is not:
- another layout;
- more offset grids;
- a bigger serif;
- rounded image collage;
- horizontal cards instead of vertical cards;
- parallax;
- pinning;
- a WebGL orb;
- adding Anime.js.

Creativity is:

> **finding a product-native visual rule that can generate many coherent moments.**

A creative rule should answer:
- Why are the images cropped this way?
- Why does this object move?
- Why does this chart use this representation?
- Why does the hero transition into the next chapter?
- Why does mobile behave differently?
- Why does the page feel like this product and no other one?

If we cannot answer those questions from one central idea, the site is still a collection of layouts.

---

# 6. Recommended creative territory for Personality Assessor

## Working concept: **THE IMPRINT / PROFESSIONAL EVIDENCE AS MATERIAL**

This is a research recommendation, not yet the final visual lock.

Core idea:

> Work leaves an imprint.  
> Personality Assessor reveals, separates and reconnects those imprints.

The website should treat professional evidence as **material**, not content cards.

### The protagonist

Not a line copied from MindMarket.

Not a 3D sphere.

Not a card.

The protagonist is a **changing evidence surface / imprint** derived from real work:
- a crop of a plan;
- a document layer;
- a work photograph;
- a hand-made annotation;
- an extracted contour;
- a trace;
- a structured measurement.

The same material changes form as the visitor progresses.

### Hero

Real work environments overlap like a physical analysis table.

The title is not beside the world; it participates in it.

A real evidence fragment crosses the typographic field.

One visual “imprint” is extracted from the environment.

### Work Worlds

Do not swap giant photos.

The evidence imprint enters six environments.

Each environment changes:
- crop;
- scale;
- movement;
- texture;
- evidence behavior.

The world demonstrates a different professional mode.

### Evidence → Question

The extracted material is isolated.

Unimportant context physically falls away.

The remaining evidence reshapes/repositions into the origin of the adaptive question.

The question is born from the visual evidence, not rendered in a form card beside it.

### Profile

The same evidence separates into four analytical grammars:
- Big Five;
- RIASEC;
- Work Values;
- Career Signals.

They should not all look like bars inside containers.
Each becomes its own spatial representation.

### Career

Multiple profile/evidence traces converge around a role environment.

“Fit” is shown as a relationship:
- aligned;
- stretched;
- unsupported;
- developable.

Not simply a percent beside a role name.

### Development

A new work artifact re-enters the system.

The visual literally returns to the earlier evidence material, closing the loop.

This is much closer to an ownable concept than “professional site with images and charts.”

---

# 7. A new content rule: copy must earn screen space

Homepage content should be treated as part of composition.

Recommended target:
- H1: 3–7 words;
- scene statement: 3–8 words;
- support line: 8–20 words;
- detailed methodology lives deeper;
- visual labels only when interaction genuinely needs them.

New test:

> If we hide all body paragraphs, can a visitor still understand the product’s central story?

If no, the visual system is not doing enough work.

For an award-level public homepage, the goal should be that **most understanding is carried by image, interaction, data relationship and motion**.

---

# 8. Typography research direction

Typography must not be selected as a fashionable afterthought.

The Obys case is useful because type was foundational, not decorative.

For Personality Assessor:

## Current direction worth preserving
- Source Serif 4 has improved the hero.
- Source Sans 3 remains suitable for product/UI readability.

## What still needs improvement
The type system is currently used conventionally:
- big H1;
- standard H2;
- paragraph;
- uppercase label.

The next stage needs typography to behave spatially:
- type behind/through image;
- cropped scale transitions;
- variable optical hierarchy;
- large quiet editorial statements;
- product UI typography that is operational rather than decorative;
- very few uppercase micro-labels.

Do not solve personality through “fancy font.”
Solve it through:
- scale;
- rhythm;
- line break;
- alignment;
- relationship to media;
- motion;
- silence.

---

# 9. Color research direction

Award-level color is usually concept-dependent.

There is no requirement to have a permanent “brand accent.”

The current neutral white / black foundation is useful because it allows:
- professional photography;
- evidence material;
- illustration;
- data semantics

to supply color.

But neutral must not become sterile.

We should introduce color through **evidence worlds**, not through UI chrome:
- real blueprints;
- highlighter marks;
- natural work materials;
- professional environments;
- chart semantics;
- custom illustration if commissioned.

No arbitrary colored borders.

No “AI purple.”

No generic premium olive.

No gradient identity.

---

# 10. Technology intelligence

The current app already includes:
- React 19;
- Vite;
- GSAP;
- Framer Motion;
- Three / React Three Fiber / Drei;
- Recharts;
- Barba;
- Lottie.

The problem is not a lack of libraries.

The problem is that our creative concept has not been strong enough to justify how they are used.

## 10.1 GSAP

Keep for **macro narrative ownership**:
- long scroll-linked transformations;
- true pinning;
- scene-to-scene carry;
- complex cross-actor sequencing.

Use sparingly.

One scene = one clear owner.

## 10.2 Anime.js v4

Anime.js is highly relevant, but **not as a replacement badge**.

Current official Anime.js capabilities include:
- `createTimeline()`;
- timeline labels;
- ScrollObserver / `onScroll()`;
- advanced staggering;
- SVG morphing;
- SVG line drawing;
- motion paths;
- draggable + springs;
- Scope/media-query handling;
- WAAPI-powered lightweight animations.

The official site itself won Awwwards Site of the Month in May 2025 and a Developer Award.

### Where Anime.js could be valuable for Personality Assessor

Use it for **local, crafted kinetic systems**:

1. evidence lines drawing/retracting;
2. SVG contour morphing;
3. evidence fragments converging;
4. profile relationships;
5. chart/micro-diagram transformations;
6. draggable/inspectable career relationship surfaces;
7. text/character micro-choreography;
8. local responsive animation scopes.

### Where NOT to use Anime.js

Do not use Anime.js:
- to duplicate a GSAP ScrollTrigger scene;
- simply because its website looks good;
- for a second global smooth-scroll owner;
- to animate every section;
- as a reason to increase motion density.

### Ownership model if both libraries are used

**GSAP**
- macro scroll story;
- pinning;
- large cross-section transitions.

**Anime.js**
- local DOM/SVG choreography;
- path drawing;
- morphing;
- staggered evidence/data behavior;
- draggable micro-experiences.

**Framer Motion**
- authenticated application state;
- React layout transitions;
- sheets/panels/list-detail.

**CSS / WAAPI**
- basic hover/focus/press;
- cheap single-element transitions.

Never let two libraries own the same transform on the same actor.

## 10.3 Anime.js module strategy

Do not import the full toolbox by habit.

Anime.js documents a modular architecture.

Potential imports:
- timeline;
- animation;
- SVG;
- stagger;
- Scope;
- WAAPI where appropriate.

Use WAAPI for simple compositor-friendly micro-motion.
Use Anime.js JS animation for:
- SVG attributes;
- complex timelines;
- high target counts;
- richer callbacks/control.

## 10.4 Rive

Rive is useful only if we create original illustration/motion assets.

Possible use:
- one custom evidence character/object;
- responsive illustration system;
- controlled state-machine visual.

Do not use:
- marketplace stock illustrations;
- generic corporate characters.

## 10.5 WebGL / Three / R3F

Not mandatory.

Use only if the concept gains something impossible or significantly weaker in DOM/SVG.

Possible justified use:
- a real spatial evidence world;
- one persistent material object that transforms continuously;
- highly tactile 3D data/evidence surface.

Not justified:
- a floating personality sphere;
- random particles;
- “3D because awards.”

A strong 2.5D DOM/SVG experience can be more original and faster.

## 10.6 Theater.js

Interesting only if we commit to a cinematic 3D/visual timeline that requires designer/developer tuning in-context.

Do not add for this product unless the selected concept clearly requires it.

## 10.7 Native Web Animations API

Worth using for:
- small performant visual states;
- simple load/hover/transition;
- compositor-friendly movement.

Anime.js WAAPI is useful when we want a consistent interface around WAAPI.

---

# 11. Mobile-first at award level

“Responsive” is not enough.

Desktop award sites often fail on mobile because the cinematic desktop idea is merely collapsed.

Our mobile rule:

> **same concept, different choreography.**

At 390×844:

- one primary actor at a time;
- touch is direct;
- no hover dependency;
- no long desktop pin;
- no tiny landscape image;
- portrait crops are independently directed;
- bottom navigation for authenticated product;
- safe-area-aware actions;
- less text than desktop when necessary;
- transitions are shorter and more tactile;
- scroll does not fight the browser;
- 44px+ frequent touch targets;
- no horizontal overflow.

Mobile should feel like a deliberate companion application.

For the public story, this may mean:
- vertical evidence transformations rather than horizontal rails;
- direct swipes/taps;
- full-screen inspection scenes;
- native sheets for detail;
- persistent but compact evidence protagonist.

---

# 12. Performance is part of creativity

Award-level does not excuse slow interaction.

A creative effect that destroys mobile responsiveness is not premium.

Internal targets:
- LCP <= 2.5s where practical;
- CLS <= 0.1;
- INP <= 200ms where practical;
- no long main-thread animation loops without need;
- responsive AVIF/WebP;
- explicit image sizing;
- lazy below-fold media;
- no unnecessary high-priority preloads;
- reduced-motion alternative;
- no global WebGL if only one small scene needs it.

The creative team must design within the performance budget from the beginning.

---

# 13. New award-level internal scorecard

This is an **internal target**, not a promise of an award.

## Awwwards-style target
- Design: **9.0**
- Usability: **8.5**
- Creativity: **9.0**
- Content: **8.0**

The goal is not to game scoring.
It is to force us to ask why the experience deserves a 9.

## CSSDA-style target
- UI: **8.7+**
- UX: **8.5+**
- Innovation: **8.7+**

## Internal extra categories
- Concept ownership: 9/10
- Mobile authorship: 9/10
- Performance: 8.5+/10
- Accessibility: 8.5+/10
- Motion coherence: 9/10
- Template distance: 9.5/10

If any scene is obviously reproducible by a generic AI builder, it fails regardless of average score.

---

# 14. New creative acceptance tests

## 14.1 No-copy test
Hide paragraphs.

If the idea disappears, fail.

## 14.2 Grey-box test
Replace all media with grey boxes.

If the site becomes the same template as any SaaS product, fail.

## 14.3 Screenshot silhouette test
Blur the page.

If it becomes a stack of rectangles, fail.

## 14.4 Swap-brand test
Replace “Personality Assessor” with another SaaS company.

If composition still makes sense unchanged, fail.

## 14.5 Motion mute test
Disable animation.

The static composition must still be strong.

## 14.6 Motion purpose test
For every animation ask:
> What relationship does this explain?

No answer = remove it.

## 14.7 Mobile-only test
Review the entire product without looking at desktop.

If it feels like a derivative version, fail.

## 14.8 3D deletion test
If deleting WebGL changes nothing about the concept, WebGL was unnecessary.

## 14.9 Card count test
If public narrative is visually dominated by bounded rectangles, fail.

## 14.10 Design-to-content ratio test
Estimate what percentage of understanding is carried by:
- interaction;
- image;
- visual relationship;
- motion;
- spatial hierarchy

versus paragraphs.

If text still carries most of the meaning, the creative system is underdeveloped.

---

# 15. What we should NOT do next

Do not:
- give Codex another correction prompt;
- polish the current card architecture;
- add Anime.js immediately;
- add WebGL immediately;
- rebuild the hero in code before concept lock;
- create another 50-page implementation spec while the creative idea is still weak.

That would reproduce the same failure.

---

# 16. Correct next phase after this research

The next phase should be **Creative Concept Lock**, not code.

Deliverables:

1. one final product-native metaphor;
2. one persistent protagonist;
3. hero storyboard;
4. homepage scene storyboard;
5. transition storyboard;
6. mobile storyboard;
7. typography behavior board;
8. media/artifact language;
9. data visualization language;
10. technology ownership map;
11. explicit content-removal map.

This can be produced as static frames / storyboard diagrams / written spatial specs.

Only after that system is approved should Codex receive a production implementation contract.

---

# 17. Research source map

Primary / studio sources studied:

- Awwwards scoring pages — Design 40%, Usability 30%, Creativity 20%, Content 10%.
- CSS Design Awards FAQ / WOTD pages — UI, UX, Innovation and judge thresholds.
- The Webby Awards Judging Criteria — content, structure/navigation, visual design, functionality, interactivity, innovation, overall experience.
- Anime.js official website and v4 documentation — Timeline, ScrollObserver, SVG, Draggable, Scope, WAAPI.
- Anime.js GitHub releases.
- Lusion — Oryzo BTS Part 1: Concept and Creative Direction.
- Lusion — Oryzo BTS Part 2: 3D Design and Motion Graphics.
- Lusion — Oryzo BTS Part 3: Website UX/UI and Illustrations.
- OFF+BRAND — Vizcom case study.
- Dogstudio — Zoox case study.
- Obys / Codrops — Designing Ourselves: The New Obys Identity and Website.
- MindMarket / KOKI-KIKO project coverage and award recognition.
- Immersive Garden / GQ × Audemars Piguet award coverage.
- Bruno Simon portfolio and 2026 Webby recognition.

---

# 18. Final Phase 1 thesis

The current site is not missing “better cards.”

It is missing a **creative thesis**.

Award-level digital work is not created by arranging content more elegantly.
It is created by turning the brand/product truth into a visual and interactive system that could not belong to anyone else.

For Personality Assessor, the next successful design must make **professional evidence physically and visually transform into interpretation**.

The site should become understandable through:
- material;
- movement;
- photography;
- data;
- spatial relationship;
- interaction.

Text becomes supporting evidence.

Not the website itself.

**Do not code Phase 2 until this creative direction is locked.**
