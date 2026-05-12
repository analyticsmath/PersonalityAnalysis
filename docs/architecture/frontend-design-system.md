# Frontend design system (Phase 6)

This document describes the shared UI layer for the Personality Assessor frontend: tokens, reusable components, motion, and accessibility conventions.

## Tokens and theme

- **CSS variables** are defined in `frontend/src/styles/theme.css` (`:root`). Prefer these for layout, color, radius, and shadows in new CSS.
- **JS tokens** for charts and inline styles live in `frontend/src/theme/tokens.js` and `frontend/src/styles/designTokens.js`. Import via `frontend/src/styles/theme.js` when you need a single entry point.

Palette direction: deep navy / slate base, violet–cyan accents, amber for caution, rose/red for destructive states only.

## Shared components (`frontend/src/components/ui/`)

| Component | Role |
|-----------|------|
| `Button` | Primary actions; supports `loading` + `loadingLabel` (default `Saving…`). |
| `Card` | Glass panel with optional header; respects motion via `SlideUp`. |
| `Badge`, `StatusBadge`, `ConfidenceBadge` | Compact labels for states and confidence bands. |
| `SectionHeader` | Page title / subtitle / actions row. |
| `MetricCard` | Summary tiles (Result page “at a glance”). |
| `EmptyState`, `LoadingState`, `ErrorState` | Standard empty, loading, and retryable error patterns. |
| `ProgressStepper` | Read-only multi-step indicator (assessment start journey). |
| `Tooltip` | Thin wrapper using native `title` for lightweight hints. |

## Loading / empty / error

- Use **`LoadingState`** (or `Loader` inside a `Card`) for predictable spinners; avoid blank screens.
- Use **`EmptyState`** when there is legitimately no data (e.g. no session id).
- Use **`ErrorState`** with optional `onRetry` for retryable failures. Do not replace real API errors with fake success content.

## Motion

- Utilities: `frontend/src/utils/motion.js` (`getPrefersReducedMotion`, duration hints).
- Hook: `frontend/src/hooks/usePrefersReducedMotion.js` for components that are not already using Framer Motion’s `useReducedMotion`.
- **Rules:** no motion on text entry; keep entrance animations short; respect `prefers-reduced-motion` (see `App.js` scroll reveals, `AssessmentStartWizard`, `Loader`, chart `isAnimationActive`).
- Heavy 3D (`TraitSphere`) is **lazy-loaded** on the Result page behind `React.Suspense` to reduce initial assessment bundle cost.

## Accessibility

- **Semantic headings:** `SectionHeader` emits `h1` for full pages; keep a single logical `h1` per view.
- **Forms:** associate labels with `htmlFor` / `id`; auth forms use `aria-live` regions for errors/success.
- **Charts:** `ChartSummary` provides a textual description; radar charts set `aria-describedby` to that summary.
- **Focus:** global `:focus-visible` styles in `phase6-ui.css` for buttons and inputs.
- **Live regions:** `AccessibleStatus` for assessment status lines; assertive for errors, polite for progress.

## Imports

Global styles are loaded from `frontend/src/main.jsx`:

- `styles/theme.css`
- `styles/phase6-ui.css`

Optional JS barrel: `import { tokens, designTokens } from './styles/theme';`
