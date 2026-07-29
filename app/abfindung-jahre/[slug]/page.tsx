import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { entries, getEntry, yearLabel } from '@/lib/betriebszugehoerigkeit';
import AbfindungJahreContent from './content';
import abfindungData from '@/data/generated/abfindung-data.json';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';
import { PAGE_DATES } from '@/lib/page-dates';
import { generateArticleSchema } from '@/lib/article-schema';

const ABFINDUNG_ISBASEDON = [
  { name: '§ 1a KSchG — Abfindungsanspruch bei betriebsbedingter Kündigung', url: 'https://www.gesetze-im-internet.de/kschg/__1a.html' },
  { name: '§ 10 KSchG — Höhe der Abfindung', url: 'https://www.gesetze-im-internet.de/kschg/__10.html' },
  { name: '§ 34 EStG — Fünftelregelung', url: 'https://www.gesetze-im-internet.de/estg/__34.html' },
];

export const revalidate = 86400;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEntry(params.slug);
  if (!entry) return {};
  const yl = yearLabel(entry.year);
  const eurFaustformel = (4000 * 0.5 * entry.year).toLocaleString('de-DE');
  const title = `Abfindung nach ${yl}: ca. ${eurFaustformel} € bei 4.000 € Gehalt (${new Date().getFullYear()})`;
  const description = `Nach ${yl} Betriebszugehörigkeit bekommen Sie ca. ${eurFaustformel} € Abfindung (Faustformel bei 4.000 € Gehalt). Bei guter Verhandlung deutlich mehr — Rechner + Fachanwalt prüft kostenlos.`;
  const url = `${SEO_CONFIG.baseUrl}/abfindung-nach-${entry.slug}-betriebszugehoerigkeit/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function Page({ params }: Props) {
  const entry = getEntry(params.slug);
  if (!entry) notFound();

  const yearData = (abfindungData as Record<string, unknown>)[String(entry.year)] as {
    beispielsfall: {
      initialen: string;
      name: string;
      branche: string;
      gehalt: number;
      kuendigungsart: string;
      zitat: string;
      geprueft: string[];
      vorgehen: string[];
      ergebnis: number;
    };
    faqs: { frage: string; antwort: string }[];
  };
  if (!yearData) notFound();

  const prev = entries.find((e) => e.year === entry.year - 1);
  const next = entries.find((e) => e.year === entry.year + 1);

  const yl = yearLabel(entry.year);
  const pageUrl = `${SEO_CONFIG.baseUrl}/abfindung-nach-${entry.slug}-betriebszugehoerigkeit/`;

  return (
    <>
      <SeoGeoBase
        pageType="Article"
        pageUrl={pageUrl}
        pageTitle={`Abfindung nach ${yl}`}
        pageDescription={`Abfindung nach ${yl} Betriebszugehörigkeit — Anspruch, Höhe und Vorgehen nach § 1a KSchG.`}
        speakableSelectors={['.fakt-box', '.faq-list', '.abfindung-formel']}
        dateModified={PAGE_DATES.abfindungJahre}
        datePublished="2025-01-15"
        isBasedOn={ABFINDUNG_ISBASEDON}
        breadcrumbs={[
          { name: 'Startseite', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Abfindung', url: `${SEO_CONFIG.baseUrl}/abfindung/` },
          { name: `Abfindung nach ${yl}`, url: pageUrl },
        ]}
      />

      {/* Schema.org - Article (Ratgeber-Content, GEO-Signal) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: `Abfindung nach ${yl} Betriebszugehörigkeit`,
              description: `Abfindungshöhe, Anspruch und Vorgehen nach ${yl} Betriebszugehörigkeit — Fachanwalts-Ratgeber mit Beispielsfall.`,
              dateModified: PAGE_DATES.abfindungJahre,
              url: pageUrl,
              articleSection: 'Abfindung',
            }),
          ),
        }}
      />

      {/* Schema.org - FAQPage (8 Fragen) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: yearData.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.frage,
              acceptedAnswer: { '@type': 'Answer', text: faq.antwort },
            })),
          }),
        }}
      />

      <AbfindungJahreContent
        entry={entry}
        prev={prev ?? null}
        next={next ?? null}
        yearData={yearData}
      />
    </>
  );
}
