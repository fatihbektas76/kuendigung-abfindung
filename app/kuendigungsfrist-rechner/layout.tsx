import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Kündigungsfrist berechnen ${new Date().getFullYear()} | Kostenlos | APOS Legal`,
  description:
    'Kündigungsfrist berechnen — kostenloser Rechner nach §622 BGB. Taggenau, zum Monatsende oder Quartalsende. Sofortergebnis + kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.',
  alternates: {
    canonical: `${BASE_URL}/kuendigungsfrist-rechner`,
  },
};

export default function KuendigungsfristRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
