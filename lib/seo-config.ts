import type { Metadata } from 'next';

export const SEO_CONFIG = {
  siteName: 'gekuendigt-abfindung.de',
  baseUrl: 'https://www.gekuendigt-abfindung.de',

  author: {
    name: 'Fatih Bektas',
    jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
    credential: 'Fachanwalt für Arbeitsrecht seit 2011',
    organization: 'Rechtsanwaltskammer Karlsruhe',
    telephone: '+4915127003173',
    email: 'bektas@apos.legal',
    memberOf: [
      { '@type': 'Organization' as const, name: 'Deutscher Anwaltverein' },
      { '@type': 'Organization' as const, name: 'BVAU' },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential' as const,
        credentialCategory: 'Fachanwalt für Arbeitsrecht',
      },
      {
        '@type': 'EducationalOccupationalCredential' as const,
        credentialCategory: 'Zertifizierter Mediator',
      },
    ],
    sameAs: [
      'https://www.anwalt.de/fatihbektas',
      'https://www.gekuendigt-abfindung.de/team',
    ],
  },

  organization: {
    id: 'https://www.gekuendigt-abfindung.de/#organization',
    name: 'APOS Legal — Kanzlei Fatih Bektas',
    legalName: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
    url: 'https://www.gekuendigt-abfindung.de',
    description:
      'Fachanwalt für Arbeitsrecht: Kündigung prüfen, Abfindung maximieren, Aufhebungsvertrag verhandeln. 20+ Jahre Erfahrung, 2.000+ Verfahren.',
    telephone: '+4915127003173',
    email: 'bektas@apos.legal',
    address: {
      streetAddress: 'Am Paradeplatz 20',
      addressLocality: 'Heidelberg',
      postalCode: '69126',
      addressCountry: 'DE',
    },
    areaServed: { '@type': 'Country' as const, name: 'Germany' },
    serviceType: [
      'Kündigungsschutzklage',
      'Abfindung verhandeln',
      'Aufhebungsvertrag prüfen',
      'Fristlose Kündigung anfechten',
      'Abmahnung prüfen',
      'Zeugnis & Abschlussregelungen',
    ],
    knowsLanguage: ['de', 'en'],
  },

  rating: {
    ratingValue: '5.0',
    reviewCount: '68',
    bestRating: '5',
    worstRating: '1',
  },
} as const;

export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const canonical = `${SEO_CONFIG.baseUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
