import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import StandAnzeige from '@/components/StandAnzeige';
import AktuelleRechtslage from '@/components/AktuelleRechtslage';
import AuthorByline from '@/components/AuthorByline';
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
import { generateArticleSchema } from '@/lib/article-schema';

export const revalidate = 86400;

const year = new Date().getFullYear();
const PAGE_URL = `${SEO_CONFIG.baseUrl}/kuendigungsfrist-berechnen-arbeitnehmer/`;

export const metadata: Metadata = {
  title: `Kündigungsfrist berechnen (Arbeitnehmer) ${year} — kostenlos in 30 Sekunden`,
  description: `Kündigungsfrist als Arbeitnehmer ${year} kostenlos berechnen: gesetzliche Fristen nach § 622 BGB, Probezeit, Tarifvertrag & Sonderfälle — mit Rechner, Tabelle und Fachanwalts-Ratgeber.`,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Kündigungsfrist berechnen (Arbeitnehmer) — kostenlos ${year}`,
    description:
      'Kündigungsfrist als Arbeitnehmer taggenau nach § 622 BGB berechnen — kostenlos, mit Tabelle und Rechner. Fachanwalt für Arbeitsrecht.',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Kündigungsfrist berechnen (Arbeitnehmer) — kostenlos ${year}`,
    description:
      'Gesetzliche Frist, Probezeit, Tarifvertrag: alle Konstellationen für Arbeitnehmer nach § 622 BGB. Fachanwalt Fatih Bektas.',
  },
};

