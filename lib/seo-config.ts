import type { Metadata } from 'next';

/**
 * Zentrale Stammdaten für Marke, Kanzlei, Anwalt und Schema.org-Blöcke.
 * Jede Namens-, Adress-, Telefon- oder E-Mail-Angabe im Repository MUSS aus
 * diesem Modul gelesen werden – so bleibt die Außendarstellung von APOS Legal
 * über alle Seiten, Impressum, JSON-LD und llms.txt hinweg synchron.
 */

// — Marke / Rechtsträger / Kontakt ——————————————————————————————————————
export const BRAND_NAME = 'APOS Legal';
export const LEGAL_NAME = 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG';
export const FIRM_URL = 'https://apos.legal/';
export const FIRM_ID = 'https://apos.legal/#kanzlei';

export const PHONE_E164 = '+4962213214470';
export const PHONE_DISPLAY = '+49 6221 32144-70';
export const PHONE_TEL_HREF = `tel:${PHONE_E164}`;

export const CONTACT_EMAIL = 'info@apos.legal';
export const ATTORNEY_EMAIL = 'bektas@apos.legal';

export const FIRM_ADDRESS = {
  streetAddress: 'Am Paradeplatz 20',
  addressLocality: 'Heidelberg',
  postalCode: '69126',
  addressRegion: 'Baden-Württemberg',
  addressCountry: 'DE',
} as const;

/** Weitere Standorte der Kanzlei. Werden nur im Fließtext erwähnt – NICHT in
 *  den strukturierten Daten der Heidelberg-Seite (siehe Mandats-Spec Schritt 6). */
export const ADDITIONAL_LOCATIONS = ['Wiesloch', 'Berlin'] as const;

// — Nebenstandort Wiesloch ———————————————————————————————————————————————
// Eigenständige Niederlassung mit eigener Google-Business- und Bing-Places-
// Präsenz. Wird als zweiter LocalBusiness-Knoten mit parentOrganization auf
// die Haupt-Kanzlei (FIRM_ID) ausgespielt, nicht als zweite Firma.
export const WIESLOCH_ID = 'https://apos.legal/#standort-wiesloch';
export const WIESLOCH_PHONE_E164 = '+49622295992400';
export const WIESLOCH_PHONE_DISPLAY = '+49 6222 9599 2400';
export const WIESLOCH_TEL_HREF = `tel:${WIESLOCH_PHONE_E164}`;
export const WIESLOCH_ADDRESS = {
  streetAddress: 'Alte Bruchsaler Str. 28',
  addressLocality: 'Wiesloch',
  postalCode: '69168',
  addressRegion: 'Baden-Württemberg',
  addressCountry: 'DE',
} as const;
export const WIESLOCH_SAME_AS: readonly string[] = [
  'https://www.google.com/maps?cid=14604887148389395480',
  'https://www.bing.com/maps?ss=ypid.YNDD31F37350B230AA',
];

export const PERSON_ID = 'https://apos.legal/team/fatih-bektas/#person';

/**
 * sameAs-Liste für den LegalService. Jede URL ist ein unabhängig verifiziertes
 * Branchenbuch- oder Plattform-Profil derselben Kanzlei. ChatGPT, Perplexity
 * und Google nutzen diese Kreuzreferenzen für die Entity-Zuordnung. Reihenfolge:
 * eigene Domains → LinkedIn → Branchenbücher → Maps-Profile (Heidelberg, dann
 * Wiesloch).
 */
export const FIRM_SAME_AS: readonly string[] = [
  'https://apos.legal/',
  'https://www.gekuendigt-abfindung.de/',
  'https://www.linkedin.com/company/105863455',
  'https://www.anwalt.de/bektas',
  'https://www.google.com/maps?cid=18014939109388395127', // Google Business Profile Heidelberg
  'https://www.google.com/maps?cid=14604887148389395480', // Google Business Profile Wiesloch
  'https://www.bing.com/maps?ss=ypid.YNDD31F37350B230AA', // Bing Places Wiesloch
  // TODO: Bing Places Heidelberg (ypid) ergänzen, sobald vorhanden
];

