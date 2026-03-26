import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Urlaub Teilzeit berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Berechnen Sie kostenlos Ihren Urlaubsanspruch in Teilzeit. Sofortergebnis nach der Pro-rata-temporis-Formel + kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.',
  path: '/urlaub-teilzeit-rechner',
});

export default function UrlaubTeilzeitRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
