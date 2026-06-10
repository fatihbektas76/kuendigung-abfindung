/**
 * Single Source of Truth for dateModified across all pages.
 * Used by StandAnzeige (visible date) and SeoGeoBase / Article schema (JSON-LD).
 *
 * Update the relevant key when page content is materially changed.
 */
export const PAGE_DATES = {
  // Hub pages (cross-cluster links added 2026-05-03)
  home: '2026-05-03',
  abfindung: '2026-05-03',
  kuendigung: '2026-05-03',
  aufhebungsvertrag: '2026-05-03',
  fristloseKuendigung: '2026-05-03',
  abmahnung: '2026-05-03',
  glossar: '2026-04-19',
  ratgeber: '2026-04-27',
  ratgeberUrteile: '2026-04-27',
  ratgeberMuster: '2026-04-29',
  tools: '2026-05-03',

  // Tool pages (StandAnzeige added 2026-05-03)
  kuendigungPruefen: '2026-05-03',
  aufhebungsvertragPruefen: '2026-05-04',
  autor: '2026-04-27',

  // Template-level dates (all pages of this type share one date)
  abfindungJahre: '2026-05-03',
  gekuendigtJahre: '2026-05-03',
  fristloseJahre: '2026-05-03',
  kuendigungSituationen: '2026-04-19',
  aufhebungsvertragDetail: '2026-04-27',
  abmahnungDetail: '2026-05-03',
  musterDetail: '2026-04-27',
  urteile: '2026-04-27',
  arbeitsrechtAnwalt: '2026-05-03',
  mandantenaufnahme: '2026-05-23',
  'mandantenaufnahme-kuendigung': '2026-05-15',

  // Content-Gap-Seiten (Phase 3 SEO)
  betriebsbedingteKuendigung: '2026-05-26',
  kuendigungsschutzklage: '2026-05-26',
  kuendigungsfristen: '2026-05-26',
  abfindungstabelle: '2026-05-26',
  kuendigungsschutzgesetzAnwendung: '2026-06-08',
  ratgeberArbeitsrecht: '2026-06-09',
} as const;

export type PageDateKey = keyof typeof PAGE_DATES;
