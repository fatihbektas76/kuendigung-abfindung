import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Abfindung berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Abfindung berechnen — kostenloser Abfindungsrechner mit Erfahrungswerten aus der Praxis. Drei Szenarien in 30 Sekunden. Vom Fachanwalt für Arbeitsrecht.',
  path: '/abfindungsrechner',
});

export default function AbfindungsrechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
