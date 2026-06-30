/**
 * Tenure data for the English programmatic pages.
 *
 * Public URLs read like:
 *   /en/severance-after-5-years-of-employment/
 *   /en/dismissed-after-10-years-of-employment/
 *   /en/summary-dismissal-after-20-years-of-employment/
 *
 * They rewrite internally to /en/severance-years/[slug]/, etc.
 *
 * The slug is intentionally the year number ("1-year" or "N-years") rather
 * than a German number-word slug, so the URLs read natively English.
 */

export interface EnTenureEntry {
  readonly year: number;
  readonly slug: string;
  readonly label: string;
  readonly notice: string;
}

function noticePeriod(year: number): string {
  if (year < 2) return '4 weeks to the 15th or end of the calendar month (§ 622 (1) BGB)';
  if (year < 5) return '1 month to the end of the calendar month (§ 622 (2) 1 BGB)';
  if (year < 8) return '2 months to the end of the calendar month (§ 622 (2) 2 BGB)';
  if (year < 10) return '3 months to the end of the calendar month (§ 622 (2) 3 BGB)';
  if (year < 12) return '4 months to the end of the calendar month (§ 622 (2) 4 BGB)';
  if (year < 15) return '5 months to the end of the calendar month (§ 622 (2) 5 BGB)';
  if (year < 20) return '6 months to the end of the calendar month (§ 622 (2) 6 BGB)';
  return '7 months to the end of the calendar month (§ 622 (2) 7 BGB)';
}

const YEARS: readonly number[] = Array.from({ length: 40 }, (_, i) => i + 1);

export const EN_TENURE_ENTRIES: readonly EnTenureEntry[] = YEARS.map((y) => ({
  year: y,
  slug: y === 1 ? '1-year' : `${y}-years`,
  label: y === 1 ? '1 year' : `${y} years`,
  notice: noticePeriod(y),
}));

export function getEnTenure(slug: string): EnTenureEntry | undefined {
  return EN_TENURE_ENTRIES.find((e) => e.slug === slug);
}

export function severanceRange(year: number, monthlySalary: number) {
  const low = monthlySalary * 0.5 * year;
  const high = monthlySalary * 1.5 * year;
  return { low: Math.round(low), high: Math.round(high) };
}
