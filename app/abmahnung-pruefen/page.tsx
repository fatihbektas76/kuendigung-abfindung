import Link from 'next/link';
import Image from 'next/image';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';
import StandAnzeige from '@/components/StandAnzeige';
import FaqAccordion from '@/components/FaqAccordion';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';

export const revalidate = 86400;

const faqs = [
  {
    q: 'Wann ist eine Abmahnung unwirksam?',
    a: 'Eine Abmahnung ist unwirksam, wenn sie formelle oder materielle Mängel aufweist. Die häufigsten Gründe: fehlende Bestimmtheit (nur pauschale Vorwürfe statt konkreter Angaben zu Datum, Uhrzeit, Ort), fehlende Warnfunktion (keine Androhung von Konsequenzen), unrichtiger Sachverhalt, Verstoß gegen das Maßregelungsverbot (§ 612a BGB) oder Verwirkung bei verspäteter Erteilung.',
  },
  {
    q: 'Muss ich die Abmahnung unterschreiben?',
    a: 'Nein. Sie sind nicht verpflichtet, eine Abmahnung gegenzuzeichnen — auch keine Empfangsbestätigung. Die Verweigerung der Unterschrift hat keine arbeitsrechtlichen Folgen. Wenn Sie den Erhalt dennoch quittieren, achten Sie darauf, dass die Unterschrift ausschließlich den Empfang bestätigt — nicht die inhaltliche Richtigkeit der Vorwürfe.',
  },
  {
    q: 'Kann ich eine Abmahnung aus der Personalakte entfernen lassen?',
    a: 'Ja. Wenn die Abmahnung formell oder materiell unwirksam ist, haben Sie einen Anspruch auf Entfernung aus der Personalakte (§§ 242, 1004 Abs. 1 S. 1 BGB analog). Auch nach einer angemessenen Zeit ohne Wiederholungsfall kann die Entfernung verlangt werden — das BAG geht je nach Schwere von 2 bis 3 Jahren aus.',
  },
  {
    q: 'Wie viele Abmahnungen braucht der Arbeitgeber vor einer Kündigung?',
    a: 'Das Gesetz schreibt keine bestimmte Anzahl vor. In der Regel genügt eine einzige wirksame Abmahnung wegen eines gleichartigen Pflichtverstoßes, um bei Wiederholung eine verhaltensbedingte Kündigung zu rechtfertigen. Bei schweren Verstößen (z. B. Diebstahl, Körperverletzung) ist sogar eine fristlose Kündigung ohne vorherige Abmahnung möglich.',
  },
  {
    q: 'Was ist der Unterschied zwischen Abmahnung und Ermahnung?',
    a: 'Eine Abmahnung enthält neben der Rüge des Fehlverhaltens auch die Androhung arbeitsrechtlicher Konsequenzen für den Wiederholungsfall (Warnfunktion). Eine Ermahnung ist lediglich ein Hinweis auf ein Fehlverhalten ohne Konsequenzendrohung. Nur die Abmahnung kann als Vorstufe einer verhaltensbedingten Kündigung dienen (BAG, Urt. v. 19.04.2012 – 2 AZR 258/11).',
  },
  {
    q: 'Gibt es eine Frist für die Gegendarstellung?',
    a: 'Es gibt keine gesetzliche Ausschlussfrist für eine Gegendarstellung. Eine Klage auf Entfernung aus der Personalakte unterliegt der regulären Verjährungsfrist von drei Jahren (§ 195 BGB). Dennoch empfiehlt es sich, innerhalb von zwei Wochen zu reagieren, um die eigene Position zu stärken.',
  },
  {
    q: 'Was kostet die anwaltliche Prüfung einer Abmahnung?',
    a: 'Eine erste Einschätzung erhalten Sie bei APOS Legal kostenlos und unverbindlich. Die Kosten für eine umfassende Beratung richten sich nach dem RVG und dem Gegenstandswert. Bei Abmahnungen liegen die Kosten meist im niedrigen dreistelligen Bereich. Viele Rechtsschutzversicherungen übernehmen die Kosten im Arbeitsrecht.',
  },
];

