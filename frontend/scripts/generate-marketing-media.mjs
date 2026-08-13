import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..', 'public', 'media', 'personality');
const folders = ['context', 'work', 'careers'];
const widths = [640, 960, 1440, 1920];
for (const folder of folders) {
  const directory = path.join(root, folder);
  const entries = await fs.readdir(directory);
  for (const entry of entries.filter((name) => /\.jpe?g$/i.test(name))) {
    const source = path.join(directory, entry);
    const stem = path.join(directory, path.parse(entry).name);
    for (const width of widths) {
      const avifOutput = `${stem}-${width}.avif`;
      const webpOutput = `${stem}-${width}.webp`;
      const [avifExists, webpExists] = await Promise.all([
        fs.access(avifOutput).then(() => true).catch(() => false),
        fs.access(webpOutput).then(() => true).catch(() => false),
      ]);
      if (avifExists && webpExists) continue;
      const pipeline = sharp(source, { failOn: 'none' }).resize({ width, withoutEnlargement: true });
      if (!avifExists) await pipeline.clone().avif({ quality: 60 }).toFile(avifOutput);
      if (!webpExists) await pipeline.clone().webp({ quality: 82, smartSubsample: true }).toFile(webpOutput);
    }
  }
}

const generated = path.join(root, 'generated');
await fs.mkdir(generated, { recursive: true });
const image = path.join(root, 'context', 'pa-context-pro-01.jpg');
const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#090B0A" fill-opacity=".72"/><text x="70" y="92" fill="#FFFFFF" font-family="Instrument Sans, Arial, sans-serif" font-size="25" font-weight="600" letter-spacing="-1">Personality Assessor</text><text x="70" y="452" fill="#FFFFFF" font-family="Instrument Sans, Arial, sans-serif" font-size="82" font-weight="500" letter-spacing="-5">Professional context,</text><text x="70" y="536" fill="#FFFFFF" font-family="Instrument Sans, Arial, sans-serif" font-size="82" font-weight="500" letter-spacing="-5">made inspectable.</text></svg>`);
await sharp(image, { failOn: 'none' }).resize(1200, 630, { fit: 'cover', position: 'attention' }).modulate({ saturation: 0.72, brightness: 0.72 }).composite([{ input: overlay }]).jpeg({ quality: 88 }).toFile(path.join(generated, 'personality-assessor-og.jpg'));
