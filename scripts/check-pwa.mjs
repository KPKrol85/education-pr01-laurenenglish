import { readFile, readdir, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";

import {
  OUTPUT_PATH,
  ROOT,
  TEMPLATE_PATH,
  createCacheRevision,
  createServiceWorkerBuild,
} from "./build-service-worker.mjs";
import {
  BRAND_LOGO_PATH,
  CACHE_PREFIX,
  CRITICAL_ASSET_BUDGET,
  FONT_PATHS,
  HERO_IMAGE_PATH,
  MANIFEST_ICON_PATHS,
  OFFLINE_PATH,
  PRECACHE_PATHS,
  PRIMARY_DOCUMENT_PATHS,
} from "./pwa-config.mjs";
import { ALL_PAGES, INDEXABLE_PAGES } from "./site-config.mjs";

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const countOccurrences = (source, value) => source.split(value).length - 1;
const readText = (path) => readFile(path, "utf8");
const publicFile = (path) => resolve(ROOT, `.${path}`);

const getAttribute = (tag, name) =>
  tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1] ?? null;

const getJpegDimensions = (buffer) => {
  assert(
    buffer[0] === 0xff && buffer[1] === 0xd8,
    `${HERO_IMAGE_PATH} is not a JPEG file`,
  );

  const startOfFrameMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce,
    0xcf,
  ]);
  let offset = 2;
  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    const segmentLength = buffer.readUInt16BE(offset);
    if (startOfFrameMarkers.has(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }
    offset += segmentLength;
  }

  throw new Error(`Could not read JPEG dimensions for ${HERO_IMAGE_PATH}`);
};

const getCssFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await getCssFiles(entryPath)));
    if (entry.isFile() && entry.name.endsWith(".css")) files.push(entryPath);
  }
  return files;
};

const verifyServiceWorker = async () => {
  const [firstBuild, secondBuild, generatedSource, template, packageJson] =
    await Promise.all([
      createServiceWorkerBuild(),
      createServiceWorkerBuild(),
      readText(OUTPUT_PATH),
      readText(TEMPLATE_PATH),
      readText(resolve(ROOT, "package.json")).then(JSON.parse),
    ]);

  assert(
    firstBuild.revision === secondBuild.revision &&
      firstBuild.source === secondBuild.source,
    "Identical PWA inputs must produce an identical cache revision and worker",
  );
  assert(
    generatedSource === firstBuild.source,
    "Generated service-worker.js is stale; run npm run build:sw",
  );
  assert(
    !/__[A-Z0-9_]+__/.test(generatedSource),
    "Generated service-worker.js contains an unresolved placeholder",
  );
  assert(
    CACHE_PREFIX === "clean-english-v",
    "The cache prefix must remain stable and project-specific",
  );
  assert(
    firstBuild.revision.startsWith(`${packageJson.version}-`),
    "Generated cache revision must begin with the package version",
  );

  const changedFiles = firstBuild.precacheFiles.map((file, index) =>
    index === 0
      ? {
          ...file,
          content: Buffer.concat([file.content, Buffer.from("changed")]),
        }
      : file,
  );
  const changedRevision = createCacheRevision({
    version: packageJson.version,
    template,
    precacheFiles: changedFiles,
  });
  assert(
    changedRevision !== firstBuild.revision,
    "Changed precache content must produce a new cache revision",
  );

  const lifecycleRequirements = [
    'request.method === "GET"',
    '["http:", "https:"].includes(url.protocol)',
    "url.origin === self.location.origin",
    "response.ok",
    "response.status === 200",
    'response.type === "basic"',
    "!response.redirected",
    '!response.headers.has("Content-Range")',
    "cache.addAll(PRECACHE_PATHS)",
    "await self.skipWaiting()",
    "await self.clients.claim()",
    "await caches.delete(CACHE_NAME)",
    "cacheName.startsWith(CACHE_PREFIX)",
    "cacheName !== CACHE_NAME",
  ];
  for (const requirement of lifecycleRequirements) {
    assert(
      template.includes(requirement),
      `Service-worker lifecycle contract is missing: ${requirement}`,
    );
  }
  assert(
    !template.includes("keys.filter((key) => key !== CACHE_NAME)"),
    "Activation cleanup must not delete every unrelated cache",
  );
  assert(
    !template.includes('cache.match("/index.html")'),
    "The homepage must not be used as a generic offline fallback",
  );

  return firstBuild;
};

