PROJECT CONTEXT

You are a senior content-integrity and accessibility-focused frontend developer working on the Lauren English project.

You are working in the currently opened `education-pr01-laurenenglish` project.

Read and follow the existing project documentation before editing, especially:

* `CONTEXT-PROJECT.md`
* `INITIAL-AUDIT.md`
* `README.md`
* `docs/pakiety.md`
* `docs/runtime-checklist.md`
* any existing content, contact, privacy, terms, form, or legal documentation

Treat `CONTEXT-PROJECT.md` as the authoritative project context.

Roadmap points 1–5 are complete:

* the production asset pipeline is stable
* shared HTML shell content is generated through the existing Node workflow
* accessibility contracts are verified
* progressive enhancement is fail-safe
* package, material, CTA, and access information is derived from canonical data

Preserve these completed implementations.

This task implements roadmap point 6 from `INITIAL-AUDIT.md`:

`Replace unsupported public claims and legal placeholders with verified content`

Known audit findings include:

* public-facing navigation, headings, metadata, and copy contain prohibited `demo` language
* homepage testimonials are presented as real and include unsupported five-star ratings
* public contact and structured-data content includes an unverified email address
* public contact and structured-data content includes `+48 600 000 123`
* opening hours and WhatsApp availability are not supported by approved project documentation
* social links point to generic platform homepages rather than verified profiles
* privacy-policy and terms links incorrectly point to `offline.html`
* the Netlify form collects personal information without an applicable linked privacy policy
* some identity, availability, price, and commercial claims may lack an approved source

Internal documentation may describe the project as a demo or portfolio project where appropriate. The prohibition applies to customer-facing UI, metadata, structured data, form content, and public destinations.

Inspect the current implementation before editing because generated pages, shared shell content, package data, material data, and public copy may now be maintained through canonical build-time sources.

Preserve all unrelated user-authored working-tree changes and exclude them from task claims.

TASK OBJECTIVE

Audit every customer-facing claim and destination, then remove, replace, or retain it based only on verified project information.

The final public website must contain no fabricated or unsupported:

* testimonials
* star ratings
* personal or business identity details
* phone numbers
* email addresses
* opening hours
* WhatsApp availability
* social profiles
* prices or commercial claims
* legal destinations
* structured-data fields

Replace prohibited public `demo` terminology with natural customer-facing language derived from approved existing content.

Ensure social, legal, contact, form, and structured-data behavior accurately reflects the website’s real implementation.

Do not invent missing client or business details.

Where required factual inputs are unavailable:

* remove the unsupported claim or destination
* use a neutral, non-misleading informational state
* disable or remove data collection that cannot be supported responsibly
* do not leave placeholders

After implementation and successful verification, mark only roadmap point 6 as completed in `INITIAL-AUDIT.md`.

IMPLEMENTATION PLAN

1. Inspect the complete current working-tree diff and preserve unrelated user changes.
2. Inspect all canonical public-content sources and generated outputs, including:

   * all primary HTML pages
   * utility and status pages
   * shared header and footer source
   * HTML assembly scripts
   * content renderers
   * package and material data
   * homepage metadata and JSON-LD
   * contact section and form
   * testimonials or social-proof sections
   * social links
   * legal links
   * relevant documentation
3. Inventory all public-facing occurrences of:

   * `demo`
   * mockup or portfolio terminology
   * sample/test-project terminology
   * testimonials
   * ratings and star symbols
   * email addresses
   * phone numbers
   * opening hours
   * WhatsApp references
   * social-platform links
   * legal-policy links
   * business identity claims
   * experience, result, availability, or commercial claims
   * structured-data fields
4. Distinguish public output from internal documentation.
5. Do not remove accurate internal roadmap or audit wording merely because it contains `demo`.
6. Identify which public facts have an approved source in:

   * `CONTEXT-PROJECT.md`
   * canonical project data
   * approved documentation
   * verified user-authored content already present in the project
7. Retain only facts that have a defensible source.
8. Do not infer verification from repetition across files.
9. Replace prohibited public `demo` language with concise customer-facing wording that describes the actual feature or service.
10. Do not replace one unsupported claim with another.
11. Review the homepage progress section and replace labels such as `Demo śledzenia postępów` with factual product language that does not imply a developer preview.
12. Audit testimonials and ratings:

    * remove unsupported names, quotes, ratings, and claims
    * do not anonymize fabricated testimonials and keep them
    * do not create replacement reviews
