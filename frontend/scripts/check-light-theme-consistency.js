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
 * Each entry: { pattern: RegExp, label: string, suggest: string }
 */
const DISALLOWED = [
  // Hard dark hex backgrounds
  { pattern: /background[^;'"]*#060812/i,        label: 'dark bg #060812',        suggest: '#F8FAFC' },
  { pattern: /background[^;'"]*#020617/i,        label: 'dark bg #020617',        suggest: '#F8FAFC' },
  { pattern: /background[^;'"]*#0B1120/i,        label: 'dark bg #0B1120',        suggest: '#F1F5F9' },
  { pattern: /background[^;'"]*#111827/i,        label: 'dark bg #111827',        suggest: '#F1F5F9' },
  { pattern: /background[^;'"]*#1E293B/i,        label: 'dark bg #1E293B',        suggest: '#F1F5F9' },
  { pattern: /background[^;'"]*#0f182b/i,        label: 'dark bg #0f182b',        suggest: '#F1F5F9' },
  { pattern: /background[^;'"]*#030712/i,        label: 'dark bg #030712',        suggest: '#F8FAFC' },

  // rgba dark slate used as page/component background
  { pattern: /background[^;'"]*rgba\(\s*15\s*,\s*23\s*,\s*42\s*,\s*0\.[5-9]/i,    label: 'dark bg rgba(15,23,42,>=0.5)',    suggest: 'rgba(248,250,252,…)' },
  { pattern: /background[^;'"]*rgba\(\s*11\s*,\s*1[67]\s*,\s*3[0-9]/i,             label: 'dark bg rgba(11,16–17,30–39)',    suggest: '#F1F5F9' },
  { pattern: /background[^;'"]*rgba\(\s*6\s*,\s*8\s*,\s*18/i,                      label: 'dark bg rgba(6,8,18)',           suggest: '#F8FAFC' },
  { pattern: /background[^;'"]*rgba\(\s*1[4-9]\s*,\s*2[0-9]\s*,\s*[4-9][0-9]/i,   label: 'dark bg rgba(14–19,2x,4x–9x)',   suggest: '#F8FAFC or #E0F2FE' },
  { pattern: /background[^;'"]*rgba\(\s*1[0-9]\s*,\s*[12][0-9]\s*,\s*[3-9][0-9]/i,label: 'dark bg rgba(10–19,10–29,30+)',  suggest: '#F8FAFC' },

  // Dark-era white-alpha dividers (old dark UI artifact)
  { pattern: /rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.0[3-9]\)/i,  label: 'white-alpha divider rgba(255,255,255,0.03–0.09)', suggest: '#E2E8F0' },
  { pattern: /rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.1[0-5]\)/i,  label: 'white-alpha divider rgba(255,255,255,0.10–0.15)', suggest: '#E2E8F0' },

  // Tailwind dark background utility classes on JSX
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bbg-slate-9\d{2}\b/i,  label: 'Tailwind bg-slate-900+',    suggest: 'bg-slate-50 or bg-white' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bbg-gray-9\d{2}\b/i,   label: 'Tailwind bg-gray-900+',     suggest: 'bg-gray-50' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bbg-zinc-9\d{2}\b/i,   label: 'Tailwind bg-zinc-900+',     suggest: 'bg-zinc-50' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bbg-black\b/i,          label: 'Tailwind bg-black',         suggest: 'bg-white' },

  // Old space/cosmic gradient classes in JSX class strings
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bfrom-slate-950\b/i,  label: 'Tailwind from-slate-950',   suggest: 'from-slate-50' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bto-slate-900\b/i,    label: 'Tailwind to-slate-900',     suggest: 'to-slate-100' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bfrom-gray-950\b/i,   label: 'Tailwind from-gray-950',    suggest: 'from-gray-50' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bfrom-slate-900\b/i,  label: 'Tailwind from-slate-900',   suggest: 'from-slate-50' },

  // Dark keyword CSS classes on active elements
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bglass-dark\b/i,       label: 'class glass-dark',          suggest: 'glass or card-light' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bdark-card\b/i,        label: 'class dark-card',           suggest: 'card-light' },
  { pattern: /\bclass(?:Name)?\s*=\s*["'][^"']*\bdark-panel\b/i,       label: 'class dark-panel',          suggest: 'panel-light' },

  // Specific remaining dark hex hits as CSS properties (CSS files only)
  { pattern: /^\s*background(?:-color)?\s*:\s*rgba\(\s*[0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+\s*,\s*0\.[789]\d*\s*\)\s*;/i,
    label: 'high-opacity dark rgba background',
    suggest: 'use a light tint or #FFFFFF' },
];

/**
 * Allowlist: file paths (relative to src/) where dark patterns are permitted.
 */
const ALLOWLIST_PATHS = new Set([
  // Design token source files — contain variable *names* with dark colours
  'styles/theme.css',
  'styles/phase6-ui.css',
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
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Skip pure comment lines
    if (/^\s*(\/\/|\/\*|\*|\*\/)/.test(line)) return;

    for (const { pattern, label, suggest } of DISALLOWED) {
      if (pattern.test(line)) {
        violations += 1;
        summary.push(`  ${rel}:${idx + 1}  [${label}]`);
        summary.push(`    → ${line.trim().slice(0, 120)}`);
        if (suggest) summary.push(`    Suggest: ${suggest}`);
      }
    }
  });
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
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
  console.error('\nFix the above, or add the file to ALLOWLIST_PATHS if the dark style is intentional.');
  process.exit(1);
}
