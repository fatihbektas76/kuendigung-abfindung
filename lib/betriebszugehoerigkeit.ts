export interface BetriebsEntry {
  year: number;
  word: string;
  slug: string;
  kuendigungsfrist: string;
}

function getFrist(year: number): string {
  if (year < 2) return '4 Wochen zum Fünfzehnten oder zum Ende des Kalendermonats';
  if (year < 5) return '1 Monat zum Ende des Kalendermonats';
  if (year < 8) return '2 Monate zum Ende des Kalendermonats';
  if (year < 10) return '3 Monate zum Ende des Kalendermonats';
  if (year < 12) return '4 Monate zum Ende des Kalendermonats';
  if (year < 15) return '5 Monate zum Ende des Kalendermonats';
  if (year < 20) return '6 Monate zum Ende des Kalendermonats';
  return '7 Monate zum Ende des Kalendermonats';
}

/** Old word-based slugs for 301 redirect generation */
export const OLD_SLUGS: Record<number, string> = {
  1: 'einem-jahr', 2: 'zwei-jahren', 3: 'drei-jahren', 4: 'vier-jahren',
  5: 'fuenf-jahren', 6: 'sechs-jahren', 7: 'sieben-jahren', 8: 'acht-jahren',
  9: 'neun-jahren', 10: 'zehn-jahren', 11: 'elf-jahren', 12: 'zwoelf-jahren',
  13: 'dreizehn-jahren', 14: 'vierzehn-jahren', 15: 'fuenfzehn-jahren',
  16: 'sechzehn-jahren', 17: 'siebzehn-jahren', 18: 'achtzehn-jahren',
  19: 'neunzehn-jahren', 20: 'zwanzig-jahren', 21: 'einundzwanzig-jahren',
  22: 'zweiundzwanzig-jahren', 23: 'dreiundzwanzig-jahren', 24: 'vierundzwanzig-jahren',
  25: 'fuenfundzwanzig-jahren', 26: 'sechsundzwanzig-jahren', 27: 'siebenundzwanzig-jahren',
  28: 'achtundzwanzig-jahren', 29: 'neunundzwanzig-jahren', 30: 'dreissig-jahren',
  31: 'einunddreissig-jahren', 32: 'zweiunddreissig-jahren', 33: 'dreiunddreissig-jahren',
  34: 'vierunddreissig-jahren', 35: 'fuenfunddreissig-jahren', 36: 'sechsunddreissig-jahren',
  37: 'siebenunddreissig-jahren', 38: 'achtunddreissig-jahren', 39: 'neununddreissig-jahren',
  40: 'vierzig-jahren',
};

const raw: { year: number; word: string; slug: string }[] = [
  { year: 1, word: 'einem', slug: '1-jahr' },
  { year: 2, word: 'zwei', slug: '2-jahren' },
  { year: 3, word: 'drei', slug: '3-jahren' },
  { year: 4, word: 'vier', slug: '4-jahren' },
  { year: 5, word: 'fünf', slug: '5-jahren' },
  { year: 6, word: 'sechs', slug: '6-jahren' },
  { year: 7, word: 'sieben', slug: '7-jahren' },
  { year: 8, word: 'acht', slug: '8-jahren' },
  { year: 9, word: 'neun', slug: '9-jahren' },
  { year: 10, word: 'zehn', slug: '10-jahren' },
  { year: 11, word: 'elf', slug: '11-jahren' },
  { year: 12, word: 'zwölf', slug: '12-jahren' },
  { year: 13, word: 'dreizehn', slug: '13-jahren' },
  { year: 14, word: 'vierzehn', slug: '14-jahren' },
  { year: 15, word: 'fünfzehn', slug: '15-jahren' },
  { year: 16, word: 'sechzehn', slug: '16-jahren' },
  { year: 17, word: 'siebzehn', slug: '17-jahren' },
  { year: 18, word: 'achtzehn', slug: '18-jahren' },
  { year: 19, word: 'neunzehn', slug: '19-jahren' },
  { year: 20, word: 'zwanzig', slug: '20-jahren' },
  { year: 21, word: 'einundzwanzig', slug: '21-jahren' },
  { year: 22, word: 'zweiundzwanzig', slug: '22-jahren' },
  { year: 23, word: 'dreiundzwanzig', slug: '23-jahren' },
  { year: 24, word: 'vierundzwanzig', slug: '24-jahren' },
  { year: 25, word: 'fünfundzwanzig', slug: '25-jahren' },
  { year: 26, word: 'sechsundzwanzig', slug: '26-jahren' },
  { year: 27, word: 'siebenundzwanzig', slug: '27-jahren' },
  { year: 28, word: 'achtundzwanzig', slug: '28-jahren' },
  { year: 29, word: 'neunundzwanzig', slug: '29-jahren' },
  { year: 30, word: 'dreißig', slug: '30-jahren' },
  { year: 31, word: 'einunddreißig', slug: '31-jahren' },
  { year: 32, word: 'zweiunddreißig', slug: '32-jahren' },
  { year: 33, word: 'dreiunddreißig', slug: '33-jahren' },
  { year: 34, word: 'vierunddreißig', slug: '34-jahren' },
  { year: 35, word: 'fünfunddreißig', slug: '35-jahren' },
  { year: 36, word: 'sechsunddreißig', slug: '36-jahren' },
  { year: 37, word: 'siebenunddreißig', slug: '37-jahren' },
  { year: 38, word: 'achtunddreißig', slug: '38-jahren' },
  { year: 39, word: 'neununddreißig', slug: '39-jahren' },
  { year: 40, word: 'vierzig', slug: '40-jahren' },
];

