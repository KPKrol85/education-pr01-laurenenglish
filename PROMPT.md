## PROMPT - CODEX

You are a senior frontend performance and PWA developer working on the Lauren English project.

# PROJECT CONTEXT

You are working in the currently opened `education-pr01-laurenenglish` repository.

Read and follow the current repository state and authoritative documentation before editing, especially:

* `CONTEXT-PROJECT.md`
* `README.md`
* `INITIAL-AUDIT.md`
* `package.json`
* `playwright.config.mjs`
* `manifest.webmanifest`
* `service-worker.template.js`
* generated `service-worker.js`
* `offline.html`
* `scripts/site-config.mjs`
* current build and asset-generation scripts
* `docs/runtime-checklist.md`
* existing project-local Playwright tests

Treat the current repository state as the source of truth.

Roadmap points 1–9 are complete. Point 9 established intentional static routing, real HTTP 404 behavior, centralized public-site configuration, deterministic SEO checks, and successful-response-only navigation caching.

Implement only roadmap point 10:

> **Harden PWA lifecycle, offline behavior, and performance-critical assets**

Do not reimplement completed routing or SEO work. Preserve the real online `404` behavior introduced in point 9.

The original audit reported:

* precache entries referencing missing production assets
* unsafe activation cleanup deleting every origin cache except the current cache
* unsuitable responses being stored without adequate validation
* a service-worker version differing from `package.json`
* a lazy-loaded above-the-fold hero image
* four shipped font weights without confirmed justification
* unverified manifest icons and installability prerequisites

Some findings may already have been corrected during points 1–9. Reproduce and confirm the current behavior before changing it.

A permanent project-local Playwright workflow exists. Use it for browser verification.

Do not create temporary test harnesses under `C:\tmp`.

Preserve unrelated user-authored working-tree changes, including `PROMPT.md`.

# TASK OBJECTIVE

Create a safe, deterministic, and maintainable PWA lifecycle for Lauren English.

The completed implementation must:

* install the service worker successfully from a valid precache manifest
* create only intentional Lauren English caches
* preserve caches belonging to unrelated applications on the same origin
* cache only suitable successful responses
* preserve real online `404` behavior
* provide an intentional offline navigation fallback
* update cached assets predictably when production output changes
* keep generated service-worker metadata synchronized with the build
* verify manifest and icon prerequisites
* prioritize the above-the-fold LCP image
* load only justified font assets and weights
* preserve accessibility, routing, SEO, themes, and progressive enhancement
* provide permanent static and Playwright verification for PWA behavior

This is a focused lifecycle, offline, and performance-critical asset task. Do not redesign the application.

# IMPLEMENTATION PLAN

1. Inspect the current PWA and asset architecture before editing.

   Review at minimum:

   * `service-worker.template.js`
   * generated `service-worker.js`
   * the script that generates the service worker
   * `package.json`
   * `manifest.webmanifest`
   * `offline.html`
   * the five primary HTML pages
   * shared HTML generation sources
   * hero image markup and source asset
   * all `@font-face` declarations
   * `assets/fonts/`
   * `assets/icons/`
   * production CSS and JavaScript output paths
   * existing Playwright runtime helpers and test suites

2. Record the current state before implementation:

   * current cache names and prefixes
   * current cache version source
   * current precache entries
   * missing or stale precache entries
   * install, activate, fetch, and message lifecycle behavior
   * navigation fallback behavior
   * static asset runtime strategy
   * response eligibility checks
   * manifest fields and icon declarations
   * registered font files and weights
   * actual font weights used by rendered UI
   * hero image loading attributes
   * current critical asset request pattern

3. Verify which original audit findings remain reproducible.

   Do not modify behavior that is already correct.

4. Establish one explicit Lauren English cache namespace.

   Use a stable project-specific prefix, such as the existing project cache prefix if one is already established.

   All caches created by this service worker must use that prefix.

