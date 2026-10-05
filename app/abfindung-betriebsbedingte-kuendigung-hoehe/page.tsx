import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import TableOfContents from '@/components/TableOfContents';
import StandAnzeige from '@/components/StandAnzeige';
import AuthorByline from '@/components/AuthorByline';
import AuthorBox from '@/components/AuthorBox';
import ShareButtons from '@/components/ShareButtons';
import SeoGeoBase from '@/components/SeoGeoBase';
import TldrBox from '@/components/TldrBox';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';
import { SEO_CONFIG } from '@/lib/seo-config';
import { PAGE_DATES } from '@/lib/page-dates';
import { generateArticleSchema } from '@/lib/article-schema';

export const revalidate = 86400;

const PAGE_PATH = '/abfindung-betriebsbedingte-kuendigung-hoehe/';
const PAGE_URL = `${SEO_CONFIG.baseUrl}${PAGE_PATH}`;
const PAGE_TITLE = 'Abfindung bei betriebsbedingter Kündigung: Höhe';
const PAGE_DESCRIPTION =
  'Wie hoch ist die Abfindung bei betriebsbedingter Kündigung? Faustformel, § 1a KSchG, Rechenbeispiele, Steuern und die 3-Wochen-Frist — vom Fachanwalt erklärt.';

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ${new Date().getFullYear()}`,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
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
    q: 'Wie hoch ist die Abfindung nach 10 Jahren?',
    a: 'Nach der Faustformel beträgt die Abfindung nach zehn Jahren fünf Bruttomonatsgehälter, bei 4.000 € also 20.000 €. Das ist ein Ausgangswert. Je nach Prozessrisiko des Arbeitgebers kann der verhandelte Betrag darüber oder darunter liegen.',
  },
  {
    q: 'Bekomme ich automatisch eine Abfindung, wenn mir betriebsbedingt gekündigt wird?',
    a: 'Nein. Einen automatischen Anspruch gibt es nicht. Er besteht nur, wenn der Arbeitgeber eine Abfindung nach § 1a KSchG anbietet, ein Sozialplan oder Tarifvertrag sie vorsieht oder eine Vereinbarung getroffen wird.',
  },
  {
    q: 'Verliere ich die § 1a-Abfindung, wenn ich klage?',
    a: 'Ja. Nach der Rechtsprechung des BAG entsteht der Anspruch nicht, wenn Sie Klage erheben, auch wenn Sie die Klage später zurücknehmen. Ob sich eine Klage trotzdem lohnt, hängt davon ab, wie angreifbar die Kündigung ist.',
  },
  {
    q: 'Welches Gehalt wird für die Berechnung zugrunde gelegt?',
    a: 'Maßgeblich ist der Bruttomonatsverdienst im letzten Monat des Arbeitsverhältnisses einschließlich Sachbezügen wie einem privat nutzbaren Dienstwagen (§ 10 Abs. 3 KSchG).',
  },
  {
    q: 'Muss ich die Abfindung versteuern?',
    a: 'Ja. Die Abfindung ist steuerpflichtig, aber in der Regel sozialversicherungsfrei. Die Fünftelregelung kann die Steuerlast senken. Seit 2025 wirkt sie nur noch über die Einkommensteuererklärung.',
  },
];

const rechenbeispiele = [
  { gehalt: '3.000 €', jahre: '4 Jahre', abfindung: '6.000 €' },
  { gehalt: '4.000 €', jahre: '8 Jahre', abfindung: '16.000 €' },
  { gehalt: '4.500 €', jahre: '5 Jahre und 7 Monate (aufgerundet: 6)', abfindung: '13.500 €' },
  { gehalt: '5.500 €', jahre: '15 Jahre', abfindung: '41.250 €' },
];

const wegeZurAbfindung = [
  { weg: '§ 1a KSchG', wann: 'Arbeitgeber bietet sie im Kündigungsschreiben an, Sie erheben keine Klage', hoehe: '0,5 Monatsverdienste pro Jahr' },
  { weg: 'Sozialplan', wann: 'Betriebsänderung in einem Betrieb mit Betriebsrat', hoehe: 'nach Sozialplanformel' },
  { weg: 'Tarifvertrag / Arbeitsvertrag', wann: 'Wenn dort eine Abfindung geregelt ist', hoehe: 'nach Regelung' },
  { weg: 'Vergleich oder Aufhebungsvertrag', wann: 'Verhandlung, meist während einer Kündigungsschutzklage', hoehe: 'Verhandlungssache' },
  { weg: 'Gerichtliche Auflösung (§§ 9, 10 KSchG)', wann: 'Kündigung unwirksam, Fortsetzung aber unzumutbar', hoehe: 'bis zu 12, 15 oder 18 Monatsverdienste' },
];

const TOC_ENTRIES = [
  { id: "habe-ich-bei-einer-betriebsbedingten-kundigung-anspruch-auf-", label: "Habe ich bei einer betriebsbedingten Kündigung Anspruch auf eine Abfindung?" },
  { id: "wie-wird-die-abfindung-berechnet", label: "Wie wird die Abfindung berechnet?" },
  { id: "was-gilt-bei-der-abfindung-nach-sectnbsp1a-kschg", label: "Was gilt bei der Abfindung nach &sect;&nbsp;1a KSchG?" },
  { id: "wovon-hangt-die-hohe-der-abfindung-in-der-verhandlung-ab", label: "Wovon hängt die Höhe der Abfindung in der Verhandlung ab?" },
  { id: "welche-frist-muss-ich-einhalten", label: "Welche Frist muss ich einhalten?" },
  { id: "muss-ich-auf-die-abfindung-steuern-und-sozialabgaben-zahlen", label: "Muss ich auf die Abfindung Steuern und Sozialabgaben zahlen?" },
  { id: "was-sollte-ich-nach-einer-betriebsbedingten-kundigung-jetzt-", label: "Was sollte ich nach einer betriebsbedingten Kündigung jetzt tun?" },
  { id: "haufige-fragen-zur-abfindung-bei-betriebsbedingter-kundigung", label: "Häufige Fragen zur Abfindung bei betriebsbedingter Kündigung" },
];

export default function AbfindungBetriebsbedingteHoehePage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={PAGE_URL}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
        pageType="Article"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['#direktantwort', '.faq-section']}
        dateModified={PAGE_DATES.abfindungBetriebsbedingteHoehe}
        datePublished="2026-09-26"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber/` },
          { name: 'Arbeitsrecht', url: `${SEO_CONFIG.baseUrl}/ratgeber/arbeitsrecht/` },
          { name: PAGE_TITLE, url: PAGE_URL },
        ]}
        isBasedOn={[
          { name: '§ 1a Kündigungsschutzgesetz (KSchG)', url: 'https://www.gesetze-im-internet.de/kschg/__1a.html' },
          { name: '§ 4 Kündigungsschutzgesetz (KSchG)', url: 'https://www.gesetze-im-internet.de/kschg/__4.html' },
          { name: '§ 7 Kündigungsschutzgesetz (KSchG)', url: 'https://www.gesetze-im-internet.de/kschg/__7.html' },
          { name: '§ 9 Kündigungsschutzgesetz (KSchG)', url: 'https://www.gesetze-im-internet.de/kschg/__9.html' },
          { name: '§ 10 Kündigungsschutzgesetz (KSchG)', url: 'https://www.gesetze-im-internet.de/kschg/__10.html' },
          { name: '§ 34 Einkommensteuergesetz (EStG)', url: 'https://www.gesetze-im-internet.de/estg/__34.html' },
          { name: '§ 158 SGB III — Ruhen bei Entlassungsentschädigung', url: 'https://www.gesetze-im-internet.de/sgb_3/__158.html' },
        ]}
      />

      {/* Schema.org — FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      {/* Schema.org — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: 'Abfindung bei betriebsbedingter Kündigung: Wie hoch ist sie wirklich?',
              description: PAGE_DESCRIPTION,
              datePublished: '2026-09-26',
              dateModified: PAGE_DATES.abfindungBetriebsbedingteHoehe,
              url: PAGE_URL,
              articleSection: 'Arbeitsrecht',
            }),
          ),
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
            <Link href="/ratgeber/arbeitsrecht" className="text-gold no-underline hover:underline">Arbeitsrecht</Link>
            <span className="mx-2">/</span>
            <span>Abfindung bei betriebsbedingter Kündigung</span>
          </nav>
          <StandAnzeige modifiedAt={PAGE_DATES.abfindungBetriebsbedingteHoehe} />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Arbeitsrecht · &sect;&nbsp;1a KSchG
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[820px]">
            Abfindung bei betriebsbedingter Kündigung: Wie hoch ist sie wirklich?
          </h1>
          <div className="max-w-[820px]">
            <AuthorByline />
          </div>

          {/* Direktantwort — GEO / LLM-freundlich */}
          <div
            id="direktantwort"
            className="max-w-[760px] text-[1rem] text-ink-light leading-relaxed mt-5"
          >
            <p className="m-0">
              <strong>Kurzantwort:</strong> Einen allgemeinen gesetzlichen Anspruch auf eine{' '}
              <strong>Abfindung</strong> gibt es bei einer <strong>betriebsbedingten Kündigung</strong>{' '}
              nicht. Als Richtwert gilt <strong>ein halbes Bruttomonatsgehalt pro Beschäftigungsjahr</strong>.
              Diese Formel ist nur in <strong>&sect;&nbsp;1a KSchG</strong> gesetzlich festgelegt. In
              Verhandlungen und vor dem Arbeitsgericht hängt die tatsächliche Höhe vor allem davon ab,
              wie gut Ihre Chancen stehen, die Kündigung zu kippen. Entscheidend ist deshalb die{' '}
              <strong>Klagefrist von drei Wochen</strong> ab Zugang der Kündigung.
            </p>
          </div>
        </div>
      </div>

      {/* TL;DR Box */}
      <section className="py-[40px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <TldrBox
              items={[
                'Kein Automatismus: Eine Abfindung gibt es nur über § 1a KSchG, einen Sozialplan, einen Tarifvertrag, eine Vereinbarung mit dem Arbeitgeber oder ausnahmsweise ein Urteil nach §§ 9, 10 KSchG.',
                'Faustformel: 0,5 Bruttomonatsgehälter × Jahre der Betriebszugehörigkeit. Das ist ein Richtwert, keine Obergrenze.',
                'Drei Wochen: Nur innerhalb von drei Wochen ab Zugang der Kündigung können Sie Kündigungsschutzklage erheben (§ 4 Satz 1 KSchG). Danach gilt die Kündigung als wirksam (§ 7 KSchG), und Ihr Verhandlungsspielraum ist weitgehend verloren.',
                'Steuern: Abfindungen sind steuerpflichtig, aber in der Regel frei von Sozialversicherungsbeiträgen. Die Steuerermäßigung durch die Fünftelregelung gibt es seit 2025 nur noch über die Einkommensteuererklärung.',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Section: Anspruch? */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechtsgrundlagen
            </div>
            <TableOfContents entries={TOC_ENTRIES} />

            <h2 id="habe-ich-bei-einer-betriebsbedingten-kundigung-anspruch-auf-" className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Habe ich bei einer betriebsbedingten Kündigung Anspruch auf eine Abfindung?
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Einen Anspruch auf eine Abfindung haben Arbeitnehmer nur, wenn eine besondere Rechtsgrundlage
              besteht. Das Kündigungsschutzgesetz (KSchG) schützt in erster Linie den Arbeitsplatz, nicht
              das Konto. Eine Abfindung entsteht deshalb auf einem dieser Wege:
            </p>

            <div className="overflow-x-auto -mx-8 md:mx-0">
              <table className="min-w-full bg-white border border-border text-[0.9rem]">
                <thead className="bg-cream-dark">
                  <tr>
                    <th className="text-left py-3 px-4 font-serif font-bold text-ink border-b border-border">Weg</th>
                    <th className="text-left py-3 px-4 font-serif font-bold text-ink border-b border-border">Wann?</th>
                    <th className="text-left py-3 px-4 font-serif font-bold text-ink border-b border-border">Höhe</th>
                  </tr>
                </thead>
                <tbody>
                  {wegeZurAbfindung.map((row, i) => (
                    <tr key={i} className="border-b border-border-light">
                      <td className="py-3 px-4 font-semibold text-ink align-top">{row.weg}</td>
                      <td className="py-3 px-4 text-ink-light align-top">{row.wann}</td>
                      <td className="py-3 px-4 text-ink-light align-top">{row.hoehe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[1rem] text-ink-light leading-relaxed mt-5">
              In der Praxis endet die große Mehrzahl der Kündigungsschutzverfahren mit einem Vergleich, in
              dem der Arbeitgeber eine Abfindung zahlt. Er &bdquo;kauft&ldquo; sich damit das Risiko ab, den
              Prozess zu verlieren und den Arbeitnehmer weiterbeschäftigen sowie Gehalt nachzahlen zu müssen.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Faustformel & Rechenbeispiele */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Berechnung
            </div>
            <h2 id="wie-wird-die-abfindung-berechnet" className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Wie wird die Abfindung berechnet?
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Die Faustformel für die Abfindung lautet:{' '}
              <strong>0,5&nbsp;&times;&nbsp;Bruttomonatsgehalt&nbsp;&times;&nbsp;Jahre der Betriebszugehörigkeit.</strong>{' '}
              Gesetzlich vorgeschrieben ist sie nur für die Abfindung nach &sect;&nbsp;1a KSchG. Arbeitsgerichte
              und Arbeitgeber nutzen sie aber auch in Vergleichsverhandlungen als Ausgangspunkt.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-2">Zwei Details sind wichtig:</p>
            <ul className="text-[0.98rem] text-ink-light leading-relaxed space-y-2 pl-6 list-disc mb-6">
              <li>
                <strong>Monatsverdienst:</strong> Gemeint ist nicht nur das Grundgehalt. Nach{' '}
                <strong>&sect;&nbsp;10 Abs.&nbsp;3 KSchG</strong> zählt, was Ihnen im letzten Monat des
                Arbeitsverhältnisses bei regelmäßiger Arbeitszeit an Geld und Sachbezügen zusteht, zum
                Beispiel ein Dienstwagen zur Privatnutzung. Regelmäßige Zulagen können den Betrag erhöhen.
              </li>
              <li>
                <strong>Aufrundung:</strong> Bei &sect;&nbsp;1a KSchG wird ein angefangenes Beschäftigungsjahr
                von mehr als sechs Monaten auf ein volles Jahr aufgerundet (&sect;&nbsp;1a Abs.&nbsp;2
                Satz&nbsp;3 KSchG).
              </li>
            </ul>

            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechenbeispiele nach der Faustformel
            </div>
            <div className="overflow-x-auto -mx-8 md:mx-0">
              <table className="min-w-full bg-cream border border-border text-[0.9rem]">
                <thead className="bg-cream-dark">
                  <tr>
                    <th className="text-left py-3 px-4 font-serif font-bold text-ink border-b border-border">Bruttomonatsgehalt</th>
                    <th className="text-left py-3 px-4 font-serif font-bold text-ink border-b border-border">Betriebszugehörigkeit</th>
                    <th className="text-left py-3 px-4 font-serif font-bold text-ink border-b border-border">Abfindung (Faktor 0,5)</th>
                  </tr>
                </thead>
                <tbody>
                  {rechenbeispiele.map((row, i) => (
                    <tr key={i} className="border-b border-border-light bg-white">
                      <td className="py-3 px-4 font-semibold text-ink align-top">{row.gehalt}</td>
                      <td className="py-3 px-4 text-ink-light align-top">{row.jahre}</td>
                      <td className="py-3 px-4 font-semibold text-ink align-top">{row.abfindung}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[0.9rem] text-ink-muted leading-relaxed mt-4 m-0">
              Die Formel ist ein Richtwert, keine Obergrenze. In Verhandlungen sind je nach Fall Faktoren
              deutlich unter oder über 0,5 üblich (dazu unten).
            </p>

            <div className="mt-6 p-5 bg-white border-l-[3px] border-gold rounded-sm">
              <p className="text-[0.95rem] text-ink-light m-0 leading-relaxed">
                <strong>Konkrete Zahl statt Faustregel:</strong>{' '}
                <Link
                  href="/abfindungsrechner/"
                  className="text-gold-dark font-semibold no-underline hover:underline"
                >
                  Ihre Abfindung berechnen
                </Link>
                {' '}&mdash; Bruttogehalt, Betriebszugehörigkeit und Sondereffekte in wenigen Klicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: § 1a KSchG */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              &sect;&nbsp;1a KSchG im Detail
            </div>
            <h2 id="was-gilt-bei-der-abfindung-nach-sectnbsp1a-kschg" className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Was gilt bei der Abfindung nach &sect;&nbsp;1a KSchG?
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              Die Abfindung nach &sect;&nbsp;1a KSchG ist ein gesetzlicher Anspruch, den der Arbeitgeber mit
              der Kündigung auslösen kann. Er muss die Kündigung auf <em>dringende betriebliche
              Erfordernisse</em> stützen und im Kündigungsschreiben darauf hinweisen, dass Sie die Abfindung
              erhalten, wenn Sie die Klagefrist verstreichen lassen. Die Höhe ist dann festgelegt:{' '}
              <strong>0,5 Monatsverdienste pro Beschäftigungsjahr</strong>.
            </p>

            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              Die Rechtsprechung des Bundesarbeitsgerichts (BAG) hat vier Punkte geklärt, die Sie kennen
              sollten:
            </p>

            <div className="space-y-4">
              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-2">
                  1. Der Arbeitgeber darf auch weniger anbieten, muss das aber klar sagen.
                </div>
                <p className="text-[0.95rem] text-ink-light m-0 leading-relaxed">
                  Der Arbeitgeber ist nicht gezwungen, genau die gesetzliche Abfindung anzubieten. Will er
                  weniger zahlen, muss sich aus dem Kündigungsschreiben unmissverständlich ergeben, dass es
                  sich nicht um ein Angebot nach &sect;&nbsp;1a KSchG handelt (
                  <a
                    href="https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Datum=13.12.2007&Aktenzeichen=2%20AZR%20807/06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-dark no-underline hover:underline"
                  >
                    BAG, Urteil vom 13.12.2007 &ndash; 2&nbsp;AZR&nbsp;807/06
                  </a>
                  ). Enthält das Kündigungsschreiben einen vollständigen Hinweis nach &sect;&nbsp;1a KSchG
                  und ist ein niedrigerer Betrag nicht eindeutig als eigenes, abweichendes Angebot erkennbar,
                  steht Ihnen der gesetzliche Betrag zu.
                </p>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-2">
                  2. Jede Klage kostet den Anspruch, auch eine zurückgenommene oder verspätete.
                </div>
                <p className="text-[0.95rem] text-ink-light m-0 leading-relaxed">
                  Wer gegen die Kündigung klagt, verliert die Abfindung nach &sect;&nbsp;1a KSchG. Das gilt
                  auch, wenn die Klage zu spät eingereicht und ihre nachträgliche Zulassung beantragt wird,
                  und auch dann, wenn Klage oder Zulassungsantrag später zurückgenommen werden (
                  <a
                    href="https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Datum=13.12.2007&Aktenzeichen=2%20AZR%20971/06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-dark no-underline hover:underline"
                  >
                    BAG, Urteil vom 13.12.2007 &ndash; 2&nbsp;AZR&nbsp;971/06
                  </a>
                  ). Das BAG hat das später bestätigt, auch für eine verspätete Klage ohne Zulassungsantrag
                  (
                  <a
                    href="https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Datum=20.08.2009&Aktenzeichen=2%20AZR%20267/08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-dark no-underline hover:underline"
                  >
                    BAG, Urteil vom 20.08.2009 &ndash; 2&nbsp;AZR&nbsp;267/08
                  </a>
                  ). Sie müssen sich also früh entscheiden: sichere &sect;&nbsp;1a-Abfindung oder Klage mit
                  der Chance auf mehr.
                </p>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-2">
                  3. Der Anspruch entsteht erst mit Ablauf der Kündigungsfrist.
                </div>
                <p className="text-[0.95rem] text-ink-light m-0 leading-relaxed">
                  Die Abfindung nach &sect;&nbsp;1a KSchG entsteht erst, wenn die Kündigungsfrist abgelaufen
                  ist. Stirbt der Arbeitnehmer vorher, entsteht sie nicht und kann auch nicht vererbt werden
                  (
                  <a
                    href="https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Datum=10.05.2007&Aktenzeichen=2%20AZR%2045/06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-dark no-underline hover:underline"
                  >
                    BAG, Urteil vom 10.05.2007 &ndash; 2&nbsp;AZR&nbsp;45/06
                  </a>
                  ).
                </p>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-2">
                  4. Die &sect;&nbsp;1a-Abfindung kann neben einer Sozialplanabfindung stehen.
                </div>
                <p className="text-[0.95rem] text-ink-light m-0 leading-relaxed">
                  Das BAG hat einem Arbeitnehmer die Abfindung nach &sect;&nbsp;1a KSchG zusätzlich zu einer
                  Abfindung aus einem mit dem Betriebsrat geschlossenen Interessenausgleich zugesprochen. Das
                  Kündigungsschreiben enthielt einen vollständigen Hinweis nach &sect;&nbsp;1a KSchG. Eine
                  Anrechnung schied wegen der unterschiedlichen Leistungszwecke aus (
                  <a
                    href="https://www.bundesarbeitsgericht.de/entscheidung/2-azr-536-15/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-dark no-underline hover:underline"
                  >
                    BAG, Urteil vom 19.07.2016 &ndash; 2&nbsp;AZR&nbsp;536/15
                  </a>
                  ). Ob Sie beide Abfindungen erhalten, hängt vom Kündigungsschreiben und von der kollektiven
                  Regelung in Ihrem Betrieb ab. Lassen Sie das prüfen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Verhandlung */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Verhandlungsspielraum
            </div>
            <h2 id="wovon-hangt-die-hohe-der-abfindung-in-der-verhandlung-ab" className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Wovon hängt die Höhe der Abfindung in der Verhandlung ab?
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Die Abfindungshöhe in Verhandlungen hängt vor allem vom <strong>Prozessrisiko des
              Arbeitgebers</strong> ab. Je wahrscheinlicher es ist, dass die Kündigung vor Gericht scheitert,
              desto mehr muss er zahlen. Diese Punkte entscheiden darüber:
            </p>

            <ul className="text-[0.98rem] text-ink-light leading-relaxed space-y-3 pl-6 list-disc mb-6">
              <li>
                <strong>Gilt das Kündigungsschutzgesetz?</strong> Es gilt nur, wenn das Arbeitsverhältnis
                länger als sechs Monate bestand (&sect;&nbsp;1 Abs.&nbsp;1 KSchG) und im Betrieb in der Regel
                mehr als zehn Arbeitnehmer beschäftigt sind (&sect;&nbsp;23 Abs.&nbsp;1 KSchG). Teilzeitkräfte
                zählen anteilig. Für Arbeitsverhältnisse, die vor 2004 begonnen haben, kann eine niedrigere
                Schwelle gelten. Ohne Kündigungsschutz ist die Verhandlungsposition deutlich schwächer.
              </li>
              <li>
                <strong>Ist der Arbeitsplatz wirklich weggefallen?</strong> Der Arbeitgeber muss eine
                unternehmerische Entscheidung darlegen, durch die der Beschäftigungsbedarf entfällt. Gibt es
                eine freie Stelle, auf der Sie weiterbeschäftigt werden könnten, ist die Kündigung angreifbar.
              </li>
              <li>
                <strong>Stimmt die Sozialauswahl?</strong> Der Arbeitgeber muss unter vergleichbaren
                Arbeitnehmern Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten und Schwerbehinderung
                ausreichend berücksichtigen (&sect;&nbsp;1 Abs.&nbsp;3 KSchG). Fehler hier sind häufig.
              </li>
              <li>
                <strong>Wurde der Betriebsrat angehört?</strong> Gibt es im Betrieb einen Betriebsrat, muss
                er vor jeder Kündigung angehört werden. Eine Kündigung ohne ordnungsgemäße Anhörung des
                Betriebsrats ist unwirksam (&sect;&nbsp;102 Abs.&nbsp;1 Satz&nbsp;3 BetrVG).
              </li>
              <li>
                <strong>Besteht Sonderkündigungsschutz?</strong> Etwa bei Schwerbehinderung, Schwangerschaft,
                Elternzeit oder als Betriebsratsmitglied.
              </li>
              <li>
                <strong>Wie lange dauert das Verfahren?</strong> Verliert der Arbeitgeber, muss er das Gehalt
                für die Zwischenzeit nachzahlen. Dieses Risiko wächst mit jedem Monat.
              </li>
            </ul>

            <p className="text-[1rem] text-ink-light leading-relaxed">
              In der Praxis bewegen sich Vergleiche bei schwachen Kündigungen oft über dem Faktor 0,5, bei
              gut begründeten Kündigungen oder fehlendem Kündigungsschutz darunter. Ein Arbeitsgericht setzt
              eine Abfindung nur dann selbst fest, wenn es das Arbeitsverhältnis auf Antrag nach{' '}
              <strong>&sect;&nbsp;9 KSchG</strong> auflöst. Dafür gelten Höchstgrenzen von{' '}
              <strong>12 Monatsverdiensten</strong>, bei älteren Arbeitnehmern mit langer Betriebszugehörigkeit
              bis zu <strong>15 oder 18 Monatsverdiensten</strong> (&sect;&nbsp;10 Abs.&nbsp;1 und&nbsp;2
              KSchG).
            </p>
          </div>
        </div>
      </section>

      {/* Section: Frist */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              3-Wochen-Frist
            </div>
            <h2 id="welche-frist-muss-ich-einhalten" className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Welche Frist muss ich einhalten?
            </h2>
            <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
              <p className="text-[1rem] text-ink leading-relaxed m-0">
                Die wichtigste Frist bei einer Kündigung beträgt <strong>drei Wochen</strong>. Innerhalb von
                drei Wochen nach Zugang der schriftlichen Kündigung müssen Sie{' '}
                <Link
                  href="/kuendigungsschutzklage/"
                  className="text-gold-dark font-semibold no-underline hover:underline"
                >
                  Kündigungsschutzklage
                </Link>
                {' '}beim Arbeitsgericht erheben (&sect;&nbsp;4 Satz&nbsp;1 KSchG). Versäumen Sie die Frist,
                gilt die Kündigung als von Anfang an wirksam (&sect;&nbsp;7 KSchG). Sie haben dann kaum noch
                ein Druckmittel, um eine Abfindung auszuhandeln.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Steuern */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Steuern &amp; Sozialabgaben
            </div>
            <h2 id="muss-ich-auf-die-abfindung-steuern-und-sozialabgaben-zahlen" className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Muss ich auf die Abfindung Steuern und Sozialabgaben zahlen?
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Eine Abfindung ist Arbeitslohn und muss versteuert werden.{' '}
              <strong>Sozialversicherungsbeiträge fallen</strong> auf eine echte Abfindung für den Verlust
              des Arbeitsplatzes <strong>in der Regel nicht an</strong>.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Steuerlich kann die sogenannte <strong>Fünftelregelung</strong> (&sect;&nbsp;34 EStG) die
              Progression abmildern. Seit dem <strong>1.&nbsp;Januar 2025</strong> wendet der Arbeitgeber
              sie beim Lohnsteuerabzug nicht mehr an. Die Ermäßigung erhalten Sie nur noch, wenn Sie eine
              Einkommensteuererklärung abgeben. Zunächst wird also mehr Lohnsteuer einbehalten, als am Ende
              geschuldet ist.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed">
              Auf das Arbeitslosengeld wird eine Abfindung nicht angerechnet. Wurde das Arbeitsverhältnis
              aber vor Ablauf der ordentlichen Kündigungsfrist beendet, kann der Anspruch auf Arbeitslosengeld
              für eine gewisse Zeit <strong>ruhen</strong> (&sect;&nbsp;158 SGB&nbsp;III). Wer eine Kündigung
              nur hinnimmt, muss grundsätzlich keine Sperrzeit fürchten. Bei einem{' '}
              <Link
                href="/aufhebungsvertrag/"
                className="text-gold-dark font-semibold no-underline hover:underline"
              >
                Aufhebungsvertrag
              </Link>
              {' '}ist dagegen Vorsicht geboten (&sect;&nbsp;159 SGB&nbsp;III).
            </p>
          </div>
        </div>
      </section>

      {/* Section: Was tun? */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Handlungsplan
            </div>
            <h2 id="was-sollte-ich-nach-einer-betriebsbedingten-kundigung-jetzt-" className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Was sollte ich nach einer betriebsbedingten Kündigung jetzt tun?
            </h2>
            <ol className="text-[0.98rem] text-ink-light leading-relaxed space-y-3 pl-6 list-decimal">
              <li>
                <strong>Zugangsdatum notieren.</strong> Ab diesem Tag läuft die Drei-Wochen-Frist.
              </li>
              <li>
                <strong>Nichts unterschreiben</strong>, insbesondere keinen Aufhebungsvertrag und keine
                Ausgleichsquittung, ohne rechtliche Prüfung.
              </li>
              <li>
                <strong>Kündigungsschreiben prüfen lassen:</strong> Enthält es einen Hinweis nach{' '}
                &sect;&nbsp;1a KSchG? Ist ein Betrag genannt? Wurde der Betriebsrat angehört?
              </li>
              <li>
                <strong>Unterlagen sammeln:</strong> Arbeitsvertrag, letzte Gehaltsabrechnungen, gegebenenfalls
                Sozialplan.
              </li>
              <li>
                <strong>Innerhalb von drei Tagen arbeitsuchend melden</strong> bei der Agentur für Arbeit
                (&sect;&nbsp;38 Abs.&nbsp;1 SGB&nbsp;III), wenn zwischen Kenntnis der Kündigung und dem Ende
                des Arbeitsverhältnisses weniger als drei Monate liegen. Sonst spätestens drei Monate vor
                dem Ende. Die Meldepflicht gilt auch, wenn Sie klagen.
              </li>
              <li>
                <strong>Entscheiden:</strong> &sect;&nbsp;1a-Abfindung annehmen oder klagen und verhandeln?
                Diese Entscheidung sollte vor Ablauf der Frist fallen.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Häufige Fragen
            </div>
            <h2 id="haufige-fragen-zur-abfindung-bei-betriebsbedingter-kundigung" className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Häufige Fragen zur Abfindung bei betriebsbedingter Kündigung
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Disclaimer + interne Links */}
      <section className="py-[40px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] p-6 bg-white border border-border rounded-sm">
            <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
              Dieser Artikel informiert allgemein über die Rechtslage und ersetzt keine Rechtsberatung im
              Einzelfall. Wenn Sie eine betriebsbedingte Kündigung erhalten haben, lassen Sie sie innerhalb
              der Drei-Wochen-Frist prüfen. In einer{' '}
              <Link
                href="/mandantenaufnahme-kuendigung/"
                className="text-gold-dark font-semibold no-underline hover:underline"
              >
                Erstberatung
              </Link>
              {' '}klären wir, ob sich eine Klage lohnt und welche Abfindung realistisch ist. Weitere
              Informationen:{' '}
              <Link
                href="/kuendigungsschutzklage/"
                className="text-gold-dark font-semibold no-underline hover:underline"
              >
                Kündigungsschutzklage
              </Link>
              ,{' '}
              <Link
                href="/abfindungsrechner/"
                className="text-gold-dark font-semibold no-underline hover:underline"
              >
                Abfindungsrechner
              </Link>
              ,{' '}
              <Link
                href="/aufhebungsvertrag/"
                className="text-gold-dark font-semibold no-underline hover:underline"
              >
                Aufhebungsvertrag
              </Link>
              , Sperrzeit beim Arbeitslosengeld.
            </p>
          </div>
        </div>
      </section>

      {/* Share */}
      <section className="px-8 max-md:px-6 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <ShareButtons url={PAGE_PATH} title={PAGE_TITLE} />
          </div>
        </div>
      </section>

      {/* AuthorBox */}
      <section className="py-[30px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
          </div>
        </div>
      </section>

      {/* BERT-Interlinker */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath={PAGE_PATH} />
        </div>
      </section>
    </main>
  );
}
