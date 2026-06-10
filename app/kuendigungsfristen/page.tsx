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
import { QUELLEN_KUENDIGUNGSFRISTEN } from '@/lib/quellen-defaults';
import { generateArticleSchema } from '@/lib/article-schema';

export const revalidate = 86400;

const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kündigungsfristen ${year} — Tabelle nach §622 BGB [Arbeitnehmer & Arbeitgeber]`,
  description:
    'Kündigungsfristen nach §622 BGB: Komplette Tabelle für Arbeitnehmer & Arbeitgeber. Grundkündigungsfrist 4 Wochen, verlängert bis 7 Monate. Taggenauer Rechner.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/kuendigungsfristen/`,
  },
  openGraph: {
    title: `Kündigungsfristen ${year} — Tabelle nach §622 BGB`,
    description:
      'Kündigungsfristen nach §622 BGB: Tabelle für Arbeitnehmer & Arbeitgeber. Grundkündigungsfrist 4 Wochen, bis 7 Monate bei langer Betriebszugehörigkeit.',
    url: `${SEO_CONFIG.baseUrl}/kuendigungsfristen/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Kündigungsfristen ${year} — Tabelle nach §622 BGB`,
    description:
      'Kündigungsfristen nach §622 BGB: Tabelle für Arbeitnehmer & Arbeitgeber. Grundkündigungsfrist 4 Wochen, bis 7 Monate bei langer Betriebszugehörigkeit.',
  },
};

const faqs = [
  {
    q: 'Wie lang ist die gesetzliche Kündigungsfrist nach §622 BGB?',
    a: 'Die gesetzliche Grundkündigungsfrist beträgt 4 Wochen zum 15. oder zum Ende eines Kalendermonats (§622 Abs. 1 BGB). In der Probezeit (max. 6 Monate) beträgt die Frist nur 2 Wochen. Bei einer Kündigung durch den Arbeitgeber verlängert sich die Frist je nach Betriebszugehörigkeit auf bis zu 7 Monate zum Monatsende.',
  },
  {
    q: 'Welche Kündigungsfrist gilt für den Arbeitgeber bei 10 Jahren Betriebszugehörigkeit?',
    a: 'Nach 10 Jahren Betriebszugehörigkeit beträgt die Kündigungsfrist für den Arbeitgeber 4 Monate zum Ende eines Kalendermonats (§622 Abs. 2 Nr. 4 BGB). Der Arbeitnehmer kann dagegen mit der Grundkündigungsfrist von 4 Wochen kündigen, sofern vertraglich nichts anderes vereinbart ist.',
  },
  {
    q: 'Kann die Kündigungsfrist im Arbeitsvertrag verlängert oder verkürzt werden?',
    a: 'Verlängerung ist immer möglich — sowohl für Arbeitgeber als auch für Arbeitnehmer. Eine Verkürzung unter die gesetzlichen Mindestfristen ist nur durch Tarifvertrag möglich (§622 Abs. 4 BGB). Im Arbeitsvertrag darf die Kündigungsfrist für den Arbeitnehmer nicht länger sein als die für den Arbeitgeber (§622 Abs. 6 BGB).',
  },
  {
    q: 'Muss ich die Kündigungsfrist einhalten, wenn der Arbeitgeber sie nicht einhält?',
    a: 'Ja — eine Kündigung mit zu kurzer Frist ist nicht automatisch unwirksam. Sie wird in der Regel in eine Kündigung zum nächstmöglichen Termin umgedeutet. Das Arbeitsverhältnis endet dann zum richtigen Termin. Allerdings: Wenn die Frist erheblich unterschritten wird, kann dies ein Indiz für eine unwirksame Kündigung sein. Lassen Sie die Frist prüfen.',
  },
  {
    q: 'Ab wann zählt die Kündigungsfrist — ab Ausspruch oder ab Zugang?',
    a: 'Die Kündigungsfrist beginnt ab Zugang der Kündigung beim Empfänger — nicht ab dem Datum des Kündigungsschreibens. Bei persönlicher Übergabe gilt der Tag der Übergabe. Bei Briefpost gilt der Tag, an dem der Brief in den Briefkasten eingeworfen wird (Zugang im Rechtssinne). Das genaue Zugangsdatum ist entscheidend für die Berechnung der Frist.',
  },
];

