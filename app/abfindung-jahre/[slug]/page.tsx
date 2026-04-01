import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { activeEntries, getEntry, yearLabel } from '@/lib/betriebszugehoerigkeit';
import AbfindungJahreContent from './content';
import abfindungData from '@/data/generated/abfindung-data.json';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const revalidate = 86400;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return activeEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEntry(params.slug);
  if (!entry) return {};
  const yl = yearLabel(entry.year);
  const lower = (0.5 * entry.year).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const upper = (1.5 * entry.year).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const title = `Abfindung nach ${entry.word} ${entry.year === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit (${new Date().getFullYear()})`;
  const description = `Abfindung nach ${yl}: ${lower}–${upper} Monatsgehälter. Rechner, Tabelle & kostenlose Prüfung vom Fachanwalt.`;
  const url = `${SEO_CONFIG.baseUrl}/abfindung-nach-${entry.slug}-betriebszugehoerigkeit/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function Page({ params }: Props) {
  const entry = getEntry(params.slug);
  if (!entry) notFound();

  const yearData = (abfindungData as Record<string, unknown>)[String(entry.year)] as {
    beispielsfall: {
      initialen: string;
      name: string;
      branche: string;
      gehalt: number;
      kuendigungsart: string;
      zitat: string;
      geprueft: string[];
      vorgehen: string[];
      ergebnis: number;
    };
    faqs: { frage: string; antwort: string }[];
  };
  if (!yearData) notFound();

  const prev = activeEntries.find((e) => e.year === entry.year - 1);
  const next = activeEntries.find((e) => e.year === entry.year + 1);

  const yl = yearLabel(entry.year);
  const pageUrl = `${SEO_CONFIG.baseUrl}/abfindung-nach-${entry.slug}-betriebszugehoerigkeit/`;

  return (
    <>
      <SeoGeoBase
        pageType="WebPage"
        pageUrl={pageUrl}
        pageTitle={`Abfindung nach ${yl}`}
        pageDescription={`Abfindung nach ${yl} Betriebszugehörigkeit`}
        speakableSelectors={['.fakt-box', '.faq-list', '.abfindung-formel']}
        breadcrumbs={[
          { name: 'Startseite', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Abfindung', url: `${SEO_CONFIG.baseUrl}/abfindung/` },
          { name: `Abfindung nach ${yl}`, url: pageUrl },
        ]}
      />

      {/* Schema.org - FAQPage (8 Fragen) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: yearData.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.frage,
              acceptedAnswer: { '@type': 'Answer', text: faq.antwort },
            })),
          }),
        }}
      />

      <AbfindungJahreContent
        entry={entry}
        prev={prev ?? null}
        next={next ?? null}
        yearData={yearData}
      />
    </>
  );
}
