import { expect, test } from "@playwright/test";

import {
  PRIMARY_PAGES,
  collectRuntimeDiagnostics,
  expectCleanDiagnostics,
  expectElementsContained,
  expectFocusDoesNotMoveViewport,
  expectNoDocumentOverflow,
} from "./helpers/runtime.mjs";

const DESKTOP_NAV_MIN_WIDTH = 1280;

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
        await expectElementsContained(
          page.locator(".button:visible, .card:visible"),
        );
        await expectFocusDoesNotMoveViewport(page);
      }

      await page.goto("/index.html", { waitUntil: "networkidle" });
      const usesMobileNavigation = viewport.width < DESKTOP_NAV_MIN_WIDTH;
      const navToggle = page.getByRole("button", { name: "Otwórz menu" });
      const desktopTheme = page.locator(".header__actions [data-theme-toggle]");

      await expectElementsContained(
        page.locator(
          ".header__logo, .nav__toggle:visible, .header__actions:visible",
        ),
      );

      if (usesMobileNavigation) {
        await expect(navToggle).toBeVisible();
        await expect(desktopTheme).toBeHidden();
        if (viewport.width === 320) {
          await page.locator("html").evaluate((element) => {
            element.style.fontSize = "125%";
          });
          await expectNoDocumentOverflow(page);
        }
        await navToggle.click();
        const drawer = page.locator("[data-drawer]");
        await expect(drawer).toBeVisible();
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
        const navigationMetrics = await page
          .locator(".header__inner")
          .evaluate((header) => {
            const links = [...header.querySelectorAll(".nav__link")];
            return {
              fits: header.scrollWidth <= header.clientWidth,
              links: links.map((link) => {
                const rect = link.getBoundingClientRect();
                const style = getComputedStyle(link);
                return {
                  height: rect.height,
                  lineHeight: Number.parseFloat(style.lineHeight),
                  paddingBlock:
                    Number.parseFloat(style.paddingTop) +
                    Number.parseFloat(style.paddingBottom),
                  whiteSpace: style.whiteSpace,
                  width: rect.width,
                };
              }),
            };
          });
        expect(navigationMetrics.fits).toBe(true);
        for (const link of navigationMetrics.links) {
          expect(link.width).toBeGreaterThan(0);
          expect(link.whiteSpace).toBe("nowrap");
          expect(link.height).toBeLessThanOrEqual(
            link.lineHeight + link.paddingBlock + 1,
          );
        }
      }

      await expectElementsContained(
        page.locator(
          ".hero__actions .button, .grid--pricing .card, [data-tab-panel='all'] .card",
        ),
      );

      await page.evaluate(() => {
        document.documentElement.style.fontSize = "";
        localStorage.setItem("theme", "dark");
      });
      await page.goto("/pakiety.html", { waitUntil: "networkidle" });
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await expectNoDocumentOverflow(page);
      await expectElementsContained(
        page.locator(".button:visible, .card:visible"),
      );
      await expectFocusDoesNotMoveViewport(page);
      await page.evaluate(() => localStorage.removeItem("theme"));
      await expectNoDocumentOverflow(page);
      expectCleanDiagnostics(diagnostics);
    });
  }
});
