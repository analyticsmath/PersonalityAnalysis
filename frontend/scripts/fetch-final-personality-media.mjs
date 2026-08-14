import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..', 'public', 'media', 'personality-v3');
const manifestPath = path.join(root, 'media-provenance.json');
const retrievedAt = new Date().toISOString();
const nonEndorsementNote = 'Pexels subjects are not Personality Assessor customers, assessment subjects, endorsers, or people who received career matches.';

const sources = [
  {
    key: 'hero-a',
    folder: 'hero',
    id: '9618456',
    pageUrl: 'https://www.pexels.com/photo/top-view-of-an-architect-sitting-at-a-desk-and-creating-a-project-9618456/',
    title: 'Top view of an architect sitting at a desk and creating a project',
    usage: 'Dominant hero professional evidence environment (wide 16:10 / 55–65% mass)',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 45%' },
    creator: 'Pexels Contributor',
    isHero: true,
  },
  {
    key: 'hero-b',
    folder: 'hero',
    id: '9617376',
    pageUrl: 'https://www.pexels.com/photo/drawings-and-plans-glued-on-wall-9617376/',
    title: 'Drawings and plans glued on wall',
    usage: 'Hero evidence wall tall supporting actor',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
    isHero: true,
  },
  {
    key: 'developer',
    folder: 'actors',
    id: '7988086',
    pageUrl: 'https://www.pexels.com/photo/a-person-doing-computer-programming-7988086/',
    title: 'A person doing computer programming',
    usage: 'Developer hero fragment / shared actor carried to Work Worlds: Build',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
  },
  {
    key: 'scientist',
    folder: 'actors',
    id: '9259943',
    pageUrl: 'https://www.pexels.com/photo/close-up-of-a-person-using-lab-equipment-9259943/',
    title: 'Close-up of a person using lab equipment',
    usage: 'Scientist hero fragment / Work Worlds: Investigate',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
  },
  {
    key: 'student',
    folder: 'actors',
    id: '5940721',
    pageUrl: 'https://www.pexels.com/photo/woman-working-on-laptop-with-documents-5940721/',
    title: 'Woman working on laptop with documents',
    usage: 'Student / graduate hero fragment / context intake',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
  },
  {
    key: 'make',
    folder: 'worlds',
    id: '9617889',
    pageUrl: 'https://www.pexels.com/photo/mans-hands-on-drawing-accessories-9617889/',
    title: "Man's hands on drawing accessories",
    usage: 'Work Worlds: Make (precision craftsmanship & refinement)',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
  },
  {
    key: 'shape',
    folder: 'worlds',
    id: '9301825',
    pageUrl: 'https://www.pexels.com/photo/employees-looking-at-the-sticky-notes-posted-on-a-glass-board-9301825/',
    title: 'Employees looking at the sticky notes posted on a glass board',
    usage: 'Work Worlds: Shape (UX & synthesis)',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
  },
  {
    key: 'structure',
    folder: 'worlds',
    id: '8470810',
    pageUrl: 'https://www.pexels.com/photo/blueprints-and-a-laptop-8470810/',
    title: 'Blueprints and a laptop',
    usage: 'Work Worlds: Structure (organizing complexity)',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
  },
  {
    key: 'collaborate',
    folder: 'worlds',
    id: '5324974',
    pageUrl: 'https://www.pexels.com/photo/businesspeople-with-pens-in-hands-examining-schemes-on-papers-5324974/',
    title: 'Businesspeople with pens in hands examining schemes on papers',
    usage: 'Work Worlds: Collaborate (shared decisions & alignment)',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
  },
  {
    key: 'student-group',
    folder: 'editorial',
    id: '28993557',
    pageUrl: 'https://www.pexels.com/photo/overhead-view-of-students-studying-collaboratively-28993557/',
    title: 'Overhead view of students studying collaboratively',
    usage: 'Collaborative learning and development intake',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
  },
  {
    key: 'process',
    folder: 'editorial',
    id: '29521529',
    pageUrl: 'https://www.pexels.com/photo/creative-brainstorming-session-with-sticky-notes-29521529/',
    title: 'Creative brainstorming session with sticky notes',
    usage: 'Process iteration / visual thinking environment',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
  },
  {
    key: 'science-detail',
    folder: 'editorial',
    id: '10515522',
    pageUrl: 'https://www.pexels.com/photo/scientific-equipment-in-close-up-10515522/',
    title: 'Scientific equipment in close-up',
    usage: 'Empirical research & inquiry evidence detail',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    creator: 'Pexels Contributor',
  },
];

const targetWidths = (isHero) => (isHero ? [640, 960, 1440, 1920, 2560] : [640, 960, 1440, 1920]);

