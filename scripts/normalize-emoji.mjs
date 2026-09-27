// Trims transparent padding from each ac-emoji-* asset,
// fits the content to 80×80 with contain, and centers it on a 96×96 transparent canvas.
// SVG files are rasterized and re-saved as PNG; existing PNGs are overwritten in place.
import sharp from 'sharp';
import { readdirSync, writeFileSync, unlinkSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '..', 'public', 'assets');
const CANVAS = 96;
const CONTENT = 80;
const PAD = (CANVAS - CONTENT) / 2; // 8px each side

const files = readdirSync(ASSETS_DIR).filter(f => /^ac-emoji-/.test(f));

for (const file of files) {
  const ext = extname(file).toLowerCase();
  const stem = basename(file, ext);
  const src = join(ASSETS_DIR, file);
  const dest = join(ASSETS_DIR, `${stem}.png`);

  const buf = await sharp(src, ext === '.svg' ? { density: 144 } : {})
    .trim({ threshold: 10 })
    .resize(CONTENT, CONTENT, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: PAD, bottom: PAD, left: PAD, right: PAD,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  writeFileSync(dest, buf);
  if (ext !== '.png') unlinkSync(src);
  console.log(`✓  ${file.padEnd(32)} →  ${stem}.png`);
}

console.log(`\nDone — ${files.length} files processed.`);
