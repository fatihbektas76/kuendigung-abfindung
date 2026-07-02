/**
 * Foto → „Scan"-PDF (client-seitig).
 *
 * Nimmt ein Handy-Foto und liefert ein A4-PDF zurück, das kleiner ist,
 * gleichmäßig hell/kontrastreich (Weißpunkt-Stretch), die richtige
 * EXIF-Rotation hat — und optional perspektivisch entzerrt ist, wenn
 * der Aufrufer vier Ecken übergibt (siehe DeskewModal).
 *
 * Kein Server, keine WASM-Abhängigkeit — nur Canvas + jsPDF +
 * die eigene Homographie-Implementierung in lib/perspective-transform.ts.
 */

import type { Quad } from './perspective-transform';
import { warpPerspective, estimateDstSize } from './perspective-transform';

export interface ScanOptions {
  /** Max. Langkante nach Skalierung (px). Default 2000. */
  maxDimension?: number;
  /** JPEG-Qualität (0..1). Default 0.82. */
  jpegQuality?: number;
  /**
   * Optional: Perspektivkorrektur mit den vier Blatt-Ecken (im Koordinaten-
   * system des Originalbilds, in Pixeln). Wird üblicherweise vom DeskewModal
   * gesetzt. Ohne diesen Parameter läuft nur Skalierung + Enhance.
   */
  warpQuad?: Quad;
}

export interface ImageLoadResult {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

/**
 * Lädt ein Bild in ein Canvas — respektiert EXIF-Rotation. Nützlich für
 * das DeskewModal, damit die Ecken im rotierten Koordinatensystem
 * definiert werden.
 */
export async function loadImageIntoCanvas(file: File): Promise<ImageLoadResult> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close?.();
    throw new Error('Canvas 2D-Kontext nicht verfügbar');
  }
  ctx.drawImage(bitmap, 0, 0);
  const w = bitmap.width;
  const h = bitmap.height;
  bitmap.close?.();
  return { canvas, width: w, height: h };
}

const MIME_IMAGE_PREFIX = 'image/';

export function isProcessableImage(file: File): boolean {
  if (file.type && file.type.startsWith(MIME_IMAGE_PREFIX)) return true;
  // Manche Browser liefern für HEIC/HEIF einen leeren type.
  return /\.(jpe?g|png|heic|heif|webp)$/i.test(file.name);
}

async function loadBitmap(file: File): Promise<ImageBitmap> {
  // imageOrientation: 'from-image' respektiert EXIF-Rotation automatisch —
  // spart uns die manuelle Rotationsmatrix.
  return createImageBitmap(file, { imageOrientation: 'from-image' });
}

function computeTargetSize(
  srcW: number,
  srcH: number,
  maxDim: number,
): { w: number; h: number } {
  const longest = Math.max(srcW, srcH);
  if (longest <= maxDim) return { w: srcW, h: srcH };
  const scale = maxDim / longest;
  return { w: Math.round(srcW * scale), h: Math.round(srcH * scale) };
}

/**
 * „Scan-Look": Weiß-/Schwarzpunkt auf die 2./98. Perzentile der
 * Helligkeitsverteilung stretchen. Danach leichter Gamma-Boost.
 * Kein Graustufen-Zwang — Farb-Stempel und Signaturen bleiben sichtbar.
 */
function applyScanEnhancement(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
): void {
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  const histogram = new Uint32Array(256);
  for (let i = 0; i < data.length; i += 4) {
    const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) | 0;
    histogram[lum]++;
  }

  const total = data.length / 4;
  const lowClip = total * 0.02;
  const highClip = total * 0.98;

  let cum = 0;
  let black = 0;
  for (let i = 0; i < 256; i++) {
    cum += histogram[i];
    if (cum >= lowClip) {
      black = i;
      break;
    }
  }
  cum = 0;
  let white = 255;
  for (let i = 0; i < 256; i++) {
    cum += histogram[i];
    if (cum >= highClip) {
      white = i;
      break;
    }
  }
  // Sehr flaches Bild? Kein Stretch, sonst wird Rauschen amplifiziert.
  if (white - black < 50) {
    black = 0;
    white = 255;
  }

  const range = white - black || 1;
  const gamma = 0.9;
  const lut = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    const stretched = ((i - black) / range) * 255;
    const clamped = Math.max(0, Math.min(255, stretched));
    lut[i] = Math.max(0, Math.min(255, Math.pow(clamped / 255, gamma) * 255)) | 0;
  }

  for (let i = 0; i < data.length; i += 4) {
    data[i] = lut[data[i]];
    data[i + 1] = lut[data[i + 1]];
    data[i + 2] = lut[data[i + 2]];
  }

  ctx.putImageData(imageData, 0, 0);
}

function canvasToJpegBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('canvas.toBlob failed'))),
      'image/jpeg',
      quality,
    );
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error('FileReader failed'));
    reader.readAsDataURL(blob);
  });
}

export interface ScanResult {
  /** Fertiges einseitiges A4-PDF. */
  pdf: File;
  /** JPEG als data-URL (für späteres Multi-Page-Merge, siehe pdf-combine). */
  jpegDataUrl: string;
  /** Seitenverhältnis w/h für Portrait/Landscape-Entscheidung. */
  aspect: number;
}

/**
 * Wandelt ein Foto in ein A4-PDF um. Wirft, wenn der Browser die Datei
 * nicht als Bild dekodieren kann (z. B. HEIC auf Non-Safari). Der Aufrufer
 * sollte das abfangen und die Originaldatei behalten.
 */
export async function photoToScanPdf(file: File, opts: ScanOptions = {}): Promise<ScanResult> {
  const maxDim = opts.maxDimension ?? 2000;
  const quality = opts.jpegQuality ?? 0.82;

  let canvas: HTMLCanvasElement;
  let w: number;
  let h: number;

  if (opts.warpQuad) {
    // Mit Perspektivkorrektur: erst auf voller Auflösung entzerren, dann
    // ggf. downsizen. Die Zielgröße ergibt sich aus dem Quad selbst.
    const src = await loadImageIntoCanvas(file);
    const size = estimateDstSize(opts.warpQuad, maxDim);
    canvas = warpPerspective(src.canvas, opts.warpQuad, size.w, size.h);
    w = size.w;
    h = size.h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Warp-Canvas ohne 2D-Kontext');
    applyScanEnhancement(ctx, w, h);
  } else {
    const bitmap = await loadBitmap(file);
    const target = computeTargetSize(bitmap.width, bitmap.height, maxDim);
    w = target.w;
    h = target.h;
    canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close?.();
      throw new Error('Canvas 2D-Kontext nicht verfügbar');
    }
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    applyScanEnhancement(ctx, w, h);
  }

  const jpegBlob = await canvasToJpegBlob(canvas, quality);
  const jpegDataUrl = await blobToDataUrl(jpegBlob);

  const aspect = w / h;
  const landscape = aspect > 1;
  const jsPDFModule = await import('jspdf');
  const JsPDF = jsPDFModule.jsPDF;
  const pdf = new JsPDF({
    orientation: landscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const A4_SHORT = 210;
  const A4_LONG = 297;
  const pageW = landscape ? A4_LONG : A4_SHORT;
  const pageH = landscape ? A4_SHORT : A4_LONG;
  const margin = 8;
  const maxW = pageW - margin * 2;
  const maxH = pageH - margin * 2;

  let drawW = maxW;
  let drawH = drawW / aspect;
  if (drawH > maxH) {
    drawH = maxH;
    drawW = drawH * aspect;
  }
  const offsetX = (pageW - drawW) / 2;
  const offsetY = (pageH - drawH) / 2;

  pdf.addImage(jpegDataUrl, 'JPEG', offsetX, offsetY, drawW, drawH, undefined, 'FAST');

  const pdfBlob = pdf.output('blob');
  const newName = file.name.replace(/\.[^.]+$/, '') + '.pdf';
  const pdfFile = new File([pdfBlob], newName, { type: 'application/pdf' });
  return { pdf: pdfFile, jpegDataUrl, aspect };
}
