# Softer public motion and How It Works refinement

Scope: retain the accepted homepage, imagery, route identities and footer. Refine timing throughout the public experience and partially redesign How It Works. Work directly on main.

## Research

The intended reference is https://lenis.dev/, not Lenister. Inspected the live opening and public structure, and read the official documentation at https://github.com/darkroomengineering/lenis/blob/main/README.md. Its relevant integration is one Lenis instance, a GSAP ticker feeding `raf`, and a scroll listener updating ScrollTrigger. The installed dependency already supports this; no dependency upgrade is needed.

Lenis input interpolation and custom scene damping must be budgeted together. A numeric ScrollTrigger scrub does not smooth direct style writes made from its `onUpdate` callback. How It Works also had a separate per-article state controller alongside the global director, which could change the same data attribute at different moments.

## Changes

- Use consistent desktop Lenis interpolation at 0.085 across public routes. Preserve native touch and reduced-motion behavior, and import the official Lenis CSS.
- Cap the custom scene filter at 110ms when Lenis is active, avoiding two long smoothing delays. Native input retains the scene's own 260–300ms filter.
- Broaden Career/Trust handoffs from 48% to 58% of each allocation and extend their desktop tracks from 650 to 730svh. Preserve ordinary scrolling and deterministic reverse travel; no snapping or wheel capture.
- Reduce secondary opening travel from 65 to 38px for titles and from 14% to 8% for media. Use 1.4s text and 1.5s media entrances with gentler easing.
- Slightly soften the homepage entrance and its existing scroll renderers, preserving the compositions and story.
- Remove How It Works' tilted photo and response-card arrangement. Its opening now separates the two-line title, explanatory copy, upright photograph and quiet response statement.
- Give How It Works one local, route-scoped driver. Measure the actual centers of the five explanation sections and derive the evidence state from those anchors, including holds and long, small-distance handoffs.
- Replace the floating word chips and crossed branch lines with readable response/context and model explanations. Replace the rotating miniature chart labels with horizontal weight rows whose text never scales with the bar.
- Remove the redundant mobile miniatures. Phones use a vertical explanation with a context photograph, actual frameworks and published weights. Reduced motion exposes the complete explanation without depending on the sticky display.

## Verification

Production compilation and focused lint run before publication. Existing unused-variable warnings in CinematicRoutes.jsx are outside this change. Visual verification must check all five How states, reverse scrolling, at least one horizontal Career transition, Home, Trust, and an exact phone-width opening. Do not infer motion quality from a build alone.
