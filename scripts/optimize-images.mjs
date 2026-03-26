/**
 * Lossy-optimizes raster assets in /public (JPEG + PNG).
 * Run: node scripts/optimize-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const MAX_JPEG_EDGE = 1600;
const MAX_PNG_EDGE = 1000;
const MAX_FAVICON_EDGE = 384;

const JPEG_OPTIONS = { quality: 80, mozjpeg: true, progressive: true };
const PNG_OPTIONS = { compressionLevel: 9, effort: 10 };

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function optimizeFile(filePath) {
  const base = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const before = (await fs.promises.stat(filePath)).size;

  const input = await fs.promises.readFile(filePath);
  let img = sharp(input).rotate();

  if (ext === '.jpg' || ext === '.jpeg') {
    const meta = await img.metadata();
    if (meta.width > MAX_JPEG_EDGE || meta.height > MAX_JPEG_EDGE) {
      img = img.resize(MAX_JPEG_EDGE, MAX_JPEG_EDGE, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    const buf = await img.jpeg(JPEG_OPTIONS).toBuffer();
    await fs.promises.writeFile(filePath, buf);
    return { base, before, after: buf.length };
  }

  if (ext === '.png') {
    const meta = await img.metadata();
    const isFavicon = base.toLowerCase() === 'fat barbell.png';
    const maxEdge = isFavicon ? MAX_FAVICON_EDGE : MAX_PNG_EDGE;
    if (meta.width > maxEdge || meta.height > maxEdge) {
      img = img.resize(maxEdge, maxEdge, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    const buf = await img.png(PNG_OPTIONS).toBuffer();
    await fs.promises.writeFile(filePath, buf);
    return { base, before, after: buf.length };
  }

  return null;
}

async function main() {
  const entries = await fs.promises.readdir(publicDir, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => /\.(jpe?g|png)$/i.test(name))
    .sort();

  let totalBefore = 0;
  let totalAfter = 0;

  for (const name of files) {
    const filePath = path.join(publicDir, name);
    const result = await optimizeFile(filePath);
    if (!result) continue;
    totalBefore += result.before;
    totalAfter += result.after;
    const delta = result.after - result.before;
    const sign = delta <= 0 ? '' : '+';
    console.log(
      `${result.base}: ${formatKb(result.before)} → ${formatKb(result.after)} (${sign}${formatKb(delta)})`
    );
  }

  console.log(
    `\nTotal: ${formatKb(totalBefore)} → ${formatKb(totalAfter)} (${formatKb(totalBefore - totalAfter)} saved)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
