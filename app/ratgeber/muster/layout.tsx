import type { Metadata } from 'next';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const metadata: Metadata = {
  title: `Muster & Vorlagen Arbeitsrecht — kostenlos (${new Date().getFullYear()})`,
  description:
    'Kostenlose Muster & Vorlagen: Widerspruch Abmahnung, Gegendarstellung, Kündigungsschutzklage, Checkliste Aufhebungsvertrag. Vom Fachanwalt für Arbeitsrecht.',
  alternates: {
    canonical: `${BASE_URL}/ratgeber/muster`,
  },
};

export default function MusterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
