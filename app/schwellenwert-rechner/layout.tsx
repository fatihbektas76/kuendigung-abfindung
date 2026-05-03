import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Schwellenwert §23 KSchG berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Schwellenwert berechnen — gilt das KSchG für Ihren Betrieb? Kostenloser Rechner nach §23 KSchG. Sofortergebnis.',
  path: '/schwellenwert-rechner',
});

export default function SchwellenwertRechnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
