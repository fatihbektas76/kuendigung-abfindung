/**
 * Kombiniert die JPEG-Bilder mehrerer Scan-PDFs zu einem mehrseitigen PDF.
 *
 * Alternative wäre pdf-lib, um bestehende PDFs seitenweise zu mergen —
 * das würde aber weitere 300 KB im Bundle bedeuten. Da unsere Scan-PDFs
 * immer aus genau EINEM eingebetteten JPEG bestehen, extrahieren wir das
 * JPEG direkt aus dem Original-Bild-Cache: der Aufrufer übergibt die
 * Roh-JPEGs statt der fertigen PDFs.
 *
 * Deshalb speichern die Scan-Attachments zusätzlich das JPEG in einem
 * flüchtigen Cache (siehe FileUpload). Wenn kein Cache vorhanden ist,
 * rendern wir die PDFs via <canvas> aus — Fallback für Reload-Szenarien.
 */

export interface PageInput {
  /** Data-URL (base64) des JPEGs, das auf die Seite kommt. */
  jpegDataUrl: string;
  /** Bildseitenverhältnis (w/h) zur Wahl Portrait/Landscape. */
  aspect: number;
}

export async function combineJpegsToPdf(pages: PageInput[]): Promise<Blob> {
  if (pages.length === 0) throw new Error('Keine Seiten zum Zusammenfassen');

  const jsPDFModule = await import('jspdf');
  const JsPDF = jsPDFModule.jsPDF;

  const A4_SHORT = 210;
  const A4_LONG = 297;
  const margin = 8;

  const first = pages[0];
  const firstLandscape = first.aspect > 1;
  const pdf = new JsPDF({
    orientation: firstLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  pages.forEach((page, idx) => {
    const landscape = page.aspect > 1;
    if (idx > 0) {
      pdf.addPage('a4', landscape ? 'landscape' : 'portrait');
    }
    const pageW = landscape ? A4_LONG : A4_SHORT;
    const pageH = landscape ? A4_SHORT : A4_LONG;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;

    let drawW = maxW;
    let drawH = drawW / page.aspect;
    if (drawH > maxH) {
      drawH = maxH;
      drawW = drawH * page.aspect;
    }
    const offsetX = (pageW - drawW) / 2;
    const offsetY = (pageH - drawH) / 2;

    pdf.addImage(page.jpegDataUrl, 'JPEG', offsetX, offsetY, drawW, drawH, undefined, 'FAST');
  });

  return pdf.output('blob');
}
