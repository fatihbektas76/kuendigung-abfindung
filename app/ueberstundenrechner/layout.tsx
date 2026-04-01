import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Überstunden berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Überstunden berechnen — Stundenlohn & Überstundenvergütung kostenlos ermitteln. Sofortergebnis vom Fachanwalt.',
  path: '/ueberstundenrechner',
});

export default function UeberstundenrechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
