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
import BagQuote from '@/components/BagQuote';
import { SEO_CONFIG } from '@/lib/seo-config';
import { PAGE_DATES } from '@/lib/page-dates';
import { QUELLEN_KSCHG_ANWENDUNG } from '@/lib/quellen-defaults';
import { generateArticleSchema } from '@/lib/article-schema';

export const revalidate = 86400;

/** dejure.org Inline-Link für eine zitierte Norm */
function NormLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gold-dark no-underline hover:underline decoration-gold underline-offset-2"
    >
      {children}
    </a>
  );
}

const NORM = {
  kschg1: 'https://dejure.org/gesetze/KSchG/1.html',
  kschg4: 'https://dejure.org/gesetze/KSchG/4.html',
  kschg9: 'https://dejure.org/gesetze/KSchG/9.html',
  kschg14: 'https://dejure.org/gesetze/KSchG/14.html',
  kschg15: 'https://dejure.org/gesetze/KSchG/15.html',
  kschg23: 'https://dejure.org/gesetze/KSchG/23.html',
  bgb622: 'https://dejure.org/gesetze/BGB/622.html',
  bgb623: 'https://dejure.org/gesetze/BGB/623.html',
  bgb242: 'https://dejure.org/gesetze/BGB/242.html',
  muschg17: 'https://dejure.org/gesetze/MuSchG/17.html',
  sgbIX168: 'https://dejure.org/gesetze/SGB_IX/168.html',
  beeg18: 'https://dejure.org/gesetze/BEEG/18.html',
} as const;

/** dejure.org Vernetzungs-URL für BAG-Urteile — landet zuverlässig auf der Trefferseite */
function bagDejureUrl(datum: string | null, az: string): string {
  const base = 'https://dejure.org/dienste/vernetzung/rechtsprechung';
  const params = new URLSearchParams({ Gericht: 'BAG', Aktenzeichen: az });
  if (datum) params.set('Datum', datum);
  return `${base}?${params.toString()}`;
}

const year = new Date().getFullYear();
const PAGE_URL = `${SEO_CONFIG.baseUrl}/kuendigungsschutzgesetz-anwendung/`;

