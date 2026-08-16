# Personality Assessor — Reference-Locked Full Frontend Rebuild
## Codex Production Instruction Set — Hero from Reference A, Full-Site Grammar from Reference B

**Date:** 16 August 2026  
**Repository:** `analyticsmath/PersonalityAnalysis`  
**Status:** READY FOR IMPLEMENTATION  
**Mode:** Full visual restart. Preserve product logic; replace the visible frontend system from scratch.  
**Primary authority for this pass:** the two user-provided visual references and this document.

---

# 0. NEW AUTHORITY ORDER

For **visual design only**, this document and the two user references override every previous Personality Assessor visual direction, including:

- Evidence Imprint;
- Decision Portrait;
- Source Serif / Source Sans lock;
- old neutral-gallery layouts;
- previous Work Worlds;
- previous Context → Question composition;
- previous public-route silhouettes;
- old section count;
- old hero;
- old footer;
- old dark-section composition;
- previous “instrument field” layouts.

Preserve only verified product behavior, routes, APIs, data contracts, auth/session behavior, assessment logic and truthful copy.

The current browser has **zero visual authority**.

---

# 1. VISUAL REFERENCES — HOW TO USE THEM

## Reference A — HERO COMPOSITION

User-provided image:
`14b6959b-7c21-4fd6-9877-3b9b6ceedf6f.jpg`

This is the **hero composition reference**.

The new Personality Assessor hero must match its *composition grammar* extremely closely:

- white canvas;
- integrated thin navigation;
- centered oversized bold sans-serif headline;
- large staggered vertical portrait/image panels below the headline;
- 5–6 main image actors with mixed heights;
- 2 small auxiliary image panels;
- generous white space;
- circular micro-interaction at upper-left of visual field;
- small avatar/community cluster at upper-right;
- primary CTA placed inside the image composition, not isolated far away;
- asymmetrical but balanced masonry rhythm;
- no giant background hero photo;
- no text-left / image-right split;
- no serif hero;
- no decorative SaaS gradient;
- no “premium” dark hero;
- no feature cards in hero.

Do **not** copy the TrendZone branding, fashion content, or actual fashion imagery.

Translate the exact composition into Personality Assessor using professional-work imagery.

---

## Reference B — FULL-SITE VISUAL GRAMMAR

User-provided image:
`2c90c5dd-a3c7-475a-b535-eeb09ea041e8.jpg`

This is the **overall website art-direction reference**.

The new site should inherit its visible grammar:

- light cool-gray page background around large white modules;
- high image-to-text ratio;
- large photographic blocks;
- image-first cards, not text-first cards;
- text over photography when the image can carry the message;
- frequent asymmetry;
- different module silhouettes per chapter;
- strong white → light-gray → black rhythm;
- large black editorial chapters used selectively;
- oversized typography only at key moments;
- small product/UI overlays floating over imagery;
- one or two bright accent actions, not a whole accent-colored interface;
- controlled rounded corners on image containers only where useful;
- large visual breathing room;
- product information embedded into visual scenes;
- testimonial and social-proof modules driven by image composition;
- footer treated as a designed visual chapter;
- transitions between chapters should feel like editorial pacing, not stacked landing-page sections.

The target is **not to clone Reference B literally**.

The target is:
> use its art-direction intelligence, image dominance, pacing, composition variety and section craftsmanship to build a Personality Assessor-specific site.

---

# 2. DESIGN SCORE TARGET

The current frontend is rejected at approximately 1–2/10 against the desired award-level benchmark.

The new build must target:

- Visual design: 9+/10
- Composition: 9+/10
- Creativity: 9+/10
- Image art direction: 9+/10
- Mobile art direction: 9+/10
- Product usability: 9/10
- Template distance: 9+/10

Do not interpret this as “add more effects.”

Interpret it as:
- better composition;
- better imagery;
- better hierarchy;
- better negative space;
- fewer words;
- stronger transitions;
- more authored sections;
- more useful interaction.

---

# 3. HARD RESET — DO NOT PATCH THE CURRENT VISUAL SYSTEM

Do not continue editing the old visual architecture.

Create a new public visual system from scratch under a new namespace.

