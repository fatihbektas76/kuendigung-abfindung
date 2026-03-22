import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';

export const revalidate = 86400;

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const metadata: Metadata = {
  title: `Aktuelle Urteile: Kündigung & Abfindung (${new Date().getFullYear()})`,
  description:
    'Wichtige BAG-Urteile zu Kündigung, Abfindung, Aufhebungsvertrag und Abmahnung. Laufend aktualisiert. Was die Rechtsprechung für Arbeitnehmer bedeutet.',
  alternates: {
    canonical: `${BASE_URL}/ratgeber/urteile`,
  },
};

const urteile = [
  {
    az: '2 AZR 140/12',
    gericht: 'Bundesarbeitsgericht',
    jahr: 2013,
    titel: 'Schwellenwert §23 KSchG — Wer zählt mit?',
    beschreibung: 'Das BAG stellte klar, wie Teilzeitkräfte bei der Berechnung des Schwellenwerts nach §23 KSchG zu berücksichtigen sind. Teilzeitkräfte mit bis zu 20 Wochenstunden zählen mit 0,5, bis 30 Wochenstunden mit 0,75.',
    bedeutung: 'Entscheidend für die Frage, ob das Kündigungsschutzgesetz in Ihrem Betrieb gilt. In Kleinbetrieben mit Teilzeitkräften kann der Schwellenwert schneller erreicht sein als gedacht.',
    thema: 'Kündigungsschutz',
  },
  {
    az: '2 AZR 549/14',
    gericht: 'Bundesarbeitsgericht',
    jahr: 2015,
    titel: 'Abmahnung vor verhaltensbedingter Kündigung',
    beschreibung: 'Das BAG bestätigte, dass eine verhaltensbedingte Kündigung grundsätzlich eine vorherige Abmahnung voraussetzt. Die Abmahnung muss das Fehlverhalten konkret bezeichnen und die Konsequenz einer Kündigung androhen.',
    bedeutung: 'Wurde Ihnen ohne vorherige Abmahnung verhaltensbedingt gekündigt? Dann ist die Kündigung mit hoher Wahrscheinlichkeit unwirksam. Eine fehlende oder fehlerhafte Abmahnung ist einer der häufigsten Angriffspunkte.',
    thema: 'Abmahnung',
  },
  {
    az: '6 AZR 456/21',
    gericht: 'Bundesarbeitsgericht',
    jahr: 2022,
    titel: 'Aufhebungsvertrag — Gebot fairen Verhandelns',
    beschreibung: 'Das BAG konkretisierte die Anforderungen an faire Verhandlungen bei Aufhebungsverträgen. Ein Aufhebungsvertrag kann anfechtbar sein, wenn der Arbeitgeber eine psychische Drucksituation schafft oder dem Arbeitnehmer keine angemessene Bedenkzeit einräumt.',
    bedeutung: 'Wurden Sie unter Druck gesetzt, den Aufhebungsvertrag sofort zu unterschreiben? Dann könnte der Vertrag nach diesem Urteil anfechtbar sein. Nehmen Sie den Vertrag immer mit nach Hause.',
    thema: 'Aufhebungsvertrag',
  },
  {
    az: '2 AZR 697/20',
    gericht: 'Bundesarbeitsgericht',
    jahr: 2021,
    titel: 'Fristlose Kündigung wegen Social-Media-Posts',
    beschreibung: 'Das BAG entschied über die Grenzen der Meinungsfreiheit in sozialen Medien im Arbeitsverhältnis. Grobe Beleidigungen des Arbeitgebers in sozialen Netzwerken können eine fristlose Kündigung rechtfertigen — auch wenn das Profil als privat eingestellt ist.',
    bedeutung: 'Selbst private Social-Media-Äußerungen können arbeitsrechtliche Konsequenzen haben. Allerdings ist immer eine Einzelfallabwägung nötig — nicht jeder kritische Post rechtfertigt eine fristlose Kündigung.',
    thema: 'Fristlose Kündigung',
  },
  {
    az: '2 AZR 75/19',
    gericht: 'Bundesarbeitsgericht',
    jahr: 2020,
    titel: 'Sozialauswahl bei betriebsbedingter Kündigung',
    beschreibung: 'Das BAG präzisierte die Anforderungen an die Sozialauswahl nach §1 Abs. 3 KSchG. Der Arbeitgeber muss Alter, Betriebszugehörigkeit, Unterhaltspflichten und Schwerbehinderung der vergleichbaren Arbeitnehmer berücksichtigen.',
    bedeutung: 'Fehler in der Sozialauswahl machen die Kündigung unwirksam. Prüfen Sie, ob der Arbeitgeber alle vergleichbaren Mitarbeiter einbezogen hat und ob die Kriterien korrekt gewichtet wurden.',
    thema: 'Kündigung',
  },
  {
    az: '5 AZR 521/16',
    gericht: 'Bundesarbeitsgericht',
    jahr: 2018,
    titel: 'Abfindung und Fünftelregelung',
    beschreibung: 'Das BAG bestätigte die steuerlichen Vorteile der Fünftelregelung nach §34 EStG für Abfindungen. Die Abfindung wird so besteuert, als wäre sie über fünf Jahre verteilt worden, was die Progression deutlich mindert.',
    bedeutung: 'Die Fünftelregelung kann Ihre Steuerlast auf die Abfindung erheblich senken. Lassen Sie die steuerliche Gestaltung vor Abschluss eines Vergleichs oder Aufhebungsvertrags prüfen.',
    thema: 'Abfindung',
  },
  {
    az: '2 AZR 233/17',
    gericht: 'Bundesarbeitsgericht',
    jahr: 2018,
    titel: 'Kündigung und Schwangerschaft — Mutterschutz',
    beschreibung: 'Das BAG bekräftigte den besonderen Kündigungsschutz schwangerer Arbeitnehmerinnen nach §17 MuSchG. Eine Kündigung während der Schwangerschaft und bis vier Monate nach der Entbindung ist nur mit Zustimmung der zuständigen Behörde möglich.',
    bedeutung: 'Der Mutterschutz greift auch dann, wenn der Arbeitgeber nichts von der Schwangerschaft wusste — sofern Sie ihn innerhalb von 2 Wochen nach Zugang der Kündigung informieren.',
    thema: 'Besonderer Kündigungsschutz',
  },
  {
    az: '7 AZR 188/20',
    gericht: 'Bundesarbeitsgericht',
    jahr: 2021,
    titel: 'Kündigung bei Schwerbehinderung — Integrationsamt',
    beschreibung: 'Das BAG stellte klar, dass die Kündigung eines schwerbehinderten Arbeitnehmers ohne vorherige Zustimmung des Integrationsamts nichtig ist (§168 SGB IX). Der besondere Kündigungsschutz gilt bereits während des Antragsverfahrens auf Anerkennung.',
    bedeutung: 'Ohne Zustimmung des Integrationsamts ist die Kündigung von Anfang an unwirksam. Prüfen Sie, ob der Arbeitgeber das vorgeschriebene Verfahren eingehalten hat.',
    thema: 'Besonderer Kündigungsschutz',
  },
];

