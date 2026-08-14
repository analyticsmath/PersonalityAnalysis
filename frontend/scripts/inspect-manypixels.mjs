import fs from 'node:fs/promises';

async function parseManyPixels() {
  const res = await fetch('https://www.manypixels.co/gallery?114e1d2a_page=11&5539fc71_page=43', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  await fs.writeFile('scripts/manypixels-page.html', html, 'utf-8');
  console.log('Saved manypixels-page.html, length:', html.length);
  
  // Extract all text and img tags inside collection items
  const itemMatches = [...html.matchAll(/<div[^>]*class="[^"]*(?:gallery-item|collection-item|illustration-card)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)];
  console.log('Item matches:', itemMatches.length);
}

parseManyPixels();
