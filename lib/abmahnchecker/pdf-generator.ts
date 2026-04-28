import jsPDF from 'jspdf';
import type { EvaluationResult, Verdict } from './types';
import { questions } from './questions';

const OLIVE = '#7A6528';
const DARK = '#2A1F0E';
const CREAM = '#F0EAD9';
const GRAY = '#666666';
const RED = '#791F1F';
const AMBER = '#633806';
const TEAL = '#0F6E56';

const VERDICT_LABELS: Record<Verdict, string> = {
  UNWIRKSAM: 'Abmahnung wahrscheinlich nicht wirksam',
  UNSICHER: 'Wirksamkeit unsicher',
  WIRKSAM: 'Abmahnung wahrscheinlich wirksam',
};

const VERDICT_COLORS: Record<Verdict, string> = {
  UNWIRKSAM: RED,
  UNSICHER: AMBER,
  WIRKSAM: TEAL,
};

function addPageFooter(doc: jsPDF, pageNum: number, totalPages: number) {
  const pageH = doc.internal.pageSize.getHeight();
  const pageW = doc.internal.pageSize.getWidth();
  doc.setDrawColor(200, 200, 200);
  doc.line(40, pageH - 35, pageW - 40, pageH - 35);
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(
    'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG \u00B7 Heidelberg \u00B7 gekuendigt-abfindung.de',
    40,
    pageH - 26,
  );
  doc.text(
    'Automatisierte Orientierungshilfe \u2014 ersetzt keine individuelle Rechtsberatung.',
    40,
    pageH - 19,
  );
  doc.text(`Seite ${pageNum} / ${totalPages}`, pageW - 40, pageH - 19, { align: 'right' });
}

function checkPageBreak(doc: jsPDF, y: number, needed: number): number {
  const pageH = doc.internal.pageSize.getHeight();
  if (y + needed > pageH - 45) {
    doc.addPage();
    return 50;
  }
  return y;
}

