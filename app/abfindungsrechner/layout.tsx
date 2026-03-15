import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const metadata: Metadata = {
  title: 'Abfindungsrechner – kostenlos & sofort (2026)',
  description:
    'Kostenloser Abfindungsrechner: Berechnen Sie Ihre Abfindung nach Kündigung in 30 Sekunden. Drei Szenarien – Minimum, Regelformel, Maximum. Vom Fachanwalt für Arbeitsrecht.',
  alternates: {
    canonical: `${BASE_URL}/abfindungsrechner`,
  },
};

export default function AbfindungsrechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
