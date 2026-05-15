import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: 'Mandantenaufnahme — Digitale Beauftragung',
  description:
    'Digitale Mandantenaufnahme: Geben Sie Ihre Daten ein und beauftragen Sie APOS Legal direkt online. Schnell, sicher und DSGVO-konform.',
  path: '/mandantenaufnahme',
});

export default function MandantenaufnahmeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