Recommended:

```text
frontend/src/components/editorial/
frontend/src/pages/editorial/
frontend/src/styles/editorial/
frontend/src/content/editorial/
```

After the new system is fully routed and verified, delete obsolete visual systems.

Do not reuse a rejected component just because it already works.

---

# 4. PRESERVE FUNCTIONAL LOGIC

Preserve:

- React Router URLs;
- authentication;
- assessment session creation/recovery;
- CV/context upload/manual context;
- question rendering/types;
- answer submission;
- draft persistence;
- progress/session recovery;
- result fetching;
- career recommendation fetching;
- analytics/history APIs;
- dashboard data contracts;
- privacy/account actions;
- backend scoring;
- backend career logic.

If a current component mixes logic and visual markup:

1. extract logic into hooks/controller helpers;
2. keep logic;
3. rebuild markup/styles completely.

Do not rewrite scoring or backend behavior to satisfy visual design.

---

# 5. NEW HERO — EXACT COMPOSITION DIRECTION

## 5.1 Header

Desktop:

```text
Personality Assessor     How it works   Career intelligence   Methodology   Trust     Sign in   [Build my profile]
```

Rules:

- height approximately 70–78px;
- no divider line;
- no detached floating navbar;
- no pill navbar;
- white canvas merges directly into hero;
- brand left;
- navigation centered;
- auth/CTA right;
- no hamburger on desktop if full nav is visible;
- black primary CTA can have subtle 10–14px radius;
- text 14–16px;
- header must visually disappear into the hero.

Mobile:
- brand left;
- menu icon right;
- full desktop links removed;
- CTA appears inside hero, not header.

---

## 5.2 Hero headline

Use a **strong modern grotesk / neo-grotesk**, not the repeated large editorial serif system.

Provisional copy:

### Primary
`See the professional patterns behind your decisions.`

Alternative allowed after browser review:
`See how you think, work and grow.`

Do not change copy automatically. Use the first line unless the user approves another.

Desktop:
- centered;
- max width around 760–900px;
- approx 64–82px depending viewport;
- 0.90–1.02 line height;
- heavy weight ~650–760;
- 2 lines maximum.

Support copy:
one concise sentence only, centered, 16–19px, muted.

Example:
`Adaptive questions turn real professional context into a profile and career direction you can inspect.`

Do not add eyebrow copy.

---

## 5.3 Hero image composition

Use **professional-work portraits and evidence scenes** arranged in the same visual rhythm as Reference A.

Required desktop visual actors:

### Actor 1 — left tall portrait
Professional seated at desk / writing / reviewing work.

### Actor 2 — left-lower small landscape
Professional collaboration / sticky-wall / review.

### Actor 3 — tall center-left portrait
Professional standing or presenting, strong clean silhouette.

### Actor 4 — center medium portrait
Professional at laptop / analysis / assessment context.

### Actor 5 — center-right tall portrait
Two professionals collaborating over plans/documents.

### Actor 6 — right tall portrait
Professional seated / reflective / reviewing document.

### Actor 7 — right-lower small landscape
Notebook, project artifact, plans, or professional evidence detail.

All images:
- consistent color grade;
- editorial;
- real professional environments;
- natural light;
- no cliché handshake;
- no obvious “corporate stock” smile;
- no AI-glow;
- no neon;
- no random laptops unless compositionally justified.

Hero visual must form a **masonry arc / staggered rhythm** under headline.

Suggested relative geometry at 1440×900:

```text
                  headline
             -------------------

  small play/interaction                       avatar cluster

 [tall]   [tall-large]   [medium]   [tall-large]   [tall]
 [small]                                        [small]

                    [primary CTA]
```

Do not put all images at the same baseline.

Do not put all images at the same radius.

Do not create five equal cards.

Image radius:
roughly 16–24px where needed.

The images themselves are the cards.

---

## 5.4 Hero auxiliary elements

### Circular micro-interaction
Reference A has a circular play control.

For Personality Assessor, use:

`SEE HOW IT ADAPTS`

around a circular arrow/play glyph.

Desktop:
- upper-left of image field;
- subtle;
- clicking scrolls or triggers the first interaction preview.

