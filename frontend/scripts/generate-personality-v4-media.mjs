import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const baseDir = path.resolve(import.meta.dirname, '..', 'public', 'media', 'personality-v4');
const sourceDir = path.join(baseDir, 'source');
const optimizedDir = path.join(baseDir, 'optimized');

await fs.mkdir(optimizedDir, { recursive: true });

const manifestDefinitions = [
  {
    id: 'a01',
    filename: 'pa-a01-obscured-profile.jpg',
    widths: [720, 1080, 1440, 1920],
    photographer: 'Nick Fancher',
    sourceUrl: 'https://unsplash.com/photos/a-blurred-person-is-seen-through-textured-glass-PC95v7pFWrk',
    rawUrl: 'https://plus.unsplash.com/premium_photo-1747851402163-9183f38a658c',
    role: 'Homepage hero, closing callback, 404 background fragment',
    alt: 'A blurred profile seen through textured glass'
  },
  {
    id: 'a02',
    filename: 'pa-a02-response-glass.jpg',
    widths: [640, 960, 1280],
    photographer: 'Nick Fancher',
    sourceUrl: 'https://unsplash.com/photos/a-figure-presses-hands-against-textured-glass-igj-6zFf4Ow',
    rawUrl: 'https://plus.unsplash.com/premium_photo-1747852026368-c3227053a7ef',
    role: 'Adaptive question scene and career world sequence',
    alt: 'A figure pressing both hands against textured glass.'
  },
  {
    id: 'a03',
    filename: 'pa-a03-investigative-world.jpg',
    widths: [640, 960, 1280],
    photographer: 'Nick Fancher',
    sourceUrl: 'https://unsplash.com/photos/green-figure-behind-a-textured-glass-pane-Ag4rx5wVExk',
    rawUrl: 'https://plus.unsplash.com/premium_photo-1747852026597-706ffe3a6b3b',
    role: 'Investigative work world scene',
    alt: 'A human figure seen through green textured glass.'
  },
  {
    id: 'a04',
    filename: 'pa-a04-expressive-world.jpg',
    widths: [640, 960, 1280],
    photographer: 'Nick Fancher',
    sourceUrl: 'https://unsplash.com/photos/a-silhouette-poses-with-hands-raised-lit-brightly-uL3mucbQV5I',
    rawUrl: 'https://plus.unsplash.com/premium_photo-1747852128417-03066ea4cd67',
    role: 'Expressive/Artistic work world scene',
    alt: 'A backlit silhouette with raised hands behind textured glass.'
  },
  {
    id: 'a05',
    filename: 'pa-a05-relational-world.jpg',
    widths: [640, 960, 1280],
    photographer: 'Nick Fancher',
    sourceUrl: 'https://unsplash.com/photos/a-silhouette-is-seen-through-a-textured-yellow-backdrop-qkrAmAhAJHg',
    rawUrl: 'https://plus.unsplash.com/premium_photo-1747851401089-b03370623bc6',
    role: 'Social/Relational work world scene',
    alt: 'A silhouette behind a textured yellow surface.'
  },
  {
    id: 'a06',
    filename: 'pa-a06-directional-world.jpg',
    widths: [640, 960, 1280],
    photographer: 'Nick Fancher',
    sourceUrl: 'https://unsplash.com/photos/a-green-silhouette-against-a-textured-orange-background-rX6WGsJlN4U',
    rawUrl: 'https://plus.unsplash.com/premium_photo-1747851401086-7dbcb48995c9',
    role: 'Enterprising/Directional work world scene',
    alt: 'A green silhouette against a textured orange background.'
  },
  {
    id: 'a07',
    filename: 'pa-a07-methodology-collage.jpg',
    widths: [720, 1080, 1440],
    photographer: 'Karolina Grabowska',
    sourceUrl: 'https://unsplash.com/photos/collage-of-a-womans-face-with-blonde-hair-4p2IwkAVVZE',
    rawUrl: 'https://plus.unsplash.com/premium_photo-1758893665403-f19b54474561',
    role: 'Methodology visual atlas & readings field',
    alt: 'A portrait overlaid with a collage of facial details.'
  },
  {
    id: 'a08',
    filename: 'pa-a08-trust-handoff.jpg',
    widths: [960, 1440, 1920],
    photographer: 'Allec Gomes',
    sourceUrl: 'https://unsplash.com/photos/shadows-of-hands-almost-touching-h9UnfGJTAp4',
    rawUrl: 'https://plus.unsplash.com/premium_photo-1750266869605-587e1853721e',
    role: 'Trust handoff and evidence chain',
    alt: 'Two hand shadows nearly touching on a textured wall.'
  },
  {
    id: 'a09',
    filename: 'pa-a09-login-refraction.jpg',
    widths: [720, 1080, 1440],
    photographer: 'Nick Fancher',
    sourceUrl: 'https://unsplash.com/photos/a-womans-face-refracted-through-vertical-lines-J5Av49OMSZ0',
    rawUrl: 'https://plus.unsplash.com/premium_photo-1747851577041-4f1cf00e5deb',
    role: 'Login page refraction scene',
    alt: 'A portrait refracted through vertical glass lines'
  },
  {
    id: 'a10',
    filename: 'pa-a10-signup-red-landscape.jpg',
    widths: [720, 1080, 1440],
    photographer: 'Nick Fancher',
    sourceUrl: 'https://unsplash.com/photos/a-woman-stands-silhouetted-in-red-light-VffXTE8wkkk',
    rawUrl: 'https://plus.unsplash.com/premium_photo-1747852197727-e6a343ce87ae',
    role: 'Signup page red landscape scene',
    alt: 'A silhouette standing against ambient light'
  }
];

