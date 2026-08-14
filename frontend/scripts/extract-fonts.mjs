import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

async function extract() {
  const fontDir = path.resolve('public/fonts');
  const tmpZip = path.join(fontDir, 'tmp.zip');
  const extDir = path.join(fontDir, 'ext');

  try {
    execSync(`tar -xf "${tmpZip}" -C "${fontDir}"`, { stdio: 'inherit' });
    console.log('Extracted via tar');
  } catch (err) {
    console.log('Tar failed, trying PowerShell...');
    execSync(`powershell -Command "Expand-Archive -LiteralPath '${tmpZip}' -DestinationPath '${extDir}' -Force"`, { stdio: 'inherit' });
  }

  // Find all variable woff2 files in fontDir or extDir
  async function findFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        await findFiles(full);
      } else if (e.name.endsWith('.woff2')) {
        const dest = path.join(fontDir, e.name.replace(/\[/g, '_').replace(/\]/g, '_').replace(/,/g, '_'));
        await fs.copyFile(full, dest);
        console.log(`Copied ${e.name} -> ${path.basename(dest)}`);
      }
    }
  }

  await findFiles(fontDir);
  console.log('Font setup complete!');
}

extract();
