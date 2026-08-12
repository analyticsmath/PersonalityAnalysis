import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..', 'public', 'media', 'personality');
const folders = ['work', 'careers'];
const widths = [480, 768, 1200, 1600];
for (const folder of folders) {
  const directory = path.join(root, folder);
  const entries = await fs.readdir(directory);
  for (const entry of entries.filter((name) => /\.jpe?g$/i.test(name))) {
    const source = path.join(directory, entry);
    const stem = path.join(directory, path.parse(entry).name);
    for (const width of widths) {
      await sharp(source, { failOn: 'none' }).resize({ width, withoutEnlargement: true }).webp({ quality: 82, smartSubsample: true }).toFile(`${stem}-${width}.webp`);
    }
  }
}

const generated = path.join(root, 'generated');
await fs.mkdir(generated, { recursive: true });
const image = path.join(root, 'work', 'pa-work-02-software-overhead.jpg');
const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#151716" fill-opacity=".58"/><text x="70" y="82" fill="#fbfcfa" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3">PERSONALITY ASSESSOR</text><rect x="70" y="116" width="90" height="7" fill="#e9492c"/><text x="70" y="440" fill="#fbfcfa" font-family="Arial, sans-serif" font-size="86" font-weight="500" letter-spacing="-5">How you work is</text><text x="70" y="525" fill="#fbfcfa" font-family="Georgia, serif" font-size="88" font-style="italic">more than a job title.</text></svg>`);
await sharp(image, { failOn: 'none' }).resize(1200, 630, { fit: 'cover', position: 'centre' }).modulate({ saturation: 0.66, brightness: 0.56 }).composite([{ input: overlay }]).jpeg({ quality: 88 }).toFile(path.join(generated, 'personality-assessor-og.jpg'));