export const SEO_CONFIG = {
  siteName: 'gekuendigt-abfindung.de',
  baseUrl: 'https://www.gekuendigt-abfindung.de',

  firm: {
    id: FIRM_ID,
    brandName: BRAND_NAME,
    legalName: LEGAL_NAME,
    url: FIRM_URL,
    phoneE164: PHONE_E164,
    phoneDisplay: PHONE_DISPLAY,
    telHref: PHONE_TEL_HREF,
    email: CONTACT_EMAIL,
    address: FIRM_ADDRESS,
    additionalLocations: ADDITIONAL_LOCATIONS,
    sameAs: FIRM_SAME_AS,
  },

  // Zweit-Niederlassung Wiesloch: eigenes Telefon, eigene Adresse, eigenes
  // Google-/Bing-Business-Profil. Wird auf /arbeitsrecht-anwalt/wiesloch/
  // ausgespielt und über parentOrganization an FIRM_ID gekoppelt.
  wieslochBranch: {
    id: WIESLOCH_ID,
    phoneE164: WIESLOCH_PHONE_E164,
    phoneDisplay: WIESLOCH_PHONE_DISPLAY,
    telHref: WIESLOCH_TEL_HREF,
    email: CONTACT_EMAIL,
    address: WIESLOCH_ADDRESS,
    sameAs: WIESLOCH_SAME_AS,
  },

  author: {
    id: PERSON_ID,
    name: 'Fatih Bektas',
    jobTitle: 'Rechtsanwalt und Fachanwalt für Arbeitsrecht',
    credential: 'Fachanwalt für Arbeitsrecht seit 2011',
    organization: 'Rechtsanwaltskammer Karlsruhe',
    telephone: PHONE_E164,
    email: ATTORNEY_EMAIL,
    memberOf: [
      { '@type': 'Organization' as const, name: 'Deutscher Anwaltverein' },
      { '@type': 'Organization' as const, name: 'BVAU' },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential' as const,
        credentialCategory: 'Fachanwalt für Arbeitsrecht',
        recognizedBy: {
          '@type': 'Organization' as const,
          name: 'Rechtsanwaltskammer Karlsruhe',
        },
        dateCreated: '2011',
      },
      {
        '@type': 'EducationalOccupationalCredential' as const,
        credentialCategory: 'Rechtsanwalt',
        recognizedBy: {
          '@type': 'Organization' as const,
          name: 'Rechtsanwaltskammer Karlsruhe',
        },
        dateCreated: '2005',
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

  /**
   * Site-weite Kanzlei-Repräsentation (LegalService). @id zeigt auf
   * apos.legal/#kanzlei, damit ChatGPT, Perplexity und Google die Entität
   * eindeutig der Kanzlei zuordnen – nicht der Microsite
   * gekuendigt-abfindung.de.
   */
  organization: {
    id: FIRM_ID,
    name: BRAND_NAME,
    legalName: LEGAL_NAME,
    url: FIRM_URL,
    description:
      'Fachanwalt für Arbeitsrecht: Kündigung prüfen, Abfindung maximieren, Aufhebungsvertrag verhandeln. Über 20 Jahre Arbeitsrecht-Erfahrung, Fachanwaltstitel seit 2011.',
    telephone: PHONE_E164,
    email: CONTACT_EMAIL,
    address: {
      ...FIRM_ADDRESS,
    },
    areaServed: [
      { '@type': 'City' as const, name: 'Heidelberg' },
      { '@type': 'AdministrativeArea' as const, name: 'Rhein-Neckar-Kreis' },
      { '@type': 'Country' as const, name: 'Germany' },
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
    sameAs: FIRM_SAME_AS,
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
