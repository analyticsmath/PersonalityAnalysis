import fs from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve(import.meta.dirname, '..', 'dist');
const configuredOrigin = process.env.VITE_SITE_ORIGIN?.trim().replace(/\/+$/, '');
const routes = ['/', '/how-it-works', '/career-intelligence', '/progress', '/methodology', '/trust', '/privacy'];
const sitemapPath = path.join(dist, 'sitemap.xml');
const robotsPath = path.join(dist, 'robots.txt');

const robots = (origin) => [
  'User-agent: *',
  'Allow: /',
  'Disallow: /__lab/',
  'Disallow: /dashboard',
  'Disallow: /analytics',
  'Disallow: /assessment/',
  'Disallow: /account/',
  ...(origin ? [`Sitemap: ${origin}/sitemap.xml`] : []),
  '',
].join('\n');

if (!configuredOrigin) {
  await fs.rm(sitemapPath, { force: true });
  await fs.writeFile(robotsPath, robots(''));
  console.warn('SEO assets: VITE_SITE_ORIGIN is not set; production sitemap was omitted.');
  process.exit(0);
}

let origin;
try {
  origin = new URL(configuredOrigin).origin;
} catch {
  throw new Error('VITE_SITE_ORIGIN must be an absolute URL when supplied.');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${origin}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile(sitemapPath, sitemap);
await fs.writeFile(robotsPath, robots(origin));
