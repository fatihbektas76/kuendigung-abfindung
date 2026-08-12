import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import StandAnzeige from '@/components/StandAnzeige';
import AktuelleRechtslage from '@/components/AktuelleRechtslage';
import AuthorBox from '@/components/AuthorBox';
import AuthorByline from '@/components/AuthorByline';
import ShareButtons from '@/components/ShareButtons';
import RelatedTopics from '@/components/RelatedTopics';
import SeoGeoBase from '@/components/SeoGeoBase';
import TldrBox from '@/components/TldrBox';
import DefinitionBox from '@/components/DefinitionBox';
import NormLink from '@/components/NormLink';
import Quellen from '@/components/Quellen';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';
import { SEO_CONFIG } from '@/lib/seo-config';
import { PAGE_DATES } from '@/lib/page-dates';
import { QUELLEN_FREISTELLUNG } from '@/lib/quellen-defaults';
import { generateArticleSchema } from '@/lib/article-schema';

export const revalidate = 86400;

const PAGE_URL = `${SEO_CONFIG.baseUrl}/freistellung-nach-kuendigung/`;
const PAGE_TITLE = 'Freistellung nach Kündigung: BAG kippt Standardklauseln (5 AZR 108/25)';
const PAGE_DESCRIPTION =
  'BAG 25.03.2026 – 5 AZR 108/25: Formularmäßige Freistellungsklauseln sind unwirksam. Was das für Dienstwagen, Urlaub und Ihre Verhandlungsposition bedeutet.';

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ${SEO_CONFIG.siteName}`,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: 'article',
    url: PAGE_URL,
    siteName: SEO_CONFIG.siteName,
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const faqs = [
  {
    q: 'Ist jede Freistellung nach einer Kündigung unwirksam?',
    a: 'Nein. Das BAG hat mit Urteil vom 25.03.2026 (Az. 5 AZR 108/25) nur die formularmäßige Standardklausel für unwirksam erklärt, die dem Arbeitgeber pauschal das Recht zur Freistellung nach Ausspruch einer Kündigung einräumt. Der Arbeitgeber kann auch ohne wirksame Klausel einseitig freistellen, wenn im konkreten Einzelfall überwiegende schutzwerte Interessen der Beschäftigung entgegenstehen. Echte, ausgehandelte Individualvereinbarungen bleiben ebenfalls wirksam.',
  },
  {
    q: 'Darf mir der Arbeitgeber bei Freistellung den Dienstwagen wegnehmen?',
    a: 'Nicht auf Grundlage einer unwirksamen Formularklausel. Der Dienstwagen mit privater Nutzung ist Sachbezug und damit Vergütungsbestandteil. Sein Entzug bedeutet eine einseitige Vergütungskürzung. Fehlt eine wirksame Rechtsgrundlage für die Freistellung, ist auch der Widerruf der Dienstwagennutzung rechtswidrig — es entsteht ein Anspruch auf Nutzungsausfallentschädigung. Im vom BAG entschiedenen Fall standen 510 Euro brutto pro Monat im Streit.',
  },
  {
    q: 'Was ist ein gesteigertes Beschäftigungsinteresse?',
    a: 'Ein gesteigertes Beschäftigungsinteresse liegt vor, wenn die tatsächliche Beschäftigung für den Arbeitnehmer im Einzelfall besonderes Gewicht hat — etwa zum Erhalt oder zur Erlangung besonderer Fachkenntnisse, zur Sicherung der Berufserfahrung oder zur Geltung in der Berufswelt (BAG 12.09.2022 – 6 AZR 261/21; BAG 15.06.2021 – 9 AZR 217/20). Wer das schriftlich geltend macht, zwingt den Arbeitgeber zu einer echten Interessenabwägung, statt auf die pauschale Formularklausel zu verweisen.',
  },
  {
    q: 'Gilt das Urteil auch, wenn ich selbst gekündigt habe?',
    a: 'Ja. Im vom BAG entschiedenen Fall hatte der Kläger selbst zum 30. November 2024 fristgemäß gekündigt. Die formularmäßige Klausel erlaubte die Freistellung bei einer Kündigung „gleich von welcher Seite" — genau diese Pauschalität hat das BAG als unangemessene Benachteiligung nach § 307 Abs. 1 Satz 1 BGB gewertet. Die Rechtsprechung greift also unabhängig davon, ob Arbeitgeber oder Arbeitnehmer die Kündigung ausgesprochen hat.',
  },
  {
    q: 'Was ist der Unterschied zwischen widerruflicher und unwiderruflicher Freistellung?',
    a: 'Bei der widerruflichen Freistellung behält sich der Arbeitgeber vor, den Arbeitnehmer wieder zur Arbeit zu rufen. Bei der unwiderruflichen Freistellung ist die Befreiung endgültig; der Arbeitnehmer darf anderweitig arbeiten, und Resturlaub wird angerechnet. Beide Varianten setzen aber eine tragfähige Rechtsgrundlage voraus — entweder eine wirksame Individualvereinbarung oder überwiegende schutzwerte Arbeitgeberinteressen im Einzelfall. Eine pauschale Formularklausel reicht nach BAG 5 AZR 108/25 nicht mehr.',
  },
  {
    q: 'Wird mein Urlaub durch die Freistellung erfüllt?',
    a: 'Nur unter zwei Voraussetzungen: Die Freistellung muss unwiderruflich sein und der Urlaub muss ausdrücklich unter Anrechnung erteilt werden. Bei einer widerruflichen Freistellung wird Urlaub grundsätzlich nicht erfüllt, weil dem Arbeitnehmer die freie Verfügung über seine Freizeit fehlt. Ist die Freistellung selbst rechtswidrig — etwa wegen einer unwirksamen Formularklausel —, kann sie auch Urlaubsansprüche nicht wirksam abgelten.',
  },
  {
    q: 'Verbessert eine unwirksame Freistellungsklausel meine Abfindungschancen?',
    a: 'Sie kann Ihre Verhandlungsposition sachlich stärken. Wenn der Arbeitgeber Sie auf Grundlage einer unwirksamen Klausel freistellt und dabei Sachbezüge wie den Dienstwagen entzieht, laufen Nachforderungsansprüche auf — je Monat und je entzogener Leistung. Diese Ansprüche werden in Abfindungsvergleichen häufig „mitverhandelt". Ein konkretes Erfolgsversprechen lässt sich daraus nicht ableiten; die Höhe hängt vom Einzelfall, von der Fehlerdichte der Kündigung und der Gesamtlage ab.',
  },
];

export default function FreistellungNachKuendigungPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={PAGE_URL}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
        pageType="Article"
        headline="Freistellung nach Kündigung — wann sie unwirksam ist"
        articleSection="Kündigung"
        speakableSelectors={['#direktantwort', '.faq-section', '.bag-leitsatz']}
        dateModified={PAGE_DATES.freistellungNachKuendigung}
        datePublished="2026-08-12"
        includeOrganization={false}
        includeRating={false}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung/` },
          { name: 'Freistellung nach Kündigung', url: PAGE_URL },
        ]}
        isBasedOn={[
          { name: '§ 307 Abs. 1 S. 1 BGB — Inhaltskontrolle AGB', url: 'https://dejure.org/gesetze/BGB/307.html' },
          { name: '§ 615 BGB — Vergütung bei Annahmeverzug', url: 'https://dejure.org/gesetze/BGB/615.html' },
          { name: 'BAG, Urteil vom 25.03.2026 – 5 AZR 108/25', url: 'https://www.bundesarbeitsgericht.de/entscheidung/5-azr-108-25/' },
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
          __html: JSON.stringify(
            generateArticleSchema({
              headline: 'Freistellung nach Kündigung — wann sie unwirksam ist',
              description:
                'BAG 25.03.2026 – 5 AZR 108/25: Formularmäßige Freistellungsklauseln sind unwirksam. Folgen für Dienstwagen, Urlaub und Abfindungsverhandlung.',
              datePublished: '2026-08-12',
              dateModified: PAGE_DATES.freistellungNachKuendigung,
              url: PAGE_URL,
              articleSection: 'Kündigung',
            }),
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: `${SEO_CONFIG.baseUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Kündigung', item: `${SEO_CONFIG.baseUrl}/kuendigung/` },
              { '@type': 'ListItem', position: 3, name: 'Freistellung nach Kündigung', item: PAGE_URL },
            ],
          }),
        }}
      />

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/kuendigung/" className="text-gold no-underline hover:underline">Kündigung</Link>
            <span className="mx-2">/</span>
            <span>Freistellung nach Kündigung</span>
          </nav>
          <StandAnzeige modifiedAt={PAGE_DATES.freistellungNachKuendigung} />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Ratgeber Freistellung
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[760px]">
            Freistellung nach Kündigung &mdash; wann sie unwirksam ist
          </h1>
          <div className="max-w-[820px]">
            <AuthorByline />
          </div>
        </div>
      </div>

      {/* Direktantwort + TL;DR */}
      <section className="px-8 pt-8 pb-0 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div id="direktantwort">
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
                Das Bundesarbeitsgericht hat mit <strong>Urteil vom 25. März 2026 (Az. 5 AZR 108/25)</strong> entschieden:
                Eine formularmäßige Klausel, die dem Arbeitgeber pauschal erlaubt, den Arbeitnehmer nach einer Kündigung
                unter Fortzahlung der Vergütung freizustellen, ist wegen unangemessener Benachteiligung nach
                {' '}<NormLink href="https://dejure.org/gesetze/BGB/307.html">§&nbsp;307 Abs.&nbsp;1 Satz&nbsp;1 BGB</NormLink>
                <strong> unwirksam</strong>. Der Widerruf einer privaten Dienstwagennutzung auf Grundlage einer solchen
                Klausel ist damit ebenfalls rechtswidrig.
              </p>
            </div>

            <TldrBox items={[
              <>Formularmäßige Freistellungsklauseln, die dem Arbeitgeber pauschal ein Freistellungsrecht nach Kündigung einräumen, sind unwirksam (<NormLink href="https://dejure.org/gesetze/BGB/307.html">§&nbsp;307 Abs.&nbsp;1 S.&nbsp;1 BGB</NormLink>).</>,
              <>Grund: Die Klausel schneidet dem Arbeitnehmer die Möglichkeit ab, ein gesteigertes Beschäftigungsinteresse im Einzelfall geltend zu machen.</>,
              <>Freistellung bleibt möglich — aber nur bei überwiegenden schutzwerten Arbeitgeberinteressen im konkreten Fall oder auf Basis einer ausgehandelten Individualvereinbarung.</>,
              <>Wird der Dienstwagen mit privater Nutzung entzogen, kann eine Nutzungsausfallentschädigung nach <NormLink href="https://dejure.org/gesetze/BGB/615.html">§&nbsp;615 BGB</NormLink> anfallen — im entschiedenen Fall 510&nbsp;€ brutto/Monat.</>,
              <>Die Sache wurde an das LAG Niedersachsen zurückverwiesen; ein Erfolg des Klägers steht noch nicht endgültig fest.</>,
            ]} />
          </div>
        </div>
      </section>

      {/* Kennzahlen-Kacheln */}
      <section className="px-8 pt-6 pb-2 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: 'Aktenzeichen', value: '5 AZR 108/25', desc: 'BAG, 5. Senat' },
              { label: 'Norm', value: '§ 307 Abs. 1 S. 1 BGB', desc: 'Inhaltskontrolle AGB' },
              { label: 'Streitwert', value: '510 €/Monat', desc: 'Nutzungsausfall Dienstwagen' },
              { label: 'Rechtsfolge', value: 'Zurückverweisung', desc: 'an LAG Niedersachsen' },
            ].map((k) => (
              <div key={k.label} className="bg-white border border-border rounded-sm overflow-hidden">
                <div className="h-[2.5px] bg-gold" />
                <div className="p-4">
                  <div className="text-[0.68rem] font-bold tracking-[0.12em] uppercase text-gold-dark mb-1">
                    {k.label}
                  </div>
                  <div className="font-serif text-[1.1rem] font-bold text-ink leading-tight mb-1">
                    {k.value}
                  </div>
                  <div className="text-[0.78rem] text-ink-muted leading-tight">
                    {k.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Was hat das BAG entschieden? */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Sachverhalt
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Was hat das BAG entschieden?
            </h2>
            <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
              Der Kläger war seit Januar 2022 als Gebietsleiter im Vertriebsaußendienst beschäftigt. Zum Fahrzeug gehörte
              ein Dienstwagen, den er auch privat nutzen durfte; der Arbeitsvertrag sah bei Freistellung einen Widerruf
              der Nutzung vor.
            </p>
            <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
              &sect;&nbsp;20 des Formulararbeitsvertrags erlaubte dem Arbeitgeber, den Arbeitnehmer &bdquo;bei oder nach
              Ausspruch einer Kündigung &mdash; gleich von welcher Seite&ldquo; unter Fortzahlung der Vergütung von der
              Arbeitsleistung freizustellen.
            </p>
            <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
              Der <strong>Kläger selbst</strong> kündigte fristgemäß zum <strong>30. November 2024</strong>. Die
              Arbeitgeberin stellte ihn frei und forderte den Dienstwagen zurück; der Kläger gab ihn heraus. Anschließend
              klagte er auf Nutzungsausfallentschädigung für die Monate August bis November 2024 in Höhe von
              <strong> 510,00&nbsp;Euro brutto pro Monat</strong>.
            </p>
            <p className="text-[0.98rem] text-ink-light leading-relaxed mb-6">
              Das Arbeitsgericht wies die Klage ab, das <strong>LAG Niedersachsen</strong> (Urteil vom 22.05.2025 &ndash;
              5 SLa 249/25) sprach die Entschädigung zu. Die Revision der Beklagten hatte vor dem BAG Erfolg &mdash; die
              Sache wurde an das LAG zurückverwiesen, weil dieses nicht rechtsfehlerfrei geprüft hat, ob die
              Arbeitgeberin unabhängig von der Klausel zur Freistellung befugt war, weil der Beschäftigung im konkreten
              Fall überwiegende schutzwerte Interessen entgegenstanden.
            </p>

            <figure className="bag-leitsatz my-8 mx-0">
              <blockquote
                className="m-0 pl-5 border-l-[3px] border-gold py-4 pr-4 bg-cream/50 rounded-r-sm text-[0.94rem] text-ink-light leading-relaxed italic"
                cite="https://www.bundesarbeitsgericht.de/entscheidung/5-azr-108-25/"
              >
                Eine Allgemeine Geschäftsbedingung, nach der der Arbeitgeber berechtigt ist, den Arbeitnehmer im
                gekündigten Arbeitsverhältnis bis zum Ablauf der Kündigungsfrist unter Fortzahlung der Vergütung von der
                Arbeitsleistung freizustellen, ist unwirksam, weil sie den Arbeitnehmer unangemessen iSv. &sect;&nbsp;307
                Abs.&nbsp;1 Satz&nbsp;1 BGB benachteiligt.
              </blockquote>
              <figcaption className="mt-2 pl-5 text-[0.8rem] text-ink-muted">
                &mdash; BAG, Urteil vom 25.03.2026 &ndash; 5 AZR 108/25 (
                <a
                  href="https://www.bundesarbeitsgericht.de/presse/wirksamkeit-einer-freistellungsklausel-widerruf-der-dienstwagennutzung/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold no-underline hover:underline"
                >
                  Pressemitteilung 14/26
                </a>
                )
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Warum ist die Klausel unwirksam? */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Begründung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Warum ist die Klausel unwirksam?
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Die Klausel unterliegt nach <NormLink href="https://dejure.org/gesetze/BGB/307.html">&sect;&nbsp;307 Abs.&nbsp;3 Satz&nbsp;1 BGB</NormLink> der
              Inhaltskontrolle und ist nach <NormLink href="https://dejure.org/gesetze/BGB/307.html">&sect;&nbsp;307 Abs.&nbsp;1 Satz&nbsp;1 BGB</NormLink>
              &nbsp;unwirksam: Das grundrechtlich geschützte Beschäftigungsinteresse des Arbeitnehmers überwiegt das
              Freistellungsinteresse des Arbeitgebers, wenn die Klausel dem Arbeitnehmer die Möglichkeit abschneidet,
              ein im Einzelfall gesteigertes Beschäftigungsinteresse geltend zu machen.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Der Beschäftigungsanspruch geht auf die Grundsatzentscheidung
              <strong> BAG, Beschluss vom 27.02.1985 &ndash; GS&nbsp;1/84</strong> zurück. Er schützt das Interesse an
              tatsächlicher Arbeitsleistung &mdash; und damit an Erhalt und Fortentwicklung beruflicher F&auml;higkeiten,
              Fachkenntnisse und Reputation.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed">
              Das entscheidende Argument des 5. Senats: Die Formularklausel wirkt pauschal &mdash; sie w&auml;hrt keine
              Einzelfallabw&auml;gung. Genau darin liegt die unangemessene Benachteiligung.
            </p>
          </div>
        </div>
      </section>

      {/* Wann darf der Arbeitgeber trotzdem freistellen? */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Abgrenzungen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wann darf der Arbeitgeber trotzdem freistellen?
            </h2>
            <p className="text-[0.98rem] text-ink-light leading-relaxed mb-6">
              Das Urteil erledigt nicht das Instrument &bdquo;Freistellung&ldquo;. Es zieht drei klare Grenzen, die man
              auseinanderhalten muss:
            </p>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1.5">
                  1. Kein generelles Verbot
                </div>
                <p className="text-[0.94rem] text-ink-light leading-relaxed m-0">
                  Freistellung bleibt m&ouml;glich. Auch ohne wirksame Klausel darf der Arbeitgeber einseitig
                  freistellen, wenn im konkreten Einzelfall <strong>&uuml;berwiegende schutzwerte eigene Interessen</strong>
                  &nbsp;der Weiterbesch&auml;ftigung entgegenstehen &mdash; etwa Wettbewerbsschutz, Zugriff auf sensible
                  Daten oder ein zerr&uuml;ttetes Vertrauensverh&auml;ltnis mit belegbaren Anhaltspunkten.
                </p>
              </div>

              <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1.5">
                  2. Individualvereinbarung bleibt wirksam
                </div>
                <p className="text-[0.94rem] text-ink-light leading-relaxed m-0">
                  Echte, im Einzelnen ausgehandelte Vereinbarungen sind vom Urteil nicht betroffen
                  (<NormLink href="https://dejure.org/gesetze/BGB/305.html">&sect;&nbsp;305 Abs.&nbsp;1 Satz&nbsp;3 BGB</NormLink>).
                  &bdquo;Aushandeln&ldquo; verlangt aber mehr als bloßes Verhandeln &mdash; der Arbeitnehmer muss real
                  Einfluss auf den Inhalt der Klausel gehabt haben.
                </p>
              </div>

              <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1.5">
                  3. Der Kl&auml;ger hat noch nicht gewonnen
                </div>
                <p className="text-[0.94rem] text-ink-light leading-relaxed m-0">
                  Die Sache wurde an das LAG Niedersachsen zur&uuml;ckverwiesen. Das LAG muss pr&uuml;fen, ob im konkreten
                  Fall &uuml;berwiegende schutzwerte Interessen der Arbeitgeberin gegen eine Weiterbesch&auml;ftigung
                  sprachen. Ein pauschales &bdquo;Klausel unwirksam &rarr; Kl&auml;ger gewinnt&ldquo; ist der Entscheidung
                  daher nicht zu entnehmen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dienstwagen weg trotz Freistellung */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Praktische Folgen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Dienstwagen weg trotz Freistellung &mdash; was Ihnen zusteht
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              Ein Dienstwagen mit privater Nutzung ist <strong>Sachbezug</strong> und damit ein
              Verg&uuml;tungsbestandteil. Wird er entzogen, liegt darin faktisch eine <strong>einseitige
              Verg&uuml;tungsk&uuml;rzung</strong> f&uuml;r die Dauer der Freistellung.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              F&auml;llt die Grundlage der Freistellung weg &mdash; weil die Formularklausel unwirksam ist und keine
              tragfahigen Einzelfallgr&uuml;nde greifen &mdash;, entf&auml;llt auch die Grundlage f&uuml;r den Widerruf
              der Dienstwagennutzung. Konsequenz: Der Arbeitnehmer hat Anspruch auf
              <strong> Nutzungsausfallentsch&auml;digung</strong> nach{' '}
              <NormLink href="https://dejure.org/gesetze/BGB/615.html">&sect;&nbsp;615 BGB</NormLink>.
              Im vom BAG entschiedenen Fall wurden dazu <strong>510,00&nbsp;Euro brutto pro Monat</strong> geltend
              gemacht.
            </p>

            <h3 className="font-serif text-[1.15rem] font-bold mb-3">Argumentation im Einzelfall</h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Ein <strong>gesteigertes Besch&auml;ftigungsinteresse</strong> kann sich unter anderem daraus ergeben, dass
              die tats&auml;chliche Besch&auml;ftigung erforderlich ist f&uuml;r:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[0.95rem] text-ink-light leading-relaxed mb-6">
              <li>Erhalt oder Erlangung besonderer Fachkenntnisse und praktischer Fertigkeiten,</li>
              <li>Aufrechterhaltung von Berufserfahrung und Marktpr&auml;senz,</li>
              <li>Sicherung der Geltung in der Berufswelt (
                <strong>BAG 12.09.2022 &ndash; 6 AZR 261/21</strong>; <strong>BAG 15.06.2021 &ndash; 9 AZR 217/20</strong>).</li>
            </ul>

            <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Der Anspruch auf Nutzungsausfallentsch&auml;digung sowie auf offene Verg&uuml;tungsbestandteile
                unterliegt vertraglichen und tariflichen <strong>Ausschlussfristen</strong>. Wer zu lange wartet,
                verliert den Anspruch trotz an sich guter Rechtslage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-10 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <DefinitionBox
              term="Freistellung"
              definition="Die einseitige oder einvernehmliche Befreiung des Arbeitnehmers von der Pflicht zur Arbeitsleistung bei Fortzahlung der Vergütung, meist zwischen Ausspruch der Kündigung und Ablauf der Kündigungsfrist. Man unterscheidet die widerrufliche und die unwiderrufliche Freistellung. Nach BAG 5 AZR 108/25 kann sich eine formularmäßige Freistellungsklausel nicht mehr auf eine pauschale Rechtfertigung stützen — nötig sind entweder eine ausgehandelte Individualvereinbarung oder überwiegende schutzwerte Arbeitgeberinteressen im Einzelfall."
            />
          </div>
        </div>
      </section>

      {/* Was Sie jetzt tun sollten */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Handlungsleitfaden
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Was Sie jetzt tun sollten
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Arbeitsvertrag auf Formularklausel prüfen',
                  desc: 'Suchen Sie im Arbeitsvertrag die Klausel zu „Freistellung bei/nach Kündigung". Standardformulierungen, die für beide Kündigungsrichtungen pauschal gelten, sind nach BAG 5 AZR 108/25 in der Regel unwirksam.',
                },
                {
                  step: '2',
                  title: 'Freistellungsschreiben und Dienstwagenrückgabe dokumentieren',
                  desc: 'Sichern Sie das Freistellungsschreiben, die Rückgabeaufforderung für den Dienstwagen und den Rückgabezeitpunkt. Diese Belege sind Grundlage jeder Nachforderung — Höhe des Sachbezugs, Zeitraum und Rückgabeumstände sind entscheidend.',
                },
                {
                  step: '3',
                  title: 'Gesteigertes Beschäftigungsinteresse schriftlich geltend machen',
                  desc: 'Fordern Sie tatsächliche Beschäftigung schriftlich ein und begründen Sie konkret, warum die Beschäftigung im Einzelfall besonderes Gewicht hat (Fachkenntnisse, Berufserfahrung, Marktpräsenz). Nur so zwingen Sie den Arbeitgeber zur Einzelfallabwägung.',
                },
                {
                  step: '4',
                  title: 'Ansprüche vor Ablauf von Ausschlussfristen sichern',
                  desc: 'Nutzungsausfall, offene Vergütungsbestandteile und immaterielle Ansprüche verfallen häufig binnen weniger Monate durch Ausschlussfristen im Arbeitsvertrag oder Tarifvertrag. Reine Zurückhaltung reicht nicht — die Forderung muss form- und fristgerecht angezeigt werden.',
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

      {/* Rechtlicher Hinweis */}
      <section className="py-10 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
            <p className="text-[0.9rem] text-ink-muted m-0 leading-relaxed">
              <strong>Rechtlicher Hinweis:</strong> Dieser Beitrag gibt den Stand der Rechtsprechung zum
              Aktualisierungsdatum wieder und dient der allgemeinen Information. Er ersetzt keine anwaltliche Beratung
              im Einzelfall. Ob eine Freistellungsklausel in Ihrem Vertrag unwirksam ist und welche Ansprüche sich daraus
              konkret ergeben, muss anhand des Einzelvertrages und der individuellen Umstände geprüft werden.
            </p>
          </div>
        </div>
      </section>

      {/* CTA 1 */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Freistellungsklausel und Dienstwagenrückgabe prüfen lassen
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[560px] mx-auto mb-6">
            Fachanwalt Fatih Bektas prüft Ihre Klausel, den Freistellungszeitraum und Ihre offenen
            Vergütungsansprüche &mdash; kostenlose Ersteinschätzung in 24 Stunden.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Kostenlose Ersteinschätzung &rarr;
          </a>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link
              href="/kuendigung/"
              className="block py-6 px-6 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Übersicht
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Kündigung erhalten &mdash; Ihre Rechte
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                3-Wochen-Frist, Sofortmaßnahmen &amp; Kündigungsschutz. &rarr;
              </span>
            </Link>
            <Link
              href="/aufhebungsvertrag/"
              className="block py-6 px-6 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Alternative
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Aufhebungsvertrag &amp; Freistellung
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Sperrzeit vermeiden, Freistellung sauber regeln. &rarr;
              </span>
            </Link>
            <Link
              href="/urlaubsabgeltung-rechner/"
              className="block py-6 px-6 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Rechner
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Urlaubsabgeltung berechnen
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Wird Ihr Urlaub durch die Freistellung erfüllt? &rarr;
              </span>
            </Link>
            <Link
              href="/kuendigungsfrist-rechner/"
              className="block py-6 px-6 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Rechner
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Kündigungsfrist berechnen
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Bis wann muss der Freistellungszeitraum laufen? &rarr;
              </span>
            </Link>
          </div>
          <div className="max-w-[740px] mt-4">
            <Link
              href="/glossar/"
              className="inline-flex items-center gap-1.5 text-[0.88rem] text-gold-dark font-semibold no-underline hover:underline"
            >
              Mehr Begriffe im Arbeitsrecht-Glossar &rarr;
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
            Fragen zur Freistellung nach Kündigung
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Author */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
            <ShareButtons url="/freistellung-nach-kuendigung/" title={PAGE_TITLE} />
          </div>
        </div>
      </section>

      <AktuelleRechtslage />
      <Quellen quellen={QUELLEN_FREISTELLUNG} />
      <RelatedTopics current="kuendigung" />

      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/freistellung-nach-kuendigung" />
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Freistellung erhalten? Ausschlussfristen laufen bereits.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Nachforderungen für Dienstwagen und offene Vergütungsbestandteile verfallen häufig
            binnen weniger Monate &mdash; wir prüfen Ihre Ansprüche kostenlos.
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
