# PROJECT CONTEXT

You are a senior frontend and technical SEO developer working in the currently opened `education-pr01-laurenenglish` repository.

Read and follow the current repository state and authoritative documentation before editing, especially:

* `CONTEXT-PROJECT.md`
* `README.md`
* `INITIAL-AUDIT.md`
* `package.json`
* `playwright.config.mjs`
* `.gitignore`
* `docs/runtime-checklist.md`
* existing HTML assembly, build, verification, and deployment files
* the current project-local Playwright tests

Treat the current repository state as the source of truth.

Roadmap points 1–8 are complete. The permanent project-local Playwright workflow is available and must be used for browser and HTTP verification.

Implement only roadmap point 9:

> **Correct routing, metadata, and structured-data foundations**

Do not implement roadmap point 10.

The original audit reported:

* the five primary pages had canonical links and descriptions
* `404.html`, `offline.html`, and `thank-you.html` reused the homepage canonical
* utility and error pages had no deliberate indexing policy
* `_redirects` rewrote every unknown route to `index.html` with status `200`
* the dedicated 404 page was therefore ineffective and unknown routes could become soft 404s
* every sitemap entry used the same outdated `2024-06-01` date
* homepage JSON-LD contained unverified business data
* Open Graph and social-preview metadata had not been runtime-validated

Some evidence may already have changed during roadmap points 1–8. Verify the current implementation before editing and do not modify behavior that is already correct.

Preserve unrelated user-authored changes, including `PROMPT.md`.

# TASK OBJECTIVE

Create an intentional and internally consistent routing, indexing, metadata, social-preview, sitemap, robots, and structured-data foundation for the static Lauren English website.

The completed implementation must ensure that:

* every known public route returns the intended successful response
* every unknown route returns an actual HTTP `404`
* missing routes are not rewritten to the homepage
* indexable pages have unique, verified metadata
* canonical and Open Graph URLs are synchronized
* utility and error pages have a deliberate `noindex` policy
* utility and error pages do not reuse the homepage canonical
* only indexable public routes appear in the sitemap
* sitemap modification dates are trustworthy or omitted
* `robots.txt` points to the real deployed sitemap
* structured data contains only supported and verified information
* social-preview metadata uses a crawler-compatible image
* metadata remains deterministic and maintainable through the existing build pipeline

This is a technical SEO and routing task. Do not redesign the website or rewrite unrelated content.

# IMPLEMENTATION PLAN

## 1. Inspect the current routing and metadata model

Inspect the complete working tree and current source-of-truth architecture before editing.

At minimum, review:

* all five primary page sources
* `404.html`
* `offline.html`
* `thank-you.html`
* `_redirects`
* `robots.txt`
* `sitemap.xml`
* `assets/og/og-default.svg`
* `scripts/shared-shell.mjs`
* `scripts/build-html.mjs`
* `scripts/content-renderers.mjs`
* `service-worker.template.js`
* current generated HTML
* current Playwright smoke and runtime helpers
* any existing metadata, route, deployment, or SEO configuration

Record the current:

* canonical site origin
* public route set
* redirect rules
* indexing policy
* canonical links
* Open Graph tags
* Twitter card tags
* JSON-LD blocks
* sitemap entries
* sitemap dates
* robots directives
* service-worker navigation behavior

Do not assume the original audit evidence is still reproducible.

## 2. Resolve the authoritative public origin

Determine the authoritative deployed HTTPS origin from current repository evidence such as:

* existing canonical URLs
* README deployment documentation
* current Open Graph URLs
* sitemap
* robots
* deployment configuration

Use one verified origin consistently.

Do not invent a new production domain.

If the repository contains conflicting origins, reconcile them using the most authoritative current deployment documentation.

If no authoritative public origin can be established, do not guess. Report the blocker and leave roadmap point 9 unchecked.

## 3. Define the intentional public route set

Define the current static route policy for:

### Indexable primary pages

