# PERSONALITY ASSESSOR — MOTION & INTERACTION ARCHITECTURE
## The Living Record
### Final pre-implementation motion specification

**Date:** 22 August 2026  
**Project:** Personality Assessor / Valtum Studio  
**Status:** Design authority for motion. Must be read together with the High-Fidelity Static Frame Specification.

# 1. Motion thesis

Motion exists to make one product truth perceptible:

> **A professional response keeps its source while accumulating evidence, comparison, history, and provenance.**

The site therefore uses motion to express eight product-native verbs:

1. **ATTACH** — source becomes a retained record.
2. **BRANCH** — one response produces multiple evidence contributions.
3. **ACCUMULATE** — evidence contributes to deterministic score families.
4. **COMPARE** — the retained record is tested against career-fit layers and environments.
5. **QUALIFY** — validity/confidence changes how resolved a conclusion may appear.
6. **REVISIT** — later assessments coexist with earlier records.
7. **TRACE** — a reading can be followed backward to its source.
8. **RETAIN** — the original record survives every transformation.

No scene gets an advanced interaction unless it expresses one of these verbs or improves navigation/usability.

# 2. Temporal architecture

Lenis is the single public-site scroll authority.

```text
wheel / trackpad / touch
          ↓
        Lenis
          ↓
scroll position / progress / direction / velocity / settling
          ↓
  GSAP ScrollTrigger coordinator
          ↓
DOM media / SVG / Evidence Strip / optional R3F camera
```

Rules:
- one scroll authority;
- no nested virtual-scroll library;
- no Locomotive alongside Lenis;
- no frame-by-frame React state for scroll values;
- GSAP ticker synchronizes Lenis and ScrollTrigger;
- pointer state is separate from scroll state;
- route transition pauses or kills route-local scene ownership cleanly.

# 3. Lenis feel

Desktop:
- immediate response, no dead input latency;
- moderate interpolation;
- no long float after wheel stop;
- fast intent must remain fast;
- scrolling should feel denser than a default webpage, not syrupy.

Touch:
- preserve native-feeling directness;
- avoid heavy smoothing;
- do not make vertical swipes lag behind the finger.

Reduced motion:
- Lenis interpolation disabled;
- native scroll position remains the source of truth.

# 4. Motion ownership rules

## GSAP / ScrollTrigger
Owns:
- long scroll choreography;
- media crop/scale/translation;
- Evidence Strip handoffs;
- branching traces;
- time overlap;
- route-local camera-like transitions;
- pinned scenes only where story demands them.

## Motion / Framer Motion
Owns:
- menu presence;
- short local UI states;
- form state transitions;
- route overlay presence where React lifecycle matters.

## SVG
Owns:
- evidence branch traces;
- provenance traces;
- mobile evidence spine;
- registration marks.

## Three / R3F
Conditional owner:
- Career desktop fine-pointer spatial atlas only if it materially improves depth/camera continuity.

## Rive / dotLottie
Optional specialist:
- compact Evidence Strip state marker only if a real state machine is clearer than DOM/SVG.

## Anime.js
Optional specialist:
- SVG morph/path interpolation where GSAP/SVG alone becomes unnecessarily complex.

# 5. One property, one owner

Never:
- animate the same transform on one element from CSS transition and GSAP;
- animate the same transform from Motion and GSAP;
- rebuild a Three scene on every selection;
- run an independent RAF for a state already derived from Lenis/GSAP.

# 6. Global movement scale

The site should feel controlled rather than hyperactive.

Typical desktop translation ranges:
- large environmental media: 40–140px over a scene;
- support media: 70–180px;
- Evidence Strip: usually 10–70px while environment changes much more;
- pointer parallax: 6–18px;
- route-transition scale: 0.985–1.0 range;
- no repeated 1.05 hover-scale pattern.

# 7. The Evidence Strip physics

The protagonist has four motion principles.

## Stable inertia
It moves less than the environment. The eye should learn that the source is the constant.

## Registration
Oxblood marks appear where a new relationship attaches. They should look physically anchored, not particle-emitted.

## Edge-on transitions
The strip may rotate slightly in 3D or compress in height during route handoff, but never become an unrelated flying card.

## Accumulation
Marks remain. Old relationships can reduce ownership but should not vanish without conceptual reason.

# 8. Home World Entry choreography

### 0–20%
- primary professional environment dominates;
- title is spatially embedded;
- strip already visible;
- support image has slower/faster depth differential;
- no universal intro fade-up.

### 20–45%
- main image crop tightens and drifts;
- headline reduces ownership;
- strip moves only modestly;
- Oxblood source notch resolves.

