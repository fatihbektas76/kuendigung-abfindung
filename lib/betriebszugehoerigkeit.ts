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

const raw: { year: number; word: string; slug: string }[] = [
  { year: 1, word: 'einem', slug: 'einem-jahr' },
  { year: 2, word: 'zwei', slug: 'zwei-jahren' },
  { year: 3, word: 'drei', slug: 'drei-jahren' },
  { year: 4, word: 'vier', slug: 'vier-jahren' },
  { year: 5, word: 'fünf', slug: 'fuenf-jahren' },
  { year: 6, word: 'sechs', slug: 'sechs-jahren' },
  { year: 7, word: 'sieben', slug: 'sieben-jahren' },
  { year: 8, word: 'acht', slug: 'acht-jahren' },
  { year: 9, word: 'neun', slug: 'neun-jahren' },
  { year: 10, word: 'zehn', slug: 'zehn-jahren' },
  { year: 11, word: 'elf', slug: 'elf-jahren' },
  { year: 12, word: 'zwölf', slug: 'zwoelf-jahren' },
  { year: 13, word: 'dreizehn', slug: 'dreizehn-jahren' },
  { year: 14, word: 'vierzehn', slug: 'vierzehn-jahren' },
  { year: 15, word: 'fünfzehn', slug: 'fuenfzehn-jahren' },
  { year: 16, word: 'sechzehn', slug: 'sechzehn-jahren' },
  { year: 17, word: 'siebzehn', slug: 'siebzehn-jahren' },
  { year: 18, word: 'achtzehn', slug: 'achtzehn-jahren' },
  { year: 19, word: 'neunzehn', slug: 'neunzehn-jahren' },
  { year: 20, word: 'zwanzig', slug: 'zwanzig-jahren' },
  { year: 21, word: 'einundzwanzig', slug: 'einundzwanzig-jahren' },
  { year: 22, word: 'zweiundzwanzig', slug: 'zweiundzwanzig-jahren' },
  { year: 23, word: 'dreiundzwanzig', slug: 'dreiundzwanzig-jahren' },
  { year: 24, word: 'vierundzwanzig', slug: 'vierundzwanzig-jahren' },
  { year: 25, word: 'fünfundzwanzig', slug: 'fuenfundzwanzig-jahren' },
  { year: 26, word: 'sechsundzwanzig', slug: 'sechsundzwanzig-jahren' },
  { year: 27, word: 'siebenundzwanzig', slug: 'siebenundzwanzig-jahren' },
  { year: 28, word: 'achtundzwanzig', slug: 'achtundzwanzig-jahren' },
  { year: 29, word: 'neunundzwanzig', slug: 'neunundzwanzig-jahren' },
  { year: 30, word: 'dreißig', slug: 'dreissig-jahren' },
  { year: 31, word: 'einunddreißig', slug: 'einunddreissig-jahren' },
  { year: 32, word: 'zweiunddreißig', slug: 'zweiunddreissig-jahren' },
  { year: 33, word: 'dreiunddreißig', slug: 'dreiunddreissig-jahren' },
  { year: 34, word: 'vierunddreißig', slug: 'vierunddreissig-jahren' },
  { year: 35, word: 'fünfunddreißig', slug: 'fuenfunddreissig-jahren' },
  { year: 36, word: 'sechsunddreißig', slug: 'sechsunddreissig-jahren' },
  { year: 37, word: 'siebenunddreißig', slug: 'siebenunddreissig-jahren' },
  { year: 38, word: 'achtunddreißig', slug: 'achtunddreissig-jahren' },
  { year: 39, word: 'neununddreißig', slug: 'neununddreissig-jahren' },
  { year: 40, word: 'vierzig', slug: 'vierzig-jahren' },
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
