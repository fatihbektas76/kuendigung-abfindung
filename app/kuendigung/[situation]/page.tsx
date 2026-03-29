import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { lebenssituationData, getLebenssituation } from '@/lib/lebenssituation-data';
import { getLebenssituationContent } from '@/lib/generated-lebenssituation-content';
import LebenssituationContent from './content';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const revalidate = 86400;

type Props = { params: { situation: string } };

export function generateStaticParams() {
  return lebenssituationData.map((e) => ({ situation: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getLebenssituation(params.situation);
  if (!entry) return {};
  const title = `${entry.h1} (${new Date().getFullYear()})`;
  const description = `${entry.h1} — Ihre Rechte nach ${entry.gesetz}, 3-Wochen-Klagefrist, Abfindungschancen. Kostenlose Ersteinschätzung vom Fachanwalt für Arbeitsrecht.`;
  const url = `${SEO_CONFIG.baseUrl}/kuendigung/${entry.slug}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: 'summary_large_image', title, description },
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
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/kuendigung/${entry.slug}/`}
        pageTitle={entry.h1}
        pageDescription={`${entry.h1} — Ihre Rechte, 3-Wochen-Klagefrist, Abfindungschancen. Kostenlose Ersteinschätzung vom Fachanwalt.`}
        pageType="WebPage"
        speakableSelectors={['.faq-section']}
        breadcrumbs={[
          { name: 'Startseite', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung/` },
          { name: entry.h1, url: `${SEO_CONFIG.baseUrl}/kuendigung/${entry.slug}/` },
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

      <LebenssituationContent
        entry={entry}
        related={related}
        faqs={faqs}
        uniqueIntro={generated.uniqueIntro}
        besondererSchutz={generated.besondererSchutz}
        praxistipp={generated.praxistipp}
      />
    </>
  );
}
