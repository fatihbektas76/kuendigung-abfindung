export interface FAQ {
  frage: string;
  antwort: string;
}

export interface StadtContent {
  slug: string;
  metaDescription: string;
  rechteSection: string;        // HTML
  vertretungSection: string;    // HTML
  arbeitsgerichtSection: string; // HTML
  verfahrensdauer: string;      // HTML – wie lange dauert ein Verfahren
  arbeitnehmerfreundlich: string; // HTML – ist das AG arbeitnehmerfreundlich
  faqs: FAQ[];
  generatedAt: string;
}

export interface GemeindeContent {
  slug: string;
  metaDescription: string;
  rechteSection: string;        // HTML
  vertretungSection: string;    // HTML
  arbeitsgerichtSection?: string; // HTML – optional, Fallback wird in der Page generiert
  faqs: FAQ[];
  generatedAt: string;
}
