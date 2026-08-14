async function testPexels() {
  const url = 'https://www.pexels.com/photo/top-view-of-an-architect-sitting-at-a-desk-and-creating-a-project-9618456/';
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    console.log('Status:', res.status);
    const html = await res.text();
    console.log('HTML length:', html.length);
    const ogMatch = html.match(/property="og:image"\s+content="([^"]+)"/) || html.match(/content="([^"]+)"\s+property="og:image"/);
    console.log('og:image:', ogMatch ? ogMatch[1] : 'none');

    // Also test direct CDN
    const cdnUrl = 'https://images.pexels.com/photos/9618456/pexels-photo-9618456.jpeg';
    const cdnRes = await fetch(cdnUrl, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
    console.log('CDN status:', cdnRes.status, 'Content-Type:', cdnRes.headers.get('content-type'), 'Length:', cdnRes.headers.get('content-length'));
  } catch (err) {
    console.error('Error:', err);
  }
}
testPexels();
