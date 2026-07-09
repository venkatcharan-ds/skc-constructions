// Build-time asset pipeline: converts source assets (logo, project photos, cinematic
// frame sequence) into optimized, web-ready files under public/.
// Run manually with `node scripts/optimize-assets.mjs` whenever source assets change.
import sharp from "sharp";
import { mkdir, copyFile, readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SKC_ROOT = path.resolve(ROOT, "..");
const CONSTRUCTION_ROOT = path.resolve(SKC_ROOT, "..");

const PUBLIC = path.join(ROOT, "public");
const DIRS = {
  images: path.join(PUBLIC, "images"),
  frames: path.join(PUBLIC, "frames"),
  video: path.join(PUBLIC, "video"),
  brand: path.join(PUBLIC, "brand"),
};

async function ensureDirs() {
  for (const dir of Object.values(DIRS)) {
    await mkdir(dir, { recursive: true });
  }
}

async function processLogo() {
  const src = path.join(CONSTRUCTION_ROOT, "Design_a_premium_luxury_logo_f_1.jpg");
  // Full lockup for footer/loader
  await sharp(src)
    .resize(900, 502, { fit: "inside" })
    .webp({ quality: 90 })
    .toFile(path.join(DIRS.brand, "logo-full.webp"));

  // Cropped icon-only mark: top ~62% of the frame holds the emblem, and it's
  // horizontally centered in a narrow band — tighten the extract box around
  // it instead of keeping the full (mostly empty) source width, then render
  // at 2x for retina displays.
  const meta = await sharp(src).metadata();
  const cropHeight = Math.round(meta.height * 0.62);
  const cropWidth = Math.round(meta.width * 0.51);
  const cropLeft = Math.round((meta.width - cropWidth) / 2);
  const markRegion = { left: cropLeft, top: 0, width: cropWidth, height: cropHeight };

  await sharp(src)
    .extract(markRegion)
    .resize(900, null, { fit: "inside" })
    .webp({ quality: 92 })
    .toFile(path.join(DIRS.brand, "logo-mark.webp"));

  const faviconSizes = [16, 32, 64, 180, 192, 512];
  await Promise.all(
    faviconSizes.map((size) =>
      sharp(src)
        .extract(markRegion)
        .resize(size, size, { fit: "contain", background: { r: 17, g: 17, b: 17, alpha: 1 } })
        .png()
        .toFile(path.join(DIRS.brand, `favicon-${size}.png`))
    )
  );
  console.log("Logo assets ready");
}

async function processProjectImages() {
  const srcDir = path.join(SKC_ROOT, "im");
  const files = (await readdir(srcDir)).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
  for (const file of files) {
    const name = path.parse(file).name;
    await sharp(path.join(srcDir, file))
      .resize(1400, null, { withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(DIRS.images, `${name}.webp`));
    await sharp(path.join(srcDir, file))
      .resize(600, null, { withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(path.join(DIRS.images, `${name}-thumb.webp`));
  }
  console.log(`Processed ${files.length} project images`);
}

async function processFrameSequence() {
  const srcDir = path.join(SKC_ROOT, "ezgif-31eb174688174815-png-split");
  const files = (await readdir(srcDir)).filter((f) => f.endsWith(".png")).sort();
  let i = 1;
  for (const file of files) {
    const outName = `frame-${String(i).padStart(3, "0")}.webp`;
    await sharp(path.join(srcDir, file))
      .resize(1280, null, { withoutEnlargement: true })
      .webp({ quality: 68 })
      .toFile(path.join(DIRS.frames, outName));
    i += 1;
  }
  console.log(`Processed ${files.length} sequence frames`);
}

async function copyVideo() {
  const src = path.join(SKC_ROOT, "Construction_film_cinematic_story_202607062319.mp4");
  await copyFile(src, path.join(DIRS.video, "hero.mp4"));
  console.log("Hero video copied");
}

async function main() {
  await ensureDirs();
  await processLogo();
  await processProjectImages();
  await processFrameSequence();
  await copyVideo();
  console.log("Asset optimization complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
