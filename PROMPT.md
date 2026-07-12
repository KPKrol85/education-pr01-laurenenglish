PROJECT CONTEXT

You are a senior design-systems and accessibility-focused frontend developer completing roadmap point 7 in the Lauren English project.

You are working in the currently opened `education-pr01-laurenenglish` project.

Read and follow the existing project documentation before continuing, especially:

* `CONTEXT-PROJECT.md`
* `INITIAL-AUDIT.md`
* `README.md`
* `docs/css-architecture.md`
* `docs/runtime-checklist.md`
* any focused token, theme, CSS-quality, or accessibility documentation already present

Treat `CONTEXT-PROJECT.md` as the authoritative project context.

Roadmap point 7 has already been implemented at canonical source level.

The current implementation reportedly includes:

* explicit light- and dark-theme semantic tokens for:

  * surfaces
  * controls
  * disabled states
  * success and premium states
  * focus rings
  * primary text
* removal of repeated raw component colors
* consolidation of duplicate accessibility utilities
* removal of avoidable contextual selectors
* improved focus, disabled, navigation, form, badge, progress, card, hero, and accordion states
* deterministic CSS architecture and WCAG contrast checks
* regenerated `assets/build/style.min.css`
* updated CSS architecture, runtime, and README documentation

Completed verification reportedly includes:

* `npm run check:css`
* 25 CSS files inspected
* 18 dual-theme semantic tokens validated
* 40 contrast pairs validated
* minimum `4.04:1` contrast for tested non-text boundaries
* `npm run build`
* `npm run check:data`
* `npm run check:content`
* `npm run check:html`
* generated HTML idempotence across all five primary pages
* generated JavaScript syntax checks
* relevant Prettier checks
* `git diff --check`

Roadmap point 7 remains unchecked only because the required Playwright light/dark browser matrix and screenshot inspection could not run after the previous Codex usage allowance was exhausted.

The unrelated user-authored `PROMPT.md` modification must remain unchanged and must not be included in roadmap point 7 verification or change claims.

TASK OBJECTIVE

Continue roadmap point 7 from the exact current working-tree state.

First inspect and verify the existing implementation and complete diff.

Do not restart, redesign, or broadly refactor the token and theme work.

Complete the missing real-browser verification for both themes across representative viewport sizes.

If browser verification exposes a defect directly related to roadmap point 7, apply the smallest safe canonical source-level correction, rebuild affected outputs, and rerun every affected check.

Mark only roadmap point 7 as completed in `INITIAL-AUDIT.md` after every applicable static and browser acceptance criterion passes.

IMPLEMENTATION PLAN

1. Inspect the complete current working-tree diff before editing.
2. Identify all roadmap-point-7 source and documentation changes.
3. Confirm that the current implementation preserves:

   * the CSS layer order
   * token-first architecture
   * semantic light- and dark-theme values
   * low-specificity selectors
   * BEM-compatible component naming
   * consolidated accessibility utilities
   * theme-aware hero and progress-hero surfaces
4. Preserve the unrelated `PROMPT.md` modification exactly.
5. Do not modify unrelated user-authored changes.
6. Re-run the existing static verification:

   * `npm run check:css`
   * `npm run check:data`
   * `npm run check:content`
   * `npm run build:html`
   * `npm run check:html`
   * `npm run build`
   * relevant generated JavaScript syntax checks
   * relevant Prettier checks
   * `git diff --check`
7. Confirm HTML assembly remains deterministic and idempotent.
8. Start the project using the documented local verification server.
9. Use fresh Playwright Chromium contexts and the latest generated assets.
10. Clear or isolate:

    * service workers
    * Cache Storage
    * local storage
    * session storage
    * stale theme state
11. Test all five primary pages:

    * `index.html`
    * `uslugi.html`
    * `pakiety.html`
    * `materialy.html`
    * `postepy.html`
12. Test these viewport sizes:

    * desktop: `1440 × 900`
    * compact desktop/tablet: `1024 × 768`
    * mobile: `390 × 844`
13. Test both:

    * light theme
    * dark theme
14. Verify theme initialization:

    * default theme loads consistently
    * theme toggle updates the document state
    * `aria-pressed` remains accurate
    * persisted theme restores correctly
    * no visible flash leaves text unreadable against the wrong surface
15. Inspect representative screenshots for:

    * homepage hero
    * progress-page hero
    * desktop and mobile navigation
    * package cards
    * material cards
    * contact unavailable state and form-related surfaces
    * badges and access labels
    * accordions
    * homepage tabs
    * focus-visible states
16. Verify the homepage hero in both themes:

    * background and gradient use theme-aware semantic values
    * heading and supporting text remain readable
    * hero image, media frame, cards, and overlays remain visually distinct
    * no light-on-light or dark-on-dark text combination occurs
17. Verify the progress hero in both themes:

    * background and text remain readable
    * status and progress surfaces remain distinguishable
18. Verify navigation states:

    * default
    * hover
    * focus-visible
    * active
    * current page
    * mobile drawer
    * theme control
