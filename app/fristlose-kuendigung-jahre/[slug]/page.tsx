import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { entries, getEntry, yearLabel } from '@/lib/betriebszugehoerigkeit';
import FristlosContent from './content';
import fristloseData from '@/data/generated/fristlose-data.json';

export const revalidate = 86400;

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEntry(params.slug);
  if (!entry) return {};
  const yl = yearLabel(entry.year);
  return {
    title: `Fristlose Kündigung nach ${entry.word} ${entry.year === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit — wirksam? (${new Date().getFullYear()})`,
    description: `Fristlose Kündigung nach ${yl} Betriebszugehörigkeit erhalten? Die meisten sind unwirksam. §626 BGB, Ihre Rechte, Abfindungschancen. Kostenlose Ersteinschätzung vom Fachanwalt.`,
    alternates: {
      canonical: `${BASE_URL}/fristlose-kuendigung-nach-${entry.slug}-betriebszugehoerigkeit/`,
    },
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
  const pageUrl = `${BASE_URL}/fristlose-kuendigung-nach-${entry.slug}-betriebszugehoerigkeit/`;

  return (
    <>
      {/* Schema.org - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Kündigung', item: `${BASE_URL}/kuendigung` },
              {
                '@type': 'ListItem',
                position: 3,
                name: `Fristlose Kündigung nach ${yl}`,
                item: pageUrl,
              },
            ],
          }),
        }}
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

      {/* Schema.org - WebPage with dateModified + speakable */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            url: pageUrl,
            dateModified: '2026-03-01',
            datePublished: '2025-01-15',
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['.fakt-box', '.faq-list'],
            },
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
