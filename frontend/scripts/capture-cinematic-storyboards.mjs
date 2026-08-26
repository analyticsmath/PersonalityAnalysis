import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_DIR = 'C:\\Users\\ANC\\.gemini\\antigravity\\brain\\5a1af6ef-69a6-4ea2-97b8-bf0881fc1ed8';
const OUTPUT_DIR = resolve('dist/storyboards');

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('Starting preview server...');
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: resolve('.'),
    shell: true,
    stdio: 'pipe',
  });

  // Wait for preview server to be ready
  await new Promise((res) => setTimeout(res, 2500));

  console.log('Launching browser...');
  const browser = await chromium.launch();

  const routes = [
    { name: '01_home_hero', path: '/', viewport: { width: 1440, height: 900 } },
    { name: '02_how_it_works', path: '/how-it-works', viewport: { width: 1440, height: 900 } },
    { name: '03_career_intelligence', path: '/career-intelligence', viewport: { width: 1440, height: 900 } },
    { name: '04_progress', path: '/progress', viewport: { width: 1440, height: 900 } },
    { name: '05_trust', path: '/trust', viewport: { width: 1440, height: 900 } },
    { name: '06_methodology', path: '/methodology', viewport: { width: 1440, height: 900 } },
    { name: '07_privacy', path: '/privacy', viewport: { width: 1440, height: 900 } },
    { name: '08_login', path: '/login', viewport: { width: 1440, height: 900 } },
    { name: '09_signup', path: '/signup', viewport: { width: 1440, height: 900 } },
    { name: '10_404', path: '/route-outside-evidence', viewport: { width: 1440, height: 900 } },
    { name: '11_mobile_home', path: '/', viewport: { width: 390, height: 844 } },
    { name: '12_mobile_career', path: '/career-intelligence', viewport: { width: 390, height: 844 } },
    { name: '13_mobile_trust', path: '/trust', viewport: { width: 390, height: 844 } },
    { name: '14_reduced_motion_home', path: '/', viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' },
  ];

  for (const r of routes) {
    const context = await browser.newContext({
      viewport: r.viewport,
      reducedMotion: r.reducedMotion || 'no-preference',
    });
    const page = await context.newPage();
    try {
      await page.goto(`${BASE_URL}${r.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      const filePath = join(OUTPUT_DIR, `${r.name}.png`);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`Captured: ${r.name}`);

      // Also copy to artifact directory for presentation
      const artifactPath = join(ARTIFACT_DIR, `${r.name}.png`);
      copyFileSync(filePath, artifactPath);
    } catch (err) {
      console.error(`Failed to capture ${r.name}:`, err);
    } finally {
      await context.close();
    }
  }

  // Also capture scrolled movements on Home
  const homeContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const homePage = await homeContext.newPage();
  await homePage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

  const scrollCheckpoints = [
    { name: 'home_movement_2_source_split', y: 850 },
    { name: 'home_movement_3_constellation', y: 1550 },
    { name: 'home_movement_4_conditions', y: 2450 },
    { name: 'home_movement_5_career_field', y: 3450 },
    { name: 'home_movement_6_time_trust_finale', y: 4350 },
  ];

  for (const sp of scrollCheckpoints) {
    await homePage.evaluate((y) => window.scrollTo(0, y), sp.y);
    await homePage.waitForTimeout(400);
    const fp = join(OUTPUT_DIR, `${sp.name}.png`);
    await homePage.screenshot({ path: fp, fullPage: false });
    copyFileSync(fp, join(ARTIFACT_DIR, `${sp.name}.png`));
    console.log(`Captured scroll movement: ${sp.name}`);
  }

  await homeContext.close();
  await browser.close();
  preview.kill();
  console.log('Done capturing storyboards.');
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
