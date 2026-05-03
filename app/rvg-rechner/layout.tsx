import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `RVG Rechner ${new Date().getFullYear()} — Anwaltskosten berechnen | APOS Legal`,
  description:
    'Kostenloser RVG-Rechner: Anwaltsgebühren, Gerichtskosten & Prozesskostenrisiko berechnen. Für alle Instanzen.',
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
