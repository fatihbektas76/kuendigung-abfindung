'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

const faqs = [
  {
    q: 'Wie genau ist der Abfindungsrechner?',
    a: 'Der Rechner basiert auf der gängigen Abfindungsformel (0,5 Bruttomonatsgehälter pro Beschäftigungsjahr) und gibt Ihnen eine erste Orientierung. Die tatsächliche Abfindung hängt von vielen individuellen Faktoren ab \u2014 Formfehler, Sozialauswahl, besonderer Kündigungsschutz. Ein Fachanwalt kann Ihren konkreten Fall einschätzen.',
  },
  {
    q: 'Ist die Abfindung brutto oder netto?',
    a: 'Die berechnete Abfindung ist ein Bruttobetrag. Abfindungen sind einkommensteuerpflichtig, aber sozialversicherungsfrei. Durch die Fünftelregelung (§34 EStG) kann die Steuerlast deutlich gesenkt werden.',
  },
  {
    q: 'Wann bekomme ich mehr als den Regelsatz?',
    a: 'Faktoren über 0,5 sind realistisch bei: Formfehlern in der Kündigung, fehlerhafter Sozialauswahl, fehlender Betriebsratsanhörung, besonderem Kündigungsschutz (Schwangerschaft, Schwerbehinderung), langer Betriebszugehörigkeit oder hohem Alter. In diesen Fällen kann der Faktor 1,0 oder höher erreichen.',
  },
];

