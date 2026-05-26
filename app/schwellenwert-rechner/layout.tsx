import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Schwellenwert-Rechner KSchG ${new Date().getFullYear()} — Gilt der Kündigungsschutz für Sie?`,
  description:
    `Kündigungsschutz prüfen: Schwellenwert nach §23 KSchG berechnen. Ab 10,25 Vollzeitäquivalenten gilt das KSchG. Kostenloser Rechner mit Sofortergebnis.`,
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
