import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve(import.meta.dirname, '..', 'media-source', 'evidence-in-context');
const outputDir = path.resolve(import.meta.dirname, '..', 'public', 'media', 'context-atlas');
const manifestPath = path.join(outputDir, 'media-provenance.json');
const retrievedAt = new Date().toISOString();
const nonEndorsementNote =
  'People pictured are not Personality Assessor users, assessment subjects, career-match recipients, testimonial subjects, or endorsers.';

const assetsConfig = [
  {
    key: 'home-context',
    sourceFile: 'home-context-ctufaw5vbm8.jpg',
    id: 'CTufAW5vbm8',
    alt: 'Professional working with focused tactile craft in studio environment',
    title: 'Professional working in contextual studio environment',
    usage: 'Homepage Field Entry scene & return context',
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
    usage: 'Homepage Decision spatial environment & collaborative world',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
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
    creator: 'Andrej Lišakov',
    creatorUsername: null,
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '55% 45%', tablet: '50% 50%', mobile: '50% 45%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'top' },
  },
  {
    key: 'career-complex-machine',
    sourceFile: 'career-complex-machine-shbyg6mb3o.jpg',
    id: 'shbyg6mb3o',
    alt: 'Engineer operating precision mechanical systems with direct control',
    title: 'Structured problem solving and technical system ownership',
    usage: 'Career Intelligence: Structured technical systems',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
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
    usage: 'Career Intelligence: Deep inquiry',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
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
    usage: 'Career Intelligence: Collaborative delivery',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'career-3d-printing',
    sourceFile: 'career-3d-printing-6e5sxczdmce.jpg',
    id: '6e5sxczdmcE',
    alt: 'Designer adjusting additive manufacturing machine in product studio',
    title: 'Rapid prototyping and technical autonomy context',
    usage: 'Career Intelligence: Creative synthesis / autonomy',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 45%', tablet: '50% 45%', mobile: '50% 40%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'career-control',
    sourceFile: 'career-control-khikhsrqgt4.jpg',
    id: 'kHIkhsRqGt4',
    alt: 'Operations lead directing technical coordination and system control',
    title: 'System operations and leadership context',
    usage: 'Career Intelligence: Directional & operational leadership',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 45%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'top' },
  },
  {
    key: 'how-process',
    sourceFile: 'how-process-jhtfogpvg8.jpg',
    id: 'JhTF_oGpVG8',
    alt: 'Designers and engineers inspecting complex functional prototype together',
    title: 'Iterative technical transformation and collaborative analysis',
    usage: 'How It Works continuous transformation stage background',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '48% 48%', tablet: '50% 50%', mobile: '50% 45%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'signup-first-record',
    sourceFile: 'signup-first-record-vogj3ghonk0.jpg',
    id: 'vOgj3gHOnK0',
    alt: 'Professional organizing project documentation and foundational records',
    title: 'Individual initiating career record architecture',
    usage: 'Signup first record environmental stage',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '52% 48%', tablet: '50% 50%', mobile: '50% 45%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'trust-diagnostic',
    sourceFile: 'trust-diagnostic-aq7oa5ikihs.jpg',
    id: 'Aq7OA5ikIhs',
    alt: 'Engineer examining precision instrumentation display and data provenance',
    title: 'Inspection and verification environment',
    usage: 'Trust route chain of custody background field',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 45%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'progress-studio',
    sourceFile: 'progress-studio-rjziomx-slq.jpg',
    id: 'rjziomx_slq',
    alt: 'Design studio with iterative work visible across multiple project phases',
    title: 'Temporal studio environment representing longitudinal development',
    usage: 'Progress route temporal accumulation layer',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
  {
    key: 'login-environment',
    sourceFile: 'career-team-device-ivrtfrzbzrg.jpg',
    id: 'IVRtFRZbzRg',
    alt: 'Focused engineer reviewing complex architectural data at workstation',
    title: 'Workstation context for returning record review',
    usage: 'Login route lower-field environmental anchor',
    creator: 'Andrej Lišakov',
    creatorUsername: null,
    sourcePlatform: 'Unsplash Plus',
    isLandscape: true,
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 45%' },
    mobileCrop: { widthRatio: 4, heightRatio: 5, focal: 'center' },
  },
];

