# PROJECT CONTEXT

You are a senior frontend developer working in the currently opened `education-pr01-laurenenglish` repository.

The project currently uses local Inter `.woff2` files. The completed roadmap, build pipeline, PWA checks, and project-local Playwright workflow must remain intact.

This is a focused typography task. Preserve unrelated changes, including `PROMPT.md`, and do not modify `INITIAL-AUDIT.md`.

# TASK OBJECTIVE

Implement this typography system:

```css
--font-family-heading: "Literata", serif;
--font-family-body: "Inter", sans-serif;
```

Use:

* **Literata** for headings and selected editorial heading elements
* **Inter** for body text, navigation, buttons, forms, badges, tables, labels, and other UI

Both font families must be served locally as `.woff2`.

# IMPLEMENTATION PLAN

1. Inspect the current font files, `@font-face` declarations, typography tokens, heading rules, preload markup, PWA precache, and font-related tests.
2. Add official Literata `.woff2` files under the existing local font structure.
3. Include the appropriate font license file when required by the official source.
4. Add only the Literata weights genuinely used by the project. Prefer the smallest practical set based on current heading weights.
5. Keep the existing justified Inter weights and do not reintroduce unused Inter 500.
6. Define or update the canonical tokens:

```css
--font-family-heading: "Literata", serif;
--font-family-body: "Inter", sans-serif;
```

7. Apply Literata consistently to:

   * `h1`–`h6`
   * section and page titles
   * card titles only where they function as headings
   * appropriate editorial quotations or highlighted learning titles
8. Keep Inter for all interface and body elements.
9. Review heading `font-weight`, `line-height`, letter spacing, wrapping, and spacing after the font change.
10. Verify Polish characters, including `ą ć ę ł ń ó ś ź ż`.
11. Prevent layout regressions at 320, 390, 768, 1024, and 1440px.
12. Ensure headings do not overflow, collide, or create excessive layout shifts.
13. Use `font-display: swap`.
14. Preload only a genuinely critical font file if justified. Do not preload every Literata weight.
15. Update the PWA precache and critical-asset budget for the new local font files.
16. Update existing font, HTML, CSS, and PWA validation where necessary.
17. Rebuild generated assets through the existing production workflow.
18. Run:

* `npm run build`
* `npm run check:css`
* `npm run check:html`
* `npm run check:pwa`
* relevant focused Playwright tests
* `npm run test:e2e`
* relevant Prettier and syntax checks
* `git diff --check`

# CONSTRAINTS

* Do not redesign the website.
* Do not change colors, content, navigation, routing, cards, or page structure.
* Do not use remote Google Fonts requests at runtime.
* Do not use `.ttf`, `.otf`, or another runtime font format when `.woff2` is available.
* Do not add unnecessary font weights.
* Do not apply Literata to buttons, navigation, forms, badges, tables, labels, or small UI text.
* Do not manually edit generated HTML, minified assets, or generated `service-worker.js`.
* Do not change completed roadmap states.
* Do not create temporary test harnesses.
* Keep the diff focused on typography and required asset integration.

# TECHNICAL RULES

* Use official, legally distributable Literata font files.
* Serve all fonts locally.
* Preserve the existing token-first CSS architecture.
* Keep `@font-face` declarations accurate and non-duplicated.
* Match each declared `font-weight` to the correct file.
* Preserve fallback fonts.
* Preserve accessibility, themes, responsive behavior, SEO, and offline behavior.
* Ensure font requests return `200` with the correct MIME type.
* Ensure no missing, duplicate, or remote font requests occur.
* Report only verification actually performed.

# OUTPUT EXPECTATION

Return a concise report containing:

* Literata source and license
* Literata weights added
* Inter weights retained
* font files added
* typography tokens updated
* selectors changed to Literata
* UI elements intentionally kept on Inter
* preload decision
* PWA precache and asset-budget changes
* responsive and Polish-character verification
* files changed
* generated assets rebuilt
* static and Playwright results
* confirmation that no remote font requests occur
* confirmation that `INITIAL-AUDIT.md` was unchanged
* any blocker encountered
