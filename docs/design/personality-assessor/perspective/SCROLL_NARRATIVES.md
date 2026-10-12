# Scroll-led occupational and evidence narratives

13 October 2026, Asia/Karachi. User-approved direction: Instrument Sans, forest green and paper, real photography and large branded footers. Work remains on main.

## Independent audit

Career intelligence had a second vertical scroller inside the page, forcing the viewer to target the occupation list. Its information panel also obscured the photograph. Trust had five accurate evidence stages but advanced only through clicks. Progress had correctly assigned sources but the collaborative overlay was clipped to the left, underneath the independent-work label. Fix that clipping geometry while preserving image-to-label ownership. Use the existing overhead collaboration photograph from the homepage to make the shared-workspace side clearer.

## Reference anchors and transfers

- David Faure's DOM Horizontal Parallax Gallery: https://tympanus.net/Tutorials/HorizontalParallaxGallery/index.html . Live inspection showed oversized photographs moving horizontally with independent internal image movement. The creator's explanation is https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/ . Transfer measured image stride and bounded internal parallax. Keep the page's native finite scroll rather than adopting a gallery-wide wheel capture.
- Michelle Barker's scrollable timeline: https://tympanus.net/codrops/2022/01/03/building-a-scrollable-and-draggable-timeline-with-gsap/ . The useful interaction contract is that scrolling and direct selection share the same position. Here the selection controls seek real positions in each scroll sequence.
- GSAP's official ScrollTrigger documentation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ . Responsive measurements, normalized progress, reversible scrubbing and explicit cleanup supply the implementation seam.
- Lando Norris: https://landonorris.com/ . Revisited the live opening and scroll. Content loaded, but this browser's visual layer remained an olive field, so no timing or unobserved transition is claimed as an implementation reference. The existing six-site corpus remains in REFERENCE_ANCHORS.md.

## Composition and interaction contracts

Career: page scroll moves all 17 canonical occupations through a visible index and advances an actual horizontal photographic filmstrip. A separate paper plane contains the selected occupation's capabilities and domains. There is no nested list scroller. Button selection and arrow/Home/End keys seek the same page positions; keyboard focus does not move the clipped index itself. The selected photo remains eligible for page-transition snapshots. Home/End and distant selections seek directly, avoiding a flash through every intervening profile; nearby selections retain the short scroll transition.

Trust: five full photographic/text chapters travel horizontally. Each has a reading hold before the transition into the next. The bottom stage controls select the same timeline positions, and their selected state follows scrolling in both directions. Descriptions remain grounded in the existing canonical record states.

Progress: independent work is on the left; collaboration is on the right. The divider value describes the independent portion, and accessible wording describes both portions. Both images receive the same small internal parallax, preserving the meaning of the comparison. No photo is presented as a real assessment history.

Page transitions: the most visible current photograph supplies the snapshot for ordinary text navigation. Explicit image selections retain priority. An epoch rejects obsolete navigation callbacks after a newer click; snapshot cleanup is owned by its initiating request. The route title is not clipped away while a destination snapshot is being taken. Failed native callbacks still apply navigation once.

Section transitions: chapter photographs reveal into the available space while their internal crop moves at a different rate. Effects remain on the established GSAP clock and leave reading content in ordinary flow.

## Accessibility and timing

Sequences are driven by native page progress, with .22-second scrub smoothing and deliberate reading holds. No snap or wheel prevention is added. Small-height screens (under 740px) and reduced-motion preferences expose ordinary content instead of forcing a pinned composition. Trust's complete chain is readable in that fallback; the occupational selector retains direct access to the canonical profiles. Native touch scrolling remains native. All animations, match-media callbacks and owned styles are removed on route teardown.

## Verification boundary

Tests cover sequence bounds, monotonic continuity, direct selections inside reading holds, the effective progress clipping rule, latest-request navigation, visible-media selection and existing public/product contracts. Build and changed-source lint checks are separate from live visual review. Desktop browser observations do not establish physical-phone performance or an award score.

## Live desktop acceptance

The main implementation deployed as production commit 081574786ac7c7e04b242bff7c2ef05c5a40c138. Vercel reported READY. Native browser inspection confirmed that page scrolling advances Software Engineer to Frontend Engineer to Backend Engineer, moves the photographic strip and occupation index together, and reconstructs Frontend Engineer on reverse scrolling. The photograph remains physically separate from the readable paper information plane. End reaches Business Analyst and Home returns to Software Engineer.

Trust advances from Supplied to Inferred without a click and carries each chapter's own photograph and copy. Reverse scrolling returned Calculated to Inferred, and direct Controlled selection sought its actual chapter without flashing through intermediate panels. The progress divider was inspected at 55%, 25% and 75%; the solo photograph stays on the left, and the shared environment stays on the right. Automated checks passed 241 tests; changed-source ESLint and the production build passed. The existing large shared-bundle warning remains; no award score is asserted.