5. Correct activation cleanup.

   During activation:

   * delete only obsolete caches whose names belong to the Lauren English prefix
   * preserve the currently active Lauren English caches
   * preserve unrelated cache names on the same origin
   * do not call broad cache deletion against every non-current cache
   * keep cleanup deterministic and testable

6. Repair and validate the precache contract.

   Build the precache list from the real generated runtime contract.

   Ensure every precached path:

   * exists after a production build
   * is served successfully
   * uses the correct public path
   * is intentionally required for shell or offline behavior
   * does not duplicate another normalized entry
   * does not reference obsolete source or output locations

   Include only justified assets, such as:

   * primary document routes where required by the selected offline strategy
   * `offline.html`
   * production CSS
   * production JavaScript
   * required local fonts
   * required manifest icons
   * essential above-the-fold assets where appropriate

   Do not precache unrelated catalogue images or every available asset without a demonstrated offline requirement.

7. Add a deterministic build-time precache validation step.

   The production build must fail clearly when:

   * a configured precache file is missing
   * a duplicate normalized entry exists
   * a source-only development asset is referenced
   * an obsolete production path is referenced

   Do not depend on runtime `cache.addAll()` failure as the first validation mechanism.

8. Implement deterministic cache revisioning.

   Do not manually maintain a version literal independently in:

   * `package.json`
   * the service-worker template
   * generated `service-worker.js`

   Generate the final cache revision through the existing build pipeline.

   Use a deterministic value based on the current package version and/or a stable fingerprint of the generated precache contract.

   Requirements:

   * identical production inputs produce the same revision
   * changed precached output produces a new revision
   * current date or build time is not used as the revision source
   * the generated service worker contains the generated revision
   * documentation explains the update mechanism

9. Define the service-worker install and activation behavior clearly.

   Verify and implement as appropriate:

   * successful precache population before install completion
   * controlled use of `skipWaiting`
   * controlled use of `clients.claim`
   * cleanup after activation
   * predictable behavior when a new worker is waiting
   * no partially populated active cache

   Preserve an existing correct strategy when it already meets the requirements.

   Do not introduce a complex update-notification interface unless one already exists.

10. Harden response-cache eligibility.

    Cache only responses that are appropriate for the selected strategy.

    At minimum, reject:

    * failed responses
    * `4xx` and `5xx` responses
    * partial `206` responses
    * non-GET requests
    * unsupported URL schemes
    * unintended cross-origin requests
    * opaque responses unless an explicit existing requirement justifies them
    * utility error documents stored as successful page content

    Keep eligibility logic focused and reusable rather than duplicating conditions across handlers.

11. Define navigation behavior.

    Preserve point-9 routing semantics:

    * successful online primary navigation returns the real page
    * an online unknown route remains a real HTTP `404`
    * the service worker must not replace online unknown routes with the homepage
    * the service worker must not convert a `404` into a cached `200`
    * failed network navigation while offline uses the documented offline fallback
    * cached successful navigation may be used only according to the selected documented strategy
    * `offline.html` is never presented as a normal indexable online route

12. Define static asset runtime behavior.

    Use an appropriate focused strategy for same-origin production assets.

    Ensure:

    * successful intended assets may be reused offline
    * failed asset responses are not cached
    * requests with query strings do not create uncontrolled duplicate entries
    * old runtime entries do not grow without bounds
    * source CSS and JavaScript files are not requested by production pages
    * generated CSS and JavaScript remain the runtime contract

    Do not add a service-worker library or Workbox dependency.

13. Verify offline behavior for all primary pages.

    Test the documented policy for:

    * homepage
    * services
    * packages
    * materials
    * progress

    Confirm both:

    * normal online navigation
    * behavior after the network becomes unavailable

    If the selected strategy intentionally returns `offline.html` rather than each exact page, assert that behavior explicitly.

14. Verify failed responses are not cached.

    Include deterministic tests proving that:

    * an unknown online route returns `404`
    * the unknown response is not inserted into a successful navigation cache
    * a failed asset request is not cached
    * a later valid response is not shadowed by a previously cached failure

