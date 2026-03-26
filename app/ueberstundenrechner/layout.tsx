import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Überstundenvergütung berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Überstunden berechnen — kostenloser Rechner für Stundenlohn und Überstundenvergütung. Sofortergebnis + kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.',
  path: '/ueberstundenrechner',
});

export default function UeberstundenrechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
