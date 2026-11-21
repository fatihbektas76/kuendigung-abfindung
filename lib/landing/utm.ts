/**
 * Liest Werbe-Tracking-Parameter aus der aktuellen URL.
 *
 * Google Ads liefert `gclid`, Meta liefert `fbclid`, ChatGPT-Ads liefern
 * aktuell nur UTM-Parameter. Alles optional – fehlende Werte sind `null`.
 * Wird im Browser aufgerufen; auf dem Server geben wir leere Werte zurück,
 * damit das Formular SSR-safe bleibt.
 */

export type LandingAttribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
  landingPath: string | null;
};

const EMPTY_ATTRIBUTION: LandingAttribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_content: null,
  utm_term: null,
  gclid: null,
  fbclid: null,
  referrer: null,
  landingPath: null,
};

function pick(params: URLSearchParams, key: string): string | null {
  const value = params.get(key);
  if (!value) return null;
  // Harte Länge – Ad-Parameter sind kurz, alles >200 Zeichen ist Müll.
  return value.slice(0, 200);
}

export function readAttribution(): LandingAttribution {
  if (typeof window === 'undefined') return EMPTY_ATTRIBUTION;
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: pick(params, 'utm_source'),
      utm_medium: pick(params, 'utm_medium'),
      utm_campaign: pick(params, 'utm_campaign'),
      utm_content: pick(params, 'utm_content'),
      utm_term: pick(params, 'utm_term'),
      gclid: pick(params, 'gclid'),
      fbclid: pick(params, 'fbclid'),
      referrer: document.referrer ? document.referrer.slice(0, 500) : null,
      landingPath: window.location.pathname + window.location.search,
    };
  } catch {
    return EMPTY_ATTRIBUTION;
  }
}

/** Baut eine kompakte Zusatznachricht für das Admin-Ingest-Feld */
export function formatAttributionLines(attr: LandingAttribution): string {
  const parts: string[] = [];
  if (attr.utm_source) parts.push(`src=${attr.utm_source}`);
  if (attr.utm_medium) parts.push(`med=${attr.utm_medium}`);
  if (attr.utm_campaign) parts.push(`camp=${attr.utm_campaign}`);
  if (attr.utm_content) parts.push(`content=${attr.utm_content}`);
  if (attr.utm_term) parts.push(`term=${attr.utm_term}`);
  if (attr.gclid) parts.push(`gclid=${attr.gclid}`);
  if (attr.fbclid) parts.push(`fbclid=${attr.fbclid}`);
  if (attr.referrer) parts.push(`ref=${attr.referrer}`);
  return parts.join(' · ');
}
