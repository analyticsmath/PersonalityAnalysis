import fs from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve(import.meta.dirname, '..', 'dist');
const rawOrigin = process.env.VITE_SITE_ORIGIN?.trim().replace(/\/+$/, '') || 'https://personalityassessor.com';
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
  `Sitemap: ${origin}/sitemap.xml`,
  '',
].join('\n');

let origin;
try {
  origin = new URL(rawOrigin).origin;
} catch {
  origin = 'https://personalityassessor.com';
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${origin}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile(sitemapPath, sitemap);
await fs.writeFile(robotsPath, robots(origin));
console.log(`SEO assets generated successfully for origin: ${origin}`);
