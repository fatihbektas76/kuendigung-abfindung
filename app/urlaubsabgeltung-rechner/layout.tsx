import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Urlaubsabgeltung berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Berechnen Sie kostenlos Ihren Urlaubsabgeltungsanspruch nach §7 Abs. 4 BUrlG. Sofortergebnis nach §11 BUrlG-Formel + kostenlose Ersteinschätzung vom Fachanwalt.',
  path: '/urlaubsabgeltung-rechner',
});

export default function UrlaubsabgeltungRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
