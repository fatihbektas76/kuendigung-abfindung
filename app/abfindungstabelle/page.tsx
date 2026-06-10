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
import { QUELLEN_ABFINDUNGSTABELLE } from '@/lib/quellen-defaults';
import { generateArticleSchema } from '@/lib/article-schema';

export const revalidate = 86400;

const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Abfindungstabelle ${year} — Abfindung nach Jahren & Gehalt berechnen [Kostenlos]`,
  description:
    'Abfindungstabelle: Abfindung nach Betriebszugehörigkeit (1–40 Jahre) und Gehalt berechnen. Faustformel 0,5 Gehälter pro Jahr. Kostenlose Tabelle vom Fachanwalt.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/abfindungstabelle/`,
  },
  openGraph: {
    title: `Abfindungstabelle ${year} — Abfindung nach Jahren & Gehalt berechnen`,
    description:
      'Abfindungstabelle: Berechnen Sie Ihre Abfindung nach Betriebszugehörigkeit und Gehalt. Faustformel und Praxis-Szenarien.',
    url: `${SEO_CONFIG.baseUrl}/abfindungstabelle/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Abfindungstabelle ${year} — Abfindung nach Jahren & Gehalt berechnen`,
    description:
      'Abfindungstabelle: Berechnen Sie Ihre Abfindung nach Betriebszugehörigkeit und Gehalt. Faustformel und Praxis-Szenarien.',
  },
};

const faqs = [
  {
    q: 'Wie berechnet man die Abfindung nach der Faustformel?',
    a: 'Die Faustformel lautet: 0,5 Bruttomonatsgehälter × Beschäftigungsjahre = Abfindung. Bei einem Bruttogehalt von 4.000 € und 10 Jahren Betriebszugehörigkeit ergibt sich: 0,5 × 4.000 × 10 = 20.000 €. In der Praxis liegt der Faktor häufig zwischen 0,5 und 1,5 — abhängig von der Stärke der Verhandlungsposition.',
  },
  {
    q: 'Gibt es einen gesetzlichen Anspruch auf Abfindung?',
    a: 'Einen generellen Anspruch auf Abfindung gibt es nicht. Ausnahmen: 1) §1a KSchG — bei betriebsbedingter Kündigung mit Abfindungsangebot im Kündigungsschreiben (0,5 Gehälter pro Jahr), 2) Sozialplan, 3) gerichtlicher Vergleich oder Auflösungsurteil nach §9 KSchG. In der Praxis wird eine Abfindung fast immer über eine Kündigungsschutzklage verhandelt.',
  },
  {
    q: 'Welcher Faktor (0,5 oder 1,0 oder 1,5) gilt für mich?',
    a: 'Der Faktor hängt von Ihrer Verhandlungsposition ab: 0,5 ist die gesetzliche Mindestabfindung nach §1a KSchG. 1,0 ist der Standard bei Vergleichen vor dem Arbeitsgericht. 1,5 und mehr werden erzielt bei langer Betriebszugehörigkeit, hohem Alter, offensichtlich unwirksamer Kündigung oder wenn der Arbeitgeber das Verfahren schnell beenden will.',
  },
  {
    q: 'Wird die Abfindung auf das Arbeitslosengeld angerechnet?',
    a: 'Grundsätzlich nein — die Abfindung wird nicht auf das Arbeitslosengeld angerechnet, wenn die ordentliche Kündigungsfrist eingehalten wurde. Bei Aufhebungsverträgen oder verkürzter Kündigungsfrist kann es zu einer Ruhenszeit kommen (§158 SGB III). Lassen Sie sich vor Unterzeichnung beraten.',
  },
  {
    q: 'Muss ich Steuern auf die Abfindung zahlen?',
    a: 'Ja, Abfindungen sind steuerpflichtig. Allerdings kann die Fünftelregelung (§34 EStG) die Steuerlast erheblich senken: Die Abfindung wird steuerlich so behandelt, als wäre sie auf 5 Jahre verteilt worden. Wichtig seit 2025: Durch das Wachstumschancengesetz wird die Fünftelregelung nicht mehr automatisch über die Lohnabrechnung angewendet — Sie müssen sie in Ihrer Einkommensteuererklärung selbst beantragen. Bei einer Abfindung von 40.000 € können Sie so mehrere tausend Euro Steuern sparen.',
  },
];

