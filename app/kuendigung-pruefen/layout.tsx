import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Kündigung kostenlos prüfen lassen — in 2 Minuten (${new Date().getFullYear()})`,
  description:
    'Kündigung erhalten? Prüfen Sie kostenlos Ihre Abfindungschancen in 2 Minuten. Ersteinschätzung vom Fachanwalt.',
  path: '/kuendigung-pruefen',
});

export default function KuendigungPruefenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
