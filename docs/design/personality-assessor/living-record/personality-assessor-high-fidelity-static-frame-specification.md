# PERSONALITY ASSESSOR
# HIGH-FIDELITY STATIC FRAME SPECIFICATION
## The Living Record
### Research-backed desktop, tablet, and mobile composition boards
### Design gate only. Not an implementation brief.

**Date:** 22 August 2026  
**Project:** Valtum Studio / Personality Assessor  
**Repository:** `analyticsmath/PersonalityAnalysis`  
**Creative thesis:** The Living Record  
**Persistent protagonist:** The Evidence Strip  
**Primary blueprint:** White Desert for world, pacing, media ownership, and operational proof  
**Temporal blueprint:** Lenis for one continuous input-driven world  
**Supporting references:** Lando Norris, Oryzo, The Watch, Palomino, EverWonder, Moto Card, historical Bram van Vugt, Lottie/dotLottie state systems  
**Status:** This document must pass visual-design review before a coding-agent implementation specification is written.

---

# 0. PURPOSE

This document is the next design gate after the creative-thesis reset.

It does **not** explain how to code the site.

It does **not** preserve the current public frontend architecture.

It does **not** distribute animation libraries across pages.

It defines the static visual states that must exist before motion is authored.

The central rule is:

> **If a frame is weak when motion is paused, the animation is rejected before implementation.**

The site must first work as an authored sequence of still compositions.

Only then should Lenis, GSAP, SVG, Three.js, Motion, Rive, dotLottie, Anime.js, or any other technology be assigned.

---

# 1. RESEARCH CONCLUSIONS THAT DIRECTLY GOVERN THESE FRAMES

## 1.1 White Desert: environment first

White Desert does not visually behave like a website with a large travel photo.

Antarctica is the compositional owner.

The current site moves from environmental awe into real operational information such as camp coordinates, Cape Town and Wolf's Fang coordinates, 05:30 flight duration, 4,220 km distance, and -5°C average summer temperature.

That is the key blueprint:

> **The world creates desire. Real information creates orientation and trust.**

For Personality Assessor:

- professional environments create the world;
- the Evidence Strip provides continuity;
- real source/evidence/scoring/history data creates proof.

## 1.2 White Desert: loud and quiet states

The page is not continuously “special.”

The rhythm moves through:

- visual spectacle;
- quiet editorial space;
- destination choice;
- human testimony;
- environmental detail;
- geography/logistics;
- practical action.

Personality Assessor therefore needs designed intensity changes.

## 1.3 White Desert: atmosphere belongs to the subject

White Desert can use mist, exposure, distance, and whiteout because those are Antarctic conditions.

Personality Assessor must use verbs derived from its actual model:

- attach;
- branch;
- accumulate;
- compare;
- qualify;
- revisit;
- trace;
- retain.

## 1.4 Lenis: the interaction demonstrates the proposition

Lenis makes scroll behavior itself the demonstration.

Personality Assessor must let context switching demonstrate the product.

The visitor should experience:

> the same source record remaining identifiable while its professional environment and interpretive contribution change.

## 1.5 Lando Norris: subject controls physics

Lando's current experience combines real race information, media, athlete identity, archive, calendar, and route-specific behavior in one coherent world.

Transfer:

- route modes can differ;
- real data can be visual material;
- motion should feel subject-derived;
- performance belongs to the identity.

## 1.6 Oryzo: protagonist before pipeline

Lusion publicly documents rejecting a polished “typical Awwwards” direction because it felt lifeless.

Their replacement principles included:

- realistic image;
- product at the centre;
- seamless transitions;
- humor.

Most important:

> **the pipeline follows the idea, not the other way around.**

The Personality Assessor equivalent is not a coaster. It is the Evidence Strip.

## 1.7 Palomino / EverWonder: crop is layout

Photography should not be “the image assigned to a section.”

Photography determines:

- scale;
- negative space;
- sequence;
- depth;
- rhythm;
- what typography can do.

## 1.8 Moto: quiet states matter

A premium experience is allowed to become almost still.

After a major cinematic moment, one object and one real fact can be stronger than another animation.

## 1.9 The Watch: persistence can replace section continuity

A recognisable object moving through camera/information states gives stronger continuity than repeated layout shells.

The Evidence Strip must play this role.

---

# 2. PRODUCT-TRUTH MATERIAL THAT MAY APPEAR VISUALLY

The current product source supports the following real concepts.

## 2.1 Evidence object

A response can create evidence records containing:

```text
source
sourceId
dimension
key
signal
weight
direction
```

## 2.2 Evidence dimensions

Evidence can contribute to:

```text
Big Five
RIASEC
Work Values
Career Signals
```

## 2.3 Score metadata

The scoring pipeline can produce:

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

## 2.4 Supported validity language

```text
valid
partial
insufficient_data
```

## 2.5 Career comparison weights

Current deterministic fit weights:

```text
RIASEC fit         25
skill fit          25
work values fit    20
personality fit    15
education fit      10
goal fit            5
```

## 2.6 History data

Assessment history can expose:

