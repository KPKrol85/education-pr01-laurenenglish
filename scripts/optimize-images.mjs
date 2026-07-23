import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import imageminAvif from "imagemin-avif";
import imageminWebp from "imagemin-webp";
import sharp from "sharp";

import {
  CONTENT_IMAGE_ASSETS,
  MODERN_IMAGE_FORMATS,
  getModernImagePath,
} from "./image-config.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RASTER_EXTENSION = /\.(?:jpe?g|png)$/i;
const JPEG_EXTENSION = /\.jpe?g$/i;

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const toFilePath = (publicPath) => resolve(ROOT, `.${publicPath}`);

const createPlugin = (extension) => {
  if (extension === "avif") {
    return imageminAvif({ quality: 60, speed: 4 });
  }

  if (extension === "webp") {
    return imageminWebp({ quality: 82, method: 6, metadata: "all" });
  }

  throw new Error(`Unsupported image format: ${extension}`);
};

const ensureCanonicalSource = async (asset) => {
  const sourcePath = toFilePath(asset.sourcePath);

  try {
    const sourceStats = await stat(sourcePath);
    assert(
      sourceStats.isFile(),
      `Canonical image source is not a file: ${asset.sourcePath}`,
    );
    return { sourcePath, sourceWasCreated: false };
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }

  const fallbackPath = toFilePath(asset.fallbackPath);
  const fallbackStats = await stat(fallbackPath);
  assert(
    fallbackStats.isFile(),
    `Image fallback is not a file: ${asset.fallbackPath}`,
  );
  await mkdir(dirname(sourcePath), { recursive: true });
  await copyFile(fallbackPath, sourcePath);

  return { sourcePath, sourceWasCreated: true };
};

const optimizeJpegFallback = async ({ asset, source, sourceMetadata }) => {
  if (!JPEG_EXTENSION.test(asset.fallbackPath)) return null;

  const data = await sharp(source)
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer();
  const optimizedMetadata = await sharp(data).metadata();
  assert(
    optimizedMetadata.width === sourceMetadata.width &&
      optimizedMetadata.height === sourceMetadata.height,
    `Optimized JPEG dimensions changed for ${asset.fallbackPath}`,
  );

  await writeFile(toFilePath(asset.fallbackPath), data);
  return data.length;
};

const optimizeAsset = async (asset) => {
  assert(
    RASTER_EXTENSION.test(asset.fallbackPath),
    `Image source must be a JPEG or PNG fallback: ${asset.fallbackPath}`,
  );

  const { sourcePath, sourceWasCreated } = await ensureCanonicalSource(asset);
  const source = await readFile(sourcePath);
  const sourceMetadata = await sharp(source).metadata();
  const fallbackSize = await optimizeJpegFallback({
    asset,
    source,
    sourceMetadata,
  });

  const outputs = await Promise.all(
    MODERN_IMAGE_FORMATS.map(async ({ extension }) => {
      const outputPath = toFilePath(
        getModernImagePath(asset.fallbackPath, extension),
      );
      const data = await createPlugin(extension)(source);
      assert(
        Buffer.isBuffer(data) || data instanceof Uint8Array,
        `Optimizer did not return ${extension.toUpperCase()} data for ${asset.fallbackPath}`,
      );
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, data);
      return { extension, outputPath, size: data.length };
    }),
  );

  return {
    asset,
    fallbackSize,
    sourceSize: source.length,
    outputs,
    sourceWasCreated,
  };
};

const run = async () => {
  const results = await Promise.all(CONTENT_IMAGE_ASSETS.map(optimizeAsset));
  for (const {
    asset,
    fallbackSize,
    sourceSize,
    outputs,
    sourceWasCreated,
  } of results) {
    const outputSize = (extension) =>
      outputs.find((output) => output.extension === extension)?.size;
    const sourceStatus = sourceWasCreated ? " (source seeded)" : "";
    const jpegDetails =
      fallbackSize === null
        ? `source ${sourceSize} B`
        : `JPEG ${sourceSize} B -> ${fallbackSize} B`;

    console.log(
      `${asset.fallbackPath}${sourceStatus}: ${jpegDetails}, AVIF ${outputSize("avif")} B, WebP ${outputSize("webp")} B`,
    );
  }
};

run().catch((error) => {
  console.error(`Image optimization failed: ${error.message}`);
  process.exitCode = 1;
});
