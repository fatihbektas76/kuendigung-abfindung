import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { entries, getEntry, yearLabel } from '@/lib/betriebszugehoerigkeit';
import { getContentForYear } from '@/lib/generated-content';
import AbfindungJahreContent from './content';

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
  const lower = (0.5 * entry.year).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const upper = (1.5 * entry.year).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return {
    title: `Abfindung nach ${entry.word} ${entry.year === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit (${new Date().getFullYear()})`,
    description: `Abfindung nach ${yl}: Zwischen ${lower} und ${upper} Monatsgehältern. Tabelle, Rechner und kostenlose Prüfung. Kündigungsfrist: ${entry.kuendigungsfrist}.`,
    alternates: {
      canonical: `${BASE_URL}/abfindung-nach-${entry.slug}-betriebszugehoerigkeit/`,
    },
  };
}

export default function Page({ params }: Props) {
  const entry = getEntry(params.slug);
  if (!entry) notFound();

  const generated = getContentForYear(entry.year);
  const prev = entries.find((e) => e.year === entry.year - 1);
  const next = entries.find((e) => e.year === entry.year + 1);

  const yl = yearLabel(entry.year);
  const faqs = generated
    ? [
        { q: `Gibt es einen Anspruch auf Abfindung nach ${yl}?`, a: generated.faqAnswers.anspruch },
        { q: `Was ist meine Kündigungsfrist nach ${yl}?`, a: generated.faqAnswers.kuendigungsfrist },
        { q: `Wie hoch ist meine Abfindung nach ${yl}?`, a: generated.faqAnswers.hoehe },
        { q: 'Bekomme ich eine Abfindung als Teilzeitkraft oder Minijobber?', a: generated.faqAnswers.teilzeit },
        { q: 'Muss ich die Abfindung versteuern?', a: generated.faqAnswers.steuer },
      ]
    : [];

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

      {/* Schema.org - WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            url: `${BASE_URL}/abfindung-nach-${entry.slug}-betriebszugehoerigkeit/`,
            dateModified: new Date().toISOString(),
            datePublished: '2025-01-15',
          }),
        }}
      />

      <AbfindungJahreContent
        entry={entry}
        prev={prev ?? null}
        next={next ?? null}
        faqs={faqs}
        uniqueIntro={generated?.uniqueIntro ?? ''}
        praxistipp={generated?.praxistipp ?? ''}
      />
    </>
  );
}
