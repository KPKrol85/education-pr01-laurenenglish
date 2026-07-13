# PROJECT CONTEXT

You are a senior frontend developer working in the currently opened `education-pr01-laurenenglish` repository.

Read and follow the current repository state and authoritative documentation before editing, especially:

* `CONTEXT-PROJECT.md`
* `README.md`
* `INITIAL-AUDIT.md`
* `package.json`
* `playwright.config.mjs`
* `.gitignore`
* `docs/css-architecture.md`
* `docs/runtime-checklist.md`
* the canonical CSS source files
* the shared HTML shell and content renderers
* the existing project-local Playwright tests

Treat the current repository state as the source of truth.

Roadmap points 1–7 are complete. A permanent project-local Playwright workflow is now available and must be used for browser verification.

Implement only roadmap point 8:

> **Stabilize responsive layout and refine the educational UI hierarchy**

Do not implement roadmap points 9 or 10.

The original audit reported:

* a 702px document width at a 390px viewport
* horizontal viewport movement when a closed drawer link received focus
* an off-canvas drawer remaining outside the viewport
* crowded desktop navigation with wrapping labels
* repeated catalogue sections and similarly weighted cards on the homepage
* weak distinction between primary and secondary calls to action
* inconsistent visual hierarchy across pages

Some of this evidence may already have been resolved by roadmap points 1–7. Verify the current implementation before changing anything and do not fix issues that are no longer reproducible.

Preserve unrelated user-authored working-tree changes.

# TASK OBJECTIVE

Stabilize the responsive layout across the complete public website and refine its educational visual hierarchy without redesigning the Lauren English brand.

The completed implementation must:

* eliminate document-level horizontal overflow
* prevent clipping, overlap, and off-screen interactive content
* preserve accessible mobile drawer behavior
* prevent desktop navigation labels and actions from wrapping or colliding
* improve responsive typography, spacing, line length, and content rhythm
* establish a clearer hierarchy between primary, secondary, and supporting content
* normalize card and button importance
* reduce unnecessary homepage repetition
* keep canonical package and material data single-source
* preserve the established warm green educational direction
* preserve both accessible themes
* remain stable from narrow phones through large desktops

This is a focused responsive and hierarchy refinement task, not a visual redesign.

# IMPLEMENTATION PLAN

## 1. Inspect the current implementation

Inspect the complete current diff and relevant source files before editing.

At minimum, review:

* `scripts/shared-shell.mjs`
* `scripts/build-html.mjs`
* `scripts/content-renderers.mjs`
* the five primary page sources
* `css/tokens/tokens.css`
* `css/base/`
* `css/utilities/`
* `css/components/navigation.css`
* `css/components/buttons.css`
* `css/components/cards.css`
* relevant section and page CSS
* existing responsive Playwright tests

Confirm the current completion state in `INITIAL-AUDIT.md`.

Do not assume the original audit evidence is still valid.

## 2. Establish a browser baseline

Use the existing project-local Playwright workflow.

Verify all five primary pages at:

* 320px
* 390px
* 768px
* 1024px
* 1440px

Check representative pages in both light and dark themes where visual hierarchy or component boundaries could differ.

Record confirmed issues before editing.

Do not create temporary Playwright scripts under `C:\tmp`.

## 3. Eliminate horizontal overflow

Identify the real source of any document-level overflow.

Inspect:

* off-canvas navigation positioning
* fixed and absolute elements
* transforms
* intrinsic flex and grid sizing
* long labels and unbroken content
* media dimensions
* card minimum widths
* CTA groups
* page padding and container calculations

Correct the source of overflow instead of hiding it globally.

Use appropriate techniques such as:

* `min-width: 0`
* `minmax(0, 1fr)`
* safe wrapping
* responsive stacking
* contained transforms
* viewport-safe drawer sizing
* intrinsic media containment

Do not use a global `overflow-x: hidden` workaround unless the real overflow source has first been corrected and the remaining rule is demonstrably appropriate.

Ensure focusing any interactive element cannot shift the document horizontally.

## 4. Stabilize mobile navigation

Preserve the established accessible drawer contracts:

* closed drawer content is not keyboard-focusable
* the drawer opens fully inside the viewport
* the drawer has an opaque semantic surface
* drawer content can scroll vertically where required
* focus is trapped while open
* Escape closes the drawer
* focus returns to the trigger
* synchronized theme controls remain usable
* no drawer content overlaps or leaks onto the page
* no fixed element expands the document width

Test the drawer at 320px and 390px, including enlarged text and long navigation labels where practical.

## 5. Refine desktop header composition

Measure the real width needed by:

* logo
* navigation labels
* current-page state
* theme control
* primary CTA
* menu spacing

Choose a deliberate navigation transition based on actual content width.

Switch to the mobile navigation composition before desktop navigation labels begin wrapping, colliding, or becoming cramped.