* homepage
* services page
* packages page
* materials page
* progress page

Use the actual current filenames and canonical URL style from the repository.

Do not switch between `.html`, extensionless URLs, or trailing-slash URLs without a deliberate migration reason.

### Non-indexable utility pages

* `404.html`
* `offline.html`
* `thank-you.html`

These pages must remain accessible where required but must not be treated as normal search-result pages.

Prefer one small canonical route and metadata registry integrated with the existing HTML build architecture if it prevents duplicated route literals across:

* page metadata
* sitemap generation
* robots generation
* structured-data URLs
* route verification

Do not introduce a parallel site generator or broad architecture rewrite.

## 4. Correct static routing and 404 behavior

Inspect `_redirects` and remove the catch-all homepage rewrite that returns `index.html` with status `200`.

Preserve legitimate explicit redirects that are still required.

Configure unknown routes to return the dedicated 404 document with HTTP status `404`.

For a Netlify-style static deployment, use the platform’s correct custom-404 behavior without creating an SPA fallback.

Ensure:

* known content routes return `200`
* static assets return their correct status
* direct utility-page URLs remain accessible
* an unknown URL returns `404`
* the unknown response displays the intended 404 content where the deployment model supports it
* redirect loops do not exist
* unknown routes are never normalized to the homepage with status `200`

Do not introduce a JavaScript router.

Do not add Netlify CLI or another deployment dependency solely for this task.

## 5. Review service-worker navigation behavior

Inspect `service-worker.template.js` and the generated service worker.

Ensure the service worker does not convert unknown online navigations into homepage responses.

Preserve the intended offline experience:

* online unknown routes retain real `404` behavior
* offline navigations may use `offline.html`
* error responses are not incorrectly cached as valid content
* the homepage is not used as a generic missing-route fallback
* PWA behavior from previous roadmap points remains intact

Use fresh browser contexts and disabled or isolated service workers when testing online HTTP routing.

## 6. Create deliberate metadata policies

Define explicit metadata behavior for each page category.

### Indexable primary pages

Each primary page must have:

* one unique `<title>`
* one useful and page-specific meta description
* one absolute self-referencing canonical URL
* one matching absolute `og:url`
* page-appropriate `og:title`
* page-appropriate `og:description`
* appropriate `og:type`
* consistent `og:site_name`
* correct locale metadata where currently supported
* a valid social-preview image
* matching Twitter card metadata where used

Canonical and `og:url` values must match exactly after URL normalization.

Do not create duplicate canonical, description, Open Graph, or Twitter tags.

Use existing visible page content as the source for titles and descriptions. Do not invent unsupported marketing claims.

### Utility and error pages

For `404.html`, `offline.html`, and `thank-you.html`:

* add a deliberate `noindex, nofollow` policy
* remove the reused homepage canonical
* do not point canonical metadata at an unrelated indexable page
* avoid conflicting canonical and `noindex` signals
* remove or minimize unnecessary Open Graph and Twitter metadata
* keep titles descriptive and utility-specific
* exclude the pages from the sitemap

Do not use `robots.txt` disallow rules as a replacement for page-level `noindex`.

## 7. Correct the social-preview image foundation

Inspect `assets/og/og-default.svg` and current social metadata.

Major social crawlers should receive a crawler-compatible raster image.

If the current Open Graph image is SVG-only:

* retain the SVG as the editable source if appropriate
* create a deterministic raster derivative such as `assets/og/og-default.png`
* preserve the existing approved design rather than redesigning it
* use a suitable social-preview size, preferably `1200 × 630`
* avoid adding a permanent image-processing dependency unless one already exists
* commit the final raster asset required by social metadata

For the final Open Graph and Twitter image metadata, provide where appropriate:

* absolute image URL
* secure HTTPS URL
* MIME type
* width
* height
* descriptive image alt text

Verify that the referenced asset exists and returns a successful response.

Do not claim that SVG social-preview support is sufficient unless it is demonstrably supported by the required metadata targets.

