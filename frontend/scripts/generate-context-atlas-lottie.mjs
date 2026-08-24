import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';

const outputDir = path.resolve(import.meta.dirname, '..', 'public', 'motion');

// Palette tokens in RGB [0..1]
const cField = [0.086, 0.239, 0.208, 1];   // #163D35
const cPaper = [0.937, 0.961, 0.949, 1];   // #EFF5F2
const cSignal = [0.804, 0.847, 0.416, 1];  // #CDD86A
const cTide = [0.310, 0.427, 0.471, 1];    // #4F6D78
const cLichen = [0.584, 0.659, 0.498, 1];  // #95A87F

/**
 * Builds an authored Bodymovin/Lottie JSON for 180 frames at 60fps (1200x1200)
 * Visualizes SOURCE -> EXTRACT -> BRANCH -> WEIGHT -> STORE
 */
function buildContextAtlasLottie() {
  return {
    v: '5.7.4',
    fr: 60,
    ip: 0,
    op: 180,
    w: 1200,
    h: 1200,
    nm: 'context-atlas-transform',
    ddd: 0,
    assets: [],
    layers: [
      // Layer 1: Stored Record Final Stamp (Frames 145-180)
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Store Stamp Frame',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [0] },
              { t: 145, s: [0], e: [100] },
              { t: 165, s: [100], e: [100] },
            ],
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [600, 600, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 145, s: [70, 70, 100], e: [100, 100, 100] },
              { t: 165, s: [100, 100, 100], e: [100, 100, 100] },
            ],
          },
        },
        shapes: [
          {
            ty: 'gr',
            nm: 'Stamp Rect',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [340, 140] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 6 },
                nm: 'Rect Path',
              },
              {
                ty: 'st',
                c: { a: 0, k: cSignal },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 3 },
                lc: 2,
                lj: 2,
                nm: 'Stroke Signal',
              },
              {
                ty: 'fl',
                c: { a: 0, k: cField },
                o: { a: 0, k: 90 },
                nm: 'Fill Field',
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                nm: 'Transform',
              },
            ],
          },
        ],
      },

      // Layer 2: Branch 4 - Career Signals (Bottom Right)
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: 'Branch Career Signals Node',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [0] },
              { t: 65, s: [0], e: [100] },
              { t: 140, s: [100], e: [0] },
              { t: 155, s: [0], e: [0] },
            ],
          },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 65, s: [600, 600, 0], e: [880, 780, 0] },
              { t: 108, s: [880, 780, 0], e: [880, 780, 0] },
              { t: 140, s: [880, 780, 0], e: [600, 600, 0] },
            ],
          },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 65, s: [20, 20, 100], e: [100, 100, 100] },
              { t: 110, s: [100, 100, 100], e: [120, 120, 100] },
              { t: 140, s: [120, 120, 100], e: [10, 10, 100] },
            ],
          },
        },
        shapes: [
          {
            ty: 'gr',
            nm: 'Node Circle',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [56, 56] },
                nm: 'Circle Path',
              },
              {
                ty: 'fl',
                c: { a: 0, k: cSignal },
                o: { a: 0, k: 90 },
                nm: 'Fill',
              },
              {
                ty: 'st',
                c: { a: 0, k: cPaper },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 2 },
                nm: 'Stroke',
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                nm: 'Transform',
              },
            ],
          },
        ],
      },

      // Layer 3: Branch 3 - Work Values (Bottom Left)
      {
        ddd: 0,
        ind: 3,
        ty: 4,
        nm: 'Branch Work Values Node',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [0] },
              { t: 65, s: [0], e: [100] },
              { t: 140, s: [100], e: [0] },
              { t: 155, s: [0], e: [0] },
            ],
          },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 65, s: [600, 600, 0], e: [320, 780, 0] },
              { t: 108, s: [320, 780, 0], e: [320, 780, 0] },
              { t: 140, s: [320, 780, 0], e: [600, 600, 0] },
            ],
          },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 65, s: [20, 20, 100], e: [100, 100, 100] },
              { t: 110, s: [100, 100, 100], e: [115, 115, 100] },
              { t: 140, s: [115, 115, 100], e: [10, 10, 100] },
            ],
          },
        },
        shapes: [
          {
            ty: 'gr',
            nm: 'Node Circle',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [52, 52] },
                nm: 'Circle Path',
              },
              {
                ty: 'fl',
                c: { a: 0, k: cLichen },
                o: { a: 0, k: 90 },
                nm: 'Fill',
              },
              {
                ty: 'st',
                c: { a: 0, k: cPaper },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 2 },
                nm: 'Stroke',
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                nm: 'Transform',
              },
            ],
          },
        ],
      },

      // Layer 4: Branch 2 - RIASEC (Top Right)
      {
        ddd: 0,
        ind: 4,
        ty: 4,
        nm: 'Branch RIASEC Node',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [0] },
              { t: 60, s: [0], e: [100] },
              { t: 140, s: [100], e: [0] },
              { t: 155, s: [0], e: [0] },
            ],
          },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 60, s: [600, 600, 0], e: [880, 420, 0] },
              { t: 108, s: [880, 420, 0], e: [880, 420, 0] },
              { t: 140, s: [880, 420, 0], e: [600, 600, 0] },
            ],
          },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 60, s: [20, 20, 100], e: [100, 100, 100] },
              { t: 110, s: [100, 100, 100], e: [130, 130, 100] },
              { t: 140, s: [130, 130, 100], e: [10, 10, 100] },
            ],
          },
        },
        shapes: [
          {
            ty: 'gr',
            nm: 'Node Circle',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [60, 60] },
                nm: 'Circle Path',
              },
              {
                ty: 'fl',
                c: { a: 0, k: cTide },
                o: { a: 0, k: 90 },
                nm: 'Fill',
              },
              {
                ty: 'st',
                c: { a: 0, k: cSignal },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 2 },
                nm: 'Stroke',
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                nm: 'Transform',
              },
            ],
          },
        ],
      },

      // Layer 5: Branch 1 - Big Five (Top Left)
      {
        ddd: 0,
        ind: 5,
        ty: 4,
        nm: 'Branch Big Five Node',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [0] },
              { t: 60, s: [0], e: [100] },
              { t: 140, s: [100], e: [0] },
              { t: 155, s: [0], e: [0] },
            ],
          },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 60, s: [600, 600, 0], e: [320, 420, 0] },
              { t: 108, s: [320, 420, 0], e: [320, 420, 0] },
              { t: 140, s: [320, 420, 0], e: [600, 600, 0] },
            ],
          },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 60, s: [20, 20, 100], e: [100, 100, 100] },
              { t: 110, s: [100, 100, 100], e: [125, 125, 100] },
              { t: 140, s: [125, 125, 100], e: [10, 10, 100] },
            ],
          },
        },
        shapes: [
          {
            ty: 'gr',
            nm: 'Node Circle',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [58, 58] },
                nm: 'Circle Path',
              },
              {
                ty: 'fl',
                c: { a: 0, k: cField },
                o: { a: 0, k: 90 },
                nm: 'Fill',
              },
              {
                ty: 'st',
                c: { a: 0, k: cSignal },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 2 },
                nm: 'Stroke',
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                nm: 'Transform',
              },
            ],
          },
        ],
      },

      // Layer 6: Central Source Line & Transforming Fragments (Frames 0-180)
      {
        ddd: 0,
        ind: 6,
        ty: 4,
        nm: 'Source Fragment Main Core',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [600, 600, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        shapes: [
          // Central Solid Bar
          {
            ty: 'gr',
            nm: 'Primary Clause Bar',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: {
                  a: 1,
                  k: [
                    { t: 0, s: [420, 14], e: [420, 14] },
                    { t: 28, s: [420, 14], e: [260, 14] },
                    { t: 62, s: [260, 14], e: [120, 12] },
                    { t: 145, s: [120, 12], e: [240, 8] },
                    { t: 180, s: [240, 8], e: [240, 8] },
                  ],
                },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 2 },
                nm: 'Rect',
              },
              {
                ty: 'fl',
                c: { a: 0, k: cSignal },
                o: { a: 0, k: 100 },
                nm: 'Fill',
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                nm: 'Transform',
              },
            ],
          },
        ],
      },

      // Layer 7: Background Coordinate Radial Ring (Restrained)
      {
        ddd: 0,
        ind: 7,
        ty: 4,
        nm: 'Coordinate Ring',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [15], e: [15] },
              { t: 60, s: [15], e: [40] },
              { t: 120, s: [40], e: [20] },
              { t: 180, s: [20], e: [20] },
            ],
          },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [90] },
              { t: 180, s: [90], e: [90] },
            ],
          },
          p: { a: 0, k: [600, 600, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        shapes: [
          {
            ty: 'gr',
            nm: 'Axis Ring',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [700, 700] },
                nm: 'Circle',
              },
              {
                ty: 'st',
                c: { a: 0, k: cPaper },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 1.5 },
                d: [{ n: 'd', v: { a: 0, k: 8 } }, { n: 'g', v: { a: 0, k: 8 } }],
                nm: 'Dashed Stroke',
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                nm: 'Transform',
              },
            ],
          },
        ],
      },
    ],
  };
}

