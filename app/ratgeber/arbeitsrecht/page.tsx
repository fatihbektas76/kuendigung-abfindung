import Link from 'next/link';
import StandAnzeige from '@/components/StandAnzeige';
import AuthorBox from '@/components/AuthorBox';
import ShareButtons from '@/components/ShareButtons';
import SeoGeoBase from '@/components/SeoGeoBase';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';
import { SEO_CONFIG, buildMetadata } from '@/lib/seo-config';
import { PAGE_DATES } from '@/lib/page-dates';

export const revalidate = 86400;

const PAGE_URL = `${SEO_CONFIG.baseUrl}/ratgeber/arbeitsrecht/`;
const year = new Date().getFullYear();

export const metadata = buildMetadata({
  title: `Arbeitsrecht-Ratgeber: Praxis-Artikel zu Kündigung & Abfindung ${year}`,
  description:
    'Fachanwalt-Ratgeber zum deutschen Arbeitsrecht: Kündigungsschutz, Kündigungsfristen, Abfindung, betriebsbedingte Kündigung. Mit BAG-Urteilen, Gesetzes-Links und Praxis-Beispielen.',
  path: '/ratgeber/arbeitsrecht',
});

interface Article {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  facts: string[];
  dateKey: keyof typeof PAGE_DATES;
}

const articles: Article[] = [
  {
    href: '/kuendigungsschutzgesetz-anwendung/',
    eyebrow: 'Kündigungsschutz',
    title: 'Wann findet das Kündigungsschutzgesetz Anwendung?',
    description:
      'Wartezeit, Schwellenwert (mehr als 10 Arbeitnehmer), Teilzeit-Zählweise, Leiharbeit, Gemeinschaftsbetrieb und Beweislast — inklusive BAG-Urteilen.',
    facts: [
      '§ 1 Abs. 1 KSchG: 6 Monate Wartezeit',
      '§ 23 Abs. 1 Satz 3 KSchG: > 10 Arbeitnehmer',
      'BAG 2 AZR 140/12 (Leiharbeit) & 2 AZR 560/20 (Gemeinschaftsbetrieb)',
    ],
    dateKey: 'kuendigungsschutzgesetzAnwendung',
  },
  {
    href: '/kuendigungsschutzklage/',
    eyebrow: 'Klageverfahren',
    title: 'Kündigungsschutzklage: Ablauf, Kosten & 3-Wochen-Frist',
    description:
      'Verfahren vor dem Arbeitsgericht: Gütetermin, Kammertermin, typische Abfindung im Vergleich. Kostenrisiko nach § 12a ArbGG erklärt.',
    facts: [
      '§ 4 KSchG: 3 Wochen Klagefrist',
      '§ 12a ArbGG: keine Erstattung Gegneranwalt im 1. Rechtszug',
      'Ca. 80 % der Klagen enden mit Vergleich + Abfindung',
    ],
    dateKey: 'kuendigungsschutzklage',
  },
  {
    href: '/betriebsbedingte-kuendigung/',
    eyebrow: 'Kündigungsgrund',
    title: 'Betriebsbedingte Kündigung: Sozialauswahl & Abfindung',
    description:
      'Voraussetzungen einer wirksamen betriebsbedingten Kündigung, Sozialauswahl nach § 1 Abs. 3 KSchG, Abfindungsanspruch nach § 1a KSchG.',
    facts: [
      'Dringende betriebliche Erfordernisse erforderlich',
      'Sozialauswahl: Alter, Dauer, Unterhalt, Schwerbehinderung',
      '§ 1a KSchG: 0,5 Monatsgehälter / Jahr als Regelabfindung',
    ],
    dateKey: 'betriebsbedingteKuendigung',
  },
  {
    href: '/kuendigungsfristen/',
    eyebrow: 'Fristen',
    title: 'Kündigungsfristen nach § 622 BGB — Komplette Tabelle',
    description:
      'Gesetzliche Kündigungsfristen für Arbeitnehmer und Arbeitgeber, Sonderfälle (Probezeit, Tarifvertrag, fristlose Kündigung), Zugang und Fristberechnung.',
    facts: [
      '§ 622 BGB: gesetzliche Fristen je nach Betriebszugehörigkeit',
      'Probezeit: 2 Wochen Frist',
      '20 Jahre Betriebszugehörigkeit = 7 Monate zum Monatsende',
    ],
    dateKey: 'kuendigungsfristen',
  },
  {
    href: '/abfindungstabelle/',
    eyebrow: 'Abfindung',
    title: 'Abfindungstabelle: Höhe nach Gehalt & Betriebszugehörigkeit',
    description:
      'Konkrete Abfindungsbeispiele in Euro für 1 bis 30 Jahre Betriebszugehörigkeit und verschiedene Gehaltsstufen. Faustformel und Realwerte aus Vergleichen.',
    facts: [
      'Faustformel: 0,5–1,5 Monatsgehälter pro Beschäftigungsjahr',
      'Realwerte aus Arbeitsgerichts-Vergleichen',
      'Fünftelregelung (§ 34 EStG) zur Steueroptimierung',
    ],
    dateKey: 'abfindungstabelle',
  },
];

export default function RatgeberArbeitsrechtPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={PAGE_URL}
        pageTitle="Arbeitsrecht-Ratgeber: Praxis-Artikel zu Kündigung, Abfindung & Aufhebungsvertrag"
        pageDescription="Fachanwalt-Ratgeber zum deutschen Arbeitsrecht. Praxis-Artikel zu Kündigungsschutz, Kündigungsfristen, betriebsbedingter Kündigung und Abfindung — mit BAG-Urteilen und Gesetzes-Links."
        pageType="CollectionPage"
        includeOrganization={false}
        includeRating={false}
        dateModified={PAGE_DATES.ratgeberArbeitsrecht}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber/` },
          { name: 'Arbeitsrecht', url: PAGE_URL },
        ]}
      />

      {/* Schema.org — ItemList für die Artikel-Sammlung (GEO/Citability) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Arbeitsrecht-Ratgeber: Praxis-Artikel',
            description:
              'Sammlung zentraler Arbeitsrechts-Artikel zu Kündigungsschutz, Kündigungsfristen, betriebsbedingter Kündigung und Abfindung.',
            itemListElement: articles.map((a, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SEO_CONFIG.baseUrl}${a.href}`,
              name: a.title,
            })),
          }),
        }}
      />

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/ratgeber" className="text-gold no-underline hover:underline">Ratgeber</Link>
            <span className="mx-2">/</span>
            <span>Arbeitsrecht</span>
          </nav>
          <StandAnzeige modifiedAt={PAGE_DATES.ratgeberArbeitsrecht} />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Arbeitsrecht-Ratgeber
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[820px]">
            Praxis-Artikel zu Kündigung, Abfindung &amp; Aufhebungsvertrag
          </h1>
          <p className="text-[1.05rem] text-ink-light max-w-[680px] leading-relaxed mt-4">
            Vertiefte Ratgeber-Artikel zu den zentralen Themen des deutschen Arbeitsrechts &mdash;
            mit Gesetzesgrundlagen, BAG-Urteilen und konkreten Praxis-Beispielen. Verfasst und
            geprüft von Fachanwalt für Arbeitsrecht Fatih Bektas, APOS Legal.
          </p>
        </div>
      </div>

      {/* Direktantwort / GEO-Block */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <p className="text-[1.05rem] text-ink-light leading-relaxed">
              Die hier gesammelten Artikel beantworten die häufigsten arbeitsrechtlichen Fragen
              nach einer Kündigung &mdash; <strong>wann das Kündigungsschutzgesetz greift</strong>,
              <strong> welche Fristen</strong> gelten, <strong>wie eine Kündigungsschutzklage abläuft</strong>,
              <strong> wann eine betriebsbedingte Kündigung wirksam ist</strong> und
              <strong> welche Abfindung realistisch ist</strong>. Jeder Artikel ist nach demselben
              Prinzip aufgebaut: Direktantwort, Definition, Gesetzes-Links, BAG-Rechtsprechung,
              FAQ und konkrete Handlungsempfehlung.
            </p>
          </div>
        </div>
      </section>

      {/* Artikel-Karten */}
      <section className="py-[40px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {articles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="block border border-border rounded-sm overflow-hidden no-underline hover:border-gold hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.12)] transition-all bg-white"
              >
                <div className="p-6">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                    {article.eyebrow}
                  </div>
                  <h2 className="font-serif text-[1.25rem] font-bold text-ink mb-2 leading-[1.3]">
                    {article.title}
                  </h2>
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-4">
                    {article.description}
                  </p>
                  <ul className="list-none space-y-1.5 mb-4">
                    {article.facts.map((fact) => (
                      <li key={fact} className="flex items-start gap-2 text-[0.82rem] text-ink-muted">
                        <span className="text-gold mt-0.5">&#10003;</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[0.88rem] font-semibold text-gold-dark">
                    Zum Artikel &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link zu Tools */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px] grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link
              href="/tools/"
              className="block py-6 px-6 bg-white border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Werkzeuge
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Tools &amp; Rechner
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Abfindungsrechner, Schwellenwert-Rechner, Kündigungscheck &amp; mehr. &rarr;
              </span>
            </Link>
            <Link
              href="/glossar/"
              className="block py-6 px-6 bg-white border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Nachschlagewerk
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Glossar Arbeitsrecht
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Begriffe von Abfindung bis Zeugnis &mdash; mit Rechtsgrundlage. &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <AuthorBox />
            <ShareButtons
              url="/ratgeber/arbeitsrecht/"
              title="Arbeitsrecht-Ratgeber: Praxis-Artikel"
            />
          </div>
        </div>
      </section>

      {/* BERT-Interlinker */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/ratgeber/arbeitsrecht" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Persönliche Beratung
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Ratgeber gelesen, aber unsicher im konkreten Fall?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Lassen Sie Ihren Fall vom Fachanwalt prüfen &mdash; kostenlose
            Ersteinschätzung innerhalb von 24 Stunden.
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