15. Verify cache cleanup scope.

    Add a test that creates:

    * an old Lauren English cache
    * the current Lauren English cache
    * an unrelated sentinel cache

    After activation or equivalent lifecycle verification:

    * the old Lauren English cache is removed
    * the current cache remains
    * the unrelated sentinel cache remains

16. Inspect and correct the web app manifest.

    Validate at minimum:

    * valid JSON
    * `name`
    * `short_name`
    * `id`
    * `start_url`
    * `scope`
    * `display`
    * `theme_color`
    * `background_color`
    * `lang`
    * icon paths
    * icon MIME types
    * declared icon dimensions
    * icon files actually exist
    * icon files match declared dimensions
    * at least the required installability icon sizes are available
    * maskable purpose is declared only for an icon with appropriate safe padding

    Keep manifest URLs consistent with the current static deployment and authoritative origin model.

    Do not add unsupported screenshots, shortcuts, categories, or promotional metadata merely to make the manifest larger.

17. Verify installability prerequisites locally.

    Through the existing localhost Playwright server, verify:

    * the manifest link loads
    * the manifest parses
    * declared icons load successfully
    * the page is served in a secure localhost context
    * service-worker registration succeeds
    * `navigator.serviceWorker.ready` resolves
    * the worker controls the page after the required reload
    * the worker reaches the expected active state
    * the current project cache is created

    Do not claim that a browser install prompt or external deployment installability was verified unless it was genuinely tested.

18. Correct the hero/LCP asset behavior.

    Inspect the actual above-the-fold hero image.

    Ensure:

    * it is not marked `loading="lazy"`
    * it uses `loading="eager"` or the appropriate default
    * it has an appropriate `fetchpriority`
    * explicit width and height are present
    * intrinsic aspect ratio is preserved
    * decoding behavior is intentional
    * the image does not cause layout shift
    * the asset is not downloaded more than once
    * mobile and desktop layouts do not request unnecessary duplicate variants

    Preserve the existing approved image and design.

    Do not redesign the hero.

19. Audit font delivery.

    Inspect all local Inter files, `@font-face` declarations, `font-weight` usage, and browser requests.

    For every shipped weight:

    * confirm that the production UI actually uses it
    * confirm that the corresponding font file is referenced correctly
    * remove it from runtime delivery only when it is genuinely unused
    * preserve it when removal would cause synthetic or incorrect typography

    Ensure:

    * `font-display` has an appropriate non-blocking value
    * only production font formats are requested
    * no missing font request occurs
    * no duplicate weight declaration exists
    * preload is used only for truly critical font files
    * not every font file is preloaded
    * theme changes do not request additional font variants

    Do not change the font family during this task.

20. Establish a focused critical-asset budget.

    Document and validate a practical request budget based on the corrected production homepage.

    At minimum, track:

    * number of production CSS files requested
    * number of production JavaScript files requested
    * number of initial font files requested
    * number of above-the-fold hero image requests
    * absence of source CSS and JavaScript requests
    * absence of duplicate critical asset requests
    * total sizes of the hero image and font files where deterministically available

    Base limits on the real corrected implementation.

    Do not invent a broad Lighthouse score requirement.

    Do not add Lighthouse, WebPageTest, or another large dependency.

21. Add or extend a deterministic static PWA check.

    Add a focused project-local script such as `scripts/check-pwa.mjs` if no equivalent exists.

    Validate at minimum:

    * service-worker template placeholders are resolved in generated output
    * generated cache revision matches the current build contract
    * all precache entries exist
    * precache entries are unique
    * cache prefix is project-specific
    * cleanup code is prefix-scoped
    * unsupported failed responses cannot pass the cache-eligibility condition
    * manifest JSON is valid
    * required manifest fields exist
    * declared icons exist and match their declared dimensions
    * hero image is not lazy-loaded
    * hero image has explicit dimensions
    * font files referenced by CSS exist
    * no obsolete source build paths remain
    * generated service worker does not contain an independently maintained stale version

    Add an npm script such as:

    * `check:pwa`

    Integrate it into the current verification workflow where appropriate.

