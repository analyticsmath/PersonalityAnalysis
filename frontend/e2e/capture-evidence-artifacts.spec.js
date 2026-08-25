import { test,
  expect
 } from '@playwright/test';
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

test.describe('Capture Visual Evidence Artifacts', () => {
  test.setTimeout(120000);

  for (const vp of VIEWPORTS) {
    for (const r of ROUTES) {
      test(`Capture ${vp.name} - ${r.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(r.path, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(600);

        if (r.scrollY > 0) {
          await page.evaluate((y) => window.scrollTo(0, y), r.scrollY);
          await page.waitForTimeout(400);
        }

        const filename = `${vp.name}_${r.name}.png`;
        const filepath = path.join(OUTPUT_DIR, filename);
        await page.screenshot({ path: filepath });
        expect(fs.existsSync(filepath)).toBe(true);
      });
    }
  }
});