const gehaelter = [3000, 4000, 5000, 6000, 8000];
const jahre = [1, 2, 3, 5, 8, 10, 15, 20, 25, 30];

export default function AbfindungstabellePage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/abfindungstabelle/`}
        pageTitle="Abfindungstabelle – Abfindung nach Jahren & Gehalt"
        pageDescription="Abfindungstabelle: Berechnen Sie Ihre Abfindung nach Betriebszugehörigkeit und Gehalt."
        pageType="WebPage"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['.faq-section']}
        dateModified={PAGE_DATES.abfindungstabelle}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Abfindung', url: `${SEO_CONFIG.baseUrl}/abfindung/` },
          { name: 'Abfindungstabelle', url: `${SEO_CONFIG.baseUrl}/abfindungstabelle/` },
        ]}
        datePublished="2026-05-26"
        isBasedOn={[
          { name: 'Kündigungsschutzgesetz (KSchG) §1a', url: 'https://www.gesetze-im-internet.de/kschg/__1a.html' },
          { name: 'Kündigungsschutzgesetz (KSchG) §10', url: 'https://www.gesetze-im-internet.de/kschg/__10.html' },
          { name: 'Einkommensteuergesetz (EStG) §34', url: 'https://www.gesetze-im-internet.de/estg/__34.html' },
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
            headline: 'Abfindungstabelle – Abfindung nach Jahren & Gehalt',
            description: 'Abfindungstabelle: Berechnen Sie Ihre Abfindung nach Betriebszugehörigkeit und Gehalt.',
            dateModified: PAGE_DATES.abfindungstabelle,
            url: `${SEO_CONFIG.baseUrl}/abfindungstabelle/`,
            articleSection: 'Abfindung',
          })),
        }}
      />

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/abfindung" className="text-gold no-underline hover:underline">Abfindung</Link>
            <span className="mx-2">/</span>
            <span>Abfindungstabelle</span>
          </nav>
          <StandAnzeige modifiedAt={PAGE_DATES.abfindungstabelle} />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Tabelle &amp; Berechnung
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Abfindungstabelle {year} &ndash; Abfindung nach Jahren &amp; Gehalt
          </h1>
        </div>
      </div>

      {/* TL;DR */}
      <section className="px-8 pt-4 pb-0 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <TldrBox items={[
              'Faustformel: 0,5 Bruttomonatsgehälter × Beschäftigungsjahre = Regelabfindung (§1a KSchG).',
              'In der Praxis: 0,5–1,5 Gehälter pro Jahr — Faktor hängt von der Verhandlungsposition ab.',
              'Steuervorteil durch Fünftelregelung (§34 EStG) — seit 2025 nur noch über die Steuererklärung beantragbar.',
              'Keine automatische Anrechnung auf Arbeitslosengeld bei eingehaltener Kündigungsfrist.',
            ]} />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div id="direktantwort">
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
                Die <strong>Abfindung bei Kündigung</strong> wird nach der Faustformel berechnet:
                <strong> 0,5 Bruttomonatsgehälter &times; Beschäftigungsjahre</strong>. Bei 10 Jahren
                Betriebszugehörigkeit und 4.000&nbsp;&euro; Bruttogehalt ergibt das eine Regelabfindung
                von 20.000&nbsp;&euro; nach &sect;1a KSchG.
              </p>
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
                In der Praxis werden durch eine{' '}
                <Link href="/kuendigungsschutzklage/" className="text-gold-dark font-semibold no-underline hover:underline">Kündigungsschutzklage</Link>{' '}
                häufig höhere Abfindungen erzielt. Der Faktor liegt je nach Verhandlungsposition
                zwischen <strong>0,5 und 1,5</strong> &mdash; in Ausnahmefällen auch darüber. Die
                folgende Tabelle zeigt alle drei Szenarien.
              </p>
            </div>

            <DefinitionBox
              term="Abfindung (§1a / §9 / §10 KSchG)"
              definition="Die Abfindung ist eine einmalige Geldzahlung des Arbeitgebers an den Arbeitnehmer als Entschädigung für den Verlust des Arbeitsplatzes. Es gibt keinen generellen gesetzlichen Anspruch — die Abfindung wird in der Regel verhandelt oder vom Arbeitsgericht festgesetzt."
            />
          </div>
        </div>
      </section>

      {/* Tabelle Faktor 0,5 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Regelabfindung
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3.5">
            Abfindungstabelle &ndash; Faktor 0,5 (&sect;1a KSchG)
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-6">
            Gesetzliche Regelabfindung bei betriebsbedingter Kündigung mit Klageverzicht.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.85rem] border-collapse bg-white rounded-sm">
              <thead>
                <tr className="border-b-2 border-gold">
                  <th className="text-left py-3 px-3 font-semibold">Jahre</th>
                  {gehaelter.map((g) => (
                    <th key={g} className="text-right py-3 px-3 font-semibold">
                      {g.toLocaleString('de-DE')}&nbsp;&euro;
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jahre.map((j) => (
                  <tr key={j} className="border-b border-border">
                    <td className="py-2.5 px-3 font-medium">{j} {j === 1 ? 'Jahr' : 'Jahre'}</td>
                    {gehaelter.map((g) => (
                      <td key={g} className="py-2.5 px-3 text-right">
                        {(0.5 * g * j).toLocaleString('de-DE')}&nbsp;&euro;
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tabelle Faktor 1,0 */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Praxis-Standard
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3.5">
            Abfindungstabelle &ndash; Faktor 1,0 (Vergleich vor Gericht)
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-6">
            Typische Abfindungshöhe bei einem Vergleich vor dem Arbeitsgericht.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.85rem] border-collapse bg-cream rounded-sm">
              <thead>
                <tr className="border-b-2 border-gold">
                  <th className="text-left py-3 px-3 font-semibold">Jahre</th>
                  {gehaelter.map((g) => (
                    <th key={g} className="text-right py-3 px-3 font-semibold">
                      {g.toLocaleString('de-DE')}&nbsp;&euro;
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jahre.map((j) => (
                  <tr key={j} className="border-b border-border">
                    <td className="py-2.5 px-3 font-medium">{j} {j === 1 ? 'Jahr' : 'Jahre'}</td>
                    {gehaelter.map((g) => (
                      <td key={g} className="py-2.5 px-3 text-right font-semibold">
                        {(1.0 * g * j).toLocaleString('de-DE')}&nbsp;&euro;
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tabelle Faktor 1,5 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Oberer Bereich
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3.5">
            Abfindungstabelle &ndash; Faktor 1,5 (starke Verhandlungsposition)
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-6">
            Erreichbar bei langer Betriebszugehörigkeit, höherem Alter oder offensichtlich
            unwirksamer Kündigung.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.85rem] border-collapse bg-white rounded-sm">
              <thead>
                <tr className="border-b-2 border-gold">
                  <th className="text-left py-3 px-3 font-semibold">Jahre</th>
                  {gehaelter.map((g) => (
                    <th key={g} className="text-right py-3 px-3 font-semibold">
                      {g.toLocaleString('de-DE')}&nbsp;&euro;
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jahre.map((j) => (
                  <tr key={j} className="border-b border-border">
                    <td className="py-2.5 px-3 font-medium">{j} {j === 1 ? 'Jahr' : 'Jahre'}</td>
                    {gehaelter.map((g) => (
                      <td key={g} className="py-2.5 px-3 text-right">
                        {(1.5 * g * j).toLocaleString('de-DE')}&nbsp;&euro;
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[0.84rem] text-ink-muted mt-4">
            Alle Beträge in Euro brutto. Berechnen Sie Ihre individuelle Abfindung mit dem{' '}
            <Link href="/abfindungsrechner/" className="text-gold-dark font-semibold no-underline hover:underline">
              Abfindungsrechner &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Wann gilt welcher Faktor? */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Faktor verstehen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wann gilt welcher Faktor?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Der <strong>Faktor 0,5</strong> ist die gesetzliche Regelabfindung nach &sect;1a KSchG. Sie greift,
              wenn der Arbeitgeber im Kündigungsschreiben ausdrücklich eine Abfindung anbietet und Sie im
              Gegenzug auf eine Kündigungsschutzklage verzichten. In der Praxis ist dieses Angebot selten
              großzügig &mdash; der Arbeitgeber hofft, dass Sie die Klage nicht einreichen.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Der <strong>Faktor 1,0</strong> entspricht dem typischen Ergebnis bei einem Vergleich vor dem
              Arbeitsgericht. Rund 80&nbsp;% aller Kündigungsschutzklagen enden mit einem solchen Vergleich
              beim Gütetermin. Der Richter orientiert sich dabei an der Faustformel von einem
              Bruttomonatsgehalt pro Beschäftigungsjahr als Ausgangspunkt für die Verhandlung.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Ein <strong>Faktor von 1,5 und mehr</strong> wird erzielt, wenn die Verhandlungsposition des
              Arbeitnehmers besonders stark ist. Das ist typischerweise der Fall bei:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-5">
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Langer Betriebszugehörigkeit</strong> (20+ Jahre) &mdash; der Arbeitnehmer hat viel zu verlieren
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Höherem Lebensalter</strong> (55+) &mdash; erschwerter Wiedereinstieg in den Arbeitsmarkt
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Offensichtlich unwirksamer Kündigung</strong> &mdash; der Arbeitgeber weiß, dass er verlieren wird
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Sonderkündigungsschutz</strong> &mdash; Schwerbehinderte, Betriebsratsmitglieder, Schwangere oder Elternzeitler
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Eilbedürfnis des Arbeitgebers</strong> &mdash; bei Umstrukturierungen oder Unternehmensverkäufen will der Arbeitgeber den Fall schnell abschließen
              </li>
            </ul>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              In Ausnahmefällen &mdash; etwa bei leitenden Angestellten oder bei Kündigungen, die gegen
              Diskriminierungsverbote verstoßen &mdash; werden auch Faktoren von 2,0 bis 3,0 verhandelt.
              Die gesetzliche Obergrenze nach &sect;10 KSchG liegt bei 12 Monatsgehältern, bei älteren
              Arbeitnehmern mit langer Betriebszugehörigkeit bei bis zu 18 Monatsgehältern.
            </p>
          </div>
        </div>
      </section>

      {/* Aufhebungsvertrag vs. Kündigung */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Vergleich
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Abfindung bei Aufhebungsvertrag vs. Kündigung
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
              Die Abfindungshöhe unterscheidet sich erheblich je nach Beendigungsweg. Entscheidend ist,
              ob Sie nach einer Kündigung klagen oder einen{' '}
              <Link href="/aufhebungsvertrag/" className="text-gold-dark font-semibold no-underline hover:underline">Aufhebungsvertrag</Link>{' '}
              verhandeln.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6 max-md:grid-cols-1">
              <div className="py-5 px-5 bg-white border border-border rounded-sm">
                <h3 className="font-serif text-[1rem] font-bold mb-2">Aufhebungsvertrag</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed">
                  Frei verhandelbar &mdash; keine gesetzliche Formel. Typisch: 0,5&ndash;1,0 Gehälter pro Jahr.
                  <strong> Achtung:</strong> Ohne anwaltliche Beratung unterschreiben viele Arbeitnehmer zu niedrige
                  Angebote. Zudem droht eine 12-wöchige Sperrzeit beim Arbeitslosengeld (&sect;159 SGB&nbsp;III).
                </p>
              </div>
              <div className="py-5 px-5 bg-white border border-border rounded-sm">
                <h3 className="font-serif text-[1rem] font-bold mb-2">Kündigung + Klage</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed">
                  Faustformel als Orientierung. Vergleich vor dem Arbeitsgericht. Typisch: 0,5&ndash;1,5 Gehälter
                  pro Jahr. Vorteil: Der Richter vermittelt, das Ergebnis ist oft höher als beim Aufhebungsvertrag.
                  Keine Sperrzeit beim ALG, wenn Klagefrist eingehalten wird.
                </p>
              </div>
              <div className="py-5 px-5 bg-white border border-border rounded-sm">
                <h3 className="font-serif text-[1rem] font-bold mb-2">Sozialplan</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed">
                  Bei Massenentlassungen verhandelt der Betriebsrat einen Sozialplan (&sect;112 BetrVG). Die
                  Abfindungen sind oft höher als die Faustformel und berücksichtigen Alter, Unterhaltspflichten
                  und Betriebszugehörigkeit.
                </p>
              </div>
            </div>
            <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.95rem] text-ink leading-relaxed m-0">
                <strong>Empfehlung:</strong> Unterschreiben Sie keinen Aufhebungsvertrag ohne anwaltliche
                Prüfung. Die Abfindung bei einer Kündigungsschutzklage ist in den meisten Fällen höher &mdash;
                und das Kostenrisiko ist im Arbeitsrecht gering (&sect;12a ArbGG).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steuerliche Behandlung */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Steuern
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Steuerliche Behandlung der Abfindung
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Abfindungen sind <strong>steuerpflichtig</strong>, aber <strong>sozialversicherungsfrei</strong>.
              Es werden keine Beiträge zur Kranken-, Pflege-, Renten- oder Arbeitslosenversicherung fällig.
              Die Steuerlast kann jedoch erheblich sein &mdash; hier hilft die Fünftelregelung.
            </p>
            <h3 className="font-serif text-[1.05rem] font-bold mb-3">
              Fünftelregelung nach &sect;34 EStG
            </h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die Fünftelregelung ermäßigt den Steuersatz für außerordentliche Einkünfte wie Abfindungen.
              Das Finanzamt berechnet die Steuer so, als wäre die Abfindung auf fünf Jahre verteilt worden.
              Dadurch wird die Progression geglättet und die Steuerlast sinkt &mdash; oft um mehrere
              tausend Euro.
            </p>
            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold mb-6">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Wichtig seit 2025: Durch das Wachstumschancengesetz wird die Fünftelregelung nicht mehr
                automatisch vom Arbeitgeber über die Lohnabrechnung angewendet. Sie müssen sie
                selbst in Ihrer Einkommensteuererklärung beantragen.
              </p>
            </div>
            <h3 className="font-serif text-[1.05rem] font-bold mb-3">
              Rechenbeispiel
            </h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Ein Arbeitnehmer mit einem zu versteuernden Einkommen von 45.000&nbsp;&euro; erhält eine
              Abfindung von 40.000&nbsp;&euro;. Ohne Fünftelregelung würde das gesamte Einkommen
              (85.000&nbsp;&euro;) mit dem höheren Steuersatz besteuert. Mit Fünftelregelung wird nur
              ein Fünftel der Abfindung (8.000&nbsp;&euro;) zur Berechnung des Steuersatzes herangezogen.
              Die Steuerersparnis beträgt in diesem Fall <strong>ca. 3.000&ndash;5.000&nbsp;&euro;</strong>.
            </p>
            <h3 className="font-serif text-[1.05rem] font-bold mb-3">
              Tipps zur Steueroptimierung
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-5">
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Auszahlung im Folgejahr:</strong> Wenn Ihre Kündigung zum Jahresende erfolgt,
                kann eine Auszahlung im Januar steuerlich günstiger sein &mdash; besonders wenn Sie im
                neuen Jahr geringeres Einkommen haben.
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Einzahlung in die Altersvorsorge:</strong> Teile der Abfindung können steuerfrei
                in eine betriebliche Altersvorsorge oder Direktversicherung eingezahlt werden.
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Steuerberater einschalten:</strong> Bei Abfindungen über 20.000&nbsp;&euro;
                lohnt sich die Beratung durch einen Steuerberater in jedem Fall.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Abfindung und Arbeitslosengeld */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Arbeitslosengeld
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Abfindung und Arbeitslosengeld &ndash; wird angerechnet?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Grundsätzlich wird die Abfindung <strong>nicht auf das Arbeitslosengeld angerechnet</strong>,
              wenn die ordentliche Kündigungsfrist eingehalten wurde. Das bedeutet: Sie erhalten ab dem
              ersten Tag der Arbeitslosigkeit ALG&nbsp;I in voller Höhe &mdash; unabhängig davon, wie
              hoch die Abfindung ist.
            </p>
            <h3 className="font-serif text-[1.05rem] font-bold mb-3">
              Ruhenszeit nach &sect;158 SGB III
            </h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Eine Ruhenszeit tritt ein, wenn das Arbeitsverhältnis <strong>vor Ablauf der ordentlichen
              Kündigungsfrist</strong> endet und eine Abfindung gezahlt wird. In diesem Fall ruht der
              ALG-Anspruch bis zu dem Tag, an dem das Arbeitsverhältnis bei Einhaltung der Frist regulär
              geendet hätte. Beispiel: Ihre Kündigungsfrist beträgt 3 Monate, das Arbeitsverhältnis endet
              aber sofort gegen Abfindung &mdash; dann ruht das ALG für 3 Monate. Die Ruhenszeit kann
              jedoch durch die Höhe der Abfindung begrenzt werden (&sect;158 Abs.&nbsp;2 SGB&nbsp;III).
            </p>
            <h3 className="font-serif text-[1.05rem] font-bold mb-3">
              Sperrzeit nach &sect;159 SGB III
            </h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Eine <strong>Sperrzeit von 12 Wochen</strong> droht, wenn Sie Ihr Arbeitsverhältnis
              selbst aufgeben &mdash; etwa durch einen Aufhebungsvertrag ohne wichtigen Grund.
              Bei einer Kündigung durch den Arbeitgeber mit anschließender Kündigungsschutzklage
              und Vergleich entfällt die Sperrzeit in der Regel. Dies ist ein wesentlicher Vorteil
              der Klage gegenüber dem Aufhebungsvertrag.
            </p>
            <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.95rem] text-ink leading-relaxed m-0">
                <strong>Tipp:</strong> Melden Sie sich sofort nach Erhalt der Kündigung arbeitssuchend
                bei der Agentur für Arbeit &mdash; spätestens 3 Tage nach Kenntnis des Beendigungstermins
                (&sect;38 SGB&nbsp;III). Versäumen Sie diese Frist, droht eine Kürzung des Arbeitslosengeldes
                um eine Woche.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Wie hoch ist Ihre Abfindung?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Die Tabelle zeigt Richtwerte. Ihr konkreter Anspruch hängt vom Einzelfall ab.
            Wir prüfen Ihre Kündigung kostenlos und schätzen die realistische Abfindung ein.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Abfindung kostenlos prüfen lassen &rarr;
            </a>
            <Link
              href="/abfindungsrechner/"
              className="inline-block py-3.5 px-8 bg-white text-gold-dark border border-gold rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-cream"
            >
              Abfindungsrechner
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link
              href="/betriebsbedingte-kuendigung/"
              className="block py-6 px-6 bg-white border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Verwandtes Thema
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Betriebsbedingte Kündigung
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Sozialauswahl, Abfindung nach &sect;1a KSchG &amp; Ihre Rechte. &rarr;
              </span>
            </Link>
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
                Ablauf, Kosten &amp; Erfolgsaussichten. &rarr;
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
            Fragen zur Abfindung
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Author */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
            <ShareButtons url="/abfindungstabelle/" title="Abfindungstabelle – Abfindung nach Jahren & Gehalt" />
          </div>
        </div>
      </section>

      <AktuelleRechtslage />
      <Quellen quellen={QUELLEN_ABFINDUNGSTABELLE} />
      <RelatedTopics current="abfindungstabelle" />

      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/abfindungstabelle" />
        </div>
      </section>

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Verschenken Sie keine Abfindung.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Die meisten Arbeitnehmer erhalten weniger Abfindung als ihnen zusteht.
            Wir verhandeln für Sie das Maximum.
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
