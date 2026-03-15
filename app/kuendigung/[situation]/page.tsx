import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { lebenssituationData, getLebenssituation } from '@/lib/lebenssituation-data';
import { getLebenssituationContent } from '@/lib/generated-lebenssituation-content';
import LebenssituationContent from './content';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

type Props = { params: { situation: string } };

export function generateStaticParams() {
  return lebenssituationData.map((e) => ({ situation: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getLebenssituation(params.situation);
  if (!entry) return {};
  return {
    title: `${entry.h1} (2026)`,
    description: `${entry.h1} — Ihre Rechte nach ${entry.gesetz}, 3-Wochen-Klagefrist, Abfindungschancen. Kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.`,
    alternates: {
      canonical: `${BASE_URL}/kuendigung/${entry.slug}/`,
    },
  };
}

export default function Page({ params }: Props) {
  const entry = getLebenssituation(params.situation);
  if (!entry) notFound();

  const generated = getLebenssituationContent(entry.slug);
  if (!generated) notFound();

  const faqs = [
    { q: `Welchen besonderen Schutz habe ich in dieser Situation?`, a: generated.faqAnswers.schutz },
    { q: 'Welche Fristen gelten für mich?', a: generated.faqAnswers.frist },
    { q: 'Welche Abfindung ist realistisch?', a: generated.faqAnswers.abfindung },
    { q: 'Wie soll ich jetzt konkret vorgehen?', a: generated.faqAnswers.vorgehen },
    { q: 'Was kostet eine Kündigungsschutzklage?', a: generated.faqAnswers.kosten },
  ];

  // Find 3 thematically related pages for internal nav
  const related = lebenssituationData
    .filter((e) => e.slug !== entry.slug)
    .slice(0, 3);

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
                name: entry.h1,
                item: `${BASE_URL}/kuendigung/${entry.slug}/`,
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

      <LebenssituationContent
        entry={entry}
        related={related}
        faqs={faqs}
        uniqueIntro={generated.uniqueIntro}
        besondererSchutz={generated.besondererSchutz}
        fallkonstellation={generated.fallkonstellation}
        praxistipp={generated.praxistipp}
        bagUrteil={generated.bagUrteil}
      />
    </>
  );
}
