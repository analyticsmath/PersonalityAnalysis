import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: '1440x900 Desktop Standard', width: 1440, height: 900 },
  { name: '1366x768 Desktop Compact', width: 1366, height: 768 },
  { name: '1024x768 Landscape Tablet', width: 1024, height: 768 },
  { name: '820x1180 iPad Air Portrait', width: 820, height: 1180 },
  { name: '430x930 iPhone 14 Pro Max', width: 430, height: 930 },
  { name: '390x844 iPhone 14/13', width: 390, height: 844 },
  { name: '360x800 Android Standard', width: 360, height: 800 },
];

const ROUTES = [
  { name: 'Home', path: '/' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Career Intelligence', path: '/career-intelligence' },
  { name: 'Progress', path: '/progress' },
  { name: 'Methodology', path: '/methodology' },
  { name: 'Trust', path: '/trust' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Login', path: '/login' },
  { name: 'Signup', path: '/signup' },
];

test.describe('Context Atlas — Real-Browser Viewport & Geometry Suite', () => {
  for (const vp of VIEWPORTS) {
    test.describe(`Viewport: ${vp.name} (${vp.width}x${vp.height})`, () => {
      for (const route of ROUTES) {
        test(`Route ${route.name} (${route.path}) renders without horizontal overflow and enforces single main`, async ({ page }) => {
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await page.goto(route.path, { waitUntil: 'domcontentloaded' });

          // Single main element contract
          const mains = await page.locator('main#main-content').count();
          expect(mains).toBe(1);

          // Header rendered
          const header = page.locator('header.pa-px-header, header.pa-atlas-header, header');
          await expect(header.first()).toBeVisible();

          // Horizontal overflow verification (allows up to 2px for sub-pixel anti-aliasing)
          const hasOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth + 2;
          });
          expect(hasOverflow).toBe(false);
        });
      }
    });
  }

  test('Atlas Index Menu accessibility, inert state, and Escape handling', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const triggerBtn = page.getByRole('button', { name: /Index/i });
    await expect(triggerBtn).toBeVisible();

    // Open menu
    await triggerBtn.click();

    // Overlay is visible
    const overlay = page.locator('.pa-px-index-overlay, .pa-atlas-index-overlay');
    await expect(overlay).toBeVisible();

    // Main content is inert
    const isMainInert = await page.locator('main#main-content').getAttribute('inert');
    expect(isMainInert).not.toBeNull();

    // Press Escape
    await page.keyboard.press('Escape');

    // Overlay is closed
    await expect(overlay).toBeHidden();

    // Main content is active again
    const isMainInertAfter = await page.locator('main#main-content').getAttribute('inert');
    expect(isMainInertAfter).toBeNull();
  });
});
