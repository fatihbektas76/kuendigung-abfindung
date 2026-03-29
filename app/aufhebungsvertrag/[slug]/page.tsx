import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { aufhebungsvertragData, getAufhebungsvertragEntry } from '@/lib/aufhebungsvertrag-data';
import { getAufhebungsvertragContent } from '@/lib/generated-aufhebungsvertrag-content';
import AufhebungsvertragSubContent from './content';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const revalidate = 86400;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return aufhebungsvertragData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getAufhebungsvertragEntry(params.slug);
  if (!entry) return {};
  const title = `${entry.h1} (${new Date().getFullYear()})`;
  const description = `${entry.h1} — ${entry.description} Kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.`;
  const url = `${SEO_CONFIG.baseUrl}/aufhebungsvertrag/${entry.slug}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: 'summary_large_image', title, description },
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
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/aufhebungsvertrag/${entry.slug}/`}
        pageTitle={entry.h1}
        pageDescription={entry.description}
        pageType="WebPage"
        speakableSelectors={['.faq-section']}
        breadcrumbs={[
          { name: 'Startseite', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Aufhebungsvertrag', url: `${SEO_CONFIG.baseUrl}/aufhebungsvertrag/` },
          { name: entry.h1, url: `${SEO_CONFIG.baseUrl}/aufhebungsvertrag/${entry.slug}/` },
        ]}
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
        praxistipp={generated.praxistipp}
      />
    </>
  );
}