async function fetchWithRetry(url, retries = 4, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        },
      });
      if (res.ok) return res;
      console.warn(`Attempt ${i + 1} for ${url} returned ${res.status}`);
    } catch (err) {
      console.warn(`Attempt ${i + 1} for ${url} failed with error: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, delay * 2 ** i));
  }
  throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
}

async function processSource(src) {
  console.log(`[Media Download] Fetching ${src.key} (ID: ${src.id})...`);
  const cdnUrl = `https://images.pexels.com/photos/${src.id}/pexels-photo-${src.id}.jpeg`;
  const res = await fetchWithRetry(cdnUrl);

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`Invalid content-type ${contentType} for ${src.key}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.byteLength < 25_000) {
    throw new Error(`Downloaded buffer for ${src.key} is suspiciously small: ${buffer.byteLength} bytes`);
  }

  const image = sharp(buffer, { failOn: 'none' });
  const meta = await image.metadata();

  if (!meta.width || !meta.height || meta.width < 800 || meta.height < 600) {
    throw new Error(`Image ${src.key} has non-viable dimensions: ${meta.width}x${meta.height}`);
  }

  const dir = path.join(root, src.folder);
  await fs.mkdir(dir, { recursive: true });

  const masterPath = path.join(dir, `${src.key}-master.jpg`);
  await fs.writeFile(masterPath, buffer);

  const derivatives = [];
  const widths = targetWidths(src.isHero);

  for (const w of widths) {
    if (w > meta.width + 100) continue;
    const baseName = `${src.key}-${w}`;
    const basePath = path.join(dir, baseName);

    // 1. AVIF
    await sharp(buffer, { failOn: 'none' })
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: 65, effort: 4 })
      .toFile(`${basePath}.avif`);

    // 2. WebP
    await sharp(buffer, { failOn: 'none' })
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(`${basePath}.webp`);

    // 3. JPG
    await sharp(buffer, { failOn: 'none' })
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 84, progressive: true, mozjpeg: true })
      .toFile(`${basePath}.jpg`);

    derivatives.push(
      `frontend/public/media/personality-v3/${src.folder}/${baseName}.avif`,
      `frontend/public/media/personality-v3/${src.folder}/${baseName}.webp`,
      `frontend/public/media/personality-v3/${src.folder}/${baseName}.jpg`
    );
  }

  // Generate mobile-specific 4:5 crop derivatives (for mobile hero & mobile cards)
  const mobileWidths = [480, 720];
  for (const mw of mobileWidths) {
    const mobileCropBase = `${src.key}-mobile-${mw}`;
    const mobileCropPath = path.join(dir, mobileCropBase);
    const targetHeight = Math.round(mw * 1.25); // 4:5 ratio

    await sharp(buffer, { failOn: 'none' })
      .resize({ width: mw, height: targetHeight, fit: 'cover', position: 'center' })
      .webp({ quality: 80 })
      .toFile(`${mobileCropPath}.webp`);

    await sharp(buffer, { failOn: 'none' })
      .resize({ width: mw, height: targetHeight, fit: 'cover', position: 'center' })
      .jpeg({ quality: 82 })
      .toFile(`${mobileCropPath}.jpg`);

    derivatives.push(
      `frontend/public/media/personality-v3/${src.folder}/${mobileCropBase}.webp`,
      `frontend/public/media/personality-v3/${src.folder}/${mobileCropBase}.jpg`
    );
  }

  console.log(`[Media Download] ✓ ${src.key} processed (${meta.width}x${meta.height}, ${derivatives.length} derivatives)`);

  return {
    key: src.key,
    folder: src.folder,
    id: src.id,
    sourcePlatform: 'Pexels',
    pageUrl: src.pageUrl,
    title: src.title,
    usage: src.usage,
    creator: src.creator,
    license: 'Pexels Free-to-Use License',
    retrievedAt,
    intrinsicDimensions: { width: meta.width, height: meta.height },
    localMaster: `frontend/public/media/personality-v3/${src.folder}/${src.key}-master.jpg`,
    derivatives,
    cropNotes: {
      desktop: src.focalPoint.desktop,
      tablet: src.focalPoint.tablet,
      mobile: src.focalPoint.mobile,
    },
    nonEndorsementNote,
  };
}

async function main() {
  console.log('── Starting Final Phase 3B Media Pipeline ──');
  await fs.mkdir(root, { recursive: true });

  const manifest = [];
  const failures = [];

  for (const src of sources) {
    try {
      const entry = await processSource(src);
      manifest.push(entry);
    } catch (err) {
      console.error(`[Media Download] FAILED ${src.key}:`, err.message);
      failures.push({ key: src.key, error: err.message });
    }
  }

  const manifestData = {
    version: 3,
    system: 'Personality Assessor Phase 3B Visual Acceptance Media Library',
    generatedAt: retrievedAt,
    totalAssets: manifest.length,
    assets: manifest,
    failures,
  };

  await fs.writeFile(manifestPath, JSON.stringify(manifestData, null, 2), 'utf-8');
  console.log(`\n── Finished Media Pipeline: ${manifest.length}/${sources.length} assets ready. Provenance written to ${manifestPath} ──`);

  if (failures.length > 0) {
    console.error(`Errors encountered: ${failures.length}`);
    process.exit(1);
  }
}

main();
