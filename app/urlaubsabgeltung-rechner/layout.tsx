import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Urlaubsabgeltung berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Urlaubsabgeltung berechnen nach §7 Abs. 4 BUrlG. Kostenloser Rechner mit Sofortergebnis. Fachanwalt prüft Ihren Anspruch.',
  path: '/urlaubsabgeltung-rechner',
});

export default function UrlaubsabgeltungRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