export const entries: BetriebsEntry[] = raw.map((e) => ({
  ...e,
  kuendigungsfrist: getFrist(e.year),
}));

export function getEntry(slug: string): BetriebsEntry | undefined {
  return entries.find((e) => e.slug === slug);
}

export function yearLabel(year: number): string {
  return year === 1 ? '1 Jahr' : `${year} Jahren`;
}

export function generateFaqs(entry: BetriebsEntry) {
  const y = entry.year;
  const yl = yearLabel(y);
  const lower = (0.5 * y).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const upper = (1.5 * y).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return [
    {
      q: `Wie hoch ist die Abfindung nach ${yl} Betriebszugehörigkeit?`,
      a: `Nach ${yl} Betriebszugehörigkeit liegt die Abfindung erfahrungsgemäß zwischen ${lower} und ${upper} Bruttomonatsgehältern. Bei einem Gehalt von 4.000\u00A0\u20AC entspricht das ${(4000 * 0.5 * y).toLocaleString('de-DE')}\u00A0\u20AC bis ${(4000 * 1.5 * y).toLocaleString('de-DE')}\u00A0\u20AC. Die tatsächliche Höhe hängt von der Wirksamkeit der Kündigung, der Sozialauswahl und Ihrer Verhandlungsposition ab.`,
    },
    {
      q: `Was ist meine Kündigungsfrist nach ${yl}?`,
      a: `Nach ${yl} Betriebszugehörigkeit beträgt die gesetzliche Kündigungsfrist ${entry.kuendigungsfrist} (§622 BGB). Arbeits- oder Tarifverträge können längere Fristen vorsehen. Eine zu kurze Kündigungsfrist macht die Kündigung angreifbar.`,
    },
    {
      q: `Gibt es einen gesetzlichen Abfindungsanspruch nach ${yl}?`,
      a: 'Einen automatischen gesetzlichen Abfindungsanspruch gibt es nicht. Ein Anspruch kann sich aus §1a KSchG ergeben (Abfindungsangebot bei betriebsbedingter Kündigung), aus Sozialplänen oder Tarifverträgen. In der Praxis wird eine Abfindung in der großen Mehrheit aller Kündigungsschutzverfahren im Vergleich ausgehandelt.',
    },
    {
      q: 'Bekomme ich eine Abfindung als Teilzeitkraft oder Minijobber?',
      a: 'Ja. Teilzeitkräfte und Minijobber haben grundsätzlich die gleichen Kündigungsschutzrechte wie Vollzeitbeschäftigte. Voraussetzung ist, dass das Kündigungsschutzgesetz gilt (Betrieb mit mehr als 10 Vollzeitäquivalenten nach §23 KSchG) und das Arbeitsverhältnis länger als 6 Monate besteht. Die Abfindung berechnet sich dann nach dem jeweiligen Teilzeitgehalt.',
    },
    {
      q: 'Muss ich die Abfindung versteuern?',
      a: 'Ja, Abfindungen sind einkommensteuerpflichtig. Allerdings können Sie die sogenannte Fünftelregelung (§34 EStG) nutzen, die die Steuerlast deutlich senken kann. Sozialversicherungsbeiträge fallen auf Abfindungen in der Regel nicht an, sofern sie im Zusammenhang mit der Beendigung des Arbeitsverhältnisses stehen.',
    },
  ];
}
