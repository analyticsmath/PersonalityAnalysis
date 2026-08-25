/**
 * Personality Assessor - Pixel Reconstruction Engine
 * Dual-backend pixel dissolve: WebGL shader or Canvas2D content-based block dissolve.
 * Samples actual source and destination images with deterministic block thresholding.
 */

import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';

export class Canvas2DPixelReconstruction {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement ? canvasElement.getContext('2d', { willReadFrequently: true }) : null;
    this.sourceImg = null;
    this.destImg = null;
    this.sourceLoaded = false;
    this.destLoaded = false;
  }

  loadImages(sourceKey, destKey) {
    const srcData = MEDIA_MANIFEST_PX[sourceKey];
    const dstData = MEDIA_MANIFEST_PX[destKey];

    const srcUrl = srcData?.src || '/images/evidence/evidence-home-primary.jpg';
    const dstUrl = dstData?.src || '/images/evidence/evidence-career-precision.jpg';

    this.sourceImg = new Image();
    this.sourceImg.crossOrigin = 'anonymous';
    this.sourceImg.src = srcUrl;
    this.sourceImg.onload = () => {
      this.sourceLoaded = true;
    };

    this.destImg = new Image();
    this.destImg.crossOrigin = 'anonymous';
    this.destImg.src = dstUrl;
    this.destImg.onload = () => {
      this.destLoaded = true;
    };
  }

  render(p) {
    if (!this.canvas || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    if (p <= 0.001 || p >= 0.999) {
      ctx.clearRect(0, 0, w, h);
      return;
    }

    // Dynamic block size peaking at p = 0.50
    const factor = Math.sin(p * Math.PI);
    const blockSize = Math.max(8, Math.floor(factor * 32));

    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = false;

    // Draw base images onto low-res grid
    const cols = Math.ceil(w / blockSize);
    const rows = Math.ceil(h / blockSize);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * blockSize;
        const y = r * blockSize;

        // Deterministic pseudo-random seed per block
        const seed = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
        const rand = seed - Math.floor(seed);

        const useDest = rand < p;
        const img = useDest ? this.destImg : this.sourceImg;
        const isLoaded = useDest ? this.destLoaded : this.sourceLoaded;

        if (img && isLoaded) {
          ctx.drawImage(img, (c / cols) * img.width, (r / rows) * img.height, img.width / cols, img.height / rows, x, y, blockSize, blockSize);
        } else {
          ctx.fillStyle = useDest ? '#1a1e20' : '#141618';
          ctx.fillRect(x, y, blockSize, blockSize);
        }
      }
    }
  }

  clear() {
    if (this.canvas && this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

export default Canvas2DPixelReconstruction;
