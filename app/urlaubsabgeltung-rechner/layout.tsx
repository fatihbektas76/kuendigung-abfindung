import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Urlaubsabgeltung berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Berechnen Sie kostenlos Ihren Urlaubsabgeltungsanspruch nach §7 Abs. 4 BUrlG. Sofortergebnis nach §11 BUrlG-Formel + kostenlose Ersteinschätzung vom Fachanwalt.',
  alternates: {
    canonical: `${BASE_URL}/urlaubsabgeltung-rechner`,
  },
  robots: 'index, follow',
  openGraph: {
    title: `Urlaubsabgeltung berechnen ${new Date().getFullYear()} — Kostenloser Rechner`,
    description:
      'Berechnen Sie kostenlos Ihren Urlaubsabgeltungsanspruch nach §7 Abs. 4 BUrlG. Sofortergebnis nach §11 BUrlG-Formel + kostenlose Ersteinschätzung vom Fachanwalt.',
    type: 'website',
    url: `${BASE_URL}/urlaubsabgeltung-rechner`,
    siteName: 'gekuendigt-abfindung.de',
  },
};

export default function UrlaubsabgeltungRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
