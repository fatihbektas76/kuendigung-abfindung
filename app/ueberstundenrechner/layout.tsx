import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Überstundenrechner ${new Date().getFullYear()} — Stundenlohn & Vergütung berechnen`,
  description:
    'Berechnen Sie kostenlos Ihren Stundenlohn und ausstehende Überstundenvergütung. Sofortergebnis + kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.',
  alternates: {
    canonical: `${BASE_URL}/ueberstundenrechner`,
  },
};

export default function UeberstundenrechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
