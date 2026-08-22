# PERSONALITY ASSESSOR — RESPONSIVE, FALLBACK, ACCESSIBILITY & PERFORMANCE SPEC
## The Living Record
### Final pre-implementation system matrix

**Date:** 22 August 2026

# 1. Device philosophy

Desktop, tablet, mobile, reduced motion, and no-WebGL are different authored modes of the same world.

They are not quality tiers.

The protagonist, product truth, and narrative must survive every mode.

# 2. Breakpoint families

```text
mobile small     320–374
mobile primary   375–479
tablet portrait  768–899
tablet wide      900–1024
desktop          1025–1599
large desktop    1600+
```

CSS can use practical breakpoints, but the design must be verified at:

```text
360×800
390×844
430×932
768×1024
820×1180
1366×768
1440×900
1728×1117
```

# 3. Global horizontal-overflow invariant

For every public/auth route after settle:

```text
document.documentElement.scrollWidth <= window.innerWidth + 2
```

`overflow-x:hidden` is a safety net, not a geometry fix.

# 4. Desktop Home

Uses:
- large environmental media;
- support depth media;
- horizontal Evidence Strip;
- asymmetric branching;
- cinematic world replacement;
- calibration baseline;
- two-record temporal overlap;
- pointer Traceback.

# 5. Tablet Home

Changes:
- one primary + one support photo max;
- headline width reduced;
- strip remains wide but never >88vw;
- branching distances compressed;
- branch count can be sequential while still visually connected;
- no pointer-only interactions;
- no large WebGL dependence;
- pins shortened.

# 6. Mobile Home

Opening:
- portrait/edge-bleed environmental crop;
- strip crosses lower third;
- one CTA;
- no secondary photo in first frame.

Branching:
- vertical evidence spine;
- source strip remains visible for limited sticky interval;
- branches peel left/right;
- one media intervention;
- no desktop radial diagram.

Career takeover:
- one environment owns each state;
- next environment peeks 10–18%;
- strip stays near lower third.

Calibration:
- vertical proportional scale;
- no horizontal bar overflow.

Time:
- record depth stack;
- date boundary;
- same-source crop replacement.

Trust:
- tap-to-trace;
- no hover aperture.

Finale:
- one environment + accumulated strip;
- no massive image above all actions.

# 7. Career responsive matrix

## Desktop fine pointer + WebGL capable
Optional R3F atlas.
One visible primary + one support world.
DOM handles semantics.

## Desktop no WebGL
DOM/GSAP atlas with same composition.

## Tablet
- active environment 70–80vw;
- support detail 25–35vw;
- next/previous world edge-peek;
- text index available;
- no five-image stack.

## Mobile
- one active environment;
- 10–16% next/prev peek;
- tap/swipe/scroll selection;
- support image appears as detail crop;
- relationship annotations sequential;
- no WebGL required.

# 8. How It Works responsive matrix

Desktop:
- horizontal/diagonal evidence engine.

Tablet:
- compressed diagonal pipeline;
- source remains persistent;
- score families appear in two spatial groups, not cards.

Mobile:
- vertical strip/spine;
- question → source → evidence → scores → validity → comparison → dated record;
- one state per viewport segment;
- path/token remains visible;
- no ordinary vertical feature list.

# 9. Progress responsive matrix

Desktop:
- two large image crops overlap;
- two records overlap;
- revised reading at intersection.

Tablet:
- 60/40 overlapping crops;
- strips remain separate enough to inspect;
- one trend trace.

Mobile:
- earlier record at z0;
- later record slides over at z1;
- revised reading appears between;
- no Earlier/Later/Revised stacked modules.

# 10. Methodology responsive

Desktop:
- central strip + slim index + technical relationships.

Tablet:
- index collapses to sticky current-section control.

Mobile:
- one reading stream;
- strip fields appear immediately after relevant copy;
- jump menu available;
- no sidebar.

# 11. Trust responsive

Desktop:
- human inspection media + diagnostic detail + provenance trace.

Tablet:
- trace shortens and bends vertically.

Mobile:
- provenance points are explicit tap controls;
- selected raw layer expands beneath strip;
- human image remains at top/behind;
- no hover dependency.

# 12. Privacy responsive

Pure document quality:
- desktop max reading width ~760px;
- tablet ~680px;
- mobile full width with 20px margins;
- anchor targets account for fixed header;
- no decorative dividers.

# 13. Login responsive

Desktop:
- form 420–480px;
- one ambient record outside form exclusion zone.

Tablet:
- form centered/left-biased;
- ambient record reduced.

Mobile:
- form begins immediately below header;
- ambient record can become a small top background object or disappear if it harms usability;
- no image/animation before form.

# 14. Signup responsive

Desktop:
- environmental image crosses the visual centre;
- form remains functionally left-biased;
- new-record strip lives in environment.

Tablet:
- image becomes broad background/side field, not 50/50;
- form stays readable on Mineral negative space.

