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
const PAGE_URL = `${SEO_CONFIG.baseUrl}/urlaubsanspruch-bei-kuendigung/`;

export const metadata: Metadata = {
  title: `Urlaubsanspruch bei Kündigung Rechner ${year} — Ratgeber § 5 BUrlG`,
  description: `Urlaubsanspruch bei Kündigung ${year} verstehen und berechnen: Halbjahres-Regel nach § 5 BUrlG, Wartezeit, Verfall, Abgeltung. Mit kostenlosem Rechner und Fachanwalts-Ratgeber.`,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Urlaubsanspruch bei Kündigung — Rechner + Ratgeber ${year}`,
    description:
      'Wie viel Resturlaub steht Ihnen bei Kündigung zu? § 5 BUrlG erklärt, kostenlos berechnen. Fachanwalt für Arbeitsrecht.',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Urlaubsanspruch bei Kündigung — Rechner + Ratgeber ${year}`,
    description:
      'Halbjahres-Regel nach § 5 BUrlG, Wartezeit, Verfall, Abgeltung — mit Rechner. Fachanwalt Fatih Bektas.',
  },
};

const faqs = [
  {
    q: 'Wie berechne ich meinen Urlaubsanspruch bei Kündigung?',
    a: 'Nach § 5 BUrlG hängt die Berechnung vom Monat der Beendigung ab. Endet das Arbeitsverhältnis im 1. Halbjahr (Januar bis Juni), erhalten Sie 1/12 des vertraglichen Jahresurlaubs pro vollem Beschäftigungsmonat (§ 5 Abs. 1 lit. c BUrlG). Endet es nach dem 30. Juni und ist die 6-monatige Wartezeit nach § 4 BUrlG erfüllt, steht Ihnen der volle gesetzliche Mindesturlaub zu — 20 Tage bei 5-Tage-Woche, 24 Tage bei 6-Tage-Woche. Für den übervertraglichen Anteil entscheidet die Pro-rata-Klausel im Arbeitsvertrag. Unser Resturlaubs-Rechner rechnet alle drei Szenarien automatisch.',
  },
  {
    q: 'Was ist der Unterschied zwischen gesetzlichem Mindesturlaub und vertraglichem Jahresurlaub?',
    a: 'Der gesetzliche Mindesturlaub beträgt nach § 3 BUrlG 24 Werktage bei 6-Tage-Woche, umgerechnet 20 Arbeitstage bei 5-Tage-Woche. Viele Arbeitsverträge und Tarifverträge gewähren jedoch mehr Urlaub — der übergesetzliche Anteil kann rechtlich anders behandelt werden. Für den gesetzlichen Anteil greift § 5 BUrlG zwingend; für den übervertraglichen Anteil gilt die vertragliche Regelung, insbesondere eine wirksame Pro-rata-temporis-Klausel.',
  },
  {
    q: 'Verfällt mein Urlaub bei Kündigung automatisch?',
    a: 'Nein. Nach der Rechtsprechung des EuGH (Urteil vom 06.11.2018, C-684/16 „Max-Planck") und des BAG (Urteil vom 19.02.2019, 9 AZR 541/15) verfällt Urlaub nur dann, wenn der Arbeitgeber Sie rechtzeitig, klar und nachweisbar auf den drohenden Verfall hingewiesen hat. Fehlt dieser Hinweis, sammelt sich der Urlaub über Jahre an — bei Kündigung muss der Arbeitgeber ihn in voller Höhe abgelten (§ 7 Abs. 4 BUrlG).',
  },
  {
    q: 'Was passiert mit Resturlaub, wenn ich ihn nicht mehr nehmen kann?',
    a: 'Kann der Resturlaub wegen Ende des Arbeitsverhältnisses nicht mehr in Freizeit gewährt werden, wandelt er sich automatisch in einen Anspruch auf Urlaubsabgeltung nach § 7 Abs. 4 BUrlG. Der Anspruch entsteht mit dem letzten Arbeitstag und ist ein reiner Geldanspruch — kein Urlaub mehr. Er wird mit der letzten Lohnabrechnung ausgezahlt und mit dem regulären Steuersatz versteuert. Berechnung: Bruttomonatsgehalt ÷ (durchschnittliche Arbeitstage pro Monat) × Resturlaubstage.',
  },
  {
    q: 'Habe ich Anspruch auf vollen Urlaub, wenn ich in der Probezeit gekündigt werde?',
    a: 'Nein. Während der ersten sechs Beschäftigungsmonate — die typische Wartezeit nach § 4 BUrlG — besteht nur Anspruch auf Teilurlaub. Sie erhalten 1/12 des Jahresurlaubs pro vollem Beschäftigungsmonat (§ 5 Abs. 1 lit. a BUrlG). Beispiel: 30 Tage vertraglicher Jahresurlaub, Ausscheiden nach 4 vollen Monaten → 4/12 × 30 = 10 Tage Resturlaub. Nach Ablauf der Wartezeit greift die reguläre Halbjahres-Regel.',
  },
  {
    q: 'Kann der Arbeitgeber verlangen, dass ich Resturlaub in der Kündigungsfrist nehme?',
    a: 'Grundsätzlich ja — der Arbeitgeber kann Urlaub in der Kündigungsfrist einseitig anordnen, um Abgeltung zu vermeiden. Voraussetzungen: unwiderrufliche Freistellung, klare schriftliche Anordnung, ausreichende zeitliche Lage. Nach BAG (Urteil vom 20.06.2000, 9 AZR 405/99) muss die Freistellung unmissverständlich zur Urlaubsgewährung erfolgen. Bei widerruflicher Freistellung wird der Urlaub nicht wirksam gewährt — die Abgeltung bleibt offen.',
  },
  {
    q: 'Wie lange kann ich meinen Urlaubsanspruch nach der Kündigung geltend machen?',
    a: 'Der Anspruch auf Urlaubsabgeltung verjährt regelmäßig nach 3 Jahren zum Jahresende (§ 195 BGB). WICHTIG: Viele Arbeits- und Tarifverträge enthalten kürzere Ausschlussfristen — häufig 3 oder 6 Monate nach Beendigung. Wer diese Frist verpasst, verliert den Anspruch endgültig. Nach dem BAG-Urteil vom 22.09.2022 (8 AZR 4/22) unterliegen auch Urlaubsabgeltungsansprüche solchen Ausschlussfristen, sofern die Klausel wirksam ist. Deshalb: Sofort nach Zugang der Kündigung schriftlich einfordern.',
  },
  {
    q: 'Gilt der Urlaubsanspruch auch bei fristloser Kündigung?',
    a: 'Ja. Auch bei einer außerordentlichen fristlosen Kündigung nach § 626 BGB bleibt der Urlaubsanspruch bestehen — Urlaub ist ein zwingender Anspruch nach BUrlG und nicht abhängig vom Kündigungsgrund. Praktisch bedeutet das: Da das Arbeitsverhältnis mit sofortiger Wirkung endet, kann der Resturlaub nicht mehr in Freizeit genommen werden — er wandelt sich vollständig in Urlaubsabgeltung nach § 7 Abs. 4 BUrlG.',
  },
];

