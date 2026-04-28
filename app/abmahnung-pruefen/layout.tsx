import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Abmahnung prüfen — Ist Ihre Abmahnung wirksam? | kostenfrei (${new Date().getFullYear()})`,
  description:
    'Prüfen Sie kostenfrei, ob Ihre Abmahnung wirksam ist. 14 Fragen, sofortiges Ergebnis mit BAG-Rechtsprechung & PDF-Auswertung. Erstellt von Fachanwalt für Arbeitsrecht.',
  path: '/abmahnung-pruefen',
});

export default function AbmahnungPruefenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