const faqs = [
  {
    q: 'Welche Kündigungsfrist gilt für mich als Arbeitnehmer?',
    a: 'Als Arbeitnehmer gilt nach § 622 Abs. 1 BGB eine gesetzliche Grundkündigungsfrist von 4 Wochen zum 15. oder zum Monatsende. Diese Frist gilt unabhängig davon, wie lange Sie im Betrieb sind. Die verlängerten Fristen aus § 622 Abs. 2 BGB (bis zu 7 Monate zum Monatsende) gelten dagegen ausschließlich für Kündigungen durch den Arbeitgeber. In der Probezeit reduziert sich die Frist auf 2 Wochen (§ 622 Abs. 3 BGB). Ein Arbeits- oder Tarifvertrag kann längere Fristen vorsehen — auch für Sie. Kürzere Fristen als die gesetzlichen sind für Arbeitnehmer nur eng begrenzt zulässig (§ 622 Abs. 5 BGB).',
  },
  {
    q: 'Kann mein Arbeitgeber eine längere Kündigungsfrist für mich vereinbaren?',
    a: 'Ja, aber nur unter Einhaltung von § 622 Abs. 6 BGB: Für Ihre Kündigung darf keine längere Frist vereinbart werden als für die Kündigung durch den Arbeitgeber. Wenn Ihr Vertrag also für Sie eine 6-Monats-Frist vorsieht, muss der Arbeitgeber sich ebenfalls an diese 6-Monats-Frist halten. Ist die Klausel einseitig zu Ihren Ungunsten formuliert, ist sie unwirksam — es gilt dann die gesetzliche 4-Wochen-Frist.',
  },
  {
    q: 'Ab wann läuft meine Kündigungsfrist?',
    a: 'Die Kündigungsfrist beginnt am Tag nach dem Zugang der Kündigung beim Arbeitgeber. Zugang bedeutet: Die Kündigung muss so in den Machtbereich des Arbeitgebers gelangen, dass mit einer Kenntnisnahme unter normalen Umständen zu rechnen ist. Einwurf-Einschreiben, persönliche Übergabe mit Empfangsbestätigung oder Übergabe an einen empfangsbevollmächtigten Mitarbeiter sind sichere Wege. Ein bloßer E-Mail-Versand reicht nur, wenn Ihr Arbeitsvertrag das ausdrücklich zulässt — sonst greift die Schriftform nach § 623 BGB.',
  },
  {
    q: 'Was gilt in der Probezeit?',
    a: 'Während einer vereinbarten Probezeit von maximal 6 Monaten (§ 622 Abs. 3 BGB) kann jede Seite mit einer Frist von 2 Wochen kündigen — ohne Bindung an den 15. oder das Monatsende. Beispiel: Zugang am 8. März → letzter Arbeitstag 22. März. Die Probezeit muss ausdrücklich im Arbeitsvertrag vereinbart sein; sie gilt nicht automatisch. Nach Ablauf der Probezeit greift automatisch die gesetzliche Grundfrist.',
  },
  {
    q: 'Kann ich fristlos kündigen als Arbeitnehmer?',
    a: 'Ja, eine außerordentliche fristlose Kündigung nach § 626 BGB ist auch als Arbeitnehmer möglich — allerdings nur bei einem wichtigen Grund, der es unzumutbar macht, das Arbeitsverhältnis bis zum Ablauf der ordentlichen Frist fortzusetzen. Klassische Gründe: mehrmals unterlassene Lohnzahlung, sexuelle Belästigung, schwere Beleidigungen, Gefährdung der Gesundheit. Vor der fristlosen Kündigung muss regelmäßig eine Abmahnung erfolgen. Die Erklärung muss innerhalb von 2 Wochen nach Kenntnis des Grunds (§ 626 Abs. 2 BGB) ausgesprochen werden — sonst ist sie unwirksam.',
  },
  {
    q: 'Muss ich die Kündigung schriftlich einreichen?',
    a: 'Ja, zwingend. Nach § 623 BGB muss jede Kündigung — auch die des Arbeitnehmers — schriftlich in Papierform mit eigenhändiger Unterschrift erfolgen. Fax, gescannte PDFs und E-Mails sind formunwirksam und damit nichtig. Eine formunwirksam ausgesprochene Kündigung beendet das Arbeitsverhältnis nicht — Sie müssten weiter arbeiten und würden weiter bezahlt. Sicherer Weg: eigenhändig unterschriebene Kündigung per Einwurf-Einschreiben oder persönlicher Übergabe mit Empfangsbestätigung.',
  },
  {
    q: 'Wie ist es, wenn im Tarifvertrag andere Fristen stehen?',
    a: 'Tarifvertragliche Kündigungsfristen gehen der gesetzlichen Regelung vor — auch wenn sie kürzer sind (§ 622 Abs. 4 BGB). Der Tarifvertrag muss allerdings kraft Tarifbindung oder ausdrücklicher Bezugnahme im Arbeitsvertrag anwendbar sein. Beispiele: Bau-Hauptgewerbe, öffentlicher Dienst (TVöD), Metall- und Elektroindustrie haben eigene Fristsysteme. Prüfen Sie im Zweifel den Tarifvertrag oder lassen Sie die konkrete Frist anwaltlich klären.',
  },
  {
    q: 'Was passiert, wenn ich zu kurz kündige?',
    a: 'Wenn Sie eine Kündigungsfrist unterschreiten, wird Ihre Kündigung nicht unwirksam — sie wird nach herrschender Meinung in eine Kündigung zum nächst zulässigen Termin umgedeutet. Beispiel: Sie kündigen zum 15. eines Monats, obwohl 4 Wochen zum Monatsende gelten → das Arbeitsverhältnis endet erst zum Monatsende. Der Arbeitgeber kann Sie in der überschießenden Zeit weiterbeschäftigen oder freistellen. Bleiben Sie einfach weg, drohen Vertragsstrafe (falls im Vertrag geregelt) und Schadensersatz.',
  },
];

const QUELLEN_KUENDIGUNGSFRIST = [
  { text: '§ 622 BGB — Kündigungsfristen bei Arbeitsverhältnissen', url: 'https://www.gesetze-im-internet.de/bgb/__622.html', art: 'gesetz' as const },
  { text: '§ 623 BGB — Schriftform der Kündigung', url: 'https://www.gesetze-im-internet.de/bgb/__623.html', art: 'gesetz' as const },
  { text: '§ 626 BGB — Fristlose Kündigung aus wichtigem Grund', url: 'https://www.gesetze-im-internet.de/bgb/__626.html', art: 'gesetz' as const },
  { text: '§ 4 KSchG — Klagefrist 3 Wochen', url: 'https://www.gesetze-im-internet.de/kschg/__4.html', art: 'gesetz' as const },
  { text: 'BAG 6 AZR 158/11 vom 15.12.2011 — Wirksamkeit der Kündigungsfrist bei AGB-Klauseln', url: 'https://www.bundesarbeitsgericht.de/entscheidung/6-azr-158-11/', art: 'urteil' as const },
];

const RECHNER_LINK = '/kuendigungsfrist-rechner/';
const TABELLE_LINK = '/kuendigungsfristen/';
const AUFHEBUNG_LINK = '/aufhebungsvertrag/';

