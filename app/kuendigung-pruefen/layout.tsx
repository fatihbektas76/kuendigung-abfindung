import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Kündigung kostenlos prüfen lassen — in 2 Minuten (${new Date().getFullYear()})`,
  description:
    'Kündigung erhalten? Prüfen Sie kostenlos Ihre Abfindungschancen in 2 Minuten. Ersteinschätzung vom Fachanwalt für Arbeitsrecht — 100% kostenlos & unverbindlich.',
  path: '/kuendigung-pruefen',
});

export default function KuendigungPruefenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
