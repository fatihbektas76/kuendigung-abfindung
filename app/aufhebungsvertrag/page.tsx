import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import StandAnzeige from '@/components/StandAnzeige';
import AktuelleRechtslage from '@/components/AktuelleRechtslage';
import AuthorBox from '@/components/AuthorBox';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Aufhebungsvertrag: Rechte, Abfindung & Sperrzeit (${new Date().getFullYear()})`,
  description:
    'Aufhebungsvertrag erhalten? Sperrzeit vermeiden, Abfindung maximieren, Fallstricke kennen. Fachanwalt für Arbeitsrecht prüft Ihren Aufhebungsvertrag – kostenlose Ersteinschätzung.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/aufhebungsvertrag`,
  },
  openGraph: {
    title: `Aufhebungsvertrag: Rechte, Abfindung & Sperrzeit (${new Date().getFullYear()})`,
    description: 'Aufhebungsvertrag erhalten? Sperrzeit vermeiden, Abfindung maximieren, Fallstricke kennen. Fachanwalt für Arbeitsrecht prüft Ihren Aufhebungsvertrag.',
    url: `${SEO_CONFIG.baseUrl}/aufhebungsvertrag`,
  },
  twitter: {
    card: 'summary',
    title: `Aufhebungsvertrag: Rechte, Abfindung & Sperrzeit (${new Date().getFullYear()})`,
    description: 'Aufhebungsvertrag erhalten? Sperrzeit vermeiden, Abfindung maximieren, Fallstricke kennen. Fachanwalt für Arbeitsrecht prüft Ihren Aufhebungsvertrag.',
  },
};

const faqs = [
  {
    q: 'Muss ich einen Aufhebungsvertrag unterschreiben?',
    a: 'Nein. Ein Aufhebungsvertrag erfordert Ihre Zustimmung \u2014 Sie sind nicht verpflichtet zu unterschreiben. Lassen Sie sich niemals unter Druck setzen, sofort zu unterschreiben. Nehmen Sie den Vertrag mit nach Hause und lassen Sie ihn von einem Fachanwalt prüfen. Ein voreilig unterschriebener Aufhebungsvertrag kann nur in Ausnahmefällen angefochten werden.',
  },
  {
    q: 'Droht mir eine Sperrzeit beim Arbeitslosengeld?',
    a: 'Ja, bei einem Aufhebungsvertrag verhängt die Agentur für Arbeit in der Regel eine Sperrzeit von 12 Wochen (§159 SGB III), weil Sie an der Beendigung des Arbeitsverhältnisses mitgewirkt haben. Ausnahmen gelten, wenn der Arbeitgeber ohnehin betriebsbedingt gekündigt hätte und die Abfindung die Regelformel nicht übersteigt. Ein Fachanwalt kann die Formulierung so gestalten, dass das Sperrzeit-Risiko minimiert wird.',
  },
  {
    q: 'Wie hoch sollte die Abfindung im Aufhebungsvertrag sein?',
    a: 'Als Minimum sollte die Abfindung der Regelformel entsprechen: 0,5 Bruttomonatsgehälter pro Beschäftigungsjahr. Wenn der Arbeitgeber den Aufhebungsvertrag anbietet, ist Ihre Verhandlungsposition oft stark \u2014 insbesondere wenn er eine drohende Kündigung vermeiden will. Faktoren von 0,75 bis 1,5 sind keine Seltenheit.',
  },
  {
    q: 'Kann ich einen unterschriebenen Aufhebungsvertrag widerrufen?',
    a: 'Ein Widerrufsrecht besteht grundsätzlich nicht. Eine Anfechtung ist nur möglich bei widerrechtlicher Drohung (z.\u00A0B. Androhung einer Strafanzeige), arglistiger Täuschung oder wenn der Arbeitgeber das Gebot fairen Verhandelns verletzt hat (BAG-Urteil vom 07.02.2019 \u2014 6 AZR 75/18). Deshalb ist es so wichtig, vor der Unterschrift anwaltlichen Rat einzuholen.',
  },
  {
    q: 'Was sollte ein guter Aufhebungsvertrag regeln?',
    a: 'Neben der Abfindungshöhe und dem Beendigungsdatum sollte der Vertrag folgende Punkte regeln: Freistellung (bezahlt, unwiderruflich), qualifiziertes Arbeitszeugnis mit Mindestnote, Urlaubsabgeltung, Rückgabe von Firmeneigentum, Wettbewerbsverbot und Vertraulichkeitsklausel. Jede fehlende Regelung kann zu Nachteilen führen.',
  },
];

