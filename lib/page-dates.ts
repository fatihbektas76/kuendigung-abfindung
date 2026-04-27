/**
 * Single Source of Truth for dateModified across all pages.
 * Used by StandAnzeige (visible date) and SeoGeoBase / Article schema (JSON-LD).
 *
 * Update the relevant key when page content is materially changed.
 */
export const PAGE_DATES = {
  // Hub pages
  home: '2026-04-01',
  abfindung: '2026-04-01',
  kuendigung: '2026-04-01',
  aufhebungsvertrag: '2026-04-01',
  fristloseKuendigung: '2026-04-01',
  abmahnung: '2026-04-01',
  glossar: '2026-04-01',
  ratgeber: '2026-04-01',
  ratgeberUrteile: '2026-04-01',
  ratgeberMuster: '2026-04-01',
  tools: '2026-04-01',

  // Tool pages
  kuendigungPruefen: '2026-04-01',
  aufhebungsvertragPruefen: '2026-04-01',
  autor: '2026-04-01',

  // Template-level dates (all pages of this type share one date)
  abfindungJahre: '2026-04-01',
  gekuendigtJahre: '2026-04-01',
  fristloseJahre: '2026-04-01',
  kuendigungSituationen: '2026-04-01',
  aufhebungsvertragDetail: '2026-04-01',
  abmahnungDetail: '2026-04-01',
  musterDetail: '2026-04-01',
  urteile: '2026-04-01',
  arbeitsrechtAnwalt: '2026-04-01',
} as const;

export type PageDateKey = keyof typeof PAGE_DATES;