export default function AbfindungsrechnerPage() {
  const [gehalt, setGehalt] = useState('');
  const [jahre, setJahre] = useState('');
  const [risiko, setRisiko] = useState('mittel');
  const [result, setResult] = useState<{ min: number; mid: number; max: number } | null>(null);

  function calculate() {
    const g = parseFloat(gehalt.replace(/\./g, '').replace(',', '.'));
    const j = parseInt(jahre, 10);
    if (!g || g <= 0 || !j || j <= 0) return;
    setResult({
      min: g * 0.5 * j,
      mid: g * 0.5 * j,
      max: g * 1.5 * j,
    });
  }

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/abfindungsrechner/`}
        pageTitle="Abfindungsrechner"
        pageDescription="Kostenloser Abfindungsrechner: Berechnen Sie Ihre voraussichtliche Abfindung nach Kündigung in 30 Sekunden."
        pageType="WebApplication"
        appName="Abfindungsrechner"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Abfindungsrechner', url: `${SEO_CONFIG.baseUrl}/abfindungsrechner/` },
        ]}
        speakableSelectors={['.ergebnis-box']}
        includeOrganization={false}
        includeRating={false}
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

      {/* Schema.org - HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Abfindung berechnen — so nutzen Sie den Abfindungsrechner',
            description:
              'Berechnen Sie Ihre voraussichtliche Abfindung nach Kündigung in 3 einfachen Schritten mit dem kostenlosen Abfindungsrechner.',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Bruttomonatsgehalt eingeben',
                text: 'Geben Sie Ihr aktuelles Bruttomonatsgehalt in Euro ein. Bei variablem Gehalt verwenden Sie den Durchschnitt der letzten 12 Monate.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Betriebszugehörigkeit angeben',
                text: 'Geben Sie die Anzahl der vollen Beschäftigungsjahre ein. Ab 6 Monaten wird aufgerundet.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Ergebnis ablesen',
                text: 'Der Rechner zeigt drei Szenarien: Minimum (Faktor 0,5), Regelsatz (Faktor 0,5) und Maximum (Faktor 1,5). Die tatsächliche Abfindung hängt von individuellen Faktoren wie Formfehlern oder besonderem Kündigungsschutz ab.',
              },
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
            <span>Abfindungsrechner</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Abfindung berechnen &mdash; Kostenloser Abfindungsrechner
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Berechnen Sie Ihre voraussichtliche Abfindung nach Kündigung kostenlos in 30 Sekunden.
            Drei Szenarien &mdash; von konservativ bis optimistisch.
          </p>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Abfindung berechnen</strong> bedeutet, die voraussichtliche Abfindungshöhe nach Kündigung zu ermitteln.
              Der Anspruch ergibt sich aus Verhandlung auf Basis von <strong>&sect;1a KSchG</strong>.
              Die gängige Formel lautet: <strong>0,5 &times; Bruttomonatsgehalt &times; Betriebsjahre</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[600px]">
            <div className="bg-cream border border-border-light rounded p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Bruttomonatsgehalt (&euro;) <span className="text-gold-dark ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={gehalt}
                    onChange={(e) => setGehalt(e.target.value)}
                    placeholder="z. B. 4.000"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                  />
                </div>
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Betriebszugehörigkeit (Jahre) <span className="text-gold-dark ml-0.5">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={jahre}
                    onChange={(e) => setJahre(e.target.value)}
                    placeholder="z. B. 5"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                  />
                </div>
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Risikoeinschätzung
                  </label>
                  <select
                    value={risiko}
                    onChange={(e) => setRisiko(e.target.value)}
                    className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                  >
                    <option value="niedrig">Niedrig &mdash; Kündigung wahrscheinlich wirksam</option>
                    <option value="mittel">Mittel &mdash; Erfolgsaussichten unklar</option>
                    <option value="hoch">Hoch &mdash; Kündigung wahrscheinlich unwirksam</option>
                  </select>
                  <p className="text-[0.78rem] text-ink-muted mt-1">
                    Je schwächer die Kündigung, desto höher Ihre Verhandlungsposition.
                  </p>
                </div>
                <button
                  onClick={calculate}
                  className="w-full py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                >
                  Abfindung berechnen
                </button>
              </div>
              <p className="text-[0.75rem] text-ink-muted mt-4 leading-relaxed">
                <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen Erstorientierung und ersetzt keine anwaltliche Beratung. Für eine verbindliche Einschätzung Ihres Falls wenden Sie sich bitte an einen <a href="/#kontakt" className="text-gold no-underline hover:underline">Fachanwalt für Arbeitsrecht</a>.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8">
                <h2 className="font-serif text-[1.4rem] font-bold mb-5">Ihre geschätzte Abfindung</h2>
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <div className="rounded-sm border border-border p-5 text-center bg-white">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-2">
                      Unterer Erfahrungswert*
                    </div>
                    <div className="font-serif text-[1.6rem] font-bold text-ink">
                      {fmt(result.min)}
                    </div>
                    <div className="text-[0.78rem] text-ink-muted mt-1">Faktor 0,5&times;</div>
                  </div>
                  <div className="rounded-sm border-2 border-gold p-5 text-center bg-gold-bg">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                      Oberer Erfahrungswert*
                    </div>
                    <div className="font-serif text-[1.6rem] font-bold text-gold-dark">
                      {fmt(result.max)}
                    </div>
                    <div className="text-[0.78rem] text-gold-dark mt-1">Faktor 1,5&times;</div>
                  </div>
                </div>
                <p className="text-[0.78rem] text-ink-muted mt-4">
                  Die Berechnung basiert auf der Formel: Faktor &times; Bruttomonatsgehalt &times; Betriebsjahre.
                  Die tatsächliche Abfindung hängt von den Umständen Ihres Falls ab.
                </p>

                {/* CTA 1 */}
                <div className="mt-8 py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
                  <p className="text-[0.95rem] text-ink mb-3">
                    <strong>Möchten Sie wissen, welches Szenario für Sie realistisch ist?</strong>
                  </p>
                  <a
                    href="/#kontakt"
                    className="inline-block py-3 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-[#635428]"
                  >
                    Kostenlose Ersteinschätzung anfordern &rarr;
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Ein Rechner ersetzt keinen Anwalt
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Die Berechnung gibt Ihnen eine erste Orientierung. Für eine belastbare Einschätzung
            prüfen wir Ihren individuellen Fall &mdash; kostenlos.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* So funktioniert die Abfindungsformel */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Wie wird die Abfindung berechnet?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die gängige Abfindungsformel lautet: <strong>0,5 &times; Bruttomonatsgehalt &times; Betriebszugehörigkeit in Jahren</strong>.
              Diese Formel stammt aus &sect;1a KSchG, der dem Arbeitgeber die Möglichkeit gibt, bei einer betriebsbedingten Kündigung
              eine Abfindung in dieser Höhe anzubieten, wenn der Arbeitnehmer auf eine Kündigungsschutzklage verzichtet.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Wichtig: Es gibt in Deutschland <strong>keinen gesetzlichen Anspruch</strong> auf eine Abfindung. Der Faktor 0,5 ist
              lediglich ein Richtwert. In der Praxis bewegen sich Abfindungen je nach Verhandlungsposition zwischen
              0,25 und 1,5 Bruttomonatsgehältern pro Beschäftigungsjahr — in Einzelfällen auch darüber. Die tatsächliche Höhe
              hängt maßgeblich davon ab, wie stark die Kündigung angreifbar ist.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Bei angebrochenen Beschäftigungsjahren wird nach ständiger Rechtsprechung des Bundesarbeitsgerichts ab sechs Monaten aufgerundet.
              Wer also 4 Jahre und 7 Monate beschäftigt war, rechnet mit 5 Jahren.
              Sonderzahlungen wie Weihnachts- oder Urlaubsgeld fließen anteilig in das Bruttomonatsgehalt ein,
              wenn sie regelmäßig gezahlt werden.
            </p>
          </div>
        </div>
      </section>

      {/* Welche Faktoren erhöhen die Abfindung? */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Verhandlungsspielraum
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Wann habe ich Anspruch auf eine höhere Abfindung?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die Abfindungshöhe ist Verhandlungssache — und Ihre Verhandlungsposition hängt davon ab, wie angreifbar
              die Kündigung ist. Formfehler wie eine <strong>fehlende Betriebsratsanhörung</strong> (&sect;102 BetrVG),
              Verstöße gegen das <strong>Schriftformerfordernis</strong> (&sect;623 BGB) oder eine mangelhafte
              Sozialauswahl (&sect;1 Abs. 3 KSchG) machen die Kündigung angreifbar und erhöhen den Abfindungsfaktor erheblich.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Besonderer <Link href="/kuendigung" className="text-gold no-underline hover:underline">Kündigungsschutz</Link> — etwa bei Schwangerschaft,
              Schwerbehinderung, Elternzeit oder als Betriebsratsmitglied — stärkt Ihre Position zusätzlich.
              In diesen Fällen ist die Kündigung oft von vornherein unwirksam, was den Arbeitgeber zu deutlich höheren
              Abfindungen bewegt.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Auch persönliche Faktoren spielen eine Rolle: Hohe Betriebszugehörigkeit in Kombination mit fortgeschrittenem
              Alter signalisiert schlechtere Arbeitsmarktchancen — Arbeitsgerichte und Arbeitgeber berücksichtigen dies
              regelmäßig bei der Abfindungshöhe. Grundsätzlich gilt: Je unwirksamer die Kündigung, desto höher die Abfindung.
            </p>
          </div>
        </div>
      </section>

      {/* Wann lohnt sich ein Anwalt? */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Praxishinweis
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Wann lohnt sich ein Anwalt bei der Abfindung?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Nach Zugang einer Kündigung haben Sie nur <strong>drei Wochen Zeit</strong>, um Kündigungsschutzklage
              beim Arbeitsgericht einzureichen (&sect;4 KSchG). Versäumen Sie diese Frist, gilt die Kündigung als
              wirksam — unabhängig davon, wie fehlerhaft sie war. Der Verhandlungsspielraum für eine Abfindung
              entsteht fast immer erst durch die Erhebung einer Kündigungsschutzklage.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Ein Fachanwalt für Arbeitsrecht kennt die branchenüblichen Abfindungsfaktoren, erkennt Formfehler
              und kann einschätzen, ob ein Faktor über 0,5 realistisch ist. In vielen Fällen refinanziert sich
              die anwaltliche Vertretung durch eine deutlich höhere Abfindung.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Haben Sie eine Rechtsschutzversicherung mit Arbeitsrechtsschutz? Dann übernimmt diese in der Regel
              die Anwalts- und Gerichtskosten vollständig. Aber auch ohne Versicherung lohnt sich zumindest eine{' '}
              <Link href="/kuendigung-pruefen" className="text-gold no-underline hover:underline">kostenlose Ersteinschätzung</Link>,
              um Ihre Chancen realistisch bewerten zu können.
            </p>
          </div>
        </div>
      </section>

      {/* Quellenblock */}
      <section className="py-10 px-8 bg-cream border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
              Rechtsgrundlagen &amp; Quellen
            </div>
            <ul className="list-none space-y-2 text-[0.88rem]">
              <li>
                <a href="https://www.gesetze-im-internet.de/kschg/__1a.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  &sect;1a KSchG &mdash; Abfindungsanspruch bei betriebsbedingter Kündigung &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/kschg/__4.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  &sect;4 KSchG &mdash; Klagefrist (3 Wochen) &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/estg/__34.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  &sect;34 EStG &mdash; Fünftelregelung bei Abfindungen &rarr;
                </a>
              </li>
            </ul>
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
            Häufige Fragen zur Abfindung
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Kündigung erhalten? Abfindung maximieren.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Die 3-Wochen-Klagefrist nach &sect;4 KSchG läuft. Sichern Sie sich jetzt eine
            kostenlose Ersteinschätzung Ihrer Abfindungschancen.
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