const QUELLEN_URLAUB = [
  { text: '§ 3 BUrlG — Dauer des Urlaubs', url: 'https://www.gesetze-im-internet.de/burlg/__3.html', art: 'gesetz' as const },
  { text: '§ 4 BUrlG — Wartezeit (6 Monate)', url: 'https://www.gesetze-im-internet.de/burlg/__4.html', art: 'gesetz' as const },
  { text: '§ 5 BUrlG — Teilurlaub bei Ausscheiden', url: 'https://www.gesetze-im-internet.de/burlg/__5.html', art: 'gesetz' as const },
  { text: '§ 7 BUrlG — Zeitpunkt, Übertragbarkeit und Abgeltung des Urlaubs', url: 'https://www.gesetze-im-internet.de/burlg/__7.html', art: 'gesetz' as const },
  { text: 'EuGH C-684/16 „Max-Planck" vom 06.11.2018 — Verfall nur bei Hinweispflicht', url: 'https://curia.europa.eu/juris/liste.jsf?num=C-684/16', art: 'urteil' as const },
  { text: 'BAG 9 AZR 541/15 vom 19.02.2019 — Umsetzung EuGH-Rechtsprechung', url: 'https://www.bundesarbeitsgericht.de/entscheidung/9-azr-541-15/', art: 'urteil' as const },
];

