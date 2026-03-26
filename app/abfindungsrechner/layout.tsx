import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const metadata: Metadata = {
  title: `Abfindung berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Abfindung berechnen — kostenloser Abfindungsrechner mit Erfahrungswerten aus der Praxis. Drei Szenarien in 30 Sekunden. Vom Fachanwalt für Arbeitsrecht.',
  alternates: {
    canonical: `${BASE_URL}/abfindungsrechner`,
  },
};

export default function AbfindungsrechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
