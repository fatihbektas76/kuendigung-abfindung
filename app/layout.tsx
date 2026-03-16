import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import LayoutClient from '@/components/LayoutClient';

const playfair = localFont({
  src: [
    { path: '../public/fonts/playfair-latin.woff2', weight: '400 800', style: 'normal' },
    { path: '../public/fonts/playfair-italic-latin.woff2', weight: '400', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-serif',
});

const sourceSans = localFont({
  src: [
    { path: '../public/fonts/sourcesans-latin.woff2', weight: '300 700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gekuendigt-abfindung.de'),
  title: {
    default: 'Gekündigt? Abfindung & Kündigungsschutz – Fachanwalt für Arbeitsrecht',
    template: '%s | gekuendigt-abfindung.de',
  },
  description:
    'Fachanwalt für Arbeitsrecht: Kündigung prüfen, Abfindung maximieren, Aufhebungsvertrag verhandeln. Kostenlose Ersteinschätzung. 20+ Jahre Erfahrung, 2.000+ Verfahren.',
  keywords: [
    'Kündigung erhalten',
    'Abfindung nach Kündigung',
    'Kündigungsschutzklage',
    'Aufhebungsvertrag prüfen',
    'Fachanwalt Arbeitsrecht',
    'Abfindung berechnen',
    'fristlose Kündigung',
    'Abfindungsrechner',
    'Kündigungsschutzgesetz',
    'Arbeitsrecht Anwalt',
  ],
  authors: [{ name: 'Fatih Bektas — Fachanwalt für Arbeitsrecht, APOS Legal' }],
  robots: 'index, follow, max-snippet:-1, max-image-preview:large',
  alternates: {
    canonical: 'https://www.gekuendigt-abfindung.de/',
  },
  openGraph: {
    type: 'website',
    title: 'Gekündigt? Abfindung & Kündigungsschutz – Fachanwalt für Arbeitsrecht',
    description:
      'Kündigung erhalten? Fachanwalt für Arbeitsrecht prüft Ihren Fall kostenlos. Abfindung maximieren, Aufhebungsvertrag verhandeln. 20+ Jahre Erfahrung.',
    url: 'https://www.gekuendigt-abfindung.de/',
    siteName: 'gekuendigt-abfindung.de',
    locale: 'de_DE',
    images: [
      {
        url: 'https://www.gekuendigt-abfindung.de/og-image.png',
        width: 1200,
        height: 630,
        alt: 'gekuendigt-abfindung.de – Fachanwalt für Arbeitsrecht',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gekündigt? Abfindung & Kündigungsschutz – Fachanwalt für Arbeitsrecht',
    description:
      'Kündigung prüfen, Abfindung maximieren. Fachanwalt für Arbeitsrecht. 20+ Jahre Erfahrung.',
    images: ['https://www.gekuendigt-abfindung.de/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#A68B4B',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" dir="ltr" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        {/* Schema.org - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'gekuendigt-abfindung.de',
              alternateName: 'Gekündigt? Abfindung & Kündigungsschutz',
              url: 'https://www.gekuendigt-abfindung.de',
              inLanguage: 'de-DE',
              publisher: {
                '@type': 'Organization',
                name: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
                url: 'https://www.gekuendigt-abfindung.de',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.gekuendigt-abfindung.de/ratgeber?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {/* Schema.org - LegalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'gekuendigt-abfindung.de – Fachanwalt für Arbeitsrecht',
              url: 'https://www.gekuendigt-abfindung.de',
              description:
                'Fachanwalt für Arbeitsrecht: Kündigung prüfen, Abfindung maximieren, Aufhebungsvertrag verhandeln. 20+ Jahre Erfahrung, 2.000+ Verfahren.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Am Paradeplatz 20',
                addressLocality: 'Heidelberg',
                postalCode: '69126',
                addressCountry: 'DE',
              },
              telephone: '+4915127003173',
              email: 'bektas@apos.legal',
              areaServed: { '@type': 'Country', name: 'Germany' },
              serviceType: [
                'Kündigungsschutzklage',
                'Abfindung verhandeln',
                'Aufhebungsvertrag prüfen',
                'Fristlose Kündigung anfechten',
                'Abmahnung prüfen',
                'Zeugnis & Abschlussregelungen',
              ],
              knowsLanguage: ['de', 'en'],
              founder: {
                '@type': 'Person',
                name: 'Fatih Bektas',
                jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                bestRating: '5',
                worstRating: '1',
                ratingCount: '68',
                url: 'https://www.anwalt.de/bektas',
              },
            }),
          }}
        />

        {/* Schema.org - Attorney */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Attorney',
              name: 'Fatih Bektas',
              jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
              description:
                'Fachanwalt für Arbeitsrecht mit über 20 Jahren Erfahrung. Spezialisiert auf Kündigung, Abfindung und Aufhebungsvertrag. Über 2.000 erfolgreiche Verfahren.',
              url: 'https://www.gekuendigt-abfindung.de',
              telephone: '+49-151-2700-3173',
              email: 'bektas@apos.legal',
              worksFor: { '@type': 'LegalService', name: 'gekuendigt-abfindung.de' },
              knowsLanguage: ['de', 'en'],
              memberOf: [
                { '@type': 'Organization', name: 'Deutscher Anwaltverein' },
                { '@type': 'Organization', name: 'BVAU' },
              ],
              hasCredential: [
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'Fachanwalt für Arbeitsrecht',
                },
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'Zertifizierter Mediator',
                },
              ],
            }),
          }}
        />


      </head>
      <body className="font-sans text-ink bg-white leading-relaxed">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
