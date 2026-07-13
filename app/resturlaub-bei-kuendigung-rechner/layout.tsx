import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

const year = new Date().getFullYear();

export const metadata = buildMetadata({
  title: `Resturlaub bei Kündigung Rechner ${year} — § 5 BUrlG [Kostenlos]`,
  description: `Resturlaub bei Kündigung ${year} kostenlos berechnen nach § 5 BUrlG. 1. Halbjahr, 2. Halbjahr, Pro-rata-Klausel — mit Fallbeispiel + Urlaubsabgeltung. Vom Fachanwalt.`,
  path: '/resturlaub-bei-kuendigung-rechner',
});

export default function ResturlaubRechnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
