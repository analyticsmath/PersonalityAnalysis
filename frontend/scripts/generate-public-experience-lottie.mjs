import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';
import { promisify } from 'node:util';

const gzip = promisify(zlib.gzip);
const outputDir = path.resolve(import.meta.dirname, '..', 'public', 'motion', 'public-experience');

// 120-frame vector animation: source -> interpreted -> compared -> retained
const lottieJson = {
  v: '5.9.0',
  fr: 60,
  ip: 0,
  op: 120,
  w: 600,
  h: 600,
  nm: 'SourceStateCausalObject',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4, // Shape layer
      nm: 'SourceContour',
      sr: 1,
      ks: {
        o: { k: 100 },
        r: {
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
            { t: 120, s: [360] },
          ],
        },
        p: { k: [300, 300, 0] },
        a: { k: [0, 0, 0] },
        s: {
          k: [
            { i: { x: [0.6, 0.6, 0.6], y: [1, 1, 1] }, o: { x: [0.4, 0.4, 0.4], y: [0, 0, 0] }, t: 0, s: [100, 100, 100] },
            { i: { x: [0.6, 0.6, 0.6], y: [1, 1, 1] }, o: { x: [0.4, 0.4, 0.4], y: [0, 0, 0] }, t: 40, s: [125, 125, 100] },
            { i: { x: [0.6, 0.6, 0.6], y: [1, 1, 1] }, o: { x: [0.4, 0.4, 0.4], y: [0, 0, 0] }, t: 80, s: [95, 95, 100] },
            { t: 120, s: [100, 100, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: 'gr',
          nm: 'Group 1',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { k: [140, 140] },
              p: { k: [0, 0] },
              r: {
                k: [
                  { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 0, s: [12] },
                  { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 40, s: [70] },
                  { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 80, s: [24] },
                  { t: 120, s: [12] },
                ],
              },
              nm: 'Rectangle Path 1',
            },
            {
              ty: 'st',
              c: {
                k: [
                  { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 0, s: [0.97, 0.97, 0.97, 1] },
                  { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 40, s: [0.86, 0.88, 0.89, 1] },
                  { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 80, s: [0.97, 0.97, 0.97, 1] },
                  { t: 120, s: [0.97, 0.97, 0.97, 1] },
                ],
              },
              o: { k: 100 },
              w: { k: 3 },
              lc: 2,
              lj: 2,
              nm: 'Stroke 1',
            },
            {
              ty: 'fl',
              c: { k: [0.07, 0.08, 0.09, 0.15] },
              o: { k: 100 },
              r: 1,
              nm: 'Fill 1',
            },
            {
              ty: 'tr',
              p: { k: [0, 0] },
              a: { k: [0, 0] },
              s: { k: [100, 100] },
              r: { k: 0 },
              o: { k: 100 },
              sk: { k: 0 },
              sa: { k: 0 },
              nm: 'Transform',
            },
          ],
        },
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4, // Central Node
      nm: 'CentralCore',
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [300, 300, 0] },
        a: { k: [0, 0, 0] },
        s: {
          k: [
            { i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] }, o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] }, t: 0, s: [80, 80, 100] },
            { i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] }, o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] }, t: 60, s: [140, 140, 100] },
            { t: 120, s: [80, 80, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: 'el',
          d: 1,
          s: { k: [32, 32] },
          p: { k: [0, 0] },
          nm: 'Ellipse Path 1',
        },
        {
          ty: 'fl',
          c: { k: [0.97, 0.97, 0.97, 0.9] },
          o: { k: 100 },
          r: 1,
          nm: 'Fill 1',
        },
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0,
    },
  ],
};

