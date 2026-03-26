import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Arbeitsrecht Tools & Rechner — kostenlos nutzen (${new Date().getFullYear()})`,
  description:
    'Kostenlose Arbeitsrechts-Tools: Abfindungsrechner, Kündigungscheck & mehr. Sofortige Ersteinschätzung vom Fachanwalt für Arbeitsrecht — 100% kostenlos & unverbindlich.',
  alternates: {
    canonical: `${BASE_URL}/tools`,
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