export default function KuendigungsfristBerechnenArbeitnehmerPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={PAGE_URL}
        pageTitle="Kündigungsfrist berechnen (Arbeitnehmer) — kostenlos nach § 622 BGB"
        pageDescription="Kündigungsfrist als Arbeitnehmer kostenlos berechnen: gesetzliche Grundfrist, Probezeit, Tarifvertrag und Sonderfälle nach § 622 BGB. Fachanwalt für Arbeitsrecht."
        pageType="Article"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['#direktantwort', '.faq-section']}
        dateModified={PAGE_DATES.kuendigungsfristBerechnenArbeitnehmer}
        datePublished="2026-07-17"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber/` },
          { name: 'Arbeitsrecht', url: `${SEO_CONFIG.baseUrl}/ratgeber/arbeitsrecht/` },
          { name: 'Kündigungsfrist berechnen (Arbeitnehmer)', url: PAGE_URL },
        ]}
        isBasedOn={[
          { name: '§ 622 BGB — Kündigungsfristen', url: 'https://www.gesetze-im-internet.de/bgb/__622.html' },
          { name: '§ 623 BGB — Schriftform', url: 'https://www.gesetze-im-internet.de/bgb/__623.html' },
          { name: '§ 626 BGB — Fristlose Kündigung', url: 'https://www.gesetze-im-internet.de/bgb/__626.html' },
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
              headline: 'Kündigungsfrist berechnen (Arbeitnehmer) — kostenlos nach § 622 BGB',
              description:
                'Ratgeber mit Rechner: Kündigungsfrist als Arbeitnehmer nach § 622 BGB berechnen. Gesetzliche Grundfrist, Probezeit, Tarifvertrag, Schriftform und Sonderfälle.',
              dateModified: PAGE_DATES.kuendigungsfristBerechnenArbeitnehmer,
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
            <span>Kündigungsfrist berechnen (Arbeitnehmer)</span>
          </nav>
          <StandAnzeige modifiedAt={PAGE_DATES.kuendigungsfristBerechnenArbeitnehmer} />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Kostenlos &amp; sofort · &sect;&nbsp;622 BGB
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[820px]">
            Kündigungsfrist berechnen als Arbeitnehmer &mdash; kostenlos, taggenau, in unter 30 Sekunden
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
              Als Arbeitnehmer gilt nach <strong>&sect;&nbsp;622 Abs.&nbsp;1 BGB</strong> eine gesetzliche
              Grundfrist von <strong>4 Wochen zum 15. oder zum Monatsende</strong> &mdash; unabhängig von der
              Betriebszugehörigkeit. In der <strong>Probezeit</strong> reduziert sich die Frist auf
              <strong> 2 Wochen ohne Endtermin</strong> (&sect;&nbsp;622 Abs.&nbsp;3 BGB). Die verlängerten
              Fristen aus &sect;&nbsp;622 Abs.&nbsp;2 BGB (bis zu 7 Monaten) gelten
              <strong> ausschließlich für Arbeitgeber</strong>. Ein <strong>Tarifvertrag</strong> geht der
              gesetzlichen Regelung vor. Für die Kündigung ist zwingend die <strong>Schriftform</strong>{' '}
              (&sect;&nbsp;623 BGB) einzuhalten &mdash; Fax, E-Mail und PDF sind unwirksam.
            </p>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <section className="py-[40px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <TldrBox
              items={[
                'Grundfrist Arbeitnehmer: 4 Wochen zum 15. oder Monatsende (§ 622 Abs. 1 BGB).',
                'Probezeit: 2 Wochen ohne Endtermin (§ 622 Abs. 3 BGB).',
                'Verlängerte Fristen nach Betriebszugehörigkeit gelten NUR für Arbeitgeber.',
                'Längere vertragliche Fristen für Sie: nur wenn Arbeitgeber gleich lange gebunden ist (§ 622 Abs. 6 BGB).',
                'Tarifvertrag geht vor — auch bei kürzeren Fristen (§ 622 Abs. 4 BGB).',
                'Schriftform mit eigenhändiger Unterschrift zwingend (§ 623 BGB).',
                'Zu kurz gekündigt → Umdeutung zum nächst zulässigen Termin, nicht Nichtigkeit.',
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA #1 — Rechner prominent */}
      <section className="py-[40px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px] p-6 md:p-8 bg-white border-2 border-gold rounded-sm">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
              Rechner
            </div>
            <h2 className="font-serif text-[1.35rem] md:text-[1.55rem] font-bold text-ink mb-2 leading-tight">
              Ihre Kündigungsfrist in unter 30 Sekunden &mdash; taggenau
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Geben Sie das Zugangsdatum Ihrer Kündigung und die maßgebliche Frist ein &mdash; der Rechner
              zeigt Ihnen den letzten Arbeitstag, die 3-Wochen-Klagefrist und eine Referenztabelle nach{' '}
              &sect;&nbsp;622 BGB.
            </p>
            <Link
              href={RECHNER_LINK}
              className="inline-block py-3.5 px-7 bg-gold-dark text-white rounded-sm font-semibold text-[0.98rem] no-underline transition-all hover:bg-[#635428]"
            >
              Kündigungsfrist jetzt berechnen &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <DefinitionBox
              term="Kündigungsfrist"
              definition="Zeitraum, der zwischen dem Zugang der Kündigungserklärung und dem tatsächlichen Ende des Arbeitsverhältnisses liegt. Für Arbeitnehmer beträgt die gesetzliche Grundfrist nach § 622 Abs. 1 BGB 4 Wochen zum 15. oder zum Monatsende — unabhängig von der Betriebszugehörigkeit."
            />
          </div>
        </div>
      </section>

      {/* Section: Grundfrist & Beispiele */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Grundfrist &amp; Beispiele
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              So läuft Ihre Kündigungsfrist als Arbeitnehmer
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              Die 4-Wochen-Frist ist eine <strong>Kalenderwoche zu 7 Tagen</strong> &mdash; also 28 Tage, nicht
              &bdquo;ein Monat&ldquo;. Sie beginnt am Tag <em>nach</em> dem Zugang der Kündigung.
              Die Frist muss auf den <strong>15.</strong> oder auf den <strong>Monatsletzten</strong> enden.
              Trifft sie einen anderen Tag, wird bis zum nächsten zulässigen Endtermin verlängert.
            </p>

            <div className="space-y-4">
              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  Beispiel 1: Zugang am 10. eines Monats
                </div>
                <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                  Fristbeginn 11. → 4 Wochen später am 8. des Folgemonats. Zulässiger Endtermin: der{' '}
                  <strong>15. des Folgemonats</strong> (nächst zulässig). Das Arbeitsverhältnis endet also am 15.
                </p>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  Beispiel 2: Zugang am 20. eines Monats
                </div>
                <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                  Fristbeginn 21. → 4 Wochen später am 18. des Folgemonats. Zulässiger Endtermin: der{' '}
                  <strong>letzte Tag des Folgemonats</strong>. Das Arbeitsverhältnis endet am Monatsletzten.
                </p>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  Beispiel 3: Zugang am 3. eines Monats
                </div>
                <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                  Fristbeginn 4. → 4 Wochen später am 1. des Folgemonats. Zulässiger Endtermin: der{' '}
                  <strong>15. des Folgemonats</strong>. Der 1. reicht nicht &mdash; es wird bis zum 15. verlängert.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white border border-border rounded-sm">
              <p className="text-[0.92rem] text-ink-light m-0 leading-relaxed">
                Wenn Ihnen der Kalender-Rechenweg zu fehleranfällig ist, nutzen Sie den{' '}
                <Link href={RECHNER_LINK} className="text-gold-dark font-semibold no-underline hover:underline">
                  Kündigungsfrist-Rechner
                </Link>{' '}
                &mdash; er zeigt den letzten Arbeitstag taggenau und weist auf die 3-Wochen-Klagefrist hin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Sonderfälle */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Sonderfälle
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Probezeit, Tarifvertrag, längere vertragliche Fristen
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Probezeit — 2 Wochen ohne Endtermin
                </h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  Ist im Arbeitsvertrag eine Probezeit von maximal 6 Monaten ausdrücklich vereinbart, gilt
                  nach &sect;&nbsp;622 Abs.&nbsp;3 BGB eine Frist von <strong>2 Wochen ohne Bindung an
                  einen bestimmten Endtermin</strong>. Beispiel: Zugang am 8. März &rarr; letzter Arbeitstag 22. März.
                  Endet die Probezeit während der laufenden Frist, greift automatisch die gesetzliche 4-Wochen-Frist.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Tarifvertrag &mdash; hat immer Vorrang
                </h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  Nach &sect;&nbsp;622 Abs.&nbsp;4 BGB gehen tarifvertragliche Kündigungsfristen der
                  gesetzlichen Regelung vor &mdash; auch dann, wenn sie kürzer sind. Voraussetzung: Sie sind
                  tarifgebunden (Gewerkschaftsmitglied und Betrieb tarifgebunden) oder der Tarifvertrag ist im
                  Arbeitsvertrag ausdrücklich einbezogen. Prüfen Sie bei Zweifeln Bau-Hauptgewerbe, öffentlichen
                  Dienst (TVöD) oder die IG Metall-Verträge, die alle eigene Fristsysteme haben.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Längere Frist im Arbeitsvertrag
                </h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  Der Arbeitgeber darf für Sie eine längere Frist vereinbaren &mdash; aber nur, wenn er sich
                  <strong> selbst gleich lang bindet</strong> (&sect;&nbsp;622 Abs.&nbsp;6 BGB). Sieht Ihr Vertrag
                  für Sie 6 Monate, für den Arbeitgeber aber nur 4 Wochen vor, ist Ihre Klausel unwirksam
                  &mdash; es gilt die gesetzliche 4-Wochen-Frist (BAG 6 AZR 158/11).
                </p>
              </div>

              <div>
                <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Fristlose Kündigung nach &sect;&nbsp;626 BGB
                </h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  Auch als Arbeitnehmer können Sie außerordentlich fristlos kündigen &mdash; aber nur bei
                  <strong> wichtigem Grund</strong>. Klassische Fälle: mehrmalige unpünktliche oder ausbleibende
                  Lohnzahlung, sexuelle Belästigung, Gefährdung der Gesundheit. Sie müssen innerhalb von
                  <strong> 2 Wochen nach Kenntnis des Grunds</strong> (&sect;&nbsp;626 Abs.&nbsp;2 BGB) kündigen &mdash;
                  sonst ist die fristlose Kündigung unwirksam.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Aufhebungsvertrag statt Kündigung
                </h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  Wenn Sie schneller raus wollen als die Kündigungsfrist erlaubt, ist ein{' '}
                  <Link href={AUFHEBUNG_LINK} className="text-gold-dark font-semibold no-underline hover:underline">
                    Aufhebungsvertrag
                  </Link>{' '}
                  die einzige rechtssichere Option. Achtung: Die Bundesagentur für Arbeit verhängt in der Regel
                  eine 12-Wochen-Sperrzeit &mdash; es sei denn, es gibt einen wichtigen Grund. Lassen Sie den
                  Vertrag vor Unterschrift prüfen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA #2 — Rechner inline */}
      <section className="py-[30px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px] flex flex-col md:flex-row items-start md:items-center gap-4 p-5 bg-white border border-gold rounded-sm">
            <div className="flex-1">
              <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                Nicht rechnen wollen? Wir übernehmen das.
              </div>
              <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                Der Rechner zeigt Ihnen den taggenauen Endtermin &mdash; ganz ohne Kopfrechnen mit dem Kalender.
              </p>
            </div>
            <Link
              href={RECHNER_LINK}
              className="whitespace-nowrap py-2.5 px-5 bg-gold-dark text-white rounded-sm font-semibold text-[0.9rem] no-underline transition-all hover:bg-[#635428]"
            >
              Zum Rechner &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Schriftform + Zugang */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Formalien
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Schriftform, Zugang und der teuerste Fehler
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              &sect;&nbsp;623 BGB verlangt für jede Kündigung die <strong>Schriftform</strong> mit
              eigenhändiger Unterschrift auf Papier. <strong>Fax, gescannte PDFs und E-Mails sind
              formunwirksam</strong> &mdash; die Kündigung ist rechtlich nicht existent. Das Arbeitsverhältnis
              läuft weiter, Sie müssten weiter arbeiten und der Arbeitgeber müsste weiter bezahlen.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              <strong>Zugang</strong> bedeutet: Die Kündigung muss so in den Machtbereich des Empfängers
              gelangen, dass unter gewöhnlichen Umständen mit Kenntnisnahme zu rechnen ist. Sicher:
            </p>
            <ul className="list-none space-y-2 mb-4 pl-0">
              <li className="flex items-start gap-2 text-[0.95rem] text-ink-light leading-relaxed">
                <span className="text-gold mt-0.5">&#10003;</span>
                <span>Einwurf-Einschreiben (nicht Übergabe-Einschreiben &mdash; das erreicht oft niemanden)</span>
              </li>
              <li className="flex items-start gap-2 text-[0.95rem] text-ink-light leading-relaxed">
                <span className="text-gold mt-0.5">&#10003;</span>
                <span>Persönliche Übergabe mit gegengezeichneter Empfangsbestätigung</span>
              </li>
              <li className="flex items-start gap-2 text-[0.95rem] text-ink-light leading-relaxed">
                <span className="text-gold mt-0.5">&#10003;</span>
                <span>Übergabe an einen empfangsbevollmächtigten Mitarbeiter (z.B. Sekretariat)</span>
              </li>
            </ul>
            <p className="text-[1rem] text-ink-light leading-relaxed m-0">
              <strong>Der teuerste Fehler:</strong> Kündigung per E-Mail schicken, gleich am nächsten Tag den
              neuen Job antreten. Die alte Kündigung ist unwirksam &mdash; der alte Arbeitgeber könnte auf
              Vertragsstrafe und Schadensersatz klagen.
            </p>
          </div>
        </div>
      </section>

      {/* Aktuelle Rechtslage */}
      <section className="py-[40px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <AktuelleRechtslage />
          </div>
        </div>
      </section>

      {/* CTA #3 — Rechner + Tabelle als zwei Karten */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Zwei Tools &mdash; Rechner &amp; Tabelle
            </div>
            <h2 className="font-serif text-[clamp(1.35rem,3vw,1.8rem)] font-bold leading-[1.25] mb-4">
              Konkrete Zahl oder komplette Übersicht &mdash; Sie entscheiden
            </h2>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <Link
                href={RECHNER_LINK}
                className="block p-5 bg-cream border-2 border-gold rounded-sm no-underline hover:bg-gold-bg transition-all"
              >
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Für Ihren Fall
                </div>
                <div className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Kündigungsfrist-Rechner
                </div>
                <div className="text-[0.88rem] text-ink-light leading-relaxed mb-3">
                  Taggenauer Endtermin nach &sect;&nbsp;622 BGB inklusive 3-Wochen-Klagefrist.
                </div>
                <div className="text-[0.9rem] font-semibold text-gold-dark">
                  Rechner öffnen &rarr;
                </div>
              </Link>
              <Link
                href={TABELLE_LINK}
                className="block p-5 bg-cream border-2 border-gold rounded-sm no-underline hover:bg-gold-bg transition-all"
              >
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Komplette Übersicht
                </div>
                <div className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Kündigungsfristen-Tabelle
                </div>
                <div className="text-[0.88rem] text-ink-light leading-relaxed mb-3">
                  Alle Fristen für Arbeitgeber und Arbeitnehmer, Probezeit und Tarifvertrag.
                </div>
                <div className="text-[0.9rem] font-semibold text-gold-dark">
                  Zur Tabelle &rarr;
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[60px] px-8 bg-cream faq-section">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Häufige Fragen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Fragen zur Kündigungsfrist als Arbeitnehmer
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* AuthorBox + Share */}
      <section className="py-[40px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <AuthorBox />
            <div className="mt-6">
              <ShareButtons url={PAGE_URL} title="Kündigungsfrist berechnen als Arbeitnehmer" />
            </div>
          </div>
        </div>
      </section>

      {/* Quellen */}
      <section className="py-[40px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <Quellen quellen={QUELLEN_KUENDIGUNGSFRIST} />
          </div>
        </div>
      </section>

      <RelatedTopics current="kuendigung" />

      <section className="py-[40px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/kuendigungsfrist-berechnen-arbeitnehmer" />
        </div>
      </section>

      {/* Kontakt-CTA */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Individuelle Prüfung
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Unsicher, welche Frist für Sie gilt?
          </h2>
          <p className="text-[1rem] text-ink-light max-w-[620px] mx-auto leading-relaxed mb-6">
            Der Rechner liefert die Standardfälle nach &sect;&nbsp;622 BGB. Bei Tarifbindung, langer
            Betriebszugehörigkeit, umstrittener Klausel oder gleichzeitigem Abfindungswunsch prüfen wir
            Ihren Fall kostenlos.
          </p>
          <Link
            href="/mandantenaufnahme/"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white rounded-sm font-semibold text-[0.98rem] no-underline transition-all hover:bg-[#635428]"
          >
            Kostenlose Ersteinschätzung anfragen &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