async function generateDerivatives() {
  await fs.mkdir(outputDir, { recursive: true });
  const manifest = {
    generatedAt: retrievedAt,
    nonEndorsementNote,
    assets: {},
  };

  for (const asset of assetsConfig) {
    const srcPath = path.join(sourceDir, asset.sourceFile);
    let raw;
    try {
      raw = await fs.readFile(srcPath);
    } catch {
      console.warn(`Source missing: ${srcPath}, checking fallback...`);
      continue;
    }

    const image = sharp(raw);
    const meta = await image.metadata();
    console.log(`Processing ${asset.key} (${meta.width}x${meta.height})...`);

    const standardWidths = [720, 1080, 1440, 1920].filter((w) => w <= meta.width);
    if (!standardWidths.includes(720) && meta.width >= 720) standardWidths.unshift(720);
    if (!standardWidths.includes(1080) && meta.width >= 1080) standardWidths.push(1080);

    const generatedFiles = [];

    // Landscape derivatives
    for (const w of standardWidths) {
      const avifName = `${asset.key}-${w}.avif`;
      const webpName = `${asset.key}-${w}.webp`;
      const jpgName = `${asset.key}-${w}.jpg`;

      await image.clone().resize({ width: w }).avif({ quality: 80 }).toFile(path.join(outputDir, avifName));
      await image.clone().resize({ width: w }).webp({ quality: 82 }).toFile(path.join(outputDir, webpName));
      await image.clone().resize({ width: w }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(outputDir, jpgName));

      generatedFiles.push(avifName, webpName, jpgName);
    }

    // Dedicated portrait mobile derivatives (4:5 crop)
    const mobileWidths = [480, 720];
    const cropRatio = (asset.mobileCrop?.widthRatio || 4) / (asset.mobileCrop?.heightRatio || 5);
    const targetCropWidth = Math.min(meta.width, Math.round(meta.height * cropRatio));
    const targetCropHeight = Math.round(targetCropWidth / cropRatio);

    for (const mw of mobileWidths) {
      const mAvifName = `${asset.key}-mobile-${mw}.avif`;
      const mWebpName = `${asset.key}-mobile-${mw}.webp`;
      const mJpgName = `${asset.key}-mobile-${mw}.jpg`;

      await image
        .clone()
        .resize({
          width: targetCropWidth,
          height: targetCropHeight,
          fit: 'cover',
          position: asset.mobileCrop?.focal === 'top' ? 'top' : 'center',
        })
        .resize({ width: mw })
        .avif({ quality: 80 })
        .toFile(path.join(outputDir, mAvifName));

      await image
        .clone()
        .resize({
          width: targetCropWidth,
          height: targetCropHeight,
          fit: 'cover',
          position: asset.mobileCrop?.focal === 'top' ? 'top' : 'center',
        })
        .resize({ width: mw })
        .webp({ quality: 82 })
        .toFile(path.join(outputDir, mWebpName));

      await image
        .clone()
        .resize({
          width: targetCropWidth,
          height: targetCropHeight,
          fit: 'cover',
          position: asset.mobileCrop?.focal === 'top' ? 'top' : 'center',
        })
        .resize({ width: mw })
        .jpeg({ quality: 84, mozjpeg: true })
        .toFile(path.join(outputDir, mJpgName));

      generatedFiles.push(mAvifName, mWebpName, mJpgName);
    }

    manifest.assets[asset.key] = {
      id: asset.id,
      key: asset.key,
      alt: asset.alt,
      title: asset.title,
      usage: asset.usage,
      creator: asset.creator,
      sourcePlatform: asset.sourcePlatform,
      intrinsicDimensions: { width: meta.width, height: meta.height },
      focalPoint: asset.focalPoint,
      widths: standardWidths,
      source: `/media/context-atlas/${asset.key}-1080.webp`,
      fallback: `/media/context-atlas/${asset.key}-1080.jpg`,
      avifSrcSet: standardWidths.map((w) => `/media/context-atlas/${asset.key}-${w}.avif ${w}w`).join(', '),
      webpSrcSet: standardWidths.map((w) => `/media/context-atlas/${asset.key}-${w}.webp ${w}w`).join(', '),
      mobileAvif: `/media/context-atlas/${asset.key}-mobile-720.avif`,
      mobileWebp: `/media/context-atlas/${asset.key}-mobile-720.webp`,
      mobileJpg: `/media/context-atlas/${asset.key}-mobile-720.jpg`,
      generatedFiles,
    };
  }

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Context Atlas media generated successfully: ${Object.keys(manifest.assets).length} assets.`);
}

generateDerivatives().catch(console.error);