```text
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

## 2.7 Trend point structure

```text
date
resultId
dimension
score
confidence
validity
```

## 2.8 Important truth constraint

At least two eligible assessments are required before longitudinal trends are meaningful.

The public design must never imply that every new user immediately has a trend history.

## 2.9 AI constraint

AI narrative/coaching is optional.

Deterministic scoring remains available.

AI is not the visual protagonist.

---

# 3. FRAME-BOARD VIEWPORTS

All flagship compositions must be explicitly designed at these reference sizes.

## Desktop board D1
`1440 × 900`

Primary art-direction reference.

## Desktop board D2
`1366 × 768`

Compression validation.

## Large desktop D3
`1728 × 1117`

Scale validation.

## Tablet T1
`820 × 1180`

Primary tablet reference.

## Tablet T2
`768 × 1024`

Compression validation.

## Mobile M1
`390 × 844`

Primary portrait reference.

## Mobile M2
`430 × 932`

Large phone validation.

## Mobile M3
`360 × 800`

Small-phone stress test.

The design is not considered complete if only D1 is authored.

---

# 4. CONSTRUCTION GRID

The grid is a construction aid, not visible architecture.

## Desktop

```text
outer margin: 48px
12 columns
gutter: 20px
content max: none inside cinematic stages
header safe height: 72px
minimum bottom safe area: 28px
```

## Tablet

```text
outer margin: 32px
8 columns
gutter: 18px
header safe height: 64px
```

## Mobile

```text
outer margin: 20px
4 columns
gutter: 12px
header safe height: 56px
bottom touch safe area: 20px + device inset
```

Do not expose the grid with decorative rules.

Do not let grid columns dictate the visible hero.

---

# 5. GLOBAL COLOR SYSTEM

```text
Carbon      #0D0F0E
Graphite    #222724
Mineral     #F3F5F2
Pewter      #AEB4AF
Cool Gray   #DDE1DD
Muted Text  #69716C
Oxblood     #642832
```

## Oxblood function

Oxblood means:

> **source, provenance, active relationship, registration.**

It is not a generic CTA color.

Use it for:

- source notch;
- active trace;
- selected provenance state;
- route-transition registration mark;
- one key action where appropriate.

Never use it as a glow.

---

# 6. GLOBAL TYPOGRAPHY

## 6.1 Display and interface

**Mona Sans Variable**

Primary uses:
- headline;
- navigation;
- route labels;
- body;
- data;
- controls.

Use variable width and tracking before resorting to heavy weight.

### Desktop flagship headline

```text
font size: 92–116px
weight: 460–560
line height: 0.88–0.94
letter spacing: -0.035em to -0.055em
width axis: slightly condensed where composition needs pressure
max width: determined by frame, not global
```

### Route title

```text
font size: 68–92px
weight: 470–550
line height: 0.92
```

### Body lead

```text
18–22px
line height: 1.35–1.5
max measure: 36–48rem depending route
```

### Interface / metadata

```text
11–13px
weight: 500–620
tracking: 0.04–0.09em
uppercase only when metadata is genuinely operational
```

Do not place metadata labels above every heading.

## 6.2 Human response

**Newsreader**

Only for direct evidence or quoted user language.

### Desktop Evidence Strip quote

```text
26–34px
line height: 1.04–1.15
weight: 400–520
```

### Mobile

```text
21–27px
line height: 1.08–1.18
```

No decorative italic-word gimmick.

---

# 7. THE EVIDENCE STRIP: MASTER OBJECT SPECIFICATION

The Evidence Strip is the protagonist.

It must be recognisable in silhouette even when small.

## 7.1 Base desktop geometry

Reference at 1440 × 900:

```text
width: 650–780px
height: 88–118px
corner radius: 0–4px maximum
one authored clipped corner permitted
background: Mineral or Carbon depending world
border: none
shadow: none
```

## 7.2 Internal structure

Left registration zone:
`18–28px`

Main quote zone:
flexible.

Right metadata zone:
`120–175px` where frame allows.

The strip may reduce metadata at smaller sizes.

## 7.3 Source notch

Oxblood.

Reference:

```text
2–4px edge
or
10–16px physical notch
```

The exact shape stays consistent throughout the site.

## 7.4 Metadata hierarchy

Only expose what the narrative has earned.

Opening:

```text
ILLUSTRATIVE RESPONSE
SOURCE RETAINED
```

Branching:

```text
SOURCE answer
DIMENSION bigFive
KEY conscientiousness
```

Trust:

```text
SOURCE ID ...
DIRECTION positive
SCORING SOURCE deterministic
```

Do not show all fields in the hero.

## 7.5 Mobile strip

```text
width: 82–90vw
height: content-dependent, roughly 112–148px
max rotation: ±7deg
```

It may become vertical in one mobile route, but should not continuously rotate for spectacle.

## 7.6 Back side

A back/inspection state may exist.

It should expose raw provenance.

Do not style it like a credit card.

No fake chip.

No glass.

---

# 8. EVIDENCE TRACE SYSTEM

Traces are connected to physical registration points on the strip.

## Line treatment

```text
stroke: Oxblood
desktop: 2–3px
mobile: 2px
opacity active: 0.9–1
opacity residue: 0.18–0.35
```

No gradient stroke.

## Endpoint

Small registration marker:

```text
6–9px dot or line notch
```

No glowing node.

## Reading label

Open text.

No rounded container.

No equal-width destinations.

---

# 9. IMAGE EDGE / CLIP LANGUAGE

Photography is not placed in rounded cards.

## Primary environments

Hard crop.

Allowed:
- clean rectangle;
- one cut edge;
- asymmetric polygon;
- offscreen bleed.

Not allowed:
- repeated 24px rounded corners;
- card shadow;
- glass border.

## Detail planes

Can use:
- very small radius 0–6px;
- irregular crop;
- partially occluded edge.

## Rule

If three images in one route have the same ratio and same edge treatment, redesign the composition.

---

# 10. DEPTH SYSTEM

Three perceptual planes are enough.

## Foreground
Evidence Strip, selected media detail, active type.

## Midground
Primary professional environment.

## Background
Secondary context, route memory, residue.

Do not create 12 arbitrary `translateZ` layers.

Depth must be visually legible when motion is paused.

---

# 11. HEADER: STATIC FRAME SPEC

## Desktop

Transparent by default.

At top:

```text
x 48
y 24
logo left
route access right
```

Height:
`48–56px` visible content.

Navigation should occupy less than 8% of viewport visual weight.

Suggested items:

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

Do not use pill containers.

## Tone changes

Dark media:
Mineral text.

Mineral field:
Carbon text.

No backdrop blur required.

---

# 12. HOME MASTER LENGTH

The homepage should feel like one continuous film, but it must not become mechanically long.

Target conceptual sequence:

```text
01 World Entry
02 Source Quiet
03 Branching
04 Career World Takeover
05 Calibration Quiet
06 Time Revisit
07 Traceback
08 Finale
```

Not every sequence needs a full 100vh pin.

The static boards below are compositional targets, not scroll-distance instructions.

---

# 13. HOME: WORLD ENTRY
## Board D1-01A, Frame 0

**Viewport:** 1440 × 900  
**Intensity:** 9/10  
**Tone:** documentary / near full-media

### Media

Primary:
`home-context-ctufaw5vbm8.jpg`

Reference geometry:

```text
x: 370px
y: -40px
w: 1110px
h: 850px
```

The image crosses the visual centre.

It is allowed to bleed beyond right edge.

Crop intent:
- preserve people/work surface;
- find negative space in upper-left/left-middle;
- do not center every person;
- keep one strong diagonal or work-surface direction.

Secondary:
`home-analysis-vjg1teprcd0.jpg`

```text
x: 105px
y: 570px
w: 315px
h: 220px
```

It sits partly under the strip and partly outside the main media mass.

No card shadow.

### Headline

Working copy:

> **Keep the source attached.**

Reference:

```text
x: 55px
y: 130px
w: 720px
font: Mona Sans
size: 108px
weight: 500
line-height: .9
```

The text overlaps the main image's negative-space boundary.

It is not confined to a left text column.

### Supporting copy

```text
x: 62px
y: 385px
w: 430px
size: 19px
```

Working copy:

> A professional response can contribute to personality, interests, values and career interpretation without losing the context it came from.

### Evidence Strip

```text
x: 450px
y: 660px
w: 735px
h: 104px
rotation: -1.5deg
z: foreground
```

Quote:

> “I clarify responsibilities before committing work.”

Metadata:

```text
ILLUSTRATIVE RESPONSE
SOURCE RETAINED
```

The strip crosses the image and the page field.

This is the first major protagonist reveal.

### CTA

One primary:

> Build profile

One quiet text link:

> See how the record moves

Place near lower-left.

Do not create two equal buttons.

---

# 14. HOME WORLD ENTRY
## D1-01B, Frame 25

### Changes from Frame 0

Primary photo:

```text
x: 305px
y: -80px
w: 1180px
h: 910px
```

Crop tightens toward the work interaction.

Headline:

```text
scale: ~0.88 of Frame 0
y: 92px
```

Supporting copy loses prominence.

Secondary analysis image:

```text
x: 90px
y: 520px
w: 350px
h: 250px
```

Evidence Strip:

```text
x: 470px
y: 600px
w: 750px
```

The strip moves less than the image.

A 12px Oxblood registration notch appears on the left edge.

Visual meaning:

> environment is moving; record is stabilising.

---

# 15. HOME WORLD ENTRY
## D1-01C, Frame 50

Background shifts toward Carbon.

Primary image is now a large cropped fragment rather than full world.

```text
x: 610px
y: -50px
w: 900px
h: 760px
```

Headline is no longer dominant.

Only the words:

> Keep the source

may remain visible as residual typography if composition supports it.

Evidence Strip:

```text
x: 350px
y: 350px
w: 760px
h: 110px
```

It owns the frame.

Secondary image partially disappears under Carbon.

One metadata line is now visible:

```text
source: answer
```

No new framework label yet.

---

# 16. HOME WORLD ENTRY
## D1-01D, Frame 75

Carbon owns ~80% of viewport.

Primary environment survives as one right-edge memory crop.

Evidence Strip:

```text
x: 310px
y: 300px
w: 800px
```

One thin Oxblood trace starts to leave the source notch.

One quiet statement appears at lower-left:

> One response can create more than one evidence record.

No box.

No divider.

---

# 17. HOME WORLD ENTRY
## D1-01E, Frame 100

The analytical void is established.

The opening image remains only as a narrow 10–18vw memory strip at one edge.

Evidence Strip sits slightly above centre.

First branch registration point is visible.

This frame must already look like the beginning of the next scene.

No hard section cut.

---

# 18. HOME WORLD ENTRY: TABLET BOARD

## T1 Frame 0

Primary image:

```text
x: 215px
y: 60px
w: 700px
h: 760px
```

Headline:

```text
x: 32px
y: 118px
w: 600px
size: 76–82px
```

Evidence Strip:

```text
x: 90px
y: 780px
w: 660px
```

Secondary analysis image is smaller and partly cropped:

```text
x: 34px
y: 535px
w: 240px
h: 180px
```

Do not simply center all layers.

---

# 19. HOME WORLD ENTRY: MOBILE
## M1-01A, Frame 0

**Viewport:** 390 × 844

Primary image:

```text
x: 58px
y: 92px
w: 390px
h: 500px
```

It bleeds right.

Crop preserves:
- two people or one person + work surface;
- a clear action.

Headline:

```text
x: 20px
y: 86px
w: 315px
size: 54–61px
line-height: .91
```

Evidence Strip:

```text
x: 26px
y: 565px
w: 340px
h: 132px
rotation: -2deg
```

Supporting copy:

```text
x: 20px
y: 715px
w: 340px
size: 16px
```

Only one CTA visible before fold or just beneath.

No secondary image in Frame 0.

---

# 20. MOBILE WORLD ENTRY
## M1-01B, Frame 25

Primary image moves upward and crop tightens.

Evidence Strip remains near the lower-middle.

Secondary analysis crop appears as a 110 × 155px vertical fragment at lower-right.

The source notch appears.

---

# 21. MOBILE WORLD ENTRY
## M1-01C, Frame 50

Carbon enters from below/behind.

Image reduces to top 40–45% of viewport.

Evidence Strip moves to:

```text
x 20
y 330
w 350
```

The strip is the dominant object.

---

# 22. MOBILE WORLD ENTRY
## M1-01D, Frame 75

Main environment is now a narrow top memory crop.

Strip sits near y 240.

Quiet statement appears below.

Oxblood branch begins vertically.

---

# 23. MOBILE WORLD ENTRY
## M1-01E, Frame 100

A vertical evidence spine owns the page.

The source strip is still visible.

The next interpretation is about to attach.

This is the mobile branching handoff.

---

# 24. HOME: SOURCE QUIET
## D1-02

**Intensity:** 3/10  
**Tone:** Carbon or Mineral depending preceding crop balance

No photography dominates.

The Evidence Strip sits at:

```text
x: 320px
y: 305px
w: 790px
```

The frame contains only:

- strip;
- source label;
- one short statement;
- one registration trace.

Working statement:

> **One response can create more than one evidence record.**

Place:

```text
x 64
y 660
w 620
size 46–58px
```

Do not make this another hero.

This scene is intentional recovery.

---

# 25. HOME: BRANCHING
## D1-03A, Frame 0

**Intensity:** 6/10 rising to 8/10  
**Tone:** Carbon

Evidence Strip:

```text
x 340
y 335
w 760
```

Only source metadata visible.

Background contains no four-corner destinations.

One small image memory may sit at far right edge at 12% opacity.

---

# 26. BRANCHING
## D1-03B, Frame 25

First branch:

```text
attachment point: strip x 36%
path endpoint: x 160, y 145
```

Open reading:

```text
BIG FIVE
conscientiousness
positive contribution
```

Visual hierarchy:

- strip: 100%;
- first reading: 78%;
- all else: minimal.

The path should curve or kink based on composition, not mirror later branches.

---

# 27. BRANCHING
## D1-03C, Frame 50

Second branch:

```text
attachment point: strip x 63%
endpoint: x 1120, y 180
```

RIASEC reading appears.

First Big Five reading becomes residue at ~35–45% visual ownership.

Do not gray it so much that it disappears.

The strip remains stable.

---

# 28. BRANCHING
## D1-03D, Frame 75

Two more relationships appear, but not as equal nodes.

### Work Values
Path passes through a 300 × 210px crop of:

`career-deep-inquiry-gnasyqdkdbi.jpg`

Position:

```text
x 70
y 590
```

Reading may sit partially over image.

### Career Signal
A longer trace extends toward:

```text
x 1080
y 640
```

A narrow context crop appears behind it.

The scene becomes asymmetrical and media-rich.

---

# 29. BRANCHING
## D1-03E, Frame 100

All branches visible.

Ownership hierarchy:

```text
Evidence Strip                 100%
active Career/Values relation   78%
Big Five residue                40%
RIASEC residue                  44%
secondary media                 58%
```

Working small line:

> same source

This is the final branching proof state.

It must not resemble an infographic quadrant.

---

# 30. BRANCHING MOBILE
## M1-03A to M1-03E

The mobile version uses one vertical spine.

### Frame 0
Evidence Strip near top.

### Frame 25
Big Five trace peels left.

### Frame 50
RIASEC trace peels right.

### Frame 75
Work Values trace crosses a portrait media crop.

### Frame 100
Career Signal appears near bottom while prior branches remain.

Reference path:

```text
x centre ~195px
vertical travel ~900–1200px across scene
```

Each active branch gets 60–75% of available width.

Do not put four blocks one under another with equal indentation.

---

# 31. HOME: CAREER WORLD TAKEOVER
## D1-04A, Frame 0

**Intensity:** 9/10  
**Tone:** transition from Carbon into documentary media

Active Career Signal branch remains visible.

Primary image begins opening:

`career-complex-machine-shbyg6mb3o.jpg`

```text
x 620
y 0
w 850
h 900
```

Evidence Strip:

```text
x 225
y 360
w 700
```

The strip partly overlaps media.

---

# 32. CAREER TAKEOVER
## D1-04B, Frame 25

Image grows to own 70% viewport.

Evidence Strip stays around central-left.

Small line:

> same source / different working conditions

No route heading.

---

# 33. CAREER TAKEOVER
## D1-04C, Frame 50

Environment switches to:

`career-deep-inquiry-gnasyqdkdbi.jpg`

Use masked replacement / crop takeover conceptually.

Static board:

```text
primary new image x 210 y -40 w 1160 h 860
old environment survives as 180px edge residue
```

Evidence Strip stays at:

```text
x 525 y 600
```

It changes contrast mode if needed.

---

# 34. CAREER TAKEOVER
## D1-04D, Frame 75

Shared decision environment:

`career-coordination-qnfckqwyu1k.jpg`

Foreground human/work-surface region should occlude 10–20% of the Evidence Strip.

This occlusion is deliberate.

The protagonist remains identifiable.

This is a critical White Desert/Palomino-style composition move.

---

# 35. CAREER TAKEOVER
## D1-04E, Frame 100

World settles.

One compact action:

> Explore career conditions

One editorial disclosure:

> Work-condition scenes are editorial lenses. Career matching uses the scoring layers shown next.

This disclosure should be readable but quiet.

---

# 36. HOME: CALIBRATION QUIET
## D1-05

**Intensity:** 4/10  
**Tone:** Mineral  
**Primary material:** real deterministic career-fit weights

Headline:

> **The comparison is weighted, not guessed.**

Place:

```text
x 58
y 105
w 800
size 72–82px
```

Evidence Strip becomes a thin horizontal baseline at y 510.

Weight labels are placed along a visual calibration axis.

Not boxes.

Suggested perceptual widths:

```text
RIASEC          25  ~250px visual span
Skills          25  ~250px
Work Values     20  ~200px
Personality     15  ~150px
Education       10  ~100px
Goals            5  ~60px
```

The visual scale should make the weighting relation obvious.

Do not create six colored bars.

Use:
- type scale;
- spacing;
- baseline length;
- registration notches.

Small note:

> deterministic comparison layers

AI not mentioned in the main visual.

---

# 37. CALIBRATION MOBILE

Headline size:
`46–52px`.

The baseline rotates into a vertical scale.

Each layer label uses a different **distance/span**, not a rectangular progress bar.

The user can understand 25 > 20 > 15 > 10 > 5.

---

# 38. HOME: TIME REVISIT
## D1-06A, Frame 0

**Intensity:** 7/10  
**Tone:** documentary temporal archive

Image:
`progress-studio-rjziomx-slq.jpg`

Crop A:

```text
x 0
y 70
w 900
h 760
```

Earlier Evidence Strip:

```text
x 135
y 555
w 670
```

Date marker:

```text
ASSESSMENT 01
```

Use an explicitly illustrative date if needed.

Do not fabricate a real user's record.

---

# 39. TIME REVISIT
## D1-06B, Frame 25

Crop B of the **same source** enters from the right.

```text
x 690
y -20
w 820
h 760
```

Second Evidence Strip appears at:

```text
x 720
y 185
w 650
```

Earlier remains visible.

The visual point is retained history.

---

# 40. TIME REVISIT
## D1-06C, Frame 50

Two records overlap.

Image crops overlap.

A date line/registration mark crosses the overlap.

Revised reading begins at the **intersection**.

Not in a third panel.

---

# 41. TIME REVISIT
## D1-06D, Frame 75

One or two trend traces connect fields between the dated strips.

Use only supported dimensions:

- Big Five;
- RIASEC;
- Work Value.

Label marketing examples as illustrative.

No fake “+23% personality improvement.”

---

# 42. TIME REVISIT
## D1-06E, Frame 100

Earlier and later remain inspectable.

Working statement:

> **A later assessment adds a record. It does not erase the first.**

CTA:

> See how progress works

The scene should feel like a film dissolve made of records, not a timeline component.

---

# 43. TIME MOBILE

Two Evidence Strips stack in depth.

Crop A fills upper 60% of stage.

Crop B masks over it from lower-right.

A date marker becomes the visible boundary.

The revised reading appears on the boundary.

No three stacked blocks.

---

# 44. HOME: TRACEBACK
## D1-07A, Frame 0

**Intensity:** 6/10  
**Tone:** Carbon / inspection

Media:
`trust-inspection-ney2bbwmfnq.jpg`

```text
x 0
y 0
w 820
h 900
```

Evidence Strip enlarged:

```text
x 620
y 245
w 760
h 135
```

Secondary diagnostic:
`trust-diagnostic-aq7oa5ikihs.jpg`

```text
x 1000
y 520
w 330
h 230
```

No card containers.

---

# 45. TRACEBACK
## D1-07B, Frame 25

One visible reading is selected.

Small cursor state can say:

> TRACE

Only inside strip/inspection zone.

Raw provenance begins appearing beneath the strip.

---

# 46. TRACEBACK
## D1-07C, Frame 50

The strip appears “opened.”

Readable provenance:

```text
SOURCE
answer

