import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const metadata: Metadata = {
  title: 'Kündigung kostenlos prüfen lassen — in 2 Minuten (2026)',
  description:
    'Kündigung erhalten? Prüfen Sie kostenlos Ihre Abfindungschancen in 2 Minuten. Ersteinschätzung vom Fachanwalt für Arbeitsrecht — 100% kostenlos & unverbindlich.',
  alternates: {
    canonical: `${BASE_URL}/kuendigung-pruefen`,
  },
};

export default function KuendigungPruefenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
