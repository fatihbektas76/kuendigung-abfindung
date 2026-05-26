import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Abfindungsrechner ${new Date().getFullYear()} — Abfindung berechnen [Kostenlos + 3 Szenarien]`,
  description:
    `Abfindung berechnen: Faustformel 0,5 Gehälter pro Jahr + realistische Praxis-Szenarien. Kostenloser Rechner vom Fachanwalt — Ergebnis in 30 Sekunden.`,
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
