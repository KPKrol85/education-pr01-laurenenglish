You are a senior frontend developer working on the Lauren English project.

PROJECT CONTEXT

Lauren English is a static multi-page educational website using:

* semantic HTML
* token-first CSS
* Vanilla JavaScript
* a canonical shared shell
* generated SEO metadata and route configuration
* project-local validation and Playwright checks

Relevant architecture includes:

* `scripts/site-config.mjs`
* `scripts/shared-shell.mjs`
* `scripts/build-html.mjs`
* existing page and section CSS
* existing SEO, content, HTML, and PWA validators
* generated standalone HTML pages

The current shared navigation and CTA still point to `/index.html#contact`.

The homepage currently contains a temporary contact section stating that contact details and registration are unavailable. This must be replaced with a credible compact CTA section.

The following contact data are approved for public use:

* phone: `+48 533 537 091`
* telephone URI: `tel:+48533537091`
* email: `kontakt@kp-code.pl`
* email URI: `mailto:kontakt@kp-code.pl`
* address: `ul. Marynarki Wojennej 12/31, 33-100 Tarnów, Polska`

TASK OBJECTIVE

Create a professional standalone contact page at:

`/kontakt.html`

The page must contain:

* clear contact information
* information about the registration/contact process
* accessible telephone and email links
* the approved postal address
* a professional contact form
* truthful customer-facing content suitable for a real independent English teacher

Also replace the temporary homepage contact section with a compact CTA section and remove the current duplicated CTA behavior.

Use this final CTA contract:

* shared navigation item `Kontakt` → `/kontakt.html`
* shared header CTA label `Umów rozmowę` → `/kontakt.html#formularz`
* homepage hero primary CTA label `Zobacz pakiety` → `/pakiety.html#pakiety`
* homepage secondary materials CTA remains unchanged
* homepage compact contact CTA:

  * primary: `Przejdź do kontaktu` → `/kontakt.html`
  * secondary: `Zadzwoń` → `tel:+48533537091`

IMPLEMENTATION PLAN

1. Inspect the current route registry, shared shell, homepage contact section, hero CTAs, page templates, form patterns, thank-you page, validators, and PWA route contract.

2. Add `/kontakt.html` as a first-class indexable page through the existing route and metadata source of truth.

3. Give the contact page:

   * unique title
   * unique meta description
   * canonical URL
   * Open Graph and Twitter metadata
   * supported `WebPage` structured data
   * exactly one `h1`
   * shared header and footer
   * correct `aria-current="page"` on the `Kontakt` navigation link

4. Build the page using existing layout, card, button, form, typography, spacing, and theme patterns.

5. Include a clear page introduction and three accessible contact methods:

   * telephone link
   * email link
   * semantic postal address

6. Add a concise “Informacje o zapisach” section explaining that the first contact is used to discuss:

   * learning goals
   * current level
   * preferred lesson format
   * available next steps

   Do not invent lesson availability, opening hours, response times, prices, reviews, or guarantees.

7. Add a professional contact form with:

   * full name
   * email address
   * optional telephone number
   * enquiry topic
   * message
   * required fields clearly marked
   * accessible labels
   * useful autocomplete attributes
   * inline help or error relationships where needed
   * honeypot protection
   * keyboard-accessible submit button
   * clear submission-purpose notice

8. Use the project’s existing Netlify deployment architecture for real form submission if compatible with the current project.

9. Prefer the standard Netlify Forms contract:

   * `method="POST"`
   * `data-netlify="true"`
   * hidden `form-name`
   * `netlify-honeypot`
   * action to the existing `/thank-you.html`

10. Inspect and update `/thank-you.html` only if required so its message accurately confirms a contact enquiry.

11. Do not create a fake JavaScript submission flow or fake success notification.

12. If the current project has no real privacy-policy route, use a concise factual form notice without inventing a legal document or broken privacy link.

13. Replace the current homepage contact section with a compact CTA section while preserving the existing `id="contact"` for backward compatibility.

14. The homepage CTA section should briefly invite the user to ask about lessons or registration and provide:

* `Przejdź do kontaktu`
* `Zadzwoń`

15. Update the shared navigation `Kontakt` link to `/kontakt.html`.

16. Update both shared header CTA variants, desktop and mobile drawer, to:

* label: `Umów rozmowę`
* URL: `/kontakt.html#formularz`

17. Update the homepage hero primary CTA to:

* label: `Zobacz pakiety`
* URL: `/pakiety.html#pakiety`

18. Preserve the homepage materials CTA.

19. Update footer contact navigation to `/kontakt.html`.

20. Regenerate all affected HTML through the canonical assembler.

21. Update only the route, SEO, content, HTML, and PWA expectations directly affected by the new page.

22. Add `/kontakt.html` to the PWA primary-document contract only if this matches the current explicit primary-page precache policy.

23. Add one focused Playwright test covering:

* `/kontakt.html` returns `200`
* correct heading and contact links
* accessible form fields
* shared navigation current state
* header and homepage CTA destinations
* homepage compact CTA links

EXECUTION BUDGET

* Inspect only files directly relevant to this contact-page task.
* Make one implementation pass.
* Run each focused verification command once.
* If verification reveals an unexpected issue, diagnose it once.
* Apply at most one minimal corrective fix and rerun only the affected focused check once.
* Do not perform repeated debugging or add temporary instrumentation.
* Do not run the full E2E suite.
* Do not expand into unrelated legal, design-system, backend, accessibility, PWA, or architecture work.
* If an unrelated issue remains, report it and stop.

CONSTRAINTS

* Do not create a backend or introduce a framework.
* Do not add external form libraries.
* Do not invent contact details beyond those explicitly provided.
* Do not invent availability, prices, hours, response-time promises, reviews, or business claims.
* Do not duplicate shared navigation or footer markup manually.
* Do not manually edit generated HTML regions.
* Do not redesign unrelated homepage sections.
* Do not change the existing visual identity.
* Do not remove the legacy `#contact` homepage anchor.
* Do not modify `INITIAL-AUDIT.md`.
* Preserve unrelated working-tree changes.
* Keep the diff focused and review-friendly.

TECHNICAL RULES

* Use `/kontakt.html` as the canonical contact route.
* Use semantic `<address>` markup for contact details.
* Use native links for telephone and email actions.
* Use semantic form controls and native validation first.
* Preserve keyboard access, visible focus, reduced motion, and theme support.
* Use existing design tokens and BEM naming patterns.
* Keep mobile-first responsive behavior.
* Keep source files canonical.
* Regenerate HTML and Service Worker output only through existing scripts.
* Do not manually edit generated `service-worker.js`.
* Keep the approved contact data exactly as provided.

Run only the relevant focused commands:

* `npm run build:html`
* `npm run check:html`
* `npm run check:content`
* `npm run check:seo`
* `npm run check:pwa` only if the PWA route contract changes
* one focused contact-page Playwright test
* focused Prettier validation for changed canonical source files
* `git diff --check`

OUTPUT EXPECTATION

Return a concise summary with:

* files inspected
* canonical route and metadata changes
* contact page structure
* exact contact details implemented
* form submission contract
* homepage CTA replacement
* final shared navigation, header CTA, hero CTA, and footer destinations
* generated pages refreshed
* PWA changes, if required
* focused verification performed
* any remaining limitation
* confirmation that no unsupported claims were added
* confirmation that `INITIAL-AUDIT.md` and unrelated changes were preserved

Do not include unrelated recommendations.
