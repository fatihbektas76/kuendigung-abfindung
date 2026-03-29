import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { musterPages, getMusterPage } from '@/lib/muster-data';
import { musterContent } from '@/lib/generated-muster-content';
import { getMusterPageContent } from '@/lib/generated-muster-page-content';
import MusterPageContent from './content';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const revalidate = 86400;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return musterPages.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getMusterPage(params.slug);
  if (!entry) return {};
  return {
    title: `${entry.h1} — kostenlos (${new Date().getFullYear()})`,
    description: entry.description,
    alternates: {
      canonical: `${SEO_CONFIG.baseUrl}/ratgeber/muster/${entry.slug}/`,
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
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/ratgeber/muster/${entry.slug}/`}
        pageTitle={entry.h1}
        pageDescription={entry.description}
        pageType="WebPage"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['.faq-section']}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber/` },
          { name: 'Muster & Vorlagen', url: `${SEO_CONFIG.baseUrl}/ratgeber/muster/` },
          { name: entry.h1, url: `${SEO_CONFIG.baseUrl}/ratgeber/muster/${entry.slug}/` },
        ]}
      />

      {/* Schema.org - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: entry.h1,
            datePublished: '2025-01-15',
            dateModified: new Date().toISOString().slice(0, 10),
            description: entry.description,
            author: {
              '@type': 'Person',
              name: 'Fatih Bektas',
              jobTitle: 'Fachanwalt für Arbeitsrecht',
              url: `${SEO_CONFIG.baseUrl}/team/`,
            },
            publisher: {
              '@id': `${SEO_CONFIG.baseUrl}/#organization`,
            },
            mainEntityOfPage: `${SEO_CONFIG.baseUrl}/ratgeber/muster/${entry.slug}/`,
            inLanguage: 'de',
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
