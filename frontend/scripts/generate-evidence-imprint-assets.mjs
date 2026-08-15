// frontend/scripts/generate-evidence-imprint-assets.mjs
// Deterministic Photographic Evidence Fragment Generator for Personality Assessor
// Uses Sharp + SVG alpha masks from approved photography sources

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const SRC_MEDIA = path.resolve(ROOT, 'public', 'media', 'personality-v3');
const OUT_MEDIA = path.resolve(ROOT, 'public', 'media', 'personality-imprint');

const DIRS = {
  hero: path.join(OUT_MEDIA, 'hero'),
  fragments: path.join(OUT_MEDIA, 'fragments'),
  worlds: path.join(OUT_MEDIA, 'worlds'),
  traces: path.join(OUT_MEDIA, 'traces'),
};

for (const dir of Object.values(DIRS)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log('Generating Evidence Imprint Assets in:', OUT_MEDIA);

/**
 * Creates an SVG mask buffer of a given width/height with a technical polygonal/clipped contour.
 */
function createTechnicalMask(type, width, height) {
  let pathD = '';
  switch (type) {
    case 'blueprint-lift':
      // Asymmetric technical polygon derived from an architectural drawing fragment with drafting notch
      pathD = `M 0,0 L ${width * 0.88},0 L ${width},${height * 0.18} L ${width * 0.94},${height * 0.82} L ${width * 0.78},${height} L ${width * 0.08},${height * 0.96} L 0,${height * 0.86} Z`;
      break;
    case 'document-edge':
      // Technical document sheet with folded corner / clipped registration mark
      pathD = `M 0,${height * 0.04} L ${width * 0.85},0 L ${width},${height * 0.15} L ${width},${height * 0.96} L ${width * 0.92},${height} L 0,${height} Z`;
      break;
    case 'tool-fragment':
      // Precision instrument / drafting tool silhouette
      pathD = `M ${width * 0.08},0 L ${width * 0.92},0 L ${width},${height * 0.35} L ${width * 0.82},${height} L ${width * 0.18},${height} L 0,${height * 0.42} Z`;
      break;
    case 'work-surface':
      // Clean rectilinear work-surface crop with subtle chamfered corners
      pathD = `M ${width * 0.02},0 L ${width * 0.98},0 L ${width},${height * 0.04} L ${width},${height * 0.96} L ${width * 0.98},${height} L ${width * 0.02},${height} L 0,${height * 0.96} L 0,${height * 0.04} Z`;
      break;
    case 'mobile-evidence':
      // Compact technical card-free fragment for 390 canvas
      pathD = `M 0,0 L ${width * 0.92},0 L ${width},${height * 0.14} L ${width},${height * 0.94} L ${width * 0.86},${height} L 0,${height} Z`;
      break;
    default:
      pathD = `M 0,0 L ${width},0 L ${width},${height} L 0,${height} Z`;
  }

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <path d="${pathD}" fill="#FFFFFF" />
  </svg>`;
  return Buffer.from(svg);
}

/**
 * Extracts a region from a source image, applies an SVG alpha mask, and saves in WebP, AVIF, and PNG.
 */
async function generateMaskedFragment({
  sourceFile,
  crop,
  maskType,
  outBaseName,
  targetWidths,
}) {
  const sourcePath = path.join(SRC_MEDIA, sourceFile);
  if (!fs.existsSync(sourcePath)) {
    console.warn(`Source image not found: ${sourcePath}`);
    return;
  }

  for (const targetWidth of targetWidths) {
    const targetHeight = Math.round(targetWidth * (crop.height / crop.width));
    const maskBuffer = createTechnicalMask(maskType, targetWidth, targetHeight);

    // 1. Extract crop and resize
    const extractedBuffer = await sharp(sourcePath)
      .extract(crop)
      .resize(targetWidth, targetHeight, { fit: 'cover' })
      .toBuffer();

    // 2. Composite with SVG alpha mask (dest-in)
    const maskedPipeline = sharp(extractedBuffer).composite([
      {
        input: maskBuffer,
        blend: 'dest-in',
      },
    ]);

    // 3. Export WebP
    const webpPath = path.join(
      DIRS.fragments,
      `${outBaseName}-${targetWidth}.webp`
    );
    await maskedPipeline.clone().webp({ quality: 90, effort: 6 }).toFile(webpPath);

    // 4. Export AVIF
    const avifPath = path.join(
      DIRS.fragments,
      `${outBaseName}-${targetWidth}.avif`
    );
    await maskedPipeline.clone().avif({ quality: 85, effort: 5 }).toFile(avifPath);

    // 5. Export PNG (for transparent fallback)
    const pngPath = path.join(
      DIRS.fragments,
      `${outBaseName}-${targetWidth}.png`
    );
    await maskedPipeline.clone().png({ compressionLevel: 8 }).toFile(pngPath);

    console.log(`Generated fragment: ${outBaseName}-${targetWidth}.webp/.avif/.png`);
  }
}

/**
 * Generates responsive standard photographic derivatives (WebP, AVIF, JPG).
 */
async function generateStandardDerivatives({
  sourceFile,
  outFolder,
  outBaseName,
  widths,
  crop = null,
}) {
  const sourcePath = path.join(SRC_MEDIA, sourceFile);
  if (!fs.existsSync(sourcePath)) {
    console.warn(`Source image not found: ${sourcePath}`);
    return;
  }

  for (const width of widths) {
    let pipeline = sharp(sourcePath);
    if (crop) {
      pipeline = pipeline.extract(crop);
    }

    const resized = pipeline.resize(width, null, { withoutEnlargement: true });

    // WebP
    await resized
      .clone()
      .webp({ quality: 86 })
      .toFile(path.join(DIRS[outFolder], `${outBaseName}-${width}.webp`));

    // AVIF
    await resized
      .clone()
      .avif({ quality: 80 })
      .toFile(path.join(DIRS[outFolder], `${outBaseName}-${width}.avif`));

    // JPG
    await resized
      .clone()
      .jpeg({ quality: 88, progressive: true })
      .toFile(path.join(DIRS[outFolder], `${outBaseName}-${width}.jpg`));
  }
  console.log(`Generated derivatives for: ${outBaseName} in ${outFolder}`);
}

async function run() {
  // 1. HERO BLUEPRINT LIFT FRAGMENT (from Pexels 9618456 Hero A drafting table)
  // Master image is approx 4000x2667
  await generateMaskedFragment({
    sourceFile: 'hero/hero-a-master.jpg',
    crop: { left: 400, top: 400, width: 1800, height: 1350 },
    maskType: 'blueprint-lift',
    outBaseName: 'blueprint-lift',
    targetWidths: [480, 640, 960],
  });

  // 2. DOCUMENT EDGE FRAGMENT (from Pexels 9617376 Hero B plans wall)
  await generateMaskedFragment({
    sourceFile: 'hero/hero-b-master.jpg',
    crop: { left: 200, top: 150, width: 1400, height: 1100 },
    maskType: 'document-edge',
    outBaseName: 'document-edge',
    targetWidths: [360, 480, 640],
  });

  // 3. TOOL / INSTRUMENT FRAGMENT (from Pexels 9259943 Scientist lab / precision instruments)
  await generateMaskedFragment({
    sourceFile: 'actors/scientist-master.jpg',
    crop: { left: 300, top: 200, width: 1200, height: 900 },
    maskType: 'tool-fragment',
    outBaseName: 'tool-fragment',
    targetWidths: [360, 480, 640],
  });

  // 4. WORK SURFACE FRAGMENT (from Pexels 34804003 Build environment / engineering notebook)
  await generateMaskedFragment({
    sourceFile: 'worlds/build-master.jpg',
    crop: { left: 100, top: 100, width: 1600, height: 1200 },
    maskType: 'work-surface',
    outBaseName: 'work-surface',
    targetWidths: [480, 640, 960],
  });

  // 5. MOBILE EVIDENCE FRAGMENT (from Pexels 5940721 Student / professional context)
  await generateMaskedFragment({
    sourceFile: 'actors/student-master.jpg',
    crop: { left: 100, top: 50, width: 900, height: 750 },
    maskType: 'mobile-evidence',
    outBaseName: 'mobile-evidence',
    targetWidths: [360, 480],
  });

  // 6. HERO PHOTOGRAPHIC DERIVATIVES
  await generateStandardDerivatives({
    sourceFile: 'hero/hero-a-master.jpg',
    outFolder: 'hero',
    outBaseName: 'hero-dominant',
    widths: [480, 640, 960, 1440, 1920],
  });

  await generateStandardDerivatives({
    sourceFile: 'hero/hero-b-master.jpg',
    outFolder: 'hero',
    outBaseName: 'hero-evidence-wall',
    widths: [360, 480, 640, 960, 1440],
  });

  await generateStandardDerivatives({
    sourceFile: 'actors/student-master.jpg',
    outFolder: 'hero',
    outBaseName: 'hero-human-crop',
    widths: [320, 480, 640, 960],
  });

  // 7. WORK WORLDS DERIVATIVES
  const worlds = [
    { file: 'worlds/build-master.jpg', name: 'world-build' },
    { file: 'actors/scientist-master.jpg', name: 'world-investigate' },
    { file: 'worlds/make-master.jpg', name: 'world-make' },
    { file: 'worlds/shape-master.jpg', name: 'world-shape' },
    { file: 'worlds/structure-master.jpg', name: 'world-structure' },
    { file: 'worlds/collaborate-master.jpg', name: 'world-collaborate' },
  ];

  for (const world of worlds) {
    await generateStandardDerivatives({
      sourceFile: world.file,
      outFolder: 'worlds',
      outBaseName: world.name,
      widths: [480, 640, 960, 1440, 1920],
    });
  }

  // 8. Generate SVG Traces for Anime.js Contour and Morph Choreography
  const traceSvgs = {
    'trace-build': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M 40,40 L 360,40 L 360,260 L 40,260 Z" stroke-dasharray="4,4" opacity="0.3" />
      <path d="M 80,80 L 320,80 L 320,220 L 80,220 Z" />
      <line x1="80" y1="150" x2="320" y2="150" opacity="0.4" />
      <line x1="200" y1="80" x2="200" y2="220" opacity="0.4" />
      <circle cx="80" cy="80" r="3" fill="currentColor" />
      <circle cx="320" cy="80" r="3" fill="currentColor" />
      <circle cx="320" cy="220" r="3" fill="currentColor" />
      <circle cx="80" cy="220" r="3" fill="currentColor" />
    </svg>`,
    'trace-investigate': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M 60,110 L 60,60 L 110,60" />
      <path d="M 290,60 L 340,60 L 340,110" />
      <path d="M 340,190 L 340,240 L 290,240" />
      <path d="M 110,240 L 60,240 L 60,190" />
      <circle cx="200" cy="150" r="48" stroke-dasharray="2,3" />
      <line x1="200" y1="85" x2="200" y2="105" />
      <line x1="200" y1="195" x2="200" y2="215" />
      <line x1="135" y1="150" x2="155" y2="150" />
      <line x1="245" y1="150" x2="265" y2="150" />
    </svg>`,
    'trace-shape-a': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none" stroke="currentColor" stroke-width="1.5">
      <path id="morph-source" d="M 90,80 Q 200,40 310,90 Q 360,180 300,230 Q 180,260 80,210 Q 50,130 90,80 Z" />
    </svg>`,
    'trace-shape-b': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none" stroke="currentColor" stroke-width="1.5">
      <path id="morph-target" d="M 120,60 Q 280,70 320,130 Q 340,220 250,240 Q 140,250 90,190 Q 70,100 120,60 Z" />
    </svg>`,
    'trace-return-loop': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M 250,50 A 200,200 0 1,1 249,50" stroke-dasharray="6,6" opacity="0.35" />
      <path d="M 250,50 A 200,200 0 0,1 450,250" />
      <circle cx="250" cy="50" r="5" fill="currentColor" />
      <circle cx="450" cy="250" r="5" fill="currentColor" />
      <circle cx="250" cy="450" r="5" fill="currentColor" />
      <circle cx="50" cy="250" r="5" fill="currentColor" />
    </svg>`,
  };

  for (const [name, content] of Object.entries(traceSvgs)) {
    fs.writeFileSync(path.join(DIRS.traces, `${name}.svg`), content.trim(), 'utf8');
  }
  console.log('Generated SVG trace assets in traces/');

  console.log('✅ Evidence Imprint asset generation complete.');
}

run().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
