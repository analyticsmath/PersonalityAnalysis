# Personality Assessor: Temporal Choreography & Motion-System Reconstruction Report

**Production Baseline Ref:** `f3c5ff377a6aef0edb1b1d333ac4d032cac2fcb7`  
**Reference Calibration:** White Desert image journey  
**Scope:** Public Marketing Routes + Login / Signup  
**Protected Systems Preserved:** Protected Application Routes (`/dashboard`, `/analytics`, `/assessment/*`, `/result/*`, etc.) and Backend Services  
**Date:** 24 August 2026  

---

## 1. Executive Summary & Root Cause Analysis

### 1.1 The Production Failure Mechanism
Previous iterations of the public marketing experience scored poorly (overall 3.5/10, motion 1.9/10, timing/choreography 1.2/10) not due to a lack of animation libraries or visual elements, but due to fundamental failures in **temporal composition, viewport ownership, and scroll authority**:

1. **Pin-Boundary Black Gaps (`REST -> BLACK -> incoming`)**: Home was divided into eight separate sticky `<section>` elements with small individual heights (`170svh`, `180svh`, etc.). As each section unpinned and scrolled out of view, a gap of empty black background (`var(--px-ink)`) was exposed before the next section reached its pin trigger.
2. **Long Scrub Smoothing Catch-Up**: Using large scrub smoothing (`scrub: 0.4–0.8s`) decoupled DOM scroll position from visual state. Rapid wheel scrubbing, Page Down, and reverse scrolling resulted in the document advancing hundreds of pixels while visual elements lagged behind or were trapped in mid-interpolation clip states (`clipPath: 0%` or `opacity: 0`).
3. **Discrete Step Indexing in How It Works**: Step progression relied on discrete index calculation (`Math.floor(progress * length)`), causing text blocks to abruptly disappear and DotLottie to jump or fail during large scroll steps.
4. **Global Photographic Dimming**: Photography was globally suppressed (`opacity: 0.55`), degrading the photographic depth into a dark background texture.
5. **Gated / Detached 3D Camera in Career**: The Three.js canvas required mouse pointer interaction to perceive movement, with no scroll-driven camera rail, and failed to transition smoothly into the occupational rail.
6. **Documentation-Style Tabs in Trust**: Trust presented numbered buttons (`1`, `2`, `3`, `4`, `5`) and a literal `"STATE X OF 5"` string rather than a single continuous transforming record actor.
7. **Fullscreen Black Route Overlays**: Route transitions used a dark fullscreen cover fading in and out rather than continuous shared actor carry and selective pixel transitions.

---

## 2. Scroll Architecture & Lifecycle Integration

### 2.1 Single Scroll Authority
The motion system is unified under a single synchronous execution pipeline:
$$\text{Lenis (Scroll)} \longrightarrow \text{GSAP RAF Ticker} \longrightarrow \text{GSAP ScrollTrigger} \longrightarrow \text{DOM / SVG / WebGL / Canvas}$$

