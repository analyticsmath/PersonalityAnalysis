import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..', 'public', 'media', 'personality-v2');
const hero = path.join(root, 'hero', 'hero-h1-master.jpg');
const generated = path.join(root, 'ui');
await fs.mkdir(generated, { recursive: true });

const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#090B0A" fill-opacity=".54"/><text x="64" y="84" fill="#FFFFFF" font-family="Instrument Sans,Arial,sans-serif" font-size="24" font-weight="600" letter-spacing=".5">PERSONALITY ASSESSOR</text><text x="64" y="438" fill="#FFFFFF" font-family="Instrument Sans,Arial,sans-serif" font-size="78" font-weight="500" letter-spacing="-4">Your work leaves clues.</text></svg>`);
await sharp(hero, { failOn: 'none' }).resize(1200, 630, { fit: 'cover', position: 'attention' }).composite([{ input: overlay }]).jpeg({ quality: 88, progressive: true, mozjpeg: true }).toFile(path.join(generated, 'personality-assessor-og.jpg'));
