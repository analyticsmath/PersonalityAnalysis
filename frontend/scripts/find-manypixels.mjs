import fs from 'node:fs/promises';
import path from 'node:path';

async function fetchManyPixelsPages() {
  const pages = [
    'https://www.manypixels.co/gallery?114e1d2a_page=11&5539fc71_page=43',
    'https://www.manypixels.co/gallery?41120650_page=49',
    'https://www.manypixels.co/gallery?114e1d2a_page=7&41120650_page=51',
    'https://www.manypixels.co/gallery?114e1d2a_page=25&41120650_page=7'
  ];

  for (const p of pages) {
    try {
      console.log('Fetching', p);
      const res = await fetch(p, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0'
        }
      });
      const html = await res.text();
      // Look for webflow or CDN image URLs
      const imgUrls = [...html.matchAll(/https:\/\/[^"'\s]+\.(?:svg|png)/gi)].map(m => m[0]);
      console.log(`Page ${p} found ${imgUrls.length} image urls. Sample:`, imgUrls.slice(0, 5));
      // Look for illustration titles or cards
      const titles = [...html.matchAll(/<div[^>]*class="[^"]*card[^"]*"[^>]*>[\s\S]*?<\/div>/gi)].map(m => m[0].slice(0, 100));
      console.log('Found cards:', titles.length);
    } catch (e) {
      console.error('Error fetching page:', e.message);
    }
  }
}

fetchManyPixelsPages();
