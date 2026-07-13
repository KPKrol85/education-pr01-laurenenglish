# PROJECT CONTEXT

You are a senior frontend developer working in the currently opened `education-pr01-laurenenglish` repository.

Read and follow the current repository state and authoritative documentation before editing, especially:

* `CONTEXT-PROJECT.md`
* `README.md`
* `package.json`
* `scripts/shared-shell.mjs`
* `scripts/build-html.mjs`
* the current header and footer CSS
* the current PWA configuration and precache contract
* the existing project-local Playwright tests

Treat canonical source files as the source of truth.

Roadmap points 1–10 are complete. This is a separate, focused visual-polish task.

A final Lauren English logo already exists at:

`assets/img/logo/logo.svg`

The current header uses a generated decorative `<span class="header__logo-mark">` instead of the real logo asset.

The real SVG logo must now be used consistently in both the shared header and shared footer.

# TASK OBJECTIVE

Replace the current CSS-generated logo mark with the existing local SVG logo:

`/assets/img/logo/logo.svg`

Use the same logo asset in:

* the shared site header
* the shared site footer

Preserve the existing visible brand text:

`Lauren – Clean English`

The completed implementation must:

* use the real SVG through semantic `<img>` markup
* preserve the existing accessible brand link
* preserve the current header and footer layout
* preserve responsive navigation behavior
* preserve light and dark themes
* avoid stretching, cropping, or distorting the logo
* keep the logo readable at narrow mobile sizes
* update the canonical shared shell rather than manually editing generated pages
* rebuild and verify all generated output

# IMPLEMENTATION PLAN

1. Inspect the current repository state and complete working-tree diff before editing.

2. Preserve unrelated user-authored changes, including `PROMPT.md`.

3. Inspect:

   * `assets/img/logo/logo.svg`
   * its SVG `viewBox`
   * intrinsic proportions
   * transparent background behavior
   * current header logo markup
   * current footer brand markup
   * related header and footer CSS

4. Confirm the SVG is valid and can be loaded as a same-origin image.

5. Update the canonical shared shell in `scripts/shared-shell.mjs`.

6. Replace the current decorative header element:

   `span.header__logo-mark`

   with a semantic image using:

   `/assets/img/logo/logo.svg`

7. Keep the existing header logo link and visible text.

8. Use a focused class such as:

   * `header__logo-image`

   or reuse an appropriate existing image class if one already exists.

9. Add explicit `width` and `height` attributes based on the SVG’s real aspect ratio.

10. Do not hard-code dimensions that distort the asset.

11. Preserve the current accessible name of the homepage link.

12. Avoid duplicate screen-reader announcements:

    * if the visible brand text and link already provide the accessible name, use an empty image `alt`
    * do not repeat “Lauren – Clean English” unnecessarily through both image alt text and visible text

13. Update the shared footer markup to use the same SVG logo.

14. Preserve the current footer text, links, hierarchy, and accessible structure.

15. Use a focused footer class such as:

    * `footer__logo-image`
    * or an existing appropriate footer brand class

16. Do not create a second copy of the logo file.

17. Remove the old generated logo-mark CSS only when it is no longer used anywhere.

18. Remove obsolete styles such as:

    * generated letter content
    * logo-mark background
    * logo-mark text color
    * logo-mark font-weight
    * other rules used exclusively by the removed decorative span

19. Add minimal image-specific styles that:

    * preserve intrinsic aspect ratio
    * use `display: block`
    * prevent shrinking or overflow
    * fit the current header and footer composition
    * remain stable at all existing breakpoints

20. Use the established token system for reusable sizing and spacing where appropriate.

21. Do not redesign the header or footer.

22. Do not change navigation labels, CTA copy, brand text, or footer content.

23. Do not change the logo artwork.

24. Do not inline the entire SVG into each page.

25. Use the local SVG as an external image asset.

26. Inspect the current PWA precache contract.

27. Because the logo becomes a shared critical shell asset, add it to the validated precache only if required by the established offline asset policy.

28. If added to the precache:

    * update the canonical PWA configuration
    * regenerate the deterministic cache revision
    * do not manually edit generated `service-worker.js`

29. Regenerate shared HTML and production assets through the existing build pipeline.

30. Verify all generated primary pages use the new logo markup.

31. Confirm the old decorative logo span is absent from generated pages.

