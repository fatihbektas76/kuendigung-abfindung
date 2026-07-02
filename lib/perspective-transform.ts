/**
 * Perspektiv-Entzerrung (Homographie) in reinem JavaScript.
 *
 * Rechnet ein von schräg fotografiertes Dokument in ein sauberes
 * Rechteck um — der Trick, den Scanner-Apps nach dem Foto anwenden.
 *
 * Kein OpenCV, keine WASM-Abhängigkeit. Für die typische Intake-Größe
 * (2000 px lange Kante) läuft der Warp in unter einer Sekunde.
 *
 * Der Aufrufer liefert die vier Quell-Ecken (im Bildkoordinatensystem);
 * die Ziel-Ecken sind implizit das Rechteck (0,0)–(dstW,dstH).
 */

export interface Point {
  x: number;
  y: number;
}

/** Ecken im Uhrzeigersinn: oben-links, oben-rechts, unten-rechts, unten-links. */
export interface Quad {
  tl: Point;
  tr: Point;
  br: Point;
  bl: Point;
}

/**
 * Gauss-Elimination mit Pivot-Suche für dichte n×n-Systeme.
 * Hier n=8 (für die Homographie), also klein genug für O(n³) ohne Optimierung.
 */
function solveLinear(matrix: number[][], rhs: number[]): number[] {
  const n = rhs.length;
  // Erweiterte Matrix [A | b]
  const a = matrix.map((row, i) => [...row, rhs[i]]);

  for (let i = 0; i < n; i++) {
    // Pivot-Zeile finden (größtes |Element| in Spalte i ab Zeile i)
    let maxRow = i;
    let maxVal = Math.abs(a[i][i]);
    for (let k = i + 1; k < n; k++) {
      const v = Math.abs(a[k][i]);
      if (v > maxVal) {
        maxVal = v;
        maxRow = k;
      }
    }
    if (maxVal < 1e-12) {
      throw new Error('Homographie: singuläre Matrix (Ecken kollinear?)');
    }
    if (maxRow !== i) {
      const tmp = a[i];
      a[i] = a[maxRow];
      a[maxRow] = tmp;
    }

    // Eliminieren
    for (let k = i + 1; k < n; k++) {
      const factor = a[k][i] / a[i][i];
      for (let j = i; j <= n; j++) {
        a[k][j] -= factor * a[i][j];
      }
    }
  }

  // Rückwärts-Substitution
  const x = new Array<number>(n);
  for (let i = n - 1; i >= 0; i--) {
    let sum = a[i][n];
    for (let j = i + 1; j < n; j++) {
      sum -= a[i][j] * x[j];
    }
    x[i] = sum / a[i][i];
  }
  return x;
}

/**
 * Berechnet die 3×3-Homographie H, die vier Quell-Ecken auf das Rechteck
 * (0,0)–(dstW,dstH) abbildet. Rückgabe als flaches 9-Element-Array
 * (row-major), h33 auf 1 normalisiert.
 */
export function computeHomography(src: Quad, dstW: number, dstH: number): number[] {
  const dst: Quad = {
    tl: { x: 0, y: 0 },
    tr: { x: dstW, y: 0 },
    br: { x: dstW, y: dstH },
    bl: { x: 0, y: dstH },
  };

  const pairs: Array<[Point, Point]> = [
    [src.tl, dst.tl],
    [src.tr, dst.tr],
    [src.br, dst.br],
    [src.bl, dst.bl],
  ];

  const A: number[][] = [];
  const b: number[] = [];
  for (const [s, d] of pairs) {
    A.push([s.x, s.y, 1, 0, 0, 0, -d.x * s.x, -d.x * s.y]);
    b.push(d.x);
    A.push([0, 0, 0, s.x, s.y, 1, -d.y * s.x, -d.y * s.y]);
    b.push(d.y);
  }

  const h = solveLinear(A, b);
  return [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];
}

/** Invertiert eine 3×3-Matrix (flach, row-major). */
export function invert3x3(m: number[]): number[] {
  const [a, b, c, d, e, f, g, h, i] = m;
  const A = e * i - f * h;
  const B = -(d * i - f * g);
  const C = d * h - e * g;
  const D = -(b * i - c * h);
  const E = a * i - c * g;
  const F = -(a * h - b * g);
  const G = b * f - c * e;
  const H = -(a * f - c * d);
  const I = a * e - b * d;
  const det = a * A + b * B + c * C;
  if (Math.abs(det) < 1e-12) {
    throw new Error('Homographie: nicht invertierbar');
  }
  const s = 1 / det;
  return [A * s, D * s, G * s, B * s, E * s, H * s, C * s, F * s, I * s];
}