Do not animate constantly.

### Avatar / people cluster
Upper-right.

Use 3–4 small professional avatars plus text such as:

`Built for students, graduates and professionals`

Do **not** use fake user counts.

No:
`350K+ users`
unless real.

### CTA
Place a compact `Build my profile →` CTA inside the lower center of the masonry composition.

This should feel integrated into the image field, as in Reference A.

---

# 6. IMAGE ACQUISITION — IMPORTANT

The current image library is not visually coherent enough.

Do not crop the reference screenshots and use those pixels.

Do not use low-resolution images from the generated concept mockup.

Source a new coherent professional image set.

Preferred source order:

1. existing user-approved / locally available high-quality professional photography if it matches;
2. Pexels / Unsplash / licensed stock with traceable source;
3. generated editorial photography only if the user explicitly approves generated imagery.

For each hero candidate, produce a manifest:

```text
id
source
source URL
photographer/credit if required
subject
role in composition
desktop crop
mobile crop
```

### Asset approval gate

Do not lock the final production image set until the user approves the hero image group.

If exact reference-equivalent imagery cannot be found, pause and report the image gap rather than silently using generic substitutes.

---

# 7. HOMEPAGE — OVERALL CHAPTER ARCHITECTURE

The homepage should feel like Reference B:
- image-led;
- varied module silhouettes;
- alternating light/dark;
- generous white space;
- visual storytelling;
- information embedded into images;
- no repetitive section formula.

Recommended chapters:

1. Hero / Professional Mosaic
2. Adaptive Assessment — visual process
3. Four Readings — image-led profile story
4. Career Worlds — black interactive hover section
5. Progress / New Evidence — large editorial image + compact data overlay
6. Real Result / Testimonial Story
7. Trust / Privacy — compact designed strip
8. Closing CTA
9. Designed footer / oversized brand moment

Do not label these chapters in code/UI as generic `Section 1`, `Section 2`, etc.

---

# 8. CHAPTER 2 — ADAPTIVE ASSESSMENT

Goal:
show the product with very little prose.

Composition inspired by Reference B’s first large white module.

Use:
- white rounded module on light-gray page;
- large heading on left;
- one large professional image or evidence scene;
- one small live product interface overlay;
- a small accordion / direct explainer on one side.

Possible copy:

`Questions change when the evidence changes.`

Visual:
- large contextual-work image;
- small floating question interface;
- a highlighted context phrase;
- 2–3 concise labels around it.

Do not create 3 explanatory cards.

Do not show a giant form panel.

The product UI overlay should occupy only around 20–30% of the image.

---

# 9. CHAPTER 3 — FOUR READINGS

Do not use:
- four text cards;
- tabs with big content panel;
- lollipop dashboard as full chapter;
- giant radar chart floating on white.

Instead use an image-led editorial composition.

Recommended structure:

Large left image:
professional subject / work scene.

Overlaid compact product snapshot:
- 4 reading labels;
- one active reading;
- minimal data.

Right:
large statement:

`One profile. Four ways of reading the work behind it.`

Below:
small direct links:
- Personality
- Vocational interests
- Work values
- Career signals

On hover/click:
the image crop or overlaid data changes.

The visual should move first; text is secondary.

---

# 10. CHAPTER 4 — CAREER WORLDS
## IMPORTANT INTERACTION

This should directly use the user's requested interaction inspired by the black section in Reference B.

Background:
true black / near-black.

Headline:
large white sans.

Example:
`See where your patterns fit — and where they could grow.`

Below:
five career rows.

Example careers:
- Systems Architect
- Product Strategist
- UX Researcher
- Data & Evidence Analyst
- Technical Operations Lead

Each row:
- career name;
- small arrow;
- optional concise secondary cue.

NO career cards.

### Hover behavior — desktop

When pointer enters a career row:

1. large image card for that career appears near the row;
2. image follows/interpolates slightly with pointer position;
3. image may tilt/rotate 2–5 degrees;
4. the card can overlap adjacent rows;
5. active row text brightens;
6. previous image exits quickly;
7. role-specific microcopy appears over image or beside it;
8. image does not cause layout shift.

