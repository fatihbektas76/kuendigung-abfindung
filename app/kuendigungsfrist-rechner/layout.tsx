import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Kündigungsfrist berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Kündigungsfrist berechnen — kostenloser Rechner nach §622 BGB. Taggenau, zum Monatsende oder Quartalsende. Sofortergebnis + kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.',
  path: '/kuendigungsfrist-rechner',
});

export default function KuendigungsfristRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
