import type { Metadata } from 'next';

export const SEO_CONFIG = {
  siteName: 'gekuendigt-abfindung.de',
  baseUrl: 'https://www.gekuendigt-abfindung.de',

  author: {
    name: 'Fatih Bektas',
    jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
    credential: 'Fachanwalt für Arbeitsrecht seit 2011',
    organization: 'Rechtsanwaltskammer Karlsruhe',
    telephone: '+49622295992400',
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
      'https://www.linkedin.com/in/fatihbektas',
      'https://www.gekuendigt-abfindung.de/team/',
    ],
  },

  organization: {
    id: 'https://www.gekuendigt-abfindung.de/#organization',
    name: 'APOS Legal — Kanzlei Fatih Bektas',
    legalName: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
    url: 'https://www.gekuendigt-abfindung.de/',
    description:
      'Fachanwalt für Arbeitsrecht: Kündigung prüfen, Abfindung maximieren, Aufhebungsvertrag verhandeln. 20+ Jahre Erfahrung, 2.000+ Verfahren.',
    telephone: '+49622295992400',
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

  reviews: [
    {
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: 'Mandant' },
      datePublished: '2025-11-15',
      reviewBody: 'Herr Bektas hat meine Kündigung erfolgreich angefochten und eine deutlich höhere Abfindung verhandelt als ursprünglich angeboten. Sehr kompetent und schnell.',
      reviewRating: { '@type': 'Rating' as const, ratingValue: '5', bestRating: '5' },
    },
    {
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: 'Mandantin' },
      datePublished: '2025-09-22',
      reviewBody: 'Ausgezeichnete Beratung zum Aufhebungsvertrag. Die Sperrzeit konnte vermieden und die Abfindung verdoppelt werden. Klare Empfehlung.',
      reviewRating: { '@type': 'Rating' as const, ratingValue: '5', bestRating: '5' },
    },
    {
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: 'Mandant' },
      datePublished: '2025-07-10',
      reviewBody: 'Schnelle Reaktion trotz knapper 3-Wochen-Frist. Kündigungsschutzklage eingereicht, Vergleich mit guter Abfindung erzielt. Sehr professionell.',
      reviewRating: { '@type': 'Rating' as const, ratingValue: '5', bestRating: '5' },
    },
  ],
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
  const canonical = `${SEO_CONFIG.baseUrl}${path}${path.endsWith('/') ? '' : '/'}`;
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