### 45–70%
- environment is progressively occluded by Carbon;
- strip becomes dominant;
- support image recedes;
- no abrupt section boundary.

### 70–100%
- first trace emerges;
- quiet statement appears;
- next scene is already visually present.

Fast scroll:
- resolve directly to 100% state in <=250ms of settling;
- do not replay every intermediate state.

Reverse:
- environment returns from its actual crop state;
- strip remains anchor.

# 9. Home Source Quiet

Motion should be minimal.

Allowed:
- tiny 6–12px settling;
- metadata appearance;
- Oxblood registration line draw.

No parallax spectacle.

# 10. Home Branching signature

Desktop uses one long scene with uneven branch timing.

Timeline example:
```text
0.00 source only
0.18 Big Five attach
0.38 RIASEC attach
0.58 Work Values attach through media
0.76 Career Signal attach
0.88 all relationships readable
1.00 handoff into Career world
```

Branch traces:
- draw from the strip attachment point outward;
- endpoint text appears only after 45–60% of that trace is visible;
- previous branch drops to residue, not zero;
- no four simultaneous mechanical stagger.

Travelling fragment:
- one compact source marker may travel with the active trace;
- do not move four paragraphs around the screen.

Mobile:
- vertical spine;
- one active branch per viewport segment;
- source returns/sticks near upper quarter for a limited interval;
- no desktop radial geometry squeezed into portrait.

# 11. Home Career World Takeover

The environment changes much more than the strip.

State transition between worlds:
1. active photo crop expands;
2. support photo enters at depth;
3. outgoing environment becomes an edge residue;
4. new environment takes visual ownership;
5. strip preserves approximate screen position;
6. active relationship text updates.

Do not use carousel slide motion.

Preferred transition verbs:
- occlude;
- replace;
- crop through;
- camera drift.

# 12. Calibration quiet

No continuous motion after settling.

On entry:
- Evidence Strip compresses into baseline;
- deterministic weight spans resolve once;
- 25/25/20/15/10/5 hierarchy becomes visually stable.

Scroll may produce only subtle registration movement.

# 13. Time Revisit choreography

The key motion is **REVISIT**, not reveal.

0–25%:
- earlier record + crop owns scene.

25–50%:
- later crop enters and overlaps;
- second dated strip arrives.

50–75%:
- overlap boundary moves;
- revised reading forms in the intersection;
- one trend trace may connect matching dimensions.

75–100%:
- both records remain inspectable;
- no full replacement of earlier state.

Mobile:
- later strip slides in depth over earlier;
- use z/scale and crop, not three stacked modules.

# 14. Traceback choreography

Desktop pointer zone only.

Pointer mode: `TRACE`.

The aperture is not a giant cursor. It is a local 72–110px inspection zone.

As the pointer crosses the strip:
- readable interpretation stays above;
- raw provenance layer becomes visible beneath;
- an Oxblood trace can extend back to source/question fragment.

Keyboard/touch:
- explicit focusable provenance points;
- selected state opens same raw layer.

No pointer-only meaning.

# 15. Finale motion

Finale should feel like a thematic return.

- opening environment returns with a different crop;
- Evidence Strip arrives carrying accumulated marks;
- old traces briefly resolve around it;
- the system settles into a nearly static final frame;
- footer begins after a pause.

No giant logo reveal.

# 16. Career route motion

Desktop fine pointer:
- environment is primary selector;
- one active photo + one support photo;
- edge index is secondary;
- pointer moves camera/media by limited depth ratios;
- active world advances in z and crop;
- inactive worlds retreat rather than disappear.

If R3F is used:
- renderer initialized once;
- activeIndex updates mesh targets only;
- support mesh swaps texture when selection changes;
- DOM image layer hidden while canvas owns photography;
- semantic labels/controls remain DOM.

No-WebGL fallback:
- same composition using DOM/GSAP;
- not a five-image vertical stack.

# 17. Career route selection timing

Target active environment transition:
- 480–650ms local state transition;
- interruptible;
- newest selection wins;
- no queued animation backlog.

Support detail:
- 120–180ms after active environment starts;
- not a mechanical card stagger.

# 18. Career role atlas

No autoplay marquee.

Scroll-linked drift only while scrolling.

When input stops:
- typography settles;
- no perpetual ticker.

Hover/focus:
- one role increases width/tracking/weight modestly;
- optional profile detail appears.

# 19. How It Works motion

The route follows one real source through the product pipeline.

State sequence:
```text
question → source record → evidence → score families → validity → career comparison → stored record
```

The Evidence Strip changes representation but remains recognisable.

No numbered cards.