const subpages = [
  {
    href: '/aufhebungsvertrag/aufhebungsvertrag-abfindung/',
    title: 'Abfindung im Aufhebungsvertrag',
    desc: 'Wie hoch sollte die Abfindung sein? Verhandlungstipps und Berechnungsbeispiele.',
  },
  {
    href: '/aufhebungsvertrag/aufhebungsvertrag-ablehnen/',
    title: 'Aufhebungsvertrag ablehnen',
    desc: 'Wann Sie ablehnen sollten und welche Konsequenzen das hat.',
  },
  {
    href: '/aufhebungsvertrag/aufhebungsvertrag-sperrzeit/',
    title: 'Sperrzeit vermeiden',
    desc: 'So formulieren Sie den Aufhebungsvertrag, dass keine Sperrzeit droht.',
  },
  {
    href: '/aufhebungsvertrag/aufhebungsvertrag-muster/',
    title: 'Aufhebungsvertrag Muster & Checkliste',
    desc: 'Worauf Sie achten m\u00FCssen \u2014 Punkt f\u00FCr Punkt.',
  },
  {
    href: '/aufhebungsvertrag/aufhebungsvertrag-widerruf/',
    title: 'Aufhebungsvertrag widerrufen',
    desc: 'Ist ein Widerruf m\u00F6glich? Anfechtung und Ihre Optionen.',
  },
  {
    href: '/aufhebungsvertrag/aufhebungsvertrag-zeugnis/',
    title: 'Aufhebungsvertrag und Zeugnis',
    desc: 'Worauf Sie bei der Zeugnisklausel achten m\u00FCssen.',
  },
  {
    href: '/aufhebungsvertrag/aufhebungsvertrag-vor-nachteile/',
    title: 'Vor- und Nachteile',
    desc: 'Alle Vor- und Nachteile eines Aufhebungsvertrags im \u00DCberblick.',
  },
];

export default function AufhebungsvertragPage() {
  return (
    <main>
      <SeoGeoBase
        pageType="WebPage"
        breadcrumbs={[
          { name: 'Start', url: SEO_CONFIG.baseUrl },
          { name: 'Aufhebungsvertrag', url: `${SEO_CONFIG.baseUrl}/aufhebungsvertrag` },
        ]}
        datePublished="2025-01-15"
      />

      {/* Schema.org - FAQPage */}
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

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <span>Aufhebungsvertrag</span>
          </nav>
          <StandAnzeige />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Ratgeber Aufhebungsvertrag
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Aufhebungsvertrag erhalten &ndash; was Sie wissen müssen
          </h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            {/* Warning box */}
            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold mb-8">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Achtung: Unterschreiben Sie einen Aufhebungsvertrag niemals sofort. Einmal unterschrieben,
                gibt es kein Zurück. Lassen Sie den Vertrag vorher von einem Fachanwalt prüfen.
              </p>
            </div>

            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Ein <strong>Aufhebungsvertrag</strong> beendet Ihr Arbeitsverhältnis einvernehmlich &mdash; anders als bei einer Kündigung müssen Sie hier zustimmen. Das klingt zunächst fair, birgt aber erhebliche Risiken: Eine <strong>Sperrzeit beim Arbeitslosengeld</strong> von bis zu 12 Wochen, eine zu niedrige Abfindung, der Verlust von Kündigungsschutzrechten und ungünstige Klauseln zu Zeugnis, Freistellung oder Wettbewerbsverbot.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Arbeitgeber bieten Aufhebungsverträge oft an, um eine Kündigungsschutzklage zu vermeiden &mdash; das zeigt, dass Ihre <strong>Verhandlungsposition stärker ist, als Sie denken</strong>. In vielen Fällen können wir die Abfindung deutlich über die Regelformel (0,5 Monatsgehälter pro Jahr) hinaus verhandeln und gleichzeitig die Sperrzeit vermeiden.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-8">
              Ein Fachanwalt für Arbeitsrecht prüft den gesamten Vertrag auf versteckte Fallstricke: Ist die Abfindung angemessen? Droht eine Sperrzeit? Sind Freistellung, Zeugnis und Urlaubsabgeltung korrekt geregelt? Gibt es ein Wettbewerbsverbot, das Sie in Ihrer neuen Stelle einschränkt?
            </p>

            {/* CTA 1 */}
            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Aufhebungsvertrag kostenlos prüfen lassen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Aufhebungsvertrag auf dem Tisch?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Wir prüfen Ihren Aufhebungsvertrag, identifizieren Risiken und verhandeln
            bessere Konditionen &mdash; kostenlose Ersteinschätzung.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* Subpages */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Vertiefende Ratgeber
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Aufhebungsvertrag im Detail
          </h2>
          <div className="grid grid-cols-2 gap-4 max-w-[740px] max-md:grid-cols-1">
            {subpages.map((sp) => (
              <Link
                key={sp.href}
                href={sp.href}
                className="block py-5 px-5 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold hover:text-gold-dark transition-all"
              >
                <span className="font-semibold">{sp.title}</span>
                <span className="block text-[0.84rem] text-ink-muted mt-1">{sp.desc}</span>
              </Link>
            ))}
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
            Fragen zum Aufhebungsvertrag
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Autorenbox */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
          </div>
        </div>
      </section>

      <AktuelleRechtslage />

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Nicht vorschnell unterschreiben.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Lassen Sie Ihren Aufhebungsvertrag prüfen, bevor Sie unterschreiben. Wir beraten Sie
            zu Abfindungshöhe, Sperrzeit und allen versteckten Klauseln.
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
