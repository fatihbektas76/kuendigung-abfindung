import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `RVG Rechner ${new Date().getFullYear()} — Anwaltskosten & Gerichtskosten berechnen [Kostenlos]`,
  description:
    `Anwaltskosten berechnen nach RVG ${new Date().getFullYear()}: Gebühren, Gerichtskosten & Prozesskostenrisiko. Für Arbeitsrecht, Zivilrecht & alle Instanzen. Mit PDF-Export.`,
  path: '/rvg-rechner',
});

export default function RvgRechnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
