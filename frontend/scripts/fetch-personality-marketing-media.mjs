import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..', 'public', 'media', 'personality-v2');
const manifestPath = path.join(root, 'media-provenance.json');
const retrievedAt = new Date().toISOString();
const nonEndorsementNote = 'People pictured are not Personality Assessor users, assessment subjects, career-match recipients, testimonial subjects, or endorsers.';

const sources = [
  ['hero-h1', 'hero', 'jEr29j1pmms', 'https://unsplash.com/photos/man-working-on-a-computer-in-an-office-setting-jEr29j1pmms', 'Homepage dominant full-background professional environment', '50% 52%'],
  ['hero-h2', 'hero', 'WUY0W2RSiBw', 'https://unsplash.com/photos/man-working-on-architectural-model-at-desk-WUY0W2RSiBw', 'Homepage layered architecture and model-making frame', '52% 50%'],
  ['hero-h3', 'hero', 'Wlg-hDGCQ08', 'https://unsplash.com/photos/designer-sketching-eyeglasses-with-laptop-and-tools-Wlg-hDGCQ08', 'Homepage layered product design frame', '48% 52%'],
  ['hero-h4', 'hero', 'XLQuTdktpa8', 'https://unsplash.com/photos/two-scientists-working-on-computers-in-a-laboratory-XLQuTdktpa8', 'Homepage layered research environment frame', '50% 50%'],
  ['hero-h5', 'hero', 'uM9Fz2eVhIM', 'https://unsplash.com/photos/man-fixing-the-device-using-soldering-iron-uM9Fz2eVhIM', 'Homepage first-scroll workshop detail', '53% 50%'],
  ['world-w1', 'worlds', 'EyRIpXtcCEU', 'https://unsplash.com/photos/office-workers-are-busy-working-on-computers-EyRIpXtcCEU', 'Work Worlds: collaborative software office', '50% 50%'],
  ['world-w2', 'worlds', 'fdGTi4IcaJc', 'https://unsplash.com/photos/a-man-sitting-in-front-of-three-computer-monitors-fdGTi4IcaJc', 'Work Worlds: focused software development', '50% 50%'],
  ['world-w3', 'worlds', 'MeTEZ0Uk99c', 'https://unsplash.com/photos/person-writing-on-white-paper-MeTEZ0Uk99c', 'Work Worlds: product design sketching', '50% 50%'],
  ['world-w4', 'worlds', 'tyUYtvBaQj4', 'https://unsplash.com/photos/architect-examines-a-wooden-building-model-on-desk-tyUYtvBaQj4', 'Work Worlds: architecture model detail', '50% 50%'],
  ['world-w5', 'worlds', 'D_gZsFyXmkw', 'https://unsplash.com/photos/hand-holding-a-complex-electronic-circuit-board-with-components-D_gZsFyXmkw', 'Work Worlds: electronics macro', '50% 50%'],
  ['world-w6', 'worlds', '6CfjB_bQ_FY', 'https://unsplash.com/photos/man-presenting-data-on-a-large-screen-to-colleagues-6CfjB_bQ_FY', 'Work Worlds: data interpretation', '50% 50%'],
  ['world-w7', 'worlds', 'NSlqiFRyafY', 'https://unsplash.com/photos/control-room-with-monitors-and-chairs-NSlqiFRyafY', 'Work Worlds: operations control environment', '50% 50%'],
  ['world-w8', 'worlds', 'JI8glyV7Y7A', 'https://unsplash.com/photos/a-person-sitting-at-a-desk-JI8glyV7Y7A', 'Work Worlds: modern learning environment', '50% 50%'],
  ['world-w9', 'worlds', 'VVAXWSP-6qI', 'https://unsplash.com/photos/man-working-at-a-large-table-in-a-workshop-VVAXWSP-6qI', 'Work Worlds: manufacturing and tooling', '50% 50%'],
  ['world-w10', 'worlds', '5ma_XqDCiG4', 'https://unsplash.com/photos/a-room-filled-with-lots-of-desks-covered-in-monitors-5ma_XqDCiG4', 'Work Worlds: late-night technical environment', '50% 50%'],
  ['career-c1', 'careers', '64YrPKiguAE', 'https://unsplash.com/photos/woman-in-green-shirt-sitting-in-front-of-computer-64YrPKiguAE', 'Career intelligence: software engineer', '50% 50%'],
  ['career-c2', 'careers', 'pqzRfBhd9r0', 'https://unsplash.com/photos/man-designing-wireframes-at-desk-with-laptop-pqzRfBhd9r0', 'Career intelligence: UX and product design', '50% 50%'],
  ['career-c3', 'careers', 'cX62K66gMUk', 'https://unsplash.com/photos/man-in-office-reviewing-documents-at-desk-documents-cX62K66gMUk', 'Career intelligence: data and professional analysis', '50% 50%'],
  ['career-c4', 'careers', 'um1zVjVCtEY', 'https://unsplash.com/photos/man-in-white-long-sleeve-shirt-writing-on-white-board-um1zVjVCtEY', 'Career intelligence: product management and prioritisation', '50% 50%'],
  ['career-c5', 'careers', 'RLDjPI-r5fU', 'https://unsplash.com/photos/a-man-working-on-a-machine-in-a-factory-RLDjPI-r5fU', 'Career intelligence: industrial precision', '50% 50%'],
  ['career-c6', 'careers', 'FYToaJdSTWA', 'https://unsplash.com/photos/a-few-people-in-blue-lab-coats-looking-at-a-computer-screen-FYToaJdSTWA', 'Career intelligence: laboratory research', '50% 50%'],
  ['career-c7', 'careers', 'qgJCTooDMns', 'https://unsplash.com/photos/a-control-room-filled-with-lots-of-monitors-qgJCTooDMns', 'Career intelligence: operations and navigation', '50% 50%'],
  ['career-c8', 'careers', 'KolBZlJbiro', 'https://unsplash.com/photos/fashion-designer-working-on-a-laptop-in-her-studio-KolBZlJbiro', 'Career intelligence: creative professional studio', '50% 50%'],
  ['progress-p1', 'progress', 'HsMVmGngmWM', 'https://unsplash.com/photos/an-empty-office-desk-in-front-of-a-window-HsMVmGngmWM', 'Progress: quiet workspace before', '50% 50%'],
  ['progress-p2', 'progress', 'zWIFZeu5qeE', 'https://unsplash.com/photos/a-3d-printer-is-in-action-in-a-workshop-zWIFZeu5qeE', 'Progress: prototype in progress', '50% 50%'],
  ['progress-p3', 'progress', '59jotixIvNk', 'https://unsplash.com/photos/man-working-on-a-lathe-in-a-workshop-59jotixIvNk', 'Progress: precision craft', '50% 50%'],
  ['progress-p4', 'progress', '3QzMBrvCeyQ', 'https://unsplash.com/photos/people-reviewing-architectural-blueprints-on-desk-3QzMBrvCeyQ', 'Progress: project review and evidence', '50% 50%'],
  ['progress-p5', 'progress', 'rgKX4o2xSqI', 'https://unsplash.com/photos/team-collaborating-around-a-whiteboard-during-a-meeting-rgKX4o2xSqI', 'Progress: collaborative review', '50% 50%'],
  ['progress-p6', 'progress', 'dZxQn4VEv2M', 'https://unsplash.com/photos/people-sitting-in-front-of-computer-monitors-dZxQn4VEv2M', 'Progress: active professional return environment', '50% 50%'],
  ['hiw-1', 'how-it-works', 'KtTX92-I7GI', 'https://unsplash.com/photos/rows-of-bookshelves-in-a-library-with-a-person-working-KtTX92-I7GI', 'How it works: research/library', '50% 50%'],
  ['hiw-2', 'how-it-works', 'FfKEDyKdYuQ', 'https://unsplash.com/photos/man-reviewing-charts-at-a-modern-office-desk-FfKEDyKdYuQ', 'How it works: professional document review', '50% 50%'],
  ['hiw-3', 'how-it-works', 'FkUTlyPLhJQ', 'https://unsplash.com/photos/black-and-silver-laptop-computer-FkUTlyPLhJQ', 'How it works: design evidence device', '50% 50%'],
  ['hiw-4', 'how-it-works', 'Z_xE4X6O9js', 'https://unsplash.com/photos/complex-scientific-equipment-and-multiple-computers-in-a-laboratory-setting-Z_xE4X6O9js', 'How it works: advanced lab evidence', '50% 50%'],
  ['auth-login', 'auth', 'AAzoJC02w-I', 'https://unsplash.com/photos/a-person-sitting-at-a-desk-AAzoJC02w-I', 'Login: environmental professional background', '50% 50%'],
  ['auth-signup', 'auth', 'RdEFWm0N84o', 'https://unsplash.com/photos/six-colleagues-collaborating-around-a-conference-table-with-laptops-RdEFWm0N84o', 'Signup: entering a professional world', '50% 50%'],
].map(([file, folder, id, sourceUrl, usage, focalPoint]) => ({ file, folder, id, sourceUrl, usage, focalPoint }));

