/**
 * Zentrale Konfiguration für Buchungs-/Terminlinks.
 *
 * Alle Terminbuchungs-Buttons DE + EN laden ihre URL von hier.
 * Ändert sich der Brevo-Termintyp (z. B. neue Benennung oder Slug),
 * muss nur dieser Wert angepasst werden.
 */
export const BOOKING = {
  /** Kostenlose Ersteinschätzung per Telefon (DE + EN) */
  firstCheck:
    'https://meet.brevo.com/fatih-bektas/ersteinschaetzung-per-telefon-kuendigung-arbeitsrechtde',
} as const;
