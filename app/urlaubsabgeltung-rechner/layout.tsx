import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Urlaubsabgeltung Rechner ${new Date().getFullYear()}: Wie viel Euro für Resturlaub?`,
  description:
    `Wie viel Geld bekommen Sie für nicht genommenen Urlaub bei Kündigung? Kostenloser Rechner ${new Date().getFullYear()} zeigt Ihren Anspruch nach § 7 BUrlG in Euro — Fachanwalt prüft kostenlos.`,
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