## 8. Remove unsupported structured data

Inspect every JSON-LD block.

Remove unsupported or unverified fields such as any unverified:

* business identity
* organization identity
* postal address
* telephone number
* opening hours
* price range
* rating or review aggregate
* social profile
* founder or employee identity
* commercial offer
* service guarantee

Do not retain `LocalBusiness`, `Organization`, `Person`, `Offer`, `Product`, `AggregateRating`, `Review`, or similar entities unless the required information is explicitly verified by authoritative project content.

Prefer a minimal supported model, such as:

* `WebSite` on the homepage
* `WebPage` on indexable pages
* `inLanguage`
* verified page name and description
* absolute page URL
* consistent site identity

Do not add `SearchAction` because the site has no verified site-search feature.

Do not add breadcrumb structured data unless visible breadcrumbs and a real breadcrumb hierarchy exist.

Ensure:

* JSON-LD is valid JSON
* all URLs are absolute and use the authoritative origin
* `@id` values are stable and non-conflicting
* visible content and structured data agree
* utility pages do not expose inappropriate business or page entities
* there is no duplicated or contradictory structured data

## 9. Regenerate the sitemap from the real route set

Make `sitemap.xml` represent only the current indexable public route set.

Requirements:

* include each indexable primary URL exactly once
* exclude `404.html`
* exclude `offline.html`
* exclude `thank-you.html`
* use the authoritative HTTPS origin
* avoid duplicate URL variants
* use valid XML
* preserve a deterministic route order

Correct the placeholder `2024-06-01` modification dates.

For `<lastmod>`:

* include it only when the date represents a real content modification
* do not use build time
* do not use filesystem modification time
* do not use the current date merely because the build ran
* do not preserve known placeholder dates
* omit `<lastmod>` when a trustworthy content date is unavailable

If route metadata is centralized, generate the sitemap from that source through the existing build workflow.

Do not manually maintain a second independent route list when avoidable.

## 10. Correct robots.txt

Ensure `robots.txt`:

* uses valid directives
* does not accidentally block indexable content or required assets
* does not use disallow rules as a substitute for `noindex`
* contains one absolute `Sitemap:` directive
* points to the deployed sitemap under the authoritative HTTPS origin
* does not reference a stale domain or path

Generate it from the same verified site origin where practical.

## 11. Add deterministic SEO validation

Add or extend a focused project-local static check, for example `scripts/check-seo.mjs`, if no equivalent check exists.

The check should validate at minimum:

* unique primary-page titles
* unique primary-page descriptions
* exactly one canonical on each indexable page
* canonical URLs are absolute
* `og:url` matches canonical
* required Open Graph metadata exists
* required Twitter metadata exists where the project uses Twitter cards
* social-preview assets exist
* utility pages contain `noindex`
* utility pages do not reuse the homepage canonical
* utility pages are absent from the sitemap
* sitemap URLs exactly match the indexable route registry
* sitemap dates are valid when present
* robots sitemap URL matches the authoritative origin
* JSON-LD parses successfully
* disallowed or unsupported structured-data types and fields are absent
* `_redirects` contains no homepage catch-all rewrite with status `200`
* the intended 404 rule is present

Keep the check deterministic and dependency-light.

Do not duplicate complete HTML, content, or CSS checks already covered by existing scripts.

Add a focused npm script such as:

* `check:seo`

Integrate it into the appropriate verification workflow only if that matches the current package-script architecture.

## 12. Add focused Playwright SEO and routing coverage

Extend the permanent project-local Playwright suite with a focused specification such as:

* `tests/e2e/seo-routing.spec.mjs`

Add an npm command such as:

* `test:e2e:seo`

Use the existing Playwright configuration, server lifecycle, diagnostics, storage isolation, and service-worker policy.

Verify through browser and request-level assertions:

### HTTP routing