const fristenTabelle = [
  { dauer: 'Probezeit (max. 6 Monate)', frist: '2 Wochen', termin: 'Jederzeit (kein fester Endtermin)', paragraph: '§622 Abs. 3' },
  { dauer: '0–2 Jahre', frist: '4 Wochen', termin: 'Zum 15. oder Monatsende', paragraph: '§622 Abs. 1' },
  { dauer: '2 Jahre', frist: '1 Monat', termin: 'Zum Monatsende', paragraph: '§622 Abs. 2 Nr. 1' },
  { dauer: '5 Jahre', frist: '2 Monate', termin: 'Zum Monatsende', paragraph: '§622 Abs. 2 Nr. 2' },
  { dauer: '8 Jahre', frist: '3 Monate', termin: 'Zum Monatsende', paragraph: '§622 Abs. 2 Nr. 3' },
  { dauer: '10 Jahre', frist: '4 Monate', termin: 'Zum Monatsende', paragraph: '§622 Abs. 2 Nr. 4' },
  { dauer: '12 Jahre', frist: '5 Monate', termin: 'Zum Monatsende', paragraph: '§622 Abs. 2 Nr. 5' },
  { dauer: '15 Jahre', frist: '6 Monate', termin: 'Zum Monatsende', paragraph: '§622 Abs. 2 Nr. 6' },
  { dauer: '20 Jahre', frist: '7 Monate', termin: 'Zum Monatsende', paragraph: '§622 Abs. 2 Nr. 7' },
];

