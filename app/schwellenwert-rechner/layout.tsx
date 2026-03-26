import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const metadata: Metadata = {
  title: 'Schwellenwert §23 KSchG berechnen | Kostenlos | APOS Legal',
  description:
    'Schwellenwert berechnen — prüfen Sie kostenlos, ob das Kündigungsschutzgesetz (KSchG) für Ihren Betrieb gilt. Berechnung nach §23 KSchG mit Vollzeitäquivalenten.',
  alternates: {
    canonical: `${BASE_URL}/schwellenwert-rechner`,
  },
};

export default function SchwellenwertRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
