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
  metadataBase: new URL('https://www.german-litigation-lawyer.com'),
  title: {
    default: 'German Litigation for International Businesses — Sue or Defend in German Courts | APOS Legal',
    template: '%s | APOS Legal',
  },
  description:
    'Need a German lawyer for your court case? APOS Legal represents US and UK companies in German litigation — commercial disputes, employment claims, contract enforcement & arbitration. English-speaking. 20+ years experience.',
  keywords: [
    'German litigation lawyer',
    'sue in Germany',
    'German court representation',
    'commercial dispute Germany',
    'enforce contract Germany',
    'German employment lawsuit',
    'international arbitration Germany',
    'German attorney for foreign companies',
    'Rechtsanwalt English speaking',
    'lawyer Germany English',
  ],
  authors: [{ name: 'Fatih Bektas — Fachanwalt für Arbeitsrecht, APOS Legal' }],
  robots: 'index, follow, max-snippet:-1, max-image-preview:large',
  alternates: {
    canonical: 'https://www.german-litigation-lawyer.com/',
    languages: {
      en: 'https://www.german-litigation-lawyer.com/',
      'x-default': 'https://www.german-litigation-lawyer.com/',
    },
  },
  openGraph: {
    type: 'website',
    title: 'German Litigation for International Businesses — APOS Legal',
    description:
      'Your dispute is in Germany. Your lawyer should speak your language. We represent foreign companies in German courts and arbitration.',
    url: 'https://www.german-litigation-lawyer.com/',
    siteName: 'APOS Legal',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German Litigation for International Businesses — APOS Legal',
    description:
      'Sue or defend in German courts. English-speaking German attorneys. 20+ years experience.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        {/* Schema.org - LegalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'APOS Legal - Fatih Bektas',
              url: 'https://www.german-litigation-lawyer.com',
              description:
                'Legal representation for US and UK companies in German courts and arbitration proceedings',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Am Paradeplatz 20',
                addressLocality: 'Heidelberg',
                postalCode: '69126',
                addressCountry: 'DE',
              },
              telephone: '+4915127003173',
              email: 'bektas@apos.legal',
              areaServed: [
                { '@type': 'Country', name: 'United States' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'Germany' },
              ],
              serviceType: [
                'Commercial Litigation',
                'Employment Litigation',
                'Contract Enforcement',
                'Shareholder Disputes',
                'International Arbitration',
                'Judgment Enforcement',
                'Interim Injunctions',
              ],
              knowsLanguage: ['en', 'de'],
              founder: {
                '@type': 'Person',
                name: 'Fatih Bektas',
                jobTitle: 'Fachanwalt für Arbeitsrecht',
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
                'German-qualified specialist attorney with 20+ years litigation experience. Former FinTech CEO. Represents international businesses as plaintiff or defendant in German courts and arbitration proceedings.',
              url: 'https://www.german-litigation-lawyer.com',
              telephone: '+49-151-2700-3173',
              email: 'bektas@apos.legal',
              worksFor: { '@type': 'LegalService', name: 'APOS Legal' },
              knowsLanguage: ['en', 'de'],
              memberOf: [
                { '@type': 'Organization', name: 'Deutscher Anwaltsverein' },
                { '@type': 'Organization', name: 'BVAU' },
              ],
              hasCredential: [
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'Fachanwalt für Arbeitsrecht',
                },
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'Certified Mediator',
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