Image card should include:
- image as ~90% of its visual surface;
- 1–2 lines of overlaid white text;
- subtle black-to-transparent image gradient only for readability;
- no text-only interior.

This is exactly the type of **image card** the user wants.

### Mobile behavior

No hover.

Each career row:
- tap expands inline/full-width image immediately below;
- only one expanded at a time;
- or swipeable full-screen career image state.

The mobile implementation must be intentionally different.

---

# 11. CHAPTER 5 — PROGRESS / NEW EVIDENCE

Use Reference B’s large-image + floating-data-overlay logic.

Composition:

Left:
large editorial professional image, about 55–62% width.

Inside image:
small product overlay showing a real longitudinal change example.

Right:
headline and 3 short bullets maximum.

Example:
`Your profile should move when your work does.`

Show:
- latest assessment date;
- evidence added;
- one changed reading;
- one next action.

Do not show a full dashboard.

Do not show multiple text cards.

---

# 12. CHAPTER 6 — RESULT / TESTIMONIAL STORY

Use image-led storytelling similar to Reference B’s testimonial chapter.

Left:
testimonial or explanatory narrative.

Right:
large image card showing a professional/user context.

Inside image:
small UI overlay of a result/career insight.

If there are no verified customer testimonials:
- do **not** invent one;
- use a product-story example instead;
- label it `Illustrative example`.

This chapter should provide emotional proof without fake social proof.

---

# 13. CHAPTER 7 — TRUST & PRIVACY STRIP

This should be compact.

Do not create a giant trust card.

Use:
- white module;
- 4 compact icon/text items;
- lots of space;
- no numbered rows.

Possible labels:
- Structured scoring
- Inspectable results
- Export controls
- Account deletion

Only use claims verified by backend/product policy.

No:
- fake certifications;
- fake encryption claims;
- “never sold” unless verified;
- exact deletion timing unless verified.

---

# 14. CLOSING CTA

Use a strong black band inspired by the lower Reference B chapter.

Left:
large statement:
`Ready to build a profile around real work?`

Center:
small image/avatar composition.

Right:
high-contrast CTA:
`Build my profile →`

This chapter can visually reuse one or two hero image actors to create continuity.

---

# 15. FOOTER — DESIGNED, NOT GENERIC

Reference B ends with an oversized wordmark moment.

Create a Personality Assessor version.

Option:

- large `PERSONALITY` typographic word spanning width;
- smaller `ASSESSOR` aligned underneath/right;
- utility links integrated around the wordmark;
- background white;
- light-gray top module;
- minimal copyright.

Do not use the current generic centered CTA + thin footer links structure.

---

# 16. SECONDARY ROUTES — SAME ART DIRECTION, DIFFERENT COMPOSITIONS

## How It Works

Do not use numbered process list.

Use:
- one large visual storyboard;
- professional image scenes;
- embedded product moments;
- horizontal/vertical editorial sequencing.

## Career Intelligence

Use the full black Career Worlds interaction as page foundation.

Allow 10–17 careers in list/filters.

Hover/tap reveals image-first role cards.

## Progress

Use:
- timeline driven by large imagery;
- real assessment-history moments;
- compact data overlays;
- no card grid.

## Methodology

More technical, but still art-directed.

Use:
- diagrams;
- large image/evidence examples;
- side annotations;
- real chart forms.

No 4-framework card grid.

## Trust

Use:
- one visual process diagram;
- evidence → structured scoring → narrative assistance → user controls;
- not four boxes.

## Privacy

Use:
- ownership lifecycle map;
- clearly separated actual actions;
- minimal copy;
- no numbered columns.

---

# 17. AUTH PAGES

Use the same visual identity without making sign-up theatrical.

Desktop:
- 40–45% editorial image field;
- 55–60% form area;
- image can be vertically cropped and image-led;
- minimal supporting copy.

Mobile:
form first.

Do not reuse generic bootstrap/auth card.

---

# 18. PRODUCT APP — DASHBOARD / ANALYTICS

The authenticated product should be calmer than marketing.

