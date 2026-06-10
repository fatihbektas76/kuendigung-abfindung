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
import { QUELLEN_KUENDIGUNGSSCHUTZKLAGE } from '@/lib/quellen-defaults';
import { generateArticleSchema } from '@/lib/article-schema';

export const revalidate = 86400;

const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kündigungsschutzklage ${year} — Ablauf, Kosten & Frist [3 Wochen]`,
  description:
    'Kündigungsschutzklage: 3-Wochen-Frist beachten! Ablauf, Kosten (keine Anwaltskosten-Erstattung §12a ArbGG), Erfolgsquote & Abfindung. Fachanwalt prüft kostenlos.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/kuendigungsschutzklage/`,
  },
  openGraph: {
    title: `Kündigungsschutzklage ${year} — Ablauf, Kosten & Frist`,
    description:
      'Kündigungsschutzklage: 3-Wochen-Frist, Kosten nach §12a ArbGG, Ablauf & Abfindung im Vergleich. Fachanwalt für Arbeitsrecht.',
    url: `${SEO_CONFIG.baseUrl}/kuendigungsschutzklage/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Kündigungsschutzklage ${year} — Ablauf, Kosten & Frist`,
    description:
      'Kündigungsschutzklage: 3-Wochen-Frist, Kosten nach §12a ArbGG, Ablauf & Abfindung im Vergleich. Fachanwalt für Arbeitsrecht.',
  },
};

const faqs = [
  {
    q: 'Was kostet eine Kündigungsschutzklage?',
    a: 'Im ersten Rechtszug vor dem Arbeitsgericht trägt jede Partei ihre eigenen Anwaltskosten — unabhängig vom Ausgang (§12a ArbGG). Es gibt also kein Prozesskostenrisiko für gegnerische Anwaltskosten. Die Gerichtskosten entfallen bei einem Vergleich (ca. 80% der Fälle). Bei einem Streitwert von 12.000 € (3 Monatsgehälter) betragen die eigenen Anwaltskosten ca. 1.500–2.500 €. Mit Rechtsschutzversicherung oder Prozesskostenhilfe können diese Kosten entfallen.',
  },
  {
    q: 'Wie lange dauert eine Kündigungsschutzklage?',
    a: 'Der Gütetermin findet in der Regel 2–6 Wochen nach Klageeinreichung statt. Ca. 80% der Fälle enden hier mit einem Vergleich (Abfindung). Kommt kein Vergleich zustande, folgt der Kammertermin nach weiteren 2–4 Monaten. Insgesamt dauert ein Verfahren im ersten Rechtszug typischerweise 2–6 Monate.',
  },
  {
    q: 'Wie hoch ist die Abfindung bei einer Kündigungsschutzklage?',
    a: 'Im Vergleich vor dem Arbeitsgericht werden typischerweise 0,5–1,5 Bruttomonatsgehälter pro Beschäftigungsjahr vereinbart. Die Höhe hängt von der Wirksamkeit der Kündigung, der Betriebszugehörigkeit, dem Alter und der Verhandlungsposition ab. Bei 10 Jahren Betriebszugehörigkeit und 4.000 € Gehalt sind 20.000–60.000 € Abfindung realistisch.',
  },
  {
    q: 'Muss ich eine Kündigungsschutzklage einreichen?',
    a: 'Wenn Sie die 3-Wochen-Frist nach §4 KSchG versäumen, gilt die Kündigung als wirksam — auch wenn sie eigentlich unwirksam wäre. Eine Kündigungsschutzklage ist der einzige Weg, sich gegen eine Kündigung zu wehren und eine Abfindung zu verhandeln. Ohne Klage gibt es in der Regel keine Abfindung.',
  },
  {
    q: 'Kann ich die Kündigungsschutzklage auch ohne Anwalt einreichen?',
    a: 'Ja, vor dem Arbeitsgericht besteht kein Anwaltszwang. Sie können die Klage selbst bei der Rechtsantragsstelle des Arbeitsgerichts einreichen. Allerdings ist anwaltliche Vertretung dringend empfohlen: Die Verhandlungsposition bei Abfindungsgesprächen ist mit Anwalt deutlich besser, und formale Fehler können die Klage gefährden.',
  },
];