/**
 * Creates standard Zip archive buffer for .lottie container format
 */
function createZipArchive(files) {
  const fileRecords = [];
  let offset = 0;

  for (const { name, data } of files) {
    const nameBuffer = Buffer.from(name, 'utf8');
    const crc = computeCrc32(data);
    const uncompressedSize = data.length;
    const compressedData = zlib.deflateRawSync(data);
    const compressedSize = compressedData.length;

    // Local file header (30 bytes + name + data)
    const localHeader = Buffer.alloc(30 + nameBuffer.length);
    localHeader.writeUInt32LE(0x04034b50, 0); // signature
    localHeader.writeUInt16LE(20, 4);          // version needed
    localHeader.writeUInt16LE(0, 6);           // flags
    localHeader.writeUInt16LE(8, 8);           // compression method (deflate)
    localHeader.writeUInt16LE(0, 10);          // time
    localHeader.writeUInt16LE(0, 12);          // date
    localHeader.writeUInt32LE(crc, 14);        // crc32
    localHeader.writeUInt32LE(compressedSize, 18);
    localHeader.writeUInt32LE(uncompressedSize, 22);
    localHeader.writeUInt16LE(nameBuffer.length, 26);
    localHeader.writeUInt16LE(0, 28);          // extra length
    nameBuffer.copy(localHeader, 30);

    const localRecord = Buffer.concat([localHeader, compressedData]);

    fileRecords.push({
      nameBuffer,
      crc,
      compressedSize,
      uncompressedSize,
      offset,
      localRecord,
    });

    offset += localRecord.length;
  }

  // Central directory records
  const centralDirHeaders = [];
  let centralDirSize = 0;

  for (const rec of fileRecords) {
    const cdHeader = Buffer.alloc(46 + rec.nameBuffer.length);
    cdHeader.writeUInt32LE(0x02014b50, 0); // signature
    cdHeader.writeUInt16LE(20, 4);         // version made by
    cdHeader.writeUInt16LE(20, 6);         // version needed
    cdHeader.writeUInt16LE(0, 8);          // flags
    cdHeader.writeUInt16LE(8, 10);         // compression method (deflate)
    cdHeader.writeUInt16LE(0, 12);         // time
    cdHeader.writeUInt16LE(0, 14);         // date
    cdHeader.writeUInt32LE(rec.crc, 16);
    cdHeader.writeUInt32LE(rec.compressedSize, 20);
    cdHeader.writeUInt32LE(rec.uncompressedSize, 24);
    cdHeader.writeUInt16LE(rec.nameBuffer.length, 28);
    cdHeader.writeUInt16LE(0, 30);         // extra length
    cdHeader.writeUInt16LE(0, 32);         // comment length
    cdHeader.writeUInt16LE(0, 34);         // disk start
    cdHeader.writeUInt16LE(0, 36);         // internal attr
    cdHeader.writeUInt32LE(0, 38);         // external attr
    cdHeader.writeUInt32LE(rec.offset, 42);// relative offset of local header
    rec.nameBuffer.copy(cdHeader, 46);

    centralDirHeaders.push(cdHeader);
    centralDirSize += cdHeader.length;
  }

  const centralDir = Buffer.concat(centralDirHeaders);
  const cdOffset = offset;

  // End of central directory record (22 bytes)
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // signature
  eocd.writeUInt16LE(0, 4);          // disk number
  eocd.writeUInt16LE(0, 6);          // start disk
  eocd.writeUInt16LE(fileRecords.length, 8); // records on disk
  eocd.writeUInt16LE(fileRecords.length, 10); // total records
  eocd.writeUInt32LE(centralDirSize, 12);
  eocd.writeUInt32LE(cdOffset, 16);
  eocd.writeUInt16LE(0, 20);         // comment length

  const body = Buffer.concat(fileRecords.map((r) => r.localRecord));
  return Buffer.concat([body, centralDir, eocd]);
}