Use:
- white/light-gray;
- black typography;
- one small accent;
- large image/visual only in empty/onboarding states;
- data visualization without decorative cards.

Cards are allowed only for:
- independently actionable saved assessment;
- report;
- history record;
- upload;
- notification.

No universal card grid.

---

# 19. TYPOGRAPHY

The reference direction is bold modern sans-led.

Do not default back to giant serif headings.

Use a modern grotesk family with:
- strong heavy display;
- neutral UI weights;
- good numerals;
- wide character support.

Preferred candidates to evaluate in code:
1. Inter / Inter Tight where licensing and local availability are simplest;
2. Geist;
3. Manrope;
4. Satoshi only if properly licensed/provided.

Use at most 2 families.

The default implementation should begin with:
- Inter Tight for marketing display;
- Inter for UI/body.

Do not download unlicensed commercial fonts.

---

# 20. COLOR SYSTEM

Base:
- white;
- cool light gray;
- true black;
- neutral mid-gray.

Accent:
select **one** saturated accent derived from approved imagery.

The Reference B orange is an example of hierarchy, not a required brand color.

Do not introduce orange unless the user approves it.

Accent use:
- CTA;
- small interaction cursor/action;
- tiny label;
- hover marker.

Never flood whole cards with accent color unless image art direction demands it.

---

# 21. IMAGE CARD RULES

The user explicitly accepts cards when the card **is primarily an image**.

Allowed image card:
- image fills 80–100%;
- optional text over image;
- optional small meta;
- crop is intentional;
- card participates in composition;
- hover/touch creates meaningful behavior.

Rejected card:
- white rectangle;
- heading;
- paragraph;
- icon;
- repeated 3–6 times.

Rule:

> **If the card can still exist after removing the image, it is probably the wrong card.**

---

# 22. MOTION

Motion should support this reference language.

Recommended:
- image card reveal;
- pointer-follow career image;
- masked image transitions;
- clip-path reveals;
- text line reveal;
- subtle image scale;
- staggered masonry arrival;
- direct state transitions.

Avoid:
- constant floating;
- glowing;
- generic fade-up on every section;
- huge scroll pins;
- fake physics;
- random SVG path animation.

Libraries:
use existing GSAP / Framer only where necessary.

Anime.js is no longer required by visual authority.
Remove it only if unused after rebuild.

No WebGL unless a specific section truly requires it.

---

# 23. HERO LOAD MOTION

Desktop load:

1. nav establishes immediately;
2. headline lines reveal in 350–550ms;
3. hero photos enter with 40–80ms stagger;
4. each image translates 14–24px + opacity;
5. CTA establishes last;
6. stop.

No looping movement.

On hover:
- individual image may scale 1.015–1.025;
- no lifting shadow circus.

---

# 24. CAREER HOVER TECHNICAL CONTRACT

Desktop only, `(pointer: fine)`.

Maintain one floating image preview actor.

Suggested implementation:
- absolute/fixed preview inside black career section;
- pointer movement maps to x/y with damped lerp;
- row enter changes image source + caption;
- row leave fades preview;
- preview `pointer-events: none`;
- z-index above list;
- clip/overflow only locally;
- no page horizontal overflow.

Animation:
- enter 180–260ms;
- image mask/clip reveal;
- rotate max ±4deg;
- scale 0.96 → 1;
- opacity 0 → 1.

Use `requestAnimationFrame` or GSAP quickTo.

Do not re-render React state every pointer pixel.

---

# 25. RESPONSIVE RULES

Mandatory:
- 1440×900
- 1366×768
- 1024×768
- 768×1024
- 430×932
- 390×844
- 375×812
- 360×800

No global `overflow-x:hidden` patch.

Fix real overflow sources.

---

# 26. MOBILE HERO

Do not reproduce the desktop 7-image masonry literally.

390×844 recommendation:

- brand/menu;
- centered/left-aligned 42–52px headline;
- 3-image asymmetric portrait montage;
- one small supporting image;
- CTA below/over lower image;
- no avatar cluster if crowded;
- no circular micro-control if it compromises hierarchy.

The mobile visual should still clearly reference the desktop hero family.

---

# 27. MOBILE HOMEPAGE

