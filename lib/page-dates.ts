/**
 * Single Source of Truth for dateModified across all pages.
 * Used by StandAnzeige (visible date) and SeoGeoBase / Article schema (JSON-LD).
 *
 * Update the relevant key when page content is materially changed.
 */
export const PAGE_DATES = {
  // Hub pages
  home: '2026-05-03',
  abfindung: '2026-05-03',
  kuendigung: '2026-05-03',
  aufhebungsvertrag: '2026-05-03',
  fristloseKuendigung: '2026-05-03',
  abmahnung: '2026-05-03',
  glossar: '2026-05-03',
  ratgeber: '2026-05-03',
  ratgeberUrteile: '2026-05-03',
  ratgeberMuster: '2026-05-03',
  tools: '2026-05-03',

  // Tool pages
  kuendigungPruefen: '2026-05-03',
  aufhebungsvertragPruefen: '2026-05-03',
  autor: '2026-05-03',

  // Template-level dates (all pages of this type share one date)
  abfindungJahre: '2026-05-03',
  gekuendigtJahre: '2026-05-03',
  fristloseJahre: '2026-05-03',
  kuendigungSituationen: '2026-05-03',
  aufhebungsvertragDetail: '2026-05-03',
  abmahnungDetail: '2026-05-03',
  musterDetail: '2026-05-03',
  urteile: '2026-05-03',
  arbeitsrechtAnwalt: '2026-05-03',
} as const;

export type PageDateKey = keyof typeof PAGE_DATES;