export default function AbmahnungPruefenPage() {
  return (
    <>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/abmahnung-pruefen/`}
        pageTitle="Abmahnchecker — Ist Ihre Abmahnung wirksam?"
        pageDescription="Prüfen Sie kostenfrei, ob Ihre Abmahnung wirksam ist. 14 Fragen, sofortiges Ergebnis mit BAG-Rechtsprechung & PDF-Auswertung."
        pageType="WebApplication"
        appName="Abmahnchecker"
        includeOrganization={false}
        includeRating={false}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Abmahnung prüfen', url: `${SEO_CONFIG.baseUrl}/abmahnung-pruefen/` },
        ]}
      />

      {/* FAQPage Schema */}
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

      <div className="min-h-screen bg-cream">
        {/* ───── Header ───── */}
        <header className="bg-white border-b border-border">
          <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <Image src="/logo.png" alt="gekuendigt-abfindung.de" width={140} height={48} className="h-9 w-auto" priority />
            </Link>
            <a
              href="tel:+49622295992400"
              className="text-[0.82rem] text-gold-dark font-semibold no-underline hover:underline hidden sm:block"
            >
              +49 6222 95992 400
            </a>
          </div>
        </header>

        {/* ───── Hero / Welcome ───── */}
        <section className="max-w-content mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-[640px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-4">
              Kostenfreie Erstprüfung &middot; 3 Minuten
            </div>
            <h1 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.2] text-ink mb-5 mt-0">
              Ist Ihre Abmahnung wirksam?
            </h1>
            <p className="text-[1.02rem] text-ink-light leading-relaxed mb-8 m-0">
              Beantworten Sie 8 bis 14 Fragen und erhalten Sie eine sofortige rechtliche Einschätzung — auf Basis der ständigen Rechtsprechung des Bundesarbeitsgerichts.
            </p>

            <div className="space-y-3 mb-10">
              {[
                'Prüfung formeller und materieller Unwirksamkeitsgründe',
                'Erkennung von KO-Kriterien (z.\u00A0B. fehlende Bestimmtheit, § 612a BGB, Sammelabmahnung)',
                'PDF-Auswertung mit konkreten BAG-Fundstellen zum Download',
              ].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="w-3 h-0.5 bg-gold-dark mt-2.5 min-w-[12px]" />
                  <span className="text-[0.92rem] text-ink-light">{text}</span>
                </div>
              ))}
            </div>

            <Link
              href="/abmahnung-pruefen/pruefung/"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white text-[0.95rem] font-semibold rounded-sm no-underline hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(122,101,40,0.3)] transition-all"
            >
              Prüfung starten
            </Link>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-6 border-t border-border">
              {[
                'Anonym & ohne Anmeldung',
                'Erstellt von Fachanwalt für Arbeitsrecht',
                'BAG-Rechtsprechung 2025/26',
              ].map((trust) => (
                <span key={trust} className="text-[0.78rem] text-ink-muted">{trust}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ───── SEO Content Block ───── */}
        <section className="bg-white border-t border-border">
          <div className="max-w-content mx-auto px-6 py-16">
            <div className="max-w-[740px]">
              <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold leading-[1.25] text-ink mb-6 mt-0">
                Wann ist eine Abmahnung unwirksam? — Die 7 wichtigsten Gründe
              </h2>

              <p className="text-[0.92rem] text-ink-light leading-relaxed mb-8">
                Eine Abmahnung im Arbeitsrecht muss strenge formelle und materielle Anforderungen erfüllen. Ist auch nur eine dieser Voraussetzungen nicht gegeben, kann der Arbeitnehmer die Entfernung aus der Personalakte verlangen (§§ 242, 1004 Abs. 1 S. 1 BGB analog). Fachanwalt Fatih Bektas fasst die häufigsten Unwirksamkeitsgründe zusammen.
              </p>

              <div className="space-y-8 mb-12">
                {[
                  {
                    title: '1. Fehlende Bestimmtheit des Vorwurfs',
                    text: 'Eine wirksame Abmahnung muss das beanstandete Verhalten konkret nach Datum, Uhrzeit und Ort bezeichnen. Pauschale Vorwürfe wie „wiederholtes Zuspätkommen" oder „Störung des Betriebsfriedens" genügen nicht (BAG, Urt. v. 27.11.2008 – 2 AZR 675/07).',
                  },
                  {
                    title: '2. Fehlende Warnfunktion',
                    text: 'Ohne die ausdrückliche Androhung arbeitsrechtlicher Konsequenzen für den Wiederholungsfall liegt lediglich eine Ermahnung vor — keine kündigungsrelevante Abmahnung (BAG, Urt. v. 19.04.2012 – 2 AZR 258/11).',
                  },
                  {
                    title: '3. Unrichtiger Sachverhalt',
                    text: 'Enthält die Abmahnung Tatsachenbehauptungen, die nicht der Wahrheit entsprechen, ist sie insgesamt aus der Personalakte zu entfernen (BAG, Urt. v. 12.08.2010 – 2 AZR 593/09).',
                  },
                  {
                    title: '4. Verstoß gegen das Maßregelungsverbot',
                    text: 'Wird ein Arbeitnehmer für die Ausübung eines gesetzlichen Rechts abgemahnt — etwa eine ordnungsgemäße Krankmeldung, Elternzeit oder Betriebsratstätigkeit — verstößt die Abmahnung gegen § 612a BGB und ist unwirksam.',
                  },
                  {
                    title: '5. Sammelabmahnung mit unrichtigem Vorwurf',
                    text: 'Werden mehrere Pflichtverletzungen in einer Abmahnung gerügt und trifft mindestens ein Vorwurf nicht zu, ist die gesamte Abmahnung unwirksam und aus der Personalakte zu entfernen (BAG, Urt. v. 13.03.1991 – 5 AZR 133/90).',
                  },
                  {
                    title: '6. Verwirkung durch Zeitablauf',
                    text: 'Liegt zwischen dem vorgeworfenen Verhalten und der Abmahnung ein erheblicher Zeitraum (in der Regel mehr als 6–12 Monate) und hat der Arbeitgeber den Eindruck erweckt, die Sache sei erledigt, kann das Abmahnungsrecht verwirkt sein (§ 242 BGB).',
                  },
                  {
                    title: '7. Abmahnung wegen Amtstätigkeit',
                    text: 'Betriebsratsmitglieder dürfen nicht individualrechtlich für betriebsverfassungsrechtliche Amtspflichtverletzungen abgemahnt werden. Sanktion ist ausschließlich § 23 Abs. 1 BetrVG (BAG, Beschl. v. 09.09.2015 – 7 ABR 69/13).',
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <h3 className="text-[1rem] font-semibold text-ink mb-1.5 mt-0">{item.title}</h3>
                    <p className="text-[0.88rem] text-ink-light leading-relaxed m-0">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* FAQ Accordion */}
              <h2 className="font-serif text-[clamp(1.2rem,3vw,1.5rem)] font-bold leading-[1.25] text-ink mb-6 mt-0">
                Häufige Fragen zur Abmahnung im Arbeitsrecht
              </h2>
              <FaqAccordion items={faqs} />

              <div className="mt-10">
                <StandAnzeige />
              </div>
            </div>
          </div>
        </section>

        {/* BERT-Interlinker */}
        <section className="py-[50px] px-8 bg-white">
          <div className="max-w-content mx-auto">
            <WeitereLinkvorschlaege currentPath="/abmahnung-pruefen" />
          </div>
        </section>
      </div>
    </>
  );
}
