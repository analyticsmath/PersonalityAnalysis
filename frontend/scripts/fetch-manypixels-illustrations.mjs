import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve(import.meta.dirname, '..', 'public', 'illustrations');
const manifestPath = path.join(outDir, 'illustrations-provenance.json');

const targetSubjects = [
  { key: 'welcome-career-1', name: 'Career 1', fallbackNames: ['Career', 'Ambition', 'Climbing', 'Goal'], usage: 'dashboard first-run / welcome' },
  { key: 'analytics-empty-analyst', name: 'Analyst', fallbackNames: ['Data Analysis 1', 'Data Analysis', 'Report Analysis', 'Analytics'], usage: 'analytics empty' },
  { key: 'profile-analysis', name: 'Profile Analysis', fallbackNames: ['Profile', 'User Research', 'Research'], usage: 'profile/results support' },
  { key: 'development-team-work', name: 'Team Work 2', fallbackNames: ['Team Work 1', 'Team Work', 'Teamwork', 'Collaborate'], usage: 'development loop' },
  { key: 'assessment-completed', name: 'Team Presentation 9', fallbackNames: ['Team Presentation 3', 'Team Presentation', 'Presentation', 'Success'], usage: 'assessment completed' },
  { key: 'research-science', name: 'Science', fallbackNames: ['Scientist', 'Lab', 'Chemistry', 'Research'], usage: 'research context' },
  { key: 'ux-interface', name: 'User Interface 1', fallbackNames: ['User Interface', 'Wireframe', 'Web Design', 'UI'], usage: 'UX/product context' },
  { key: 'report-analysis', name: 'Report Analysis 5', fallbackNames: ['Report Analysis 6', 'Report Analysis 2', 'Report Analysis', 'Document'], usage: 'report generation' },
];

