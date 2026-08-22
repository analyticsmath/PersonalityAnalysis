import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve(import.meta.dirname, '..', 'media-source', 'evidence-in-context');
const outputDir = path.resolve(import.meta.dirname, '..', 'public', 'media', 'evidence-in-context');
const manifestPath = path.join(outputDir, 'media-provenance.json');
const retrievedAt = new Date().toISOString();
const nonEndorsementNote = 'People pictured are not Personality Assessor users, assessment subjects, career-match recipients, testimonial subjects, or endorsers.';

const assetsConfig = [
  {
    key: 'home-context',
    sourceFile: 'home-context-ctufaw5vbm8.jpg',
    id: 'CTufAW5vbm8',
    alt: 'Person working on a project in a room with focused craftsmanship',
    title: 'Professional working in contextual studio environment',
    usage: 'Homepage opening contextual plane & finale return',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '45% 50%', tablet: '50% 50%', mobile: '50% 45%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'home-shared-context',
    sourceFile: 'home-shared-context-8ayxzntpap0.jpg',
    id: '8ayxzntpap0',
    alt: 'Professionals collaborating across an open work table with shared artifacts',
    title: 'Collaborative analysis and situational decision context',
    usage: 'Homepage Decision spatial environment',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'home-analysis',
    sourceFile: 'home-analysis-vjg1teprcd0.jpg',
    id: 'vjg1teprcd0',
    alt: 'Close analytical inspection of materials and technical data',
    title: 'Methodological inspection and data observation',
    usage: 'Homepage opening depth layer & Work Values memory',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '52% 48%', tablet: '50% 50%', mobile: '50% 45%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'career-complex-machine',
    sourceFile: 'career-complex-machine-shbyg6mb3o.jpg',
    id: 'shbyg6mb3o',
    alt: 'Engineer operating precision mechanical systems with direct control',
    title: 'Structured problem solving and technical system ownership',
    usage: 'Career Intelligence: Complex problems, clear ownership',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'career-deep-inquiry',
    sourceFile: 'career-deep-inquiry-gnasyqdkdbi.jpg',
    id: 'gnasyqdkdbi',
    alt: 'Scientist conducting meticulous examination with laboratory instrument',
    title: 'Deep inquiry and technical investigation',
    usage: 'Career Intelligence: Open questions, long focus',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 45%', tablet: '50% 45%', mobile: '50% 40%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'top' },
  },
  {
    key: 'career-coordination',
    sourceFile: 'career-coordination-qnfckqwyu1k.jpg',
    id: 'qnfckqwyu1k',
    alt: 'Designers and engineers collaborating closely over technical plans',
    title: 'Cross-functional coordination and shared decision making',
    usage: 'Career Intelligence: Shared decisions, frequent coordination',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'evidence-visible-output',
    sourceFile: 'evidence-visible-output-peszYfr0oba.jpg',
    id: 'pESzYfR0oBA',
    alt: 'Precision soldering close-up with flame and metal craft',
    title: 'Precision soldering and tangible fabrication detail',
    usage: 'Homepage Evidence Transformation & Career Intelligence: Visible output',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: false,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 3, heightRatio: 4, focal: 'center' },
  },
  {
    key: 'career-autonomy',
    sourceFile: 'career-autonomy-8-bqofhawk.jpg',
    id: '8-BQoFhAwKk',
    alt: 'Artist working in dense, creative studio environment',
    title: 'Autonomous studio practice with high personal standards',
    usage: 'Career Intelligence: Autonomy, pace, personal standards',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'career-control',
    sourceFile: 'career-control-khikhsrqgt4.jpg',
    id: 'khikhsrqgt4',
    alt: 'Specialist configuring industrial instrumentation controls',
    title: 'Industrial instrumentation and process governance',
    usage: 'Career Atlas secondary depth plane',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'career-broadcast',
    sourceFile: 'career-broadcast-lorhdkrohvw.jpg',
    id: 'lorhdkrohvw',
    alt: 'Production console in technical broadcast environment',
    title: 'Real-time broadcast media operations and transmission control',
    usage: 'Career Atlas secondary depth plane',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'career-analysis',
    sourceFile: 'career-analysis-gxjuznhq.jpg',
    id: 'gxjuznhq',
    alt: 'Technical analyst reviewing detailed diagnostic telemetry',
    title: 'Quantitative analysis and data validation',
    usage: 'Career Atlas secondary depth plane',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'career-3d-printing',
    sourceFile: 'career-3d-printing-6e5sxczdmce.jpg',
    id: '6e5sxczdmce',
    alt: 'Additive manufacturing and precision rapid prototyping',
    title: 'Rapid digital fabrication and prototype modeling',
    usage: 'Career Atlas secondary depth plane',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'career-team-device',
    sourceFile: 'career-team-device-ivrtfrzbzrg.jpg',
    id: 'ivrtfrzbzrg',
    alt: 'Hardware engineering team testing connected device prototypes',
    title: 'Embedded hardware verification and physical device integration',
    usage: 'Career Atlas secondary depth plane',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'evidence-lab-detail',
    sourceFile: 'evidence-lab-detail-ontjllb3kri.jpg',
    id: 'ontjllb3kri',
    alt: 'Detailed optical magnification and laboratory measurement setup',
    title: 'Precision measurement calibration and micro-scale inspection',
    usage: 'How It Works detail & Career Atlas depth layer',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'how-process',
    sourceFile: 'how-process-jhtfogpvg8.jpg',
    id: 'jhtfogpvg8',
    alt: 'Meticulous technical process execution in structured workshop',
    title: 'Process development and methodological workflow',
    usage: 'How It Works opening and evidence narrative',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'progress-studio',
    sourceFile: 'progress-studio-rjziomx-slq.jpg',
    id: 'rJziomX_sLQ',
    alt: 'Artist preparing in a busy studio environment',
    title: 'Reflective artist in dynamic studio workspace',
    usage: 'Progress route longitudinal temporal recomposition',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: false,
    focalPoint: { desktop: '50% 40%', tablet: '50% 40%', mobile: '50% 35%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'top' },
  },
  {
    key: 'trust-inspection',
    sourceFile: 'trust-inspection-ney2bbwmfnq.jpg',
    id: 'nEY2bbWMfnQ',
    alt: 'Person inspecting fine details with a magnifying glass',
    title: 'Meticulous inspection and provenance verification',
    usage: 'Trust route human inspection hero layer',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: false,
    focalPoint: { desktop: '50% 45%', tablet: '50% 45%', mobile: '50% 40%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'top' },
  },
  {
    key: 'trust-diagnostic',
    sourceFile: 'trust-diagnostic-aq7oa5ikihs.jpg',
    id: 'aq7oa5ikihs',
    alt: 'Technical probe and diagnostic instrumentation contact detail',
    title: 'Diagnostic measurement and signal verification',
    usage: 'Trust route technical diagnostic layer',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'signup-first-record',
    sourceFile: 'signup-first-record-vogj3ghonk0.jpg',
    id: 'vogj3ghonk0',
    alt: 'Hands recording initial documentation and technical notes in workspace',
    title: 'Initial record formation and professional documentation',
    usage: 'Signup route primary environmental plane',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: false,
    focalPoint: { desktop: '50% 45%', tablet: '50% 45%', mobile: '50% 40%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'top' },
  },
  {
    key: 'signup-agency',
    sourceFile: 'signup-agency-yi5jlsra5j8.jpg',
    id: 'yi5jlsra5j8',
    alt: 'Professional in structured workspace establishing project ownership',
    title: 'Individual agency and purposeful project foundation',
    usage: 'Signup route secondary support plane',
    creator: "Roberta Sant'Anna",
    creatorUsername: 'roberta_sant_anna',
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
];

async function processAsset(asset) {
  const sourcePath = path.join(sourceDir, asset.sourceFile);
  console.log(`[Media Pipeline] Processing ${asset.key} from ${asset.sourceFile}...`);

  const buffer = await fs.readFile(sourcePath);
  const image = sharp(buffer, { failOn: 'none' });
  const meta = await image.metadata();

  console.log(`  Source dimensions: ${meta.width}x${meta.height}`);

  const derivatives = [];
  const standardWidths = asset.isLandscape ? [1440, 1080, 720] : [1080, 720];

  for (const w of standardWidths) {
    if (w > meta.width + 100) continue;
    const baseName = `${asset.key}-${w}`;
    const basePath = path.join(outputDir, baseName);

    // 1. AVIF (quality 68, effort 4)
    await sharp(buffer, { failOn: 'none' })
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: 68, effort: 4 })
      .toFile(`${basePath}.avif`);

    // 2. WebP (quality 84, effort 4)
    await sharp(buffer, { failOn: 'none' })
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 84, effort: 4 })
      .toFile(`${basePath}.webp`);

    // 3. JPG fallback (quality 85)
    await sharp(buffer, { failOn: 'none' })
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(`${basePath}.jpg`);

    derivatives.push(
      `/media/evidence-in-context/${baseName}.avif`,
      `/media/evidence-in-context/${baseName}.webp`,
      `/media/evidence-in-context/${baseName}.jpg`
    );
  }

  // Mobile portrait crops (4:5 or 3:4)
  const mobileWidths = [720, 480];
  for (const mw of mobileWidths) {
    const crop = asset.mobileCrop || { widthRatio: 4, heightRatio: 5, focal: 'center' };
    const targetHeight = Math.round((mw * crop.heightRatio) / crop.widthRatio);
    const mobileBaseName = `${asset.key}-mobile-${mw}`;
    const mobileBasePath = path.join(outputDir, mobileBaseName);

    await sharp(buffer, { failOn: 'none' })
      .resize({
        width: mw,
        height: targetHeight,
        fit: 'cover',
        position: crop.focal === 'top' ? 'top' : (crop.focal === 'bottom' ? 'bottom' : 'center'),
      })
      .avif({ quality: 68, effort: 4 })
      .toFile(`${mobileBasePath}.avif`);

    await sharp(buffer, { failOn: 'none' })
      .resize({
        width: mw,
        height: targetHeight,
        fit: 'cover',
        position: crop.focal === 'top' ? 'top' : (crop.focal === 'bottom' ? 'bottom' : 'center'),
      })
      .webp({ quality: 84, effort: 4 })
      .toFile(`${mobileBasePath}.webp`);

    await sharp(buffer, { failOn: 'none' })
      .resize({
        width: mw,
        height: targetHeight,
        fit: 'cover',
        position: crop.focal === 'top' ? 'top' : (crop.focal === 'bottom' ? 'bottom' : 'center'),
      })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(`${mobileBasePath}.jpg`);

    derivatives.push(
      `/media/evidence-in-context/${mobileBaseName}.avif`,
      `/media/evidence-in-context/${mobileBaseName}.webp`,
      `/media/evidence-in-context/${mobileBaseName}.jpg`
    );
  }

  console.log(`  ✓ Created ${derivatives.length} responsive derivatives for ${asset.key}`);

  return {
    key: asset.key,
    id: asset.id,
    sourceFile: asset.sourceFile,
    sourcePlatform: asset.sourcePlatform,
    creator: asset.creator,
    creatorUsername: asset.creatorUsername,
    title: asset.title,
    alt: asset.alt,
    usage: asset.usage,
    license: 'Licensed Unsplash Plus Original',
    retrievedAt,
    intrinsicDimensions: { width: meta.width, height: meta.height },
    aspectRatio: (meta.width / meta.height).toFixed(3),
    isLandscape: asset.isLandscape,
    focalPoint: asset.focalPoint,
    mobileCrop: asset.mobileCrop,
    derivatives,
    nonEndorsementNote,
  };
}

async function main() {
  console.log('── Evidence in Context Production Media Processing ──');
  await fs.mkdir(outputDir, { recursive: true });

  const manifest = [];
  for (const asset of assetsConfig) {
    const entry = await processAsset(asset);
    manifest.push(entry);
  }

  const manifestData = {
    version: 2,
    artDirection: 'Evidence Field / Evidence in Context',
    generatedAt: retrievedAt,
    totalAssets: manifest.length,
    assets: manifest,
  };

  await fs.writeFile(manifestPath, JSON.stringify(manifestData, null, 2), 'utf-8');
  console.log(`\n── Successfully generated all 20 derivative sets. Manifest written to ${manifestPath} ──`);
}

main().catch((err) => {
  console.error('[Media Pipeline ERROR]', err);
  process.exit(1);
});