export default function KuendigungsschutzKlagePage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/kuendigungsschutzklage/`}
        pageTitle="Kündigungsschutzklage – Ablauf, Kosten & Frist"
        pageDescription="Kündigungsschutzklage: 3-Wochen-Frist, Kosten, Ablauf und Abfindung. Fachanwalt für Arbeitsrecht."
        pageType="WebPage"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['.faq-section']}
        dateModified={PAGE_DATES.kuendigungsschutzklage}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung/` },
          { name: 'Kündigungsschutzklage', url: `${SEO_CONFIG.baseUrl}/kuendigungsschutzklage/` },
        ]}
        datePublished="2026-05-26"
        isBasedOn={[
          { name: 'Kündigungsschutzgesetz (KSchG) §4', url: 'https://www.gesetze-im-internet.de/kschg/__4.html' },
          { name: 'Arbeitsgerichtsgesetz (ArbGG) §12a', url: 'https://www.gesetze-im-internet.de/arbgg/__12a.html' },
          { name: 'Kündigungsschutzgesetz (KSchG) §9', url: 'https://www.gesetze-im-internet.de/kschg/__9.html' },
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
            headline: 'Kündigungsschutzklage – Ablauf, Kosten & Frist',
            description: 'Kündigungsschutzklage: 3-Wochen-Frist, Kosten nach §12a ArbGG, Ablauf und Abfindung.',
            dateModified: PAGE_DATES.kuendigungsschutzklage,
            url: `${SEO_CONFIG.baseUrl}/kuendigungsschutzklage/`,
            articleSection: 'Kündigungsschutzklage',
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
            <span>Kündigungsschutzklage</span>
          </nav>
          <StandAnzeige modifiedAt={PAGE_DATES.kuendigungsschutzklage} />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Ratgeber Kündigungsschutzklage
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Kündigungsschutzklage &ndash; Ablauf, Kosten &amp; Frist
          </h1>
        </div>
      </div>

      {/* TL;DR */}
      <section className="px-8 pt-4 pb-0 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <TldrBox items={[
              '3-Wochen-Frist ab Zugang der Kündigung — versäumen Sie diese Frist, ist die Kündigung automatisch wirksam.',
              'Keine Erstattung gegnerischer Anwaltskosten im 1. Rechtszug (§12a ArbGG) — das Kostenrisiko ist überschaubar.',
              'Ca. 80% der Kündigungsschutzklagen enden mit einem Vergleich (= Abfindung).',
              'Typische Abfindung: 0,5–1,5 Monatsgehälter pro Beschäftigungsjahr.',
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
                Wichtig: Die Klagefrist nach &sect;4 KSchG beträgt exakt 3 Wochen ab Zugang der
                Kündigung. Danach ist keine Klage mehr möglich.
              </p>
            </div>

            <div id="direktantwort">
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
                Die <strong>Kündigungsschutzklage</strong> ist Ihr wichtigstes Instrument gegen
                eine unwirksame Kündigung. Sie muss innerhalb von <strong>3 Wochen ab Zugang
                der Kündigung</strong> beim Arbeitsgericht eingereicht werden (&sect;4 KSchG).
                Nach Ablauf dieser Frist gilt die Kündigung als wirksam &mdash; auch wenn sie
                eigentlich rechtswidrig wäre.
              </p>
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
                Eine Besonderheit des Arbeitsrechts: Im ersten Rechtszug gibt es
                <strong> keine Erstattung der gegnerischen Anwaltskosten</strong> (&sect;12a ArbGG).
                Das bedeutet: Selbst wenn Sie verlieren, müssen Sie nicht den Anwalt des Arbeitgebers
                bezahlen. Das Kostenrisiko ist damit deutlich geringer als in anderen Rechtsgebieten.
              </p>
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-8">
                In der Praxis enden <strong>ca. 80% aller Kündigungsschutzklagen</strong> mit
                einem Vergleich beim Gütetermin &mdash; der Arbeitgeber zahlt eine Abfindung,
                das Arbeitsverhältnis endet einvernehmlich. Ohne Klage gibt es in der Regel
                keine Abfindung.
              </p>
            </div>

            <DefinitionBox
              term="Kündigungsschutzklage (§4 KSchG)"
              definition="Die Kündigungsschutzklage ist eine Klage vor dem Arbeitsgericht, mit der der Arbeitnehmer feststellen lässt, dass eine Kündigung sozial ungerechtfertigt und damit unwirksam ist. Sie muss innerhalb von 3 Wochen ab Zugang der Kündigung erhoben werden."
            />

            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Klage-Chancen kostenlos prüfen lassen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Verfahren
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3.5">
            Ablauf der Kündigungsschutzklage
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-8">
            Von der Klageeinreichung bis zum Vergleich oder Urteil &mdash; so läuft das
            Verfahren vor dem Arbeitsgericht ab.
          </p>
          <div className="max-w-[740px] space-y-4">
            {[
              {
                step: '1',
                title: 'Klageeinreichung (innerhalb 3 Wochen)',
                desc: 'Die Klage wird beim zuständigen Arbeitsgericht eingereicht. Der Anwalt formuliert die Klageschrift und begründet, warum die Kündigung unwirksam ist.',
              },
              {
                step: '2',
                title: 'Gütetermin (2–6 Wochen nach Klage)',
                desc: 'Richter, Arbeitnehmer und Arbeitgeber verhandeln über einen Vergleich. Ca. 80% der Fälle enden hier mit einer Abfindungsvereinbarung.',
              },
              {
                step: '3',
                title: 'Kammertermin (falls kein Vergleich)',
                desc: 'Kommt im Gütetermin kein Vergleich zustande, folgt der Kammertermin mit Beweisaufnahme und Verhandlung. Termin: 2–4 Monate nach Gütetermin.',
              },
              {
                step: '4',
                title: 'Urteil oder Vergleich',
                desc: 'Das Gericht entscheidet über die Wirksamkeit der Kündigung. Auch im Kammertermin ist ein Vergleich noch möglich. Bei Feststellung der Unwirksamkeit wird das Arbeitsverhältnis fortgesetzt oder gegen Abfindung aufgelöst (§9 KSchG).',
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
      </section>

      {/* Kosten */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Kosten
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Was kostet eine Kündigungsschutzklage?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die Kosten einer Kündigungsschutzklage sind im Arbeitsrecht besonders
              arbeitnehmerfreundlich geregelt:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-[0.9rem] border-collapse">
                <thead>
                  <tr className="border-b-2 border-gold">
                    <th className="text-left py-3 px-4 font-semibold">Position</th>
                    <th className="text-right py-3 px-4 font-semibold">Kosten</th>
                    <th className="text-left py-3 px-4 font-semibold">Hinweis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pos: 'Eigene Anwaltskosten', kosten: 'ca. 1.500–2.500 €', hinweis: 'Bei Streitwert 12.000 € (3 Monatsgehälter)' },
                    { pos: 'Gegnerische Anwaltskosten', kosten: '0 €', hinweis: '§12a ArbGG — keine Erstattung im 1. Rechtszug' },
                    { pos: 'Gerichtskosten (Vergleich)', kosten: '0 €', hinweis: 'Entfallen bei Vergleich (ca. 80% der Fälle)' },
                    { pos: 'Gerichtskosten (Urteil)', kosten: 'ca. 300–600 €', hinweis: 'Nur bei Urteil, nicht bei Vergleich' },
                  ].map((row) => (
                    <tr key={row.pos} className="border-b border-border">
                      <td className="py-3 px-4 font-medium">{row.pos}</td>
                      <td className="py-3 px-4 text-right font-semibold">{row.kosten}</td>
                      <td className="py-3 px-4 text-[0.84rem] text-ink-muted">{row.hinweis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              <strong>Rechtsschutzversicherung:</strong> Die meisten Arbeitsrechtsschutzversicherungen
              übernehmen die Kosten vollständig. Prüfen Sie Ihre Police oder fragen Sie bei uns nach.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
              <strong>Prozesskostenhilfe:</strong> Bei geringem Einkommen übernimmt der Staat die
              Kosten. Wir helfen Ihnen beim Antrag.
            </p>
            <p className="text-[0.84rem] text-ink-muted">
              Detaillierte Berechnung mit dem{' '}
              <Link href="/rvg-rechner/" className="text-gold-dark font-semibold no-underline hover:underline">
                RVG-Rechner &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Wann lohnt sich eine Kündigungsschutzklage? */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Erfolgsaussichten
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wann lohnt sich eine Kündigungsschutzklage?
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Die kurze Antwort: <strong>in den meisten Fällen</strong>. Rund 80&nbsp;% aller
              Kündigungsschutzklagen enden mit einem Vergleich, bei dem der Arbeitgeber eine
              Abfindung zahlt. Ohne Klage gibt es in der Regel keine Abfindung &mdash; der
              Arbeitgeber hat schlicht keinen Anlass, freiwillig zu zahlen.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              <strong>Besonders lohnend</strong> ist eine Klage in folgenden Situationen:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[0.95rem] text-ink-light leading-relaxed mb-6">
              <li>
                <strong>Lange Betriebszugehörigkeit</strong> &mdash; je länger Sie im Unternehmen
                sind, desto höher fällt die Abfindung aus (Faustformel: 0,5&ndash;1,5
                Monatsgehälter pro Beschäftigungsjahr).
              </li>
              <li>
                <strong>Höheres Lebensalter</strong> &mdash; ältere Arbeitnehmer haben auf dem
                Arbeitsmarkt schlechtere Chancen, was Gerichte bei der Abfindungshöhe
                berücksichtigen (&sect;10 Abs.&nbsp;2 KSchG: bis zu 18 Monatsgehälter ab 55 Jahren
                und 20 Jahren Betriebszugehörigkeit).
              </li>
              <li>
                <strong>Offensichtliche Fehler des Arbeitgebers</strong> &mdash; fehlende
                Betriebsratsanhörung (&sect;102 BetrVG), mangelhafte Sozialauswahl oder formale
                Mängel der Kündigung stärken Ihre Verhandlungsposition erheblich.
              </li>
              <li>
                <strong>Sonderkündigungsschutz</strong> &mdash; Schwangere, Betriebsratsmitglieder,
                Schwerbehinderte und Elternzeitler genießen besonderen Schutz, der eine Kündigung
                fast immer angreifbar macht.
              </li>
            </ul>

            <h3 className="font-serif text-[1.15rem] font-bold mb-3">Kostenrisiko überschaubar</h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die Besonderheit des Arbeitsgerichtsverfahrens nach <strong>&sect;12a ArbGG</strong>:
              Jede Partei trägt ihre eigenen Anwaltskosten &mdash; unabhängig vom Ausgang. Sie
              müssen also selbst bei einem Verlust nicht den Anwalt des Arbeitgebers bezahlen.
              Mit einer <strong>Rechtsschutzversicherung</strong> entfallen die Kosten vollständig.
              Ohne Versicherung ist <strong>Prozesskostenhilfe</strong> möglich, wenn Ihr Einkommen
              unter den Grenzen liegt (&sect;&sect;114 ff. ZPO).
            </p>

            <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold mb-6">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Einzige Ausnahme: Wenn die Kündigung eindeutig wirksam ist (z.&nbsp;B.
                rechtskräftige Abmahnung, nachweisbares Fehlverhalten) und die
                Betriebszugehörigkeit sehr kurz ist, kann eine Klage wirtschaftlich wenig
                sinnvoll sein. Auch hier lohnt sich jedoch eine anwaltliche Ersteinschätzung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gütetermin */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Verhandlung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Gütetermin &ndash; was Sie erwartet
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Der Gütetermin ist der wichtigste Termin im Kündigungsschutzverfahren. Er findet
              in der Regel <strong>2&ndash;6 Wochen nach Klageeinreichung</strong> statt und wird
              von einem einzelnen Berufsrichter geleitet &mdash; ohne ehrenamtliche Richter.
              Ziel ist eine gütliche Einigung, also ein <strong>Vergleich</strong>.
            </p>

            <h3 className="font-serif text-[1.15rem] font-bold mb-3">Typischer Ablauf</h3>
            <div className="space-y-3 mb-6">
              {[
                {
                  step: '1',
                  title: 'Sachverhaltsdarstellung',
                  desc: 'Der Richter fasst den Sachverhalt zusammen und gibt eine erste Einschätzung zur Rechtslage. Diese Einschätzung ist oft bereits ein deutlicher Hinweis auf die Erfolgsaussichten.',
                },
                {
                  step: '2',
                  title: 'Vergleichsvorschlag des Gerichts',
                  desc: 'Der Richter unterbreitet einen Vergleichsvorschlag — typischerweise: Ende des Arbeitsverhältnisses gegen Zahlung einer Abfindung. Die vorgeschlagene Höhe orientiert sich an der Faustformel (0,5 Monatsgehälter pro Beschäftigungsjahr), kann aber je nach Einzelfall stark variieren.',
                },
                {
                  step: '3',
                  title: 'Verhandlung über die Konditionen',
                  desc: 'Beide Seiten verhandeln über die Abfindungshöhe, das Enddatum, ein qualifiziertes Arbeitszeugnis, offene Urlaubstage und eine Freistellung. Ihr Anwalt verhandelt für Sie.',
                },
                {
                  step: '4',
                  title: 'Vergleich oder Kammertermin',
                  desc: 'Einigen sich beide Seiten, wird der Vergleich protokolliert — er ist sofort rechtskräftig und vollstreckbar. Kommt keine Einigung zustande, bestimmt der Richter einen Kammertermin (mündliche Verhandlung mit ehrenamtlichen Richtern).',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 py-4 px-5 bg-cream border border-border rounded-sm">
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

            <h3 className="font-serif text-[1.15rem] font-bold mb-3">Was im Vergleich typischerweise geregelt wird</h3>
            <ul className="list-disc pl-6 space-y-2 text-[0.95rem] text-ink-light leading-relaxed mb-6">
              <li><strong>Beendigungsdatum</strong> des Arbeitsverhältnisses (meist zum Ende der ordentlichen Kündigungsfrist)</li>
              <li><strong>Abfindungshöhe</strong> in Euro brutto</li>
              <li><strong>Qualifiziertes Arbeitszeugnis</strong> mit vereinbarter Note (typisch: &bdquo;gut&ldquo; oder &bdquo;sehr gut&ldquo;)</li>
              <li><strong>Freistellung</strong> unter Fortzahlung der Vergütung bis zum Beendigungsdatum</li>
              <li><strong>Abgeltung</strong> offener Urlaubsansprüche und Überstunden</li>
            </ul>

            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Praxis-Tipp: Bereiten Sie sich mit Ihrem Anwalt auf den Gütetermin vor. Die
                Verhandlungsposition ist am stärksten, wenn Sie die Schwächen der Kündigung
                kennen und eine klare Vorstellung Ihrer Abfindungsforderung haben.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vergleich vs. Urteil */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Entscheidung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Vergleich vs. Urteil &ndash; Vor- und Nachteile
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-6">
              Am Ende einer Kündigungsschutzklage stehen zwei mögliche Ergebnisse: ein
              <strong> gerichtlicher Vergleich</strong> oder ein <strong>Urteil</strong>. Beide
              haben unterschiedliche Vor- und Nachteile, die Sie kennen sollten.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-[0.9rem] border-collapse">
                <thead>
                  <tr className="border-b-2 border-gold">
                    <th className="text-left py-3 px-4 font-semibold">Kriterium</th>
                    <th className="text-left py-3 px-4 font-semibold">Vergleich</th>
                    <th className="text-left py-3 px-4 font-semibold">Urteil</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { k: 'Dauer', v: '2–6 Wochen (Gütetermin)', u: '3–8 Monate (Kammertermin)' },
                    { k: 'Gerichtskosten', v: 'Entfallen vollständig', u: 'Fallen an (ca. 300–600 €)' },
                    { k: 'Ergebnis', v: 'Sicher — beide Seiten einigen sich', u: 'Unsicher — Richter entscheidet' },
                    { k: 'Abfindung', v: 'Frei verhandelbar', u: 'Nur bei Auflösung nach §9 KSchG' },
                    { k: 'Zeugnis', v: 'Im Vergleich mitverhandelbar', u: 'Nicht Gegenstand des Urteils' },
                    { k: 'Rechtsmittel', v: 'Keine — sofort rechtskräftig', u: 'Berufung möglich (LAG)' },
                  ].map((row) => (
                    <tr key={row.k} className="border-b border-border">
                      <td className="py-3 px-4 font-medium">{row.k}</td>
                      <td className="py-3 px-4 text-ink-light">{row.v}</td>
                      <td className="py-3 px-4 text-ink-light">{row.u}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              <strong>Empfehlung:</strong> In den meisten Fällen ist ein <strong>Vergleich
              vorzuziehen</strong>. Er bietet Planungssicherheit, vermeidet weitere Kosten und
              ermöglicht die Verhandlung zusätzlicher Punkte (Zeugnis, Freistellung, Urlaubsabgeltung).
              Ein Urteil ist dann sinnvoll, wenn die Kündigung offensichtlich unwirksam ist und
              Sie Ihren Arbeitsplatz tatsächlich behalten möchten.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              <strong>Wichtig zu wissen:</strong> Auch nach einem Urteil, das die Unwirksamkeit der
              Kündigung feststellt, kann das Arbeitsverhältnis auf Antrag gegen Zahlung einer
              Abfindung aufgelöst werden (&sect;9 KSchG). Die Abfindung beträgt dann bis zu
              12 Monatsgehälter, bei älteren Arbeitnehmern mit langer Betriebszugehörigkeit bis zu
              18 Monatsgehälter (&sect;10 KSchG).
            </p>
          </div>
        </div>
      </section>

      {/* Kündigungsschutzklage und Arbeitslosengeld */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Arbeitslosengeld
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Kündigungsschutzklage und Arbeitslosengeld
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Viele Arbeitnehmer befürchten, dass eine Kündigungsschutzklage negative Auswirkungen
              auf ihr Arbeitslosengeld haben könnte. Das Gegenteil ist der Fall: Die Klage
              <strong> schützt Sie vor einer Sperrzeit</strong>.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6 max-md:grid-cols-1">
              <div className="py-5 px-5 bg-cream border border-border rounded-sm">
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">Keine Sperrzeit bei Klage</h3>
                <p className="text-[0.84rem] text-ink-muted m-0">
                  Wer gegen die Kündigung klagt, hat die Beendigung des Arbeitsverhältnisses
                  <strong> nicht mitverursacht</strong>. Die Agentur für Arbeit verhängt daher
                  keine Sperrzeit nach &sect;159 SGB&nbsp;III. Auch ein Vergleich führt in der
                  Regel nicht zur Sperrzeit, solange die Kündigungsfrist eingehalten wird.
                </p>
              </div>
              <div className="py-5 px-5 bg-cream border border-border rounded-sm">
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">Ruhezeit bei verkürzter Frist</h3>
                <p className="text-[0.84rem] text-ink-muted m-0">
                  Wird im Vergleich ein Beendigungsdatum <strong>vor dem regulären Ende
                  der Kündigungsfrist</strong> vereinbart, kann die Agentur für Arbeit eine
                  Ruhezeit nach &sect;158 SGB&nbsp;III anordnen. In dieser Zeit ruht der
                  Anspruch auf ALG, er entfällt aber nicht.
                </p>
              </div>
            </div>

            <h3 className="font-serif text-[1.15rem] font-bold mb-3">Was Sie bei der Arbeitslosmeldung beachten sollten</h3>
            <ul className="list-disc pl-6 space-y-2 text-[0.95rem] text-ink-light leading-relaxed mb-6">
              <li>
                <strong>Sofort arbeitssuchend melden</strong> &mdash; spätestens 3 Tage nach
                Erhalt der Kündigung bei der Agentur für Arbeit (&sect;38 SGB&nbsp;III).
                Versäumen Sie dies, droht eine einwöchige Sperrzeit.
              </li>
              <li>
                <strong>Arbeitslos melden</strong> zum tatsächlichen Ende des Arbeitsverhältnisses,
                auch wenn die Klage noch läuft.
              </li>
              <li>
                <strong>Abfindung wird nicht auf ALG angerechnet</strong> &mdash; die Abfindung
                ist kein Arbeitsentgelt und kürzt Ihr Arbeitslosengeld nicht. Dies gilt unabhängig
                von der Höhe der Abfindung.
              </li>
              <li>
                <strong>Bei Vergleich: Kündigungsfrist einhalten</strong> &mdash; vereinbaren Sie
                im Vergleich ein Beendigungsdatum, das mindestens der ordentlichen Kündigungsfrist
                nach &sect;622 BGB entspricht. So vermeiden Sie eine Ruhenszeit.
              </li>
            </ul>

            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Wichtig: Beantragen Sie Arbeitslosengeld auch während einer laufenden
                Kündigungsschutzklage. Falls Sie den Prozess gewinnen und weiter beschäftigt
                werden, zahlen Sie das ALG nicht zurück &mdash; es wird mit dem Arbeitgeber
                verrechnet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Kündigung erhalten? Die 3-Wochen-Frist läuft.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Wir prüfen Ihre Klagechancen kostenlos und schätzen die mögliche
            Abfindung ein &mdash; innerhalb von 24 Stunden.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link
              href="/betriebsbedingte-kuendigung/"
              className="block py-6 px-6 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Verwandtes Thema
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Betriebsbedingte Kündigung
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Sozialauswahl, Abfindung &amp; Ihre Rechte. &rarr;
              </span>
            </Link>
            <Link
              href="/kuendigungsfristen/"
              className="block py-6 px-6 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Übersicht
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Kündigungsfristen nach §622 BGB
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Komplette Tabelle aller gesetzlichen Fristen. &rarr;
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
            Fragen zur Kündigungsschutzklage
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Author */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
            <ShareButtons url="/kuendigungsschutzklage/" title="Kündigungsschutzklage – Ablauf, Kosten & Frist" />
          </div>
        </div>
      </section>

      <AktuelleRechtslage />
      <Quellen quellen={QUELLEN_KUENDIGUNGSSCHUTZKLAGE} />
      <RelatedTopics current="kuendigungsschutzklage" />

      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/kuendigungsschutzklage" />
        </div>
      </section>

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Jede Woche zählt. Die 3-Wochen-Frist läuft.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            80% der Kündigungsschutzklagen enden mit einem Vergleich. Lassen Sie
            sich Ihre Abfindung nicht entgehen.
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