function computeCrc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

const crcTable = (() => {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c >>> 0;
  }
  return table;
})();

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const lottieData = buildContextAtlasLottie();
  const jsonString = JSON.stringify(lottieData, null, 2);
  const jsonBuffer = Buffer.from(jsonString, 'utf8');

  // Write standalone JSON for testing / direct loading
  const jsonPath = path.join(outputDir, 'context-atlas-transform.json');
  await fs.writeFile(jsonPath, jsonBuffer);

  // Build .lottie container with manifest.json
  const manifest = {
    version: '1.0.0',
    generator: 'ContextAtlasAuthoredGenerator',
    author: 'Valtum Studio',
    animations: [
      {
        id: 'context-atlas-transform',
        speed: 1,
        themeColor: '#163D35',
        loop: false,
        autoplay: false,
      },
    ],
  };

  const manifestBuffer = Buffer.from(JSON.stringify(manifest, null, 2), 'utf8');

  const zipBuffer = createZipArchive([
    { name: 'manifest.json', data: manifestBuffer },
    { name: 'animations/context-atlas-transform.json', data: jsonBuffer },
  ]);

  const lottiePath = path.join(outputDir, 'context-atlas-transform.lottie');
  await fs.writeFile(lottiePath, zipBuffer);

  console.log(`Authored .lottie and .json generated at:\n  ${lottiePath}\n  ${jsonPath}`);
}

main().catch(console.error);
