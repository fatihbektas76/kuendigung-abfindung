import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: 'Schwellenwert §23 KSchG berechnen | Kostenlos | APOS Legal',
  description:
    'Schwellenwert berechnen — gilt das KSchG für Ihren Betrieb? Kostenloser Rechner nach §23 KSchG. Sofortergebnis.',
  path: '/schwellenwert-rechner',
});

export default function SchwellenwertRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
