import type { Metadata } from 'next';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/severance-net-calculator/`;

export const metadata: Metadata = {
  title: `German Severance Net Calculator with Fünftelregelung ${new Date().getFullYear()}`,
  description:
    'Free calculator for the net amount of a German severance payment. Includes the one-fifth rule (§ 34 EStG), solidarity surcharge and church tax. Based on the 2025 income-tax tariff.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/abfindung-netto-rechner/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/abfindung-netto-rechner/`,
    },
  },
  openGraph: {
    type: 'website',
    title: `German Severance Net Calculator with Fünftelregelung ${new Date().getFullYear()}`,
    description:
      'What stays net from your German severance? Income tax, Soli, church tax with the Fünftelregelung (§ 34 EStG).',
    url: PAGE_URL,
    siteName: SEO_CONFIG.siteName,
    locale: 'en',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