const widthsFor = (source) => source.file === 'hero-h1' ? [640, 960, 1440, 1920, 2560] : [640, 960, 1440, 1920];

async function fetchOne(source) {
  const api = await fetch(`https://unsplash.com/napi/photos/${source.id}`);
  if (!api.ok) throw new Error(`Metadata request failed for ${source.id}: ${api.status}`);
  const metadata = await api.json();
  const download = await fetch(metadata.links?.download, { redirect: 'follow' });
  if (!download.ok) throw new Error(`Download failed for ${source.id}: ${download.status}`);
  const buffer = Buffer.from(await download.arrayBuffer());
  if (buffer.byteLength < 10_000) throw new Error(`Downloaded file for ${source.id} is unexpectedly small`);
  const imageInfo = await sharp(buffer, { failOn: 'none' }).metadata();
  if (!imageInfo.width || !imageInfo.height) throw new Error(`Could not inspect ${source.id}`);
  const directory = path.join(root, source.folder);
  await fs.mkdir(directory, { recursive: true });
  const master = path.join(directory, `${source.file}-master.jpg`);
  await fs.writeFile(master, buffer);
  const derivatives = [];
  for (const width of widthsFor(source)) {
    if (width > imageInfo.width) continue;
    const base = path.join(directory, `${source.file}-${width}`);
    await sharp(buffer, { failOn: 'none' }).resize({ width, withoutEnlargement: true }).avif({ quality: 60 }).toFile(`${base}.avif`);
    await sharp(buffer, { failOn: 'none' }).resize({ width, withoutEnlargement: true }).webp({ quality: 80, smartSubsample: true }).toFile(`${base}.webp`);
    await sharp(buffer, { failOn: 'none' }).resize({ width, withoutEnlargement: true }).jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(`${base}.jpg`);
    derivatives.push(...['avif', 'webp', 'jpg'].map((format) => `frontend/public/media/personality-v2/${source.folder}/${source.file}-${width}.${format}`));
  }
  console.log(`Downloaded ${source.file}: ${imageInfo.width}x${imageInfo.height}`);
  return {
    ...source,
    creator: metadata.user?.name || 'Unknown Unsplash contributor',
    creatorUsername: metadata.user?.username || null,
    sourcePlatform: 'Unsplash',
    license: 'Unsplash License',
    retrievedAt,
    intrinsicDimensions: { width: imageInfo.width, height: imageInfo.height },
    localMaster: `frontend/public/media/personality-v2/${source.folder}/${source.file}-master.jpg`,
    derivatives,
    cropNotes: { desktop: source.focalPoint, tablet: source.focalPoint, mobile: source.focalPoint },
    nonEndorsementNote,
  };
}

await fs.mkdir(root, { recursive: true });
const manifest = [];
for (const source of sources) manifest.push(await fetchOne(source));
await fs.writeFile(manifestPath, `${JSON.stringify({ version: 2, generatedAt: retrievedAt, assets: manifest }, null, 2)}\n`);
console.log(`Wrote ${manifest.length} provenance entries to ${manifestPath}`);
