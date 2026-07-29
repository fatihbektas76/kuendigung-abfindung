import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `RVG Rechner ${new Date().getFullYear()}: Was kostet mich ein Anwalt? (kostenlos)`,
  description:
    `Was kostet mich ein Anwalt wirklich? Der RVG Rechner ${new Date().getFullYear()} zeigt Anwalts- und Gerichtskosten nach Streitwert — für Arbeitsrecht & Zivilrecht. Kostenlos, mit PDF-Export.`,
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
