import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { entries, getEntry, yearLabel, generateFaqs } from '@/lib/betriebszugehoerigkeit';
import AbfindungJahreContent from './content';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEntry(params.slug);
  if (!entry) return {};
  const yl = yearLabel(entry.year);
  const lower = (0.5 * entry.year).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const upper = (1.5 * entry.year).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return {
    title: `Abfindung nach ${entry.word} ${entry.year === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit (2026)`,
    description: `Abfindung nach ${yl}: Zwischen ${lower} und ${upper} Monatsgehältern. Tabelle, Rechner und kostenlose Prüfung. Kündigungsfrist: ${entry.kuendigungsfrist}.`,
    alternates: {
      canonical: `${BASE_URL}/abfindung-nach-${entry.slug}-betriebszugehoerigkeit/`,
    },
  };
}

export default function Page({ params }: Props) {
  const entry = getEntry(params.slug);
  if (!entry) notFound();

  const prev = entries.find((e) => e.year === entry.year - 1);
  const next = entries.find((e) => e.year === entry.year + 1);
  const faqs = generateFaqs(entry);

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
              { '@type': 'ListItem', position: 2, name: 'Abfindung', item: `${BASE_URL}/abfindung` },
              {
                '@type': 'ListItem',
                position: 3,
                name: `Abfindung nach ${yearLabel(entry.year)}`,
                item: `${BASE_URL}/abfindung-nach-${entry.slug}-betriebszugehoerigkeit/`,
              },
            ],
          }),
        }}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />

      <AbfindungJahreContent
        entry={entry}
        prev={prev ?? null}
        next={next ?? null}
        faqs={faqs}
      />
    </>
  );
}
