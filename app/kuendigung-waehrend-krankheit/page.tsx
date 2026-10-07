import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import TableOfContents from '@/components/TableOfContents';
import StandAnzeige from '@/components/StandAnzeige';
import AuthorBox from '@/components/AuthorBox';
import AuthorByline from '@/components/AuthorByline';
import ShareButtons from '@/components/ShareButtons';
import SeoGeoBase from '@/components/SeoGeoBase';
import TldrBox from '@/components/TldrBox';
import NormLink from '@/components/NormLink';
import VideoEmbed from '@/components/VideoEmbed';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';
import { SEO_CONFIG } from '@/lib/seo-config';
import { PAGE_DATES } from '@/lib/page-dates';
import { generateArticleSchema } from '@/lib/article-schema';
import { videoObjectSchema } from '@/lib/video-schema';

const VIDEO = {
  youtubeId: '3DnWViKtbyQ',
  title: 'Kündigung während Krankheit: Geht das? Der große Irrtum',
  teaser: 'Krankgeschrieben heißt unkündbar? Falsch.',
  uploadDate: '2026-10-05',
  duration: 'PT1M26S',
};

export const revalidate = 86400;

const PAGE_URL = `${SEO_CONFIG.baseUrl}/kuendigung-waehrend-krankheit/`;
const PAGE_TITLE = 'Kündigung während Krankheit: Mythos und Wahrheit';
const PAGE_DESCRIPTION =
  'Darf der Arbeitgeber während der Krankschreibung kündigen? Ja. Was wirklich schützt, welche Fristen gelten und wann die Kündigung angreifbar ist.';
