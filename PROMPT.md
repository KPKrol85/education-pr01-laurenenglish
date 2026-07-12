You are a senior frontend test-automation developer working on the Lauren English project.

PROJECT CONTEXT

You are working in the currently opened `education-pr01-laurenenglish` project.

Read and follow the current project documentation and repository state before editing, especially:

* `CONTEXT-PROJECT.md`
* `README.md`
* `INITIAL-AUDIT.md`
* `package.json`
* `.gitignore`
* `docs/runtime-checklist.md`
* existing build, HTML assembly, and verification scripts

Treat canonical source files as the source of truth. Do not manually edit generated HTML fragments, minified assets, or generated service-worker output.

Roadmap points 1–7 are complete.

Roadmap point 8 is currently blocked because the required permanent project-local Playwright workflow does not exist. The previous inspection confirmed there is no Playwright configuration, E2E test directory, Playwright npm script, or reusable browser-test workflow in the project.

This task establishes that missing workflow only. Do not implement roadmap point 8 during this task.

TASK OBJECTIVE

Add a permanent, reusable, project-local Playwright E2E workflow using the official `@playwright/test` runner.

The finished workflow must allow the project to run browser verification with:

`npm run test:e2e`

It must:

* automatically build the production output
* automatically start the existing local static server
* test the generated production pages
* use Chromium only
* include desktop and mobile coverage
* preserve reusable smoke, interaction, theme, and responsive checks
* use isolated browser contexts
* avoid stale service-worker and storage state
* keep reports and failure artifacts outside Git
* require no temporary scripts under `C:\tmp`
* require no `.codex`, `.agents`, external skill runner, or machine-specific absolute path

IMPLEMENTATION PLAN

1. Inspect the current package scripts, build pipeline, static server command, generated output paths, and existing verification scripts.
2. Confirm that no project-local Playwright workflow currently exists.
3. Inspect the current no-lockfile policy and preserve it.
4. Add `@playwright/test` as a development dependency without creating `package-lock.json`.
5. Install only the Chromium browser required by the project.
6. Create a minimal permanent structure such as:

   * `playwright.config.mjs`
   * `tests/e2e/smoke.spec.mjs`
   * `tests/e2e/interactions.spec.mjs`
   * `tests/e2e/theme.spec.mjs`
   * `tests/e2e/responsive.spec.mjs`
   * a small shared helper module only when it removes real duplication
7. Configure Playwright from the project root.
8. Use the existing production static server command through Playwright `webServer`.
9. Use a stable local test URL such as `http://127.0.0.1:4173`, unless the current project already defines another verified test port.
10. Configure Playwright to:

    * start the server automatically
    * wait for a valid project page
    * reuse a compatible existing server where safe
    * stop the server when Playwright started it
11. Configure Chromium projects for:

    * desktop: `1440 × 900`
    * mobile: `390 × 844`
12. Keep the default run deterministic:

    * no unnecessary full parallelism
    * predictable worker count
    * no arbitrary fixed delays
    * observable state-based waits
13. Configure artifacts:

    * screenshot only on failure
    * trace retained on failure or first retry
    * video disabled
    * HTML report generated without automatically opening
14. Prevent stale runtime state:

    * use isolated contexts
    * clear relevant local storage and Cache Storage where needed
    * block or unregister service workers during normal E2E verification
15. Add smoke coverage for all five primary pages:

    * `index.html`
    * `uslugi.html`
    * `pakiety.html`
    * `materialy.html`
    * `postepy.html`
16. Smoke tests must verify:

    * page loads successfully
    * generated production CSS loads
    * generated production JavaScript loads
    * local fonts load
    * no unexpected console errors
    * no uncaught page errors
    * no failed local requests
    * no unexpected HTTP responses
17. Add focused interaction coverage for established contracts:

    * desktop navigation visibility
    * mobile drawer open and close
    * closed drawer content cannot receive focus
    * Escape closes the drawer
    * focus returns to the trigger
    * theme controls remain synchronized
    * accordions update expanded and hidden state
    * tabs preserve the established keyboard model
18. Add focused theme coverage for:

    * light theme activation
    * dark theme activation
    * persisted theme restoration
    * synchronized desktop and mobile controls
19. Add focused responsive coverage for:

    * no document-level horizontal overflow
    * representative checks at 320, 390, 768, 1024, and 1440px
    * mobile drawer containment
    * header control visibility
    * representative CTA and card containment
20. Do not recreate the previous temporary 30-case audit harness line by line.
21. Keep browser tests focused on reusable product contracts.
22. Do not duplicate complete data, content, HTML, or CSS validation already handled by existing Node scripts.
23. Add npm scripts appropriate to the implemented structure:

    * `test:e2e`
    * `test:e2e:smoke`
    * `test:e2e:interactions`
    * `test:e2e:theme`
    * `test:e2e:responsive`
    * `test:e2e:headed`
    * `test:e2e:ui`
    * `test:e2e:report`