const verifyManifestAndIcons = async () => {
  const manifest = JSON.parse(
    await readText(resolve(ROOT, "manifest.webmanifest")),
  );
  const requiredFields = [
    "name",
    "short_name",
    "id",
    "start_url",
    "scope",
    "display",
    "theme_color",
    "background_color",
    "lang",
    "icons",
  ];
  for (const field of requiredFields) {
    assert(manifest[field], `Manifest field is missing: ${field}`);
  }
  assert(manifest.id === "/", "Manifest id must identify the root application");
  assert(
    manifest.start_url === PRIMARY_DOCUMENT_PATHS[0],
    "Manifest start_url must use the production homepage path",
  );
  assert(manifest.scope === "/", "Manifest scope must cover public routes");
  assert(
    manifest.display === "standalone",
    "Manifest display must be standalone",
  );
  assert(manifest.lang === "pl", "Manifest language must be Polish");
  assert(
    /^#[0-9a-f]{6}$/i.test(manifest.theme_color) &&
      /^#[0-9a-f]{6}$/i.test(manifest.background_color),
    "Manifest theme colors must be six-digit hex values",
  );

  const declaredSizes = new Set();
  for (const icon of manifest.icons) {
    assert(
      MANIFEST_ICON_PATHS.includes(icon.src),
      `Unexpected manifest icon path: ${icon.src}`,
    );
    assert(
      icon.type === "image/svg+xml" && extname(icon.src) === ".svg",
      `Manifest icon type does not match its file: ${icon.src}`,
    );
    assert(
      !icon.purpose?.split(/\s+/).includes("maskable"),
      `Maskable purpose requires a separately verified safe-zone icon: ${icon.src}`,
    );

    const sizeMatch = icon.sizes?.match(/^(\d+)x(\d+)$/);
    assert(sizeMatch, `Manifest icon has an invalid sizes value: ${icon.src}`);
    const declaredWidth = Number(sizeMatch[1]);
    const declaredHeight = Number(sizeMatch[2]);
    const svg = await readText(publicFile(icon.src));
    const actualWidth = Number(svg.match(/<svg\b[^>]*\bwidth="(\d+)"/)?.[1]);
    const actualHeight = Number(svg.match(/<svg\b[^>]*\bheight="(\d+)"/)?.[1]);
    assert(
      actualWidth === declaredWidth && actualHeight === declaredHeight,
      `Manifest icon dimensions do not match ${icon.src}`,
    );
    assert(
      svg.includes(`viewBox="0 0 ${declaredWidth} ${declaredHeight}"`),
      `Manifest icon viewBox does not match ${icon.src}`,
    );
    declaredSizes.add(`${declaredWidth}x${declaredHeight}`);
  }
  assert(
    declaredSizes.has("192x192") && declaredSizes.has("512x512"),
    "Manifest requires verified 192x192 and 512x512 icons",
  );

  return manifest;
};

const verifyHeroAndFonts = async () => {
  const indexHtml = await readText(resolve(ROOT, "index.html"));
  const heroTags = indexHtml.match(
    /<img\b(?=[^>]*class="[^"]*\bhero__image\b)[^>]*>/gis,
  );
  assert(
    heroTags?.length === 1,
    "Homepage must contain one hero image element",
  );
  const heroTag = heroTags[0];
  assert(
    getAttribute(heroTag, "src") === HERO_IMAGE_PATH,
    "Homepage hero must use the configured critical image",
  );
  assert(
    getAttribute(heroTag, "loading") === "eager" &&
      getAttribute(heroTag, "loading") !== "lazy",
    "Homepage hero image must not be deferred",
  );
  assert(
    getAttribute(heroTag, "fetchpriority") === "high",
    "Homepage hero image must have high fetch priority",
  );
  assert(
    ["async", "sync"].includes(getAttribute(heroTag, "decoding")),
    "Homepage hero decoding behavior must be explicit",
  );

  const heroBuffer = await readFile(publicFile(HERO_IMAGE_PATH));
  const actualDimensions = getJpegDimensions(heroBuffer);
  const declaredDimensions = {
    width: Number(getAttribute(heroTag, "width")),
    height: Number(getAttribute(heroTag, "height")),
  };
  assert(
    declaredDimensions.width === actualDimensions.width &&
      declaredDimensions.height === actualDimensions.height,
    "Homepage hero width and height must match its intrinsic JPEG dimensions",
  );
  assert(
    heroBuffer.length <= CRITICAL_ASSET_BUDGET.maximumHeroImageBytes,
    `Hero image exceeds ${CRITICAL_ASSET_BUDGET.maximumHeroImageBytes} bytes`,
  );

  const baseCss = await readText(resolve(ROOT, "css/base/base.css"));
  const fontFaces = baseCss.match(/@font-face\s*{[\s\S]*?}/g) ?? [];
  assert(
    fontFaces.length === FONT_PATHS.length,
    `Expected ${FONT_PATHS.length} justified Inter font faces`,
  );

  const expectedFonts = new Map(
    FONT_PATHS.map((path) => [
      Number(path.match(/inter-(\d+)\.woff2$/)?.[1]),
      path,
    ]),
  );
  const deliveredWeights = [];
  for (const fontFace of fontFaces) {
    const weight = Number(fontFace.match(/font-weight:\s*(\d+)/)?.[1]);
    const source = fontFace.match(/url\("([^"]+)"\)/)?.[1];
    assert(
      expectedFonts.get(weight) === source,
      `Unexpected Inter ${weight} source`,
    );
    assert(
      /font-display:\s*swap/.test(fontFace),
      `Inter ${weight} must use non-blocking font-display: swap`,
    );
    await stat(publicFile(source));
    deliveredWeights.push(weight);
  }
  assert(
    deliveredWeights.sort((a, b) => a - b).join(",") === "400,600,700",
    "Production typography must deliver only Inter 400, 600, and 700",
  );

  const cssFiles = await getCssFiles(resolve(ROOT, "css"));
  const sourceCss = (
    await Promise.all(cssFiles.map((file) => readText(file)))
  ).join("\n");
  const cssWithoutFontFaces = sourceCss.replace(/@font-face\s*{[\s\S]*?}/g, "");
  assert(
    !/font-weight:\s*500\b/.test(cssWithoutFontFaces),
    "Inter 500 is declared but not used by the production UI",
  );
  assert(
    /font-weight:\s*600\b/.test(cssWithoutFontFaces) &&
      /font-weight:\s*700\b/.test(cssWithoutFontFaces),
    "Inter 600 and 700 must remain justified by explicit UI styles",
  );

  const fontBytes = (
    await Promise.all(FONT_PATHS.map((path) => stat(publicFile(path))))
  ).reduce((total, fileStat) => total + fileStat.size, 0);
  assert(
    fontBytes <= CRITICAL_ASSET_BUDGET.maximumInitialFontBytes,
    `Initial font files exceed ${CRITICAL_ASSET_BUDGET.maximumInitialFontBytes} bytes`,
  );

  return { fontBytes, heroBytes: heroBuffer.length };
};

