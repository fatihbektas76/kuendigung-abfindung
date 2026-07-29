import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { entries, getEntry, yearLabel } from '@/lib/betriebszugehoerigkeit';
import GekuendigtContent from './content';
import gekuendigtData from '@/data/generated/gekuendigt-data.json';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';
import { PAGE_DATES } from '@/lib/page-dates';
import { generateArticleSchema } from '@/lib/article-schema';

const GEKUENDIGT_ISBASEDON = [
  { name: '§ 622 BGB — Kündigungsfristen', url: 'https://www.gesetze-im-internet.de/bgb/__622.html' },
  { name: '§ 4 KSchG — Klagefrist (3 Wochen)', url: 'https://www.gesetze-im-internet.de/kschg/__4.html' },
  { name: '§ 1 KSchG — Sozial ungerechtfertigte Kündigung', url: 'https://www.gesetze-im-internet.de/kschg/__1.html' },
];

export const revalidate = 86400;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

function fristKurz(year: number): string {
  if (year < 2) return '4 Wochen';
  if (year < 5) return '1 Monat';
  if (year < 8) return '2 Monate';
  if (year < 10) return '3 Monate';
  if (year < 12) return '4 Monate';
  if (year < 15) return '5 Monate';
  if (year < 20) return '6 Monate';
  return '7 Monate';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEntry(params.slug);
  if (!entry) return {};
  const yl = yearLabel(entry.year);
  const frist = fristKurz(entry.year);
  const title = `Gekündigt nach ${yl}: ${frist} Kündigungsfrist — was jetzt tun? (${new Date().getFullYear()})`;
  const description = `Kündigung nach ${yl} bekommen? Ihre Kündigungsfrist beträgt ${frist} (§ 622 BGB). Die 3-Wochen-Klagefrist läuft — Rechte prüfen, Abfindung sichern. Fachanwalt hilft kostenlos.`;
  const url = `${SEO_CONFIG.baseUrl}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/`;
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

  const yearData = (gekuendigtData as Record<string, unknown>)[String(entry.year)] as {
    kuendigungsfristKurz: string;
    kuendigungsfristLang: string;
    kuendigungsfristHinweis: string;
    kschgGilt: boolean;
    haeufigeFehler: string[];
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

  return (
    <>
      <SeoGeoBase
        pageType="Article"
        pageUrl={`${SEO_CONFIG.baseUrl}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/`}
        pageTitle={`Gekündigt nach ${yl}`}
        pageDescription={`Kündigung nach ${yl} Betriebszugehörigkeit — Rechte, Fristen und Abfindungschancen für Arbeitnehmer.`}
        speakableSelectors={['.fakt-box', '.faq-list']}
        dateModified={PAGE_DATES.gekuendigtJahre}
        datePublished="2025-01-15"
        isBasedOn={GEKUENDIGT_ISBASEDON}
        breadcrumbs={[
          { name: 'Startseite', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung/` },
          { name: `Gekündigt nach ${yl}`, url: `${SEO_CONFIG.baseUrl}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/` },
        ]}
      />

      {/* Schema.org - Article (Ratgeber-Content, GEO-Signal) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: `Gekündigt nach ${yl} Betriebszugehörigkeit — Rechte und Vorgehen`,
              description: `Kündigung nach ${yl} Betriebszugehörigkeit: 3-Wochen-Klagefrist, KSchG-Prüfung und Abfindungschancen.`,
              dateModified: PAGE_DATES.gekuendigtJahre,
              url: `${SEO_CONFIG.baseUrl}/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/`,
              articleSection: 'Kündigung',
            }),
          ),
        }}
      />

      {/* Schema.org - FAQPage (7 Fragen) */}
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

      <GekuendigtContent
        entry={entry}
        prev={prev ?? null}
        next={next ?? null}
        yearData={yearData}
      />
    </>
  );
}