24. Ensure `npm run test:e2e` performs the required production build before running Playwright.
25. Do not rebuild inside individual spec files.
26. Add Playwright artifacts to `.gitignore`, including where applicable:

    * `playwright-report/`
    * `test-results/`
    * `blob-report/`
27. Keep configuration and test source files tracked.
28. Update README and runtime documentation with:

    * dependency installation
    * Chromium installation
    * complete E2E command
    * focused commands
    * headed and UI modes
    * report command
    * tested viewport coverage
    * artifact locations
    * distinction between static checks and browser E2E checks
29. Run the complete verification:

    * production build
    * existing data checks
    * existing content checks
    * existing HTML checks
    * existing CSS quality and contrast checks
    * relevant JavaScript syntax checks
    * `npm run test:e2e`
    * focused smoke, interaction, theme, and responsive commands
    * relevant Prettier checks
    * `git diff --check`
30. Confirm the E2E workflow works when no server is already running.
31. Confirm compatible server reuse works where configured.
32. Confirm test reports and failure artifacts remain untracked.
33. Do not change `INITIAL-AUDIT.md`.
34. Do not mark roadmap point 8 complete.

CONSTRAINTS

* Do not implement roadmap point 8.
* Do not change application UI, content, layout, themes, or product behavior.
* Do not introduce Vite.
* Do not replace the existing production build pipeline.
* Do not implement the separate localhost `8181` source-preview workflow.
* Do not add browsers other than Chromium.
* Do not add Axe or another accessibility-testing dependency.
* Do not add visual snapshot baselines.
* Do not add pixel-perfect screenshot testing.
* Do not add GitHub Actions or another CI workflow.
* Do not create temporary browser scripts under `C:\tmp`.
* Do not depend on `.codex`, `.agents`, external skills, or absolute machine paths.
* Do not create a lockfile.
* Do not modify unrelated dependency versions.
* Do not manually edit generated or minified files.
* Do not over-abstract the test architecture.
* Do not create one oversized specification file.
* Preserve unrelated working-tree changes.
* Keep the implementation minimal, permanent, and review-friendly.

TECHNICAL RULES

* Use the official `@playwright/test` package.
* Use ES modules consistently with the existing project.
* Use semantic locators based on roles, accessible names, labels, and stable existing hooks.
* Avoid selectors tied to incidental layout structure.
* Use isolated browser contexts.
* Use state-based waits instead of arbitrary delays.
* Collect console errors, page errors, failed requests, and unexpected HTTP responses consistently.
* Distinguish expected injected failures from unexpected diagnostics.
* Test observable behavior rather than private implementation details.
* Keep shared helpers small and deterministic.
* Clean up state modified by each test.
* Use the same canonical test sources for desktop and mobile projects.
* Commands must return a non-zero exit code when assertions fail.
* Documentation must match the actual implemented scripts.
* Report only checks that were genuinely executed.
* If the Playwright infrastructure fails twice for the same environment reason, stop and report the blocker instead of creating a replacement temporary harness.

Acceptance criteria:

* `@playwright/test` exists as a development dependency
* no `package-lock.json` is created
* Chromium is the only configured browser
* `playwright.config.mjs` exists
* Playwright automatically manages the project server
* desktop and mobile Chromium projects exist
* `npm run test:e2e` builds and runs the complete suite
* focused smoke, interaction, theme, and responsive commands exist and pass
* all five primary pages receive smoke coverage
* reports and artifacts are ignored by Git
* service-worker and storage isolation is deterministic
* no machine-specific path exists
* no temporary external harness is required
* existing production and static checks continue to pass
* documentation describes the real workflow
* `INITIAL-AUDIT.md` remains unchanged
* roadmap point 8 remains unchecked

OUTPUT EXPECTATION

Return a concise summary with:

* documentation and tooling inspected
* existing Playwright files found
* files created
* files changed
* dependency installation command and result
* confirmation that no lockfile was created
* Playwright configuration implemented
* server integration and port
* Chromium projects and viewport sizes
* test suites and helpers added
* npm scripts added
* service-worker and storage isolation behavior
* artifact and report policy
* `.gitignore` changes
* documentation changes
* build and static checks executed
* complete E2E result
* focused test results
* pages and scenarios tested
* console, page-error, request, and HTTP results
* confirmation that no temporary external harness is required
* confirmation that `INITIAL-AUDIT.md` was not changed
* confirmation that point 8 remains unchecked
* any blocker encountered
