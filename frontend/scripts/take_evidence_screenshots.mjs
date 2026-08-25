import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const OUTPUT_DIR = 'C:/Users/ANC/.gemini/antigravity/brain/dfdfe687-a70f-47fa-8ac2-f3f2ca938f5a/evidence_screens';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

const ROUTES = [
  { name: 'home_hero', path: '/', scrollY: 0 },
  { name: 'home_evidence_deck', path: '/', scrollY: 1200 },
  { name: 'home_conditions_journey', path: '/', scrollY: 2600 },
  { name: 'how_causal_essay', path: '/how-it-works', scrollY: 400 },
  { name: 'career_spatial_atlas', path: '/career-intelligence', scrollY: 0 },
  { name: 'progress_scrub_stage', path: '/progress', scrollY: 0 },
  { name: 'trust_provenance_inspection', path: '/trust', scrollY: 0 },
  { name: 'methodology_monograph', path: '/methodology', scrollY: 0 },
  { name: 'auth_login', path: '/login', scrollY: 0 },
];

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // server not ready yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Server did not respond within ${timeoutMs}ms at ${url}`);
}

async function main() {
  console.log('Starting preview server on port 5173...');
  const server = spawn('npx', ['vite', 'preview', '--port', '5173', '--strictPort'], {
    shell: true,
    stdio: 'pipe',
  });

  try {
    await waitForServer('http://127.0.0.1:5173/');
    console.log('Preview server ready.');

    const browser = await chromium.launch();
    
    for (const vp of VIEWPORTS) {
      console.log(`Capturing viewports for ${vp.name} (${vp.width}x${vp.height})...`);
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
      });

      for (const r of ROUTES) {
        const url = `http://127.0.0.1:5173${r.path}`;
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(600);

        if (r.scrollY > 0) {
          await page.evaluate((y) => window.scrollTo(0, y), r.scrollY);
          await page.waitForTimeout(400);
        }

        const filename = `${vp.name}_${r.name}.png`;
        const filepath = path.join(OUTPUT_DIR, filename);
        await page.screenshot({ path: filepath });
        console.log(`Saved: ${filename}`);
      }

      await page.close();
    }

    await browser.close();
    console.log('All screenshots captured successfully.');
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

