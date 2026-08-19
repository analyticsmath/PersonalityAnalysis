import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const baseDir = path.resolve(import.meta.dirname, '..', 'public', 'media', 'personality-v6');
const sourceDir = path.join(baseDir, 'source');
const optimizedDir = path.join(baseDir, 'optimized');

await fs.mkdir(optimizedDir, { recursive: true });

const manifestDefinitions = [
  {
    id: 'b01',
    filename: 'pa-b01-openness-prismatic-portrait.jpg',
    widths: [720, 1080, 1440, 1920],
    role: 'Big Five: Openness; experimental portrait crop',
    alt: 'Experimental prismatic portrait reflecting openness and cognitive exploration',
    focalPoint: { desktop: '50% 40%', mobile: '50% 36%' }
  },
  {
    id: 'b02',
    filename: 'pa-b02-conscientiousness-architectural-sketch.jpg',
    widths: [640, 960, 1280, 1920],
    role: 'Big Five: Conscientiousness; structured planning',
    alt: 'Detailed architectural drawing representing systematic structure and precision',
    focalPoint: { desktop: '50% 50%', mobile: '50% 50%' }
  },
  {
    id: 'b03',
    filename: 'pa-b03-extraversion-team-exchange.jpg',
    widths: [640, 960, 1280, 1920],
    role: 'Big Five: Extraversion; energetic group exchange',
    alt: 'Engaged team in active collaborative dialogue and exchange',
    focalPoint: { desktop: '50% 48%', mobile: '50% 48%' }
  },
  {
    id: 'b04',
    filename: 'pa-b04-agreeableness-workshop-table.jpg',
    widths: [640, 960, 1280, 1920],
    role: 'Big Five: Agreeableness; shared working field',
    alt: 'Collaborative workshop table with hands reviewing shared plans',
    focalPoint: { desktop: '50% 50%', mobile: '50% 50%' }
  },
  {
    id: 'b05',
    filename: 'pa-b05-stability-water-texture.jpg',
    widths: [640, 960, 1280, 1920],
    role: 'Big Five: Emotional Stability; calm abstract field',
    alt: 'Calm water surface texture representing emotional steadiness and composure',
    focalPoint: { desktop: '50% 50%', mobile: '50% 50%' }
  },
  {
    id: 'b06',
    filename: 'pa-b06-riasec-realistic-industrial-dialogue.jpg',
    widths: [640, 960, 1280, 1920],
    role: 'RIASEC: Realistic',
    alt: 'Industrial engineering environment representing hands-on technical systems',
    focalPoint: { desktop: '50% 50%', mobile: '50% 50%' }
  },
  {
    id: 'b07',
    filename: 'pa-b07-riasec-investigative-laboratory.jpg',
    widths: [640, 960, 1280, 1920],
    role: 'RIASEC: Investigative',
    alt: 'Scientific research laboratory representing empirical inquiry and analysis',
    focalPoint: { desktop: '50% 50%', mobile: '50% 50%' }
  },
  {
    id: 'b08',
    filename: 'pa-b08-riasec-artistic-watercolour.jpg',
    widths: [640, 960, 1280, 1920],
    role: 'RIASEC: Artistic',
    alt: 'Creative watercolour textures representing design and conceptual synthesis',
    focalPoint: { desktop: '50% 50%', mobile: '50% 50%' }
  },
  {
    id: 'b09',
    filename: 'pa-b09-riasec-social-conversation.jpg',
    widths: [640, 960, 1280, 1920],
    role: 'RIASEC: Social',
    alt: 'Meaningful interpersonal conversation representing mentorship and group development',
    focalPoint: { desktop: '50% 50%', mobile: '50% 50%' }
  },
  {
    id: 'b10',
    filename: 'pa-b10-riasec-enterprising-presentation.jpg',
    widths: [640, 960, 1280, 1920],
    role: 'RIASEC: Enterprising',
    alt: 'Executive presentation and strategic alignment session',
    focalPoint: { desktop: '50% 45%', mobile: '50% 45%' }
  },
  {
    id: 'b11',
    filename: 'pa-b11-riasec-conventional-documents.jpg',
    widths: [720, 1080, 1440, 1920],
    role: 'RIASEC: Conventional',
    alt: 'Structured documents and ledger systems representing governance and precision',
    focalPoint: { desktop: '50% 50%', mobile: '50% 50%' }
  },
  {
    id: 'b12',
    filename: 'pa-b12-onet-workflow-evidence.jpg',
    widths: [640, 960, 1280, 1920],
    role: 'O*NET values and behavioural-signal evidence field',
    alt: 'High-focus workflow evidence field with detailed technical instruments',
    focalPoint: { desktop: '50% 50%', mobile: '50% 50%' }
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
    role: item.role,
    alt: item.alt,
    focalPoint: item.focalPoint,
    originalDimensions: { width: metadata.width, height: metadata.height },
    aspectRatio: `${metadata.width} / ${metadata.height}`,
    source: `/media/personality-v6/source/${item.filename}`,
    avif: {},
    webp: {}
  };

  for (const width of item.widths) {
    if (width > metadata.width + 50) continue;

    const avifName = `${baseName}-${width}.avif`;
    const webpName = `${baseName}-${width}.webp`;
    const avifOut = path.join(optimizedDir, avifName);
    const webpOut = path.join(optimizedDir, webpName);

    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 56, effort: 4 })
      .toFile(avifOut);

    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(webpOut);

    assetCredit.avif[width] = `/media/personality-v6/optimized/${avifName}`;
    assetCredit.webp[width] = `/media/personality-v6/optimized/${webpName}`;
  }

  credits.push(assetCredit);
  console.log(`Optimized ${item.filename} (${metadata.width}x${metadata.height})`);
}

const creditsPath = path.join(baseDir, 'asset-credits.json');
await fs.writeFile(creditsPath, JSON.stringify({ version: '6.0', generatedAt: new Date().toISOString(), assets: credits }, null, 2));
console.log(`Wrote credits to ${creditsPath}`);
