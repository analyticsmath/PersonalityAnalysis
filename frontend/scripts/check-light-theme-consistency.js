#!/usr/bin/env node
/**
 * Light-theme consistency checker.
 *
 * Scans active product source files for disallowed dark-background patterns.
 * Exit 0 = clean. Exit 1 = violations found.
 *
 * Run: node scripts/check-light-theme-consistency.js
 * NPM:  npm run check:theme
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const ROOT = path.resolve(__dirname, '../src');

/** File extensions to scan */
const EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.css']);

/**
 * Disallowed patterns for dark backgrounds in active UI.
 * Each entry: { pattern: RegExp, label: string }
 */
const DISALLOWED = [
  // Hard dark hex colours as background values
  { pattern: /background[^;'"]*#060812/i,       label: 'dark bg #060812' },
  { pattern: /background[^;'"]*#020617/i,       label: 'dark bg #020617' },
  { pattern: /background[^;'"]*#0B1120/i,       label: 'dark bg #0B1120' },
  { pattern: /background[^;'"]*#111827/i,       label: 'dark bg #111827' },

  // rgba dark slate used as page/component background
  { pattern: /background[^;'"]*rgba\(\s*15\s*,\s*23\s*,\s*42\s*,\s*0\.[6-9]/i, label: 'dark bg rgba(15,23,42,>=0.6)' },
  { pattern: /background[^;'"]*rgba\(\s*11\s*,\s*1[67]\s*,\s*3[0-9]/i,          label: 'dark bg rgba(11,16–17,30–39)' },
  { pattern: /background[^;'"]*rgba\(\s*6\s*,\s*8\s*,\s*18/i,                   label: 'dark bg rgba(6,8,18)' },

  // Tailwind dark background utility classes on JSX
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bbg-slate-9\d{2}\b/i, label: 'Tailwind bg-slate-900+' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bbg-gray-9\d{2}\b/i,  label: 'Tailwind bg-gray-900+' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bbg-black\b/i,        label: 'Tailwind bg-black' },

  // Old space/cosmic gradient classes in JSX class strings
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bfrom-slate-950\b/i,  label: 'Tailwind from-slate-950' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bto-slate-900\b/i,    label: 'Tailwind to-slate-900' },
];

/**
 * Allowlist: file paths (relative to src/) where dark patterns are permitted.
 * Covers CSS variable *names* (not rendered backgrounds), test fixtures,
 * dark-tooltip exception, and legacy/3d files.
 */
const ALLOWLIST_PATHS = new Set([
  // Design token source files — contain variable *names* with dark colours
  'styles/theme.css',         // :root definitions
  'styles/phase6-ui.css',     // chart tooltip dark variant allowed
  'theme/tokens.js',

  // 3D / particle effects — intentional dark canvas
  'components/3d/ParticleBackground.js',
  'components/3d/TraitSphere.js',

  // Legacy static assessment page — not on active user path
  'pages/Legacy/LegacyStaticAssessmentPage.jsx',
]);

// ---------------------------------------------------------------------------
// Scanner
// ---------------------------------------------------------------------------

let violations = 0;
const summary = [];

function scanFile(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');

  if (ALLOWLIST_PATHS.has(rel)) {
    return; // explicitly allowlisted
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Skip pure comment lines
    if (/^\s*(\/\/|\/\*|\*|\*\/)/.test(line)) return;

    for (const { pattern, label } of DISALLOWED) {
      if (pattern.test(line)) {
        violations += 1;
        summary.push(`  ${rel}:${idx + 1}  [${label}]`);
        summary.push(`    → ${line.trim().slice(0, 120)}`);
      }
    }
  });
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules or hidden dirs
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      walk(full);
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      scanFile(full);
    }
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

console.log('Checking light-theme consistency in frontend/src …\n');
walk(ROOT);

if (violations === 0) {
  console.log('✓  No disallowed dark-background patterns found. Theme is clean.');
  process.exit(0);
} else {
  console.error(`✗  ${violations} violation(s) found:\n`);
  summary.forEach((line) => console.error(line));
  console.error('\nFix the above, or add the file to ALLOWLIST_PATHS in scripts/check-light-theme-consistency.js if the dark style is intentional.');
  process.exit(1);
}