13. If removing testimonials leaves a structural gap:

    * use only approved factual service-process or learning-method content already supported elsewhere
    * otherwise remove the section cleanly
    * do not redesign unrelated sections
14. Audit public business and contact details:

    * remove unsupported phone numbers
    * remove unsupported email addresses
    * remove unsupported opening hours
    * remove unsupported WhatsApp claims
    * retain only verified contact methods
15. If no verified direct contact destination exists:

    * do not invent one
    * keep only a technically honest contact path that is actually available
16. Inspect the Netlify form’s real technical behavior:

    * field names
    * submission target
    * personal data collected
    * success destination
    * consent or disclosure copy
17. Keep the data-submitting form operational only when the project contains enough verified information to provide an accurate disclosure and applicable privacy destination.
18. If verified controller/contact/privacy inputs are insufficient:

    * remove or disable actual personal-data submission
    * replace it with an honest non-submitting contact-information state
    * preserve semantic and accessible form presentation only when it remains truthful
19. Do not claim storage, deletion periods, processors, legal bases, encryption, or data handling that cannot be verified from the actual implementation and approved inputs.
20. Audit legal links:

    * no privacy or terms link may point to `offline.html`
    * link only to real applicable policy pages
21. If suitable legal pages already exist:

    * update them conservatively to match actual technical behavior
    * avoid unsupported legal guarantees
22. If legal pages do not exist:

    * create only the minimal pages required by currently operational behavior and only when the necessary factual inputs are available
    * use the existing shared-shell and HTML assembly architecture
23. If the necessary legal or operator information is unavailable:

    * do not create placeholder policies
    * remove or suspend the related data-collection behavior instead
24. Audit social destinations:

    * remove generic links to social-platform homepages
    * retain only verified profile URLs
    * remove associated UI cleanly when no verified profile exists
25. Audit JSON-LD and other structured data:

    * remove unsupported phone, email, opening hours, social profiles, ratings, reviews, identity, and business fields
    * retain structured data only when every retained field is supported
    * remove the schema block entirely if a truthful supported version cannot be produced
26. Audit public metadata:

    * titles
    * descriptions
    * Open Graph content
    * visible headings
    * CTA labels
27. Remove prohibited portfolio or developer terminology from public metadata and copy.
28. Review package prices and commercial details:

    * retain them only when supported by canonical package data and approved documentation
    * do not invent or rewrite prices during this task
29. Update canonical sources rather than patching assembled HTML or generated assets manually.
30. Regenerate shared HTML, assembled pages, CSS, JavaScript, and service-worker output through existing project scripts.
31. Add focused verification for public-content integrity where practical.
32. Run repository searches against canonical public sources and generated public output for:

    * prohibited public `demo` language
    * dummy phone number
    * unsupported email
    * WhatsApp
    * unsupported opening hours
    * generic social-platform URLs
    * `offline.html` used as a legal destination
    * unsupported testimonial and rating markup
    * unsupported structured-data properties
33. Run:

    * `npm run build:html`
    * `npm run check:html`
    * `npm run check:data`
    * `npm run build`
    * relevant JavaScript syntax checks
    * relevant Prettier checks
    * focused link and content-integrity checks
    * `git diff --check`
34. Verify generated HTML is reproducible and idempotent.
35. Start the documented local verification server.
36. Use fresh Playwright browser contexts and latest generated assets.
37. Test all primary public pages at:

    * desktop: `1440 × 900`
    * mobile: `390 × 844`
38. Test any utility or legal pages created or modified during this task.
39. Verify:

    * no prohibited public terminology remains
    * no unsupported testimonials or ratings remain
    * no unsupported business details remain
    * legal destinations resolve to appropriate content
    * generic social links are absent
    * contact behavior matches visible copy
    * form behavior matches its disclosure
    * structured data matches approved public facts
    * all local destinations return the expected response
40. Confirm no console errors, uncaught page errors, failed requests, broken local links, or unexpected HTTP responses.
41. Confirm previous roadmap guarantees remain intact:

    * shared shell
    * accessibility
    * progressive enhancement
    * canonical package and material data
42. If verification exposes a task-specific defect:

    * edit only the canonical source
    * apply the smallest safe correction
    * regenerate outputs
    * rerun every affected check
