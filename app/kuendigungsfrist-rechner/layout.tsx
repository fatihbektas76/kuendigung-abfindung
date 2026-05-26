import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Kündigungsfrist berechnen ${new Date().getFullYear()} — nach §622 BGB [Taggenauer Rechner]`,
  description:
    `Kündigungsfrist ${new Date().getFullYear()} berechnen: Taggenau nach §622 BGB. Zum 15., Monatsende oder Quartalsende. Sofortergebnis + Fachanwalt-Prüfung kostenlos.`,
  path: '/kuendigungsfrist-rechner',
});

export default function KuendigungsfristRechnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