export const metadata: Metadata = {
  title: `Wann gilt das Kündigungsschutzgesetz? Wartezeit & Schwellenwert ${year}`,
  description:
    'Wann findet das KSchG Anwendung? 6 Monate Wartezeit + mehr als 10 Arbeitnehmer (§ 23 KSchG). Wer zählt mit, wer nicht. Teilzeit-Zählmethodik, Leiharbeit, Gemeinschaftsbetrieb, Beweislast.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Wann gilt das Kündigungsschutzgesetz? Wartezeit & Schwellenwert ${year}`,
    description:
      'Voraussetzungen des Kündigungsschutzgesetzes: Wartezeit 6 Monate, Schwellenwert mehr als 10 Arbeitnehmer. Wer zählt mit — inkl. BAG-Rechtsprechung.',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Wann gilt das Kündigungsschutzgesetz? Wartezeit & Schwellenwert ${year}`,
    description:
      'Voraussetzungen des KSchG: Wartezeit, Schwellenwert, Teilzeit-Zählung, Leiharbeit, Gemeinschaftsbetrieb, Beweislast. Fachanwalt für Arbeitsrecht.',
  },
};

const faqs = [
  {
    q: 'Wann findet das Kündigungsschutzgesetz Anwendung?',
    a: 'Das Kündigungsschutzgesetz greift, wenn zwei Voraussetzungen kumulativ erfüllt sind: (1) Das Arbeitsverhältnis besteht ohne Unterbrechung länger als sechs Monate im selben Betrieb oder Unternehmen (§ 1 Abs. 1 KSchG). (2) Im Betrieb sind in der Regel mehr als 10 Arbeitnehmer beschäftigt (§ 23 Abs. 1 Satz 3 KSchG). Für Arbeitsverhältnisse, die vor dem 1.1.2004 begonnen haben, gilt ein abgesenkter Schwellenwert von mehr als 5 Arbeitnehmern.',
  },
  {
    q: 'Wie hoch ist der Schwellenwert beim Kündigungsschutzgesetz?',
    a: 'Seit dem 1.1.2004 liegt der Schwellenwert bei mehr als 10 Arbeitnehmern in Vollzeitäquivalenten (§ 23 Abs. 1 Satz 3 KSchG). Auszubildende werden nicht mitgezählt. Teilzeitkräfte werden anteilig erfasst: bis 20 Wochenstunden mit Faktor 0,5, bis 30 Wochenstunden mit Faktor 0,75 und darüber mit Faktor 1,0. Maßgeblich ist die in der Regel beschäftigte, nicht die tagesaktuelle Personalstärke.',
  },
  {
    q: 'Zählen Leiharbeitnehmer beim Schwellenwert mit?',
    a: 'Leiharbeitnehmer werden nur dann mitgezählt, wenn ihr Einsatz auf einem in der Regel vorhandenen Personalbedarf des Entleiherbetriebes beruht (BAG 24.01.2013 – 2 AZR 140/12, NZA 2013, 726). Dienen sie nur dem Abdecken eines außergewöhnlich hohen Geschäftsanfalls, bleiben sie außer Betracht. Ersetzen sie dagegen dauerhaft Stammpersonal, sind sie Teil der Regel-Beschäftigtenzahl.',
  },
  {
    q: 'Wer wird beim Schwellenwert nicht mitgezählt?',
    a: 'Nicht mitgezählt werden: Organmitglieder (GmbH-Geschäftsführer, Vorstandsmitglieder) sowie echte freie Mitarbeiter und Selbstständige. Ebenfalls ausgenommen sind Auszubildende (§ 23 Abs. 1 Satz 4 KSchG) sowie Leiharbeitnehmer, die nur außergewöhnlichen Personalbedarf abdecken. Scheinselbstständige sind hingegen mitzuzählen.',
  },
  {
    q: 'Wie werden Teilzeitbeschäftigte gezählt?',
    a: 'Teilzeitkräfte werden nach § 23 Abs. 1 Satz 4 KSchG anteilig berücksichtigt: 0,5 bei bis zu 20 Wochenstunden, 0,75 bei bis zu 30 Wochenstunden, 1,0 bei mehr als 30 Wochenstunden. Maßgeblich ist die vereinbarte, nicht die tatsächlich geleistete Arbeitszeit. Überstunden bleiben außer Betracht, sofern sie nur vorübergehend sind.',
  },
  {
    q: 'Was ist ein Gemeinschaftsbetrieb und wie wirkt er sich aus?',
    a: 'Ein Gemeinschaftsbetrieb liegt vor, wenn mehrere rechtlich selbstständige Unternehmen einen gemeinsamen Betrieb führen — typischerweise mit einheitlicher Leitung, gemeinsamer Personalabteilung und gemeinsamer Nutzung von Ressourcen. In diesem Fall werden die Arbeitnehmer aller beteiligten Unternehmen zusammengezählt. Dadurch kann das KSchG auch dann Anwendung finden, wenn ein einzelnes Unternehmen für sich genommen den Schwellenwert nicht erreicht.',
  },
  {
    q: 'Wer trägt die Beweislast für den Schwellenwert?',
    a: 'Die Beweislast für das Überschreiten des Schwellenwerts trägt grundsätzlich der Arbeitnehmer. Es gilt jedoch eine abgestufte Darlegungslast: Der Arbeitnehmer muss zunächst plausibel darlegen, dass in der Regel mehr als 10 Arbeitnehmer beschäftigt sind. Bestreitet der Arbeitgeber dies, muss er detailliert zur Anzahl und Struktur der beschäftigten Personen vortragen. Der Arbeitnehmer kann sich dann zu diesem Vortrag substantiiert äußern.',
  },
  {
    q: 'Was passiert, wenn das KSchG nicht anwendbar ist?',
    a: 'Greift das Kündigungsschutzgesetz nicht — etwa weil die Wartezeit von sechs Monaten noch nicht erfüllt ist oder der Betrieb ein Kleinbetrieb ist — braucht der Arbeitgeber keinen sozial gerechtfertigten Kündigungsgrund. Es gelten nur die allgemeinen Schutzmechanismen: gesetzliche Kündigungsfristen nach § 622 BGB, das Schriftformerfordernis (§ 623 BGB), Treu und Glauben (§ 242 BGB) sowie Diskriminierungsverbote (AGG). Sonderkündigungsschutz für Schwangere, Schwerbehinderte und Betriebsräte bleibt davon unberührt.',
  },
  {
    q: 'Kommt es für den Schwellenwert auf den Tag der Kündigung an?',
    a: 'Nein. Maßgeblich ist nach § 23 Abs. 1 KSchG die in der Regel beschäftigte Arbeitnehmerzahl — nicht der zufällige Personalstand am Tag des Kündigungszugangs. Die Rechtsprechung verlangt einen Rückblick auf die bisherige Personalstärke und eine Prognose der absehbaren Entwicklung. Vorübergehende Schwankungen (z. B. unbesetzte Stellen, kurzfristige Aushilfen oder krankheitsbedingte Ausfälle) bleiben außer Betracht. Dadurch werden Betriebe, deren Beschäftigtenzahl nahe an der Schwelle liegt, vor reinen Zufallseffekten geschützt.',
  },
];

interface Person {
  gruppe: string;
  status: 'mit' | 'nicht' | 'bedingt';
  hinweis: string;
}

const zaehlMatrix: Person[] = [
  { gruppe: 'GmbH-Geschäftsführer / Organe', status: 'nicht', hinweis: 'Nehmen Arbeitgeberfunktion wahr — § 14 Abs. 1 KSchG' },
  { gruppe: 'Freie Mitarbeiter (echte)', status: 'nicht', hinweis: 'Kein Arbeitsverhältnis — sofern tatsächlich selbstständig' },
  { gruppe: 'Scheinselbstständige', status: 'mit', hinweis: 'Maßgeblich ist die tatsächliche Eingliederung' },
  { gruppe: 'Leiharbeitnehmer (Dauerbedarf)', status: 'mit', hinweis: 'BAG 24.01.2013 – 2 AZR 140/12' },
  { gruppe: 'Leiharbeitnehmer (Spitzenlast)', status: 'nicht', hinweis: 'Nur außergewöhnlicher Geschäftsanfall' },
  { gruppe: 'Familienangehörige in Arbeitsverhältnis', status: 'mit', hinweis: 'Echtes Arbeitsverhältnis vorausgesetzt' },
  { gruppe: 'Ausländische Arbeitnehmer im Inlandsbetrieb', status: 'mit', hinweis: 'Unabhängig vom anwendbaren Recht' },
  { gruppe: 'Mutterschutz', status: 'mit', hinweis: 'Bleiben Teil der Belegschaft' },
  { gruppe: 'Elternzeit', status: 'mit', hinweis: 'Keine Doppelzählung mit Vertretung' },
  { gruppe: 'Aushilfsarbeitnehmer', status: 'bedingt', hinweis: 'Nur bei regelmäßig besetzten Aushilfsstellen' },
  { gruppe: 'Auszubildende', status: 'nicht', hinweis: '§ 23 Abs. 1 Satz 4 KSchG' },
  { gruppe: 'Gekündigter Arbeitnehmer', status: 'mit', hinweis: 'Auch wenn Stelle nicht wiederbesetzt wird' },
];

const statusBadge = {
  mit: { label: 'Zählt mit', bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' },
  nicht: { label: 'Zählt nicht', bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
  bedingt: { label: 'Bedingt', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
} as const;

export default function KSchGAnwendungPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={PAGE_URL}
        pageTitle="Wann gilt das Kündigungsschutzgesetz? Wartezeit & Schwellenwert"
        pageDescription="Wann findet das KSchG Anwendung? Wartezeit, Schwellenwert, Teilzeit-Zählung, Leiharbeit, Gemeinschaftsbetrieb, Beweislast — vollständiger Ratgeber."
        pageType="Article"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['#direktantwort', '.faq-section']}
        dateModified={PAGE_DATES.kuendigungsschutzgesetzAnwendung}
        datePublished="2026-06-08"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung/` },
          { name: 'Kündigungsschutzgesetz – Anwendung', url: PAGE_URL },
        ]}
        isBasedOn={[
          { name: '§ 1 KSchG — Sozial ungerechtfertigte Kündigungen', url: 'https://dejure.org/gesetze/KSchG/1.html' },
          { name: '§ 23 KSchG — Geltungsbereich', url: 'https://dejure.org/gesetze/KSchG/23.html' },
          { name: 'BAG 24.02.2005 – 2 AZR 373/03 — Regelmäßige Beschäftigtenzahl', url: 'https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Datum=24.02.2005&Aktenzeichen=2%20AZR%20373%2F03' },
          { name: 'BAG 24.01.2013 – 2 AZR 140/12 (NZA 2013, 726) — Leiharbeitnehmer', url: 'https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Datum=24.01.2013&Aktenzeichen=2%20AZR%20140%2F12' },
          { name: 'BAG 21.09.2006 – 2 AZR 840/05 (NZA 2007, 438) — Altarbeitnehmer', url: 'https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Datum=21.09.2006&Aktenzeichen=2%20AZR%20840%2F05' },
          { name: 'BAG – 2 AZR 560/20 — Gemeinschaftsbetrieb', url: 'https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Aktenzeichen=2%20AZR%20560%2F20' },
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
            headline: 'Wann findet das Kündigungsschutzgesetz Anwendung?',
            description: 'Voraussetzungen des KSchG: Wartezeit von sechs Monaten, Schwellenwert von mehr als 10 Arbeitnehmern, Zählmethodik bei Teilzeit, Leiharbeit, Gemeinschaftsbetrieb, Beweislast.',
            dateModified: PAGE_DATES.kuendigungsschutzgesetzAnwendung,
            url: PAGE_URL,
            articleSection: 'Kündigungsschutzgesetz',
          })),
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
            <span>Kündigungsschutzgesetz – Anwendung</span>
          </nav>
          <StandAnzeige modifiedAt={PAGE_DATES.kuendigungsschutzgesetzAnwendung} />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Ratgeber Kündigungsschutz
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[760px]">
            Wann findet das Kündigungsschutzgesetz Anwendung?
          </h1>
        </div>
      </div>

      {/* TL;DR */}
      <section className="px-8 pt-4 pb-0 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <TldrBox items={[
              'Zwei Voraussetzungen kumulativ: Wartezeit von mehr als 6 Monaten (§ 1 Abs. 1 KSchG) und mehr als 10 Arbeitnehmer im Betrieb (§ 23 Abs. 1 Satz 3 KSchG).',
              'Maßgeblich ist die in der Regel beschäftigte Personalstärke — nicht der zufällige Stand am Kündigungstag.',
              'Teilzeit zählt anteilig: bis 20 Std./Woche = 0,5 · bis 30 Std./Woche = 0,75 · über 30 Std./Woche = 1,0.',
              'Greift das KSchG nicht, kann der Arbeitgeber ohne Kündigungsgrund kündigen — nur Fristen und allgemeine Grenzen (Treu & Glauben, AGG) bleiben.',
            ]} />
          </div>
        </div>
      </section>

      {/* Intro / Direktantwort */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold mb-8">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Wichtig: Ob das KSchG anwendbar ist, entscheidet, ob Ihr Arbeitgeber überhaupt
                einen Kündigungsgrund braucht. Ohne Anwendbarkeit reicht die Einhaltung der
                Kündigungsfrist nach <NormLink href={NORM.bgb622}>&sect;&nbsp;622 BGB</NormLink>.
              </p>
            </div>

            <div id="direktantwort">
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
                Das <strong>Kündigungsschutzgesetz (KSchG)</strong> findet Anwendung, wenn
                <strong> zwei Voraussetzungen kumulativ erfüllt sind</strong>: Das Arbeitsverhältnis
                muss in demselben Betrieb oder Unternehmen <strong>ohne Unterbrechung länger als
                sechs Monate</strong> bestehen (Wartezeit nach{' '}
                <NormLink href={NORM.kschg1}>&sect;&nbsp;1 Abs.&nbsp;1 KSchG</NormLink>), und im
                Betrieb müssen <strong>in der Regel mehr als 10 Arbeitnehmer</strong>
                {' '}beschäftigt sein (Schwellenwert nach{' '}
                <NormLink href={NORM.kschg23}>&sect;&nbsp;23 Abs.&nbsp;1 Satz&nbsp;3 KSchG</NormLink>).
              </p>
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
                Sind beide Hürden überschritten, kann der Arbeitgeber das Arbeitsverhältnis nur
                noch aus <strong>verhaltens-, personen- oder betriebsbedingten Gründen</strong>
                kündigen. Liegt einer der beiden Bausteine nicht vor — z.&nbsp;B. weil die
                Wartezeit noch nicht erreicht ist oder es sich um einen <strong>Kleinbetrieb</strong>
                handelt — entfällt der allgemeine Kündigungsschutz. Der Arbeitgeber muss dann
                lediglich die Kündigungsfrist und die allgemeinen Grenzen (Treu und Glauben,
                AGG, Sonderkündigungsschutz) beachten.
              </p>
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-8">
                Maßgeblich für den Schwellenwert ist <strong>nicht der zufällige Stand am Tag des
                Kündigungszugangs</strong>, sondern die für den Betrieb kennzeichnende
                Beschäftigungslage — also ein Rückblick auf die personelle Stärke und ein Ausblick
                auf die absehbare Entwicklung.
              </p>
            </div>

            <DefinitionBox
              term="Kündigungsschutzgesetz (KSchG)"
              definition="Das KSchG schützt Arbeitnehmer vor sozial ungerechtfertigten Kündigungen. Es greift, wenn die Wartezeit von sechs Monaten überschritten ist (§ 1 Abs. 1 KSchG) und im Betrieb in der Regel mehr als 10 Arbeitnehmer beschäftigt sind (§ 23 Abs. 1 Satz 3 KSchG). Innerhalb des Geltungsbereichs braucht der Arbeitgeber einen verhaltens-, personen- oder betriebsbedingten Kündigungsgrund."
            />

            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Anwendbarkeit kostenlos prüfen lassen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Voraussetzungen */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Voraussetzungen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Die zwei Hürden des Kündigungsschutzgesetzes
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-[0.9rem] border-collapse bg-white">
                <thead>
                  <tr className="border-b-2 border-gold">
                    <th className="text-left py-3 px-4 font-semibold">Voraussetzung</th>
                    <th className="text-left py-3 px-4 font-semibold">Inhalt</th>
                    <th className="text-left py-3 px-4 font-semibold">Rechtsgrundlage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">Wartezeit</td>
                    <td className="py-3 px-4 text-ink-light">Arbeitsverhältnis besteht länger als 6 Monate ohne Unterbrechung in demselben Betrieb oder Unternehmen</td>
                    <td className="py-3 px-4 text-[0.84rem] text-ink-muted">
                      <NormLink href={NORM.kschg1}>§ 1 Abs. 1 KSchG</NormLink>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">Schwellenwert</td>
                    <td className="py-3 px-4 text-ink-light">Mehr als 10 Arbeitnehmer in der Regel beschäftigt (Stichtag nach dem 31.12.2003)</td>
                    <td className="py-3 px-4 text-[0.84rem] text-ink-muted">
                      <NormLink href={NORM.kschg23}>§ 23 Abs. 1 Satz 3 KSchG</NormLink>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">Sonderfall Altarbeitnehmer</td>
                    <td className="py-3 px-4 text-ink-light">Arbeitsverhältnis begann vor dem 1.1.2004 — abgesenkter Schwellenwert: mehr als 5 Arbeitnehmer</td>
                    <td className="py-3 px-4 text-[0.84rem] text-ink-muted">
                      <NormLink href={NORM.kschg23}>§ 23 Abs. 1 Satz 2 KSchG</NormLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Beide Voraussetzungen müssen <strong>gleichzeitig</strong> erfüllt sein. Fehlt eine
              davon, greift der allgemeine Kündigungsschutz nicht — der Arbeitgeber kann ohne
              sozialen Rechtfertigungsgrund kündigen.
            </p>
          </div>
        </div>
      </section>

      {/* Wer zählt mit, wer nicht */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Zählweise
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wer zählt beim Schwellenwert mit?
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-3">
              <NormLink href={NORM.kschg23}>&sect;&nbsp;23 Abs.&nbsp;1 KSchG</NormLink> stellt auf
              die <strong>in der Regel beschäftigten Arbeitnehmer</strong> ab — nicht auf eine
              Stichtagsbetrachtung. Maßgeblich ist nach ständiger Rechtsprechung des
              Bundesarbeitsgerichts ein <strong>Rückblick auf die bisherige Personalstärke</strong>
              {' '}<em>und</em> eine <strong>Prognose der absehbaren Entwicklung</strong>. Damit
              soll vermieden werden, dass Betriebe, deren Beschäftigtenzahl nahe dem Schwellenwert
              liegt, dem zufälligen Stand am Tag des Kündigungszugangs ausgesetzt sind.
            </p>

            <BagQuote az="2 AZR 373/03" datum="24.02.2005">
              &bdquo;Für die Bestimmung der nach &sect;&nbsp;23 Abs.&nbsp;1 KSchG maßgeblichen
              Beschäftigtenzahl ist nicht der zufällige Personalstand am Tag des Zugangs der
              Kündigung entscheidend. Vielmehr bedarf es eines Rückblicks auf die bisherige
              personelle Stärke des Betriebes und einer Berücksichtigung der absehbaren
              zukünftigen Entwicklung.&ldquo;
            </BagQuote>

            <p className="text-[0.85rem] text-ink-muted mb-6">
              Quelle:{' '}
              <a
                href={bagDejureUrl('24.02.2005', '2 AZR 373/03')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                BAG 24.02.2005 – 2 AZR 373/03 auf dejure.org &rarr;
              </a>
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-[0.9rem] border-collapse">
                <thead>
                  <tr className="border-b-2 border-gold">
                    <th className="text-left py-3 px-4 font-semibold">Personengruppe</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Hinweis</th>
                  </tr>
                </thead>
                <tbody>
                  {zaehlMatrix.map((row) => {
                    const badge = statusBadge[row.status];
                    return (
                      <tr key={row.gruppe} className="border-b border-border">
                        <td className="py-3 px-4 font-medium">{row.gruppe}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[0.78rem] font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[0.84rem] text-ink-muted">{row.hinweis}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <h3 className="font-serif text-[1.15rem] font-bold mb-3">GmbH-Geschäftsführer und Selbstständige</h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Ein GmbH-Geschäftsführer nimmt Arbeitgeberfunktionen wahr und gilt nicht als
              Arbeitnehmer im Sinne von <NormLink href={NORM.kschg23}>&sect;&nbsp;23 KSchG</NormLink>
              {' '}— er wird nicht mitgezählt (vgl.{' '}
              <NormLink href={NORM.kschg14}>&sect;&nbsp;14 Abs.&nbsp;1 KSchG</NormLink>). Auch
              echte freie Mitarbeiter und Selbstständige bleiben außer Betracht. Anders bei
              <strong> Scheinselbstständigen</strong>: Wer tatsächlich weisungsgebunden,
              persönlich abhängig und in den Betrieb eingegliedert tätig ist, wird mitgezählt —
              unabhängig davon, was im Vertrag steht.
            </p>

            <h3 className="font-serif text-[1.15rem] font-bold mb-3">Leiharbeitnehmer — BAG-Rechtsprechung</h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
              Das Bundesarbeitsgericht hat die jahrelange Streitfrage entschieden: Leiharbeitnehmer
              zählen mit, wenn ihr Einsatz auf einem <em>in der Regel vorhandenen Personalbedarf</em>
              {' '}des Entleiherbetriebes beruht. Reine Spitzenabdeckung für außergewöhnlich hohen
              Geschäftsanfall bleibt außer Betracht.
            </p>

            <BagQuote
              az="2 AZR 140/12"
              datum="24.01.2013"
            >
              &bdquo;Bei der Bestimmung der nach &sect;&nbsp;23 Abs.&nbsp;1 Satz&nbsp;3 KSchG maßgeblichen
              Beschäftigtenzahl sind im Betrieb eingesetzte Leiharbeitnehmer mitzuzählen, wenn
              ihr Einsatz auf einem in der Regel vorhandenen Personalbedarf beruht.&ldquo;
              {' '}<span className="not-italic text-[0.82rem] text-ink-muted">(BAG, NZA 2013, 726)</span>
            </BagQuote>

            <p className="text-[0.85rem] text-ink-muted mb-5">
              Quelle:{' '}
              <a
                href={bagDejureUrl('24.01.2013', '2 AZR 140/12')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                BAG 24.01.2013 – 2 AZR 140/12 auf dejure.org &rarr;
              </a>
            </p>

            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold mb-6">
              <p className="text-[0.95rem] font-semibold text-ink mb-3">
                Beispiel 1 — Spitzenabdeckung (zählt nicht)
              </p>
              <p className="text-[0.9rem] text-ink-light m-0">
                Im Betrieb arbeiten 9 Vollzeitkräfte. Für 3 Monate werden 2 Leiharbeitnehmer
                eingesetzt, um einen Großauftrag abzuwickeln. In dieser Zeit wird einem der
                9 Vollzeitkräfte gekündigt. <strong>Ergebnis:</strong> Die Leiharbeitnehmer
                zählen nicht mit — die regelmäßige Beschäftigtenzahl bleibt bei 9. Das KSchG
                ist <strong>nicht anwendbar</strong>.
              </p>
            </div>

            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold mb-6">
              <p className="text-[0.95rem] font-semibold text-ink mb-3">
                Beispiel 2 — Dauerersatz (zählt mit)
              </p>
              <p className="text-[0.9rem] text-ink-light m-0">
                Im Betrieb sind 11 Vollzeitkräfte beschäftigt. Zwei Mitarbeiter kündigen, das
                Unternehmen besetzt die offenen Stellen dauerhaft mit Leiharbeitnehmern. Nun
                wird einem Stamm-Mitarbeiter gekündigt. <strong>Ergebnis:</strong> Die zwei
                Leiharbeitnehmer zählen mit — der Regelzustand entspricht 11 Vollzeitkräften.
                Das KSchG ist <strong>anwendbar</strong>.
              </p>
            </div>

            <h3 className="font-serif text-[1.15rem] font-bold mb-3">Familienangehörige, Auslandsbeschäftigte, Elternzeit</h3>
            <ul className="list-disc pl-6 space-y-2 text-[0.95rem] text-ink-light leading-relaxed mb-5">
              <li>
                <strong>Familienangehörige</strong> werden mitgezählt, sofern ein echtes
                Arbeitsverhältnis zum Betriebsinhaber besteht — bloße Mithilfe genügt nicht.
              </li>
              <li>
                <strong>Ausländische Arbeitnehmer</strong> im inländischen Betrieb werden
                mitgezählt, auch wenn auf das konkrete Arbeitsverhältnis ausländisches
                Arbeitsrecht anwendbar ist.
              </li>
              <li>
                <strong>Mutterschutz</strong> ändert nichts an der Mitzählung — die
                Arbeitnehmerin bleibt Teil der Belegschaft.
              </li>
              <li>
                <strong>Elternzeit:</strong> Mitarbeiter in Elternzeit zählen mit, wenn der
                Betrieb vor und nach der Elternzeit mit gleicher Beschäftigtenzahl arbeitet.
                Eine Doppelzählung mit Vertretungskraft erfolgt nicht.
              </li>
              <li>
                <strong>Aushilfen</strong> zählen nur, wenn sich eine regelmäßig besetzte
                Anzahl von Aushilfsplätzen feststellen lässt.
              </li>
              <li>
                <strong>Auszubildende</strong> werden nicht mitgezählt (
                <NormLink href={NORM.kschg23}>&sect;&nbsp;23 Abs.&nbsp;1 Satz&nbsp;4 KSchG</NormLink>).
              </li>
              <li>
                <strong>Der gekündigte Arbeitnehmer selbst</strong> zählt mit — auch dann, wenn
                seine Stelle nach der Kündigung nicht wiederbesetzt werden soll.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Teilzeit-Zählmethodik */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Teilzeit
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wie werden Teilzeitbeschäftigte gezählt?
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-6">
              Teilzeitkräfte werden bei der Berechnung des Schwellenwerts <strong>anteilig nach
              ihrer vereinbarten Wochenarbeitszeit</strong> berücksichtigt (
              <NormLink href={NORM.kschg23}>&sect;&nbsp;23 Abs.&nbsp;1 Satz&nbsp;4 KSchG</NormLink>).
              Maßgeblich ist nicht die tatsächlich geleistete, sondern die vertraglich
              vereinbarte Arbeitszeit. Überstunden bleiben außer Betracht, sofern sie nur
              vorübergehend anfallen.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-[0.9rem] border-collapse bg-white">
                <thead>
                  <tr className="border-b-2 border-gold">
                    <th className="text-left py-3 px-4 font-semibold">Wöchentliche Arbeitszeit</th>
                    <th className="text-center py-3 px-4 font-semibold">Faktor</th>
                    <th className="text-left py-3 px-4 font-semibold">Beispiel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">bis 20 Stunden</td>
                    <td className="py-3 px-4 text-center font-semibold text-gold-dark">0,5</td>
                    <td className="py-3 px-4 text-[0.84rem] text-ink-muted">2 Mitarbeiter à 18 Std. = 1,0</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">bis 30 Stunden</td>
                    <td className="py-3 px-4 text-center font-semibold text-gold-dark">0,75</td>
                    <td className="py-3 px-4 text-[0.84rem] text-ink-muted">4 Mitarbeiter à 25 Std. = 3,0</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">mehr als 30 Stunden</td>
                    <td className="py-3 px-4 text-center font-semibold text-gold-dark">1,0</td>
                    <td className="py-3 px-4 text-[0.84rem] text-ink-muted">3 Vollzeitkräfte = 3,0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="py-5 px-6 bg-white rounded-sm border border-border mb-5">
              <p className="text-[0.95rem] font-semibold text-ink mb-3">
                Rechenbeispiel A — KSchG anwendbar (Summe 10,5)
              </p>
              <p className="text-[0.9rem] text-ink-light mb-2">
                15 Arbeitnehmer im Betrieb. 5 Personen ≤ 20 Std., 8 Personen ≤ 30 Std., 2 Personen
                &gt; 30 Std./Woche.
              </p>
              <ul className="text-[0.9rem] text-ink-light list-none p-0 m-0">
                <li>5 × 0,5 = <strong>2,5</strong></li>
                <li>8 × 0,75 = <strong>6,0</strong></li>
                <li>2 × 1,0 = <strong>2,0</strong></li>
                <li className="font-semibold mt-2">Summe: 10,5 → mehr als 10 → KSchG anwendbar</li>
              </ul>
            </div>

            <div className="py-5 px-6 bg-white rounded-sm border border-border mb-6">
              <p className="text-[0.95rem] font-semibold text-ink mb-3">
                Rechenbeispiel B — KSchG nicht anwendbar (Summe 10,0)
              </p>
              <p className="text-[0.9rem] text-ink-light mb-2">
                15 Arbeitnehmer im Betrieb. 8 Personen ≤ 20 Std., 4 Personen ≤ 30 Std., 3 Personen
                &gt; 30 Std./Woche.
              </p>
              <ul className="text-[0.9rem] text-ink-light list-none p-0 m-0">
                <li>8 × 0,5 = <strong>4,0</strong></li>
                <li>4 × 0,75 = <strong>3,0</strong></li>
                <li>3 × 1,0 = <strong>3,0</strong></li>
                <li className="font-semibold mt-2">Summe: 10,0 → genau 10, nicht &bdquo;mehr als 10&ldquo; → KSchG nicht anwendbar</li>
              </ul>
            </div>

            <p className="text-[0.84rem] text-ink-muted">
              Die genaue Berechnung übernimmt für Sie der{' '}
              <Link href="/schwellenwert-rechner/" className="text-gold-dark font-semibold no-underline hover:underline">
                Schwellenwert-Rechner &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Altarbeitnehmer */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Sonderfall
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Arbeitsverhältnisse vor dem 1.1.2004 — abgesenkter Schwellenwert
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Seit dem 01.01.2004 gilt der Schwellenwert von <strong>mehr als 10 Arbeitnehmern</strong>.
              Für Arbeitnehmer, deren Arbeitsverhältnis bereits <strong>vor diesem Stichtag</strong>
              {' '}im selben Betrieb begonnen hat (&bdquo;Altarbeitnehmer&ldquo;), gilt eine Schutzregelung:
              Sie genießen Kündigungsschutz, solange im Betrieb regelmäßig
              <strong> mehr als 5 Arbeitnehmer</strong> beschäftigt sind (
              <NormLink href={NORM.kschg23}>&sect;&nbsp;23 Abs.&nbsp;1 Satz&nbsp;2 KSchG</NormLink>).
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Wichtig: Fällt die Anzahl der &bdquo;Altarbeitnehmer&ldquo; einmal <strong>auf fünf oder
              darunter</strong>, geht der Kündigungsschutz <strong>unwiderruflich verloren</strong>
              — und zwar auch dann, wenn später wieder neue Mitarbeiter eingestellt werden.
              Ersatzeinstellungen für ausgeschiedene Altarbeitnehmer reichen nicht. Erst wenn der
              &bdquo;normale&ldquo; Schwellenwert von mehr als 10 Arbeitnehmern überschritten wird, entsteht
              erneut Kündigungsschutz.
            </p>

            <BagQuote
              az="2 AZR 840/05"
              datum="21.09.2006"
            >
              &bdquo;Sinkt die Zahl der vor dem 01.01.2004 beschäftigten Arbeitnehmer auf fünf oder
              weniger, verlieren auch sie den allgemeinen Kündigungsschutz endgültig, sofern
              nicht insgesamt mehr als zehn Arbeitnehmer regelmäßig beschäftigt sind. Ersatz­einstellungen
              für ausgeschiedene &sbquo;Altarbeitnehmer&lsquo; sind für den abgesenkten Schwellenwert nicht
              zu berücksichtigen.&ldquo;
              {' '}<span className="not-italic text-[0.82rem] text-ink-muted">(BAG, NZA 2007, 438)</span>
            </BagQuote>

            <p className="text-[0.85rem] text-ink-muted mb-6">
              Quelle:{' '}
              <a
                href={bagDejureUrl('21.09.2006', '2 AZR 840/05')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                BAG 21.09.2006 – 2 AZR 840/05 auf dejure.org &rarr;
              </a>
            </p>
            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.95rem] font-semibold text-ink mb-2">
                Beispiel — wie der Altarbeitnehmer-Schutz erlöschen kann
              </p>
              <p className="text-[0.9rem] text-ink-light m-0">
                Am 31.12.2003 sind sechs Arbeitnehmer in Vollzeit beschäftigt. Einer scheidet am
                30.04.2004 aus, die Belegschaft fällt auf fünf. Der allgemeine Kündigungsschutz
                erlischt. Am 01.07.2004 wird ein neuer Mitarbeiter eingestellt — der Schutz lebt
                nicht wieder auf. Erst wenn die regelmäßige Beschäftigtenzahl mehr als 10 erreicht,
                entsteht erneut Kündigungsschutz nach KSchG.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gemeinschaftsbetrieb */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Gemeinschaftsbetrieb
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Sonderfall: Gemeinschaftsbetrieb mehrerer Unternehmen
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Ein <strong>Gemeinschaftsbetrieb</strong> liegt vor, wenn rechtlich selbstständige
              Unternehmen einen Betrieb gemeinsam führen — typische Indizien sind: einheitliche
              Leitungsstruktur, gemeinsame Räumlichkeiten, geteilte Personalabteilung oder
              Buchhaltung, identische Geschäftsführung. In diesem Fall werden die Arbeitnehmer
              aller beteiligten Unternehmen für den Schwellenwert <strong>zusammengezählt</strong>.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-3">
              Das Bundesarbeitsgericht hat die Voraussetzungen eines gemeinsamen Betriebs
              mehrerer Unternehmen für die Anwendung des KSchG zuletzt im Urteil zum
              Aktenzeichen <strong>2 AZR 560/20</strong> bestätigt:
            </p>

            <BagQuote az="2 AZR 560/20">
              &bdquo;Ein gemeinsamer Betrieb mehrerer Unternehmen im Sinne von &sect;&nbsp;23 Abs.&nbsp;1
              KSchG liegt vor, wenn die in einer Betriebsstätte vorhandenen materiellen und
              immateriellen Betriebsmittel von mehreren Arbeitgebern gemeinsam für einen
              einheitlichen arbeitstechnischen Zweck eingesetzt werden und die Verwendung der
              Arbeitnehmer durch einen <strong>einheitlichen Leitungsapparat</strong>
              institutionell geregelt ist.&ldquo;
            </BagQuote>

            <p className="text-[0.85rem] text-ink-muted mb-5">
              Quelle:{' '}
              <a
                href={bagDejureUrl(null, '2 AZR 560/20')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                BAG – 2 AZR 560/20 auf dejure.org &rarr;
              </a>
            </p>

            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Konsequenz: Ein einzelnes Unternehmen, das für sich genommen Kleinbetrieb wäre,
              kann durch die Einbindung in einen Gemeinschaftsbetrieb in den Anwendungs­bereich
              des KSchG hineinwachsen — Voraussetzung ist allerdings, dass der gemeinsame
              Leitungsapparat <strong>institutionell verfestigt</strong> ist und nicht nur in
              Einzelfällen zusammenwirkt.
            </p>
            <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.95rem] font-semibold text-ink mb-2">
                Beispiel — KSchG durch Gemeinschaftsbetrieb anwendbar
              </p>
              <p className="text-[0.9rem] text-ink-light m-0">
                Mitarbeiter A arbeitet bei der X&nbsp;GmbH mit 4 Vollzeitkräften. Die X&nbsp;GmbH
                und die Schwestergesellschaft Y&nbsp;GmbH (10 Vollzeitkräfte) sitzen in denselben
                Räumen, haben denselben Geschäftsführer und teilen sich Personalabteilung und
                Buchhaltung. Ergebnis: Es liegt viel für einen Gemeinschaftsbetrieb. Die
                Belegschaften werden addiert (14 Mitarbeiter) — das KSchG ist anwendbar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beweislast */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Beweislast
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wer trägt die Beweislast für den Schwellenwert?
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Grundsätzlich trägt der <strong>Arbeitnehmer</strong> die Darlegungs- und Beweislast
              dafür, dass der Schwellenwert nach{' '}
              <NormLink href={NORM.kschg23}>&sect;&nbsp;23 Abs.&nbsp;1 KSchG</NormLink> überschritten
              ist. Weil er aber typischerweise keinen Einblick in die Personalstruktur des
              Arbeitgebers hat, hat das Bundesarbeitsgericht in ständiger Rechtsprechung eine
              <strong> abgestufte Darlegungslast</strong> entwickelt:
            </p>
            <div className="space-y-3 mb-5">
              {[
                {
                  step: '1',
                  title: 'Plausibler Vortrag des Arbeitnehmers',
                  desc: 'Der Arbeitnehmer muss zunächst plausibel darlegen, dass in der Regel mehr als 10 Arbeitnehmer beschäftigt sind — etwa anhand bekannter Namen, Stellenpläne oder Schichtbesetzung.',
                },
                {
                  step: '2',
                  title: 'Detaillierter Gegenvortrag des Arbeitgebers',
                  desc: 'Bestreitet der Arbeitgeber dies, muss er konkret zur Anzahl und Struktur der beschäftigten Personen vortragen — z. B. wer als freier Mitarbeiter, Geschäftsführer oder Auszubildender geführt wird.',
                },
                {
                  step: '3',
                  title: 'Substantiierte Erwiderung des Arbeitnehmers',
                  desc: 'Der Arbeitnehmer muss sich dann konkret zu diesem Vortrag verhalten — z. B. darlegen, dass ein angeblich freier Mitarbeiter tatsächlich weisungsgebunden und eingegliedert ist.',
                },
                {
                  step: '4',
                  title: 'Beweisaufnahme durch das Gericht',
                  desc: 'Bleibt der Sachverhalt streitig, erhebt das Arbeitsgericht Beweis — etwa durch Zeugen­vernehmung der betreffenden Mitarbeiter.',
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
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              <strong>Praxis:</strong> Wer als gekündigter Arbeitnehmer an der Schwelle zur
              Anwendbarkeit steht, sollte frühzeitig alle Anhaltspunkte zur Belegschaftsstärke
              sichern (Stellenanzeigen, interne Verteiler, Telefonlisten, Schichtpläne).
            </p>
          </div>
        </div>
      </section>

      {/* Folgen */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechtsfolgen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Was bedeutet die (Nicht-)Anwendbarkeit konkret?
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-[0.9rem] border-collapse bg-white">
                <thead>
                  <tr className="border-b-2 border-gold">
                    <th className="text-left py-3 px-4 font-semibold">Kriterium</th>
                    <th className="text-left py-3 px-4 font-semibold">KSchG anwendbar</th>
                    <th className="text-left py-3 px-4 font-semibold">KSchG nicht anwendbar</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { k: 'Kündigungsgrund', a: 'Verhaltens-, personen- oder betriebsbedingt', n: 'Kein Grund nötig — nur Fristen' },
                    { k: 'Soziale Auswahl', a: 'Pflicht bei betriebsbedingter Kündigung', n: 'Nicht erforderlich' },
                    { k: 'Schutz vor Willkür', a: 'Umfassend (§ 1 KSchG)', n: 'Nur Treu & Glauben, AGG, Sittenwidrigkeit' },
                    { k: 'Abfindung im Vergleich', a: 'Regelmäßig — 0,5–1,5 Monatsgehälter / Jahr', n: 'Selten — geringer Verhandlungsdruck' },
                    { k: 'Klagefrist', a: '3 Wochen nach § 4 KSchG', n: '3 Wochen nach § 4 KSchG (gilt auch hier)' },
                    { k: 'Sonderkündigungsschutz', a: 'Bleibt unberührt', n: 'Bleibt unberührt' },
                  ].map((row) => (
                    <tr key={row.k} className="border-b border-border">
                      <td className="py-3 px-4 font-medium">{row.k}</td>
                      <td className="py-3 px-4 text-ink-light">{row.a}</td>
                      <td className="py-3 px-4 text-ink-light">{row.n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
              <strong>Wichtig:</strong> Auch ohne Anwendbarkeit des KSchG müssen Sie die
              <strong> 3-Wochen-Klagefrist</strong> nach{' '}
              <NormLink href={NORM.kschg4}>&sect;&nbsp;4 KSchG</NormLink> einhalten — sie gilt für
              jede Klage gegen die Wirksamkeit einer schriftlichen Kündigung, unabhängig vom
              Schwellenwert.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Sonderkündigungsschutz für <strong>Schwangere</strong> (
              <NormLink href={NORM.muschg17}>&sect;&nbsp;17 MuSchG</NormLink>),{' '}
              <strong>Schwerbehinderte</strong> (
              <NormLink href={NORM.sgbIX168}>&sect;&nbsp;168 SGB&nbsp;IX</NormLink>),{' '}
              <strong>Betriebsräte</strong> (
              <NormLink href={NORM.kschg15}>&sect;&nbsp;15 KSchG</NormLink>) und{' '}
              <strong>Elternzeitler</strong> (
              <NormLink href={NORM.beeg18}>&sect;&nbsp;18 BEEG</NormLink>) gilt
              <strong> auch im Kleinbetrieb</strong> und bei Nichtanwendbarkeit des allgemeinen
              KSchG.
            </p>
          </div>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Unsicher, ob das KSchG bei Ihnen greift?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[560px] mx-auto mb-6">
            Wir prüfen Wartezeit und Schwellenwert in Ihrem konkreten Fall — inklusive
            Leiharbeit, Gemeinschaftsbetrieb und Teilzeitkräften — innerhalb von 24 Stunden.
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
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link
              href="/schwellenwert-rechner/"
              className="block py-6 px-6 bg-white border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Tool
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Schwellenwert-Rechner
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Vollzeitäquivalente berechnen — inkl. Teilzeit-Faktor. &rarr;
              </span>
            </Link>
            <Link
              href="/kuendigungsschutzklage/"
              className="block py-6 px-6 bg-white border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Verwandtes Thema
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Kündigungsschutzklage
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Ablauf, Kosten, 3-Wochen-Frist nach §4 KSchG. &rarr;
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
            Anwendung des Kündigungsschutzgesetzes
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Author */}
      <section className="py-8 px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
            <ShareButtons
              url="/kuendigungsschutzgesetz-anwendung/"
              title="Wann findet das Kündigungsschutzgesetz Anwendung?"
            />
          </div>
        </div>
      </section>

      <AktuelleRechtslage />
      <Quellen quellen={QUELLEN_KSCHG_ANWENDUNG} />
      <RelatedTopics current="kuendigungsschutzgesetz-anwendung" />

      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/kuendigungsschutzgesetz-anwendung" />
        </div>
      </section>

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt prüfen lassen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Wartezeit und Schwellenwert — wir klären beides.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Fachanwalt für Arbeitsrecht prüft Ihre konkrete Situation und sagt Ihnen, ob das
            KSchG greift — und welche Abfindung realistisch ist.
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
