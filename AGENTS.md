# Machinery Genius Frontend Development Rules

## Safety and data accuracy
- Never invent machine dimensions, weights, model numbers, electrical values, lifting points, or rigging instructions.
- Label database, user-supplied, estimated, and unavailable data clearly.
- A gray AR block is a size representation, not an exact machine shape.
- Do not imply that AR is a certified site survey, floor-load analysis, engineering review, or rigging plan.

## Will It Fit
- Build mobile-first for Android Chrome and iPhone Safari.
- Use GLB/glTF with one model unit equal to one meter.
- Keep the scale fixed in AR.
- Prefer `@google/model-viewer` for the MVP.
- Never launch AR until positive width, depth, and height have been confirmed by the user.
- Always show the planning-aid warning.

## Development
- Work on feature branches; do not deploy or merge without approval.
- Follow existing Vue 3, TypeScript, Vite, Tailwind, Pinia, router, and service patterns.
- Do not add paid external services without approval.
- Run type-check and production build before requesting merge.