const credits = [];

for (const item of manifestDefinitions) {
  const srcPath = path.join(sourceDir, item.filename);
  const buffer = await fs.readFile(srcPath);
  const metadata = await sharp(buffer).metadata();
  const baseName = item.filename.replace(/\.jpg$/, '');

  const assetCredit = {
    id: item.id,
    filename: item.filename,
    photographer: item.photographer,
    sourceUrl: item.sourceUrl,
    rawUrl: item.rawUrl,
    role: item.role,
    alt: item.alt,
    originalDimensions: { width: metadata.width, height: metadata.height },
    variants: {
      avif: {},
      webp: {}
    }
  };

  for (const width of item.widths) {
    if (width > metadata.width) continue;

    const avifName = `${baseName}-${width}.avif`;
    const webpName = `${baseName}-${width}.webp`;
    const avifOut = path.join(optimizedDir, avifName);
    const webpOut = path.join(optimizedDir, webpName);

    // Optimized quality levels for high-DPI crispness and strict performance budgets
    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 54, effort: 4 })
      .toFile(avifOut);

    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(webpOut);

    assetCredit.variants.avif[width] = `/media/personality-v4/optimized/${avifName}`;
    assetCredit.variants.webp[width] = `/media/personality-v4/optimized/${webpName}`;
  }

  credits.push(assetCredit);
  console.log(`Optimized ${item.filename} (${metadata.width}x${metadata.height})`);
}

// Generate Open Graph image from A01
const a01Buffer = await fs.readFile(path.join(sourceDir, 'pa-a01-obscured-profile.jpg'));
const ogSvgOverlay = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#050506" fill-opacity="0.65"/>
    <text x="72" y="110" fill="#A4ABB4" font-family="sans-serif" font-size="16" font-weight="600" letter-spacing="3">PERSONALITY ASSESSOR</text>
    <text x="72" y="360" fill="#FFFFFF" font-family="serif" font-size="54" font-weight="500" letter-spacing="-1">See the professional patterns</text>
    <text x="72" y="425" fill="#FFFFFF" font-family="serif" font-size="54" font-weight="500" letter-spacing="-1">behind your decisions.</text>
    <text x="72" y="500" fill="#DDE1E6" font-family="sans-serif" font-size="20" font-weight="400">Adaptive personality and career intelligence</text>
  </svg>
`);

await sharp(a01Buffer)
  .resize(1200, 630, { fit: 'cover', position: 'center' })
  .composite([{ input: ogSvgOverlay }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(path.join(optimizedDir, 'personality-assessor-og.jpg'));

console.log('Generated personality-assessor-og.jpg');

const creditsPath = path.join(baseDir, 'asset-credits.json');
await fs.writeFile(creditsPath, JSON.stringify({ version: '4.0', generatedAt: new Date().toISOString(), assets: credits }, null, 2));
console.log(`Wrote credits to ${creditsPath}`);
