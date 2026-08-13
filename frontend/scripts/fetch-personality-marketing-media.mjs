import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicRoot = path.resolve(import.meta.dirname, '..', 'public', 'media', 'personality');
const provenancePath = path.join(publicRoot, 'media-provenance.json');

const prohibitedContexts = [
  'do not imply person pictured used Personality Assessor',
  'do not imply depicted person has a personality trait',
  'do not imply depicted person has a career match or recommendation',
  'do not imply endorsement',
  'do not associate an image with an individual private result',
];

const sources = [
  { id: 'Vvn0OD0IxBM', stem: 'pa-context-pro-01', creator: 'Vitaly Gariev', roles: ['homepage hero/context evidence', 'documents/work surface'], prohibitedContexts },
  { id: 'pLybV75vkP4', stem: 'pa-context-student-01', creator: 'Hasnain Ayaz', roles: ['How It Works context-state media'], prohibitedContexts },
  { id: 'ZmDk8tXQRS0', stem: 'pa-context-engineer-01', creator: 'EnCata PD', roles: ['homepage contrasting technical context'], prohibitedContexts },
  { id: 'vaz_CQSvTMw', stem: 'pa-context-maker-01', creator: 'Stacey Zinoveva', roles: ['Progress context diversity', 'development supporting imagery'], prohibitedContexts },
  { id: 'NASjMHJ9OhI', stem: 'pa-work-student-research', folder: 'work', creator: 'Unsplash contributor', roles: ['student research work world', 'Work Worlds crawler'], prohibitedContexts },
  { id: 'w00FkE6e8zE', stem: 'pa-work-ux-research', folder: 'work', creator: 'Unsplash contributor', roles: ['UX and product work world', 'Work Worlds crawler'], prohibitedContexts },
  { id: 'n7tKiugbzaM', stem: 'pa-work-planning', folder: 'work', creator: 'Unsplash contributor', roles: ['collaborative planning work world', 'Work Worlds crawler'], prohibitedContexts },
  { id: 'qwtCeJ5cLYs', stem: 'pa-career-data-analysis', folder: 'careers', creator: 'Unsplash contributor', roles: ['data-analysis career world', 'Career Worlds gallery'], prohibitedContexts },
  { id: 'lAbYmLWrT9o', stem: 'pa-career-electronics', folder: 'careers', creator: 'Unsplash contributor', roles: ['engineering career world', 'Career Worlds gallery'], prohibitedContexts },
  { id: 'U-Werwf32CM', stem: 'pa-career-workstation', folder: 'careers', creator: 'Unsplash contributor', roles: ['software and operations career world', 'Career Worlds gallery'], prohibitedContexts },
].map((source) => ({ ...source, sourcePage: `https://unsplash.com/photos/${source.id}` }));

const existing = JSON.parse(await fs.readFile(provenancePath, 'utf8'));
const nextEntries = [];

for (const source of sources) {
  const folder = source.folder || 'context';
  const destinationDirectory = path.join(publicRoot, folder);
  await fs.mkdir(destinationDirectory, { recursive: true });
  const destination = path.join(destinationDirectory, `${source.stem}.jpg`);
  const response = await fetch(`${source.sourcePage}/download?force=true`, { redirect: 'follow' });
  if (!response.ok) throw new Error(`Could not download ${source.id}: ${response.status} ${response.statusText}`);
  const type = response.headers.get('content-type') || '';
  if (!type.startsWith('image/')) throw new Error(`Unexpected response for ${source.id}: ${type || 'no content type'}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength < 10_000) throw new Error(`Downloaded file for ${source.id} is unexpectedly small`);
  await fs.writeFile(destination, buffer);
  const metadata = await sharp(buffer, { failOn: 'none' }).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Could not read dimensions for ${source.id}`);
  nextEntries.push({
    id: source.id,
    filename: `frontend/public/media/personality/${folder}/${source.stem}.jpg`,
    creator: source.creator,
    sourcePlatform: 'Unsplash',
    sourcePage: source.sourcePage,
    retrievedAt: new Date().toISOString(),
    width: metadata.width,
    height: metadata.height,
    fileBytes: buffer.byteLength,
    licenseLabel: 'Unsplash License',
    approvedRoles: source.roles,
    prohibitedContexts: source.prohibitedContexts,
  });
  console.log(`Downloaded ${source.stem}: ${metadata.width}×${metadata.height}`);
}

const retained = existing.filter((entry) => !sources.some((source) => source.id === entry.id));
await fs.writeFile(provenancePath, `${JSON.stringify([...retained, ...nextEntries], null, 2)}\n`);
