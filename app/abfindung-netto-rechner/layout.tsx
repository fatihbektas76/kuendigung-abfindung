import type { Metadata } from 'next';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/abfindung-netto-rechner/`;

export const metadata: Metadata = {
  title: `Abfindung Netto Rechner mit Fünftelregelung ${new Date().getFullYear()} | ${SEO_CONFIG.siteName}`,
  description:
    'Kostenloser Netto-Rechner für Abfindungen: ESt, Soli, Kirchensteuer mit Fünftelregelung (§ 34 EStG). Steuertarif 2025. Zeigt Ersparnis durch die Fünftelregelung und das Netto nach allen Abzügen.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': PAGE_URL,
      'en': `${SEO_CONFIG.baseUrl}/en/severance-net-calculator/`,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    type: 'website',
    title: `Abfindung Netto Rechner mit Fünftelregelung ${new Date().getFullYear()}`,
    description:
      'Was bleibt netto von Ihrer Abfindung übrig? Berechnung inkl. Fünftelregelung (§ 34 EStG), Soli und Kirchensteuer.',
    url: PAGE_URL,
    siteName: SEO_CONFIG.siteName,
    locale: 'de_DE',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
