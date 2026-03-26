import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Kündigungsfrist berechnen ${new Date().getFullYear()} — Wann endet mein Arbeitsverhältnis?`,
  description:
    'Berechnen Sie kostenlos Ihre genaue Kündigungsfrist nach §622 BGB. Taggenau, zum Monatsende oder Quartalsende — sofortiges Ergebnis + kostenlose Ersteinschätzung vom Fachanwalt.',
  alternates: {
    canonical: `${BASE_URL}/kuendigungsfrist-rechner`,
  },
};

export default function KuendigungsfristRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
