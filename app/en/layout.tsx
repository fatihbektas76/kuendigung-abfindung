import type { Metadata } from 'next';

/**
 * Segment layout for the English tree. Overrides metadata that the root
 * layout would otherwise set in German, and gives every /en/* page the
 * correct default canonical/OpenGraph values.
 *
 * The root `<html>` element and global chrome (Navigation, Footer, etc.)
 * still come from app/layout.tsx — it detects the locale from the
 * pathname header set in middleware.ts.
 */

const EN_BASE = 'https://www.gekuendigt-abfindung.de/en';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gekuendigt-abfindung.de'),
  title: {
    default:
      'Dismissed in Germany? Severance & Unfair Dismissal — German Employment Lawyer',
    template: '%s | gekuendigt-abfindung.de',
  },
  description:
    'German employment-law specialist for English speakers: check your dismissal, maximise severance, negotiate termination agreements. Free initial review. 20+ years of experience, 2,000+ cases.',
  keywords: [
    'dismissal Germany',
    'severance pay Germany',
    'Kündigungsschutzklage English',
    'German employment lawyer English',
    'termination agreement Germany',
    'unfair dismissal Germany',
    'severance calculator Germany',
    'summary dismissal Germany',
    'Aufhebungsvertrag English',
    'employment law Germany',
  ],
  authors: [{ name: 'Fatih Bektas — German employment-law specialist, APOS Legal' }],
  robots: 'index, follow, max-snippet:-1, max-image-preview:large',
  alternates: {
    canonical: `${EN_BASE}/`,
    languages: {
      'de-DE': 'https://www.gekuendigt-abfindung.de/',
      'en': `${EN_BASE}/`,
      'x-default': 'https://www.gekuendigt-abfindung.de/',
    },
  },
  openGraph: {
    type: 'website',
    title: 'Dismissed in Germany? Severance & Unfair Dismissal — Employment Lawyer',
    description:
      'German employment-law specialist for English speakers. Free case review, maximise severance, navigate termination agreements.',
    url: `${EN_BASE}/`,
    siteName: 'gekuendigt-abfindung.de',
    locale: 'en_GB',
    images: [
      {
        url: 'https://www.gekuendigt-abfindung.de/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'gekuendigt-abfindung.de — German employment lawyer for English speakers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dismissed in Germany? Severance & Unfair Dismissal',
    description:
      'German employment-law specialist for English speakers. Free initial review.',
    images: ['https://www.gekuendigt-abfindung.de/opengraph-image'],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