SOURCE ID
initiative-pattern-intermediate

DIMENSION
bigFive

KEY
conscientiousness
```

These are direct product-structure concepts.

Do not expose fake user identifiers.

---

# 47. TRACEBACK
## D1-07D, Frame 75

Additional fields:

```text
DIRECTION
positive

SCORING SOURCE
deterministic
```

One path traces backward toward a small source/question fragment.

The media remains present so the scene stays human.

---

# 48. TRACEBACK
## D1-07E, Frame 100

The provenance closes back into the strip.

Working line:

> **Trace a reading back to what created it.**

CTA:

> See trust and methodology

---

# 49. HOME: FINALE
## D1-08

**Intensity:** 8/10  
**Tone:** documentary return

Primary:
`home-context-ctufaw5vbm8.jpg`

Use a materially different crop.

Reference:

```text
x -120
y 40
w 1180
h 860
```

The Evidence Strip:

```text
x 560
y 540
w 760
h 118
```

It now contains visible accumulated marks:

- source notch;
- 3–4 evidence notches;
- one comparison mark;
- one date mark;
- provenance trace.

No dense metadata.

Working finale:

> **The source stays. The record gets better.**

Actions:

Primary:
> Build profile

Quiet:
> Sign in

Footer begins after a real visual pause.

No giant logo finale.

No sticky footer reveal.

---

# 50. HOME D1 STORYBOARD SUMMARY

| Scene | Visual owner | Protagonist state | Media ownership | Intensity |
|---|---|---|---:|---:|
| World Entry | professional environment | raw source | 85% | 9 |
| Source Quiet | Evidence Strip | attached | 10% | 3 |
| Branching | strip + traces | branched | 25% | 8 |
| Career Takeover | environments | compared/contextual | 85% | 9 |
| Calibration | real weights | comparison baseline | 5% | 4 |
| Time Revisit | two records | dated/revisited | 70% | 7 |
| Traceback | strip + provenance | inspectable | 55% | 6 |
| Finale | returned environment | accumulated | 80% | 8 |

This table is the homepage intensity contract.

---

# 51. CAREER ROUTE
# Operating mode: Workworld Atlas

Career should begin **inside** a work environment.

No preamble hero.

No selector row.

No “Career Intelligence” giant title floating over empty background.

---

# 52. CAREER OPENING
## D1-C01, Frame 0

Primary:
`career-complex-machine-shbyg6mb3o.jpg`

Full stage:

```text
x 0
y 0
w 1440
h 900
```

Crop keeps person-machine relation.

Evidence Strip:

```text
x 100
y 625
w 710
```

Small route title:

```text
Career Intelligence
x 48
y 110
size 22–30px
```

Do not make it the visual owner.

Environment name:

> Complex problems

Place large but lower than hero-H1 scale.

One compact edge index:

```text
01 Complex problems
02 Open questions
03 Shared decisions
04 Visible output
05 Autonomy
```

No pills.

No filled tab buttons.

---

# 53. CAREER OPENING
## Frame 25

Support image appears:

`career-control-khikhsrqgt4.jpg`

```text
x 960
y 100
w 360
h 255
```

Primary image crop tightens.

Evidence Strip stays.

One relation line appears:

> clarity / ownership / tradeoff

Not three equal columns.

---

# 54. CAREER OPENING
## Frame 50

Environment travels to Open Questions.

Primary:
`career-deep-inquiry-gnasyqdkdbi.jpg`

Support:
`evidence-lab-detail-ontjllb3kri.jpg`

Evidence Strip remains in roughly the same screen region.

The environment changes around it.

This is the primary Career interaction principle.

---

# 55. CAREER OPENING
## Frame 75

Shared Decisions world.

Primary:
`career-coordination-qnfckqwyu1k.jpg`

Support:
`career-team-device-ivrtfrzbzrg.jpg`

The strip partially occludes/gets occluded by the central work surface.

No duplicated DOM/WebGL world visually.

---

# 56. CAREER OPENING
## Frame 100

Visible Output or Autonomy world settles.

Only one primary environment and one support detail are visually dominant.

The edge index indicates position.

CTA to factual matching logic begins.

---

# 57. CAREER RELATIONSHIP READINGS

Do not use:

```text
Alignment | Tension | Develop
```

as three columns.

If those concepts are retained, place them as three **unequal annotations** around active media.

Example at 1440:

```text
Alignment
x 90 y 240 w 300

