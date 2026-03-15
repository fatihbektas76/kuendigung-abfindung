import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { aufhebungsvertragData, getAufhebungsvertragEntry } from '@/lib/aufhebungsvertrag-data';
import { getAufhebungsvertragContent } from '@/lib/generated-aufhebungsvertrag-content';
import AufhebungsvertragSubContent from './content';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return aufhebungsvertragData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getAufhebungsvertragEntry(params.slug);
  if (!entry) return {};
  return {
    title: `${entry.h1} (2026)`,
    description: `${entry.h1} — ${entry.description} Kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.`,
    alternates: {
      canonical: `${BASE_URL}/aufhebungsvertrag/${entry.slug}/`,
    },
  };
}

export default function Page({ params }: Props) {
  const entry = getAufhebungsvertragEntry(params.slug);
  if (!entry) notFound();

  const generated = getAufhebungsvertragContent(entry.slug);
  if (!generated) notFound();

  const faqs = [
    { q: entry.h1.replace(/ — .*$/, '') + ' — was muss ich wissen?', a: generated.faqAnswers.grundsatz },
    { q: 'Wie vermeidet man die Sperrzeit beim Aufhebungsvertrag?', a: generated.faqAnswers.sperrzeit },
    { q: 'Welche Abfindung ist realistisch?', a: generated.faqAnswers.abfindung },
    { q: 'Welche Fristen gelten beim Aufhebungsvertrag?', a: generated.faqAnswers.frist },
    { q: 'Was sind die größten Risiken?', a: generated.faqAnswers.risiken },
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
              { '@type': 'ListItem', position: 2, name: 'Aufhebungsvertrag', item: `${BASE_URL}/aufhebungsvertrag` },
              {
                '@type': 'ListItem',
                position: 3,
                name: entry.h1,
                item: `${BASE_URL}/aufhebungsvertrag/${entry.slug}/`,
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

      <AufhebungsvertragSubContent
        entry={entry}
        faqs={faqs}
        uniqueIntro={generated.uniqueIntro}
        hauptteil={generated.hauptteil}
        fallkonstellation={generated.fallkonstellation}
        praxistipp={generated.praxistipp}
        bagUrteil={generated.bagUrteil}
      />
    </>
  );
}