```javascript
// Calibrated responsive Lenis initialization
const lenis = new Lenis({
  lerp: 0.09,
  smoothWheel: true,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.0,
  syncTouch: false,
});

lenis.on('scroll', (e) => {
  ScrollTrigger.update();
  updateScrollState(e.scroll, e.velocity, e.direction, e.progress);
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

### 2.2 Instant Keyboard & Programmatic Scroll Synchronization
To guarantee zero desync under keyboard `PageDown`, `ArrowDown`, or programmatic links, a native window scroll listener immediately notifies `ScrollTrigger` and updates the high-frequency `scrollState` store without waiting for a wheel tick.

### 2.3 Structural Scrub Policy: Direct 1:1 Mapping
All structural timelines controlling image ownership, clip/crop, active environment, camera paths, and source phrase trajectories use:
$$\text{scrub: true}$$
This ensures that `PageDown`, fast wheel forward, and rapid reverse instantly resolve to mathematically valid, composed frames without catch-up lag.

### 2.4 Centralized Debounced Refresh Discipline
`ScrollTrigger.refresh()` is synchronized with `document.fonts.ready`, media decode events, and debounced window resize observers (`ResizeObserver`).

### 2.5 Development-Only Scene Debugger
A tree-shakable HUD (`SceneDebugger.jsx`) bounded by `if (import.meta.env.DEV)` is available via `?debug=motion` or `Ctrl+Shift+D`. It monitors real-time `scrollY`, Lenis velocity, normalized scene progress, active pinned sections, getBoundingClientRect() bounds, computed opacities, and media decode readiness. It contains zero footprint or event listeners in production builds.

---

## 3. Route Reconstructions & Temporal Mapping

### 3.1 Home Chapter A: Observe (`/`)
Unifies World Entry, Professional Situation, and Multiple Readings into a continuous flow:
- **0.00–0.15 (REST)**: Dominant architectural plane (`homeWorldEntry`) owned at `opacity: 0.92`, secondary crop visible, title stable.
- **0.15–0.30 (ANTICIPATE)**: Contextual inquiry prompt emerges in lower Zone D; secondary crop tracks inward; headline variable font width counter-moves (`'wdth' 76` vs `'wdth' 70`).
- **0.30–0.65 (TRANSFORM & ZOOM PARALLAX)**: Dominant container scales `1.00 -> 1.10`, inner image counter-shifts `yPercent: -12`, prompt travels `Zone D -> Zone C`, secondary crop expands and occludes title.
- **0.45–0.58 (VISUAL CLIMAX)**: Simultaneous multi-plane coexistence of title, inquiry prompt, and dual photography with zero black frames.
- **0.65–0.82 (TRANSFER OWNERSHIP)**: Professional situation becomes primary actor; title recedes as residue.
- **0.82–0.92 (SETTLE)**: Participant dialogue environment stabilizes; semantic clauses detach (`0.20`, `0.35`).
- **0.92–1.00 (HANDOFF)**: SVG motion trajectories draw at `0.45`; 4 distinct interpreted readings (Big Five, RIASEC, Work Values, Behavioral Signals) arrive asymmetrically without card boxes. Persistent source phrase actor guides into Workworld entry.

### 3.2 Home Chapter B: Conditions (Workworld Journey)
Reconstructed as a **single continuous 400vh pinned stage** housing all 4 environments (Precision, Autonomy, Collaboration, Operational Pressure):
- **3-Plane Active Window**: Maintains current dominant plane (opacity `0.92`), incoming plane (anticipating from a non-fullscreen origin), and lightweight residue plane.
- **Varied Spatial Geometry**:
  - *Precision $\rightarrow$ Autonomy*: Vertical portrait crop enters from lower-right `34vw` with independent inner counter-parallax, expanding to full viewport as Precision recedes left to `18vw` residue.
  - *Autonomy $\rightarrow$ Collaboration*: Wide panoramic crop enters from upper-left, Autonomy recedes to lower-right.
  - *Collaboration $\rightarrow$ Operational Pressure*: Tight horizontal tension with width-axis variable font compression (`'wdth' 74`).
- **Shared Curtains Velocity Shader**: Mesh curvature and UV tension deform proportionally to scroll velocity ($\le 1.5\%$ during rapid scroll, strictly $0\%$ at rest).

### 3.3 Home Chapter C: Trace & Finale
- **Calibration (Proportional Spatial Field)**: Reconstructed with authentic visual scaling ratios: RIASEC (25% / 1.00 scale), Skills (25% / 1.00 scale), Work Values (20% / 0.84 scale), Personality (15% / 0.68 scale), Education (10% / 0.52 scale), Goals (5% / 0.38 scale). Enters from Workworld residue with depth differentiation.
- **Time Exposure**: True temporal double-exposure mask (`polygon(28% 0, 100% 0, 100% 100%, 38% 100%)`) with baseline and shifted context layers at high photographic fidelity.
- **Provenance Reveal**: Instant aperture response (`mousemove`, touch drag, keyboard `Enter`/`Space`/`Escape`) with localized pixel dissolve reconstruction (`PixelTransitionCanvas`).
- **Finale**: Spatial pullback assembling 3 irregular Workworld fragments (`1.2fr`, `0.8fr`, `1.1fr`), persistent source phrase return, resolved statement, and CTA emergence at progress `0.82`. Quiet rest at `0.90`; footer reveal at `0.92+`.

### 3.4 How It Works (`/how-it-works`)
- **Single Progress Controller**: Normalized route progress `0.00–1.00` drives:
  1. Physical semantic text transformation (words separate along SVG orbital trajectories and reassemble into calibrated vector output).
  2. Guarded DotLottie frame scrubbing: Integer frame strictly mapped (`Math.floor(p * 119)`) and updated only when changed, eliminating redundant RAF calls.
  3. Continuous explanatory narrative.
- Zero discrete blank jumps under Page Down.

### 3.5 Career Intelligence (`/career-intelligence`)
- **Scroll-Driven 3D Camera (R3F)**: Real camera position and lookAt interpolation driven by ScrollTrigger progress across 5 spatial waypoints (`0.00` wide establishing, `0.20` Precision, `0.38` Deep Inquiry, `0.56` Coordination, `0.74` Pressure, `0.90` Synthesis). Pointer input adds only a local `\pm 0.2` parallax offset.
- **Capability Gating**: WebGL and performance tier gated, not gated behind mouse pointer presence. Visible at standard desktop viewports without requiring hover.
- **3D-to-DOM Role Rail Continuity**: Terminal world plane flattens and recomposes into the 17-role occupational rail.
- **Occupational Rail Interaction**: Touch swipe and pointer drag with inertia, keyboard arrow navigation, active role width-axis variable font shift (`'wdth' 96` vs `'wdth' 80`), and negative-space capability details without card containers.

### 3.6 Trust & X-Ray (`/trust`)
- **Single Transforming Record Actor**: Eradicated numbered tab buttons and `"STATE X OF 5"` labels. Replaced with a single SVG / DOM geometric record actor morphing across the 5 lifecycle states:
  1. *Supplied*: Origin data points.
  2. *Inferred*: Trajectory alignment.
  3. *Calculated*: Calibrated bounds rectangle.
  4. *Compared*: Dual baseline comparison path.
  5. *Controlled*: Sovereign user account rights and deletion controls.
- Localized pixel dissolve on state transitions.

### 3.7 Persistent Route Transitions & Pixel Transition Layer
- **Zero Fullscreen Black Overlays**: Eliminated generic dark cover.
- **Public Actor Registry**: Tracks active media, phrase geometry, and bounding rects.
  - *Family A (Shared Media Carry)*: Home $\rightarrow$ Career carries active Workworld image crop.
  - *Family B (Phrase Carry)*: Home $\rightarrow$ How / Trust carries persistent source phrase.
  - *Family C (Temporal Crop Carry)*: Home $\rightarrow$ Progress carries double-exposure crop.
  - *Auth Frame Stability*: Stable coordinate frame between Login and Signup.
  - *Pixel Transition Shader*: Reusable `PixelTransitionCanvas` executing deterministic block-pixel dissolve ($\sim 450\text{ms}$) on Home $\rightarrow$ Trust and Trust state shifts.

### 3.8 Chrome & Footer Refinements
- **Index Overlay (`PublicIndex.jsx`)**: Asymmetric polygon mask reveal with pointer-parallax floating preview and variable font width expansion on hover/focus. Mobile retains compact preview in portrait layout.
- **Utility Footer (`PublicFooter.jsx`)**: Zero top border divider (`border-top: none`), zero multi-column SaaS cards, zero tickers, presenting quiet utility information after narrative resolution.

---

## 4. Mobile & Reduced Motion Parallel Choreography

### 4.1 Mobile Authoring Invariants
- Secondary crops retained in portrait aspect (`140px` square).
- Vertical clause trajectory travel in Situation and Readings.
- Dual-plane overlap maintained in Workworld.
- Freeform proportional calibration field (2-column layout, not a 1-column list).
- Touch-driven aperture inspection in Provenance.

### 4.2 Reduced Motion Mode (`prefers-reduced-motion: reduce`)
- All pinned 400vh/280vh cinematic spacers collapse into natural document flow (`position: relative !important; height: auto !important;`).
- Zero pinned blank spaces or empty travel distances.
- All photography, text, and diagnostics are immediately visible and legible.

---

## 5. Verification & Test Suite Results

### 5.1 Vitest Unit & Integration Suite
- **Test File:** `src/temporal-choreography-timing.test.jsx` + full project suite (33 test files).
- **Result:** **33 passed (33), 224 tests passed (224), 0 errors.**
- **Coverage Highlights:** Normalized timing phase bounds, Workworld active window overlap, guarded DotLottie frame calculation, route transition actor registry, and proportional calibration mass ratios.

### 5.2 Playwright Chromium Real-Browser Stress Suite
- **Test File:** `e2e/temporal-choreography.spec.js`.
- **Result:** **4 passed (4), 0 failed.**
- **Test Matrix Executed:**
  1. `Home Route`: Repeated PageDown (1–5), repeated ArrowDown, fast wheel forward (1500px), reverse wheel (-1200px), rapid reverse (-5000px). Evaluated computed actor visibility $>0.15$, non-zero bounding box, and zero black/blank interval states. $\rightarrow$ **PASSED**
  2. `How It Works Route`: Repeated PageDown (1–4), fast scrub, rapid reverse. $\rightarrow$ **PASSED**
  3. `Route Transitions & Shared Actor Carry`: Home $\rightarrow$ Career, Career $\rightarrow$ How, How $\rightarrow$ Trust. Evaluated destination actor mounting and shared carry presence. $\rightarrow$ **PASSED**
  4. `Auth Coordinate Stability`: Login $\leftrightarrow$ Signup coordinate frame and input visibility. $\rightarrow$ **PASSED**

### 5.3 Production Build Verification
- **Command:** `npm run build`
- **Result:** **Exit Code 0, built in 12.74s.** Zero TypeScript/JSX syntax errors, CSS bundle generated cleanly (`72.27 kB`), assets optimized.

---

## 6. Files Created and Modified

| File | Type | Purpose |
| :--- | :--- | :--- |
| `src/components/public-experience/motion/SceneDebugger.jsx` | NEW | Development-only HUD for real-time scroll and motion inspection |
| `src/components/public-experience/motion/PixelTransitionCanvas.jsx` | NEW | Deterministic WebGL/Canvas pixel dissolve transition component |
| `src/temporal-choreography-timing.test.jsx` | NEW | Unit test suite for timing phases, frame calculations, and actor registry |
| `e2e/temporal-choreography.spec.js` | NEW | Playwright Chromium browser test for PageDown, wheel scrub, and transitions |
| `src/components/public-experience/motion/scrollState.js` | MODIFY | Actor registry and high-frequency scroll state store |
| `src/components/public-experience/motion/PublicMotionRoot.jsx` | MODIFY | Lenis lifecycle tuning, GSAP RAF ticker sync, debounced refresh, native scroll sync |
| `src/components/public-experience/home/WorldEntry.jsx` | MODIFY | 3-layer zoom parallax, inner counter-parallax, anticipate inquiry, 1:1 scrub |
| `src/components/public-experience/home/ProfessionalSituation.jsx` | MODIFY | Persistent actor registration, inner counter-parallax, clause separation |
| `src/components/public-experience/home/MultipleReadings.jsx` | MODIFY | Persistent source anchor, SVG trajectories, asymmetric negative space layout |
| `src/components/public-experience/media/WorkworldJourney.jsx` | MODIFY | Single 400vh pinned stage, 3-plane active window, dominant photo opacity, 1:1 scrub |
| `src/components/public-experience/home/Calibration.jsx` | MODIFY | Proportional spatial scaling field (1.00/1.00/0.84/0.68/0.52/0.38) and depth travel |
| `src/components/public-experience/home/TimeExposure.jsx` | MODIFY | Continuous dual-exposure crop travel, actor registration, rich photo depth |
| `src/components/public-experience/home/ProvenanceReveal.jsx` | MODIFY | Immediate pointer/touch aperture, keyboard toggle, pixel dissolve trigger |
| `src/components/public-experience/home/Finale.jsx` | MODIFY | Irregular spatial mosaic, source phrase return, editorial resolution |
| `src/components/public-experience/how/HowContinuousTransformation.jsx` | MODIFY | Single progress controller, physical text trajectories, guarded DotLottie scrub |
| `src/components/public-experience/career/CareerWorldCanvas.jsx` | MODIFY | Scroll-driven 3D camera rail, multi-plane depth distribution, pointer offset isolation |
| `src/components/public-experience/career/CareerRolePath.jsx` | MODIFY | Touch swipe / drag with inertia, variable font width shifts, negative space details |
| `src/pages/editorial/EditorialCareerIntelligencePage.jsx` | MODIFY | Scroll progress binding for 3D camera and role rail continuity |
| `src/components/public-experience/trust/TrustInspectionStage.jsx` | MODIFY | Single persistent transforming record actor, SVG morphing, zero numbered tabs |
| `src/components/public-experience/motion/PublicRouteTransition.jsx` | MODIFY | Shared actor carry (Families A/B/C), pixel dissolve, zero black overlays |
| `src/components/public-experience/chrome/PublicExperienceRoot.jsx` | MODIFY | Clean semantic DOM structure, single transition authority |
| `src/components/public-experience/chrome/PublicIndex.jsx` | MODIFY | Asymmetric polygon reveal, pointer parallax preview, mobile portrait preview |
| `src/components/public-experience/chrome/PublicFooter.jsx` | MODIFY | Zero border-top divider, quiet utility information |
| `src/components/public-experience/progress/ProgressTemporalStage.jsx` | MODIFY | 1:1 scrub, scene progress registration, double-exposure crop |
| `src/styles/public-experience/home.css` | MODIFY | Dominant photo opacities, zoom parallax rules, irregular calibration/finale, mobile rules |
| `src/styles/public-experience/how.css` | MODIFY | Rich backdrop opacity, word trajectory transforms |
| `src/styles/public-experience/career.css` | MODIFY | 3D canvas stage height, typographic rail layout, touch drag styles |
| `src/styles/public-experience/trust.css` | MODIFY | Transforming record actor, SVG geometry stage, removal of legacy tab rules |
| `src/styles/public-experience/chrome.css` | MODIFY | Footer border removal, asymmetric index reveal, mobile preview styles |
| `src/styles/public-experience/reduced-motion.css` | MODIFY | Collapse all pinned spacers into clean natural document flow |
| `src/styles/public-experience/auth.css` | MODIFY | Rich photographic ground opacities, negative space layout |
| `src/pages/Auth/SignupPage.js` & `LoginPage.js` | MODIFY | Stable coordinate frame across auth routes |
