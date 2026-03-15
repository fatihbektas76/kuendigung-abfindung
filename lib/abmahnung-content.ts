export interface AbmahnungEntry {
  count: number;
  word: string;
  slug: string;
}

export const abmahnungEntries: AbmahnungEntry[] = [
  { count: 1, word: 'einer', slug: 'einer-abmahnung' },
  { count: 2, word: 'zwei', slug: 'zwei-abmahnungen' },
  { count: 3, word: 'drei', slug: 'drei-abmahnungen' },
  { count: 4, word: 'vier', slug: 'vier-abmahnungen' },
  { count: 5, word: 'fünf', slug: 'fuenf-abmahnungen' },
];

export function getAbmahnungEntry(slug: string): AbmahnungEntry | undefined {
  return abmahnungEntries.find((e) => e.slug === slug);
}

export function abmahnungLabel(count: number): string {
  return count === 1 ? '1 Abmahnung' : `${count} Abmahnungen`;
}
