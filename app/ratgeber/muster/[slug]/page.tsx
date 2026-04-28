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

  const faqs =
    entry.slug === 'abmahnung-unentschuldigtes-fehlen'
      ? [
          { q: 'Muss ich die Abmahnung unterschreiben?', a: generated.faqAnswers.frist },
          { q: 'Ist eine mündliche Abmahnung wirksam?', a: 'Eine mündliche Abmahnung ist grundsätzlich wirksam — das Gesetz schreibt keine Schriftform vor. Allerdings hat der Arbeitgeber bei einer mündlichen Abmahnung erhebliche Beweisprobleme. Wenn er später eine Kündigung darauf stützen will, muss er beweisen, dass die Abmahnung tatsächlich ausgesprochen wurde. In der Praxis sind mündliche Abmahnungen daher deutlich weniger gefährlich als schriftliche.' },
          { q: 'Wie lange bleibt die Abmahnung in der Personalakte?', a: 'Eine Abmahnung bleibt grundsätzlich zeitlich unbegrenzt in der Personalakte. Das BAG hat jedoch entschieden, dass eine Abmahnung nach einer angemessenen Zeit (je nach Schwere meist 2–3 Jahre) ihre Warnfunktion verliert und auf Antrag entfernt werden muss. Bei geringfügigen Verstößen wie einmaligem unentschuldigtem Fehlen kann die Entfernung bereits nach 1–2 Jahren verlangt werden, wenn sich der Arbeitnehmer seitdem beanstandungsfrei verhalten hat.' },
          { q: 'Kann ich nach einer Abmahnung gekündigt werden?', a: generated.faqAnswers.anwalt },
          { q: 'Was kostet die anwaltliche Prüfung einer Abmahnung?', a: generated.faqAnswers.kosten },
        ]
      : [
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

      {/* Schema.org - HowTo (nur Abmahnung unentschuldigtes Fehlen) */}
      {entry.slug === 'abmahnung-unentschuldigtes-fehlen' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'So reagieren Sie auf eine Abmahnung wegen unentschuldigtem Fehlen',
              description:
                'Schritt-für-Schritt-Anleitung: Abmahnung wegen unentschuldigtem Fehlen prüfen und richtig reagieren.',
              step: [
                {
                  '@type': 'HowToStep',
                  position: 1,
                  name: 'Unterschrift verweigern oder nur Empfang quittieren',
                  text: 'Sie sind nicht verpflichtet, eine Abmahnung gegenzuzeichnen — auch keine Empfangsbestätigung. Wenn Sie dennoch quittieren, bestätigen Sie ausschließlich den Empfang, nicht die inhaltliche Richtigkeit. Formulierungen wie „Ich erkenne die Abmahnung an" streichen oder Unterschrift verweigern.',
                },
                {
                  '@type': 'HowToStep',
                  position: 2,
                  name: 'Beweise sichern',
                  text: 'Dokumentieren Sie Ihre Version: E-Mails, Krankmeldungen, Chatverläufe, Schichtpläne und Zeugenaussagen sammeln.',
                },
                {
                  '@type': 'HowToStep',
                  position: 3,
                  name: 'Abmahnung auf Mängel prüfen',
                  text: 'Prüfen Sie die 5 häufigsten Mängel: konkrete Datumsangabe, Kündigungsandrohung, Verhältnismäßigkeit, Unterschriftsberechtigung und zeitnahe Zustellung.',
                },
                {
                  '@type': 'HowToStep',
                  position: 4,
                  name: 'Reaktion wählen',
                  text: 'Entscheiden Sie innerhalb von 14 Tagen zwischen Gegendarstellung, Widerspruch mit Entfernungsanspruch oder strategischem Abwarten.',
                },
                {
                  '@type': 'HowToStep',
                  position: 5,
                  name: 'Fachanwalt konsultieren',
                  text: 'Lassen Sie Ihre Abmahnung von einem Fachanwalt für Arbeitsrecht prüfen — insbesondere wenn bereits weitere Abmahnungen vorliegen.',
                },
              ],
            }),
          }}
        />
      )}

      <MusterPageContent
        entry={entry}
        original={original}
        generated={generated}
        faqs={faqs}
      />
    </>
  );
}
