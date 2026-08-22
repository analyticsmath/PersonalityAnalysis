import fs from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const frontendDir = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(frontendDir, 'public');
const srcDir = path.join(frontendDir, 'src');
const manifestPath = path.join(publicDir, 'media', 'evidence-in-context', 'media-provenance.json');

const FORBIDDEN_LEGACY_KEYS = [
  'how-it-works-craft',
  '5JmxBz_d49s',
  '5jmxbz-d49s',
  'signup-workshop',
  'VWgfW_Df4fQ',
  'career-complex-problems',
  'Rf2FWjajd7s',
  'career-open-questions',
  'lQQz57tvWfo',
  'career-shared-decisions',
  'ePnZ8c20f_o',
];

async function checkProductionMedia() {
  console.log('── CI / Production Media Integrity Verification ──');

  // 1. Check media-provenance.json manifest exists
  if (!existsSync(manifestPath)) {
    console.error(`[CI Media ERROR] Production media manifest missing at: ${manifestPath}`);
    process.exit(1);
  }

  const manifestRaw = await fs.readFile(manifestPath, 'utf-8');
  let manifest;
  try {
    manifest = JSON.parse(manifestRaw);
  } catch (err) {
    console.error(`[CI Media ERROR] Corrupted JSON manifest: ${err.message}`);
    process.exit(1);
  }

  if (!manifest.assets || !Array.isArray(manifest.assets) || manifest.assets.length < 20) {
    console.error(`[CI Media ERROR] Manifest must contain at least 20 assets, found ${manifest.assets?.length || 0}`);
    process.exit(1);
  }

  console.log(`✓ Manifest verified: ${manifest.assets.length} production asset entries.`);

  // 2. Validate uniqueness of keys & IDs
  const keys = new Set();
  const ids = new Set();
  for (const asset of manifest.assets) {
    if (keys.has(asset.key)) {
      console.error(`[CI Media ERROR] Duplicate manifest key: ${asset.key}`);
      process.exit(1);
    }
    keys.add(asset.key);

    if (ids.has(asset.id)) {
      console.error(`[CI Media ERROR] Duplicate manifest id: ${asset.id}`);
      process.exit(1);
    }
    ids.add(asset.id);
  }
  console.log(`✓ All manifest keys and IDs are unique.`);

  // 3. Verify physical existence and byte size of all derivatives
  let totalDerivativesChecked = 0;
  for (const asset of manifest.assets) {
    if (!asset.derivatives || asset.derivatives.length === 0) {
      console.error(`[CI Media ERROR] Asset ${asset.key} has no derivatives listed.`);
      process.exit(1);
    }

    for (const derivUrl of asset.derivatives) {
      const filePath = path.join(publicDir, derivUrl.replace(/^\//, ''));
      if (!existsSync(filePath)) {
        console.error(`[CI Media ERROR] Missing derivative on disk: ${filePath} (from asset ${asset.key})`);
        process.exit(1);
      }

      const stat = statSync(filePath);
      if (stat.size < 1000) {
        console.error(`[CI Media ERROR] Derivative file too small / truncated: ${filePath} (${stat.size} bytes)`);
        process.exit(1);
      }

      totalDerivativesChecked++;
    }
  }
  console.log(`✓ Verified ${totalDerivativesChecked} production derivative files physically present with valid sizes.`);

  // 4. Verify no production source files import `media-source/`
  async function scanDir(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await scanDir(fullPath);
      } else if (/\.(jsx?|tsx?|css|html)$/.test(entry.name)) {
        const content = await fs.readFile(fullPath, 'utf-8');
        if (content.includes('media-source/')) {
          console.error(`[CI Media ERROR] Direct source media import found in ${fullPath}`);
          process.exit(1);
        }
        for (const forbidden of FORBIDDEN_LEGACY_KEYS) {
          if (content.includes(forbidden)) {
            console.error(`[CI Media ERROR] Contaminated/legacy asset "${forbidden}" referenced in ${fullPath}`);
            process.exit(1);
          }
        }
      }
    }
  }

  console.log('Scanning src/ for forbidden legacy references or raw media-source imports...');
  await scanDir(srcDir);
  console.log('✓ No forbidden legacy references or raw media-source imports found in src/.');

  console.log('\n── CI / Production Media Integrity PASSED ──\n');
}

checkProductionMedia().catch((err) => {
  console.error('[CI Media FATAL]', err);
  process.exit(1);
});
