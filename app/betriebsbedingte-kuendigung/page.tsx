import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import StandAnzeige from '@/components/StandAnzeige';
import AktuelleRechtslage from '@/components/AktuelleRechtslage';
import AuthorBox from '@/components/AuthorBox';
import ShareButtons from '@/components/ShareButtons';
import RelatedTopics from '@/components/RelatedTopics';
import SeoGeoBase from '@/components/SeoGeoBase';
import TldrBox from '@/components/TldrBox';
import DefinitionBox from '@/components/DefinitionBox';
import Quellen from '@/components/Quellen';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';
import { SEO_CONFIG } from '@/lib/seo-config';
import { PAGE_DATES } from '@/lib/page-dates';
import { QUELLEN_BETRIEBSBEDINGTE } from '@/lib/quellen-defaults';
import { generateArticleSchema } from '@/lib/article-schema';

export const revalidate = 86400;

const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Betriebsbedingte Kündigung ${year} — Abfindung, Sozialauswahl & Ihre Rechte [Checkliste]`,
  description:
    'Betriebsbedingte Kündigung erhalten? Abfindung nach §1a KSchG = 0,5 Gehälter pro Jahr. Sozialauswahl prüfen & Kündigungsschutzklage einreichen. Fachanwalt prüft kostenlos.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/betriebsbedingte-kuendigung/`,
  },
  openGraph: {
    title: `Betriebsbedingte Kündigung ${year} — Abfindung, Sozialauswahl & Ihre Rechte`,
    description:
      'Betriebsbedingte Kündigung erhalten? Abfindung nach §1a KSchG, Sozialauswahl prüfen & Kündigungsschutzklage. Fachanwalt für Arbeitsrecht.',
    url: `${SEO_CONFIG.baseUrl}/betriebsbedingte-kuendigung/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Betriebsbedingte Kündigung ${year} — Abfindung, Sozialauswahl & Ihre Rechte`,
    description:
      'Betriebsbedingte Kündigung erhalten? Abfindung nach §1a KSchG, Sozialauswahl prüfen & Kündigungsschutzklage. Fachanwalt für Arbeitsrecht.',
  },
};

const faqs = [
  {
    q: 'Wie hoch ist die Abfindung bei einer betriebsbedingten Kündigung?',
    a: 'Die gesetzliche Regelabfindung nach §1a KSchG beträgt 0,5 Bruttomonatsgehälter pro Beschäftigungsjahr. In der Praxis werden bei Kündigungsschutzklagen häufig 0,5 bis 1,5 Gehälter pro Jahr verhandelt — abhängig von Betriebszugehörigkeit, Alter und Prozessrisiko des Arbeitgebers. Bei 10 Jahren Betriebszugehörigkeit und 4.000\u00A0€ Bruttogehalt sind das 20.000–60.000\u00A0€.',
  },
  {
    q: 'Wann ist eine betriebsbedingte Kündigung unwirksam?',
    a: 'Eine betriebsbedingte Kündigung ist unwirksam, wenn: 1) kein dringendes betriebliches Erfordernis vorliegt, 2) eine Weiterbeschäftigung auf einem anderen freien Arbeitsplatz möglich wäre, 3) die Sozialauswahl fehlerhaft ist (§1 Abs. 3 KSchG), oder 4) der Betriebsrat nicht ordnungsgemäß angehört wurde. In der Praxis scheitern viele betriebsbedingte Kündigungen an der fehlerhaften Sozialauswahl.',
  },
  {
    q: 'Was ist die Sozialauswahl bei einer betriebsbedingten Kündigung?',
    a: 'Die Sozialauswahl nach §1 Abs. 3 KSchG verpflichtet den Arbeitgeber, bei der Auswahl der zu kündigenden Arbeitnehmer vier Kriterien zu berücksichtigen: Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten und Schwerbehinderung. Wer sozial am wenigsten schutzbedürftig ist, wird zuerst gekündigt. Fehler bei der Sozialauswahl sind der häufigste Grund für die Unwirksamkeit betriebsbedingter Kündigungen.',
  },
  {
    q: 'Muss der Arbeitgeber eine Abfindung bei betriebsbedingter Kündigung zahlen?',
    a: 'Einen automatischen Anspruch auf Abfindung gibt es nicht. Aber: Nach §1a KSchG kann der Arbeitgeber im Kündigungsschreiben eine Abfindung von 0,5 Gehältern pro Jahr anbieten, wenn der Arbeitnehmer auf die Klage verzichtet. In der Praxis wird eine Abfindung fast immer gezahlt — entweder im Rahmen eines Vergleichs vor dem Arbeitsgericht oder in Verhandlungen. Die Klage lohnt sich fast immer.',
  },
  {
    q: 'Wie lange habe ich Zeit, gegen eine betriebsbedingte Kündigung zu klagen?',
    a: 'Sie haben nach § 4 KSchG genau 3 Wochen ab Zugang der Kündigung Zeit, Kündigungsschutzklage beim Arbeitsgericht einzureichen. Nach Ablauf dieser Frist gilt die Kündigung in der Regel als wirksam — auch wenn sie es eigentlich nicht wäre. Eine nachträgliche Zulassung der Klage nach § 5 KSchG kommt nur in eng begrenzten Ausnahmefällen in Betracht. Handeln Sie sofort und lassen Sie sich dringend von einem Fachanwalt für Arbeitsrecht beraten.',
  },
];

export default function BetriebsbedingteKuendigungPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/betriebsbedingte-kuendigung/`}
        pageTitle="Betriebsbedingte Kündigung – Abfindung & Sozialauswahl"
        pageDescription="Betriebsbedingte Kündigung erhalten? Abfindung nach §1a KSchG, Sozialauswahl prüfen & Kündigungsschutzklage. Fachanwalt für Arbeitsrecht."
        pageType="WebPage"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['.faq-section']}
        dateModified={PAGE_DATES.betriebsbedingteKuendigung}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung/` },
          { name: 'Betriebsbedingte Kündigung', url: `${SEO_CONFIG.baseUrl}/betriebsbedingte-kuendigung/` },
        ]}
        datePublished="2026-05-26"
        isBasedOn={[
          { name: 'Kündigungsschutzgesetz (KSchG) §1', url: 'https://www.gesetze-im-internet.de/kschg/__1.html' },
          { name: 'Kündigungsschutzgesetz (KSchG) §1a', url: 'https://www.gesetze-im-internet.de/kschg/__1a.html' },
          { name: 'Betriebsverfassungsgesetz (BetrVG) §102', url: 'https://www.gesetze-im-internet.de/betrvg/__102.html' },
        ]}
      />

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema({
            headline: 'Betriebsbedingte Kündigung – Abfindung, Sozialauswahl & Ihre Rechte',
            description: 'Betriebsbedingte Kündigung erhalten? Abfindung nach §1a KSchG, Sozialauswahl und Kündigungsschutzklage.',
            dateModified: PAGE_DATES.betriebsbedingteKuendigung,
            url: `${SEO_CONFIG.baseUrl}/betriebsbedingte-kuendigung/`,
            articleSection: 'Betriebsbedingte Kündigung',
          })),
        }}
      />

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/kuendigung" className="text-gold no-underline hover:underline">Kündigung</Link>
            <span className="mx-2">/</span>
            <span>Betriebsbedingte Kündigung</span>
          </nav>
          <StandAnzeige modifiedAt={PAGE_DATES.betriebsbedingteKuendigung} />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Ratgeber Betriebsbedingte Kündigung
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Betriebsbedingte Kündigung &ndash; Abfindung, Sozialauswahl &amp; Ihre Rechte
          </h1>
        </div>
      </div>

      {/* TL;DR */}
      <section className="px-8 pt-4 pb-0 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <TldrBox items={[
              'Betriebsbedingte Kündigung = häufigste Kündigungsart. Abfindung nach §1a KSchG: 0,5 Gehälter pro Beschäftigungsjahr.',
              'Die Sozialauswahl muss korrekt sein — Fehler machen die Kündigung unwirksam.',
              '3-Wochen-Klagefrist ab Zugang der Kündigung — handeln Sie sofort.',
              'In der Praxis werden Abfindungen von 0,5 bis 1,5 Gehältern pro Jahr verhandelt — Klage lohnt sich fast immer.',
            ]} />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold mb-8">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Wichtig: Bei einer betriebsbedingten Kündigung läuft die 3-Wochen-Klagefrist ab Zugang.
                Lassen Sie die Kündigung sofort prüfen &mdash; auch wenn eine Abfindung angeboten wird.
              </p>
            </div>

            <div id="direktantwort">
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
                Eine <strong>betriebsbedingte Kündigung</strong> liegt vor, wenn der Arbeitgeber
                Arbeitsplätze abbaut &mdash; etwa wegen Auftragsrückgang, Umstrukturierung oder
                Standortschließung. Sie ist die häufigste Kündigungsart in Deutschland. Aber:
                <strong> Viele betriebsbedingte Kündigungen sind unwirksam</strong>, weil der
                Arbeitgeber bei der Sozialauswahl Fehler macht.
              </p>
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
                Nach <strong>&sect;1 Abs. 2 KSchG</strong> muss der Arbeitgeber nachweisen, dass
                dringende betriebliche Erfordernisse vorliegen, die einer Weiterbeschäftigung
                entgegenstehen. Dabei muss er prüfen, ob ein anderer freier Arbeitsplatz im
                Unternehmen vorhanden ist. Zusätzlich muss die <strong>Sozialauswahl</strong> nach
                &sect;1 Abs. 3 KSchG korrekt durchgeführt werden: Betriebszugehörigkeit, Alter,
                Unterhaltspflichten und Schwerbehinderung sind zu berücksichtigen.
              </p>
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-8">
                <strong>Abfindung:</strong> Bietet der Arbeitgeber im Kündigungsschreiben eine
                Abfindung nach &sect;1a KSchG an (0,5 Gehälter pro Jahr), verzichten Sie mit Annahme
                auf die Klage. In der Praxis sind durch eine{' '}
                <Link href="/kuendigungsschutzklage/" className="text-gold-dark font-semibold no-underline hover:underline">Kündigungsschutzklage</Link>{' '}
                deutlich höhere Abfindungen möglich &mdash; bis zu 1,5 Gehälter pro Jahr.
              </p>
            </div>

            <DefinitionBox
              term="Betriebsbedingte Kündigung (§1 Abs. 2 KSchG)"
              definition="Eine betriebsbedingte Kündigung erfolgt, wenn dringende betriebliche Erfordernisse — wie Auftragsrückgang, Umstrukturierung oder Standortschließung — eine Weiterbeschäftigung des Arbeitnehmers unmöglich machen. Der Arbeitgeber muss eine korrekte Sozialauswahl durchführen."
            />

            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Betriebsbedingte Kündigung kostenlos prüfen lassen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Sozialauswahl */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kernpunkt
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3.5">
            Sozialauswahl &ndash; die 4 Kriterien nach &sect;1 Abs. 3 KSchG
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-8">
            Fehler bei der Sozialauswahl sind der häufigste Grund, warum betriebsbedingte
            Kündigungen vor Gericht scheitern.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-[740px] max-md:grid-cols-1">
            {[
              {
                title: 'Betriebszugehörigkeit',
                desc: 'Je länger Sie im Unternehmen sind, desto stärker ist Ihr Schutz. Lange Betriebszugehörigkeit spricht gegen eine Kündigung.',
              },
              {
                title: 'Lebensalter',
                desc: 'Ältere Arbeitnehmer sind stärker geschützt, da sie auf dem Arbeitsmarkt schlechtere Chancen haben.',
              },
              {
                title: 'Unterhaltspflichten',
                desc: 'Wer Kinder oder unterhaltsbedürftige Angehörige versorgt, ist sozial schutzbedürftiger und wird bei der Auswahl bevorzugt.',
              },
              {
                title: 'Schwerbehinderung',
                desc: 'Schwerbehinderte und gleichgestellte Arbeitnehmer genießen besonderen Schutz. Eine Kündigung bedarf der Zustimmung des Integrationsamts.',
              },
            ].map((item) => (
              <div key={item.title} className="py-5 px-5 bg-white border border-border rounded-sm">
                <span className="font-semibold">{item.title}</span>
                <span className="block text-[0.84rem] text-ink-muted mt-1">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Abfindungshöhe */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Abfindung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Abfindung bei betriebsbedingter Kündigung &ndash; Höhe &amp; Berechnung
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die gesetzliche Regelabfindung nach <strong>&sect;1a KSchG</strong> beträgt
              0,5 Bruttomonatsgehälter pro Beschäftigungsjahr. Diese wird vom Arbeitgeber
              angeboten, wenn Sie im Gegenzug auf eine Klage verzichten.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              In der Praxis werden durch eine <strong>Kündigungsschutzklage</strong> deutlich
              höhere Abfindungen erzielt. Die Bandbreite liegt zwischen 0,5 und 1,5
              Bruttomonatsgehältern pro Beschäftigungsjahr &mdash; je nach Verhandlungsposition,
              Erfolgsaussicht der Klage und Branche.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-[0.9rem] border-collapse">
                <thead>
                  <tr className="border-b-2 border-gold">
                    <th className="text-left py-3 px-4 font-semibold">Betriebszugehörigkeit</th>
                    <th className="text-right py-3 px-4 font-semibold">§1a KSchG (0,5)</th>
                    <th className="text-right py-3 px-4 font-semibold">Praxis (1,0)</th>
                    <th className="text-right py-3 px-4 font-semibold">Oberer Bereich (1,5)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { jahre: '5 Jahre', low: '10.000 €', mid: '20.000 €', high: '30.000 €' },
                    { jahre: '10 Jahre', low: '20.000 €', mid: '40.000 €', high: '60.000 €' },
                    { jahre: '15 Jahre', low: '30.000 €', mid: '60.000 €', high: '90.000 €' },
                    { jahre: '20 Jahre', low: '40.000 €', mid: '80.000 €', high: '120.000 €' },
                    { jahre: '25 Jahre', low: '50.000 €', mid: '100.000 €', high: '150.000 €' },
                  ].map((row) => (
                    <tr key={row.jahre} className="border-b border-border">
                      <td className="py-3 px-4 font-medium">{row.jahre}</td>
                      <td className="py-3 px-4 text-right">{row.low}</td>
                      <td className="py-3 px-4 text-right font-semibold">{row.mid}</td>
                      <td className="py-3 px-4 text-right">{row.high}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.84rem] text-ink-muted mb-6">
              Beispielrechnung bei 4.000&nbsp;&euro; Bruttomonatsgehalt. Tatsächliche Abfindung hängt von Einzelfall ab.
              <Link href="/abfindungstabelle/" className="text-gold-dark font-semibold no-underline hover:underline ml-1">
                Vollständige Abfindungstabelle &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Betriebsbedingt gekündigt?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Wir prüfen Ihre betriebsbedingte Kündigung kostenlos &mdash; Sozialauswahl,
            Abfindungshöhe und Klagechancen. Innerhalb von 24 Stunden.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Jetzt kostenlos prüfen lassen &rarr;
            </a>
            <Link
              href="/abfindungsrechner/"
              className="inline-block py-3.5 px-8 bg-white text-gold-dark border border-gold rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-cream"
            >
              Abfindung berechnen
            </Link>
          </div>
        </div>
      </section>

      {/* Voraussetzungen */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Voraussetzungen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wann ist eine betriebsbedingte Kündigung wirksam?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Der Arbeitgeber muss vier Voraussetzungen erfüllen, damit die betriebsbedingte
              Kündigung wirksam ist:
            </p>
            <ol className="list-decimal pl-6 space-y-4 mb-8">
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Dringendes betriebliches Erfordernis:</strong> Es muss eine unternehmerische
                Entscheidung vorliegen (z.&thinsp;B. Auftragsrückgang, Umstrukturierung), die zum
                Wegfall des Arbeitsplatzes führt. Diese Entscheidung wird vom Gericht nur auf
                Willkür geprüft.
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Keine Weiterbeschäftigungsmöglichkeit:</strong> Der Arbeitgeber muss prüfen,
                ob ein anderer freier Arbeitsplatz im gesamten Unternehmen (nicht nur im Betrieb)
                vorhanden ist &mdash; auch zu geänderten Bedingungen oder nach zumutbarer Umschulung.
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Korrekte Sozialauswahl:</strong> Unter vergleichbaren Arbeitnehmern muss
                derjenige gekündigt werden, der sozial am wenigsten schutzbedürftig ist (Dauer der
                Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten, Schwerbehinderung).
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Ordnungsgemäße Betriebsratsanhörung (&sect;102 BetrVG):</strong> Vor jeder
                Kündigung muss der Betriebsrat angehört werden. Der Arbeitgeber muss ihm die
                Kündigungsgründe mitteilen und eine Stellungnahme abwarten. Eine ohne Anhörung
                ausgesprochene Kündigung ist <strong>automatisch unwirksam</strong> &mdash;
                unabhängig davon, ob die Kündigung inhaltlich gerechtfertigt wäre. Fehler bei der
                Betriebsratsanhörung gehören zu den häufigsten Unwirksamkeitsgründen in der Praxis.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Häufige Fehler */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Unwirksamkeitsgründe
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Häufige Fehler bei betriebsbedingten Kündigungen
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
              In der Praxis scheitern zahlreiche betriebsbedingte Kündigungen vor dem Arbeitsgericht. Die
              häufigsten Fehler, die zur Unwirksamkeit führen:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Fehlende unternehmerische Entscheidung',
                  desc: 'Der Arbeitgeber muss eine konkrete unternehmerische Entscheidung nachweisen, die zum Wegfall des Arbeitsplatzes führt. Allgemeine Aussagen wie „die wirtschaftliche Lage ist schlecht" genügen nicht. Es muss ein nachvollziehbarer Kausalzusammenhang bestehen.',
                },
                {
                  title: 'Keine echte Stellenstreichung',
                  desc: 'Wird die Arbeit des gekündigten Mitarbeiters einfach auf die verbleibenden Kollegen verteilt, liegt kein echter Stellenwegfall vor. Der Arbeitgeber muss darlegen, dass die Arbeit insgesamt reduziert wurde oder die verbleibenden Mitarbeiter die Mehrarbeit ohne Überlastung bewältigen können.',
                },
                {
                  title: 'Freien Arbeitsplatz im Unternehmen übersehen',
                  desc: 'Der Arbeitgeber muss im gesamten Unternehmen (nicht nur im Betrieb) nach freien Arbeitsplätzen suchen — auch zu geänderten Arbeitsbedingungen oder nach zumutbarer Umschulung. Wird ein freier Platz übersehen, ist die Kündigung unwirksam.',
                },
                {
                  title: 'Fehlerhafte Sozialauswahl',
                  desc: 'Die Sozialauswahl nach §1 Abs. 3 KSchG ist der häufigste Angriffspunkt. Fehler bei der Bildung der Vergleichsgruppe, falsche Gewichtung der vier Kriterien oder das Herausnehmen von Leistungsträgern ohne ausreichende Begründung machen die Kündigung anfechtbar.',
                },
                {
                  title: 'Betriebsrat nicht ordnungsgemäß angehört',
                  desc: 'Die Anhörung nach §102 BetrVG muss vor Ausspruch der Kündigung erfolgen. Der Arbeitgeber muss dem Betriebsrat alle Kündigungsgründe mitteilen. Unvollständige oder verspätete Anhörung führt automatisch zur Unwirksamkeit.',
                },
                {
                  title: 'Massenentlassungsanzeige vergessen',
                  desc: 'Bei betriebsbedingten Kündigungen, die bestimmte Schwellenwerte überschreiten (§17 KSchG), muss der Arbeitgeber vor Ausspruch der Kündigungen eine Massenentlassungsanzeige bei der Agentur für Arbeit erstatten. Fehlt diese Anzeige, sind alle Kündigungen unwirksam.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 py-4 px-5 bg-white rounded-sm border border-border">
                  <svg className="min-w-[20px] text-gold mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2L1 21h22L12 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div>
                    <h3 className="text-[0.95rem] font-bold text-ink mb-1">{item.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Massenentlassung und Sozialplan */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Sonderfall
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Massenentlassung und Sozialplan
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Bei größeren Personalabbauten gelten zusätzliche Schutzvorschriften. Nach <strong>&sect;17
              KSchG</strong> muss der Arbeitgeber eine Massenentlassungsanzeige bei der Agentur für Arbeit
              erstatten, wenn innerhalb von 30 Kalendertagen eine bestimmte Anzahl von Arbeitnehmern
              entlassen werden soll:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-[0.9rem] border-collapse bg-cream rounded-sm">
                <thead>
                  <tr className="border-b-2 border-gold">
                    <th className="text-left py-3 px-4 font-semibold">Betriebsgröße</th>
                    <th className="text-left py-3 px-4 font-semibold">Schwellenwert</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { groesse: '21–59 Arbeitnehmer', schwelle: 'Mehr als 5 Entlassungen' },
                    { groesse: '60–499 Arbeitnehmer', schwelle: '10% oder mehr als 25 Entlassungen' },
                    { groesse: '500+ Arbeitnehmer', schwelle: 'Mindestens 30 Entlassungen' },
                  ].map((row) => (
                    <tr key={row.groesse} className="border-b border-border">
                      <td className="py-3 px-4 font-medium">{row.groesse}</td>
                      <td className="py-3 px-4">{row.schwelle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Bei Massenentlassungen muss der Arbeitgeber mit dem Betriebsrat über einen
              <strong> Sozialplan</strong> verhandeln (&sect;112 BetrVG). Ein Sozialplan regelt den Ausgleich
              der wirtschaftlichen Nachteile, die den Arbeitnehmern durch die Betriebsänderung entstehen.
              Die Abfindungen im Sozialplan liegen oft über der Faustformel und berücksichtigen neben der
              Betriebszugehörigkeit auch Alter, Unterhaltspflichten und Arbeitsmarktchancen.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Enthält der Sozialplan eine <strong>Namensliste</strong> nach &sect;1 Abs.&nbsp;5 KSchG,
              wird vermutet, dass die Kündigung durch dringende betriebliche Erfordernisse bedingt ist.
              Die Sozialauswahl kann dann nur auf grobe Fehlerhaftigkeit überprüft werden. Trotzdem lohnt
              sich eine Klage, da auch Sozialpläne angreifbar sein können.
            </p>
          </div>
        </div>
      </section>

      {/* So wehren Sie sich */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Handlungsanleitung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              So wehren Sie sich &ndash; Schritt für Schritt
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
              Wenn Sie eine betriebsbedingte Kündigung erhalten haben, sollten Sie sofort handeln.
              Die 3-Wochen-Klagefrist nach &sect;&nbsp;4 KSchG ist sehr streng &mdash; nach Ablauf
              ist eine Klage in der Regel nicht mehr möglich. Eine nachträgliche Zulassung nach
              &sect;&nbsp;5 KSchG kommt nur in eng begrenzten Ausnahmefällen in Betracht; lassen
              Sie sich daher dringend anwaltlich beraten.
            </p>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Kündigung sichern und Zugang dokumentieren',
                  desc: 'Notieren Sie das genaue Zugangsdatum (Tag der Übergabe oder des Briefkasteneinwurfs). Fertigen Sie eine Kopie der Kündigung an. Unterschreiben Sie nur den Empfang, niemals eine Verzichtserklärung.',
                },
                {
                  step: '2',
                  title: 'Sofort Fachanwalt kontaktieren',
                  desc: 'Innerhalb der ersten Woche sollten Sie einen Fachanwalt für Arbeitsrecht aufsuchen. Dieser prüft die Kündigung auf Schwachstellen: Sozialauswahl, Betriebsratsanhörung, Weiterbeschäftigungsmöglichkeiten und betriebliche Erfordernisse.',
                },
                {
                  step: '3',
                  title: 'Kündigungsschutzklage einreichen',
                  desc: 'Innerhalb von 3 Wochen ab Zugang muss die Klage beim Arbeitsgericht eingereicht werden. Ihr Anwalt formuliert die Klageschrift und begründet, warum die Kündigung unwirksam ist. Die Klage kostet im ersten Rechtszug nur die eigenen Anwaltskosten (§12a ArbGG).',
                },
                {
                  step: '4',
                  title: 'Vergleich verhandeln und Abfindung erzielen',
                  desc: 'Beim Gütetermin (2–6 Wochen nach Klage) verhandeln Sie über einen Vergleich. Ca. 80% der Fälle enden hier. Das typische Ergebnis: Arbeitsverhältnis endet, Sie erhalten eine Abfindung und ein qualifiziertes Zeugnis.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 py-5 px-5 bg-white border border-border rounded-sm">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-dark text-white flex items-center justify-center text-[0.85rem] font-bold">
                    {item.step}
                  </div>
                  <div>
                    <span className="font-semibold">{item.title}</span>
                    <span className="block text-[0.84rem] text-ink-muted mt-1">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Probezeit und Kleinbetriebe */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Sonderfälle
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Betriebsbedingte Kündigung in der Probezeit und bei Kleinbetrieben
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Das Kündigungsschutzgesetz (KSchG) gilt erst <strong>nach 6 Monaten
              Betriebszugehörigkeit</strong> (&sect;1 Abs.&nbsp;1 KSchG) und nur in Betrieben mit
              <strong> mehr als 10 Arbeitnehmern</strong> (&sect;23 KSchG). In der Probezeit oder
              in Kleinbetrieben gelten daher geringere Hürden für eine Kündigung.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Das bedeutet aber nicht, dass Sie schutzlos sind. Auch ohne allgemeinen Kündigungsschutz
              gibt es wichtige Grenzen:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-5">
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Sittenwidrigkeit (&sect;138 BGB):</strong> Eine Kündigung darf nicht aus sachfremden,
                willkürlichen oder menschenverachtenden Motiven erfolgen.
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Diskriminierungsverbot (AGG):</strong> Eine Kündigung wegen Geschlecht, Alter,
                Behinderung, Religion oder Herkunft ist auch in der Probezeit unwirksam.
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Maßregelungsverbot (&sect;612a BGB):</strong> Der Arbeitgeber darf Sie nicht kündigen,
                weil Sie berechtigte Ansprüche geltend gemacht haben.
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Sonderkündigungsschutz:</strong> Schwangere (&sect;17 MuSchG), Betriebsratsmitglieder
                (&sect;15 KSchG), Schwerbehinderte (&sect;168 SGB&nbsp;IX) und Arbeitnehmer in Elternzeit
                (&sect;18 BEEG) genießen auch in Kleinbetrieben und der Probezeit besonderen Schutz.
              </li>
            </ul>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              In der Probezeit gilt zudem eine verkürzte Kündigungsfrist von nur 2 Wochen
              (&sect;622 Abs.&nbsp;3 BGB). Auch in Kleinbetrieben muss die ordentliche Kündigungsfrist
              nach &sect;622 BGB eingehalten werden &mdash; eine fristlose Kündigung ist nur bei wichtigem
              Grund möglich.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link
              href="/kuendigungsschutzklage/"
              className="block py-6 px-6 bg-white border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Nächster Schritt
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Kündigungsschutzklage einreichen
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Ablauf, Fristen, Kosten &amp; Erfolgsaussichten. &rarr;
              </span>
            </Link>
            <Link
              href="/abfindungstabelle/"
              className="block py-6 px-6 bg-white border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Tool
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Abfindungstabelle
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Abfindung nach Betriebszugehörigkeit &amp; Gehalt berechnen. &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zur betriebsbedingten Kündigung
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Author */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
            <ShareButtons url="/betriebsbedingte-kuendigung/" title="Betriebsbedingte Kündigung – Abfindung & Sozialauswahl" />
          </div>
        </div>
      </section>

      <AktuelleRechtslage />
      <Quellen quellen={QUELLEN_BETRIEBSBEDINGTE} />
      <RelatedTopics current="betriebsbedingte-kuendigung" />

      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/betriebsbedingte-kuendigung" />
        </div>
      </section>

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Viele betriebsbedingte Kündigungen sind unwirksam.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Lassen Sie Ihre Kündigung prüfen. Fehlerhafte Sozialauswahl, fehlende
            Weiterbeschäftigungsmöglichkeiten oder formelle Mängel &mdash; wir finden die
            Schwachstelle und verhandeln Ihre Abfindung.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Kostenlose Ersteinschätzung &rarr;
          </a>
        </div>
      </section>
    </main>
  );
}