22. Add focused permanent Playwright PWA tests.

    Add a project-local specification such as:

    * `tests/e2e/pwa.spec.mjs`

    Add an npm command such as:

    * `test:e2e:pwa`

    Reuse the current Playwright server, diagnostics, and project helpers.

    The focused suite should verify:

    * service-worker registration
    * active worker state
    * controlled page after reload
    * expected Lauren English cache creation
    * successful online primary routes
    * documented offline navigation behavior
    * real online unknown-route `404`
    * failed responses are not cached
    * old project-cache cleanup
    * preservation of unrelated cache
    * manifest response and required fields
    * icon response status and dimensions
    * hero image loading attributes
    * actual font requests
    * absence of duplicate critical asset requests
    * absence of source CSS or JavaScript requests

    Use deterministic browser state and semantic assertions.

    Service-worker tests must use isolated contexts and clean up caches and registrations they create.

    Do not weaken the normal E2E service-worker isolation used by unrelated suites.

23. Preserve the established production and SEO behavior.

    Re-run point-9 routing assertions and confirm:

    * primary routes return `200`
    * unknown routes return `404`
    * the service worker does not mask online `404` responses
    * sitemap, robots, canonical, and utility-page behavior remain unchanged

24. Update documentation.

    Update `docs/runtime-checklist.md` and any directly relevant README section with:

    * production build command
    * generated service-worker contract
    * cache prefix and revision strategy
    * install and update lifecycle
    * offline navigation policy
    * cache cleanup scope
    * response eligibility policy
    * manifest and icon verification
    * hero/LCP policy
    * justified font weights
    * critical asset budget
    * `check:pwa`
    * `test:e2e:pwa`
    * manual post-deployment verification steps

    Keep documentation aligned with the implementation.

25. Build and verify.

    Run the real current project scripts, including at minimum:

    * `npm run build`
    * `npm run check:data`
    * `npm run check:content`
    * `npm run check:html`
    * `npm run check:css`
    * `npm run check:seo`
    * `npm run check:pwa`
    * `npm run test:e2e:pwa`
    * `npm run test:e2e:seo`
    * `npm run test:e2e`
    * relevant `node --check` commands
    * relevant Prettier checks
    * `git diff --check`

    Verify the final build is deterministic and HTML generation remains idempotent.

    Perform one complete PWA verification pass after implementation.

    Allow at most one targeted rerun after a confirmed product defect is corrected.

    Do not repeatedly rebuild or rewrite the test harness.

    If the permanent Playwright infrastructure fails twice for the same environmental reason, stop and report the blocker.

26. Update the roadmap only after full acceptance.

    When all required static, browser, offline, and lifecycle checks pass:

    * mark roadmap point 10 as `[x]`
    * do not modify completion states for points 1–9
    * do not mark completion if service-worker or offline verification remains blocked

# CONSTRAINTS

* Do not redesign the application.
* Do not change the font family.
* Do not introduce a serif heading font.
* Do not introduce Vite.
* Do not replace the current production build pipeline.
* Do not implement the separate localhost port `8181` source-preview workflow.
* Do not add Workbox or another service-worker framework.
* Do not add Lighthouse or another broad performance dependency.
* Do not add browsers other than the currently configured Chromium workflow.
* Do not add a complex PWA update-notification interface.
* Do not add push notifications, background sync, periodic sync, or application data caching.
* Do not cache form submissions.
* Do not cache non-GET requests.
* Do not cache failed or partial responses.
* Do not cache arbitrary cross-origin resources.
* Do not delete unrelated origin caches.
* Do not use a broad cache cleanup rule.
* Do not use the homepage as an offline fallback.
* Do not mask online `404` responses.
* Do not create a second service-worker source of truth.
* Do not maintain independent manual cache versions.
* Do not use current time as a cache revision.
* Do not precache every asset without justification.
* Do not remove font weights without confirming actual usage.
* Do not preload every font file.
* Do not redesign or replace the hero image.
* Do not add pixel-perfect visual baselines.
* Do not create temporary test scripts outside the repository.
* Do not use machine-specific absolute paths.
* Do not manually edit generated HTML, minified assets, or generated `service-worker.js`.
* Edit canonical source files and regenerate outputs.
* Preserve the point-9 routing, metadata, sitemap, robots, and structured-data foundation.
* Preserve accessibility, responsive behavior, themes, progressive enhancement, and reduced motion.
* Preserve unrelated working-tree changes.
* Keep the final diff focused and review-friendly.

