import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { musterPages, getMusterPage } from '@/lib/muster-data';
import { musterContent } from '@/lib/generated-muster-content';
import { getMusterPageContent } from '@/lib/generated-muster-page-content';
import MusterPageContent from './content';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return musterPages.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getMusterPage(params.slug);
  if (!entry) return {};
  return {
    title: `${entry.h1} — kostenlos (2026)`,
    description: entry.description,
    alternates: {
      canonical: `${BASE_URL}/ratgeber/muster/${entry.slug}`,
    },
  };
}

export default function Page({ params }: Props) {
  const entry = getMusterPage(params.slug);
  if (!entry) notFound();

  const generated = getMusterPageContent(entry.slug);
  if (!generated) notFound();

  const original = (musterContent as unknown as Record<string, { title: string; intro: string; muster?: string; punkte?: string[] }>)[entry.contentKey];
  if (!original) notFound();

  const faqs = [
    { q: entry.type === 'muster' ? 'Kann ich das Muster direkt so verwenden?' : 'Kann ich die Checkliste alleine durchgehen?', a: generated.faqAnswers.verwendung },
    { q: entry.type === 'muster' ? 'Was muss ich im Muster unbedingt anpassen?' : 'Was mache ich, wenn ein Punkt nicht zutrifft?', a: generated.faqAnswers.anpassung },
    { q: 'Welche Fristen muss ich beachten?', a: generated.faqAnswers.frist },
    { q: 'Brauche ich trotzdem einen Anwalt?', a: generated.faqAnswers.anwalt },
    { q: 'Was kostet die anwaltliche Beratung?', a: generated.faqAnswers.kosten },
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
              { '@type': 'ListItem', position: 1, name: 'Start', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: `${BASE_URL}/ratgeber` },
              { '@type': 'ListItem', position: 3, name: 'Muster & Vorlagen', item: `${BASE_URL}/ratgeber/muster` },
              { '@type': 'ListItem', position: 4, name: entry.h1, item: `${BASE_URL}/ratgeber/muster/${entry.slug}` },
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

      <MusterPageContent
        entry={entry}
        original={original}
        generated={generated}
        faqs={faqs}
      />
    </>
  );
}
