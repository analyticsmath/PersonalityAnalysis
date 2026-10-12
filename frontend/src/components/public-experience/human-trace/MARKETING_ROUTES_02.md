# Valtum Studio / Personality Assessor — Marketing Routes, Integration 02

## Purpose
Second implementation iteration of **The Human Trace** across all six remaining canonical marketing routes, following the approved photographic/no-3D constraint. This integration is a **review branch**, not a release approval.

## Source-led content
All marketing content is grounded in:
- `src/content/public-experience/publicContent.js` (the canonical source/career/how/progress/trust/methodology/privacy content).
- `src/content/careers.json` (17 defined occupational profiles, skills and domains).
- The source illustration "I clarify the constraints first, then choose the smallest reversible step." Its appearance never means one response alone yields valid psychometric scores.
- Nine originally downloaded Unsplash photographs from Art Direction 08 (same repository files, not generated).

No career fit scores or growth predictions are fabricated in this presentation. Differences between static illustrative working environments are not depicted as true user assessment history. The policy claims shown on the Privacy page are inherited from the existing source and still require legal/security verification before production.

## Route choreography and ownership
| Public route | Distinct presentation | Interaction |
| --- | --- | --- |
| `/how-it-works` | Source photograph pinned while five causality steps pass through the opposite column | Scroll-linked image and clause/evidence progression |
| `/career-intelligence` | Seventeen-role occupational field, anchored documentary media inspection | Keyboard-accessible tablist and selected role detail |
| `/progress` | Dual photographic context with retained source record | Range comparator (real keyboard + pointer input) |
| `/trust` | Source photograph and five-stage provenance reader | Stage buttons with selected states; account-controls links |
| `/methodology` | Pale publication cover and eight-chapter research monograph | Method section navigation and fixed scoring weights |
| `/privacy` | Quiet paper publication with 6 source-derived policy sections | In-page table of contents |

The homepage remains the earlier continuous Film 08 implementation. The new routes share a readable fixed header, index overlay, accessible focus trap, footer, independent mobile composition and scrolling lifecycle. Pinned effects and photo overscan are disabled for reduced-motion users and narrower touch layouts.

### Route transitions
Chrome's same-document View Transitions update the React Router state without a full document navigation. The transition uses a guarded idempotent navigation callback and a 420 ms fallback, ensuring input is not blocked by snapshots. CSS snapshots don't intercept pointer events, and skipped transition promises are handled. On browsers without the API or with reduced motion, navigation is immediate.

Sources consulted:
- https://developer.chrome.com/docs/web-platform/view-transitions/same-document
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://web.dev/articles/animations-guide

## Preserved application
All authenticated dashboard, assessment, career explorer, login/signup, API, backend and database code remains untouched. The legacy public layout is still used on authentication routes. Public route content changes only the six marketing pages and their public shell routing.

## Verified (local production-preview browser)
- Vite production build and SEO generation: pass.
- 6 canonical routes × 3 viewport sizes (1440×900, 390×844, 430×932): routes rendered with no document horizontal overflow.
- All first-screen photographs loaded; lazy media are browser-deferred.
- Career tab selection: pass.
- Trust stage selection: pass.
- Index drawer open/close and keyboard Escape: pass.
- Home → Career → How → browser Back on desktop and portrait: pass after transition interruption guards, no JS page errors.
- Progress range input keyboard ArrowRight: working (50 → 51).
- Reduced-motion stylesheet: present; independent device-level smoothness testing still required.
- Existing living-record contract suite: check output attached to implementation work record.
- Original lint command cannot find an ESLint v9 flat config in this checkout, so **do not report lint as passed**.
- Brand imagery rights, final accessibility, Core Web Vitals, claims/legal audit and real-device QA remain **open**.

## Release gate
Do not merge to `main` or automatically deploy to production. Additional gates: image rights, privacy/security accuracy, full marketing QA, accessibility, LCP/INP/CLS measurement, metadata/SEO tests and authenticated regression testing.
