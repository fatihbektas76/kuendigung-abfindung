import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Urlaub Teilzeit berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Urlaubsanspruch in Teilzeit berechnen. Kostenloser Rechner nach Pro-rata-temporis-Formel. Sofortergebnis.',
  path: '/urlaub-teilzeit-rechner',
});

export default function UrlaubTeilzeitRechnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
