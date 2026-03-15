import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { abmahnungEntries, getAbmahnungEntry, abmahnungLabel } from '@/lib/abmahnung-content';
import { getAbmahnungContentForCount } from '@/lib/generated-abmahnung-content';
import AbmahnungContent from './content';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return abmahnungEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getAbmahnungEntry(params.slug);
  if (!entry) return {};
  const label = abmahnungLabel(entry.count);
  return {
    title: `Kündigung nach ${entry.word} ${entry.count === 1 ? 'Abmahnung' : 'Abmahnungen'} — wirksam oder nicht? (2026)`,
    description: `Kündigung nach ${label} erhalten? Ist die Kündigung wirksam? Formfehler prüfen, Kündigungsschutzklage, Abfindungschancen. Kostenlose Ersteinschätzung vom Fachanwalt.`,
    alternates: {
      canonical: `${BASE_URL}/kuendigung-nach-${entry.slug}/`,
    },
  };
}

export default function Page({ params }: Props) {
  const entry = getAbmahnungEntry(params.slug);
  if (!entry) notFound();

  const generated = getAbmahnungContentForCount(entry.count);
  if (!generated) notFound();

  const prev = abmahnungEntries.find((e) => e.count === entry.count - 1);
  const next = abmahnungEntries.find((e) => e.count === entry.count + 1);

  const label = abmahnungLabel(entry.count);
  const faqs = [
    { q: `Ist die Kündigung nach ${label} wirksam?`, a: generated.faqAnswers.wirksamkeit },
    { q: 'Welche Formfehler machen die Abmahnung unwirksam?', a: generated.faqAnswers.formfehler },
    { q: `Habe ich trotz Abmahnung Anspruch auf Abfindung?`, a: generated.faqAnswers.abfindung },
    { q: 'Soll ich der Abmahnung widersprechen?', a: generated.faqAnswers.widerspruch },
    { q: 'Gilt mein Kündigungsschutz trotz Abmahnung?', a: generated.faqAnswers.kuendigungsschutz },
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
                name: `Kündigung nach ${label}`,
                item: `${BASE_URL}/kuendigung-nach-${entry.slug}/`,
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

      <AbmahnungContent
        entry={entry}
        prev={prev ?? null}
        next={next ?? null}
        faqs={faqs}
        uniqueIntro={generated.uniqueIntro}
        rechtlicheGrundlagen={generated.rechtlicheGrundlagen}
        fallkonstellation={generated.fallkonstellation}
        praxistipp={generated.praxistipp}
        bagUrteil={generated.bagUrteil}
      />
    </>
  );
}
