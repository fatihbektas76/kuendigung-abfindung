/**
 * Bilingual routing infrastructure (de ↔ en).
 *
 * Why: gekuendigt-abfindung.de targets German labour-law topics that also
 * matter to English-speaking expats employed in Germany. The English site
 * lives at /en/* on the same domain so it inherits the parent's authority.
 */

export type Locale = 'de' | 'en';
export const LOCALES: readonly Locale[] = ['de', 'en'] as const;
export const DEFAULT_LOCALE: Locale = 'de';

export const BASE_URL = 'https://www.gekuendigt-abfindung.de';

/**
 * Public DE → EN slug mapping for static routes.
 * Keys are German URL paths (with leading slash, trailing slash optional).
 * Values are the English public path under /en/.
 */
export const STATIC_SLUG_MAP: Readonly<Record<string, string>> = {
  '/': '/en/',
  '/abfindung': '/en/severance-pay',
  '/abfindungsrechner': '/en/severance-calculator',
  '/abfindungstabelle': '/en/severance-table',
  '/abmahnung': '/en/written-warning',
  '/abmahnung-pruefen': '/en/check-written-warning',
  '/abmahnung-pruefen/pruefung': '/en/check-written-warning/review',
  '/arbeitsrecht-anwalt': '/en/employment-lawyer',
  '/aufhebungsvertrag': '/en/termination-agreement',
  '/aufhebungsvertrag-pruefen': '/en/check-termination-agreement',
  '/autor/fatih-bektas': '/en/author/fatih-bektas',
  '/betriebsbedingte-kuendigung': '/en/redundancy-dismissal',
  '/fristlose-kuendigung': '/en/summary-dismissal',
  '/glossar': '/en/glossary',
  '/kuendigung': '/en/dismissal',
  '/kuendigung-pruefen': '/en/check-dismissal',
  '/kuendigungsfrist-rechner': '/en/notice-period-calculator',
  '/kuendigungsfristen': '/en/notice-periods',
  '/kuendigungsschutzgesetz-anwendung': '/en/dismissal-protection-act',
  '/kuendigungsschutzklage': '/en/unfair-dismissal-claim',
  '/legal-notice': '/en/legal-notice',
  '/mandantenaufnahme': '/en/client-intake',
  '/mandantenaufnahme-kuendigung': '/en/client-intake-dismissal',
  '/privacy-policy': '/en/privacy-policy',
  '/ratgeber': '/en/guides',
  '/ratgeber/arbeitsrecht': '/en/guides/employment-law',
  '/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland':
    '/en/guides/dismissal-statistics-german-labour-courts',
  '/ratgeber/muster': '/en/guides/templates',
  '/ratgeber/urteile': '/en/guides/court-rulings',
  '/rvg-rechner': '/en/legal-fees-calculator',
  '/schwellenwert-rechner': '/en/small-business-threshold-calculator',
  '/team': '/en/team',
  '/tools': '/en/tools',
  '/ueberstundenrechner': '/en/overtime-calculator',
  '/urlaub-teilzeit-rechner': '/en/part-time-holiday-calculator',
  '/urlaubsabgeltung-rechner': '/en/unused-holiday-pay-calculator',
};

/**
 * Reverse map for EN → DE lookups (drives hreflang on /en/* pages).
 */
export const REVERSE_SLUG_MAP: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(
    Object.entries(STATIC_SLUG_MAP).map(([de, en]) => [en, de === '/' ? '/' : de]),
  ),
);

/**
 * Public dynamic-route slug rewrites for /en/*. These mirror the German
 * rewrites in next.config.mjs so the URLs read naturally in English.
 *
 * Internal route                      → Public path (template)
 * /en/severance-years/[slug]          → /en/severance-after-[slug]-years-of-employment
 * /en/dismissed-years/[slug]          → /en/dismissed-after-[slug]-years-of-employment
 * /en/summary-dismissal-years/[slug]  → /en/summary-dismissal-after-[slug]-years-of-employment
 * /en/warning-letter-pages/[slug]     → /en/dismissal-after-[slug]
 */
export const EN_DYNAMIC_REWRITES = {
  severance: {
    public: '/en/severance-after-:slug-years-of-employment/',
    internal: '/en/severance-years/:slug/',
  },
  dismissed: {
    public: '/en/dismissed-after-:slug-years-of-employment/',
    internal: '/en/dismissed-years/:slug/',
  },
  summary: {
    public: '/en/summary-dismissal-after-:slug-years-of-employment/',
    internal: '/en/summary-dismissal-years/:slug/',
  },
  warningLetter: {
    public: '/en/dismissal-after-:slug/',
    internal: '/en/warning-letter-pages/:slug/',
  },
} as const;

/**
 * Build a canonical URL for the given locale + path.
 * Path is expected to already include the locale prefix where applicable.
 */
export function canonicalUrl(path: string): string {
  const normalised = path.endsWith('/') ? path : `${path}/`;
  return `${BASE_URL}${normalised}`;
}

/**
 * Resolve the alternate-language URL pair for a given DE path.
 * Returns null for the alternate when no English equivalent exists yet.
 */
export interface HreflangPair {
  de: string;
  en: string | null;
}

export function hreflangFor(germanPath: string): HreflangPair {
  const cleaned = germanPath.replace(/\/$/, '') || '/';
  const en = STATIC_SLUG_MAP[cleaned] ?? null;
  return {
    de: canonicalUrl(germanPath),
    en: en ? canonicalUrl(en) : null,
  };
}

/**
 * Resolve the alternate-language URL pair for a given EN path.
 */
export function hreflangForEn(englishPath: string): HreflangPair {
  const cleaned = englishPath.replace(/\/$/, '') || '/en';
  const de = REVERSE_SLUG_MAP[cleaned] ?? null;
  return {
    de: de ? canonicalUrl(de) : canonicalUrl('/'),
    en: canonicalUrl(englishPath),
  };
}
