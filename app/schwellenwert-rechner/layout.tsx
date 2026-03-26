import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: 'Schwellenwert §23 KSchG berechnen | Kostenlos | APOS Legal',
  description:
    'Schwellenwert berechnen — prüfen Sie kostenlos, ob das Kündigungsschutzgesetz (KSchG) für Ihren Betrieb gilt. Berechnung nach §23 KSchG mit Vollzeitäquivalenten.',
  path: '/schwellenwert-rechner',
});

export default function SchwellenwertRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