Mobile:
- form first;
- photo is a small environmental interlude or off-edge background crop;
- new-record strip appears after initial fields;
- no giant photo before form.

# 15. Touch interaction rules

- no custom cursor;
- no hover-only metadata;
- all media selectors have explicit tap target;
- swipe gestures must have a visible non-gesture alternative;
- target size >=44px where practical;
- do not prevent native vertical scroll unnecessarily.

# 16. Reduced-motion mode

At `prefers-reduced-motion: reduce`:
- disable Lenis smoothing;
- no long scrub/pin scenes;
- no pointer parallax;
- no WebGL camera travel;
- no velocity crawler;
- route transitions short/simple;
- use approved static Frame 0/100 compositions;
- branching shown as connected static traces;
- time shown as two overlapping records;
- all content remains present.

# 17. No-WebGL mode

Meaning is never canvas-only.

Career fallback must preserve:
- primary environment;
- support environment;
- crop/depth via DOM;
- index;
- Evidence Strip;
- selection state.

If WebGL context is lost after initialization, switch to DOM fallback without blank route.

# 18. Slow-network mode

- destination ground color renders immediately;
- hero image has dimensions/aspect ratio reserved;
- preload only first route-critical media;
- support images lazy;
- no white loader;
- no long blocking preloader;
- user can navigate even while noncritical media loads.

# 19. Image delivery

Use committed responsive derivatives.

Never ship Git-ignored originals.

Prefer:
- AVIF;
- WebP;
- JPG fallback where current pipeline provides it.

Do not create excessive variants beyond actual rendered widths.

# 20. LCP strategy

Home:
- preload correct first-view responsive image;
- fetch priority high;
- title and strip do not wait for image JS.

Career:
- preload only opening environment if route directly loaded;
- R3F secondary textures deferred.

Signup:
- image not allowed to block form usability.

# 21. CLS strategy

- explicit aspect ratios;
- fonts preloaded/declared correctly;
- Evidence Strip dimensions stable;
- route fallback reserves scene ground;
- no image intrinsic dimensions leaking into layout.

# 22. INP strategy

- no heavy React state during scroll;
- Career selection interruptible;
- no texture reinitialization per click;
- form input never waits for animation;
- menus use simple local state.

# 23. Keyboard requirements

Global:
- skip link;
- visible focus;
- semantic links/buttons;
- route focus to `#main-content` after navigation;
- Escape closes Index/menu;
- focus restores to opener.

Career:
- environment index is keyboard-operable;
- canvas is not the only target.

Trust:
- provenance controls keyboard-operable.

Forms:
- native labels;
- errors associated and announced.

# 24. Screen-reader requirements

The visual protagonist must also exist semantically.

Evidence Strip should be DOM text.

Decorative duplicate visual text in SVG/canvas gets hidden from accessibility tree.

Do not announce every motion-state residue.

# 25. Color/contrast

- Carbon/Mineral foreground/background combinations must meet WCAG AA for body text;
- muted metadata must remain readable;
- Oxblood cannot be the only signal for active state;
- active state also uses position/weight/label.

# 26. Auth accessibility

- no transformed parent that breaks browser autofill overlays;
- password manager compatible;
- Google official button preserved;
- provider language may be externally localized despite `locale="en"`;
- no fake Google button.

# 27. Error and empty states

Progress insufficient history:
- authored quiet state;
- no empty chart skeleton.

Career no WebGL:
- authored DOM state;
- no technical warning to user.

Media failure:
- meaningful alt/text world survives.

Assessment data unavailable:
- do not fabricate score.

# 28. Route transition fallback

If destination readiness exceeds timeout:
- reveal destination-toned shell;
- keep navigation functional;
- no infinite mask.

# 29. Performance budgets

Targets:
```text
LCP <= 2.5s
INP <= 200ms
CLS <= 0.1
```

Additional:
- no public route chunk should eagerly import full Three stack unless route needs it;
- Career WebGL chunk lazy;
- avoid full-image source sizes > needed derivative;
- stop offscreen animation work.

# 30. QA viewport matrix

Required independent QA:
```text
1440×900 desktop
1366×768 desktop compression
820×1180 tablet
768×1024 tablet compression
430×932 large phone
390×844 primary phone
360×800 small phone
```

# 31. Functional geometry assertions

All routes:
```text
scrollWidth <= innerWidth + 2
```

Home desktop:
- H1 visible;
- primary media intersects viewport;
- Evidence Strip visible;
- no intrinsic image blowout.

Mobile Home:
- vertical branching path exists;
- strip remains visible.

Career mobile:
- one active world + peek, not five stacked worlds.

How mobile:
- path/spine exists.

Progress:
- actual overlap exists.

Signup:
- form starts in first viewport on mobile.

# 32. Final rule

> **Responsive design preserves the meaning of the Living Record, not the geometry of the desktop implementation.**