Do not:

* remove navigation destinations
* shorten labels without a content reason
* reduce text to an uncomfortably small size
* add multiple narrowly spaced breakpoints

Reuse the current breakpoint system where possible. Add or adjust a breakpoint only when real content measurements justify it.

## 6. Refine containers and readable line lengths

Ensure narrow screens retain safe page-edge spacing.

Ensure larger screens do not create excessively stretched layouts.

Refine readable measures for:

* hero copy
* section introductions
* body paragraphs
* form guidance
* card descriptions
* progress explanations
* unavailable or status messages

Use the existing token system.

Add or adjust semantic layout tokens only when the value is genuinely reusable across multiple areas.

## 7. Refine typography and spacing rhythm

Do not change the font family during this task.

Keep Inter as the current project font.

Refine the existing responsive type scale only where the current hierarchy is weak.

Preserve semantic heading order.

Improve vertical rhythm between:

* page headers and content
* section headings and introductions
* card groups
* form groups
* CTA groups
* hero content and following sections
* final content sections and footer

Prefer existing spacing and typography tokens over raw values.

## 8. Refine homepage hierarchy

Review the homepage as a complete learning-oriented journey.

It should clearly communicate:

1. the primary educational proposition
2. the main learning or service value
3. a representative offer
4. supporting materials or progress context
5. one clear next action

Identify full catalogue content that is already available on dedicated pages.

Reduce repetition conservatively by rendering curated representative items where appropriate.

Use existing canonical data, featured flags, renderers, and destination links.

Do not create a second package or material data source.

Do not remove essential educational context merely to shorten the page.

## 9. Normalize CTA hierarchy

Review all major CTA groups.

Establish a consistent hierarchy:

* one dominant primary action per major context
* secondary actions with reduced visual weight
* tertiary or informational links using quiet treatment

Ensure:

* labels remain readable at 320px
* CTA groups stack or wrap before becoming cramped
* buttons do not overflow their containers
* touch targets remain comfortable
* disabled and unavailable states remain clear
* both themes preserve contrast and hierarchy

Reuse the existing button component system rather than creating many new variants.

## 10. Normalize card hierarchy

Review cards across:

* services
* packages
* materials
* progress
* educational/editorial content
* contact and unavailable states

Improve distinction between:

* featured cards
* standard cards
* informational cards
* unavailable or disabled cards

Ensure card grids:

* remain contained at all required widths
* collapse predictably
* do not use minimum widths that force overflow
* preserve consistent internal spacing
* use clear heading and action hierarchy
* do not all compete with equal visual weight

Reuse established card variants.

Avoid creating near-duplicate component classes.

## 11. Align secondary pages

Verify that all primary and secondary public pages share a coherent baseline for:

* page-header spacing
* content width
* heading hierarchy
* section spacing
* card treatment
* form treatment
* CTA hierarchy
* footer spacing

Do not redesign or expand page content outside the needs of point 8.

## 12. Preserve existing guarantees

Do not regress:

* keyboard navigation
* visible focus
* `aria-current`
* `aria-expanded`
* `aria-hidden`
* `inert`
* focus trapping and restoration
* progressive enhancement
* JavaScript-disabled content visibility
* storage failure handling
* reduced-motion behavior
* light and dark theme contrast
* canonical package and material rendering
* production build determinism
* PWA behavior

## 13. Update focused Playwright coverage

Extend the existing project-local Playwright suite only where required for point 8.

Add or refine deterministic checks for:

* document width not exceeding viewport width
* no horizontal scrolling
* no focus-triggered viewport movement
* header controls remaining visible
* desktop navigation labels not wrapping or colliding
* mobile drawer containment
* closed drawer focus safety
* CTA visibility and wrapping
* representative card-grid containment

Test the required widths:

* 320px
* 390px
* 768px
* 1024px
* 1440px

Use semantic locators and observable state.

Do not add pixel-perfect screenshot assertions.

Do not recreate the previous temporary browser harness.

Capture review screenshots through the existing workflow only where useful, without committing unstable baselines.

## 14. Build and verify

After source changes:

1. regenerate shared HTML through the existing build commands
2. regenerate production CSS, JavaScript, and service-worker output
3. verify generated HTML idempotence
4. run all existing static checks
5. run the complete Playwright suite
6. run the focused responsive suite

Run at minimum:

* `npm run build`
* `npm run check:data`
* `npm run check:content`
* `npm run check:html`
* `npm run check:css`
* `npm run test:e2e`
* `npm run test:e2e:responsive`
* relevant JavaScript syntax checks
* relevant Prettier checks
* `git diff --check`

Use the real scripts currently defined in `package.json`.

Do not report a command as passing unless it was actually executed.

Perform one complete browser verification pass after implementation.

A single targeted rerun is allowed after a confirmed product defect is corrected.