The route may use a long controlled scroll scene, but each stage must remain a complete visual composition.

Validity states:
- incomplete paths communicate missing evidence;
- no traffic-light red/yellow/green metaphor.

# 20. Progress route motion

Time is the spatial axis.

Use:
- same-image recrop;
- record overlap;
- date registration;
- one or two trend traces.

Do not animate a generic chart unless actual authenticated trend data is being shown.

Marketing example states must be labelled illustrative.

# 21. Methodology motion

Minimal.

- sticky/slim index may update;
- Evidence Strip technical fields expand as relevant section enters;
- diagram emphasis changes;
- no giant pinning;
- no custom cursor.

# 22. Trust motion

Provenance trace is the primary interaction.

State change:
- active node gains Oxblood registration;
- raw layer changes;
- trace segment gains ownership;
- diagnostic detail crop may reposition subtly.

No tab-bar animation.

# 23. Auth motion

Login:
- near-static;
- one distant record may resolve during first 300–450ms;
- form does not animate around the user.

Signup:
- environmental photo may shift crop as the form progresses;
- blank record gains structural account marks only;
- no fake assessment-state animation.

# 24. Route transitions

The Evidence Strip is the continuity object.

Target desktop total:
`560–720ms`.

Target mobile:
`380–520ms`.

Sequence:
1. current scene compresses slightly;
2. strip moves to shared transition plane;
3. destination media/prepared ground is visible behind;
4. strip resolves into destination role;
5. focus moves to new main.

No white fallback.
No long loading spectacle.

Latest navigation wins using transition generation/request token.

# 25. Header motion

Header should feel stable.

Tone changes happen when the scene's true visual owner crosses the header zone.

Avoid rapid flicker near boundaries.

No morphing pill nav.

# 26. Index motion

Index opens as a catalog, not a random curved overlay.

- route list arrives with one authored reveal;
- Evidence Strip aligns to current selection;
- preview image changes with clip/crop rather than hover-scale;
- magnetic behavior limited to route label/strip alignment;
- keyboard produces identical state clarity.

# 27. Scroll velocity usage

Use velocity sparingly:
- Career role atlas drift;
- optional tiny media inertia in Career;
- footer vocabulary line if retained.

Do not make headlines blur or smear merely because velocity is available.

# 28. Parallax taxonomy

Use only these justified forms:

## Depth parallax
World media vs support media vs Evidence Strip.

## Inner-image parallax
Photo under a fixed crop/mask.

## Camera parallax
Career desktop only.

## Counter-parallax
A support crop can move opposite main environment by a small amount.

## Route-transition parallax
Strip and destination world have different temporal ownership.

Avoid random section parallax.

# 29. Reduced motion

Reduced motion uses static board states, not an animation-disabled broken page.

- Lenis interpolation off;
- long pins removed;
- pointer parallax removed;
- WebGL camera movement disabled or fallback used;
- branching appears as sequential static connected records;
- route transitions become short opacity/clip changes;
- all content order remains coherent.

# 30. Fast-scroll contract

Every scene must define an end-state resolver.

If scroll velocity exceeds a threshold or user travels >60% of scene rapidly:
- set the scene to the nearest complete semantic state;
- never leave objects at arbitrary low-opacity midpoint;
- never force seconds of catch-up.

# 31. Reverse-scroll contract

Reverse must restore semantic hierarchy:
- branches reattach;
- environments return;
- later record recedes behind earlier;
- provenance closes.

No stale transforms after direction reversal.

# 32. Resize contract

On resize:
- kill/rebuild route-local ScrollTriggers safely;
- preserve semantic state if possible;
- recalculate path coordinates;
- never use SVG viewBox coordinates directly as CSS pixels unless transformed;
- no horizontal overflow.

# 33. Accessibility motion rules

- focus is never moved by decorative animation;
- route focus moves after navigation settles;
- interactive traces are real buttons/links;
- no hover-only critical content;
- focus styles are not suppressed by custom cursor;
- 44px preferred touch target;
- animation does not block form input.

# 34. Performance rules

- preload opening critical photo only;
- lazy-load world/support media;
- R3F Career chunk lazy-loaded;
- DPR clamped <=2;
- no continuous offscreen RAF;
- one main Lenis/GSAP ticker;
- no per-frame React state;
- image dimensions declared;
- media derivatives only, never source originals.

# 35. Motion acceptance test

A scene fails if its success can only be explained by code values.

Pass requires a reviewer to visibly answer:
- what moved;
- what remained;
- what changed in meaning;
- why that transformation belongs to Personality Assessor.

# 36. Final rule

> **Motion is the continuity of the Living Record, not decoration applied to website sections.**