19. Verify forms and unavailable-contact states:

    * surface
    * text
    * muted text
    * border
    * disabled state
    * focus indicator
20. Verify component states:

    * cards
    * badges
    * premium and free access states
    * progress controls
    * accordion controls
    * tabs
    * disabled controls
21. Verify status and access meaning is not communicated by color alone.
22. Re-run or confirm deterministic contrast calculations for all affected semantic pairs.
23. Confirm applicable text and control-state contrast meets WCAG AA.
24. Confirm focus indicators remain clearly visible against all tested light and dark surfaces.
25. Confirm raw colors outside the token layer are:

    * intentional
    * rare
    * documented by the existing CSS-quality rules
26. Confirm:

    * no new ID selectors
    * no unnecessary `!important`
    * no deep selector chains
    * no new arbitrary breakpoints
    * no duplicated visually-hidden or skip-link implementations
27. Confirm previous roadmap guarantees remain intact:

    * keyboard navigation
    * focus containment and return
    * ARIA synchronization
    * progressive enhancement
    * no-JavaScript content visibility
    * canonical package and material rendering
    * public-content integrity
28. Record:

    * console errors
    * uncaught page errors
    * failed requests
    * unexpected HTTP responses
    * broken local links
    * visual regressions directly caused by point 7
29. If browser verification exposes a roadmap-point-7 defect:

    * identify the canonical CSS or minimal HTML source
    * apply only the smallest safe correction
    * do not redesign the component
    * rebuild generated output
    * rerun every affected theme, viewport, contrast, and regression check
30. Attempt `npm run lint:js` only to confirm the existing ESLint 9 missing-configuration blocker.
31. Do not repair or expand ESLint configuration during this task.
32. After all applicable acceptance criteria pass:

    * change only roadmap point 7 in `INITIAL-AUDIT.md` from `[ ]` to `[x]`
    * confirm roadmap points 8–10 remain unchecked
33. Stop the local verification server after testing.

CONSTRAINTS

* Do not restart roadmap point 7 from scratch.
* Do not redesign the Lauren English brand.
* Do not replace the established color palette.
* Do not perform broad visual polish.
* Do not perform the responsive-layout work assigned to roadmap point 8.
* Do not introduce Vite.
* Do not introduce dependencies, CSS frameworks, preprocessors, or design-system libraries.
* Do not create unnecessary tokens for isolated values.
* Do not rename the complete existing token API.
* Do not introduce arbitrary breakpoints.
* Do not add ID selectors for styling.
* Do not add unnecessary `!important`.
* Do not add deep descendant selectors.
* Do not undo completed accessibility utility consolidation.
* Do not modify canonical package, material, access, legal, or public-content data.
* Do not manually edit generated HTML, minified CSS, minified JavaScript, or generated service-worker output.
* Do not modify the unrelated `PROMPT.md` change.
* Do not repair the existing ESLint 9 configuration blocker.
* Do not mark roadmap point 7 complete if required browser or screenshot verification remains blocked.
* Do not mark any other roadmap point complete.
* Keep any required correction minimal, canonical, and review-friendly.

TECHNICAL RULES

* Preserve the CSS layer order:

  * tokens
  * base
  * utilities
  * components
  * sections
  * pages
* Use existing semantic tokens whenever they already express the intended role.
* Every themed semantic surface must have intentional light and dark values.
* Components must consume semantic tokens instead of fixed theme-specific colors where practical.
* Raw colors outside the token layer must remain documented exceptions.
* Preserve BEM-style naming.
* Preserve low selector specificity.
* Preserve mobile-first CSS.
* Preserve existing breakpoint values.
* Use existing state classes and `:focus-visible` behavior.
* Normal text must meet WCAG AA contrast where applicable.
* Large text must meet WCAG AA contrast where applicable.
* Interactive boundaries and focus states must remain perceptible.
* Disabled states must remain understandable without appearing active.
* Status and access meaning must not rely on color alone.
* Browser verification must use current generated assets and fresh contexts.
* Report only verification actually performed.

OUTPUT EXPECTATION

Return a concise completion report with:

* current diff inspected
* existing roadmap-point-7 implementation verified
* documentation and CSS files inspected
* unrelated `PROMPT.md` change preserved
* files changed during final correction, if any
* static commands executed
* `check:css` and contrast results
* production build result
* generated-output idempotence result
* browser tooling used
* pages, viewport sizes, and themes tested
* homepage hero light/dark result
* progress-hero light/dark result
* navigation, card, form, badge, access, disabled, and focus-state results
* screenshot or visual-regression result
* WCAG contrast verification method and result
* raw-color exception result
* selector, utility, layer-order, and BEM checks
* keyboard, focus, ARIA, and progressive-enhancement regression results
* console, page-error, network, HTTP, and link results
* ESLint blocker status
* confirmation that roadmap point 7 was marked complete, if all checks passed
* confirmation that roadmap points 8–10 remain unchecked
* any remaining blocker or unresolved contrast case

Do not include unrelated recommendations.
