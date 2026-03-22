import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { entries, getEntry, yearLabel } from '@/lib/betriebszugehoerigkeit';
import { getKuendigungContentForYear } from '@/lib/generated-kuendigung-content';
import GekuendigtContent from './content';

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

  const generated = getKuendigungContentForYear(entry.year);
  if (!generated) notFound();

  const prev = entries.find((e) => e.year === entry.year - 1);
  const next = entries.find((e) => e.year === entry.year + 1);

  const yl = yearLabel(entry.year);
  const faqs = [
    { q: `Was soll ich jetzt tun nach der Kündigung nach ${yl}?`, a: generated.faqAnswers.wasJetzt },
    { q: 'Wie lange habe ich Zeit gegen die Kündigung vorzugehen?', a: generated.faqAnswers.frist },
    { q: `Habe ich Anspruch auf Abfindung nach ${yl}?`, a: generated.faqAnswers.abfindung },
    { q: `Wie lange ist meine Kündigungsfrist nach ${yl}?`, a: generated.faqAnswers.kuendigungsfristDetails },
    { q: 'Wann muss ich mich arbeitslos melden?', a: generated.faqAnswers.arbeitslosengeld },
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
                name: `Gekündigt nach ${yl}`,
                item: `${BASE_URL}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/`,
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
        faqs={faqs}
        uniqueIntro={generated.uniqueIntro}
        sofortmassnahmen={generated.sofortmassnahmen}
        praxistipp={generated.praxistipp}
      />
    </>
  );
}
