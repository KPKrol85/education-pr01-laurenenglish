import { expect, test } from "@playwright/test";

import {
  collectRuntimeDiagnostics,
  expectCleanDiagnostics,
} from "./helpers/runtime.mjs";

const homepageAnchorCases = Object.freeze([
  { id: "how", label: "Metodyka", sourcePath: "/uslugi.html" },
  { id: "about", label: "O Lauren", sourcePath: "/uslugi.html" },
  { id: "faq", label: "FAQ", sourcePath: "/index.html" },
  { id: "contact", label: "Kontakt", sourcePath: "/index.html" },
]);

test("desktop navigation exposes its links and theme action", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  const diagnostics = collectRuntimeDiagnostics(page);
  await page.goto("/index.html", { waitUntil: "networkidle" });

  const navigation = page.getByRole("navigation", {
    name: "Główna nawigacja",
  });
  await expect(navigation.getByRole("link", { name: "Usługi" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Otwórz menu" })).toBeHidden();
  await expect(page.locator("[data-theme-toggle]:visible")).toHaveCount(1);
  expectCleanDiagnostics(diagnostics);
});

test("homepage anchor targets clear the sticky header", async ({ page }) => {
  const diagnostics = collectRuntimeDiagnostics(page);
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const { id, label, sourcePath } of homepageAnchorCases) {
    await page.goto(sourcePath, { waitUntil: "networkidle" });
    const navigation = page.getByRole("navigation", {
      name: "Główna nawigacja",
    });
    const mobileToggle = page.locator(".nav__toggle");

    if (await mobileToggle.isVisible()) {
      await mobileToggle.click();
    }

    await navigation.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/index\\.html#${id}$`));
    await page.waitForLoadState("networkidle");

    const geometry = await page.evaluate((targetId) => {
      const header = document.querySelector(".header");
      const target = document.getElementById(targetId);
      const heading = target?.querySelector(".section__title");
      if (!header || !target || !heading) return null;

      return {
        headerBottom: header.getBoundingClientRect().bottom,
        headingTop: heading.getBoundingClientRect().top,
      };
    }, id);

    expect(geometry, `Missing geometry for #${id}`).not.toBeNull();
    expect(
      geometry.headingTop,
      `#${id} heading must clear the sticky header`,
    ).toBeGreaterThan(geometry.headerBottom);
  }

  expectCleanDiagnostics(diagnostics);
});

test("mobile drawer is inert when closed and contains keyboard focus when open", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-mobile");
  const diagnostics = collectRuntimeDiagnostics(page);
  await page.goto("/index.html", { waitUntil: "networkidle" });

  const navigation = page.getByRole("navigation", {
    name: "Główna nawigacja",
  });
  const drawer = page.locator("[data-drawer]");
  const firstLink = drawer.locator('a[href="/uslugi.html"]');
  const toggle = page.locator(".nav__toggle");

  await expect(toggle).toHaveAccessibleName("Otwórz menu");
  await expect(drawer).toHaveAttribute("aria-hidden", "true");
  expect(await drawer.evaluate((element) => element.inert)).toBe(true);
  await expect(page.locator("[data-drawer-close]")).toHaveCount(0);
  await firstLink.evaluate((element) => element.focus());
  await expect(firstLink).not.toBeFocused();

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(drawer).toHaveAttribute("aria-hidden", "false");
  expect(await drawer.evaluate((element) => element.inert)).toBe(false);

  const drawerCta = drawer.getByRole("link", { name: "Informacje o zapisach" });
  await expect(firstLink).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(drawerCta).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(firstLink).toBeFocused();

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(drawer).toHaveAttribute("aria-hidden", "true");
  await expect(toggle).toBeFocused();

  await toggle.click();
  await expect(toggle).toHaveAccessibleName("Zamknij menu");

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(drawer).toHaveAttribute("aria-hidden", "true");
  await expect(toggle).toBeFocused();

  await toggle.click();
  await drawerCta.click();
  await expect(page).toHaveURL(/\/index\.html#contact$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(drawer).toHaveAttribute("aria-hidden", "true");
  expectCleanDiagnostics(diagnostics);
});

test("accordion synchronizes expanded and hidden state", async ({ page }) => {
  const diagnostics = collectRuntimeDiagnostics(page);
  await page.goto("/index.html", { waitUntil: "networkidle" });

  const trigger = page.getByRole("button", {
    name: "Jak wygląda pierwsza lekcja?",
  });
  const panelId = await trigger.getAttribute("aria-controls");
  const panel = page.locator(`#${panelId}`);

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toBeHidden();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute("aria-hidden", "false");
  expectCleanDiagnostics(diagnostics);
});

test("resource tabs preserve manual keyboard activation", async ({ page }) => {
  const diagnostics = collectRuntimeDiagnostics(page);
  await page.goto("/index.html", { waitUntil: "networkidle" });

  const allTab = page.getByRole("tab", { name: "Wszystko" });
  const grammarTab = page.getByRole("tab", { name: "Gramatyka" });
  await expect(allTab).toHaveAttribute("aria-selected", "true");

  await allTab.focus();
  await page.keyboard.press("ArrowRight");
  await expect(grammarTab).toBeFocused();
  await expect(grammarTab).toHaveAttribute("aria-selected", "false");
  await page.keyboard.press("Enter");
  await expect(grammarTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel", { name: "Gramatyka" })).toBeVisible();
  await expect(page.getByRole("tabpanel", { name: "Wszystko" })).toBeHidden();
  expectCleanDiagnostics(diagnostics);
});