export default function KuendigungsfristenPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/kuendigungsfristen/`}
        pageTitle="Kündigungsfristen nach §622 BGB – Tabelle"
        pageDescription="Kündigungsfristen nach §622 BGB: Komplette Tabelle für Arbeitnehmer und Arbeitgeber."
        pageType="WebPage"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['.faq-section']}
        dateModified={PAGE_DATES.kuendigungsfristen}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung/` },
          { name: 'Kündigungsfristen', url: `${SEO_CONFIG.baseUrl}/kuendigungsfristen/` },
        ]}
        datePublished="2026-05-26"
        isBasedOn={[
          { name: 'Bürgerliches Gesetzbuch (BGB) §622', url: 'https://www.gesetze-im-internet.de/bgb/__622.html' },
          { name: 'Bürgerliches Gesetzbuch (BGB) §626', url: 'https://www.gesetze-im-internet.de/bgb/__626.html' },
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
            headline: 'Kündigungsfristen nach §622 BGB – Tabelle',
            description: 'Kündigungsfristen nach §622 BGB: Komplette Tabelle für Arbeitnehmer und Arbeitgeber.',
            dateModified: PAGE_DATES.kuendigungsfristen,
            url: `${SEO_CONFIG.baseUrl}/kuendigungsfristen/`,
            articleSection: 'Kündigungsfristen',
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
            <span>Kündigungsfristen</span>
          </nav>
          <StandAnzeige modifiedAt={PAGE_DATES.kuendigungsfristen} />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Übersicht Kündigungsfristen
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Kündigungsfristen nach &sect;622 BGB &ndash; Tabelle {year}
          </h1>
        </div>
      </div>

      {/* TL;DR */}
      <section className="px-8 pt-4 pb-0 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <TldrBox items={[
              'Grundkündigungsfrist: 4 Wochen zum 15. oder zum Monatsende (§622 Abs. 1 BGB).',
              'Probezeit: Nur 2 Wochen Kündigungsfrist, ohne festen Endtermin.',
              'Arbeitgeberkündigung: Frist steigt mit Betriebszugehörigkeit — bis zu 7 Monate bei 20+ Jahren.',
              'Arbeitnehmerkündigung: Immer 4 Wochen, sofern vertraglich nicht anders geregelt.',
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
                Die <strong>gesetzlichen Kündigungsfristen</strong> sind in &sect;622 BGB geregelt.
                Die Grundkündigungsfrist beträgt <strong>4 Wochen zum 15. oder zum Ende eines
                Kalendermonats</strong>. Bei einer Kündigung durch den Arbeitgeber verlängert
                sich die Frist je nach Betriebszugehörigkeit auf bis zu 7 Monate zum Monatsende.
              </p>
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
                <strong>Wichtig:</strong> Die verlängerten Fristen nach &sect;622 Abs. 2 BGB
                gelten nur für die Kündigung durch den Arbeitgeber. Für Arbeitnehmer bleibt die
                Grundkündigungsfrist von 4 Wochen bestehen &mdash; es sei denn, im Arbeitsvertrag
                oder Tarifvertrag ist eine längere Frist vereinbart.
              </p>
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-8">
                Arbeitsverträge und Tarifverträge können <strong>längere Fristen</strong> vorsehen.
                Kürzere Fristen als die gesetzlichen Mindestfristen sind nur durch Tarifvertrag
                möglich (&sect;622 Abs. 4 BGB).
              </p>
            </div>

            <DefinitionBox
              term="Kündigungsfrist (§622 BGB)"
              definition="Die Kündigungsfrist ist der Zeitraum zwischen dem Zugang der Kündigung und dem Ende des Arbeitsverhältnisses. Sie schützt beide Seiten: Der Arbeitnehmer hat Zeit, eine neue Stelle zu finden; der Arbeitgeber hat Zeit, Ersatz zu beschaffen."
            />
          </div>
        </div>
      </section>

      {/* Tabelle */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Übersicht
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3.5">
            Kündigungsfristen-Tabelle nach &sect;622 BGB
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-8">
            Alle gesetzlichen Kündigungsfristen für Arbeitgeber nach Betriebszugehörigkeit.
          </p>
          <div className="overflow-x-auto max-w-[740px]">
            <table className="w-full text-[0.9rem] border-collapse bg-white rounded-sm">
              <thead>
                <tr className="border-b-2 border-gold">
                  <th className="text-left py-3 px-4 font-semibold">Betriebszugehörigkeit</th>
                  <th className="text-left py-3 px-4 font-semibold">Kündigungsfrist</th>
                  <th className="text-left py-3 px-4 font-semibold">Kündigungstermin</th>
                  <th className="text-left py-3 px-4 font-semibold">Rechtsgrundlage</th>
                </tr>
              </thead>
              <tbody>
                {fristenTabelle.map((row) => (
                  <tr key={row.dauer} className="border-b border-border">
                    <td className="py-3 px-4 font-medium">{row.dauer}</td>
                    <td className="py-3 px-4 font-semibold">{row.frist}</td>
                    <td className="py-3 px-4 text-[0.84rem] text-ink-muted">{row.termin}</td>
                    <td className="py-3 px-4 text-[0.84rem] text-ink-muted">{row.paragraph}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[0.84rem] text-ink-muted mt-4 max-w-[740px]">
            Fristen gelten für Arbeitgeberkündigungen. Arbeitsvertragliche oder tarifliche Regelungen
            können längere Fristen vorsehen. Berechnen Sie Ihre individuelle Frist mit dem{' '}
            <Link href="/kuendigungsfrist-rechner/" className="text-gold-dark font-semibold no-underline hover:underline">
              Kündigungsfrist-Rechner &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Wurde Ihre Kündigungsfrist eingehalten?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Viele Kündigungen scheitern an der falschen Frist. Wir prüfen kostenlos,
            ob Ihre Kündigung fristgerecht ist.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Kündigung prüfen lassen &rarr;
            </a>
            <Link
              href="/kuendigungsfrist-rechner/"
              className="inline-block py-3.5 px-8 bg-white text-gold-dark border border-gold rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-cream"
            >
              Frist berechnen
            </Link>
          </div>
        </div>
      </section>

      {/* Sonderfälle */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Sonderfälle
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Besondere Kündigungsfristen
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Fristlose Kündigung (§626 BGB)',
                  desc: 'Bei einem wichtigen Grund kann das Arbeitsverhältnis sofort beendet werden — ohne Einhaltung einer Kündigungsfrist. Die fristlose Kündigung muss innerhalb von 2 Wochen nach Kenntnis des Grundes ausgesprochen werden.',
                  link: '/fristlose-kuendigung/',
                },
                {
                  title: 'Probezeit (§622 Abs. 3 BGB)',
                  desc: 'Während der Probezeit (max. 6 Monate) gilt eine verkürzte Frist von 2 Wochen — ohne festen Endtermin. Die Kündigung kann also jederzeit ausgesprochen werden.',
                },
                {
                  title: 'Tarifvertragliche Fristen',
                  desc: 'Tarifverträge können sowohl längere als auch kürzere Fristen vorsehen als das Gesetz. Prüfen Sie Ihren anwendbaren Tarifvertrag — er hat Vorrang vor §622 BGB.',
                },
                {
                  title: 'Schwerbehinderte Arbeitnehmer',
                  desc: 'Für die Kündigung schwerbehinderter Arbeitnehmer ist die Zustimmung des Integrationsamts erforderlich. Die Kündigungsfrist beträgt mindestens 4 Wochen (§169 SGB IX).',
                },
              ].map((item) => (
                <div key={item.title} className="py-5 px-5 bg-white border border-border rounded-sm">
                  <span className="font-semibold">{item.title}</span>
                  <span className="block text-[0.84rem] text-ink-muted mt-1">{item.desc}</span>
                  {item.link && (
                    <Link href={item.link} className="text-[0.84rem] text-gold-dark font-semibold no-underline hover:underline mt-2 inline-block">
                      Mehr erfahren &rarr;
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Berechnung Schritt für Schritt */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Anleitung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Berechnung der Kündigungsfrist &ndash; Schritt für Schritt
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
              Um Ihre persönliche Kündigungsfrist zu bestimmen, gehen Sie in der folgenden Reihenfolge vor.
              Es gilt immer die <strong>für den Arbeitnehmer günstigste Regelung</strong>.
            </p>
            <div className="space-y-4 mb-6">
              {[
                {
                  step: '1',
                  title: 'Arbeitsvertrag prüfen',
                  desc: 'Schauen Sie zuerst in Ihren Arbeitsvertrag. Enthält er eine eigene Kündigungsfrist? Wenn ja, gilt diese — sofern sie nicht unter den gesetzlichen Mindestfristen liegt. Viele Arbeitsverträge enthalten Formulierungen wie „Es gilt eine Kündigungsfrist von 3 Monaten zum Quartalsende".',
                },
                {
                  step: '2',
                  title: 'Tarifvertrag prüfen',
                  desc: 'Gilt für Ihr Arbeitsverhältnis ein Tarifvertrag? Tarifverträge können sowohl längere als auch kürzere Fristen als §622 BGB vorsehen (§622 Abs. 4 BGB). Prüfen Sie, ob der Tarifvertrag unmittelbar gilt (Tarifbindung) oder im Arbeitsvertrag in Bezug genommen wird.',
                },
                {
                  step: '3',
                  title: 'Gesetzliche Frist nach §622 BGB bestimmen',
                  desc: 'Berechnen Sie anhand der obigen Tabelle die gesetzliche Mindestfrist. Entscheidend ist die ununterbrochene Betriebszugehörigkeit zum Zeitpunkt des Kündigungszugangs. Zeiten vor dem 25. Lebensjahr zählen seit dem EuGH-Urteil (C-555/07) ebenfalls mit.',
                },
                {
                  step: '4',
                  title: 'Günstigkeitsvergleich — längste Frist gilt',
                  desc: 'Vergleichen Sie alle drei Fristen. Für den Arbeitnehmer gilt immer die längste Frist. Eine arbeitsvertragliche oder tarifliche Frist kann die gesetzliche Frist nur verlängern, nie unterschreiten (Ausnahme: Tarifvertrag nach §622 Abs. 4 BGB).',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 py-5 px-5 bg-cream border border-border rounded-sm">
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

      {/* Arbeitsvertrag vs. Gesetz */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Vertragliche Regelung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Kündigungsfrist im Arbeitsvertrag vs. Gesetz
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Arbeitsverträge dürfen die gesetzlichen Kündigungsfristen <strong>verlängern</strong>, aber
              grundsätzlich nicht <strong>verkürzen</strong>. Eine Verkürzung unter die gesetzlichen
              Mindestfristen ist nur durch Tarifvertrag möglich (&sect;622 Abs.&nbsp;4 BGB) oder bei
              Aushilfen, die nicht länger als 3 Monate beschäftigt werden (&sect;622 Abs.&nbsp;5 BGB).
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              <strong>Wichtige Einschränkung:</strong> Nach &sect;622 Abs.&nbsp;6 BGB darf die
              Kündigungsfrist für den Arbeitnehmer nicht länger sein als die für den Arbeitgeber.
              Enthält Ihr Arbeitsvertrag beispielsweise eine Klausel wie &bdquo;Der Arbeitnehmer kann
              mit einer Frist von 6 Monaten kündigen, der Arbeitgeber mit 3 Monaten&ldquo;, ist die
              Klausel für den Arbeitnehmer unwirksam &mdash; es gilt dann die Arbeitgeberfrist auch
              für den Arbeitnehmer.
            </p>
            <h3 className="font-serif text-[1.05rem] font-bold mb-3">
              Häufige unwirksame Klauseln
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-5">
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>&bdquo;Es gilt die gesetzliche Kündigungsfrist&ldquo;</strong> &mdash; korrekt,
                aber die verlängerten Fristen nach &sect;622 Abs.&nbsp;2 BGB gelten dann nur für den
                Arbeitgeber, nicht für den Arbeitnehmer.
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>&bdquo;Kündigungsfrist 2 Wochen&ldquo; (außerhalb der Probezeit)</strong> &mdash;
                unwirksam, da unter der gesetzlichen Grundfrist von 4 Wochen. Es gilt automatisch
                &sect;622 Abs.&nbsp;1 BGB.
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>&bdquo;Kündigung jederzeit möglich&ldquo;</strong> &mdash; unwirksam. Auch in
                der Probezeit gilt eine Mindestfrist von 2 Wochen.
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                <strong>Ungleiche Fristen zu Lasten des Arbeitnehmers</strong> &mdash; verstoßen gegen
                &sect;622 Abs.&nbsp;6 BGB und sind unwirksam.
              </li>
            </ul>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Bei <strong>Formulararbeitsverträgen</strong> (vorformulierte Standardverträge) unterliegen
              Kündigungsfristen zusätzlich der AGB-Kontrolle nach &sect;&sect;305&ndash;310 BGB.
              Überraschende oder unangemessen benachteiligende Klauseln sind unwirksam.
            </p>
          </div>
        </div>
      </section>

      {/* Frist nicht eingehalten */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Falsche Frist
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Kündigungsfrist nicht eingehalten &ndash; was tun?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Hat der Arbeitgeber mit einer zu kurzen Frist gekündigt, bedeutet das nicht automatisch,
              dass die Kündigung unwirksam ist. Die Rechtsprechung des Bundesarbeitsgerichts unterscheidet
              zwei Fälle:
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6 max-md:grid-cols-1">
              <div className="py-5 px-5 bg-cream border border-border rounded-sm">
                <h3 className="font-serif text-[1rem] font-bold mb-2">Umdeutung zum nächsten Termin</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed">
                  In der Regel wird eine Kündigung mit zu kurzer Frist in eine Kündigung zum
                  <strong> nächstmöglichen zulässigen Termin</strong> umgedeutet (&sect;140 BGB). Das
                  Arbeitsverhältnis endet dann nicht zum falschen, sondern zum korrekten Termin. Sie
                  haben Anspruch auf Lohn bis zum richtigen Endtermin.
                </p>
              </div>
              <div className="py-5 px-5 bg-cream border border-border rounded-sm">
                <h3 className="font-serif text-[1rem] font-bold mb-2">Unwirksamkeit der Kündigung</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed">
                  Ist die Frist <strong>so erheblich unterschritten</strong>, dass eine Umdeutung nicht
                  mehr dem Willen des Arbeitgebers entspricht, kann die gesamte Kündigung unwirksam sein.
                  Dies ist aber die Ausnahme und muss im Einzelfall geprüft werden.
                </p>
              </div>
            </div>
            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold mb-5">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Wichtig: Auch bei einer Kündigung mit falscher Frist müssen Sie innerhalb von
                3 Wochen Kündigungsschutzklage einreichen (&sect;4 KSchG). Die Umdeutung erfolgt
                nicht automatisch &mdash; Sie müssen sich aktiv wehren.
              </p>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              <strong>Schadensersatz:</strong> Wenn der Arbeitgeber die Kündigungsfrist vorsätzlich oder
              grob fahrlässig nicht eingehalten hat, können Sie Schadensersatz verlangen &mdash; etwa für
              entgangenen Lohn oder Kosten der Stellensuche. In der Praxis wird dies oft im Rahmen des
              Vergleichs vor dem Arbeitsgericht mitverhandelt.
            </p>
          </div>
        </div>
      </section>

      {/* Kündigungstermine richtig berechnen */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Praxis
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Kündigungstermine richtig berechnen
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die korrekte Berechnung des Kündigungstermins ist entscheidend. Fehler führen dazu, dass
              die Kündigung zum falschen Termin wirkt &mdash; oder gar unwirksam ist.
            </p>
            <h3 className="font-serif text-[1.05rem] font-bold mb-3">
              Was bedeutet &bdquo;zum 15.&ldquo; und &bdquo;zum Monatsende&ldquo;?
            </h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die Grundkündigungsfrist von 4 Wochen kann nur zu zwei festen Terminen enden: zum
              <strong> 15. eines Monats</strong> oder zum <strong>letzten Tag eines Monats</strong>.
              Das bedeutet: Wenn Sie am 3.&nbsp;März eine Kündigung mit 4 Wochen Frist erhalten, endet
              das Arbeitsverhältnis nicht am 31.&nbsp;März, sondern erst am <strong>15.&nbsp;April</strong>
              &mdash; dem nächsten zulässigen Termin nach Ablauf der 4 Wochen.
            </p>
            <h3 className="font-serif text-[1.05rem] font-bold mb-3">
              Wann beginnt die Frist?
            </h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die Kündigungsfrist beginnt mit dem <strong>Zugang</strong> der Kündigung (&sect;130 BGB).
              Bei persönlicher Übergabe ist das der Tag der Übergabe. Bei Einwurf in den Briefkasten
              gilt die Kündigung als zugegangen, wenn mit der nächsten Leerung zu rechnen ist &mdash;
              bei Einwurf an einem Werktag bis 18:00 Uhr ist das in der Regel noch derselbe Tag. Ein
              Einwurf am Samstagnachmittag oder Sonntag gilt erst am nächsten Werktag (Montag) als
              zugegangen.
            </p>
            <h3 className="font-serif text-[1.05rem] font-bold mb-3">
              Rechenbeispiel
            </h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              <strong>Situation:</strong> Sie arbeiten seit 12 Jahren im Unternehmen. Am Mittwoch,
              5.&nbsp;März {year}, erhalten Sie die Kündigung.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                Gesetzliche Frist nach &sect;622 Abs.&nbsp;2 Nr.&nbsp;5 BGB: <strong>5 Monate zum Monatsende</strong>
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                Zugang: 5.&nbsp;März {year}
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                5 Monate ab Zugang: 5.&nbsp;August {year}
              </li>
              <li className="text-[0.95rem] text-ink-light leading-relaxed">
                Nächstes Monatsende: <strong>31.&nbsp;August {year}</strong> &mdash; das ist der frühestmögliche
                Beendigungstermin
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link
              href="/kuendigungsfrist-rechner/"
              className="block py-6 px-6 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Tool
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Kündigungsfrist-Rechner
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Berechnen Sie Ihre individuelle Frist taggenau. &rarr;
              </span>
            </Link>
            <Link
              href="/kuendigungsschutzklage/"
              className="block py-6 px-6 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
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
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zu Kündigungsfristen
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Author */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
            <ShareButtons url="/kuendigungsfristen/" title="Kündigungsfristen nach §622 BGB – Tabelle" />
          </div>
        </div>
      </section>

      <AktuelleRechtslage />
      <Quellen quellen={QUELLEN_KUENDIGUNGSFRISTEN} />
      <RelatedTopics current="kuendigungsfristen" />

      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/kuendigungsfristen" />
        </div>
      </section>

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Wurde Ihre Kündigungsfrist korrekt berechnet?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Fehlerhafte Fristen machen Kündigungen angreifbar. Wir prüfen Ihre
            Kündigung kostenlos und schätzen Ihre Chancen ein.
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