* all five primary routes return `200`
* required static assets return `200`
* direct utility routes remain accessible
* one or more unknown routes return `404`
* unknown routes do not return homepage content as successful pages
* no redirect loop occurs

### Runtime metadata

For every indexable page:

* title is present
* description is present
* canonical is present and unique
* canonical is self-consistent
* `og:url` equals canonical
* Open Graph image URL is absolute
* Open Graph image request succeeds
* JSON-LD parses without runtime errors

For utility pages:

* robots policy contains `noindex`
* homepage canonical is not reused
* no conflicting indexable metadata remains

### Sitemap and robots

* `sitemap.xml` returns successfully
* `robots.txt` returns successfully
* sitemap URLs match the expected route set
* robots references the deployed sitemap

Use semantic and deterministic assertions.

Do not create a temporary harness under `C:\tmp`.

Do not add pixel-perfect screenshot tests.

## 13. Validate social and structured metadata honestly

Perform deterministic local validation of:

* meta-tag consistency
* absolute URLs
* image reachability
* image dimensions and MIME type
* JSON-LD syntax
* allowed structured-data types
* sitemap and robots consistency

Use official external structured-data or social-preview validators only when they are genuinely accessible.

Do not claim Google, Schema.org, Facebook, LinkedIn, X, or another external validator passed unless it was actually executed.

An unavailable external service must not cause repeated test-harness rebuilding.

## 14. Update documentation

Update README or focused project documentation with the final policy for:

* authoritative site origin
* indexable route set
* non-indexable utility pages
* canonical URL conventions
* social-preview asset
* sitemap generation
* robots generation
* structured-data scope
* local SEO verification commands
* E2E routing and metadata command
* real 404 behavior

Keep documentation aligned with the actual implementation.

Do not add speculative deployment instructions.

## 15. Build and verify

After canonical source changes:

1. regenerate shared HTML through the existing build workflow
2. regenerate production CSS, JavaScript, and service-worker output
3. regenerate sitemap and robots if they are build-managed
4. verify generated HTML idempotence
5. run all existing static checks
6. run the new focused SEO check
7. run the focused SEO and routing Playwright suite
8. run the complete Playwright suite

Run at minimum, using the real current package scripts:

* `npm run build`
* `npm run check:data`
* `npm run check:content`
* `npm run check:html`
* `npm run check:css`
* `npm run check:seo`
* `npm run test:e2e:seo`
* `npm run test:e2e`
* relevant `node --check` commands
* relevant Prettier checks
* `git diff --check`

Verify the build does not create stale or non-idempotent HTML changes.

Perform one complete verification pass after implementation.

Allow at most one targeted rerun after a confirmed product defect is corrected.

If the project-local testing infrastructure fails twice for the same environment reason, stop and report the blocker instead of building a replacement harness.

## 16. Update the roadmap

Only after all acceptance criteria pass:

* mark roadmap point 9 as `[x]`
* leave roadmap point 10 unchecked
* do not modify unrelated roadmap items

If the public origin cannot be verified, route status cannot be confirmed, or required browser verification remains blocked, leave point 9 unchecked.

# CONSTRAINTS

* Do not implement roadmap point 10.
* Do not redesign the site.
* Do not change the font family.
* Do not rewrite unrelated page content.
* Do not introduce Vite.
* Do not replace the existing production build pipeline.
* Do not introduce a JavaScript router.
* Do not restore an SPA fallback.
* Do not rewrite unknown paths to the homepage.
* Do not invent a deployment domain.
* Do not invent business details.
* Do not invent addresses, telephone numbers, opening hours, reviews, ratings, prices, social profiles, or organization identities.
* Do not retain unsupported structured data for appearance alone.
* Do not add new SEO or schema dependencies unless strictly necessary.
* Do not add Netlify CLI solely for this task.
* Do not add an external sitemap generator.
* Do not add temporary browser scripts outside the repository.
* Do not use machine-specific absolute paths.
* Do not manually edit generated HTML or minified assets.
* Edit canonical source files and regenerate outputs.
* Do not add utility pages to the sitemap.
* Do not use `robots.txt` disallow as a substitute for `noindex`.
* Do not create fake `<lastmod>` dates.
* Do not use build time as a content modification date.
* Do not create multiple competing route registries.
* Do not add pixel-perfect screenshot baselines.
* Do not weaken service-worker offline behavior.
* Do not modify unrelated dependency versions.
* Preserve unrelated working-tree changes.
* Keep the diff focused and reviewable.

