import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Anteiliger Urlaubsanspruch ${new Date().getFullYear()}: Wieviel Urlaub steht mir zu?`,
  description:
    `Wieviel Urlaub steht Ihnen im Ausscheidejahr zu? Kostenloser Rechner nach § 5 BUrlG — mit Halbjahres-Regel, Wartezeit und Aufrundung. Fachanwalt prüft kostenlos.`,
  path: '/anteiliger-urlaubsanspruch-rechner',
});

export default function AnteiligerUrlaubsanspruchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
