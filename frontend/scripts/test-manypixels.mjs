import fs from 'node:fs/promises';
import path from 'node:path';

async function searchManyPixels() {
  console.log('Testing ManyPixels gallery fetch...');
  const galleryUrl = 'https://www.manypixels.co/gallery';
  try {
    const res = await fetch(galleryUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    console.log('Gallery status:', res.status);
    const html = await res.text();
    console.log('HTML length:', html.length);
    // Find any __NEXT_DATA__ or SVG/image links
    const nextData = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/);
    if (nextData) {
      console.log('Found NEXT_DATA, length:', nextData[1].length);
      const json = JSON.parse(nextData[1]);
      console.log('Keys in pageProps:', Object.keys(json.props?.pageProps || {}));
    }
  } catch (err) {
    console.error('Error fetching ManyPixels:', err.message);
  }
}

searchManyPixels();
