import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { entries, getEntry, yearLabel } from '@/lib/betriebszugehoerigkeit';
import FristlosContent from './content';
import fristloseData from '@/data/generated/fristlose-data.json';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const revalidate = 86400;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEntry(params.slug);
  if (!entry) return {};
  const yl = yearLabel(entry.year);
  const title = `Fristlose Kündigung nach ${entry.word} ${entry.year === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit — wirksam? (${new Date().getFullYear()})`;
  const description = `Fristlose Kündigung nach ${yl} Betriebszugehörigkeit erhalten? Die meisten sind unwirksam. §626 BGB, Ihre Rechte, Abfindungschancen. Kostenlose Ersteinschätzung vom Fachanwalt.`;
  const url = `${SEO_CONFIG.baseUrl}/fristlose-kuendigung-nach-${entry.slug}-betriebszugehoerigkeit/`;
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

  const yearData = (fristloseData as Record<string, unknown>)[String(entry.year)] as {
    beispielsfall: {
      initialen: string;
      name: string;
      branche: string;
      gehalt: number;
      kuendigungsgrund: string;
      zitat: string;
      geprueft: string[];
      vorgehen: string[];
      ergebnis: number;
    };
    faqs: { frage: string; antwort: string }[];
  };
  if (!yearData) notFound();

  const prev = entries.find((e) => e.year === entry.year - 1);
  const next = entries.find((e) => e.year === entry.year + 1);

  const yl = yearLabel(entry.year);
  const pageUrl = `${SEO_CONFIG.baseUrl}/fristlose-kuendigung-nach-${entry.slug}-betriebszugehoerigkeit/`;

  return (
    <>
      <SeoGeoBase
        pageType="WebPage"
        pageUrl={pageUrl}
        pageTitle={`Fristlose Kündigung nach ${yl}`}
        pageDescription={`Fristlose Kündigung nach ${yl} Betriebszugehörigkeit`}
        speakableSelectors={['.fakt-box', '.faq-list']}
        breadcrumbs={[
          { name: 'Startseite', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung/` },
          { name: `Fristlose Kündigung nach ${yl}`, url: pageUrl },
        ]}
      />

      {/* Schema.org - FAQPage (7 Fragen) */}
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

      <FristlosContent
        entry={entry}
        prev={prev ?? null}
        next={next ?? null}
        yearData={yearData}
      />
    </>
  );
}