function recolorSvg(svgText) {
  // Clean background rects if any
  let clean = svgText.replace(/<rect[^>]*fill="(?:#ffffff|#fff|white)"[^>]*width="100%"[^>]*\/>/gi, '');
  
  // Recolor primary brand/accent fills and strokes toward #101414, #DDF45A, #2F6FED, and neutral grays #566362, #DCE4E2
  // Replace prominent bright blues / purples / pinks / cyans
  clean = clean
    .replace(/#4C6FFF|#3A57E8|#6C5CE7|#4263EB|#3B82F6|#2563EB/gi, '#101414')
    .replace(/#FF6584|#FF7D90|#FF4757|#E84393|#FD79A8/gi, '#DDF45A')
    .replace(/#00D2D3|#00CEC9|#55EFC4|#0984E3/gi, '#2F6FED')
    .replace(/#2D3748|#1A202C|#2C3E50|#34495E/gi, '#101414')
    .replace(/#E2E8F0|#EDF2F7|#F7FAFC|#F1F2F6/gi, '#EEF2F1')
    .replace(/#CBD5E0|#A0AEC0|#718096/gi, '#566362');

  return clean;
}

async function scrapeGallery() {
  console.log('── Starting ManyPixels Illustration Harvester ──');
  await fs.mkdir(outDir, { recursive: true });

  const galleryPages = [
    'https://www.manypixels.co/gallery?114e1d2a_page=1',
    'https://www.manypixels.co/gallery?114e1d2a_page=2',
    'https://www.manypixels.co/gallery?114e1d2a_page=3',
    'https://www.manypixels.co/gallery?114e1d2a_page=4',
    'https://www.manypixels.co/gallery?114e1d2a_page=5',
    'https://www.manypixels.co/gallery?114e1d2a_page=6',
    'https://www.manypixels.co/gallery?114e1d2a_page=7',
    'https://www.manypixels.co/gallery?114e1d2a_page=8',
    'https://www.manypixels.co/gallery?114e1d2a_page=9',
    'https://www.manypixels.co/gallery?114e1d2a_page=10',
    'https://www.manypixels.co/gallery?114e1d2a_page=11',
    'https://www.manypixels.co/gallery?114e1d2a_page=12',
    'https://www.manypixels.co/gallery?114e1d2a_page=13',
    'https://www.manypixels.co/gallery?114e1d2a_page=14',
    'https://www.manypixels.co/gallery?114e1d2a_page=15',
    'https://www.manypixels.co/gallery?114e1d2a_page=16',
    'https://www.manypixels.co/gallery?114e1d2a_page=17',
    'https://www.manypixels.co/gallery?114e1d2a_page=18',
    'https://www.manypixels.co/gallery?114e1d2a_page=19',
    'https://www.manypixels.co/gallery?114e1d2a_page=20',
    'https://www.manypixels.co/gallery?114e1d2a_page=21',
    'https://www.manypixels.co/gallery?114e1d2a_page=22',
    'https://www.manypixels.co/gallery?114e1d2a_page=23',
    'https://www.manypixels.co/gallery?114e1d2a_page=24',
    'https://www.manypixels.co/gallery?114e1d2a_page=25',
  ];

  const items = [];

  for (const pageUrl of galleryPages) {
    try {
      const res = await fetch(pageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      });
      if (!res.ok) continue;
      const html = await res.text();

      // Extract all illustration items from HTML
      const itemBlocks = [...html.matchAll(/<div\s+itemID="([^"]+)"\s+class="illustration_item[^"]*">([\s\S]*?)<\/div>\s*<\/div>/gi)];
      for (const block of itemBlocks) {
        const itemID = block[1];
        const content = block[2];
        const imgMatch = content.match(/<img[^>]+imageName="([^"]+)"[^>]+src="([^"]+)"/i) || content.match(/<img[^>]+src="([^"]+)"[^>]+imageName="([^"]+)"/i);
        const styleMatch = content.match(/<div\s+fs-cmsfilter-field="styles"[^>]*>([^<]+)<\/div>/i);
        if (imgMatch) {
          const imageName = (imgMatch[1] || imgMatch[2]).trim();
          const src = (imgMatch[2] || imgMatch[1]).trim();
          const style = styleMatch ? styleMatch[1].trim() : 'Colossalflat';
          items.push({ itemID, imageName, src, style });
        }
      }
    } catch (e) {
      console.warn(`Could not scrape ${pageUrl}:`, e.message);
    }
  }

  console.log(`Scraped ${items.length} total illustrations across pages.`);

  const downloaded = [];

  for (const target of targetSubjects) {
    // 1. Exact or style match
    let match = items.find(
      (it) => it.imageName.toLowerCase() === target.name.toLowerCase() && it.style.toLowerCase() === 'colossalflat'
    );
    if (!match) {
      match = items.find((it) => it.imageName.toLowerCase() === target.name.toLowerCase());
    }
    if (!match && target.fallbackNames) {
      for (const fb of target.fallbackNames) {
        match = items.find(
          (it) => it.imageName.toLowerCase() === fb.toLowerCase() && it.style.toLowerCase() === 'colossalflat'
        );
        if (!match) {
          match = items.find((it) => it.imageName.toLowerCase() === fb.toLowerCase());
        }
        if (match) break;
      }
    }

    if (match) {
      console.log(`Found match for [${target.name}] -> "${match.imageName}" (${match.style}) at ${match.src}`);
      try {
        const svgRes = await fetch(match.src);
        let svgText = await svgRes.text();
        svgText = recolorSvg(svgText);

        const filename = `${target.key}.svg`;
        const filePath = path.join(outDir, filename);
        await fs.writeFile(filePath, svgText, 'utf-8');

        downloaded.push({
          key: target.key,
          requestedName: target.name,
          actualName: match.imageName,
          style: match.style,
          usage: target.usage,
          sourceUrl: match.src,
          localPath: `frontend/public/illustrations/${filename}`,
          sourcePlatform: 'ManyPixels',
          license: 'ManyPixels Free-to-Use License',
        });
        console.log(`✓ Saved ${filename}`);
      } catch (err) {
        console.error(`Failed to download ${match.src}:`, err.message);
      }
    } else {
      console.warn(`No match found for [${target.name}]`);
    }
  }

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    total: downloaded.length,
    assets: downloaded,
  };

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Saved illustrations manifest to ${manifestPath}`);
}

scrapeGallery();