Do not repeatedly rewrite or debug the test harness. If the project-local Playwright infrastructure fails twice for the same environment reason, stop and report the blocker.

## 15. Update the roadmap

Only after all acceptance criteria pass:

* mark roadmap point 8 as `[x]`
* leave points 9 and 10 unchecked
* do not modify unrelated roadmap items

If browser verification is incomplete or blocked, leave point 8 unchecked.

# CONSTRAINTS

* Do not redesign the Lauren English brand.
* Preserve the warm green educational direction.
* Do not change the font family.
* Do not introduce a serif heading font yet.
* Do not introduce Vite.
* Do not replace the current production build pipeline.
* Do not implement roadmap points 9 or 10.
* Do not implement the separate localhost port `8181` source-preview workflow.
* Do not rebuild the Playwright workflow from scratch.
* Do not create temporary test harnesses outside the repository.
* Do not use machine-specific absolute paths.
* Do not add a CSS framework or component library.
* Do not add broad decorative animation.
* Do not add new marketing claims, testimonials, legal text, contact details, prices, or guarantees.
* Do not duplicate package or material data.
* Do not manually edit generated HTML or minified assets.
* Edit canonical source files and regenerate outputs.
* Do not introduce inline styles.
* Do not use styling IDs.
* Do not introduce unnecessary `!important`.
* Do not introduce deep contextual selectors when a component class is appropriate.
* Do not hide essential content as an overflow workaround.
* Do not reduce text to an unreadable size to make navigation fit.
* Do not create many narrowly spaced breakpoints.
* Do not perform unrelated refactors.
* Preserve unrelated working-tree changes.
* Keep the final diff focused and reviewable.

# TECHNICAL RULES

* Follow the existing token-first CSS architecture.
* Preserve the established CSS import and layer order.
* Use BEM-style component classes.
* Keep selector specificity low.
* Prefer semantic tokens over raw colors, spacing, radii, shadows, and typography values.
* Use fluid sizing only where it improves actual responsive behavior.
* Use safe flex and grid sizing.
* Use responsive stacking before controls become compressed.
* Keep touch targets comfortably usable.
* Preserve semantic HTML and heading order.
* Preserve visible keyboard focus.
* Preserve all current ARIA and focus-management contracts.
* Preserve synchronized theme controls.
* Preserve no-JavaScript content visibility.
* Use only the permanent project-local Playwright configuration and tests.
* Use semantic browser locators.
* Avoid arbitrary timeout-based waits.
* Keep browser checks focused on observable responsive behavior.
* Do not duplicate complete static validation already handled by Node scripts.
* Update documentation only where the maintained responsive system or component hierarchy genuinely changes.
* Report only verification genuinely performed.

Acceptance criteria:

* no document-level horizontal overflow at 320, 390, 768, 1024, or 1440px
* no focus-triggered horizontal movement
* no clipping or unintended overlap
* mobile drawer remains contained, scrollable, focus-safe, and fully usable
* closed mobile navigation cannot receive focus
* desktop navigation labels do not wrap or collide
* navigation changes composition before available width becomes insufficient
* header controls remain readable and usable
* CTAs remain visible, readable, and correctly prioritized
* CTA groups wrap or stack before becoming cramped
* card grids remain contained and predictable
* text measures remain readable
* narrow layouts retain safe page-edge spacing
* large layouts do not become excessively stretched
* homepage repetition is reduced without removing essential educational context
* canonical package and material data remain single-source
* shared page hierarchy and spacing remain coherent
* light and dark themes retain accessible contrast
* keyboard, focus, progressive enhancement, and reduced-motion behavior remain intact
* production build and static checks pass
* complete project-local Playwright tests pass
* focused responsive tests pass
* only roadmap point 8 is marked `[x]`
* points 9 and 10 remain unchecked

# OUTPUT EXPECTATION

Return a concise final report containing:

* documentation and source files inspected
* original audit evidence reproduced
* original evidence that was no longer reproducible
* confirmed responsive problems
* navigation and breakpoint decisions
* mobile drawer changes and verification
* container and line-length refinements
* typography and spacing refinements
* CTA hierarchy refinements
* card hierarchy refinements
* homepage content reductions
* canonical data or renderer changes, if any
* secondary-page consistency improvements
* files changed
* generated files rebuilt
* Playwright tests added or updated
* viewport and theme combinations tested
* horizontal-overflow result for each required viewport width
* keyboard and off-screen-focus results
* console, page-error, request, and HTTP results
* static checks executed
* browser checks executed
* confirmation that no temporary external test harness was created
* confirmation that unrelated working-tree changes were preserved
* confirmation that only roadmap point 8 was marked `[x]`
* confirmation that points 9 and 10 remain unchecked
* any blocker that prevented full acceptance

Do not include unrelated recommendations.
