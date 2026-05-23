import { buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: 'Mandantenaufnahme Kündigung — Digitale Beauftragung',
  description:
    'Digitale Mandantenaufnahme bei Kündigung: Geben Sie Ihre Daten ein und beauftragen Sie APOS Legal direkt online. Schnell, sicher und DSGVO-konform.',
  path: '/mandantenaufnahme-kuendigung',
});

export default function MandantenaufnahmeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mandantenaufnahme-standalone">
      {children}
    </div>
  );
}
