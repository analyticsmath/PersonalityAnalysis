import { chromium } from '@playwright/test';
import { createServer } from 'vite';
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

async function main() {
  console.log('Starting Vite server with createServer API...');
  const server = await createServer({
    root: process.cwd(),
    server: {
      host: '127.0.0.1',
      port: 5199,
    },
  });
  await server.listen();

  const baseUrl = 'http://127.0.0.1:5199';

  try {
    console.log(`Vite server running at ${baseUrl}`);
    const browser = await chromium.launch();
    
    for (const vp of VIEWPORTS) {
      console.log(`Capturing viewports for ${vp.name} (${vp.width}x${vp.height})...`);
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
      });

      for (const r of ROUTES) {
        const url = `${baseUrl}${r.path}`;
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

    // Additional Intermediate-Motion & Interactive Evidence Captures
    console.log('Capturing interactive motion states (Progress 50%, Career selection, Trust aperture, Reduced Motion)...');
    const interactivePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // 1. Progress Scrub intermediate 50% state
    await interactivePage.goto(`${baseUrl}/progress`, { waitUntil: 'networkidle' });
    const slider = await interactivePage.$('.pa-px-temporal-slider-input');
    if (slider) {
      await slider.evaluate((el) => {
        el.value = '0.5';
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      });
      await interactivePage.waitForTimeout(400);
      await interactivePage.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_progress_scrub_50pct_overlap.png') });
    }

    // 2. Career spatial selection (e.g. ML Engineer)
    await interactivePage.goto(`${baseUrl}/career-intelligence`, { waitUntil: 'networkidle' });
    const roleBtns = await interactivePage.$$('.pa-px-career-role-item');
    if (roleBtns.length > 4) {
      await roleBtns[4].click();
      await interactivePage.waitForTimeout(400);
      await interactivePage.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_career_spatial_ml_active.png') });
    }

    // 3. Trust aperture Calculated layer (step 3)
    await interactivePage.goto(`${baseUrl}/trust`, { waitUntil: 'networkidle' });
    const trustTabs = await interactivePage.$$('.pa-px-aperture-step-btn');
    if (trustTabs.length > 2) {
      await trustTabs[2].click();
      await interactivePage.waitForTimeout(400);
      await interactivePage.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_trust_aperture_calculated_step.png') });
    }

    await interactivePage.close();

    // 4. Reduced-Motion verification capture
    const rmContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const rmPage = await rmContext.newPage();
    await rmPage.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await rmPage.waitForTimeout(600);
    await rmPage.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_reduced_motion_home.png') });
    await rmContext.close();

    await browser.close();
    console.log('All screenshots captured successfully.');
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

