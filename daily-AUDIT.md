# Daily Front-End Audit — Lauren English

**Audit date:** 2026-07-21
**Project type:** static multi-page educational website / build-based front-end project
**Audit mode:** static repository review

## Overall assessment

The project has a coherent source-first architecture, centralized public data and metadata, and focused accessibility-oriented JavaScript modules. No P0 risk was evidenced. However, release confidence is currently limited by four P1 failures across generated output, validation tooling, PWA configuration, and responsive typography. The project is suitable for continued development, but not currently a clean verification baseline.

## Verified strengths

- `scripts/site-config.mjs` centralizes routes, canonical metadata, indexability, runtime entrypoints, and social-image data; `npm run check:seo` passed for six indexable and six noindex utility pages.
- Package and material records are centralized under `js/data/`; `npm run check:data` passed for package keys, material access rules, and filters.
- `js/main.js` isolates initializers, `js/modules/mobileNav.js` maintains drawer focus and ARIA state, and `js/state/` validates local progress data while handling unavailable Web Storage safely.

## P0 — Critical risks

None detected.

## P1 — Important issues worth fixing next

### [P1-06] Responsive typography contract fails at mobile and desktop widths

- **Classification:** Defect
- **Evidence:** `tests/e2e/responsive.spec.mjs:179`; `tests/e2e/responsive.spec.mjs:189`
- **Current behavior:** The focused Chromium run fails the heading layout-shift limit at 390px and detects a homepage heading whose `scrollWidth` exceeds its `clientWidth` by 78px at 1440px.
- **Impact:** The responsive quality gate is red and the typography can visibly reflow or overflow at supported viewport widths.
- **Recommended direction:** Identify the responsible homepage heading in the browser and refine its local width, wrapping, or fluid typography without changing global heading behavior.

## Resolved after audit

### [P1-01] Generated package page was stale

- **Status:** Resolved on 2026-07-21
- **Original classification:** Contract mismatch
- **Resolution:** Regenerated `pakiety.html` through the canonical HTML assembler using `npm run build:html`.
- **Verification:** `npm run check:html` passed for 12 generated pages, 9 shared-shell pages, and 3 route assets.
- **Additional checks:** `git diff --check` passed and `git status --short` confirmed a clean working tree after commit.

### [P1-02] Homepage CTA public-content contract was outdated

- **Status:** Resolved on 2026-07-21
- **Original classification:** Contract mismatch
- **Resolution:** Escaped the approved telephone URI before inserting it into the dynamic regular expression in `scripts/check-public-content.mjs`.
- **Verification:** `npm run check:content` passed for all 12 public pages, and `git diff --check` completed without whitespace errors.

### [P1-03] PWA critical-hero configuration did not match the homepage

- **Status:** Resolved on 2026-07-22
- **Original classification:** Contract mismatch
- **Resolution:** Restored the homepage hero source to `/assets/img/hero/hero-01.jpg`, matching `HERO_IMAGE_PATH` in `scripts/pwa-config.mjs`, the critical-asset budget, precache contract, and runtime checklist. The selected JPEG is `1600 × 1200` and 1,058,463 bytes, within the existing 1.1 MB hero budget. The PWA checker now normalizes whitespace in equivalent `unicode-range` declarations before validating configured local font sources, and the precache graph no longer includes the unimported `/js/modules/progressTracker.js` module.
- **Verification:** `npm run build:sw` regenerated `service-worker.js`; `npm run check:pwa` passed the hero, budget, precache, and generated-worker contracts. `npm run check:html` and `npm run check:content` also passed.

### [P1-04] CSS architecture check rejects canonical anchor-offset styles

- **Status:** Resolved on 2026-07-22
- **Original classification:** Contract mismatch
- **Resolution:** Replaced the ID-selector list in `css/utilities/utilities.css` with the low-specificity `.u-anchor-offset` utility. Applied it only to the existing intentional fragment targets, including generated package-card anchors through `scripts/content-renderers.mjs`, while preserving every HTML ID and the responsive `--anchor-scroll-offset` token.
- **Verification:** `npm run build:html` regenerated the package page and `npm run check:html` passed for 12 pages, 9 shared-shell pages, and 3 route assets. `npm run build:css` regenerated the legacy CSS output. `npm run check:css` passed both the CSS architecture gate (28 canonical files, no ID selectors) and 40 light/dark contrast checks. The focused Playwright anchor-navigation test passed in Chromium desktop and mobile.

### [P1-05] Declared JavaScript lint command is incompatible with the locked ESLint version

- **Status:** Resolved on 2026-07-22
- **Original classification:** Contract mismatch
- **Resolution:** Replaced the legacy `.eslintrc.cjs` with the ESM flat configuration `eslint.config.js`, compatible with the locked ESLint 9 release. Added direct `@eslint/js` and `globals` dependencies, preserved `eslint:recommended` and the warning-level `no-unused-vars` rule, and changed `lint:js` to `eslint .`. The configuration scopes browser modules, Node scripts and root configuration, Playwright tests, the Service Worker template, and the CommonJS PostCSS configuration while ignoring generated bundles, generated Service Worker output, reports, results, coverage, and dependencies.
- **Verification:** `npm run lint:js` completed without errors or warnings across the canonical source scope. Explicit lint checks confirmed that `assets/build/main.min.js` and `service-worker.js` are ignored. Removed two genuine unused test variables without changing test behavior. `npm run build` passed and regenerated `service-worker.js`. `npm run check:dev` was attempted but could not start because Python 3 was unavailable in the local environment.

## P2 — Minor refinements

### [P2-01] Runtime documentation has drifted from executable configuration

- **Classification:** Maintenance risk
- **Evidence:** `README.md:13`; `docs/runtime-checklist.md:82`; `scripts/site-config.mjs:2`; `scripts/pwa-config.mjs:19`
- **Current behavior:** README links to `education-pr01-laurenenglish.netlify.app` while the canonical origin uses `education-pr-01-lauren-english.netlify.app`; the runtime checklist expects 26 CSS requests while the configured CSS graph now contains 27 files.
- **Impact:** Reviewers and maintainers can be directed to a different origin or diagnose a correct runtime request graph as a failure.
- **Recommended direction:** Update the documentation from the canonical site and PWA configuration values after confirming the intended deployment URL.

## Extra quality improvements

None detected.

## Verification performed

- Inspected `CONTEXT-PROJECT.md`, `README.md`, `docs/runtime-checklist.md`, `docs/css-architecture.md`, `docs/pakiety.md`, `package.json`, Playwright configuration, canonical HTML/CSS/JS sources, PWA and SEO configuration, validators, tests, and Git state.
- `git status --short` was clean before this audit.
- Passed: `npm run check:data`, `npm run check:seo`.
- Failed: `npm run check:html`, `npm run check:content`, `npm run check:css`, `npm run check:pwa`, `npm run lint:js`, and the focused responsive Playwright command for 390px and 1440px.
- No build, formatter, dependency installation, deployment, external URL verification, Netlify submission test, or Service Worker installability test was run because this audit permits only non-mutating repository checks.

## Senior rating

**Rating:** 6/10

The project demonstrates good modular structure, centralized data, and considered accessibility patterns. Its current verification baseline is materially weakened by generated-output drift, broken validators, a PWA asset mismatch, and confirmed responsive typography failures.
