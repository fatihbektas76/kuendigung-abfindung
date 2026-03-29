import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { entries, getEntry, yearLabel } from '@/lib/betriebszugehoerigkeit';
import GekuendigtContent from './content';
import gekuendigtData from '@/data/generated/gekuendigt-data.json';
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
  const title = `Gekündigt nach ${entry.word} ${entry.year === 1 ? 'Jahr' : 'Jahren'} – Was jetzt? (${new Date().getFullYear()})`;
  const description = `Kündigung nach ${yl} Betriebszugehörigkeit erhalten? Sofortmaßnahmen, 3-Wochen-Frist, Abfindungschancen. Kündigungsfrist: ${entry.kuendigungsfrist}. Kostenlose Ersteinschätzung.`;
  const url = `${SEO_CONFIG.baseUrl}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/`;
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

  const yearData = (gekuendigtData as Record<string, unknown>)[String(entry.year)] as {
    kuendigungsfristKurz: string;
    kuendigungsfristLang: string;
    kuendigungsfristHinweis: string;
    kschgGilt: boolean;
    haeufigeFehler: string[];
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

  const prev = entries.find((e) => e.year === entry.year - 1);
  const next = entries.find((e) => e.year === entry.year + 1);

  const yl = yearLabel(entry.year);

  return (
    <>
      <SeoGeoBase
        pageType="WebPage"
        pageUrl={`${SEO_CONFIG.baseUrl}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/`}
        pageTitle={`Gekündigt nach ${yl}`}
        pageDescription={`Kündigung nach ${yl} Betriebszugehörigkeit`}
        speakableSelectors={['.fakt-box', '.faq-list']}
        breadcrumbs={[
          { name: 'Startseite', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung/` },
          { name: `Gekündigt nach ${yl}`, url: `${SEO_CONFIG.baseUrl}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/` },
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

      <GekuendigtContent
        entry={entry}
        prev={prev ?? null}
        next={next ?? null}
        yearData={yearData}
      />
    </>
  );
}
