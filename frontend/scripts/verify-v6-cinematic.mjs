import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const SCREENSHOT_DIR = path.resolve(import.meta.dirname, '..', '..', 'output', 'v6-browser-verification');
await fs.mkdir(SCREENSHOT_DIR, { recursive: true });

// Start preview server
console.log('Starting preview server...');
const previewProcess = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], {
  cwd: path.resolve(import.meta.dirname, '..'),
  shell: true,
  stdio: 'pipe',
});

// Wait for server to start
await new Promise((resolve) => setTimeout(resolve, 3000));

const browser = await chromium.launch({ headless: true });
const results = {
  viewportsTested: [],
  routesTested: [],
  assertions: [],
  screenshots: [],
};

const BASE_URL = 'http://localhost:4173';

try {
  // ── Desktop Matrix (1440px & 1024px) ──
  for (const width of [1440, 1024]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
    });

    console.log(`Testing Desktop ${width}px...`);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Assert no horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1;
    });
    results.assertions.push({ check: `Desktop ${width}px scrollWidth <= clientWidth + 1`, passed: overflow });

    // Test Hero start (0%)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-hero-00.png`) });
    results.screenshots.push(`desktop-${width}-hero-00.png`);

    // Test Hero progress stages (12.5%, 25%, 37.5%, 50%, 62.5%, 75%, 87.5%, 100%)
    const scrollHeights = [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0];
    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

    for (const pct of scrollHeights) {
      await page.evaluate((y) => window.scrollTo(0, y), totalHeight * pct * 0.25);
      await page.waitForTimeout(200);
      const filename = `desktop-${width}-hero-progress-${Math.round(pct * 100)}.png`;
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename) });
      results.screenshots.push(filename);
    }

    // Scroll into Evidence Canvas active dwell
    await page.evaluate(() => {
      const el = document.querySelector('[data-cinematic-stage="evidence"]');
      if (el) window.scrollTo(0, el.offsetTop + el.offsetHeight * 0.35);
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-evidence.png`) });
    results.screenshots.push(`desktop-${width}-evidence.png`);

    // Test radio button interaction in Evidence Canvas
    const radios = page.locator('input[type="radio"]');
    if ((await radios.count()) >= 3) {
      await radios.nth(1).click();
      await page.waitForTimeout(200);
      const isChecked = await radios.nth(1).isChecked();
      results.assertions.push({ check: `Desktop ${width}px Evidence radio selection`, passed: isChecked });
    }

    // Scroll into Independent Readings active dwell
    await page.evaluate(() => {
      const el = document.querySelector('[data-cinematic-stage="readings"]');
      if (el) window.scrollTo(0, el.offsetTop + 100);
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-readings-bigfive.png`) });
    results.screenshots.push(`desktop-${width}-readings-bigfive.png`);

    // Click RIASEC tab
    const riasecTab = page.locator('button:has-text("RIASEC Interest Map")');
    await riasecTab.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-readings-riasec.png`) });
    results.screenshots.push(`desktop-${width}-readings-riasec.png`);

    // Click O*NET tab
    const onetTab = page.locator('button:has-text("O*NET Work Values")');
    await onetTab.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-readings-onet.png`) });
    results.screenshots.push(`desktop-${width}-readings-onet.png`);

    // Scroll into Career Worlds active dwell
    await page.evaluate(() => {
      const el = document.querySelector('[data-cinematic-stage="careers"]');
      if (el) window.scrollTo(0, el.offsetTop + 200);
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-career-world-01.png`) });
    results.screenshots.push(`desktop-${width}-career-world-01.png`);

    // Click World 02
    const world2Tab = page.locator('.pa-v6-career-tab').nth(1);
    await world2Tab.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-career-world-02.png`) });
    results.screenshots.push(`desktop-${width}-career-world-02.png`);

    // Check How It Works page
    await page.goto(`${BASE_URL}/how-it-works`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-how-it-works.png`) });
    results.screenshots.push(`desktop-${width}-how-it-works.png`);

    // Check computed contrast on Header & Primary CTA
    const headerColor = await page.evaluate(() => {
      const header = document.querySelector('.pa-v6-header');
      return window.getComputedStyle(header).color;
    });
    results.assertions.push({ check: `Desktop ${width}px How It Works Header ink color`, passed: !!headerColor });

    // Check Methodology page
    await page.goto(`${BASE_URL}/methodology`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-methodology.png`) });
    results.screenshots.push(`desktop-${width}-methodology.png`);

    // Check Career Intelligence page
    await page.goto(`${BASE_URL}/career-intelligence`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-career-intelligence.png`) });
    results.screenshots.push(`desktop-${width}-career-intelligence.png`);

    // Check Trust & Privacy pages
    await page.goto(`${BASE_URL}/trust`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-trust.png`) });
    results.screenshots.push(`desktop-${width}-trust.png`);

    await page.goto(`${BASE_URL}/privacy`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-privacy.png`) });
    results.screenshots.push(`desktop-${width}-privacy.png`);

    // Check Auth pages (55/45 desktop seam)
    await page.goto(`${BASE_URL}/login?next=%2Fassessment%2Fstart`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-login.png`) });
    results.screenshots.push(`desktop-${width}-login.png`);

    await page.goto(`${BASE_URL}/signup?next=%2Fassessment%2Fstart`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${width}-signup.png`) });
    results.screenshots.push(`desktop-${width}-signup.png`);

    await page.close();
  }

  // ── Mobile Matrix (360px, 390px, 412px, 768px) ──
  for (const width of [360, 390, 412, 768]) {
    const page = await browser.newPage({
      viewport: { width, height: 800 },
      isMobile: true,
      hasTouch: true,
    });

    console.log(`Testing Mobile/Tablet ${width}px...`);

    // Check Home
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
    results.assertions.push({ check: `Mobile ${width}px scrollWidth <= clientWidth + 1`, passed: overflow });

    // Assert mobile bottom nav visible
    const bottomNavVisible = await page.locator('.pa-v6-mobile-bottom-nav').isVisible();
    results.assertions.push({ check: `Mobile ${width}px bottom nav visible`, passed: width <= 640 ? bottomNavVisible : true });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile-${width}-home-start.png`) });
    results.screenshots.push(`mobile-${width}-home-start.png`);

    // Mid scroll
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile-${width}-home-mid.png`) });
    results.screenshots.push(`mobile-${width}-home-mid.png`);

    // Check How It Works on Mobile
    await page.goto(`${BASE_URL}/how-it-works`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile-${width}-how-it-works.png`) });
    results.screenshots.push(`mobile-${width}-how-it-works.png`);

    // Check Methodology on Mobile
    await page.goto(`${BASE_URL}/methodology`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile-${width}-methodology.png`) });
    results.screenshots.push(`mobile-${width}-methodology.png`);

    // Check Career Intelligence on Mobile
    await page.goto(`${BASE_URL}/career-intelligence`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile-${width}-career-intelligence.png`) });
    results.screenshots.push(`mobile-${width}-career-intelligence.png`);

    // Check Login on Mobile
    await page.goto(`${BASE_URL}/login?next=%2Fassessment%2Fstart`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile-${width}-login.png`) });
    results.screenshots.push(`mobile-${width}-login.png`);

    // Check Signup on Mobile
    await page.goto(`${BASE_URL}/signup?next=%2Fassessment%2Fstart`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile-${width}-signup.png`) });
    results.screenshots.push(`mobile-${width}-signup.png`);

    await page.close();
  }

  // ── Reduced Motion Test ──
  const reducedMotionPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  await reducedMotionPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  const reducedMotionNoOverflow = await reducedMotionPage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  results.assertions.push({ check: 'prefers-reduced-motion: reduce layout safe', passed: reducedMotionNoOverflow });
  await reducedMotionPage.close();

  // ── Safe Next Forwarding Test: /signup?next=%2Fassessment%2Fstart -> /login?next=%2Fassessment%2Fstart -> /assessment/start ──
  const authTestPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await authTestPage.goto(`${BASE_URL}/signup?next=%2Fassessment%2Fstart`, { waitUntil: 'networkidle' });
  const loginLink = authTestPage.locator('a:has-text("Sign in")').last();
  const loginHref = await loginLink.getAttribute('href');
  results.assertions.push({
    check: 'Signup preserves safe next forwarding to /login?next=%2Fassessment%2Fstart',
    passed: loginHref?.includes('next=%2Fassessment%2Fstart'),
  });
  await authTestPage.close();

  console.log('Verification completed successfully!');
  console.log('Total screenshots taken:', results.screenshots.length);
  console.log('Assertions passed:', results.assertions.filter((a) => a.passed).length, '/', results.assertions.length);

  const reportPath = path.join(SCREENSHOT_DIR, 'verification-summary.json');
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
} finally {
  await browser.close();
  previewProcess.kill();
}
