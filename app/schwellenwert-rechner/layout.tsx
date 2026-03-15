import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const metadata: Metadata = {
  title: 'Schwellenwert-Rechner §23 KSchG – KSchG gilt für Sie?',
  description:
    'Prüfen Sie kostenlos, ob das Kündigungsschutzgesetz für Ihren Betrieb gilt. Schwellenwert-Rechner nach §23 KSchG mit Vollzeitäquivalenten.',
  alternates: {
    canonical: `${BASE_URL}/schwellenwert-rechner`,
  },
};

export default function SchwellenwertRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
