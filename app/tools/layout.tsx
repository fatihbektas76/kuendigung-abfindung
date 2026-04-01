import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Arbeitsrecht Tools & Rechner — kostenlos nutzen (${new Date().getFullYear()})`,
  description:
    'Kostenlose Arbeitsrechts-Tools: Abfindungsrechner, Kündigungscheck, Aufhebungsvertrag-Checker & mehr. Fachanwalt für Arbeitsrecht.',
  path: '/tools',
});

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
