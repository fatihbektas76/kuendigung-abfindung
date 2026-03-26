import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Urlaub Teilzeit berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Berechnen Sie kostenlos Ihren Urlaubsanspruch in Teilzeit. Sofortergebnis nach der Pro-rata-temporis-Formel + kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.',
  alternates: {
    canonical: `${BASE_URL}/urlaub-teilzeit-rechner`,
  },
  robots: 'index, follow',
  openGraph: {
    title: `Urlaub Teilzeit berechnen ${new Date().getFullYear()} — Kostenloser Rechner`,
    description:
      'Berechnen Sie kostenlos Ihren Urlaubsanspruch in Teilzeit. Sofortergebnis nach der Pro-rata-temporis-Formel + kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.',
    type: 'website',
    url: `${BASE_URL}/urlaub-teilzeit-rechner`,
    siteName: 'gekuendigt-abfindung.de',
  },
};

export default function UrlaubTeilzeitRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
