/**
 * Plausible-Event-Helfer für Werbe-Landing-Pages.
 *
 * Schreibt immer an `window.plausible`, das vom Script-Tag in `app/layout.tsx`
 * initialisiert wird. Wenn Plausible blockiert oder nicht geladen ist,
 * schlucken wir still – Werbe-Klicker sollen NIE einen JS-Fehler sehen.
 */

type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void;

export type LandingVariant = 'kuendigung' | 'aufhebungsvertrag' | 'executive';
export type LandingMethod = 'tel' | 'booking' | 'form' | 'form_submitted';

export function trackCta(variant: LandingVariant, method: LandingMethod): void {
  try {
    const p = (window as unknown as { plausible?: PlausibleFn }).plausible;
    if (typeof p === 'function') {
      p('LandingCTA', { props: { variant, method } });
    }
  } catch {
    // intentional: Analytics darf die UX nie blockieren
  }
}
