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
      'https://www.linkedin.com/in/fatih-bektas',
      'https://www.gekuendigt-abfindung.de/team/',
      'https://www.gekuendigt-abfindung.de/autor/fatih-bektas/',
    ],
  },

  organization: {
    id: 'https://www.gekuendigt-abfindung.de/#organization',
    name: 'APOS Legal — Kanzlei Fatih Bektas',
    legalName: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
    url: 'https://www.gekuendigt-abfindung.de/',
    description:
      'Fachanwalt für Arbeitsrecht: Kündigung prüfen, Abfindung maximieren, Aufhebungsvertrag verhandeln. Über 20 Jahre Arbeitsrecht-Erfahrung, Fachanwaltstitel seit 2011.',
    telephone: '+49622295992400',
    email: 'bektas@apos.legal',
    address: {
      streetAddress: 'Am Paradeplatz 20',
      addressLocality: 'Heidelberg',
      postalCode: '69126',
      addressCountry: 'DE',
    },
    areaServed: [
      { '@type': 'Country' as const, name: 'Germany' },
      { '@type': 'AdministrativeArea' as const, name: 'Berlin' },
      { '@type': 'AdministrativeArea' as const, name: 'Hamburg' },
      { '@type': 'AdministrativeArea' as const, name: 'München' },
      { '@type': 'AdministrativeArea' as const, name: 'Köln' },
      { '@type': 'AdministrativeArea' as const, name: 'Frankfurt am Main' },
      { '@type': 'AdministrativeArea' as const, name: 'Stuttgart' },
      { '@type': 'AdministrativeArea' as const, name: 'Düsseldorf' },
      { '@type': 'AdministrativeArea' as const, name: 'Dortmund' },
      { '@type': 'AdministrativeArea' as const, name: 'Leipzig' },
      { '@type': 'AdministrativeArea' as const, name: 'Hannover' },
      { '@type': 'AdministrativeArea' as const, name: 'Nürnberg' },
      { '@type': 'AdministrativeArea' as const, name: 'Heidelberg' },
    ],
    serviceType: [
      'Kündigungsschutzklage',
      'Abfindung verhandeln',
      'Aufhebungsvertrag prüfen',
      'Fristlose Kündigung anfechten',
      'Abmahnung prüfen',
      'Zeugnis & Abschlussregelungen',
      'Executive Severance — Geschäftsführer-Dienstvertrag',
      'Vorstandsabberufung und Vorstandsvertrag',
      'Leitende Angestellte — Trennungsvereinbarung',
      'Variable Vergütung, Bonus und D&O-Fragen',
      'Englischsprachige Beratung für internationale Arbeitnehmer',
    ],
    knowsLanguage: ['de', 'en'],
    audience: [
      { '@type': 'Audience' as const, audienceType: 'Arbeitnehmer' },
      { '@type': 'Audience' as const, audienceType: 'Leitende Angestellte' },
      { '@type': 'Audience' as const, audienceType: 'Geschäftsführer' },
      { '@type': 'Audience' as const, audienceType: 'Vorstandsmitglieder' },
      { '@type': 'Audience' as const, audienceType: 'English-speaking employees in Germany' },
    ],
    availableLanguage: [
      { '@type': 'Language' as const, name: 'Deutsch', alternateName: 'de' },
      { '@type': 'Language' as const, name: 'English', alternateName: 'en' },
    ],
  },

  // TODO: Quellenangabe für die Bewertungszahl sichtbar machen und Hinweis zur
  // Echtheitsprüfung nach § 5b Abs. 3 UWG ergänzen. Aktuell werden ratingValue
  // und reviewCount im JSON-LD ausgespielt; das sichtbare Rating-Badge sollte
  // einen Link "Quelle: anwalt.de/fatihbektas" tragen.
  rating: {
    ratingValue: '5.0',
    reviewCount: '69',
    bestRating: '5',
    worstRating: '1',
  },

  // Verifizierte Mandantenbewertungen von anwalt.de/fatihbektas. Übernommen
  // aus components/Testimonials.tsx; Namen auf Initialen gekürzt wie auf dem
  // Original-Profil. Publisher = anwalt.de, damit Suchmaschinen die Quelle
  // der Rezensionen eindeutig zuordnen können.
  reviews: [
    {
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: 'E. J.' },
      datePublished: '2023-10-24',
      reviewBody: 'Als mein Arbeitgeber Ende letzten Jahres auf mich zukam, um mir mitzuteilen, dass er das Arbeitsverhältnis beenden wolle und mir im gleichen Zuge einen Aufhebungsvertrag anbot, wandte ich mich glücklicherweise an Rechtsanwalt Bektas. Auf Empfehlung von Herrn Bektas habe ich den Aufhebungsvertrag nicht unterschrieben und es stattdessen auf eine Kündigung ankommen lassen. Im Laufe des Kündigungsschutzverfahrens konnten wir uns mit dem Arbeitgeber einigen. Herr Bektas hat aufgrund seines Verhandlungsgeschickes die ursprünglich angebotene Abfindung fast verdoppelt.',
      reviewRating: { '@type': 'Rating' as const, ratingValue: '5', bestRating: '5' },
      publisher: { '@type': 'Organization' as const, name: 'anwalt.de', url: 'https://www.anwalt.de/fatihbektas' },
    },
    {
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: 'A. U.' },
      datePublished: '2023-11-13',
      reviewBody: 'Als klar wurde, dass mich mein ehemaliger Arbeitgeber loswerden und aus dem Unternehmen „herausmanagen" wollte, bin ich auf persönliche Empfehlung zum Glück an Herrn Bektas geraten. Er hat mir zu einer eher unkonventionellen Reaktion auf die Aktivitäten meines ehemaligen Arbeitgebers geraten, die letztlich mit einer üppigen Abfindung (Einigung vor Gericht) belohnt wurde. In den vergangenen Monaten stand er mir mit seiner ruhigen und sachlichen Art zudem mental zur Seite und hat letztlich alle Winkelzüge der Gegenseite vorhergesagt und vorbeugend entgegengewirkt.',
      reviewRating: { '@type': 'Rating' as const, ratingValue: '5', bestRating: '5' },
      publisher: { '@type': 'Organization' as const, name: 'anwalt.de', url: 'https://www.anwalt.de/fatihbektas' },
    },
    {
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: 'D. J.' },
      datePublished: '2024-03-06',
      reviewBody: 'Ich habe mich von Fatih Bektas bezüglich meines Aufhebungsvertrages und dessen optimaler Gestaltung beraten lassen. Herr Bektas hat mich sehr professionell (und vor allem sehr kurzfristig) beraten und alle Aspekte auch für mich als Laien sehr verständlich erläutert. Ich würde jederzeit wieder Herrn Bektas aufsuchen und kann ihn daher jedem nur weiterempfehlen.',
      reviewRating: { '@type': 'Rating' as const, ratingValue: '5', bestRating: '5' },
      publisher: { '@type': 'Organization' as const, name: 'anwalt.de', url: 'https://www.anwalt.de/fatihbektas' },
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
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
