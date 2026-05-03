import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Aufhebungsvertrag prüfen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Aufhebungsvertrag erhalten? Prüfen Sie ob Ihr Vertrag fair ist — Ampelbewertung in 3 Minuten + kostenlose Ersteinschätzung vom Fachanwalt.',
  path: '/aufhebungsvertrag-pruefen',
});

export default function AufhebungsvertragPruefenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