const faqs = [
  {
    q: 'Warum sind BAG-Urteile für meinen Fall relevant?',
    a: 'Das Bundesarbeitsgericht (BAG) ist die höchste Instanz im deutschen Arbeitsrecht. Seine Urteile prägen die Rechtsprechung aller Arbeitsgerichte. Wenn ein BAG-Urteil zu einer ähnlichen Frage existiert, wird Ihr Arbeitsgericht diesem in der Regel folgen. BAG-Urteile stärken oder schwächen Ihre Position erheblich.',
  },
  {
    q: 'Sind diese Urteile noch aktuell?',
    a: 'Ja, alle hier aufgeführten Urteile sind nach wie vor die maßgebliche Rechtsprechung in ihrem jeweiligen Bereich. BAG-Urteile behalten ihre Gültigkeit, solange sie nicht durch neuere Entscheidungen aufgehoben oder modifiziert werden. Wir aktualisieren diese Seite regelmäßig.',
  },
  {
    q: 'Kann ich mich auf ein BAG-Urteil berufen?',
    a: 'Grundsätzlich ja. BAG-Urteile haben zwar keine formelle Bindungswirkung wie Gesetze, werden aber von allen Arbeitsgerichten als Leitentscheidungen berücksichtigt. Ihr Fachanwalt wird die relevanten Urteile in Ihrem Verfahren zitieren und auf Ihren konkreten Fall anwenden.',
  },
];

export default function UrteilePage() {
  return (
    <main>
      {/* Schema.org - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: `${BASE_URL}/ratgeber` },
              { '@type': 'ListItem', position: 3, name: 'Urteile', item: `${BASE_URL}/ratgeber/urteile` },
            ],
          }),
        }}
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
            <Link href="/ratgeber" className="text-gold no-underline hover:underline">Ratgeber</Link>
            <span className="mx-2">/</span>
            <span>Urteile</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Rechtsprechung
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Aktuelle Urteile zu Kündigung und Abfindung
          </h1>
          <p className="text-[1.05rem] text-ink-light max-w-[640px] leading-relaxed mt-4">
            Die wichtigsten BAG-Urteile für Arbeitnehmer &mdash; verständlich erklärt und auf Ihre Situation
            angewendet. Laufend aktualisiert.
          </p>
        </div>
      </div>

      {/* Urteile Grid */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {urteile.map((u) => (
              <div key={u.az} className="border border-border rounded-sm overflow-hidden hover:border-gold transition-all">
                <div className="bg-[#1C1408] p-5 border-b-[3px] border-gold">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold">
                      {u.gericht}
                    </span>
                    <span className="text-[0.72rem] text-white/50">{u.jahr}</span>
                  </div>
                  <div className="font-serif text-[1.1rem] font-bold text-white">
                    Az. {u.az}
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-2">{u.titel}</h3>
                  <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-3">{u.beschreibung}</p>
                  <div className="py-3 px-4 bg-cream rounded-sm border-l-[3px] border-gold">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                      Bedeutung für Sie
                    </div>
                    <p className="text-[0.84rem] text-ink leading-relaxed m-0">{u.bedeutung}</p>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block py-1 px-3 rounded-full border border-border text-[0.75rem] font-semibold text-ink-muted">
                      {u.thema}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Welches Urteil ist für Ihren Fall relevant?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Wir analysieren die Rechtsprechung für Ihren konkreten Fall und nutzen die
            relevanten Urteile zu Ihrem Vorteil &mdash; kostenlose Ersteinschätzung.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zu BAG-Urteilen
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Die Rechtsprechung auf Ihrer Seite nutzen.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Ein Fachanwalt kennt die aktuelle Rechtsprechung und wendet sie auf Ihren Fall an.
            Nutzen Sie unsere kostenlose Ersteinschätzung.
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