Tension
x 980 y 455 w 360

Develop
x 460 y 735 w 420
```

They must visually relate to the selected environment.

One can overlap image.

One can sit in negative space.

One can partially leave frame.

No equal widths.

---

# 58. CAREER FACTUAL CALIBRATION

After media exploration, drop into Mineral.

Headline:

> **Career fit uses six deterministic layers.**

Use the same 25/25/20/15/10/5 system from Home, but with more detail.

Possible extra line:

> Signal fit contributes to confidence.

Use only if wording is verified against the final product behavior.

No fake recommendation is shown without user data.

---

# 59. CAREER ROLE DIRECTORY

Use all 17 supported roles.

Design as a dense editorial atlas.

At desktop:

```text
left: role directory
right: one hovered profile fragment
```

But avoid classic split-shell feeling by allowing the selected role name to scale/cross the field.

No cards.

No percentages.

Example role information may use real fields from `careers.json`:

```text
skills
subjects
interests
profile tendencies
```

Label example content as curated profile data, not a live recommendation.

---

# 60. CAREER MOBILE

## Primary view

One work environment fills 60–70% of viewport.

Evidence Strip sits in lower third.

A 10–18% sliver of next environment is visible.

Index is bottom/edge based.

Swipe or vertical progress changes environment.

No five-image vertical stack.

No WebGL required.

Support image appears as one small detail crop.

---

# 61. HOW IT WORKS
# Operating mode: Evidence Engine

This route should be the clearest expression of actual product logic.

No numbered generic steps.

---

# 62. HOW OPENING
## D1-H01

Tone:
Mineral → Carbon analytical transition.

Use an actual prompt from the current question bank.

Suggested:

> **“Describe how you take initiative when a project has unclear ownership.”**

Display as a large question object, not a route hero.

Below/over it:

Illustrative response Evidence Strip.

Small functional label:

```text
QUESTION SOURCE
adaptive bank
```

This is legitimate metadata.

---

# 63. HOW: SOURCE STATE
## Frame 0

Question occupies left/top 45–55%.

Evidence Strip sits lower-right.

One professional detail crop:
`how-process-jhtfogpvg8.jpg`

appears behind.

The strip is attached to the question.

---

# 64. HOW: EVIDENCE STATE
## Frame 25

Strip separates into evidence traces.

Use actual field names:

```text
source
sourceId
dimension
key
weight
direction
```

Do not show JS object syntax unless intentionally technical.

No boxes.

---

# 65. HOW: SCORE STATE
## Frame 50

Evidence traces converge into four primary score families:

```text
Big Five
RIASEC
Work Values
Career Signals
```

Unlike Home, this route can be more analytical.

Still avoid four equal cards.

Place them at unequal depth/scale.

Show evidence counts or validity only if using clearly illustrative values.

---

# 66. HOW: VALIDITY STATE
## Frame 65

Introduce:

```text
valid
partial
insufficient data
```

as possible result states.

Visualize “missing evidence” as incomplete attachment paths.

This is a strong product-specific design opportunity.

Do not use red/yellow/green traffic-light UI.

---

# 67. HOW: COMPARISON STATE
## Frame 80

The record enters the career-weight baseline.

Use:

```text
25 / 25 / 20 / 15 / 10 / 5
```

The record remains visible.

The viewer sees that career comparison occurs **after** evidence/scoring.

---

# 68. HOW: STORED RECORD STATE
## Frame 100

The result compresses back into one dated Evidence Strip.

Small line:

> retained for later comparison

No unsupported promise about permanent storage beyond current product semantics.

CTA:
> Build profile

---

# 69. HOW MOBILE

Mobile route uses a vertical Evidence Strip spine.

Stages are not cards.

The source strip travels:

```text
question
↓
evidence traces
↓
score families
↓
validity
↓
career comparison
↓
dated record
```

Only one major analytical state owns each viewport.

Media enters once or twice, not continuously.

---

# 70. PROGRESS ROUTE
# Operating mode: Longitudinal Film

The route opens immediately with retained history.

No generic H1 left and image right.

---

# 71. PROGRESS OPENING
## D1-P01

Use `progress-studio-rjziomx-slq.jpg` full-bleed/cross-centre.

Two Evidence Strips:

Earlier:
```text
x 115 y 560 w 620
```

Later:
```text
x 740 y 180 w 610
```

Title:

> **A later record does not replace the first.**

Place title across image negative space.

Route label “Progress” remains small.

---

# 72. PROGRESS INTERSECTION

At mid-state:

- two crops overlap;
- two strips overlap;
- one trend line connects comparable dimension;
- one revised reading appears at intersection.

No third panel.

No “Earlier / Later / Revised” three-column labels.

Those concepts can exist as metadata attached to the strips.

---

# 73. PROGRESS EMPTY / INSUFFICIENT HISTORY STATE

This state must be designed.

If a user has fewer than two eligible assessments:

Large quiet composition:

One Evidence Strip.

A second blank registration position.

Copy:

> **Not enough history yet.**

Supporting:

> Complete another assessment with valid or partial scores to see longitudinal trends.

This language should align with actual product wording.

Do not use an empty chart skeleton.

---

# 74. PROGRESS MOBILE

Two strips stack in depth.

The later strip can slide over earlier.

Same-source image crop changes behind them.

Trend information appears as one line at a time.

No horizontally compressed chart.

---

# 75. METHODOLOGY ROUTE
# Operating mode: Calibration Room

This is the most restrained route.

No photography required in every state.

---

# 76. METHODOLOGY OPENING

Mineral background.

One Evidence Strip centred at about:

```text
x 420 y 210 w 760
```

Title:

> **How a response becomes a scored record.**

A slim path/index sits to left but no divider line.

---

# 77. METHODOLOGY FRAME FAMILY

As user reads, the strip expands into:

- evidence schema;
- Big Five;
- RIASEC;
- Work Values;
- Career Signals;
- validity;
- career-fit weights.

Each layer appears around one persistent source.

No boxed diagram card.

No three-column article shell.

---

# 78. METHODOLOGY TYPOGRAPHIC SCALE

Route title:
`64–76px`

Body:
`18px`

Technical labels:
`12px`

Numbers:
`28–42px`

The route should feel precise and calm.

---

# 79. TRUST ROUTE
# Operating mode: Traceback

Trust begins with a reading and asks the user to inspect where it came from.

---

# 80. TRUST OPENING
## D1-T01

Primary:
`trust-inspection-ney2bbwmfnq.jpg`

Full-height left/centre media, but not a 50/50 split.

Diagnostic detail:
`trust-diagnostic-aq7oa5ikihs.jpg`

small foreground crop.

Evidence Strip sits across both.

Working title:

> **Follow the reading back to its source.**

---

# 81. TRUST PROVENANCE TRACE

Do not use tabs.

Use one physical trace from the Evidence Strip.

Possible public states:

```text
Supplied
Inferred
Calculated
Compared
Assisted
Controlled
```

Exact naming should be verified against final product/privacy copy.

Buttons may sit on trace nodes.

Nodes must not be equal-width pills.

---

# 82. TRUST INSPECTION FRAME

At active state, show:

```text
source
sourceId
dimension
key
direction
scoring source
validity
```

AI state is clearly separate.

No cyber aesthetic.

No glowing matrix.

No glass.

---

# 83. TRUST MOBILE

Tap a provenance point.

Evidence Strip expands downward.

Raw fields appear beneath the human-language reading.

The user can close and choose another state.

No hover dependency.

---

# 84. PRIVACY ROUTE
# Operating mode: Document

Do not overdesign.

Desktop:

```text
max reading width: 760px
contents/index width: 220px
outer left: 80–110px
```

No vertical divider line.

No decorative overline.

Route title can be `64px`, not 100+.

Anchor motion is short and functional.

---

# 85. LOGIN
# Operating mode: Reopen Record

Carbon.

No photography needed in first viewport.

Form occupies a clear usable region, not a card.

Evidence Strip sits far behind/above as a single ambient protagonist.

Reference desktop:

```text
form x 120 y 190 w 420
strip x 780 y 280 w 560
```

The strip is low-contrast but legible enough to understand.

No floating fragments.

No cursor effect.

No particles.

---

# 86. SIGNUP
# Operating mode: Create First Record

Primary media:
`signup-first-record-vogj3ghonk0.jpg`

This image crosses the composition.

Desktop:

```text
x 520
y 0
w 1000
h 900
```

Form:

```text
x 80
y 130
w 470
```

The image is **not** “the right half.”

It starts near 36% viewport width and crosses behind the form's broader environment.

A blank Evidence Strip:

```text
x 630
y 650
w 620
```

Metadata:

```text
NEW RECORD
```

Do not imply personality scores exist yet.

---

# 87. SIGNUP FIELD PROGRESSION

As form fields receive focus, the strip may gain only structural marks:

```text
identity
account
ready
```

Not:
- Big Five;
- scores;
- “profile completeness.”

The assessment has not happened yet.

---

# 88. SIGNUP MOBILE

Form begins inside first viewport.

The photo appears as:
- top-right environmental crop;
- or narrow mid-form interlude after identity fields.

Never place a full 600px hero image above form.

Blank Evidence Strip appears after the first essential inputs.

---

# 89. ROUTE TRANSITION STATIC BOARDS

The route transition should use the protagonist.

It should not be a generic wipe.

---

# 90. TRANSITION FRAME 0

Current route settled.

Evidence Strip visible if route contains it.

Navigation event begins.

---

# 91. TRANSITION FRAME 25

Current environment compresses by 1–2%.

Strip moves toward centre.

Background darkens only if destination requires it.

No white flash.

---

# 92. TRANSITION FRAME 50

Evidence Strip expands or crosses enough of the viewport to become the handoff object.

Destination media is already loaded behind.

This is the maximum cover state.

The strip does not need to cover every pixel if another subject-derived mask does.

---

# 93. TRANSITION FRAME 75

Destination world becomes visible.

Strip resolves into destination role:

- Career: context strip;
- How: source strip;
- Progress: dated strip;
- Trust: inspectable strip.

---

# 94. TRANSITION FRAME 100

Destination settled.

Focus at new main content.

Total transition should feel responsive.

Avoid long theatrical waits.

---

# 95. INDEX MENU STATIC SPEC

The Index is a record catalog.

Full-screen Carbon or Mineral depending current world.

Left:
route names.

Right/centre:
one preview state at a time.

Evidence Strip moves to selected route line.

No pills.

No card grid.

No generic curved-menu effect unless the curve specifically belongs to record indexing.

---

# 96. INDEX DESKTOP

```text
route list x 70 y 130
preview x 720 y 100 w 640 h 620
strip x 470 y active-route-y
```

Current route has an Oxblood registration notch.

Hover can change preview.

Keyboard state must be equally clear.

---

# 97. FOOTER

Normal document flow.

Quiet.

No reveal-from-behind mechanic.

No giant Valtum/Personality wordmark.

Use:
- route links;
- legal;
- contact/product action;
- small vocabulary/provenance line if useful.

Target visual intensity:
`2/10`.

---

# 98. TABLET SYSTEM

Tablet is not desktop with smaller numbers.

Key rules:

- one primary image + one support image maximum;
- Evidence Strip remains broad;
- branching distances shorten;
- Career environment selection becomes 2D;
- no heavy WebGL dependency;
- route titles reduce earlier;
- avoid simultaneous 3-layer type/media overlap when it harms touch/readability.

---

# 99. MOBILE SYSTEM

Mobile art direction is driven by the Evidence Strip.

Core compositional tools:

- vertical spine;
- edge bleed;
- one environment at a time;
- stacked record depth;
- tap-to-trace;
- crop replacement;
- short sticky intervals.

Avoid:
- desktop SVG hidden and text stacked;
- five-image stacks;
- miniaturised desktop 3D;
- overflow-driven cinematic layouts.

---

# 100. REDUCED-MOTION STATIC WORLD

Reduced motion should directly use the same high-fidelity boards.

For every flagship scene:

- choose Frame 0 or Frame 100 as primary;
- use short opacity/crop transitions if permitted;
- no long scroll pins;
- no automatic continuous parallax;
- no custom cursor;
- all evidence/provenance remains readable.

The visual quality should remain at least 80–90% of the full-motion mode.

---

# 101. NO-WEBGL STATIC WORLD

The selected thesis does not require WebGL for identity.

Career fallback uses:

- absolute DOM media;
- GSAP or CSS transform if motion permitted;
- one support plane;
- Evidence Strip;
- same crops.

WebGL is only allowed if it materially improves camera/depth continuity.

---

# 102. FIGMA / STATIC-BOARD BUILD ORDER

The high-fidelity visual work should be created in this order.

## Board group A
Global:
- color;
- type;
- Evidence Strip;
- trace;
- image clips;
- header;
- Index.

## Board group B
Home desktop:
- 8 narrative scenes;
- 0/25/50/75/100 for 5 signature scenes.

## Board group C
Home mobile:
- opening;
- branching;
- Career takeover;
- time;
- Trust;
- finale.

## Board group D
Career:
- 5 workworld states;
- calibration;
- role atlas.

## Board group E
How:
- source;
- evidence;
- scoring;
- validity;
- comparison;
- stored record.

## Board group F
Progress:
- earlier;
- overlap;
- revised;
- insufficient history.

## Board group G
Methodology/Trust/Privacy/Auth.

No implementation until these boards pass.

---

# 103. Figma component strategy

Static design components may include:

```text
EvidenceStrip
EvidenceStrip/Raw
EvidenceStrip/Branched
EvidenceStrip/Dated
EvidenceStrip/Inspect

