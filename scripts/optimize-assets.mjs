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
  // Cropped icon-only mark for navbar/favicon (top ~62% of frame holds the emblem)
  const meta = await sharp(src).metadata();
  const cropHeight = Math.round(meta.height * 0.62);
  await sharp(src)
    .extract({ left: 0, top: 0, width: meta.width, height: cropHeight })
    .resize(400, null, { fit: "inside" })
    .webp({ quality: 92 })
    .toFile(path.join(DIRS.brand, "logo-mark.webp"));
  await sharp(src)
    .extract({ left: 0, top: 0, width: meta.width, height: cropHeight })
    .resize(256, 256, { fit: "contain", background: { r: 17, g: 17, b: 17, alpha: 1 } })
    .png()
    .toFile(path.join(DIRS.brand, "favicon-256.png"));
  await sharp(src)
    .extract({ left: 0, top: 0, width: meta.width, height: cropHeight })
    .resize(64, 64, { fit: "contain", background: { r: 17, g: 17, b: 17, alpha: 1 } })
    .png()
    .toFile(path.join(DIRS.brand, "favicon-64.png"));
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