const verifyProductionAssetContract = async () => {
  const pageSources = await Promise.all(
    ALL_PAGES.map(async (page) => ({
      page,
      html: await readText(resolve(ROOT, page.file)),
    })),
  );
  for (const { page, html } of pageSources) {
    assert(
      countOccurrences(html, 'href="/assets/build/style.min.css"') === 1,
      `${page.file} must request one production CSS bundle`,
    );
    assert(
      countOccurrences(html, 'src="/assets/build/main.min.js"') === 1,
      `${page.file} must request one production JavaScript bundle`,
    );
    assert(
      !/(?:href|src)="\/(?:css|js)\//.test(html),
      `${page.file} must not request source CSS or JavaScript`,
    );
    assert(
      !/<link\b[^>]*rel="preload"[^>]*as="font"/i.test(html),
      `${page.file} must not preload unproven font files`,
    );
  }

  const homepage = pageSources.find(({ page }) => page.key === "home").html;
  assert(
    countOccurrences(homepage, 'href="/assets/build/style.min.css"') ===
      CRITICAL_ASSET_BUDGET.productionCssRequests,
    "Homepage production CSS request budget changed",
  );
  assert(
    countOccurrences(homepage, 'src="/assets/build/main.min.js"') ===
      CRITICAL_ASSET_BUDGET.productionJavaScriptRequests,
    "Homepage production JavaScript request budget changed",
  );

  const generatedCss = await readText(
    publicFile("/assets/build/style.min.css"),
  );
  assert(
    !generatedCss.includes("inter-500.woff2"),
    "Generated CSS still delivers unused Inter 500",
  );
  for (const fontPath of FONT_PATHS) {
    assert(
      countOccurrences(generatedCss, fontPath) === 1,
      `Generated CSS must declare ${fontPath} exactly once`,
    );
  }
};

const run = async () => {
  const [build, manifest, criticalAssets] = await Promise.all([
    verifyServiceWorker(),
    verifyManifestAndIcons(),
    verifyHeroAndFonts(),
    verifyProductionAssetContract(),
  ]);

  assert(
    PRECACHE_PATHS.includes(OFFLINE_PATH) &&
      PRIMARY_DOCUMENT_PATHS.every((path) => PRECACHE_PATHS.includes(path)),
    "Precache must contain the offline page and every primary document",
  );
  assert(
    PRECACHE_PATHS.includes(BRAND_LOGO_PATH),
    "Precache must contain the shared brand logo",
  );
  assert(
    INDEXABLE_PAGES.length === PRIMARY_DOCUMENT_PATHS.length,
    "PWA primary-document policy must match the site route registry",
  );

  console.log(
    `Verified PWA cache ${build.cacheName}, ${PRECACHE_PATHS.length} precache entries, ${manifest.icons.length} manifest icons, hero ${criticalAssets.heroBytes} bytes, and ${FONT_PATHS.length} fonts totaling ${criticalAssets.fontBytes} bytes.`,
  );
};

run().catch((error) => {
  console.error(`PWA check failed: ${error.message}`);
  process.exitCode = 1;
});
