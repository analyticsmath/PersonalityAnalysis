'use strict';

/**
 * Cross-platform `node --check` over backend .js sources (Windows/macOS/Linux).
 * Replaces Unix-only find/xargs used by npm run check:syntax.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const BACKEND_ROOT = path.resolve(__dirname, '..');
const SKIP_DIR_NAMES = new Set(['node_modules', 'coverage', 'build', 'dist', '.git']);

/**
 * @param {string} dir
 * @param {string[]} out
 */
function collectJsFiles(dir, out) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIR_NAMES.has(ent.name)) continue;
      collectJsFiles(full, out);
    } else if (ent.isFile() && ent.name.endsWith('.js')) {
      out.push(full);
    }
  }
}

function main() {
  const files = [];
  collectJsFiles(BACKEND_ROOT, files);
  files.sort();

  const failures = [];
  let checked = 0;

  for (const filePath of files) {
    checked += 1;
    const rel = path.relative(BACKEND_ROOT, filePath) || path.basename(filePath);
    const r = spawnSync(process.execPath, ['--check', filePath], {
      encoding: 'utf8',
      shell: false,
    });
    if (r.status !== 0) {
      failures.push(rel);
      if (r.stderr) process.stderr.write(r.stderr);
      if (r.stdout) process.stdout.write(r.stdout);
    }
  }

  console.log(`check-syntax: checked ${checked} file(s) under ${BACKEND_ROOT}`);

  if (failures.length) {
    console.error(`check-syntax: FAILED (${failures.length})`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }

  console.log('check-syntax: OK');
}

main();
