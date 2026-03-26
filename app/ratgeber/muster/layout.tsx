import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Muster & Vorlagen Arbeitsrecht — kostenlos (${new Date().getFullYear()})`,
  description:
    'Kostenlose Muster & Vorlagen: Widerspruch Abmahnung, Gegendarstellung, Kündigungsschutzklage, Checkliste Aufhebungsvertrag. Vom Fachanwalt für Arbeitsrecht.',
  path: '/ratgeber/muster',
});

export default function MusterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
