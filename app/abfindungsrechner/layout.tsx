import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Abfindung berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Abfindung berechnen — kostenloser Abfindungsrechner mit Erfahrungswerten aus der Praxis. Drei Szenarien in 30 Sekunden. Vom Fachanwalt für Arbeitsrecht.',
  path: '/abfindungsrechner',
});

export default function AbfindungsrechnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
