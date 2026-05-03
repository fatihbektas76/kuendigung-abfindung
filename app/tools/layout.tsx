import { buildMetadata } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Arbeitsrecht Tools & Rechner — kostenlos nutzen (${new Date().getFullYear()})`,
  description:
    'Kostenlose Arbeitsrechts-Tools: Abfindungsrechner, Kündigungscheck, Aufhebungsvertrag-Checker & mehr. Fachanwalt für Arbeitsrecht.',
  path: '/tools',
});

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="max-w-content mx-auto px-8 pb-6">
        <StandAnzeige />
      </div>
    </>
  );
}
