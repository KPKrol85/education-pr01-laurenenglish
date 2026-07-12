import { expect, test } from "@playwright/test";

import {
  PRIMARY_PAGES,
  collectRuntimeDiagnostics,
  expectCleanDiagnostics,
  expectElementsContained,
  expectNoDocumentOverflow,
} from "./helpers/runtime.mjs";

const VIEWPORTS = Object.freeze([
  { width: 320, height: 844 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
]);

test.describe("responsive production contracts", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop");
  });

  for (const viewport of VIEWPORTS) {
    test(`${viewport.width}px contains pages, controls, CTAs, and cards`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      const diagnostics = collectRuntimeDiagnostics(page);

      for (const publicPage of PRIMARY_PAGES) {
        const response = await page.goto(publicPage.path, {
          waitUntil: "networkidle",
        });
        expect(response?.ok()).toBe(true);
        await expectNoDocumentOverflow(page);
      }

      await page.goto("/index.html", { waitUntil: "networkidle" });
      const usesMobileNavigation = viewport.width < 780;
      const navToggle = page.getByRole("button", { name: "Otwórz menu" });
      const desktopTheme = page.locator(".header__actions [data-theme-toggle]");

      if (usesMobileNavigation) {
        await expect(navToggle).toBeVisible();
        await expect(desktopTheme).toBeHidden();
        await navToggle.click();
        const drawer = page.locator("[data-drawer]");
        await page.waitForFunction(() => {
          const element = document.querySelector("[data-drawer]");
          const transform = getComputedStyle(element).transform;
          return (
            element.classList.contains("is-open") &&
            (transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)")
          );
        });
        const box = await drawer.boundingBox();
        expect(box).not.toBeNull();
        expect(box.x).toBeGreaterThanOrEqual(-0.5);
        expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 0.5);
        expect(box.y).toBeGreaterThanOrEqual(-0.5);
        expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 0.5);
        await page.keyboard.press("Escape");
        expect(await drawer.evaluate((element) => element.inert)).toBe(true);
      } else {
        await expect(navToggle).toBeHidden();
        await expect(desktopTheme).toBeVisible();
      }

      await expectElementsContained(
        page.locator(
          ".hero__actions .button, .grid--pricing .card, [data-tab-panel='all'] .card",
        ),
      );

      const focusResult = await page.evaluate(async () => {
        const selectors =
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const candidates = [...document.querySelectorAll(selectors)].filter(
          (element) =>
            element instanceof HTMLElement &&
            element.offsetParent !== null &&
            !element.closest("[inert]"),
        );
        const shifted = [];
        for (const element of candidates) {
          element.focus();
          await new Promise((resolve) => requestAnimationFrame(resolve));
          if (Math.abs(scrollX) > 0.5) {
            shifted.push({
              label:
                element.getAttribute("aria-label") ||
                element.textContent?.trim().slice(0, 60) ||
                element.tagName,
              scrollX,
            });
          }
        }
        return shifted;
      });
      expect(focusResult).toEqual([]);
      await expectNoDocumentOverflow(page);
      expectCleanDiagnostics(diagnostics);
    });
  }
});
