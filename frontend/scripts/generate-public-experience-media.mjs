import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve(import.meta.dirname, '..', 'media-source', 'evidence-in-context');
const outputDir = path.resolve(import.meta.dirname, '..', 'public', 'media', 'public-experience');
const manifestJsPath = path.resolve(import.meta.dirname, '..', 'src', 'content', 'public-experience', 'mediaManifest.js');
const manifestJsonPath = path.join(outputDir, 'media-provenance.json');

const retrievedAt = new Date().toISOString();
const nonEndorsementNote =
  'People pictured are not Personality Assessor users, assessment subjects, career-match recipients, testimonial subjects, or endorsers.';

const assetsConfig = [
  {
    key: 'homeWorldEntry',
    sourceFile: 'home-context-ctufaw5vbm8.jpg',
    id: 'CTufAW5vbm8',
    alt: 'Professional working in contextual design and architectural studio environment',
    title: 'Spatial creation and environmental context',
    sceneRole: 'Home World Entry & Finale wide pullback',
    creator: "Roberta Sant'Anna",
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#2A3432',
    focalPoint: { desktop: '45% 50%', tablet: '50% 50%', mobile: '50% 45%' },
  },
  {
    key: 'homeSituationDetail',
    sourceFile: 'home-analysis-vjg1teprcd0.jpg',
    id: 'vjg1teprcd0',
    alt: 'Close analytical inspection of materials and technical drawings in engineering studio',
    title: 'Methodological inspection and data observation',
    sceneRole: 'Home Situation inset detail & Multiple Readings anchor',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#383E3A',
    focalPoint: { desktop: '55% 45%', tablet: '50% 50%', mobile: '50% 45%' },
  },
  {
    key: 'workworldPrecision',
    sourceFile: 'career-complex-machine-shbyg6mb3o.jpg',
    id: 'shbyg6mb3o',
    alt: 'Engineer operating precision mechanical systems with direct physical control in engineering workshop',
    title: 'Precision engineering and mechanical systems',
    sceneRole: 'Workworld Condition: Precision',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#2E3236',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
  },
  {
    key: 'workworldCollaboration',
    sourceFile: 'home-shared-context-8ayxzntpap0.jpg',
    id: '8ayxzntpap0',
    alt: 'Designers collaborating across an open work table with shared artifacts',
    title: 'Collaborative analysis and situational negotiation',
    sceneRole: 'Workworld Condition: Collaboration',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#3A3630',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
  },
  {
    key: 'workworldPressure',
    sourceFile: 'career-control-khikhsrqgt4.jpg',
    id: 'khikhsrqgt4',
    alt: 'Operators coordinating real-time systems in operational control center',
    title: 'Operational systems coordination and live control',
    sceneRole: 'Workworld Condition: Operational Pressure',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#2D3035',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
  },
  {
    key: 'careerDeepInquiry',
    sourceFile: 'career-deep-inquiry-gnasyqdkdbi.jpg',
    id: 'gnasyqdkdbi',
    alt: 'Technical investigator analyzing precision diagnostics and data patterns in technical workshop',
    title: 'Deep technical inquiry and investigative analysis',
    sceneRole: 'Career World 2: Deep Inquiry',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#252F33',
    focalPoint: { desktop: '50% 45%', tablet: '50% 45%', mobile: '50% 40%' },
  },
  {
    key: 'careerCoordination',
    sourceFile: 'career-coordination-qnfckqwyu1k.jpg',
    id: 'qnfckqwyu1k',
    alt: 'Engineers collaborating closely over technical blueprints in project room',
    title: 'Cross-functional delivery and team alignment',
    sceneRole: 'Career World 3: Collaborative Delivery',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#363432',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
  },
  {
    key: 'careerSynthesis',
    sourceFile: 'career-3d-printing-6e5sxczdmce.jpg',
    id: '6e5sxczdmcE',
    alt: 'Additive manufacturing machine fabricating precise structural component in fabrication lab',
    title: 'Iterative prototyping and creative engineering',
    sceneRole: 'Career World 5: Creative Synthesis',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#282C2E',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
  },
  {
    key: 'howTransformation',
    sourceFile: 'how-process-jhtfogpvg8.jpg',
    id: 'jhtfogpvg8',
    alt: 'Hands assembling and refining physical technical prototype in workshop',
    title: 'Direct transformation from raw input into structured output',
    sceneRole: 'How It Works Transformation Stage',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#323630',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 45%' },
  },
  {
    key: 'trustDiagnostic',
    sourceFile: 'trust-diagnostic-aq7oa5ikihs.jpg',
    id: 'aq7oa5ikihs',
    alt: 'High-precision technical measurement instrument showing calibrated signal',
    title: 'Diagnostic calibration and mathematical provenance',
    sceneRole: 'Trust & X-Ray inspection stage',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#2B3330',
    focalPoint: { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
  },
  {
    key: 'authLogin',
    sourceFile: 'career-analysis-gxjuznhq.jpg',
    id: 'gxjuznhq',
    alt: 'Professional analyzing complex systemic data in ambient workspace',
    title: 'Returning to continuous assessment record',
    sceneRole: 'Login Route Environmental Ground',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#24282B',
    focalPoint: { desktop: '60% 50%', tablet: '50% 50%', mobile: '50% 50%' },
  },
  {
    key: 'authSignup',
    sourceFile: 'signup-first-record-vogj3ghonk0.jpg',
    id: 'vogj3ghonk0',
    alt: 'Large open workshop space with materials and active project surfaces',
    title: 'Initial assessment baseline and record creation',
    sceneRole: 'Signup Route Environmental Ground',
    creator: 'Andrej Lišakov',
    sourcePlatform: 'Unsplash Plus',
    sceneTone: '#2D3230',
    focalPoint: { desktop: '65% 50%', tablet: '50% 50%', mobile: '50% 50%' },
  },
  {
    key: 'homeHeroContext', sourceFile: 'unsplash-VWgfW_Df4fQ.jpg', id: 'VWgfW_Df4fQ',
    title: 'A woman is working on a machine in a room',
    alt: 'Woman working with a machine in a technology workshop', sceneRole: 'Home Hero Context',
    creator: "Roberta Sant'Anna", sourcePlatform: 'Unsplash Plus', sceneTone: '#D8DDD8',
    pageUrl: 'https://unsplash.com/photos/a-woman-is-working-on-a-machine-in-a-room-VWgfW_Df4fQ',
    focalPoint: { desktop: '52% 42%', tablet: '50% 42%', mobile: '50% 38%' }, safeCrop: { desktop: '4:5 editorial portrait', mobile: '4:5 portrait' }, parallaxOverscan: 'medium'
  },
  {
    key: 'homeProcessDetail', sourceFile: 'unsplash-eCyBQIJM4bs.jpg', id: 'eCyBQIJM4bs',
    title: 'Close up of an architect working on floor plans and color swatches',
    alt: 'Hands working over floor plans and color swatches', sceneRole: 'Home Process Detail',
    creator: 'Getty Images', sourcePlatform: 'Unsplash Plus', sceneTone: '#C7B8A5',
    pageUrl: 'https://unsplash.com/photos/close-up-of-male-architect-working-on-floor-plans-and-color-swatches-for-interior-design-project-eCyBQIJM4bs',
    focalPoint: { desktop: '50% 53%', tablet: '50% 53%', mobile: '52% 55%' }, safeCrop: { desktop: 'landscape detail', mobile: '4:5 hands and drawings' }, parallaxOverscan: 'low'
  },
  {
    key: 'workworldAutonomy', sourceFile: 'unsplash-wVc9SZT-Hpw.jpg', id: 'wVc9SZT-Hpw',
    title: 'A woman sitting at a table working on a 3D printer',
    alt: 'Woman working independently beside a desktop 3D printer', sceneRole: 'Workworld Condition: Autonomy',
    creator: "Roberta Sant'Anna", sourcePlatform: 'Unsplash Plus', sceneTone: '#D7D0C4',
    pageUrl: 'https://unsplash.com/photos/a-woman-sitting-at-a-table-working-on-a-3d-printer-wVc9SZT-Hpw',
    focalPoint: { desktop: '50% 44%', tablet: '50% 43%', mobile: '50% 40%' }, safeCrop: { desktop: '4:5 maker portrait', mobile: '4:5 full working action' }, parallaxOverscan: 'medium'
  },
  {
    key: 'workworldPressureHuman', sourceFile: 'unsplash-LorHdkRoHvw.jpg', id: 'LorHdkRoHvw',
    title: 'Young woman working in a broadcast control room',
    alt: 'Woman working at consoles in a broadcast control room', sceneRole: 'Operational Pressure Human Detail',
    creator: 'Getty Images', sourcePlatform: 'Unsplash Plus', sceneTone: '#26343A',
    pageUrl: 'https://unsplash.com/photos/young-beautiful-woman-working-in-a-broadcast-control-room-on-a-tv-station-LorHdkRoHvw',
    focalPoint: { desktop: '58% 48%', tablet: '56% 48%', mobile: '55% 45%' }, safeCrop: { desktop: 'wide secondary plane', mobile: '4:5 console detail' }, parallaxOverscan: 'low'
  },
  {
    key: 'careerCreativeHuman', sourceFile: 'unsplash-H0pWUDDSTIQ.jpg', id: 'H0pWUDDSTIQ',
    title: 'Fashion designer in her studio',
    alt: 'Designer working in a creative studio', sceneRole: 'Career Creative Synthesis Human Detail',
    creator: 'Curated Lifestyle', sourcePlatform: 'Unsplash Plus', sceneTone: '#E0D6C9',
    pageUrl: 'https://unsplash.com/photos/fashion-designer-in-her-studio-H0pWUDDSTIQ',
    focalPoint: { desktop: '50% 45%', tablet: '50% 45%', mobile: '50% 40%' }, safeCrop: { desktop: 'portrait studio plane', mobile: '4:5 portrait' }, parallaxOverscan: 'low'
  },
];

async function generateMedia() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(path.dirname(manifestJsPath), { recursive: true });

  const manifest = {};
  const desktopWidths = [2560, 1920, 1440, 1080, 720];
  const mobileWidths = [960, 720, 480];

  for (const config of assetsConfig) {
    const inputPath = path.join(sourceDir, config.sourceFile);
    console.log(`Processing: ${config.key} from ${config.sourceFile}`);

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    const variants = {
      avif: {},
      webp: {},
      jpg: {},
      mobileAvif: {},
      mobileWebp: {},
      mobileJpg: {},
    };

    // 1. Desktop widescreen variants
    for (const w of desktopWidths) {
      if (w <= (metadata.width || 2560)) {
        const baseName = `${config.key}-${w}`;

        // AVIF
        const avifPath = path.join(outputDir, `${baseName}.avif`);
        await image.clone().resize(w).avif({ quality: 80 }).toFile(avifPath);
        variants.avif[w] = `/media/public-experience/${baseName}.avif`;

        // WebP
        const webpPath = path.join(outputDir, `${baseName}.webp`);
        await image.clone().resize(w).webp({ quality: 84 }).toFile(webpPath);
        variants.webp[w] = `/media/public-experience/${baseName}.webp`;

        // JPG
        const jpgPath = path.join(outputDir, `${baseName}.jpg`);
        await image.clone().resize(w).jpeg({ quality: 86, mozjpeg: true }).toFile(jpgPath);
        variants.jpg[w] = `/media/public-experience/${baseName}.jpg`;
      }
    }

    // 2. Mobile 4:5 portrait crops
    for (const w of mobileWidths) {
      const h = Math.round((w * 5) / 4);
      const baseName = `${config.key}-mobile-${w}`;

      // AVIF 4:5
      const avifPath = path.join(outputDir, `${baseName}.avif`);
      await image.clone().resize(w, h, { fit: 'cover', position: 'entropy' }).avif({ quality: 78 }).toFile(avifPath);
      variants.mobileAvif[w] = `/media/public-experience/${baseName}.avif`;

      // WebP 4:5
      const webpPath = path.join(outputDir, `${baseName}.webp`);
      await image.clone().resize(w, h, { fit: 'cover', position: 'entropy' }).webp({ quality: 82 }).toFile(webpPath);
      variants.mobileWebp[w] = `/media/public-experience/${baseName}.webp`;

      // JPG 4:5
      const jpgPath = path.join(outputDir, `${baseName}.jpg`);
      await image.clone().resize(w, h, { fit: 'cover', position: 'entropy' }).jpeg({ quality: 84, mozjpeg: true }).toFile(jpgPath);
      variants.mobileJpg[w] = `/media/public-experience/${baseName}.jpg`;
    }

    const availableDesktopWidths = Object.keys(variants.webp).map(Number).sort((a, b) => b - a);
    const primaryWidth = availableDesktopWidths[0] || 1920;

    manifest[config.key] = {
      key: config.key,
      id: config.id,
      title: config.title,
      alt: config.alt,
      sceneRole: config.sceneRole,
      creator: config.creator,
      sourcePlatform: config.sourcePlatform,
      pageUrl: config.pageUrl,
      sceneTone: config.sceneTone,
      focalPoint: config.focalPoint,
      safeCrop: config.safeCrop,
      parallaxOverscan: config.parallaxOverscan || 'none',
      intrinsicDimensions: {
        width: metadata.width,
        height: metadata.height,
        aspectRatio: (metadata.width / metadata.height).toFixed(3),
      },
      sourceWebp: variants.webp[primaryWidth],
      sourceAvif: variants.avif[primaryWidth],
      fallbackJpg: variants.jpg[primaryWidth],
      avifSrcSet: Object.entries(variants.avif)
        .map(([w, url]) => `${url} ${w}w`)
        .join(', '),
      webpSrcSet: Object.entries(variants.webp)
        .map(([w, url]) => `${url} ${w}w`)
        .join(', '),
      jpgSrcSet: Object.entries(variants.jpg)
        .map(([w, url]) => `${url} ${w}w`)
        .join(', '),
      mobileAvifSrcSet: Object.entries(variants.mobileAvif)
        .map(([w, url]) => `${url} ${w}w`)
        .join(', '),
      mobileWebpSrcSet: Object.entries(variants.mobileWebp)
        .map(([w, url]) => `${url} ${w}w`)
        .join(', '),
      mobileJpgSrcSet: Object.entries(variants.mobileJpg)
        .map(([w, url]) => `${url} ${w}w`)
        .join(', '),
      retrievedAt,
      nonEndorsementNote,
    };
  }

  // Write JS manifest for frontend
  const jsContent = `/**
 * Public Experience High-Resolution Media Manifest
 * Sourced from licensed Unsplash Plus originals with per-asset provenance recorded below.
 * Generated: ${retrievedAt}
 */

export const MEDIA_MANIFEST_PX = ${JSON.stringify(manifest, null, 2)};

export default MEDIA_MANIFEST_PX;
`;

  await fs.writeFile(manifestJsPath, jsContent, 'utf-8');
  await fs.writeFile(manifestJsonPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log('✅ Generated High-Resolution Media Manifest & Derivatives.');
}

generateMedia().catch((err) => {
  console.error('Error generating media:', err);
  process.exit(1);
});
