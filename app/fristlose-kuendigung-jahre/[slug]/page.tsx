import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { entries, getEntry, yearLabel } from '@/lib/betriebszugehoerigkeit';
import { getFristlosContentForYear } from '@/lib/generated-fristlos-content';
import FristlosContent from './content';

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
    title: `Fristlose Kündigung nach ${entry.word} ${entry.year === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit — wirksam? (2026)`,
    description: `Fristlose Kündigung nach ${yl} Betriebszugehörigkeit erhalten? Die meisten sind unwirksam. §626 BGB, Ihre Rechte, Abfindungschancen. Kostenlose Ersteinschätzung vom Fachanwalt.`,
    alternates: {
      canonical: `${BASE_URL}/fristlose-kuendigung-nach-${entry.slug}-betriebszugehoerigkeit/`,
    },
  };
}

export default function Page({ params }: Props) {
  const entry = getEntry(params.slug);
  if (!entry) notFound();

  const generated = getFristlosContentForYear(entry.year);
  if (!generated) notFound();

  const prev = entries.find((e) => e.year === entry.year - 1);
  const next = entries.find((e) => e.year === entry.year + 1);

  const yl = yearLabel(entry.year);
  const faqs = [
    { q: `Ist eine fristlose Kündigung nach ${yl} wirksam?`, a: generated.faqAnswers.wirksamkeit },
    { q: 'Was sind die Voraussetzungen für eine wirksame fristlose Kündigung?', a: generated.faqAnswers.voraussetzungen },
    { q: `Welche Abfindung ist nach ${yl} möglich?`, a: generated.faqAnswers.abfindung },
    { q: 'Wie lange habe ich Zeit gegen die fristlose Kündigung vorzugehen?', a: generated.faqAnswers.frist },
    { q: 'Bekomme ich noch Lohn nach fristloser Kündigung?', a: generated.faqAnswers.lohn },
  ];

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
                item: `${BASE_URL}/fristlose-kuendigung-nach-${entry.slug}-betriebszugehoerigkeit/`,
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

      <FristlosContent
        entry={entry}
        prev={prev ?? null}
        next={next ?? null}
        faqs={faqs}
        uniqueIntro={generated.uniqueIntro}
        rechtlicheVoraussetzungen={generated.rechtlicheVoraussetzungen}
        fallkonstellation={generated.fallkonstellation}
        praxistipp={generated.praxistipp}
        bagUrteil={generated.bagUrteil}
      />
    </>
  );
}
