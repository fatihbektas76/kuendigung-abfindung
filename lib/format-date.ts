/**
 * Format helpers for dates sent from the client-intake forms.
 *
 * `<input type="date">` always stores values as ISO 8601 (`YYYY-MM-DD`)
 * regardless of the browser locale. We display the intake-form date inputs
 * to the user using the browser's locale-aware widget, but the values that
 * flow into the webhook / lead notification must be in German DIN 5008
 * format (`DD.MM.YYYY`) so the recipient (Fatih) reads them naturally.
 */

/** Returns `DD.MM.YYYY`, or the original string if it does not look like an ISO date. */
export function isoToGermanDate(iso: string): string {
  if (typeof iso !== 'string') return iso;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  return `${day}.${month}.${year}`;
}