/**
 * Wendet die Perspektiv-Entzerrung auf ein Bild an.
 *
 * Ansatz: inverse mapping. Für jedes Zielpixel (x,y) wird über H⁻¹ das
 * korrespondierende Quellpixel gesucht und via bilinearer Interpolation
 * ausgelesen — verhindert Löcher im Zielbild, die bei forward mapping
 * entstehen würden.
 */
export function warpPerspective(
  srcCanvas: HTMLCanvasElement,
  srcQuad: Quad,
  dstW: number,
  dstH: number,
): HTMLCanvasElement {
  const H = computeHomography(srcQuad, dstW, dstH);
  const Hinv = invert3x3(H);

  const srcCtx = srcCanvas.getContext('2d');
  if (!srcCtx) throw new Error('Quell-Canvas ohne 2D-Kontext');
  const srcW = srcCanvas.width;
  const srcH = srcCanvas.height;
  const srcData = srcCtx.getImageData(0, 0, srcW, srcH).data;

  const dstCanvas = document.createElement('canvas');
  dstCanvas.width = dstW;
  dstCanvas.height = dstH;
  const dstCtx = dstCanvas.getContext('2d');
  if (!dstCtx) throw new Error('Ziel-Canvas ohne 2D-Kontext');
  const dstImg = dstCtx.createImageData(dstW, dstH);
  const dstData = dstImg.data;

  const [h0, h1, h2, h3, h4, h5, h6, h7, h8] = Hinv;

  for (let y = 0; y < dstH; y++) {
    for (let x = 0; x < dstW; x++) {
      const denom = h6 * x + h7 * y + h8;
      if (Math.abs(denom) < 1e-9) continue;
      const sx = (h0 * x + h1 * y + h2) / denom;
      const sy = (h3 * x + h4 * y + h5) / denom;

      if (sx < 0 || sy < 0 || sx >= srcW - 1 || sy >= srcH - 1) {
        // Außerhalb des Quellbilds → weiß lassen (Scan-Look)
        const di = (y * dstW + x) * 4;
        dstData[di] = 255;
        dstData[di + 1] = 255;
        dstData[di + 2] = 255;
        dstData[di + 3] = 255;
        continue;
      }

      // Bilineare Interpolation
      const x0 = Math.floor(sx);
      const y0 = Math.floor(sy);
      const dx = sx - x0;
      const dy = sy - y0;
      const wx1 = 1 - dx;
      const wy1 = 1 - dy;

      const i00 = (y0 * srcW + x0) * 4;
      const i10 = i00 + 4;
      const i01 = i00 + srcW * 4;
      const i11 = i01 + 4;

      const w00 = wx1 * wy1;
      const w10 = dx * wy1;
      const w01 = wx1 * dy;
      const w11 = dx * dy;

      const di = (y * dstW + x) * 4;
      dstData[di] =
        srcData[i00] * w00 + srcData[i10] * w10 + srcData[i01] * w01 + srcData[i11] * w11;
      dstData[di + 1] =
        srcData[i00 + 1] * w00 +
        srcData[i10 + 1] * w10 +
        srcData[i01 + 1] * w01 +
        srcData[i11 + 1] * w11;
      dstData[di + 2] =
        srcData[i00 + 2] * w00 +
        srcData[i10 + 2] * w10 +
        srcData[i01 + 2] * w01 +
        srcData[i11 + 2] * w11;
      dstData[di + 3] = 255;
    }
  }

  dstCtx.putImageData(dstImg, 0, 0);
  return dstCanvas;
}

/**
 * Schätzt die Zielgröße aus einem verzerrten Quad: nimmt den Durchschnitt
 * der gegenüberliegenden Seiten und wählt eine A4-nahe Auflösung, die
 * groß genug ist, um Text scharf zu erhalten (max 2000 px Langkante).
 */
export function estimateDstSize(quad: Quad, maxDim = 2000): { w: number; h: number } {
  const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
  const topW = dist(quad.tl, quad.tr);
  const bottomW = dist(quad.bl, quad.br);
  const leftH = dist(quad.tl, quad.bl);
  const rightH = dist(quad.tr, quad.br);

  let w = Math.round((topW + bottomW) / 2);
  let h = Math.round((leftH + rightH) / 2);
  if (w < 1 || h < 1) return { w: 1, h: 1 };

  const longest = Math.max(w, h);
  if (longest > maxDim) {
    const scale = maxDim / longest;
    w = Math.round(w * scale);
    h = Math.round(h * scale);
  }
  return { w, h };
}
