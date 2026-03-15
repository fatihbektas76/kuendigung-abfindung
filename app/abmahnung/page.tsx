import type { Metadata } from 'next';
import Link from 'next/link';
import { abmahnungEntries } from '@/lib/abmahnung-content';
import FaqAccordion from '@/components/FaqAccordion';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const metadata: Metadata = {
  title: 'Abmahnung — Ihre Rechte und was Sie jetzt tun müssen (2026)',
  description:
    'Abmahnung erhalten? Was ist eine Abmahnung, wann ist sie unwirksam, was tun? Widerspruch, Gegendarstellung, Rechte als Arbeitnehmer. Kostenlose Ersteinschätzung vom Fachanwalt.',
  alternates: {
    canonical: `${BASE_URL}/abmahnung`,
  },
};

const faqs = [
  {
    q: 'Was ist eine Abmahnung im Arbeitsrecht?',
    a: 'Eine Abmahnung ist eine formale Rüge des Arbeitgebers wegen einer Pflichtverletzung. Sie hat zwei Funktionen: Sie dokumentiert das beanstandete Verhalten (Dokumentationsfunktion) und warnt den Arbeitnehmer, dass bei Wiederholung arbeitsrechtliche Konsequenzen bis hin zur Kündigung drohen (Warnfunktion). Eine Abmahnung ist in der Regel Voraussetzung für eine verhaltensbedingte Kündigung.',
  },
  {
    q: 'Wann ist eine Abmahnung unwirksam?',
    a: 'Eine Abmahnung ist unwirksam, wenn sie den Vorwurf nicht konkret benennt (Datum, Uhrzeit, genaues Fehlverhalten), wenn sie von einer nicht berechtigten Person ausgesprochen wurde, wenn der Vorwurf inhaltlich falsch ist, wenn sie unverhältnismäßig ist oder wenn der Arbeitgeber zu lange mit der Abmahnung gewartet hat (Verwirkung).',
  },
  {
    q: 'Muss ich einer Abmahnung widersprechen?',
    a: 'Sie sind nicht verpflichtet zu widersprechen \u2014 eine Abmahnung wird nicht allein dadurch wirksam, dass Sie schweigen. Dennoch ist ein Widerspruch oder eine Gegendarstellung empfehlenswert, da diese der Personalakte beigelegt wird. In einem späteren Kündigungsschutzprozess kann die dokumentierte Gegendarstellung Ihre Position stärken.',
  },
  {
    q: 'Wie viele Abmahnungen sind vor einer Kündigung erforderlich?',
    a: 'Es gibt keine feste Anzahl. Bei leichteren Pflichtverletzungen sind in der Regel zwei bis drei einschlägige Abmahnungen vor einer Kündigung erforderlich. Bei schwerwiegenden Verstößen kann bereits eine einzige Abmahnung ausreichen. Bei besonders gravierenden Pflichtverletzungen (z.\u00A0B. Diebstahl) ist unter Umständen keine Abmahnung erforderlich.',
  },
  {
    q: 'Kann ich gegen eine Abmahnung klagen?',
    a: 'Ja, Sie können vor dem Arbeitsgericht auf Entfernung der Abmahnung aus der Personalakte klagen. Dies empfiehlt sich insbesondere, wenn die Abmahnung inhaltlich falsch ist oder erhebliche Formfehler aufweist. Alternativ können Sie eine Gegendarstellung zur Personalakte einreichen. Lassen Sie die Erfolgsaussichten von einem Fachanwalt prüfen.',
  },
];