43. After all applicable acceptance criteria pass:

    * change only roadmap point 6 in `INITIAL-AUDIT.md` from `[ ]` to `[x]`
    * confirm roadmap points 7–10 remain unchecked
44. Stop the local verification server after testing.

CONSTRAINTS

* Do not invent client, teacher, company, operator, or business details.
* Do not invent testimonials, ratings, reviews, social profiles, contact information, opening hours, legal identities, or commercial claims.
* Do not generate placeholder legal content.
* Do not present generic social-platform homepages as profiles.
* Do not route legal links to `offline.html`, `404.html`, or unrelated pages.
* Do not keep personal-data collection active without an accurate applicable disclosure and destination.
* Do not claim legal compliance beyond what was actually implemented and verified.
* Do not add legal guarantees, retention periods, controller identities, or processing bases without approved information.
* Do not introduce a third-party consent or legal library.
* Do not introduce Vite.
* Do not introduce frameworks, APIs, databases, authentication, payments, or backend logic.
* Do not redesign the site.
* Do not perform unrelated responsive, token, theme, SEO-routing, or PWA work.
* Metadata and structured-data corrections directly required by unsupported claims are in scope.
* Do not modify canonical package or material data unless an unsupported public claim exists there.
* Do not edit assembled HTML or generated assets manually.
* Do not overwrite unrelated user-authored changes.
* Do not remove internal audit or portfolio documentation solely because it uses `demo`.
* Keep the diff focused, conservative, and review-friendly.
* Mark roadmap point 6 complete only after implementation and verification pass.
* Do not mark any other roadmap point complete.

TECHNICAL RULES

* Public copy must be realistic, natural, concise, and free from developer terminology.
* Every retained claim must have an approved source.
* Absence of verification requires removal or an honest unavailable state.
* Native links must lead to valid destinations.
* Buttons must perform real actions.
* Forms must accurately describe their real technical behavior.
* Structured data must not contain unsupported fields.
* Testimonials and ratings require verified provenance.
* Legal pages must describe only actual technical behavior and approved identities.
* Semantic HTML, accessible names, heading structure, focus behavior, and keyboard behavior must remain intact.
* Shared navigation and footer content must remain centralized.
* Public HTML must remain usable without JavaScript.
* Canonical sources must remain the only editable source of generated output.
* Existing BEM naming and CSS layer order must remain intact.
* Generated HTML must remain deterministic and idempotent.
* Browser verification must use fresh contexts and current production assets.
* Report only checks actually performed.

Acceptance criteria:

* no prohibited public `demo`, mockup, fake, test-site, or portfolio-simulation wording remains
* internal documentation remains accurate and may retain appropriate project terminology
* no unsupported testimonial remains
* no unsupported rating or five-star presentation remains
* no unsupported phone number remains
* no unsupported email remains
* no unsupported opening hours remain
* no unsupported WhatsApp claim remains
* no generic social-platform homepage is presented as a profile
* no legal link points to `offline.html` or another unrelated page
* active form behavior matches its visible disclosure
* personal-data submission is disabled or removed when an applicable truthful policy cannot be supported
* retained prices and commercial details have an approved canonical source
* JSON-LD contains only supported facts or is removed
* metadata contains no prohibited or unsupported public claims
* all retained public destinations resolve correctly
* all modified pages remain accessible and usable without JavaScript
* HTML assembly and production build pass
* generated output remains idempotent
* tested pages have no console errors, page errors, failed requests, broken links, or unexpected HTTP responses
* only roadmap point 6 is marked complete in `INITIAL-AUDIT.md`

OUTPUT EXPECTATION

Return a concise completion report with:

* documentation and canonical public-content sources inspected
* current working-tree diff reviewed
* unrelated user changes preserved
* files changed
* prohibited public terminology removed or replaced
* testimonial and rating handling
* business and contact-detail handling
* social-link handling
* form and personal-data handling
* legal-link and policy-page handling
* structured-data handling
* metadata handling
* package-price and commercial-claim verification result
* repository-wide public-content searches performed
* HTML assembly and production build results
* generated-output idempotence result
* browser tooling used
* pages and viewport sizes tested
* no-JavaScript result
* contact and form behavior result
* link, console, page-error, network, and HTTP results
* confirmation that roadmap point 6 was marked complete in `INITIAL-AUDIT.md`
* confirmation that roadmap points 7–10 remain unchecked
* any important limitation or missing verified input

Do not include unrelated recommendations.
