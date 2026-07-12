import { expect, test } from "@playwright/test";

import {
  PRIMARY_PAGES,
  collectRuntimeDiagnostics,
  expectCleanDiagnostics,
} from "./helpers/runtime.mjs";

test.describe("generated production pages", () => {
  for (const publicPage of PRIMARY_PAGES) {
    test(`${publicPage.name} loads generated assets without runtime errors`, async ({
      page,
    }) => {
      const diagnostics = collectRuntimeDiagnostics(page);
      const assetStatuses = new Map();

      page.on("response", (response) => {
        const url = new URL(response.url());
        if (url.hostname === "127.0.0.1" && url.port === "4173") {
          assetStatuses.set(url.pathname, response.status());
        }
      });

      const response = await page.goto(publicPage.path, {
        waitUntil: "networkidle",
      });
      expect(response?.ok()).toBe(true);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      await page.evaluate(() => document.fonts.ready.then(() => true));
      const fontPaths = await page.evaluate(() =>
        performance
          .getEntriesByType("resource")
          .map((entry) => new URL(entry.name).pathname)
          .filter((pathname) => pathname.startsWith("/assets/fonts/")),
      );

      expect(assetStatuses.get("/assets/build/style.min.css")).toBe(200);
      expect(assetStatuses.get("/assets/build/main.min.js")).toBe(200);
      expect(fontPaths.length).toBeGreaterThan(0);
      for (const fontPath of fontPaths) {
        expect(assetStatuses.get(fontPath)).toBe(200);
      }
      expectCleanDiagnostics(diagnostics);
    });
  }
});