Trace/Active
Trace/Residue

Header/Dark
Header/Light

Metadata/Functional

Environment/Primary
Environment/Support
```

Do not create generic:

```text
Card
FeatureCard
BentoItem
StatCard
HeroSplit
```

as marketing primitives.

The component library should encode the thesis.

---

# 104. STATIC BOARD ANNOTATION TEMPLATE

Every frame must be annotated with:

```text
FRAME ID
VIEWPORT
INTENSITY
DOMINANT MASS
PROTAGONIST STATE
PRIMARY IMAGE
CROP INTENT
SECONDARY IMAGE
HEADLINE
BODY
DATA
Z-ORDER
WHAT ENTERED
WHAT SURVIVED
WHAT LEAVES NEXT
MOBILE SUBSTITUTE
REDUCED-MOTION STATE
```

This prevents ambiguity before implementation.

---

# 105. VISUAL REVIEW GATE 1
# Three-second test

Show only the first Home board for three seconds.

Reviewer must be able to answer:

- this is a professional/human world;
- one record-like object is important;
- the image is not a right-side illustration;
- this is not a SaaS template.

If not, reject.

---

# 106. VISUAL REVIEW GATE 2
# Protagonist recognition

Show five random frames without page labels.

Reviewer should identify the same Evidence Strip in all five.

If not, protagonist identity is too weak.

---

# 107. VISUAL REVIEW GATE 3
# Pause test

Inspect every 25/50/75 frame.

No frame may contain:

- accidental overlap;
- empty dead centre;
- unreadable half-opacity labels;
- images at awkward intermediate sizes;
- four equally weighted destinations;
- floating UI debris.

---

# 108. VISUAL REVIEW GATE 4
# White Desert test

Ask:

> Does the professional environment own the visual world before the product explains itself?

If typography/UI owns every scene, fail.

---

# 109. VISUAL REVIEW GATE 5
# Lenis test

Ask:

> If this eventually moves through scroll, is the central product proposition being demonstrated by the change itself?

If scrolling merely reveals content, fail.

---

# 110. VISUAL REVIEW GATE 6
# Oryzo test

Ask:

> Is one protagonist still at the centre after the site changes visual representation?

If not, fail.

---

# 111. VISUAL REVIEW GATE 7
# Palomino test

Ask:

> Is the photograph creating the composition, or merely occupying a box?

If it is a box, fail.

---

# 112. VISUAL REVIEW GATE 8
# Moto test

Ask:

> Does the page know when to become quiet?

If every frame is cinematic, fail.

---

# 113. VISUAL REVIEW GATE 9
# Product truth

Every visible number/data label must be classified:

```text
real current product structure
illustrative but clearly labelled
editorial interpretation
```

No invented score presented as live truth.

---

# 114. VISUAL REVIEW GATE 10
# Mobile authorship

Mobile must not be judged by:

> nothing overflows.

It must preserve:

- protagonist;
- world;
- causal transformation;
- route identity;
- touch-native interaction.

---

# 115. COPY REVIEW GATE

Reject copy containing:

- generic AI language;
- “unlock potential”;
- “perfect career”;
- unsupported scientific certainty;
- therapy/wellness framing;
- em dash as pause;
- “This isn't X, it's Y” formula;
- abstract hype.

Prefer:
- retain;
- source;
- record;
- compare;
- trace;
- revisit;
- evidence;
- context.

---

# 116. MEDIA REVIEW GATE

The current 20-image pack is enough for the first high-fidelity design pass.

Do not search for more images merely to make the page feel rich.

First prove that the existing images can be edited into:

- world;
- depth;
- transition;
- detail;
- revisit;
- finale.

Only request another asset if a storyboard has a specific unsolved visual role.

---

# 117. TECHNOLOGY ASSIGNMENT GATE

After static approval, every future technology request must use this format:

```text
SCENE
VISUAL PROBLEM
INTERACTION VERB
WHY DOM/CSS IS INSUFFICIENT
TECHNOLOGY
FALLBACK
MOBILE SUBSTITUTE
```

Example:

```text
Career Atlas
Need persistent camera depth between large photographic environments
Compare
DOM version works but cannot sustain desired occlusion/camera parallax
Three/R3F
DOM/GSAP atlas
DOM portrait environment selector
```

No library-first design.

---

# 118. GLOBAL HARD-RULE AUDIT

Before implementation, static boards must contain **zero**:

- gradients;
- glow;
- glassmorphism;
- purple/indigo/cyan AI visual language;
- cream/ivory identity;
- generic orange;
- feature-card grids;
- bento marketing;
- KPI strips;
- numbered process cards;
- testimonial cards;
- logo walls;
- standard split heroes;
- 50/50 auth;
- generic final CTA bands;
- giant wordmark finale;
- global custom cursor;
- visible section divider lines;
- repeated overline/kicker labels;
- sticky footer reveal.

---

# 119. DESKTOP ACCEPTANCE CRITERIA

At 1440 × 900:

## Home
- image owns first impression;
- Evidence Strip is immediately identifiable;
- no split-hero read;
- branching is asymmetric;
- Career takeover changes the world;
- calibration uses real weights without cards;
- time is overlap, not columns;
- Trust is provenance inspection;
- finale returns same protagonist.

## Career
- media is selector;
- no five-control bar;
- one primary + one support environment;
- factual comparison follows editorial exploration.

## How
- one source is followed through actual product pipeline;
- no numbered process shell.

## Progress
- retained dated records are visible together.

## Trust
- raw provenance can be traced.

## Signup
- environmental image crosses composition;
- form remains functionally dominant.

---

# 120. TABLET ACCEPTANCE CRITERIA

At 820 × 1180:

- Home opening remains layered;
- Evidence Strip never exceeds viewport;
- branching stays visual;
- Career does not become five stacked images;
- How remains one pipeline;
- Progress retains overlap;
- Trust remains inspectable;
- signup is not 50/50.

---

# 121. MOBILE ACCEPTANCE CRITERIA

At 390 × 844:

- first viewport has one authored environmental composition;
- Evidence Strip visible;
- no horizontal overflow;
- Home branching uses vertical spine;
- Career shows one environment at a time;
- Progress uses record depth;
- Trust works by tap;
- forms are first-class;
- no essential hover;
- no desktop mechanic simply disappears without replacement.

---

# 122. FINAL RESEARCH VERDICT

The visual target is no longer:

> a premium marketing site with good motion.

It is:

> **a professional documentary world in which one retained evidence record visibly accumulates interpretation, comparison, history and provenance.**

White Desert gives the governing lesson:

> world first, operational truth later, one coherent journey.

Lenis gives the temporal lesson:

> the user's input should move one connected world, not trigger disconnected section animations.

Lando gives the route lesson:

> distinct modes can belong to one identity.

Oryzo gives the concept lesson:

> one protagonist and a believable world matter more than abstract “Awwwards-like” polish.

Palomino and EverWonder give the media lesson:

> edit photography as composition.

Moto gives the restraint lesson:

> quietness is part of premium pacing.

The Watch gives the persistence lesson:

> one recognisable object can survive multiple scales and representations.

That synthesis is the standard for every frame in this document.

---

# 123. NEXT GATE

The next deliverable after this specification is **not code**.

It should be one of:

## Preferred
Actual high-fidelity visual boards in Figma using the exact media pack and these frame coordinates.

or, if Figma production is delegated:

## Required before code
A reviewed static-frame pack exported from the design tool at:

```text
1440 × 900
820 × 1180
390 × 844
```

covering:

- Home Opening
- Branching
- Career Takeover
- Calibration
- Time Revisit
- Traceback
- Finale
- Career
- How
- Progress
- Trust
- Login
- Signup

Only after those images/frames are visually approved should the full implementation specification be written.

---

# 124. SOURCE INDEX

## Primary references
https://white-desert.com/
https://lenis.dev/
https://landonorris.com/
https://oryzo.ai/
https://www.everwonder.studio/
https://palominoprod.com/en
https://www.moto-card.com/
https://thewatch.60fps.fr/

## Supporting production research
https://www.itsoffbrand.com/our-work/lando-norris
https://blog.lusion.co/oryzo-bts-part-1-7-concept-and-creative-direction
https://blog.lusion.co/oryzo-bts-part-2-7-3d-design-and-motion-graphics
https://blog.lusion.co/oryzo-bts-part-3-7-website-ux-ui-and-illustrations
https://docs.lottiefiles.com/en/creator

## Product source
`source_of_truth_audit_report.md`
`backend/models/AssessmentSession.js`
`backend/models/AssessmentResult.js`
`backend/data/adaptiveQuestionBank.js`
`backend/data/careers.json`
`backend/services/scoring/evidenceBuilder.service.js`
`backend/services/scoring/questionMetadata.adapter.js`
`backend/services/scoring/assessmentScoringOrchestrator.service.js`
`backend/services/scoring/careerFitTypes.js`
`backend/services/career/careerMatching.service.js`
`backend/services/assessmentResultView.service.js`
`backend/services/analytics/assessmentHistory.service.js`
`backend/services/analytics/traitTrends.service.js`

---

# 125. FINAL DESIGN-DIRECTOR RULE

# **No one is allowed to ask engineering to “make this premium.”**

Premium quality must already exist in the static frames.

Engineering's job will be to preserve the approved art direction while making it move, respond, load, degrade, and remain accessible.

If the static boards still look like:

> heading + paragraph + image + information modules

the design phase is not complete.

If the static boards look like:

> **one professional world and one living record repeatedly changing relationship while remaining identifiable**

then implementation may begin.