export default function AbmahnungPage() {
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
              { '@type': 'ListItem', position: 2, name: 'Abmahnung', item: `${BASE_URL}/abmahnung` },
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
            <span>Abmahnung</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Ratgeber Abmahnung
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Abmahnung erhalten &ndash; was jetzt?
          </h1>
        </div>
      </div>

      {/* Intro + Warning box */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            {/* Warning box */}
            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold mb-8">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Wichtig: Eine Abmahnung ist die Vorstufe zur Kündigung. Reagieren Sie überlegt &mdash;
                aber zeitnah. Was Sie jetzt tun (oder nicht tun), kann Ihren Arbeitsplatz sichern.
              </p>
            </div>

            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Eine Abmahnung vom Arbeitgeber ist kein Grund zur Panik &mdash; aber ein ernstes Signal.
              Sie zeigt, dass Ihr Arbeitgeber ein bestimmtes Verhalten beanstandet und
              für den Wiederholungsfall Konsequenzen androht. Im Arbeitsrecht hat die Abmahnung eine
              doppelte Funktion: Sie <strong>rügt</strong> ein konkretes Fehlverhalten und <strong>warnt</strong> vor
              einer Kündigung bei Wiederholung.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Die gute Nachricht: Viele Abmahnungen sind <strong>formell oder inhaltlich fehlerhaft</strong> und
              damit unwirksam. Ein Fachanwalt für Arbeitsrecht kann Ihre Abmahnung prüfen, Formfehler
              aufdecken und die richtige Strategie für Ihre Situation entwickeln &mdash; ob Widerspruch,
              Gegendarstellung oder stille Dokumentation.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-8">
              Auf dieser Seite erfahren Sie alles, was Sie über Abmahnungen im Arbeitsrecht wissen
              müssen: Wann sie wirksam sind, wie Sie reagieren sollten und wann Sie einen Anwalt
              einschalten sollten.
            </p>

            {/* CTA 1 */}
            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Abmahnung kostenlos prüfen lassen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Was ist eine Abmahnung? */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Grundlagen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Was ist eine Abmahnung?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Eine Abmahnung im Arbeitsrecht ist eine formale Rüge des Arbeitgebers wegen einer
              konkreten Pflichtverletzung. Sie erfüllt zwei Funktionen, die das Bundesarbeitsgericht
              (BAG) in ständiger Rechtsprechung fordert:
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6 max-md:grid-cols-1">
              <div className="bg-white border border-border rounded p-5">
                <h3 className="font-serif text-[1rem] font-bold mb-2">Rüge- und Dokumentationsfunktion</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed">
                  Der Arbeitgeber muss das beanstandete Verhalten <strong>konkret</strong> benennen &mdash;
                  mit Datum, Uhrzeit und genauer Beschreibung des Fehlverhaltens. Pauschale Vorwürfe
                  wie &bdquo;Sie kommen immer zu spät&ldquo; genügen nicht.
                </p>
              </div>
              <div className="bg-white border border-border rounded p-5">
                <h3 className="font-serif text-[1rem] font-bold mb-2">Warn- und Androhungsfunktion</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed">
                  Die Abmahnung muss klar zum Ausdruck bringen, dass im Wiederholungsfall der Bestand
                  des Arbeitsverhältnisses gefährdet ist. Ohne diese Androhung ist die Abmahnung als
                  Vorstufe zur Kündigung unwirksam.
                </p>
              </div>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die rechtliche Grundlage der Abmahnung ergibt sich aus dem allgemeinen Grundsatz der
              Verhältnismäßigkeit und dem Ultima-Ratio-Prinzip: Bevor der Arbeitgeber das Arbeitsverhältnis
              durch eine verhaltensbedingte Kündigung beendet, muss er dem Arbeitnehmer durch eine
              Abmahnung die Möglichkeit zur Verhaltensänderung geben (&sect;314 Abs.&nbsp;2 BGB analog,
              &sect;1 Abs.&nbsp;2 KSchG).
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Eine Abmahnung kann mündlich oder schriftlich erfolgen &mdash; aus Beweisgründen wird
              sie jedoch fast immer schriftlich erteilt und der Personalakte beigefügt. Sie ist an
              keine Frist gebunden, kann aber bei zu langem Zuwarten ihre Warnfunktion verlieren
              (Verwirkung). Abmahnungsberechtigt ist jeder Vorgesetzte, der auch weisungsbefugt ist.
            </p>
          </div>
        </div>
      </section>

      {/* Wann ist eine Abmahnung unwirksam? */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Wirksamkeit prüfen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wann ist eine Abmahnung unwirksam?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
              Viele Abmahnungen scheitern an formellen oder inhaltlichen Mängeln. Eine unwirksame
              Abmahnung kann keine spätere Kündigung rechtfertigen. Prüfen Sie folgende Punkte:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Vorwurf nicht konkret genug',
                  desc: 'Die Abmahnung muss das Fehlverhalten mit Datum, Uhrzeit und konkreter Beschreibung benennen. Pauschale Vorwürfe sind unwirksam.',
                },
                {
                  title: 'Falsche oder nicht berechtigte Person',
                  desc: 'Nur weisungsbefugte Vorgesetzte dürfen abmahnen. Eine Abmahnung durch einen nicht vorgesetzten Kollegen ist unwirksam.',
                },
                {
                  title: 'Inhaltlich unzutreffend',
                  desc: 'Ist der Vorwurf nachweislich falsch, ist die Abmahnung unwirksam und muss aus der Personalakte entfernt werden.',
                },
                {
                  title: 'Unverhältnismäßig',
                  desc: 'Bei Bagatellverstößen kann eine Abmahnung unverhältnismäßig sein. Ein einmaliges Zuspätkommen von 5 Minuten rechtfertigt in der Regel keine Abmahnung.',
                },
                {
                  title: 'Verwirkung durch Zeitablauf',
                  desc: 'Wartet der Arbeitgeber zu lange nach dem Vorfall mit der Abmahnung, kann diese ihre Warnfunktion verlieren.',
                },
                {
                  title: 'Keine Androhung von Konsequenzen',
                  desc: 'Fehlt der Hinweis, dass bei Wiederholung Kündigung droht, liegt keine wirksame Abmahnung vor, sondern nur eine Ermahnung.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 py-4 px-5 bg-cream rounded-sm border border-border">
                  <svg className="min-w-[20px] text-gold mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2L1 21h22L12 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div>
                    <h3 className="text-[0.95rem] font-bold text-ink mb-1">{item.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Ist Ihre Abmahnung wirksam?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Wir prüfen Ihre Abmahnung kostenlos und schätzen ein, ob sie formell und inhaltlich
            Bestand hat &mdash; innerhalb von 48 Stunden.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Abmahnung prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* Was tun nach einer Abmahnung? */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Richtig reagieren
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Was tun nach einer Abmahnung?
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">1. Ruhe bewahren und Abmahnung sichern</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed">
                  Unterschreiben Sie die Abmahnung nur als &bdquo;erhalten&ldquo; &mdash; niemals als
                  inhaltlich richtig. Fertigen Sie eine Kopie an und notieren Sie das Empfangsdatum.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">2. Sachverhalt prüfen und dokumentieren</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed">
                  Prüfen Sie, ob der Vorwurf zutrifft. Sammeln Sie Beweise für Ihre Sicht der Dinge:
                  E-Mails, Zeiterfassung, Zeugenaussagen. Dokumentieren Sie alles schriftlich.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">3. Gegendarstellung verfassen</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed">
                  Sie haben das Recht, eine Gegendarstellung zu verfassen und deren Aufnahme in die
                  Personalakte zu verlangen (&sect;83 Abs.&nbsp;2 BetrVG). Schildern Sie sachlich Ihre
                  Sicht und widerlegen Sie den Vorwurf mit konkreten Fakten.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">4. Fachanwalt konsultieren</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed">
                  Ein Fachanwalt für Arbeitsrecht prüft die Abmahnung auf Formfehler, berät Sie zur
                  richtigen Strategie und kann ggf. die Entfernung aus der Personalakte durchsetzen.
                  Bei schwerwiegenden oder wiederholten Abmahnungen ist anwaltliche Beratung dringend empfohlen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abmahnung und Kündigung */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Zusammenhang
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Abmahnung und Kündigung &ndash; der Zusammenhang
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die Abmahnung ist im Regelfall <strong>Voraussetzung</strong> für eine verhaltensbedingte
              Kündigung. Ohne vorherige Abmahnung ist eine Kündigung wegen Fehlverhaltens in den
              meisten Fällen unwirksam. Der Arbeitgeber muss dem Arbeitnehmer zunächst die Chance
              geben, sein Verhalten zu ändern.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Es gibt keine gesetzlich festgelegte Anzahl von Abmahnungen, die vor einer Kündigung
              erforderlich ist. Die Rechtsprechung unterscheidet nach Schwere des Verstoßes: Bei
              leichteren Pflichtverletzungen (z.&nbsp;B. Zuspätkommen) sind typischerweise <strong>zwei
              bis drei einschlägige Abmahnungen</strong> erforderlich. Bei schwerwiegenden Verstößen
              kann bereits eine einzige Abmahnung ausreichen.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Entscheidend ist, dass die Abmahnung(en) <strong>einschlägig</strong> sein müssen &mdash;
              also den gleichen oder einen gleichartigen Verstoß betreffen. Eine Abmahnung wegen
              Zuspätkommens rechtfertigt keine Kündigung wegen mangelhafter Arbeitsleistung.
            </p>
            <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.95rem] text-ink leading-relaxed m-0">
                <strong>Ausnahme:</strong> Bei besonders schweren Pflichtverletzungen wie Diebstahl,
                Betrug oder schwerer Beleidigung kann der Arbeitgeber auch ohne vorherige Abmahnung
                fristlos kündigen (&sect;626 BGB). Aber auch hier gilt: Die meisten fristlosen
                Kündigungen scheitern vor dem Arbeitsgericht.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kündigung nach Abmahnungen — Ihre Situation */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Ihre Situation
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3">
            Kündigung nach Abmahnungen &ndash; Ihre Situation
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-8">
            Sie wurden nach Abmahnungen gekündigt? Wählen Sie Ihre Situation und erfahren Sie,
            ob Ihre Kündigung wirksam ist und welche Abfindung möglich ist.
          </p>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {abmahnungEntries.map((e) => (
              <Link
                key={e.count}
                href={`/kuendigung-nach-${e.slug}/`}
                className="no-underline text-inherit block"
              >
                <article className="bg-cream border border-border rounded py-[26px] px-7 transition-all border-l-[3px] border-l-transparent hover:border-l-gold hover:translate-x-1 h-full">
                  <h3 className="font-serif text-[1.05rem] font-bold mb-2">
                    Kündigung nach {e.count} {e.count === 1 ? 'Abmahnung' : 'Abmahnungen'}
                  </h3>
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-3">
                    Was gilt rechtlich und welche Abfindung ist möglich?
                  </p>
                  <span className="text-[0.82rem] text-gold-dark font-semibold">
                    Mehr erfahren &rarr;
                  </span>
                </article>
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
            Fragen zur Abmahnung
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Abmahnung erhalten? Lassen Sie sie prüfen.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Eine fehlerhafte Abmahnung kann eine spätere Kündigung zu Fall bringen. Nutzen Sie
            unsere kostenlose Ersteinschätzung, um Ihre Rechte zu sichern.
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