const RECHNER_LINK = '/resturlaub-bei-kuendigung-rechner/';
const ABGELTUNG_LINK = '/urlaubsabgeltung-rechner/';

export default function UrlaubsanspruchBeiKuendigungPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={PAGE_URL}
        pageTitle="Urlaubsanspruch bei Kündigung — Rechner + Ratgeber § 5 BUrlG"
        pageDescription="Urlaubsanspruch bei Kündigung verstehen und berechnen: Halbjahres-Regel nach § 5 BUrlG, Wartezeit, Verfall und Abgeltung. Fachanwalt für Arbeitsrecht."
        pageType="Article"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['#direktantwort', '.faq-section']}
        dateModified={PAGE_DATES.urlaubsanspruchBeiKuendigung}
        datePublished="2026-07-14"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber/` },
          { name: 'Arbeitsrecht', url: `${SEO_CONFIG.baseUrl}/ratgeber/arbeitsrecht/` },
          { name: 'Urlaubsanspruch bei Kündigung', url: PAGE_URL },
        ]}
        isBasedOn={[
          { name: '§ 3 Bundesurlaubsgesetz (BUrlG)', url: 'https://www.gesetze-im-internet.de/burlg/__3.html' },
          { name: '§ 4 Bundesurlaubsgesetz (BUrlG)', url: 'https://www.gesetze-im-internet.de/burlg/__4.html' },
          { name: '§ 5 Bundesurlaubsgesetz (BUrlG)', url: 'https://www.gesetze-im-internet.de/burlg/__5.html' },
          { name: '§ 7 Bundesurlaubsgesetz (BUrlG)', url: 'https://www.gesetze-im-internet.de/burlg/__7.html' },
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
              headline: 'Urlaubsanspruch bei Kündigung — Rechner + Ratgeber § 5 BUrlG',
              description:
                'Vollständiger Fachanwalts-Ratgeber zum Urlaubsanspruch bei Kündigung: Halbjahres-Regel nach § 5 BUrlG, Wartezeit, Verfall und Abgeltung. Mit kostenlosem Resturlaubs-Rechner.',
              dateModified: PAGE_DATES.urlaubsanspruchBeiKuendigung,
              url: PAGE_URL,
              articleSection: 'Urlaubsrecht',
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
            <span>Urlaubsanspruch bei Kündigung</span>
          </nav>
          <StandAnzeige modifiedAt={PAGE_DATES.urlaubsanspruchBeiKuendigung} />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Urlaubsrecht · § 5 BUrlG
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[820px]">
            Urlaubsanspruch bei Kündigung &mdash; Rechner &amp; Ratgeber nach &sect;&nbsp;5 BUrlG
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
              Bei einer Kündigung richtet sich der <strong>Urlaubsanspruch</strong> nach{' '}
              <strong>&sect;&nbsp;5 BUrlG</strong>: Endet das Arbeitsverhältnis <strong>im 1. Halbjahr</strong>{' '}
              (Januar bis Juni), erhalten Sie <strong>1/12 des Jahresurlaubs pro vollem Beschäftigungsmonat</strong>{' '}
              (&sect;&nbsp;5 Abs.&nbsp;1 lit.&nbsp;c BUrlG). Endet es <strong>nach dem 30. Juni</strong> und ist die
              6-monatige Wartezeit nach &sect;&nbsp;4 BUrlG erfüllt, steht Ihnen der{' '}
              <strong>volle gesetzliche Mindesturlaub</strong> zu &mdash; 20 Tage bei 5-Tage-Woche, 24 Tage bei
              6-Tage-Woche. Der <strong>übervertragliche Anteil</strong> kann nur bei wirksamer Pro-rata-Klausel
              anteilig gekürzt werden. Nicht mehr genommener Resturlaub wird nach{' '}
              <strong>&sect;&nbsp;7 Abs.&nbsp;4 BUrlG</strong> als <strong>Urlaubsabgeltung</strong> in Geld ausgezahlt.
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
                'Wartezeit unter 6 Monaten → 1/12 Teilurlaub pro Monat (§ 5 Abs. 1 lit. a BUrlG).',
                'Ausscheiden im 1. Halbjahr → 1/12 pro Monat (§ 5 Abs. 1 lit. c BUrlG).',
                'Ausscheiden nach dem 30. Juni + Wartezeit erfüllt → voller gesetzlicher Mindesturlaub.',
                'Übervertragliche Tage nur bei wirksamer Pro-rata-Klausel anteilig kürzbar.',
                'Nicht genommener Resturlaub → Urlaubsabgeltung in Geld nach § 7 Abs. 4 BUrlG.',
                'Kein automatischer Verfall ohne Hinweis (EuGH C-684/16, BAG 9 AZR 541/15).',
                'Ausschlussfristen im Arbeitsvertrag beachten — häufig nur 3 Monate.',
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
              Konkrete Zahl statt Faustregel: Ihren Resturlaub berechnen
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Geben Sie Jahresurlaub, Wochenarbeitstage, Eintritts- und Ausscheidedatum ein &mdash; der
              Rechner unterscheidet automatisch die drei Szenarien nach &sect;&nbsp;5 BUrlG und zeigt den
              gesetzlichen und übervertraglichen Anteil getrennt.
            </p>
            <Link
              href={RECHNER_LINK}
              className="inline-block py-3.5 px-7 bg-gold-dark text-white rounded-sm font-semibold text-[0.98rem] no-underline transition-all hover:bg-[#635428]"
            >
              Resturlaub bei Kündigung berechnen &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <DefinitionBox
              term="Urlaubsanspruch bei Kündigung"
              definition="Der Anspruch auf bezahlten Erholungsurlaub, der zum Zeitpunkt der Beendigung des Arbeitsverhältnisses noch nicht genommen wurde. Er richtet sich nach § 5 BUrlG (Teilurlaub) in Verbindung mit dem vertraglichen Jahresurlaub und wandelt sich bei Nicht-Nehmbarkeit in einen Abgeltungsanspruch nach § 7 Abs. 4 BUrlG."
            />
          </div>
        </div>
      </section>

      {/* Section: Formel & Beispiele */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechtsgrundlage &amp; Formel
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              So berechnet sich der Urlaubsanspruch nach &sect;&nbsp;5 BUrlG
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              Die Höhe des Resturlaubs hängt an zwei Fragen:{' '}
              <strong>Ist die 6-monatige Wartezeit nach &sect;&nbsp;4 BUrlG bereits erfüllt?</strong>
              {' '}Und <strong>in welchem Halbjahr endet das Arbeitsverhältnis?</strong>
              Aus den möglichen Antworten ergeben sich drei rechtliche Szenarien mit unterschiedlichem Anspruch.
            </p>

            <div className="space-y-4">
              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  Szenario 1: Wartezeit noch nicht erfüllt (unter 6 Monaten)
                </div>
                <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                  Anspruch auf Teilurlaub nach &sect;&nbsp;5 Abs.&nbsp;1 lit.&nbsp;a BUrlG:{' '}
                  <strong>1/12 des Jahresurlaubs pro vollem Beschäftigungsmonat.</strong> Beispiel: 30 Tage
                  vertraglicher Jahresurlaub, Ausscheiden nach 4 Monaten &rarr; 4/12&nbsp;&times;&nbsp;30 = 10 Tage.
                </p>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  Szenario 2: Ausscheiden im 1. Halbjahr (Januar bis Juni)
                </div>
                <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                  Anteiliger Anspruch nach &sect;&nbsp;5 Abs.&nbsp;1 lit.&nbsp;c BUrlG:{' '}
                  <strong>1/12 des Jahresurlaubs pro vollem Beschäftigungsmonat.</strong> Beispiel: Ausscheiden
                  am 31.&nbsp;März bei 24 Tagen Jahresurlaub &rarr; 3/12&nbsp;&times;&nbsp;24 = 6 Tage.
                </p>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  Szenario 3: Ausscheiden im 2. Halbjahr (Juli bis Dezember)
                </div>
                <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                  <strong>Voller gesetzlicher Mindesturlaub</strong> nach &sect;&nbsp;5 Abs.&nbsp;1 lit.&nbsp;c
                  BUrlG &mdash; 20 Tage (5-Tage-Woche) oder 24 Tage (6-Tage-Woche). Für den{' '}
                  <strong>übervertraglichen Anteil</strong> greift die Vertragsklausel: Nur bei wirksamer
                  Pro-rata-Klausel wird auch dieser Teil anteilig gekürzt.
                </p>
              </div>
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
              Elternzeit, Krankheit, Teilzeit &amp; Probezeit
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Kündigung während Elternzeit
                </h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  Nach &sect;&nbsp;17 Abs.&nbsp;1 BEEG kann der Arbeitgeber den Urlaubsanspruch pro vollem
                  Kalendermonat der Elternzeit um 1/12 kürzen &mdash; das gilt <strong>nicht automatisch</strong>,
                  sondern nur, wenn der Arbeitgeber die Kürzung ausdrücklich schriftlich erklärt. Ohne diese
                  Erklärung bleibt der Anspruch ungekürzt und ist bei Kündigung voll abzugelten.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Kündigung nach Langzeiterkrankung
                </h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  Urlaub aus dem Vorjahr verfällt bei Langzeitkranken nach EuGH-Rechtsprechung erst 15 Monate
                  nach Ende des Urlaubsjahres (Urteil vom 22.11.2011, C-214/10 &bdquo;KHS&ldquo;). Bei Kündigung nach
                  längerer Krankheit können sich damit Ansprüche aus mehreren Jahren angesammelt haben &mdash;
                  alle sind abzugelten, wenn der Arbeitgeber seine Hinweispflicht nicht erfüllt hat.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Teilzeit und verkürzte Arbeitswoche
                </h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  Bei Teilzeit skaliert der Urlaubsanspruch proportional zur Zahl der wöchentlichen Arbeitstage:
                  gesetzlicher Mindesturlaub &times; persönliche Arbeitstage&nbsp;&divide;&nbsp;5. Wer 3 Tage die
                  Woche arbeitet, hat also Anspruch auf 20&nbsp;&times;&nbsp;3/5 = 12 Tage &mdash; nicht auf 20.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Kündigung in der Probezeit
                </h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  In der Probezeit ist die 6-monatige Wartezeit nach &sect;&nbsp;4 BUrlG regelmäßig noch nicht
                  erfüllt &mdash; es greift Szenario 1: Teilurlaub 1/12 pro vollem Beschäftigungsmonat. Angebrochene
                  Monate zählen nicht mit, wenn nicht mindestens die Hälfte des Monats gearbeitet wurde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA #2 — mid-article */}
      <section className="py-[30px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px] flex flex-col md:flex-row items-start md:items-center gap-4 p-5 bg-white border border-gold rounded-sm">
            <div className="flex-1">
              <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                Nicht rechnen wollen? Wir übernehmen das.
              </div>
              <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                Der Resturlaubs-Rechner liefert Ihnen die konkrete Zahl nach &sect;&nbsp;5 BUrlG in unter 30 Sekunden.
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

      {/* Section: Verfall & Übertragung */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Verfall &amp; Übertragung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Wann Ihr Urlaub verfällt &mdash; und wann nicht
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Der ursprüngliche Grundsatz aus &sect;&nbsp;7 Abs.&nbsp;3 BUrlG &mdash; Urlaub verfällt am
              31.&nbsp;Dezember, spätestens am 31.&nbsp;März des Folgejahres &mdash; gilt heute nur noch
              eingeschränkt. Der EuGH hat mit dem Urteil <strong>C-684/16 &bdquo;Max-Planck&ldquo;</strong>{' '}
              (06.11.2018) klargestellt: <strong>Urlaub verfällt nur, wenn der Arbeitgeber Sie zuvor
              rechtzeitig, klar und nachweisbar auf den drohenden Verfall hingewiesen hat.</strong>
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Das BAG hat diese Rechtsprechung mit <strong>9 AZR 541/15</strong> (19.02.2019) übernommen. In der
              Praxis bedeutet das: In vielen Betrieben werden diese Hinweise nicht (oder nicht ordnungsgemäß)
              erteilt &mdash; die Urlaubsansprüche aus vergangenen Jahren sammeln sich damit stillschweigend an.
              Bei Kündigung müssen sie in voller Höhe abgegolten werden.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed m-0">
              Prüfen Sie deshalb vor Zugang der Kündigung, ob Ihr Arbeitgeber Sie in den vergangenen Jahren
              schriftlich und individuell auf drohenden Urlaubsverfall hingewiesen hat. Fehlt dieser Hinweis
              auch nur in einem Jahr, ist der Urlaub aus diesem Jahr nicht verfallen.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Urlaubsabgeltung */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Urlaubsabgeltung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Wenn Sie den Resturlaub nicht mehr nehmen können
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Kann der Resturlaub wegen Beendigung des Arbeitsverhältnisses <strong>nicht mehr in Freizeit
              gewährt werden</strong> &mdash; etwa bei fristloser Kündigung, kurzer Restlaufzeit oder Freistellung
              &mdash; wandelt er sich automatisch in einen <strong>Anspruch auf Urlaubsabgeltung</strong> nach{' '}
              &sect;&nbsp;7 Abs.&nbsp;4 BUrlG. Dieser Anspruch entsteht mit dem letzten Arbeitstag; er ist ein
              reiner Geldanspruch, kein Urlaub mehr.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              <strong>Formel für die Berechnung:</strong> Bruttomonatsgehalt geteilt durch die
              durchschnittliche Zahl der Arbeitstage pro Monat (bei 5-Tage-Woche typischerweise ca. 21,7 Tage),
              multipliziert mit den offenen Resturlaubstagen. Variable Vergütungen (Provisionen, Boni) müssen
              berücksichtigt werden, wenn sie regelmäßig gezahlt wurden.
            </p>
            <div className="p-5 bg-white border border-border rounded-sm">
              <div className="font-serif text-[1rem] font-bold text-ink mb-2">
                Direkt in Euro rechnen
              </div>
              <p className="text-[0.9rem] text-ink-light leading-relaxed mb-3">
                Unser Urlaubsabgeltungs-Rechner nimmt Ihnen die Formel ab und rechnet Ihren Bruttoanspruch
                in Euro aus &mdash; inklusive Steuerhinweis und Ausschlussfrist-Warnung.
              </p>
              <Link
                href={ABGELTUNG_LINK}
                className="inline-block py-2.5 px-5 bg-gold-dark text-white rounded-sm font-semibold text-[0.9rem] no-underline transition-all hover:bg-[#635428]"
              >
                Urlaubsabgeltung berechnen &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Ausschlussfristen */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Fristen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              Ausschlussfristen &mdash; die stille Anspruchsvernichter
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Der Anspruch auf Urlaubsabgeltung verjährt regelmäßig nach 3 Jahren zum Jahresende
              (&sect;&nbsp;195 BGB). In der Praxis ist die <strong>Verjährung fast nie das eigentliche
              Problem</strong>. Fast jeder Arbeitsvertrag und die meisten Tarifverträge enthalten
              zweistufige <strong>Ausschlussfristen</strong>: erste Stufe schriftliche Geltendmachung
              innerhalb von 3 Monaten, zweite Stufe Klage innerhalb weiterer 3 Monate.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Nach dem BAG-Urteil vom 22.09.2022 (<strong>8 AZR 4/22</strong>) unterliegen auch
              Urlaubsabgeltungsansprüche solchen Ausschlussfristen, sofern die Klausel formell und materiell
              wirksam ist. Wer die Frist verpasst, verliert den kompletten Anspruch &mdash; auch wenn er
              rechnerisch entstanden war.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed m-0">
              <strong>Praktische Empfehlung:</strong> Fordern Sie Resturlaub oder Urlaubsabgeltung
              <strong> unmittelbar nach Zugang der Kündigung schriftlich</strong> ein &mdash; per Einwurf-Einschreiben
              oder E-Mail mit Lesebestätigung. Warten Sie nicht bis nach dem letzten Arbeitstag.
            </p>
          </div>
        </div>
      </section>

      {/* Aktuelle Rechtslage — monthly rotating */}
      <section className="py-[40px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <AktuelleRechtslage />
          </div>
        </div>
      </section>

      {/* CTA #3 — beide Rechner */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechner nutzen
            </div>
            <h2 className="font-serif text-[clamp(1.35rem,3vw,1.8rem)] font-bold leading-[1.25] mb-4">
              Zwei Rechner &mdash; ein Urlaubsanspruch von Anfang bis Ende
            </h2>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <Link
                href={RECHNER_LINK}
                className="block p-5 bg-cream border-2 border-gold rounded-sm no-underline hover:bg-gold-bg transition-all"
              >
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Schritt 1
                </div>
                <div className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Resturlaub bei Kündigung Rechner
                </div>
                <div className="text-[0.88rem] text-ink-light leading-relaxed mb-3">
                  Wie viele Urlaubstage stehen Ihnen bei Kündigung noch zu? Nach &sect;&nbsp;5 BUrlG.
                </div>
                <div className="text-[0.9rem] font-semibold text-gold-dark">
                  Tage berechnen &rarr;
                </div>
              </Link>
              <Link
                href={ABGELTUNG_LINK}
                className="block p-5 bg-cream border-2 border-gold rounded-sm no-underline hover:bg-gold-bg transition-all"
              >
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Schritt 2
                </div>
                <div className="font-serif text-[1.1rem] font-bold text-ink mb-2">
                  Urlaubsabgeltung berechnen
                </div>
                <div className="text-[0.88rem] text-ink-light leading-relaxed mb-3">
                  Ergebnis aus Schritt 1 in Euro umrechnen. Nach &sect;&nbsp;7 Abs.&nbsp;4 BUrlG.
                </div>
                <div className="text-[0.9rem] font-semibold text-gold-dark">
                  Euro berechnen &rarr;
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
              Fragen zum Urlaubsanspruch bei Kündigung
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
              <ShareButtons url={PAGE_URL} title="Urlaubsanspruch bei Kündigung — Rechner + Ratgeber" />
            </div>
          </div>
        </div>
      </section>

      {/* Quellen */}
      <section className="py-[40px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <Quellen quellen={QUELLEN_URLAUB} />
          </div>
        </div>
      </section>

      <RelatedTopics current="kuendigung" />

      <section className="py-[40px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/urlaubsanspruch-bei-kuendigung" />
        </div>
      </section>

      {/* Kontakt-CTA */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Individuelle Prüfung
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Streit über Urlaub oder Abgeltung?
          </h2>
          <p className="text-[1rem] text-ink-light max-w-[620px] mx-auto leading-relaxed mb-6">
            Rechner liefern eine Orientierung nach &sect;&nbsp;5 BUrlG. Für die konkrete Auseinandersetzung
            mit dem Arbeitgeber &mdash; komplexe Klausel-Lage, versäumte Hinweispflichten oder gleichzeitige
            Abfindungsverhandlung &mdash; prüfen wir Ihren Fall kostenlos.
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
