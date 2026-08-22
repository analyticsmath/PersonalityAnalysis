import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve(import.meta.dirname, '..', 'media-source', 'evidence-in-context');

const REQUIRED_RETAINED_ORIGINALS = [
  'home-context-ctufaw5vbm8.jpg',
  'evidence-visible-output-peszYfr0oba.jpg',
  'progress-studio-rjziomx-slq.jpg',
  'trust-inspection-ney2bbwmfnq.jpg',
  'career-autonomy-8-bqofhawk.jpg',
];

const REQUIRED_NEW_ORIGINALS = [
  'home-shared-context-8ayxzntpap0.jpg',
  'career-coordination-qnfckqwyu1k.jpg',
  'home-analysis-vjg1teprcd0.jpg',
  'career-complex-machine-shbyg6mb3o.jpg',
  'career-deep-inquiry-gnasyqdkdbi.jpg',
  'evidence-lab-detail-ontjllb3kri.jpg',
  'how-process-jhtfogpvg8.jpg',
  'trust-diagnostic-aq7oa5ikihs.jpg',
  'career-control-khikhsrqgt4.jpg',
  'career-broadcast-lorhdkrohvw.jpg',
  'career-analysis-gxjuznhq.jpg',
  'signup-first-record-vogj3ghonk0.jpg',
  'signup-agency-yi5jlsra5j8.jpg',
  'career-3d-printing-6e5sxczdmce.jpg',
  'career-team-device-ivrtfrzbzrg.jpg',
];

const ALL_REQUIRED_SOURCES = [...REQUIRED_RETAINED_ORIGINALS, ...REQUIRED_NEW_ORIGINALS];

const RETIRED_CONTAMINATED_SOURCES = [
  'how-it-works-craft-5jmxbz-d49s.jpg',
  'signup-workshop-vwgfw-df4fq.jpg',
  'career-complex-problems-rf2fwjajd7s.jpg',
  'career-open-questions-lqqz57tvwfo.jpg',
  'career-shared-decisions-epnz8c20f-o.jpg',
];

async function checkSourceMedia() {
  console.log('── Local Media Pre-Flight Source Verification ──');
  console.log(`Source directory: ${sourceDir}\n`);

  try {
    await fs.access(sourceDir);
  } catch {
    console.error(`[Pre-Flight ERROR] Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const existingFiles = new Set(entries.filter((e) => e.isFile()).map((e) => e.name));

  // Check for .jpg.jpg leftovers
  const malformed = Array.from(existingFiles).filter((f) => f.endsWith('.jpg.jpg'));
  if (malformed.length > 0) {
    console.error(`[Pre-Flight ERROR] Malformed .jpg.jpg files found in source directory:`);
    malformed.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }

  const missing = [];
  for (const filename of ALL_REQUIRED_SOURCES) {
    if (!existingFiles.has(filename)) {
      missing.push(filename);
    } else {
      const filePath = path.join(sourceDir, filename);
      try {
        const metadata = await sharp(filePath).metadata();
        if (!metadata.width || !metadata.height) {
          console.error(`[Pre-Flight ERROR] Cannot read image dimensions for ${filename}`);
          missing.push(filename);
        }
      } catch (err) {
        console.error(`[Pre-Flight ERROR] Corrupted image ${filename}: ${err.message}`);
        missing.push(filename);
      }
    }
  }

  if (missing.length > 0) {
    console.error(`\n[Pre-Flight FAILED] Missing or unreadable required licensed source originals (${missing.length}/20):`);
    missing.forEach((f) => console.error(`  ✖ ${f}`));
    process.exit(1);
  }

  console.log(`✓ All 20 required canonical source originals are present and readable:`);
  console.log(`  - 5 retained originals verified`);
  console.log(`  - 15 new licensed originals verified`);
  console.log(`  - 0 malformed .jpg.jpg files`);
  console.log(`\n── Local Media Pre-Flight PASSED ──\n`);
}

checkSourceMedia().catch((err) => {
  console.error('[Pre-Flight FATAL]', err);
  process.exit(1);
});