# TECHNICAL RULES

* Follow the existing source-of-truth and generation architecture.
* Prefer one verified site-origin constant.
* Prefer one maintainable public-route and metadata registry.
* Reuse the existing HTML assembler rather than creating a second page-generation system.
* Use absolute HTTPS URLs for canonical, Open Graph, sitemap, and structured-data URLs.
* Normalize URL style consistently.
* Ensure each indexable page has one canonical URL.
* Ensure `og:url` matches canonical.
* Keep titles and descriptions unique and grounded in visible content.
* Keep utility pages deliberately non-indexable.
* Use a raster social-preview image compatible with common crawlers.
* Keep JSON-LD minimal, valid, verified, and consistent with visible content.
* Keep sitemap entries limited to canonical indexable routes.
* Omit unreliable sitemap dates.
* Preserve real HTTP status semantics.
* Preserve progressive enhancement, accessibility, themes, PWA behavior, and reduced motion.
* Use the existing project-local Playwright infrastructure.
* Use API request assertions for HTTP status verification.
* Use observable browser metadata assertions.
* Avoid arbitrary timeout-based waits.
* Report only checks genuinely performed.

Acceptance criteria:

* all five primary public routes return `200`
* unknown routes return actual `404`
* unknown routes are not rewritten to homepage content with `200`
* `_redirects` contains no catch-all homepage rewrite
* the dedicated 404 behavior is intentional
* online unknown navigation is not masked by the service worker
* primary pages have unique titles and descriptions
* each indexable page has exactly one self-consistent canonical
* each indexable page has matching `og:url`
* utility pages have deliberate `noindex, nofollow`
* utility pages do not reuse the homepage canonical
* utility pages are absent from the sitemap
* sitemap contains exactly the real indexable route set
* sitemap contains no placeholder modification dates
* `<lastmod>` values are trustworthy or omitted
* robots points to the correct deployed sitemap
* social-preview metadata references a reachable crawler-compatible image
* Open Graph image metadata includes accurate dimensions and type
* JSON-LD parses correctly
* unsupported and unverified business fields are absent
* structured data agrees with visible content
* static SEO checks pass
* focused SEO and routing Playwright tests pass
* the complete Playwright suite passes
* existing data, content, HTML, and CSS checks pass
* only roadmap point 9 is marked `[x]`
* roadmap point 10 remains unchecked

# OUTPUT EXPECTATION

Return a concise final report containing:

* documentation and source files inspected
* authoritative public origin confirmed
* original audit evidence reproduced
* original evidence that was no longer reproducible
* final indexable route set
* final non-indexable utility route set
* `_redirects` changes
* known-route HTTP results
* unknown-route HTTP result
* service-worker navigation findings
* metadata changes by page category
* canonical and Open Graph synchronization
* social-preview asset changes
* structured-data types retained
* unsupported structured-data fields removed
* sitemap entries and last-modification policy
* robots changes
* route or metadata registry added or updated
* static SEO checks added
* Playwright SEO and routing tests added
* npm scripts added or updated
* documentation changes
* generated files rebuilt
* static checks executed
* focused browser checks executed
* complete E2E result
* console, page-error, request, and HTTP diagnostics
* confirmation that no external temporary harness was created
* confirmation that unrelated working-tree changes were preserved
* confirmation that only roadmap point 9 was marked `[x]`
* confirmation that point 10 remains unchecked
* any blocker that prevented full acceptance

Do not include unrelated recommendations.