const PUBLISHED = '2026-10-04';

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
    images: [
      {
        url: `${SEO_CONFIG.baseUrl}/kuendigung-waehrend-krankheit/grafiken/kuendigung-waehrend-krankheit-mythos-fakten.svg`,
        width: 1200,
        height: 675,
        alt: 'Vergleich Mythos und Rechtslage zur Kündigung während einer Krankschreibung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const faqs = [
  {
    q: 'Ist eine Kündigung während der Krankschreibung unwirksam?',
    a: 'Nein, nicht allein deshalb. Die Krankschreibung schützt nicht vor einer Kündigung. Unwirksam ist sie nur, wenn ein Kündigungsgrund fehlt, die Form nicht stimmt oder ein Sonderkündigungsschutz verletzt wurde.',
  },
  {
    q: 'Kann mir die Kündigung zugehen, während ich im Krankenhaus bin?',
    a: 'Ja. Eine schriftliche Kündigung geht zu, sobald sie in Ihren Briefkasten gelangt und üblicherweise mit einer Leerung zu rechnen ist. Ein Krankenhausaufenthalt verhindert den Zugang nicht. Lassen Sie den Briefkasten in dieser Zeit am besten von einer Vertrauensperson leeren.',
  },
  {
    q: 'Muss ich meinem Arbeitgeber sagen, was ich habe?',
    a: 'Nein. Der Arbeitgeber erfährt aus der Krankmeldung nur, dass und wie lange Sie arbeitsunfähig sind. Eine Diagnose müssen Sie grundsätzlich nicht mitteilen. Im Prozess kann eine Offenlegung jedoch helfen, die negative Prognose zu widerlegen.',
  },
  {
    q: 'Wie viele Krankheitstage sind zu viel?',
    a: 'Eine feste Grenze gibt es nicht. Fehlzeiten von mehr als sechs Wochen pro Jahr über mehrere Jahre werden in der Praxis oft als Indiz gewertet. Ob eine Kündigung trägt, entscheidet aber erst die Prüfung von Prognose, betrieblicher Belastung und Interessenabwägung.',
  },
  {
    q: 'Gilt der Schutz auch in der Probezeit?',
    a: 'In den ersten sechs Monaten gilt das Kündigungsschutzgesetz nicht. Der Arbeitgeber braucht dann keinen Kündigungsgrund und kann auch während einer Krankheit kündigen. Die Kündigung darf aber nicht sittenwidrig oder diskriminierend sein.',
  },
  {
    q: 'Bekomme ich eine Abfindung, wenn mir wegen Krankheit gekündigt wird?',
    a: 'Einen gesetzlichen Anspruch gibt es in der Regel nicht. Weil krankheitsbedingte Kündigungen für Arbeitgeber schwer zu begründen sind, enden viele Verfahren aber mit einem Vergleich und einer Abfindung. Voraussetzung ist fast immer, dass Sie fristgerecht klagen.',
  },
  {
    q: 'Was passiert mit meinem Urlaub, wenn ich lange krank bin?',
    a: 'Urlaub, den Sie wegen Krankheit nicht nehmen konnten, verfällt nicht sofort. Endet das Arbeitsverhältnis, muss nicht genommener Urlaub abgegolten werden (§ 7 Abs. 4 BUrlG). Bei sehr langen Erkrankungen gelten besondere Verfallsregeln.',
  },
];

const NORMS = {
  kschg1: 'https://dejure.org/gesetze/KSchG/1.html',
  kschg4: 'https://dejure.org/gesetze/KSchG/4.html',
  kschg5: 'https://dejure.org/gesetze/KSchG/5.html',
  kschg7: 'https://dejure.org/gesetze/KSchG/7.html',
  kschg15: 'https://dejure.org/gesetze/KSchG/15.html',
  kschg23: 'https://dejure.org/gesetze/KSchG/23.html',
  bgb623: 'https://dejure.org/gesetze/BGB/623.html',
  efzg3: 'https://dejure.org/gesetze/EFZG/3.html',
  efzg8: 'https://dejure.org/gesetze/EFZG/8.html',
  betrvg102: 'https://dejure.org/gesetze/BetrVG/102.html',
  burlg7: 'https://dejure.org/gesetze/BUrlG/7.html',
  sgb9_167: 'https://dejure.org/gesetze/SGB_IX/167.html',
  sgb9_168: 'https://dejure.org/gesetze/SGB_IX/168.html',
  muschg17: 'https://dejure.org/gesetze/MuSchG/17.html',
  beeg18: 'https://dejure.org/gesetze/BEEG/18.html',
  sgb3_38: 'https://dejure.org/gesetze/SGB_III/38.html',
};

const BAG_755_13 = 'https://www.bundesarbeitsgericht.de/entscheidung/2-azr-755-13/';
const BAG_137_23 = 'https://www.bundesarbeitsgericht.de/entscheidung/5-azr-137-23/';

const TOC_ENTRIES = [
  { id: "woher-kommt-der-mythos-wer-krank-ist-kann-nicht-gekundigt-we", label: "Woher kommt der Mythos „Wer krank ist, kann nicht gekündigt werden“?" },
  { id: "darf-der-arbeitgeber-wahrend-einer-krankschreibung-kundigen", label: "Darf der Arbeitgeber während einer Krankschreibung kündigen?" },
  { id: "wann-gilt-das-kundigungsschutzgesetz-fur-mich", label: "Wann gilt das Kündigungsschutzgesetz für mich?" },
  { id: "was-ist-eine-krankheitsbedingte-kundigung", label: "Was ist eine krankheitsbedingte Kündigung?" },
  { id: "welche-voraussetzungen-muss-der-arbeitgeber-erfullen", label: "Welche Voraussetzungen muss der Arbeitgeber erfüllen?" },
  { id: "welche-rolle-spielt-das-betriebliche-eingliederungsmanagemen", label: "Welche Rolle spielt das betriebliche Eingliederungsmanagement (BEM)?" },
  { id: "bekomme-ich-nach-der-kundigung-weiter-lohn-wenn-ich-krank-bi", label: "Bekomme ich nach der Kündigung weiter Lohn, wenn ich krank bin?" },
  { id: "was-gilt-wenn-ich-mich-nach-der-kundigung-krankschreiben-las", label: "Was gilt, wenn ich mich nach der Kündigung krankschreiben lasse?" },
  { id: "was-muss-ich-tun-wenn-ich-wahrend-der-krankheit-gekundigt-we", label: "Was muss ich tun, wenn ich während der Krankheit gekündigt werde?" },
  { id: "wer-ist-bei-krankheit-besonders-geschutzt", label: "Wer ist bei Krankheit besonders geschützt?" },
  { id: "typische-fehler-aus-der-anwaltlichen-praxis", label: "Typische Fehler aus der anwaltlichen Praxis" },
  { id: "fazit-krankheit-schutzt-nicht-fristen-schon", label: "Fazit: Krankheit schützt nicht, Fristen schon" },
];

export default function KuendigungWaehrendKrankheitPage() {
  return (
    <>
      <SeoGeoBase
        pageUrl={PAGE_URL}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
        pageType="Article"
        datePublished={PUBLISHED}
        dateModified={PAGE_DATES.kuendigungWaehrendKrankheit}
        headline={PAGE_TITLE}
        articleSection="Kündigung"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber/` },
          { name: 'Kündigung während Krankheit', url: PAGE_URL },
        ]}
        isBasedOn={[
          { name: '§ 1 KSchG — Soziale Rechtfertigung', url: NORMS.kschg1 },
          { name: '§ 4 KSchG — Klagefrist', url: NORMS.kschg4 },
          { name: '§ 8 EFZG — Entgeltfortzahlung bei Kündigung aus Anlass der Krankheit', url: NORMS.efzg8 },
          { name: '§ 167 Abs. 2 SGB IX — Betriebliches Eingliederungsmanagement', url: NORMS.sgb9_167 },
          { name: 'BAG, Urteil vom 20.11.2014 – 2 AZR 755/13', url: BAG_755_13 },
          { name: 'BAG, Urteil vom 13.12.2023 – 5 AZR 137/23', url: BAG_137_23 },
        ]}
      />

      {/* FAQPage JSON-LD */}
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

      {/* Article JSON-LD (Author via @id -> Person-Schema in SeoGeoBase mit sameAs) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: PAGE_TITLE,
              description: PAGE_DESCRIPTION,
              datePublished: PUBLISHED,
              dateModified: PAGE_DATES.kuendigungWaehrendKrankheit,
              url: PAGE_URL,
              articleSection: 'Kündigung',
            }),
          ),
        }}
      />

      {/* VideoObject JSON-LD — vertical YouTube clip embedded under the TL;DR */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...videoObjectSchema({
              youtubeId: VIDEO.youtubeId,
              name: VIDEO.title,
              description: VIDEO.teaser,
              uploadDate: VIDEO.uploadDate,
              duration: VIDEO.duration,
              pageUrl: PAGE_URL,
              inLanguage: 'de',
            }),
          }),
        }}
      />

      <main>
        <nav aria-label="Breadcrumb" className="max-w-content mx-auto px-8 pt-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.78rem] text-ink-muted list-none m-0 p-0">
            <li><Link href="/" className="hover:text-ink no-underline">Start</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/ratgeber/" className="hover:text-ink no-underline">Ratgeber</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-ink" aria-current="page">Kündigung während Krankheit</li>
          </ol>
        </nav>

        <section className="py-10 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h1 className="font-serif text-[2rem] md:text-[2.6rem] font-bold text-ink leading-tight max-w-[900px]">
              Kündigung während Krankheit: Darf mein Arbeitgeber mir kündigen, wenn ich krankgeschrieben bin?
            </h1>
            <AuthorByline publishedIso={PUBLISHED} updatedIso={PAGE_DATES.kuendigungWaehrendKrankheit} />
            <StandAnzeige />
          </div>
        </section>

        <section className="py-6 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-[1fr_auto] gap-10 items-start max-md:grid-cols-1 max-md:gap-6">
              <div id="direktantwort">
                <TldrBox
                  items={[
                    <>Eine Krankschreibung schützt <strong>nicht</strong> vor einer Kündigung — der Arbeitgeber darf auch während der Arbeitsunfähigkeit kündigen.</>,
                    <>Wirksam ist sie nur, wenn ein <strong>Kündigungsgrund</strong> vorliegt und die <strong>Form stimmt</strong> (Schriftform, Frist, ggf. Betriebsrat).</>,
                    <>Wer sich wehren will, muss innerhalb von <strong>drei Wochen</strong> nach Zugang Kündigungsschutzklage erheben (<NormLink href={NORMS.kschg4}>§ 4 Satz 1 KSchG</NormLink>).</>,
                    <>Bei Kündigung aus Anlass der Krankheit läuft die Entgeltfortzahlung bis zu <strong>sechs Wochen</strong> weiter (<NormLink href={NORMS.efzg8}>§ 8 EFZG</NormLink>).</>,
                  ]}
                />
              </div>
              <aside className="max-md:mx-auto">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2 text-center">
                  Lieber ansehen?
                </div>
                <VideoEmbed
                  youtubeId={VIDEO.youtubeId}
                  title={VIDEO.title}
                  teaser={VIDEO.teaser}
                  aspect="portrait"
                />
              </aside>
            </div>
          </div>
        </section>

        <article className="py-10 px-8 bg-white">
          <div className="max-w-[740px] mx-auto">

            <TableOfContents entries={TOC_ENTRIES} />

            <h2 id="woher-kommt-der-mythos-wer-krank-ist-kann-nicht-gekundigt-we" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Woher kommt der Mythos „Wer krank ist, kann nicht gekündigt werden“?
            </h2>
            <p className="text-ink leading-relaxed">
              Der Irrglaube entsteht meist aus einer Verwechslung von Krankheit und Sonderkündigungsschutz. Viele
              Beschäftigte kennen Fälle, in denen eine Kündigung tatsächlich ausgeschlossen oder nur mit behördlicher
              Zustimmung möglich ist, etwa in der Schwangerschaft oder bei einer Schwerbehinderung. Diese Schutzregeln
              knüpfen aber an einen besonderen Status an, nicht an die Krankschreibung selbst.
            </p>
            <p className="text-ink leading-relaxed">
              Hinzu kommt ein zweites Missverständnis: Viele halten die Kündigung „während“ einer Krankheit für dasselbe
              wie eine Kündigung „wegen“ einer Krankheit. Das sind zwei verschiedene Dinge. Der Zeitpunkt der Kündigung
              ist rechtlich fast bedeutungslos. Entscheidend ist der Grund.
            </p>

            <figure className="my-8">
              <Image
                src="/kuendigung-waehrend-krankheit/grafiken/kuendigung-waehrend-krankheit-mythos-fakten.svg"
                alt="Vergleich Mythos und Rechtslage zur Kündigung während einer Krankschreibung"
                width={1200}
                height={675}
                loading="lazy"
                className="w-full h-auto rounded border border-border-light"
              />
              <figcaption className="text-[0.85rem] text-ink-muted mt-2 text-center italic">
                Drei verbreitete Annahmen zur Kündigung bei Krankheit und was tatsächlich gilt
              </figcaption>
            </figure>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse text-[0.95rem]">
                <thead>
                  <tr className="border-b-2 border-gold-dark">
                    <th className="text-left py-2 pr-4 font-semibold text-ink">Verbreitete Annahme</th>
                    <th className="text-left py-2 pl-4 font-semibold text-ink">Was tatsächlich gilt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink-light">Während der Krankschreibung ist eine Kündigung verboten.</td>
                    <td className="py-3 pl-4 text-ink">Eine Kündigung ist auch während der Arbeitsunfähigkeit zulässig.</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink-light">Wenn ich krank bin, kann mir die Kündigung nicht zugehen.</td>
                    <td className="py-3 pl-4 text-ink">Die Kündigung geht zu, sobald sie in Ihren Briefkasten gelangt, auch wenn Sie im Krankenhaus liegen.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-ink-light">Mit der Kündigung endet die Lohnzahlung sofort.</td>
                    <td className="py-3 pl-4 text-ink">Bei einer Kündigung aus Anlass der Krankheit läuft die Entgeltfortzahlung bis zu sechs Wochen weiter (<NormLink href={NORMS.efzg8}>§ 8 EFZG</NormLink>).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="darf-der-arbeitgeber-wahrend-einer-krankschreibung-kundigen" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Darf der Arbeitgeber während einer Krankschreibung kündigen?
            </h2>
            <p className="text-ink leading-relaxed">
              Ja, das Gesetz kennt kein Kündigungsverbot für arbeitsunfähige Beschäftigte. Weder das Kündigungsschutzgesetz
              noch das Entgeltfortzahlungsgesetz verbieten eine Kündigung, nur weil die Arbeitnehmerin oder der
              Arbeitnehmer gerade krankgeschrieben ist. Der Arbeitgeber kann also an jedem Tag der Arbeitsunfähigkeit
              eine Kündigung aussprechen.
            </p>
            <p className="text-ink leading-relaxed">
              Damit ist allerdings noch nichts darüber gesagt, ob die Kündigung auch Bestand hat. Gilt für Ihr
              Arbeitsverhältnis das Kündigungsschutzgesetz, braucht der Arbeitgeber einen sozial rechtfertigenden Grund
              (<NormLink href={NORMS.kschg1}>§ 1 Abs. 2 KSchG</NormLink>). Das kann ein Grund in Ihrem Verhalten, ein
              betrieblicher Grund oder ein Grund in Ihrer Person sein. Die Krankheit selbst kann ein solcher
              personenbedingter Grund sein, aber nur unter strengen Voraussetzungen.
            </p>

            <h2 id="wann-gilt-das-kundigungsschutzgesetz-fur-mich" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Wann gilt das Kündigungsschutzgesetz für mich?
            </h2>
            <p className="text-ink leading-relaxed">
              Das Kündigungsschutzgesetz schützt Sie, wenn zwei Voraussetzungen erfüllt sind. Erstens muss Ihr
              Arbeitsverhältnis im selben Betrieb oder Unternehmen länger als sechs Monate ohne Unterbrechung bestanden
              haben (<NormLink href={NORMS.kschg1}>§ 1 Abs. 1 KSchG</NormLink>). Zweitens muss der Betrieb in der Regel
              mehr als zehn Arbeitnehmer beschäftigen (<NormLink href={NORMS.kschg23}>§ 23 Abs. 1 KSchG</NormLink>).
              Teilzeitkräfte werden dabei anteilig gezählt.
            </p>
            <p className="text-ink leading-relaxed">
              Fehlt eine dieser Voraussetzungen, braucht der Arbeitgeber für die ordentliche Kündigung keinen besonderen
              Grund. Das betrifft vor allem die ersten sechs Monate und kleine Betriebe. Auch dann ist eine Kündigung
              aber nicht völlig frei: Sie darf nicht sittenwidrig sein, nicht gegen Treu und Glauben verstoßen und nicht
              diskriminieren. Außerdem müssen Schriftform (<NormLink href={NORMS.bgb623}>§ 623 BGB</NormLink>), die
              richtige Kündigungsfrist und gegebenenfalls die Anhörung des Betriebsrats
              (<NormLink href={NORMS.betrvg102}>§ 102 BetrVG</NormLink>) eingehalten sein.
            </p>

            <h2 id="was-ist-eine-krankheitsbedingte-kundigung" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Was ist eine krankheitsbedingte Kündigung?
            </h2>
            <p className="text-ink leading-relaxed">
              Eine krankheitsbedingte Kündigung ist eine personenbedingte Kündigung, bei der der Arbeitgeber sich auf
              die künftigen Folgen einer Erkrankung beruft. Sie ist keine Strafe für vergangene Fehlzeiten. Es geht
              allein um die Frage, ob dem Arbeitgeber die Fortsetzung des Arbeitsverhältnisses in Zukunft noch zuzumuten
              ist.
            </p>
            <p className="text-ink leading-relaxed">In der Praxis gibt es vier typische Fallgruppen:</p>
            <ol className="list-decimal pl-6 space-y-2 text-ink">
              <li><strong>Häufige Kurzerkrankungen:</strong> Der Arbeitnehmer fehlt immer wieder für einige Tage oder Wochen.</li>
              <li><strong>Lang anhaltende Erkrankung:</strong> Der Arbeitnehmer ist seit Monaten arbeitsunfähig, und ein Ende ist nicht absehbar.</li>
              <li><strong>Dauernde Leistungsunfähigkeit:</strong> Der Arbeitnehmer wird seine bisherige Tätigkeit voraussichtlich nie wieder ausüben können.</li>
              <li><strong>Krankheitsbedingte Leistungsminderung:</strong> Der Arbeitnehmer arbeitet, kann aber nur noch deutlich eingeschränkt leisten.</li>
            </ol>
            <p className="text-ink leading-relaxed mt-4">
              Bei einer lang anhaltenden Erkrankung steht die Ungewissheit, ob der Arbeitnehmer wieder arbeitsfähig wird,
              einer dauernden Leistungsunfähigkeit gleich, wenn zum Zeitpunkt der Kündigung in den nächsten 24 Monaten
              nicht mit der Wiederherstellung der Arbeitsfähigkeit gerechnet werden kann
              (BAG, Urteil vom 12.04.2002 – 2 AZR 148/01).
            </p>

            <h2 id="welche-voraussetzungen-muss-der-arbeitgeber-erfullen" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Welche Voraussetzungen muss der Arbeitgeber erfüllen?
            </h2>
            <p className="text-ink leading-relaxed">
              Eine krankheitsbedingte Kündigung ist nur wirksam, wenn sie eine dreistufige Prüfung besteht. Für die
              Kündigung wegen häufiger Kurzerkrankungen verlangt das Bundesarbeitsgericht zunächst eine negative
              Gesundheitsprognose, dann eine erhebliche Beeinträchtigung betrieblicher Interessen und schließlich eine
              Interessenabwägung, die zulasten des Arbeitnehmers ausgeht
              (<a href={BAG_755_13} target="_blank" rel="noopener noreferrer" className="text-gold-dark no-underline hover:underline">BAG, Urteil vom 20.11.2014 – 2 AZR 755/13</a>).
              Dieselbe Prüfung wendet die Rechtsprechung auch auf die anderen Fallgruppen an.
            </p>

            <figure className="my-8">
              <Image
                src="/kuendigung-waehrend-krankheit/grafiken/krankheitsbedingte-kuendigung-drei-stufen.svg"
                alt="Drei-Stufen-Prüfung der krankheitsbedingten Kündigung"
                width={1200}
                height={675}
                loading="lazy"
                className="w-full h-auto rounded border border-border-light"
              />
              <figcaption className="text-[0.85rem] text-ink-muted mt-2 text-center italic">
                Erst wenn alle drei Stufen erfüllt sind, ist eine krankheitsbedingte Kündigung sozial gerechtfertigt
              </figcaption>
            </figure>

            <p className="text-ink leading-relaxed">
              <strong>Stufe 1 – negative Gesundheitsprognose:</strong> Zum Zeitpunkt der Kündigung müssen objektive
              Tatsachen dafür sprechen, dass Sie auch künftig im bisherigen Umfang ausfallen werden. Vergangene
              Fehlzeiten können ein Indiz sein. Ausgeheilte Krankheiten oder einmalige Ereignisse wie ein Unfall zählen
              dagegen nicht.
            </p>
            <p className="text-ink leading-relaxed">
              <strong>Stufe 2 – erhebliche Beeinträchtigung betrieblicher Interessen:</strong> Die erwarteten Ausfälle
              müssen den Betrieb spürbar belasten, etwa durch Störungen im Ablauf oder durch hohe Kosten. Eine
              wirtschaftliche Belastung kann vorliegen, wenn die zu erwartenden Entgeltfortzahlungskosten für mehr als
              sechs Wochen im Jahr anfallen.
            </p>
            <p className="text-ink leading-relaxed">
              <strong>Stufe 3 – Interessenabwägung:</strong> Zum Schluss wird abgewogen, ob der Arbeitgeber die Belastung
              trotzdem hinnehmen muss. Dabei zählen unter anderem die Dauer der Betriebszugehörigkeit, das Alter,
              Unterhaltspflichten und die Frage, ob die Krankheit auf betriebliche Ursachen zurückgeht.
            </p>

            <h3 className="font-serif text-[1.25rem] font-bold text-ink mt-8 mb-3">
              Rechenbeispiel: Wann sprechen Fehlzeiten für eine negative Prognose?
            </h3>
            <p className="text-ink leading-relaxed">
              Frau K. arbeitet fünf Tage pro Woche. Sechs Wochen entsprechen bei ihr also 30 Arbeitstagen. In den letzten
              drei Jahren war sie an 38, 41 und 35 Arbeitstagen krankgeschrieben, jeweils wegen verschiedener Infekte
              und Rückenbeschwerden. In jedem Jahr liegen die Fehlzeiten damit über der Sechs-Wochen-Marke. Das allein
              macht eine Kündigung nicht wirksam. Es ist aber ein Indiz, auf das sich ein Arbeitgeber stützen wird.
              Frau K. kann die Prognose entkräften, etwa wenn ihr Arzt bestätigt, dass die Rückenbeschwerden nach einer
              Operation ausgeheilt sind.
            </p>

            <h2 id="welche-rolle-spielt-das-betriebliche-eingliederungsmanagemen" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Welche Rolle spielt das betriebliche Eingliederungsmanagement (BEM)?
            </h2>
            <p className="text-ink leading-relaxed">
              Das BEM ist ein Verfahren, mit dem der Arbeitgeber gemeinsam mit Ihnen klären muss, wie Ihre
              Arbeitsunfähigkeit überwunden und neuen Ausfällen vorgebeugt werden kann. Pflicht ist es, wenn Sie
              innerhalb von zwölf Monaten länger als sechs Wochen ununterbrochen oder wiederholt arbeitsunfähig waren
              (<NormLink href={NORMS.sgb9_167}>§ 167 Abs. 2 SGB IX</NormLink>). Die Teilnahme ist für Sie freiwillig.
            </p>
            <p className="text-ink leading-relaxed">
              Ein fehlendes BEM macht eine Kündigung nicht automatisch unwirksam. Der Arbeitgeber hat dann vor Gericht
              aber deutlich mehr zu beweisen: Er muss darlegen, dass auch ein BEM die künftigen Fehlzeiten nicht in
              relevantem Umfang verhindert hätte (BAG, Urteil vom 20.11.2014 – 2 AZR 755/13). Das gelingt in der Praxis
              selten. Ein ordnungsgemäß durchgeführtes BEM verbraucht sich außerdem nicht dauerhaft: Wird der
              Arbeitnehmer nach Abschluss eines BEM innerhalb eines Jahres erneut länger als sechs Wochen durchgängig
              oder wiederholt arbeitsunfähig, muss der Arbeitgeber grundsätzlich ein weiteres BEM anbieten
              (BAG, Urteil vom 18.11.2021 – 2 AZR 138/21).
            </p>

            <h2 id="bekomme-ich-nach-der-kundigung-weiter-lohn-wenn-ich-krank-bi" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Bekomme ich nach der Kündigung weiter Lohn, wenn ich krank bin?
            </h2>
            <p className="text-ink leading-relaxed">
              Ja, die Entgeltfortzahlung endet nicht automatisch mit der Kündigung. Nach{' '}
              <NormLink href={NORMS.efzg3}>§ 3 EFZG</NormLink>{' '}
              zahlt der Arbeitgeber bei Arbeitsunfähigkeit bis zu sechs Wochen das volle Gehalt. Kündigt er aus Anlass
              der Arbeitsunfähigkeit, bleibt dieser Anspruch sogar über das Ende des Arbeitsverhältnisses hinaus bestehen
              (<NormLink href={NORMS.efzg8}>§ 8 Abs. 1 Satz 1 EFZG</NormLink>). Der Arbeitgeber soll sich der
              Lohnfortzahlung nicht durch eine Kündigung entziehen können.
            </p>
            <p className="text-ink leading-relaxed">
              Nach Ablauf der sechs Wochen zahlt in der Regel die Krankenkasse Krankengeld. Endet das Arbeitsverhältnis,
              sollten Sie sich außerdem rechtzeitig arbeitsuchend melden, spätestens drei Monate vor dem Ende oder
              innerhalb von drei Tagen nach Kenntnis, wenn die Frist kürzer ist
              (<NormLink href={NORMS.sgb3_38}>§ 38 Abs. 1 SGB III</NormLink>).
            </p>

            <h2 id="was-gilt-wenn-ich-mich-nach-der-kundigung-krankschreiben-las" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Was gilt, wenn ich mich nach der Kündigung krankschreiben lasse?
            </h2>
            <p className="text-ink leading-relaxed">
              Eine Krankschreibung nach Zugang der Kündigung ist zulässig, kann aber Zweifel auslösen. Hat ein
              Arbeitnehmer nach einer Arbeitgeberkündigung Folgebescheinigungen vorgelegt, die genau bis zum letzten Tag
              der Kündigungsfrist reichen, und tritt er am nächsten Tag eine neue Stelle an, kann der Beweiswert der
              Bescheinigungen erschüttert sein
              (<a href={BAG_137_23} target="_blank" rel="noopener noreferrer" className="text-gold-dark no-underline hover:underline">BAG, Urteil vom 13.12.2023 – 5 AZR 137/23</a>).
              Eine Bescheinigung, die schon vor Zugang der Kündigung ausgestellt war, ohne dass der Arbeitnehmer mit
              einer Kündigung rechnen musste, hat das Gericht dagegen nicht beanstandet.
            </p>
            <p className="text-ink leading-relaxed">
              Ist der Beweiswert erschüttert, müssen Sie konkret darlegen und beweisen, dass Sie tatsächlich
              arbeitsunfähig waren, zum Beispiel durch eine Schilderung Ihrer Beschwerden und die Aussage Ihres
              behandelnden Arztes. Gelingt das nicht, besteht für diesen Zeitraum kein Anspruch auf Entgeltfortzahlung.
              Wer wirklich krank ist, sollte deshalb regelmäßig zum Arzt gehen und die Behandlung dokumentieren.
            </p>

            <h2 id="was-muss-ich-tun-wenn-ich-wahrend-der-krankheit-gekundigt-we" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Was muss ich tun, wenn ich während der Krankheit gekündigt werde?
            </h2>
            <p className="text-ink leading-relaxed">
              Die wichtigste Regel lautet: Die Krankheit hält die Klagefrist nicht an. Die{' '}
              <Link href="/kuendigungsschutzklage/" className="text-gold-dark no-underline hover:underline">Kündigungsschutzklage</Link>{' '}
              muss innerhalb von drei Wochen nach Zugang der schriftlichen Kündigung beim Arbeitsgericht eingehen
              (<NormLink href={NORMS.kschg4}>§ 4 Satz 1 KSchG</NormLink>). Versäumen Sie diese Frist, gilt die Kündigung
              als von Anfang an wirksam (<NormLink href={NORMS.kschg7}>§ 7 KSchG</NormLink>), selbst wenn sie eigentlich
              angreifbar gewesen wäre.
            </p>
            <p className="text-ink leading-relaxed">
              <strong>Beispiel zur Frist:</strong> Die Kündigung liegt am Dienstag, 6. Oktober 2026, in Ihrem Briefkasten.
              Die Drei-Wochen-Frist endet am Dienstag, 27. Oktober 2026. Bis dahin muss die Klage beim Arbeitsgericht
              sein.
            </p>
            <p className="text-ink leading-relaxed">So gehen Sie vor:</p>
            <ol className="list-decimal pl-6 space-y-2 text-ink">
              <li><strong>Zugangsdatum notieren:</strong> Halten Sie fest, wann und wie die Kündigung bei Ihnen ankam, und bewahren Sie Umschlag und Schreiben auf.</li>
              <li><strong>Nichts unterschreiben:</strong> Unterzeichnen Sie keinen <Link href="/aufhebungsvertrag/" className="text-gold-dark no-underline hover:underline">Aufhebungsvertrag</Link> und keine Ausgleichsquittung, bevor Sie beraten wurden.</li>
              <li><strong>Krankschreibung lückenlos halten:</strong> Reichen Sie alle Bescheinigungen pünktlich ein. Die elektronische AU wird von der Krankenkasse abgerufen, die Krankmeldung beim Arbeitgeber bleibt trotzdem Ihre Pflicht.</li>
              <li><strong>Arbeitsuchend melden:</strong> Melden Sie sich bei der Agentur für Arbeit, um Nachteile beim Arbeitslosengeld zu vermeiden.</li>
              <li><strong>Anwaltlich prüfen lassen:</strong> Lassen Sie die Kündigung innerhalb der ersten Tage prüfen, damit genug Zeit für die Klage bleibt.</li>
            </ol>
            <p className="text-ink leading-relaxed mt-4">
              Konnten Sie die Frist wegen Ihrer Krankheit trotz aller zumutbaren Sorgfalt nicht einhalten, etwa wegen
              eines Krankenhausaufenthalts ohne Möglichkeit, sich zu kümmern, kann das Gericht die Klage nachträglich
              zulassen (<NormLink href={NORMS.kschg5}>§ 5 KSchG</NormLink>). Der Antrag muss innerhalb von zwei Wochen
              nach Wegfall des Hindernisses gestellt werden. Darauf sollten Sie sich nicht verlassen: Die Hürden sind
              hoch, und eine normale Krankschreibung reicht in der Regel nicht.
            </p>

            <h2 id="wer-ist-bei-krankheit-besonders-geschutzt" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Wer ist bei Krankheit besonders geschützt?
            </h2>
            <p className="text-ink leading-relaxed">
              Einen echten Sonderkündigungsschutz haben nur bestimmte Gruppen, unabhängig davon, ob sie krank sind.
              Für sie gelten zusätzliche Hürden:
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse text-[0.92rem]">
                <thead>
                  <tr className="border-b-2 border-gold-dark">
                    <th className="text-left py-2 pr-4 font-semibold text-ink">Personengruppe</th>
                    <th className="text-left py-2 px-4 font-semibold text-ink">Schutz</th>
                    <th className="text-left py-2 pl-4 font-semibold text-ink">Rechtsgrundlage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">Schwangere und Mütter bis vier Monate nach der Entbindung</td>
                    <td className="py-3 px-4 text-ink-light">Kündigung grundsätzlich verboten, Ausnahme nur mit behördlicher Zulassung</td>
                    <td className="py-3 pl-4 text-ink"><NormLink href={NORMS.muschg17}>§ 17 MuSchG</NormLink></td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">Schwerbehinderte und gleichgestellte Menschen</td>
                    <td className="py-3 px-4 text-ink-light">Kündigung nur mit vorheriger Zustimmung des Integrationsamts</td>
                    <td className="py-3 pl-4 text-ink"><NormLink href={NORMS.sgb9_168}>§ 168 SGB IX</NormLink></td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">Beschäftigte in Elternzeit</td>
                    <td className="py-3 px-4 text-ink-light">Kündigung grundsätzlich verboten</td>
                    <td className="py-3 pl-4 text-ink"><NormLink href={NORMS.beeg18}>§ 18 BEEG</NormLink></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-ink">Betriebsratsmitglieder</td>
                    <td className="py-3 px-4 text-ink-light">ordentliche Kündigung grundsätzlich ausgeschlossen</td>
                    <td className="py-3 pl-4 text-ink"><NormLink href={NORMS.kschg15}>§ 15 KSchG</NormLink></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-ink leading-relaxed">
              Wer schwerbehindert ist oder einen Antrag gestellt hat, sollte das dem Arbeitgeber spätestens kurz nach
              der Kündigung mitteilen. Fehlt die Zustimmung des Integrationsamts, ist die Kündigung unwirksam. Auch
              dieser Fehler muss aber innerhalb der Drei-Wochen-Frist geltend gemacht werden.
            </p>

            <h2 id="typische-fehler-aus-der-anwaltlichen-praxis" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Typische Fehler aus der anwaltlichen Praxis
            </h2>
            <p className="text-ink leading-relaxed">
              Die meisten Kündigungen während einer Krankheit scheitern nicht am Recht, sondern an Fehlern der
              Betroffenen. Drei Fehler sehen wir besonders oft:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-ink">
              <li><strong>Abwarten, bis man wieder gesund ist.</strong> Wer erst nach der Genesung reagiert, hat die Klagefrist oft schon verpasst. Eine Klage kann auch vom Krankenbett aus über einen Anwalt eingereicht werden.</li>
              <li><strong>Fehlzeiten gegenüber dem Arbeitgeber herunterspielen oder übertreiben.</strong> Diagnosen müssen Sie dem Arbeitgeber grundsätzlich nicht nennen. Im Kündigungsschutzprozess kann es aber sinnvoll sein, Ärzte von der Schweigepflicht zu entbinden, um die negative Prognose zu widerlegen. Diese Entscheidung sollte mit einem Anwalt abgestimmt werden.</li>
              <li><strong>Ein BEM-Angebot ignorieren.</strong> Wer die Einladung zum BEM ohne Antwort lässt, verschenkt ein Argument. Sie können ablehnen, sollten das aber bewusst und am besten schriftlich tun.</li>
            </ul>
            <p className="text-ink leading-relaxed mt-4">
              Für die Verhandlung über eine{' '}
              <Link href="/abfindung/" className="text-gold-dark no-underline hover:underline">Abfindung</Link>{' '}
              gilt: Eine krankheitsbedingte Kündigung ist für Arbeitgeber prozessual riskant, weil sie alle drei Stufen
              und häufig auch das BEM beweisen müssen. Genau dieses Risiko ist oft der Hebel, um sich im Gütetermin auf
              eine Abfindung zu einigen. Mit dem{' '}
              <Link href="/abfindungsrechner/" className="text-gold-dark no-underline hover:underline">Abfindungsrechner</Link>{' '}
              können Sie eine erste Größenordnung einschätzen.
            </p>

            <h2 id="fazit-krankheit-schutzt-nicht-fristen-schon" className="font-serif text-[1.6rem] font-bold text-ink mt-10 mb-4">
              Fazit: Krankheit schützt nicht, Fristen schon
            </h2>
            <p className="text-ink leading-relaxed">
              Der Mythos hält sich hartnäckig, ist aber falsch: Eine Kündigung während der Krankschreibung ist erlaubt.
              Ihr bester Schutz ist nicht die Krankmeldung, sondern das Kündigungsschutzgesetz und die schnelle Reaktion.
              Wer innerhalb von drei Wochen klagt, zwingt den Arbeitgeber, einen tragfähigen Grund zu beweisen, und
              verbessert seine Chancen auf den Erhalt des Arbeitsplatzes oder eine angemessene Abfindung.
            </p>
            <p className="text-ink leading-relaxed mt-6 p-5 bg-cream border-l-4 border-gold rounded">
              <strong>Sie haben während Ihrer Krankheit eine Kündigung erhalten?</strong>{' '}
              <Link href="/mandantenaufnahme-kuendigung/" className="text-gold-dark no-underline hover:underline">
                Lassen Sie sie kostenlos in einer Erstberatung prüfen
              </Link>, bevor die Drei-Wochen-Frist abläuft.
            </p>
            <p className="text-[0.85rem] text-ink-muted italic mt-6">
              Hinweis: Dieser Beitrag informiert allgemein über die Rechtslage und ersetzt keine Rechtsberatung im
              Einzelfall.
            </p>

            <div className="mt-10">
              <ShareButtons title={PAGE_TITLE} url={PAGE_URL} />
            </div>
          </div>
        </article>

        <section className="py-10 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 id="haufige-fragen-zur-kundigung-wahrend-krankheit" className="font-serif text-[1.6rem] font-bold text-ink mb-6">
              Häufige Fragen zur Kündigung während Krankheit
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <section className="py-8 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <div className="max-w-[740px]">
              <AuthorBox />
            </div>
          </div>
        </section>

        <section className="py-[50px] px-8 bg-white">
          <div className="max-w-content mx-auto">
            <WeitereLinkvorschlaege currentPath="/kuendigung-waehrend-krankheit" />
          </div>
        </section>
      </main>
    </>
  );
}
