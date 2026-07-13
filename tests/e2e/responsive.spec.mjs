import { expect, test } from "@playwright/test";

import { SITE } from "../../scripts/site-config.mjs";
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

const expectSharedLogoContract = async (page) => {
  const headerLogo = page.locator(".header__logo");
  const footerLogo = page.locator(".footer__brand");
  const logoImages = page.locator(".header__logo-image, .footer__logo-image");

  await expect(headerLogo).toHaveAttribute("aria-label", SITE.name);
  await expect(headerLogo).toContainText(SITE.name);
  await expect(footerLogo).toContainText(SITE.name);
  await expect(
    page.getByRole("link", { name: SITE.name, exact: true }),
  ).toHaveCount(2);
  await expect(logoImages).toHaveCount(2);
  await expect(page.locator(".header__logo-mark")).toHaveCount(0);

  const metrics = await logoImages.evaluateAll((images) =>
    images.map((image) => {
      const rect = image.getBoundingClientRect();
      const linkRect = image.closest("a").getBoundingClientRect();
      const style = getComputedStyle(image);
      return {
        alt: image.getAttribute("alt"),
        complete: image.complete,
        display: style.display,
        height: rect.height,
        heightAttribute: image.getAttribute("height"),
        insideLink:
          rect.left >= linkRect.left - 0.5 &&
          rect.right <= linkRect.right + 0.5 &&
          rect.top >= linkRect.top - 0.5 &&
          rect.bottom <= linkRect.bottom + 0.5,
        naturalHeight: image.naturalHeight,
        naturalWidth: image.naturalWidth,
        objectFit: style.objectFit,
        source: new URL(image.currentSrc).pathname,
        width: rect.width,
        widthAttribute: image.getAttribute("width"),
      };
    }),
  );

  for (const metric of metrics) {
    expect(metric).toMatchObject({
      alt: "",
      complete: true,
      display: "block",
      heightAttribute: String(SITE.brandLogo.height),
      insideLink: true,
      naturalHeight: SITE.brandLogo.height,
      naturalWidth: SITE.brandLogo.width,
      objectFit: "contain",
      source: SITE.brandLogo.path,
      widthAttribute: String(SITE.brandLogo.width),
    });
    expect(metric.width).toBeGreaterThan(0);
    expect(metric.height).toBeGreaterThan(0);
    expect(metric.width / metric.height).toBeCloseTo(
      SITE.brandLogo.width / SITE.brandLogo.height,
      5,
    );
  }

  const headerOverlaps = await page
    .locator(".header__inner")
    .evaluate((header) => {
      const visibleRects = [
        header.querySelector(".header__logo"),
        header.querySelector(".nav__toggle"),
        header.querySelector(".nav__drawer"),
        header.querySelector(".header__actions"),
      ]
        .filter((element) => {
          if (!element) return false;
          const style = getComputedStyle(element);
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            !element.closest("[inert]")
          );
        })
        .map((element) => ({
          className: element.className,
          rect: element.getBoundingClientRect(),
        }));

      return visibleRects.flatMap((first, index) =>
        visibleRects.slice(index + 1).flatMap((second) => {
          const overlaps =
            first.rect.left < second.rect.right - 0.5 &&
            first.rect.right > second.rect.left + 0.5 &&
            first.rect.top < second.rect.bottom - 0.5 &&
            first.rect.bottom > second.rect.top + 0.5;
          return overlaps ? [`${first.className} / ${second.className}`] : [];
        }),
      );
    });
  expect(headerOverlaps).toEqual([]);
  await expectElementsContained(logoImages);
};

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
      await expectSharedLogoContract(page);
      expect(
        await page.evaluate(
          (path) =>
            performance
              .getEntriesByType("resource")
              .filter((entry) => new URL(entry.name).pathname === path).length,
          SITE.brandLogo.path,
        ),
      ).toBe(1);

      await page.locator("html").evaluate((element) => {
        element.dataset.theme = "dark";
      });
      await expectSharedLogoContract(page);
      await page.locator("html").evaluate((element) => {
        element.dataset.theme = "light";
      });
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