# TECHNICAL RULES

* Use the existing service-worker template as the canonical source.
* Generate the final service worker through the current build pipeline.
* Use a stable project-specific cache prefix.
* Generate a deterministic cache revision.
* Validate the precache list before runtime.
* Cache only successful, complete, intended same-origin GET responses.
* Keep online routing semantics separate from offline fallback behavior.
* Preserve real HTTP status meaning.
* Keep runtime cache growth bounded and intentional.
* Keep manifest paths consistent with deployment scope.
* Verify icon files against declared dimensions and types.
* Prioritize only genuine above-the-fold assets.
* Keep below-the-fold images lazy-loaded where appropriate.
* Preserve explicit media dimensions.
* Deliver only justified local font files and weights.
* Use non-blocking font rendering.
* Use the permanent project-local Playwright infrastructure.
* Clean service-worker registrations, caches, and browser state between focused lifecycle tests.
* Do not leak PWA state into unrelated test suites.
* Avoid arbitrary timeout-based waits.
* Use observable lifecycle and cache state.
* Report only verification genuinely performed.

Acceptance criteria:

* production build creates a valid generated service worker
* no unresolved service-worker template placeholder remains
* every precache entry exists and is unique
* service-worker installation completes successfully
* one current Lauren English project cache is created according to the documented strategy
* obsolete Lauren English caches are removed
* unrelated origin caches remain untouched
* changed precached assets produce a deterministic new cache revision
* failed, partial, non-GET, and unintended responses are not cached
* successful online primary routes remain available
* online unknown routes continue to return real `404`
* online `404` responses are not cached as valid navigation documents
* offline navigation uses the documented fallback
* the homepage is not used as a generic offline or missing-route fallback
* manifest JSON and required fields are valid
* declared icons exist and match declared type and dimensions
* service-worker registration and activation succeed on localhost
* the worker controls the page after the expected lifecycle step
* hero/LCP image is not deferred
* hero image has explicit dimensions and is requested once
* only justified font weights are delivered
* no missing or duplicate font request occurs
* no production page requests source CSS or JavaScript
* critical asset request behavior matches the documented budget
* `check:pwa` passes
* focused PWA Playwright tests pass
* point-9 SEO and routing tests continue to pass
* the complete Playwright suite passes
* existing data, content, HTML, CSS, and SEO checks pass
* build output remains deterministic
* only roadmap point 10 is marked `[x]`

# OUTPUT EXPECTATION

Return a concise final report containing:

* documentation and source files inspected
* original audit findings reproduced
* original findings that were already resolved
* final cache prefix and revision strategy
* precache entries and validation approach
* install and activation lifecycle decisions
* cache cleanup behavior
* unrelated-cache preservation result
* response cache-eligibility rules
* online navigation strategy
* offline navigation strategy
* unknown-route behavior
* service-worker update behavior
* manifest fields and icon verification
* hero/LCP changes
* font-weight audit and final delivered weights
* critical asset budget and measured request results
* static PWA checks added
* Playwright PWA tests added
* npm scripts added or updated
* documentation changes
* files changed
* generated files rebuilt
* production build result
* static check results
* focused PWA test result
* SEO routing regression result
* complete E2E result
* console, page-error, request, and HTTP diagnostics
* confirmation that no temporary external harness was created
* confirmation that unrelated working-tree changes were preserved
* confirmation that only roadmap point 10 was marked `[x]`
* any blocker that prevented full acceptance

Do not include unrelated recommendations.
