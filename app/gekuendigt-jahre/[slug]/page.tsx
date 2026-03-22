import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { entries, getEntry, yearLabel } from '@/lib/betriebszugehoerigkeit';
import GekuendigtContent from './content';
import gekuendigtData from '@/data/generated/gekuendigt-data.json';

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
    title: `Gekündigt nach ${entry.word} ${entry.year === 1 ? 'Jahr' : 'Jahren'} – Was jetzt? (${new Date().getFullYear()})`,
    description: `Kündigung nach ${yl} Betriebszugehörigkeit erhalten? Sofortmaßnahmen, 3-Wochen-Frist, Abfindungschancen. Kündigungsfrist: ${entry.kuendigungsfrist}. Kostenlose Ersteinschätzung.`,
    alternates: {
      canonical: `${BASE_URL}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/`,
    },
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
                name: `Gekündigt nach ${yl}`,
                item: `${BASE_URL}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/`,
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

      {/* Schema.org - WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            url: `${BASE_URL}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/`,
            dateModified: new Date().toISOString(),
            datePublished: '2025-01-15',
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