function createZipArchive(files) {
  const fileRecords = [];
  let offset = 0;

  for (const file of files) {
    const filenameBuffer = Buffer.from(file.name, 'utf8');
    const contentBuffer = Buffer.from(file.content);
    const crc = crc32(contentBuffer);
    const compressedSize = contentBuffer.length;
    const uncompressedSize = contentBuffer.length;

    const localHeader = Buffer.alloc(30 + filenameBuffer.length);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(0, 8); // No compression (stored)
    localHeader.writeUInt16LE(0, 10);
    localHeader.writeUInt16LE(0, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressedSize, 18);
    localHeader.writeUInt32LE(uncompressedSize, 22);
    localHeader.writeUInt16LE(filenameBuffer.length, 26);
    localHeader.writeUInt16LE(0, 28);
    filenameBuffer.copy(localHeader, 30);

    fileRecords.push({
      name: file.name,
      filenameBuffer,
      localHeader,
      contentBuffer,
      crc,
      compressedSize,
      uncompressedSize,
      offset,
    });

    offset += localHeader.length + contentBuffer.length;
  }

  const centralDirHeaders = [];
  let centralDirSize = 0;

  for (const record of fileRecords) {
    const cdHeader = Buffer.alloc(46 + record.filenameBuffer.length);
    cdHeader.writeUInt32LE(0x02014b50, 0);
    cdHeader.writeUInt16LE(20, 4);
    cdHeader.writeUInt16LE(20, 6);
    cdHeader.writeUInt16LE(0, 8);
    cdHeader.writeUInt16LE(0, 10);
    cdHeader.writeUInt16LE(0, 12);
    cdHeader.writeUInt16LE(0, 14);
    cdHeader.writeUInt32LE(record.crc, 16);
    cdHeader.writeUInt32LE(record.compressedSize, 20);
    cdHeader.writeUInt32LE(record.uncompressedSize, 24);
    cdHeader.writeUInt16LE(record.filenameBuffer.length, 28);
    cdHeader.writeUInt16LE(0, 30);
    cdHeader.writeUInt16LE(0, 32);
    cdHeader.writeUInt16LE(0, 34);
    cdHeader.writeUInt16LE(0, 36);
    cdHeader.writeUInt32LE(0, 38);
    cdHeader.writeUInt32LE(record.offset, 42);
    record.filenameBuffer.copy(cdHeader, 46);

    centralDirHeaders.push(cdHeader);
    centralDirSize += cdHeader.length;
  }

  const centralDirOffset = offset;

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(fileRecords.length, 8);
  eocd.writeUInt16LE(fileRecords.length, 10);
  eocd.writeUInt32LE(centralDirSize, 12);
  eocd.writeUInt32LE(centralDirOffset, 16);
  eocd.writeUInt16LE(0, 20);

  const parts = [];
  for (const record of fileRecords) {
    parts.push(record.localHeader);
    parts.push(record.contentBuffer);
  }
  for (const cd of centralDirHeaders) {
    parts.push(cd);
  }
  parts.push(eocd);

  return Buffer.concat(parts);
}

function crc32(buf) {
  let crc = ~0;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ ~0) >>> 0;
}

const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[i] = c;
}

async function generateLottie() {
  await fs.mkdir(outputDir, { recursive: true });

  const jsonString = JSON.stringify(lottieJson, null, 2);
  const jsonPath = path.join(outputDir, 'source-state.json');
  await fs.writeFile(jsonPath, jsonString);

  const manifest = {
    version: '1.0.0',
    generator: 'Personality Assessor Media Pipeline',
    animations: [
      {
        id: 'source-state',
        speed: 1,
        loop: true,
        autoplay: false,
        themeColor: '#121416',
      },
    ],
  };

  const lottieArchive = createZipArchive([
    { name: 'manifest.json', content: JSON.stringify(manifest) },
    { name: 'animations/source-state.json', content: jsonString },
  ]);

  const lottiePath = path.join(outputDir, 'source-state.lottie');
  await fs.writeFile(lottiePath, lottieArchive);
  console.log(`Generated ${jsonPath} and ${lottiePath}`);
}

generateLottie().catch((err) => {
  console.error('dotLottie generation error:', err);
  process.exit(1);
});