32. Verify the logo request:

    * returns HTTP `200`
    * uses the correct SVG MIME type
    * is requested from the expected local path
    * is not requested multiple times unnecessarily on the same page

33. Verify the header and footer at:

    * 320px
    * 390px
    * 768px
    * 1024px
    * 1440px

34. Verify both light and dark themes.

35. Confirm:

    * no horizontal overflow
    * no logo distortion
    * no clipping
    * no overlap with navigation or header actions
    * no footer layout regression
    * no inaccessible duplicate brand announcement

36. Update or add only focused Playwright assertions required to protect the new logo contract.

37. Do not create temporary test harnesses outside the repository.

38. Run the existing project verification workflow, including at minimum:

    * `npm run build`
    * `npm run check:data`
    * `npm run check:content`
    * `npm run check:html`
    * `npm run check:css`
    * `npm run check:seo`
    * `npm run check:pwa`
    * relevant focused Playwright tests
    * `npm run test:e2e`
    * relevant `node --check` commands
    * relevant Prettier checks
    * `git diff --check`

39. Confirm generated HTML remains deterministic and idempotent.

40. Do not modify `INITIAL-AUDIT.md`.

# CONSTRAINTS

* Do not redesign the header.
* Do not redesign the footer.
* Do not modify the SVG artwork.
* Do not generate a replacement logo.
* Do not introduce another logo file.
* Do not change the brand text.
* Do not change navigation structure or CTA content.
* Do not change fonts during this task.
* Do not implement the planned Literata typography task yet.
* Do not introduce inline SVG duplication across pages.
* Do not use the logo as a CSS background image.
* Do not manually edit generated HTML.
* Do not manually edit minified CSS or JavaScript.
* Do not manually edit generated `service-worker.js`.
* Do not introduce inline styles.
* Do not use styling IDs.
* Do not add unnecessary dependencies.
* Do not change unrelated PWA, SEO, routing, content, or accessibility behavior.
* Do not modify roadmap completion states.
* Preserve unrelated working-tree changes.
* Keep the diff focused and review-friendly.

# TECHNICAL RULES

* Edit canonical source files and regenerate output.
* Use semantic `<img>` markup.
* Use the root-relative path `/assets/img/logo/logo.svg`.
* Preserve the SVG’s real aspect ratio.
* Use explicit intrinsic dimensions.
* Use CSS to control rendered size without distortion.
* Keep selector specificity low.
* Follow the existing BEM-style naming system.
* Follow the current token-first CSS architecture.
* Preserve the shared-shell generation contract.
* Preserve the accessible name of the homepage brand link.
* Avoid redundant image alt text when visible text already names the brand.
* Preserve keyboard focus and link behavior.
* Preserve light and dark theme compatibility.
* Preserve responsive and PWA guarantees.
* Use only project-local Playwright infrastructure.
* Report only verification actually performed.

Acceptance criteria:

* `/assets/img/logo/logo.svg` is used in the shared header
* the same logo asset is used in the shared footer
* the old decorative header logo span is removed
* obsolete logo-mark CSS is removed
* visible `Lauren – Clean English` text remains
* the homepage logo link remains accessible
* no duplicate brand announcement is introduced
* the SVG retains its correct proportions
* the logo is not clipped, stretched, or blurred
* header and footer remain stable at all required viewport widths
* both themes remain visually coherent
* no horizontal overflow or navigation collision is introduced
* the logo asset returns successfully with the correct MIME type
* offline behavior remains consistent with the established PWA policy
* generated HTML and assets are rebuilt
* all relevant static and browser checks pass
* `INITIAL-AUDIT.md` remains unchanged

# OUTPUT EXPECTATION

Return a concise final report containing:

* source files inspected
* SVG dimensions and aspect ratio confirmed
* canonical header source changed
* canonical footer source changed
* final header markup approach
* final footer markup approach
* accessibility and alt-text decision
* obsolete markup and CSS removed
* CSS classes added or updated
* PWA precache decision
* files changed
* generated files rebuilt
* viewport and theme combinations tested
* logo request status and MIME result
* responsive layout results
* static checks executed
* Playwright checks executed
* confirmation that no temporary harness was created
* confirmation that unrelated changes were preserved
* confirmation that `INITIAL-AUDIT.md` was not changed
* any blocker encountered

Do not include unrelated recommendations.