Order may remain conceptually similar but compositions change.

Use:
- large image first;
- 1 sentence;
- direct action;
- image-first expandable career rows;
- horizontal image strip only where touch-friendly;
- no tiny 3-column modules;
- no hover-dependent information;
- no internal scrollbars.

---

# 28. COPY REDUCTION

The site should use approximately **50–65% less public explanatory text** than the rejected build.

Homepage:
- one H1;
- one support sentence;
- one short statement per chapter;
- labels only where useful.

Do not fill whitespace.

Whitespace is part of the design.

---

# 29. DELETE OLD VISUAL CODE

After new pages are fully routed and browser-checked:

delete or retire:
- `components/public/imprint/**`
- `styles/imprint/**`
- old editorially rejected public visual components;
- old public guardrail tests tied only to rejected class names;
- dead CSS;
- dead demo layouts.

Preserve product-truth tests.

Do not leave two competing public design systems.

---

# 30. VISUAL QA — HARD GATES

## Hero
Must visually resemble Reference A in:
- centered headline;
- image masonry;
- white space;
- balance;
- CTA integration;
- overall silhouette.

## Whole homepage
Must visually resemble Reference B in:
- image dominance;
- light/dark pacing;
- varied chapter geometry;
- photography-led cards;
- image/text layering;
- black hover chapter;
- lower-page visual richness;
- designed footer.

## Blur test
If homepage blurs into repeated white rectangles:
FAIL.

## Card test
If text-first cards dominate:
FAIL.

## Mobile
If 390 looks like desktop stacking:
FAIL.

## Asset test
If generic/low-quality stock weakens hero:
STOP and report.

---

# 31. BROWSER REVIEW BEFORE DECLARING COMPLETE

Codex must visually inspect:
- hero 1440×900;
- hero 1366×768;
- hero 390×844;
- black Career Worlds idle;
- career hover preview;
- progress image chapter;
- trust strip;
- footer;
- How It Works;
- Career Intelligence;
- Methodology;
- login/signup;
- dashboard;
- active assessment mobile.

Tests/build do not equal design approval.

---

# 32. VALIDATION

Run:

```text
npm test
npm run lint
npm run build
```

Do not install a new E2E framework.

---

# 33. COMPLETION REPORT

Return:

1. starting branch/SHA;
2. visual systems deleted;
3. new architecture;
4. hero implementation;
5. hero image sources/manifest;
6. image assets still awaiting approval;
7. overall homepage chapters;
8. career hover implementation;
9. image-card system;
10. mobile hero;
11. mobile homepage;
12. secondary routes;
13. auth;
14. product app changes;
15. typography;
16. color/accent;
17. motion;
18. accessibility;
19. performance;
20. product-truth audit;
21. test result;
22. lint result;
23. build result;
24. browser viewports inspected;
25. known deviations;
26. final statement:
`Implementation complete; final visual approval remains pending user/design-authority browser review.`

---

# 34. ABSOLUTE NEVER-TO-DO

Do not reintroduce:

- huge serif headline on every section;
- generic SaaS hero;
- left-copy/right-image hero;
- text-first cards;
- 3-card feature rows;
- four white trust rows;
- Work Values card grid;
- process stepper;
- numbered “01 / 02 / 03” design decoration;
- bento grid;
- pill navbar;
- dark AI-glow aesthetic;
- purple/blue gradient;
- meaningless lines/scales;
- internal scrollbars in marketing scenes;
- hamburger plus full desktop nav at same time;
- fake metrics;
- fake testimonials;
- fake user counts;
- fake certifications;
- fake science;
- fake privacy promises;
- cloned Granger branding/content;
- cloned TrendZone branding/content.

Use the references as **art-direction and composition authority**, not as content to plagiarize.

---

# 35. FINAL DESIGN PRINCIPLE

The hero should make the visitor think:

> “This feels as composed and image-led as the fashion reference.”

The rest of the site should make the visitor think:

> “Every chapter has its own visual idea, but the whole experience belongs together.”

The implementation must no longer feel like:

> “content was placed into components.”

It should feel like:

> **photography, type, interaction and product UI were composed together as one visual system.**