export async function generatePDF(
  result: EvaluationResult,
  answersMap: Record<string, string>,
): Promise<Blob> {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const marginL = 40;
  const marginR = pageW - 40;
  const contentW = marginR - marginL;
  const date = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  /* ── Page 1: Header ── */
  doc.setFontSize(10);
  doc.setTextColor(OLIVE);
  doc.setFont('helvetica', 'bold');
  doc.text('APOS LEGAL', marginL, 45);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(GRAY);
  doc.text('Abmahn-Auswertung', marginL, 57);

  doc.setFontSize(8);
  doc.text(date, marginR, 45, { align: 'right' });
  doc.text('gekuendigt-abfindung.de', marginR, 57, { align: 'right' });

  doc.setDrawColor(200, 200, 200);
  doc.line(marginL, 68, marginR, 68);

  /* ── Title ── */
  let y = 95;
  doc.setFontSize(18);
  doc.setTextColor(DARK);
  doc.setFont('helvetica', 'bold');
  doc.text('Auswertung Ihrer Abmahnung', marginL, y);

  /* ── Verdict Banner ── */
  y += 30;
  const verdictColor = VERDICT_COLORS[result.verdict];
  doc.setFillColor(CREAM);
  doc.roundedRect(marginL, y, contentW, 50, 3, 3, 'F');
  doc.setFontSize(8);
  doc.setTextColor(verdictColor);
  doc.setFont('helvetica', 'bold');
  doc.text('ERGEBNIS', marginL + 14, y + 18);
  doc.setFontSize(14);
  doc.text(VERDICT_LABELS[result.verdict], marginL + 14, y + 36);

  y += 65;
  doc.setFontSize(8);
  doc.setTextColor(GRAY);
  doc.setFont('helvetica', 'normal');
  doc.text(`Erstellt am ${date} auf gekuendigt-abfindung.de`, marginL, y);

  /* ── Section: Ihre Angaben ── */
  y += 30;
  doc.setFontSize(9);
  doc.setTextColor(OLIVE);
  doc.setFont('helvetica', 'bold');
  doc.text('IHRE ANGABEN', marginL, y);
  y += 5;
  doc.setDrawColor(200, 200, 200);
  doc.line(marginL, y, marginR, y);
  y += 14;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');

  // Get all visible questions and their answers
  const visibleQs = questions.filter((q) => !q.showIf || q.showIf(answersMap));

  for (const q of visibleQs) {
    const selectedId = answersMap[q.id];
    if (!selectedId) continue;
    const opt = q.options.find((o) => o.id === selectedId);
    if (!opt) continue;

    y = checkPageBreak(doc, y, 30);

    doc.setTextColor(DARK);
    doc.setFont('helvetica', 'bold');
    const qLines = doc.splitTextToSize(q.text, contentW);
    doc.text(qLines, marginL, y);
    y += qLines.length * 11;

    doc.setTextColor(GRAY);
    doc.setFont('helvetica', 'normal');
    const aLines = doc.splitTextToSize(`\u2192 ${opt.label}`, contentW);
    doc.text(aLines, marginL, y);
    y += aLines.length * 11 + 8;
  }

  /* ── Section: Festgestellte Mängel ── */
  if (result.findings.length > 0) {
    y = checkPageBreak(doc, y, 40);
    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(OLIVE);
    doc.setFont('helvetica', 'bold');
    doc.text(result.verdict === 'WIRKSAM' ? 'GEPR\u00dcFTE HINWEISE' : 'FESTGESTELLTE M\u00c4NGEL', marginL, y);
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(marginL, y, marginR, y);
    y += 14;

    for (const f of result.findings) {
      y = checkPageBreak(doc, y, 60);

      // Severity pill
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      if (f.severity === 'KO') {
        doc.setTextColor(RED);
      } else {
        doc.setTextColor(AMBER);
      }
      doc.text(`[${f.severity}]`, marginL, y);

      // Title
      doc.setFontSize(9);
      doc.setTextColor(DARK);
      doc.text(f.title, marginL + 30, y);
      y += 14;

      // Body
      doc.setFontSize(8);
      doc.setTextColor(GRAY);
      doc.setFont('helvetica', 'normal');
      const bodyLines = doc.splitTextToSize(f.body, contentW);
      doc.text(bodyLines, marginL, y);
      y += bodyLines.length * 11;

      // Citation
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text(f.citation, marginL, y);
      y += 18;
    }
  }

  /* ── Section: Was Sie jetzt tun können ── */
  y = checkPageBreak(doc, y, 80);
  y += 10;
  doc.setFontSize(9);
  doc.setTextColor(OLIVE);
  doc.setFont('helvetica', 'bold');
  doc.text('WAS SIE JETZT TUN K\u00d6NNEN', marginL, y);
  y += 5;
  doc.setDrawColor(200, 200, 200);
  doc.line(marginL, y, marginR, y);
  y += 14;

  doc.setFontSize(8);
  doc.setTextColor(DARK);
  doc.setFont('helvetica', 'normal');

  let steps: string[];
  if (result.verdict === 'UNWIRKSAM') {
    steps = [
      '1. Klage auf Entfernung aus der Personalakte (\u00A7\u00A7 242, 1004 Abs. 1 S. 1 BGB analog)',
      '2. Vor Klage: Aufforderung zur Entfernung mit Frist',
      '3. Im Falle einer Folgekündigung: 3-Wochen-Frist nach \u00A7 4 KSchG beachten',
    ];
  } else if (result.verdict === 'UNSICHER') {
    steps = [
      '1. Anwaltliche Prüfung der Abmahnung empfohlen',
      '2. Schriftliche Gegendarstellung zur Personalakte (\u00A7 83 BetrVG) erwägen',
      '3. Bei Folgekündigung: 3-Wochen-Frist nach \u00A7 4 KSchG beachten',
    ];
  } else {
    steps = [
      '1. Schriftliche Gegendarstellung zur Personalakte (\u00A7 83 BetrVG)',
      '2. Beanstandungsfreies Verhalten in Zukunft',
      '3. Bei Wiederholungsabmahnungen erneut prüfen lassen',
    ];
  }

  for (const step of steps) {
    y = checkPageBreak(doc, y, 16);
    const stepLines = doc.splitTextToSize(step, contentW);
    doc.text(stepLines, marginL, y);
    y += stepLines.length * 11 + 4;
  }

  /* ── Add page numbers ── */
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addPageFooter(doc, i, totalPages);
  }

  return doc.output('blob');
}
