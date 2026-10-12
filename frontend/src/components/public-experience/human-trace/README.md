# The Human Trace — marketing homepage integration

## Scope
A DOM-first photographic homepage integrated into the existing React Router public route at `/`. The cinematic presentation uses a local shadow boundary to keep its styles isolated from the assessment app. Other public routes retain their existing shell, and authenticated/backend code is untouched.

## Creative foundation
Derived from Valtum Studio's Art Direction 08 integrated film: environmental opening → preserved source → interpretation → changing working conditions → career field → time comparison → provenance → reprise. Motion is scroll linked, reversible, and respects `prefers-reduced-motion`. All images are downloaded Unsplash photographs, not generated assets.

## Architecture
- `HumanTraceFilm.jsx`: mount/unmount integration, React Router navigation.
- `filmContent.js`: first-party static HTML and scoped CSS.
- `filmMotion.js`: deterministic DOM animation model and interaction lifecycle.
- `public/media/public-experience/cinematic/*.jpg`: nine production-local photographic source derivatives.
- `PublicExperienceLayout.jsx`: uses the existing shell for all other public routes.

The static markup is exclusively authored in the repository; it never interpolates user data. The shadow root is an intermediate compatibility boundary. Future iterations may migrate markup into first-class JSX for improved search indexing, accessibility instrumentation, and maintainability.

## Unsplash source audit
Each entry below was downloaded from the Unsplash image CDN. The IDs identify source photographs; linked files are compressed working derivatives, not proof of ownership, model release, or endorsement.

| CDN photo ID | Story use |
| --- | --- |
| 1503387762-592deb58ef4e | Opening / source reprise |
| 1649688066810-59a394fc0fef | Interpretation |
| 1645258044234-f4ba2655baf1 | Precision |
| 1742440710402-721332ea7898 | Autonomy / bridge / time |
| 1590649681928-4b179f773bd5 | Collaboration / time |
| 1554863798-d89af6030d7d | Pressure |
| 1576141546153-3e04370b5ff7 | Occupational investigation |
| 1745845289797-913815100704 | Source / provenance |
| 1759884247144-53d52c31f859 | Occupational design |

Asset origin template: `https://images.unsplash.com/photo-{ID}`. The project must retain precise photographer and licensing information for any final publication. Unsplash's general license does not separately clear identifiable individuals, logos, trademarks, or properties.

## Product claims
Photographs are illustrative and **do not depict assessed subjects**. A single response is a storytelling anchor, not a complete scored psychological profile. Career-fit weighting text corresponds to the backend's deterministic weighting. The product is not a clinical or diagnostic instrument.

## Validation (review branch)
- `npm run build` successful in the narrow source checkout, SEO assets generation successful.
- `npm run check:living-record`: nine tests passed.
- Chromium preview: 1440×900, 390×844, 430×932; 12/12 image instances loaded at each size; no page errors or horizontal overflow observed; drawer, Escape, career control, and `/signup` navigation tested.
- Existing font URLs absent in the narrow checkout and application JS bundle-size warnings remain to be resolved/verified with a full production checkout.
- ESLint 9 cannot run because this repository checkout provides no compatible `eslint.config`; do not count lint as passed.
- Manual photographic acceptance, mobile real-device smoothness, audits of other marketing routes, rights review, and SEO validation remain open.

## Deployment gate
Do not merge into `main` or production until the remaining public routes receive consistent art direction, image rights are reviewed, full-site QA is complete, and mobile accessibility/performance are accepted. This branch is for implementation review, not a final award-readiness claim.
