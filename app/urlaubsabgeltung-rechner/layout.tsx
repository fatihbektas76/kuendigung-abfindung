import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Urlaubsabgeltung berechnen ${new Date().getFullYear()} — Resturlaub in Euro [Kostenloser Rechner]`,
  description:
    `Urlaubsabgeltung ${new Date().getFullYear()} berechnen: Resturlaub nach §7 BUrlG in Euro umrechnen. Sofortergebnis — Fachanwalt prüft Ihren Anspruch kostenlos.`,
  path: '/urlaubsabgeltung-rechner',
});

export default function UrlaubsabgeltungRechnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
