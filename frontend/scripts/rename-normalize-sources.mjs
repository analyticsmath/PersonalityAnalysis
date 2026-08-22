import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const sourceDir = path.resolve(import.meta.dirname, '..', 'media-source', 'evidence-in-context');

async function getFileHash(filePath) {
  const buffer = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function normalizeSources() {
  console.log('[Media Pipeline] Checking for duplicate or malformed source filenames...');
  try {
    await fs.access(sourceDir);
  } catch {
    console.error(`[Media Pipeline] Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);

  const doubleJpgFiles = files.filter((f) => f.endsWith('.jpg.jpg'));

  for (const file of doubleJpgFiles) {
    const srcPath = path.join(sourceDir, file);
    const destName = file.replace(/\.jpg\.jpg$/, '.jpg');
    const destPath = path.join(sourceDir, destName);

    try {
      await fs.access(destPath);
      // Destination exists - check hash
      const srcHash = await getFileHash(srcPath);
      const destHash = await getFileHash(destPath);
      const srcStat = await fs.stat(srcPath);
      const destStat = await fs.stat(destPath);

      if (srcHash === destHash && srcStat.size === destStat.size) {
        console.log(`[Media Pipeline] Duplicate identical file detected: ${file} matches existing ${destName}. Removing duplicate.`);
        await fs.unlink(srcPath);
      } else {
        console.error(`[Media Pipeline] Collision conflict: ${file} and ${destName} differ in content/size!`);
        console.error(`  ${file}: ${srcStat.size} bytes (${srcHash})`);
        console.error(`  ${destName}: ${destStat.size} bytes (${destHash})`);
        process.exit(1);
      }
    } catch {
      // Destination does not exist -> safe rename
      console.log(`[Media Pipeline] Normalizing ${file} -> ${destName}`);
      await fs.rename(srcPath, destPath);
    }
  }

  console.log('[Media Pipeline] Source filename normalization complete.');
}

normalizeSources().catch((err) => {
  console.error('[Media Pipeline] Normalization failed:', err);
  process.exit(1);
});
